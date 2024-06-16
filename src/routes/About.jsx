import React from 'react';
import '../style/About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-section">
        <h2>Welcome to Our E-Commerce Store</h2>
        <p>
          At Our E-Commerce Store, we are dedicated to providing an exceptional online shopping experience. 
          Our mission is to offer high-quality products, excellent customer service, and a seamless 
          purchasing journey for every customer.
        </p>
      </section>

      <section className="general-info-section">
        <h2>General Information</h2>
        <p>
        Welcome to our vibrant new startup based in Sweden, where innovation meets style! At VTScases, we're dedicated to bringing you the trendiest and most durable mobile cases that perfectly complement your lifestyle.
         Situated in the heart of Sweden,we're proud to serve customers all across Europe.  Get ready to elevate your mobile experience with us!
         </p>
      </section>

      <section className="payment-section">
        <h2>Payment System</h2>
        <p>
        For your convenience and security, we've partnered with PayPal as our trusted payment system. With PayPal, you can shop with peace of mind, knowing your transactions are safe and secure, stay tuned for more payment options coming soon!!
        </p>
      </section>

      <section className="shipping-section">
        <h2>Shipping Information</h2>
        <p>
        We exclusively ship within Europe with our primary delivery partner  PostNord. With our base in Sweden, we promise the swiftest delivery times of 1-2 days for orders within Sweden itself. For European deliveries, anticipate your package within 2-3 days. Enjoy peace of mind knowing there are no additional charges – just the standard Postnord charge  and consistent, reliable service every time!
        </p>
      </section>

      <section className="returns-section">
        <h2>Returns & Exchanges</h2>
        <p>
        For returns due to product defects, simply take a photo, send it to our support team for verification. Upon confirmation, we'll either replace the product at no cost or provide a full refund.
        If you wish to return a product for reasons other than defects, you'll be responsible for return shipping costs, and a refund will be issued as soon as the item is returned and confirmed as being unopened/unused.

        </p>
      </section>

      <section className="team-section">
        <h2>Our Team Members</h2>
        <div className="team-member">
          <p>CEO</p>
          <h3>Vikash Kosaraju</h3>
        </div>
  
        <div className="team-member">
          <p>Co-Founder</p>
          <h3>Stefanos Tzegay</h3>
        </div>
      </section>
    </div>
  );
}

export default About;
