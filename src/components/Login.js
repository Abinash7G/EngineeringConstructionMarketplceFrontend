import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { TextField, Button, Typography, Box, Container, Snackbar, Alert } from "@mui/material";
import Footer from "../pages/footer";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setOpenSnackbar(false);

    try {
      const response = await API.post("/api/login/", formData);
      
      if (response.status === 200) {
        const { access, refresh, role, company_id, id, company_type } = response.data;

        // Store tokens and user data
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("company_id", company_id);
        localStorage.setItem("user_id", id);

        API.defaults.headers.common["Authorization"] = `Bearer ${access}`;

        // Role-based navigation
        if (role === "Platformadmin") {
          navigate("/admin");
        } else if (role === "Admin") {
          company_type === "construction" 
            ? navigate("/company") 
            : navigate("/suppliers");
        } else if (role === "User") {
          navigate("/client");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      
      if (error.response) {
        // Handle suspended account
        if (error.response.status === 403) {
          errorMessage = "Account suspended. Please contact support.";
        } 
        // Handle invalid credentials
        else if (error.response.status === 401) {
          errorMessage = "Invalid username or password.";
        }
        // Handle other errors
        else {
          errorMessage = error.response.data?.message || "Login failed. Please try again.";
        }
      }

      // Preserve form data on error
      setFormData(prev => ({ ...prev }));
      setMessage(errorMessage);
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await API.post("api/forgot-password/", { email });
      if (response.status === 200) {
        setMessage("Password reset email sent!");
        setSeverity("success");
        setOpenSnackbar(true);
        setShowForgotPassword(false);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Error resetting password.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Container maxWidth="xs" sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {showForgotPassword ? "Forgot Password" : "Login"}
          </Typography>

          {!showForgotPassword ? (
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                autoComplete="username"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                autoComplete="current-password"
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleForgotPassword(); }} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                autoComplete="email"
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

          <Snackbar 
            open={openSnackbar} 
            autoHideDuration={4000} 
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ mt: "60px" }}
          >
            <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: "100%" }}>
              {message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
      
      <Box sx={{ mt: "auto" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Login;