
import React, { useEffect, useState } from "react";
import API from "../services/api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled Components (Enhanced)
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "white",
  padding: "12px 24px",
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "1rem",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  color: "#1976d2",
  border: "2px solid #1976d2",
  padding: "10px 24px",
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "1rem",
  transition: "background-color 0.3s ease, border-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#e3f2fd",
    borderColor: "#1565c0",
  },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  backgroundColor: "white",
  border: "1px solid #e0e0e0",
  borderRadius: "12px",
  minHeight: "200px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
  },
  animation: "fadeIn 0.5s ease-in",
}));

const CompanyCard = styled(Card)(({ theme }) => ({
  backgroundColor: "white",
  border: "1px solid #e0e0e0",
  borderRadius: "12px",
  minHeight: "180px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
  },
  animation: "fadeIn 0.5s ease-in",
}));

const Home = () => {
  const [services, setServices] = useState([]);
  const [featuredCompanies, setFeaturedCompanies] = useState([]);

  useEffect(() => {
    API.get("/api/services/")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => console.error("Error fetching services:", error));

    API.get("/api/featured-companies/")
      .then((response) => {
        const constructionCompanies = response.data.filter(
          (company) => company.company_type === "construction"
        );
        setFeaturedCompanies(constructionCompanies);
      })
      .catch((error) => console.error("Error fetching featured companies:", error));
  }, []);

  return (
    <Box sx={{ fontFamily: "Arial, sans-serif", bgcolor: "#f4f6f8" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #1e88e5, #4fc3f7)",
          padding: { xs: "40px 20px", md: "80px 20px" },
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "3rem" },
                  lineHeight: 1.2,
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  animation: "fadeIn 1s ease-in",
                }}
              >
                Welcome to Engineering Construction Marketplace
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  opacity: 0.9,
                  animation: "fadeIn 1s ease-in 0.3s",
                }}
              >
                Connecting Clients, Companies, and Suppliers for Seamless Construction Services.
              </Typography>
              <StyledButton component={Link} to="/signup">
                Get Started
              </StyledButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
                sx={{ borderRadius: "12px", overflow: "hidden" }}
              >
                <div>
                  <img
                    src="/image/image_one.jpg"
                    alt="Slide 1"
                    style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "12px" }}
                  />
                </div>
                <div>
                  <img
                    src="/image/image_two.jpg"
                    alt="Slide 2"
                    style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "12px" }}
                  />
                </div>
                <div>
                  <img
                    src="/image/image_three.jpg"
                    alt="Slide 3"
                    style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "12px" }}
                  />
                </div>
                <div>
                  <img
                    src="/image/image_four.jpg"
                    alt="Slide 4"
                    style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "12px" }}
                  />
                </div>
                <div>
                  <img
                    src="/image/image_five.jpg"
                    alt="Slide 5"
                    style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "12px" }}
                  />
                </div>
              </Carousel>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ padding: { xs: "40px 20px", md: "60px 20px" }, backgroundColor: "#ffffff" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 700,
              textAlign: "center",
              color: "#1a237e",
              fontSize: { xs: "1.8rem", md: "2.125rem" },
            }}
          >
            Our Core Services
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 5,
              color: "#757575",
              textAlign: "center",
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            Browse through our comprehensive range of construction and engineering services designed to meet the diverse needs of projects across Nepal.
          </Typography>
          <Divider sx={{ mb: 5, borderColor: "#e0e0e0" }} />
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ServiceCard>
                  <CardContent sx={{ textAlign: "left", padding: "24px" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "#1a237e",
                        fontSize: "1.25rem",
                      }}
                    >
                      {service.category}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#424242",
                        lineHeight: "1.6",
                        fontSize: "0.95rem",
                      }}
                      component="div"
                    >
                      {service.services.length > 0
                        ? service.services.map((s, idx) => (
                            <span key={idx}>
                              {s.name}
                              {idx < service.services.length - 1 && <br />}
                            </span>
                          ))
                        : "Explore a variety of services in this category."}
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Companies Section */}
      <Box sx={{ padding: { xs: "40px 20px", md: "60px 20px" }, backgroundColor: "#f4f6f8" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 700,
              textAlign: "center",
              color: "#1a237e",
              fontSize: { xs: "1.8rem", md: "2.125rem" },
            }}
          >
            Featured Construction Companies
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 5,
              color: "#757575",
              textAlign: "center",
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            These verified construction companies offer exceptional services and have received top ratings from clients across Nepal.
          </Typography>
          <Divider sx={{ mb: 5, borderColor: "#e0e0e0" }} />
          <Grid container spacing={4}>
            {featuredCompanies.length > 0 ? (
              featuredCompanies.map((company, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CompanyCard>
                    <CardContent sx={{ textAlign: "left", padding: "24px" }}>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 1,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          color: "#1a237e",
                          fontSize: "1.25rem",
                        }}
                      >
                        {company.company_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 2,
                          color: "#424242",
                          lineHeight: "1.6",
                          fontSize: "0.95rem",
                        }}
                      >
                        {company.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#1976d2",
                          fontWeight: 500,
                          fontSize: "0.9rem",
                        }}
                      >
                        ⭐ {company.average_rating}/5 | {company.service_count} Service{company.service_count !== 1 ? "s" : ""}
                      </Typography>
                    </CardContent>
                  </CompanyCard>
                </Grid>
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  color: "#757575",
                  fontStyle: "italic",
                  py: 3,
                }}
              >
                No construction companies available at the moment.
              </Typography>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ backgroundColor: "#1a237e", color: "white", padding: { xs: "40px 20px", md: "60px 20px" } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 700,
              textAlign: "center",
              color: "#ffffff",
              fontSize: { xs: "1.8rem", md: "2.125rem" },
            }}
          >
            Join Our Growing Construction Marketplace
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              textAlign: "center",
              color: "#e0e0e0",
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            Whether you're looking for construction services or you're a company offering them, create an account today to get started.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <StyledButton component={Link} to="/signup">
              Sign Up as Client
            </StyledButton>
            <SecondaryButton component={Link} to="/companyregistration">
              Sign Up as Company
            </SecondaryButton>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#0d1a3a", color: "white", padding: { xs: "20px", md: "30px" } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 2, md: 3 },
              mb: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              href="/terms"
              sx={{
                color: "#e0e0e0",
                textTransform: "none",
                fontWeight: 400,
                fontSize: "0.9rem",
                "&:hover": { color: "#ffffff", textDecoration: "underline" },
              }}
            >
              Terms and Conditions
            </Button>
            <Button
              href="/about"
              sx={{
                color: "#e0e0e0",
                textTransform: "none",
                fontWeight: 400,
                fontSize: "0.9rem",
                "&:hover": { color: "#ffffff", textDecoration: "underline" },
              }}
            >
              About Us
            </Button>
          </Box>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "#b0bec5",
              fontSize: "0.85rem",
            }}
          >
            © 2024 Engineering Construction Marketplace. All rights reserved.
          </Typography>
        </Container>
      </Box>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default Home;