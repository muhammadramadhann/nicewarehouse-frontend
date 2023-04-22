import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import SwitchDisplayButton from "./SwitchDisplayButton";
import ProductListTable from "./ProductListTable";
import ProductListCard from "./ProductListCard";

const ProductList = ({ api }) => {
    const [isChecked, setIsChecked] = useState("table");
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const location = useLocation();

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSwitchDisplay = (e) => {
        setIsChecked(e.target.value);
    };

    const getProducts = async () => {
        const response = await axios.get(api);
        // set data
        setProducts(response.data);
    };

    const onDeleteProduct = async (uuid) => {
        try {
            if (window.confirm("Are you sure want to delete this product?")) {
                await axios.delete(`${api}/${uuid}`);
                getProducts();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSearchProduct = async (keyword) => {
        const response = await axios.get(`${api}/?search=${keyword}`);
        setProducts(response.data);
    };

    return (
        <section id="product" className="container mx-auto">
            <Link to="/add" className="btn btn-nice px-4 py-2">
                <span>Add Product</span> <i className="bi bi-plus-lg ms-1"></i>
            </Link>
            <div className="panel-card bg-white mt-4">
                <p className="fw-bold fs-4">Products</p>
                <hr />
                <div className="row justify-content-end align-items-center mt-4">
                    <div className="col-lg-9 col-sm-6 mt-sm-0 mt-3">
                        <SwitchDisplayButton
                            display={isChecked}
                            change={handleSwitchDisplay}
                        />
                    </div>
                    <div className="col-lg-3 col-sm-6 order-sm-last order-first">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control search-input shadow-none text-sm"
                                placeholder="Enter product keyword"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                onClick={() => onSearchProduct(search)}
                                className="btn btn-nice"
                                type="button"
                                id="button-addon2"
                            >
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {location.state !== null ? (
                    <div
                        className="alert alert-success alert-dismissible fade show mt-4"
                        role="alert"
                    >
                        {location.state.message}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                        ></button>
                    </div>
                ) : (
                    ""
                )}

                <div id="product-display" className="row mt-4">
                    {isChecked === "card" ? (
                        <ProductListCard
                            products={products}
                            deleteProduct={onDeleteProduct}
                        />
                    ) : (
                        <ProductListTable
                            products={products}
                            deleteProduct={onDeleteProduct}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductList;
