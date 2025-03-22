import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth,setAuth] = useAuth();
  return (
    <Layout
      title="BlissCart Bazaar - Your One-Stop Online Shop"
      description="Welcome to BlissCart Bazaar — the best place to shop for fashion, electronics, and home essentials at unbeatable prices. Fast delivery, secure payments, and amazing deals!"
      keywords="online shopping, ecommerce, fashion, electronics, home essentials, best deals"
      author="BlissCart Team"
    >
      <h1>Home Page </h1>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  );
};

export default HomePage;
