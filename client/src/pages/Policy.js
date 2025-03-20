import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6" >
          <h6>🔒 Privacy Policy</h6>
          <p>At [Your Store Name], we value your privacy. We collect only the information necessary to fulfill your orders. Your data is securely stored and never shared with third parties without your consent. By using our website, you agree to our privacy practices designed to protect you.</p>
          <h6>🔄 Return & Refund Policy</h6>
          <p>
          Your satisfaction is our priority. If you’re not happy with your purchase, you  return within 30 days of receiving your order. Items must be unused, in their original packaging, and accompanied by a receipt or proof of purchase.  Refunds are processed within 5-7 business days. </p>
          <h6>🛠️ Terms of Service</h6>
          <p>
          By using our website, you agree to abide by our terms. This includes respecting our intellectual property, using our services for lawful purposes, and acknowledging that prices and product availability may change without notice. We reserve the right to refuse service to anyone for misconduct or policy violations..</p>

        </div>
      </div>
    </Layout>
  );
};

export default Policy;
