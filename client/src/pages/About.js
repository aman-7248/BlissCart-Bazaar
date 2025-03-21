import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout
      title="About Us - BlissCart Bazaar"
      description="Learn more about BlissCart Bazaar — your one-stop destination for quality products, unbeatable deals, and an exceptional online shopping experience."
      keywords="about BlissCart, online shopping, best deals, quality products, ecommerce"
      author="BlissCart Team"
    >
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to BlissCart-Bazaar, your one-stop destination for quality products and unbeatable deals. Our mission is simple — to make shopping easy, affordable, and enjoyable for everyone.
            <br />
            <br />
            We believe in providing more than just products; we aim to deliver an exceptional shopping experience. From carefully curated collections to reliable delivery and outstanding customer support, we’re here to ensure you get what you need without the hassle.
            <br />
            <br />
            Whether you're shopping for the latest trends, must-have gadgets, or everyday essentials — BlissCart-Bazaar is committed to bringing convenience and satisfaction to your doorstep.
            <br />
            <br />
            Join our growing community of happy customers and experience the future of online shopping today!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
