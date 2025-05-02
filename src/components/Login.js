import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import API from "../services/api"; // Axios instance
import { TextField, Button, Typography, Box, Container, Snackbar, Alert } from "@mui/material"; // Added Snackbar and Alert imports
import Footer from "../pages/footer"; // Importing the Footer component

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [email, setEmail] = useState(""); // For forgot password
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility
  const [severity, setSeverity] = useState("success"); // State to control Snackbar severity
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Toggle forgot password view
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await API.post("/api/login/", formData);

      if (response.status === 200) {
        const { access, refresh, role, company_id, id, company_type } = response.data;

        // Store access & refresh tokens
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("company_id", company_id);
        localStorage.setItem("user_id", id);
        sessionStorage.setItem("access_token", access);
        sessionStorage.setItem("refresh_token", refresh);
        sessionStorage.setItem("company_id", company_id);
        sessionStorage.setItem("user_id", id);

        // Set Axios default header for all future requests
        API.defaults.headers.common["Authorization"] = `Bearer ${access}`;

        // Redirect based on role and company_type
        if (role === "Platformadmin") {
          navigate("/admin"); // Platform admin dashboard
        } else if (role === "Admin") {
          if (company_type === "construction") {
            navigate("/company"); // Supplier dashboard
          } else {
            navigate("/suppliers"); // Construction company dashboard
          }
        } else {
          navigate("/client"); // Client dashboard
        }
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Invalid credentials.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
      setSeverity("error"); // Set severity to error for login failure
      setOpenSnackbar(true); // Show the Snackbar
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await API.post("api/forgot-password/", { email });
      if (response.status === 200) {
        setMessage("Password reset email sent!");
        setSeverity("success"); // Set severity to success for successful reset email
        setOpenSnackbar(true); // Show the Snackbar
        setShowForgotPassword(false); // Return to login view
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || "Error resetting password.");
      } else {
        setMessage("No response from server. Please try again later.");
      }
      setSeverity("error"); // Set severity to error for reset failure
      setOpenSnackbar(true); // Show the Snackbar
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensure the container takes the full viewport height
      }}
    >
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Container maxWidth="xs" sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {showForgotPassword ? "Forgot Password" : "Login"}
          </Typography>
          {!showForgotPassword ? (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleForgotPassword();
              }}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Reset Password
              </Button>
            </Box>
          )}

          {!showForgotPassword && (
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "primary.main", cursor: "pointer" }}
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </Typography>
          )}

          {showForgotPassword && (
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "primary.main", cursor: "pointer" }}
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </Typography>
          )}

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{ fontWeight: "bold", cursor: "pointer", color: "#0073e6" }}
            >
              Create one
            </span>
          </Typography>
          {/* Add Snackbar to display the message */}
          <Snackbar 
            open={openSnackbar} 
            autoHideDuration={4000} 
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position at top-right
            sx={{ mt: "60px" }} // Adjust margin-top to place it just below the navbar
          >
            <Alert 
              onClose={handleSnackbarClose} 
              severity={severity} 
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
      {/* Add Footer at the bottom */}
      <Box sx={{ mt: "auto" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Login;