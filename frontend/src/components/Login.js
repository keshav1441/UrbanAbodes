//cspell:disable

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import "../styles/Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="login">
      <div className="pic">
        <img
          src="https://i.pinimg.com/enabled_hi/564x/c4/b4/4d/c4b44df74508825e3c8603768749d50d.jpg"
          alt=""
        />
      </div>
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2>Sign in</h2>

          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            style={{
              backgroundColor: "#de5246",
              color: "#ffffff",
              width: "100%",
            }}
          >
            Sign in with Google
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
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
            }
            label="Remember me"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            to="/dashboard"
            style={{
              backgroundColor: "#146C94",
              color: "#ffffff",
              fontWeight: "bold",
              marginTop: "15px",
            }}
          >
            Sign in &rarr;
          </Button>

          <div className="signup-footer">
            <span>Not a member?</span>
            <Link to="/signup" className="signup-link">
              Create an account.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
