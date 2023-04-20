import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";

const Router = ({ ApiUrl }) => {
    return (
        <Routes>
            <Route path="/" element={<ProductList api={ApiUrl} />} />
            <Route path="/add" element={<AddProduct api={ApiUrl} />} />
        </Routes>
    );
};

export default Router;
