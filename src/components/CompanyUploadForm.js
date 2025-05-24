
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ProjectsSection from "./ProjectSection";
import TeamMembersSection from "./TeamMembersSection";

const CompanyUploadForm = () => {
  const [company, setCompany] = useState({
    companyName: "",
    email: "",
    phoneNumber: "",
    address: "",
    logo: null,
    aboutUs: "",
    projects: [],
    team: [],
  });
  const [companyServices, setCompanyServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [hasCompanyInfo, setHasCompanyInfo] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const checkAuthentication = () => {
    const accessToken = localStorage.getItem("access_token");
    const companyId = localStorage.getItem("company_id");
    return accessToken && companyId;
  };

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  };

  const handleAuthError = () => {
    setError("Unauthorized access. Please log in again.");
    localStorage.clear();
    window.location.href = "/login";
  };

  const fetchCompanyData = async (token) => {
    setLoading(true);
    try {
      const companyId = localStorage.getItem("company_id");
      if (!companyId) throw new Error("No company ID found.");

      // Fetch Company model data
      const companyResponse = await axios.get(
        `http://127.0.0.1:8000/company-registration/${companyId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (companyResponse.status === 200) {
        const companyData = companyResponse.data;
        setCompany((prev) => ({
          ...prev,
          companyName: companyData.company_name || "",
          email: companyData.company_email || "",
          address: companyData.location || "",
        }));
      }

      // Try fetching CompanyInfo data
      try {
        const companyInfoResponse = await axios.get(
          `http://127.0.0.1:8000/company-info/${companyId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (companyInfoResponse.status === 200) {
          setHasCompanyInfo(true);
          const companyInfoData = companyInfoResponse.data;
          setCompany((prev) => ({
            ...prev,
            companyName: companyInfoData.company_name || prev.companyName,
            email: companyInfoData.company_email || prev.email,
            phoneNumber: companyInfoData.phone_number || "",
            address: companyInfoData.address || prev.address,
            logo: companyInfoData.logo
              ? `http://127.0.0.1:8000${companyInfoData.logo}`
              : null,
            aboutUs: companyInfoData.about_us || "",
            projects: companyInfoData.projects || [],
            team: companyInfoData.team || [],
          }));
        }
      } catch (infoError) {
        if (infoError.response?.status === 404) {
          setHasCompanyInfo(false);
          // Do not set error for 404, as this is expected for new companies
        } else if (infoError.response?.status === 401) {
          handleAuthError();
        } else {
          setError("Failed to fetch company details. Please try again.");
        }
      }
      } catch (error) {
      if (error.response?.status === 401) {
        handleAuthError();
      } else {
        setError("Failed to fetch company details. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyServices = async (token) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/company-services/basic/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const filteredServices = response.data.map((service, index) => ({
        id: index +1,
        category: service.category || "Unknown",
        sub_service: service.sub_service || "Unknown",
      }));
      setCompanyServices(filteredServices);
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthError();
      } else {
        // Do not set error; instead, set companyServices to empty array
        setCompanyServices([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!checkAuthentication()) {
        handleAuthError();
        return;
      }

      let accessToken = localStorage.getItem("access_token");
      if (isTokenExpired(accessToken)) {
        try {
          const refreshToken = localStorage.getItem("refresh_token");
          if (!refreshToken) throw new Error("No refresh token available.");

          const refreshResponse = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            { refresh: refreshToken }
          );
          accessToken = refreshResponse.data.access;
          localStorage.setItem("access_token", accessToken);
        } catch (refreshError) {
          handleAuthError();
          return;
        }
      }

      await Promise.all([
        fetchCompanyData(accessToken),
        fetchCompanyServices(accessToken),
      ]);
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    if (!checkAuthentication()) {
      handleAuthError();
      return;
    }
    setTabIndex(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const companyId = localStorage.getItem("company_id");

      const formData = new FormData();
      formData.append("company_name", company.companyName);
      formData.append("company_email", company.email);
      formData.append("phone_number", company.phoneNumber || "");
      formData.append("address", company.address);
      if (company.logo instanceof File) formData.append("logo", company.logo);
      formData.append("about_us", company.aboutUs || "");
      formData.append("projects", JSON.stringify(company.projects));
      formData.append("team", JSON.stringify(company.team));

      let response;
      if (hasCompanyInfo) {
        // Update existing CompanyInfo
        response = await axios.put(
          `http://127.0.0.1:8000/company-info/${companyId}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Create new CompanyInfo
        formData.append("company", companyId);
        response = await axios.post(`http://127.0.0.1:8000/company-info/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        setSnackbar({ open: true, message: "Company details saved successfully!", severity: "success" });
        setHasCompanyInfo(true);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthError();
      } else {
        setError("Failed to save company details. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCompany({ ...company, logo: file });
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordUpdate = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setSnackbar({ open: true, message: "New password and confirm password do not match.", severity: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        "http://127.0.0.1:8000/api/change-password/",
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSnackbar({ open: true, message: "Password updated successfully!", severity: "success" });
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordDialogOpen(false);
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthError();
      } else {
        setSnackbar({ open: true, message: "Error updating password. Please try again.", severity: "error" });
      }
    }
  };

  const handlePermanentDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete("http://127.0.0.1:8000/api/permanent-delete-account/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ open: true, message: "Account permanently deleted successfully!", severity: "success" });
      localStorage.removeItem("access_token");
      localStorage.removeItem("company_id");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthError();
      } else {
        setSnackbar({ open: true, message: "Failed to permanently delete account. Please try again.", severity: "error" });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
        Upload Company Details
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Company Info" />
          <Tab label="Projects" />
          <Tab label="Team Members" />
        </Tabs>
      </Paper>

      {tabIndex === 0 && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            Company Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={company.companyName}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={company.email}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={company.phoneNumber}
                onChange={(e) =>
                  setCompany({ ...company, phoneNumber: e.target.value })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                value={company.address}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
                Upload Logo
              </Typography>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {company.logo && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Preview:</Typography>
                  <img
                    src={
                      typeof company.logo === "string"
                        ? company.logo
                        : URL.createObjectURL(company.logo)
                    }
                    alt="Logo Preview"
                    style={{ width: 100, height: 100, borderRadius: "50%" }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="About Us"
                value={company.aboutUs}
                onChange={(e) =>
                  setCompany({ ...company, aboutUs: e.target.value })
                }
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{ backgroundColor: "#007BFF", color: "#fff" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Save Details"
              )}
            </Button>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Box>

          {/* Services Section */}
          <Paper
            elevation={3}
            sx={{ p: 4, mt: 4, mb: 4, border: "1px solid #e0e0e0", borderRadius: 2 }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
              Services
            </Typography>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2, width: "100%" }}>
                <CircularProgress />
              </Box>
            ) : companyServices.length > 0 ? (
              <Grid container spacing={3}>
                {Array.from(new Set(companyServices.map((s) => s.category))).map(
                  (category, index) => {
                    const categoryServices = companyServices.filter(
                      (s) => s.category === category
                    );
                    return (
                      <Grid item xs={12} sm={6} key={category}>
                        <Paper
                          elevation={1}
                          sx={{
                            p: 2,
                            border: "1px solid #e0e0e0",
                            borderRadius: 2,
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              mb: 2,
                              fontWeight: "bold",
                              color: "#1E90FF",
                              borderBottom: "2px solid #FFA500",
                              pb: 1,
                            }}
                          >
                            {category}
                          </Typography>
                          <List dense>
                            {categoryServices.map((service) => (
                              <ListItem key={service.id} sx={{ pl: 2, py: 0.5 }}>
                                <ListItemText
                                  primary={
                                    <Typography variant="body2" sx={{ color: "#333" }}>
                                      • {service.sub_service}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </Grid>
                    );
                  }
                )}
              </Grid>
            ) : (
              <Typography sx={{ mt: 2 }}>No services added yet.</Typography>
            )}
          </Paper>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPasswordDialogOpen(true)}
              sx={{ mr: 2 }}
            >
              Change Password
            </Button>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" color="error">
                Danger Zone
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                sx={{ mt: 1 }}
              >
                Delete Account
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {tabIndex === 1 && (
        <ProjectsSection company={company} setCompany={setCompany} />
      )}
      {tabIndex === 2 && (
        <TeamMembersSection company={company} setCompany={setCompany} />
      )}

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={passwords.newPassword}
                onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setPasswordDialogOpen(false);
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
          }} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePasswordUpdate} color="primary" variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to permanently delete your account? This action cannot be undone, and all your data will be permanently deleted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePermanentDeleteAccount} color="error" variant="contained">
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CompanyUploadForm;