// cspell:disable
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import "../styles/Login.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Use navigate hook

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Navigate to the Form2 page upon successful form submission
    navigate("/form2");
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

          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            fullWidth
            style={{ backgroundColor: "#de5246", color: "#fff" }}
          >
            Sign up with Google
          </Button>

          <div className="separator">
            <hr />
            <span>or</span>
            <hr />
          </div>

          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            margin="normal"
            fullWidth
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            margin="normal"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            margin="normal"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            Register
          </Button>

          <div className="signup-footer">
            <span>Already have an account?</span>
            <Link to="/login" className="signup-link">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
