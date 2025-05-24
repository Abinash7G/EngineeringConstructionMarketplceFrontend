
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
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  ShoppingCart as ShoppingCartIcon,
  Logout as LogoutIcon,
  Payment as PaymentIcon,
  Notifications as NotificationsIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import MaterialsManagement from "../components/MaterialsManagement";
import ProfileSettings from "../components/ProfileSettings";
import CompanyOrdersPage from "../components/CompanyordersPage";
import Subscription from "../Company/Subscription";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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
  const [revenueAnalytics, setRevenueAnalytics] = useState([]);
  const [topPurchasedItems, setTopPurchasedItems] = useState([]);
  const [totalMaterials, setTotalMaterials] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [deliveredItems, setDeliveredItems] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [timeRange, setTimeRange] = useState("1m");
  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const storedCompanyName = sessionStorage.getItem("companyName");
        if (storedCompanyName) {
          setCompanyName(storedCompanyName);
          console.log("Stored Company Name:", storedCompanyName);
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
        if (!accessToken) {
          setError("Access token not found. Please log in again.");
          navigate("/login");
          return;
        }

        API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        console.log("Access Token:", accessToken);

        console.log("Fetching company data for ID:", numericCompanyId);
        const companyResponse = await API.get(`/company-registration/${numericCompanyId}/`);
        console.log("Company Response:", companyResponse.data);
        const companyData = companyResponse.data;
        setCompanyName(companyData.company_name);
        sessionStorage.setItem("companyName", companyData.company_name);

        console.log("Fetching subscription data...");
        const subscriptionResponse = await API.get(`/subscription-status/${numericCompanyId}/`);
        console.log("Subscription Response:", subscriptionResponse.data);
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

        console.log("Fetching company dashboard stats...");
        const statsResponse = await API.get(`/api/company-dashboard-stats/`);
        console.log("Dashboard Stats Response:", statsResponse.data);
        setTotalMaterials(statsResponse.data.total_materials);
        setPendingOrders(statsResponse.data.pending_orders);
        setDeliveredItems(statsResponse.data.delivered_items);
        setTotalRevenue(statsResponse.data.total_revenue);

        console.log("Delivered Items Count:", statsResponse.data.delivered_items);

        console.log(`Fetching revenue analytics for time_range=${timeRange}...`);
        const revenueAnalyticsResponse = await API.get(`/api/revenue-analytics/?time_range=${timeRange}`);
        console.log("Revenue Analytics Response:", revenueAnalyticsResponse.data);
        setRevenueAnalytics(revenueAnalyticsResponse.data);

        console.log(`Fetching top purchased items for time_range=${timeRange}...`);
        const topPurchasedItemsResponse = await API.get(`/api/top-purchased-items/?time_range=${timeRange}`);
        console.log("Top Purchased Items Response:", topPurchasedItemsResponse.data);
        setTopPurchasedItems(topPurchasedItemsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        let errorMessage = "An error occurred while loading data. Please try again.";
        if (error.response) {
          console.error("Error Response:", error.response.data, "Status:", error.response.status);
          if (error.response.status === 404) {
            errorMessage = "Company not found. Please check your company ID or log in again.";
            navigate("/login");
          } else if (error.response.status === 401 || error.response.status === 403) {
            errorMessage = "Unauthorized access. Please log in again.";
            navigate("/login");
          } else {
            errorMessage = error.response.data.error || errorMessage;
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
          errorMessage = "No response from server. Please check your connection and try again.";
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, [navigate, timeRange]);

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

  const getLabelKey = () => {
    if (timeRange === '1w') return 'week';
    if (timeRange === '1y') return 'year';
    return 'month';
  };

  const revenueChartData = {
    labels: revenueAnalytics.map((data) => data[getLabelKey()]),
    datasets: [
      {
        label: "Revenue (Rs.)",
        data: revenueAnalytics.map((data) => data.total_revenue),
        backgroundColor: "rgba(25, 118, 210, 0.6)",
        borderColor: "#1976d2",
        borderWidth: 1,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { font: { size: 14 }, padding: 20 } },
      title: { display: true, text: "Revenue Over Time", font: { size: 16 }, padding: { top: 10, bottom: 20 } },
      tooltip: {
        callbacks: {
          label: (context) => `Rs. ${context.parsed.y.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Revenue (Rs.)", font: { size: 14 } },
        grid: { color: "#e0e0e0" },
        ticks: {
          callback: (value) => `Rs. ${value.toLocaleString('en-IN')}`,
          font: { size: 12 },
        },
      },
      x: {
        title: {
          display: true,
          text: timeRange === '1w' ? 'Day' : timeRange === '1y' ? 'Year' : 'Month',
          font: { size: 14 },
        },
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
    },
    elements: {
      bar: { borderWidth: 1, barThickness: 30 },
    },
  };

  const pieChartData = {
    labels: topPurchasedItems.map((item) => item.product_name),
    datasets: [
      {
        label: "Quantity Purchased",
        data: topPurchasedItems.map((item) => item.total_quantity),
        backgroundColor: ["#42a5f5", "#66bb6a", "#ffca28", "#ef5350", "#ab47bc", "#26c6da"],
        borderColor: ["#1976d2", "#388e3c", "#ffb300", "#d32f2f", "#7b1fa2", "#00acc1"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 14 }, padding: 20, boxWidth: 20 },
      },
      title: {
        display: true,
        text: "Top Purchased Items",
        font: { size: 16 },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const item = topPurchasedItems[index];
            return `${item.product_name} (${item.category}): ${item.total_quantity} units`;
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#f4f6f8" }}>
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: 3, zIndex: 1201 }}>
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#ffffff" }}>
            Welcome, {companyName || "Guest"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={handleNotificationClick} sx={{ "&:hover": { bgcolor: "#1565c0" } }}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon sx={{ color: "#ffffff", fontSize: 28 }} />
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
                          color: notification.is_read ? "#757575" : "#1976d2",
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
            {subscriptionData?.is_subscribed && (
              <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#1565c0", borderRadius: 2, px: 2, py: 0.5 }}>
                <Typography variant="body2" sx={{ color: "#ffffff", mr: 1 }}>
                  Subscription: {remainingDays} days remaining
                </Typography>
                <IconButton
                  color="inherit"
                  onClick={handleOpenSubscriptionModal}
                  sx={{ color: "#ffffff" }}
                >
                  <PaymentIcon />
                </IconButton>
              </Box>
            )}
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                borderRadius: 2,
                bgcolor: "#d32f2f",
                "&:hover": { bgcolor: "#b71c1c" },
                px: 2,
                color: "#ffffff",
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ m: 2, borderRadius: 2, boxShadow: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: 240,
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e0e0e0",
            overflowY: "auto",
            flexShrink: 0,
            boxShadow: 2,
          }}
        >
          <List>
            <ListItem button selected={tabIndex === 0} onClick={() => handleMenuClick(0)} sx={{ py: 1.5, "&:hover": { bgcolor: "#e3f2fd" } }}>
              <ListItemIcon>
                <DashboardIcon color={tabIndex === 0 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ "& .MuiTypography-root": { fontWeight: tabIndex === 0 ? 600 : 400, color: tabIndex === 0 ? "#1976d2" : "#424242" } }} />
            </ListItem>
            <ListItem button selected={tabIndex === 1} onClick={() => handleMenuClick(1)} sx={{ py: 1.5, "&:hover": { bgcolor: "#e3f2fd" } }}>
              <ListItemIcon>
                <InventoryIcon color={tabIndex === 1 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Manage Materials" sx={{ "& .MuiTypography-root": { fontWeight: tabIndex === 1 ? 600 : 400, color: tabIndex === 1 ? "#1976d2" : "#424242" } }} />
            </ListItem>
            <ListItem button selected={tabIndex === 2} onClick={() => handleMenuClick(2)} sx={{ py: 1.5, "&:hover": { bgcolor: "#e3f2fd" } }}>
              <ListItemIcon>
                <SettingsIcon color={tabIndex === 2 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Profile Settings" sx={{ "& .MuiTypography-root": { fontWeight: tabIndex === 2 ? 600 : 400, color: tabIndex === 2 ? "#1976d2" : "#424242" } }} />
            </ListItem>
            <ListItem button selected={tabIndex === 3} onClick={() => handleMenuClick(3)} sx={{ py: 1.5, "&:hover": { bgcolor: "#e3f2fd" } }}>
              <ListItemIcon>
                <ShoppingCartIcon color={tabIndex === 3 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Orders" sx={{ "& .MuiTypography-root": { fontWeight: tabIndex === 3 ? 600 : 400, color: tabIndex === 3 ? "#1976d2" : "#424242" } }} />
            </ListItem>
          </List>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "#f4f6f8",
            p: { xs: 2, md: 3 },
            position: "relative",
          }}
        >
          <Container sx={{ py: 3, maxWidth: "100% !important" }}>
            {tabIndex === 0 && (
              <Box>
                {/* Overview Cards */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.2s",
                        "&:hover": { transform: "scale(1.02)" },
                        bgcolor: "#ffffff",
                      }}
                    >
                      <Typography sx={{ color: "#757575", fontWeight: 500, mb: 1 }}>
                        Total Materials
                      </Typography>
                      <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: 700 }}>
                        {totalMaterials}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.2s",
                        "&:hover": { transform: "scale(1.02)" },
                        bgcolor: "#ffffff",
                      }}
                    >
                      <Typography sx={{ color: "#757575", fontWeight: 500, mb: 1 }}>
                        Pending Orders
                      </Typography>
                      <Typography variant="h4" sx={{ color: "#ef5350", fontWeight: 700 }}>
                        {pendingOrders}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.2s",
                        "&:hover": { transform: "scale(1.02)" },
                        bgcolor: "#ffffff",
                      }}
                    >
                      <Typography sx={{ color: "#757575", fontWeight: 500, mb: 1 }}>
                        Delivered Items
                      </Typography>
                      <Typography variant="h4" sx={{ color: "#66bb6a", fontWeight: 700 }}>
                        {deliveredItems}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.2s",
                        "&:hover": { transform: "scale(1.02)" },
                        bgcolor: "#ffffff",
                      }}
                    >
                      <Typography sx={{ color: "#757575", fontWeight: 500, mb: 1 }}>
                        Total Revenue
                      </Typography>
                      <Typography variant="h4" sx={{ color: "#388e3c", fontWeight: 700 }}>
                        Rs. {totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Analytics Section */}
                <Box mt={4}>
                  <Typography variant="h6" sx={{ mb: 2, color: "#1976d2", fontWeight: 600 }}>
                    Sales Analytics
                  </Typography>
                  <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, bgcolor: "#ffffff" }}>
                    <Box mb={2} display="flex" justifyContent="flex-start">
                      <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Time Range</InputLabel>
                        <Select
                          value={timeRange}
                          onChange={(e) => setTimeRange(e.target.value)}
                          label="Time Range"
                          sx={{ borderRadius: 2, ".MuiSelect-select": { py: 1 } }}
                        >
                          <MenuItem value="1w">Last Week</MenuItem>
                          <MenuItem value="1m">Last Month</MenuItem>
                          <MenuItem value="6m">Last 6 Months</MenuItem>
                          <MenuItem value="1y">Last Year</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ mb: 2, color: "#424242", fontWeight: 500 }}>
                          Revenue Histogram
                        </Typography>
                        {revenueAnalytics.length > 0 ? (
                          <Box sx={{ height: 300, bgcolor: "#fafafa", borderRadius: 2, p: 2 }}>
                            <Bar data={revenueChartData} options={revenueChartOptions} />
                          </Box>
                        ) : (
                          <Typography variant="body2" sx={{ color: "#757575", fontStyle: "italic", py: 2, textAlign: "center" }}>
                            No revenue data available. Please check your data or try a different time range.
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ mb: 2, color: "#424242", fontWeight: 500 }}>
                          Top Purchased Items
                        </Typography>
                        {topPurchasedItems.length > 0 ? (
                          <Box sx={{ height: 300, bgcolor: "#fafafa", borderRadius: 2, p: 2 }}>
                            <Pie data={pieChartData} options={pieChartOptions} />
                          </Box>
                        ) : (
                          <Typography variant="body2" sx={{ color: "#757575", fontStyle: "italic", py: 2, textAlign: "center" }}>
                            No purchased items data available. Please check your data or try a different time range.
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>

                {/* Quick Actions */}
                <Box mt={4}>
                  <Typography variant="h6" sx={{ mb: 2, color: "#1976d2", fontWeight: 600 }}>
                    Quick Actions
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<InventoryIcon />}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          bgcolor: "#1976d2",
                          "&:hover": { bgcolor: "#1565c0" },
                          py: 1.5,
                          fontWeight: 500,
                        }}
                        onClick={() => handleMenuClick(1)}
                      >
                        Manage Materials
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          bgcolor: "#1976d2",
                          "&:hover": { bgcolor: "#1565c0" },
                          py: 1.5,
                          fontWeight: 500,
                        }}
                        onClick={() => handleMenuClick(3)}
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
            {tabIndex === 3 && <CompanyOrdersPage />}
          </Container>
        </Box>
      </Box>

      {/* Subscription Modal */}
      <Modal
        open={openSubscriptionModal}
        onClose={handleCloseSubscriptionModal}
        aria-labelledby="subscription-modal-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ outline: "none", borderRadius: 3, boxShadow: 6, bgcolor: "#ffffff", p: 3, maxWidth: 600, width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 600 }}>
              Subscription Details
            </Typography>
            <IconButton onClick={handleCloseSubscriptionModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Subscription
            companyId={localStorage.getItem("company_id")}
            onLogout={handleLogout}
            remainingDays={remainingDays}
            onSubscribe={async () => {
              handleCloseSubscriptionModal();
              const companyId = localStorage.getItem("company_id");
              try {
                console.log("Fetching subscription data on subscribe...");
                const subscriptionResponse = await API.get(`/subscription-status/${companyId}/`);
                console.log("Subscription Response:", subscriptionResponse.data);
                const subData = subscriptionResponse.data;
                setSubscriptionData(subData);
                const endDate = new Date(subData.end_date);
                const today = new Date();
                const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
                setRemainingDays(daysLeft > 0 ? daysLeft : 0);

                console.log("Refetching company dashboard stats...");
                const statsResponse = await API.get(`/api/company-dashboard-stats/`);
                console.log("Dashboard Stats Response:", statsResponse.data);
                setTotalMaterials(statsResponse.data.total_materials);
                setPendingOrders(statsResponse.data.pending_orders);
                setDeliveredItems(statsResponse.data.delivered_items);
                setTotalRevenue(statsResponse.data.total_revenue);

                console.log("Delivered Items Count:", statsResponse.data.delivered_items);

                console.log("Refetching revenue analytics...");
                const revenueAnalyticsResponse = await API.get(`/api/revenue-analytics/?time_range=${timeRange}`);
                console.log("Revenue Analytics Response:", revenueAnalyticsResponse.data);
                setRevenueAnalytics(revenueAnalyticsResponse.data);

                console.log("Refetching top purchased items...");
                const topPurchasedItemsResponse = await API.get(`/api/top-purchased-items/?time_range=${timeRange}`);
                console.log("Top Purchased Items Response:", topPurchasedItemsResponse.data);
                setTopPurchasedItems(topPurchasedItemsResponse.data);
              } catch (error) {
                console.error("Error during subscription refresh:", error);
                setError("Failed to refresh data after subscription. Please try again.");
                if (error.response?.status === 401 || error.response?.status === 403) {
                  navigate("/login");
                }
              }
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default SuppliersDashboard;