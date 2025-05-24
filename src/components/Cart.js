
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  Paper,
  Alert,
} from "@mui/material";
import { Delete, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API, { fetchCartItems } from "../services/api";
import Footer from "../pages/footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const response = await fetchCartItems();
        setCartItems(response.data);
        console.log("Cart Items:", response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
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

    loadCartItems();
    fetchVerificationStatus();
  }, []);

  const handleIncrement = async (id) => {
    try {
      await API.post("/api/cart/add/", { product_id: id, quantity: 1 });
      const response = await fetchCartItems();
      setCartItems(response.data);
    } catch (error) {
      console.error("Error incrementing item:", error);
    }
  };

  const handleDecrement = async (id) => {
    const item = cartItems.find((item) => item.product_id === id);
    if (item.quantity > 1) {
      try {
        await API.post("/api/cart/add/", { product_id: id, quantity: -1 });
        const response = await fetchCartItems();
        setCartItems(response.data);
      } catch (error) {
        console.error("Error decrementing item:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/cart/remove/${id}/`);
      const response = await fetchCartItems();
      setCartItems(response.data);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Calculate discounted price for an item
  const calculateDiscountedPrice = (price, discount) => {
    const originalPrice = parseFloat(price);
    const discountPercentage = parseFloat(discount);
    if (discountPercentage > 0) {
      return originalPrice - (originalPrice * (discountPercentage / 100));
    }
    return originalPrice;
  };

  // Calculate total discount amount
  const totalDiscount = cartItems.reduce((total, item) => {
    const originalPrice = parseFloat(item.price);
    const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
    return total + (originalPrice - discountedPrice) * item.quantity;
  }, 0);

  // Calculate subtotal after discount
  const subtotal = cartItems.reduce((total, item) => {
    const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
    return total + discountedPrice * item.quantity;
  }, 0);

  const handleCheckout = () => {
    const invalidItems = cartItems.filter((item) => !item.company && !item.company_id);
    if (invalidItems.length > 0) {
      alert("Some items are not associated with a company. Please contact support.");
      return;
    }
    const rentingItems = cartItems
      .filter((item) => item.category === "renting")
      .map((item) => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        discounted_price: calculateDiscountedPrice(item.price, item.discount).toFixed(2),
        per_day_rent: item.per_day_rent,
        quantity: item.quantity,
        company_id: item.company || item.company_id,
        location: item.location,
        image: item.image,
        category: item.category,
        discount: item.discount,
      }));
    if (rentingItems.length > 0 && verificationStatus !== "verified") {
      alert("You need to verify your profile to rent items.");
      navigate("/rent-verification");
      return;
    }
    const buyingItems = cartItems
      .filter((item) => item.category === "selling")
      .map((item) => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        discounted_price: calculateDiscountedPrice(item.price, item.discount).toFixed(2),
        quantity: item.quantity,
        company_id: item.company || item.company_id,
        image: item.image,
        category: item.category,
        discount: item.discount,
      }));
    navigate("/checkout", { state: { buyingItems, rentingItems, cartTotal: subtotal } });
  };

  const buyingItems = cartItems.filter((item) => item.category === "selling");
  const rentingItems = cartItems.filter((item) => item.category === "renting");

  const renderItems = (items) => (
    <TableBody>
      {items.map((item) => {
        const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
        const itemTotal = discountedPrice * item.quantity;
        return (
          <TableRow key={item.product_id}>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  src={`http://127.0.0.1:8000${item.image}`}
                  alt={item.name}
                  style={{ width: "50px", height: "50px", borderRadius: "8px" }}
                />
                <Box>
                  <Typography>{item.name}</Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "text.secondary" }}>
                    {item.company_name}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              {item.discount > 0 ? (
                <Box>
                  <Typography sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                    Rs. {parseFloat(item.price).toFixed(2)}
                  </Typography>
                  <Typography>Rs. {discountedPrice.toFixed(2)}</Typography>
                </Box>
              ) : (
                <Typography>Rs. {parseFloat(item.price).toFixed(2)}</Typography>
              )}
            </TableCell>
            <TableCell>
              <Typography>{item.discount}%</Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleDecrement(item.product_id)}
                >
                  -
                </Button>
                <TextField
                  value={item.quantity}
                  size="small"
                  sx={{ width: "50px", textAlign: "center" }}
                  inputProps={{ readOnly: true }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleIncrement(item.product_id)}
                >
                  +
                </Button>
              </Box>
            </TableCell>
            <TableCell>Rs. {itemTotal.toFixed(2)}</TableCell>
            <TableCell>
              <IconButton color="error" onClick={() => handleDelete(item.product_id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Box sx={{ padding: "20px", flex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
          <Box>
            <IconButton onClick={handleGoBack} color="primary">
              <ArrowBack />
            </IconButton>
          </Box>

          <Box sx={{ flex: 3 }}>
            <Typography variant="h4" gutterBottom>
              Cart items
            </Typography>

            {rentingItems.length > 0 && verificationStatus !== "verified" && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                You need to verify your profile to rent items.{" "}
                <Button onClick={() => navigate("/rent-verification")} color="warning">
                  Verify Now
                </Button>
              </Alert>
            )}

            {buyingItems.length > 0 && (
              <>
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 2 }}>
                  BUYING ITEM
                </Typography>
                <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    {renderItems(buyingItems)}
                  </Table>
                </TableContainer>
              </>
            )}

            {rentingItems.length > 0 && (
              <>
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 2 }}>
                  RENTING ITEM
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    {renderItems(rentingItems)}
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>

          <Box
            sx={{
              flex: 1,
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <Typography>Subtotal (before discount)</Typography>
              <Typography>
                Rs. {cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <Typography>Total Discount</Typography>
              <Typography>Rs. {totalDiscount.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <Typography>Subtotal (after discount)</Typography>
              <Typography>Rs. {subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <Typography>Shipping</Typography>
              <Typography>as per quantity of material, hand cash on arrival</Typography>
            </Box>
            <TextField
              placeholder="Add coupon code"
              fullWidth
              size="small"
              sx={{ marginBottom: "10px" }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">Rs. {subtotal.toFixed(2)}</Typography>
            </Box>
            <Button
              variant="contained"
              color="success"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Cart;