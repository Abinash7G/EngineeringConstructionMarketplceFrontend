import React, { useState, useRef } from "react"; // Added useRef for file input reset
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  Container,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Link,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Footer from "../pages/footer"; // Importing the Footer component

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyType: "",
    companyName: "",
    companyEmail: "",
    location: "",
  });
  const [certificateFile, setCertificateFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [locationOptions, setLocationOptions] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationInput, setLocationInput] = useState(""); // State to control Autocomplete input
  const fileInputRef = useRef(null); // Ref to reset file input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCertificateFile(e.target.files[0]);
  };

  const handleTermsChange = (e) => {
    setTermsAgreed(e.target.checked);
  };

  const handleLocationInputChange = async (event, value) => {
    setLocationInput(value); // Update the input value for Autocomplete
    if (!value || value.length < 3) {
      setLocationOptions([]);
      return;
    }

    setLocationLoading(true);
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: value,
          format: "json",
          limit: 5,
          countrycodes: "np",
        },
      });
      const options = response.data.map((place) => ({
        label: place.display_name,
        value: place.display_name,
      }));
      setLocationOptions(options);
    } catch (err) {
      console.error("Error fetching location suggestions:", err);
      setLocationOptions([]);
      setMessage("Failed to fetch location suggestions. Please try again.");
      setSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleLocationChange = (event, newValue) => {
    setFormData({ ...formData, location: newValue ? newValue.value : "" });
    setLocationInput(newValue ? newValue.label : ""); // Update the input value when a location is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyType || !formData.companyName || !formData.companyEmail || !certificateFile || !formData.location) {
      setMessage("Please fill out all required fields and upload the certificate.");
      setSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const payload = new FormData();
    payload.append("company_type", formData.companyType);
    payload.append("company_name", formData.companyName);
    payload.append("company_email", formData.companyEmail);
    payload.append("location", formData.location);
    payload.append("registration_certificate", certificateFile);

    try {
      const response = await API.post("/company-registration/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        setMessage(response.data.message || "Company registered successfully!");
        setSeverity("success");
        setOpenSnackbar(true);

        // Reset all fields
        setFormData({
          companyType: "",
          companyName: "",
          companyEmail: "",
          location: "",
        });
        setCertificateFile(null);
        setTermsAgreed(false);
        setLocationInput(""); // Clear the Autocomplete input
        setLocationOptions([]); // Clear the location suggestions
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear the file input
        }
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMsg = error.response.data.error || "An error occurred during registration.";
        setMessage(JSON.stringify(errorMsg));
      } else {
        setMessage("Registration failed. Please try again.");
      }
      setSeverity("error");
      setOpenSnackbar(true);
      console.error("Registration error:", error.response?.data || error.message);
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
        <Container
          maxWidth="sm"
          sx={{
            mt: 4,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "#f9f9f9",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ color: "#0073e6" }}>
            Company Registration
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }} encType="multipart/form-data">
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Company Type</InputLabel>
              <Select
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                label="Company Type"
              >
                <MenuItem value="">
                  <em>Select Company Type</em>
                </MenuItem>
                <MenuItem value="construction">Construction Company</MenuItem>
                <MenuItem value="supplier">Material Supplier</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Company Name"
              name="companyName"
              variant="outlined"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Company Email"
              name="companyEmail"
              type="email"
              variant="outlined"
              value={formData.companyEmail}
              onChange={handleChange}
              fullWidth
              required
            />
            <Autocomplete
              freeSolo
              options={locationOptions}
              getOptionLabel={(option) => option.label || ""}
              onInputChange={handleLocationInputChange}
              onChange={handleLocationChange}
              value={locationOptions.find(option => option.value === formData.location) || null} // Controlled value for Autocomplete
              inputValue={locationInput} // Controlled input value for Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Location"
                  variant="outlined"
                  required
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {locationLoading ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <TextField
              label="Registration Certificate"
              type="file"
              name="registration_certificate"
              onChange={handleFileChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: ".pdf,.jpg,.jpeg,.png", ref: fileInputRef }} // Attach ref to file input
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAgreed}
                  onChange={handleTermsChange}
                  color="primary"
                />
              }
              label="I agree to the Terms and Conditions"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!termsAgreed}
            >
              Register
            </Button>
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/login")}
              sx={{ color: "#0073e6", textDecoration: "underline" }}
            >
              Log in
            </Link>
          </Typography>
          <Snackbar 
            open={openSnackbar} 
            autoHideDuration={4000} 
            onClose={handleSnackbarClose} // Updated to use handleSnackbarClose
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ mt: "60px" }}
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

export default CompanyRegistration;