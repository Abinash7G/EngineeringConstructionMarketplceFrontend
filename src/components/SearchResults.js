import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchResults = ({ companies, products, onClose }) => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        maxHeight: "400px",
        overflowY: "auto",
        zIndex: 1000,
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Companies Section */}
        {companies.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Companies
            </Typography>
            <List>
              {companies.map((company) => (
                <ListItem
                  key={company.id}
                  button
                  onClick={() => {
                    navigate(`/companydetails/${company.id}`);
                    onClose();
                  }}
                  sx={{ borderRadius: "4px", "&:hover": { bgcolor: "grey.100" } }}
                >
                  <ListItemText primary={company.name} secondary={company.location} />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
          </>
        )}

        {/* Products Section */}
        {products.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Products
            </Typography>
            <List>
              {products.map((product) => (
                <ListItem
                  key={product.id}
                  button
                  onClick={() => {
                    navigate(`/productdetails/${product.id}`);
                    onClose();
                  }}
                  sx={{ borderRadius: "4px", "&:hover": { bgcolor: "grey.100" } }}
                >
                  <ListItemText
                    primary={product.title}
                    secondary={`Rs. ${product.price} | ${product.category === "renting" ? "Rent" : "Buy"}`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

        {/* No Results */}
        {companies.length === 0 && products.length === 0 && (
          <Typography variant="body2" sx={{ color: "grey.600", p: 2, textAlign: "center" }}>
            No results found.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default SearchResults;