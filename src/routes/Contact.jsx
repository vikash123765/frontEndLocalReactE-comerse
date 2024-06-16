import { useAtom } from "jotai";
import { storeAtom } from '../lib/store.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from "../components/FormField";
import { alterInfo, changePassword,getCookie,getToken } from "../lib/api";

import '../style/Contact.css'; // Create a Contact.css file for styling
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Contact() {
  const [store, setStore] = useAtom(storeAtom);
  const [formState, setFormState] = useState({
    subject: "",
    email: "",
    message: "",
  });
const [loading, setLoading] = useState(false); // Introduce loading state
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    // Fetch user's email if logged in
    if (store.loggedIn && store.user && store.user.email) {
      setFormState((prev) => ({ ...prev, email: store.user.email }));
    }
  }, [store.loggedIn, store.user]);

  const handleInputChange = (name, value) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.message) {
      alert("Please provide a message");
      return;
    }
    setLoading(true)

    // Depending on the login status, call the appropriate API
    if (store.loggedIn) {
      console.log(store)
      let mockEmail = localStorage.getItem("mock-token");
      // Call the API for logged-in users
      const response = await fetch(`http://localhost:8080/user/loggedIn/customerService`, {
        method: "POST",
        mode: 'cors', // Include 'mode: cors' for CORS
        headers: {
          "Content-Type": "application/json",
          "token": getCookie('token'), // Assuming you have a token in your store,
          "senderEmail": store.user.userEmail,
          "subject": formState.subject
        },
        body: JSON.stringify({
          message: formState.message,
     
        }),
      });

      if (response.ok) {
        alert("Message sent successfully");
        // You can redirect the user to another page or do other actions
        navigate('/');
      } else {
        alert("Error sending message");
        setLoading(false);
        console.error(response);
      }
    } else {
      // Call the API for guest users
      const response = await fetch(`http://localhost:8080/guest/customerService/message`, {
        method: "POST",
        mode: 'cors', // Include 'mode: cors' for CORS
        headers: {
          "Content-Type": "application/json",
          "subject": formState.subject,
          "senderEmail": formState.email,
        },
        body: JSON.stringify({
          message: formState.message,
          subject: formState.subject,
          email: formState.email
        }),
      });

      if (response.ok) {
        alert("Message sent successfully");
        setLoading(false);
        // You can redirect the user to another page or do other actions
        navigate('/');
      } else {
        alert("Error sending message");
        setLoading(false);
        console.error(response);
      }
    }
  };

  return (
    
    <>
     <p>Have a question, concern, or just want to get in touch? We're here to help! Please fill out the form below, and we'll get back to you as soon as possible.
Let us know the subject of your inquiry, whether it's about an order, a product, or any other matter.
Feel free to share the details of your issue or inquiry. The more information you provide, the better we can assist you.
Thank you for reaching out to us! We appreciate your feedback and are committed to providing you with the best assistance.</p>
  {loading && <div className="loading-icon"><i className="fas fa-spinner fa-spin"></i></div>}
      <section id="contact">
        <form onSubmit={handleSubmit}>
          <FormField
            label="Subject"
            name="subject"
            placeholder="Subject"
            onChange={(value) => handleInputChange("subject", value)}
          />
          {!store.loggedIn && (
            <FormField
              label="Your email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={(value) => handleInputChange("email", value)}
            />
          )}
          <FormField
            label="Message"
            type="textarea"
            placeholder="Please explain your issue we will contact you as soon as we can!"
            name="message"
            onChange={(value) => handleInputChange("message", value)}
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </section>
     
    </>
  );
}
