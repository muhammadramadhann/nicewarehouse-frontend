import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/nicewarehouse-logo.svg";

const Navbar = () => {
    const [navScroll, setNavScroll] = useState("");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
            setNavScroll("navbar-scroll");
        } else {
            setNavScroll("");
        }
    });

    return (
        <nav className={`navbar navbar-expand-md navbar-light ${navScroll}`}>
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img
                        src={logo}
                        alt="Logo"
                        width="220"
                        className="d-inline-block align-text-top"
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item d-md-block d-none">
                            <Link className="nav-link disabled opacity-25">
                                |
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="#"
                            >
                                <span className="opacity-50">Home</span>
                                <span className="opacity-50 ms-2">
                                    &#x2022;
                                </span>
                                <span className="ms-2">Products</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className="nav-link d-flex align-items-center"
                                to="#"
                            >
                                <span className="text-nice-dark">
                                    Andi Budiman
                                </span>
                                <i className="bi bi-person-fill ms-md-2 ms-0 me-md-0 me-2 fs-4 order-md-last order-first"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
