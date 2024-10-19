import React, { useState } from "react";
import Button from "@mui/material/Button";
import "../styles/Home.css";
import house1 from "../Assets/house1.jpg";
import house2 from "../Assets/house2.jpg";
import house3 from "../Assets/house3.jpg";
import house4 from "../Assets/house4.jpg";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRequestDemo = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log(`Demo requested for email: ${email}`);
      const response = await fetch("http://localhost:8000/api/request-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || "Demo request successful!");
        setEmail("");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="dark" id="top">
      <div className="container py-5">
        <div className="content-wrapper d-flex align-items-center justify-content-between">
          <div className="text-content">
            <h1 className="display-4 home-head">Beyond Just Four Walls</h1>
            <p className="lead home-subhead">
              Creating Spaces That Feel Like Home
            </p>
            <div className="container demo">
              <div className="demo-form d-flex flex-column align-items-start">
                <input
                  type="email"
                  className="form-control mb-2 request-email"
                  style={{ width: "100%", maxWidth: "25vw" }}
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  className="request"
                  style={{
                    backgroundColor: "#AFD3E2",
                    width: "100%",
                    maxWidth: "25vw",
                  }}
                  onClick={handleRequestDemo}
                  disabled={isLoading}
                >
                  {isLoading ? "Requesting..." : "Request a Demo"}
                </Button>
                {error && <p className="text-danger mt-2">{error}</p>}
                {success && <p className="text-success mt-2">{success}</p>}
              </div>
            </div>
          </div>
          <div className="image-container">
            <div className="image-content">
              <img
                src={house1}
                alt="House Illustration 1"
                className="img-fluid"
              />
            </div>
            <div className="houses-row">
              <img
                src={house2}
                alt="House Illustration 2"
                className="img-fluid house"
              />
              <img
                src={house3}
                alt="House Illustration 3"
                className="img-fluid house"
              />
              <img
                src={house4}
                alt="House Illustration 4"
                className="img-fluid house"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
