// cspell:disable
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "../styles/Login.css";

const Form2 = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    state: "",
    city: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/dash");
  };

  return (
    <div className="login">
      <div className="pic">
        <img
          src="https://i.pinimg.com/enabled_hi/564x/c4/b4/4d/c4b44df74508825e3c8603768749d50d.jpg"
          alt="Signup Visual"
        />
      </div>
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2>Register</h2>

          <TextField
            label="First name"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Last name"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Date of Birth"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="State"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#146C94",
              color: "#ffffff",
              fontWeight: "bold",
              marginTop: "15px",
            }}
          >
            Get Started &rarr;
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Form2;
