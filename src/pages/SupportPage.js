// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Container,
//   TextField,
//   Button,
//   Snackbar,
//   Alert,
//   Checkbox,
//   FormControlLabel
// } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SupportPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [consent, setConsent] = useState(false);
//   const [captchaVerified, setCaptchaVerified] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({ 
//     open: false, 
//     message: '', 
//     severity: 'success' 
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: '' });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
//     if (!formData.subject) newErrors.subject = 'Subject is required';
//     if (!formData.message) newErrors.message = 'Message is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!validateForm() || !validateSubmission()) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('access_token');
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
//       const response = await axios.post(
//         'http://localhost:8000/api/support/',
//         formData,
//         { headers }
//       );

//       handleSuccess(response.data.ticket_id);
//     } catch (error) {
//       console.error("Support request error:", error);
//       if (error.response?.status === 401) {
//         navigate('/login');
//         showError('Please login to submit support requests');
//       } else if (error.response?.data?.errors) {
//         setErrors(error.response.data.errors);
//         showError('Please correct the form errors');
//       } else {
//         showError(error.response?.data?.detail || 'Submission failed');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validateSubmission = () => {
//     if (!consent) {
//       showError('Please agree to the privacy policy');
//       return false;
//     }

//     if (!localStorage.getItem('access_token') && !captchaVerified) {
//       showError('Please verify the CAPTCHA');
//       return false;
//     }

//     return true;
//   };

//   const handleSuccess = (ticketId) => {
//     setSnackbar({
//       open: true,
//       message: `Support request submitted! Ticket ID: ${ticketId || 'N/A'}`,
//       severity: 'success'
//     });
//     setFormData({ name: '', email: '', subject: '', message: '' });
//     setConsent(false);
//     setCaptchaVerified(false);
//     setErrors({});
//   };

//   const showError = (message) => {
//     setSnackbar({ open: true, message, severity: 'error' });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar(prev => ({ ...prev, open: false }));
//   };

//   return (
//     <Box sx={pageStyles}>
//       <Container maxWidth="md" sx={containerStyles}>
//         <Typography variant="h4" sx={titleStyles}>
//           Contact Support
//         </Typography>
        
//         <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
//           <TextField
//             fullWidth
//             label="Your Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             margin="normal"
//             required
//             error={!!errors.name}
//             helperText={errors.name}
//           />
          
//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             margin="normal"
//             required
//             error={!!errors.email}
//             helperText={errors.email}
//           />
          
//           <TextField
//             fullWidth
//             label="Subject"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             margin="normal"
//             required
//             error={!!errors.subject}
//             helperText={errors.subject}
//           />
          
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             label="Message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             margin="normal"
//             required
//             error={!!errors.message}
//             helperText={errors.message}
//           />

//           <CaptchaSection 
//             captchaVerified={captchaVerified}
//             onVerify={() => setCaptchaVerified(true)} // TODO: Integrate real CAPTCHA (e.g., reCAPTCHA)
//           />

//           <ConsentCheckbox 
//             checked={consent}
//             onChange={(e) => setConsent(e.target.checked)}
//           />

//           <SubmitButton loading={loading} />
//         </Box>
//       </Container>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// // Sub-components
// const CaptchaSection = ({ captchaVerified, onVerify }) => (
//   !localStorage.getItem('access_token') && (
//     <Box sx={{ mt: 2 }}>
//       <Button
//         variant="outlined"
//         onClick={onVerify}
//         disabled={captchaVerified}
//       >
//         {captchaVerified ? '✓ Verified' : 'Verify CAPTCHA'}
//       </Button>
//     </Box>
//   )
// );

// const ConsentCheckbox = ({ checked, onChange }) => (
//   <FormControlLabel
//     control={<Checkbox checked={checked} onChange={onChange} color="primary" />}
//     label={
//       <Typography variant="body2">
//         I agree to the{' '}
//         <a href="/privacy" target="_blank" rel="noopener noreferrer">
//           Privacy Policy
//         </a>
//       </Typography>
//     }
//     sx={{ mt: 2 }}
//   />
// );

// const SubmitButton = ({ loading }) => (
//   <Button
//     type="submit"
//     variant="contained"
//     color="primary"
//     sx={{ mt: 3 }}
//     disabled={loading}
//   >
//     {loading ? 'Submitting...' : 'Submit Request'}
//   </Button>
// );

// // Styles
// const pageStyles = {
//   minHeight: '100vh',
//   display: 'flex',
//   flexDirection: 'column'
// };

// const containerStyles = {
//   py: 4,
//   flex: 1
// };

// const titleStyles = {
//   fontWeight: 'bold',
//   color: '#1976d2',
//   mb: 3
// };

// const formStyles = {
//   mt: 3
// };

// export default SupportPage;
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  DialogContentText
} from '@mui/material';
import { FaReply, FaEye, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import moment from 'moment';

const SupportRequestsPage = () => {
  const [supportRequests, setSupportRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseBody, setResponseBody] = useState('');

  useEffect(() => {
    fetchSupportRequests();
  }, []);

  const fetchSupportRequests = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:8000/api/support-requests/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSupportRequests(response.data.support_requests);
    } catch (error) {
      console.error("Error fetching support requests:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.detail || 'Failed to load support requests',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://localhost:8000/api/support-requests/${requestId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSupportRequests(supportRequests.filter(request => request.id !== requestId));
      setSnackbar({
        open: true,
        message: 'Support request deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error("Error deleting support request:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.detail || 'Failed to delete support request',
        severity: 'error'
      });
    }
  };

  const handleOpenResponseModal = (request) => {
    setSelectedRequest(request);
    setResponseBody('');
    setOpenResponseModal(true);
  };

  const handleOpenDetailsModal = (request) => {
    setSelectedRequest(request);
    setOpenDetailsModal(true);
  };

  const handleCloseResponseModal = () => {
    setOpenResponseModal(false);
    setSelectedRequest(null);
    setResponseBody('');
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedRequest(null);
  };

  const handleSendResponse = async () => {
    if (!responseBody.trim()) {
      setSnackbar({
        open: true,
        message: 'Response body cannot be empty',
        severity: 'error'
      });
      return;
    }

    const email = selectedRequest.email;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSnackbar({
        open: true,
        message: 'Invalid or missing email address',
        severity: 'error'
      });
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://localhost:8000/api/send-response-email/', {
        email,
        client_name: selectedRequest.name || (selectedRequest.user || 'Client'),
        subject: `Response to Your Support Request: ${selectedRequest.subject}`,
        response_body: responseBody
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSnackbar({
        open: true,
        message: 'Response sent successfully',
        severity: 'success'
      });
      handleCloseResponseModal();
    } catch (error) {
      console.error("Error sending response:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.detail || 'Failed to send response',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 4, bgcolor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
          Support Requests
        </Typography>

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
        ) : (
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead sx={{ bgcolor: '#1976d2' }}>
                <TableRow>
                  {['Ticket ID', 'User', 'Name', 'Email', 'Subject', 'Message', 'Submitted At', 'Actions'].map((header) => (
                    <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold' }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {supportRequests.map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.user || 'Anonymous'}</TableCell>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.subject}</TableCell>
                    <TableCell>
                      {request.message.length > 50 ? `${request.message.substring(0, 50)}...` : request.message}
                    </TableCell>
                    <TableCell>{moment(request.created_at).format('MMM DD, YYYY HH:mm')}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenResponseModal(request)}>
                        <FaReply />
                      </IconButton>
                      <IconButton color="info" onClick={() => handleOpenDetailsModal(request)}>
                        <FaEye />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteRequest(request.id)}>
                        <FaTrash />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog open={openResponseModal} onClose={handleCloseResponseModal} fullWidth maxWidth="sm">
          <DialogTitle>Send Response</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Client Name:</strong> {selectedRequest?.name || (selectedRequest?.user || 'Anonymous')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Client Email:</strong> {selectedRequest?.email}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Response"
              value={responseBody}
              onChange={(e) => setResponseBody(e.target.value)}
              margin="normal"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseResponseModal}>Cancel</Button>
            <Button onClick={handleSendResponse} variant="contained" color="primary">
              Send Email
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDetailsModal} onClose={handleCloseDetailsModal} fullWidth maxWidth="md">
          <DialogTitle>Support Request Details</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Ticket ID:</strong> {selectedRequest?.id}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>User:</strong> {selectedRequest?.user || 'Anonymous'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Name:</strong> {selectedRequest?.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> {selectedRequest?.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Subject:</strong> {selectedRequest?.subject}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Message:</strong>
            </Typography>
            <DialogContentText>{selectedRequest?.message}</DialogContentText>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Submitted At:</strong> {selectedRequest && moment(selectedRequest.created_at).format('MMM DD, YYYY HH:mm')}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetailsModal}>Close</Button>
          </DialogActions>
        </Dialog>

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
    </Box>
  );
};

export default SupportRequestsPage;