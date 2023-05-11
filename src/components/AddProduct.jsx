import React, { useState, useReducer, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const inputReducer = (state, action) => {
    if (action.type === "USER_INPUT")
        return { value: action.value, isValid: action.value !== "" };
    if (action.type === "INPUT_BLUR")
        return { value: state.value, isValid: state.value !== "" };
    return { value: "", isValid: false };
};

const AddProduct = ({ api }) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [nameState, dispatchName] = useReducer(inputReducer, {
        value: "",
        isValid: null,
    });
    const [stockState, dispatchStock] = useReducer(inputReducer, {
        value: "",
        isValid: null,
    });
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [imageIsValid, setImageIsValid] = useState();
    const navigate = useNavigate();

    const { isValid: nameIsValid } = nameState;
    const { isValid: stockIsValid } = stockState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(nameIsValid && stockIsValid && imageIsValid);
        }, 500);

        return () => {
            clearTimeout(identifier);
        };
    }, [nameIsValid, stockIsValid, imageIsValid]);

    const saveProduct = async (e) => {
        e.preventDefault();
        if (file === "") {
            setImageIsValid(false);
            return;
        }
        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", nameState.value);
        formData.append("stock", stockState.value);
        try {
            await axios.post(api, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/", {
                state: { message: "Product saved succesfully" },
                replace: true,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const loadImage = (e) => {
        if (e.target.files.length > 0) {
            const image = e.target.files[0];
            setImageIsValid(true);
            setFile(image);
            setPreview(URL.createObjectURL(image));
        } else {
            setImageIsValid(false);
            setPreview("");
            return;
        }
    };

    return (
        <section id="add-product" className="container mx-auto">
            <div className="text-end">
                <Link
                    onClick={() => navigate(-1)}
                    className="btn btn-nice-danger px-4 py-2"
                >
                    <i className="bi bi-x-lg me-2"></i>
                    <span>Cancel</span>
                </Link>
            </div>
            <div className="panel-card bg-white mt-4">
                <p className="fw-bold fs-4">Add New Product</p>
                <hr />
                <form
                    onSubmit={saveProduct}
                    className="row justify-content-between mt-4"
                >
                    <div className="col-md-6 mt-md-0 mt-4">
                        <div className="mb-3">
                            <label className="form-label fw-bold">
                                Product Name
                            </label>
                            <input
                                type="text"
                                className={`form-control shadow-none ${
                                    nameState.isValid === false
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="Enter product name"
                                value={nameState.value}
                                onChange={(event) => {
                                    dispatchName({
                                        type: "USER_INPUT",
                                        value: event.target.value,
                                    });
                                }}
                                onBlur={() => {
                                    dispatchName({ type: "INPUT_BLUR" });
                                }}
                            />
                            {nameState.isValid === false ? (
                                <div className="error-message text-nice-danger pt-1">
                                    Product name cannot be empty!
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Stock</label>
                            <input
                                type="number"
                                min={1}
                                className={`form-control shadow-none ${
                                    stockState.isValid === false
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="Enter total stock available"
                                value={stockState.value}
                                onChange={(event) => {
                                    dispatchStock({
                                        type: "USER_INPUT",
                                        value: event.target.value,
                                    });
                                }}
                                onBlur={() => {
                                    dispatchStock({ type: "INPUT_BLUR" });
                                }}
                            />
                            {stockState.isValid === false ? (
                                <div className="error-message text-nice-danger pt-1">
                                    Product stock cannot be empty!
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Image</label>
                            <input
                                name="image"
                                type="file"
                                className={`form-control shadow-none ${
                                    imageIsValid !== undefined && !imageIsValid
                                        ? "is-invalid"
                                        : ""
                                }`}
                                onChange={loadImage}
                            />
                            {imageIsValid !== undefined && !imageIsValid ? (
                                <div className="error-message text-nice-danger pt-2">
                                    Product image cannot be empty!
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="btn btn-nice-dark px-4 py-2"
                                disabled={!formIsValid}
                            >
                                Save Product
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6 text-center order-md-last order-first">
                        {preview ? (
                            <>
                                <img
                                    src={preview}
                                    className="img-thumbnail rounded mb-md-0 mb-3"
                                    alt="preview"
                                />
                                <label className="form-label fw-bold d-md-none d-block">
                                    Image Preview
                                </label>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddProduct;
