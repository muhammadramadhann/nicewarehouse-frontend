import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SwitchDisplayButton from "./SwitchDisplayButton";
import ProductListTable from "./ProductListTable";
import ProductListCard from "./ProductListCard";

const ProductList = () => {
    const [isChecked, setIsChecked] = useState("table");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get("http://localhost:5000/products");
        const data = response.data;
        setProducts(data);
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        setIsChecked(e.target.value);
    };

    return (
        <section id="product" className="container mx-auto">
            <Link className="btn btn-nice px-4 py-2">
                <span>Add Product</span> <i className="bi bi-plus-lg ms-1"></i>
            </Link>
            <div className="product-list bg-white mt-4">
                <p className="fw-bold fs-4">Products</p>
                <hr />
                <div className="row justify-content-end align-items-center mt-4">
                    <div className="col-lg-9 col-sm-6 mt-sm-0 mt-3">
                        <SwitchDisplayButton
                            display={isChecked}
                            change={handleChange}
                        />
                    </div>
                    <div className="col-lg-3 col-sm-6 order-sm-last order-first">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control search-input shadow-none text-sm"
                                placeholder="Enter product keyword"
                            />
                            <button
                                className="btn btn-nice"
                                type="button"
                                id="button-addon2"
                            >
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div id="product-display" className="row mt-4">
                    {isChecked === "card" ? (
                        <ProductListCard products={products} />
                    ) : (
                        <ProductListTable products={products} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductList;
