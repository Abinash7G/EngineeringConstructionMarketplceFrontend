import React, { useState, useEffect } from "react";
import API from "../services/api";
import { FaUsers, FaChartBar, FaBuilding } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
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
} from "@mui/material";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // State variables
  const [companies, setCompanies] = useState([]);
  const [safetyCompanies, setSafetyCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loadingRevenue, setLoadingRevenue] = useState(true);
  const [error, setError] = useState(null);

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

  // Fetch subscription analytics
  useEffect(() => {
    API.get("/api/subscription-analytics/")
      .then((response) => {
        setAnalyticsData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching subscription analytics:", err);
        setError("Failed to load analytics");
      });
  }, []);

  // Fetch companies
  useEffect(() => {
    API.get("/company-registration-list/")
      .then((response) => {
        const allCompanies = response.data;
        const unapprovedCompanies = allCompanies.filter(
          (company) => !company.is_approved && !company.is_rejected
        );
        const filteredSafetyCompanies = allCompanies.filter(
          (company) => company.is_approved && company.services_provided.includes(5)
        );
        setCompanies(unapprovedCompanies);
        setSafetyCompanies(filteredSafetyCompanies);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
        setError("Failed to load companies");
      });
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
  };

  const approveCompany = (id) => {
    API.post(`/approve-company/${id}/`)
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
    API.post(`/reject-company/${id}/`)
      .then(() => {
        setCompanies(companies.filter((company) => company.id !== id));
        setAlertMessage({ type: "success", message: `Company with ID: ${id} rejected successfully!` });
      })
      .catch((err) => {
        console.error("Error rejecting company:", err);
        setAlertMessage({ type: "error", message: "Error rejecting company" });
      });
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f9f9f9" }}>
      <Sidebar />
      <Box sx={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Admin Dashboard
        </Typography>

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
          <Chart analyticsData={analyticsData} />
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
                {safetyCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>{company.id}</TableCell>
                    <TableCell>{company.company_name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          setAlertMessage({
                            type: "success",
                            message: `Requested training for ${company.company_name}`,
                          })
                        }
                      >
                        Request Training
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
    </Box>
  );
};

export default AdminDashboard;