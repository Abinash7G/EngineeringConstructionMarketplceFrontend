// // //11
// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Grid,
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   IconButton,
// //   Select,
// //   MenuItem,
// //   Tabs,
// //   Tab,
// //   Snackbar,
// //   Alert,
// //   Button,
// //   Modal,
// //   TextField,
// // } from "@mui/material";
// // import { ShoppingCart, Favorite } from "@mui/icons-material";
// // import { useNavigate } from "react-router-dom";
// // import API from "../services/api";

// // const CDProduct = ({ handleWishlistToggle, handleAddToCart, wishlistItems = [] }) => {
// //   const [products, setProducts] = useState([]);
// //   const [sortOption, setSortOption] = useState("");
// //   const [tabValue, setTabValue] = useState("all");
// //   const [verificationStatus, setVerificationStatus] = useState(null);
// //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await API.get("/api/products/");
// //         setProducts(response.data);
// //       } catch (error) {
// //         console.error("Error fetching products:", error);
// //       }
// //     };

// //     const fetchVerificationStatus = async () => {
// //       try {
// //         const response = await API.get("/api/rent-verification/user/");
// //         setVerificationStatus(response.data.status);
// //       } catch (error) {
// //         if (error.response && error.response.status === 404) {
// //           setVerificationStatus("not_found");
// //         } else {
// //           console.error("Error fetching verification status:", error);
// //         }
// //       }
// //     };

// //     fetchProducts();
// //     fetchVerificationStatus();
// //   }, []);

// //   const categoryLabels = {
// //     renting: "Rent",
// //     selling: "Buy",
// //   };

// //   const handleSortChange = (event) => {
// //     const option = event.target.value;
// //     setSortOption(option);

// //     let sortedProducts = [...products];
// //     if (option === "priceLowToHigh") {
// //       sortedProducts.sort((a, b) => a.price - b.price);
// //     } else if (option === "priceHighToLow") {
// //       sortedProducts.sort((a, b) => b.price - b.price);
// //     }
// //     setProducts(sortedProducts);
// //   };

// //   const handleTabChange = (event, newValue) => {
// //     setTabValue(newValue);
// //   };

// //   const filteredProducts = products.filter((product) => {
// //     if (tabValue === "all") return true;
// //     return product.category === tabValue;
// //   });

// //   const isInWishlist = (productId) => {
// //     return wishlistItems.some((item) => item.id === productId);
// //   };

// //   const handleAddToCartWithVerification = (product) => {
// //     if (product.category === "renting" && verificationStatus !== "verified") {
// //       setSnackbarOpen(true);
// //       navigate("/upload-kyc");
// //       return;
// //     }
// //     handleAddToCart({ ...product, quantity });
// //     setModalOpen(false);
// //   };

// //   const handleBuyOrRentNow = (product) => {
// //     if (product.category === "renting" && verificationStatus !== "verified") {
// //       setSnackbarOpen(true);
// //       navigate("/upload-kyc");
// //       return;
// //     }
// //     const buyingItems = product.category === "selling"
// //       ? [{ product_id: product.id, ...product, quantity }]
// //       : [];
// //     const rentingItems = product.category === "renting"
// //       ? [{ product_id: product.id, ...product, quantity }]
// //       : [];
// //     const cartTotal = product.category === "selling"
// //       ? parseFloat(product.price) * quantity
// //       : 0;

// //     navigate("/checkout", { state: { buyingItems, rentingItems, cartTotal } });
// //   };

// //   const handleSnackbarClose = () => {
// //     setSnackbarOpen(false);
// //   };

// //   const handleCardClick = (product) => {
// //     setSelectedProduct(product);
// //     setQuantity(1);
// //     setModalOpen(true);
// //   };

// //   const handleModalClose = () => {
// //     setModalOpen(false);
// //     setSelectedProduct(null);
// //   };

// //   const handleQuantityChange = (event) => {
// //     const value = Math.max(1, Number(event.target.value));
// //     setQuantity(value);
// //   };

// //   const calculateDiscountedPrice = (price, discountPercentage) => {
// //     const originalPrice = parseFloat(price);
// //     const discount = parseFloat(discountPercentage);
// //     return (originalPrice - (originalPrice * (discount / 100))).toFixed(2);
// //   };

// //   return (
// //     <Box sx={{ padding: "40px" }}>
// //       <Box
// //         sx={{
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           marginBottom: "30px",
// //         }}
// //       >
// //         <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
// //           Products
// //         </Typography>
// //         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// //           <Tabs value={tabValue} onChange={handleTabChange}>
// //             <Tab label="All" value="all" />
// //             <Tab label="Rent" value="renting" />
// //             <Tab label="Buy" value="selling" />
// //           </Tabs>
// //           <Select
// //             value={sortOption}
// //             onChange={handleSortChange}
// //             displayEmpty
// //             sx={{ minWidth: "150px", backgroundColor: "background.paper" }}
// //           >
// //             <MenuItem value="">Sort by</MenuItem>
// //             <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
// //             <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
// //           </Select>
// //         </Box>
// //       </Box>

// //       <Grid container spacing={4}>
// //         {filteredProducts.map((product) => (
// //           <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
// //             <Card
// //               onClick={() => handleCardClick(product)}
// //               sx={{
// //                 height: "100%",
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 position: "relative",
// //                 borderRadius: "12px",
// //                 boxShadow: 3,
// //                 transition: "transform 0.3s, box-shadow 0.3s",
// //                 "&:hover": {
// //                   transform: "scale(1.05)",
// //                   boxShadow: 6,
// //                 },
// //                 cursor: "pointer",
// //               }}
// //             >
// //               <Box
// //                 sx={{
// //                   position: "absolute",
// //                   top: 0,
// //                   left: 0,
// //                   backgroundColor: product.category === "renting" ? "error.main" : "primary.main",
// //                   color: "white",
// //                   padding: "6px 12px",
// //                   fontSize: "14px",
// //                   fontWeight: "bold",
// //                   borderRadius: "0 0 12px 0",
// //                 }}
// //               >
// //                 {categoryLabels[product.category] || "Unknown"}
// //               </Box>

// //               <Box
// //                 sx={{
// //                   position: "absolute",
// //                   top: "10px",
// //                   right: "10px",
// //                   zIndex: 1,
// //                   display: "flex",
// //                   gap: "8px",
// //                 }}
// //               >
// //                 <IconButton
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     handleWishlistToggle(product);
// //                   }}
// //                   sx={{
// //                     backgroundColor: "white",
// //                     "&:hover": { backgroundColor: "grey.100" },
// //                   }}
// //                 >
// //                   <Favorite color={isInWishlist(product.id) ? "error" : "action"} />
// //                 </IconButton>
// //                 <IconButton
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     handleAddToCartWithVerification(product);
// //                   }}
// //                   sx={{
// //                     backgroundColor: "white",
// //                     "&:hover": { backgroundColor: "grey.100" },
// //                   }}
// //                 >
// //                   <ShoppingCart color="primary" />
// //                 </IconButton>
// //               </Box>

// //               <CardMedia
// //                 component="img"
// //                 height="200"
// //                 image={
// //                   product.image
// //                     ? `http://127.0.0.1:8000${product.image}`
// //                     : "https://via.placeholder.com/200"
// //                 }
// //                 alt={product.title}
// //                 sx={{ objectFit: "contain", borderBottom: "1px solid grey.300" }}
// //               />

// //               <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
// //                 <Typography variant="h6" component="div" sx={{ color: "primary", fontWeight: "bold", mb: 1 }}>
// //                   {product.title}
// //                 </Typography>
// //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
// //                   {product.discount_percentage && parseFloat(product.discount_percentage) > 0 ? (
// //                     <>
// //                       <Typography variant="h6" color="text.secondary" sx={{ textDecoration: "line-through" }}>
// //                         Rs. {product.price}
// //                       </Typography>
// //                       <Typography variant="h6" color="primary">
// //                         Rs. {calculateDiscountedPrice(product.price, product.discount_percentage)}
// //                       </Typography>
// //                     </>
// //                   ) : (
// //                     <Typography variant="h6" color="primary">
// //                       Rs. {product.price}
// //                     </Typography>
// //                   )}
// //                 </Box>
// //                 {product.discount_percentage && parseFloat(product.discount_percentage) > 0 && (
// //                   <Box
// //                     sx={{
// //                       display: "inline-block",
// //                       backgroundColor: "error.main",
// //                       color: "white",
// //                       padding: "4px 8px",
// //                       borderRadius: "12px",
// //                       fontSize: "12px",
// //                       fontWeight: "bold",
// //                       mb: 1,
// //                     }}
// //                   >
// //                     {product.discount_percentage}% OFF
// //                   </Box>
// //                 )}
// //                 {product.category === "renting" && (
// //                   <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
// //                     Per Day Rent: Rs. {product.per_day_rent}
// //                   </Typography>
// //                 )}
// //                 <Typography variant="body2" color="text.secondary">
// //                   Company: {product.company_name || "N/A"}
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       <Modal
// //         open={modalOpen}
// //         onClose={handleModalClose}
// //         aria-labelledby="product-modal-title"
// //         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
// //       >
// //         <Box
// //           sx={{
// //             backgroundColor: "white",
// //             borderRadius: "12px",
// //             boxShadow: 24,
// //             padding: "24px",
// //             width: { xs: "90%", sm: "70%", md: "50%" },
// //             maxHeight: "90vh",
// //             overflowY: "auto",
// //           }}
// //         >
// //           {selectedProduct && (
// //             <>
// //               <Typography id="product-modal-title" variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
// //                 {selectedProduct.title}
// //               </Typography>
// //               <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
// //                 <Box sx={{ flex: 1 }}>
// //                   <img
// //                     src={
// //                       selectedProduct.image
// //                         ? `http://127.0.0.1:8000${selectedProduct.image}`
// //                         : "https://via.placeholder.com/300"
// //                     }
// //                     alt={selectedProduct.title}
// //                     style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain" }}
// //                   />
// //                 </Box>
// //                 <Box sx={{ flex: 1 }}>
// //                   <Typography variant="body1" sx={{ mb: 2 }}>
// //                     {selectedProduct.description || "No description available."}
// //                   </Typography>
// //                   <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
// //                     {selectedProduct.discount_percentage && parseFloat(selectedProduct.discount_percentage) > 0 ? (
// //                       <>
// //                         <Typography variant="h6" color="text.secondary" sx={{ textDecoration: "line-through" }}>
// //                           Rs. {selectedProduct.price}
// //                         </Typography>
// //                         <Typography variant="h6" color="primary">
// //                           Rs. {calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount_percentage)}
// //                         </Typography>
// //                       </>
// //                     ) : (
// //                       <Typography variant="h6" color="primary">
// //                         Rs. {selectedProduct.price}
// //                       </Typography>
// //                     )}
// //                   </Box>
// //                   {selectedProduct.discount_percentage && parseFloat(selectedProduct.discount_percentage) > 0 && (
// //                     <Box
// //                       sx={{
// //                         display: "inline-block",
// //                         backgroundColor: "error.main",
// //                         color: "white",
// //                         padding: "4px 8px",
// //                         borderRadius: "12px",
// //                         fontSize: "12px",
// //                         fontWeight: "bold",
// //                         mb: 1,
// //                       }}
// //                     >
// //                       {selectedProduct.discount_percentage}% OFF
// //                     </Box>
// //                   )}
// //                   {selectedProduct.category === "renting" && (
// //                     <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
// //                       Per Day Rent: Rs. {selectedProduct.per_day_rent}
// //                     </Typography>
// //                   )}
// //                   <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
// //                     Company: {selectedProduct.company_name || "N/A"}
// //                   </Typography>
// //                   <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
// //                     <Typography variant="body1">Quantity:</Typography>
// //                     <TextField
// //                       type="number"
// //                       value={quantity}
// //                       onChange={handleQuantityChange}
// //                       inputProps={{ min: 1 }}
// //                       sx={{ width: "80px" }}
// //                     />
// //                   </Box>
// //                   <Box sx={{ display: "flex", gap: 2 }}>
// //                     <Button
// //                       variant="contained"
// //                       color="primary"
// //                       onClick={() => handleBuyOrRentNow(selectedProduct)}
// //                       sx={{ flex: 1 }}
// //                     >
// //                       {selectedProduct.category === "renting" ? "Rent Now" : "Buy Now"}
// //                     </Button>
// //                     <Button
// //                       variant="outlined"
// //                       color="primary"
// //                       onClick={() => handleAddToCartWithVerification(selectedProduct)}
// //                       startIcon={<ShoppingCart />}
// //                       sx={{ flex: 1 }}
// //                     >
// //                       Add to Cart
// //                     </Button>
// //                   </Box>
// //                 </Box>
// //               </Box>
// //             </>
// //           )}
// //         </Box>
// //       </Modal>

// //       <Snackbar
// //         open={snackbarOpen}
// //         onClose={handleSnackbarClose}
// //         anchorOrigin={{ vertical: "top", horizontal: "center" }}
// //         sx={{
// //           "& .MuiSnackbarContent-root": {
// //             backgroundColor: "#007bff",
// //             color: "white",
// //             borderRadius: "8px",
// //             padding: "10px 20px",
// //           },
// //         }}
// //       >
// //         <Alert
// //           onClose={handleSnackbarClose}
// //           severity="warning"
// //           action={
// //             <Button
// //               color="inherit"
// //               size="small"
// //               onClick={handleSnackbarClose}
// //               sx={{
// //                 color: "white",
// //                 backgroundColor: "#007bff",
// //                 borderRadius: "20px",
// //                 padding: "5px 15px",
// //                 "&:hover": { backgroundColor: "#0056b3" },
// //               }}
// //             >
// //               OK
// //             </Button>
// //           }
// //           sx={{ width: "100%", backgroundColor: "transparent", boxShadow: "none" }}
// //         >
// //           You need to verify your profile to rent items.
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // };

// // export default CDProduct;
// // // // //11
// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Box,
// // //   Typography,
// // //   Grid,
// // //   Card,
// // //   CardContent,
// // //   IconButton,
// // //   Select,
// // //   MenuItem,
// // //   Tabs,
// // //   Tab,
// // //   Snackbar,
// // //   Alert,
// // //   Button,
// // //   Modal,
// // //   TextField,
// // //   Checkbox,
// // //   FormControlLabel,
// // //   FormGroup,
// // // } from "@mui/material";
// // // import { ShoppingCart, Favorite } from "@mui/icons-material";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import API from "../services/api";

// // // const CDProduct = ({ handleWishlistToggle, handleAddToCart, wishlistItems = [], isFeatured }) => {
// // //   const [products, setProducts] = useState([]);
// // //   const [filteredProducts, setFilteredProducts] = useState([]);
// // //   const [sortOption, setSortOption] = useState("");
// // //   const [tabValue, setTabValue] = useState("all");
// // //   const [verificationStatus, setVerificationStatus] = useState(null);
// // //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [selectedProduct, setSelectedProduct] = useState(null);
// // //   const [quantity, setQuantity] = useState(1);
// // //   const [filters, setFilters] = useState({
// // //     category: [],
// // //     company: [],
// // //     priceRange: { min: 0, max: 10000 },
// // //   });
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const isViewAll = location.pathname === "/all-products";

// // //   useEffect(() => {
// // //     const fetchProducts = async () => {
// // //       try {
// // //         const response = await API.get("/api/products/");
// // //         setProducts(response.data);
// // //         setFilteredProducts(response.data);
// // //       } catch (error) {
// // //         console.error("Error fetching products:", error);
// // //       }
// // //     };

// // //     const fetchVerificationStatus = async () => {
// // //       try {
// // //         const response = await API.get("/api/rent-verification/user/");
// // //         setVerificationStatus(response.data.status);
// // //       } catch (error) {
// // //         if (error.response && error.response.status === 404) {
// // //           setVerificationStatus("not_found");
// // //         } else {
// // //           console.error("Error fetching verification status:", error);
// // //         }
// // //       }
// // //     };

// // //     fetchProducts();
// // //     fetchVerificationStatus();
// // //   }, []);

// // //   const handleFilterChange = (filterType, value) => {
// // //     setFilters((prev) => {
// // //       if (filterType === "priceRange") {
// // //         return { ...prev, priceRange: value };
// // //       }
// // //       const updatedFilter = prev[filterType].includes(value)
// // //         ? prev[filterType].filter((item) => item !== value)
// // //         : [...prev[filterType], value];
// // //       return { ...prev, [filterType]: updatedFilter };
// // //     });

// // //     let filtered = [...products];
// // //     if (filters.category.length > 0) {
// // //       filtered = filtered.filter((product) => filters.category.includes(product.category));
// // //     }
// // //     if (filters.company.length > 0) {
// // //       filtered = filtered.filter((product) => filters.company.includes(product.company_name));
// // //     }
// // //     filtered = filtered.filter(
// // //       (product) =>
// // //         product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
// // //     );
// // //     setFilteredProducts(filtered);
// // //   };

// // //   const handleSortChange = (event) => {
// // //     const option = event.target.value;
// // //     setSortOption(option);

// // //     let sortedProducts = [...filteredProducts];
// // //     if (option === "priceLowToHigh") {
// // //       sortedProducts.sort((a, b) => a.price - b.price);
// // //     } else if (option === "priceHighToLow") {
// // //       sortedProducts.sort((a, b) => b.price - b.price);
// // //     }
// // //     setFilteredProducts(sortedProducts);
// // //   };

// // //   const handleTabChange = (event, newValue) => {
// // //     setTabValue(newValue);
// // //     let filtered = [...products];
// // //     if (newValue !== "all") {
// // //       filtered = filtered.filter((product) => product.category === newValue);
// // //     }
// // //     setFilteredProducts(filtered);
// // //   };

// // //   const isInWishlist = (productId) => {
// // //     return wishlistItems.some((item) => item.id === productId);
// // //   };

// // //   const handleAddToCartWithVerification = (product) => {
// // //     if (product.category === "renting" && verificationStatus !== "verified") {
// // //       setSnackbarOpen(true);
// // //       navigate("/upload-kyc");
// // //       return;
// // //     }
// // //     handleAddToCart({ ...product, quantity });
// // //     setModalOpen(false);
// // //   };

// // //   const handleBuyOrRentNow = (product) => {
// // //     if (product.category === "renting" && verificationStatus !== "verified") {
// // //       setSnackbarOpen(true);
// // //       navigate("/upload-kyc");
// // //       return;
// // //     }
// // //     const buyingItems = product.category === "selling"
// // //       ? [{ product_id: product.id, ...product, quantity }]
// // //       : [];
// // //     const rentingItems = product.category === "renting"
// // //       ? [{ product_id: product.id, ...product, quantity }]
// // //       : [];
// // //     const cartTotal = product.category === "selling"
// // //       ? parseFloat(product.price) * quantity
// // //       : 0;

// // //     navigate("/checkout", { state: { buyingItems, rentingItems, cartTotal } });
// // //   };

// // //   const handleSnackbarClose = () => {
// // //     setSnackbarOpen(false);
// // //   };

// // //   const handleCardClick = (product) => {
// // //     setSelectedProduct(product);
// // //     setQuantity(1);
// // //     setModalOpen(true);
// // //   };

// // //   const handleModalClose = () => {
// // //     setModalOpen(false);
// // //     setSelectedProduct(null);
// // //   };

// // //   const handleQuantityChange = (event) => {
// // //     const value = Math.max(1, Number(event.target.value));
// // //     setQuantity(value);
// // //   };

// // //   const calculateDiscountedPrice = (price, discountPercentage) => {
// // //     const originalPrice = parseFloat(price);
// // //     const discount = parseFloat(discountPercentage);
// // //     return (originalPrice - (originalPrice * (discount / 100))).toFixed(2);
// // //   };

// // //   const uniqueCompanies = [...new Set(products.map((product) => product.company_name))];
// // //   const categoryOptions = ["renting", "selling"];

// // //   return (
// // //     <Box sx={{ padding: "20px" }}>
// // //       {/* Filters for View All */}
// // //       {isViewAll && (
// // //         <Box sx={{ display: "flex", gap: 2 }}>
// // //           <Box sx={{ width: "250px", p: 2, bgcolor: "grey.100", borderRadius: 2 }}>
// // //             <Typography variant="h6" fontWeight="bold" mb={2}>Filters</Typography>
// // //             <Typography variant="subtitle1" fontWeight="bold">Category</Typography>
// // //             <FormGroup>
// // //               {categoryOptions.map((cat) => (
// // //                 <FormControlLabel
// // //                   key={cat}
// // //                   control={
// // //                     <Checkbox
// // //                       checked={filters.category.includes(cat)}
// // //                       onChange={() => handleFilterChange("category", cat)}
// // //                     />
// // //                   }
// // //                   label={cat === "renting" ? "Rent" : "Buy"}
// // //                 />
// // //               ))}
// // //             </FormGroup>
// // //             <Typography variant="subtitle1" fontWeight="bold" mt={2}>Company</Typography>
// // //             <FormGroup>
// // //               {uniqueCompanies.map((company) => (
// // //                 <FormControlLabel
// // //                   key={company}
// // //                   control={
// // //                     <Checkbox
// // //                       checked={filters.company.includes(company)}
// // //                       onChange={() => handleFilterChange("company", company)}
// // //                     />
// // //                   }
// // //                   label={company}
// // //                 />
// // //               ))}
// // //             </FormGroup>
// // //             <Typography variant="subtitle1" fontWeight="bold" mt={2}>Price Range</Typography>
// // //             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
// // //               <input
// // //                 type="range"
// // //                 min="0"
// // //                 max="10000"
// // //                 value={filters.priceRange.min}
// // //                 onChange={(e) =>
// // //                   handleFilterChange("priceRange", {
// // //                     ...filters.priceRange,
// // //                     min: Number(e.target.value),
// // //                   })
// // //                 }
// // //               />
// // //               <input
// // //                 type="range"
// // //                 min="0"
// // //                 max="10000"
// // //                 value={filters.priceRange.max}
// // //                 onChange={(e) =>
// // //                   handleFilterChange("priceRange", {
// // //                     ...filters.priceRange,
// // //                     max: Number(e.target.value),
// // //                   })
// // //                 }
// // //               />
// // //               <Typography>Rs. {filters.priceRange.min} - Rs. {filters.priceRange.max}</Typography>
// // //             </Box>
// // //           </Box>
// // //           <Box sx={{ flex: 1 }}>
// // //             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
// // //               <Typography variant="h5" fontWeight="bold">All Products</Typography>
// // //               <Box sx={{ display: "flex", gap: 2 }}>
// // //                 <Tabs value={tabValue} onChange={handleTabChange}>
// // //                   <Tab label="All" value="all" />
// // //                   <Tab label="Rent" value="renting" />
// // //                   <Tab label="Buy" value="selling" />
// // //                 </Tabs>
// // //                 <Select
// // //                   value={sortOption}
// // //                   onChange={handleSortChange}
// // //                   displayEmpty
// // //                   sx={{ minWidth: "150px", bgcolor: "white" }}
// // //                 >
// // //                   <MenuItem value="">Sort by</MenuItem>
// // //                   <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
// // //                   <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
// // //                 </Select>
// // //               </Box>
// // //             </Box>
// // //             <Grid container spacing={2}>
// // //               {filteredProducts.map((product) => (
// // //                 <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
// // //                   <Card sx={{ borderRadius: 2, boxShadow: 2, bgcolor: "white" }}>
// // //                     <CardContent sx={{ textAlign: "center" }}>
// // //                       <Box sx={{ position: "relative" }}>
// // //                         <img
// // //                           src={
// // //                             product.image
// // //                               ? `http://127.0.0.1:8000${product.image}`
// // //                               : "https://via.placeholder.com/150"
// // //                           }
// // //                           alt={product.title}
// // //                           style={{ width: "100%", height: "150px", objectFit: "contain" }}
// // //                         />
// // //                         <Box
// // //                           sx={{
// // //                             position: "absolute",
// // //                             top: 0,
// // //                             left: 0,
// // //                             bgcolor: product.category === "renting" ? "error.main" : "primary.main",
// // //                             color: "white",
// // //                             px: 1,
// // //                             py: 0.5,
// // //                             borderRadius: "0 0 8px 0",
// // //                           }}
// // //                         >
// // //                           {product.category === "renting" ? "Rent" : "Buy"}
// // //                         </Box>
// // //                       </Box>
// // //                       <Typography variant="subtitle1" fontWeight="bold">{product.title}</Typography>
// // //                       <Typography variant="body2" color="textSecondary">
// // //                         Company: {product.company_name || "N/A"}
// // //                       </Typography>
// // //                       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 1 }}>
// // //                         {product.discount_percentage && parseFloat(product.discount_percentage) > 0 ? (
// // //                           <>
// // //                             <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "line-through", mr: 1 }}>
// // //                               Rs. {product.price}
// // //                             </Typography>
// // //                             <Typography variant="body1" fontWeight="bold">
// // //                               Rs. {calculateDiscountedPrice(product.price, product.discount_percentage)}
// // //                             </Typography>
// // //                           </>
// // //                         ) : (
// // //                           <Typography variant="body1" fontWeight="bold">Rs. {product.price}</Typography>
// // //                         )}
// // //                       </Box>
// // //                       {product.category === "renting" && (
// // //                         <Typography variant="body2" color="textSecondary">
// // //                           Per Day Rent: Rs. {product.per_day_rent}
// // //                         </Typography>
// // //                       )}
// // //                       <Button
// // //                         variant="contained"
// // //                         color="success"
// // //                         fullWidth
// // //                         startIcon={<ShoppingCart />}
// // //                         onClick={() => handleAddToCartWithVerification(product)}
// // //                         sx={{ borderRadius: 2, textTransform: "none", mt: 1 }}
// // //                       >
// // //                         Add to Cart
// // //                       </Button>
// // //                     </CardContent>
// // //                   </Card>
// // //                 </Grid>
// // //               ))}
// // //             </Grid>
// // //           </Box>
// // //         </Box>
// // //       )}

// // //       {/* Featured Products */}
// // //       {!isViewAll && (
// // //         <Grid container spacing={2}>
// // //           {products.slice(0, isFeatured ? 5 : undefined).map((product) => (
// // //             <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
// // //               <Card sx={{ borderRadius: 2, boxShadow: 2, bgcolor: "white" }}>
// // //                 <CardContent sx={{ textAlign: "center" }}>
// // //                   <Box sx={{ position: "relative" }}>
// // //                     <img
// // //                       src={
// // //                         product.image
// // //                           ? `http://127.0.0.1:8000${product.image}`
// // //                           : "https://via.placeholder.com/150"
// // //                       }
// // //                       alt={product.title}
// // //                       style={{ width: "100%", height: "150px", objectFit: "contain" }}
// // //                     />
// // //                     <Box
// // //                       sx={{
// // //                         position: "absolute",
// // //                         top: 0,
// // //                         left: 0,
// // //                         bgcolor: product.category === "renting" ? "error.main" : "primary.main",
// // //                         color: "white",
// // //                         px: 1,
// // //                         py: 0.5,
// // //                         borderRadius: "0 0 8px 0",
// // //                       }}
// // //                     >
// // //                       {product.category === "renting" ? "Rent" : "Buy"}
// // //                     </Box>
// // //                   </Box>
// // //                   <Typography variant="subtitle1" fontWeight="bold">{product.title}</Typography>
// // //                   <Typography variant="body2" color="textSecondary">
// // //                     Company: {product.company_name || "N/A"}
// // //                   </Typography>
// // //                   <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 1 }}>
// // //                     {product.discount_percentage && parseFloat(product.discount_percentage) > 0 ? (
// // //                       <>
// // //                         <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "line-through", mr: 1 }}>
// // //                           Rs. {product.price}
// // //                         </Typography>
// // //                         <Typography variant="body1" fontWeight="bold">
// // //                           Rs. {calculateDiscountedPrice(product.price, product.discount_percentage)}
// // //                         </Typography>
// // //                       </>
// // //                     ) : (
// // //                       <Typography variant="body1" fontWeight="bold">Rs. {product.price}</Typography>
// // //                     )}
// // //                   </Box>
// // //                   {product.category === "renting" && (
// // //                     <Typography variant="body2" color="textSecondary">
// // //                       Per Day Rent: Rs. {product.per_day_rent}
// // //                     </Typography>
// // //                   )}
// // //                   <Button
// // //                     variant="contained"
// // //                     color="success"
// // //                     fullWidth
// // //                     startIcon={<ShoppingCart />}
// // //                     onClick={() => handleAddToCartWithVerification(product)}
// // //                     sx={{ borderRadius: 2, textTransform: "none", mt: 1 }}
// // //                   >
// // //                     Add to Cart
// // //                   </Button>
// // //                 </CardContent>
// // //               </Card>
// // //             </Grid>
// // //           ))}
// // //         </Grid>
// // //       )}

// // //       <Modal
// // //         open={modalOpen}
// // //         onClose={handleModalClose}
// // //         aria-labelledby="product-modal-title"
// // //         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
// // //       >
// // //         <Box
// // //           sx={{
// // //             backgroundColor: "white",
// // //             borderRadius: "12px",
// // //             boxShadow: 24,
// // //             padding: "24px",
// // //             width: { xs: "90%", sm: "70%", md: "50%" },
// // //             maxHeight: "90vh",
// // //             overflowY: "auto",
// // //           }}
// // //         >
// // //           {selectedProduct && (
// // //             <>
// // //               <Typography id="product-modal-title" variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
// // //                 {selectedProduct.title}
// // //               </Typography>
// // //               <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
// // //                 <Box sx={{ flex: 1 }}>
// // //                   <img
// // //                     src={
// // //                       selectedProduct.image
// // //                         ? `http://127.0.0.1:8000${selectedProduct.image}`
// // //                         : "https://via.placeholder.com/300"
// // //                     }
// // //                     alt={selectedProduct.title}
// // //                     style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain" }}
// // //                   />
// // //                 </Box>
// // //                 <Box sx={{ flex: 1 }}>
// // //                   <Typography variant="body1" sx={{ mb: 2 }}>
// // //                     {selectedProduct.description || "No description available."}
// // //                   </Typography>
// // //                   <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
// // //                     {selectedProduct.discount_percentage && parseFloat(selectedProduct.discount_percentage) > 0 ? (
// // //                       <>
// // //                         <Typography variant="h6" color="text.secondary" sx={{ textDecoration: "line-through" }}>
// // //                           Rs. {selectedProduct.price}
// // //                         </Typography>
// // //                         <Typography variant="h6" color="primary">
// // //                           Rs. {calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount_percentage)}
// // //                         </Typography>
// // //                       </>
// // //                     ) : (
// // //                       <Typography variant="h6" color="primary">
// // //                         Rs. {selectedProduct.price}
// // //                       </Typography>
// // //                     )}
// // //                   </Box>
// // //                   {selectedProduct.discount_percentage && parseFloat(selectedProduct.discount_percentage) > 0 && (
// // //                     <Box
// // //                       sx={{
// // //                         display: "inline-block",
// // //                         backgroundColor: "error.main",
// // //                         color: "white",
// // //                         padding: "4px 8px",
// // //                         borderRadius: "12px",
// // //                         fontSize: "12px",
// // //                         fontWeight: "bold",
// // //                         mb: 1,
// // //                       }}
// // //                     >
// // //                       {selectedProduct.discount_percentage}% OFF
// // //                     </Box>
// // //                   )}
// // //                   {selectedProduct.category === "renting" && (
// // //                     <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
// // //                       Per Day Rent: Rs. {selectedProduct.per_day_rent}
// // //                     </Typography>
// // //                   )}
// // //                   <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
// // //                     Company: {selectedProduct.company_name || "N/A"}
// // //                   </Typography>
// // //                   <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
// // //                     <Typography variant="body1">Quantity:</Typography>
// // //                     <TextField
// // //                       type="number"
// // //                       value={quantity}
// // //                       onChange={handleQuantityChange}
// // //                       inputProps={{ min: 1 }}
// // //                       sx={{ width: "80px" }}
// // //                     />
// // //                   </Box>
// // //                   <Box sx={{ display: "flex", gap: 2 }}>
// // //                     <Button
// // //                       variant="contained"
// // //                       color="primary"
// // //                       onClick={() => handleBuyOrRentNow(selectedProduct)}
// // //                       sx={{ flex: 1 }}
// // //                     >
// // //                       {selectedProduct.category === "renting" ? "Rent Now" : "Buy Now"}
// // //                     </Button>
// // //                     <Button
// // //                       variant="outlined"
// // //                       color="primary"
// // //                       onClick={() => handleAddToCartWithVerification(selectedProduct)}
// // //                       startIcon={<ShoppingCart />}
// // //                       sx={{ flex: 1 }}
// // //                     >
// // //                       Add to Cart
// // //                     </Button>
// // //                   </Box>
// // //                 </Box>
// // //               </Box>
// // //             </>
// // //           )}
// // //         </Box>
// // //       </Modal>

// // //       <Snackbar
// // //         open={snackbarOpen}
// // //         onClose={handleSnackbarClose}
// // //         anchorOrigin={{ vertical: "top", horizontal: "center" }}
// // //         sx={{
// // //           "& .MuiSnackbarContent-root": {
// // //             backgroundColor: "#007bff",
// // //             color: "white",
// // //             borderRadius: "8px",
// // //             padding: "10px 20px",
// // //           },
// // //         }}
// // //       >
// // //         <Alert
// // //           onClose={handleSnackbarClose}
// // //           severity="warning"
// // //           action={
// // //             <Button
// // //               color="inherit"
// // //               size="small"
// // //               onClick={handleSnackbarClose}
// // //               sx={{
// // //                 color: "white",
// // //                 backgroundColor: "#007bff",
// // //                 borderRadius: "20px",
// // //                 padding: "5px 15px",
// // //                 "&:hover": { backgroundColor: "#0056b3" },
// // //               }}
// // //             >
// // //               OK
// // //             </Button>
// // //           }
// // //           sx={{ width: "100%", backgroundColor: "transparent", boxShadow: "none" }}
// // //         >
// // //           You need to verify your profile to rent items.
// // //         </Alert>
// // //       </Snackbar>
// // //     </Box>
// // //   );
// // // };

// // // // export default CDProduct;
// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Box,
// // //   Typography,
// // //   Grid,
// // //   Card,
// // //   CardContent,
// // //   IconButton,
// // //   Select,
// // //   MenuItem,
// // //   Tabs,
// // //   Tab,
// // //   Snackbar,
// // //   Alert,
// // //   Button,
// // //   Modal,
// // //   TextField,
// // //   Checkbox,
// // //   FormControlLabel,
// // //   FormGroup,
// // // } from "@mui/material";
// // // import { ShoppingCart, Favorite } from "@mui/icons-material";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import API from "../services/api";

// // // const CDProduct = ({ handleWishlistToggle, handleAddToCart, wishlistItems = [], isFeatured }) => {
// // //   const [products, setProducts] = useState([]);
// // //   const [filteredProducts, setFilteredProducts] = useState([]);
// // //   const [sortOption, setSortOption] = useState("");
// // //   const [tabValue, setTabValue] = useState("all");
// // //   const [verificationStatus, setVerificationStatus] = useState(null);
// // //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [selectedProduct, setSelectedProduct] = useState(null);
// // //   const [quantity, setQuantity] = useState(1);
// // //   const [filters, setFilters] = useState({
// // //     category: [],
// // //     company: [],
// // //     priceRange: { min: 0, max: 10000 },
// // //   });
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const isViewAll = location.pathname === "/all-products";

// // //   useEffect(() => {
// // //     const fetchProducts = async () => {
// // //       try {
// // //         const response = await API.get("/api/products/");
// // //         setProducts(response.data);
// // //         setFilteredProducts(response.data);
// // //       } catch (error) {
// // //         console.error("Error fetching products:", error);
// // //       }
// // //     };

// // //     const fetchVerificationStatus = async () => {
// // //       try {
// // //         const response = await API.get("/api/rent-verification/user/");
// // //         setVerificationStatus(response.data.status);
// // //       } catch (error) {
// // //         if (error.response && error.response.status === 404) {
// // //           setVerificationStatus("not_found");
// // //         } else {
// // //           console.error("Error fetching verification status:", error);
// // //         }
// // //       }
// // //     };

// // //     fetchProducts();
// // //     fetchVerificationStatus();
// // //   }, []);

// // //   const handleFilterChange = (filterType, value) => {
// // //     setFilters((prev) => {
// // //       if (filterType === "priceRange") {
// // //         return { ...prev, priceRange: value };
// // //       }
// // //       const updatedFilter = prev[filterType].includes(value)
// // //         ? prev[filterType].filter((item) => item !== value)
// // //         : [...prev[filterType], value];
// // //       return { ...prev, [filterType]: updatedFilter };
// // //     });

// // //     let filtered = [...products];
// // //     if (filters.category.length > 0) {
// // //       filtered = filtered.filter((product) => filters.category.includes(product.category));
// // //     }
// // //     if (filters.company.length > 0) {
// // //       filtered = filtered.filter((product) => filters.company.includes(product.company_name));
// // //     }
// // //     filtered = filtered.filter(
// // //       (product) =>
// // //         product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
// // //     );
// // //     setFilteredProducts(filtered);
// // //   };

// // //   const handleSortChange = (event) => {
// // //     const option = event.target.value;
// // //     setSortOption(option);

// // //     let sortedProducts = [...filteredProducts];
// // //     if (option === "priceLowToHigh") {
// // //       sortedProducts.sort((a, b) => a.price - b.price);
// // //     } else if (option === "priceHighToLow") {
// // //       sortedProducts.sort((a, b) => b.price - b.price);
// // //     }
// // //     setFilteredProducts(sortedProducts);
// // //   };

// // //   const handleTabChange = (event, newValue) => {
// // //     setTabValue(newValue);
// // //     let filtered = [...products];
// // //     if (newValue !== "all") {
// // //       filtered = filtered.filter((product) => product.category === newValue);
// // //     }
// // //     setFilteredProducts(filtered);
// // //   };

// // //   const isInWishlist = (productId) => {
// // //     return wishlistItems.some((item) => item.id === productId);
// // //   };

// // //   const handleAddToCartWithVerification = (product) => {
// // //     if (product.category === "renting" && verificationStatus !== "verified") {
// // //       setSnackbarOpen(true);
// // //       navigate("/upload-kyc");
// // //       return;
// // //     }
// // //     handleAddToCart({ ...product, quantity });
// // //     setModalOpen(false);
// // //   };

// // //   const handleBuyOrRentNow = (product) => {
// // //     if (product.category === "renting" && verificationStatus !== "verified") {
// // //       setSnackbarOpen(true);
// // //       navigate("/upload-kyc");
// // //       return;
// // //     }
// // //     const buyingItems = product.category === "selling"
// // //       ? [{ product_id: product.id, ...product, quantity }]
// // //       : [];
// // //     const rentingItems = product.category === "renting"
// // //       ? [{ product_id: product.id, ...product, quantity }]
// // //       : [];
// // //     const cartTotal = product.category === "selling"
// // //       ? parseFloat(product.price) * quantity
// // //       : 0;

// // //     navigate("/checkout", { state: { buyingItems, rentingItems, cartTotal } });
// // //   };

// // //   const handleSnackbarClose = () => {
// // //     setSnackbarOpen(false);
// // //   };

// // //   const handleCardClick = (product) => {
// // //     setSelectedProduct(product);
// // //     setQuantity(1);
// // //     setModalOpen(true);
// // //   };

// // //   const handleModalClose = () => {
// // //     setModalOpen(false);
// // //     setSelectedProduct(null);
// // //   };

// // //   const handleQuantityChange = (event) => {
// // //     const value = Math.max(1, Number(event.target.value));
// // //     setQuantity(value);
// // //   };

// // //   const calculateDiscountedPrice = (price, discountPercentage) => {
// // //     const originalPrice = parseFloat(price);
// // //     const discount = parseFloat(discountPercentage);
// // //     return (originalPrice - (originalPrice * (discount / 100))).toFixed(2);
// // //   };

// // //   const uniqueCompanies = [...new Set(products.map((product) => product.company_name))];
// // //   const categoryOptions = ["renting", "selling"];

// // //   return (
// // //     <Box sx={{ py: 2 }}>
// // //       {isViewAll && (
// // //         <Box sx={{ display: "flex", gap: 3 }}>
// // //           <Box sx={{ width: "280px", p: 3, bgcolor: "#ffffff", borderRadius: 2, boxShadow: 1 }}>
// // //             <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#1a237e" }}>
// // //               Filters
// // //             </Typography>
// // //             <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
// // //               Category
// // //             </Typography>
// // //             <FormGroup>
// // //               {categoryOptions.map((cat) => (
// // //                 <FormControlLabel
// // //                   key={cat}
// // //                   control={
// // //                     <Checkbox
// // //                       checked={filters.category.includes(cat)}
// // //                       onChange={() => handleFilterChange("category", cat)}
// // //                       sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }}
// // //                     />
// // //                   }
// // //                   label={cat === "renting" ? "Rent" : "Buy"}
// // //                   sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.9rem" } }}
// // //                 />
// // //               ))}
// // //             </FormGroup>
// // //             <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
// // //               Company
// // //             </Typography>
// // //             <FormGroup>
// // //               {uniqueCompanies.map((company) => (
// // //                 <FormControlLabel
// // //                   key={company}
// // //                   control={
// // //                     <Checkbox
// // //                       checked={filters.company.includes(company)}
// // //                       onChange={() => handleFilterChange("company", company)}
// // //                       sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }}
// // //                     />
// // //                   }
// // //                   label={company}
// // //                   sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.9rem" } }}
// // //                 />
// // //               ))}
// // //             </FormGroup>
// // //             <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
// // //               Price Range
// // //             </Typography>
// // //             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
// // //               <input
// // //                 type="range"
// // //                 min="0"
// // //                 max="10000"
// // //                 value={filters.priceRange.min}
// // //                 onChange={(e) =>
// // //                   handleFilterChange("priceRange", {
// // //                     ...filters.priceRange,
// // //                     min: Number(e.target.value),
// // //                   })
// // //                 }
// // //                 style={{ accentColor: "#1976d2" }}
// // //               />
// // //               <input
// // //                 type="range"
// // //                 min="0"
// // //                 max="10000"
// // //                 value={filters.priceRange.max}
// // //                 onChange={(e) =>
// // //                   handleFilterChange("priceRange", {
// // //                     ...filters.priceRange,
// // //                     max: Number(e.target.value),
// // //                   })
// // //                 }
// // //                 style={{ accentColor: "#1976d2" }}
// // //               />
// // //               <Typography sx={{ color: "#546e7a" }}>
// // //                 Rs. {filters.priceRange.min} - Rs. {filters.priceRange.max}
// // //               </Typography>
// // //             </Box>
// // //           </Box>
// // //           <Box sx={{ flex: 1 }}>
// // //             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
// // //               <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
// // //                 All Products
// // //               </Typography>
// // //               <Box sx={{ display: "flex", gap: 2 }}>
// // //                 <Tabs
// // //                   value={tabValue}
// // //                   onChange={handleTabChange}
// // //                   sx={{
// // //                     "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
// // //                     "& .Mui-selected": { color: "#1976d2" },
// // //                   }}
// // //                 >
// // //                   <Tab label="All" value="all" />
// // //                   <Tab label="Rent" value="renting" />
// // //                   <Tab label="Buy" value="selling" />
// // //                 </Tabs>
// // //                 <Select
// // //                   value={sortOption}
// // //                   onChange={handleSortChange}
// // //                   displayEmpty
// // //                   sx={{
// // //                     minWidth: "150px",
// // //                     bgcolor: "#ffffff",
// // //                     borderRadius: 2,
// // //                     boxShadow: 1,
// // //                   }}
// // //                 >
// // //                   <MenuItem value="">Sort by</MenuItem>
// // //                   <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
// // //                   <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
// // //                 </Select>
// // //               </Box>
// // //             </Box>
// // //             <Grid container spacing={3}>
// // //               {filteredProducts.map((product) => (
// // //                 <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
// // //                   <Card
// // //                     sx={{
// // //                       borderRadius: 3,
// // //                       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// // //                       bgcolor: "#ffffff",
// // //                       transition: "transform 0.3s, box-shadow 0.3s",
// // //                       "&:hover": {
// // //                         transform: "translateY(-8px)",
// // //                         boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
// // //                       },
// // //                     }}
// // //                     onClick={() => handleCardClick(product)}
// // //                   >
// // //                     <CardContent sx={{ textAlign: "center", p: 3, position: "relative" }}>
// // //                       <Box sx={{ position: "relative", mb: 2 }}>
// // //                         <img
// // //                           src={
// // //                             product.image
// // //                               ? `http://127.0.0.1:8000${product.image}`
// // //                               : "https://via.placeholder.com/150"
// // //                           }
// // //                           alt={product.title}
// // //                           style={{ width: "100%", height: "150px", objectFit: "contain" }}
// // //                         />
// // //                         <Box
// // //                           sx={{
// // //                             position: "absolute",
// // //                             top: 0,
// // //                             left: 0,
// // //                             bgcolor: product.category === "renting" ? "#d32f2f" : "#1976d2",
// // //                             color: "#ffffff",
// // //                             px: 1,
// // //                             py: 0.5,
// // //                             borderRadius: "0 0 8px 0",
// // //                             fontSize: "0.8rem",
// // //                             fontWeight: 600,
// // //                           }}
// // //                         >
// // //                           {product.category === "renting" ? "Rent" : "Buy"}
// // //                         </Box>
// // //                         <Box
// // //                           sx={{
// // //                             position: "absolute",
// // //                             top: 10,
// // //                             right: 10,
// // //                             display: "flex",
// // //                             gap: 1,
// // //                           }}
// // //                         >
// // //                           <IconButton
// // //                             onClick={(e) => {
// // //                               e.stopPropagation();
// // //                               handleWishlistToggle(product);
// // //                             }}
// // //                             sx={{
// // //                               bgcolor: "#ffffff",
// // //                               boxShadow: 1,
// // //                               "&:hover": { bgcolor: "#f5f5f5" },
// // //                             }}
// // //                           >
// // //                             <Favorite
// // //                               sx={{ color: isInWishlist(product.id) ? "#d32f2f" : "#757575" }}
// // //                             />
// // //                           </IconButton>
// // //                           <IconButton
// // //                             onClick={(e) => {
// // //                               e.stopPropagation();
// // //                               handleAddToCartWithVerification(product);
// // //                             }}
// // //                             sx={{
// // //                               bgcolor: "#ffffff",
// // //                               boxShadow: 1,
// // //                               "&:hover": { bgcolor: "#f5f5f5" },
// // //                             }}
// // //                           >
// // //                             <ShoppingCart sx={{ color: "#1976d2" }} />
// // //                           </IconButton>
// // //                         </Box>
// // //                       </Box>
// // //                       <Typography
// // //                         variant="subtitle1"
// // //                         sx={{ fontWeight: 700, color: "#1a237e", mb: 1 }}
// // //                       >
// // //                         {product.title}
// // //                       </Typography>
// // //                       <Typography variant="body2" sx={{ color: "#546e7a", mb: 1 }}>
// // //                         Company: {product.company_name || "N/A"}
// // //                       </Typography>
// // //                       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
// // //                         {product.discount_percentage && parseFloat(product.discount_percentage) > 0 ? (
// // //                           <>
// // //                             <Typography
// // //                               variant="body2"
// // //                               sx={{ color: "#78909c", textDecoration: "line-through", mr: 1 }}
// // //                             >
// // //                               Rs. {product.price}
// // //                             </Typography>
// // //                             <Typography variant="body1" sx={{ fontWeight: 700, color: "#d32f2f" }}>
// // //                               Rs. {calculateDiscountedPrice(product.price, product.discount_percentage)}
// // //                             </Typography>
// // //                           </>
// // //                         ) : (
// // //                           <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
// // //                             Rs. {product.price}
// // //                           </Typography>
// // //                         )}
// // //                       </Box>
// // //                       {product.category === "renting" && (
// // //                         <Typography variant="body2" sx={{ color: "#546e7a", mb: 2 }}>
// // //                           Per Day Rent: Rs. {product.per_day_rent}
// // //                         </Typography>
// // //                       )}
// // //                       <Button
// // //                         variant="contained"
// // //                         color="success"
// // //                         fullWidth
// // //                         startIcon={<ShoppingCart />}
// // //                         onClick={(e) => {
// // //                           e.stopPropagation();
// // //                           handleAddToCartWithVerification(product);
// // //                         }}
// // //                         sx={{
// // //                           borderRadius: 20,
// // //                           textTransform: "none",
// // //                           py: 1.5,
// // //                           bgcolor: "#388e3c",
// // //                           "&:hover": { bgcolor: "#2e7d32" },
// // //                         }}
// // //                       >
// // //                         Add to Cart
// // //                       </Button>
// // //                     </CardContent>
// // //                   </Card>
// // //                 </Grid>
// // //               ))}
// // //             </Grid>
// // //           </Box>
// // //         </Box>
// // //       )}
// // //       {!isViewAll && (
// // //         <Grid container spacing={3}>
// // //           {products.slice(0, isFeatured ? 5 : undefined).map((product) => (
// // //             <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
// // //               <Card
// // //                 sx={{
// // //                   borderRadius: 3,
// // //                   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// // //                   bgcolor: "#ffffff",
// // //                   transition: "transform 0.3s, box-shadow 0.3s",
// // //                   "&:hover": {
// // //                     transform: "translateY(-8px)",
// // //                     boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
// // //                   },
// // //                 }}
// // //                 onClick={() => handleCardClick(product)}
// // //               >
// // //                 <CardContent sx={{ textAlign: "center", p: 3, position: "relative" }}>
// // //                   <Box sx={{ position: "relative", mb: 2 }}>
// // //                     <img
// // //                       src={
// // //                         product.image
// // //                           ? `http://127.0.0.1:8000${product.image}`
// // //                           : "https://via.placeholder.com/150"
// // //                       }
// // //                       alt={product.title}
// // //                       style={{ width: "100%", height: "150px", objectFit: "contain" }}
// // //                     />
// // //                     <Box
// // //                       sx={{
// // //                         position: "absolute",
// // //                         top: 0,
// // //                         left: 0,
// // //                         bgcolor: product.category === "renting" ? "#d32f2f" : "#1976d2",
// // //                         color: "#ffffff",
// // //                         px: 1,
// // //                         py: 0.5,
// // //                         borderRadius: "0 0 8px 0",
// // //                         fontSize: "0.8rem",
// // //                         fontWeight: 600,
// // //                       }}
// // //                     >
// // //                       {product.category === "renting" ? "Rent" : "Buy"}
// // //                     </Box>
// // //                     <Box
// // //                       sx={{
// // //                         position: "absolute",
// // //                         top: 10,
// // //                         right: 10,
// // //                         display: "flex",
// // //                         gap: 1,
// // //                       }}
// // //                     >
// // //                       <IconButton
// // //                         onClick={(e) => {
// // //                           e.stopPropagation();
// // //                           handleWishlistToggle(product);
// // //                         }}
// // //                         sx={{
// // //                           bgcolor: "#ffffff",
// // //                           boxShadow: 1,
// // //                           "&:hover": { bgcolor: "#f5f5f5" },
// // //                         }}
// // //                       >
// // //                         <Favorite
// // //                           sx={{ color: isInWishlist(product.id) ? "#d32f2f" : "#757575" }}
// // //                         />
// // //                       </IconButton>
// // //                       <IconButton
// // //                         onClick={(e) => {
// // //                           e.stopPropagation();
// // //                           handleAddToCartWithVerification(product);
// // //                         }}
// // //                         sx={{
// // //                           bgcolor: "#ffffff",
// // //                           boxShadow: 1,
// // //                           "&:hover": { bgcolor: "#f5f5f5" },
// // //                         }}
// // //                       >
// // //                         <ShoppingCart sx={{ color: "#1976d2" }} />
// // //                       </IconButton>
// // //                     </Box>
// // //                   </Box>
// // //                   <Typography
// // //                     variant="subtitle1"
// // //                     sx={{ fontWeight: 700, color: "#1a237e", mb: 1 }}
// // //                   >
// // //                     {product.title}
// // //                   </Typography>
// // //                   <Typography variant="body2" sx={{ color: "#546e7a", mb: 1 }}>
// // //                     Company: {product.company_name || "N/A"}
// // //                   </Typography>
// // //                   <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
// // //                     {product.discount_percentage && parseFloat(product.discount_percentage) > 0 ? (
// // //                       <>
// // //                         <Typography
// // //                           variant="body2"
// // //                           sx={{ color: "#78909c", textDecoration: "line-through", mr: 1 }}
// // //                         >
// // //                           Rs. {product.price}
// // //                         </Typography>
// // //                         <Typography variant="body1" sx={{ fontWeight: 700, color: "#d32f2f" }}>
// // //                           Rs. {calculateDiscountedPrice(product.price, product.discount_percentage)}
// // //                         </Typography>
// // //                       </>
// // //                     ) : (
// // //                       <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
// // //                         Rs. {product.price}
// // //                       </Typography>
// // //                     )}
// // //                   </Box>
// // //                   {product.category === "renting" && (
// // //                     <Typography variant="body2" sx={{ color: "#546e7a", mb: 2 }}>
// // //                       Per Day Rent: Rs. {product.per_day_rent}
// // //                     </Typography>
// // //                   )}
// // //                   <Button
// // //                     variant="contained"
// // //                     color="success"
// // //                     fullWidth
// // //                     startIcon={<ShoppingCart />}
// // //                     onClick={(e) => {
// // //                       e.stopPropagation();
// // //                       handleAddToCartWithVerification(product);
// // //                     }}
// // //                     sx={{
// // //                       borderRadius: 20,
// // //                       textTransform: "none",
// // //                       py: 1.5,
// // //                       bgcolor: "#388e3c",
// // //                       "&:hover": { bgcolor: "#2e7d32" },
// // //                     }}
// // //                   >
// // //                     Add to Cart
// // //                   </Button>
// // //                 </CardContent>
// // //               </Card>
// // //             </Grid>
// // //           ))}
// // //         </Grid>
// // //       )}
// // //       <Modal
// // //         open={modalOpen}
// // //         onClose={handleModalClose}
// // //         aria-labelledby="product-modal-title"
// // //         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
// // //       >
// // //         <Box
// // //           sx={{
// // //             backgroundColor: "#ffffff",
// // //             borderRadius: 3,
// // //             boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
// // //             p: 4,
// // //             width: { xs: "90%", sm: "70%", md: "50%" },
// // //             maxHeight: "90vh",
// // //             overflowY: "auto",
// // //           }}
// // //         >
// // //           {selectedProduct && (
// // //             <>
// // //               <Typography
// // //                 id="product-modal-title"
// // //                 variant="h5"
// // //                 sx={{ fontWeight: 700, color: "#1a237e", mb: 3 }}
// // //               >
// // //                 {selectedProduct.title}
// // //               </Typography>
// // //               <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
// // //                 <Box sx={{ flex: 1 }}>
// // //                   <img
// // //                     src={
// // //                       selectedProduct.image
// // //                         ? `http://127.0.0.1:8000${selectedProduct.image}`
// // //                         : "https://via.placeholder.com/300"
// // //                     }
// // //                     alt={selectedProduct.title}
// // //                     style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain", borderRadius: 2 }}
// // //                   />
// // //                 </Box>
// // //                 <Box sx={{ flex: 1 }}>
// // //                   <Typography variant="body1" sx={{ color: "#546e7a", mb: 3 }}>
// // //                     {selectedProduct.description || "No description available."}
// // //                   </Typography>
// // //                   <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
// // //                     {selectedProduct.discount_percentage && parseFloat(selectedProduct.discount_percentage) > 0 ? (
// // //                       <>
// // //                         <Typography
// // //                           variant="h6"
// // //                           sx={{ color: "#78909c", textDecoration: "line-through" }}
// // //                         >
// // //                           Rs. {selectedProduct.price}
// // //                         </Typography>
// // //                         <Typography variant="h6" sx={{ color: "#d32f2f", fontWeight: 700 }}>
// // //                           Rs. {calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount_percentage)}
// // //                         </Typography>
// // //                       </>
// // //                     ) : (
// // //                       <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 700 }}>
// // //                         Rs. {selectedProduct.price}
// // //                       </Typography>
// // //                     )}
// // //                   </Box>
// // //                   {selectedProduct.discount_percentage && parseFloat(selectedProduct.discount_percentage) > 0 && (
// // //                     <Box
// // //                       sx={{
// // //                         display: "inline-block",
// // //                         bgcolor: "#d32f2f",
// // //                         color: "#ffffff",
// // //                         px: 1.5,
// // //                         py: 0.5,
// // //                         borderRadius: 2,
// // //                         fontSize: "0.8rem",
// // //                         fontWeight: 600,
// // //                         mb: 2,
// // //                       }}
// // //                     >
// // //                       {selectedProduct.discount_percentage}% OFF
// // //                     </Box>
// // //                   )}
// // //                   {selectedProduct.category === "renting" && (
// // //                     <Typography variant="body2" sx={{ color: "#546e7a", mb: 2 }}>
// // //                       Per Day Rent: Rs. {selectedProduct.per_day_rent}
// // //                     </Typography>
// // //                   )}
// // //                   <Typography variant="body2" sx={{ color: "#546e7a", mb: 3 }}>
// // //                     Company: {selectedProduct.company_name || "N/A"}
// // //                   </Typography>
// // //                   <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
// // //                     <Typography variant="body1" sx={{ fontWeight: 600 }}>
// // //                       Quantity:
// // //                     </Typography>
// // //                     <TextField
// // //                       type="number"
// // //                       value={quantity}
// // //                       onChange={handleQuantityChange}
// // //                       inputProps={{ min: 1 }}
// // //                       sx={{ width: "80px", "& input": { textAlign: "center" } }}
// // //                     />
// // //                   </Box>
// // //                   <Box sx={{ display: "flex", gap: 2 }}>
// // //                     <Button
// // //                       variant="contained"
// // //                       color="primary"
// // //                       onClick={() => handleBuyOrRentNow(selectedProduct)}
// // //                       sx={{
// // //                         flex: 1,
// // //                         borderRadius: 20,
// // //                         textTransform: "none",
// // //                         py: 1.5,
// // //                         bgcolor: "#1976d2",
// // //                         "&:hover": { bgcolor: "#1565c0" },
// // //                       }}
// // //                     >
// // //                       {selectedProduct.category === "renting" ? "Rent Now" : "Buy Now"}
// // //                     </Button>
// // //                     <Button
// // //                       variant="outlined"
// // //                       color="primary"
// // //                       onClick={() => handleAddToCartWithVerification(selectedProduct)}
// // //                       startIcon={<ShoppingCart />}
// // //                       sx={{
// // //                         flex: 1,
// // //                         borderRadius: 20,
// // //                         textTransform: "none",
// // //                         py: 1.5,
// // //                         borderColor: "#1976d2",
// // //                         color: "#1976d2",
// // //                         "&:hover": { borderColor: "#1565c0", color: "#1565c0" },
// // //                       }}
// // //                     >
// // //                       Add to Cart
// // //                     </Button>
// // //                   </Box>
// // //                 </Box>
// // //               </Box>
// // //             </>
// // //           )}
// // //         </Box>
// // //       </Modal>
// // //       <Snackbar
// // //         open={snackbarOpen}
// // //         onClose={handleSnackbarClose}
// // //         anchorOrigin={{ vertical: "top", horizontal: "center" }}
// // //         sx={{
// // //           "& .MuiSnackbarContent-root": {
// // //             bgcolor: "#1976d2",
// // //             color: "#ffffff",
// // //             borderRadius: 2,
// // //             p: 2,
// // //           },
// // //         }}
// // //       >
// // //         <Alert
// // //           onClose={handleSnackbarClose}
// // //           severity="warning"
// // //           action={
// // //             <Button
// // //               color="inherit"
// // //               size="small"
// // //               onClick={handleSnackbarClose}
// // //               sx={{
// // //                 color: "#ffffff",
// // //                 bgcolor: "#1565c0",
// // //                 borderRadius: 20,
// // //                 px: 2,
// // //                 "&:hover": { bgcolor: "#0d47a1" },
// // //               }}
// // //             >
// // //               OK
// // //             </Button>
// // //           }
// // //           sx={{ width: "100%", bgcolor: "transparent", boxShadow: "none" }}
// // //         >
// // //           You need to verify your profile to rent items.
// // //         </Alert>
// // //       </Snackbar>
// // //     </Box>
// // //   );
// // // };

// // // export default CDProduct;
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   Snackbar,
//   Alert,
//   Button,
//   Modal,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
// } from "@mui/material";
// import { ShoppingCart, Favorite } from "@mui/icons-material";
// import { useNavigate, useLocation } from "react-router-dom";
// import API from "../services/api";

// const CDProduct = ({ handleWishlistToggle, handleAddToCart, wishlistItems = [], isFeatured }) => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [sortOption, setSortOption] = useState("");
//   const [tabValue, setTabValue] = useState("all");
//   const [verificationStatus, setVerificationStatus] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [filters, setFilters] = useState({
//     category: [],
//     company: [],
//     priceRange: { min: 0, max: 10000 },
//   });
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isViewAll = location.pathname === "/all-products";

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await API.get("/api/products/");
//         const shuffledProducts = response.data.sort(() => Math.random() - 0.5);
//         setProducts(shuffledProducts);
//         setFilteredProducts(shuffledProducts);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     const fetchVerificationStatus = async () => {
//       try {
//         const response = await API.get("/api/rent-verification/user/");
//         setVerificationStatus(response.data.status);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           setVerificationStatus("not_found");
//         } else {
//           console.error("Error fetching verification status:", error);
//         }
//       }
//     };

//     fetchProducts();
//     fetchVerificationStatus();
//   }, []);

//   const handleFilterChange = (filterType, value) => {
//     setFilters((prev) => {
//       let updatedFilters;
//       if (filterType === "priceRange") {
//         updatedFilters = { ...prev, priceRange: value };
//       } else {
//         const updatedFilter = prev[filterType].includes(value)
//           ? prev[filterType].filter((item) => item !== value)
//           : [...prev[filterType], value];
//         updatedFilters = { ...prev, [filterType]: updatedFilter };
//       }

//       // Apply all filters
//       let filtered = [...products];
//       if (updatedFilters.category.length > 0) {
//         filtered = filtered.filter((product) => updatedFilters.category.includes(product.category));
//       }
//       if (updatedFilters.tabValue && updatedFilters.tabValue !== "all") {
//         filtered = filtered.filter((product) => product.category === updatedFilters.tabValue);
//       }
//       if (updatedFilters.company.length > 0) {
//         filtered = filtered.filter((product) => updatedFilters.company.includes(product.company_name));
//       }
//       filtered = filtered.filter(
//         (product) =>
//           product.price >= updatedFilters.priceRange.min && product.price <= updatedFilters.priceRange.max
//       );

//       // Apply sorting if sortOption exists
//       if (sortOption === "priceLowToHigh") {
//         filtered.sort((a, b) => a.price - b.price);
//       } else if (sortOption === "priceHighToLow") {
//         filtered.sort((a, b) => b.price - b.price);
//       }

//       setFilteredProducts(filtered);
//       return updatedFilters;
//     });
//   };

//   const handleSortChange = (event) => {
//     const option = event.target.value;
//     setSortOption(option);

//     let sortedProducts = [...filteredProducts];
//     if (option === "priceLowToHigh") {
//       sortedProducts.sort((a, b) => a.price - b.price);
//     } else if (option === "priceHighToLow") {
//       sortedProducts.sort((a, b) => b.price - b.price);
//     }
//     setFilteredProducts(sortedProducts);
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//     setFilters((prev) => {
//       const updatedFilters = { ...prev, tabValue: newValue };

//       // Apply all filters including the new tab value
//       let filtered = [...products];
//       if (newValue !== "all") {
//         filtered = filtered.filter((product) => product.category === newValue);
//       }
//       if (updatedFilters.category.length > 0) {
//         filtered = filtered.filter((product) => updatedFilters.category.includes(product.category));
//       }
//       if (updatedFilters.company.length > 0) {
//         filtered = filtered.filter((product) => updatedFilters.company.includes(product.company_name));
//       }
//       filtered = filtered.filter(
//         (product) =>
//           product.price >= updatedFilters.priceRange.min && product.price <= updatedFilters.priceRange.max
//       );

//       // Apply sorting if sortOption exists
//       if (sortOption === "priceLowToHigh") {
//         filtered.sort((a, b) => a.price - b.price);
//       } else if (sortOption === "priceHighToLow") {
//         filtered.sort((a, b) => b.price - b.price);
//       }

//       setFilteredProducts(filtered);
//       return updatedFilters;
//     });
//   };

//   const isInWishlist = (productId) => {
//     return wishlistItems.some((item) => item.id === productId);
//   };

//   const handleAddToCartWithVerification = (product) => {
//     if (product.category === "renting" && verificationStatus !== "verified") {
//       setSnackbarOpen(true);
//       navigate("/upload-kyc");
//       return;
//     }
//     handleAddToCart({ ...product, quantity });
//     setModalOpen(false);
//   };

//   const handleBuyOrRentNow = (product) => {
//     if (product.category === "renting" && verificationStatus !== "verified") {
//       setSnackbarOpen(true);
//       navigate("/upload-kyc");
//       return;
//     }
//     const buyingItems = product.category === "selling"
//       ? [{ product_id: product.id, ...product, quantity }]
//       : [];
//     const rentingItems = product.category === "renting"
//       ? [{ product_id: product.id, ...product, quantity }]
//       : [];
//     const cartTotal = product.category === "selling"
//       ? parseFloat(product.price) * quantity
//       : 0;

//     navigate("/checkout", { state: { buyingItems, rentingItems, cartTotal } });
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleCardClick = (product) => {
//     setSelectedProduct(product);
//     setQuantity(1);
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//     setSelectedProduct(null);
//   };

//   const handleQuantityChange = (event) => {
//     const value = Math.max(1, Number(event.target.value));
//     setQuantity(value);
//   };

//   const calculateDiscountedPrice = (price, discountPercentage) => {
//     const originalPrice = parseFloat(price);
//     const discount = parseFloat(discountPercentage);
//     return (originalPrice - (originalPrice * (discount / 100))).toFixed(2);
//   };

//   const uniqueCompanies = [...new Set(products.map((product) => product.company_name))];
//   const categoryOptions = ["renting", "selling"];

//   return (
//     <Box sx={{ py: 2 }}>
//       {isViewAll && (
//         <Box sx={{ display: "flex", gap: 3 }}>
//           <Box sx={{ width: "280px", p: 3, bgcolor: "#ffffff", borderRadius: 2, boxShadow: 1 }}>
//             <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#1a237e" }}>
//               Filters
//             </Typography>
//             <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
//               Category
//             </Typography>
//             <FormGroup>
//               {categoryOptions.map((cat) => (
//                 <FormControlLabel
//                   key={cat}
//                   control={
//                     <Checkbox
//                       checked={filters.category.includes(cat)}
//                       onChange={() => handleFilterChange("category", cat)}
//                       sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }}
//                     />
//                   }
//                   label={cat === "renting" ? "Rent" : "Buy"}
//                   sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.9rem" } }}
//                 />
//               ))}
//             </FormGroup>
//             <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
//               Company
//             </Typography>
//             <FormGroup>
//               {uniqueCompanies.map((company) => (
//                 <FormControlLabel
//                   key={company}
//                   control={
//                     <Checkbox
//                       checked={filters.company.includes(company)}
//                       onChange={() => handleFilterChange("company", company)}
//                       sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }}
//                     />
//                   }
//                   label={company}
//                   sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.9rem" } }}
//                 />
//               ))}
//             </FormGroup>
//             <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
//               Price Range
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//               <input
//                 type="range"
//                 min="0"
//                 max="10000"
//                 value={filters.priceRange.min}
//                 onChange={(e) =>
//                   handleFilterChange("priceRange", {
//                     ...filters.priceRange,
//                     min: Number(e.target.value),
//                   })
//                 }
//                 style={{ accentColor: "#1976d2" }}
//               />
//               <input
//                 type="range"
//                 min="0"
//                 max="10000"
//                 value={filters.priceRange.max}
//                 onChange={(e) =>
//                   handleFilterChange("priceRange", {
//                     ...filters.priceRange,
//                     max: Number(e.target.value),
//                   })
//                 }
//                 style={{ accentColor: "#1976d2" }}
//               />
//               <Typography sx={{ color: "#546e7a" }}>
//                 Rs. {filters.priceRange.min} - Rs. {filters.priceRange.max}
//               </Typography>
//             </Box>
//           </Box>
//           <Box sx={{ flex: 1 }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//               <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
//                 All Products
//               </Typography>
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <Tabs
//                   value={tabValue}
//                   onChange={handleTabChange}
//                   sx={{
//                     "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
//                     "& .Mui-selected": { color: "#1976d2" },
//                   }}
//                 >
//                   <Tab label="All" value="all" />
//                   <Tab label="Rent" value="renting" />
//                   <Tab label="Buy" value="selling" />
//                 </Tabs>
//                 <Select
//                   value={sortOption}
//                   onChange={handleSortChange}
//                   displayEmpty
//                   sx={{
//                     minWidth: "150px",
//                     bgcolor: "#ffffff",
//                     borderRadius: 2,
//                     boxShadow: 1,
//                   }}
//                 >
//                   <MenuItem value="">Sort by</MenuItem>
//                   <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
//                   <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
//                 </Select>
//               </Box>
//             </Box>
//             <Grid container spacing={3}>
//               {filteredProducts.map((product) => (
//                 <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//                   <Card
//                     sx={{
//                       borderRadius: 3,
//                       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                       bgcolor: "#ffffff",
//                       transition: "transform 0.3s, box-shadow 0.3s",
//                       "&:hover": {
//                         transform: "translateY(-8px)",
//                         boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
//                       },
//                     }}
//                     onClick={() => handleCardClick(product)}
//                   >
//                     <CardContent sx={{ p: 3, position: "relative" }}>
//                       <Box sx={{ position: "relative", mb: 2 }}>
//                         <Box
//                           sx={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             bgcolor: product.category === "renting" ? "#d32f2f" : "#1976d2",
//                             color: "#ffffff",
//                             px: 1,
//                             py: 0.5,
//                             borderRadius: "0 0 8px 0",
//                             fontSize: "0.8rem",
//                             fontWeight: 600,
//                             textTransform: "uppercase",
//                           }}
//                         >
//                           {product.category === "renting" ? "Rent" : "Buy"}
//                         </Box>
//                         <Box
//                           sx={{
//                             position: "absolute",
//                             top: 10,
//                             right: 10,
//                             display: "flex",
//                             gap: 1,
//                           }}
//                         >
//                           <IconButton
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleWishlistToggle(product);
//                             }}
//                             sx={{
//                               "&:hover": { bgcolor: "transparent" },
//                             }}
//                           >
//                             <Favorite
//                               sx={{ color: isInWishlist(product.id) ? "#d32f2f" : "#757575" }}
//                             />
//                           </IconButton>
//                           <IconButton
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleAddToCartWithVerification(product);
//                             }}
//                             sx={{
//                               "&:hover": { bgcolor: "transparent" },
//                             }}
//                           >
//                             <ShoppingCart sx={{ color: "#757575" }} />
//                           </IconButton>
//                         </Box>
//                         <img
//                           src={
//                             product.image
//                               ? `http://127.0.0.1:8000${product.image}`
//                               : "https://via.placeholder.com/150"
//                           }
//                           alt={product.title}
//                           style={{ width: "100%", height: "150px", objectFit: "contain" }}
//                         />
//                       </Box>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ fontWeight: 700, color: "#000000", mb: 1 }}
//                       >
//                         {product.title}
//                       </Typography>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//                         {product.discount_percentage && parseFloat(product.discount_percentage) > 0 ? (
//                           <>
//                             <Typography
//                               variant="body2"
//                               sx={{ color: "#78909c", textDecoration: "line-through" }}
//                             >
//                               Rs. {product.price}
//                             </Typography>
//                             <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
//                               Rs. {calculateDiscountedPrice(product.price, product.discount_percentage)}
//                             </Typography>
//                           </>
//                         ) : (
//                           <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
//                             Rs. {product.price}
//                           </Typography>
//                         )}
//                       </Box>
//                       {product.discount_percentage && parseFloat(product.discount_percentage) > 0 && (
//                         <Box
//                           sx={{
//                             display: "inline-block",
//                             bgcolor: "#d32f2f",
//                             color: "#ffffff",
//                             px: 1,
//                             py: 0.5,
//                             borderRadius: 2,
//                             fontSize: "0.8rem",
//                             fontWeight: 600,
//                             mb: 1,
//                           }}
//                         >
//                           {product.discount_percentage}% OFF
//                         </Box>
//                       )}
//                       {product.category === "renting" && (
//                         <Typography variant="body2" sx={{ color: "#546e7a", mb: 1 }}>
//                           Per Day Rent: Rs. {product.per_day_rent}
//                         </Typography>
//                       )}
//                       <Typography variant="body2" sx={{ color: "#546e7a" }}>
//                         Company: {product.company_name || "N/A"}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         </Box>
//       )}
//       {!isViewAll && (
//         <Grid container spacing={3}>
//           {products.slice(0, isFeatured ? 5 : undefined).map((product) => (
//             <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
//               <Card
//                 sx={{
//                   borderRadius: 3,
//                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                   bgcolor: "#ffffff",
//                   transition: "transform 0.3s, box-shadow 0.3s",
//                   "&:hover": {
//                     transform: "translateY(-8px)",
//                     boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
//                   },
//                 }}
//                 onClick={() => handleCardClick(product)}
//               >
//                 <CardContent sx={{ p: 3, position: "relative" }}>
//                   <Box sx={{ position: "relative", mb: 2 }}>
//                     <Box
//                       sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         bgcolor: product.category === "renting" ? "#d32f2f" : "#1976d2",
//                         color: "#ffffff",
//                         px: 1,
//                         py: 0.5,
//                         borderRadius: "0 0 8px 0",
//                         fontSize: "0.8rem",
//                         fontWeight: 600,
//                         textTransform: "uppercase",
//                       }}
//                     >
//                       {product.category === "renting" ? "Rent" : "Buy"}
//                     </Box>
//                     <Box
//                       sx={{
//                         position: "absolute",
//                         top: 10,
//                         right: 10,
//                         display: "flex",
//                         gap: 1,
//                       }}
//                     >
//                       <IconButton
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleWishlistToggle(product);
//                         }}
//                         sx={{
//                           "&:hover": { bgcolor: "transparent" },
//                         }}
//                       >
//                         <Favorite
//                           sx={{ color: isInWishlist(product.id) ? "#d32f2f" : "#757575" }}
//                         />
//                       </IconButton>
//                       <IconButton
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleAddToCartWithVerification(product);
//                         }}
//                         sx={{
//                           "&:hover": { bgcolor: "transparent" },
//                         }}
//                       >
//                         <ShoppingCart sx={{ color: "#757575" }} />
//                       </IconButton>
//                     </Box>
//                     <img
//                       src={
//                         product.image
//                           ? `http://127.0.0.1:8000${product.image}`
//                           : "https://via.placeholder.com/150"
//                       }
//                       alt={product.title}
//                       style={{ width: "100%", height: "150px", objectFit: "contain" }}
//                     />
//                   </Box>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{ fontWeight: 700, color: "#000000", mb: 1 }}
//                   >
//                     {product.title}
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//                     {product.discount_percentage && parseFloat(product.discount_percentage) > 0 ? (
//                       <>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: "#78909c", textDecoration: "line-through" }}
//                         >
//                           Rs. {product.price}
//                         </Typography>
//                         <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
//                           Rs. {calculateDiscountedPrice(product.price, product.discount_percentage)}
//                         </Typography>
//                       </>
//                     ) : (
//                       <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
//                         Rs. {product.price}
//                       </Typography>
//                     )}
//                   </Box>
//                   {product.discount_percentage && parseFloat(product.discount_percentage) > 0 && (
//                     <Box
//                       sx={{
//                         display: "inline-block",
//                         bgcolor: "#d32f2f",
//                         color: "#ffffff",
//                         px: 1,
//                         py: 0.5,
//                         borderRadius: 2,
//                         fontSize: "0.8rem",
//                         fontWeight: 600,
//                         mb: 1,
//                       }}
//                     >
//                       {product.discount_percentage}% OFF
//                     </Box>
//                   )}
//                   {product.category === "renting" && (
//                     <Typography variant="body2" sx={{ color: "#546e7a", mb: 1 }}>
//                       Per Day Rent: Rs. {product.per_day_rent}
//                     </Typography>
//                   )}
//                   <Typography variant="body2" sx={{ color: "#546e7a" }}>
//                     Company: {product.company_name || "N/A"}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//       <Modal
//         open={modalOpen}
//         onClose={handleModalClose}
//         aria-labelledby="product-modal-title"
//         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//       >
//         <Box
//           sx={{
//             backgroundColor: "#ffffff",
//             borderRadius: 3,
//             boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
//             p: 4,
//             width: { xs: "90%", sm: "70%", md: "50%" },
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           {selectedProduct && (
//             <>
//               <Typography
//                 id="product-modal-title"
//                 variant="h5"
//                 sx={{ fontWeight: 700, color: "#1a237e", mb: 3 }}
//               >
//                 {selectedProduct.title}
//               </Typography>
//               <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
//                 <Box sx={{ flex: 1 }}>
//                   <img
//                     src={
//                       selectedProduct.image
//                         ? `http://127.0.0.1:8000${selectedProduct.image}`
//                         : "https://via.placeholder.com/300"
//                     }
//                     alt={selectedProduct.title}
//                     style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain", borderRadius: 2 }}
//                   />
//                 </Box>
//                 <Box sx={{ flex: 1 }}>
//                   <Typography variant="body1" sx={{ color: "#546e7a", mb: 3 }}>
//                     {selectedProduct.description || "No description available."}
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//                     {selectedProduct.discount_percentage && parseFloat(selectedProduct.discount_percentage) > 0 ? (
//                       <>
//                         <Typography
//                           variant="h6"
//                           sx={{ color: "#78909c", textDecoration: "line-through" }}
//                         >
//                           Rs. {selectedProduct.price}
//                         </Typography>
//                         <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 700 }}>
//                           Rs. {calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount_percentage)}
//                         </Typography>
//                       </>
//                     ) : (
//                       <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 700 }}>
//                         Rs. {selectedProduct.price}
//                       </Typography>
//                     )}
//                   </Box>
//                   {selectedProduct.discount_percentage && parseFloat(selectedProduct.discount_percentage) > 0 && (
//                     <Box
//                       sx={{
//                         display: "inline-block",
//                         bgcolor: "#d32f2f",
//                         color: "#ffffff",
//                         px: 1.5,
//                         py: 0.5,
//                         borderRadius: 2,
//                         fontSize: "0.8rem",
//                         fontWeight: 600,
//                         mb: 2,
//                       }}
//                     >
//                       {selectedProduct.discount_percentage}% OFF
//                     </Box>
//                   )}
//                   {selectedProduct.category === "renting" && (
//                     <Typography variant="body2" sx={{ color: "#546e7a", mb: 2 }}>
//                       Per Day Rent: Rs. {selectedProduct.per_day_rent}
//                     </Typography>
//                   )}
//                   <Typography variant="body2" sx={{ color: "#546e7a", mb: 3 }}>
//                     Company: {selectedProduct.company_name || "N/A"}
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
//                     <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                       Quantity:
//                     </Typography>
//                     <TextField
//                       type="number"
//                       value={quantity}
//                       onChange={handleQuantityChange}
//                       inputProps={{ min: 1 }}
//                       sx={{ width: "80px", "& input": { textAlign: "center" } }}
//                     />
//                   </Box>
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleBuyOrRentNow(selectedProduct)}
//                       sx={{
//                         flex: 1,
//                         borderRadius: 2,
//                         textTransform: "uppercase",
//                         py: 1.5,
//                         bgcolor: "#1976d2",
//                         "&:hover": { bgcolor: "#1565c0" },
//                       }}
//                     >
//                       {selectedProduct.category === "renting" ? "Rent Now" : "Buy Now"}
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       onClick={() => handleAddToCartWithVerification(selectedProduct)}
//                       startIcon={<ShoppingCart />}
//                       sx={{
//                         flex: 1,
//                         borderRadius: 2,
//                         textTransform: "uppercase",
//                         py: 1.5,
//                         borderColor: "#1976d2",
//                         color: "#1976d2",
//                         "&:hover": { borderColor: "#1565c0", color: "#1565c0" },
//                       }}
//                     >
//                       Add to Cart
//                     </Button>
//                   </Box>
//                 </Box>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>
//       <Snackbar
//         open={snackbarOpen}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         sx={{
//           "& .MuiSnackbarContent-root": {
//             bgcolor: "#1976d2",
//             color: "#ffffff",
//             borderRadius: 2,
//             p: 2,
//           },
//         }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity="warning"
//           action={
//             <Button
//               color="inherit"
//               size="small"
//               onClick={handleSnackbarClose}
//               sx={{
//                 color: "#ffffff",
//                 bgcolor: "#1565c0",
//                 borderRadius: 20,
//                 px: 2,
//                 "&:hover": { bgcolor: "#0d47a1" },
//               }}
//             >
//               OK
//             </Button>
//           }
//           sx={{ width: "100%", bgcolor: "transparent", boxShadow: "none" }}
//         >
//           You need to verify your profile to rent items.
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default CDProduct;
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  Button,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import Footer from "../pages/footer"; // Importing the Footer component

const CDProduct = ({ handleWishlistToggle, handleAddToCart, wishlistItems = [], isFeatured }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [tabValue, setTabValue] = useState("all");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [filters, setFilters] = useState({
    category: [],
    company: [],
    priceRange: { min: 0, max: 100000 },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isViewAll = location.pathname === "/all-products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/api/products/");
        const shuffledProducts = response.data.sort(() => Math.random() - 0.5);
        setProducts(shuffledProducts);
        setFilteredProducts(shuffledProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchVerificationStatus = async () => {
      try {
        const response = await API.get("/api/rent-verification/user/");
        setVerificationStatus(response.data.status);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setVerificationStatus("not_found");
        } else {
          console.error("Error fetching verification status:", error);
        }
      }
    };

    fetchProducts();
    fetchVerificationStatus();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      let updatedFilters;
      if (filterType === "priceRange") {
        updatedFilters = { ...prev, priceRange: value };
      } else {
        const updatedFilter = prev[filterType].includes(value)
          ? prev[filterType].filter((item) => item !== value)
          : [...prev[filterType], value];
        updatedFilters = { ...prev, [filterType]: updatedFilter };
      }

      // Apply all filters
      let filtered = [...products];
      if (updatedFilters.category.length > 0) {
        filtered = filtered.filter((product) => updatedFilters.category.includes(product.category));
      }
      if (updatedFilters.tabValue && updatedFilters.tabValue !== "all") {
        filtered = filtered.filter((product) => product.category === updatedFilters.tabValue);
      }
      if (updatedFilters.company.length > 0) {
        filtered = filtered.filter((product) => updatedFilters.company.includes(product.company_name));
      }
      filtered = filtered.filter(
        (product) =>
          product.price >= updatedFilters.priceRange.min && product.price <= updatedFilters.priceRange.max
      );

      // Apply sorting if sortOption exists
      if (sortOption === "priceLowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === "priceHighToLow") {
        filtered.sort((a, b) => b.price - b.price);
      }

      setFilteredProducts(filtered);
      return updatedFilters;
    });
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedProducts = [...filteredProducts];
    if (option === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.price - b.price);
    }
    setFilteredProducts(sortedProducts);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setFilters((prev) => {
      const updatedFilters = { ...prev, tabValue: newValue };

      // Apply all filters including the new tab value
      let filtered = [...products];
      if (newValue !== "all") {
        filtered = filtered.filter((product) => product.category === newValue);
      }
      if (updatedFilters.category.length > 0) {
        filtered = filtered.filter((product) => updatedFilters.category.includes(product.category));
      }
      if (updatedFilters.company.length > 0) {
        filtered = filtered.filter((product) => updatedFilters.company.includes(product.company_name));
      }
      filtered = filtered.filter(
        (product) =>
          product.price >= updatedFilters.priceRange.min && product.price <= updatedFilters.priceRange.max
      );

      // Apply sorting if sortOption exists
      if (sortOption === "priceLowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === "priceHighToLow") {
        filtered.sort((a, b) => b.price - b.price);
      }

      setFilteredProducts(filtered);
      return updatedFilters;
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const handleAddToCartWithVerification = (product) => {
    if (product.category === "renting" && verificationStatus !== "verified") {
      setSnackbarOpen(true);
      navigate("/upload-kyc");
      return;
    }
    handleAddToCart({ ...product, quantity });
    setModalOpen(false);
  };

  const handleBuyOrRentNow = (product) => {
    if (product.category === "renting" && verificationStatus !== "verified") {
      setSnackbarOpen(true);
      navigate("/upload-kyc");
      return;
    }
    const buyingItems = product.category === "selling"
      ? [{ product_id: product.id, ...product, quantity }]
      : [];
    const rentingItems = product.category === "renting"
      ? [{ product_id: product.id, ...product, quantity }]
      : [];
    const cartTotal = product.category === "selling"
      ? parseFloat(product.price) * quantity
      : 0;

    navigate("/checkout", { state: { buyingItems, rentingItems, cartTotal } });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (event) => {
    const value = Math.max(1, Number(event.target.value));
    setQuantity(value);
  };

  const calculateDiscountedPrice = (price, discountPercentage) => {
    const originalPrice = parseFloat(price);
    const discount = parseFloat(discountPercentage);
    return (originalPrice - (originalPrice * (discount / 100))).toFixed(2);
  };

  const uniqueCompanies = [...new Set(products.map((product) => product.company_name))];
  const categoryOptions = ["renting", "selling"];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // Apply minHeight only when isViewAll is true (second dashboard)
        ...(isViewAll ? { minHeight: "100vh" } : {}),
      }}
    >
      <Box sx={{ py: 2, ...(isViewAll ? { flexGrow: 1 } : {}) }}>
        {isViewAll && (
          <Box sx={{ display: "flex", gap: 3 }}>
            <Box sx={{ width: "280px", p: 3, bgcolor: "#ffffff", borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#1a237e" }}>
                Filters
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Category
              </Typography>
              <FormGroup>
                {categoryOptions.map((cat) => (
                  <FormControlLabel
                    key={cat}
                    control={
                      <Checkbox
                        checked={filters.category.includes(cat)}
                        onChange={() => handleFilterChange("category", cat)}
                        sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }}
                      />
                    }
                    label={cat === "renting" ? "Rent" : "Buy"}
                    sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.9rem" } }}
                  />
                ))}
              </FormGroup>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
                Company
              </Typography>
              <FormGroup>
                {uniqueCompanies.map((company) => (
                  <FormControlLabel
                    key={company}
                    control={
                      <Checkbox
                        checked={filters.company.includes(company)}
                        onChange={() => handleFilterChange("company", company)}
                        sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }}
                      />
                    }
                    label={company}
                    sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.9rem" } }}
                  />
                ))}
              </FormGroup>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
                Price Range
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.priceRange.min}
                  onChange={(e) =>
                    handleFilterChange("priceRange", {
                      ...filters.priceRange,
                      min: Number(e.target.value),
                    })
                  }
                  style={{ accentColor: "#1976d2" }}
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.priceRange.max}
                  onChange={(e) =>
                    handleFilterChange("priceRange", {
                      ...filters.priceRange,
                      max: Number(e.target.value),
                    })
                  }
                  style={{ accentColor: "#1976d2" }}
                />
                <Typography sx={{ color: "#546e7a" }}>
                  Rs. {filters.priceRange.min} - Rs. {filters.priceRange.max}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
                  All Products
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                      "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
                      "& .Mui-selected": { color: "#1976d2" },
                    }}
                  >
                    <Tab label="All" value="all" />
                    <Tab label="Rent" value="renting" />
                    <Tab label="Buy" value="selling" />
                  </Tabs>
                  <Select
                    value={sortOption}
                    onChange={handleSortChange}
                    displayEmpty
                    sx={{
                      minWidth: "150px",
                      bgcolor: "#ffffff",
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <MenuItem value="">Sort by</MenuItem>
                    <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                    <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                  </Select>
                </Box>
              </Box>
              <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        bgcolor: "#ffffff",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                        },
                      }}
                      onClick={() => handleCardClick(product)}
                    >
                      <CardContent sx={{ p: 3, position: "relative" }}>
                        <Box sx={{ position: "relative", mb: 2 }}>
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              bgcolor: product.category === "renting" ? "#d32f2f" : "#1976d2",
                              color: "#ffffff",
                              px: 1,
                              py: 0.5,
                              borderRadius: "0 0 8px 0",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              textTransform: "uppercase",
                            }}
                          >
                            {product.category === "renting" ? "Rent" : "Buy"}
                          </Box>
                          <Box
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              display: "flex",
                              gap: 1,
                            }}
                          >
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleWishlistToggle(product);
                              }}
                              sx={{
                                "&:hover": { bgcolor: "transparent" },
                              }}
                            >
                              <Favorite
                                sx={{ color: isInWishlist(product.id) ? "#d32f2f" : "#757575" }}
                              />
                            </IconButton>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCartWithVerification(product);
                              }}
                              sx={{
                                "&:hover": { bgcolor: "transparent" },
                              }}
                            >
                              <ShoppingCart sx={{ color: "#757575" }} />
                            </IconButton>
                          </Box>
                          <img
                            src={
                              product.image
                                ? `http://127.0.0.1:8000${product.image}`
                                : "https://via.placeholder.com/150"
                            }
                            alt={product.title}
                            style={{ width: "100%", height: "150px", objectFit: "contain" }}
                          />
                        </Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, color: "#000000", mb: 1 }}
                        >
                          {product.title}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          {product.discount_percentage && parseFloat(product.discount_percentage) > 0 ? (
                            <>
                              <Typography
                                variant="body2"
                                sx={{ color: "#78909c", textDecoration: "line-through" }}
                              >
                                Rs. {product.price}
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
                                Rs. {calculateDiscountedPrice(product.price, product.discount_percentage)}
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
                              Rs. {product.price}
                            </Typography>
                          )}
                        </Box>
                        {product.discount_percentage && parseFloat(product.discount_percentage) > 0 && (
                          <Box
                            sx={{
                              display: "inline-block",
                              bgcolor: "#d32f2f",
                              color: "#ffffff",
                              px: 1,
                              py: 0.5,
                              borderRadius: 2,
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              mb: 1,
                            }}
                          >
                            {product.discount_percentage}% OFF
                          </Box>
                        )}
                        {product.category === "renting" && (
                          <Typography variant="body2" sx={{ color: "#546e7a", mb: 1 }}>
                            Per Day Rent: Rs. {product.per_day_rent}
                          </Typography>
                        )}
                        <Typography variant="body2" sx={{ color: "#546e7a" }}>
                          Company: {product.company_name || "N/A"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}
        {!isViewAll && (
          <Grid container spacing={3}>
            {products.slice(0, isFeatured ? 5 : undefined).map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    bgcolor: "#ffffff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    },
                  }}
                  onClick={() => handleCardClick(product)}
                >
                  <CardContent sx={{ p: 3, position: "relative" }}>
                    <Box sx={{ position: "relative", mb: 2 }}>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          bgcolor: product.category === "renting" ? "#d32f2f" : "#1976d2",
                          color: "#ffffff",
                          px: 1,
                          py: 0.5,
                          borderRadius: "0 0 8px 0",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        {product.category === "renting" ? "Rent" : "Buy"}
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWishlistToggle(product);
                          }}
                          sx={{
                            "&:hover": { bgcolor: "transparent" },
                          }}
                        >
                          <Favorite
                            sx={{ color: isInWishlist(product.id) ? "#d32f2f" : "#757575" }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCartWithVerification(product);
                          }}
                          sx={{
                            "&:hover": { bgcolor: "transparent" },
                          }}
                        >
                          <ShoppingCart sx={{ color: "#757575" }} />
                        </IconButton>
                      </Box>
                      <img
                        src={
                          product.image
                            ? `http://127.0.0.1:8000${product.image}`
                            : "https://via.placeholder.com/150"
                        }
                        alt={product.title}
                        style={{ width: "100%", height: "150px", objectFit: "contain" }}
                      />
                    </Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, color: "#000000", mb: 1 }}
                    >
                      {product.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      {product.discount_percentage && parseFloat(product.discount_percentage) > 0 ? (
                        <>
                          <Typography
                            variant="body2"
                            sx={{ color: "#78909c", textDecoration: "line-through" }}
                          >
                            Rs. {product.price}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
                            Rs. {calculateDiscountedPrice(product.price, product.discount_percentage)}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
                          Rs. {product.price}
                        </Typography>
                      )}
                    </Box>
                    {product.discount_percentage && parseFloat(product.discount_percentage) > 0 && (
                      <Box
                        sx={{
                          display: "inline-block",
                          bgcolor: "#d32f2f",
                          color: "#ffffff",
                          px: 1,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {product.discount_percentage}% OFF
                      </Box>
                    )}
                    {product.category === "renting" && (
                      <Typography variant="body2" sx={{ color: "#546e7a", mb: 1 }}>
                        Per Day Rent: Rs. {product.per_day_rent}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ color: "#546e7a" }}>
                      Company: {product.company_name || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="product-modal-title"
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              p: 4,
              width: { xs: "90%", sm: "70%", md: "50%" },
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {selectedProduct && (
              <>
                <Typography
                  id="product-modal-title"
                  variant="h5"
                  sx={{ fontWeight: 700, color: "#1a237e", mb: 3 }}
                >
                  {selectedProduct.title}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
                  <Box sx={{ flex: 1 }}>
                    <img
                      src={
                        selectedProduct.image
                          ? `http://127.0.0.1:8000${selectedProduct.image}`
                          : "https://via.placeholder.com/300"
                      }
                      alt={selectedProduct.title}
                      style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain", borderRadius: 2 }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ color: "#546e7a", mb: 3 }}>
                      {selectedProduct.description || "No description available."}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      {selectedProduct.discount_percentage && parseFloat(selectedProduct.discount_percentage) > 0 ? (
                        <>
                          <Typography
                            variant="h6"
                            sx={{ color: "#78909c", textDecoration: "line-through" }}
                          >
                            Rs. {selectedProduct.price}
                          </Typography>
                          <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 700 }}>
                            Rs. {calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount_percentage)}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 700 }}>
                          Rs. {selectedProduct.price}
                        </Typography>
                      )}
                    </Box>
                    {selectedProduct.discount_percentage && parseFloat(selectedProduct.discount_percentage) > 0 && (
                      <Box
                        sx={{
                          display: "inline-block",
                          bgcolor: "#d32f2f",
                          color: "#ffffff",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        {selectedProduct.discount_percentage}% OFF
                      </Box>
                    )}
                    {selectedProduct.category === "renting" && (
                      <Typography variant="body2" sx={{ color: "#546e7a", mb: 2 }}>
                        Per Day Rent: Rs. {selectedProduct.per_day_rent}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ color: "#546e7a", mb: 3 }}>
                      Company: {selectedProduct.company_name || "N/A"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Quantity:
                      </Typography>
                      <TextField
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        inputProps={{ min: 1 }}
                        sx={{ width: "80px", "& input": { textAlign: "center" } }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleBuyOrRentNow(selectedProduct)}
                        sx={{
                          flex: 1,
                          borderRadius: 2,
                          textTransform: "uppercase",
                          py: 1.5,
                          bgcolor: "#1976d2",
                          "&:hover": { bgcolor: "#1565c0" },
                        }}
                      >
                        {selectedProduct.category === "renting" ? "Rent Now" : "Buy Now"}
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleAddToCartWithVerification(selectedProduct)}
                        startIcon={<ShoppingCart />}
                        sx={{
                          flex: 1,
                          borderRadius: 2,
                          textTransform: "uppercase",
                          py: 1.5,
                          borderColor: "#1976d2",
                          color: "#1976d2",
                          "&:hover": { borderColor: "#1565c0", color: "#1565c0" },
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Modal>
        <Snackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            "& .MuiSnackbarContent-root": {
              bgcolor: "#1976d2",
              color: "#ffffff",
              borderRadius: 2,
              p: 2,
              mt:'60px'
            },
            
          }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="warning"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={handleSnackbarClose}
                sx={{
                  color: "#ffffff",
                  bgcolor: "#1565c0",
                  borderRadius: 20,
                  px: 2,
                  "&:hover": { bgcolor: "#0d47a1" },
                }}
              >
                OK
              </Button>
            }
            sx={{ width: "100%", bgcolor: "transparent", boxShadow: "none" }}
          >
            You need to verify your profile to rent items.
          </Alert>
        </Snackbar>
      </Box>
      {/* Add Footer only on the /all-products route and position it at the bottom */}
      {isViewAll && (
        <Box sx={{ mt: "auto" }}>
          <Footer />
        </Box>
      )}
    </Box>
  );
};

export default CDProduct;