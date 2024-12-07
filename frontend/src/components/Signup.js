import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import "../styles/Login.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Google Login response
  const handleGoogleResponse = async (response) => {
    if (response?.credential) {
      console.log("Google Auth Token:", response.credential);
      await authenticateUser(response.credential, true);
    } else {
      setError("Failed to get Google Auth Token.");
    }
  };

  // Handle Google Login error
  const handleGoogleError = () => {
    setError("Google authentication failed.");
  };

  // Authenticate user with server
  const authenticateUser = async (tokenId, isGoogleAuth) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenId, isGoogleAuth, email, password }),
        }
      );

      const data = await response.json();
      if (response.ok && data.success) {
        // Save token and user info
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            userId: data.user_id,
            email: data.email,
            name: data.name,
            picture: data.picture,
          })
        );
        window.location.href = data.redirect_url || "/dashboard";
      } else {
        setError(data.message || "Authentication failed.");
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      setError("An error occurred while authenticating.");
    } finally {
      setLoading(false);
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Further form submission logic here
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Toggle password visibility
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="login">
      <div className="pic">
        <img
          src="https://i.pinimg.com/564x/c4/b4/4d/c4b44df74508825e3c8603768749d50d.jpg"
          alt="Signup Visual"
        />
      </div>
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          {error && <div className="error-message">{error}</div>}

          <GoogleLogin
            onSuccess={handleGoogleResponse}
            onError={handleGoogleError}
            render={(renderProps) => (
              <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                fullWidth
                sx={{
                  backgroundColor: "#de5246",
                  color: "#fff",
                  mb: 2,
                  "&:hover": { backgroundColor: "#c43c34" },
                }}
                onClick={renderProps.onClick}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Sign up with Google"
                )}
              </Button>
            )}
          />

          <div className="separator">
            <hr />
            <span>or</span>
            <hr />
          </div>

          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
            margin="normal"
            fullWidth
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleInputChange}
            required
            margin="normal"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
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
            value={confirmPassword}
            onChange={handleInputChange}
            required
            margin="normal"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
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
            sx={{
              backgroundColor: "#146C94",
              color: "#ffffff",
              fontWeight: "bold",
              mt: 2,
              "&:hover": { backgroundColor: "#12587a" },
            }}
          >
            Register
          </Button>

          <div className="signup-footer">
            <span>Already have an account?</span>
            <Link to="/login" className="signup-link">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
