import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 pe-4">    {/* Added pe-4 (padding-right)*/}
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="col-md-4 mb-4 px-2"> {/*Added px-2 for side padding */}
                <Link
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link text-decoration-none"
                >
                  <div 
                    className="card h-100" // Removed fixed height, using h-100 */}
                    style={{ 
                      overflow: "hidden",
                      minHeight: "25rem" // Ensures consistent height 
                    }}
                  >
                    <img  
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ 
                        width: "100%",
                        height: "15rem",     // Fixed height for images 
                        objectFit: "contain",
                        display: "block",
                        backgroundColor: "#f8f9fa" // Optional: background for transparent images */}
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text text-muted">
                        {p.description.length > 50 
                          ? `${p.description.substring(0, 50)}...` 
                          : p.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;