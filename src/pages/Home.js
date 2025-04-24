// import React, { useEffect, useState } from "react";
// import API from "../services/api";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import { Link } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Container,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { styled } from "@mui/system";

// // Styled components
// const StyledButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "#007BFF",
//   color: "white",
//   padding: "10px 20px",
//   borderRadius: "5px",
//   textTransform: "none",
//   "&:hover": {
//     backgroundColor: "#005bb5",
//   },
// }));

// const SecondaryButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "white",
//   color: "#007BFF",
//   border: "1px solid #007BFF",
//   padding: "10px 20px",
//   borderRadius: "5px",
//   textTransform: "none",
//   "&:hover": {
//     backgroundColor: "#f0f0f0",
//   },
// }));

// const ServiceCard = styled(Card)(({ theme }) => ({
//   backgroundColor: "white",
//   border: "1px solid #e0e0e0",
//   borderRadius: "8px",
//   minHeight: "200px",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   "&:hover": {
//     transform: "scale(1.02)",
//     boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
//   },
// }));

// const CompanyCard = styled(Card)(({ theme }) => ({
//   backgroundColor: "white",
//   border: "1px solid #e0e0e0",
//   borderRadius: "8px",
//   minHeight: "180px",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   "&:hover": {
//     transform: "scale(1.02)",
//     boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
//   },
// }));

// const Home = () => {
//   const [services, setServices] = useState([]);
//   const [featuredCompanies, setFeaturedCompanies] = useState([]);

//   useEffect(() => {
//     // Fetch services
//     API.get("/api/services/")
//       .then((response) => {
//         setServices(response.data);
//       })
//       .catch((error) => console.error("Error fetching services:", error));

//     // Fetch featured companies
//     API.get("/api/featured-companies/")
//       .then((response) => {
//         setFeaturedCompanies(response.data);
//       })
//       .catch((error) => console.error("Error fetching featured companies:", error));
//   }, []);

//   return (
//     <Box sx={{ fontFamily: "Arial, sans-serif" }}>
//       {/* Hero Section (unchanged) */}
//       <Box
//         sx={{
//           background: "linear-gradient(90deg, #4a90e2, #50c9c3)",
//           padding: { xs: "40px 20px", md: "60px 20px" },
//           color: "white",
//         }}
//       >
//         <Container maxWidth="lg">
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
//               <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
//                 Welcome to Engineering Construction Marketplace
//               </Typography>
//               <Typography variant="h6" sx={{ mb: 3 }}>
//                 Connecting Clients, Companies, and Suppliers for Seamless Construction Services.
//               </Typography>
//               <StyledButton component={Link} to="/signup">Get Started</StyledButton>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Carousel
//                 autoPlay
//                 infiniteLoop
//                 showThumbs={false}
//                 showStatus={false}
//                 interval={3000}
//               >
//                 <div>
//                   <img
//                     src="/image/image_one.jpg"
//                     alt="Slide 1"
//                     style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px" }}
//                   />
//                 </div>
//                 <div>
//                   <img
//                     src="/image/image_two.jpg"
//                     alt="Slide 2"
//                     style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px" }}
//                   />
//                 </div>
//                 <div>
//                   <img
//                     src="/image/image_three.jpg"
//                     alt="Slide 3"
//                     style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px" }}
//                   />
//                 </div>
//                 <div>
//                   <img
//                     src="/image/image_four.jpg"
//                     alt="Slide 4"
//                     style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px" }}
//                   />
//                 </div>
//                 <div>
//                   <img
//                     src="/image/image_five.jpg"
//                     alt="Slide 5"
//                     style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px" }}
//                   />
//                 </div>
//               </Carousel>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Services Section (unchanged) */}
//       <Box sx={{ padding: "60px 20px", backgroundColor: "#f9f9f9" }}>
//         <Container maxWidth="lg">
//           <Typography
//             variant="h4"
//             sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#007BFF" }}
//           >
//             Our Core Services
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 4, color: "#555", textAlign: "center" }}>
//             Browse through our comprehensive range of construction and engineering
//             services designed to meet the diverse needs of projects across Nepal.
//           </Typography>
//           <Grid container spacing={4}>
//             {services.map((service, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <ServiceCard>
//                   <CardContent sx={{ textAlign: "left", padding: "24px" }}>
//                     <Typography
//                       variant="h5"
//                       sx={{
//                         mb: 2,
//                         fontWeight: "bold",
//                         textTransform: "uppercase",
//                         color: "#333",
//                       }}
//                     >
//                       {service.category}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{ color: "#666", lineHeight: "1.6" }}
//                       component="div"
//                     >
//                       {service.services.length > 0
//                         ? service.services.map((s, idx) => (
//                             <span key={idx}>
//                               {s.name}
//                               {idx < service.services.length - 1 && <br />}
//                             </span>
//                           ))
//                         : "Explore a variety of services in this category."}
//                     </Typography>
//                   </CardContent>
//                 </ServiceCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Featured Companies Section (Updated with Dynamic Data) */}
//       <Box sx={{ padding: "60px 20px" }}>
//         <Container maxWidth="lg">
//           <Typography
//             variant="h4"
//             sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#007BFF" }}
//           >
//             Featured Companies
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 4, color: "#555", textAlign: "center" }}>
//             These verified construction companies offer exceptional services and
//             have received top ratings from clients across Nepal.
//           </Typography>
//           <Grid container spacing={4}>
//             {featuredCompanies.map((company, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <CompanyCard>
//                   <CardContent sx={{ textAlign: "left", padding: "24px" }}>
//                     <Typography
//                       variant="h5"
//                       sx={{
//                         mb: 1,
//                         fontWeight: "bold",
//                         textTransform: "uppercase",
//                         color: "#333",
//                       }}
//                     >
//                       {company.company_name}
//                     </Typography>
//                     <Typography variant="body2" sx={{ mb: 2, color: "#666", lineHeight: "1.6" }}>
//                       {company.description}
//                     </Typography>
//                     <Typography variant="body2" sx={{ color: "#007BFF" }}>
//                       ⭐ {company.average_rating}/5 | {company.service_count} Service{company.service_count !== 1 ? "s" : ""}
//                     </Typography>
//                   </CardContent>
//                 </CompanyCard>
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ mt: 4, textAlign: "center" }}>
//             <SecondaryButton>View All Companies</SecondaryButton>
//           </Box>
//         </Container>
//       </Box>

//       {/* Call to Action Section (unchanged) */}
//       <Box sx={{ backgroundColor: "#333", color: "white", padding: "40px 20px" }}>
//         <Container maxWidth="lg">
//           <Typography
//             variant="h4"
//             sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#007BFF" }}
//           >
//             Join Our Growing Construction Marketplace
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
//             Whether you're looking for construction services or you're a company
//             offering them, create an account today to get started.
//           </Typography>
//           <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
//             <StyledButton component={Link} to="/signup">Sign Up as Client</StyledButton>
//             <SecondaryButton component={Link} to="/companyregistration">Sign Up as Company</SecondaryButton>
//           </Box>
//         </Container>
//       </Box>

//       {/* Footer (unchanged) */}
//       <Box sx={{ backgroundColor: "#333", color: "white", padding: "20px" }}>
//         <Container maxWidth="lg">
//           <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 2 }}>
//             <Button href="/terms" sx={{ color: "white", textTransform: "none" }}>
//               Terms and Conditions
//             </Button>
//             <Button href="/about" sx={{ color: "white", textTransform: "none" }}>
//               About Us
//             </Button>
//           </Box>
//           <Typography variant="body2" sx={{ textAlign: "center" }}>
//             © 2024 Engineering Construction Marketplace. All rights reserved.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Home;
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
} from "@mui/material";
import { styled } from "@mui/system";

// Styled components (unchanged)
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#007BFF",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#005bb5",
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  color: "#007BFF",
  border: "1px solid #007BFF",
  padding: "10px 20px",
  borderRadius: "5px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  backgroundColor: "white",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  minHeight: "200px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
  },
}));

const CompanyCard = styled(Card)(({ theme }) => ({
  backgroundColor: "white",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  minHeight: "180px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
  },
}));

const Home = () => {
  const [services, setServices] = useState([]);
  const [featuredCompanies, setFeaturedCompanies] = useState([]);

  useEffect(() => {
    // Fetch services (unchanged)
    API.get("/api/services/")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => console.error("Error fetching services:", error));

    // Fetch featured companies and filter for construction type
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
    <Box sx={{ fontFamily: "Arial, sans-serif" }}>
      {/* Hero Section (unchanged) */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #4a90e2, #50c9c3)",
          padding: { xs: "40px 20px", md: "60px 20px" },
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
              <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
                Welcome to Engineering Construction Marketplace
              </Typography>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Connecting Clients, Companies, and Suppliers for Seamless Construction Services.
              </Typography>
              <StyledButton component={Link} to="/signup">Get Started</StyledButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
              >
                <div>
                  <img
                    src="/image/image_one.jpg"
                    alt="Slide 1"
                    style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px" }}
                  />
                </div>
                <div>
                  <img
                    src="/image/image_two.jpg"
                    alt="Slide 2"
                    style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px" }}
                  />
                </div>
                <div>
                  <img
                    src="/image/image_three.jpg"
                    alt="Slide 3"
                    style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px" }}
                  />
                </div>
                <div>
                  <img
                    src="/image/image_four.jpg"
                    alt="Slide 4"
                    style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px" }}
                  />
                </div>
                <div>
                  <img
                    src="/image/image_five.jpg"
                    alt="Slide 5"
                    style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px" }}
                  />
                </div>
              </Carousel>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section (unchanged) */}
      <Box sx={{ padding: "60px 20px", backgroundColor: "#f9f9f9" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#007BFF" }}
          >
            Our Core Services
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "#555", textAlign: "center" }}>
            Browse through our comprehensive range of construction and engineering
            services designed to meet the diverse needs of projects across Nepal.
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ServiceCard>
                  <CardContent sx={{ textAlign: "left", padding: "24px" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "#333",
                      }}
                    >
                      {service.category}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#666", lineHeight: "1.6" }}
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

      {/* Featured Companies Section (Updated with Filtered Data) */}
      <Box sx={{ padding: "60px 20px" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#007BFF" }}
          >
            Featured Construction Companies
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "#555", textAlign: "center" }}>
            These verified construction companies offer exceptional services and
            have received top ratings from clients across Nepal.
          </Typography>
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
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          color: "#333",
                        }}
                      >
                        {company.company_name}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2, color: "#666", lineHeight: "1.6" }}>
                        {company.description}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#007BFF" }}>
                        ⭐ {company.average_rating}/5 | {company.service_count} Service{company.service_count !== 1 ? "s" : ""}
                      </Typography>
                    </CardContent>
                  </CompanyCard>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: "center", width: "100%", color: "#666" }}>
                No construction companies available at the moment.
              </Typography>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section (unchanged) */}
      <Box sx={{ backgroundColor: "#333", color: "white", padding: "40px 20px" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#007BFF" }}
          >
            Join Our Growing Construction Marketplace
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
            Whether you're looking for construction services or you're a company
            offering them, create an account today to get started.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <StyledButton component={Link} to="/signup">Sign Up as Client</StyledButton>
            <SecondaryButton component={Link} to="/companyregistration">Sign Up as Company</SecondaryButton>
          </Box>
        </Container>
      </Box>

      {/* Footer (unchanged) */}
      <Box sx={{ backgroundColor: "#333", color: "white", padding: "20px" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 2 }}>
            <Button href="/terms" sx={{ color: "white", textTransform: "none" }}>
              Terms and Conditions
            </Button>
            <Button href="/about" sx={{ color: "white", textTransform: "none" }}>
              About Us
            </Button>
          </Box>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            © 2024 Engineering Construction Marketplace. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;