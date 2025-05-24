
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  Alert,
  Container,
  CircularProgress,
  IconButton,
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
  ButtonGroup,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
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
  Receipt,
  ExpandMore,
  CalendarToday,
  Today,
  Schedule,
  ArrowBack,
  FileDownload as DownloadIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import ClientNavbar from "./ClientNavbar.js";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("active");
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const invoiceRef = useRef(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Please log in to view orders.");
          setLoading(false);
          return;
        }

        const response = await API.get("/api/orders/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedOrders = response.data;
        setOrders(fetchedOrders);
        applyFilter(fetchedOrders, filterStatus);
        setError(null);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const applyFilter = (ordersData, statusFilter) => {
    let filtered = [];
    if (statusFilter === "active") {
      filtered = ordersData.filter(
        (order) =>
          !(order.buying_status === "Delivered" || order.renting_status === "Returned")
      );
    } else if (statusFilter === "completed") {
      filtered = ordersData.filter(
        (order) =>
          order.buying_status === "Delivered" || order.renting_status === "Returned"
      );
    } else {
      filtered = ordersData;
    }
    setFilteredOrders(filtered);
  };

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilterStatus(newFilter);
    applyFilter(orders, newFilter);
  };

  const handleNavigateToProfile = () => {
    navigate("/client/profile");
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

  const handleViewInvoice = (order) => {
    setSelectedOrder(order);
    setOpenInvoiceModal(true);
  };

  const handleCloseInvoiceModal = () => {
    setOpenInvoiceModal(false);
    setSelectedOrder(null);
  };

  const generateInvoicePDF = async (order) => {
    try {
      const invoiceElement = invoiceRef.current;
      if (!invoiceElement) {
        setSnackbarMessage("Failed to generate invoice: Element not found.");
        setSnackbarOpen(true);
        return;
      }

      invoiceElement.style.display = "block";

      const canvas = await html2canvas(invoiceElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`invoice_order_${order.id}.pdf`);

      invoiceElement.style.display = "none";
    } catch (error) {
      console.error("Failed to generate invoice:", error);
      setSnackbarMessage("Failed to generate invoice. Please try again.");
      setSnackbarOpen(true);
    }
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

  const renderBillingDetails = (order) => {
    if (!order.billing_details) return null;

    return (
      <Accordion defaultExpanded sx={{ mb: 3, boxShadow: 2, borderRadius: 2, bgcolor: theme.palette.grey[50] }}>
        <AccordionSummary expandIcon={<ExpandMore sx={{ color: theme.palette.primary.main }} />}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
            <Person sx={{ verticalAlign: "middle", mr: 1, color: theme.palette.primary.main }} />
            Billing Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Person fontSize="small" sx={{ mr: 1, color: theme.palette.text.disabled }} />
                Name
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{order.billing_details.fullName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Email fontSize="small" sx={{ mr: 1, color: theme.palette.text.disabled }} />
                Email
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{order.billing_details.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Phone fontSize="small" sx={{ mr: 1, color: theme.palette.text.disabled }} />
                Contact
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{order.billing_details.contactNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <LocationOn fontSize="small" sx={{ mr: 1, color: theme.palette.text.disabled }} />
                Delivery
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{order.billing_details.deliveryLocation}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderRentingDetails = (order) => {
    if (!order.renting_details) return null;

    return (
      <Accordion defaultExpanded sx={{ mb: 3, boxShadow: 2, borderRadius: 2, bgcolor: theme.palette.grey[50] }}>
        <AccordionSummary expandIcon={<ExpandMore sx={{ color: theme.palette.primary.main }} />}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
            <EventAvailable sx={{ verticalAlign: "middle", mr: 1, color: theme.palette.primary.main }} />
            Renting Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Person fontSize="small" sx={{ mr: 1, color: theme.palette.text.disabled }} />
                Name
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{order.renting_details.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Phone fontSize="small" sx={{ mr: 1, color: theme.palette.text.disabled }} />
                Contact
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{order.renting_details.contactNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <CalendarToday fontSize="small" sx={{ mr: 1, color: theme.palette.text.disabled }} />
                Survey Type
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{order.renting_details.surveyType}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Today fontSize="small" sx={{ mr: 1, color: theme.palette.text.disabled }} />
                Date Needed
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{new Date(order.renting_details.dateNeeded).toLocaleDateString()}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Schedule fontSize="small" sx={{ mr: 1, color: theme.palette.text.disabled }} />
                Renting Days
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{order.renting_details.rentingDays} days</Typography>
            </Grid>
          </Grid>

          {order.renting_status && (
            <Box sx={{ mt: 2, p: 2, bgcolor: theme.palette.grey[100], borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: theme.palette.text.secondary }}>
                {order.renting_status === "Booked" ? (
                  <>
                    <CheckCircle color="warning" sx={{ verticalAlign: "middle", mr: 1 }} />
                    Please check the mail and visit the office to pick up your item.
                  </>
                ) : order.renting_status === "Picked Up" ? (
                  <>
                    <LocalShipping color="info" sx={{ verticalAlign: "middle", mr: 1 }} />
                    You have {order.renting_details.rentingDays} days to use the item. Please return it to the office afterward.
                  </>
                ) : (
                  <>
                    <CheckCircle color="success" sx={{ verticalAlign: "middle", mr: 1 }} />
                    Thank you for returning the item!
                  </>
                )}
              </Typography>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderItemsTable = (items, type, rentingDays = 1) => {
    if (!items || items.length === 0) return null;

    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: theme.palette.primary.main }}>
          {type === "buying" ? (
            <ShoppingCart sx={{ verticalAlign: "middle", mr: 1, color: theme.palette.primary.main }} />
          ) : (
            <LocalShipping sx={{ verticalAlign: "middle", mr: 1, color: theme.palette.primary.main }} />
          )}
          {type === "buying" ? "Purchased Items" : "Rented Equipment"}
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.primary.light }}>
                <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold' }}>Product</TableCell>
                <TableCell align="right" sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold' }}>Qty</TableCell>
                <TableCell align="right" sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold' }}>Price</TableCell>
                <TableCell align="right" sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold' }}>Total</TableCell>
                <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold' }}>Company</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index} sx={{ '&:hover': { bgcolor: theme.palette.grey[50] }, transition: 'background-color 0.2s' }}>
                  <TableCell>
                    <Typography fontWeight="medium" sx={{ color: theme.palette.text.primary }}>{item.product_name}</Typography>
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">Rs. {item.price}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.success.main }}>
                    Rs. {item.quantity * item.price * (type === "renting" ? rentingDays : 1)}
                  </TableCell>
                  <TableCell>
                    <Chip label={`ID: ${item.company_id}`} size="small" variant="outlined" sx={{ bgcolor: theme.palette.grey[100], borderColor: theme.palette.grey[400] }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  const renderPaymentDetails = (order) => {
    if (!order.payment_data) return null;

    return (
      <Box sx={{ mb: 2, p: 2, bgcolor: theme.palette.grey[50], borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: theme.palette.primary.main }}>
          <Payment sx={{ verticalAlign: "middle", mr: 1, color: theme.palette.primary.main }} />
          Payment Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              Transaction ID
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{order.payment_data.transaction_id}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              Payment Method
            </Typography>
            <Chip label={order.payment_data.method} color="info" size="small" variant="outlined" sx={{ bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText }} />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderInvoiceTemplate = (order) => {
    if (!order) return null;

    return (
      <Box
        ref={invoiceRef}
        sx={{
          width: "210mm",
          padding: "20mm",
          backgroundColor: "#fff",
          fontFamily: "Arial, sans-serif",
          color: "#000",
          boxSizing: "border-box",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          Invoice
        </Typography>
        <Typography variant="h6" align="center" gutterBottom sx={{ color: theme.palette.text.secondary }}>
          Order #{order.id}
        </Typography>
        <Typography align="center" gutterBottom sx={{ color: theme.palette.text.disabled }}>
          Date: {formatDate(order.created_at)}
        </Typography>
        <Divider sx={{ my: 3, borderColor: theme.palette.grey[300] }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: theme.palette.primary.main, mb: 1 }}>
              Billed To:
            </Typography>
            {order.billing_details ? (
              <>
                <Typography sx={{ color: theme.palette.text.primary }}>{order.billing_details.fullName}</Typography>
                <Typography sx={{ color: theme.palette.text.primary }}>{order.billing_details.email}</Typography>
                <Typography sx={{ color: theme.palette.text.primary }}>{order.billing_details.contactNumber}</Typography>
                <Typography sx={{ color: theme.palette.text.primary }}>{order.billing_details.deliveryLocation}</Typography>
              </>
            ) : order.renting_details ? (
              <>
                <Typography sx={{ color: theme.palette.text.primary }}>{order.renting_details.name}</Typography>
                <Typography sx={{ color: theme.palette.text.primary }}>{order.renting_details.contactNumber}</Typography>
              </>
            ) : (
              <Typography sx={{ color: theme.palette.text.disabled }}>Not Available</Typography>
            )}
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: theme.palette.primary.main, mb: 1 }}>
              Order Details:
            </Typography>
            <Typography sx={{ color: theme.palette.text.primary }}>Order Type: {order.order_type}</Typography>
            <Typography sx={{ color: theme.palette.text.primary }}>Booking ID: {order.booking_id}</Typography>
            {order.buying_status && <Typography sx={{ color: theme.palette.text.primary }}>Buying Status: {order.buying_status}</Typography>}
            {order.renting_status && <Typography sx={{ color: theme.palette.text.primary }}>Renting Status: {order.renting_status}</Typography>}
          </Box>
        </Box>

        {order.buying_items && order.buying_items.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Purchased Items
            </Typography>
            <Table sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
              <TableHead>
                <TableRow sx={{ bgcolor: theme.palette.grey[200] }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Qty</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.buying_items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">Rs. {item.price}</TableCell>
                    <TableCell align="right">Rs. {item.quantity * item.price}</TableCell>
                    <TableCell>{item.company_name} (ID: {item.company_id})</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

        {order.renting_items && order.renting_items.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Rented Equipment
            </Typography>
            <Table sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
              <TableHead>
                <TableRow sx={{ bgcolor: theme.palette.grey[200] }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Qty</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.renting_items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">Rs. {item.price}</TableCell>
                    <TableCell align="right">
                      Rs. {item.quantity * item.price * (order.renting_details?.rentingDays || 1)}
                    </TableCell>
                    <TableCell>{item.company_name} (ID: {item.company_id})</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Typography variant="h6" sx={{ color: theme.palette.success.main, fontWeight: 'bold' }}>
            Total Amount: Rs. {order.total_amount}
          </Typography>
        </Box>

        {order.payment_data && (
          <Box sx={{ mt: 3, p: 2, border: `1px solid ${theme.palette.grey[300]}`, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
              Payment Information
            </Typography>
            <Typography sx={{ color: theme.palette.text.primary }}>Transaction ID: {order.payment_data.transaction_id}</Typography>
            <Typography sx={{ color: theme.palette.text.primary }}>Payment Method: {order.payment_data.method}</Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: theme.palette.grey[100] }}>
      <ClientNavbar wishlist={[]} cartItems={[]} onNavigateToProfile={handleNavigateToProfile} />
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4, flex: 1, pt: { xs: 2, md: 4 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, display: "flex", alignItems: "center", color: theme.palette.primary.main }}>
              <Receipt sx={{ mr: 1, fontSize: "2.5rem", color: theme.palette.primary.main }} />
              Your Orders
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
              View and manage all your orders
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Select
              value={filterStatus}
              onChange={handleFilterChange}
              displayEmpty
              sx={{
                minWidth: "150px",
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                '.MuiSelect-select': { py: 1 },
              }}
              variant="outlined"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="all">All</MenuItem>
            </Select>
            <ButtonGroup variant="contained">
              <Button
                onClick={() => navigate("/client")}
                startIcon={<ArrowBack />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 3,
                  bgcolor: theme.palette.primary.main,
                  '&:hover': { bgcolor: theme.palette.primary.dark },
                }}
              >
                Back to Shopping
              </Button>
            </ButtonGroup>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={60} color="primary" />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2, boxShadow: 2 }}>
            {error}
          </Alert>
        ) : filteredOrders.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2, boxShadow: 2, bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6" color="text.secondary">
              No orders found
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: theme.palette.text.disabled }}>
              You haven't placed any orders yet. Start shopping to see your orders here.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredOrders.map((order) => (
              <Grid item xs={12} key={order.id}>
                <Card elevation={6} sx={{ borderRadius: 3, bgcolor: theme.palette.background.paper, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.01)' } }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor: order.order_type === "buying" ? theme.palette.primary.main : theme.palette.secondary.main,
                          width: 48,
                          height: 48,
                        }}
                      >
                        {order.order_type === "buying" ? <ShoppingCart /> : <EventAvailable />}
                      </Avatar>
                    }
                    action={
                      <Box>
                        <IconButton
                          color="primary"
                          title="View Invoice"
                          onClick={() => handleViewInvoice(order)}
                          sx={{ mr: 1, '&:hover': { bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText } }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          color="info"
                          title="Track Order"
                          onClick={() => setSnackbarMessage("Tracking not implemented yet") || setSnackbarOpen(true)}
                          sx={{ '&:hover': { bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText } }}
                        >
                          <TrackChanges />
                        </IconButton>
                      </Box>
                    }
                    title={`Order #${order.id}`}
                    subheader={`Created: ${formatDate(order.created_at)}`}
                    titleTypographyProps={{ variant: "h6", fontWeight: 600, color: theme.palette.text.primary }}
                    subheaderTypographyProps={{ color: theme.palette.text.disabled }}
                  />
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            Booking ID
                          </Typography>
                          <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{order.booking_id}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            Order Type
                          </Typography>
                          <Chip
                            label={order.order_type}
                            size="small"
                            color={order.order_type === "buying" ? "primary" : "secondary"}
                            sx={{ bgcolor: order.order_type === "buying" ? theme.palette.primary.light : theme.palette.secondary.light, color: theme.palette.common.white }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            Total Amount
                          </Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: theme.palette.success.main }}>
                            Rs. {order.total_amount}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    {order.order_type !== "renting" && order.buying_status && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          Order Status
                        </Typography>
                        <Badge>
                          <Chip
                            label={order.buying_status}
                            color={getStatusColor(order.buying_status)}
                            variant="outlined"
                            size="medium"
                            icon={getStatusIcon(order.buying_status)}
                            sx={{ fontWeight: '500', borderRadius: 1 }}
                          />
                        </Badge>
                      </Box>
                    )}

                    {(order.order_type === "renting" || order.order_type === "mixed") && order.renting_status && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: theme.palette.primary.main }}>
                          <TrackChanges sx={{ verticalAlign: "middle", mr: 1, color: theme.palette.primary.main }} />
                          Rental Status
                        </Typography>
                        <Badge>
                          <Chip
                            label={order.renting_status}
                            color={getStatusColor(order.renting_status)}
                            variant="outlined"
                            size="medium"
                            icon={getStatusIcon(order.renting_status)}
                            sx={{ fontWeight: '500', borderRadius: 1 }}
                          />
                        </Badge>
                      </Box>
                    )}

                    {order.order_type !== "renting" && renderBillingDetails(order)}
                    {(order.order_type === "renting" || order.order_type === "mixed") && renderRentingDetails(order)}

                    {order.order_type !== "renting" && renderItemsTable(order.buying_items, "buying")}
                    {(order.order_type === "renting" || order.order_type === "mixed") &&
                      renderItemsTable(order.renting_items, "renting", order.renting_details?.rentingDays || 1)}

                    {renderPaymentDetails(order)}

                    <Box sx={{ display: "none" }}>{renderInvoiceTemplate(order)}</Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Dialog
        open={openInvoiceModal}
        onClose={handleCloseInvoiceModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 6,
          },
        }}
      >
        <DialogTitle sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.primary.contrastText, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Invoice for Order #{selectedOrder?.id}
          <IconButton onClick={handleCloseInvoiceModal} sx={{ color: theme.palette.primary.contrastText }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: theme.palette.background.default, p: 3 }}>
          {selectedOrder && renderInvoiceTemplate(selectedOrder)}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseInvoiceModal}
            color="primary"
            sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
          >
            Close
          </Button>
          <Button
            onClick={() => generateInvoicePDF(selectedOrder)}
            color="primary"
            startIcon={<DownloadIcon />}
            sx={{ borderRadius: 2, textTransform: 'none', px: 3, bgcolor: theme.palette.success.main, '&:hover': { bgcolor: theme.palette.success.dark } }}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
};

export default OrdersPage;