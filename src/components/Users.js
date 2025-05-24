import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [companyFilter, setCompanyFilter] = useState(null); // null, true, false
  const navigate = useNavigate();

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      const response = await axios.post("http://localhost:8000/api/token/refresh/", {
        refresh: refreshToken,
      });
      localStorage.setItem("access_token", response.data.access);
      return response.data.access;
    } catch (error) {
      console.error("Token refresh failed:", error.response?.data || error.message);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/login");
      setSnackbar({
        open: true,
        message: "Session expired. Please log in again.",
        severity: "error",
      });
      throw error;
    }
  };

  const makeAuthenticatedRequest = async (method, url, data = null, retries = 1) => {
    let token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      throw new Error("No access token available");
    }

    try {
      const config = {
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(data && { "Content-Type": "application/json" }),
        },
        data,
      };
      return await axios(config);
    } catch (error) {
      if (error.response?.status === 401 && retries > 0) {
        try {
          const newToken = await refreshAccessToken();
          const retryConfig = {
            method,
            url,
            headers: {
              Authorization: `Bearer ${newToken}`,
              ...(data && { "Content-Type": "application/json" }),
            },
            data,
          };
          return await axios(retryConfig);
        } catch (refreshError) {
          throw new Error("Authentication failed: Unable to refresh token.");
        }
      }

      if (error.response?.status === 403) {
        throw new Error("You do not have permission to access this resource.");
      }

      throw error;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const baseUrl = "http://localhost:8000/api/users/";
        const params = new URLSearchParams({
          exclude_superuser: true,
          ...(companyFilter !== null && { company: companyFilter })
        });
        
        const response = await makeAuthenticatedRequest("get", `${baseUrl}?${params}`);
        setUsers(response.data.users || []);
      } catch (error) {
        console.error("Fetch users error:", error.message);
        setSnackbar({
          open: true,
          message: error.message.includes("permission") 
            ? "You need admin privileges to view users" 
            : `Failed to fetch users: ${error.message}`,
          severity: "error",
        });
      }
      setLoading(false);
    };

    fetchUsers();
  }, [companyFilter]);

  const handleUserAction = async (username, action) => {
    try {
      const response = await makeAuthenticatedRequest("post", "http://localhost:8000/api/users/", {
        username,
        action
      });

      if (action === "delete") {
        setUsers(prev => prev.filter(user => user.username !== username));
      } else if (action === "toggle_active") {
        setUsers(prev => prev.map(user => 
          user.username === username ? { ...user, is_active: !user.is_active } : user
        ));
      }

      setSnackbar({
        open: true,
        message: response.data.message || "Action completed successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Action failed: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleCompanyFilter = (event) => {
    setCompanyFilter(event.target.checked || null);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 4, bgcolor: "#f5f5f5" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#1976d2" }}>
          User Management
        </Typography>
        
        <FormControlLabel
          control={<Switch checked={companyFilter} onChange={handleCompanyFilter} />}
          label={companyFilter ? "Company Users" : "All Users"}
          sx={{ mb: 2 }}
        />

        {loading ? (
          <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
        ) : (
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead sx={{ bgcolor: "#1976d2" }}>
                <TableRow>
                  {["Username", "Email", "Active", "Company", "Actions"].map((header) => (
                    <TableCell key={header} sx={{ color: "white", fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.username} hover>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.is_active ? "Yes" : "No"}</TableCell>
                    <TableCell>{user.company_id ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        variant="contained"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          if (window.confirm(`Delete user ${user.username}?`)) {
                            handleUserAction(user.username, "delete");
                          }
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        color={user.is_active ? "warning" : "success"}
                        variant="contained"
                        size="small"
                        onClick={() => handleUserAction(user.username, "toggle_active")}
                      >
                        {user.is_active ? "Suspend" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Users;