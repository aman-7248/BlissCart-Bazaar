import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from 'antd';
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout
      title="BlissCart Bazaar - Your One-Stop Online Shop"
      description="Shop fashion, electronics & more at unbeatable prices."
      keywords="online shopping, ecommerce, fashion, electronics, home"
      author="BlissCart Team"
    >
      {/* Banner */}
      <img
        style={{ width: "100%", height: "300px" }}
        src="/images/banner1.png"
        className="banner-img"
        alt="banner"
      />

      <div className="row mt-3 ms-1 me-2">
        {/* Sidebar */}
        <div className="col-md-3 mt-3">
          <div className="p-3 shadow rounded bg-light">
            <h4 className="text-center mb-4 py-2 text-dark fw-bold border-bottom border-2 border-primary" 
          style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>
                🛍️ Filter by Category
          </h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  className="mb-2"
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

             <h4 className="text-center mb-4 py-2 text-dark fw-bold border-bottom border-2 border-primary" 
          style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>
                🛍️ Filter by Price
          </h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id} className="mb-2">
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <button
              className="btn btn-danger mt-4"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className="col-md-9 mr-3">
          <h2 className="text-center mb-4 py-2 text-dark fw-bold border-bottom border-2 border-primary" 
          style={{ fontSize: '2rem', letterSpacing: '1px' }}>
                🛍️ All Products
          </h2>

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
                      <p></p>
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

          {/* Load More */}
          <div className="m-3 d-flex justify-content-center">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
