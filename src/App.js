import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import StockChart from './components/StockChart';
import LongWidget from './components/LongWidget';
import StockRow from './components/StockRow';

function App() {
  return (
    <div style={{ display: "flex" }}>
      <NavBar />
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#e8f9fd", }}>
        <h1>Stock Dashboard</h1>
        <StockRow />
        <StockChart symbol="AAPL" />
      </div>
    </div>
  );
}

export default App;
