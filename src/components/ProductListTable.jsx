import React from "react";
import { Link } from "react-router-dom";

const ProductListTable = ({ products, deleteProduct }) => {
    return (
        <>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Code</th>
                            <th scope="col">Name</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Status</th>
                            <th scope="col" className="d-optional">
                                Added
                            </th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{product.code}</td>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td>
                                    {product.stock > 0 ? (
                                        <span className="p-2 bg-nice-soft border-nice-soft">
                                            Available
                                        </span>
                                    ) : (
                                        <span className="p-2 bg-nice-danger border-nice-danger">
                                            Out of stock
                                        </span>
                                    )}
                                </td>
                                <td className="d-optional">
                                    {new Date(
                                        product.createdAt
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    <Link
                                        to={`edit/${product.uuid}`}
                                        className="btn btn-nice me-2 mb-md-0 mb-2"
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                    <Link
                                        onClick={() =>
                                            deleteProduct(product.uuid)
                                        }
                                        className="btn btn-nice-dark"
                                    >
                                        <i className="bi bi-trash3-fill"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ProductListTable;
