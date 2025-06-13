import React, { act, useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    YAxis,
} from "recharts"
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const API_KEY = process.env.REACT_APP_STOCK_API_KEY;

const LongWidget = ({ symbol = "MSFT" }) => {
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

                const nameRes = await axios.get('https://api.twelvedata.com/symbol_search', {
                    params: {
                        symbol: symbol,
                        apikey: API_KEY,
                    },
                });

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
                
                const companyName =
                    nameRes.data?.data?.[0]?.instrument_name || symbol;

                setData(chartData);
                setMeta({...res.data.meta, name: companyName,});
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
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: "1rem", width: "270px", height: "100px", borderRadius: "12px", boxShadow: "0 0 8px rgba(0,0,0,0.1)" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: "0" }}>{meta.name || symbol}</h2>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: "0" }}>{symbol}</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2563eb', margin: "0" }}>
                {currentPrice.toFixed(2)} USD
            </p>
            <p style={{ fontSize: '0.8rem', color: priceChange >= 0 ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', columnGap: '0.25rem', margin: "0" }}>
                {priceChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {priceChange.toFixed(2)} ({priceChangePercent}%)
            </p>
            </div>
        </div>
        <div style={{ flex: 1, height: "100"}}>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart 
                data={data}
                onMouseMove={(e) => {
                    if (e && e.activeTooltipIndex != null) {
                        setActiveIndex(e.activeTooltipIndex);
                    }
                }}
            >
            <XAxis dataKey="datetime" hide />
            <YAxis domain={[0, 'dataMax']} hide />
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
        </div>
    </div>
    );
};

export default LongWidget;