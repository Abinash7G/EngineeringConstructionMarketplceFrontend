
import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Animation for overlay
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CDBanner = ({ slides = [] }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Default slides if none are provided
  const defaultSlides = [
    {
      imageSrc: "/image/image_one.jpg",
      title: "Welcome to Our Construction Platform",
      description: "We connect you with top, verified construction companies.",
      buttonText: "Learn More",
      buttonAction: () => navigate('/about'),
      altText: "Construction Platform Overview",
    },
    {
      imageSrc: "/image/image_two.jpg",
      title: "Quality Building Services",
      description: "Find the best services for your construction needs.",
      buttonText: "Companies",
      buttonAction: () => navigate('/all-companies'),
      altText: "Building Services Showcase",
    },
    {
      imageSrc: "/image/image_three.jpg",
      title: "Premium Construction Supplies",
      description: "Get high-quality supplies for your projects.",
      buttonText: "Shop Now",
      buttonAction: () => navigate('/all-products'),
      altText: "Construction Supplies Promotion",
    },
    {
      imageSrc: "/image/image_four.jpg",
      title: "Survey Instrument Rentals",
      description: "Rent the latest survey instruments for your projects.",
      altText: "Survey Instrument Rental Promotion",
    },
  ];

  const carouselSlides = slides.length > 0 ? slides : defaultSlides;

  return (
    <Box sx={{ mb: 3 }}>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        showArrows={true}
        showIndicators={true}
        stopOnHover={true}
        ariaLabel="Promotional Banner Carousel"
      >
        {carouselSlides.map((slide, index) => (
          <div key={index}>
            <img
              src={slide.imageSrc}
              alt={slide.altText}
              loading="lazy"
              // onError={(e) => (e.target.src = "/image/fallback.jpg")} // Fallback image
              style={{
                height: '500px',
                objectFit: 'cover',
                position: 'relative',
                [theme.breakpoints.down('sm')]: {
                  height: '300px',
                },
                [theme.breakpoints.down('xs')]: {
                  height: '200px',
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: theme.palette.common.white,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: theme.spacing(2),
                borderRadius: theme.shape.borderRadius,
                maxWidth: "80%",
                animation: `${fadeIn} 0.5s ease-in`,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '1.5rem',
                  },
                }}
              >
                {slide.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '0.9rem',
                  },
                }}
              >
                {slide.description}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={slide.buttonAction}
                aria-label={slide.buttonText}
              >
                {slide.buttonText}
              </Button>
            </Box>
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default CDBanner;