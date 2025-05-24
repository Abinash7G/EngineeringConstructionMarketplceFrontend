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

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [responseBody, setResponseBody] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:8000/api/complaints-list/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(response.data.complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.detail || 'Failed to load complaints',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenResponseModal = (complaint) => {
    setSelectedComplaint(complaint);
    setResponseBody('');
    setOpenResponseModal(true);
  };

  const handleOpenDetailsModal = (complaint) => {
    setSelectedComplaint(complaint);
    setOpenDetailsModal(true);
  };

  const handleCloseResponseModal = () => {
    setOpenResponseModal(false);
    setSelectedComplaint(null);
    setResponseBody('');
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedComplaint(null);
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

    const email = selectedComplaint.email || (selectedComplaint.user !== 'Anonymous' ? selectedComplaint.user_email : null);
    if (!email) {
      setSnackbar({
        open: true,
        message: 'No valid email address available for this complaint',
        severity: 'error'
      });
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://localhost:8000/api/send-response-email/', {
        email,
        client_name: selectedComplaint.user || 'Client',
        subject: `Response to Your Complaint: ${selectedComplaint.subject}`,
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
          Complaints
        </Typography>

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
        ) : (
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead sx={{ bgcolor: '#1976d2' }}>
                <TableRow>
                  {['Ticket ID', 'User', 'Email', 'Subject', 'Category', 'Description', 'Submitted At', 'Actions'].map((header) => (
                    <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold' }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id} hover>
                    <TableCell>{complaint.id}</TableCell>
                    <TableCell>{complaint.user || 'Anonymous'}</TableCell>
                    <TableCell>{complaint.email || 'N/A'}</TableCell>
                    <TableCell>{complaint.subject}</TableCell>
                    <TableCell>{complaint.category}</TableCell>
                    <TableCell>
                      {complaint.description.length > 50 ? `${complaint.description.substring(0, 50)}...` : complaint.description}
                    </TableCell>
                    <TableCell>{moment(complaint.created_at).format('MMM DD, YYYY HH:mm')}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenResponseModal(complaint)}>
                        <FaReply />
                      </IconButton>
                      <IconButton color="info" onClick={() => handleOpenDetailsModal(complaint)}>
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
              <strong>Client Name:</strong> {selectedComplaint?.user || 'Anonymous'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Client Email:</strong> {selectedComplaint?.email || 'Not available'}
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
          <DialogTitle>Complaint Details</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Ticket ID:</strong> {selectedComplaint?.id}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>User:</strong> {selectedComplaint?.user || 'Anonymous'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> {selectedComplaint?.email || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Subject:</strong> {selectedComplaint?.subject}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Category:</strong> {selectedComplaint?.category}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Description:</strong>
            </Typography>
            <DialogContentText>{selectedComplaint?.description}</DialogContentText>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Submitted At:</strong> {selectedComplaint && moment(selectedComplaint.created_at).format('MMM DD, YYYY HH:mm')}
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

export default ComplaintsPage;