import React, { useState } from "react";
import Button from "@mui/material/Button";
import "../styles/Home.css";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section className="dark" id="top">
      <div className="container py-5">
        <div className="content-wrapper d-flex align-items-center justify-content-between">
          <div className="text-content">
            <h1 className="display-4">Beyond Just Four Walls</h1>
            <p className="lead">Creating Spaces That Feel Like Home</p>
            <div className="container demo">
              <div className="demo-form d-flex flex-column align-items-start">
                <input
                  type="email"
                  className="form-control mb-2"
                  style={{ width: "100%", maxWidth: "25vw" }}
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  className="request"
                  style={{
                    backgroundColor: "#D2FAB7",
                    width: "100%",
                    maxWidth: "25vw",
                  }}
                  //   onClick={handleRequestDemo}
                  //   disabled={isLoading}
                >
                  {/* {isLoading ? "Requesting..." : "Request a Demo"} */}
                </Button>
                {/* {error && <p className="text-danger mt-2">{error}</p>}
                {success && <p className="text-success mt-2">{success}</p>} */}
              </div>
            </div>
          </div>
          {/* <div className="image-content">
            <img
              src={Creative}
              alt="Trading Illustration"
              className="img-fluid"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
