import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";

const TermsAndConditions = () => {
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
        Terms and Conditions
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to the Engineering Construction Marketplace ("Platform"). By using our Platform, you agree to these Terms and Conditions ("Terms"). If you do not agree, please do not use the Platform.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. User Eligibility
        </Typography>
        <Typography variant="body1" paragraph>
          The Platform is available to individuals and legal entities who are at least 18 years old and capable of forming legally binding agreements under applicable law. By registering, you confirm that you meet these requirements.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Account Registration
        </Typography>
        <Typography variant="body1" paragraph>
          To use the Platform, you must register an account by providing accurate and complete information, including company details and a valid registration certificate. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. User Responsibilities
        </Typography>
        <Typography variant="body1" paragraph>
          You agree to:
          <ul>
            <li>Use the Platform in compliance with all applicable laws in Nepal.</li>
            <li>Provide accurate and truthful information during registration.</li>
            <li>Not misuse the Platform for fraudulent or illegal activities.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Content Ownership and Usage
        </Typography>
        <Typography variant="body1" paragraph>
          You retain ownership of content you upload (e.g., registration certificates). By uploading, you grant us a non-exclusive, royalty-free license to use, store, and display this content solely for the purpose of providing our services (e.g., verification, display on the Platform).
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Prohibited Activities
        </Typography>
        <Typography variant="body1" paragraph>
          You may not:
          <ul>
            <li>Submit false or misleading information during registration.</li>
            <li>Engage in fraudulent activities, such as impersonation or misrepresentation.</li>
            <li>Attempt to hack, disrupt, or misuse the Platform’s infrastructure.</li>
            <li>Violate any intellectual property rights or privacy laws.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Fees and Payments
        </Typography>
        <Typography variant="body1" paragraph>
          Certain features of the Platform (e.g., Stripe Connect integration) may require payment. All fees will be clearly communicated, and payments are processed securely via Stripe. You are responsible for any applicable taxes.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Termination
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to terminate or suspend your account if you violate these Terms, engage in prohibited activities, or fail to comply with legal obligations. You may terminate your account at any time by contacting us.
        </Typography>

        <Typography variant="h6" gutterBottom>
          9. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          The Platform is provided "as is" without warranties of any kind. We are not liable for:
          <ul>
            <li>Service interruptions or data loss due to technical issues.</li>
            <li>Accuracy of third-party services (e.g., Nominatim geocoding).</li>
            <li>Any indirect, incidental, or consequential damages arising from your use of the Platform.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          10. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms are governed by the laws of Nepal. Any disputes will be resolved in the courts of Kathmandu, Nepal.
        </Typography>

        <Typography variant="h6" gutterBottom>
          11. Changes to the Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We may update these Terms from time to time. Changes will be posted on this page, and we will notify you via email or a platform announcement if significant changes occur.
        </Typography>

        <Typography variant="h6" gutterBottom>
          12. Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          For any questions or concerns regarding these Terms, please contact us at:
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

export default TermsAndConditions;