
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Link,
  TextField,
  Alert,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationOnIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Category as CategoryIcon,
  Build as BuildIcon,
  Visibility as VisibilityIcon,
  GetApp as DownloadIcon,
  Close as CloseIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PaymentModal from './PaymentModal'; // Import PaymentModal
import ClientNavbar from "../components/ClientNavbar"; // Adjust path if needed

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ClientServices = () => {
  const theme = useTheme();
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentStatus, setCommentStatus] = useState(null);
  const [filterStatus, setFilterStatus] = useState('active');
  const [payments, setPayments] = useState([]);
  const [openPayment, setOpenPayment] = useState(false);
  const [paymentInquiryId, setPaymentInquiryId] = useState(null);

  const backendBaseUrl = 'http://127.0.0.1:8000';

  const fetchClientInquiries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found. Please log in.');
      }
      const response = await axios.get(`${backendBaseUrl}/api/client-inquiries/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched inquiries:', response.data);
      
      const receivedInquiries = Array.isArray(response.data) ? response.data : [];
      const sortedInquiries = [...receivedInquiries].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      
      setInquiries(sortedInquiries);
      applyFilter(sortedInquiries, filterStatus);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setError(err.message || 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async (inquiryId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${backendBaseUrl}/api/payments-list/?inquiry_id=${inquiryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(response.data);
    } catch (err) {
      console.error('Error fetching payments:', err);
    }
  };

  const applyFilter = (inquiriesData, statusFilter) => {
    let filtered = [];
    if (statusFilter === 'active') {
      filtered = inquiriesData.filter(inquiry => inquiry.status !== 'Completed');
    } else if (statusFilter === 'completed') {
      filtered = inquiriesData.filter(inquiry => inquiry.status === 'Completed');
    } else {
      filtered = inquiriesData;
    }
    setFilteredInquiries(filtered);
  };

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilterStatus(newFilter);
    applyFilter(inquiries, newFilter);
  };

  useEffect(() => {
    fetchClientInquiries();
    const interval = setInterval(fetchClientInquiries, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      return new Date(dateString).toLocaleString('en-US', options);
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const handleViewDetails = (inquiry) => {
    console.log('Selected inquiry:', inquiry);
    setSelectedInquiry(inquiry);
    setOpenDetails(true);
    fetchPayments(inquiry.id);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedInquiry(null);
    setCommentText('');
    setCommentStatus(null);
    setPayments([]);
  };

  const handleAddComment = async (inquiryId) => {
    if (!commentText) {
      setCommentStatus({ type: 'error', message: 'Please enter a comment' });
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        `${backendBaseUrl}/api/add-client-comment/${inquiryId}/`,
        { comment_text: commentText, company_response: '' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentStatus({ type: 'success', message: response.data.message || 'Comment added successfully!' });
      setCommentText('');
      fetchClientInquiries();
    } catch (err) {
      setCommentStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to add comment',
      });
    }
  };

  const handleNavigateToProfile = () => {
    window.location.href = "/client/profile";
  };

  const handleOpenPayment = (inquiryId) => {
    setPaymentInquiryId(inquiryId);
    setOpenPayment(true);
  };

  const handleClosePayment = () => {
    setOpenPayment(false);
    setPaymentInquiryId(null);
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(
        `${backendBaseUrl}/api/payments/`,
        {
          inquiry_id: paymentData.inquiry_id,
          amount: paymentData.amount,
          transaction_id: paymentData.transaction_id,
          payment_method: paymentData.method,
          purpose: paymentData.purpose,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchClientInquiries();
      if (selectedInquiry) {
        fetchPayments(selectedInquiry.id);
      }
    } catch (err) {
      console.error('Error saving payment:', err);
    }
  };

  const renderDetails = (inquiry) => {
    if (!inquiry) return <Typography>No inquiry selected.</Typography>;

    const renderField = (label, value) => (
      value && (
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'center' }}>
          <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '160px', color: theme.palette.text.primary }}>
            {label}:
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {value}
          </Typography>
        </Box>
      )
    );

    const renderFileField = (label, fileUrl) => (
      fileUrl && (
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'center' }}>
          <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '160px', color: theme.palette.text.primary }}>
            {label}:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Link href={fileUrl} target="_blank" sx={{ color: theme.palette.primary.main, textDecoration: 'none', display: 'flex', alignItems: 'center', '&:hover': { color: theme.palette.primary.dark } }}>
              <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
            </Link>
            <Link href={fileUrl} download sx={{ color: theme.palette.primary.main, textDecoration: 'none', display: 'flex', alignItems: 'center', '&:hover': { color: theme.palette.primary.dark } }}>
              <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
            </Link>
          </Box>
        </Box>
      )
    );

    const renderFileArrayField = (label, files) => (
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '160px', mb: 1, color: theme.palette.text.primary }}>
          {label}:
        </Typography>
        {files && files.length > 0 ? (
          files.map((file, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 0.5, pl: 2 }}>
              <Link href={file} target="_blank" sx={{ color: theme.palette.primary.main, textDecoration: 'none', display: 'flex', alignItems: 'center', '&:hover': { color: theme.palette.primary.dark } }}>
                <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View {label} {index + 1}
              </Link>
              <Link href={file} download sx={{ color: theme.palette.primary.main, textDecoration: 'none', display: 'flex', alignItems: 'center', '&:hover': { color: theme.palette.primary.dark } }}>
                <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
              </Link>
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ pl: 2, color: theme.palette.text.disabled }}>
            No {label.toLowerCase()} available.
          </Typography>
        )}
      </Box>
    );

    const renderComments = () => {
      if (!inquiry.comments || inquiry.comments.length === 0) {
        return (
          <Typography variant="body2" sx={{ pl: 2, mb: 2, color: theme.palette.text.disabled }}>
            No comments yet.
          </Typography>
        );
      }
      return (
        <Box sx={{ pl: 2, mb: 2 }}>
          {inquiry.comments.map((comment) => (
            <Card key={comment.id} sx={{ mb: 1, p: 2, bgcolor: theme.palette.grey[50], borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
                "{comment.comment_text}"
              </Typography>
              {comment.company_response && (
                <Typography variant="body2" sx={{ pl: 2, mt: 1, color: theme.palette.text.disabled }}>
                  <strong>Company Response:</strong> {comment.company_response}
                </Typography>
              )}
              <Typography variant="caption" sx={{ color: theme.palette.text.disabled, mt: 1 }}>
                Added on {formatDate(comment.created_at)}
              </Typography>
            </Card>
          ))}
        </Box>
      );
    };

    const renderPaymentHistory = () => {
      if (!inquiry.payments || inquiry.payments.length === 0) {
        return null;
      }
      return (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}>
            Payment History
          </Typography>
          {inquiry.payments.map((payment) => (
            <Card key={payment.id} sx={{ mb: 1, p: 2, bgcolor: theme.palette.grey[50], borderRadius: 2, boxShadow: 1, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PaymentIcon sx={{ color: theme.palette.success.main }} />
                <Typography variant="body2" sx={{ fontWeight: '600' }}>
                  Amount: {payment.amount}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Method:</strong> {payment.payment_method}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Purpose:</strong> {payment.purpose || 'N/A'}
              </Typography>
              <Typography variant="body2">
                <strong>Date:</strong> {formatDate(payment.created_at)}
              </Typography>
            </Card>
          ))}
        </Box>
      );
    };

    const data = inquiry.service_data || {};

    const pieChartData = {
      labels: ['Completed', 'Remaining'],
      datasets: [
        {
          data: data.progress_percentage != null ? [data.progress_percentage, 100 - data.progress_percentage] : [0, 100],
          backgroundColor: [theme.palette.primary.main, theme.palette.grey[300]],
          borderColor: [theme.palette.primary.dark, theme.palette.grey[500]],
          borderWidth: 1,
        },
      ],
    };

    const pieChartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            font: {
              size: 14,
            },
            color: theme.palette.text.primary,
          },
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context) => `${context.label}: ${context.parsed}%`,
          },
        },
      },
    };

    return (
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
          {inquiry.category || 'Unknown Category'} Details
        </Typography>
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, bgcolor: theme.palette.background.paper }}>
          {renderField('Inquiry ID', inquiry.id || 'N/A')}
        </Card>
        {inquiry.category === 'Building Construction Services' && (
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, bgcolor: theme.palette.grey[100] }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}>
              Construction Progress
            </Typography>
            {renderField('Overall Status', inquiry.status)}
            {data.progress_percentage != null && (
              <Box sx={{ mb: 2, maxWidth: 300, mx: 'auto' }}>
                <Typography variant="body2" sx={{ fontWeight: '600', mb: 1, textAlign: 'center' }}>
                  Progress Percentage:
                </Typography>
                <Box sx={{ height: 200, display: 'flex', justifyContent: 'center' }}>
                  <Pie data={pieChartData} options={pieChartOptions} />
                </Box>
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', fontWeight: 'bold', color: theme.palette.primary.main }}>
                  {data.progress_percentage}% Complete
                </Typography>
              </Box>
            )}
            {renderField('Construction Phase', data.construction_phase)}
            {renderField('Permit Status', data.permit_status)}
          </Card>
        )}
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}>
            Documents
          </Typography>
          {inquiry.category === 'Engineering Consulting' && (
            <>
              {renderFileField('Site Plan', data.site_plan)}
              {renderFileField('Architectural Plan', data.architectural_plan)}
              {renderFileField('Soil Test Report', data.soil_test_report)}
              {renderFileField('Foundation Design', data.foundation_design)}
              {renderFileField('Electrical Plan', data.electrical_plan)}
              {renderFileField('Plumbing Plan', data.plumbing_plan)}
              {renderFileField('HVAC Plan', data.hvac_plan)}
              {renderFileField('Construction Permit', data.construction_permit)}
              {renderFileField('Cost Estimation', data.cost_estimation)}
              {renderFileField('Structural Design', data.structural_design)}
              {renderFileField('Structural Report', data.structural_report)}
              {renderFileField('Architectural Design', data.architectural_design)}
              {renderFileField('Cost Estimation Files', data.cost_estimation_files)}
              {renderFileField('Rate Analysis', data.rate_analysis)}
            </>
          )}
          {inquiry.category === 'Building Construction Services' && (
            <>
              {renderFileField('Lalpurja', data.lalpurja)}
              {renderFileField('Napi Naksa', data.napi_naksa)}
              {renderFileField('Tax Clearance', data.tax_clearance)}
              {renderFileField('Approved Building Drawings', data.approved_building_drawings)}
              {renderFileField('Completion Certificate', data.completion_certificate)}
              {inquiry.sub_service === 'Residential Construction' && (
                <>
                  {renderFileField('Soil Test Report', data.soil_test_report)}
                  {renderFileField('Structural Stability Certificate', data.structural_stability_certificate)}
                  {renderFileField('House Design Approval', data.house_design_approval)}
                  {renderFileField('Neighbour Consent', data.neighbour_consent)}
                  {renderFileField('Permit Document', data.permit_document)}
                  {renderFileArrayField('Progress Photos', data.progress_photos)}
                  {renderFileArrayField('Inspection Reports', data.inspection_reports)}
                </>
              )}
              {inquiry.sub_service === 'Commercial Construction' && (
                <>
                  {renderFileField('IEE Report', data.iee_report)}
                  {renderFileField('Fire Safety Certificate', data.fire_safety_certificate)}
                  {renderFileField('Lift Permit', data.lift_permit)}
                  {renderFileField('Parking Layout Plan', data.parking_layout_plan)}
                  {renderFileArrayField('Progress Photos', data.progress_photos)}
                  {renderFileArrayField('Inspection Reports', data.inspection_reports)}
                </>
              )}
              {inquiry.sub_service === 'Renovation and Remodeling Services' && (
                <>
                  {renderFileField('Owner Permission Letter', data.owner_permission_letter)}
                  {renderFileField('Existing Structure Analysis', data.existing_structure_analysis)}
                  {renderFileField('Renovation Plan', data.renovation_plan)}
                  {renderFileField('NOC from Municipality', data.noc_municipality)}
                  {renderFileField('Waste Management Plan', data.waste_management_plan)}
                  {renderFileArrayField('Progress Photos', data.progress_photos)}
                  {renderFileArrayField('Inspection Reports', data.inspection_reports)}
                </>
              )}
            </>
          )}
          {inquiry.category === 'Post-Construction Maintenance' && (
            <>
              {renderFileField('Maintenance Photos', data.maintenance_photos)}
            </>
          )}
          {inquiry.category === 'Safety and Training Services' && inquiry.certificate && (
            <>
              {renderFileField('Certificate', inquiry.certificate)}
            </>
          )}
        </Card>
        {inquiry.category === 'Engineering Consulting' && (
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}>
              Additional Details
            </Typography>
            {renderField('Type of Building', data.type_of_building)}
            {renderField('Building Purpose', data.building_purpose)}
            {renderField('Number of Floors', data.num_floors)}
            {renderField('Land Area', data.land_area)}
            {renderField('Architectural Style', data.architectural_style)}
            {renderField('Other Architectural Style', data.architectural_style_other)}
            {renderField('Budget Estimate', data.budget_estimate)}
            {renderField('Special Requirements', data.special_requirements)}
          </Card>
        )}
        {inquiry.category === 'Building Construction Services' && (
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}>
              Additional Details
            </Typography>
            {inquiry.sub_service === 'Residential Construction' && (
              <>
                {renderField('Permit Application Date', data.permit_application_date)}
                {renderField('Construction Start Date', data.construction_start_date)}
                {renderField('Inspection Dates', data.inspection_dates && data.inspection_dates.length > 0 ? data.inspection_dates.join(', ') : null)}
                {renderField('Completion Certificate Application Date', data.completion_certificate_application_date)}
                {renderField('Handover Date', data.handover_date)}
                {renderField('Warranty Details', data.warranty_details)}
              </>
            )}
            {inquiry.sub_service === 'Commercial Construction' && (
              <>
                {renderField('Special Requirements', data.commercial_special_requirements)}
              </>
            )}
            {inquiry.sub_service === 'Renovation and Remodeling Services' && (
              <>
                {renderField('Type of Building', data.type_of_building)}
                {renderField('Existing Building Details', data.existing_building_details)}
                {renderField('Area to Renovate', data.area_to_renovate)}
                {renderField('Budget Estimate', data.budget_estimate)}
                {renderField('Special Requirements', data.renovation_special_requirements)}
              </>
            )}
          </Card>
        )}
        {inquiry.category === 'Post-Construction Maintenance' && (
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}>
              Additional Details
            </Typography>
            {renderField('Maintenance Type', data.maintenance_type)}
            {renderField('Maintenance Details', data.maintenance_details)}
            {renderField('Preferred Date', data.preferred_date)}
            {renderField('Preferred Time', data.preferred_time)}
            {renderField('Payment Agreed', data.payment_agreed ? 'Yes' : 'No')}
          </Card>
        )}
        {inquiry.category === 'Safety and Training Services' && (
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}>
              Additional Details
            </Typography>
            {renderField('Language Preference', data.language_preference)}
            {renderField('Other Language', data.language_preference_other)}
            {renderField('Training Date', data.training_date)}
            {renderField('Training Time', data.training_time)}
            {renderField('Training Agreement', data.training_agreement ? 'Yes' : 'No')}
            {!inquiry.certificate && inquiry.status === 'Completed' && (
              <Typography variant="body2" sx={{ color: theme.palette.text.disabled, mt: 2 }}>
                Certificate not yet uploaded by the company.
              </Typography>
            )}
          </Card>
        )}
        {!['Engineering Consulting', 'Building Construction Services', 'Post-Construction Maintenance', 'Safety and Training Services'].includes(inquiry.category) && (
          <Typography variant="body2" sx={{ color: theme.palette.text.disabled }}>
            No additional details available for this category.
          </Typography>
        )}
        {renderPaymentHistory()}
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
            Comments
          </Typography>
          {renderComments()}
          <Box sx={{ display: 'flex', gap: 2, pl: 2 }}>
            <TextField
              label="Add Comment"
              multiline
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              fullWidth
              sx={{ maxWidth: 500 }}
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddComment(inquiry.id)}
              disabled={!commentText}
              sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
            >
              Submit Comment
            </Button>
          </Box>
          {commentStatus && (
            <Alert severity={commentStatus.type} sx={{ mt: 2, pl: 2 }}>
              {commentStatus.message}
            </Alert>
          )}
        </Card>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: theme.palette.grey[100] }}>
      <ClientNavbar
        wishlist={[]}
        cartItems={[]}
        onNavigateToProfile={handleNavigateToProfile}
      />
      <Box sx={{ p: { xs: 2, md: 4 }, flex: 1, mt: 8 }}>
        <Card elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, bgcolor: theme.palette.background.paper }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
              My Inquiries
            </Typography>
            <Select
              value={filterStatus}
              onChange={handleFilterChange}
              displayEmpty
              sx={{
                minWidth: '150px',
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                '.MuiSelect-select': { py: 1 },
              }}
              variant="outlined"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={60} color="primary" />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ p: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          ) : filteredInquiries.length === 0 ? (
            <Typography variant="h6" sx={{ p: 2, color: theme.palette.text.disabled, textAlign: 'center' }}>
              No inquiries found
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
              <Table sx={{ minWidth: 650 }} aria-label="inquiries table">
                <TableHead>
                  <TableRow sx={{ bgcolor: theme.palette.primary.light }}>
                    <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }}>Full Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }}>Sub-Service</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }}>Submitted At</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredInquiries.map((inquiry) => (
                    <TableRow key={inquiry.id} sx={{ '&:hover': { bgcolor: theme.palette.grey[50] }, transition: 'background-color 0.2s' }}>
                      <TableCell>{inquiry.full_name || 'N/A'}</TableCell>
                      <TableCell>{inquiry.location || 'N/A'}</TableCell>
                      <TableCell>{inquiry.category || 'N/A'}</TableCell>
                      <TableCell>{inquiry.sub_service || 'N/A'}</TableCell>
                      <TableCell>
                        <Chip
                          label={inquiry.status || 'N/A'}
                          color={inquiry.status === 'Completed' ? 'success' : inquiry.status === 'Pending' ? 'warning' : 'info'}
                          size="small"
                          sx={{ fontWeight: '500' }}
                        />
                      </TableCell>
                      <TableCell>{formatDate(inquiry.created_at)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleViewDetails(inquiry)}
                          disabled={!inquiry.id}
                          sx={{ mr: 1, borderRadius: 2, textTransform: 'none', px: 3 }}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenPayment(inquiry.id)}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3,
                            bgcolor: theme.palette.success.main,
                            '&:hover': { bgcolor: theme.palette.success.dark },
                          }}
                        >
                          Pay
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>

        <Dialog
          open={openDetails}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 6,
            },
          }}
        >
          <DialogTitle sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.primary.contrastText, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Inquiry Details
            <IconButton onClick={handleCloseDetails} sx={{ color: theme.palette.primary.contrastText }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ bgcolor: theme.palette.background.default, p: 3 }}>
            {selectedInquiry && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
                  <PersonIcon sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 30 }} />
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                    {selectedInquiry.full_name || 'N/A'}
                  </Typography>
                </Box>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1.5, color: theme.palette.text.secondary }}>
                    <LocationOnIcon sx={{ mr: 1, color: theme.palette.text.disabled }} />
                    {selectedInquiry.location || 'N/A'}
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1.5, color: theme.palette.text.secondary }}>
                    <EmailIcon sx={{ mr: 1, color: theme.palette.text.disabled }} />
                    {selectedInquiry.email || 'N/A'}
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1.5, color: theme.palette.text.secondary }}>
                    <PhoneIcon sx={{ mr: 1, color: theme.palette.text.disabled }} />
                    {selectedInquiry.phone_number || 'N/A'}
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1.5, color: theme.palette.text.secondary }}>
                    <CategoryIcon sx={{ mr: 1, color: theme.palette.text.disabled }} />
                    <strong>Category:</strong>&nbsp;{selectedInquiry.category || 'N/A'}
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1.5, color: theme.palette.text.secondary }}>
                    <BuildIcon sx={{ mr: 1, color: theme.palette.text.disabled }} />
                    <strong>Sub-Service:</strong>&nbsp;{selectedInquiry.sub_service || 'N/A'}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  {renderDetails(selectedInquiry)}
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>

        <PaymentModal
          open={openPayment}
          onClose={handleClosePayment}
          inquiryId={paymentInquiryId}
          onSuccess={handlePaymentSuccess}
        />
      </Box>
    </Box>
  );
};

export default ClientServices;