import React from "react";
import { Link } from "react-router-dom";

const ProductListCard = ({ products, deleteProduct }) => {
    return (
        <>
            {products.map((product) => (
                <div
                    id={product.uuid}
                    key={product.id}
                    className="col-lg-3 col-sm-6 mb-3"
                >
                    <div className="card d-flex flex-column h-100 shadow-sm">
                        <img
                            src={product.url}
                            className="card-img-top"
                            alt="product"
                        />
                        <div className="card-body">
                            <p className="card-text mb-3">
                                {product.stock > 0 ? (
                                    <span className="py-1 px-2 bg-nice-soft border-nice-soft">
                                        Available
                                    </span>
                                ) : (
                                    <span className="p-2 bg-nice-danger border-nice-danger">
                                        Out of stock
                                    </span>
                                )}
                            </p>
                            <p className="card-text mb-2 text-decoration-underline">
                                {product.code}
                            </p>
                            <h6 className="card-title fw-bold">
                                {product.name}
                            </h6>
                            <p className="card-text">
                                {product.stock > 0 ? (
                                    <>
                                        <i className="bi bi-cart-check-fill text-nice me-2"></i>
                                        {product.stock}
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-cart-check-fill text-nice-danger me-2"></i>
                                        {product.stock}
                                    </>
                                )}
                            </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-0 p-2 mt-auto">
                            <Link to={`edit/${product.uuid}`} className="btn btn-nice w-100">
                                <i className="bi bi-pencil-square"></i>
                            </Link>
                            <Link
                                onClick={() => deleteProduct(product.uuid)}
                                className="btn btn-nice-dark w-100"
                            >
                                <i className="bi bi-trash3-fill"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductListCard;
