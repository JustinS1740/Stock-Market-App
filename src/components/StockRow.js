import React from "react"
import LongWidget from "./LongWidget"

const StockRow = () => {
    const stockSymbols = ["MSFT", "GOOGL", "AMZN", "TSLA", "NVDA"];

    return (
        <div style={{ borderRadius: "12px", boxShadow: "0 0 8px rgba(0,0,0,0.1)", backgroundColor: "#fff", justifyContent: "center", display: "flex", gap: "2rem", flexwrap: "wrap", padding: "1rem", width: "auto" }}>
            {stockSymbols.map((symbol) => (
                <LongWidget symbol={symbol} />
            ))}
        </div>
    );
};

export default StockRow;