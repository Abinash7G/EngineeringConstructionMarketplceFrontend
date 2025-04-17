// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
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
// } from "@mui/material";
// import { ShoppingCart, Favorite } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// const CDProduct = ({ handleWishlistToggle, handleAddToCart, wishlistItems = [] }) => {
//   const [products, setProducts] = useState([]);
//   const [sortOption, setSortOption] = useState("");
//   const [tabValue, setTabValue] = useState("all");
//   const [verificationStatus, setVerificationStatus] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await API.get("/api/products/");
//         setProducts(response.data);
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

//   const categoryLabels = {
//     renting: "Rent",
//     selling: "Buy",
//   };

//   const handleSortChange = (event) => {
//     const option = event.target.value;
//     setSortOption(option);

//     let sortedProducts = [...products];
//     if (option === "priceLowToHigh") {
//       sortedProducts.sort((a, b) => a.price - b.price);
//     } else if (option === "priceHighToLow") {
//       sortedProducts.sort((_a, b) => b.price - b.price);
//     }
//     setProducts(sortedProducts);
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const filteredProducts = products.filter((product) => {
//     if (tabValue === "all") return true;
//     return product.category === tabValue;
//   });

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
//     const buyingItems = product.category === "selling" ? [{ ...product, quantity }] : [];
//     const rentingItems = product.category === "renting" ? [{ ...product, quantity }] : [];
//     const cartTotal = product.category === "selling" ? parseFloat(product.price) * quantity : 0;

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

//   return (
//     <Box sx={{ padding: "40px" }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "30px",
//         }}
//       >
//         <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
//           Products
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <Tabs value={tabValue} onChange={handleTabChange}>
//             <Tab label="All" value="all" />
//             <Tab label="Rent" value="renting" />
//             <Tab label="Buy" value="selling" />
//           </Tabs>
//           <Select
//             value={sortOption}
//             onChange={handleSortChange}
//             displayEmpty
//             sx={{ minWidth: "150px", backgroundColor: "background.paper" }}
//           >
//             <MenuItem value="">Sort by</MenuItem>
//             <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
//             <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
//           </Select>
//         </Box>
//       </Box>

//       <Grid container spacing={4}>
//         {filteredProducts.map((product) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//             <Card
//               onClick={() => handleCardClick(product)}
//               sx={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 position: "relative",
//                 borderRadius: "12px",
//                 boxShadow: 3,
//                 transition: "transform 0.3s, box-shadow 0.3s",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   boxShadow: 6,
//                 },
//                 cursor: "pointer",
//               }}
//             >
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   backgroundColor: product.category === "renting" ? "error.main" : "primary.main",
//                   color: "white",
//                   padding: "6px 12px",
//                   fontSize: "14px",
//                   fontWeight: "bold",
//                   borderRadius: "0 0 12px 0",
//                 }}
//               >
//                 {categoryLabels[product.category] || "Unknown"}
//               </Box>

//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: "10px",
//                   right: "10px",
//                   zIndex: 1,
//                   display: "flex",
//                   gap: "8px",
//                 }}
//               >
//                 <IconButton
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleWishlistToggle(product);
//                   }}
//                   sx={{
//                     backgroundColor: "white",
//                     "&:hover": { backgroundColor: "grey.100" },
//                   }}
//                 >
//                   <Favorite color={isInWishlist(product.id) ? "error" : "action"} />
//                 </IconButton>
//                 <IconButton
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleAddToCartWithVerification(product);
//                   }}
//                   sx={{
//                     backgroundColor: "white",
//                     "&:hover": { backgroundColor: "grey.100" },
//                   }}
//                 >
//                   <ShoppingCart color="primary" />
//                 </IconButton>
//               </Box>

//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={
//                   product.image
//                     ? `http://127.0.0.1:8000${product.image}`
//                     : "https://via.placeholder.com/200"
//                 }
//                 alt={product.title}
//                 sx={{ objectFit: "contain", borderBottom: "1px solid grey.300" }}
//               />

//               <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
//                 <Typography variant="h6" component="div" sx={{ color: "primary", fontWeight: "bold", mb: 1 }}>
//                   {product.title}
//                 </Typography>
//                 <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
//                   Rs. {product.price}
//                 </Typography>
//                 {product.category === "renting" && (
//                   <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                     Per Day Rent: Rs. {product.per_day_rent}
//                   </Typography>
//                 )}
//                 <Typography variant="body2" color="text.secondary">
//                   Company: {product.company_name || "N/A"}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Modal
//         open={modalOpen}
//         onClose={handleModalClose}
//         aria-labelledby="product-modal-title"
//         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//       >
//         <Box
//           sx={{
//             backgroundColor: "white",
//             borderRadius: "12px",
//             boxShadow: 24,
//             padding: "24px",
//             width: { xs: "90%", sm: "70%", md: "50%" },
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           {selectedProduct && (
//             <>
//               <Typography id="product-modal-title" variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//                 {selectedProduct.title}
//               </Typography>
//               <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
//                 <Box sx={{ flex: 1 }}>
//                   <img
//                     src={
//                       selectedProduct.image
//                         ? `http://127.0.0.1:8000${selectedProduct.image}`
//                         : "https://via.placeholder.com/300"
//                     }
//                     alt={selectedProduct.title}
//                     style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain" }}
//                   />
//                 </Box>
//                 <Box sx={{ flex: 1 }}>
//                   <Typography variant="body1" sx={{ mb: 2 }}>
//                     {selectedProduct.description || "No description available."}
//                   </Typography>
//                   <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
//                     Rs. {selectedProduct.price}
//                   </Typography>
//                   {selectedProduct.category === "renting" && (
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                       Per Day Rent: Rs. {selectedProduct.per_day_rent}
//                     </Typography>
//                   )}
//                   <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                     Company: {selectedProduct.company_name || "N/A"}
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//                     <Typography variant="body1">Quantity:</Typography>
//                     <TextField
//                       type="number"
//                       value={quantity}
//                       onChange={handleQuantityChange}
//                       inputProps={{ min: 1 }}
//                       sx={{ width: "80px" }}
//                     />
//                   </Box>
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleBuyOrRentNow(selectedProduct)}
//                       sx={{ flex: 1 }}
//                     >
//                       {selectedProduct.category === "renting" ? "Rent Now" : "Buy Now"}
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       onClick={() => handleAddToCartWithVerification(selectedProduct)}
//                       startIcon={<ShoppingCart />}
//                       sx={{ flex: 1 }}
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
//             backgroundColor: "#007bff",
//             color: "white",
//             borderRadius: "8px",
//             padding: "10px 20px",
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
//                 color: "white",
//                 backgroundColor: "#007bff",
//                 borderRadius: "20px",
//                 padding: "5px 15px",
//                 "&:hover": { backgroundColor: "#0056b3" },
//               }}
//             >
//               OK
//             </Button>
//           }
//           sx={{ width: "100%", backgroundColor: "transparent", boxShadow: "none" }}
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
  CardMedia,
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
} from "@mui/material";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CDProduct = ({ handleWishlistToggle, handleAddToCart, wishlistItems = [] }) => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [tabValue, setTabValue] = useState("all");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/api/products/");
        setProducts(response.data);
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

  const categoryLabels = {
    renting: "Rent",
    selling: "Buy",
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedProducts = [...products];
    if (option === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.price - b.price);
    }
    setProducts(sortedProducts);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredProducts = products.filter((product) => {
    if (tabValue === "all") return true;
    return product.category === tabValue;
  });

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

  return (
    <Box sx={{ padding: "40px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
          Products
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="All" value="all" />
            <Tab label="Rent" value="renting" />
            <Tab label="Buy" value="selling" />
          </Tabs>
          <Select
            value={sortOption}
            onChange={handleSortChange}
            displayEmpty
            sx={{ minWidth: "150px", backgroundColor: "background.paper" }}
          >
            <MenuItem value="">Sort by</MenuItem>
            <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
          </Select>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              onClick={() => handleCardClick(product)}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                borderRadius: "12px",
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: product.category === "renting" ? "error.main" : "primary.main",
                  color: "white",
                  padding: "6px 12px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "0 0 12px 0",
                }}
              >
                {categoryLabels[product.category] || "Unknown"}
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 1,
                  display: "flex",
                  gap: "8px",
                }}
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlistToggle(product);
                  }}
                  sx={{
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "grey.100" },
                  }}
                >
                  <Favorite color={isInWishlist(product.id) ? "error" : "action"} />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCartWithVerification(product);
                  }}
                  sx={{
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "grey.100" },
                  }}
                >
                  <ShoppingCart color="primary" />
                </IconButton>
              </Box>

              <CardMedia
                component="img"
                height="200"
                image={
                  product.image
                    ? `http://127.0.0.1:8000${product.image}`
                    : "https://via.placeholder.com/200"
                }
                alt={product.title}
                sx={{ objectFit: "contain", borderBottom: "1px solid grey.300" }}
              />

              <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
                <Typography variant="h6" component="div" sx={{ color: "primary", fontWeight: "bold", mb: 1 }}>
                  {product.title}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                  Rs. {product.price}
                </Typography>
                {product.category === "renting" && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Per Day Rent: Rs. {product.per_day_rent}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  Company: {product.company_name || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="product-modal-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: 24,
            padding: "24px",
            width: { xs: "90%", sm: "70%", md: "50%" },
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {selectedProduct && (
            <>
              <Typography id="product-modal-title" variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                {selectedProduct.title}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <img
                    src={
                      selectedProduct.image
                        ? `http://127.0.0.1:8000${selectedProduct.image}`
                        : "https://via.placeholder.com/300"
                    }
                    alt={selectedProduct.title}
                    style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain" }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedProduct.description || "No description available."}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                    Rs. {selectedProduct.price}
                  </Typography>
                  {selectedProduct.category === "renting" && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Per Day Rent: Rs. {selectedProduct.per_day_rent}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Company: {selectedProduct.company_name || "N/A"}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Typography variant="body1">Quantity:</Typography>
                    <TextField
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      inputProps={{ min: 1 }}
                      sx={{ width: "80px" }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleBuyOrRentNow(selectedProduct)}
                      sx={{ flex: 1 }}
                    >
                      {selectedProduct.category === "renting" ? "Rent Now" : "Buy Now"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleAddToCartWithVerification(selectedProduct)}
                      startIcon={<ShoppingCart />}
                      sx={{ flex: 1 }}
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
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "8px",
            padding: "10px 20px",
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
                color: "white",
                backgroundColor: "#007bff",
                borderRadius: "20px",
                padding: "5px 15px",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
            >
              OK
            </Button>
          }
          sx={{ width: "100%", backgroundColor: "transparent", boxShadow: "none" }}
        >
          You need to verify your profile to rent items.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CDProduct;