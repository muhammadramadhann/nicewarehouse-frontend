import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = ({ api }) => {
    const [name, setName] = useState("");
    const [stock, setStock] = useState(1);
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [errorName, setErrorName] = useState(false);
    const [errorStock, setErrorStock] = useState(false);
    const [errorImage, setErrorImage] = useState(false);
    const navigate = useNavigate();
    const { uuid } = useParams();

    useEffect(() => {
        getProductById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProductById = async () => {
        const response = await axios.get(`${api}/${uuid}`);
        setName(response.data.name);
        setStock(response.data.stock);
        setFile(response.data.image);
        setPreview(response.data.url);
    };

    const validateInput = (name, stock, file) => {
        if (name === "" || stock === "" || file === "") {
            if (name === "") {
                setErrorName(true);
            } else {
                setErrorName(false);
            }

            if (stock === "") {
                setErrorStock(true);
            } else {
                setErrorStock(false);
            }

            if (file === "") {
                setErrorImage(true);
            } else {
                setErrorImage(false);
            }
            return false;
        } else {
            setErrorName(false);
            setErrorStock(false);
            setErrorImage(false);
            return true;
        }
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", name);
        formData.append("stock", stock);
        try {
            const validated = validateInput(name, stock, file);
            if (validated) {
                await axios.patch(`${api}/${uuid}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                navigate("/", {
                    state: { message: "Product updated succesfully" },
                    replace: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    return (
        <section id="edit-product" className="container mx-auto">
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
                <p className="fw-bold fs-4">Edit Product</p>
                <hr />
                <form
                    onSubmit={updateProduct}
                    className="row justify-content-between mt-4"
                >
                    <div className="col-md-6 mt-md-0 mt-4">
                        <div className="mb-3">
                            <label className="form-label fw-bold">
                                Product Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                className="form-control shadow-none"
                                placeholder="Enter product name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errorName ? (
                                <div className="error-message text-nice-danger pt-2">
                                    Product name cannot be empty!
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Stock</label>
                            <input
                                name="stock"
                                type="number"
                                min={1}
                                className="form-control shadow-none"
                                placeholder="Enter total stock available"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                            {errorStock ? (
                                <div className="error-message text-nice-danger pt-2">
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
                                className="form-control shadow-none"
                                onChange={loadImage}
                            />
                            {errorImage ? (
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
                            >
                                Update Product
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

export default EditProduct;
