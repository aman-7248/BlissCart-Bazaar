import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout
      title="Contact Us - BlissCart Bazaar"
      description="Get in touch with BlissCart Bazaar for queries, support, or product information. We’re here for you 24/7 — call, email, or chat with us."
      keywords="contact BlissCart, customer support, ecommerce help, 24/7 support"
      author="BlissCart Support Team"
    >
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query and information about product feel free to call anytime we 24X7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@BlissCartBazaar.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91-9823456210
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-3201-1023 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
