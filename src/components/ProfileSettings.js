import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Box,
  Grid,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    companyName: "",
    email: "",
    address: "",
  });
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [error, setError] = useState(null);

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

  const fetchProfileData = async (token) => {
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
        setProfile({
          companyName: companyData.company_name || "",
          email: companyData.company_email || "",
          address: companyData.location || "",
        });
      }
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthError();
      } else {
        setError("Failed to fetch profile details. Please try again.");
      }
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

      await fetchProfileData(accessToken);
    };

    fetchData();
  }, []);

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
      <Typography variant="h4" gutterBottom>
        Profile Settings
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Company Name"
            name="companyName"
            fullWidth
            margin="normal"
            value={profile.companyName}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={profile.email}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Location"
            name="address"
            fullWidth
            margin="normal"
            value={profile.address}
            disabled
          />
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

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

export default ProfileSettings;