
// Plans.js
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
  TextField,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import { Save, Edit } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [tempPlan, setTempPlan] = useState({});
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:8000/api/plans_company/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && Array.isArray(response.data.plans)) {
        // Convert string numbers to proper numbers
        const formattedPlans = response.data.plans.map(plan => ({
          ...plan,
          price: Number(plan.price),
          days: Number(plan.days)
        }));
        setPlans(formattedPlans);
      } else {
        throw new Error('Invalid data format from server');
      }
    } catch (error) {
      console.error('Error fetching plans:', error.response?.data || error.message);
      showSnackbar('Failed to load plans. Please try again.', 'error');
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('access_token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setEditingId(plan.id);
    setTempPlan({ ...plan });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempPlan(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'days' ? Number(value) : value
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.put('http://localhost:8000/api/plans_company/', tempPlan, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setPlans(prev => prev.map(plan => 
        plan.id === tempPlan.id ? { ...tempPlan } : plan
      ));
      setEditingId(null);
      showSnackbar('Plan updated successfully', 'success');
    } catch (error) {
      console.error('Update failed:', error);
      showSnackbar('Failed to update plan', 'error');
      fetchPlans();
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 4, bgcolor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
          Subscription Plans
        </Typography>

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
        ) : (
          <TableContainer component={Paper} elevation={3}>
            {plans.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6">No subscription plans found</Typography>
              </Box>
            ) : (
              <Table>
                <TableHead sx={{ bgcolor: '#1976d2' }}>
                  <TableRow>
                    {['Plan Name', 'Price', 'Duration', 'Days', 'Actions'].map((header) => (
                      <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold' }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id} hover>
                      <TableCell>{plan.name}</TableCell>
                      <TableCell>
                        {editingId === plan.id ? (
                          <TextField
                            name="price"
                            value={tempPlan.price || ''}
                            onChange={handleChange}
                            type="number"
                            size="small"
                            inputProps={{ step: "0.01" }}
                          />
                        ) : (
                          `Rs:${Number(plan.price).toFixed(2)}`  // Safe conversion
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === plan.id ? (
                          <TextField
                            name="duration"
                            value={tempPlan.duration || ''}
                            onChange={handleChange}
                            size="small"
                          />
                        ) : (
                          plan.duration
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === plan.id ? (
                          <TextField
                            name="days"
                            value={tempPlan.days || ''}
                            onChange={handleChange}
                            type="number"
                            size="small"
                          />
                        ) : (
                          plan.days
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === plan.id ? (
                          <IconButton color="primary" onClick={handleSave}>
                            <Save />
                          </IconButton>
                        ) : (
                          <IconButton
                            color="secondary"
                            onClick={() => handleEdit(plan)}
                          >
                            <Edit />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        )}

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

export default Plans;