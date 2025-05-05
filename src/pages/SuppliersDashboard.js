import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Modal,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  Business as BusinessIcon,
  Logout as LogoutIcon,
  Payment as PaymentIcon,
  Notifications as NotificationsIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import MaterialsManagement from "../components/MaterialsManagement";
import ProfileSettings from "../components/ProfileSettings";
import CompanyUploadForm from "../components/CompanyUploadForm";
import CompanyOrdersPage from "../components/CompanyOrdersPage";
import Subscription from "../Company/Subscription";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const SuppliersDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const [remainingDays, setRemainingDays] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const storedCompanyName = sessionStorage.getItem("companyName");
        if (storedCompanyName) {
          setCompanyName(storedCompanyName);
        }

        const companyId = localStorage.getItem("company_id");
        if (!companyId) {
          setError("Company ID not found. Please log in again.");
          navigate("/login");
          return;
        }

        const numericCompanyId = parseInt(companyId, 10);
        if (isNaN(numericCompanyId)) {
          setError("Invalid company ID format. Please log in again.");
          navigate("/login");
          return;
        }

        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        }

        // Fetch company data
        const companyResponse = await API.get(`/company-registration/${numericCompanyId}/`);
        const companyData = companyResponse.data;
        setCompanyName(companyData.company_name);
        sessionStorage.setItem("companyName", companyData.company_name);

        // Fetch subscription data
        const subscriptionResponse = await API.get(`/subscription-status/${numericCompanyId}/`);
        const subData = subscriptionResponse.data;
        setSubscriptionData(subData);

        if (!subData.is_subscribed) {
          setOpenSubscriptionModal(true);
        } else {
          const endDate = new Date(subData.end_date);
          const today = new Date();
          const timeDiff = endDate - today;
          const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
          setRemainingDays(daysLeft > 0 ? daysLeft : 0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          if (error.response.status === 404) {
            setError("Company not found. Please check your company ID or log in again.");
            navigate("/login");
          } else if (error.response.status === 401 || error.response.status === 403) {
            setError("Unauthorized access. Please log in again.");
            navigate("/login");
          } else {
            setError("An error occurred while loading data. Please try again.");
          }
        } else {
          setError("No response from server. Please check your connection and try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, [navigate]);

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
          eventSource.onmessage = (event) => {
            
          };
    
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

  const handleMenuClick = (newIndex) => {
    setTabIndex(newIndex);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("company_id");
    sessionStorage.removeItem("companyName");
    delete API.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const handleOpenSubscriptionModal = () => {
    setOpenSubscriptionModal(true);
  };

  const handleCloseSubscriptionModal = () => {
    setOpenSubscriptionModal(false);
  };

  const handleNotificationClick = (event) => setNotificationAnchor(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchor(null);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#2196f3", zIndex: 1201 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Welcome, {companyName || "Guest"}</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
            {subscriptionData?.is_subscribed && (
              <Typography variant="body2" sx={{ mr: 2, color: "#fff" }}>
                Subscription: {remainingDays} days remaining
                <IconButton
                  color="inherit"
                  onClick={handleOpenSubscriptionModal}
                  sx={{ ml: 1 }}
                >
                  <PaymentIcon />
                </IconButton>
              </Typography>
            )}
            <Button
              color="inherit"
              sx={{ textTransform: "uppercase" }}
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {error && (
        <Alert severity="error" sx={{ m: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Box
          sx={{
            width: 240,
            backgroundColor: "#fff",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            flexShrink: 0,
          }}
        >
          <List>
            <ListItem button selected={tabIndex === 0} onClick={() => handleMenuClick(0)}>
              <ListItemIcon>
                <DashboardIcon color={tabIndex === 0 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button selected={tabIndex === 1} onClick={() => handleMenuClick(1)}>
              <ListItemIcon>
                <InventoryIcon color={tabIndex === 1 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Manage Materials" />
            </ListItem>
            <ListItem button selected={tabIndex === 2} onClick={() => handleMenuClick(2)}>
              <ListItemIcon>
                <SettingsIcon color={tabIndex === 2 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Profile Settings" />
            </ListItem>
            <ListItem button selected={tabIndex === 3} onClick={() => handleMenuClick(3)}>
              <ListItemIcon>
                <BusinessIcon color={tabIndex === 3 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Upload Company Details" />
            </ListItem>
            <ListItem button selected={tabIndex === 4} onClick={() => handleMenuClick(4)}>
              <ListItemIcon>
                <ShoppingCartIcon color={tabIndex === 4 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
          </List>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
            p: 2,
            position: "relative",
          }}
        >
          <Container sx={{ py: 3, maxWidth: "100% !important" }}>
            {tabIndex === 0 && (
              <Box>
                <Typography variant="h4" gutterBottom>
                  Suppliers Dashboard
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Welcome to the Suppliers Dashboard. Manage your materials and orders here.
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}>
                      <Typography color="textSecondary">Total Materials</Typography>
                      <Typography variant="h4" color="#2196f3" sx={{ mt: 1 }}>
                        8
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}>
                      <Typography color="textSecondary">Pending Orders</Typography>
                      <Typography variant="h4" sx={{ mt: 1, color: "#e91e63" }}>
                        3
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}>
                      <Typography color="textSecondary">Total Revenue</Typography>
                      <Typography variant="h4" sx={{ mt: 1 }}>
                        RS. 30,000
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Revenue and Orders Analytics
                  </Typography>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="body2">
                      Analytics data is currently unavailable.
                    </Typography>
                  </Paper>
                </Box>

                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Quick Actions
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<InventoryIcon />}
                        sx={{
                          backgroundColor: "#2196f3",
                          textTransform: "uppercase",
                          "&:hover": { backgroundColor: "#1976d2" },
                        }}
                        onClick={() => handleMenuClick(1)}
                      >
                        Manage Materials
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<BusinessIcon />}
                        sx={{
                          backgroundColor: "#2196f3",
                          textTransform: "uppercase",
                          "&:hover": { backgroundColor: "#1976d2" },
                        }}
                        onClick={() => handleMenuClick(3)}
                      >
                        Update Company Details
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                          backgroundColor: "#2196f3",
                          textTransform: "uppercase",
                          "&:hover": { backgroundColor: "#1976d2" },
                        }}
                        onClick={() => handleMenuClick(4)}
                      >
                        View Orders
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            )}

            {tabIndex === 1 && <MaterialsManagement />}
            {tabIndex === 2 && <ProfileSettings />}
            {tabIndex === 3 && <CompanyUploadForm />}
            {tabIndex === 4 && <CompanyOrdersPage />}
          </Container>
        </Box>

        {tabIndex === 0 && (
          <Box
            sx={{
              width: 300,
              backgroundColor: "#f0f0f0",
              borderLeft: "1px solid #ddd",
              p: 2,
              position: "sticky",
              right: 0,
              top: 64,
              bottom: 0,
              overflowY: "auto",
              zIndex: 1000,
              height: "calc(100vh - 64px)",
              boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
          </Box>
        )}
      </Box>

      {/* Subscription Modal */}
      <Modal
        open={openSubscriptionModal}
        onClose={handleCloseSubscriptionModal}
        aria-labelledby="subscription-modal-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ outline: "none" }}>
          <Subscription
            companyId={localStorage.getItem("company_id")}
            onLogout={handleLogout}
            remainingDays={remainingDays}
            onSubscribe={() => {
              handleCloseSubscriptionModal();
              window.location.reload();
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default SuppliersDashboard;