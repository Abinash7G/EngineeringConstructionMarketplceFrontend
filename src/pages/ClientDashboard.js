
import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Products from "../components/CDProduct";
import CDCompany from "../components/CDCompany";
import CDBanner from "../components/CDBanner";

const ClientDashboard = ({ handleWishlistToggle, handleAddToCart, wishlistItems }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 2, md: 3 }, py: 5, bgcolor: "#f4f6f8" }}>
      {/* Banner Section */}
      <Box sx={{ mb: 6, animation: "fadeIn 1s ease-in" }}>
        <CDBanner />
      </Box>

      {/* Construction Companies Section */}
      <Box sx={{ mb: 6, animation: "fadeIn 1s ease-in 0.2s" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1a237e",
              fontSize: { xs: "1.8rem", md: "2.125rem" },
            }}
          >
            Construction Companies
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/all-companies")}
            sx={{
              borderRadius: 20,
              textTransform: "none",
              px: 4,
              py: 1,
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
              fontWeight: 500,
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            View All
          </Button>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "#e0e0e0" }} />
        <CDCompany />
      </Box>

      {/* Featured Products Section */}
      <Box sx={{ mb: 6, animation: "fadeIn 1s ease-in 0.4s" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1a237e",
              fontSize: { xs: "1.8rem", md: "2.125rem" },
            }}
          >
            Featured Material and Instruments
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/all-products")}
            sx={{
              borderRadius: 20,
              textTransform: "none",
              px: 4,
              py: 1,
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
              fontWeight: 500,
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            View All
          </Button>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "#e0e0e0" }} />
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