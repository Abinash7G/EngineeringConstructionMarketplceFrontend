// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { Box, Typography, IconButton, Snackbar, Alert } from "@mui/material";
// // // // // // import { FilterList } from "@mui/icons-material";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import ClientNavbar from "../components/ClientNavbar";  
// // // // // // import Products from "../components/CDProduct";
// // // // // // import CDCompany from "../components/CDCompany"; 
// // // // // // import Footer from "../pages/footer"; // Import the Footer component

// // // // // // import {
// // // // // //   fetchUserProfile,
// // // // // //   fetchCartItems,
// // // // // //   fetchWishlistItems,
// // // // // //   addToCart,
// // // // // //   addToWishlist,
// // // // // //   removeFromWishlist,
// // // // // // } from "../services/api"; // Removed refreshAccessToken since it's handled by interceptor
// // // // // // import CDBanner from "../components/CDBanner";

// // // // // // const ClientDashboard = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const [username, setUsername] = useState("Guest");
  
// // // // // //   const [wishlistItems, setWishlistItems] = useState([]);
// // // // // //   const [cartItems, setCartItems] = useState([]);
// // // // // //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

// // // // // //   useEffect(() => {
// // // // // //     const loadInitialData = async () => {
// // // // // //       try {
// // // // // //         // Check for authentication
// // // // // //         const token = localStorage.getItem("access_token");
// // // // // //         const refreshToken = localStorage.getItem("refresh_token"); // Get refresh token
// // // // // //         if (!token || !refreshToken) {
// // // // // //           navigate("/login");
// // // // // //           return;
// // // // // //         }

// // // // // //         // Load user data
// // // // // //         const userData = await fetchUserProfile();
// // // // // //         setUsername(userData.username);

// // // // // //         // Load cart and wishlist
// // // // // //         await loadCartAndWishlist();
// // // // // //       } catch (error) {
// // // // // //         console.error("Error loading initial data:", error);
// // // // // //         // The interceptor will handle 401/403 and refresh token or redirect to login
// // // // // //       }
// // // // // //     };

// // // // // //     loadInitialData();
    
// // // // // //   }, [navigate]);

// // // // // //   const loadCartAndWishlist = async () => {
// // // // // //     try {
// // // // // //       const [cartData, wishlistData] = await Promise.all([
// // // // // //         fetchCartItems(),
// // // // // //         fetchWishlistItems(),
// // // // // //       ]);
// // // // // //       setCartItems(cartData.data); // Update state with cart data
// // // // // //       setWishlistItems(wishlistData.data); // Update state with wishlist data
// // // // // //     } catch (error) {
// // // // // //       console.error("Error loading cart and wishlist:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleWishlistToggle = async (product) => {
// // // // // //     try {
// // // // // //       const isInWishlist = wishlistItems.some(item => item.id === product.id);
      
// // // // // //       if (isInWishlist) {
// // // // // //         await removeFromWishlist(product.id);
// // // // // //         setWishlistItems(prev => prev.filter(item => item.id !== product.id));
// // // // // //         showSnackbar("Removed from wishlist", "info");
// // // // // //       } else {
// // // // // //         await addToWishlist(product.id);
// // // // // //         setWishlistItems(prev => [...prev, product]);
// // // // // //         showSnackbar("Added to wishlist", "success");
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error updating wishlist:", error);
// // // // // //       showSnackbar("Failed to update wishlist", "error");
// // // // // //     }
// // // // // //   };

// // // // // //   const handleAddToCart = async (product) => {
// // // // // //     try {
// // // // // //       await addToCart(product.id);
// // // // // //       await loadCartAndWishlist(); // Reload cart data
// // // // // //       showSnackbar("Added to cart", "success");
// // // // // //     } catch (error) {
// // // // // //       console.error("Error adding to cart:", error);
// // // // // //       showSnackbar("Failed to add to cart", "error");
// // // // // //     }
// // // // // //   };

// // // // // //   const showSnackbar = (message, severity = "success") => {
// // // // // //     setSnackbar({ open: true, message, severity });
// // // // // //   };

// // // // // //   const handleCloseSnackbar = () => {
// // // // // //     setSnackbar(prev => ({ ...prev, open: false }));
// // // // // //   };

// // // // // //   return (
// // // // // //     <Box>
// // // // // //       <ClientNavbar
// // // // // //         username={username}
// // // // // //         wishlist={wishlistItems}
// // // // // //         cartItems={cartItems}
// // // // // //         onNavigateToProfile={() => navigate("/client/client-profile")}
// // // // // //       />
// // // // // //       <CDBanner/>
// // // // // //       <Box sx={{ padding: "20px", marginTop: "64px" }}>
// // // // // //         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // // // //           <Typography variant="h5">Construction Company</Typography>
// // // // // //           <IconButton color="primary">
// // // // // //             <FilterList />
// // // // // //           </IconButton>
// // // // // //         </Box>
// // // // // //         <CDCompany />
// // // // // //       </Box>
// // // // // //       <Products
// // // // // //         handleWishlistToggle={handleWishlistToggle}
// // // // // //         handleAddToCart={handleAddToCart}
// // // // // //         wishlistItems={wishlistItems}
// // // // // //       />
// // // // // //       <Snackbar
// // // // // //         open={snackbar.open}
// // // // // //         autoHideDuration={3000}
// // // // // //         onClose={handleCloseSnackbar}
// // // // // //         anchorOrigin={{ vertical: "top", horizontal: "right" }}
// // // // // //       >
// // // // // //         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
// // // // // //           {snackbar.message}
// // // // // //         </Alert>
// // // // // //       </Snackbar>
// // // // // //       <Footer />

// // // // // //     </Box>
    
// // // // // //   );
// // // // // // };

// // // // // //export default ClientDashboard;

// // // // // import React, { useEffect, useState } from "react";
// // // // // import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import ClientNavbar from "../components/ClientNavbar";  
// // // // // import Products from "../components/CDProduct";
// // // // // import CDCompany from "../components/CDCompany"; 
// // // // // import Footer from "../pages/footer"; // Import the Footer component
// // // // // import {
// // // // //   fetchUserProfile,
// // // // //   fetchCartItems,
// // // // //   fetchWishlistItems,
// // // // //   addToCart,
// // // // //   addToWishlist,
// // // // //   removeFromWishlist,
// // // // // } from "../services/api";
// // // // // import CDBanner from "../components/CDBanner";

// // // // // const ClientDashboard = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const [username, setUsername] = useState("Guest");
// // // // //   const [wishlistItems, setWishlistItems] = useState([]);
// // // // //   const [cartItems, setCartItems] = useState([]);
// // // // //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

// // // // //   useEffect(() => {
// // // // //     const loadInitialData = async () => {
// // // // //       try {
// // // // //         // Check for authentication
// // // // //         const token = localStorage.getItem("access_token");
// // // // //         const refreshToken = localStorage.getItem("refresh_token");
// // // // //         if (!token || !refreshToken) {
// // // // //           navigate("/login");
// // // // //           return;
// // // // //         }

// // // // //         // Load user data
// // // // //         const userData = await fetchUserProfile();
// // // // //         setUsername(userData.username);

// // // // //         // Load cart and wishlist
// // // // //         await loadCartAndWishlist();
// // // // //       } catch (error) {
// // // // //         console.error("Error loading initial data:", error);
// // // // //       }
// // // // //     };

// // // // //     loadInitialData();
// // // // //   }, [navigate]);

// // // // //   const loadCartAndWishlist = async () => {
// // // // //     try {
// // // // //       const [cartData, wishlistData] = await Promise.all([
// // // // //         fetchCartItems(),
// // // // //         fetchWishlistItems(),
// // // // //       ]);
// // // // //       setCartItems(cartData.data);
// // // // //       setWishlistItems(wishlistData.data);
// // // // //     } catch (error) {
// // // // //       console.error("Error loading cart and wishlist:", error);
// // // // //     }
// // // // //   };

// // // // //   const handleWishlistToggle = async (product) => {
// // // // //     try {
// // // // //       const isInWishlist = wishlistItems.some(item => item.id === product.id);
// // // // //       if (isInWishlist) {
// // // // //         await removeFromWishlist(product.id);
// // // // //         setWishlistItems(prev => prev.filter(item => item.id !== product.id));
// // // // //         showSnackbar("Removed from wishlist", "info");
// // // // //       } else {
// // // // //         await addToWishlist(product.id);
// // // // //         setWishlistItems(prev => [...prev, product]);
// // // // //         showSnackbar("Added to wishlist", "success");
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error updating wishlist:", error);
// // // // //       showSnackbar("Failed to update wishlist", "error");
// // // // //     }
// // // // //   };

// // // // //   const handleAddToCart = async (product) => {
// // // // //     try {
// // // // //       await addToCart(product.id);
// // // // //       await loadCartAndWishlist();
// // // // //       showSnackbar("Added to cart", "success");
// // // // //     } catch (error) {
// // // // //       console.error("Error adding to cart:", error);
// // // // //       showSnackbar("Failed to add to cart", "error");
// // // // //     }
// // // // //   };

// // // // //   const showSnackbar = (message, severity = "success") => {
// // // // //     setSnackbar({ open: true, message, severity });
// // // // //   };

// // // // //   const handleCloseSnackbar = () => {
// // // // //     setSnackbar(prev => ({ ...prev, open: false }));
// // // // //   };

// // // // //   return (
// // // // //     <Box>
// // // // //       <ClientNavbar
// // // // //         username={username}
// // // // //         wishlist={wishlistItems}
// // // // //         cartItems={cartItems}
// // // // //         onNavigateToProfile={() => navigate("/client/client-profile")}
// // // // //       />
// // // // //       <CDBanner />
// // // // //       <Box sx={{ padding: "20px", marginTop: "64px" }}>
// // // // //         {/* Construction Company Section */}
// // // // //         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
// // // // //           <Typography variant="h5" fontWeight="bold">Construction Company</Typography>
// // // // //           <Button color="primary" onClick={() => navigate("/all-companies")}>View All</Button>
// // // // //         </Box>
// // // // //         <CDCompany />

// // // // //         {/* Featured Products Section */}
// // // // //         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4, mb: 2 }}>
// // // // //           <Typography variant="h5" fontWeight="bold">Featured Products</Typography>
// // // // //           <Button color="primary" onClick={() => navigate("/all-products")}>View All</Button>
// // // // //         </Box>
// // // // //         <Products
// // // // //           handleWishlistToggle={handleWishlistToggle}
// // // // //           handleAddToCart={handleAddToCart}
// // // // //           wishlistItems={wishlistItems}
// // // // //           isFeatured
// // // // //         />
// // // // //       </Box>
// // // // //       <Snackbar
// // // // //         open={snackbar.open}
// // // // //         autoHideDuration={3000}
// // // // //         onClose={handleCloseSnackbar}
// // // // //         anchorOrigin={{ vertical: "top", horizontal: "right" }}
// // // // //       >
// // // // //         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
// // // // //           {snackbar.message}
// // // // //         </Alert>
// // // // //       </Snackbar>
// // // // //       <Footer />
// // // // //     </Box>
// // // // //   );
// // // // // };

// // // // // export default ClientDashboard;

// // // // import React, { useEffect, useState } from "react";
// // // // import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
// // // // import { useNavigate } from "react-router-dom";
// // // // import ClientNavbar from "../components/ClientNavbar";  
// // // // import Products from "../components/CDProduct";
// // // // import CDCompany from "../components/CDCompany"; 
// // // // import Footer from "../pages/footer";
// // // // import {
// // // //   fetchUserProfile,
// // // //   fetchCartItems,
// // // //   fetchWishlistItems,
// // // //   addToCart,
// // // //   addToWishlist,
// // // //   removeFromWishlist,
// // // // } from "../services/api";
// // // // import CDBanner from "../components/CDBanner";

// // // // const ClientDashboard = () => {
// // // //   const navigate = useNavigate();
// // // //   const [username, setUsername] = useState("Guest");
// // // //   const [wishlistItems, setWishlistItems] = useState([]);
// // // //   const [cartItems, setCartItems] = useState([]);
// // // //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

// // // //   useEffect(() => {
// // // //     const loadInitialData = async () => {
// // // //       try {
// // // //         const token = localStorage.getItem("access_token");
// // // //         const refreshToken = localStorage.getItem("refresh_token");
// // // //         if (!token || !refreshToken) {
// // // //           navigate("/login");
// // // //           return;
// // // //         }

// // // //         const userData = await fetchUserProfile();
// // // //         setUsername(userData.username);

// // // //         await loadCartAndWishlist();
// // // //       } catch (error) {
// // // //         console.error("Error loading initial data:", error);
// // // //       }
// // // //     };

// // // //     loadInitialData();
// // // //   }, [navigate]);

// // // //   const loadCartAndWishlist = async () => {
// // // //     try {
// // // //       const [cartData, wishlistData] = await Promise.all([
// // // //         fetchCartItems(),
// // // //         fetchWishlistItems(),
// // // //       ]);
// // // //       setCartItems(cartData.data);
// // // //       setWishlistItems(wishlistData.data);
// // // //     } catch (error) {
// // // //       console.error("Error loading cart and wishlist:", error);
// // // //     }
// // // //   };

// // // //   const handleWishlistToggle = async (product) => {
// // // //     try {
// // // //       const isInWishlist = wishlistItems.some(item => item.id === product.id);
// // // //       if (isInWishlist) {
// // // //         await removeFromWishlist(product.id);
// // // //         setWishlistItems(prev => prev.filter(item => item.id !== product.id));
// // // //         showSnackbar("Removed from wishlist", "info");
// // // //       } else {
// // // //         await addToWishlist(product.id);
// // // //         setWishlistItems(prev => [...prev, product]);
// // // //         showSnackbar("Added to wishlist", "success");
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error updating wishlist:", error);
// // // //       showSnackbar("Failed to update wishlist", "error");
// // // //     }
// // // //   };

// // // //   const handleAddToCart = async (product) => {
// // // //     try {
// // // //       await addToCart(product.id);
// // // //       await loadCartAndWishlist();
// // // //       showSnackbar("Added to cart", "success");
// // // //     } catch (error) {
// // // //       console.error("Error adding to cart:", error);
// // // //       showSnackbar("Failed to add to cart", "error");
// // // //     }
// // // //   };

// // // //   const showSnackbar = (message, severity = "success") => {
// // // //     setSnackbar({ open: true, message, severity });
// // // //   };

// // // //   const handleCloseSnackbar = () => {
// // // //     setSnackbar(prev => ({ ...prev, open: false }));
// // // //   };

// // // //   return (
// // // //     <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
// // // //       <ClientNavbar
// // // //         username={username}
// // // //         wishlist={wishlistItems}
// // // //         cartItems={cartItems}
// // // //         onNavigateToProfile={() => navigate("/client/client-profile")}
// // // //       />
// // // //       <CDBanner />
// // // //       <Box sx={{ maxWidth: "1400px", mx: "auto", px: 3, py: 4 }}>
// // // //         <Box sx={{ mb: 5, animation: "fadeIn 1s ease-in" }}>
// // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
// // // //             <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
// // // //               Construction Companies
// // // //             </Typography>
// // // //             <Button
// // // //               variant="contained"
// // // //               color="primary"
// // // //               onClick={() => navigate("/all-companies")}
// // // //               sx={{ borderRadius: 20, textTransform: "none", px: 4 }}
// // // //             >
// // // //               View All
// // // //             </Button>
// // // //           </Box>
// // // //           <CDCompany />
// // // //         </Box>
// // // //         <Box sx={{ mb: 5, animation: "fadeIn 1s ease-in 0.3s" }}>
// // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
// // // //             <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
// // // //               Featured Products
// // // //             </Typography>
// // // //             <Button
// // // //               variant="contained"
// // // //               color="primary"
// // // //               onClick={() => navigate("/all-products")}
// // // //               sx={{ borderRadius: 20, textTransform: "none", px: 4 }}
// // // //             >
// // // //               View All
// // // //             </Button>
// // // //           </Box>
// // // //           <Products
// // // //             handleWishlistToggle={handleWishlistToggle}
// // // //             handleAddToCart={handleAddToCart}
// // // //             wishlistItems={wishlistItems}
// // // //             isFeatured
// // // //           />
// // // //         </Box>
// // // //       </Box>
// // // //       <Snackbar
// // // //         open={snackbar.open}
// // // //         autoHideDuration={3000}
// // // //         onClose={handleCloseSnackbar}
// // // //         anchorOrigin={{ vertical: "top", horizontal: "right" }}
// // // //       >
// // // //         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ borderRadius: 2 }}>
// // // //           {snackbar.message}
// // // //         </Alert>
// // // //       </Snackbar>
// // // //       <Footer />
// // // //       <style jsx global>{`
// // // //         @keyframes fadeIn {
// // // //           from { opacity: 0; transform: translateY(20px); }
// // // //           to { opacity: 1; transform: translateY(0); }
// // // //         }
// // // //       `}</style>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default ClientDashboard;
// // // import React, { useEffect, useState } from "react";
// // // import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
// // // import { useNavigate } from "react-router-dom";
// // // import ClientNavbar from "../components/ClientNavbar";  
// // // import Products from "../components/CDProduct";
// // // import CDCompany from "../components/CDCompany"; 
// // // import Footer from "../pages/footer";
// // // import {
// // //   fetchUserProfile,
// // //   fetchCartItems,
// // //   fetchWishlistItems,
// // //   addToCart,
// // //   addToWishlist,
// // //   removeFromWishlist,
// // // } from "../services/api";
// // // import CDBanner from "../components/CDBanner";

// // // const ClientDashboard = () => {
// // //   const navigate = useNavigate();
// // //   const [username, setUsername] = useState("Guest");
// // //   const [wishlistItems, setWishlistItems] = useState([]);
// // //   const [cartItems, setCartItems] = useState([]);
// // //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

// // //   useEffect(() => {
// // //     const loadInitialData = async () => {
// // //       try {
// // //         const token = localStorage.getItem("access_token");
// // //         const refreshToken = localStorage.getItem("refresh_token");
// // //         if (!token || !refreshToken) {
// // //           navigate("/login");
// // //           return;
// // //         }

// // //         const userData = await fetchUserProfile();
// // //         setUsername(userData.username);

// // //         await loadCartAndWishlist();
// // //       } catch (error) {
// // //         console.error("Error loading initial data:", error);
// // //       }
// // //     };

// // //     loadInitialData();
// // //   }, [navigate]);

// // //   const loadCartAndWishlist = async () => {
// // //     try {
// // //       const [cartData, wishlistData] = await Promise.all([
// // //         fetchCartItems(),
// // //         fetchWishlistItems(),
// // //       ]);
// // //       setCartItems(cartData.data || []); // Ensure cartItems is always an array
// // //       setWishlistItems(wishlistData.data || []); // Ensure wishlistItems is always an array
// // //     } catch (error) {
// // //       console.error("Error loading cart and wishlist:", error);
// // //       setCartItems([]); // Reset to empty array on error
// // //       setWishlistItems([]); // Reset to empty array on error
// // //     }
// // //   };

// // //   const handleWishlistToggle = async (product) => {
// // //     try {
// // //       const isInWishlist = wishlistItems.some(item => item.id === product.id);
// // //       if (isInWishlist) {
// // //         await removeFromWishlist(product.id);
// // //         setWishlistItems(prev => prev.filter(item => item.id !== product.id));
// // //         showSnackbar("Removed from wishlist", "info");
// // //       } else {
// // //         await addToWishlist(product.id);
// // //         setWishlistItems(prev => [...prev, { ...product }]);
// // //         showSnackbar("Added to wishlist", "success");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error updating wishlist:", error);
// // //       showSnackbar("Failed to update wishlist", "error");
// // //     }
// // //   };

// // //   const handleAddToCart = async (product) => {
// // //     try {
// // //       await addToCart(product.id, product.quantity || 1);
// // //       await loadCartAndWishlist(); // Reload cart and wishlist to ensure state is updated
// // //       showSnackbar("Added to cart", "success");
// // //     } catch (error) {
// // //       console.error("Error adding to cart:", error);
// // //       showSnackbar("Failed to add to cart", "error");
// // //     }
// // //   };

// // //   const showSnackbar = (message, severity = "success") => {
// // //     setSnackbar({ open: true, message, severity });
// // //   };

// // //   const handleCloseSnackbar = () => {
// // //     setSnackbar(prev => ({ ...prev, open: false }));
// // //   };

// // //   return (
// // //     <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
// // //       <ClientNavbar
// // //         username={username}
// // //         wishlist={wishlistItems}
// // //         cartItems={cartItems}
// // //         onNavigateToProfile={() => navigate("/client/client-profile")}
// // //       />
// // //       <CDBanner />
// // //       <Box sx={{ maxWidth: "1400px", mx: "auto", px: 3, py: 4 }}>
// // //         <Box sx={{ mb: 5, animation: "fadeIn 1s ease-in" }}>
// // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
// // //             <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
// // //               Construction Companies
// // //             </Typography>
// // //             <Button
// // //               variant="contained"
// // //               color="primary"
// // //               onClick={() => navigate("/all-companies")}
// // //               sx={{ borderRadius: 20, textTransform: "none", px: 4 }}
// // //             >
// // //               View All
// // //             </Button>
// // //           </Box>
// // //           <CDCompany />
// // //         </Box>
// // //         <Box sx={{ mb: 5, animation: "fadeIn 1s ease-in 0.3s" }}>
// // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
// // //             <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
// // //               Featured Products
// // //             </Typography>
// // //             <Button
// // //               variant="contained"
// // //               color="primary"
// // //               onClick={() => navigate("/all-products")}
// // //               sx={{ borderRadius: 20, textTransform: "none", px: 4 }}
// // //             >
// // //               View All
// // //             </Button>
// // //           </Box>
// // //           <Products
// // //             handleWishlistToggle={handleWishlistToggle}
// // //             handleAddToCart={handleAddToCart}
// // //             wishlistItems={wishlistItems}
// // //             isFeatured
// // //           />
// // //         </Box>
// // //       </Box>
// // //       <Snackbar
// // //         open={snackbar.open}
// // //         autoHideDuration={3000}
// // //         onClose={handleCloseSnackbar}
// // //         anchorOrigin={{ vertical: "top", horizontal: "right" }}
// // //       >
// // //         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ borderRadius: 2 }}>
// // //           {snackbar.message}
// // //         </Alert>
// // //       </Snackbar>
// // //       <Footer />
// // //       <style jsx global>{`
// // //         @keyframes fadeIn {
// // //           from { opacity: 0; transform: translateY(20px); }
// // //           to { opacity: 1; transform: translateY(0); }
// // //         }
// // //       `}</style>
// // //     </Box>
// // //   );
// // // };

// // // export default ClientDashboard;
// // import React, { useEffect, useState } from "react";
// // import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
// // import { useNavigate } from "react-router-dom";
// // import ClientNavbar from "../components/ClientNavbar";  
// // import Products from "../components/CDProduct";
// // import CDCompany from "../components/CDCompany"; 
// // import Footer from "../pages/footer";
// // import {
// //   fetchUserProfile,
// //   fetchCartItems,
// //   fetchWishlistItems,
// //   addToCart,
// //   addToWishlist,
// //   removeFromWishlist,
// // } from "../services/api";
// // import CDBanner from "../components/CDBanner";

// // const ClientDashboard = () => {
// //   const navigate = useNavigate();
// //   const [username, setUsername] = useState("Guest");
// //   const [wishlistItems, setWishlistItems] = useState([]);
// //   const [cartItems, setCartItems] = useState([]);
// //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

// //   useEffect(() => {
// //     const loadInitialData = async () => {
// //       try {
// //         const token = localStorage.getItem("access_token");
// //         const refreshToken = localStorage.getItem("refresh_token");
// //         if (!token || !refreshToken) {
// //           navigate("/login");
// //           return;
// //         }

// //         const userData = await fetchUserProfile();
// //         setUsername(userData.username);

// //         await loadCartAndWishlist();
// //       } catch (error) {
// //         console.error("Error loading initial data:", error);
// //       }
// //     };

// //     loadInitialData();
// //   }, [navigate]);

// //   const loadCartAndWishlist = async () => {
// //     try {
// //       const [cartData, wishlistData] = await Promise.all([
// //         fetchCartItems(),
// //         fetchWishlistItems(),
// //       ]);
// //       setCartItems(cartData.data || []); // Ensure cartItems is always an array
// //       setWishlistItems(wishlistData.data || []); // Ensure wishlistItems is always an array
// //     } catch (error) {
// //       console.error("Error loading cart and wishlist:", error);
// //       setCartItems([]); // Reset to empty array on error
// //       setWishlistItems([]); // Reset to empty array on error
// //     }
// //   };

// //   const handleWishlistToggle = async (product) => {
// //     try {
// //       const isInWishlist = wishlistItems.some(item => item.id === product.id);
// //       if (isInWishlist) {
// //         await removeFromWishlist(product.id);
// //         setWishlistItems(prev => prev.filter(item => item.id !== product.id));
// //         showSnackbar("Removed from wishlist", "info");
// //       } else {
// //         await addToWishlist(product.id);
// //         setWishlistItems(prev => [...prev, { ...product }]);
// //         showSnackbar("Added to wishlist", "success");
// //       }
// //     } catch (error) {
// //       console.error("Error updating wishlist:", error);
// //       showSnackbar("Failed to update wishlist", "error");
// //     }
// //   };

// //   const handleAddToCart = async (product) => {
// //     try {
// //       await addToCart(product.id, product.quantity || 1);
// //       await loadCartAndWishlist(); // Reload cart and wishlist to ensure state is updated
// //       showSnackbar("Added to cart", "success");
// //     } catch (error) {
// //       console.error("Error adding to cart:", error);
// //       showSnackbar("Failed to add to cart", "error");
// //     }
// //   };

// //   const showSnackbar = (message, severity = "success") => {
// //     setSnackbar({ open: true, message, severity });
// //   };

// //   const handleCloseSnackbar = () => {
// //     setSnackbar(prev => ({ ...prev, open: false }));
// //   };

// //   return (
// //     <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
// //       <ClientNavbar
// //         username={username}
// //         wishlist={wishlistItems}
// //         cartItems={cartItems}
// //         onNavigateToProfile={() => navigate("/client/client-profile")}
// //       />
// //       <CDBanner />
// //       <Box sx={{ maxWidth: "1400px", mx: "auto", px: 3, py: 4 }}>
// //         <Box sx={{ mb: 5, animation: "fadeIn 1s ease-in" }}>
// //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
// //             <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
// //               Construction Companies
// //             </Typography>
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               onClick={() => navigate("/all-companies")}
// //               sx={{ borderRadius: 20, textTransform: "none", px: 4 }}
// //             >
// //               View All
// //             </Button>
// //           </Box>
// //           <CDCompany />
// //         </Box>
// //         <Box sx={{ mb: 5, animation: "fadeIn 1s ease-in 0.3s" }}>
// //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
// //             <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
// //               Featured Products
// //             </Typography>
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               onClick={() => navigate("/all-products")}
// //               sx={{ borderRadius: 20, textTransform: "none", px: 4 }}
// //             >
// //               View All
// //             </Button>
// //           </Box>
// //           <Products
// //             handleWishlistToggle={handleWishlistToggle}
// //             handleAddToCart={handleAddToCart}
// //             wishlistItems={wishlistItems}
// //             isFeatured
// //           />
// //         </Box>
// //       </Box>
// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={3000}
// //         onClose={handleCloseSnackbar}
// //         anchorOrigin={{ vertical: "top", horizontal: "right" }}
// //       >
// //         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ borderRadius: 2 }}>
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //       <Footer />
// //       <style jsx global>{`
// //         @keyframes fadeIn {
// //           from { opacity: 0; transform: translateY(20px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //       `}</style>
// //     </Box>
// //   );
// // };

// // export default ClientDashboard;
// //33
// import React from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Products from "../components/CDProduct";
// import CDCompany from "../components/CDCompany";
// import CDBanner from "../components/CDBanner";
// import Footer from "../pages/footer.js";


// const ClientDashboard = ({ handleWishlistToggle, handleAddToCart, wishlistItems }) => {
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ maxWidth: "1400px", mx: "auto", px: 3, py: 4 }}>
//       <Box sx={{ mb: 5, animation: "fadeIn 1s ease-in" }}>
//         <CDBanner />
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 3 }}>
//           <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
//             Construction Companies
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/all-companies")}
//             sx={{ borderRadius: 20, textTransform: "none", px: 4 }}
//           >
//             View All
//           </Button>
//         </Box>
//         <CDCompany />
//       </Box>
//       <Box sx={{ mb: 5, animation: "fadeIn 1s ease-in 0.3s" }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//           <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
//             Featured Products
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/all-products")}
//             sx={{ borderRadius: 20, textTransform: "none", px: 4 }}
//           >
//             View All
//           </Button>
//         </Box>
//         <Products
//           handleWishlistToggle={handleWishlistToggle}
//           handleAddToCart={handleAddToCart}
//           wishlistItems={wishlistItems}
//           isFeatured
//         />
//       </Box>
//       <style jsx global>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
    
//     </Box>
//   );
// };

// export default ClientDashboard;
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Products from "../components/CDProduct";
import CDCompany from "../components/CDCompany";
import CDBanner from "../components/CDBanner";


const ClientDashboard = ({ handleWishlistToggle, handleAddToCart, wishlistItems }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: "1400px", mx: "auto", px: 3, py: 4 }}>
      <Box sx={{ mb: 5, animation: "fadeIn 1s ease-in" }}>
        <CDBanner />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
            Construction Companies
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/all-companies")}
            sx={{ borderRadius: 20, textTransform: "none", px: 4 }}
          >
            View All
          </Button>
        </Box>
        <CDCompany />
      </Box>
      <Box sx={{ mb: 5, animation: "fadeIn 1s ease-in 0.3s" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
            Featured Material and Instruments
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/all-products")}
            sx={{ borderRadius: 20, textTransform: "none", px: 4 }}
          >
            View All
          </Button>
        </Box>
        <Products
          handleWishlistToggle={handleWishlistToggle}
          handleAddToCart={handleAddToCart}
          wishlistItems={wishlistItems}
          isFeatured
        />
      </Box>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    
    </Box>
    
    


  );
};

export default ClientDashboard;