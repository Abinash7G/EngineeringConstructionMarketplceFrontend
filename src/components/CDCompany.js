import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Rating,
  Divider,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import { Star, LocationOn, ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

const CDCompany = () => {
  const [fetchedCompanies, setFetchedCompanies] = useState([]);
  const [userRatings, setUserRatings] = useState({}); // Store user ratings locally
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (!accessToken || !refreshToken) {
      window.location.href = "/login";
      return;
    }

    // Fetch companies
    fetch("http://127.0.0.1:8000/company-registration-list/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        const filteredCompanies = data.filter(
          (item) => item.is_approved && item.company_type === "construction"
        );
        const transformed = filteredCompanies.map((item) => ({
          id: item.id,
          name: item.company_name,
          location: item.location,
          rating: item.average_rating || 0.0,
          logo: "https://via.placeholder.com/48",
        }));
        console.log("Transformed Companies:", transformed);
        setFetchedCompanies(transformed);

        // Fetch user's existing ratings for each company
        transformed.forEach((company) => {
          axios
            .get(`http://127.0.0.1:8000/user-rating/${company.id}/`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              const userRating = response.data.rating;
              // Only set user rating if it exists (i.e., not null)
              if (userRating !== null && userRating !== undefined) {
                setUserRatings((prev) => ({
                  ...prev,
                  [company.id]: userRating,
                }));
              }
            })
            .catch((err) => {
              console.error(`Error fetching user rating for company ${company.id}:`, err);
              if (err.response?.status === 404) {
                showSnackbar("Company not found", "error");
              }
            });
        });
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
        if (err.message.includes("401") || err.message.includes("403")) {
          window.location.href = "/login";
        }
      });
  }, []);

  const handleRatingChange = async (companyId, newValue) => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/submit-rating/${companyId}/`,
        { rating: newValue },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update the company's average rating in the state
      setFetchedCompanies((prev) =>
        prev.map((company) =>
          company.id === companyId
            ? { ...company, rating: response.data.average_rating }
            : company
        )
      );

      // Update user ratings state to reflect the user's current rating
      setUserRatings((prev) => ({
        ...prev,
        [companyId]: newValue,
      }));

      // Show success snackbar
      showSnackbar("Rating submitted successfully!", "success");
    } catch (error) {
      console.error("Error submitting rating:", error);
      showSnackbar(
        error.response?.data?.error || "Failed to submit rating. Please try again.",
        "error"
      );
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const finalCompanies = [...fetchedCompanies];

  return (
    <Box sx={{ p: 2 }}>
      {finalCompanies.length > 0 ? (
        <Grid container spacing={3}>
          {finalCompanies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  backgroundColor: "background.paper",
                  backgroundImage: "linear-gradient(to bottom right, #ffffff 0%, #f8f9fa 100%)",
                  '&:hover': {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src={company.logo}
                      sx={{
                        width: 48,
                        height: 48,
                        mr: 2,
                        bgcolor: "primary.main",
                        '& img': { p: 1 },
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.1rem', sm: '1.2rem' },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {company.name}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 1.5,
                      fontSize: "0.9rem",
                    }}
                  >
                    <LocationOn sx={{ fontSize: 20, mr: 1, color: "error.main" }} />
                    {company.location}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      View Details
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      endIcon={<ArrowForward />}
                      sx={{
                        mt: 1,
                        borderRadius: 1,
                        '&:hover': { backgroundColor: "action.hover" },
                      }}
                      component={Link}
                      to={`/companydetails/${company.id}`}
                    >
                      View Details
                    </Button>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography variant="body1" sx={{ mr: 1, fontWeight: 500 }}>
                      Rating:
                    </Typography>
                    <Rating
                      name={`company-rating-${company.id}`}
                      value={userRatings[company.id] !== undefined ? userRatings[company.id] : company.rating}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        if (newValue !== null) {
                          handleRatingChange(company.id, newValue);
                        }
                      }}
                      icon={<Star fontSize="inherit" sx={{ color: "gold" }} />}
                      emptyIcon={<Star fontSize="inherit" sx={{ color: "text.disabled" }} />}
                    />
                    <Typography variant="body1" sx={{ ml: 1, fontWeight: 500 }}>
                      {company.rating}/5
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mt: "auto", pt: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        borderRadius: 1,
                        py: 1,
                        textTransform: "none",
                        fontWeight: 500,
                      }}
                      component={Link}
                      to={`/CDConsultingInquiryForm/${company.id}`}
                    >
                      Book Your Service Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No construction companies found.
        </Typography>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CDCompany;