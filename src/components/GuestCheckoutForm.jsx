import React, { forwardRef, useState } from 'react';
import FormField from "./FormField";

const GuestCheckoutForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    shippingAddress: '',
    phoneNumber: '',
  });

  const [formErrors, setFormErrors] = useState({
    userName: '',
    email: '',
    shippingAddress: '',
    phoneNumber: '',
  });

  // Function to validate form fields
  const validateField = (name, value) => {
    
    let errorMessage = '';
    switch (name) {
      case 'userName':
        if (!value.trim()) {
          errorMessage = 'Please enter your name.';
        }
        break;
      case 'email':
        if (!value.trim().match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
          errorMessage = 'Please enter a valid email address (e.g., example@example.com).';
        }
        break;
      case 'shippingAddress':
        if (!value.trim()) {
          errorMessage = 'Please enter a valid shipping address.';
        } else if (value.trim().length < 5) {
          errorMessage = 'Shipping address is too short (minimum 5 characters).';
        }
        // Add more complex validation if needed
        break;
      case 'phoneNumber':
        if (!value.match(/^1{2}\d{10}$|^1{1}\d{11}$/)) {
          errorMessage = 'Please enter a valid phone number with country code no spaces  or + sign';
        }
        break;
      default:
        break;
    }
    return errorMessage;
  };

// Handle input change and validate field
const handleInputChange = (name,value) => {
  //console.log(formData) 
 
  console.log('Name:', name);
  console.log('Value:', value);
 
  setFormErrors(prevErrors => ({ ...prevErrors, [name]: validateField(name, value) }));
  setFormData(prevData => ({ ...prevData, [name]: value }));

  console.log(formData)
};



  
 
// Function to validate all fields
const handleValidate = () => {
  const newErrors = {};
  let formIsValid = true; // Assume form is valid initially

  for (const key in formData) {
    const errorMessage = validateField(key, formData[key]);
    newErrors[key] = errorMessage; // Update form errors

    if (errorMessage) {
      formIsValid = false; // Set formIsValid to false if any error is found
    }
  }

  setFormErrors(newErrors);

  if (formIsValid) {
    console.log("Form is successful");
    alert("form values ar passed in correct")
    // You can perform further actions here if the form is successful
  } else {
    console.log("Form has validation errors");
    alert("form values ar passed incorrect please dubble chaeck values")
    // You can provide feedback to the user indicating validation errors here
  }
};

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all fields before submitting
    handleValidate();

    // If there are no errors, submit the form
    if (!Object.values(formErrors).some(error => error)) {
      if (props.guestCheckout) {
        props.guestCheckout(formData);
      }
    }
  };

  return (
    <div>
      <form ref={ref} onSubmit={handleSubmit} id="guestCheckoutForm">
        <FormField 
          label="Name"
          name="userName"
          type="text"
          placeholder="Enter your name"
          onChange={(value) => handleInputChange('userName', value)}
          value={formData.userName}
          error={formErrors.userName} // Pass error message as a prop
        />
        <FormField 
          label="Email"
          name="email"
          type="email" 
          
          placeholder="Enter your email"
          onChange={(value) => handleInputChange('email', value)}
          value={formData.email}
          error={formErrors.email} // Pass error message as a prop
        />
        <FormField 
          label="Shipping address"
          name="shippingAddress"
          type="textarea"
          placeholder="Enter your complete address: Street Address, Postal Code, City, and Country. Please include Apartment or Floor Number."
          onChange={(value) => handleInputChange('shippingAddress', value)}
          value={formData.shippingAddress}
          error={formErrors.shippingAddress} // Pass error message as a prop
        />
       <FormField 
  label="Phone number"
  name="phoneNumber"
  placeholder="Enter your phone number"
  onChange={(value) => handleInputChange('phoneNumber', value)}
  value={formData.phoneNumber}
  error={formErrors.phoneNumber} // Pass error message as a prop
/>
             
     

      </form>
    </div>
  );
});

export default GuestCheckoutForm;
