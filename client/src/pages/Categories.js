import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
    const categories = useCategory();

    return (
        <Layout title="All Categories">
            <div className="container py-5">
                <h2 className="text-center mb-5">Shop by Category</h2>
                <div className="row g-4">
                    {categories.map((c) => (
                        <div className="col-md-4" key={c._id}>
                            <Link to={`/category/${c.slug}`} className="text-decoration-none">
                                <div
                                    className="card bg-light text-dark border-0 shadow-sm h-100 rounded-4"
                                >
                                    <div className="card-body d-flex align-items-center justify-content-center">
                                        <h5 className="card-title m-0 text-center">{c.name}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;
