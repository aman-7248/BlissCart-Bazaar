import React,{useState,useEffect} from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";

const HomePage = () => {
  const [auth,setAuth] = useAuth();
  const [products,setProducts]=useState([]);
  const [categories,setCategories]=useState([]);




  const getAllProducts = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get("/api/v1/product/get-product");
      // setLoading(false);
      setProducts(data.products);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    // getAllCategory();
    getAllProducts();
    // getTotal();
  }, []);





  return (
    <Layout
      title="BlissCart Bazaar - Your One-Stop Online Shop"
      description="Welcome to BlissCart Bazaar — the best place to shop for fashion, electronics, and home essentials at unbeatable prices. Fast delivery, secure payments, and amazing deals!"
      keywords="online shopping, ecommerce, fashion, electronics, home essentials, best deals"
      author="BlissCart Team"
    >
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter by Category</h4>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
          {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1 ">More Details</button>
                  <button class="btn btn-secondary ms-1 ">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
