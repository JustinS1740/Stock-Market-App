import React, { act, useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { ArrowUpRight } from "lucide-react";

const API_KEY = process.env.REACT_APP_STOCK_API_KEY;

const StockChart = ({ symbol = "AAPL" }) => {
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        async function getStockData() {
            try {
                const res = await axios.get('https://api.twelvedata.com/time_series', {
                        params: {
                            symbol: symbol,
                            interval: "1day",
                            outputsize: 30,
                            apikey: API_KEY,
                        },
                    }
                );

                console.log("API Response:", res.data);
                console.log("Requested symbol:", symbol);

                if (!res.data || !res.data.values) {
                    console.error("No data returned:", res.data);
                    return;
                }

                const chartData = res.data.values.reverse().map((point) => ({
                    datetime: point.datetime,
                    close: parseFloat(point.close),
                    volume: parseInt(point.volume),
                }));

                setData(chartData);
                setMeta(res.data.meta);
            } catch (err) {
                console.error("Failed to fetch data", err);
            }
        }

        getStockData();
    }, [symbol]);

    const currentPrice = data[data.length - 1]?.close ?? 0;
    const previousPrice = data[data.length - 2]?.close ?? currentPrice;
    const priceChange = currentPrice - previousPrice;
    const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);

    const firstDataPoint = data[0] ?? {};
    const lastDataPoint = data[data.length - 1] ?? {};
    const prevDataPoint = data[data.length - 2] ?? lastDataPoint;
    
    const openPrice = firstDataPoint.close ?? "--";
    const prevClosePrice = prevDataPoint.close ?? "--";
    const volumeValue = lastDataPoint.volume ?? "--";

    return (
    <div style={{ backgroundColor: "#fff", padding: "1rem", width: "300px", borderRadius: "12px", boxShadow: "0 0 8px rgba(0,0,0,0.1)" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Apple Inc.</h2>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{symbol}</p>
            </div>
            <div className="text-right">
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' }}>
                {currentPrice.toFixed(2)} USD
            </p>
            <p style={{ fontSize: '0.875rem', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', columnGap: '0.25rem' }}>
                <ArrowUpRight size={16} />
                {priceChange.toFixed(2)} ({priceChangePercent}%)
            </p>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', fontSize: '0.875rem', color: '#374151', marginBottom: '1rem', rowGap: '0.5rem' }}>
            <div><strong>Open:</strong> {openPrice}</div>
            <div><strong>Prev Close:</strong> {prevClosePrice}</div>
            <div><strong>Volume:</strong> {volumeValue}</div>
            <div><strong>Market Cap:</strong> {meta.market_cap ?? "1.88T"}</div>
            <div><strong>Day Range:</strong> 109.16 - 112.86</div>
            <div><strong>52 Week Range:</strong> 53.15 - 137.98</div>
        </div>

        <ResponsiveContainer width="100%" height={100}>
            <LineChart 
                data={data}
                onMouseMove={(e) => {
                    if (e && e.activeTooltipIndex != null) {
                        setActiveIndex(e.activeTooltipIndex);
                    }
                }}
            >
            <XAxis dataKey="datetime" hide />
            <Tooltip />
            <Line
                type="monotone"
                dataKey="close"
                stroke="#007bff"
                strokeWidth={3}
                dot={false}
                isAnimationActive={true}
            />
            </LineChart>
        </ResponsiveContainer>
        
        {activeIndex != null && data[activeIndex] && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem', paddingLeft: '0.25rem', paddingRight: '0.25rem' }}>
                {new Date(data[activeIndex].datetime).toLocaleString(undefined, {
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </div>
        )}
    </div>
    );
};

export default StockChart;