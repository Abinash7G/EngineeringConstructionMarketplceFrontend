import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import { Star, ShoppingCart, Favorite } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import API, { fetchCartItems, fetchWishlistItems, addToWishlist, removeFromWishlist, submitRating } from "../services/api";
import Footer from "../pages/footer";

const ProductDetail = ({ wishlistItems = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(null);  // New state for user-submitted rating

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/api/products-item/${id}/`);
        setProduct(response.data);
        setUserRating(response.data.rating);  // Initialize with product's average rating
      } catch (error) {
        try {
          const allProductsResponse = await API.get("/api/products/");
          const foundProduct = allProductsResponse.data.find((p) => p.id === parseInt(id));
          if (foundProduct) {
            setProduct(foundProduct);
            setUserRating(foundProduct.rating);
          } else {
            setError("Product not found.");
          }
        } catch (fallbackError) {
          setError("Failed to load product details.");
        }
      }
    };

    const fetchVerificationStatus = async () => {
      try {
        const response = await API.get("/api/rent-verification/user/");
        setVerificationStatus(response.data.status);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setVerificationStatus("not_found");
        }
      }
    };

    fetchProduct();
    fetchVerificationStatus();
  }, [id]);

  useEffect(() => {
    if (product) {
      const fetchSimilarProducts = async () => {
        try {
          const response = await API.get("/api/products/");
          const allProducts = response.data;
          const category = product.category;
          const filtered = allProducts
            .filter((p) => p.id !== parseInt(id) && p.category === category && p.is_available)
            .sort(() => Math.random() - 0.5);
          setSimilarProducts(filtered.slice(0, 4));
        } catch (error) {
          setError("Failed to load similar products.");
        }
      };
      fetchSimilarProducts();
    }
  }, [product, id]);

  const calculateDiscountedPrice = (price, discountPercentage, perDayRent) => {
    const originalPrice = parseFloat(perDayRent || price || 0);
    const discount = parseFloat(discountPercentage || 0);
    return (originalPrice - (originalPrice * (discount / 100))).toFixed(2);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const handleAddToCartWithVerification = async (productToAdd) => {
    if (productToAdd.category === "renting" && verificationStatus !== "verified") {
      setSnackbarMessage("You need to verify your profile to rent items.");
      setSnackbarOpen(true);
      navigate("/upload-kyc");
      return;
    }
    try {
      await API.post("/api/cart/add/", { product_id: productToAdd.id, quantity: quantity || 1 });
      await fetchCartItems();
      setSnackbarMessage("Added to cart");
      setSnackbarOpen(true);
    } catch (error) {
      setError("Failed to add to cart");
      setSnackbarMessage("Failed to add to cart");
      setSnackbarOpen(true);
    }
  };

  const handleWishlistToggleWithVerification = async (productToAdd) => {
    try {
      const isInWishlist = wishlistItems.some(item => item.id === productToAdd.id);
      if (isInWishlist) {
        await removeFromWishlist(productToAdd.id);
        setSnackbarMessage("Removed from wishlist");
      } else {
        await addToWishlist(productToAdd.id);
        setSnackbarMessage("Added to wishlist");
      }
      await fetchWishlistItems();
      setSnackbarOpen(true);
    } catch (error) {
      setError("Failed to update wishlist");
      setSnackbarMessage("Failed to update wishlist");
      setSnackbarOpen(true);
    }
  };

  const handleBuyOrRentNow = (productToBuy) => {
    if (productToBuy.category === "renting" && verificationStatus !== "verified") {
      setSnackbarMessage("You need to verify your profile to rent items.");
      setSnackbarOpen(true);
      navigate("/upload-kyc");
      return;
    }
    const buyingItems = productToBuy.category === "selling"
      ? [{ product_id: productToBuy.id, ...productToBuy, quantity }]
      : [];
    const rentingItems = productToBuy.category === "renting"
      ? [{ product_id: productToBuy.id, ...productToBuy, quantity }]
      : [];
    const cartTotal = productToBuy.category === "selling"
      ? parseFloat(productToBuy.price) * quantity
      : 0;

    navigate("/checkout", { state: { buyingItems, rentingItems, cartTotal } });
  };

  const handleQuantityChange = (increment) => {
    setQuantity((prev) => Math.max(1, prev + increment));
  };

  const handleRatingSubmit = async (newRating) => {
    try {
      await submitRating(product.id, newRating);
      setUserRating(newRating);  // Update local state
      setSnackbarMessage("Rating submitted successfully");
      setSnackbarOpen(true);

      // Optionally, refetch the product to update the average rating
      const response = await API.get(`/api/products-item/${id}/`);
      setProduct(response.data);
    } catch (error) {
      setError("Failed to submit rating");
      setSnackbarMessage("Failed to submit rating");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
    setError(null);
  };

  if (error) {
    return (
      <Box sx={{ padding: "20px" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ padding: "20px" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const displayPrice = product.category === "renting" ? product.per_day_rent : product.price;
  const finalPrice = product.discount_percentage && parseFloat(product.discount_percentage) > 0
    ? calculateDiscountedPrice(product.price, product.discount_percentage, product.per_day_rent)
    : displayPrice;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", pt: "64px" }}>
      <Box sx={{ flexGrow: 1, padding: "20px" }}>
        <Box sx={{ display: "flex", gap: 4, mb: 4, flexDirection: { xs: "column", md: "row" } }}>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#f5f5f5", borderRadius: "8px", height: "300px" }}>
            <img src={product.image || "https://via.placeholder.com/300"} alt={product.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#000", mb: 1 }}>
              {product.title || "Product"}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Rating
                value={userRating || product.rating || 0}  // Display user rating or average rating
                precision={0.5}
                onChange={(event, newValue) => {
                  if (newValue) {
                    handleRatingSubmit(newValue);  // Submit rating on change
                  }
                }}
                icon={<Star fontSize="inherit" sx={{ color: "#fbc02d" }} />}
                emptyIcon={<Star fontSize="inherit" sx={{ color: "#e0e0e0" }} />}
              />
              <Typography variant="body2" sx={{ color: "#546e7a" }}>
                ({product.rating || 0} rating)
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#000", mb: 1 }}>
              Rs. {finalPrice || "N/A"}
            </Typography>
            {product.discount_percentage && parseFloat(product.discount_percentage) > 0 && (
              <Typography variant="body2" sx={{ color: "#78909c", textDecoration: "line-through", mb: 1 }}>
                Rs. {displayPrice}
              </Typography>
            )}
            <Typography variant="body1" sx={{ color: "#546e7a", mb: 2 }}>
              {product.description || "No description available."}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Quantity:
              </Typography>
              <Button variant="outlined" onClick={() => handleQuantityChange(-1)} sx={{ minWidth: "40px", borderColor: "#1976d2", color: "#1976d2" }}>
                -
              </Button>
              <TextField value={quantity} type="number" inputProps={{ min: 1, style: { textAlign: "center" } }} sx={{ width: "60px" }} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} />
              <Button variant="outlined" onClick={() => handleQuantityChange(1)} sx={{ minWidth: "40px", borderColor: "#1976d2", color: "#1976d2" }}>
                +
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Button variant="contained" startIcon={<ShoppingCart />} onClick={() => handleAddToCartWithVerification(product)} sx={{ flex: 1, bgcolor: "#3e5b96", "&:hover": { bgcolor: "#4daedb" } }}>
                Add to Cart
              </Button>
              <Button variant="outlined" onClick={() => handleBuyOrRentNow(product)} sx={{ flex: 1, borderColor: "#1976d2", color: "#1976d2", "&:hover": { borderColor: "#1565c0", color: "#1565c0" } }}>
                {product.category === "renting" ? "Rent Now" : "Buy Now"}
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body2" sx={{ color: "#546e7a" }}>
                Free shipping on orders same location
              </Typography>
              <Typography variant="body2" sx={{ color: "#546e7a" }}>
                ✓ Quality guarantee
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, color: "#000", mb: 2 }}>
          Similar Products
        </Typography>
        <Grid container spacing={3}>
          {similarProducts.map((similarProduct) => {
            const displayPrice = similarProduct.category === "renting" ? similarProduct.per_day_rent : similarProduct.price;
            const finalPrice = similarProduct.discount_percentage && parseFloat(similarProduct.discount_percentage) > 0
              ? calculateDiscountedPrice(similarProduct.price, similarProduct.discount_percentage, similarProduct.per_day_rent)
              : displayPrice;

            return (
              <Grid item xs={12} sm={6} md={3} key={similarProduct.id}>
                <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", bgcolor: "#ffffff", transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "translateY(-8px)", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" } }} onClick={() => navigate(`/productdetails/${similarProduct.id}`)}>
                  <CardContent sx={{ p: 3, position: "relative" }}>
                    <Box sx={{ position: "relative", mb: 2 }}>
                      <Box sx={{ position: "absolute", top: 0, left: 0, bgcolor: similarProduct.category === "renting" ? "#d32f2f" : "#1976d2", color: "#ffffff", px: 1, py: 0.5, borderRadius: "0 0 8px 0", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" }}>
                        {similarProduct.category === "renting" ? "Rent" : "Buy"}
                      </Box>
                      <Box sx={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 1 }}>
                        <IconButton onClick={(e) => { e.stopPropagation(); handleWishlistToggleWithVerification(similarProduct); }} sx={{ "&:hover": { bgcolor: "transparent" } }}>
                          <Favorite sx={{ color: isInWishlist(similarProduct.id) ? "#d32f2f" : "#757575" }} />
                        </IconButton>
                        <IconButton onClick={(e) => { e.stopPropagation(); handleAddToCartWithVerification(similarProduct); }} sx={{ "&:hover": { bgcolor: "transparent" } }}>
                          <ShoppingCart sx={{ color: "#757575" }} />
                        </IconButton>
                      </Box>
                      <img src={similarProduct.image ? `http://127.0.0.1:8000${similarProduct.image}` : "https://via.placeholder.com/150"} alt={similarProduct.title} style={{ width: "100%", height: "150px", objectFit: "contain" }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#000000", mb: 1 }}>
                      {similarProduct.title}
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
                        Rs.
                      </Typography>
                      {similarProduct.discount_percentage && parseFloat(similarProduct.discount_percentage) > 0 ? (
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Typography variant="body2" sx={{ color: "#78909c", textDecoration: "line-through" }}>
                            {displayPrice}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
                            {finalPrice}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
                          {displayPrice}
                        </Typography>
                      )}
                      {similarProduct.discount_percentage && parseFloat(similarProduct.discount_percentage) > 0 && (
                        <Typography variant="body2" sx={{ color: "#d32f2f", fontWeight: 600, mt: 0.5 }}>
                          {similarProduct.discount_percentage}% OFF
                        </Typography>
                      )}
                      {similarProduct.category === "renting" && (
                        <Typography variant="body2" sx={{ color: "#546e7a", mt: 0.5 }}>
                          Per Day Rent: Rs. {similarProduct.per_day_rent}
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ color: "#546e7a", mb: 1 }}>
                      Company: {similarProduct.company_name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box sx={{ mt: "auto" }}>
        <Footer />
      </Box>

      <Snackbar open={snackbarOpen} onClose={handleSnackbarClose} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }} sx={{ mt: "60px" }}>
        <Alert onClose={handleSnackbarClose} severity={error ? "error" : "success"} sx={{ width: "100%", bgcolor: "transparent", boxShadow: "none" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetail;