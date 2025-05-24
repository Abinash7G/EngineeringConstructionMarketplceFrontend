
import React, { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Button, 
  Typography, 
  IconButton, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaTimes } from "react-icons/fa";
import axios from "axios";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/home";
  const [openContact, setOpenContact] = useState(false);
  const [openComplain, setOpenComplain] = useState(false);
  const [complainData, setComplainData] = useState({
    subject: '',
    category: '',
    description: '',
    email: ''
  });
  const [userEmail, setUserEmail] = useState(''); // New state for authenticated user's email
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch user email if authenticated
  useEffect(() => {
    const fetchUserEmail = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/user-profile/', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserEmail(response.data.email);
          setComplainData((prev) => ({ ...prev, email: response.data.email }));
        } catch (error) {
          console.error("Error fetching user email:", error);
          setSnackbar({
            open: true,
            message: 'Failed to fetch user email',
            severity: 'error'
          });
        }
      }
    };
    fetchUserEmail();
  }, []);

  const handleComplainOpen = () => setOpenComplain(true);
  const handleComplainClose = () => {
    setOpenComplain(false);
    resetComplainForm();
  };

  const handleContactOpen = () => setOpenContact(true);
  const handleContactClose = () => setOpenContact(false);

  const resetComplainForm = () => {
    setComplainData({ 
      subject: '', 
      category: '', 
      description: '', 
      email: userEmail // Reset to user's email if authenticated
    });
    setConsent(false);
    setCaptchaVerified(false);
    setErrors({});
  };

  const handleComplainChange = (e) => {
    setComplainData({ ...complainData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!complainData.subject) newErrors.subject = 'Subject is required';
    if (!complainData.category) newErrors.category = 'Category is required';
    if (!complainData.description) newErrors.description = 'Description is required';
    if (!complainData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(complainData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleComplainSubmit = async () => {
    if (!validateForm() || !validateSubmission()) return;

    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axios.post(
        'http://localhost:8000/api/complaints/',
        complainData,
        { headers }
      );

      handleSuccess(response.data.ticket_id);
    } catch (error) {
      console.error("Complaint submission error:", error);
      if (error.response?.status === 401) {
        navigate('/login');
        showError('Please login to submit complaints');
      } else if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        showError('Please correct the form errors');
      } else {
        showError(error.response?.data?.detail || 'Submission failed');
      }
    }
  };

  const validateSubmission = () => {
    if (!consent) {
      showError('Please agree to the privacy policy');
      return false;
    }

    if (!localStorage.getItem('access_token') && !captchaVerified) {
      showError('Please verify the CAPTCHA');
      return false;
    }

    return true;
  };

  const handleSuccess = (ticketId) => {
    setSnackbar({
      open: true,
      message: `Complaint submitted! Ticket ID: ${ticketId || 'N/A'}`,
      severity: 'success'
    });
    handleComplainClose();
  };

  const showError = (message) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={footerStyles}>
      <Container maxWidth="lg">
        <Box sx={linksContainerStyles}>
          <Button href="/terms" sx={linkStyle}>Terms</Button>
          <Button href="/privacy" sx={linkStyle}>Privacy</Button>
          <Button onClick={handleContactOpen} sx={linkStyle}>Contact</Button>
          <Button href="/support_home" sx={linkStyle}>Support</Button>
          <Button onClick={handleComplainOpen} sx={linkStyle}>Complain</Button>
          {isHomePage && <Button href="/about" sx={linkStyle}>About</Button>}
        </Box>

        <ContactModal 
          open={openContact} 
          onClose={handleContactClose} 
        />

        <ComplaintModal
          open={openComplain}
          onClose={handleComplainClose}
          data={complainData}
          onChange={handleComplainChange}
          onSubmit={handleComplainSubmit}
          consent={consent}
          onConsentChange={(e) => setConsent(e.target.checked)}
          captchaVerified={captchaVerified}
          onCaptchaVerify={() => setCaptchaVerified(true)} // TODO: Integrate real CAPTCHA (e.g., reCAPTCHA)
          errors={errors}
        />

        <SocialLinks />

        <Typography variant="body2" sx={copyrightStyles}>
          © {new Date().getFullYear()} Engineering Construction Marketplace
        </Typography>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

// Sub-components
const ContactModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      Contact Information
      <IconButton onClick={onClose} sx={closeButtonStyles}>
        <FaTimes />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <Typography sx={contactInfoStyles}><strong>Email:</strong> fybproject6@gmail.com</Typography>
      <Typography sx={contactInfoStyles}><strong>Phone:</strong> +977 9846993923</Typography>
      <Typography sx={contactInfoStyles}><strong>Address:</strong> Futung Tarkeshwor, Kathmandu</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

const ComplaintModal = ({
  open,
  onClose,
  data,
  onChange,
  onSubmit,
  consent,
  onConsentChange,
  captchaVerified,
  onCaptchaVerify,
  errors
}) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>
      File a Complaint
      <IconButton onClick={onClose} sx={closeButtonStyles}>
        <FaTimes />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <TextField
        fullWidth
        label="Subject"
        name="subject"
        value={data.subject}
        onChange={onChange}
        margin="normal"
        required
        error={!!errors.subject}
        helperText={errors.subject}
      />
      
      <CategorySelect 
        value={data.category}
        onChange={onChange}
        error={errors.category}
      />

      <DescriptionField 
        value={data.description}
        onChange={onChange}
        error={errors.description}
      />

      {/* Always show email field */}
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={data.email}
        onChange={onChange}
        margin="normal"
        required
        error={!!errors.email}
        helperText={errors.email}
      />

      <CaptchaSection 
        captchaVerified={captchaVerified}
        onVerify={onCaptchaVerify}
      />

      <ConsentCheckbox 
        checked={consent}
        onChange={onConsentChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <SubmitButton 
        disabled={
          !data.subject ||
          !data.category ||
          !data.description ||
          !data.email ||
          !consent ||
          (!localStorage.getItem('access_token') && !captchaVerified)
        }
        onClick={onSubmit}
      />
    </DialogActions>
  </Dialog>
);

const CategorySelect = ({ value, onChange, error }) => (
  <TextField
    select
    fullWidth
    label="Category"
    name="category"
    value={value}
    onChange={onChange}
    margin="normal"
    required
    error={!!error}
    helperText={error}
  >
    {['Service Quality', 'Payment Issue', 'Technical Problem', 'Other'].map((option) => (
      <MenuItem key={option} value={option}>{option}</MenuItem>
    ))}
  </TextField>
);

const DescriptionField = ({ value, onChange, error }) => (
  <TextField
    fullWidth
    multiline
    rows={4}
    label="Description"
    name="description"
    value={value}
    onChange={onChange}
    margin="normal"
    required
    error={!!error}
    helperText={error}
  />
);

const CaptchaSection = ({ captchaVerified, onVerify }) => (
  !localStorage.getItem('access_token') && (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="outlined"
        onClick={onVerify}
        disabled={captchaVerified}
      >
        {captchaVerified ? '✓ Verified' : 'Verify CAPTCHA'}
      </Button>
    </Box>
  )
);

const ConsentCheckbox = ({ checked, onChange }) => (
  <FormControlLabel
    control={<Checkbox checked={checked} onChange={onChange} color="primary" />}
    label={
      <Typography variant="body2">
        I agree to the{' '}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </Typography>
    }
    sx={{ mt: 2 }}
  />
);

const SubmitButton = ({ disabled, onClick }) => (
  <Button 
    onClick={onClick}
    variant="contained" 
    color="primary"
    disabled={disabled}
  >
    Submit Complaint
  </Button>
);

const SocialLinks = () => (
  <Box sx={socialLinksStyles}>
    <IconButton href="https://facebook.com" target="_blank" sx={socialButtonStyles}>
      <FaFacebook />
    </IconButton>
    <IconButton href="https://twitter.com" target="_blank" sx={socialButtonStyles}>
      <FaTwitter />
    </IconButton>
    <IconButton href="https://linkedin.com" target="_blank" sx={socialButtonStyles}>
      <FaLinkedin />
    </IconButton>
  </Box>
);

// Styles
const footerStyles = {
  backgroundColor: "#333",
  color: "white",
  padding: "20px",
  marginTop: 'auto'
};

const linksContainerStyles = {
  display: "flex",
  justifyContent: "center",
  gap: 3,
  mb: 2,
  flexWrap: "wrap"
};

const linkStyle = {
  color: "white",
  textTransform: "none",
  "&:hover": { color: "#ddd" }
};

const closeButtonStyles = {
  position: 'absolute',
  right: 8,
  top: 8,
  color: (theme) => theme.palette.grey[500],
};

const contactInfoStyles = {
  mb: 2,
  '& strong': { display: 'inline-block', width: '80px' }
};

const socialLinksStyles = {
  display: "flex",
  justifyContent: "center",
  gap: 2,
  mb: 2
};

const socialButtonStyles = {
  color: "white",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" }
};

const copyrightStyles = {
  textAlign: "center"
};

export default Footer;