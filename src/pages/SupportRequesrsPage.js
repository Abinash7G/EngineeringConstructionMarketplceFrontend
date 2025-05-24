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
import { FaReply, FaEye } from 'react-icons/fa';
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