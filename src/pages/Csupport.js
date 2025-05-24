import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Csupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm() || !validateSubmission()) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axios.post(
        'http://localhost:8000/api/support/',
        formData,
        { headers }
      );

      handleSuccess(response.data.ticket_id);
    } catch (error) {
      console.error("Support request error:", error);
      if (error.response?.status === 401) {
        navigate('/login');
        showError('Please login to submit support requests');
      } else if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        showError('Please correct the form errors');
      } else {
        showError(error.response?.data?.detail || 'Submission failed');
      }
    } finally {
      setLoading(false);
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
      message: `Support request submitted! Ticket ID: ${ticketId || 'N/A'}`,
      severity: 'success'
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
    setConsent(false);
    setCaptchaVerified(false);
    setErrors({});
  };

  const showError = (message) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={pageStyles}>
      <Container maxWidth="md" sx={containerStyles}>
        <Typography variant="h4" sx={titleStyles}>
          Contact Support
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.subject}
            helperText={errors.subject}
          />
          
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.message}
            helperText={errors.message}
          />

          <CaptchaSection 
            captchaVerified={captchaVerified}
            onVerify={() => setCaptchaVerified(true)} // TODO: Integrate real CAPTCHA (e.g., reCAPTCHA)
          />

          <ConsentCheckbox 
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />

          <SubmitButton loading={loading} />
        </Box>
      </Container>

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
    </Box>
  );
};

// Sub-components
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

const SubmitButton = ({ loading }) => (
  <Button
    type="submit"
    variant="contained"
    color="primary"
    sx={{ mt: 3 }}
    disabled={loading}
  >
    {loading ? 'Submitting...' : 'Submit Request'}
  </Button>
);

// Styles
const pageStyles = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
};

const containerStyles = {
  py: 4,
  flex: 1
};

const titleStyles = {
  fontWeight: 'bold',
  color: '#1976d2',
  mb: 3
};

const formStyles = {
  mt: 3
};

export default Csupport;