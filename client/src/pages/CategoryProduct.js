import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        <h2 className="text-center mb-4 py-2 text-dark fw-bold border-bottom border-2 border-primary"
          style={{ fontSize: '2rem', letterSpacing: '1px' }}>
          🛍️ {category?.name} Products
        </h2>
        <p className="text-center mb-4">{products?.length} product(s) found</p>

        <div className="row">
          {products?.map((p) => (
            <div key={p._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card h-100 shadow-sm rounded-4">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px"
                  }}
                />
                <div
                  className="card-body d-flex flex-column justify-content-between"
                  style={{
                    background: "linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%)",
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px"
                  }}
                >
                  <div>
                    <h5 className="card-title text-danger fw-bold">{p.name}</h5>
                    <p className="card-text text-dark">{p.description.substring(0, 60)}...</p>
                    <p className="card-text text-success fw-bold fs-5">
                      ₹ {p.price}
                    </p>
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

export default CategoryProduct;