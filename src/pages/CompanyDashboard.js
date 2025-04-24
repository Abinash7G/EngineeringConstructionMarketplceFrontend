// // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // import {
// // // // // //   AppBar,
// // // // // //   Toolbar,
// // // // // //   Typography,
// // // // // //   Button,
// // // // // //   Container,
// // // // // //   Grid,
// // // // // //   Box,
// // // // // //   Paper,
// // // // // //   CircularProgress,
// // // // // //   List,
// // // // // //   ListItem,
// // // // // //   ListItemIcon,
// // // // // //   ListItemText,
// // // // // //   Divider,
// // // // // //   Alert,
// // // // // // } from "@mui/material";
// // // // // // import {
// // // // // //   Dashboard as DashboardIcon,
// // // // // //   Build as BuildIcon,
// // // // // //   Inventory as InventoryIcon,
// // // // // //   CalendarToday as CalendarIcon,
// // // // // //   Description as DescriptionIcon,
// // // // // //   Settings as SettingsIcon,
// // // // // //   Add as AddIcon,
// // // // // //   Warning as WarningIcon,
// // // // // //   CheckCircle as CheckCircleIcon,
// // // // // //   Business as BusinessIcon,
// // // // // //   Assignment as AssignmentIcon,
// // // // // //   Logout as LogoutIcon,
// // // // // //   Gavel as GavelIcon,
// // // // // // } from "@mui/icons-material";
// // // // // // import ServicesManagement from "../components/ServicesManagement";
// // // // // // import MaterialsManagement from "../components/MaterialsManagement";
// // // // // // import Appointments from "../components/Appointments";
// // // // // // import Documents from "../components/Documents";
// // // // // // import ProfileSettings from "../components/ProfileSettings";
// // // // // // import CompanyUploadForm from "../components/CompanyUploadForm";
// // // // // // import InquiriesList from "../components/InquiriesList";
// // // // // // import Agreements from "../Company/Agreements";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import API from "../services/api";

// // // // // // const CompanyDashboard = () => {
// // // // // //   const [tabIndex, setTabIndex] = useState(0);
// // // // // //   const [companyName, setCompanyName] = useState("");
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [inquiries, setInquiries] = useState([]);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [hasNewInquiries, setHasNewInquiries] = useState(false);
// // // // // //   const navigate = useNavigate();
// // // // // //   const wsRef = useRef(null);
// // // // // //   const [isInquiriesClickable, setIsInquiriesClickable] = useState(false); // New state for clickable prop

// // // // // //   // CompanyDashboard.jsx (Updated WebSocket part in useEffect)
// // // // // // useEffect(() => {
// // // // // //   const loadInitialData = async () => {
// // // // // //     try {
// // // // // //       const storedCompanyName = sessionStorage.getItem("companyName");
// // // // // //       if (storedCompanyName) {
// // // // // //         setCompanyName(storedCompanyName);
// // // // // //         setLoading(false);
// // // // // //         return;
// // // // // //       }

// // // // // //       const companyId = localStorage.getItem("company_id");
// // // // // //       if (!companyId) {
// // // // // //         setError("Company ID not found. Please log in again.");
// // // // // //         navigate("/login");
// // // // // //         return;
// // // // // //       }

// // // // // //       const numericCompanyId = parseInt(companyId, 10);
// // // // // //       if (isNaN(numericCompanyId)) {
// // // // // //         setError("Invalid company ID format. Please log in again.");
// // // // // //         navigate("/login");
// // // // // //         return;
// // // // // //       }

// // // // // //       const accessToken = localStorage.getItem("access_token");
// // // // // //       if (accessToken) {
// // // // // //         API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// // // // // //       }

// // // // // //       const response = await API.get(`/company-registration/${numericCompanyId}/`);
// // // // // //       const data = response.data;
// // // // // //       setCompanyName(data.company_name);
// // // // // //       sessionStorage.setItem("companyName", data.company_name);

// // // // // //       await fetchInquiries();
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching company data:", error);
// // // // // //       if (error.response) {
// // // // // //         if (error.response.status === 404) {
// // // // // //           setError("Company not found. Please check your company ID or log in again.");
// // // // // //           navigate("/login");
// // // // // //         } else if (error.response.status === 401 || error.response.status === 403) {
// // // // // //           setError("Unauthorized access. Please log in again.");
// // // // // //           navigate("/login");
// // // // // //         } else {
// // // // // //           setError("An error occurred while loading data. Please try again.");
// // // // // //         }
// // // // // //       } else {
// // // // // //         setError("No response from server. Please check your connection and try again.");
// // // // // //       }
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };
// // // // // //   loadInitialData();

// // // // // //   const companyId = localStorage.getItem("company_id");
// // // // // //   const accessToken = localStorage.getItem("access_token");
// // // // // //   // if (companyId && accessToken) {
// // // // // //   //   const connectWebSocket = () => {
// // // // // //   //     const wsUrl = `ws://127.0.0.1:8000/ws/inquiries/${companyId}/?token=${accessToken}`;
// // // // // //   //     wsRef.current = new WebSocket(wsUrl);

// // // // // //   //     // wsRef.current.onopen = () => {
// // // // // //   //     //   console.log("WebSocket connected to:", wsUrl);
// // // // // //   //     //   setError(null); // Clear any previous WebSocket errors
// // // // // //   //     // };

// // // // // //   //     wsRef.current.onmessage = (event) => {
// // // // // //   //       const data = JSON.parse(event.data);
// // // // // //   //       if (data.type === "inquiry_update") {
// // // // // //   //         setHasNewInquiries(true);
// // // // // //   //         fetchInquiries().catch((err) => console.error("Fetch error after WebSocket:", err));
// // // // // //   //       }
// // // // // //   //     };

// // // // // //   //     wsRef.current.onclose = (event) => {
// // // // // //   //       console.log("WebSocket disconnected, attempting to reconnect...", event);
// // // // // //   //       setError("WebSocket disconnected. Reconnecting...");
// // // // // //   //       setTimeout(connectWebSocket, 5000); // Attempt to reconnect after 5 seconds
// // // // // //   //     };

// // // // // //   //     wsRef.current.onerror = (error) => {
// // // // // //   //       console.error("WebSocket error:", error);
// // // // // //   //       setError("WebSocket connection failed. Please check your network or server.");
// // // // // //   //     };
// // // // // //   //   };

// // // // // //   //   connectWebSocket();
// // // // // //   // }

// // // // // //   // return () => {
// // // // // //   //   if (wsRef.current) {
// // // // // //   //     wsRef.current.close();
// // // // // //   //   }
// // // // // //   // };
// // // // // // }, [navigate]);

// // // // // //   const fetchInquiries = async () => {
// // // // // //     try {
// // // // // //       const response = await API.get("api/company-inquiries/");
// // // // // //       setInquiries(response.data);
// // // // // //       // setHasNewInquiries(false); // Reset new inquiries flag after fetch
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching inquiries:", error);
// // // // // //       if (error.response?.status === 401) {
// // // // // //         setError("Session expired. Please log in again.");
// // // // // //         localStorage.removeItem("access_token");
// // // // // //         localStorage.removeItem("refresh_token");
// // // // // //         localStorage.removeItem("company_id");
// // // // // //         sessionStorage.removeItem("companyName");
// // // // // //         navigate("/login");
// // // // // //       } else {
// // // // // //          setError("Failed to load inquiries. Please try again.");
// // // // // //        }
// // // // // //     }
// // // // // //   };

// // // // // //   const markInquiriesChecked = async () => {
// // // // // //     try {
// // // // // //       await API.post("/mark-inquiries-checked/");
// // // // // //       setHasNewInquiries(false); // Reset new inquiries flag after marking as checked
// // // // // //     } catch (error) {
// // // // // //       console.error("Error marking inquiries as checked:", error);
// // // // // //       if (error.response?.status === 401) {
// // // // // //         setError("Session expired. Please log in again.");
// // // // // //         localStorage.removeItem("access_token");
// // // // // //         localStorage.removeItem("refresh_token");
// // // // // //         localStorage.removeItem("company_id");
// // // // // //         sessionStorage.removeItem("companyName");
// // // // // //         navigate("/login");
// // // // // //       } else {
// // // // // //         setError("Failed to mark inquiries as checked.");
// // // // // //       }
// // // // // //     }
// // // // // //   };
  
// // // // // //   // const handleMenuClick = (newIndex) => {
// // // // // //   //   setTabIndex(newIndex);
// // // // // //   //   if (newIndex === 7) {
// // // // // //   //     markInquiriesChecked(); // Mark inquiries as checked when the Inquiries tab is clicked
// // // // // //   //   }
// // // // // //   // };
// // // // // //   const handleMenuClick = (newIndex) => {
// // // // // //     setTabIndex(newIndex);
// // // // // //     if (newIndex === 7) {
// // // // // //       setIsInquiriesClickable(true); // Set clickable to true when Inquiries tab is clicked
// // // // // //       markInquiriesChecked(); // Mark inquiries as checked
// // // // // //     } else {
// // // // // //       setIsInquiriesClickable(false); // Reset clickable for other tabs
// // // // // //     }
// // // // // //   };
// // // // // //   const handleFormSubmit = (formData) => {
// // // // // //     setInquiries((prev) => [...prev, formData]);
// // // // // //   };

// // // // // //   const handleLogout = () => {
// // // // // //     localStorage.removeItem("access_token");
// // // // // //     localStorage.removeItem("refresh_token");
// // // // // //     localStorage.removeItem("company_id");
// // // // // //     sessionStorage.removeItem("companyName");
// // // // // //     delete API.defaults.headers.common["Authorization"];
// // // // // //     navigate("/login");
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <Box
// // // // // //         sx={{
// // // // // //           display: "flex",
// // // // // //           justifyContent: "center",
// // // // // //           alignItems: "center",
// // // // // //           height: "100vh",
// // // // // //         }}
// // // // // //       >
// // // // // //         <CircularProgress />
// // // // // //       </Box>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
// // // // // //       <AppBar position="static" sx={{ backgroundColor: "#2196f3", zIndex: 1201 }}>
// // // // // //         <Toolbar sx={{ justifyContent: "space-between" }}>
// // // // // //           <Typography variant="h6">Welcome, {companyName || "Guest"}</Typography>
// // // // // //           <Button color="inherit" sx={{ textTransform: "uppercase" }} onClick={handleLogout} startIcon={<LogoutIcon />}>
// // // // // //             Logout
// // // // // //           </Button>
// // // // // //         </Toolbar>
// // // // // //       </AppBar>

// // // // // //       {error && (
// // // // // //         <Alert severity="error" sx={{ m: 2 }} onClose={() => setError(null)}>
// // // // // //           {error}
// // // // // //         </Alert>
// // // // // //       )}

// // // // // //       <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
// // // // // //         <Box
// // // // // //           sx={{
// // // // // //             width: 240,
// // // // // //             backgroundColor: "#fff",
// // // // // //             borderRight: "1px solid #ddd",
// // // // // //             overflowY: "auto",
// // // // // //             flexShrink: 0,
// // // // // //           }}
// // // // // //         >
// // // // // //           <List>
// // // // // //             <ListItem button selected={tabIndex === 0} onClick={() => handleMenuClick(0)}>
// // // // // //               <ListItemIcon>
// // // // // //                 <DashboardIcon color={tabIndex === 0 ? "primary" : "inherit"} />
// // // // // //               </ListItemIcon>
// // // // // //               <ListItemText primary="Dashboard" />
// // // // // //             </ListItem>

// // // // // //             <ListItem button selected={tabIndex === 1} onClick={() => handleMenuClick(1)}>
// // // // // //               <ListItemIcon>
// // // // // //                 <BuildIcon color={tabIndex === 1 ? "primary" : "inherit"} />
// // // // // //               </ListItemIcon>
// // // // // //               <ListItemText primary="Manage Services" />
// // // // // //             </ListItem>

// // // // // //             <ListItem button selected={tabIndex === 2} onClick={() => handleMenuClick(2)}>
// // // // // //               <ListItemIcon>
// // // // // //                 <InventoryIcon color={tabIndex === 2 ? "primary" : "inherit"} />
// // // // // //               </ListItemIcon>
// // // // // //               <ListItemText primary="Manage Materials" />
// // // // // //             </ListItem>

// // // // // //             <ListItem button selected={tabIndex === 3} onClick={() => handleMenuClick(3)}>
// // // // // //               <ListItemIcon>
// // // // // //                 <CalendarIcon color={tabIndex === 3 ? "primary" : "inherit"} />
// // // // // //               </ListItemIcon>
// // // // // //               <ListItemText primary="Appointments" />
// // // // // //             </ListItem>

// // // // // //             <ListItem button selected={tabIndex === 4} onClick={() => handleMenuClick(4)}>
// // // // // //               <ListItemIcon>
// // // // // //                 <DescriptionIcon color={tabIndex === 4 ? "primary" : "inherit"} />
// // // // // //               </ListItemIcon>
// // // // // //               <ListItemText primary="Documents" />
// // // // // //             </ListItem>

// // // // // //             <ListItem button selected={tabIndex === 5} onClick={() => handleMenuClick(5)}>
// // // // // //               <ListItemIcon>
// // // // // //                 <SettingsIcon color={tabIndex === 5 ? "primary" : "inherit"} />
// // // // // //               </ListItemIcon>
// // // // // //               <ListItemText primary="Profile Settings" />
// // // // // //             </ListItem>

// // // // // //             <ListItem button selected={tabIndex === 6} onClick={() => handleMenuClick(6)}>
// // // // // //               <ListItemIcon>
// // // // // //                 <BusinessIcon color={tabIndex === 6 ? "primary" : "inherit"} />
// // // // // //               </ListItemIcon>
// // // // // //               <ListItemText primary="Upload Company Details" />
// // // // // //             </ListItem>

// // // // // //             <ListItem button selected={tabIndex === 7} onClick={() => handleMenuClick(7)}>
// // // // // //               <ListItemIcon>
// // // // // //                 <AssignmentIcon color={tabIndex === 7 ? "primary" : "inherit"} />
// // // // // //               </ListItemIcon>
// // // // // //               <ListItemText
// // // // // //                 primary="Inquiries"
// // // // // //                 secondary={hasNewInquiries ? <span style={{ color: "red" }}>New!</span> : null}
// // // // // //               />
// // // // // //             </ListItem>
// // // // // //           <ListItem button selected={tabIndex === 8} onClick={() => handleMenuClick(8)}>
// // // // // //             <ListItemIcon>
// // // // // //             <GavelIcon color={tabIndex === 8 ? "primary" : "inherit"} /> {/* Use GavelIcon */}
// // // // // //             </ListItemIcon>
// // // // // //             <ListItemText primary="Agreements" />
// // // // // //             </ListItem>
// // // // // //           </List>
// // // // // //         </Box>

// // // // // //         <Box
// // // // // //           sx={{
// // // // // //             flex: 1,
// // // // // //             overflowY: "auto",
// // // // // //             backgroundColor: "#f5f5f5",
// // // // // //             p: 2,
// // // // // //             position: "relative",
// // // // // //           }}
// // // // // //         >
// // // // // //           <Container sx={{ py: 3, maxWidth: "100% !important" }}>
// // // // // //             {tabIndex === 0 && (
// // // // // //               <Box>
// // // // // //                 <Grid container spacing={3}>
// // // // // //                   <Grid item xs={12} md={4}>
// // // // // //                     <Paper
// // // // // //                       sx={{
// // // // // //                         p: 3,
// // // // // //                         "&:hover": { boxShadow: 3 },
// // // // // //                         transition: "box-shadow 0.3s",
// // // // // //                       }}
// // // // // //                     >
// // // // // //                       <Typography color="textSecondary">Total Services</Typography>
// // // // // //                       <Typography variant="h4" color="#2196f3" sx={{ mt: 1 }}>
// // // // // //                         10
// // // // // //                       </Typography>
// // // // // //                     </Paper>
// // // // // //                   </Grid>
// // // // // //                   <Grid item xs={12} md={4}>
// // // // // //                     <Paper
// // // // // //                       sx={{
// // // // // //                         p: 3,
// // // // // //                         "&:hover": { boxShadow: 3 },
// // // // // //                         transition: "box-shadow 0.3s",
// // // // // //                       }}
// // // // // //                     >
// // // // // //                       <Typography color="textSecondary">Pending Appointments</Typography>
// // // // // //                       <Typography variant="h4" sx={{ mt: 1, color: "#e91e63" }}>
// // // // // //                         5
// // // // // //                       </Typography>
// // // // // //                     </Paper>
// // // // // //                   </Grid>
// // // // // //                   <Grid item xs={12} md={4}>
// // // // // //                     <Paper
// // // // // //                       sx={{
// // // // // //                         p: 3,
// // // // // //                         "&:hover": { boxShadow: 3 },
// // // // // //                         transition: "box-shadow 0.3s",
// // // // // //                       }}
// // // // // //                     >
// // // // // //                       <Typography color="textSecondary">Total Revenue</Typography>
// // // // // //                       <Typography variant="h4" sx={{ mt: 1 }}>
// // // // // //                         RS. 50,000
// // // // // //                       </Typography>
// // // // // //                     </Paper>
// // // // // //                   </Grid>
// // // // // //                 </Grid>

// // // // // //                 <Box mt={4}>
// // // // // //                   <Typography variant="h6" gutterBottom>
// // // // // //                     Revenue and Appointments Analytics
// // // // // //                   </Typography>
// // // // // //                   <Paper sx={{ p: 2 }}>
// // // // // //                     <Typography variant="body2">
// // // // // //                       Analytics data is currently unavailable.
// // // // // //                     </Typography>
// // // // // //                   </Paper>
// // // // // //                 </Box>

// // // // // //                 <Box mt={4}>
// // // // // //                   <Typography variant="h6" gutterBottom>
// // // // // //                     Quick Actions
// // // // // //                   </Typography>
// // // // // //                   <Grid container spacing={2}>
// // // // // //                     <Grid item xs={12} sm={6} md={3}>
// // // // // //                       <Button
// // // // // //                         fullWidth
// // // // // //                         variant="contained"
// // // // // //                         startIcon={<AddIcon />}
// // // // // //                         sx={{
// // // // // //                           backgroundColor: "#2196f3",
// // // // // //                           textTransform: "uppercase",
// // // // // //                           "&:hover": { backgroundColor: "#1976d2" },
// // // // // //                         }}
// // // // // //                         onClick={() => handleMenuClick(1)}
// // // // // //                       >
// // // // // //                         + Add New Service
// // // // // //                       </Button>
// // // // // //                     </Grid>
// // // // // //                     <Grid item xs={12} sm={6} md={3}>
// // // // // //                       <Button
// // // // // //                         fullWidth
// // // // // //                         variant="contained"
// // // // // //                         startIcon={<AddIcon />}
// // // // // //                         sx={{
// // // // // //                           backgroundColor: "#2196f3",
// // // // // //                           textTransform: "uppercase",
// // // // // //                           "&:hover": { backgroundColor: "#1976d2" },
// // // // // //                         }}
// // // // // //                         onClick={() => handleMenuClick(2)}
// // // // // //                       >
// // // // // //                         + Add New Material
// // // // // //                       </Button>
// // // // // //                     </Grid>
// // // // // //                     <Grid item xs={12} sm={6} md={3}>
// // // // // //                       <Button
// // // // // //                         fullWidth
// // // // // //                         variant="contained"
// // // // // //                         startIcon={<CalendarIcon />}
// // // // // //                         sx={{
// // // // // //                           backgroundColor: "#2196f3",
// // // // // //                           textTransform: "uppercase",
// // // // // //                           "&:hover": { backgroundColor: "#1976d2" },
// // // // // //                         }}
// // // // // //                         onClick={() => handleMenuClick(3)}
// // // // // //                       >
// // // // // //                         □ View Appointments
// // // // // //                       </Button>
// // // // // //                     </Grid>
// // // // // //                     <Grid item xs={12} sm={6} md={3}>
// // // // // //                       <Button
// // // // // //                         fullWidth
// // // // // //                         variant="contained"
// // // // // //                         startIcon={<DescriptionIcon />}
// // // // // //                         sx={{
// // // // // //                           backgroundColor: "#2196f3",
// // // // // //                           textTransform: "uppercase",
// // // // // //                           "&:hover": { backgroundColor: "#1976d2" },
// // // // // //                         }}
// // // // // //                         onClick={() => handleMenuClick(4)}
// // // // // //                       >
// // // // // //                         □ Generate Document
// // // // // //                       </Button>
// // // // // //                     </Grid>
// // // // // //                   </Grid>
// // // // // //                 </Box>

// // // // // //                 <Box mt={4}>
// // // // // //                   <Typography variant="h6" gutterBottom>
// // // // // //                     Notifications
// // // // // //                   </Typography>
// // // // // //                   <Paper sx={{ p: 2 }}>
// // // // // //                     <List>
// // // // // //                       <ListItem>
// // // // // //                         <ListItemIcon>
// // // // // //                           <CalendarIcon color="primary" />
// // // // // //                         </ListItemIcon>
// // // // // //                         <ListItemText primary="Upcoming Appointment: Site Inspection on 12th Feb, 2025" />
// // // // // //                       </ListItem>
// // // // // //                       <Divider />
// // // // // //                       <ListItem>
// // // // // //                         <ListItemIcon>
// // // // // //                           <WarningIcon color="warning" />
// // // // // //                         </ListItemIcon>
// // // // // //                         <ListItemText primary="Low Stock Alert: Cement stock below threshold." />
// // // // // //                       </ListItem>
// // // // // //                       <Divider />
// // // // // //                       <ListItem>
// // // // // //                         <ListItemIcon>
// // // // // //                           <CheckCircleIcon color="success" />
// // // // // //                         </ListItemIcon>
// // // // // //                         <ListItemText primary="Recent Service Added: Residential Construction Service." />
// // // // // //                       </ListItem>
// // // // // //                     </List>
// // // // // //                   </Paper>
// // // // // //                 </Box>
// // // // // //               </Box>
// // // // // //             )}

// // // // // //             {tabIndex === 1 && <ServicesManagement />}
// // // // // //             {tabIndex === 2 && <MaterialsManagement />}
// // // // // //             {tabIndex === 3 && <Appointments />}
// // // // // //             {tabIndex === 4 && <Documents />}
// // // // // //             {tabIndex === 5 && <ProfileSettings />}
// // // // // //             {tabIndex === 6 && <CompanyUploadForm onSubmit={handleFormSubmit} />}
// // // // // //             {/* {tabIndex === 7 && <InquiriesList inquiries={inquiries.length > 0 ? inquiries : undefined} />} */}
// // // // // //             {tabIndex === 7 && (
// // // // // //               <InquiriesList
// // // // // //                 inquiries={inquiries.length > 0 ? inquiries : undefined}
// // // // // //                 clickable={isInquiriesClickable} // Pass the clickable prop
// // // // // //               />
// // // // // //             )}
// // // // // //             {tabIndex === 8 && <Agreements userType="company" />}
// // // // // //           </Container>
// // // // // //         </Box>

// // // // // //         {tabIndex === 0 && (
// // // // // //           <Box
// // // // // //             sx={{
// // // // // //               width: 300,
// // // // // //               backgroundColor: "#f0f0f0",
// // // // // //               borderLeft: "1px solid #ddd",
// // // // // //               p: 2,
// // // // // //               position: "sticky",
// // // // // //               right: 0,
// // // // // //               top: 64,
// // // // // //               bottom: 0,
// // // // // //               overflowY: "auto",
// // // // // //               zIndex: 1000,
// // // // // //               height: "calc(100vh - 64px)",
// // // // // //               boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
// // // // // //             }}
// // // // // //           >
// // // // // //             <Typography variant="h6" gutterBottom>
// // // // // //               Recent Activity
// // // // // //             </Typography>
// // // // // //           </Box>
// // // // // //         )}
// // // // // //       </Box>
// // // // // //     </Box>
// // // // // //   );
// // // // // // };

// // // // // // export default CompanyDashboard;

// // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import {
// // // // //   AppBar,
// // // // //   Toolbar,
// // // // //   Typography,
// // // // //   Button,
// // // // //   Container,
// // // // //   Grid,
// // // // //   Box,
// // // // //   Paper,
// // // // //   CircularProgress,
// // // // //   List,
// // // // //   ListItem,
// // // // //   ListItemIcon,
// // // // //   ListItemText,
// // // // //   Divider,
// // // // //   Alert,
// // // // //   Modal,
// // // // //   IconButton,
// // // // // } from "@mui/material";
// // // // // import {
// // // // //   Dashboard as DashboardIcon,
// // // // //   Build as BuildIcon,
// // // // //   Inventory as InventoryIcon,
// // // // //   CalendarToday as CalendarIcon,
// // // // //   Description as DescriptionIcon,
// // // // //   ShoppingCart as ShoppingCartIcon,
// // // // //   Add as AddIcon,
// // // // //   Warning as WarningIcon,
// // // // //   CheckCircle as CheckCircleIcon,
// // // // //   Business as BusinessIcon,
// // // // //   Assignment as AssignmentIcon,
// // // // //   Logout as LogoutIcon,
// // // // //   Gavel as GavelIcon,
// // // // //   Payment as PaymentIcon,
// // // // // } from "@mui/icons-material";
// // // // // import ServicesManagement from "../components/ServicesManagement";
// // // // // import MaterialsManagement from "../components/MaterialsManagement";
// // // // // import Appointments from "../components/Appointments";
// // // // // import Documents from "../components/Documents";
// // // // // import CompanyUploadForm from "../components/CompanyUploadForm";
// // // // // import InquiriesList from "../components/InquiriesList";
// // // // // import Agreements from "../Company/Agreements";
// // // // // import Subscription from "../Company/Subscription"; 
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import API from "../services/api";
// // // // // import CompanyOrdersPage from "../components/CompanyordersPage";

// // // // // const CompanyDashboard = () => {
// // // // //   const [tabIndex, setTabIndex] = useState(0);
// // // // //   const [companyName, setCompanyName] = useState("");
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [inquiries, setInquiries] = useState([]);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [hasNewInquiries, setHasNewInquiries] = useState(false);
// // // // //   const [isInquiriesClickable, setIsInquiriesClickable] = useState(false);
// // // // //   const [subscriptionData, setSubscriptionData] = useState(null); // To store subscription info
// // // // //   const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false); // To control modal visibility
// // // // //   const [remainingDays, setRemainingDays] = useState(0); // To store remaining days
// // // // //   const navigate = useNavigate();
// // // // //   const wsRef = useRef(null);

// // // // //   useEffect(() => {
// // // // //     const loadInitialData = async () => {
// // // // //       try {
// // // // //         const storedCompanyName = sessionStorage.getItem("companyName");
// // // // //         if (storedCompanyName) {
// // // // //           setCompanyName(storedCompanyName);
// // // // //         }

// // // // //         const companyId = localStorage.getItem("company_id");
// // // // //         if (!companyId) {
// // // // //           setError("Company ID not found. Please log in again.");
// // // // //           navigate("/login");
// // // // //           return;
// // // // //         }

// // // // //         const numericCompanyId = parseInt(companyId, 10);
// // // // //         if (isNaN(numericCompanyId)) {
// // // // //           setError("Invalid company ID format. Please log in again.");
// // // // //           navigate("/login");
// // // // //           return;
// // // // //         }

// // // // //         const accessToken = localStorage.getItem("access_token");
// // // // //         if (accessToken) {
// // // // //           API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// // // // //         }

// // // // //         // Fetch company data
// // // // //         const companyResponse = await API.get(`/company-registration/${numericCompanyId}/`);
// // // // //         const companyData = companyResponse.data;
// // // // //         setCompanyName(companyData.company_name);
// // // // //         sessionStorage.setItem("companyName", companyData.company_name);

// // // // //         // Fetch subscription data
// // // // //         const subscriptionResponse = await API.get(`/subscription-status/${numericCompanyId}/`);
// // // // //         const subData = subscriptionResponse.data;
// // // // //         setSubscriptionData(subData);

// // // // //         if (!subData.is_subscribed) {
// // // // //           setOpenSubscriptionModal(true); // Open modal if not subscribed
// // // // //         } else {
// // // // //           // Calculate remaining days
// // // // //           const endDate = new Date(subData.end_date);
// // // // //           const today = new Date();
// // // // //           const timeDiff = endDate - today;
// // // // //           const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
// // // // //           setRemainingDays(daysLeft > 0 ? daysLeft : 0);
// // // // //         }

// // // // //         await fetchInquiries();
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching data:", error);
// // // // //         if (error.response) {
// // // // //           if (error.response.status === 404) {
// // // // //             setError("Company not found. Please check your company ID or log in again.");
// // // // //             navigate("/login");
// // // // //           } else if (error.response.status === 401 || error.response.status === 403) {
// // // // //             setError("Unauthorized access. Please log in again.");
// // // // //             navigate("/login");
// // // // //           } else {
// // // // //             setError("An error occurred while loading data. Please try again.");
// // // // //           }
// // // // //         } else {
// // // // //           setError("No response from server. Please check your connection and try again.");
// // // // //         }
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     loadInitialData();
// // // // //   }, [navigate]);

// // // // //   const fetchInquiries = async () => {
// // // // //     try {
// // // // //       const response = await API.get("api/company-inquiries/");
// // // // //       setInquiries(response.data);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching inquiries:", error);
// // // // //       if (error.response?.status === 401) {
// // // // //         setError("Session expired. Please log in again.");
// // // // //         handleLogout();
// // // // //       } else {
// // // // //         setError("Failed to load inquiries. Please try again.");
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const markInquiriesChecked = async () => {
// // // // //     try {
// // // // //       await API.post("/mark-inquiries-checked/");
// // // // //       setHasNewInquiries(false);
// // // // //     } catch (error) {
// // // // //       console.error("Error marking inquiries as checked:", error);
// // // // //       if (error.response?.status === 401) {
// // // // //         setError("Session expired. Please log in again.");
// // // // //         handleLogout();
// // // // //       } else {
// // // // //         setError("Failed to mark inquiries as checked.");
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleMenuClick = (newIndex) => {
// // // // //     setTabIndex(newIndex);
// // // // //     if (newIndex === 7) {
// // // // //       setIsInquiriesClickable(true);
// // // // //       markInquiriesChecked();
// // // // //     } else {
// // // // //       setIsInquiriesClickable(false);
// // // // //     }
// // // // //   };

// // // // //   const handleFormSubmit = (formData) => {
// // // // //     setInquiries((prev) => [...prev, formData]);
// // // // //   };

// // // // //   const handleLogout = () => {
// // // // //     localStorage.removeItem("access_token");
// // // // //     localStorage.removeItem("refresh_token");
// // // // //     localStorage.removeItem("company_id");
// // // // //     sessionStorage.removeItem("companyName");
// // // // //     delete API.defaults.headers.common["Authorization"];
// // // // //     navigate("/login");
// // // // //   };

// // // // //   const handleOpenSubscriptionModal = () => {
// // // // //     setOpenSubscriptionModal(true);
// // // // //   };

// // // // //   const handleCloseSubscriptionModal = () => {
// // // // //     setOpenSubscriptionModal(false);
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <Box
// // // // //         sx={{
// // // // //           display: "flex",
// // // // //           justifyContent: "center",
// // // // //           alignItems: "center",
// // // // //           height: "100vh",
// // // // //         }}
// // // // //       >
// // // // //         <CircularProgress />
// // // // //       </Box>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
// // // // //       <AppBar position="static" sx={{ backgroundColor: "#2196f3", zIndex: 1201 }}>
// // // // //         <Toolbar sx={{ justifyContent: "space-between" }}>
// // // // //           <Typography variant="h6">Welcome, {companyName || "Guest"}</Typography>
// // // // //           <Box sx={{ display: "flex", alignItems: "center" }}>
// // // // //             {subscriptionData?.is_subscribed && (
// // // // //               <Typography variant="body2" sx={{ mr: 2, color: "#fff" }}>
// // // // //                 Subscription: {remainingDays} days remaining
// // // // //                 <IconButton
// // // // //                   color="inherit"
// // // // //                   onClick={handleOpenSubscriptionModal}
// // // // //                   sx={{ ml: 1 }}
// // // // //                 >
// // // // //                   <PaymentIcon />
// // // // //                 </IconButton>
// // // // //               </Typography>
// // // // //             )}
// // // // //             <Button
// // // // //               color="inherit"
// // // // //               sx={{ textTransform: "uppercase" }}
// // // // //               onClick={handleLogout}
// // // // //               startIcon={<LogoutIcon />}
// // // // //             >
// // // // //               Logout
// // // // //             </Button>
// // // // //           </Box>
// // // // //         </Toolbar>
// // // // //       </AppBar>

// // // // //       {error && (
// // // // //         <Alert severity="error" sx={{ m: 2 }} onClose={() => setError(null)}>
// // // // //           {error}
// // // // //         </Alert>
// // // // //       )}

// // // // //       <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
// // // // //         <Box
// // // // //           sx={{
// // // // //             width: 240,
// // // // //             backgroundColor: "#fff",
// // // // //             borderRight: "1px solid #ddd",
// // // // //             overflowY: "auto",
// // // // //             flexShrink: 0,
// // // // //           }}
// // // // //         >
// // // // //           <List>
// // // // //             <ListItem button selected={tabIndex === 0} onClick={() => handleMenuClick(0)}>
// // // // //               <ListItemIcon>
// // // // //                 <DashboardIcon color={tabIndex === 0 ? "primary" : "inherit"} />
// // // // //               </ListItemIcon>
// // // // //               <ListItemText primary="Dashboard" />
// // // // //             </ListItem>
// // // // //             <ListItem button selected={tabIndex === 1} onClick={() => handleMenuClick(1)}>
// // // // //               <ListItemIcon>
// // // // //                 <BuildIcon color={tabIndex === 1 ? "primary" : "inherit"} />
// // // // //               </ListItemIcon>
// // // // //               <ListItemText primary="Manage Services" />
// // // // //             </ListItem>
// // // // //             <ListItem button selected={tabIndex === 2} onClick={() => handleMenuClick(2)}>
// // // // //               <ListItemIcon>
// // // // //                 <InventoryIcon color={tabIndex === 2 ? "primary" : "inherit"} />
// // // // //               </ListItemIcon>
// // // // //               <ListItemText primary="Manage Materials" />
// // // // //             </ListItem>
// // // // //             <ListItem button selected={tabIndex === 3} onClick={() => handleMenuClick(3)}>
// // // // //               <ListItemIcon>
// // // // //                 <CalendarIcon color={tabIndex === 3 ? "primary" : "inherit"} />
// // // // //               </ListItemIcon>
// // // // //               <ListItemText primary="Appointments" />
// // // // //             </ListItem>
// // // // //             <ListItem button selected={tabIndex === 4} onClick={() => handleMenuClick(4)}>
// // // // //               <ListItemIcon>
// // // // //                 <DescriptionIcon color={tabIndex === 4 ? "primary" : "inherit"} />
// // // // //               </ListItemIcon>
// // // // //               <ListItemText primary="Documents" />
// // // // //             </ListItem>
// // // // //             <ListItem button selected={tabIndex === 5} onClick={() => handleMenuClick(5)}>
// // // // //               <ListItemIcon>
// // // // //                 <ShoppingCartIcon color={tabIndex === 5 ? "primary" : "inherit"} />
// // // // //               </ListItemIcon>
// // // // //               <ListItemText primary="Order" />
// // // // //             </ListItem>
// // // // //             <ListItem button selected={tabIndex === 6} onClick={() => handleMenuClick(6)}>
// // // // //               <ListItemIcon>
// // // // //                 <BusinessIcon color={tabIndex === 6 ? "primary" : "inherit"} />
// // // // //               </ListItemIcon>
// // // // //               <ListItemText primary="Upload Company Details" />
// // // // //             </ListItem>
// // // // //             <ListItem button selected={tabIndex === 7} onClick={() => handleMenuClick(7)}>
// // // // //               <ListItemIcon>
// // // // //                 <AssignmentIcon color={tabIndex === 7 ? "primary" : "inherit"} />
// // // // //               </ListItemIcon>
// // // // //               <ListItemText
// // // // //                 primary="Inquiries"
// // // // //                 secondary={hasNewInquiries ? <span style={{ color: "red" }}>New!</span> : null}
// // // // //               />
// // // // //             </ListItem>
// // // // //             <ListItem button selected={tabIndex === 8} onClick={() => handleMenuClick(8)}>
// // // // //               <ListItemIcon>
// // // // //                 <GavelIcon color={tabIndex === 8 ? "primary" : "inherit"} />
// // // // //               </ListItemIcon>
// // // // //               <ListItemText primary="Agreements" />
// // // // //             </ListItem>
// // // // //           </List>
// // // // //         </Box>

// // // // //         <Box
// // // // //           sx={{
// // // // //             flex: 1,
// // // // //             overflowY: "auto",
// // // // //             backgroundColor: "#f5f5f5",
// // // // //             p: 2,
// // // // //             position: "relative",
// // // // //           }}
// // // // //         >
// // // // //           <Container sx={{ py: 3, maxWidth: "100% !important" }}>
// // // // //             {tabIndex === 0 && (
// // // // //               <Box>
// // // // //                 <Grid container spacing={3}>
// // // // //                   <Grid item xs={12} md={4}>
// // // // //                     <Paper
// // // // //                       sx={{
// // // // //                         p: 3,
// // // // //                         "&:hover": { boxShadow: 3 },
// // // // //                         transition: "box-shadow 0.3s",
// // // // //                       }}
// // // // //                     >
// // // // //                       <Typography color="textSecondary">Total Services</Typography>
// // // // //                       <Typography variant="h4" color="#2196f3" sx={{ mt: 1 }}>
// // // // //                         10
// // // // //                       </Typography>
// // // // //                     </Paper>
// // // // //                   </Grid>
// // // // //                   <Grid item xs={12} md={4}>
// // // // //                     <Paper
// // // // //                       sx={{
// // // // //                         p: 3,
// // // // //                         "&:hover": { boxShadow: 3 },
// // // // //                         transition: "box-shadow 0.3s",
// // // // //                       }}
// // // // //                     >
// // // // //                       <Typography color="textSecondary">Pending Appointments</Typography>
// // // // //                       <Typography variant="h4" sx={{ mt: 1, color: "#e91e63" }}>
// // // // //                         5
// // // // //                       </Typography>
// // // // //                     </Paper>
// // // // //                   </Grid>
// // // // //                   <Grid item xs={12} md={4}>
// // // // //                     <Paper
// // // // //                       sx={{
// // // // //                         p: 3,
// // // // //                         "&:hover": { boxShadow: 3 },
// // // // //                         transition: "box-shadow 0.3s",
// // // // //                       }}
// // // // //                     >
// // // // //                       <Typography color="textSecondary">Total Revenue</Typography>
// // // // //                       <Typography variant="h4" sx={{ mt: 1 }}>
// // // // //                         RS. 50,000
// // // // //                       </Typography>
// // // // //                     </Paper>
// // // // //                   </Grid>
// // // // //                 </Grid>

// // // // //                 <Box mt={4}>
// // // // //                   <Typography variant="h6" gutterBottom>
// // // // //                     Revenue and Appointments Analytics
// // // // //                   </Typography>
// // // // //                   <Paper sx={{ p: 2 }}>
// // // // //                     <Typography variant="body2">
// // // // //                       Analytics data is currently unavailable.
// // // // //                     </Typography>
// // // // //                   </Paper>
// // // // //                 </Box>

// // // // //                 <Box mt={4}>
// // // // //                   <Typography variant="h6" gutterBottom>
// // // // //                     Quick Actions
// // // // //                   </Typography>
// // // // //                   <Grid container spacing={2}>
// // // // //                     <Grid item xs={12} sm={6} md={3}>
// // // // //                       <Button
// // // // //                         fullWidth
// // // // //                         variant="contained"
// // // // //                         startIcon={<AddIcon />}
// // // // //                         sx={{
// // // // //                           backgroundColor: "#2196f3",
// // // // //                           textTransform: "uppercase",
// // // // //                           "&:hover": { backgroundColor: "#1976d2" },
// // // // //                         }}
// // // // //                         onClick={() => handleMenuClick(1)}
// // // // //                       >
// // // // //                         Add New Service
// // // // //                       </Button>
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} sm={6} md={3}>
// // // // //                       <Button
// // // // //                         fullWidth
// // // // //                         variant="contained"
// // // // //                         startIcon={<AddIcon />}
// // // // //                         sx={{
// // // // //                           backgroundColor: "#2196f3",
// // // // //                           textTransform: "uppercase",
// // // // //                           "&:hover": { backgroundColor: "#1976d2" },
// // // // //                         }}
// // // // //                         onClick={() => handleMenuClick(2)}
// // // // //                       >
// // // // //                         Add New Material
// // // // //                       </Button>
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} sm={6} md={3}>
// // // // //                       <Button
// // // // //                         fullWidth
// // // // //                         variant="contained"
// // // // //                         startIcon={<CalendarIcon />}
// // // // //                         sx={{
// // // // //                           backgroundColor: "#2196f3",
// // // // //                           textTransform: "uppercase",
// // // // //                           "&:hover": { backgroundColor: "#1976d2" },
// // // // //                         }}
// // // // //                         onClick={() => handleMenuClick(3)}
// // // // //                       >
// // // // //                         View Appointments
// // // // //                       </Button>
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} sm={6} md={3}>
// // // // //                       <Button
// // // // //                         fullWidth
// // // // //                         variant="contained"
// // // // //                         startIcon={<DescriptionIcon />}
// // // // //                         sx={{
// // // // //                           backgroundColor: "#2196f3",
// // // // //                           textTransform: "uppercase",
// // // // //                           "&:hover": { backgroundColor: "#1976d2" },
// // // // //                         }}
// // // // //                         onClick={() => handleMenuClick(4)}
// // // // //                       >
// // // // //                         Generate Document
// // // // //                       </Button>
// // // // //                     </Grid>
// // // // //                   </Grid>
// // // // //                 </Box>

// // // // //                 <Box mt={4}>
// // // // //                   <Typography variant="h6" gutterBottom>
// // // // //                     Notifications
// // // // //                   </Typography>
// // // // //                   <Paper sx={{ p: 2 }}>
// // // // //                     <List>
// // // // //                       <ListItem>
// // // // //                         <ListItemIcon>
// // // // //                           <CalendarIcon color="primary" />
// // // // //                         </ListItemIcon>
// // // // //                         <ListItemText primary="Upcoming Appointment: Site Inspection on 12th Feb, 2025" />
// // // // //                       </ListItem>
// // // // //                       <Divider />
// // // // //                       <ListItem>
// // // // //                         <ListItemIcon>
// // // // //                           <WarningIcon color="warning" />
// // // // //                         </ListItemIcon>
// // // // //                         <ListItemText primary="Low Stock Alert: Cement stock below threshold." />
// // // // //                       </ListItem>
// // // // //                       <Divider />
// // // // //                       <ListItem>
// // // // //                         <ListItemIcon>
// // // // //                           <CheckCircleIcon color="success" />
// // // // //                         </ListItemIcon>
// // // // //                         <ListItemText primary="Recent Service Added: Residential Construction Service." />
// // // // //                       </ListItem>
// // // // //                     </List>
// // // // //                   </Paper>
// // // // //                 </Box>
// // // // //               </Box>
// // // // //             )}

// // // // //             {tabIndex === 1 && <ServicesManagement />}
// // // // //             {tabIndex === 2 && <MaterialsManagement />}
// // // // //             {tabIndex === 3 && <Appointments />}
// // // // //             {tabIndex === 4 && <Documents />}
// // // // //             {tabIndex === 5 && <CompanyOrdersPage />}
// // // // //             {tabIndex === 6 && <CompanyUploadForm onSubmit={handleFormSubmit} />}
// // // // //             {tabIndex === 7 && (
// // // // //               <InquiriesList
// // // // //                 inquiries={inquiries.length > 0 ? inquiries : undefined}
// // // // //                 clickable={isInquiriesClickable}
// // // // //               />
// // // // //             )}
// // // // //             {tabIndex === 8 && <Agreements userType="company" />}
// // // // //           </Container>
// // // // //         </Box>

// // // // //         {tabIndex === 0 && (
// // // // //           <Box
// // // // //             sx={{
// // // // //               width: 300,
// // // // //               backgroundColor: "#f0f0f0",
// // // // //               borderLeft: "1px solid #ddd",
// // // // //               p: 2,
// // // // //               position: "sticky",
// // // // //               right: 0,
// // // // //               top: 64,
// // // // //               bottom: 0,
// // // // //               overflowY: "auto",
// // // // //               zIndex: 1000,
// // // // //               height: "calc(100vh - 64px)",
// // // // //               boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
// // // // //             }}
// // // // //           >
// // // // //             <Typography variant="h6" gutterBottom>
// // // // //               Recent Activity
// // // // //             </Typography>
// // // // //           </Box>
// // // // //         )}
// // // // //       </Box>

// // // // //       {/* Subscription Modal */}
// // // // //       <Modal
// // // // //         open={openSubscriptionModal}
// // // // //         onClose={handleCloseSubscriptionModal}
// // // // //         aria-labelledby="subscription-modal-title"
// // // // //         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
// // // // //       >
// // // // //         <Box sx={{ outline: "none" }}>
// // // // //           <Subscription
// // // // //             companyId={localStorage.getItem("company_id")}
// // // // //             onLogout={handleLogout}
// // // // //             remainingDays={remainingDays} // Pass remaining days to Subscription
// // // // //             onSubscribe={() => {
// // // // //               handleCloseSubscriptionModal();
// // // // //               window.location.reload(); // Refresh to update subscription status
// // // // //             }}
// // // // //           />
// // // // //         </Box>
// // // // //       </Modal>
// // // // //     </Box>
// // // // //   );
// // // // // };

// // // // // export default CompanyDashboard;
// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import {
// // // //   AppBar,
// // // //   Toolbar,
// // // //   Typography,
// // // //   Button,
// // // //   Container,
// // // //   Grid,
// // // //   Box,
// // // //   Paper,
// // // //   CircularProgress,
// // // //   List,
// // // //   ListItem,
// // // //   ListItemIcon,
// // // //   ListItemText,
// // // //   Divider,
// // // //   Alert,
// // // //   Modal,
// // // //   IconButton,
// // // // } from "@mui/material";
// // // // import {
// // // //   Dashboard as DashboardIcon,
// // // //   Build as BuildIcon,
// // // //   Inventory as InventoryIcon,
// // // //   CalendarToday as CalendarIcon,
// // // //   Description as DescriptionIcon,
// // // //   ShoppingCart as ShoppingCartIcon,
// // // //   Add as AddIcon,
// // // //   Warning as WarningIcon,
// // // //   CheckCircle as CheckCircleIcon,
// // // //   Business as BusinessIcon,
// // // //   Assignment as AssignmentIcon,
// // // //   Logout as LogoutIcon,
// // // //   Gavel as GavelIcon,
// // // //   Payment as PaymentIcon,
// // // // } from "@mui/icons-material";
// // // // import ServicesManagement from "../components/ServicesManagement";
// // // // import MaterialsManagement from "../components/MaterialsManagement";
// // // // import Appointments from "../components/Appointments";
// // // // import Documents from "../components/Documents";
// // // // import CompanyUploadForm from "../components/CompanyUploadForm";
// // // // import InquiriesList from "../components/InquiriesList";
// // // // import Agreements from "../Company/Agreements";
// // // // import Subscription from "../Company/Subscription"; 
// // // // import { useNavigate } from "react-router-dom";
// // // // import API from "../services/api";
// // // // import CompanyOrdersPage from "../components/CompanyordersPage";

// // // // const CompanyDashboard = () => {
// // // //   const [tabIndex, setTabIndex] = useState(0);
// // // //   const [companyName, setCompanyName] = useState("");
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [inquiries, setInquiries] = useState([]);
// // // //   const [error, setError] = useState(null);
// // // //   const [hasNewInquiries, setHasNewInquiries] = useState(false);
// // // //   const [isInquiriesClickable, setIsInquiriesClickable] = useState(false);
// // // //   const [subscriptionData, setSubscriptionData] = useState(null);
// // // //   const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
// // // //   const [remainingDays, setRemainingDays] = useState(0);
  
// // // //   // State for dynamic dashboard data
// // // //   const [dashboardData, setDashboardData] = useState({
// // // //     total_services: 0,
// // // //     pending_appointments: 0,
// // // //     total_revenue: 0,
// // // //   });

// // // //   const navigate = useNavigate();
// // // //   const wsRef = useRef(null);

// // // //   useEffect(() => {
// // // //     const loadInitialData = async () => {
// // // //       try {
// // // //         const storedCompanyName = sessionStorage.getItem("companyName");
// // // //         if (storedCompanyName) {
// // // //           setCompanyName(storedCompanyName);
// // // //         }

// // // //         const companyId = localStorage.getItem("company_id");
// // // //         if (!companyId) {
// // // //           setError("Company ID not found. Please log in again.");
// // // //           navigate("/login");
// // // //           return;
// // // //         }

// // // //         const numericCompanyId = parseInt(companyId, 10);
// // // //         if (isNaN(numericCompanyId)) {
// // // //           setError("Invalid company ID format. Please log in again.");
// // // //           navigate("/login");
// // // //           return;
// // // //         }

// // // //         const accessToken = localStorage.getItem("access_token");
// // // //         if (accessToken) {
// // // //           API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// // // //         }

// // // //         // Fetch company data
// // // //         const companyResponse = await API.get(`/company-registration/${numericCompanyId}/`);
// // // //         const companyData = companyResponse.data;
// // // //         setCompanyName(companyData.company_name);
// // // //         sessionStorage.setItem("companyName", companyData.company_name);

// // // //         // Fetch subscription data
// // // //         const subscriptionResponse = await API.get(`/subscription-status/${numericCompanyId}/`);
// // // //         const subData = subscriptionResponse.data;
// // // //         setSubscriptionData(subData);

// // // //         if (!subData.is_subscribed) {
// // // //           setOpenSubscriptionModal(true);
// // // //         } else {
// // // //           const endDate = new Date(subData.end_date);
// // // //           const today = new Date();
// // // //           const timeDiff = endDate - today;
// // // //           const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
// // // //           setRemainingDays(daysLeft > 0 ? daysLeft : 0);
// // // //         }

// // // //         // Fetch dashboard data
// // // //         const dashboardResponse = await API.get("/api/company-dashboard-data/");
// // // //         setDashboardData(dashboardResponse.data);

// // // //         await fetchInquiries();
// // // //       } catch (error) {
// // // //         console.error("Error fetching data:", error);
// // // //         if (error.response) {
// // // //           if (error.response.status === 404) {
// // // //             setError("Company not found. Please check your company ID or log in again.");
// // // //             navigate("/login");
// // // //           } else if (error.response.status === 401 || error.response.status === 403) {
// // // //             setError("Unauthorized access. Please log in again.");
// // // //             navigate("/login");
// // // //           } else {
// // // //             setError("An error occurred while loading data. Please try again.");
// // // //           }
// // // //         } else {
// // // //           setError("No response from server. Please check your connection and try again.");
// // // //         }
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     loadInitialData();
// // // //   }, [navigate]);

// // // //   const fetchInquiries = async () => {
// // // //     try {
// // // //       const response = await API.get("api/company-inquiries/");
// // // //       setInquiries(response.data);
// // // //     } catch (error) {
// // // //       console.error("Error fetching inquiries:", error);
// // // //       if (error.response?.status === 401) {
// // // //         setError("Session expired. Please log in again.");
// // // //         handleLogout();
// // // //       } else {
// // // //         setError("Failed to load inquiries. Please try again.");
// // // //       }
// // // //     }
// // // //   };

// // // //   const markInquiriesChecked = async () => {
// // // //     try {
// // // //       await API.post("/mark-inquiries-checked/");
// // // //       setHasNewInquiries(false);
// // // //     } catch (error) {
// // // //       console.error("Error marking inquiries as checked:", error);
// // // //       if (error.response?.status === 401) {
// // // //         setError("Session expired. Please log in again.");
// // // //         handleLogout();
// // // //       } else {
// // // //         setError("Failed to mark inquiries as checked.");
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleMenuClick = (newIndex) => {
// // // //     setTabIndex(newIndex);
// // // //     if (newIndex === 7) {
// // // //       setIsInquiriesClickable(true);
// // // //       markInquiriesChecked();
// // // //     } else {
// // // //       setIsInquiriesClickable(false);
// // // //     }
// // // //   };

// // // //   const handleFormSubmit = (formData) => {
// // // //     setInquiries((prev) => [...prev, formData]);
// // // //   };

// // // //   const handleLogout = () => {
// // // //     localStorage.removeItem("access_token");
// // // //     localStorage.removeItem("refresh_token");
// // // //     localStorage.removeItem("company_id");
// // // //     sessionStorage.removeItem("companyName");
// // // //     delete API.defaults.headers.common["Authorization"];
// // // //     navigate("/login");
// // // //   };

// // // //   const handleOpenSubscriptionModal = () => {
// // // //     setOpenSubscriptionModal(true);
// // // //   };

// // // //   const handleCloseSubscriptionModal = () => {
// // // //     setOpenSubscriptionModal(false);
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <Box
// // // //         sx={{
// // // //           display: "flex",
// // // //           justifyContent: "center",
// // // //           alignItems: "center",
// // // //           height: "100vh",
// // // //         }}
// // // //       >
// // // //         <CircularProgress />
// // // //       </Box>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
// // // //       <AppBar position="static" sx={{ backgroundColor: "#2196f3", zIndex: 1201 }}>
// // // //         <Toolbar sx={{ justifyContent: "space-between" }}>
// // // //           <Typography variant="h6">Welcome, {companyName || "Guest"}</Typography>
// // // //           <Box sx={{ display: "flex", alignItems: "center" }}>
// // // //             {subscriptionData?.is_subscribed && (
// // // //               <Typography variant="body2" sx={{ mr: 2, color: "#fff" }}>
// // // //                 Subscription: {remainingDays} days remaining
// // // //                 <IconButton
// // // //                   color="inherit"
// // // //                   onClick={handleOpenSubscriptionModal}
// // // //                   sx={{ ml: 1 }}
// // // //                 >
// // // //                   <PaymentIcon />
// // // //                 </IconButton>
// // // //               </Typography>
// // // //             )}
// // // //             <Button
// // // //               color="inherit"
// // // //               sx={{ textTransform: "uppercase" }}
// // // //               onClick={handleLogout}
// // // //               startIcon={<LogoutIcon />}
// // // //             >
// // // //               Logout
// // // //             </Button>
// // // //           </Box>
// // // //         </Toolbar>
// // // //       </AppBar>

// // // //       {error && (
// // // //         <Alert severity="error" sx={{ m: 2 }} onClose={() => setError(null)}>
// // // //           {error}
// // // //         </Alert>
// // // //       )}

// // // //       <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
// // // //         <Box
// // // //           sx={{
// // // //             width: 240,
// // // //             backgroundColor: "#fff",
// // // //             borderRight: "1px solid #ddd",
// // // //             overflowY: "auto",
// // // //             flexShrink: 0,
// // // //           }}
// // // //         >
// // // //           <List>
// // // //             <ListItem button selected={tabIndex === 0} onClick={() => handleMenuClick(0)}>
// // // //               <ListItemIcon>
// // // //                 <DashboardIcon color={tabIndex === 0 ? "primary" : "inherit"} />
// // // //               </ListItemIcon>
// // // //               <ListItemText primary="Dashboard" />
// // // //             </ListItem>
// // // //             <ListItem button selected={tabIndex === 1} onClick={() => handleMenuClick(1)}>
// // // //               <ListItemIcon>
// // // //                 <BuildIcon color={tabIndex === 1 ? "primary" : "inherit"} />
// // // //               </ListItemIcon>
// // // //               <ListItemText primary="Manage Services" />
// // // //             </ListItem>
// // // //             <ListItem button selected={tabIndex === 2} onClick={() => handleMenuClick(2)}>
// // // //               <ListItemIcon>
// // // //                 <InventoryIcon color={tabIndex === 2 ? "primary" : "inherit"} />
// // // //               </ListItemIcon>
// // // //               <ListItemText primary="Manage Materials" />
// // // //             </ListItem>
// // // //             <ListItem button selected={tabIndex === 3} onClick={() => handleMenuClick(3)}>
// // // //               <ListItemIcon>
// // // //                 <CalendarIcon color={tabIndex === 3 ? "primary" : "inherit"} />
// // // //               </ListItemIcon>
// // // //               <ListItemText primary="Appointments" />
// // // //             </ListItem>
// // // //             <ListItem button selected={tabIndex === 4} onClick={() => handleMenuClick(4)}>
// // // //               <ListItemIcon>
// // // //                 <DescriptionIcon color={tabIndex === 4 ? "primary" : "inherit"} />
// // // //               </ListItemIcon>
// // // //               <ListItemText primary="Documents" />
// // // //             </ListItem>
// // // //             <ListItem button selected={tabIndex === 5} onClick={() => handleMenuClick(5)}>
// // // //               <ListItemIcon>
// // // //                 <ShoppingCartIcon color={tabIndex === 5 ? "primary" : "inherit"} />
// // // //               </ListItemIcon>
// // // //               <ListItemText primary="Order" />
// // // //             </ListItem>
// // // //             <ListItem button selected={tabIndex === 6} onClick={() => handleMenuClick(6)}>
// // // //               <ListItemIcon>
// // // //                 <BusinessIcon color={tabIndex === 6 ? "primary" : "inherit"} />
// // // //               </ListItemIcon>
// // // //               <ListItemText primary="Upload Company Details" />
// // // //             </ListItem>
// // // //             <ListItem button selected={tabIndex === 7} onClick={() => handleMenuClick(7)}>
// // // //               <ListItemIcon>
// // // //                 <AssignmentIcon color={tabIndex === 7 ? "primary" : "inherit"} />
// // // //               </ListItemIcon>
// // // //               <ListItemText
// // // //                 primary="Inquiries"
// // // //                 secondary={hasNewInquiries ? <span style={{ color: "red" }}>New!</span> : null}
// // // //               />
// // // //             </ListItem>
// // // //             <ListItem button selected={tabIndex === 8} onClick={() => handleMenuClick(8)}>
// // // //               <ListItemIcon>
// // // //                 <GavelIcon color={tabIndex === 8 ? "primary" : "inherit"} />
// // // //               </ListItemIcon>
// // // //               <ListItemText primary="Agreements" />
// // // //             </ListItem>
// // // //           </List>
// // // //         </Box>

// // // //         <Box
// // // //           sx={{
// // // //             flex: 1,
// // // //             overflowY: "auto",
// // // //             backgroundColor: "#f5f5f5",
// // // //             p: 2,
// // // //             position: "relative",
// // // //           }}
// // // //         >
// // // //           <Container sx={{ py: 3, maxWidth: "100% !important" }}>
// // // //             {tabIndex === 0 && (
// // // //               <Box>
// // // //                 <Grid container spacing={3}>
// // // //                   <Grid item xs={12} md={4}>
// // // //                     <Paper
// // // //                       sx={{
// // // //                         p: 3,
// // // //                         "&:hover": { boxShadow: 3 },
// // // //                         transition: "box-shadow 0.3s",
// // // //                       }}
// // // //                     >
// // // //                       <Typography color="textSecondary">Total Services</Typography>
// // // //                       <Typography variant="h4" color="#2196f3" sx={{ mt: 1 }}>
// // // //                         {dashboardData.total_services}
// // // //                       </Typography>
// // // //                     </Paper>
// // // //                   </Grid>
// // // //                   <Grid item xs={12} md={4}>
// // // //                     <Paper
// // // //                       sx={{
// // // //                         p: 3,
// // // //                         "&:hover": { boxShadow: 3 },
// // // //                         transition: "box-shadow 0.3s",
// // // //                       }}
// // // //                     >
// // // //                       <Typography color="textSecondary">Pending Appointments</Typography>
// // // //                       <Typography variant="h4" sx={{ mt: 1, color: "#e91e63" }}>
// // // //                         {dashboardData.pending_appointments}
// // // //                       </Typography>
// // // //                     </Paper>
// // // //                   </Grid>
// // // //                   <Grid item xs={12} md={4}>
// // // //                     <Paper
// // // //                       sx={{
// // // //                         p: 3,
// // // //                         "&:hover": { boxShadow: 3 },
// // // //                         transition: "box-shadow 0.3s",
// // // //                       }}
// // // //                     >
// // // //                       <Typography color="textSecondary">Total Revenue</Typography>
// // // //                       <Typography variant="h4" sx={{ mt: 1 }}>
// // // //                         RS. {dashboardData.total_revenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
// // // //                       </Typography>
// // // //                     </Paper>
// // // //                   </Grid>
// // // //                 </Grid>

// // // //                 <Box mt={4}>
// // // //                   <Typography variant="h6" gutterBottom>
// // // //                     Revenue and Appointments Analytics
// // // //                   </Typography>
// // // //                   <Paper sx={{ p: 2 }}>
// // // //                     <Typography variant="body2">
// // // //                       Analytics data is currently unavailable.
// // // //                     </Typography>
// // // //                   </Paper>
// // // //                 </Box>

// // // //                 <Box mt={4}>
// // // //                   <Typography variant="h6" gutterBottom>
// // // //                     Quick Actions
// // // //                   </Typography>
// // // //                   <Grid container spacing={2}>
// // // //                     <Grid item xs={12} sm={6} md={3}>
// // // //                       <Button
// // // //                         fullWidth
// // // //                         variant="contained"
// // // //                         startIcon={<AddIcon />}
// // // //                         sx={{
// // // //                           backgroundColor: "#2196f3",
// // // //                           textTransform: "uppercase",
// // // //                           "&:hover": { backgroundColor: "#1976d2" },
// // // //                         }}
// // // //                         onClick={() => handleMenuClick(1)}
// // // //                       >
// // // //                         Add New Service
// // // //                       </Button>
// // // //                     </Grid>
// // // //                     <Grid item xs={12} sm={6} md={3}>
// // // //                       <Button
// // // //                         fullWidth
// // // //                         variant="contained"
// // // //                         startIcon={<AddIcon />}
// // // //                         sx={{
// // // //                           backgroundColor: "#2196f3",
// // // //                           textTransform: "uppercase",
// // // //                           "&:hover": { backgroundColor: "#1976d2" },
// // // //                         }}
// // // //                         onClick={() => handleMenuClick(2)}
// // // //                       >
// // // //                         Add New Material
// // // //                       </Button>
// // // //                     </Grid>
// // // //                     <Grid item xs={12} sm={6} md={3}>
// // // //                       <Button
// // // //                         fullWidth
// // // //                         variant="contained"
// // // //                         startIcon={<CalendarIcon />}
// // // //                         sx={{
// // // //                           backgroundColor: "#2196f3",
// // // //                           textTransform: "uppercase",
// // // //                           "&:hover": { backgroundColor: "#1976d2" },
// // // //                         }}
// // // //                         onClick={() => handleMenuClick(3)}
// // // //                       >
// // // //                         View Appointments
// // // //                       </Button>
// // // //                     </Grid>
// // // //                     <Grid item xs={12} sm={6} md={3}>
// // // //                       <Button
// // // //                         fullWidth
// // // //                         variant="contained"
// // // //                         startIcon={<DescriptionIcon />}
// // // //                         sx={{
// // // //                           backgroundColor: "#2196f3",
// // // //                           textTransform: "uppercase",
// // // //                           "&:hover": { backgroundColor: "#1976d2" },
// // // //                         }}
// // // //                         onClick={() => handleMenuClick(4)}
// // // //                       >
// // // //                         Generate Document
// // // //                       </Button>
// // // //                     </Grid>
// // // //                   </Grid>
// // // //                 </Box>

// // // //                 <Box mt={4}>
// // // //                   <Typography variant="h6" gutterBottom>
// // // //                     Notifications
// // // //                   </Typography>
// // // //                   <Paper sx={{ p: 2 }}>
// // // //                     <List>
// // // //                       <ListItem>
// // // //                         <ListItemIcon>
// // // //                           <CalendarIcon color="primary" />
// // // //                         </ListItemIcon>
// // // //                         <ListItemText primary="Upcoming Appointment: Site Inspection on 12th Feb, 2025" />
// // // //                       </ListItem>
// // // //                       <Divider />
// // // //                       <ListItem>
// // // //                         <ListItemIcon>
// // // //                           <WarningIcon color="warning" />
// // // //                         </ListItemIcon>
// // // //                         <ListItemText primary="Low Stock Alert: Cement stock below threshold." />
// // // //                       </ListItem>
// // // //                       <Divider />
// // // //                       <ListItem>
// // // //                         <ListItemIcon>
// // // //                           <CheckCircleIcon color="success" />
// // // //                         </ListItemIcon>
// // // //                         <ListItemText primary="Recent Service Added: Residential Construction Service." />
// // // //                       </ListItem>
// // // //                     </List>
// // // //                   </Paper>
// // // //                 </Box>
// // // //               </Box>
// // // //             )}

// // // //             {tabIndex === 1 && <ServicesManagement />}
// // // //             {tabIndex === 2 && <MaterialsManagement />}
// // // //             {tabIndex === 3 && <Appointments />}
// // // //             {tabIndex === 4 && <Documents />}
// // // //             {tabIndex === 5 && <CompanyOrdersPage />}
// // // //             {tabIndex === 6 && <CompanyUploadForm onSubmit={handleFormSubmit} />}
// // // //             {tabIndex === 7 && (
// // // //               <InquiriesList
// // // //                 inquiries={inquiries.length > 0 ? inquiries : undefined}
// // // //                 clickable={isInquiriesClickable}
// // // //               />
// // // //             )}
// // // //             {tabIndex === 8 && <Agreements userType="company" />}
// // // //           </Container>
// // // //         </Box>

// // // //         {tabIndex === 0 && (
// // // //           <Box
// // // //             sx={{
// // // //               width: 300,
// // // //               backgroundColor: "#f0f0f0",
// // // //               borderLeft: "1px solid #ddd",
// // // //               p: 2,
// // // //               position: "sticky",
// // // //               right: 0,
// // // //               top: 64,
// // // //               bottom: 0,
// // // //               overflowY: "auto",
// // // //               zIndex: 1000,
// // // //               height: "calc(100vh - 64px)",
// // // //               boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
// // // //             }}
// // // //           >
// // // //             <Typography variant="h6" gutterBottom>
// // // //               Recent Activity
// // // //             </Typography>
// // // //           </Box>
// // // //         )}
// // // //       </Box>

// // // //       <Modal
// // // //         open={openSubscriptionModal}
// // // //         onClose={handleCloseSubscriptionModal}
// // // //         aria-labelledby="subscription-modal-title"
// // // //         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
// // // //       >
// // // //         <Box sx={{ outline: "none" }}>
// // // //           <Subscription
// // // //             companyId={localStorage.getItem("company_id")}
// // // //             onLogout={handleLogout}
// // // //             remainingDays={remainingDays}
// // // //             onSubscribe={() => {
// // // //               handleCloseSubscriptionModal();
// // // //               window.location.reload();
// // // //             }}
// // // //           />
// // // //         </Box>
// // // //       </Modal>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default CompanyDashboard;
// // // import React, { useState, useEffect, useRef } from "react";
// // // import {
// // //   AppBar,
// // //   Toolbar,
// // //   Typography,
// // //   Button,
// // //   Container,
// // //   Grid,
// // //   Box,
// // //   Paper,
// // //   CircularProgress,
// // //   List,
// // //   ListItem,
// // //   ListItemIcon,
// // //   ListItemText,
// // //   Divider,
// // //   Alert,
// // //   Modal,
// // //   IconButton,
// // // } from "@mui/material";
// // // import {
// // //   Dashboard as DashboardIcon,
// // //   Build as BuildIcon,
// // //   Inventory as InventoryIcon,
// // //   CalendarToday as CalendarIcon,
// // //   Description as DescriptionIcon,
// // //   ShoppingCart as ShoppingCartIcon,
// // //   Add as AddIcon,
// // //   Warning as WarningIcon,
// // //   CheckCircle as CheckCircleIcon,
// // //   Business as BusinessIcon,
// // //   Assignment as AssignmentIcon,
// // //   Logout as LogoutIcon,
// // //   Gavel as GavelIcon,
// // //   Payment as PaymentIcon,
// // // } from "@mui/icons-material";
// // // import { Line, Bar } from "react-chartjs-2";  // Import chart components
// // // import {
// // //   Chart as ChartJS,
// // //   CategoryScale,
// // //   LinearScale,
// // //   PointElement,
// // //   LineElement,
// // //   BarElement,
// // //   Title,
// // //   Tooltip,
// // //   Legend,
// // // } from "chart.js";  // Import Chart.js components
// // // import ServicesManagement from "../components/ServicesManagement";
// // // import MaterialsManagement from "../components/MaterialsManagement";
// // // import Appointments from "../components/Appointments";
// // // import Documents from "../components/Documents";
// // // import CompanyUploadForm from "../components/CompanyUploadForm";
// // // import InquiriesList from "../components/InquiriesList";
// // // import Agreements from "../Company/Agreements";
// // // import Subscription from "../Company/Subscription";
// // // import { useNavigate } from "react-router-dom";
// // // import API from "../services/api";
// // // import CompanyOrdersPage from "../components/CompanyordersPage";

// // // // Register Chart.js components
// // // ChartJS.register(
// // //   CategoryScale,
// // //   LinearScale,
// // //   PointElement,
// // //   LineElement,
// // //   BarElement,
// // //   Title,
// // //   Tooltip,
// // //   Legend
// // // );

// // // const CompanyDashboard = () => {
// // //   const [tabIndex, setTabIndex] = useState(0);
// // //   const [companyName, setCompanyName] = useState("");
// // //   const [loading, setLoading] = useState(true);
// // //   const [inquiries, setInquiries] = useState([]);
// // //   const [error, setError] = useState(null);
// // //   const [hasNewInquiries, setHasNewInquiries] = useState(false);
// // //   const [isInquiriesClickable, setIsInquiriesClickable] = useState(false);
// // //   const [subscriptionData, setSubscriptionData] = useState(null);
// // //   const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
// // //   const [remainingDays, setRemainingDays] = useState(0);
// // //   const [dashboardData, setDashboardData] = useState({
// // //     total_services: 0,
// // //     pending_appointments: 0,
// // //     total_revenue: 0,
// // //   });
  
// // //   // State for analytics data
// // //   const [revenueAnalytics, setRevenueAnalytics] = useState([]);
// // //   const [appointmentAnalytics, setAppointmentAnalytics] = useState([]);

// // //   const navigate = useNavigate();
// // //   const wsRef = useRef(null);

// // //   useEffect(() => {
// // //     const loadInitialData = async () => {
// // //       try {
// // //         const storedCompanyName = sessionStorage.getItem("companyName");
// // //         if (storedCompanyName) {
// // //           setCompanyName(storedCompanyName);
// // //         }

// // //         const companyId = localStorage.getItem("company_id");
// // //         if (!companyId) {
// // //           setError("Company ID not found. Please log in again.");
// // //           navigate("/login");
// // //           return;
// // //         }

// // //         const numericCompanyId = parseInt(companyId, 10);
// // //         if (isNaN(numericCompanyId)) {
// // //           setError("Invalid company ID format. Please log in again.");
// // //           navigate("/login");
// // //           return;
// // //         }

// // //         const accessToken = localStorage.getItem("access_token");
// // //         if (accessToken) {
// // //           API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// // //         }

// // //         // Fetch company data
// // //         const companyResponse = await API.get(`/company-registration/${numericCompanyId}/`);
// // //         const companyData = companyResponse.data;
// // //         setCompanyName(companyData.company_name);
// // //         sessionStorage.setItem("companyName", companyData.company_name);

// // //         // Fetch subscription data
// // //         const subscriptionResponse = await API.get(`/subscription-status/${numericCompanyId}/`);
// // //         const subData = subscriptionResponse.data;
// // //         setSubscriptionData(subData);

// // //         if (!subData.is_subscribed) {
// // //           setOpenSubscriptionModal(true);
// // //         } else {
// // //           const endDate = new Date(subData.end_date);
// // //           const today = new Date();
// // //           const timeDiff = endDate - today;
// // //           const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
// // //           setRemainingDays(daysLeft > 0 ? daysLeft : 0);
// // //         }

// // //         // Fetch dashboard data
// // //         const dashboardResponse = await API.get("/api/company-dashboard-data/");
// // //         setDashboardData(dashboardResponse.data);

// // //         // Fetch analytics data
// // //         const revenueAnalyticsResponse = await API.get("/api/revenue-analytics/");
// // //         setRevenueAnalytics(revenueAnalyticsResponse.data);

// // //         const appointmentAnalyticsResponse = await API.get("/api/appointment-analytics/");
// // //         setAppointmentAnalytics(appointmentAnalyticsResponse.data);

// // //         await fetchInquiries();
// // //       } catch (error) {
// // //         console.error("Error fetching data:", error);
// // //         if (error.response) {
// // //           if (error.response.status === 404) {
// // //             setError("Company not found. Please check your company ID or log in again.");
// // //             navigate("/login");
// // //           } else if (error.response.status === 401 || error.response.status === 403) {
// // //             setError("Unauthorized access. Please log in again.");
// // //             navigate("/login");
// // //           } else {
// // //             setError("An error occurred while loading data. Please try again.");
// // //           }
// // //         } else {
// // //           setError("No response from server. Please check your connection and try again.");
// // //         }
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     loadInitialData();
// // //   }, [navigate]);

// // //   const fetchInquiries = async () => {
// // //     try {
// // //       const response = await API.get("api/company-inquiries/");
// // //       setInquiries(response.data);
// // //     } catch (error) {
// // //       console.error("Error fetching inquiries:", error);
// // //       if (error.response?.status === 401) {
// // //         setError("Session expired. Please log in again.");
// // //         handleLogout();
// // //       } else {
// // //         setError("Failed to load inquiries. Please try again.");
// // //       }
// // //     }
// // //   };

// // //   const markInquiriesChecked = async () => {
// // //     try {
// // //       await API.post("/mark-inquiries-checked/");
// // //       setHasNewInquiries(false);
// // //     } catch (error) {
// // //       console.error("Error marking inquiries as checked:", error);
// // //       if (error.response?.status === 401) {
// // //         setError("Session expired. Please log in again.");
// // //         handleLogout();
// // //       } else {
// // //         setError("Failed to mark inquiries as checked.");
// // //       }
// // //     }
// // //   };

// // //   const handleMenuClick = (newIndex) => {
// // //     setTabIndex(newIndex);
// // //     if (newIndex === 7) {
// // //       setIsInquiriesClickable(true);
// // //       markInquiriesChecked();
// // //     } else {
// // //       setIsInquiriesClickable(false);
// // //     }
// // //   };

// // //   const handleFormSubmit = (formData) => {
// // //     setInquiries((prev) => [...prev, formData]);
// // //   };

// // //   const handleLogout = () => {
// // //     localStorage.removeItem("access_token");
// // //     localStorage.removeItem("refresh_token");
// // //     localStorage.removeItem("company_id");
// // //     sessionStorage.removeItem("companyName");
// // //     delete API.defaults.headers.common["Authorization"];
// // //     navigate("/login");
// // //   };

// // //   const handleOpenSubscriptionModal = () => {
// // //     setOpenSubscriptionModal(true);
// // //   };

// // //   const handleCloseSubscriptionModal = () => {
// // //     setOpenSubscriptionModal(false);
// // //   };

// // //   // Prepare data for Revenue Chart
// // //   const revenueChartData = {
// // //     labels: revenueAnalytics.map((data) => data.month),
// // //     datasets: [
// // //       {
// // //         label: "Revenue (RS)",
// // //         data: revenueAnalytics.map((data) => data.total_revenue),
// // //         borderColor: "#2196f3",
// // //         backgroundColor: "rgba(33, 150, 243, 0.2)",
// // //         fill: true,
// // //       },
// // //     ],
// // //   };

// // //   const revenueChartOptions = {
// // //     responsive: true,
// // //     plugins: {
// // //       legend: { position: "top" },
// // //       title: { display: true, text: "Revenue Over Time" },
// // //     },
// // //     scales: {
// // //       y: { beginAtZero: true, title: { display: true, text: "Revenue (RS)" } },
// // //       x: { title: { display: true, text: "Month" } },
// // //     },
// // //   };

// // //   // Prepare data for Appointment Chart
// // //   const appointmentChartData = {
// // //     labels: appointmentAnalytics.map((data) => data.month),
// // //     datasets: [
// // //       {
// // //         label: "Pending",
// // //         data: appointmentAnalytics.map((data) => data.Pending),
// // //         backgroundColor: "#e91e63",
// // //       },
// // //       {
// // //         label: "Confirmed",
// // //         data: appointmentAnalytics.map((data) => data.Confirmed),
// // //         backgroundColor: "#4caf50",
// // //       },
// // //       {
// // //         label: "No-Show",
// // //         data: appointmentAnalytics.map((data) => data["No-Show"]),
// // //         backgroundColor: "#ff9800",
// // //       },
// // //       {
// // //         label: "Completed",
// // //         data: appointmentAnalytics.map((data) => data.Completed),
// // //         backgroundColor: "#2196f3",
// // //       },
// // //     ],
// // //   };

// // //   const appointmentChartOptions = {
// // //     responsive: true,
// // //     plugins: {
// // //       legend: { position: "top" },
// // //       title: { display: true, text: "Appointments Over Time" },
// // //     },
// // //     scales: {
// // //       x: { title: { display: true, text: "Month" } },
// // //       y: { beginAtZero: true, title: { display: true, text: "Number of Appointments" }, stacked: true },
// // //       x: { stacked: true },
// // //     },
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Box
// // //         sx={{
// // //           display: "flex",
// // //           justifyContent: "center",
// // //           alignItems: "center",
// // //           height: "100vh",
// // //         }}
// // //       >
// // //         <CircularProgress />
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
// // //       <AppBar position="static" sx={{ backgroundColor: "#2196f3", zIndex: 1201 }}>
// // //         <Toolbar sx={{ justifyContent: "space-between" }}>
// // //           <Typography variant="h6">Welcome, {companyName || "Guest"}</Typography>
// // //           <Box sx={{ display: "flex", alignItems: "center" }}>
// // //             {subscriptionData?.is_subscribed && (
// // //               <Typography variant="body2" sx={{ mr: 2, color: "#fff" }}>
// // //                 Subscription: {remainingDays} days remaining
// // //                 <IconButton
// // //                   color="inherit"
// // //                   onClick={handleOpenSubscriptionModal}
// // //                   sx={{ ml: 1 }}
// // //                 >
// // //                   <PaymentIcon />
// // //                 </IconButton>
// // //               </Typography>
// // //             )}
// // //             <Button
// // //               color="inherit"
// // //               sx={{ textTransform: "uppercase" }}
// // //               onClick={handleLogout}
// // //               startIcon={<LogoutIcon />}
// // //             >
// // //               Logout
// // //             </Button>
// // //           </Box>
// // //         </Toolbar>
// // //       </AppBar>

// // //       {error && (
// // //         <Alert severity="error" sx={{ m: 2 }} onClose={() => setError(null)}>
// // //           {error}
// // //         </Alert>
// // //       )}

// // //       <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
// // //         <Box
// // //           sx={{
// // //             width: 240,
// // //             backgroundColor: "#fff",
// // //             borderRight: "1px solid #ddd",
// // //             overflowY: "auto",
// // //             flexShrink: 0,
// // //           }}
// // //         >
// // //           <List>
// // //             <ListItem button selected={tabIndex === 0} onClick={() => handleMenuClick(0)}>
// // //               <ListItemIcon>
// // //                 <DashboardIcon color={tabIndex === 0 ? "primary" : "inherit"} />
// // //               </ListItemIcon>
// // //               <ListItemText primary="Dashboard" />
// // //             </ListItem>
// // //             <ListItem button selected={tabIndex === 1} onClick={() => handleMenuClick(1)}>
// // //               <ListItemIcon>
// // //                 <BuildIcon color={tabIndex === 1 ? "primary" : "inherit"} />
// // //               </ListItemIcon>
// // //               <ListItemText primary="Manage Services" />
// // //             </ListItem>
// // //             <ListItem button selected={tabIndex === 2} onClick={() => handleMenuClick(2)}>
// // //               <ListItemIcon>
// // //                 <InventoryIcon color={tabIndex === 2 ? "primary" : "inherit"} />
// // //               </ListItemIcon>
// // //               <ListItemText primary="Manage Materials" />
// // //             </ListItem>
// // //             <ListItem button selected={tabIndex === 3} onClick={() => handleMenuClick(3)}>
// // //               <ListItemIcon>
// // //                 <CalendarIcon color={tabIndex === 3 ? "primary" : "inherit"} />
// // //               </ListItemIcon>
// // //               <ListItemText primary="Appointments" />
// // //             </ListItem>
// // //             <ListItem button selected={tabIndex === 4} onClick={() => handleMenuClick(4)}>
// // //               <ListItemIcon>
// // //                 <DescriptionIcon color={tabIndex === 4 ? "primary" : "inherit"} />
// // //               </ListItemIcon>
// // //               <ListItemText primary="Documents" />
// // //             </ListItem>
// // //             <ListItem button selected={tabIndex === 5} onClick={() => handleMenuClick(5)}>
// // //               <ListItemIcon>
// // //                 <ShoppingCartIcon color={tabIndex === 5 ? "primary" : "inherit"} />
// // //               </ListItemIcon>
// // //               <ListItemText primary="Order" />
// // //             </ListItem>
// // //             <ListItem button selected={tabIndex === 6} onClick={() => handleMenuClick(6)}>
// // //               <ListItemIcon>
// // //                 <BusinessIcon color={tabIndex === 6 ? "primary" : "inherit"} />
// // //               </ListItemIcon>
// // //               <ListItemText primary="Upload Company Details" />
// // //             </ListItem>
// // //             <ListItem button selected={tabIndex === 7} onClick={() => handleMenuClick(7)}>
// // //               <ListItemIcon>
// // //                 <AssignmentIcon color={tabIndex === 7 ? "primary" : "inherit"} />
// // //               </ListItemIcon>
// // //               <ListItemText
// // //                 primary="Inquiries"
// // //                 secondary={hasNewInquiries ? <span style={{ color: "red" }}>New!</span> : null}
// // //               />
// // //             </ListItem>
// // //             <ListItem button selected={tabIndex === 8} onClick={() => handleMenuClick(8)}>
// // //               <ListItemIcon>
// // //                 <GavelIcon color={tabIndex === 8 ? "primary" : "inherit"} />
// // //               </ListItemIcon>
// // //               <ListItemText primary="Agreements" />
// // //             </ListItem>
// // //           </List>
// // //         </Box>

// // //         <Box
// // //           sx={{
// // //             flex: 1,
// // //             overflowY: "auto",
// // //             backgroundColor: "#f5f5f5",
// // //             p: 2,
// // //             position: "relative",
// // //           }}
// // //         >
// // //           <Container sx={{ py: 3, maxWidth: "100% !important" }}>
// // //             {tabIndex === 0 && (
// // //               <Box>
// // //                 <Grid container spacing={3}>
// // //                   <Grid item xs={12} md={4}>
// // //                     <Paper
// // //                       sx={{
// // //                         p: 3,
// // //                         "&:hover": { boxShadow: 3 },
// // //                         transition: "box-shadow 0.3s",
// // //                       }}
// // //                     >
// // //                       <Typography color="textSecondary">Total Services</Typography>
// // //                       <Typography variant="h4" color="#2196f3" sx={{ mt: 1 }}>
// // //                         {dashboardData.total_services}
// // //                       </Typography>
// // //                     </Paper>
// // //                   </Grid>
// // //                   <Grid item xs={12} md={4}>
// // //                     <Paper
// // //                       sx={{
// // //                         p: 3,
// // //                         "&:hover": { boxShadow: 3 },
// // //                         transition: "box-shadow 0.3s",
// // //                       }}
// // //                     >
// // //                       <Typography color="textSecondary">Pending Appointments</Typography>
// // //                       <Typography variant="h4" sx={{ mt: 1, color: "#e91e63" }}>
// // //                         {dashboardData.pending_appointments}
// // //                       </Typography>
// // //                     </Paper>
// // //                   </Grid>
// // //                   <Grid item xs={12} md={4}>
// // //                     <Paper
// // //                       sx={{
// // //                         p: 3,
// // //                         "&:hover": { boxShadow: 3 },
// // //                         transition: "box-shadow 0.3s",
// // //                       }}
// // //                     >
// // //                       <Typography color="textSecondary">Total Revenue</Typography>
// // //                       <Typography variant="h4" sx={{ mt: 1 }}>
// // //                         RS. {dashboardData.total_revenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
// // //                       </Typography>
// // //                     </Paper>
// // //                   </Grid>
// // //                 </Grid>

// // //                 <Box mt={4}>
// // //                   <Typography variant="h6" gutterBottom>
// // //                     Revenue and Appointments Analytics
// // //                   </Typography>
// // //                   <Paper sx={{ p: 2 }}>
// // //                     {revenueAnalytics.length > 0 || appointmentAnalytics.length > 0 ? (
// // //                       <Grid container spacing={3}>
// // //                         {/* Revenue Chart */}
// // //                         <Grid item xs={12} md={6}>
// // //                           <Typography variant="subtitle1" gutterBottom>
// // //                             Revenue Over Time
// // //                           </Typography>
// // //                           <Line data={revenueChartData} options={revenueChartOptions} />
// // //                         </Grid>
// // //                         {/* Appointment Chart */}
// // //                         <Grid item xs={12} md={6}>
// // //                           <Typography variant="subtitle1" gutterBottom>
// // //                             Appointments Over Time
// // //                           </Typography>
// // //                           <Bar data={appointmentChartData} options={appointmentChartOptions} />
// // //                         </Grid>
// // //                       </Grid>
// // //                     ) : (
// // //                       <Typography variant="body2">
// // //                         No analytics data available.
// // //                       </Typography>
// // //                     )}
// // //                   </Paper>
// // //                 </Box>

// // //                 <Box mt={4}>
// // //                   <Typography variant="h6" gutterBottom>
// // //                     Quick Actions
// // //                   </Typography>
// // //                   <Grid container spacing={2}>
// // //                     <Grid item xs={12} sm={6} md={3}>
// // //                       <Button
// // //                         fullWidth
// // //                         variant="contained"
// // //                         startIcon={<AddIcon />}
// // //                         sx={{
// // //                           backgroundColor: "#2196f3",
// // //                           textTransform: "uppercase",
// // //                           "&:hover": { backgroundColor: "#1976d2" },
// // //                         }}
// // //                         onClick={() => handleMenuClick(1)}
// // //                       >
// // //                         Add New Service
// // //                       </Button>
// // //                     </Grid>
// // //                     <Grid item xs={12} sm={6} md={3}>
// // //                       <Button
// // //                         fullWidth
// // //                         variant="contained"
// // //                         startIcon={<AddIcon />}
// // //                         sx={{
// // //                           backgroundColor: "#2196f3",
// // //                           textTransform: "uppercase",
// // //                           "&:hover": { backgroundColor: "#1976d2" },
// // //                         }}
// // //                         onClick={() => handleMenuClick(2)}
// // //                       >
// // //                         Add New Material
// // //                       </Button>
// // //                     </Grid>
// // //                     <Grid item xs={12} sm={6} md={3}>
// // //                       <Button
// // //                         fullWidth
// // //                         variant="contained"
// // //                         startIcon={<CalendarIcon />}
// // //                         sx={{
// // //                           backgroundColor: "#2196f3",
// // //                           textTransform: "uppercase",
// // //                           "&:hover": { backgroundColor: "#1976d2" },
// // //                         }}
// // //                         onClick={() => handleMenuClick(3)}
// // //                       >
// // //                         View Appointments
// // //                       </Button>
// // //                     </Grid>
// // //                     <Grid item xs={12} sm={6} md={3}>
// // //                       <Button
// // //                         fullWidth
// // //                         variant="contained"
// // //                         startIcon={<DescriptionIcon />}
// // //                         sx={{
// // //                           backgroundColor: "#2196f3",
// // //                           textTransform: "uppercase",
// // //                           "&:hover": { backgroundColor: "#1976d2" },
// // //                         }}
// // //                         onClick={() => handleMenuClick(4)}
// // //                       >
// // //                         Generate Document
// // //                       </Button>
// // //                     </Grid>
// // //                   </Grid>
// // //                 </Box>

// // //                 <Box mt={4}>
// // //                   <Typography variant="h6" gutterBottom>
// // //                     Notifications
// // //                   </Typography>
// // //                   <Paper sx={{ p: 2 }}>
// // //                     <List>
// // //                       <ListItem>
// // //                         <ListItemIcon>
// // //                           <CalendarIcon color="primary" />
// // //                         </ListItemIcon>
// // //                         <ListItemText primary="Upcoming Appointment: Site Inspection on 12th Feb, 2025" />
// // //                       </ListItem>
// // //                       <Divider />
// // //                       <ListItem>
// // //                         <ListItemIcon>
// // //                           <WarningIcon color="warning" />
// // //                         </ListItemIcon>
// // //                         <ListItemText primary="Low Stock Alert: Cement stock below threshold." />
// // //                       </ListItem>
// // //                       <Divider />
// // //                       <ListItem>
// // //                         <ListItemIcon>
// // //                           <CheckCircleIcon color="success" />
// // //                         </ListItemIcon>
// // //                         <ListItemText primary="Recent Service Added: Residential Construction Service." />
// // //                       </ListItem>
// // //                     </List>
// // //                   </Paper>
// // //                 </Box>
// // //               </Box>
// // //             )}

// // //             {tabIndex === 1 && <ServicesManagement />}
// // //             {tabIndex === 2 && <MaterialsManagement />}
// // //             {tabIndex === 3 && <Appointments />}
// // //             {tabIndex === 4 && <Documents />}
// // //             {tabIndex === 5 && <CompanyOrdersPage />}
// // //             {tabIndex === 6 && <CompanyUploadForm onSubmit={handleFormSubmit} />}
// // //             {tabIndex === 7 && (
// // //               <InquiriesList
// // //                 inquiries={inquiries.length > 0 ? inquiries : undefined}
// // //                 clickable={isInquiriesClickable}
// // //               />
// // //             )}
// // //             {tabIndex === 8 && <Agreements userType="company" />}
// // //           </Container>
// // //         </Box>

// // //         {tabIndex === 0 && (
// // //           <Box
// // //             sx={{
// // //               width: 300,
// // //               backgroundColor: "#f0f0f0",
// // //               borderLeft: "1px solid #ddd",
// // //               p: 2,
// // //               position: "sticky",
// // //               right: 0,
// // //               top: 64,
// // //               bottom: 0,
// // //               overflowY: "auto",
// // //               zIndex: 1000,
// // //               height: "calc(100vh - 64px)",
// // //               boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
// // //             }}
// // //           >
// // //             <Typography variant="h6" gutterBottom>
// // //               Recent Activity
// // //             </Typography>
// // //           </Box>
// // //         )}
// // //       </Box>

// // //       <Modal
// // //         open={openSubscriptionModal}
// // //         onClose={handleCloseSubscriptionModal}
// // //         aria-labelledby="subscription-modal-title"
// // //         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
// // //       >
// // //         <Box sx={{ outline: "none" }}>
// // //           <Subscription
// // //             companyId={localStorage.getItem("company_id")}
// // //             onLogout={handleLogout}
// // //             remainingDays={remainingDays}
// // //             onSubscribe={() => {
// // //               handleCloseSubscriptionModal();
// // //               window.location.reload();
// // //             }}
// // //           />
// // //         </Box>
// // //       </Modal>
// // //     </Box>
// // //   );
// // // };


// // // export default CompanyDashboard;
// // import React, { useState, useEffect, useRef } from "react";
// // import {
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   Button,
// //   Container,
// //   Grid,
// //   Box,
// //   Paper,
// //   CircularProgress,
// //   List,
// //   ListItem,
// //   ListItemIcon,
// //   ListItemText,
// //   Divider,
// //   Alert,
// //   Modal,
// //   IconButton,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// // } from "@mui/material";
// // import {
// //   Dashboard as DashboardIcon,
// //   Build as BuildIcon,
// //   Inventory as InventoryIcon,
// //   CalendarToday as CalendarIcon,
// //   Description as DescriptionIcon,
// //   ShoppingCart as ShoppingCartIcon,
// //   Add as AddIcon,
// //   Warning as WarningIcon,
// //   CheckCircle as CheckCircleIcon,
// //   Business as BusinessIcon,
// //   Assignment as AssignmentIcon,
// //   Logout as LogoutIcon,
// //   Gavel as GavelIcon,
// //   Payment as PaymentIcon,
// // } from "@mui/icons-material";
// // import { Line, Bar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import ServicesManagement from "../components/ServicesManagement";
// // import MaterialsManagement from "../components/MaterialsManagement";
// // import Appointments from "../components/Appointments";
// // import Documents from "../components/Documents";
// // import CompanyUploadForm from "../components/CompanyUploadForm";
// // import InquiriesList from "../components/InquiriesList";
// // import Agreements from "../Company/Agreements";
// // import Subscription from "../Company/Subscription";
// // import { useNavigate } from "react-router-dom";
// // import API from "../services/api";
// // import CompanyOrdersPage from "../components/CompanyordersPage";

// // // Register Chart.js components
// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend
// // );

// // const CompanyDashboard = () => {
// //   const [tabIndex, setTabIndex] = useState(0);
// //   const [companyName, setCompanyName] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [inquiries, setInquiries] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [hasNewInquiries, setHasNewInquiries] = useState(false);
// //   const [isInquiriesClickable, setIsInquiriesClickable] = useState(false);
// //   const [subscriptionData, setSubscriptionData] = useState(null);
// //   const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
// //   const [remainingDays, setRemainingDays] = useState(0);
// //   const [dashboardData, setDashboardData] = useState({
// //     total_services: 0,
// //     pending_appointments: 0,
// //     total_revenue: 0,
// //   });
// //   const [revenueAnalytics, setRevenueAnalytics] = useState([]);
// //   const [appointmentAnalytics, setAppointmentAnalytics] = useState([]);
  
// //   // State for time range filter
// //   const [timeRange, setTimeRange] = useState("6m"); // Default to last 6 months

// //   const navigate = useNavigate();
// //   const wsRef = useRef(null);

// //   useEffect(() => {
// //     const loadInitialData = async () => {
// //       try {
// //         const storedCompanyName = sessionStorage.getItem("companyName");
// //         if (storedCompanyName) {
// //           setCompanyName(storedCompanyName);
// //         }

// //         const companyId = localStorage.getItem("company_id");
// //         if (!companyId) {
// //           setError("Company ID not found. Please log in again.");
// //           navigate("/login");
// //           return;
// //         }

// //         const numericCompanyId = parseInt(companyId, 10);
// //         if (isNaN(numericCompanyId)) {
// //           setError("Invalid company ID format. Please log in again.");
// //           navigate("/login");
// //           return;
// //         }

// //         const accessToken = localStorage.getItem("access_token");
// //         if (accessToken) {
// //           API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// //         }

// //         // Fetch company data
// //         const companyResponse = await API.get(`/company-registration/${numericCompanyId}/`);
// //         const companyData = companyResponse.data;
// //         setCompanyName(companyData.company_name);
// //         sessionStorage.setItem("companyName", companyData.company_name);

// //         // Fetch subscription data
// //         const subscriptionResponse = await API.get(`/subscription-status/${numericCompanyId}/`);
// //         const subData = subscriptionResponse.data;
// //         setSubscriptionData(subData);

// //         if (!subData.is_subscribed) {
// //           setOpenSubscriptionModal(true);
// //         } else {
// //           const endDate = new Date(subData.end_date);
// //           const today = new Date();
// //           const timeDiff = endDate - today;
// //           const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
// //           setRemainingDays(daysLeft > 0 ? daysLeft : 0);
// //         }

// //         // Fetch dashboard data
// //         const dashboardResponse = await API.get("/api/company-dashboard-data/");
// //         setDashboardData(dashboardResponse.data);

// //         // Fetch analytics data with time range filter
// //         const revenueAnalyticsResponse = await API.get(`/api/revenue-analytics/?time_range=${timeRange}`);
// //         setRevenueAnalytics(revenueAnalyticsResponse.data);

// //         const appointmentAnalyticsResponse = await API.get(`/api/appointment-analytics/?time_range=${timeRange}`);
// //         setAppointmentAnalytics(appointmentAnalyticsResponse.data);

// //         await fetchInquiries();
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         if (error.response) {
// //           if (error.response.status === 404) {
// //             setError("Company not found. Please check your company ID or log in again.");
// //             navigate("/login");
// //           } else if (error.response.status === 401 || error.response.status === 403) {
// //             setError("Unauthorized access. Please log in again.");
// //             navigate("/login");
// //           } else {
// //             setError("An error occurred while loading data. Please try again.");
// //           }
// //         } else {
// //           setError("No response from server. Please check your connection and try again.");
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadInitialData();
// //   }, [navigate, timeRange]); // Re-fetch data when timeRange changes

// //   const fetchInquiries = async () => {
// //     try {
// //       const response = await API.get("api/company-inquiries/");
// //       setInquiries(response.data);
// //     } catch (error) {
// //       console.error("Error fetching inquiries:", error);
// //       if (error.response?.status === 401) {
// //         setError("Session expired. Please log in again.");
// //         handleLogout();
// //       } else {
// //         setError("Failed to load inquiries. Please try again.");
// //       }
// //     }
// //   };

// //   const markInquiriesChecked = async () => {
// //     try {
// //       await API.post("/mark-inquiries-checked/");
// //       setHasNewInquiries(false);
// //     } catch (error) {
// //       console.error("Error marking inquiries as checked:", error);
// //       if (error.response?.status === 401) {
// //         setError("Session expired. Please log in again.");
// //         handleLogout();
// //       } else {
// //         setError("Failed to mark inquiries as checked.");
// //       }
// //     }
// //   };

// //   const handleMenuClick = (newIndex) => {
// //     setTabIndex(newIndex);
// //     if (newIndex === 7) {
// //       setIsInquiriesClickable(true);
// //       markInquiriesChecked();
// //     } else {
// //       setIsInquiriesClickable(false);
// //     }
// //   };

// //   const handleFormSubmit = (formData) => {
// //     setInquiries((prev) => [...prev, formData]);
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("access_token");
// //     localStorage.removeItem("refresh_token");
// //     localStorage.removeItem("company_id");
// //     sessionStorage.removeItem("companyName");
// //     delete API.defaults.headers.common["Authorization"];
// //     navigate("/login");
// //   };

// //   const handleOpenSubscriptionModal = () => {
// //     setOpenSubscriptionModal(true);
// //   };

// //   const handleCloseSubscriptionModal = () => {
// //     setOpenSubscriptionModal(false);
// //   };

// //   // Prepare data for Revenue Chart
// //   const revenueChartData = {
// //     labels: revenueAnalytics.map((data) => data.month),
// //     datasets: [
// //       {
// //         label: "Revenue (RS)",
// //         data: revenueAnalytics.map((data) => data.total_revenue),
// //         borderColor: "#2196f3",
// //         backgroundColor: "rgba(33, 150, 243, 0.2)",
// //         fill: true,
// //       },
// //     ],
// //   };

// //   const revenueChartOptions = {
// //     responsive: true,
// //     plugins: {
// //       legend: { position: "top" },
// //       title: { display: true, text: "Revenue Over Time" },
// //     },
// //     scales: {
// //       y: { beginAtZero: true, title: { display: true, text: "Revenue (RS)" }, grid: { display: true } },
// //       x: { title: { display: true, text: "Month" }, grid: { display: false } },
// //     },
// //   };

// //   // Prepare data for Appointment Chart
// //   const appointmentChartData = {
// //     labels: appointmentAnalytics.map((data) => data.month),
// //     datasets: [
// //       {
// //         label: "Pending",
// //         data: appointmentAnalytics.map((data) => data.Pending),
// //         backgroundColor: "#e91e63",
// //         borderColor: "#e91e63",
// //         borderWidth: 1,
// //       },
// //       {
// //         label: "Confirmed",
// //         data: appointmentAnalytics.map((data) => data.Confirmed),
// //         backgroundColor: "#4caf50",
// //         borderColor: "#4caf50",
// //         borderWidth: 1,
// //       },
// //       {
// //         label: "No-Show",
// //         data: appointmentAnalytics.map((data) => data["No-Show"]),
// //         backgroundColor: "#ff9800",
// //         borderColor: "#ff9800",
// //         borderWidth: 1,
// //       },
// //       {
// //         label: "Completed",
// //         data: appointmentAnalytics.map((data) => data.Completed),
// //         backgroundColor: "#2196f3",
// //         borderColor: "#2196f3",
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   const appointmentChartOptions = {
// //     responsive: true,
// //     maintainAspectRatio: false, // Allow the chart to adjust its height
// //     plugins: {
// //       legend: {
// //         position: "top",
// //         labels: {
// //           font: { size: 14 },
// //           padding: 20,
// //         },
// //       },
// //       title: {
// //         display: true,
// //         text: "Appointments Over Time",
// //         font: { size: 16 },
// //         padding: { top: 10, bottom: 20 },
// //       },
// //       tooltip: {
// //         callbacks: {
// //           label: (context) => {
// //             const datasetLabel = context.dataset.label || "";
// //             const value = context.parsed.y;
// //             return `${datasetLabel}: ${value}`;
// //           },
// //         },
// //       },
// //       // Add data labels on top of each bar segment
// //       datalabels: {
// //         display: true,
// //         color: "#000",
// //         font: { size: 12 },
// //         formatter: (value) => (value > 0 ? value : ""), // Only show label if value > 0
// //         anchor: "end",
// //         align: "end",
// //       },
// //     },
// //     scales: {
// //       x: {
// //         stacked: true,
// //         title: { display: true, text: "Month", font: { size: 14 } },
// //         grid: { display: false },
// //       },
// //       y: {
// //         stacked: true,
// //         beginAtZero: true,
// //         title: { display: true, text: "Number of Appointments", font: { size: 14 } },
// //         grid: { display: true },
// //         ticks: { stepSize: 1 }, // Ensure whole numbers for appointment counts
// //       },
// //     },
// //     elements: {
// //       bar: {
// //         borderWidth: 1,
// //         barThickness: 30, // Adjust bar width
// //       },
// //     },
// //   };

// //   if (loading) {
// //     return (
// //       <Box
// //         sx={{
// //           display: "flex",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           height: "100vh",
// //         }}
// //       >
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
// //       <AppBar position="static" sx={{ backgroundColor: "#2196f3", zIndex: 1201 }}>
// //         <Toolbar sx={{ justifyContent: "space-between" }}>
// //           <Typography variant="h6">Welcome, {companyName || "Guest"}</Typography>
// //           <Box sx={{ display: "flex", alignItems: "center" }}>
// //             {subscriptionData?.is_subscribed && (
// //               <Typography variant="body2" sx={{ mr: 2, color: "#fff" }}>
// //                 Subscription: {remainingDays} days remaining
// //                 <IconButton
// //                   color="inherit"
// //                   onClick={handleOpenSubscriptionModal}
// //                   sx={{ ml: 1 }}
// //                 >
// //                   <PaymentIcon />
// //                 </IconButton>
// //               </Typography>
// //             )}
// //             <Button
// //               color="inherit"
// //               sx={{ textTransform: "uppercase" }}
// //               onClick={handleLogout}
// //               startIcon={<LogoutIcon />}
// //             >
// //               Logout
// //             </Button>
// //           </Box>
// //         </Toolbar>
// //       </AppBar>

// //       {error && (
// //         <Alert severity="error" sx={{ m: 2 }} onClose={() => setError(null)}>
// //           {error}
// //         </Alert>
// //       )}

// //       <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
// //         <Box
// //           sx={{
// //             width: 240,
// //             backgroundColor: "#fff",
// //             borderRight: "1px solid #ddd",
// //             overflowY: "auto",
// //             flexShrink: 0,
// //           }}
// //         >
// //           <List>
// //             <ListItem button selected={tabIndex === 0} onClick={() => handleMenuClick(0)}>
// //               <ListItemIcon>
// //                 <DashboardIcon color={tabIndex === 0 ? "primary" : "inherit"} />
// //               </ListItemIcon>
// //               <ListItemText primary="Dashboard" />
// //             </ListItem>
// //             <ListItem button selected={tabIndex === 1} onClick={() => handleMenuClick(1)}>
// //               <ListItemIcon>
// //                 <BuildIcon color={tabIndex === 1 ? "primary" : "inherit"} />
// //               </ListItemIcon>
// //               <ListItemText primary="Manage Services" />
// //             </ListItem>
// //             <ListItem button selected={tabIndex === 2} onClick={() => handleMenuClick(2)}>
// //               <ListItemIcon>
// //                 <InventoryIcon color={tabIndex === 2 ? "primary" : "inherit"} />
// //               </ListItemIcon>
// //               <ListItemText primary="Manage Materials" />
// //             </ListItem>
// //             <ListItem button selected={tabIndex === 3} onClick={() => handleMenuClick(3)}>
// //               <ListItemIcon>
// //                 <CalendarIcon color={tabIndex === 3 ? "primary" : "inherit"} />
// //               </ListItemIcon>
// //               <ListItemText primary="Appointments" />
// //             </ListItem>
// //             <ListItem button selected={tabIndex === 4} onClick={() => handleMenuClick(4)}>
// //               <ListItemIcon>
// //                 <DescriptionIcon color={tabIndex === 4 ? "primary" : "inherit"} />
// //               </ListItemIcon>
// //               <ListItemText primary="Documents" />
// //             </ListItem>
// //             <ListItem button selected={tabIndex === 5} onClick={() => handleMenuClick(5)}>
// //               <ListItemIcon>
// //                 <ShoppingCartIcon color={tabIndex === 5 ? "primary" : "inherit"} />
// //               </ListItemIcon>
// //               <ListItemText primary="Order" />
// //             </ListItem>
// //             <ListItem button selected={tabIndex === 6} onClick={() => handleMenuClick(6)}>
// //               <ListItemIcon>
// //                 <BusinessIcon color={tabIndex === 6 ? "primary" : "inherit"} />
// //               </ListItemIcon>
// //               <ListItemText primary="Upload Company Details" />
// //             </ListItem>
// //             <ListItem button selected={tabIndex === 7} onClick={() => handleMenuClick(7)}>
// //               <ListItemIcon>
// //                 <AssignmentIcon color={tabIndex === 7 ? "primary" : "inherit"} />
// //               </ListItemIcon>
// //               <ListItemText
// //                 primary="Inquiries"
// //                 secondary={hasNewInquiries ? <span style={{ color: "red" }}>New!</span> : null}
// //               />
// //             </ListItem>
// //             <ListItem button selected={tabIndex === 8} onClick={() => handleMenuClick(8)}>
// //               <ListItemIcon>
// //                 <GavelIcon color={tabIndex === 8 ? "primary" : "inherit"} />
// //               </ListItemIcon>
// //               <ListItemText primary="Agreements" />
// //             </ListItem>
// //           </List>
// //         </Box>

// //         <Box
// //           sx={{
// //             flex: 1,
// //             overflowY: "auto",
// //             backgroundColor: "#f5f5f5",
// //             p: 2,
// //             position: "relative",
// //           }}
// //         >
// //           <Container sx={{ py: 3, maxWidth: "100% !important" }}>
// //             {tabIndex === 0 && (
// //               <Box>
// //                 <Grid container spacing={3}>
// //                   <Grid item xs={12} md={4}>
// //                     <Paper
// //                       sx={{
// //                         p: 3,
// //                         "&:hover": { boxShadow: 3 },
// //                         transition: "box-shadow 0.3s",
// //                       }}
// //                     >
// //                       <Typography color="textSecondary">Total Services</Typography>
// //                       <Typography variant="h4" color="#2196f3" sx={{ mt: 1 }}>
// //                         {dashboardData.total_services}
// //                       </Typography>
// //                     </Paper>
// //                   </Grid>
// //                   <Grid item xs={12} md={4}>
// //                     <Paper
// //                       sx={{
// //                         p: 3,
// //                         "&:hover": { boxShadow: 3 },
// //                         transition: "box-shadow 0.3s",
// //                       }}
// //                     >
// //                       <Typography color="textSecondary">Pending Appointments</Typography>
// //                       <Typography variant="h4" sx={{ mt: 1, color: "#e91e63" }}>
// //                         {dashboardData.pending_appointments}
// //                       </Typography>
// //                     </Paper>
// //                   </Grid>
// //                   <Grid item xs={12} md={4}>
// //                     <Paper
// //                       sx={{
// //                         p: 3,
// //                         "&:hover": { boxShadow: 3 },
// //                         transition: "box-shadow 0.3s",
// //                       }}
// //                     >
// //                       <Typography color="textSecondary">Total Revenue</Typography>
// //                       <Typography variant="h4" sx={{ mt: 1 }}>
// //                         RS. {dashboardData.total_revenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
// //                       </Typography>
// //                     </Paper>
// //                   </Grid>
// //                 </Grid>

// //                 <Box mt={4}>
// //                   <Typography variant="h6" gutterBottom>
// //                     Revenue and Appointments Analytics
// //                   </Typography>
// //                   <Paper sx={{ p: 2 }}>
// //                     {/* Time Range Filter */}
// //                     <Box mb={2}>
// //                       <FormControl sx={{ minWidth: 200 }}>
// //                         <InputLabel>Time Range</InputLabel>
// //                         <Select
// //                           value={timeRange}
// //                           onChange={(e) => setTimeRange(e.target.value)}
// //                           label="Time Range"
// //                         >
// //                           <MenuItem value="3m">Last 3 Months</MenuItem>
// //                           <MenuItem value="6m">Last 6 Months</MenuItem>
// //                           <MenuItem value="12m">Last 12 Months</MenuItem>
// //                           <MenuItem value="all">All Time</MenuItem>
// //                         </Select>
// //                       </FormControl>
// //                     </Box>

// //                     {revenueAnalytics.length > 0 || appointmentAnalytics.length > 0 ? (
// //                       <Grid container spacing={3}>
// //                         {/* Revenue Chart */}
// //                         <Grid item xs={12} md={6}>
// //                           <Typography variant="subtitle1" gutterBottom>
// //                             Revenue Over Time
// //                           </Typography>
// //                           <Box sx={{ height: 300 }}>
// //                             <Line data={revenueChartData} options={revenueChartOptions} />
// //                           </Box>
// //                         </Grid>
// //                         {/* Appointment Chart */}
// //                         <Grid item xs={12} md={6}>
// //                           <Typography variant="subtitle1" gutterBottom>
// //                             Appointments Over Time
// //                           </Typography>
// //                           <Box sx={{ height: 300 }}>
// //                             <Bar data={appointmentChartData} options={appointmentChartOptions} />
// //                           </Box>
// //                         </Grid>
// //                       </Grid>
// //                     ) : (
// //                       <Typography variant="body2">
// //                         No analytics data available.
// //                       </Typography>
// //                     )}
// //                   </Paper>
// //                 </Box>

// //                 <Box mt={4}>
// //                   <Typography variant="h6" gutterBottom>
// //                     Quick Actions
// //                   </Typography>
// //                   <Grid container spacing={2}>
// //                     <Grid item xs={12} sm={6} md={3}>
// //                       <Button
// //                         fullWidth
// //                         variant="contained"
// //                         startIcon={<AddIcon />}
// //                         sx={{
// //                           backgroundColor: "#2196f3",
// //                           textTransform: "uppercase",
// //                           "&:hover": { backgroundColor: "#1976d2" },
// //                         }}
// //                         onClick={() => handleMenuClick(1)}
// //                       >
// //                         Add New Service
// //                       </Button>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6} md={3}>
// //                       <Button
// //                         fullWidth
// //                         variant="contained"
// //                         startIcon={<AddIcon />}
// //                         sx={{
// //                           backgroundColor: "#2196f3",
// //                           textTransform: "uppercase",
// //                           "&:hover": { backgroundColor: "#1976d2" },
// //                         }}
// //                         onClick={() => handleMenuClick(2)}
// //                       >
// //                         Add New Material
// //                       </Button>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6} md={3}>
// //                       <Button
// //                         fullWidth
// //                         variant="contained"
// //                         startIcon={<CalendarIcon />}
// //                         sx={{
// //                           backgroundColor: "#2196f3",
// //                           textTransform: "uppercase",
// //                           "&:hover": { backgroundColor: "#1976d2" },
// //                         }}
// //                         onClick={() => handleMenuClick(3)}
// //                       >
// //                         View Appointments
// //                       </Button>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6} md={3}>
// //                       <Button
// //                         fullWidth
// //                         variant="contained"
// //                         startIcon={<DescriptionIcon />}
// //                         sx={{
// //                           backgroundColor: "#2196f3",
// //                           textTransform: "uppercase",
// //                           "&:hover": { backgroundColor: "#1976d2" },
// //                         }}
// //                         onClick={() => handleMenuClick(4)}
// //                       >
// //                         Generate Document
// //                       </Button>
// //                     </Grid>
// //                   </Grid>
// //                 </Box>

// //                 <Box mt={4}>
// //                   <Typography variant="h6" gutterBottom>
// //                     Notifications
// //                   </Typography>
// //                   <Paper sx={{ p: 2 }}>
// //                     <List>
// //                       <ListItem>
// //                         <ListItemIcon>
// //                           <CalendarIcon color="primary" />
// //                         </ListItemIcon>
// //                         <ListItemText primary="Upcoming Appointment: Site Inspection on 12th Feb, 2025" />
// //                       </ListItem>
// //                       <Divider />
// //                       <ListItem>
// //                         <ListItemIcon>
// //                           <WarningIcon color="warning" />
// //                         </ListItemIcon>
// //                         <ListItemText primary="Low Stock Alert: Cement stock below threshold." />
// //                       </ListItem>
// //                       <Divider />
// //                       <ListItem>
// //                         <ListItemIcon>
// //                           <CheckCircleIcon color="success" />
// //                         </ListItemIcon>
// //                         <ListItemText primary="Recent Service Added: Residential Construction Service." />
// //                       </ListItem>
// //                     </List>
// //                   </Paper>
// //                 </Box>
// //               </Box>
// //             )}

// //             {tabIndex === 1 && <ServicesManagement />}
// //             {tabIndex === 2 && <MaterialsManagement />}
// //             {tabIndex === 3 && <Appointments />}
// //             {tabIndex === 4 && <Documents />}
// //             {tabIndex === 5 && <CompanyOrdersPage />}
// //             {tabIndex === 6 && <CompanyUploadForm onSubmit={handleFormSubmit} />}
// //             {tabIndex === 7 && (
// //               <InquiriesList
// //                 inquiries={inquiries.length > 0 ? inquiries : undefined}
// //                 clickable={isInquiriesClickable}
// //               />
// //             )}
// //             {tabIndex === 8 && <Agreements userType="company" />}
// //           </Container>
// //         </Box>

// //         {tabIndex === 0 && (
// //           <Box
// //             sx={{
// //               width: 300,
// //               backgroundColor: "#f0f0f0",
// //               borderLeft: "1px solid #ddd",
// //               p: 2,
// //               position: "sticky",
// //               right: 0,
// //               top: 64,
// //               bottom: 0,
// //               overflowY: "auto",
// //               zIndex: 1000,
// //               height: "calc(100vh - 64px)",
// //               boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
// //             }}
// //           >
// //             <Typography variant="h6" gutterBottom>
// //               Recent Activity
// //             </Typography>
// //           </Box>
// //         )}
// //       </Box>

// //       <Modal
// //         open={openSubscriptionModal}
// //         onClose={handleCloseSubscriptionModal}
// //         aria-labelledby="subscription-modal-title"
// //         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
// //       >
// //         <Box sx={{ outline: "none" }}>
// //           <Subscription
// //             companyId={localStorage.getItem("company_id")}
// //             onLogout={handleLogout}
// //             remainingDays={remainingDays}
// //             onSubscribe={() => {
// //               handleCloseSubscriptionModal();
// //               window.location.reload();
// //             }}
// //           />
// //         </Box>
// //       </Modal>
// //     </Box>
// //   );
// // };

// // export default CompanyDashboard;
// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Grid,
//   Box,
//   Paper,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Alert,
//   Modal,
//   IconButton,
//   Badge,
//   Menu,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   Build as BuildIcon,
//   Inventory as InventoryIcon,
//   CalendarToday as CalendarIcon,
//   Description as DescriptionIcon,
//   ShoppingCart as ShoppingCartIcon,
//   Add as AddIcon,
//   Business as BusinessIcon,
//   Assignment as AssignmentIcon,
//   Logout as LogoutIcon,
//   Gavel as GavelIcon,
//   Payment as PaymentIcon,
//   Notifications as NotificationsIcon,
// } from "@mui/icons-material";
// import { Line, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import ServicesManagement from "../components/ServicesManagement";
// import MaterialsManagement from "../components/MaterialsManagement";
// import Appointments from "../components/Appointments";
// import Documents from "../components/Documents";
// import CompanyUploadForm from "../components/CompanyUploadForm";
// import InquiriesList from "../components/InquiriesList";
// import Agreements from "../Company/Agreements";
// import Subscription from "../Company/Subscription";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import CompanyOrdersPage from "../components/CompanyordersPage";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const CompanyDashboard = () => {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [companyName, setCompanyName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [inquiries, setInquiries] = useState([]);
//   const [error, setError] = useState(null);
//   const [hasNewInquiries, setHasNewInquiries] = useState(false);
//   const [isInquiriesClickable, setIsInquiriesClickable] = useState(false);
//   const [subscriptionData, setSubscriptionData] = useState(null);
//   const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
//   const [remainingDays, setRemainingDays] = useState(0);
//   const [dashboardData, setDashboardData] = useState({
//     total_services: 0,
//     pending_appointments: 0,
//     total_revenue: 0,
//   });
//   const [revenueAnalytics, setRevenueAnalytics] = useState([]);
//   const [appointmentAnalytics, setAppointmentAnalytics] = useState([]);
//   const [timeRange, setTimeRange] = useState("6m");
//   const [notifications, setNotifications] = useState([]);
//   const [notificationAnchor, setNotificationAnchor] = useState(null);
//   const [unreadCount, setUnreadCount] = useState(0);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadInitialData = async () => {
//       try {
//         const storedCompanyName = sessionStorage.getItem("companyName");
//         if (storedCompanyName) {
//           setCompanyName(storedCompanyName);
//         }

//         const companyId = localStorage.getItem("company_id");
//         if (!companyId) {
//           setError("Company ID not found. Please log in again.");
//           navigate("/login");
//           return;
//         }

//         const numericCompanyId = parseInt(companyId, 10);
//         if (isNaN(numericCompanyId)) {
//           setError("Invalid company ID format. Please log in again.");
//           navigate("/login");
//           return;
//         }

//         const accessToken = localStorage.getItem("access_token");
//         if (accessToken) {
//           API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//         }

//         // Fetch company data
//         const companyResponse = await API.get(`/company-registration/${numericCompanyId}/`);
//         const companyData = companyResponse.data;
//         setCompanyName(companyData.company_name);
//         sessionStorage.setItem("companyName", companyData.company_name);

//         // Fetch subscription data
//         const subscriptionResponse = await API.get(`/subscription-status/${numericCompanyId}/`);
//         const subData = subscriptionResponse.data;
//         setSubscriptionData(subData);

//         if (!subData.is_subscribed) {
//           setOpenSubscriptionModal(true);
//         } else {
//           const endDate = new Date(subData.end_date);
//           const today = new Date();
//           const timeDiff = endDate - today;
//           const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//           setRemainingDays(daysLeft > 0 ? daysLeft : 0);
//         }

//         // Fetch dashboard data
//         const dashboardResponse = await API.get("/api/company-dashboard-data/");
//         setDashboardData(dashboardResponse.data);

//         // Fetch analytics data
//         const revenueAnalyticsResponse = await API.get(`/api/revenue-analytics/?time_range=${timeRange}`);
//         setRevenueAnalytics(revenueAnalyticsResponse.data);

//         const appointmentAnalyticsResponse = await API.get(`/api/appointment-analytics/?time_range=${timeRange}`);
//         setAppointmentAnalytics(appointmentAnalyticsResponse.data);

//         await fetchInquiries();
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         if (error.response) {
//           if (error.response.status === 404) {
//             setError("Company not found. Please check your company ID or log in again.");
//             navigate("/login");
//           } else if (error.response.status === 401 || error.response.status === 403) {
//             setError("Unauthorized access. Please log in again.");
//             navigate("/login");
//           } else {
//             setError("An error occurred while loading data. Please try again.");
//           }
//         } else {
//           setError("No response from server. Please check your connection and try again.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadInitialData();
//   }, [navigate, timeRange]);

//   // SSE for notifications
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       setError("Please log in to receive notifications");
//       return;
//     }

//     const eventSource = new EventSource(`http://127.0.0.1:8000/api/sse/notifications/?token=${token}`);
//     eventSource.onmessage = (event) => {
//       try {
//         const newNotification = JSON.parse(event.data);
//         setNotifications((prev) => [newNotification, ...prev]);
//         if (!newNotification.is_read) {
//           setUnreadCount((prev) => prev + 1);
//         }
//       } catch (err) {
//         console.error("Error parsing SSE message:", err);
//       }
//     };

//     eventSource.onerror = () => {
//       console.log("SSE error, reconnecting...");
//       setError("Notification connection lost, reconnecting...");
//     };

//     return () => eventSource.close();
//   }, []);

//   // Mark notification as read
//   const handleMarkAsRead = async (notificationId) => {
//     try {
//       const token = localStorage.getItem("access_token");
//       const response = await API.post(
//         "/api/notifications/mark_read/",
//         { notification_id: notificationId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (response.data.status === "success") {
//         setNotifications((prev) =>
//           prev.map((notif) =>
//             notif.id === notificationId ? { ...notif, is_read: true } : notif
//           )
//         );
//         setUnreadCount((prev) => Math.max(prev - 1, 0));
//       }
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//       setError("Failed to mark notification as read");
//     }
//   };

//   const fetchInquiries = async () => {
//     try {
//       const response = await API.get("api/company-inquiries/");
//       setInquiries(response.data);
//     } catch (error) {
//       console.error("Error fetching inquiries:", error);
//       if (error.response?.status === 401) {
//         setError("Session expired. Please log in again.");
//         handleLogout();
//       } else {
//         setError("Failed to load inquiries. Please try again.");
//       }
//     }
//   };

//   const markInquiriesChecked = async () => {
//     try {
//       await API.post("/mark-inquiries-checked/");
//       setHasNewInquiries(false);
//     } catch (error) {
//       console.error("Error marking inquiries as checked:", error);
//       if (error.response?.status === 401) {
//         setError("Session expired. Please log in again.");
//         handleLogout();
//       } else {
//         setError("Failed to mark inquiries as checked.");
//       }
//     }
//   };

//   const handleMenuClick = (newIndex) => {
//     setTabIndex(newIndex);
//     if (newIndex === 7) {
//       setIsInquiriesClickable(true);
//       markInquiriesChecked();
//     } else {
//       setIsInquiriesClickable(false);
//     }
//   };

//   const handleFormSubmit = (formData) => {
//     setInquiries((prev) => [...prev, formData]);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("company_id");
//     sessionStorage.removeItem("companyName");
//     delete API.defaults.headers.common["Authorization"];
//     navigate("/login");
//   };

//   const handleOpenSubscriptionModal = () => {
//     setOpenSubscriptionModal(true);
//   };

//   const handleCloseSubscriptionModal = () => {
//     setOpenSubscriptionModal(false);
//   };

//   const handleNotificationClick = (event) => setNotificationAnchor(event.currentTarget);
//   const handleNotificationClose = () => setNotificationAnchor(null);

//   // Prepare data for Revenue Chart
//   const revenueChartData = {
//     labels: revenueAnalytics.map((data) => data.month),
//     datasets: [
//       {
//         label: "Revenue (RS)",
//         data: revenueAnalytics.map((data) => data.total_revenue),
//         borderColor: "#2196f3",
//         backgroundColor: "rgba(33, 150, 243, 0.2)",
//         fill: true,
//       },
//     ],
//   };

//   const revenueChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Revenue Over Time" },
//     },
//     scales: {
//       y: { beginAtZero: true, title: { display: true, text: "Revenue (RS)" }, grid: { display: true } },
//       x: { title: { display: true, text: "Month" }, grid: { display: false } },
//     },
//   };

//   // Prepare data for Appointment Chart
//   const appointmentChartData = {
//     labels: appointmentAnalytics.map((data) => data.month),
//     datasets: [
//       {
//         label: "Pending",
//         data: appointmentAnalytics.map((data) => data.Pending),
//         backgroundColor: "#e91e63",
//         borderColor: "#e91e63",
//         borderWidth: 1,
//       },
//       {
//         label: "Confirmed",
//         data: appointmentAnalytics.map((data) => data.Confirmed),
//         backgroundColor: "#4caf50",
//         borderColor: "#4caf50",
//         borderWidth: 1,
//       },
//       {
//         label: "No-Show",
//         data: appointmentAnalytics.map((data) => data["No-Show"]),
//         backgroundColor: "#ff9800",
//         borderColor: "#ff9800",
//         borderWidth: 1,
//       },
//       {
//         label: "Completed",
//         data: appointmentAnalytics.map((data) => data.Completed),
//         backgroundColor: "#2196f3",
//         borderColor: "#2196f3",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const appointmentChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: { font: { size: 14 }, padding: 20 },
//       },
//       title: {
//         display: true,
//         text: "Appointments Over Time",
//         font: { size: 16 },
//         padding: { top: 10, bottom: 20 },
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => {
//             const datasetLabel = context.dataset.label || "";
//             const value = context.parsed.y;
//             return `${datasetLabel}: ${value}`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         stacked: true,
//         title: { display: true, text: "Month", font: { size: 14 } },
//         grid: { display: false },
//       },
//       y: {
//         stacked: true,
//         beginAtZero: true,
//         title: { display: true, text: "Number of Appointments", font: { size: 14 } },
//         grid: { display: true },
//         ticks: { stepSize: 1 },
//       },
//       x: { stacked: true },
//     },
//     elements: {
//       bar: { borderWidth: 1, barThickness: 30 },
//     },
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       <AppBar position="static" sx={{ backgroundColor: "#2196f3", zIndex: 1201 }}>
//         <Toolbar sx={{ justifyContent: "space-between" }}>
//           <Typography variant="h6">Welcome, {companyName || "Guest"}</Typography>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton onClick={handleNotificationClick} sx={{ mr: 2 }}>
//               <Badge badgeContent={unreadCount} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//             <Menu
//               anchorEl={notificationAnchor}
//               open={Boolean(notificationAnchor)}
//               onClose={handleNotificationClose}
//               PaperProps={{ style: { maxHeight: 400, width: 300 } }}
//             >
//               {notifications.length === 0 ? (
//                 <MenuItem>No notifications</MenuItem>
//               ) : (
//                 notifications.map((notification) => (
//                   <MenuItem
//                     key={notification.id}
//                     onClick={() => handleMarkAsRead(notification.id)}
//                     sx={{ backgroundColor: notification.is_read ? "inherit" : "#f5f5f5" }}
//                   >
//                     <Box>
//                       <Typography variant="body2">{notification.message}</Typography>
//                       <Typography variant="caption" color="textSecondary">
//                         {new Date(notification.created_at).toLocaleString()}
//                       </Typography>
//                     </Box>
//                   </MenuItem>
//                 ))
//               )}
//             </Menu>
//             {subscriptionData?.is_subscribed && (
//               <Typography variant="body2" sx={{ mr: 2, color: "#fff" }}>
//                 Subscription: {remainingDays} days remaining
//                 <IconButton
//                   color="inherit"
//                   onClick={handleOpenSubscriptionModal}
//                   sx={{ ml: 1 }}
//                 >
//                   <PaymentIcon />
//                 </IconButton>
//               </Typography>
//             )}
//             <Button
//               color="inherit"
//               sx={{ textTransform: "uppercase" }}
//               onClick={handleLogout}
//               startIcon={<LogoutIcon />}
//             >
//               Logout
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {error && (
//         <Alert severity="error" sx={{ m: 2 }} onClose={() => setError(null)}>
//           {error}
//         </Alert>
//       )}

//       <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
//         <Box
//           sx={{
//             width: 240,
//             backgroundColor: "#fff",
//             borderRight: "1px solid #ddd",
//             overflowY: "auto",
//             flexShrink: 0,
//           }}
//         >
//           <List>
//             <ListItem button selected={tabIndex === 0} onClick={() => handleMenuClick(0)}>
//               <ListItemIcon>
//                 <DashboardIcon color={tabIndex === 0 ? "primary" : "inherit"} />
//               </ListItemIcon>
//               <ListItemText primary="Dashboard" />
//             </ListItem>
//             <ListItem button selected={tabIndex === 1} onClick={() => handleMenuClick(1)}>
//               <ListItemIcon>
//                 <BuildIcon color={tabIndex === 1 ? "primary" : "inherit"} />
//               </ListItemIcon>
//               <ListItemText primary="Manage Services" />
//             </ListItem>
//             <ListItem button selected={tabIndex === 2} onClick={() => handleMenuClick(2)}>
//               <ListItemIcon>
//                 <InventoryIcon color={tabIndex === 2 ? "primary" : "inherit"} />
//               </ListItemIcon>
//               <ListItemText primary="Manage Materials" />
//             </ListItem>
//             <ListItem button selected={tabIndex === 3} onClick={() => handleMenuClick(3)}>
//               <ListItemIcon>
//                 <CalendarIcon color={tabIndex === 3 ? "primary" : "inherit"} />
//               </ListItemIcon>
//               <ListItemText primary="Appointments" />
//             </ListItem>
//             <ListItem button selected={tabIndex === 4} onClick={() => handleMenuClick(4)}>
//               <ListItemIcon>
//                 <DescriptionIcon color={tabIndex === 4 ? "primary" : "inherit"} />
//               </ListItemIcon>
//               <ListItemText primary="Documents" />
//             </ListItem>
//             <ListItem button selected={tabIndex === 5} onClick={() => handleMenuClick(5)}>
//               <ListItemIcon>
//                 <ShoppingCartIcon color={tabIndex === 5 ? "primary" : "inherit"} />
//               </ListItemIcon>
//               <ListItemText primary="Order" />
//             </ListItem>
//             <ListItem button selected={tabIndex === 6} onClick={() => handleMenuClick(6)}>
//               <ListItemIcon>
//                 <BusinessIcon color={tabIndex === 6 ? "primary" : "inherit"} />
//               </ListItemIcon>
//               <ListItemText primary="Upload Company Details" />
//             </ListItem>
//             <ListItem button selected={tabIndex === 7} onClick={() => handleMenuClick(7)}>
//               <ListItemIcon>
//                 <AssignmentIcon color={tabIndex === 7 ? "primary" : "inherit"} />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Inquiries"
//                 secondary={hasNewInquiries ? <span style={{ color: "red" }}>New!</span> : null}
//               />
//             </ListItem>
//             <ListItem button selected={tabIndex === 8} onClick={() => handleMenuClick(8)}>
//               <ListItemIcon>
//                 <GavelIcon color={tabIndex === 8 ? "primary" : "inherit"} />
//               </ListItemIcon>
//               <ListItemText primary="Agreements" />
//             </ListItem>
//           </List>
//         </Box>

//         <Box
//           sx={{
//             flex: 1,
//             overflowY: "auto",
//             backgroundColor: "#f5f5f5",
//             p: 2,
//             position: "relative",
//           }}
//         >
//           <Container sx={{ py: 3, maxWidth: "100% !important" }}>
//             {tabIndex === 0 && (
//               <Box>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} md={4}>
//                     <Paper sx={{ p: 3, "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}>
//                       <Typography color="textSecondary">Total Services</Typography>
//                       <Typography variant="h4" color="#2196f3" sx={{ mt: 1 }}>
//                         {dashboardData.total_services}
//                       </Typography>
//                     </Paper>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <Paper sx={{ p: 3, "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}>
//                       <Typography color="textSecondary">Pending Appointments</Typography>
//                       <Typography variant="h4" sx={{ mt: 1, color: "#e91e63" }}>
//                         {dashboardData.pending_appointments}
//                       </Typography>
//                     </Paper>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <Paper sx={{ p: 3, "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}>
//                       <Typography color="textSecondary">Total Revenue</Typography>
//                       <Typography variant="h4" sx={{ mt: 1 }}>
//                         RS. {dashboardData.total_revenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                       </Typography>
//                     </Paper>
//                   </Grid>
//                 </Grid>

//                 <Box mt={4}>
//                   <Typography variant="h6" gutterBottom>
//                     Revenue and Appointments Analytics
//                   </Typography>
//                   <Paper sx={{ p: 2 }}>
//                     <Box mb={2}>
//                       <FormControl sx={{ minWidth: 200 }}>
//                         <InputLabel>Time Range</InputLabel>
//                         <Select
//                           value={timeRange}
//                           onChange={(e) => setTimeRange(e.target.value)}
//                           label="Time Range"
//                         >
//                           <MenuItem value="3m">Last 3 Months</MenuItem>
//                           <MenuItem value="6m">Last 6 Months</MenuItem>
//                           <MenuItem value="12m">Last 12 Months</MenuItem>
//                           <MenuItem value="all">All Time</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </Box>

//                     {revenueAnalytics.length > 0 || appointmentAnalytics.length > 0 ? (
//                       <Grid container spacing={3}>
//                         <Grid item xs={12} md={6}>
//                           <Typography variant="subtitle1" gutterBottom>
//                             Revenue Over Time
//                           </Typography>
//                           <Box sx={{ height: 300 }}>
//                             <Line data={revenueChartData} options={revenueChartOptions} />
//                           </Box>
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                           <Typography variant="subtitle1" gutterBottom>
//                             Appointments Over Time
//                           </Typography>
//                           <Box sx={{ height: 300 }}>
//                             <Bar data={appointmentChartData} options={appointmentChartOptions} />
//                           </Box>
//                         </Grid>
//                       </Grid>
//                     ) : (
//                       <Typography variant="body2">
//                         No analytics data available.
//                       </Typography>
//                     )}
//                   </Paper>
//                 </Box>

//                 <Box mt={4}>
//                   <Typography variant="h6" gutterBottom>
//                     Quick Actions
//                   </Typography>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6} md={3}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         startIcon={<AddIcon />}
//                         sx={{
//                           backgroundColor: "#2196f3",
//                           textTransform: "uppercase",
//                           "&:hover": { backgroundColor: "#1976d2" },
//                         }}
//                         onClick={() => handleMenuClick(1)}
//                       >
//                         Add New Service
//                       </Button>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         startIcon={<AddIcon />}
//                         sx={{
//                           backgroundColor: "#2196f3",
//                           textTransform: "uppercase",
//                           "&:hover": { backgroundColor: "#1976d2" },
//                         }}
//                         onClick={() => handleMenuClick(2)}
//                       >
//                         Add New Material
//                       </Button>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         startIcon={<CalendarIcon />}
//                         sx={{
//                           backgroundColor: "#2196f3",
//                           textTransform: "uppercase",
//                           "&:hover": { backgroundColor: "#1976d2" },
//                         }}
//                         onClick={() => handleMenuClick(3)}
//                       >
//                         View Appointments
//                       </Button>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         startIcon={<DescriptionIcon />}
//                         sx={{
//                           backgroundColor: "#2196f3",
//                           textTransform: "uppercase",
//                           "&:hover": { backgroundColor: "#1976d2" },
//                         }}
//                         onClick={() => handleMenuClick(4)}
//                       >
//                         Generate Document
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Box>
//             )}

//             {tabIndex === 1 && <ServicesManagement />}
//             {tabIndex === 2 && <MaterialsManagement />}
//             {tabIndex === 3 && <Appointments />}
//             {tabIndex === 4 && <Documents />}
//             {tabIndex === 5 && <CompanyOrdersPage />}
//             {tabIndex === 6 && <CompanyUploadForm onSubmit={handleFormSubmit} />}
//             {tabIndex === 7 && (
//               <InquiriesList
//                 inquiries={inquiries.length > 0 ? inquiries : undefined}
//                 clickable={isInquiriesClickable}
//               />
//             )}
//             {tabIndex === 8 && <Agreements userType="company" />}
//           </Container>
//         </Box>

//         {tabIndex === 0 && (
//           <Box
//             sx={{
//               width: 300,
//               backgroundColor: "#f0f0f0",
//               borderLeft: "1px solid #ddd",
//               p: 2,
//               position: "sticky",
//               right: 0,
//               top: 64,
//               bottom: 0,
//               overflowY: "auto",
//               zIndex: 1000,
//               height: "calc(100vh - 64px)",
//               boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Recent Activity
//             </Typography>
//           </Box>
//         )}
//       </Box>

//       <Modal
//         open={openSubscriptionModal}
//         onClose={handleCloseSubscriptionModal}
//         aria-labelledby="subscription-modal-title"
//         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//       >
//         <Box sx={{ outline: "none" }}>
//           <Subscription
//             companyId={localStorage.getItem("company_id")}
//             onLogout={handleLogout}
//             remainingDays={remainingDays}
//             onSubscribe={() => {
//               handleCloseSubscriptionModal();
//               window.location.reload();
//             }}
//           />
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default CompanyDashboard;
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
  Divider,
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
  Build as BuildIcon,
  Inventory as InventoryIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  Logout as LogoutIcon,
  Gavel as GavelIcon,
  Payment as PaymentIcon,
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ServicesManagement from "../components/ServicesManagement";
import MaterialsManagement from "../components/MaterialsManagement";
import Appointments from "../components/Appointments";
import Documents from "../components/Documents";
import CompanyUploadForm from "../components/CompanyUploadForm";
import InquiriesList from "../components/InquiriesList";
import Agreements from "../Company/Agreements";
import Subscription from "../Company/Subscription";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CompanyOrdersPage from "../components/CompanyordersPage";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CompanyDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState(null);
  const [hasNewInquiries, setHasNewInquiries] = useState(false);
  const [isInquiriesClickable, setIsInquiriesClickable] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const [remainingDays, setRemainingDays] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    total_services: 0,
    pending_appointments: 0,
    total_revenue: 0,
  });
  const [revenueAnalytics, setRevenueAnalytics] = useState([]);
  const [appointmentAnalytics, setAppointmentAnalytics] = useState([]);
  const [timeRange, setTimeRange] = useState("6m");
  const [notifications, setNotifications] = useState([]);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();

  // Fetch initial data (company info, subscription, dashboard data, analytics, inquiries)
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

        // Fetch dashboard data
        const dashboardResponse = await API.get("/api/company-dashboard-data/");
        setDashboardData(dashboardResponse.data);

        // Fetch analytics data
        const revenueAnalyticsResponse = await API.get(`/api/revenue-analytics/?time_range=${timeRange}`);
        setRevenueAnalytics(revenueAnalyticsResponse.data);

        const appointmentAnalyticsResponse = await API.get(`/api/appointment-analytics/?time_range=${timeRange}`);
        setAppointmentAnalytics(appointmentAnalyticsResponse.data);

        await fetchInquiries();
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
  }, [navigate, timeRange]);

  // Fetch existing notifications on mount
  // useEffect(() => {
  //   const fetchExistingNotifications = async () => {
  //     try {
  //       const token = localStorage.getItem("access_token");
  //       const response = await API.get("/api/notifications/", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setNotifications(response.data);
  //       const unread = response.data.filter((notif) => !notif.is_read).length;
  //       setUnreadCount(unread);
  //     } catch (error) {
  //       console.error("Error fetching existing notifications:", error);
  //       setError("Failed to load existing notifications.");
  //     }
  //   };

  //   fetchExistingNotifications();
  // }, []);

  // SSE for real-time notifications
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
        setError("Notification connection lost, reconnecting...");
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

  const fetchInquiries = async () => {
    try {
      const response = await API.get("api/company-inquiries/");
      setInquiries(response.data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      if (error.response?.status === 401) {
        setError("Session expired. Please log in again.");
        handleLogout();
      } else {
        setError("Failed to load inquiries. Please try again.");
      }
    }
  };

  // const markInquiriesChecked = async () => {
  //   try {
  //     await API.post("/mark-inquiries-checked/");
  //     setHasNewInquiries(false);
  //   } catch (error) {
  //     console.error("Error marking inquiries as checked:", error);
  //     if (error.response?.status === 401) {
  //       setError("Session expired. Please log in again.");
  //       handleLogout();
  //     } else {
  //       setError("Failed to mark inquiries as checked.");
  //     }
  //   }
  // };

  const handleMenuClick = (newIndex) => {
    setTabIndex(newIndex);
    if (newIndex === 7) {
      setIsInquiriesClickable(true);
      // markInquiriesChecked();
    } else {
      setIsInquiriesClickable(false);
    }
  };

  const handleFormSubmit = (formData) => {
    setInquiries((prev) => [...prev, formData]);
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

  // Prepare data for Revenue Chart
  const revenueChartData = {
    labels: revenueAnalytics.map((data) => data.month),
    datasets: [
      {
        label: "Revenue (RS)",
        data: revenueAnalytics.map((data) => data.total_revenue),
        borderColor: "#2196f3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        fill: true,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Revenue Over Time" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Revenue (RS)" }, grid: { display: true } },
      x: { title: { display: true, text: "Month" }, grid: { display: false } },
    },
  };

  // Prepare data for Appointment Chart
  const appointmentChartData = {
    labels: appointmentAnalytics.map((data) => data.month),
    datasets: [
      {
        label: "Pending",
        data: appointmentAnalytics.map((data) => data.Pending),
        backgroundColor: "#e91e63",
        borderColor: "#e91e63",
        borderWidth: 1,
      },
      {
        label: "Confirmed",
        data: appointmentAnalytics.map((data) => data.Confirmed),
        backgroundColor: "#4caf50",
        borderColor: "#4caf50",
        borderWidth: 1,
      },
      {
        label: "No-Show",
        data: appointmentAnalytics.map((data) => data["No-Show"]),
        backgroundColor: "#ff9800",
        borderColor: "#ff9800",
        borderWidth: 1,
      },
      {
        label: "Completed",
        data: appointmentAnalytics.map((data) => data.Completed),
        backgroundColor: "#2196f3",
        borderColor: "#2196f3",
        borderWidth: 1,
      },
    ],
  };

  const appointmentChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 14 }, padding: 20 },
      },
      title: {
        display: true,
        text: "Appointments Over Time",
        font: { size: 16 },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || "";
            const value = context.parsed.y;
            return `${datasetLabel}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: { display: true, text: "Month", font: { size: 14 } },
        grid: { display: false },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: { display: true, text: "Number of Appointments", font: { size: 14 } },
        grid: { display: true },
        ticks: { stepSize: 1 },
      },
    },
    elements: {
      bar: { borderWidth: 1, barThickness: 30 },
    },
  };

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
            <IconButton onClick={handleNotificationClick} sx={{ mr: 2 }}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={notificationAnchor}
              open={Boolean(notificationAnchor)}
              onClose={handleNotificationClose}
              PaperProps={{ style: { maxHeight: 400, width: 300 } }}
            >
              {notifications.length === 0 ? (
                <MenuItem>No notifications</MenuItem>
              ) : (
                notifications.map((notification) => (
                  <MenuItem
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    sx={{ backgroundColor: notification.is_read ? "inherit" : "#f5f5f5" }}
                  >
                    <Box>
                      <Typography variant="body2">{notification.message}</Typography>
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
                <BuildIcon color={tabIndex === 1 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Manage Services" />
            </ListItem>
            <ListItem button selected={tabIndex === 2} onClick={() => handleMenuClick(2)}>
              <ListItemIcon>
                <InventoryIcon color={tabIndex === 2 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Manage Materials" />
            </ListItem>
            <ListItem button selected={tabIndex === 3} onClick={() => handleMenuClick(3)}>
              <ListItemIcon>
                <CalendarIcon color={tabIndex === 3 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Appointments" />
            </ListItem>
            <ListItem button selected={tabIndex === 4} onClick={() => handleMenuClick(4)}>
              <ListItemIcon>
                <DescriptionIcon color={tabIndex === 4 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItem>
            <ListItem button selected={tabIndex === 5} onClick={() => handleMenuClick(5)}>
              <ListItemIcon>
                <ShoppingCartIcon color={tabIndex === 5 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Order" />
            </ListItem>
            <ListItem button selected={tabIndex === 6} onClick={() => handleMenuClick(6)}>
              <ListItemIcon>
                <BusinessIcon color={tabIndex === 6 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Upload Company Details" />
            </ListItem>
            <ListItem button selected={tabIndex === 7} onClick={() => handleMenuClick(7)}>
              <ListItemIcon>
                <AssignmentIcon color={tabIndex === 7 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText
                primary="Inquiries"
                secondary={hasNewInquiries ? <span style={{ color: "red" }}>New!</span> : null}
              />
            </ListItem>
            <ListItem button selected={tabIndex === 8} onClick={() => handleMenuClick(8)}>
              <ListItemIcon>
                <GavelIcon color={tabIndex === 8 ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Agreements" />
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
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}>
                      <Typography color="textSecondary">Total Services</Typography>
                      <Typography variant="h4" color="#2196f3" sx={{ mt: 1 }}>
                        {dashboardData.total_services}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}>
                      <Typography color="textSecondary">Pending Appointments</Typography>
                      <Typography variant="h4" sx={{ mt: 1, color: "#e91e63" }}>
                        {dashboardData.pending_appointments}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}>
                      <Typography color="textSecondary">Total Revenue</Typography>
                      <Typography variant="h4" sx={{ mt: 1 }}>
                        RS. {dashboardData.total_revenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Revenue and Appointments Analytics
                  </Typography>
                  <Paper sx={{ p: 2 }}>
                    <Box mb={2}>
                      <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Time Range</InputLabel>
                        <Select
                          value={timeRange}
                          onChange={(e) => setTimeRange(e.target.value)}
                          label="Time Range"
                        >
                          <MenuItem value="3m">Last 3 Months</MenuItem>
                          <MenuItem value="6m">Last 6 Months</MenuItem>
                          <MenuItem value="12m">Last 12 Months</MenuItem>
                          <MenuItem value="all">All Time</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    {revenueAnalytics.length > 0 || appointmentAnalytics.length > 0 ? (
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle1" gutterBottom>
                            Revenue Over Time
                          </Typography>
                          <Box sx={{ height: 300 }}>
                            <Line data={revenueChartData} options={revenueChartOptions} />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle1" gutterBottom>
                            Appointments Over Time
                          </Typography>
                          <Box sx={{ height: 300 }}>
                            <Bar data={appointmentChartData} options={appointmentChartOptions} />
                          </Box>
                        </Grid>
                      </Grid>
                    ) : (
                      <Typography variant="body2">
                        No analytics data available.
                      </Typography>
                    )}
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
                        startIcon={<AddIcon />}
                        sx={{
                          backgroundColor: "#2196f3",
                          textTransform: "uppercase",
                          "&:hover": { backgroundColor: "#1976d2" },
                        }}
                        onClick={() => handleMenuClick(1)}
                      >
                        Add New Service
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                          backgroundColor: "#2196f3",
                          textTransform: "uppercase",
                          "&:hover": { backgroundColor: "#1976d2" },
                        }}
                        onClick={() => handleMenuClick(2)}
                      >
                        Add New Material
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<CalendarIcon />}
                        sx={{
                          backgroundColor: "#2196f3",
                          textTransform: "uppercase",
                          "&:hover": { backgroundColor: "#1976d2" },
                        }}
                        onClick={() => handleMenuClick(3)}
                      >
                        View Appointments
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<DescriptionIcon />}
                        sx={{
                          backgroundColor: "#2196f3",
                          textTransform: "uppercase",
                          "&:hover": { backgroundColor: "#1976d2" },
                        }}
                        onClick={() => handleMenuClick(4)}
                      >
                        Generate Document
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Notifications
                  </Typography>
                  <Paper sx={{ p: 2 }}>
                    <List>
                      {notifications.length === 0 ? (
                        <ListItem>
                          <ListItemText primary="No notifications available." />
                        </ListItem>
                      ) : (
                        notifications.map((notification, index) => (
                          <React.Fragment key={notification.id}>
                            <ListItem
                              onClick={() => handleMarkAsRead(notification.id)}
                              sx={{ backgroundColor: notification.is_read ? "inherit" : "#f5f5f5" }}
                            >
                              <ListItemIcon>
                                {notification.message.includes("Appointment") ? (
                                  <CalendarIcon color="primary" />
                                ) : notification.message.includes("Low Stock") ? (
                                  <WarningIcon color="warning" />
                                ) : notification.message.includes("Service Added") ? (
                                  <CheckCircleIcon color="success" />
                                ) : (
                                  <NotificationsIcon color="info" />
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={notification.message}
                                secondary={new Date(notification.created_at).toLocaleString()}
                              />
                            </ListItem>
                            {index < notifications.length - 1 && <Divider />}
                          </React.Fragment>
                        ))
                      )}
                    </List>
                  </Paper>
                </Box>
              </Box>
            )}

            {tabIndex === 1 && <ServicesManagement />}
            {tabIndex === 2 && <MaterialsManagement />}
            {tabIndex === 3 && <Appointments />}
            {tabIndex === 4 && <Documents />}
            {tabIndex === 5 && <CompanyOrdersPage />}
            {tabIndex === 6 && <CompanyUploadForm onSubmit={handleFormSubmit} />}
            {tabIndex === 7 && (<InquiriesList/> )}
            {tabIndex === 8 && <Agreements userType="company" />}
          </Container>
        </Box>
      </Box>

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

export default CompanyDashboard;