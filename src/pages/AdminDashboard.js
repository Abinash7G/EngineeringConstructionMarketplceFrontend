import React, { useState, useEffect } from "react";
import API from "../services/api";
import { FaUsers, FaChartBar, FaBuilding } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import SafetyTrainingForm from "../components/SafetyTrainingForm"; 
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableBody,
  Alert,
  CircularProgress,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Chip,
  TextField,
} from "@mui/material";
import { Notifications as NotificationsIcon, Close as CloseIcon } from "@mui/icons-material";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // State variables
  const [companies, setCompanies] = useState([]);
  const [safetyCompanies, setSafetyCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openTrainingDialog, setOpenTrainingDialog] = useState(false);
  const [selectedTrainingCompany, setSelectedTrainingCompany] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loadingRevenue, setLoadingRevenue] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [period, setPeriod] = useState("monthly");

  // State for Safety Training Form (Updated to include all fields)
  const [trainingFormData, setTrainingFormData] = useState({
    fullName: "",
    location: "",
    email: "",
    phoneNumber: "",
    category: "Safety and Training Services", // Fixed value
    subService: "Safety and Training Services", // Fixed value
    languagePreference: "",
    languagePreferenceOther: "",
    trainingDate: "",
    trainingTime: "",
    specificTrainingTime: "",
    trainingAgreement: false,
  });
  const [trainingFormError, setTrainingFormError] = useState("");
  const [trainingFormSuccess, setTrainingFormSuccess] = useState("");
  const [trainingFormLoading, setTrainingFormLoading] = useState(false);

  // Auto-dismiss alerts after 2 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  // Auto-dismiss training form success/error messages after 3 seconds
  useEffect(() => {
    if (trainingFormSuccess || trainingFormError) {
      const timer = setTimeout(() => {
        setTrainingFormSuccess("");
        setTrainingFormError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [trainingFormSuccess, trainingFormError]);

  // Fetch dashboard stats
  useEffect(() => {
    API.get("/dashboard-stats/")
      .then((response) => {
        setTotalUsers(response.data.total_users);
        setTotalCompanies(response.data.total_approved_companies);
      })
      .catch((err) => {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load dashboard stats");
      });
  }, []);

  // Fetch total revenue
  useEffect(() => {
    API.get("/api/total-revenue/")
      .then((response) => {
        setTotalRevenue(response.data.total_revenue);
        setLoadingRevenue(false);
      })
      .catch((err) => {
        console.error("Error fetching total revenue:", err);
        setError("Failed to load total revenue");
        setLoadingRevenue(false);
      });
  }, []);

  // Fetch subscription analytics based on period
  useEffect(() => {
    API.get(`/api/subscription-analytics/?period=${period}`)
      .then((response) => {
        setAnalyticsData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching subscription analytics:", err);
        setError("Failed to load analytics");
      });
  }, [period]);

  // Fetch companies for company management
  useEffect(() => {
    API.get("/company-registration-list/")
      .then((response) => {
        const allCompanies = response.data;
        const unapprovedCompanies = allCompanies.filter(
          (company) => !company.is_approved && !company.is_rejected
        );
        setCompanies(unapprovedCompanies);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
        setError("Failed to load companies");
      });
  }, []);

  // Fetch companies offering Safety and Training Services
  useEffect(() => {
    API.get("/api/safety-training-companies/")
      .then((response) => {
        setSafetyCompanies(response.data);
      })
      .catch((err) => {
        console.error("Error fetching safety training companies:", err);
        setError("Failed to load safety training companies");
        setSafetyCompanies([]);
      });
  }, []);

  // SSE for notifications
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please log in to receive notifications");
      return;
    }

    let eventSource;
    const connectSSE = () => {
      eventSource = new EventSource(`http://127.0.0.1:8000/api/sse/notifications/?token=${token}`);
      eventSource.addEventListener('notification', (event) => {
        try {
          const newNotification = JSON.parse(event.data);
          setNotifications((prev) => [newNotification, ...prev]);
          if (!newNotification.is_read) {
            setUnreadCount((prev) => prev + 1);
          }
        } catch (err) {
          console.error("Error parsing SSE message:", err);
        }
      });

      eventSource.onmessage = (event) => {};

      eventSource.onerror = () => {
        console.log("SSE error, reconnecting...");
        eventSource.close();
        setTimeout(connectSSE, 5000);
      };
    };

    connectSSE();

    return () => eventSource.close();
  }, []);

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await API.post(
        "/api/notifications/mark_read/",
        { notification_id: notificationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.status === "success") {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, is_read: true } : notif
          )
        );
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      setError("Failed to mark notification as read");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
  };

  const approveCompany = (id) => {
    API.post(`/api/company/approve/${id}/`)
      .then(() => {
        setCompanies(companies.filter((company) => company.id !== id));
        setTotalCompanies(totalCompanies + 1);
        setAlertMessage({ type: "success", message: `Company with ID: ${id} approved successfully!` });
      })
      .catch((err) => {
        console.error("Error approving company:", err);
        setAlertMessage({ type: "error", message: "Error approving company" });
      });
  };

  const rejectCompany = (id) => {
    API.post(`/api/company/reject/${id}/`)
      .then(() => {
        setCompanies(companies.filter((company) => company.id !== id));
        setAlertMessage({ type: "success", message: `Company with ID: ${id} rejected successfully!` });
      })
      .catch((err) => {
        console.error("Error rejecting company:", err);
        setAlertMessage({ type: "error", message: "Error rejecting company" });
      });
  };

  const handleNotificationClick = (event) => setNotificationAnchor(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchor(null);

  // Safety Training Form Handlers
  const handleTrainingInputChange = (e) => {
    const { name, value } = e.target;
    setTrainingFormData({ ...trainingFormData, [name]: value || "" });
  };

  const handleTrainingCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTrainingFormData({ ...trainingFormData, [name]: checked });
  };

  const handleOpenTrainingDialog = (company) => {
    setSelectedTrainingCompany(company);
    setOpenTrainingDialog(true);
    setTrainingFormData({
      fullName: "",
      location: "",
      email: "",
      phoneNumber: "",
      category: "Safety and Training Services", // Fixed value
      subService: "Safety and Training Services", // Fixed value
      languagePreference: "",
      languagePreferenceOther: "",
      trainingDate: "",
      trainingTime: "",
      specificTrainingTime: "",
      trainingAgreement: false,
    });
    setTrainingFormError("");
    setTrainingFormSuccess("");
  };

  const handleCloseTrainingDialog = () => {
    setOpenTrainingDialog(false);
    setSelectedTrainingCompany(null);
    setTrainingFormError("");
    setTrainingFormSuccess("");
  };

  const handleTrainingSubmit = async (e) => {
    e.preventDefault();
    setTrainingFormLoading(true);
    setTrainingFormError("");
    setTrainingFormSuccess("");

    // Validation for all required fields
    if (
      !trainingFormData.fullName ||
      !trainingFormData.location ||
      !trainingFormData.email ||
      !trainingFormData.phoneNumber ||
      !trainingFormData.languagePreference ||
      !trainingFormData.trainingDate ||
      !trainingFormData.trainingTime ||
      !trainingFormData.trainingAgreement
    ) {
      setTrainingFormError("Please fill all required fields and agree to the terms.");
      setTrainingFormLoading(false);
      return;
    }

    if (trainingFormData.languagePreference === "Other" && !trainingFormData.languagePreferenceOther) {
      setTrainingFormError("Please specify the language if 'Other' is selected.");
      setTrainingFormLoading(false);
      return;
    }

    if (trainingFormData.trainingTime === "Specific Time" && !trainingFormData.specificTrainingTime) {
      setTrainingFormError("Please specify the time if 'Specific Time' is selected.");
      setTrainingFormLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No access token found. Please log in.");
      }

      const formDataToSend = new FormData();
      // Common fields
      formDataToSend.append("full_name", trainingFormData.fullName);
      formDataToSend.append("location", trainingFormData.location);
      formDataToSend.append("email", trainingFormData.email);
      formDataToSend.append("phone_number", trainingFormData.phoneNumber);
      formDataToSend.append("category", trainingFormData.category);
      formDataToSend.append("sub_service", trainingFormData.subService);
      // Safety training fields
      formDataToSend.append(
        "language_preference",
        trainingFormData.languagePreference === "Other"
          ? trainingFormData.languagePreferenceOther
          : trainingFormData.languagePreference
      );
      formDataToSend.append("training_date", trainingFormData.trainingDate);
      formDataToSend.append(
        "training_time",
        trainingFormData.trainingTime === "Specific Time"
          ? trainingFormData.specificTrainingTime
          : trainingFormData.trainingTime
      );
      formDataToSend.append("training_agreement", trainingFormData.trainingAgreement ? "True" : "False");

      const response = await API.post(
        `/api/submit-inquiry/${selectedTrainingCompany.id}/`, // Use the same endpoint as CDConsultingInquiryForm.js
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTrainingFormSuccess(response.data.message || "Training request submitted successfully!");
      setTrainingFormData({
        fullName: "",
        location: "",
        email: "",
        phoneNumber: "",
        category: "Safety and Training Services",
        subService: "Workplace Safety Training Modules",
        languagePreference: "",
        languagePreferenceOther: "",
        trainingDate: "",
        trainingTime: "",
        specificTrainingTime: "",
        trainingAgreement: false,
      });

      // Close the dialog after successful submission
      setTimeout(() => {
        handleCloseTrainingDialog();
      }, 3000);
    } catch (error) {
      console.error("Error submitting safety training request:", error);
      setTrainingFormError(
        error.response?.data?.error || "Failed to submit training request. Please try again."
      );
    } finally {
      setTrainingFormLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <Sidebar />
      <Box sx={{ flex: 1, overflowY: "auto", padding: { xs: 2, md: 4 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a73e8" }}>
            Admin Dashboard
          </Typography>
          <IconButton onClick={handleNotificationClick} sx={{ "&:hover": { bgcolor: "#e0e0e0" } }}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon sx={{ fontSize: 28, color: "#1a73e8" }} />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
            PaperProps={{ style: { maxHeight: 400, width: 350, borderRadius: 8, boxShadow: 3 } }}
          >
            {notifications.length === 0 ? (
              <MenuItem sx={{ justifyContent: "center", color: "#757575" }}>
                No notifications
              </MenuItem>
            ) : (
              notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  onClick={() => handleMarkAsRead(notification.id)}
                  sx={{
                    backgroundColor: notification.is_read ? "inherit" : "#e3f2fd",
                    whiteSpace: "normal",
                    padding: "12px 16px",
                    "&:hover": { backgroundColor: "#bbdefb" },
                    transition: "background-color 0.3s",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        color: notification.is_read ? "#757575" : "#1a73e8",
                      }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#9e9e9e", mt: 0.5 }}>
                      {new Date(notification.created_at).toLocaleString()}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            )}
          </Menu>
        </Box>

        {/* Alerts */}
        {alertMessage && (
          <Alert severity={alertMessage.type} sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            {alertMessage.message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ marginBottom: "30px" }}>
          {[
            { title: "Total Users", value: totalUsers, icon: <FaUsers size={24} /> },
            { title: "Total Companies", value: totalCompanies, icon: <FaBuilding size={24} /> },
            {
              title: "Total Revenue",
              value: loadingRevenue ? (
                <CircularProgress size={20} color="primary" />
              ) : totalRevenue !== null ? (
                `Rs. ${totalRevenue.toFixed(2)}`
              ) : (
                "N/A"
              ),
              icon: <FaChartBar size={24} />,
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" },
                  bgcolor: "#ffffff",
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center", gap: "15px", padding: "20px" }}>
                  <Box sx={{ color: "#1a73e8" }}>{item.icon}</Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: "#757575", fontWeight: 500 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="h4" sx={{ color: "#1a73e8", fontWeight: 700 }}>
                      {item.value}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Analytics Charts */}
        <Box sx={{ marginBottom: "30px" }}>
          <Typography variant="h5" sx={{ mb: 2, color: "#1a73e8", fontWeight: 600 }}>
            Analytics
          </Typography>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#ffffff", p: 3 }}>
            <Chart analyticsData={analyticsData} period={period} setPeriod={setPeriod} />
          </Card>
        </Box>

        {/* Company Management Table */}
        <Box sx={{ marginBottom: "30px" }}>
          <Typography variant="h5" sx={{ mb: 2, color: "#1a73e8", fontWeight: 600 }}>
            Company Management
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#1a73e8" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.length > 0 ? (
                  companies.map((company) => (
                    <TableRow key={company.id} sx={{ "&:hover": { bgcolor: "#e3f2fd" }, transition: "background-color 0.3s" }}>
                      <TableCell>{company.id}</TableCell>
                      <TableCell sx={{ color: "#424242", fontWeight: 500 }}>{company.company_name}</TableCell>
                      <TableCell sx={{ color: "#424242" }}>{company.company_email}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => navigate(`/view-company-details/${company.id}`)}
                          sx={{
                            marginRight: "10px",
                            borderRadius: 2,
                            textTransform: "none",
                            bgcolor: "#0288d1",
                            "&:hover": { bgcolor: "#0277bd" },
                          }}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => approveCompany(company.id)}
                          sx={{
                            marginRight: "10px",
                            borderRadius: 2,
                            textTransform: "none",
                            bgcolor: "#2e7d32",
                            "&:hover": { bgcolor: "#1b5e20" },
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => rejectCompany(company.id)}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            bgcolor: "#d32f2f",
                            "&:hover": { bgcolor: "#b71c1c" },
                          }}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="body1" sx={{ color: "#757575", fontStyle: "italic", py: 2 }}>
                        No companies pending approval.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Safety Training Requests Table */}
        <Box sx={{ marginBottom: "30px" }}>
          <Typography variant="h5" sx={{ mb: 2, color: "#1a73e8", fontWeight: 600 }}>
            Safety Training Requests
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#1a73e8" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Company</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Request Training</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {safetyCompanies.length > 0 ? (
                  safetyCompanies.map((company) => (
                    <TableRow key={company.id} sx={{ "&:hover": { bgcolor: "#e3f2fd" }, transition: "background-color 0.3s" }}>
                      <TableCell>{company.id}</TableCell>
                      <TableCell sx={{ color: "#424242", fontWeight: 500 }}>{company.company_name}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenTrainingDialog(company)}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            bgcolor: "#1a73e8",
                            "&:hover": { bgcolor: "#1565c0" },
                          }}
                        >
                          Request Training
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography variant="body1" sx={{ color: "#757575", fontStyle: "italic", py: 2 }}>
                        No companies offering Safety and Training Services found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Company Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, boxShadow: 6 } }}>
        <DialogTitle sx={{ bgcolor: "#1a73e8", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Company Registration Details
          <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#f4f6f8", p: 3 }}>
          {selectedCompany ? (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Name:</strong> {selectedCompany.company_name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {selectedCompany.company_email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Location:</strong> {selectedCompany.location}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Registration ID:</strong> {selectedCompany.company_registration_id}
              </Typography>
              {selectedCompany.registration_date && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Registration Date:</strong> {selectedCompany.registration_date}
                </Typography>
              )}
              {selectedCompany.registration_status && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Status:</strong> <Chip label={selectedCompany.registration_status} color={selectedCompany.registration_status === "Approved" ? "success" : "error"} size="small" />
                </Typography>
              )}
              <Typography variant="body1">
                <strong>Services Provided:</strong> {selectedCompany.services_provided.join(", ")}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ color: "#757575", fontStyle: "italic" }}>
              No details available.
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            sx={{ borderRadius: 2, textTransform: "none", px: 3 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Safety Training Request Modal */}
      <Dialog open={openTrainingDialog} onClose={handleCloseTrainingDialog} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3, boxShadow: 6 } }}>
        <DialogTitle sx={{ bgcolor: "#1a73e8", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Request Safety Training for {selectedTrainingCompany?.company_name}
          <IconButton onClick={handleCloseTrainingDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#f4f6f8", p: 3 }}>
          {trainingFormError && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }} onClose={() => setTrainingFormError("")}>
              {trainingFormError}
            </Alert>
          )}
          {trainingFormSuccess && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }} onClose={() => setTrainingFormSuccess("")}>
              {trainingFormSuccess}
            </Alert>
          )}
          <form onSubmit={handleTrainingSubmit}>
            <Grid container spacing={2}>
              {/* Common Fields */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 2, color: "#1a73e8", fontWeight: "bold" }}>
                  Requester Details
                </Typography>
                <Divider sx={{ mb: 3, borderColor: "#e0e0e0" }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name *"
                  fullWidth
                  name="fullName"
                  value={trainingFormData.fullName}
                  onChange={handleTrainingInputChange}
                  required
                  variant="outlined"
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#1a73e8" },
                      "&.Mui-focused fieldset": { borderColor: "#1a73e8" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location *"
                  fullWidth
                  name="location"
                  value={trainingFormData.location}
                  onChange={handleTrainingInputChange}
                  required
                  variant="outlined"
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#1a73e8" },
                      "&.Mui-focused fieldset": { borderColor: "#1a73e8" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email *"
                  fullWidth
                  name="email"
                  value={trainingFormData.email}
                  onChange={handleTrainingInputChange}
                  required
                  type="email"
                  variant="outlined"
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#1a73e8" },
                      "&.Mui-focused fieldset": { borderColor: "#1a73e8" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number *"
                  fullWidth
                  name="phoneNumber"
                  value={trainingFormData.phoneNumber}
                  onChange={handleTrainingInputChange}
                  required
                  variant="outlined"
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#1a73e8" },
                      "&.Mui-focused fieldset": { borderColor: "#1a73e8" },
                    },
                  }}
                />
              </Grid>

              {/* Safety Training Fields */}
              <SafetyTrainingForm
                formData={trainingFormData}
                onInputChange={handleTrainingInputChange}
                onCheckboxChange={handleTrainingCheckboxChange}
                subService="Safety and Training Services"
              />

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCloseTrainingDialog}
                    disabled={trainingFormLoading}
                    sx={{ borderRadius: 2, textTransform: "none", px: 3 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={trainingFormLoading}
                    sx={{ borderRadius: 2, textTransform: "none", px: 3, bgcolor: "#1a73e8", "&:hover": { bgcolor: "#1565c0" } }}
                  >
                    {trainingFormLoading ? "Submitting..." : "Submit Request"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;