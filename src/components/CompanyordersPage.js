import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Alert,
  Container,
  CircularProgress,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Chip,
  CardHeader,
  CardContent,
  Avatar,
  Grid,
  Badge,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Modal,
  TextField,
  DialogActions,
} from "@mui/material";
import {
  Visibility,
  TrackChanges,
  ShoppingCart,
  EventAvailable,
  LocalShipping,
  Payment,
  CheckCircle,
  Cancel,
  AccessTime,
  Person,
  Email,
  Phone,
  LocationOn,
  Business,
  AttachMoney,
  Receipt,
  ExpandMore,
  CalendarToday,
  Today,
  Event,
  Schedule,
  FilterList,
} from "@mui/icons-material";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const CompanyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [companyId, setCompanyId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all_except_delivered_returned");
  const [filterOptions, setFilterOptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [emailContent, setEmailContent] = useState({
    orderId: null,
    orderIdPart: "", // Read-only "Order #<id>"
    customSubject: "", // Editable subject part
    fullName: "", // Read-only full name
    messageBody: "", // Editable message body
  });
  const navigate = useNavigate();
  const theme = useTheme();

  const buyingStatusOptions = ["Paid", "Processing", "Delivered", "Cancelled"];
  const rentingStatusOptions = ["Booked", "Picked Up", "Returned", "Cancelled"];

  useEffect(() => {
    const fetchCompanyId = async () => {
      try {
        const profileResponse = await API.get("/api/user-profile/");
        setCompanyId(profileResponse.data.company_id);
      } catch (error) {
        console.error("Error fetching company ID:", error);
        setError("Failed to fetch company information. Please try again.");
      }
    };

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Please log in to view orders.");
          setLoading(false);
          return;
        }

        const params = new URLSearchParams();
        if (filterStatus) {
          params.append("filter_status", filterStatus);
        }

        const response = await API.get(`/api/company/orders/?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched orders:", response.data);
        setOrders(response.data);

        const hasBuying = response.data.some(order => order.buying_items.length > 0);
        const hasRenting = response.data.some(order => order.renting_items.length > 0);

        const options = ["all_except_delivered_returned"];
        if (hasBuying) {
          options.push(...buyingStatusOptions.map(status => `Buying: ${status}`));
        }
        if (hasRenting) {
          options.push(...rentingStatusOptions.map(status => `Renting: ${status}`));
        }
        setFilterOptions(options);

        setError(null);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(
          error.response?.data?.error || "Failed to fetch orders. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyId().then(() => fetchOrders());
  }, [filterStatus]);

  const handleFilterChange = (value) => {
    if (value.startsWith("Buying: ")) {
      setFilterStatus(value.replace("Buying: ", ""));
    } else if (value.startsWith("Renting: ")) {
      setFilterStatus(value.replace("Renting: ", ""));
    } else {
      setFilterStatus(value);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
      case "returned":
        return <CheckCircle fontSize="small" />;
      case "paid":
      case "booked":
        return <Payment fontSize="small" />;
      case "cancelled":
        return <Cancel fontSize="small" />;
      case "picked up":
      case "processing":
        return <AccessTime fontSize="small" />;
      default:
        return <AccessTime fontSize="small" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
      case "returned":
        return "success";
      case "paid":
      case "booked":
        return "warning";
      case "cancelled":
        return "error";
      case "picked up":
      case "processing":
        return "info";
      default:
        return "default";
    }
  };

  const handleStatusChange = async (orderId, field, newStatus) => {
    try {
      const token = localStorage.getItem("access_token");
      const payload =
        field === "buying_status"
          ? { buying_status: newStatus }
          : { renting_status: newStatus };
      await API.patch(`/api/orders/${orderId}/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // If the status is changed to "Booked" for renting, send an email
      if (field === "renting_status" && newStatus === "Booked") {
        const order = orders.find((o) => o.id === orderId);
        const pickupLocation = order.billing_details?.deliveryLocation || "Your Company Pickup Point";
        const fullName = order.billing_details?.fullName || order.renting_details?.name || "Customer";

        try {
          await API.post(
            "/api/send-booking-email/",
            {
              order_id: orderId,
              pickup_location: pickupLocation,
              full_name: fullName,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setSnackbarMessage("Booking confirmed and email sent to customer");
        } catch (emailError) {
          console.error("Error sending booking email:", emailError);
          setSnackbarMessage("Status updated, but failed to send email");
        }
      }

      setOrders((prevOrders) =>
        prevOrders.filter((order) => {
          if (order.id === orderId) {
            if (field === "buying_status" && newStatus === "Delivered" && filterStatus === "all_except_delivered_returned") {
              return false;
            }
            if (field === "renting_status" && newStatus === "Returned" && filterStatus === "all_except_delivered_returned") {
              return false;
            }
            if (field === "buying_status" && (newStatus === "Delivered" || newStatus === "Cancelled") && filterStatus === "all_except_delivered_returned") {
              return false;
            }
            if (field === "renting_status" && (newStatus === "Returned" || newStatus === "Cancelled") && filterStatus === "all_except_delivered_returned") {
              return false;
            }
            if (field === "buying_status" && filterStatus && filterStatus !== "all_except_delivered_returned" && filterStatus !== newStatus) {
              return false;
            }
            if (field === "renting_status" && filterStatus && filterStatus !== "all_except_delivered_returned" && filterStatus !== newStatus) {
              return false;
            }
          }
          return true;
        })
      );
      if (!(field === "renting_status" && newStatus === "Booked")) {
        setSnackbarMessage("Status updated successfully");
      }
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 2000);
    } catch (error) {
      console.error("Error updating status:", error);
      setSnackbarMessage(
        error.response?.data?.error || "Failed to update status. Please try again."
      );
      setSnackbarOpen(true);
    }
  };

  const handleOpenEmailModal = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    const pickupLocation = order.billing_details?.deliveryLocation || "Your Company Pickup Point";
    const fullName = order.billing_details?.fullName || order.renting_details?.name || "Customer";

    const orderIdPart = `Order #${orderId}`;
    const customSubject = "Booking Confirmation";
    const messageBody = `Your booking for Order #${orderId} has been confirmed!\nPlease pick up your item(s) at the following location:\n${pickupLocation}\n\nThank you for choosing our services!\nBest regards,\nYour Company Name`;

    setEmailContent({
      orderId,
      orderIdPart,
      customSubject,
      fullName,
      messageBody,
    });
    setModalOpen(true);
  };

  const handleSendEmail = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const order = orders.find((o) => o.id === emailContent.orderId);
      const pickupLocation = order.billing_details?.deliveryLocation || "Your Company Pickup Point";
      const fullName = order.billing_details?.fullName || order.renting_details?.name || "Customer";

      const finalSubject = `${emailContent.orderIdPart} - ${emailContent.customSubject}`;
      const finalMessage = `Dear ${emailContent.fullName},\n\n${emailContent.messageBody}`;

      await API.post(
        "/api/send-booking-email/",
        {
          order_id: emailContent.orderId,
          pickup_location: pickupLocation,
          full_name: fullName,
          subject: finalSubject,
          message: finalMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSnackbarMessage("Email sent to customer successfully");
      setModalOpen(false);
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 2000);
    } catch (error) {
      console.error("Error sending email:", error);
      setSnackbarMessage(
        error.response?.data?.error || "Failed to send email. Please try again."
      );
      setSnackbarOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEmailContent({ orderId: null, orderIdPart: "", customSubject: "", fullName: "", messageBody: "" });
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateReturnDate = (dateNeeded, rentingDays) => {
    const date = new Date(dateNeeded);
    date.setDate(date.getDate() + parseInt(rentingDays));
    return date.toLocaleDateString();
  };

  const renderBillingDetails = (order) => {
    if (!order.billing_details) return null;

    return (
      <Accordion defaultExpanded sx={{ mb: 3, boxShadow: "none", border: `1px solid ${theme.palette.divider}` }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight="bold">
            <Person sx={{ verticalAlign: "middle", mr: 1 }} />
            Customer Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                <Person fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Name
              </Typography>
              <Typography variant="body1">{order.billing_details.fullName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                <Email fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Email
              </Typography>
              <Typography variant="body1">{order.billing_details.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                <Phone fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Contact
              </Typography>
              <Typography variant="body1">{order.billing_details.contactNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                <LocationOn fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Delivery Location
              </Typography>
              <Typography variant="body1">{order.billing_details.deliveryLocation}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderBuyingItems = (order) => {
    if (!order.buying_items || order.buying_items.length === 0) return null;

    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          <ShoppingCart sx={{ verticalAlign: "middle", mr: 1 }} />
          Purchased Items
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: { xs: 300, sm: 650 } }}>
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Product</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  Unit Price
                </TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.buying_items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    <Typography fontWeight="medium">{item.product_name}</Typography>
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    Rs. {item.price}
                  </TableCell>
                  <TableCell align="right">Rs. {item.quantity * item.price}</TableCell>
                  <TableCell sx={{ display: { xs: "table-cell", sm: "none" } }}>
                    <Typography fontWeight="medium">{item.product_name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Qty: {item.quantity} | Price: Rs. {item.price} | Total: Rs. {item.quantity * item.price}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  const renderRentingDetails = (order) => {
    // Only render if there are renting items for this company
    if (!order.renting_items || order.renting_items.length === 0 || !order.renting_details) return null;

    return (
      <Accordion defaultExpanded sx={{ mb: 3, boxShadow: "none", border: `1px solid ${theme.palette.divider}` }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight="bold">
            <EventAvailable sx={{ verticalAlign: "middle", mr: 1 }} />
            Renting Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                <Person fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Customer Name
              </Typography>
              <Typography variant="body1">{order.renting_details.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                <Phone fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Contact Number
              </Typography>
              <Typography variant="body1">{order.renting_details.contactNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                <CalendarToday fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Survey Type
              </Typography>
              <Typography variant="body1">{order.renting_details.surveyType}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                <Today fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Date Needed
              </Typography>
              <Typography variant="body1">
                {new Date(order.renting_details.dateNeeded).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                <Schedule fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Renting Days
              </Typography>
              <Typography variant="body1">{order.renting_details.rentingDays} days</Typography>
            </Grid>
          </Grid>

          {order.renting_status && (
            <Box sx={{ mt: 2, p: 2, bgcolor: theme.palette.grey[100], borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {order.renting_status === "Booked" ? (
                  <>
                    <CheckCircle color="warning" sx={{ verticalAlign: "middle", mr: 1 }} />
                    The client needs to pick up the item.
                  </>
                ) : order.renting_status === "Picked Up" ? (
                  <>
                    <LocalShipping color="info" sx={{ verticalAlign: "middle", mr: 1 }} />
                    The client has {order.renting_details.rentingDays} days to use the item. Expected return date:{" "}
                    {calculateReturnDate(order.renting_details.dateNeeded, order.renting_details.rentingDays)}
                  </>
                ) : (
                  <>
                    <CheckCircle color="success" sx={{ verticalAlign: "middle", mr: 1 }} />
                    The item has been returned.
                  </>
                )}
              </Typography>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderRentingItems = (order) => {
    if (!order.renting_items || order.renting_items.length === 0) return null;

    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          <LocalShipping sx={{ verticalAlign: "middle", mr: 1 }} />
          Rented Equipment
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: { xs: 300, sm: 650 } }}>
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Product</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  Daily Rate
                </TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.renting_items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    <Typography fontWeight="medium">{item.product_name}</Typography>
                    {item.serial_number && (
                      <Typography variant="caption" color="text.secondary">
                        Serial: {item.serial_number}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    Rs. {item.price}
                  </TableCell>
                  <TableCell align="right">
                    Rs. {item.quantity * item.price * (order.renting_details?.rentingDays || 1)}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "table-cell", sm: "none" } }}>
                    <Typography fontWeight="medium">{item.product_name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Qty: {item.quantity} | Daily Rate: Rs. {item.price} | Total: Rs.{" "}
                      {item.quantity * item.price * (order.renting_details?.rentingDays || 1)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  const renderCompanyAmounts = (order) => {
    if (!order.company_amounts || !companyId) return null;

    const companyAmount = order.company_amounts[companyId];
    if (!companyAmount) return null;

    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          <Business sx={{ verticalAlign: "middle", mr: 1 }} />
          Your Earnings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Company ID {companyId}
              </Typography>
              <Typography variant="h6" color="primary">
                Rs. {companyAmount}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderPaymentDetails = (order) => {
    if (!order.payment_data) return null;

    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          <Payment sx={{ verticalAlign: "middle", mr: 1 }} />
          Payment Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Transaction ID
            </Typography>
            <Typography variant="body1">{order.payment_data.transaction_id}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Payment Method
            </Typography>
            <Chip label={order.payment_data.method} color="info" size="small" variant="outlined" />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderStatusUpdate = (order) => {
    // Determine the effective order type based on the filtered items
    const hasBuyingItems = order.buying_items && order.buying_items.length > 0;
    const hasRentingItems = order.renting_items && order.renting_items.length > 0;

    if (hasRentingItems) {
      return (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            <TrackChanges sx={{ verticalAlign: "middle", mr: 1 }} />
            Rental Status
          </Typography>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm="auto">
              <Badge>
                <Chip
                  label={order.renting_status}
                  color={getStatusColor(order.renting_status)}
                  variant="outlined"
                  size="medium"
                />
              </Badge>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Update Rental Status</InputLabel>
                <Select
                  value={order.renting_status}
                  label="Update Rental Status"
                  onChange={(e) => handleStatusChange(order.id, "renting_status", e.target.value)}
                >
                  <MenuItem value="Booked">
                    <Box display="flex" alignItems="center">
                      <AccessTime color="warning" sx={{ mr: 1 }} />
                      Booked
                    </Box>
                  </MenuItem>
                  <MenuItem value="Picked Up">
                    <Box display="flex" alignItems="center">
                      <LocalShipping color="info" sx={{ mr: 1 }} />
                      Picked Up
                    </Box>
                  </MenuItem>
                  <MenuItem value="Returned">
                    <Box display="flex" alignItems="center">
                      <CheckCircle color="success" sx={{ mr: 1 }} />
                      Returned
                    </Box>
                  </MenuItem>
                  <MenuItem value="Cancelled">
                    <Box display="flex" alignItems="center">
                      <Cancel color="error" sx={{ mr: 1 }} />
                      Cancelled
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<Email />}
                onClick={() => handleOpenEmailModal(order.id)}
              >
                Send Email
              </Button>
            </Grid>
          </Grid>
        </Box>
      );
    } else if (hasBuyingItems && order.buying_status) {
      return (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            <TrackChanges sx={{ verticalAlign: "middle", mr: 1 }} />
            Order Status
          </Typography>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm="auto">
              <Badge>
                <Chip
                  label={order.buying_status}
                  color={getStatusColor(order.buying_status)}
                  variant="outlined"
                  size="medium"
                />
              </Badge>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Update Order Status</InputLabel>
                <Select
                  value={order.buying_status}
                  label="Update Order Status"
                  onChange={(e) => handleStatusChange(order.id, "buying_status", e.target.value)}
                >
                  <MenuItem value="Paid">
                    <Box display="flex" alignItems="center">
                      <Payment color="warning" sx={{ mr: 1 }} />
                      Paid
                    </Box>
                  </MenuItem>
                  <MenuItem value="Processing">
                    <Box display="flex" alignItems="center">
                      <AccessTime color="info" sx={{ mr: 1 }} />
                      Processing
                    </Box>
                  </MenuItem>
                  <MenuItem value="Delivered">
                    <Box display="flex" alignItems="center">
                      <LocalShipping color="success" sx={{ mr: 1 }} />
                      Delivered
                    </Box>
                  </MenuItem>
                  <MenuItem value="Cancelled">
                    <Box display="flex" alignItems="center">
                      <Cancel color="error" sx={{ mr: 1 }} />
                      Cancelled
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      );
    }
    return null;
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          <Receipt sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
          Order Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
          View and manage all customer orders for your company
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }} size="small">
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={filterStatus === "all_except_delivered_returned" ? "all_except_delivered_returned" : 
                  buyingStatusOptions.includes(filterStatus) ? `Buying: ${filterStatus}` : 
                  rentingStatusOptions.includes(filterStatus) ? `Renting: ${filterStatus}` : ""}
            label="Filter by Status"
            onChange={(e) => handleFilterChange(e.target.value)}
            startAdornment={<FilterList sx={{ mr: 1 }} />}
          >
            <MenuItem value="all_except_delivered_returned">Active Orders</MenuItem>
            {filterOptions.slice(1).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      ) : orders.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
            No orders found
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            No orders match the selected filter. Try adjusting the filter to see more orders.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => {
            // Determine the effective order type based on the filtered items
            const hasBuyingItems = order.buying_items && order.buying_items.length > 0;
            const hasRentingItems = order.renting_items && order.renting_items.length > 0;
            const effectiveOrderType = hasBuyingItems && hasRentingItems ? "mixed" : hasBuyingItems ? "buying" : hasRentingItems ? "renting" : null;

            if (!effectiveOrderType) return null; // Skip orders with no relevant items

            return (
              <Grid item xs={12} key={order.id}>
                <Card elevation={3} sx={{ borderRadius: 2 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor:
                            effectiveOrderType === "buying"
                              ? theme.palette.primary.main
                              : theme.palette.secondary.main,
                        }}
                      >
                        {effectiveOrderType === "buying" ? <ShoppingCart /> : <EventAvailable />}
                      </Avatar>
                    }
                    title={`Order #${order.id}`}
                    subheader={`Created: ${formatDate(order.created_at)}`}
                    titleTypographyProps={{ variant: "h6", fontWeight: 600, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
                    subheaderTypographyProps={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                  />
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                            Booking ID
                          </Typography>
                          <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                            {order.booking_id}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                              Order Type
                            </Typography>
                            <Chip
                              label={effectiveOrderType}
                              size="small"
                              color={effectiveOrderType === "buying" ? "primary" : "secondary"}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                            Total Amount
                          </Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                            Rs. {order.total_amount}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    {renderStatusUpdate(order)}

                    {(hasBuyingItems || !hasRentingItems) && renderBillingDetails(order)}
                    {hasBuyingItems && renderBuyingItems(order)}

                    {hasRentingItems && renderRentingDetails(order)}
                    {hasRentingItems && renderRentingItems(order)}

                    {renderCompanyAmounts(order)}
                    {renderPaymentDetails(order)}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="email-modal-title"
        aria-describedby="email-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="email-modal-title" variant="h6" component="h2" gutterBottom>
            Send Booking Confirmation Email
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <TextField
              label="Order ID"
              value={emailContent.orderIdPart}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Subject"
              value={emailContent.customSubject}
              onChange={(e) => setEmailContent({ ...emailContent, customSubject: e.target.value })}
              fullWidth
              margin="normal"
              sx={{ flex: 2 }}
            />
          </Box>
          <TextField
            label="Client Name"
            value={`Dear ${emailContent.fullName},`}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Message"
            value={emailContent.messageBody}
            onChange={(e) => setEmailContent({ ...emailContent, messageBody: e.target.value })}
            fullWidth
            margin="normal"
            multiline
            rows={8}
          />
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSendEmail} variant="contained" color="primary" startIcon={<Email />}>
              Send
            </Button>
          </DialogActions>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Container>
  );
};

export default CompanyOrdersPage;