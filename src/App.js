import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Router from "./components/Router";

const BASE_API_URL = "http://localhost:5000/products";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="flex flex-column min-vh-100 bg-nice-soft py-4">
                <Router ApiUrl={BASE_API_URL} />
            </div>
        </BrowserRouter >
    );
}

export default App;
