// Subscriptions.js
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Subscriptionsview = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/api/subscriptions/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubscriptions(response.data.subscriptions);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
      setLoading(false);
    };

    fetchSubscriptions();
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 4, bgcolor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
          Subscriptions
        </Typography>

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
        ) : (
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead sx={{ bgcolor: '#1976d2' }}>
                <TableRow>
                  {['Company', 'Plan', 'Start Date', 'End Date', 'Status', 'Amount'].map((header) => (
                    <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold' }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              
              <TableBody>
                {subscriptions.map((sub) => (
                  <TableRow key={sub.id} hover>
                    <TableCell>{sub.company}</TableCell>
                    <TableCell>{sub.plan}</TableCell>
                    <TableCell>{new Date(sub.start_date).toLocaleDateString()}</TableCell>
                    <TableCell>{sub.end_date ? new Date(sub.end_date).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell sx={{ color: sub.status === 'Active' ? 'green' : 'red' }}>
                      {sub.status}
                    </TableCell>
                    <TableCell>RS:{sub.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default Subscriptionsview;