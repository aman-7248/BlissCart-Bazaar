import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* Single Product Details */}
      <div className="row container mt-4">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            className="img-fluid"
            style={{
              height: "350px",
              width: "100%",
              objectFit: "contain",
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)"
            }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="text-center mb-3 text-primary">Product Details</h2>
          <h5 className="mb-2">Name: <span className="text-dark">{product.name}</span></h5>
          <h6 className="mb-2">Description: <span className="text-muted">{product.description}</span></h6>
          <h6 className="mb-2">Price: <span className="fw-bold text-success">${product.price}</span></h6>
          <h6 className="mb-2">Category: <span className="text-info">{product.category?.name}</span></h6>
          <button
            className="btn btn-success mt-3 px-4 py-2"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <hr className="my-4" />

      {/* Related Products */}
      <div className="container">
        <h4 className="mb-4 text-center text-secondary">Similar Products</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products Found</p>
        )}

        <div className="row">
          {relatedProducts?.map((p) => (
            <div key={p._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card h-100 shadow d-flex flex-column border-0">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    height: "350px",
                    objectFit: "contain",
                    backgroundColor: "#f1f1f1",
                    borderBottom: "1px solid #ccc"
                  }}
                />
                <div className="card-body d-flex flex-column justify-content-between"
                  style={{
                    background: "linear-gradient(0deg, #fffcf2 0%, #d7efff 100%)",
                    fontSize: "0.95rem"
                  }}>
                  <div>
                    <h5 className="card-title text-danger fw-semibold">{p.name}</h5>
                    <p className="card-text text-muted">{p.description.substring(0, 60)}...</p>
                    <p className="card-text fw-bold text-success">${p.price}</p>
                  </div>
                  <div className="mt-auto">
                    <button
                      className="btn btn-primary mb-2 w-100"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-success w-100"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                        toast.success("Item Added to cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;