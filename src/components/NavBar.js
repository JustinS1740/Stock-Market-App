import React from "react";

const NavBar = () => {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.title}>StackedStocks</h2>
            <ul style={styles.list}>
                <li>Home</li>
                <li>Dashboard</li>
                <li>Wallet</li>
                <li>News</li>
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        width: "200px",
        height: "100vh",
        backgroundColor: "#fff",
        color: "#000",
        padding: "20px",
        boxSizing: "border-box",
    },
    title: {
        marginBottom: "0px",
        fontSize: "1.2rem",
        textAlign: "center",
    },
    list: {
        listStyle: "none",
        padding: 0,
        lineHeight: "2rem",
    },
};

export default NavBar