// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Box,
// // //   Typography,
// // //   Card,
// // //   Alert,
// // //   Container,
// // //   CircularProgress,
  
// // //   IconButton,
// // //   Snackbar,
// // //   Chip,
// // //   CardHeader,
// // //   CardContent,
// // //   Avatar,
// // //   Grid,
// // //   Badge,
// // //   useTheme,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Paper,
// // //   Accordion,
// // //   AccordionSummary,
// // //   AccordionDetails,
// // //   Button,
// // //   ButtonGroup
// // // } from "@mui/material";
// // // import {
// // //   Visibility,
// // //   TrackChanges,
// // //   ShoppingCart,
// // //   EventAvailable,
// // //   LocalShipping,
// // //   Payment,
// // //   CheckCircle,
// // //   Cancel,
// // //   AccessTime,
// // //   Person,
// // //   Email,
// // //   Phone,
// // //   LocationOn,
  
// // //   Receipt,
// // //   ExpandMore,
// // //   CalendarToday,
// // //   Today,
  
// // //   Schedule,
// // //   ArrowBack,
// // // } from "@mui/icons-material";
// // // import API from "../services/api";
// // // import { useNavigate } from "react-router-dom";
// // // import ClientNavbar from "./ClientNavbar.js";
// // // import Footer from "../pages/footer.js";

// // // const OrdersPage = () => {
// // //   const [orders, setOrders] = useState([]);
// // //   const [error, setError] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// // //   const [snackbarMessage, setSnackbarMessage] = useState("");
// // //   const navigate = useNavigate();
// // //   const theme = useTheme();

// // //   useEffect(() => {
// // //     const fetchOrders = async () => {
// // //       try {
// // //         const token = localStorage.getItem("access_token");
// // //         if (!token) {
// // //           setError("Please log in to view orders.");
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         const response = await API.get("/api/orders/", {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });
// // //         setOrders(response.data);
// // //         setError(null);
// // //       } catch (error) {
// // //         console.error("Error fetching orders:", error);
// // //         setError("Failed to fetch orders. Please try again later.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchOrders();
// // //   }, []);

// // //   const handleNavigateToProfile = () => {
// // //     navigate("/client/profile");
// // //   };

// // //   const getStatusIcon = (status) => {
// // //     switch (status?.toLowerCase()) {
// // //       case "delivered":
// // //       case "returned":
// // //         return <CheckCircle fontSize="small" />;
// // //       case "paid":
// // //       case "booked":
// // //         return <Payment fontSize="small" />;
// // //       case "cancelled":
// // //         return <Cancel fontSize="small" />;
// // //       case "picked up":
// // //       case "processing":
// // //         return <AccessTime fontSize="small" />;
// // //       default:
// // //         return <AccessTime fontSize="small" />;
// // //     }
// // //   };

// // //   const getStatusColor = (status) => {
// // //     switch (status?.toLowerCase()) {
// // //       case "delivered":
// // //       case "returned":
// // //         return "success";
// // //       case "paid":
// // //       case "booked":
// // //         return "warning";
// // //       case "cancelled":
// // //         return "error";
// // //       case "picked up":
// // //       case "processing":
// // //         return "info";
// // //       default:
// // //         return "default";
// // //     }
// // //   };

// // //   const handleViewInvoice = async (orderId) => {
// // //     try {
// // //       const token = localStorage.getItem("access_token");
// // //       const response = await API.get(`/api/orders/${orderId}/invoice/`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //         responseType: "blob",
// // //       });

// // //       const blob = new Blob([response.data], { type: "application/pdf" });
// // //       const viewUrl = window.URL.createObjectURL(blob);
// // //       window.open(viewUrl, "_blank");
// // //       setTimeout(() => {
// // //         window.URL.revokeObjectURL(viewUrl);
// // //       }, 10000);
// // //     } catch (error) {
// // //       console.error("Failed to open invoice:", error);
// // //       setSnackbarMessage("Failed to open invoice. Please try again.");
// // //       setSnackbarOpen(true);
// // //     }
// // //   };

// // //   const formatDate = (dateString) => {
// // //     const options = { 
// // //       year: 'numeric', 
// // //       month: 'short', 
// // //       day: 'numeric',
// // //       hour: '2-digit',
// // //       minute: '2-digit'
// // //     };
// // //     return new Date(dateString).toLocaleDateString(undefined, options);
// // //   };

// // //   const renderBillingDetails = (order) => {
// // //     if (!order.billing_details) return null;

// // //     return (
// // //       <Accordion defaultExpanded sx={{ mb: 3, boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
// // //         <AccordionSummary expandIcon={<ExpandMore />}>
// // //           <Typography variant="subtitle1" fontWeight="bold">
// // //             <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
// // //             Billing Details
// // //           </Typography>
// // //         </AccordionSummary>
// // //         <AccordionDetails>
// // //           <Grid container spacing={2}>
// // //             <Grid item xs={12} sm={6} md={4}>
// // //               <Typography variant="subtitle2" color="text.secondary">
// // //                 <Person fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
// // //                 Name
// // //               </Typography>
// // //               <Typography variant="body1">
// // //                 {order.billing_details.fullName}
// // //               </Typography>
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} md={4}>
// // //               <Typography variant="subtitle2" color="text.secondary">
// // //                 <Email fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
// // //                 Email
// // //               </Typography>
// // //               <Typography variant="body1">
// // //                 {order.billing_details.email}
// // //               </Typography>
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} md={4}>
// // //               <Typography variant="subtitle2" color="text.secondary">
// // //                 <Phone fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
// // //                 Contact
// // //               </Typography>
// // //               <Typography variant="body1">
// // //                 {order.billing_details.contactNumber}
// // //               </Typography>
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} md={4}>
// // //               <Typography variant="subtitle2" color="text.secondary">
// // //                 <LocationOn fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
// // //                 Delivery
// // //               </Typography>
// // //               <Typography variant="body1">
// // //                 {order.billing_details.deliveryLocation}
// // //               </Typography>
// // //             </Grid>
// // //           </Grid>
// // //         </AccordionDetails>
// // //       </Accordion>
// // //     );
// // //   };

// // //   const renderRentingDetails = (order) => {
// // //     if (!order.renting_details) return null;

// // //     return (
// // //       <Accordion defaultExpanded sx={{ mb: 3, boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
// // //         <AccordionSummary expandIcon={<ExpandMore />}>
// // //           <Typography variant="subtitle1" fontWeight="bold">
// // //             <EventAvailable sx={{ verticalAlign: 'middle', mr: 1 }} />
// // //             Renting Details
// // //           </Typography>
// // //         </AccordionSummary>
// // //         <AccordionDetails>
// // //           <Grid container spacing={2}>
// // //             <Grid item xs={12} sm={6} md={4}>
// // //               <Typography variant="subtitle2" color="text.secondary">
// // //                 <Person fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
// // //                 Name
// // //               </Typography>
// // //               <Typography variant="body1">
// // //                 {order.renting_details.name}
// // //               </Typography>
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} md={4}>
// // //               <Typography variant="subtitle2" color="text.secondary">
// // //                 <Phone fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
// // //                 Contact
// // //               </Typography>
// // //               <Typography variant="body1">
// // //                 {order.renting_details.contactNumber}
// // //               </Typography>
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} md={4}>
// // //               <Typography variant="subtitle2" color="text.secondary">
// // //                 <CalendarToday fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
// // //                 Survey Type
// // //               </Typography>
// // //               <Typography variant="body1">
// // //                 {order.renting_details.surveyType}
// // //               </Typography>
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} md={4}>
// // //               <Typography variant="subtitle2" color="text.secondary">
// // //                 <Today fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
// // //                 Date Needed
// // //               </Typography>
// // //               <Typography variant="body1">
// // //                 {new Date(order.renting_details.dateNeeded).toLocaleDateString()}
// // //               </Typography>
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} md={4}>
// // //               <Typography variant="subtitle2" color="text.secondary">
// // //                 <Schedule fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
// // //                 Renting Days
// // //               </Typography>
// // //               <Typography variant="body1">
// // //                 {order.renting_details.rentingDays} days
// // //               </Typography>
// // //             </Grid>
// // //           </Grid>

// // //           {order.renting_status && (
// // //             <Box sx={{ mt: 2, p: 2, bgcolor: theme.palette.grey[100], borderRadius: 1 }}>
// // //               <Typography variant="body2" color="text.secondary">
// // //                 {order.renting_status === "Booked" ? (
// // //                   <>
// // //                     <CheckCircle color="warning" sx={{ verticalAlign: 'middle', mr: 1 }} />
// // //                     Please visit the office to pick up your item.
// // //                   </>
// // //                 ) : order.renting_status === "Picked Up" ? (
// // //                   <>
// // //                     <LocalShipping color="info" sx={{ verticalAlign: 'middle', mr: 1 }} />
// // //                     You have {order.renting_details.rentingDays} days to use the item. Please return it to the office afterward.
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <CheckCircle color="success" sx={{ verticalAlign: 'middle', mr: 1 }} />
// // //                     Thank you for returning the item!
// // //                   </>
// // //                 )}
// // //               </Typography>
// // //             </Box>
// // //           )}
// // //         </AccordionDetails>
// // //       </Accordion>
// // //     );
// // //   };

// // //   const renderItemsTable = (items, type, rentingDays = 1) => {
// // //     if (!items || items.length === 0) return null;

// // //     return (
// // //       <Box sx={{ mb: 3 }}>
// // //         <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
// // //           {type === "buying" ? (
// // //             <ShoppingCart sx={{ verticalAlign: 'middle', mr: 1 }} />
// // //           ) : (
// // //             <LocalShipping sx={{ verticalAlign: 'middle', mr: 1 }} />
// // //           )}
// // //           {type === "buying" ? "Purchased Items" : "Rented Equipment"}
// // //         </Typography>
// // //         <TableContainer component={Paper} variant="outlined">
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
// // //                 <TableCell>Product</TableCell>
// // //                 <TableCell align="right">Qty</TableCell>
// // //                 <TableCell align="right">Price</TableCell>
// // //                 <TableCell align="right">Total</TableCell>
// // //                 <TableCell>Company</TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {items.map((item, index) => (
// // //                 <TableRow key={index}>
// // //                   <TableCell>
// // //                     <Typography fontWeight="medium">{item.product_name}</Typography>
// // //                   </TableCell>
// // //                   <TableCell align="right">{item.quantity}</TableCell>
// // //                   <TableCell align="right">Rs. {item.price}</TableCell>
// // //                   <TableCell align="right">
// // //                     Rs. {item.quantity * item.price * (type === "renting" ? rentingDays : 1)}
// // //                   </TableCell>
// // //                   <TableCell>
// // //                     <Chip
// // //                       label={`ID: ${item.company_id}`}
// // //                       size="small"
// // //                       variant="outlined"
// // //                     />
// // //                   </TableCell>
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       </Box>
// // //     );
// // //   };

// // //   const renderPaymentDetails = (order) => {
// // //     if (!order.payment_data) return null;

// // //     return (
// // //       <Box sx={{ mb: 2 }}>
// // //         <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
// // //           <Payment sx={{ verticalAlign: 'middle', mr: 1 }} />
// // //           Payment Information
// // //         </Typography>
// // //         <Grid container spacing={2}>
// // //           <Grid item xs={12} sm={6}>
// // //             <Typography variant="subtitle2" color="text.secondary">
// // //               Transaction ID
// // //             </Typography>
// // //             <Typography variant="body1">
// // //               {

// // // order.payment_data.transaction_id}
// // //             </Typography>
// // //           </Grid>
// // //           <Grid item xs={12} sm={6}>
// // //             <Typography variant="subtitle2" color="text.secondary">
// // //               Payment Method
// // //             </Typography>
// // //             <Chip 
// // //               label={order.payment_data.method} 
// // //               color="info"
// // //               size="small"
// // //               variant="outlined"
// // //             />
// // //           </Grid>
// // //         </Grid>
// // //       </Box>
// // //     );
// // //   };

// // //   return (
// // //     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
// // //       <ClientNavbar
// // //         wishlist={[]}
// // //         cartItems={[]}
// // //         onNavigateToProfile={handleNavigateToProfile}
// // //       />
// // //       <Container maxWidth="lg" sx={{ mt: 10, mb: 4, flex: 1, pt: 2 }}>
// // //         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
// // //           <Box>
// // //             <Typography variant="h4" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
// // //               <Receipt sx={{ mr: 1, fontSize: '2rem' }} />
// // //               Your Orders
// // //             </Typography>
// // //             <Typography variant="subtitle1" color="text.secondary">
// // //               View and manage all your orders
// // //             </Typography>
// // //           </Box>
// // //           <ButtonGroup variant="contained">
// // //             <Button
// // //               onClick={() => navigate("/client")}
// // //               startIcon={<ArrowBack />}
// // //               color="primary"
// // //             >
// // //               Back to Shopping
// // //             </Button>
// // //           </ButtonGroup>
// // //         </Box>

// // //         {loading ? (
// // //           <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
// // //             <CircularProgress size={60} />
// // //           </Box>
// // //         ) : error ? (
// // //           <Alert severity="error" sx={{ mb: 4 }}>
// // //             {error}
// // //           </Alert>
// // //         ) : orders.length === 0 ? (
// // //           <Paper sx={{ p: 4, textAlign: 'center' }}>
// // //             <Typography variant="h6" color="text.secondary">
// // //               No orders found
// // //             </Typography>
// // //             <Typography variant="body1" sx={{ mt: 1 }}>
// // //               You haven't placed any orders yet. Start shopping to see your orders here.
// // //             </Typography>
// // //           </Paper>
// // //         ) : (
// // //           <Grid container spacing={3}>
// // //             {orders.map((order) => (
// // //               <Grid item xs={12} key={order.id}>
// // //                 <Card elevation={3} sx={{ borderRadius: 2 }}>
// // //                   <CardHeader
// // //                     avatar={
// // //                       <Avatar sx={{ 
// // //                         bgcolor: order.order_type === "buying" 
// // //                           ? theme.palette.primary.main 
// // //                           : theme.palette.secondary.main
// // //                       }}>
// // //                         {order.order_type === "buying" ? (
// // //                           <ShoppingCart />
// // //                         ) : (
// // //                           <EventAvailable />
// // //                         )}
// // //                       </Avatar>
// // //                     }
// // //                     action={
// // //                       <Box>
// // //                         <IconButton
// // //                           color="primary"
// // //                           title="View Invoice"
// // //                           onClick={() => handleViewInvoice(order.id)}
// // //                           sx={{ mr: 1 }}
// // //                         >
// // //                           <Visibility />
// // //                         </IconButton>
// // //                         <IconButton
// // //                           color="info"
// // //                           title="Track Order"
// // //                           onClick={() => setSnackbarMessage("Tracking not implemented yet") || setSnackbarOpen(true)}
// // //                         >
// // //                           <TrackChanges />
// // //                         </IconButton>
// // //                       </Box>
// // //                     }
// // //                     title={`Order #${order.id}`}
// // //                     subheader={`Created: ${formatDate(order.created_at)}`}
// // //                     titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
// // //                   />
                  
// // //                   <CardContent>
// // //                     <Box sx={{ mb: 2 }}>
// // //                       <Grid container spacing={2}>
// // //                         <Grid item xs={12} sm={6} md={3}>
// // //                           <Typography variant="subtitle2" color="text.secondary">
// // //                             Booking ID
// // //                           </Typography>
// // //                           <Typography variant="body1">
// // //                             {order.booking_id}
// // //                           </Typography>
// // //                         </Grid>
// // //                         <Grid item xs={12} sm={6} md={3}>
// // //                           <Typography variant="subtitle2" color="text.secondary">
// // //                             Order Type
// // //                           </Typography>
// // //                           <Chip 
// // //                             label={order.order_type} 
// // //                             size="small"
// // //                             color={order.order_type === "buying" ? "primary" : "secondary"}
// // //                           />
// // //                         </Grid>
// // //                         <Grid item xs={12} sm={6} md={3}>
// // //                           <Typography variant="subtitle2" color="text.secondary">
// // //                             Total Amount
// // //                           </Typography>
// // //                           <Typography variant="body1" fontWeight="bold">
// // //                             Rs. {order.total_amount}
// // //                           </Typography>
// // //                         </Grid>
// // //                       </Grid>
// // //                     </Box>

// // //                     {order.order_type !== "renting" && order.buying_status && (
// // //                       <Box sx={{ mb: 2 }}>
// // //                         <Typography variant="subtitle2" color="text.secondary">
// // //                           Order Status
// // //                         </Typography>
// // //                         <Badge>
// // //                           <Chip
// // //                             label={order.buying_status}
// // //                             color={getStatusColor(order.buying_status)}
// // //                             variant="outlined"
// // //                             size="medium"
// // //                           />
// // //                         </Badge>
// // //                       </Box>
// // //                     )}

// // //                     {(order.order_type === "renting" || order.order_type === "mixed") && order.renting_status && (
// // //                       <Box sx={{ mb: 3 }}>
// // //                         <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
// // //                           <TrackChanges sx={{ verticalAlign: 'middle', mr: 1 }} />
// // //                           Rental Status
// // //                         </Typography>
// // //                         <Badge>
// // //                           <Chip
// // //                             label={order.renting_status}
// // //                             color={getStatusColor(order.renting_status)}
// // //                             variant="outlined"
// // //                             size="medium"
// // //                           />
// // //                         </Badge>
// // //                       </Box>
// // //                     )}

// // //                     {order.order_type !== "renting" && renderBillingDetails(order)}
// // //                     {(order.order_type === "renting" || order.order_type === "mixed") && renderRentingDetails(order)}

// // //                     {order.order_type !== "renting" && renderItemsTable(order.buying_items, "buying")}
// // //                     {(order.order_type === "renting" || order.order_type === "mixed") && 
// // //                       renderItemsTable(order.renting_items, "renting", order.renting_details?.rentingDays || 1)}

// // //                     {renderPaymentDetails(order)}
// // //                   </CardContent>
// // //                 </Card>
// // //               </Grid>
// // //             ))}
// // //           </Grid>
// // //         )}
// // //       </Container>
// // //       <Footer />
// // //       <Snackbar
// // //         open={snackbarOpen}
// // //         autoHideDuration={6000}
// // //         onClose={() => setSnackbarOpen(false)}
// // //         message={snackbarMessage}
// // //         anchorOrigin={{ vertical: "top", horizontal: "center" }}
// // //       />
// // //     </Box>
// // //   );
// // // };

// // // export default OrdersPage;
// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Card,
// //   Alert,
// //   Container,
// //   CircularProgress,
// //   IconButton,
// //   Snackbar,
// //   Chip,
// //   CardHeader,
// //   CardContent,
// //   Avatar,
// //   Grid,
// //   Badge,
// //   useTheme,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   Accordion,
// //   AccordionSummary,
// //   AccordionDetails,
// //   Button,
// //   ButtonGroup,
// //   Select,
// //   MenuItem,
// // } from "@mui/material";
// // import {
// //   Visibility,
// //   TrackChanges,
// //   ShoppingCart,
// //   EventAvailable,
// //   LocalShipping,
// //   Payment,
// //   CheckCircle,
// //   Cancel,
// //   AccessTime,
// //   Person,
// //   Email,
// //   Phone,
// //   LocationOn,
// //   Receipt,
// //   ExpandMore,
// //   CalendarToday,
// //   Today,
// //   Schedule,
// //   ArrowBack,
// //   FileDownload as DownloadIcon, // Import from @mui/icons-material
// // } from "@mui/icons-material";
// // import API from "../services/api";
// // import { useNavigate } from "react-router-dom";
// // import ClientNavbar from "./ClientNavbar.js";
// // import Footer from "../pages/footer.js";

// // const OrdersPage = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [filteredOrders, setFilteredOrders] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// //   const [snackbarMessage, setSnackbarMessage] = useState("");
// //   const [filterStatus, setFilterStatus] = useState("active"); // Default filter: show non-completed orders
// //   const navigate = useNavigate();
// //   const theme = useTheme();

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         const token = localStorage.getItem("access_token");
// //         if (!token) {
// //           setError("Please log in to view orders.");
// //           setLoading(false);
// //           return;
// //         }

// //         const response = await API.get("/api/orders/", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         const fetchedOrders = response.data;
// //         setOrders(fetchedOrders);
// //         applyFilter(fetchedOrders, filterStatus);
// //         setError(null);
// //       } catch (error) {
// //         console.error("Error fetching orders:", error);
// //         setError("Failed to fetch orders. Please try again later.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchOrders();
// //   }, []);

// //   const applyFilter = (ordersData, statusFilter) => {
// //     let filtered = [];
// //     if (statusFilter === "active") {
// //       filtered = ordersData.filter(
// //         (order) =>
// //           !(order.buying_status === "Delivered" || order.renting_status === "Returned")
// //       );
// //     } else if (statusFilter === "completed") {
// //       filtered = ordersData.filter(
// //         (order) =>
// //           order.buying_status === "Delivered" || order.renting_status === "Returned"
// //       );
// //     } else {
// //       filtered = ordersData; // 'all' filter
// //     }
// //     setFilteredOrders(filtered);
// //   };

// //   const handleFilterChange = (event) => {
// //     const newFilter = event.target.value;
// //     setFilterStatus(newFilter);
// //     applyFilter(orders, newFilter);
// //   };

// //   const handleNavigateToProfile = () => {
// //     navigate("/client/profile");
// //   };

// //   const getStatusIcon = (status) => {
// //     switch (status?.toLowerCase()) {
// //       case "delivered":
// //       case "returned":
// //         return <CheckCircle fontSize="small" />;
// //       case "paid":
// //       case "booked":
// //         return <Payment fontSize="small" />;
// //       case "cancelled":
// //         return <Cancel fontSize="small" />;
// //       case "picked up":
// //       case "processing":
// //         return <AccessTime fontSize="small" />;
// //       default:
// //         return <AccessTime fontSize="small" />;
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status?.toLowerCase()) {
// //       case "delivered":
// //       case "returned":
// //         return "success";
// //       case "paid":
// //       case "booked":
// //         return "warning";
// //       case "cancelled":
// //         return "error";
// //       case "picked up":
// //       case "processing":
// //         return "info";
// //       default:
// //         return "default";
// //     }
// //   };

// //   const handleViewInvoice = async (orderId) => {
// //     try {
// //       const token = localStorage.getItem("access_token");
// //       const response = await API.get(`/api/orders/${orderId}/invoice/`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //         responseType: "blob",
// //       });

// //       const blob = new Blob([response.data], { type: "application/pdf" });
// //       const viewUrl = window.URL.createObjectURL(blob);
// //       window.open(viewUrl, "_blank");
// //       setTimeout(() => {
// //         window.URL.revokeObjectURL(viewUrl);
// //       }, 10000);
// //     } catch (error) {
// //       console.error("Failed to open invoice:", error);
// //       setSnackbarMessage("Failed to open invoice. Please try again.");
// //       setSnackbarOpen(true);
// //     }
// //   };

// //   const handleDownloadInvoice = async (orderId) => {
// //     try {
// //       const token = localStorage.getItem("access_token");
// //       const response = await API.get(`/api/orders/${orderId}/invoice/`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //         responseType: "blob",
// //       });

// //       const blob = new Blob([response.data], { type: "application/pdf" });
// //       const downloadUrl = window.URL.createObjectURL(blob);
// //       const link = document.createElement("a");
// //       link.href = downloadUrl;
// //       link.download = `invoice_order_${orderId}.pdf`;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //       setTimeout(() => {
// //         window.URL.revokeObjectURL(downloadUrl);
// //       }, 10000);
// //     } catch (error) {
// //       console.error("Failed to download invoice:", error);
// //       setSnackbarMessage("Failed to download invoice. Please try again.");
// //       setSnackbarOpen(true);
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     const options = {
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     };
// //     return new Date(dateString).toLocaleDateString(undefined, options);
// //   };

// //   const renderBillingDetails = (order) => {
// //     if (!order.billing_details) return null;

// //     return (
// //       <Accordion defaultExpanded sx={{ mb: 3, boxShadow: "none", border: `1px solid ${theme.palette.divider}` }}>
// //         <AccordionSummary expandIcon={<ExpandMore />}>
// //           <Typography variant="subtitle1" fontWeight="bold">
// //             <Person sx={{ verticalAlign: "middle", mr: 1 }} />
// //             Billing Details
// //           </Typography>
// //         </AccordionSummary>
// //         <AccordionDetails>
// //           <Grid container spacing={2}>
// //             <Grid item xs={12} sm={6} md={4}>
// //               <Typography variant="subtitle2" color="text.secondary">
// //                 <Person fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
// //                 Name
// //               </Typography>
// //               <Typography variant="body1">{order.billing_details.fullName}</Typography>
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={4}>
// //               <Typography variant="subtitle2" color="text.secondary">
// //                 <Email fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
// //                 Email
// //               </Typography>
// //               <Typography variant="body1">{order.billing_details.email}</Typography>
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={4}>
// //               <Typography variant="subtitle2" color="text.secondary">
// //                 <Phone fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
// //                 Contact
// //               </Typography>
// //               <Typography variant="body1">{order.billing_details.contactNumber}</Typography>
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={4}>
// //               <Typography variant="subtitle2" color="text.secondary">
// //                 <LocationOn fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
// //                 Delivery
// //               </Typography>
// //               <Typography variant="body1">{order.billing_details.deliveryLocation}</Typography>
// //             </Grid>
// //           </Grid>
// //         </AccordionDetails>
// //       </Accordion>
// //     );
// //   };

// //   const renderRentingDetails = (order) => {
// //     if (!order.renting_details) return null;

// //     return (
// //       <Accordion defaultExpanded sx={{ mb: 3, boxShadow: "none", border: `1px solid ${theme.palette.divider}` }}>
// //         <AccordionSummary expandIcon={<ExpandMore />}>
// //           <Typography variant="subtitle1" fontWeight="bold">
// //             <EventAvailable sx={{ verticalAlign: "middle", mr: 1 }} />
// //             Renting Details
// //           </Typography>
// //         </AccordionSummary>
// //         <AccordionDetails>
// //           <Grid container spacing={2}>
// //             <Grid item xs={12} sm={6} md={4}>
// //               <Typography variant="subtitle2" color="text.secondary">
// //                 <Person fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
// //                 Name
// //               </Typography>
// //               <Typography variant="body1">{order.renting_details.name}</Typography>
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={4}>
// //               <Typography variant="subtitle2" color="text.secondary">
// //                 <Phone fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
// //                 Contact
// //               </Typography>
// //               <Typography variant="body1">{order.renting_details.contactNumber}</Typography>
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={4}>
// //               <Typography variant="subtitle2" color="text.secondary">
// //                 <CalendarToday fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
// //                 Survey Type
// //               </Typography>
// //               <Typography variant="body1">{order.renting_details.surveyType}</Typography>
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={4}>
// //               <Typography variant="subtitle2" color="text.secondary">
// //                 <Today fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
// //                 Date Needed
// //               </Typography>
// //               <Typography variant="body1">{new Date(order.renting_details.dateNeeded).toLocaleDateString()}</Typography>
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={4}>
// //               <Typography variant="subtitle2" color="text.secondary">
// //                 <Schedule fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
// //                 Renting Days
// //               </Typography>
// //               <Typography variant="body1">{order.renting_details.rentingDays} days</Typography>
// //             </Grid>
// //           </Grid>

// //           {order.renting_status && (
// //             <Box sx={{ mt: 2, p: 2, bgcolor: theme.palette.grey[100], borderRadius: 1 }}>
// //               <Typography variant="body2" color="text.secondary">
// //                 {order.renting_status === "Booked" ? (
// //                   <>
// //                     <CheckCircle color="warning" sx={{ verticalAlign: "middle", mr: 1 }} />
// //                     Please visit the office to pick up your item.
// //                   </>
// //                 ) : order.renting_status === "Picked Up" ? (
// //                   <>
// //                     <LocalShipping color="info" sx={{ verticalAlign: "middle", mr: 1 }} />
// //                     You have {order.renting_details.rentingDays} days to use the item. Please return it to the office afterward.
// //                   </>
// //                 ) : (
// //                   <>
// //                     <CheckCircle color="success" sx={{ verticalAlign: "middle", mr: 1 }} />
// //                     Thank you for returning the item!
// //                   </>
// //                 )}
// //               </Typography>
// //             </Box>
// //           )}
// //         </AccordionDetails>
// //       </Accordion>
// //     );
// //   };

// //   const renderItemsTable = (items, type, rentingDays = 1) => {
// //     if (!items || items.length === 0) return null;

// //     return (
// //       <Box sx={{ mb: 3 }}>
// //         <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
// //           {type === "buying" ? (
// //             <ShoppingCart sx={{ verticalAlign: "middle", mr: 1 }} />
// //           ) : (
// //             <LocalShipping sx={{ verticalAlign: "middle", mr: 1 }} />
// //           )}
// //           {type === "buying" ? "Purchased Items" : "Rented Equipment"}
// //         </Typography>
// //         <TableContainer component={Paper} variant="outlined">
// //           <Table>
// //             <TableHead>
// //               <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
// //                 <TableCell>Product</TableCell>
// //                 <TableCell align="right">Qty</TableCell>
// //                 <TableCell align="right">Price</TableCell>
// //                 <TableCell align="right">Total</TableCell>
// //                 <TableCell>Company</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {items.map((item, index) => (
// //                 <TableRow key={index}>
// //                   <TableCell>
// //                     <Typography fontWeight="medium">{item.product_name}</Typography>
// //                   </TableCell>
// //                   <TableCell align="right">{item.quantity}</TableCell>
// //                   <TableCell align="right">Rs. {item.price}</TableCell>
// //                   <TableCell align="right">
// //                     Rs. {item.quantity * item.price * (type === "renting" ? rentingDays : 1)}
// //                   </TableCell>
// //                   <TableCell>
// //                     <Chip label={`ID: ${item.company_id}`} size="small" variant="outlined" />
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Box>
// //     );
// //   };

// //   const renderPaymentDetails = (order) => {
// //     if (!order.payment_data) return null;

// //     return (
// //       <Box sx={{ mb: 2 }}>
// //         <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
// //           <Payment sx={{ verticalAlign: "middle", mr: 1 }} />
// //           Payment Information
// //         </Typography>
// //         <Grid container spacing={2}>
// //           <Grid item xs={12} sm={6}>
// //             <Typography variant="subtitle2" color="text.secondary">
// //               Transaction ID
// //             </Typography>
// //             <Typography variant="body1">{order.payment_data.transaction_id}</Typography>
// //           </Grid>
// //           <Grid item xs={12} sm={6}>
// //             <Typography variant="subtitle2" color="text.secondary">
// //               Payment Method
// //             </Typography>
// //             <Chip label={order.payment_data.method} color="info" size="small" variant="outlined" />
// //           </Grid>
// //         </Grid>
// //       </Box>
// //     );
// //   };

// //   return (
// //     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
// //       <ClientNavbar wishlist={[]} cartItems={[]} onNavigateToProfile={handleNavigateToProfile} />
// //       <Container maxWidth="lg" sx={{ mt: 10, mb: 4, flex: 1, pt: 2 }}>
// //         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
// //           <Box>
// //             <Typography variant="h4" sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}>
// //               <Receipt sx={{ mr: 1, fontSize: "2rem" }} />
// //               Your Orders
// //             </Typography>
// //             <Typography variant="subtitle1" color="text.secondary">
// //               View and manage all your orders
// //             </Typography>
// //           </Box>
// //           <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
// //             <Select
// //               value={filterStatus}
// //               onChange={handleFilterChange}
// //               displayEmpty
// //               sx={{ minWidth: "150px", backgroundColor: "background.paper" }}
// //             >
// //               <MenuItem value="active">Active</MenuItem>
// //               <MenuItem value="completed">Completed</MenuItem>
// //               <MenuItem value="all">All</MenuItem>
// //             </Select>
// //             <ButtonGroup variant="contained">
// //               <Button onClick={() => navigate("/client")} startIcon={<ArrowBack />} color="primary">
// //                 Back to Shopping
// //               </Button>
// //             </ButtonGroup>
// //           </Box>
// //         </Box>

// //         {loading ? (
// //           <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
// //             <CircularProgress size={60} />
// //           </Box>
// //         ) : error ? (
// //           <Alert severity="error" sx={{ mb: 4 }}>
// //             {error}
// //           </Alert>
// //         ) : filteredOrders.length === 0 ? (
// //           <Paper sx={{ p: 4, textAlign: "center" }}>
// //             <Typography variant="h6" color="text.secondary">
// //               No orders found
// //             </Typography>
// //             <Typography variant="body1" sx={{ mt: 1 }}>
// //               You haven't placed any orders yet. Start shopping to see your orders here.
// //             </Typography>
// //           </Paper>
// //         ) : (
// //           <Grid container spacing={3}>
// //             {filteredOrders.map((order) => (
// //               <Grid item xs={12} key={order.id}>
// //                 <Card elevation={3} sx={{ borderRadius: 2 }}>
// //                   <CardHeader
// //                     avatar={
// //                       <Avatar
// //                         sx={{
// //                           bgcolor: order.order_type === "buying" ? theme.palette.primary.main : theme.palette.secondary.main,
// //                         }}
// //                       >
// //                         {order.order_type === "buying" ? <ShoppingCart /> : <EventAvailable />}
// //                       </Avatar>
// //                     }
// //                     action={
// //                       <Box>
// //                         <IconButton
// //                           color="primary"
// //                           title="View Invoice"
// //                           onClick={() => handleViewInvoice(order.id)}
// //                           sx={{ mr: 1 }}
// //                         >
// //                           <Visibility />
// //                         </IconButton>
// //                         <IconButton
// //                           color="primary"
// //                           title="Download Invoice"
// //                           onClick={() => handleDownloadInvoice(order.id)}
// //                           sx={{ mr: 1 }}
// //                         >
// //                           <DownloadIcon />
// //                         </IconButton>
// //                         <IconButton
// //                           color="info"
// //                           title="Track Order"
// //                           onClick={() => setSnackbarMessage("Tracking not implemented yet") || setSnackbarOpen(true)}
// //                         >
// //                           <TrackChanges />
// //                         </IconButton>
// //                       </Box>
// //                     }
// //                     title={`Order #${order.id}`}
// //                     subheader={`Created: ${formatDate(order.created_at)}`}
// //                     titleTypographyProps={{ variant: "h6", fontWeight: 600 }}
// //                   />
// //                   <CardContent>
// //                     <Box sx={{ mb: 2 }}>
// //                       <Grid container spacing={2}>
// //                         <Grid item xs={12} sm={6} md={3}>
// //                           <Typography variant="subtitle2" color="text.secondary">
// //                             Booking ID
// //                           </Typography>
// //                           <Typography variant="body1">{order.booking_id}</Typography>
// //                         </Grid>
// //                         <Grid item xs={12} sm={6} md={3}>
// //                           <Typography variant="subtitle2" color="text.secondary">
// //                             Order Type
// //                           </Typography>
// //                           <Chip label={order.order_type} size="small" color={order.order_type === "buying" ? "primary" : "secondary"} />
// //                         </Grid>
// //                         <Grid item xs={12} sm={6} md={3}>
// //                           <Typography variant="subtitle2" color="text.secondary">
// //                             Total Amount
// //                           </Typography>
// //                           <Typography variant="body1" fontWeight="bold">
// //                             Rs. {order.total_amount}
// //                           </Typography>
// //                         </Grid>
// //                       </Grid>
// //                     </Box>

// //                     {order.order_type !== "renting" && order.buying_status && (
// //                       <Box sx={{ mb: 2 }}>
// //                         <Typography variant="subtitle2" color="text.secondary">
// //                           Order Status
// //                         </Typography>
// //                         <Badge>
// //                           <Chip
// //                             label={order.buying_status}
// //                             color={getStatusColor(order.buying_status)}
// //                             variant="outlined"
// //                             size="medium"
// //                           />
// //                         </Badge>
// //                       </Box>
// //                     )}

// //                     {(order.order_type === "renting" || order.order_type === "mixed") && order.renting_status && (
// //                       <Box sx={{ mb: 3 }}>
// //                         <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
// //                           <TrackChanges sx={{ verticalAlign: "middle", mr: 1 }} />
// //                           Rental Status
// //                         </Typography>
// //                         <Badge>
// //                           <Chip
// //                             label={order.renting_status}
// //                             color={getStatusColor(order.renting_status)}
// //                             variant="outlined"
// //                             size="medium"
// //                           />
// //                         </Badge>
// //                       </Box>
// //                     )}

// //                     {order.order_type !== "renting" && renderBillingDetails(order)}
// //                     {(order.order_type === "renting" || order.order_type === "mixed") && renderRentingDetails(order)}

// //                     {order.order_type !== "renting" && renderItemsTable(order.buying_items, "buying")}
// //                     {(order.order_type === "renting" || order.order_type === "mixed") &&
// //                       renderItemsTable(order.renting_items, "renting", order.renting_details?.rentingDays || 1)}

// //                     {renderPaymentDetails(order)}
// //                   </CardContent>
// //                 </Card>
// //               </Grid>
// //             ))}
// //           </Grid>
// //         )}
// //       </Container>
// //       <Footer />
// //       <Snackbar
// //         open={snackbarOpen}
// //         autoHideDuration={6000}
// //         onClose={() => setSnackbarOpen(false)}
// //         message={snackbarMessage}
// //         anchorOrigin={{ vertical: "top", horizontal: "center" }}
// //       />
// //     </Box>
// //   );
// // };

// // export default OrdersPage;
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   Alert,
//   Container,
//   CircularProgress,
//   IconButton,
//   Snackbar,
//   Chip,
//   CardHeader,
//   CardContent,
//   Avatar,
//   Grid,
//   Badge,
//   useTheme,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Button,
//   ButtonGroup,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import {
//   Visibility,
//   TrackChanges,
//   ShoppingCart,
//   EventAvailable,
//   LocalShipping,
//   Payment,
//   CheckCircle,
//   Cancel,
//   AccessTime,
//   Person,
//   Email,
//   Phone,
//   LocationOn,
//   Receipt,
//   ExpandMore,
//   CalendarToday,
//   Today,
//   Schedule,
//   ArrowBack,
//   FileDownload as DownloadIcon,
// } from "@mui/icons-material";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import ClientNavbar from "./ClientNavbar.js";
// import Footer from "../pages/footer.js";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [filterStatus, setFilterStatus] = useState("active");
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const invoiceRef = useRef(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         if (!token) {
//           setError("Please log in to view orders.");
//           setLoading(false);
//           return;
//         }

//         const response = await API.get("/api/orders/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const fetchedOrders = response.data;
//         setOrders(fetchedOrders);
//         applyFilter(fetchedOrders, filterStatus);
//         setError(null);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setError("Failed to fetch orders. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const applyFilter = (ordersData, statusFilter) => {
//     let filtered = [];
//     if (statusFilter === "active") {
//       filtered = ordersData.filter(
//         (order) =>
//           !(order.buying_status === "Delivered" || order.renting_status === "Returned")
//       );
//     } else if (statusFilter === "completed") {
//       filtered = ordersData.filter(
//         (order) =>
//           order.buying_status === "Delivered" || order.renting_status === "Returned"
//       );
//     } else {
//       filtered = ordersData;
//     }
//     setFilteredOrders(filtered);
//   };

//   const handleFilterChange = (event) => {
//     const newFilter = event.target.value;
//     setFilterStatus(newFilter);
//     applyFilter(orders, newFilter);
//   };

//   const handleNavigateToProfile = () => {
//     navigate("/client/profile");
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "delivered":
//       case "returned":
//         return <CheckCircle fontSize="small" />;
//       case "paid":
//       case "booked":
//         return <Payment fontSize="small" />;
//       case "cancelled":
//         return <Cancel fontSize="small" />;
//       case "picked up":
//       case "processing":
//         return <AccessTime fontSize="small" />;
//       default:
//         return <AccessTime fontSize="small" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "delivered":
//       case "returned":
//         return "success";
//       case "paid":
//       case "booked":
//         return "warning";
//       case "cancelled":
//         return "error";
//       case "picked up":
//       case "processing":
//         return "info";
//       default:
//         return "default";
//     }
//   };

//   const generateInvoicePDF = async (order) => {
//     try {
//       const invoiceElement = invoiceRef.current;
//       if (!invoiceElement) {
//         setSnackbarMessage("Failed to generate invoice: Element not found.");
//         setSnackbarOpen(true);
//         return;
//       }

//       // Temporarily show the invoice element for rendering
//       invoiceElement.style.display = "block";

//       const canvas = await html2canvas(invoiceElement, { scale: 2 });
//       const imgData = canvas.toDataURL("image/png");

//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//       });

//       const imgWidth = 210; // A4 width in mm
//       const pageHeight = 297; // A4 height in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;

//       let position = 0;

//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       while (heightLeft >= 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save(`invoice_order_${order.id}.pdf`);

//       // Hide the invoice element again
//       invoiceElement.style.display = "none";
//     } catch (error) {
//       console.error("Failed to generate invoice:", error);
//       setSnackbarMessage("Failed to generate invoice. Please try again.");
//       setSnackbarOpen(true);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const renderBillingDetails = (order) => {
//     if (!order.billing_details) return null;

//     return (
//       <Accordion defaultExpanded sx={{ mb: 3, boxShadow: "none", border: `1px solid ${theme.palette.divider}` }}>
//         <AccordionSummary expandIcon={<ExpandMore />}>
//           <Typography variant="subtitle1" fontWeight="bold">
//             <Person sx={{ verticalAlign: "middle", mr: 1 }} />
//             Billing Details
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={4}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 <Person fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
//                 Name
//               </Typography>
//               <Typography variant="body1">{order.billing_details.fullName}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 <Email fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
//                 Email
//               </Typography>
//               <Typography variant="body1">{order.billing_details.email}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 <Phone fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
//                 Contact
//               </Typography>
//               <Typography variant="body1">{order.billing_details.contactNumber}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 <LocationOn fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
//                 Delivery
//               </Typography>
//               <Typography variant="body1">{order.billing_details.deliveryLocation}</Typography>
//             </Grid>
//           </Grid>
//         </AccordionDetails>
//       </Accordion>
//     );
//   };

//   const renderRentingDetails = (order) => {
//     if (!order.renting_details) return null;

//     return (
//       <Accordion defaultExpanded sx={{ mb: 3, boxShadow: "none", border: `1px solid ${theme.palette.divider}` }}>
//         <AccordionSummary expandIcon={<ExpandMore />}>
//           <Typography variant="subtitle1" fontWeight="bold">
//             <EventAvailable sx={{ verticalAlign: "middle", mr: 1 }} />
//             Renting Details
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={4}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 <Person fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
//                 Name
//               </Typography>
//               <Typography variant="body1">{order.renting_details.name}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 <Phone fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
//                 Contact
//               </Typography>
//               <Typography variant="body1">{order.renting_details.contactNumber}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 <CalendarToday fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
//                 Survey Type
//               </Typography>
//               <Typography variant="body1">{order.renting_details.surveyType}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 <Today fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
//                 Date Needed
//               </Typography>
//               <Typography variant="body1">{new Date(order.renting_details.dateNeeded).toLocaleDateString()}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 <Schedule fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
//                 Renting Days
//               </Typography>
//               <Typography variant="body1">{order.renting_details.rentingDays} days</Typography>
//             </Grid>
//           </Grid>

//           {order.renting_status && (
//             <Box sx={{ mt: 2, p: 2, bgcolor: theme.palette.grey[100], borderRadius: 1 }}>
//               <Typography variant="body2" color="text.secondary">
//                 {order.renting_status === "Booked" ? (
//                   <>
//                     <CheckCircle color="warning" sx={{ verticalAlign: "middle", mr: 1 }} />
//                     Please visit the office to pick up your item.
//                   </>
//                 ) : order.renting_status === "Picked Up" ? (
//                   <>
//                     <LocalShipping color="info" sx={{ verticalAlign: "middle", mr: 1 }} />
//                     You have {order.renting_details.rentingDays} days to use the item. Please return it to the office afterward.
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle color="success" sx={{ verticalAlign: "middle", mr: 1 }} />
//                     Thank you for returning the item!
//                   </>
//                 )}
//               </Typography>
//             </Box>
//           )}
//         </AccordionDetails>
//       </Accordion>
//     );
//   };

//   const renderItemsTable = (items, type, rentingDays = 1) => {
//     if (!items || items.length === 0) return null;

//     return (
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
//           {type === "buying" ? (
//             <ShoppingCart sx={{ verticalAlign: "middle", mr: 1 }} />
//           ) : (
//             <LocalShipping sx={{ verticalAlign: "middle", mr: 1 }} />
//           )}
//           {type === "buying" ? "Purchased Items" : "Rented Equipment"}
//         </Typography>
//         <TableContainer component={Paper} variant="outlined">
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
//                 <TableCell>Product</TableCell>
//                 <TableCell align="right">Qty</TableCell>
//                 <TableCell align="right">Price</TableCell>
//                 <TableCell align="right">Total</TableCell>
//                 <TableCell>Company</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {items.map((item, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <Typography fontWeight="medium">{item.product_name}</Typography>
//                   </TableCell>
//                   <TableCell align="right">{item.quantity}</TableCell>
//                   <TableCell align="right">Rs. {item.price}</TableCell>
//                   <TableCell align="right">
//                     Rs. {item.quantity * item.price * (type === "renting" ? rentingDays : 1)}
//                   </TableCell>
//                   <TableCell>
//                     <Chip label={`ID: ${item.company_id}`} size="small" variant="outlined" />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     );
//   };

//   const renderPaymentDetails = (order) => {
//     if (!order.payment_data) return null;

//     return (
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
//           <Payment sx={{ verticalAlign: "middle", mr: 1 }} />
//           Payment Information
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Transaction ID
//             </Typography>
//             <Typography variant="body1">{order.payment_data.transaction_id}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Payment Method
//             </Typography>
//             <Chip label={order.payment_data.method} color="info" size="small" variant="outlined" />
//           </Grid>
//         </Grid>
//       </Box>
//     );
//   };

//   const renderInvoiceTemplate = (order) => {
//     return (
//       <Box
//         ref={invoiceRef}
//         sx={{
//           display: "none", // Hidden by default
//           width: "210mm",
//           padding: "20mm",
//           backgroundColor: "#fff",
//           fontFamily: "Arial, sans-serif",
//           color: "#000",
//         }}
//       >
//         <Typography variant="h4" align="center" gutterBottom>
//           Invoice
//         </Typography>
//         <Typography variant="h6" align="center" gutterBottom>
//           Order #{order.id}
//         </Typography>
//         <Typography align="center" gutterBottom>
//           Date: {formatDate(order.created_at)}
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
//           <Box>
//             <Typography variant="subtitle1" fontWeight="bold">
//               Billed To:
//             </Typography>
//             {order.billing_details ? (
//               <>
//                 <Typography>{order.billing_details.fullName}</Typography>
//                 <Typography>{order.billing_details.email}</Typography>
//                 <Typography>{order.billing_details.contactNumber}</Typography>
//                 <Typography>{order.billing_details.deliveryLocation}</Typography>
//               </>
//             ) : order.renting_details ? (
//               <>
//                 <Typography>{order.renting_details.name}</Typography>
//                 <Typography>{order.renting_details.contactNumber}</Typography>
//               </>
//             ) : (
//               <Typography>Not Available</Typography>
//             )}
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" fontWeight="bold">
//               Order Details:
//             </Typography>
//             <Typography>Order Type: {order.order_type}</Typography>
//             <Typography>Booking ID: {order.booking_id}</Typography>
//             {order.buying_status && <Typography>Buying Status: {order.buying_status}</Typography>}
//             {order.renting_status && <Typography>Renting Status: {order.renting_status}</Typography>}
//           </Box>
//         </Box>

//         {order.buying_items && order.buying_items.length > 0 && (
//           <Box sx={{ mb: 3 }}>
//             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//               Purchased Items
//             </Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Product</TableCell>
//                   <TableCell align="right">Qty</TableCell>
//                   <TableCell align="right">Price</TableCell>
//                   <TableCell align="right">Total</TableCell>
//                   <TableCell>Company</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {order.buying_items.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{item.product_name}</TableCell>
//                     <TableCell align="right">{item.quantity}</TableCell>
//                     <TableCell align="right">Rs. {item.price}</TableCell>
//                     <TableCell align="right">Rs. {item.quantity * item.price}</TableCell>
//                     <TableCell>{item.company_name} (ID: {item.company_id})</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         )}

//         {order.renting_items && order.renting_items.length > 0 && (
//           <Box sx={{ mb: 3 }}>
//             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//               Rented Equipment
//             </Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Product</TableCell>
//                   <TableCell align="right">Qty</TableCell>
//                   <TableCell align="right">Price</TableCell>
//                   <TableCell align="right">Total</TableCell>
//                   <TableCell>Company</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {order.renting_items.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{item.product_name}</TableCell>
//                     <TableCell align="right">{item.quantity}</TableCell>
//                     <TableCell align="right">Rs. {item.price}</TableCell>
//                     <TableCell align="right">
//                       Rs. {item.quantity * item.price * (order.renting_details?.rentingDays || 1)}
//                     </TableCell>
//                     <TableCell>{item.company_name} (ID: {item.company_id})</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         )}

//         <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
//           <Typography variant="h6">
//             Total Amount: Rs. {order.total_amount}
//           </Typography>
//         </Box>

//         {order.payment_data && (
//           <Box sx={{ mt: 3 }}>
//             <Typography variant="subtitle1" fontWeight="bold">
//               Payment Information
//             </Typography>
//             <Typography>Transaction ID: {order.payment_data.transaction_id}</Typography>
//             <Typography>Payment Method: {order.payment_data.method}</Typography>
//           </Box>
//         )}
//       </Box>
//     );
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       <ClientNavbar wishlist={[]} cartItems={[]} onNavigateToProfile={handleNavigateToProfile} />
//       <Container maxWidth="lg" sx={{ mt: 10, mb: 4, flex: 1, pt: 2 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//           <Box>
//             <Typography variant="h4" sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}>
//               <Receipt sx={{ mr: 1, fontSize: "2rem" }} />
//               Your Orders
//             </Typography>
//             <Typography variant="subtitle1" color="text.secondary">
//               View and manage all your orders
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
//             <Select
//               value={filterStatus}
//               onChange={handleFilterChange}
//               displayEmpty
//               sx={{ minWidth: "150px", backgroundColor: "background.paper" }}
//             >
//               <MenuItem value="active">Active</MenuItem>
//               <MenuItem value="completed">Completed</MenuItem>
//               <MenuItem value="all">All</MenuItem>
//             </Select>
//             <ButtonGroup variant="contained">
//               <Button onClick={() => navigate("/client")} startIcon={<ArrowBack />} color="primary">
//                 Back to Shopping
//               </Button>
//             </ButtonGroup>
//           </Box>
//         </Box>

//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//             <CircularProgress size={60} />
//           </Box>
//         ) : error ? (
//           <Alert severity="error" sx={{ mb: 4 }}>
//             {error}
//           </Alert>
//         ) : filteredOrders.length === 0 ? (
//           <Paper sx={{ p: 4, textAlign: "center" }}>
//             <Typography variant="h6" color="text.secondary">
//               No orders found
//             </Typography>
//             <Typography variant="body1" sx={{ mt: 1 }}>
//               You haven't placed any orders yet. Start shopping to see your orders here.
//             </Typography>
//           </Paper>
//         ) : (
//           <Grid container spacing={3}>
//             {filteredOrders.map((order) => (
//               <Grid item xs={12} key={order.id}>
//                 <Card elevation={3} sx={{ borderRadius: 2 }}>
//                   <CardHeader
//                     avatar={
//                       <Avatar
//                         sx={{
//                           bgcolor: order.order_type === "buying" ? theme.palette.primary.main : theme.palette.secondary.main,
//                         }}
//                       >
//                         {order.order_type === "buying" ? <ShoppingCart /> : <EventAvailable />}
//                       </Avatar>
//                     }
//                     action={
//                       <Box>
//                         <IconButton
//                           color="primary"
//                           title="Download Invoice"
//                           onClick={() => generateInvoicePDF(order)}
//                           sx={{ mr: 1 }}
//                         >
//                           <DownloadIcon />
//                         </IconButton>
//                         <IconButton
//                           color="info"
//                           title="Track Order"
//                           onClick={() => setSnackbarMessage("Tracking not implemented yet") || setSnackbarOpen(true)}
//                         >
//                           <TrackChanges />
//                         </IconButton>
//                       </Box>
//                     }
//                     title={`Order #${order.id}`}
//                     subheader={`Created: ${formatDate(order.created_at)}`}
//                     titleTypographyProps={{ variant: "h6", fontWeight: 600 }}
//                   />
//                   <CardContent>
//                     <Box sx={{ mb: 2 }}>
//                       <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6} md={3}>
//                           <Typography variant="subtitle2" color="text.secondary">
//                             Booking ID
//                           </Typography>
//                           <Typography variant="body1">{order.booking_id}</Typography>
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                           <Typography variant="subtitle2" color="text.secondary">
//                             Order Type
//                           </Typography>
//                           <Chip label={order.order_type} size="small" color={order.order_type === "buying" ? "primary" : "secondary"} />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                           <Typography variant="subtitle2" color="text.secondary">
//                             Total Amount
//                           </Typography>
//                           <Typography variant="body1" fontWeight="bold">
//                             Rs. {order.total_amount}
//                           </Typography>
//                         </Grid>
//                       </Grid>
//                     </Box>

//                     {order.order_type !== "renting" && order.buying_status && (
//                       <Box sx={{ mb: 2 }}>
//                         <Typography variant="subtitle2" color="text.secondary">
//                           Order Status
//                         </Typography>
//                         <Badge>
//                           <Chip
//                             label={order.buying_status}
//                             color={getStatusColor(order.buying_status)}
//                             variant="outlined"
//                             size="medium"
//                           />
//                         </Badge>
//                       </Box>
//                     )}

//                     {(order.order_type === "renting" || order.order_type === "mixed") && order.renting_status && (
//                       <Box sx={{ mb: 3 }}>
//                         <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
//                           <TrackChanges sx={{ verticalAlign: "middle", mr: 1 }} />
//                           Rental Status
//                         </Typography>
//                         <Badge>
//                           <Chip
//                             label={order.renting_status}
//                             color={getStatusColor(order.renting_status)}
//                             variant="outlined"
//                             size="medium"
//                           />
//                         </Badge>
//                       </Box>
//                     )}

//                     {order.order_type !== "renting" && renderBillingDetails(order)}
//                     {(order.order_type === "renting" || order.order_type === "mixed") && renderRentingDetails(order)}

//                     {order.order_type !== "renting" && renderItemsTable(order.buying_items, "buying")}
//                     {(order.order_type === "renting" || order.order_type === "mixed") &&
//                       renderItemsTable(order.renting_items, "renting", order.renting_details?.rentingDays || 1)}

//                     {renderPaymentDetails(order)}

//                     {/* Render the invoice template for this order */}
//                     {renderInvoiceTemplate(order)}
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Container>
//       <Footer />
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         message={snackbarMessage}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       />
//     </Box>
//   );
// };

// export default OrdersPage;
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
} from "@mui/icons-material";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import ClientNavbar from "./ClientNavbar.js";
import Footer from "../pages/footer.js";
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

      // Temporarily show the invoice element for rendering
      invoiceElement.style.display = "block";

      const canvas = await html2canvas(invoiceElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
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

      // Hide the invoice element again
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
      <Accordion defaultExpanded sx={{ mb: 3, boxShadow: "none", border: `1px solid ${theme.palette.divider}` }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight="bold">
            <Person sx={{ verticalAlign: "middle", mr: 1 }} />
            Billing Details
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
                Delivery
              </Typography>
              <Typography variant="body1">{order.billing_details.deliveryLocation}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderRentingDetails = (order) => {
    if (!order.renting_details) return null;

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
                Name
              </Typography>
              <Typography variant="body1">{order.renting_details.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                <Phone fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Contact
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
              <Typography variant="body1">{new Date(order.renting_details.dateNeeded).toLocaleDateString()}</Typography>
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
                    Please visit the office to pick up your item.
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
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          {type === "buying" ? (
            <ShoppingCart sx={{ verticalAlign: "middle", mr: 1 }} />
          ) : (
            <LocalShipping sx={{ verticalAlign: "middle", mr: 1 }} />
          )}
          {type === "buying" ? "Purchased Items" : "Rented Equipment"}
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
                <TableCell>Product</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell>Company</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography fontWeight="medium">{item.product_name}</Typography>
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">Rs. {item.price}</TableCell>
                  <TableCell align="right">
                    Rs. {item.quantity * item.price * (type === "renting" ? rentingDays : 1)}
                  </TableCell>
                  <TableCell>
                    <Chip label={`ID: ${item.company_id}`} size="small" variant="outlined" />
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
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Invoice
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Order #{order.id}
        </Typography>
        <Typography align="center" gutterBottom>
          Date: {formatDate(order.created_at)}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Billed To:
            </Typography>
            {order.billing_details ? (
              <>
                <Typography>{order.billing_details.fullName}</Typography>
                <Typography>{order.billing_details.email}</Typography>
                <Typography>{order.billing_details.contactNumber}</Typography>
                <Typography>{order.billing_details.deliveryLocation}</Typography>
              </>
            ) : order.renting_details ? (
              <>
                <Typography>{order.renting_details.name}</Typography>
                <Typography>{order.renting_details.contactNumber}</Typography>
              </>
            ) : (
              <Typography>Not Available</Typography>
            )}
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Order Details:
            </Typography>
            <Typography>Order Type: {order.order_type}</Typography>
            <Typography>Booking ID: {order.booking_id}</Typography>
            {order.buying_status && <Typography>Buying Status: {order.buying_status}</Typography>}
            {order.renting_status && <Typography>Renting Status: {order.renting_status}</Typography>}
          </Box>
        </Box>

        {order.buying_items && order.buying_items.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Purchased Items
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell>Company</TableCell>
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
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Rented Equipment
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell>Company</TableCell>
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
          <Typography variant="h6">
            Total Amount: Rs. {order.total_amount}
          </Typography>
        </Box>

        {order.payment_data && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Payment Information
            </Typography>
            <Typography>Transaction ID: {order.payment_data.transaction_id}</Typography>
            <Typography>Payment Method: {order.payment_data.method}</Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ClientNavbar wishlist={[]} cartItems={[]} onNavigateToProfile={handleNavigateToProfile} />
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4, flex: 1, pt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}>
              <Receipt sx={{ mr: 1, fontSize: "2rem" }} />
              Your Orders
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              View and manage all your orders
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Select
              value={filterStatus}
              onChange={handleFilterChange}
              displayEmpty
              sx={{ minWidth: "150px", backgroundColor: "background.paper" }}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="all">All</MenuItem>
            </Select>
            <ButtonGroup variant="contained">
              <Button onClick={() => navigate("/client")} startIcon={<ArrowBack />} color="primary">
                Back to Shopping
              </Button>
            </ButtonGroup>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : filteredOrders.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              No orders found
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              You haven't placed any orders yet. Start shopping to see your orders here.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredOrders.map((order) => (
              <Grid item xs={12} key={order.id}>
                <Card elevation={3} sx={{ borderRadius: 2 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor: order.order_type === "buying" ? theme.palette.primary.main : theme.palette.secondary.main,
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
                          sx={{ mr: 1 }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          color="primary"
                          title="Download Invoice"
                          onClick={() => generateInvoicePDF(order)}
                          sx={{ mr: 1 }}
                        >
                          <DownloadIcon />
                        </IconButton>
                        <IconButton
                          color="info"
                          title="Track Order"
                          onClick={() => setSnackbarMessage("Tracking not implemented yet") || setSnackbarOpen(true)}
                        >
                          <TrackChanges />
                        </IconButton>
                      </Box>
                    }
                    title={`Order #${order.id}`}
                    subheader={`Created: ${formatDate(order.created_at)}`}
                    titleTypographyProps={{ variant: "h6", fontWeight: 600 }}
                  />
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Booking ID
                          </Typography>
                          <Typography variant="body1">{order.booking_id}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Order Type
                          </Typography>
                          <Chip label={order.order_type} size="small" color={order.order_type === "buying" ? "primary" : "secondary"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Total Amount
                          </Typography>
                          <Typography variant="body1" fontWeight="bold">
                            Rs. {order.total_amount}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    {order.order_type !== "renting" && order.buying_status && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Order Status
                        </Typography>
                        <Badge>
                          <Chip
                            label={order.buying_status}
                            color={getStatusColor(order.buying_status)}
                            variant="outlined"
                            size="medium"
                          />
                        </Badge>
                      </Box>
                    )}

                    {(order.order_type === "renting" || order.order_type === "mixed") && order.renting_status && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                          <TrackChanges sx={{ verticalAlign: "middle", mr: 1 }} />
                          Rental Status
                        </Typography>
                        <Badge>
                          <Chip
                            label={order.renting_status}
                            color={getStatusColor(order.renting_status)}
                            variant="outlined"
                            size="medium"
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

                    {/* Render the invoice template for this order (hidden) */}
                    <Box sx={{ display: "none" }}>{renderInvoiceTemplate(order)}</Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Invoice Modal */}
      <Dialog open={openInvoiceModal} onClose={handleCloseInvoiceModal} maxWidth="md" fullWidth>
        <DialogTitle>Invoice for Order #{selectedOrder?.id}</DialogTitle>
        <DialogContent>
          {selectedOrder && renderInvoiceTemplate(selectedOrder)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInvoiceModal} color="primary">
            Close
          </Button>
          <Button
            onClick={() => generateInvoicePDF(selectedOrder)}
            color="primary"
            startIcon={<DownloadIcon />}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
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