import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Box,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete, ArrowBack, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; // Import the API instance

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [wishlistDeleted, setWishlistDeleted] = useState(false);

  // Fetch wishlist from the backend
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const response = await API.get("/api/wishlist/");
        setWishlistItems(response.data); // Set state with backend data
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    loadWishlist();
  }, [wishlistDeleted]);

  // Add item to cart, remove from wishlist, and navigate to cart page
  const handleAddToCartAndNavigate = async (item) => {
    try {
      // Add to cart
      await API.post("/api/cart/add/", { product_id: item.id || item.product_id, quantity: 1 });
      // Remove from wishlist
      await API.delete(`/api/wishlist/remove/${item.id || item.product_id}/`);
      // Update local state
      const updatedWishlist = wishlistItems.filter(
        (wishlistItem) => wishlistItem.id !== item.id
      );
      setWishlistItems(updatedWishlist);
      setSnackbarMessage(`${item.name} added to cart`);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setWishlistDeleted(true);
      // navigate("/client/cart");
    } catch (error) {
      console.error("Error adding to cart or removing from wishlist:", error);
      setSnackbarMessage("Failed to add to cart or remove from wishlist");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Remove item from wishlist
  const handleRemove = async (item) => {
    try {
      console.log("Item ID: ", item.id || item.product_id);
      await API.delete(`/api/wishlist/remove/${item.id || item.product_id}/`);
      const updatedWishlist = wishlistItems.filter(
        (wishlistItem) => wishlistItem.id !== item.id
      );
      setWishlistItems(updatedWishlist);
      setSnackbarMessage(`${item.name} removed from wishlist!`);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setWishlistDeleted(true);
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      setSnackbarMessage("Failed to remove from wishlist");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Navigate back
  const handleGoBack = () => {
    navigate(-1);
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <IconButton onClick={handleGoBack} color="primary">
          <ArrowBack />
        </IconButton>
      </Box>

      <Typography variant="h4" gutterBottom>
        My Wishlist
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Stock Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wishlistItems.map((item) => (
              <TableRow key={item.id || item.product_id}>
                <TableCell>
                  <IconButton onClick={() => handleRemove(item)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>Rs. {item.price}</TableCell>
                <TableCell>In Stock</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleAddToCartAndNavigate(item)}>
                    <ShoppingCart />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Wishlist;