import React, { useState } from "react";
import '../style/Admin.css';
const ROOT = "http://localhost:8080";

const Admin = () => {
  const [adminEmail, setAdminEmail] = useState(""); // Input for admin email (authentication)
  const [authToken, setAuthToken] = useState(""); // Input for authentication token
  const [orderNrCancel, setOrderNrCancel] = useState(""); // Input for order number to cancel
  const [orderNrSent, setOrderNrSent] = useState(""); // Input for order number to mark as sent
  const [trackingId, setTrackingId] = useState(""); // Input for tracking ID when marking as sent
  const [orderNrDelivered, setOrderNrDelivered] = useState(""); // Input for order number to mark as delivered

  const [loading, setLoading] = useState(false); // Introduce loading state

  const [formState, setFormState] = useState({
    subject: "", // Add other form fields as needed
    message: "",
  });
  
  const handleCancelOrder = async () => {
    setLoading(true); // Set loading to true when operation starts

    try {
      const response = await fetch(`http://localhost:8080/order/${orderNrCancel}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'email': adminEmail, // Use the provided admin email for authentication
          'x-auth-token': authToken,
        },
        mode: 'cors', // Include 'mode: cors' for CORS
      });

      if (response.ok) {
        console.log(`Order ${orderNrCancel} canceled successfully`);
        alert("order was cancelled !");
        setOrderNrCancel("");
       

      } else {
        console.error(`Failed to cancel order ${orderNrCancel}`);
        alert("failed to cancel order please tryagain  !");
      }
    } catch (error) {
      console.error("Error:", error);
    }   finally {
      setLoading(false); // Set loading back to false when operation completes
    }
  };

  const handleLogout = async () => {
    setLoading(true); //
    try {
        console.log("Auth Token:", authToken);

        const response = await fetch("http://localhost:8080/admin/signOut", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': authToken,
            },mode: 'cors' // Include 'mode: cors' for CORS
        });

        if (response.ok) {
            console.log("Admin logged out successfully");
            alert("Admin logged out successfully")
            localStorage.removeItem("tokenA");
            // Redirect to the login page or another appropriate page
            window.location.href = '/login'; // Example: Redirect to the login page
        } else {
            console.error("Failed to log out admin");
            alert("Failed to log out admin")
            // You can show an error message or handle it as needed
        }
    } catch (error) {
        console.error("Error during log out:", error);
    }  finally {
      setLoading(false); // Set loading back to false when operation completes
    }
};

const handleMarkSent = async () => {
  setLoading(true);
  try {
    const response = await fetch(`http://localhost:8080/order/sent/${orderNrSent}/${trackingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'email': adminEmail,
        'x-auth-token': authToken,
      },mode: 'cors' // Include 'mode: cors' for CORS
    });

    console.log('Response Status:', response.status);
    console.log('Response Text:', response.statusText);

    if (response.ok) {
      console.log(`Order ${orderNrSent} marked as sent successfully`);
      setOrderNrSent("");
      setTrackingId("");
      alert(`${orderNrSent} marked as sent`);
    } else {
      console.error(`Failed to mark order ${orderNrSent} as sent`);
      alert(`Failed to mark order ${orderNrSent} as sent`);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Network error:', error);
      alert('Network error. Please check your internet connection.');
    } else {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  }finally {
    setLoading(false); // Set loading back to false when operation completes
  }
};


  const handleMarkDelivered = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/order/delivered/${orderNrDelivered}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'email': adminEmail, // Use the provided admin email for authentication
          'x-auth-token': authToken,
        },mode: 'cors' // Include 'mode: cors' for CORS
      });

      if (response.ok) {
        console.log(`Order ${orderNrDelivered} marked as delivered successfully`);
        alert(`Order ${orderNrDelivered} marked as delivered successfully`)
        setOrderNrDelivered("");
  
      } else {
        console.error(`Failed to mark order ${orderNrDelivered} as delivered`);
      }
    } catch (error) {
      console.error("Error:", error);
    }finally {
      setLoading(false); // Set loading back to false when operation completes
    }
  };

  return (
    <div>
      <h1>Welcome, Admin!</h1>
      {loading && <div className="loading-icon"><i className="fas fa-spinner fa-spin"></i></div>}
      {/* Authentication */}
      <div className="admin-authentication">
        <label htmlFor="adminEmail">Admin Email:</label>
        <input
          type="text"
          id="adminEmail"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          placeholder="Enter Admin Email"
        />
        <label htmlFor="authToken">Authentication Token:</label>
        <input
          type="text"
          id="authToken"
          value={authToken}
          onChange={(e) => setAuthToken(e.target.value)}
          placeholder="Enter Authentication Token"
        />
      </div>

      {/* Remove/Cancel an Order */}
      <div className="admin-endpoint">
        <h2>Remove/Cancel an Order</h2>
        <label htmlFor="orderNrCancel">Order Number:</label>
        <input
          type="text"
          id="orderNrCancel"
          value={orderNrCancel}
          onChange={(e) => setOrderNrCancel(e.target.value)}
          placeholder="Enter Order Number"
        />
        <button onClick={handleCancelOrder}>Cancel Order</button>
      </div>

      {/* Mark Order as Sent */}
      <div className="admin-endpoint">
        <h2>Mark Order as Sent</h2>
        <label htmlFor="orderNrSent">Order Number:</label>
        <input
          type="text"
          id="orderNrSent"
          value={orderNrSent}
          onChange={(e) => setOrderNrSent(e.target.value)}
          placeholder="Enter Order Number"
        />
        <label htmlFor="trackingId">Tracking ID:</label>
        <input
          type="text"
          id="trackingId"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID"
        />
        <button onClick={handleMarkSent}>Mark as Sent</button>
      </div>

      {/* Mark Order as Delivered */}
      <div className="admin-endpoint">
        
        <h2>Mark Order as Delivered</h2>
        <label htmlFor="orderNrDelivered">Order Number:</label>
        <input
          type="text"
          id="orderNrDelivered"
          value={orderNrDelivered}
          onChange={(e) => setOrderNrDelivered(e.target.value)}
          placeholder="Enter Order Number"
        />
        <button onClick={handleMarkDelivered}>Mark as Delivered</button>
      </div>

      {/* Log Out */}
      <div className="admin-endpoint">
        <h2>Log Out</h2>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Admin;