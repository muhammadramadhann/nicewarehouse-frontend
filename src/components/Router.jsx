import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const Router = ({ ApiUrl }) => {
    return (
        <Routes>
            <Route path="/" element={<ProductList api={ApiUrl} />} />
            <Route path="/add" element={<AddProduct api={ApiUrl} />} />
            <Route path="/edit/:uuid" element={<EditProduct api={ApiUrl} />} />
        </Routes>
    );
};

export default Router;
