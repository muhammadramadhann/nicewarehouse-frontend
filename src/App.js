import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Router from "./components/Router";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="flex flex-column min-vh-100 bg-nice-soft py-4">
                <Router />
            </div>
        </BrowserRouter >
    );
}

export default App;
