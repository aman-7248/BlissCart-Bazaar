import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>

      {/* using helmet for SEO */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>

      </Helmet>
      <Header />
      <main style={{ minHeight: "76vh" }}>{children}</main>
      <Footer />
    </>
  );
};

Layout.defaultProps={
  title: "BlissCart Bazaar - Shop Now for the Best Deals",
  description: "BlissCart Bazaar offers the latest fashion, electronics, and home essentials at unbeatable prices. Enjoy fast delivery and secure payments.",
  keywords: "ecommerce, online shopping, fashion, electronics, home essentials, best deals",
  author: "BlissCart Team",
}

export default Layout;
