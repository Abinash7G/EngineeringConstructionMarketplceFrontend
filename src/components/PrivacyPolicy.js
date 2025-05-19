import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "#0073e6" }}>
        Privacy Policy
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to the Engineering Construction Marketplace. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our platform.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We collect the following types of information:
          <ul>
            <li>Personal Information: Name, email address, phone number, and other details provided during registration.</li>
            <li>Company Information: Company name, type, email, location details, and registration certificates.</li>
            <li>Technical Data: IP address, browser type, and usage data (if applicable).</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use your information to:
          <ul>
            <li>Facilitate company registration and verification.</li>
            <li>Communicate with you regarding your account or services.</li>
            <li>Improve our platform and ensure its security.</li>
            <li>Comply with legal obligations under Nepal’s Individual Privacy Act 2018.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Data Sharing and Disclosure
        </Typography>
        <Typography variant="body1" paragraph>
          We may share your data with:
          <ul>
            <li>Third-party services (e.g., Nominatim for geocoding, Stripe for payments) as necessary to provide our services.</li>
            <li>Legal authorities if required by law or to protect our rights.</li>
          </ul>
          We do not sell your personal information to third parties.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Data Storage and Security
        </Typography>
        <Typography variant="body1" paragraph>
          Your data is stored securely using industry-standard encryption and access controls. Registration certificates are stored in a protected directory, and access is restricted to authorized personnel only.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. User Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to:
          <ul>
            <li>Access your personal data.</li>
            <li>Request corrections to inaccurate data.</li>
            <li>Request deletion of your data, subject to legal obligations.</li>
          </ul>
          To exercise these rights, please contact us at the details below.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Cookies and Tracking
        </Typography>
        <Typography variant="body1" paragraph>
          We currently do not use cookies or tracking technologies. If this changes, we will update this policy and seek your consent where required.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Third-Party Services
        </Typography>
        <Typography variant="body1" paragraph>
          We use Nominatim for geocoding location data. Nominatim’s privacy practices are governed by OpenStreetMap’s policies, which you can review at{" "}
          <Link href="https://wiki.openstreetmap.org/wiki/Privacy_Policy" target="_blank" sx={{ color: "#0073e6", textDecoration: "underline" }}>
            OpenStreetMap Privacy Policy
          </Link>.
        </Typography>

        <Typography variant="h6" gutterBottom>
          9. Changes to the Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. Changes will be posted on this page, and we will notify you via email or a platform announcement if significant changes occur.
        </Typography>

        <Typography variant="h6" gutterBottom>
          10. Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          For any privacy-related concerns, please contact us at:
          <br />
          Email: fybproject6@gmail.com
          <br />
          Phone: +977-9846993923
          <br />
          Address: Kathmandu, Nepal
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;