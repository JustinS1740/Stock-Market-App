import React from "react"
import LongWidget from "./LongWidget"

const StockRow = () => {
    const stockSymbols = ["MSFT", "GOOGL", "AMZN", "TSLA"];

    return (
        <div style={{ display: "flex", gap: "1rem", flexwrap: "wrap", paddingBottom: "1rem"}}>
            {stockSymbols.map((symbol) => (
                <LongWidget symbol={symbol} />
            ))}
        </div>
    );
};

export default StockRow;