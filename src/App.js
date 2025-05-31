import React from 'react';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div style={{ display: "flex" }}>
      <NavBar />
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Welcome to StackedStocks</h1>
        <p>This is the main content.</p>
      </div>
    </div>
  );
}

export default App;
