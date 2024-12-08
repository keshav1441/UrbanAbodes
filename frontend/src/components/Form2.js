import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "../styles/Login.css";

const Form2 = () => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [state, setState] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "first_name") setFirstname(value);
    if (name === "last_name") setLastname(value);
    if (name === "state") setState(value);
    if (name === "dob") setDob(value);
    if (name === "city") setCity(value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = window.localStorage.getItem("accessToken");

    if (!accessToken) {
      setErrorMessage("Access token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/form2`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            first_name,
            last_name,
            dob,
            state,
            city,
            accessToken,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      if (data.success) {
        setSuccessMessage(data.message);
        setErrorMessage("");
        navigate(data.redirect_url);
      } else {
        setErrorMessage(data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Error storing credentials: " + error.message);
      setSuccessMessage("");
    }
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
            value={first_name}
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
            value={last_name}
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
            value={dob}
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
            value={state}
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
            value={city}
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form2;
