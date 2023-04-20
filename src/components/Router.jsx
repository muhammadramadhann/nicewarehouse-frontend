import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductList />} />
        </Routes>
    );
};

export default Router;
