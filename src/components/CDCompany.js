import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Rating,
  Avatar,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
} from "@mui/material";
import { Star, LocationOn, ArrowForward } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../pages/footer";

const CDCompany = () => {
  const [fetchedCompanies, setFetchedCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [companyServiceCategories, setCompanyServiceCategories] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [filters, setFilters] = useState({
    location: [],
    rating: [],
    service: [],
  });
  const location = useLocation();
  const isViewAll = location.pathname === "/all-companies";

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (!accessToken || !refreshToken) {
      window.location.href = "/login";
      return;
    }

    // Fetch service categories
    fetch("http://127.0.0.1:8000/api/service-categories/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setServiceCategories(data);
      })
      .catch((err) => {
        console.error("Error fetching service categories:", err);
        showSnackbar("Failed to load service categories.", "error");
      });

    // Fetch company service categories and merge with company data
    fetch("http://127.0.0.1:8000/company-service-category-list/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((serviceData) => {
        setCompanyServiceCategories(serviceData);
        // Fetch company registration data
        fetch("http://127.0.0.1:8000/company-registration-list/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            return res.json();
          })
          .then((companyData) => {
            const filteredCompanies = companyData.filter(
              (item) => item.is_approved && item.company_type === "construction"
            );
            const transformed = filteredCompanies.map((item) => {
              const serviceInfo = serviceData.find((c) => c.id === item.id);
              return {
                id: item.id,
                name: item.company_name,
                location: item.location,
                rating: serviceInfo?.average_rating || 0.0,
                logo: "https://via.placeholder.com/48",
              };
            });
            setFetchedCompanies(transformed);
            setFilteredCompanies(transformed);

            // Fetch user ratings for each company
            transformed.forEach((company) => {
              axios
                .get(`http://127.0.0.1:8000/user-rating/${company.id}/`, {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                })
                .then((response) => {
                  const userRating = response.data.rating;
                  if (userRating !== null && userRating !== undefined) {
                    setUserRatings((prev) => ({
                      ...prev,
                      [company.id]: userRating,
                    }));
                  } else {
                    console.log(`No user rating found for company ${company.id}`);
                  }
                })
                .catch((err) => {
                  console.error(`Error fetching user rating for company ${company.id}:`, err);
                });
            });
          })
          .catch((err) => {
            console.error("Error fetching companies:", err);
            showSnackbar("Failed to load companies.", "error");
            if (err.message.includes("401") || err.message.includes("403")) {
              window.location.href = "/login";
            }
          });
      })
      .catch((err) => {
        console.error("Error fetching company service categories:", err);
        showSnackbar("Failed to load company service categories.", "error");
      });
  }, []);

  const applyFilters = (newFilters) => {
    let filtered = [...fetchedCompanies];

    // Location filter
    if (newFilters.location.length > 0) {
      filtered = filtered.filter((company) => newFilters.location.includes(company.location));
    }

    // Rating filter
    if (newFilters.rating.length > 0) {
      filtered = filtered.filter((company) =>
        newFilters.rating.some((rating) => company.rating >= parseFloat(rating))
      );
    }

    // Service category filter
    if (newFilters.service.length > 0) {
      filtered = filtered.filter((company) => {
        const companyServices = companyServiceCategories.find((c) => c.id === company.id)?.service_categories || [];
        const matches = newFilters.service.some((serviceId) =>
          companyServices.some((service) => service.category_id === parseInt(serviceId))
        );
        console.log(`Company ${company.name} services:`, companyServices, `Matches: ${matches}`);
        return matches;
      });
    }

    console.log("Applied filters:", newFilters);
    console.log("Filtered companies:", filtered);
    setFilteredCompanies(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const updatedFilter = prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value];
      const newFilters = { ...prev, [filterType]: updatedFilter };
      applyFilters(newFilters);
      return newFilters;
    });
  };

  // Reset filters
  const resetFilters = () => {
    const initialFilters = {
      location: [],
      rating: [],
      service: [],
    };
    setFilters(initialFilters);
    applyFilters(initialFilters);
  };

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

      setFetchedCompanies((prev) =>
        prev.map((company) =>
          company.id === companyId
            ? { ...company, rating: response.data.average_rating }
            : company
        )
      );

      setUserRatings((prev) => ({
        ...prev,
        [companyId]: newValue,
      }));

      showSnackbar("Rating submitted successfully!", "success");
    } catch (error) {
      console.error("Error submitting rating:", error);
      showSnackbar("Failed to submit rating. Please try again.", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const uniqueLocations = [...new Set(fetchedCompanies.map((company) => company.location))];
  const ratingOptions = ["4", "3", "2"];
  const finalCompanies = [...filteredCompanies];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ...(isViewAll ? { minHeight: "100vh" } : {}),
      }}
    >
      <Box sx={{ display: "flex", gap: 3, py: 2, ...(isViewAll ? { flexGrow: 1 } : {}) }}>
        {isViewAll && (
          <Box sx={{ width: "280px", p: 3, bgcolor: "#ffffff", borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#1a237e" }}>
              Filters
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Location
            </Typography>
            <FormGroup>
              {uniqueLocations.map((loc) => (
                <FormControlLabel
                  key={loc}
                  control={
                    <Checkbox
                      checked={filters.location.includes(loc)}
                      onChange={() => handleFilterChange("location", loc)}
                      sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }}
                    />
                  }
                  label={loc}
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.9rem" } }}
                />
              ))}
            </FormGroup>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
              Rating
            </Typography>
            <FormGroup>
              {ratingOptions.map((rating) => (
                <FormControlLabel
                  key={rating}
                  control={
                    <Checkbox
                      checked={filters.rating.includes(rating)}
                      onChange={() => handleFilterChange("rating", rating)}
                      sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }}
                    />
                  }
                  label={`${rating}+ Stars`}
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.9rem" } }}
                />
              ))}
            </FormGroup>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
              Service
            </Typography>
            <FormGroup>
              {serviceCategories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={
                    <Checkbox
                      checked={filters.service.includes(category.id.toString())}
                      onChange={() => handleFilterChange("service", category.id.toString())}
                      sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }}
                    />
                  }
                  label={category.name}
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.9rem" } }}
                />
              ))}
            </FormGroup>
            <Button
              variant="outlined"
              onClick={resetFilters}
              sx={{
                mt: 2,
                width: "100%",
                borderColor: "#1976d2",
                color: "#1976d2",
                "&:hover": { borderColor: "#1565c0", color: "#1565c0" },
              }}
            >
              Reset Filters
            </Button>
          </Box>
        )}
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={3}>
            {finalCompanies.slice(0, isViewAll ? undefined : 3).map((company) => (
              <Grid item xs={12} sm={6} md={4} key={company.id}>
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
                >
                  <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar
                      src={company.logo}
                      sx={{
                        width: 48,
                        height: 48,
                        mb: 2,
                        bgcolor: "#1976d2",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#000000", mb: 1 }}
                    >
                      {company.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#546e7a",
                        mb: 1,
                      }}
                    >
                      <LocationOn sx={{ fontSize: 18, mr: 0.5, color: "#d32f2f" }} />
                      {company.location}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        endIcon={<ArrowForward />}
                        component={Link}
                        to={`/companydetails/${company.id}`}
                        sx={{
                          borderRadius: 1,
                          textTransform: "uppercase",
                          fontWeight: 500,
                          borderColor: "#1976d2",
                          color: "#1976d2",
                          "&:hover": { bgcolor: "#e3f2fd", borderColor: "#1565c0" },
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                    <Divider sx={{ width: "100%", mb: 2 }} />
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Typography variant="body1" sx={{ mr: 1, fontWeight: 500, color: "#000000" }}>
                        Rating:
                      </Typography>
                      <Rating
                        value={userRatings[company.id] !== undefined ? userRatings[company.id] : company.rating}
                        precision={0.5}
                        onChange={(event, newValue) => {
                          if (newValue !== null) {
                            handleRatingChange(company.id, newValue);
                          }
                        }}
                        icon={<Star fontSize="inherit" sx={{ color: "#fbc02d" }} />}
                        emptyIcon={<Star fontSize="inherit" sx={{ color: "#e0e0e0" }} />}
                      />
                      <Typography variant="body2" sx={{ ml: 1, color: "#546e7a" }}>
                        ({company.rating}/5)
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      component={Link}
                      to={`/CDConsultingInquiryForm/${company.id}`}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        py: 1,
                        bgcolor: "#1976d2",
                        "&:hover": { bgcolor: "#1565c0" },
                      }}
                    >
                      Book Your Service Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: "60px" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ borderRadius: 2 }}
          >
            {snackbar.message}
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

export default CDCompany;