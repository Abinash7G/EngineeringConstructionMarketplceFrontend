import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
} from "@mui/material";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import Footer from "../pages/footer";

const CDProduct = ({ handleWishlistToggle, handleAddToCart, wishlistItems = [], isFeatured }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState(""); // Single sort option (only one can be active)
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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

  const applyFiltersAndSort = (updatedFilters, updatedSortOption) => {
    let filtered = [...products];

    if (updatedFilters.category.length > 0) {
      filtered = filtered.filter((product) => updatedFilters.category.includes(product.category));
    }

    if (updatedFilters.company.length > 0) {
      filtered = filtered.filter((product) => updatedFilters.company.includes(product.company_name));
    }

    filtered = filtered.filter((product) => {
      const price = product.category === "renting" ? product.per_day_rent : product.price;
      return price >= updatedFilters.priceRange.min && price <= updatedFilters.priceRange.max;
    });

    if (updatedSortOption === "priceLowToHigh") {
      filtered.sort((a, b) => {
        const priceA = a.category === "renting" ? a.per_day_rent : a.price;
        const priceB = b.category === "renting" ? b.per_day_rent : b.price;
        return priceA - priceB;
      });
    } else if (updatedSortOption === "priceHighToLow") {
      filtered.sort((a, b) => {
        const priceA = a.category === "renting" ? a.per_day_rent : a.price;
        const priceB = b.category === "renting" ? b.per_day_rent : b.price;
        return priceB - priceA;
      });
    }

    setFilteredProducts(filtered);
  };

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

      applyFiltersAndSort(updatedFilters, sortOption);
      return updatedFilters;
    });
  };

  const handleSortChange = (value) => {
    // Toggle sort option: if the same option is clicked, clear it; otherwise, set the new option
    const newSortOption = sortOption === value ? "" : value;
    setSortOption(newSortOption);
    applyFiltersAndSort(filters, newSortOption);
  };

  const resetFilters = () => {
    const initialFilters = {
      category: [],
      company: [],
      priceRange: { min: 0, max: 100000 },
    };
    setFilters(initialFilters);
    setSortOption("");
    applyFiltersAndSort(initialFilters, "");
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
    handleAddToCart({ ...product, quantity: 1 });
  };

  const handleBuyOrRentNow = (product) => {
    if (product.category === "renting" && verificationStatus !== "verified") {
      setSnackbarOpen(true);
      navigate("/upload-kyc");
      return;
    }
     const itemPayload = {
    ...product,
    price: product.price, // Original price
    discounted_price: calculateDiscountedPrice(
      product.price,
      product.discount_percentage,
      product.per_day_rent
    ),
    discount_percentage: product.discount_percentage
  };

  const buyingItems = product.category === "selling" ? [itemPayload] : [];
  const rentingItems = product.category === "renting" ? [itemPayload] : [];

  navigate("/checkout", {
    state: {
      buyingItems,
      rentingItems,
      cartTotal: calculateDiscountedPrice(
        product.price,
        product.discount_percentage,
        product.per_day_rent
      )
    }
  });
};

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const calculateDiscountedPrice = (price, discountPercentage, perDayRent) => {
    const originalPrice = parseFloat(perDayRent || price || 0);
    const discount = parseFloat(discountPercentage || 0);
    return (originalPrice - (originalPrice * (discount / 100))).toFixed(2);
  };

  const uniqueCompanies = [...new Set(products.map((product) => product.company_name))];
  const categoryOptions = ["renting", "selling"];
  const sortOptions = [
    { value: "priceLowToHigh", label: "Price: Low to High" },
    { value: "priceHighToLow", label: "Price: High to Low" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", ...(isViewAll ? { minHeight: "100vh" } : {}) }}>
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
                  max="100000"
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
                  max="100000"
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
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
                Sort By
              </Typography>
              <FormGroup>
                {sortOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        checked={sortOption === option.value}
                        onChange={() => handleSortChange(option.value)}
                        sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }}
                      />
                    }
                    label={option.label}
                    sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.9rem" } }}
                  />
                ))}
              </FormGroup>
              <Button
                variant="outlined"
                onClick={resetFilters}
                sx={{
                  mt: 2,
                  width室: "100%",
                  borderColor: "#1976d2",
                  color: "#1976d2",
                  "&:hover": { borderColor: "#1565c0", color: "#1565c0" },
                }}
              >
                Reset Filters
              </Button>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
                  All Products
                </Typography>
              </Box>
              <Grid container spacing={3}>
                {filteredProducts.map((product) => {
                  const displayPrice = product.category === "renting" ? product.per_day_rent : product.price;
                  const finalPrice = product.discount_percentage && parseFloat(product.discount_percentage) > 0
                    ? calculateDiscountedPrice(product.price, product.discount_percentage, product.per_day_rent)
                    : displayPrice;

                  return (
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
                        onClick={() => navigate(`/productdetails/${product.id}`)}
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
                                sx={{ "&:hover": { bgcolor: "transparent" } }}
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
                                sx={{ "&:hover": { bgcolor: "transparent" } }}
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
                                  Rs. {displayPrice}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
                                  Rs. {finalPrice}
                                </Typography>
                              </>
                            ) : (
                              <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
                                Rs. {displayPrice}
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
                  );
                })}
              </Grid>
            </Box>
          </Box>
        )}
        {!isViewAll && (
          <Grid container spacing={3}>
            {products.slice(0, isFeatured ? 5 : undefined).map((product) => {
              const displayPrice = product.category === "renting" ? product.per_day_rent : product.price;
              const finalPrice = product.discount_percentage && parseFloat(product.discount_percentage) > 0
                ? calculateDiscountedPrice(product.price, product.discount_percentage, product.per_day_rent)
                : displayPrice;

              return (
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
                    onClick={() => navigate(`/productdetails/${product.id}`)}
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
                            sx={{ "&:hover": { bgcolor: "transparent" } }}
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
                            sx={{ "&:hover": { bgcolor: "transparent" } }}
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
                              Rs. {displayPrice}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
                              Rs. {finalPrice}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="body1" sx={{ fontWeight: 700, color: "#1976d2" }}>
                            Rs. {displayPrice}
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
              );
            })}
          </Grid>
        )}
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
      {isViewAll && (
        <Box sx={{ mt: "auto" }}>
          <Footer />
        </Box>
      )}
    </Box>
  );
};

export default CDProduct;