import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout
      title="404 - Page Not Found | BlissCart Bazaar"
      description="Oops! The page you’re looking for doesn’t exist. Head back to BlissCart Bazaar’s homepage for the best deals on fashion, electronics, and more."
      keywords="404 error, page not found, ecommerce, BlissCart Bazaar"
      author="BlissCart Team"
    >
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
