import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ClientNavbar from "./ClientNavbar";
import { LocationOn, Phone, Email, Star } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Utility function to check token expiration
const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= decoded.exp * 1000;
  } catch (err) {
    return true;
  }
};

// Utility function for handling auth errors
const handleAuthError = () => {
  console.log("Authentication error occurred. Redirecting or logging out...");
};

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [companyServices, setCompanyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist] = useState([]);
  const [cartItems] = useState([]);
  const [averageRating, setAverageRating] = useState(0.0);
  const [userRating, setUserRating] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch company info
  const fetchCompanyInfo = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/get-company-info/${id}/`);
      setCompanyInfo(response.data);
      setAverageRating(response.data.average_rating || 0.0); // Assuming the API returns average_rating
    } catch (err) {
      throw new Error(`Failed to fetch company info: ${err.response?.data?.error || err.message}`);
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/get-company-projects/${id}/`);
      setProjects(response.data);
    } catch (err) {
      setProjects([]);
    }
  };

  // Fetch team members
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/get-company-team-members/${id}/`);
      setTeamMembers(response.data);
    } catch (err) {
      setTeamMembers([]);
    }
  };

  // Fetch services with token handling
  const fetchCompanyServices = async () => {
    try {
      let token = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!token) {
        setCompanyServices([]);
        return;
      }

      if (isTokenExpired(token) && refreshToken) {
        try {
          const refreshResponse = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
            refresh: refreshToken,
          });
          token = refreshResponse.data.access;
          localStorage.setItem("access_token", token);
        } catch (refreshError) {
          handleAuthError();
          setCompanyServices([]);
          return;
        }
      }

      const response = await axios.get(`http://127.0.0.1:8000/api/company-services/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredServices = response.data.map((service, index) => ({
        id: index + 1,
        category: service.category || "Unknown",
        sub_service: service.sub_service || "Unknown",
      }));
      setCompanyServices(filteredServices);
    } catch (error) {
      if (error.response?.status === 401) handleAuthError();
      setCompanyServices([]);
    }
  };

  // Fetch user's existing rating
  const fetchUserRating = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) return;

    try {
      const response = await axios.get(`http://127.0.0.1:8000/user-rating/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userRatingValue = response.data.rating;
      // Only set user rating if it exists (i.e., not null)
      if (userRatingValue !== null && userRatingValue !== undefined) {
        setUserRating(userRatingValue);
      }
    } catch (err) {
      console.error("Error fetching user rating:", err);
      if (err.response?.status === 404) {
        showSnackbar("Company not found", "error");
      }
    }
  };

  const handleRatingChange = async (newValue) => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/submit-rating/${id}/`,
        { rating: newValue },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update average rating and user rating
      setAverageRating(response.data.average_rating);
      setUserRating(newValue);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchCompanyInfo();
        await Promise.all([fetchProjects(), fetchTeamMembers(), fetchCompanyServices(), fetchUserRating()]);
      } catch (err) {
        setError(err.message || "Failed to load company details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleNavigateToProfile = () => {
    navigate("/client/profile");
  };

  if (loading) {
    return (
      <Container sx={{ mt: 12, mb: 6, textAlign: "center" }}>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }

  if (error || !companyInfo) {
    return (
      <Container sx={{ mt: 12, mb: 6, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          {error || "Company not found."}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      {/* Navbar */}
      <ClientNavbar wishlist={wishlist} cartItems={cartItems} onNavigateToProfile={handleNavigateToProfile} />

      <Container sx={{ mt: 12, mb: 6 }}>
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
            background: "linear-gradient(90deg, #1E3A8A, #F97316)",
            color: "white",
            py: 6,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
            {companyInfo.company_name || "Unknown Company"}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
            Building the Future, One Project at a Time
          </Typography>
        </Box>

        {/* Company Details */}
        <Card sx={{ mb: 6, boxShadow: 3, p: 2, borderRadius: 2, textAlign: "center" }}>
          <CardMedia
            component="img"
            height="200"
            image={
              companyInfo.logo
                ? `http://127.0.0.1:8000${companyInfo.logo}`
                : "https://via.placeholder.com/200"
            }
            alt={companyInfo.company_name || "Company Logo"}
            sx={{ objectFit: "contain", margin: "0 auto", maxWidth: "100%" }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/200";
            }}
          />
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
              <LocationOn sx={{ mr: 1, color: "#F97316" }} />
              <Typography variant="body1" sx={{ color: "#374151" }}>
                {companyInfo.address || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
              <Phone sx={{ mr: 1, color: "#F97316" }} />
              <Typography variant="body1" sx={{ color: "#374151" }}>
                {companyInfo.phone_number || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
              <Email sx={{ mr: 1, color: "#F97316" }} />
              <Typography variant="body1" sx={{ color: "#374151" }}>
                {companyInfo.company_email || "N/A"}
              </Typography>
            </Box>
            {/* Rating Section */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
              <Typography variant="body1" sx={{ mr: 1, fontWeight: 500 }}>
                Rate This Company:
              </Typography>
              <Rating
                name="company-rating"
                value={userRating !== null && userRating !== undefined ? userRating : averageRating}
                precision={0.5}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    handleRatingChange(newValue);
                  }
                }}
                icon={<Star fontSize="inherit" sx={{ color: "gold" }} />}
                emptyIcon={<Star fontSize="inherit" sx={{ color: "text.disabled" }} />}
              />
              <Typography variant="body1" sx={{ ml: 1, fontWeight: 500 }}>
                {averageRating}/5
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* About Us */}
        <Typography variant="h5" sx={{ mt: 6, mb: 3, fontWeight: "bold", color: "#1E3A8A" }}>
          About Us
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 2,
            backgroundColor: "#F3F4F6",
            border: "1px solid #E0E0E0",
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
            {companyInfo.about_us || "No about us information available."}
          </Typography>
        </Paper>

        {/* Services Offered */}
        <Typography variant="h5" sx={{ mt: 6, mb: 3, fontWeight: "bold", color: "#1E3A8A" }}>
          Services
        </Typography>
        <Grid container spacing={3}>
          {companyServices.length > 0 ? (
            Array.from(new Set(companyServices.map((s) => s.category))).map((category, index) => {
              const categoryServices = companyServices.filter((s) => s.category === category);
              return (
                <Grid item xs={12} sm={6} key={category}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "#fff",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: "bold",
                        color: "#1E90FF",
                        borderBottom: "2px solid #F97316",
                        pb: 1,
                      }}
                    >
                      {category}
                    </Typography>
                    <List dense>
                      {categoryServices.map((service) => (
                        <ListItem key={service.id} sx={{ pl: 2, py: 0.5 }}>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: "#333" }}>
                                <Box
                                  component="span"
                                  sx={{ color: "#F97316", mr: 1 }}
                                >
                                  •
                                </Box>
                                {service.sub_service}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              );
            })
          ) : (
            <Typography sx={{ mt: 2 }}>No services available.</Typography>
          )}
        </Grid>

        {/* Book Your Service Now Button */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: 1,
              py: 1.5,
              px: 4,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "1.1rem",
            }}
            component={Link}
            to={`/CDConsultingInquiryForm/${id}`}
          >
            Book Your Service Now
          </Button>
        </Box>

        {/* Previous Projects */}
        {projects.length > 0 && (
          <>
            <Typography
              variant="h5"
              sx={{ mt: 6, mb: 3, fontWeight: "bold", color: "#1E3A8A" }}
            >
              Previous Projects
            </Typography>
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      backgroundColor: "#E0E7FF",
                      borderLeft: "4px solid #F97316",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        project.image
                          ? `http://127.0.0.1:8000${project.image}`
                          : "https://via.placeholder.com/200"
                      }
                      alt={project.name}
                      sx={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200";
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#1E3A8A" }}
                      >
                        {project.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#374151", mb: 1 }}
                      >
                        {project.description || "No description available."}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#374151" }}>
                        Year: {project.year || "N/A"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Our Team */}
        {teamMembers.length > 0 && (
          <>
            <Typography
              variant="h5"
              sx={{ mt: 6, mb: 3, fontWeight: "bold", color: "#1E3A8A" }}
            >
              Our Team
            </Typography>
            <Grid container spacing={3}>
              {teamMembers.map((member) => (
                <Grid item xs={12} sm={6} md={4} key={member.id}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      backgroundColor: "#E0E7FF",
                      borderLeft: "4px solid #F97316",
                      textAlign: "center",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
                    }}
                  >
                    <CardContent>
                      <Avatar
                        src={
                          member.avatar
                            ? `http://127.0.0.1:8000${member.avatar}`
                            : "https://via.placeholder.com/100"
                        }
                        sx={{
                          width: 120,
                          height: 120,
                          margin: "0 auto 16px",
                          border: "4px solid #F97316",
                        }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100";
                        }}
                      />
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#1E3A8A" }}
                      >
                        {member.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#374151" }}>
                        Role: {member.role || "N/A"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Snackbar for Feedback */}
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
      </Container>
    </>
  );
};

export default CompanyDetails;