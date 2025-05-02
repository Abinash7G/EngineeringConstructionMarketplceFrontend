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
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";

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
  const [period, setPeriod] = useState("monthly"); // Default to monthly view

  // State for Safety Training Form
  const [trainingFormData, setTrainingFormData] = useState({
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
        setTimeout(connectSSE, 5000); // Reconnect after 5 seconds
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

    // Basic validation
    if (
      !trainingFormData.languagePreference ||
      !trainingFormData.trainingDate ||
      !trainingFormData.trainingTime ||
      !trainingFormData.trainingAgreement
    ) {
      setTrainingFormError("Please fill all required fields and agree to the terms.");
      setTrainingFormLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No access token found. Please log in.");
      }

      const formDataToSend = new FormData();
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
        `/api/request-safety-training/${selectedTrainingCompany.id}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTrainingFormSuccess(response.data.message);
      setTrainingFormData({
        languagePreference: "",
        languagePreferenceOther: "",
        trainingDate: "",
        trainingTime: "",
        specificTrainingTime: "",
        trainingAgreement: false,
      });
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
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f9f9f9" }}>
      <Sidebar />
      <Box sx={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4">Admin Dashboard</Typography>
          <IconButton onClick={handleNotificationClick}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon sx={{ fontSize: 24 }} />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
            PaperProps={{ style: { maxHeight: 400, width: 350 } }}
          >
            {notifications.length === 0 ? (
              <MenuItem>No notifications</MenuItem>
            ) : (
              notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  onClick={() => handleMarkAsRead(notification.id)}
                  sx={{
                    backgroundColor: notification.is_read ? "inherit" : "#f5f5f5",
                    whiteSpace: "normal",
                    padding: "10px",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
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
          <Alert severity={alertMessage.type} sx={{ mb: 2 }}>
            {alertMessage.message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
          {[
            { title: "Total Users", value: totalUsers, icon: <FaUsers /> },
            { title: "Total Companies", value: totalCompanies, icon: <FaBuilding /> },
            {
              title: "Total Revenue",
              value: loadingRevenue ? (
                <CircularProgress size={20} />
              ) : totalRevenue !== null ? (
                `RS. ${totalRevenue.toFixed(2)}`
              ) : (
                "N/A"
              ),
              icon: <FaChartBar />,
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {item.icon}
                  <Box>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="h4" color="primary">
                      {item.value}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Analytics Charts */}
        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="h5">Analytics</Typography>
          <Chart analyticsData={analyticsData} period={period} setPeriod={setPeriod} />
        </Box>

        {/* Company Management Table */}
        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="h5">Company Management</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>{company.id}</TableCell>
                    <TableCell>{company.company_name}</TableCell>
                    <TableCell>{company.company_email}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => navigate(`/view-company-details/${company.id}`)}
                        sx={{ marginRight: "10px" }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => approveCompany(company.id)}
                        sx={{ marginRight: "10px" }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => rejectCompany(company.id)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Safety Training Requests Table */}
        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="h5">Safety Training Requests</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Request Training</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {safetyCompanies.length > 0 ? (
                  safetyCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>{company.id}</TableCell>
                      <TableCell>{company.company_name}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenTrainingDialog(company)}
                        >
                          Request Training
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography variant="body1" sx={{ color: "#374151", fontStyle: "italic" }}>
                        No companies offering Safety and Training Services found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Feedback and Disputes Section */}
        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="h5">Feedback & Disputes</Typography>
          {companies.map((company) => (
            <Box
              key={company.id}
              sx={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: 1,
                marginBottom: "10px",
              }}
            >
              <Typography variant="h6">{company.company_name}</Typography>
              <Typography variant="body1">No disputes reported.</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Company Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Company Registration Details</DialogTitle>
        <DialogContent>
          {selectedCompany ? (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body1">
                <strong>Name:</strong> {selectedCompany.company_name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedCompany.company_email}
              </Typography>
              <Typography variant="body1">
                <strong>Location:</strong> {selectedCompany.location}
              </Typography>
              <Typography variant="body1">
                <strong>Registration ID:</strong> {selectedCompany.company_registration_id}
              </Typography>
              {selectedCompany.registration_date && (
                <Typography variant="body1">
                  <strong>Registration Date:</strong> {selectedCompany.registration_date}
                </Typography>
              )}
              {selectedCompany.registration_status && (
                <Typography variant="body1">
                  <strong>Status:</strong> {selectedCompany.registration_status}
                </Typography>
              )}
              <Typography variant="body1">
                <strong>Services Provided:</strong>{" "}
                {selectedCompany.services_provided.join(", ")}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1">No details available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Safety Training Request Dialog */}
      <Dialog open={openTrainingDialog} onClose={handleCloseTrainingDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Request Safety Training for {selectedTrainingCompany?.company_name}
        </DialogTitle>
        <DialogContent>
          {trainingFormError && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setTrainingFormError("")}>
              {trainingFormError}
            </Alert>
          )}
          {trainingFormSuccess && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setTrainingFormSuccess("")}>
              {trainingFormSuccess}
            </Alert>
          )}
          <form onSubmit={handleTrainingSubmit}>
            <SafetyTrainingForm
              formData={trainingFormData}
              onInputChange={handleTrainingInputChange}
              onCheckboxChange={handleTrainingCheckboxChange}
              subService="Safety and Training Services"
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseTrainingDialog}
                disabled={trainingFormLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={trainingFormLoading}
              >
                {trainingFormLoading ? "Submitting..." : "Submit Request"}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;