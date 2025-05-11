// // // // // import React, { useState, useEffect } from 'react';
// // // // // import {
// // // // //   Box,
// // // // //   Paper,
// // // // //   Typography,
// // // // //   List,
// // // // //   CircularProgress,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   Chip,
// // // // //   Avatar,
// // // // //   Link,
// // // // //   useTheme,
// // // // //   Button,
// // // // //   FormControl,
// // // // //   InputLabel,
// // // // //   Select,
// // // // //   MenuItem,
// // // // //   Alert,
// // // // //   Dialog,
// // // // //   DialogTitle,
// // // // //   DialogContent,
// // // // //   DialogActions,
// // // // //   TextField,
// // // // //   Input,
// // // // // } from '@mui/material';
// // // // // import {
// // // // //   Person as PersonIcon,
// // // // //   LocationOn as LocationOnIcon,
// // // // //   Email as EmailIcon,
// // // // //   Phone as PhoneIcon,
// // // // //   Category as CategoryIcon,
// // // // //   Build as BuildIcon,
// // // // //   Visibility as VisibilityIcon,
// // // // //   GetApp as DownloadIcon,
// // // // // } from '@mui/icons-material';
// // // // // import axios from 'axios';

// // // // // const InquiriesList = ({ inquiries: initialInquiries, lastInquiryCheck, clickable }) => {
// // // // //   const theme = useTheme();
// // // // //   const [inquiries, setInquiries] = useState(initialInquiries || []);
// // // // //   const [filteredInquiries, setFilteredInquiries] = useState([]);
// // // // //   const [selectedCategory, setSelectedCategory] = useState('All');
// // // // //   const [selectedShift, setSelectedShift] = useState('All');
// // // // //   const [loading, setLoading] = useState(!initialInquiries);
// // // // //   const [error, setError] = useState('');
// // // // //   const [emailStatus, setEmailStatus] = useState(null);
// // // // //   const [openEmailDialog, setOpenEmailDialog] = useState(false);
// // // // //   const [selectedInquiry, setSelectedInquiry] = useState(null);
// // // // //   const [emailBody, setEmailBody] = useState('');
// // // // //   const [certificateFile, setCertificateFile] = useState(null);
// // // // //   const [commentText, setCommentText] = useState('');
// // // // //   const [commentStatus, setCommentStatus] = useState(null);
// // // // //   const [progressPhotos, setProgressPhotos] = useState(null);
// // // // //   const [inspectionReports, setInspectionReports] = useState(null);
// // // // //   const [completionCertificate, setCompletionCertificate] = useState(null);
// // // // //   const [inquiry, set_Inquiries] = useState(clickable);
// // // // //   const [replyText, setReplyText] = useState('');
// // // // //   const [replyStatus, setReplyStatus] = useState(null);
// // // // //   const [replyingToCommentId, setReplyingToCommentId] = useState(null);
// // // // //   const [constructionPhase, setConstructionPhase] = useState({});
// // // // //   const [progressPercentage, setProgressPercentage] = useState({});
// // // // //   const [permitStatus, setPermitStatus] = useState({});
// // // // //   const [updateStatus, setUpdateStatus] = useState(null);
// // // // //   const [inquiryStatus, setInquiryStatus] = useState({});

// // // // //   const backendBaseUrl = 'http://127.0.0.1:8000';

// // // // //   // Auto-dismiss alerts after 2 seconds
// // // // //   useEffect(() => {
// // // // //     if (emailStatus) {
// // // // //       const timer = setTimeout(() => setEmailStatus(null), 2000);
// // // // //       return () => clearTimeout(timer);
// // // // //     }
// // // // //   }, [emailStatus]);

// // // // //   useEffect(() => {
// // // // //     if (commentStatus) {
// // // // //       const timer = setTimeout(() => setCommentStatus(null), 2000);
// // // // //       return () => clearTimeout(timer);
// // // // //     }
// // // // //   }, [commentStatus]);

// // // // //   useEffect(() => {
// // // // //     if (replyStatus) {
// // // // //       const timer = setTimeout(() => setReplyStatus(null), 2000);
// // // // //       return () => clearTimeout(timer);
// // // // //     }
// // // // //   }, [replyStatus]);

// // // // //   useEffect(() => {
// // // // //     if (updateStatus) {
// // // // //       const timer = setTimeout(() => setUpdateStatus(null), 2000);
// // // // //       return () => clearTimeout(timer);
// // // // //     }
// // // // //   }, [updateStatus]);

// // // // //   const fetchInquiries = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const token = localStorage.getItem('access_token');
// // // // //       const response = await axios.get(`${backendBaseUrl}/api/company-inquiries/`, {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       });

// // // // //       const sorted = response.data.sort((a, b) => 
// // // // //         new Date(b.created_at) - new Date(a.created_at)
// // // // //       );
// // // // //       setInquiries(sorted);
// // // // //       setFilteredInquiries(sorted);
// // // // //       const phaseInit = {};
// // // // //       const percentageInit = {};
// // // // //       const permitInit = {};
// // // // //       const statusInit = {};
// // // // //       sorted.forEach((inquiry) => {
// // // // //         const serviceData = inquiry.service_data || {};
// // // // //         phaseInit[inquiry.id] = serviceData.construction_phase || '';
// // // // //         percentageInit[inquiry.id] = serviceData.progress_percentage || '';
// // // // //         permitInit[inquiry.id] = serviceData.permit_status || '';
// // // // //         statusInit[inquiry.id] = inquiry.status || 'Pending';
// // // // //       });
// // // // //       setConstructionPhase(phaseInit);
// // // // //       setProgressPercentage(percentageInit);
// // // // //       setPermitStatus(permitInit);
// // // // //       setInquiryStatus(statusInit);
// // // // //     } catch (err) {
// // // // //       setError(err.response?.data?.error || 'Failed to load inquiries');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     console.log(inquiry);
// // // // //     fetchInquiries();
// // // // //   }, [inquiry]);

// // // // //   const shifts = ['All', ...new Set(
// // // // //     inquiries
// // // // //       .filter((inquiry) => inquiry.category === 'Safety and Training Services')
// // // // //       .map((inquiry) => inquiry.service_data?.training_time)
// // // // //       .filter((time) => time)
// // // // //   )];

// // // // //   const handleCategoryChange = (event) => {
// // // // //     const category = event.target.value;
// // // // //     setSelectedCategory(category);
// // // // //     setSelectedShift('All');

// // // // //     if (category === 'All') {
// // // // //       setFilteredInquiries(inquiries);
// // // // //     } else {
// // // // //       const filtered = inquiries.filter((inquiry) => inquiry.category === category);
// // // // //       setFilteredInquiries(filtered);
// // // // //     }
// // // // //   };

// // // // //   const handleShiftChange = (event) => {
// // // // //     const shift = event.target.value;
// // // // //     setSelectedShift(shift);

// // // // //     let filtered = inquiries;
// // // // //     if (selectedCategory !== 'All') {
// // // // //       filtered = filtered.filter((inquiry) => inquiry.category === selectedCategory);
// // // // //     }
// // // // //     if (shift !== 'All') {
// // // // //       filtered = filtered.filter((inquiry) => inquiry.service_data?.training_time === shift);
// // // // //     }
// // // // //     setFilteredInquiries(filtered);
// // // // //   };

// // // // //   const categories = ['All', ...new Set(inquiries.map((inquiry) => inquiry.category))];

// // // // //   const updateInquiryStatus = async (inquiryId, newStatus) => {
// // // // //     try {
// // // // //       const token = localStorage.getItem('access_token');
// // // // //       await axios.patch(
// // // // //         `${backendBaseUrl}/api/update-inquiry-status/${inquiryId}/`,
// // // // //         { status: newStatus },
// // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // //       );
// // // // //       fetchInquiries();
// // // // //     } catch (err) {
// // // // //       setError(err.response?.data?.error || 'Failed to update status');
// // // // //     }
// // // // //   };

// // // // //   const handleOpenEmailDialog = (inquiry) => {
// // // // //     const serviceData = inquiry.service_data || {};
// // // // //     const defaultEmailBody = `Dear ${inquiry.full_name},

// // // // // We are pleased to confirm your training session for Workplace Safety Training Modules.

// // // // // Training Details:
// // // // // - Date: ${serviceData.training_date || 'N/A'}
// // // // // - Time: ${serviceData.training_time || 'N/A'}
// // // // // - Location: ${serviceData.training_location || inquiry.location || 'N/A'}

// // // // // Please arrive 15 minutes early. Let us know if you have any questions.

// // // // // Best regards,
// // // // // [Your Company Name]`;

// // // // //     setSelectedInquiry(inquiry);
// // // // //     setEmailBody(defaultEmailBody);
// // // // //     setOpenEmailDialog(true);
// // // // //   };

// // // // //   const handleCloseEmailDialog = () => {
// // // // //     setOpenEmailDialog(false);
// // // // //     setSelectedInquiry(null);
// // // // //     setEmailBody('');
// // // // //   };

// // // // //   const sendTrainingEmail = async () => {
// // // // //     if (!emailBody) {
// // // // //       setEmailStatus({ type: 'error', message: 'Please enter an email body' });
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const token = localStorage.getItem('access_token');
// // // // //       const emailData = {
// // // // //         to_email: selectedInquiry.email,
// // // // //         full_name: selectedInquiry.full_name,
// // // // //         email_body: emailBody,
// // // // //         inquiry_id: selectedInquiry.id
// // // // //       };

// // // // //       await axios.post(
// // // // //         `${backendBaseUrl}/api/send-training-email/`,
// // // // //         emailData,
// // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // //       );

// // // // //       setEmailStatus({ type: 'success', message: 'Email sent successfully!' });
// // // // //       handleCloseEmailDialog();
// // // // //       fetchInquiries();
// // // // //     } catch (err) {
// // // // //       setEmailStatus({
// // // // //         type: 'error',
// // // // //         message: err.response?.data?.error || 'Failed to send email',
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleCertificateUpload = async (inquiryId) => {
// // // // //     if (!certificateFile) {
// // // // //       setEmailStatus({ type: 'error', message: 'Please select a certificate file to upload' });
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const token = localStorage.getItem('access_token');
// // // // //       const formData = new FormData();
// // // // //       formData.append('certificate', certificateFile);

// // // // //       await axios.post(
// // // // //         `${backendBaseUrl}/api/upload-certificate/${inquiryId}/`,
// // // // //         formData,
// // // // //         {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${token}`,
// // // // //             'Content-Type': 'multipart/form-data',
// // // // //           },
// // // // //         }
// // // // //       );

// // // // //       setEmailStatus({ type: 'success', message: 'Certificate uploaded successfully!' });
// // // // //       setCertificateFile(null);
// // // // //       fetchInquiries();
// // // // //     } catch (err) {
// // // // //       setEmailStatus({
// // // // //         type: 'error',
// // // // //         message: err.response?.data?.error || 'Failed to upload certificate',
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleProgressPhotosUpload = async (inquiryId) => {
// // // // //     if (!progressPhotos) {
// // // // //       setEmailStatus({ type: 'error', message: 'Please select progress photos to upload' });
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const token = localStorage.getItem('access_token');
// // // // //       const formData = new FormData();
// // // // //       for (let i = 0; i < progressPhotos.length; i++) {
// // // // //         formData.append('photos', progressPhotos[i]);
// // // // //       }

// // // // //       await axios.post(
// // // // //         `${backendBaseUrl}/api/upload-progress-photos/${inquiryId}/`,
// // // // //         formData,
// // // // //         {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${token}`,
// // // // //             'Content-Type': 'multipart/form-data',
// // // // //           },
// // // // //         }
// // // // //       );

// // // // //       setEmailStatus({ type: 'success', message: 'Progress photos uploaded successfully!' });
// // // // //       setProgressPhotos(null);
// // // // //       fetchInquiries();
// // // // //     } catch (err) {
// // // // //       setEmailStatus({
// // // // //         type: 'error',
// // // // //         message: err.response?.data?.error || 'Failed to upload progress photos',
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleInspectionReportsUpload = async (inquiryId) => {
// // // // //     if (!inspectionReports) {
// // // // //       setEmailStatus({ type: 'error', message: 'Please select inspection reports to upload' });
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const token = localStorage.getItem('access_token');
// // // // //       const formData = new FormData();
// // // // //       for (let i = 0; i < inspectionReports.length; i++) {
// // // // //         formData.append('reports', inspectionReports[i]);
// // // // //       }

// // // // //       await axios.post(
// // // // //         `${backendBaseUrl}/api/upload-inspection-reports/${inquiryId}/`,
// // // // //         formData,
// // // // //         {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${token}`,
// // // // //             'Content-Type': 'multipart/form-data',
// // // // //           },
// // // // //         }
// // // // //       );

// // // // //       setEmailStatus({ type: 'success', message: 'Inspection reports uploaded successfully!' });
// // // // //       setInspectionReports(null);
// // // // //       fetchInquiries();
// // // // //     } catch (err) {
// // // // //       setEmailStatus({
// // // // //         type: 'error',
// // // // //         message: err.response?.data?.error || 'Failed to upload inspection reports',
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleCompletionCertificateUpload = async (inquiryId) => {
// // // // //     if (!completionCertificate) {
// // // // //       setEmailStatus({ type: 'error', message: 'Please select a completion certificate to upload' });
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const token = localStorage.getItem('access_token');
// // // // //       const formData = new FormData();
// // // // //       formData.append('completion_certificate', completionCertificate);

// // // // //       await axios.post(
// // // // //         `${backendBaseUrl}/api/upload-completion-certificate/${inquiryId}/`,
// // // // //         formData,
// // // // //         {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${token}`,
// // // // //             'Content-Type': 'multipart/form-data',
// // // // //           },
// // // // //         }
// // // // //       );

// // // // //       setEmailStatus({ type: 'success', message: 'Completion certificate uploaded successfully!' });
// // // // //       setCompletionCertificate(null);
// // // // //       fetchInquiries();
// // // // //     } catch (err) {
// // // // //       setEmailStatus({
// // // // //         type: 'error',
// // // // //         message: err.response?.data?.error || 'Failed to upload completion certificate',
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleAddComment = async (inquiryId) => {
// // // // //     if (!commentText) {
// // // // //       setCommentStatus({ type: 'error', message: 'Please enter a comment' });
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const token = localStorage.getItem('access_token');
// // // // //       await axios.post(
// // // // //         `${backendBaseUrl}/api/add-comment/${inquiryId}/`,
// // // // //         { comment_text: commentText, company_response: '' },
// // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // //       );

// // // // //       setCommentStatus({ type: 'success', message: 'Comment added successfully!' });
// // // // //       setCommentText('');
// // // // //       fetchInquiries();
// // // // //     } catch (err) {
// // // // //       setCommentStatus({
// // // // //         type: 'error',
// // // // //         message: err.response?.data?.error || 'Failed to add comment',
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleAddReply = async (commentId) => {
// // // // //     if (!replyText) {
// // // // //       setReplyStatus({ type: 'error', message: 'Please enter a reply' });
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const token = localStorage.getItem('access_token');
// // // // //       await axios.patch(
// // // // //         `${backendBaseUrl}/api/update-comment-response/${commentId}/`,
// // // // //         { company_response: replyText },
// // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // //       );
// // // // //       setReplyStatus({ type: 'success', message: 'Reply added successfully!' });
// // // // //       setReplyText('');
// // // // //       setReplyingToCommentId(null);
// // // // //       fetchInquiries();
// // // // //     } catch (err) {
// // // // //       setReplyStatus({
// // // // //         type: 'error',
// // // // //         message: err.response?.data?.error || 'Failed to add reply',
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleUpdateProgress = async (inquiryId) => {
// // // // //     if (!constructionPhase[inquiryId] || !progressPercentage[inquiryId] || !permitStatus[inquiryId]) {
// // // // //       setUpdateStatus({ type: 'error', message: 'Please fill all fields' });
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const token = localStorage.getItem('access_token');
// // // // //       const data = {
// // // // //         construction_phase: constructionPhase[inquiryId],
// // // // //         progress_percentage: parseInt(progressPercentage[inquiryId]),
// // // // //         permit_status: permitStatus[inquiryId],
// // // // //       };
// // // // //       await axios.patch(
// // // // //         `${backendBaseUrl}/api/update-construction-progress/${inquiryId}/`,
// // // // //         data,
// // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // //       );
// // // // //       setUpdateStatus({ type: 'success', message: 'Progress updated successfully!' });
// // // // //       fetchInquiries();
// // // // //     } catch (err) {
// // // // //       setUpdateStatus({
// // // // //         type: 'error',
// // // // //         message: err.response?.data?.error || 'Failed to update progress',
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleStatusChange = (inquiryId, newStatus) => {
// // // // //     setInquiryStatus((prev) => ({ ...prev, [inquiryId]: newStatus }));
// // // // //     updateInquiryStatus(inquiryId, newStatus);
// // // // //   };

// // // // //   const renderBuildingInfo = (inquiry) => {
// // // // //     const serviceData = inquiry.service_data || {};
// // // // //     let fields = [];
// // // // //     if (inquiry.sub_service === 'Residential Construction') {
// // // // //       fields = [
// // // // //         ['Type of Building', serviceData.type_of_building],
// // // // //         ['Building Purpose', serviceData.building_purpose],
// // // // //         ['Number of Floors', serviceData.num_floors],
// // // // //         ['Land Area', serviceData.land_area],
// // // // //         ['Architectural Style', serviceData.architectural_style],
// // // // //         ['Budget Estimate', serviceData.budget_estimate],
// // // // //         ['Special Requirements', serviceData.special_requirements],
// // // // //       ];
// // // // //     } else if (inquiry.sub_service === 'Commercial Construction') {
// // // // //       fields = [
// // // // //         ['Type of Building', serviceData.type_of_building],
// // // // //         ['Building Details', serviceData.building_details],
// // // // //         ['Estimated Area', serviceData.estimated_area],
// // // // //         ['Budget Estimate', serviceData.budget_estimate],
// // // // //         ['Special Requirements', serviceData.special_requirements],
// // // // //       ];
// // // // //     } else if (inquiry.sub_service === 'Renovation and Remodeling Services') {
// // // // //       fields = [
// // // // //         ['Type of Building', serviceData.type_of_building],
// // // // //         ['Building Details', serviceData.building_details],
// // // // //         ['Estimated Area', serviceData.estimated_area],
// // // // //         ['Budget Estimate', serviceData.budget_estimate],
// // // // //         ['Special Requirements', serviceData.special_requirements],
// // // // //       ];
// // // // //     } else if (inquiry.sub_service === 'Comprehensive Building Planning & Design') {
// // // // //       fields = [
// // // // //         ['Type of Building', serviceData.type_of_building],
// // // // //         ['Building Purpose', serviceData.building_purpose],
// // // // //         ['Number of Floors', serviceData.num_floors],
// // // // //         ['Estimated Land Area', serviceData.land_area],
// // // // //         ['Preferred Architectural Style', serviceData.architectural_style],
// // // // //         ['Architectural Style (Other)', serviceData.architectural_style_other],
// // // // //         ['Budget Estimate', serviceData.budget_estimate],
// // // // //         ['Special Requirements', serviceData.special_requirements],
// // // // //       ];
// // // // //     }

// // // // //     return (
// // // // //       <Box sx={{ mt: 2 }}>
// // // // //         <Typography variant="h6" sx={{ 
// // // // //           color: theme.palette.primary.main,
// // // // //           fontWeight: 'bold',
// // // // //           mb: 2
// // // // //         }}>
// // // // //           {inquiry.sub_service} Information
// // // // //         </Typography>
// // // // //         <Box sx={{ 
// // // // //           display: 'grid',
// // // // //           gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
// // // // //           gap: 2,
// // // // //           pl: 2
// // // // //         }}>
// // // // //           {fields.map(([label, value], index) => (
// // // // //             value && (
// // // // //               <Box key={index} sx={{ display: 'flex', gap: 1 }}>
// // // // //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px' }}>
// // // // //                   {label}:
// // // // //                 </Typography>
// // // // //                 <Typography variant="body2">
// // // // //                   {value}
// // // // //                 </Typography>
// // // // //               </Box>
// // // // //             )
// // // // //           ))}
// // // // //         </Box>
// // // // //         {inquiry.sub_service === 'Comprehensive Building Planning & Design' && (
// // // // //           <>
// // // // //             {/* Comments Section for Engineering Consulting */}
// // // // //             <Box sx={{ mt: 2 }}>
// // // // //               <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
// // // // //                 Comments
// // // // //               </Typography>
// // // // //               {inquiry.comments && inquiry.comments.length > 0 ? (
// // // // //                 <Box sx={{ pl: 2, mb: 2 }}>
// // // // //                   {inquiry.comments.map((comment) => (
// // // // //                     <Box key={comment.id} sx={{ mb: 1 }}>
// // // // //                       <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
// // // // //                         "{comment.comment_text}"
// // // // //                       </Typography>
// // // // //                       {comment.company_response ? (
// // // // //                         <Typography variant="body2" sx={{ pl: 2, color: theme.palette.text.secondary }}>
// // // // //                           Response: {comment.company_response}
// // // // //                         </Typography>
// // // // //                       ) : (
// // // // //                         <Box sx={{ display: 'flex', gap: 2, pl: 2, mt: 1 }}>
// // // // //                           <TextField
// // // // //                             label="Add Reply"
// // // // //                             multiline
// // // // //                             rows={2}
// // // // //                             value={replyingToCommentId === comment.id ? replyText : ''}
// // // // //                             onChange={(e) => {
// // // // //                               setReplyingToCommentId(comment.id);
// // // // //                               setReplyText(e.target.value);
// // // // //                             }}
// // // // //                             fullWidth
// // // // //                             sx={{ maxWidth: 400 }}
// // // // //                           />
// // // // //                           <Button
// // // // //                             variant="contained"
// // // // //                             color="primary"
// // // // //                             size="small"
// // // // //                             onClick={() => handleAddReply(comment.id)}
// // // // //                             disabled={replyingToCommentId !== comment.id || !replyText}
// // // // //                           >
// // // // //                             Submit Reply
// // // // //                           </Button>
// // // // //                         </Box>
// // // // //                       )}
// // // // //                       <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
// // // // //                         Added on {formatDate(comment.created_at)}
// // // // //                       </Typography>
// // // // //                       {replyStatus && replyingToCommentId === comment.id && (
// // // // //                         <Alert severity={replyStatus.type} sx={{ mt: 1, pl: 2 }}>
// // // // //                           {replyStatus.message}
// // // // //                         </Alert>
// // // // //                       )}
// // // // //                     </Box>
// // // // //                   ))}
// // // // //                 </Box>
// // // // //               ) : (
// // // // //                 <Typography variant="body2" sx={{ pl: 2, mb: 2, color: theme.palette.text.secondary }}>
// // // // //                   No comments yet.
// // // // //                 </Typography>
// // // // //               )}
// // // // //               <Box sx={{ display: 'flex', gap: 2, pl: 2 }}>
// // // // //                 <TextField
// // // // //                   label="Add Comment"
// // // // //                   multiline
// // // // //                   rows={3}
// // // // //                   value={commentText}
// // // // //                   onChange={(e) => setCommentText(e.target.value)}
// // // // //                   fullWidth
// // // // //                   sx={{ maxWidth: 500 }}
// // // // //                 />
// // // // //                 <Button
// // // // //                   variant="contained"
// // // // //                   color="primary"
// // // // //                   onClick={() => handleAddComment(inquiry.id)}
// // // // //                   disabled={!commentText}
// // // // //                 >
// // // // //                   Submit Comment
// // // // //                 </Button>
// // // // //               </Box>
// // // // //               {commentStatus && (
// // // // //                 <Alert severity={commentStatus.type} sx={{ mt: 2, pl: 2 }}>
// // // // //                   {commentStatus.message}
// // // // //                 </Alert>
// // // // //               )}
// // // // //             </Box>
// // // // //           </>
// // // // //         )}
// // // // //       </Box>
// // // // //     );
// // // // //   };

// // // // //   const renderConstructionInfo = (inquiry) => {
// // // // //     const serviceData = inquiry.service_data || {};

// // // // //     return (
// // // // //       <Box sx={{ mt: 2 }}>
// // // // //         <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
// // // // //           Construction Progress
// // // // //         </Typography>
// // // // //         <Box sx={{ pl: 2 }}>
// // // // //           {/* Status Update Controls */}
// // // // //           <Box sx={{ mb: 3 }}>
// // // // //             <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
// // // // //               Update Construction Progress
// // // // //             </Typography>
// // // // //             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
// // // // //               <FormControl sx={{ minWidth: 200 }}>
// // // // //                 <InputLabel>Construction Phase</InputLabel>
// // // // //                 <Select
// // // // //                   value={constructionPhase[inquiry.id] || ''}
// // // // //                   onChange={(e) =>
// // // // //                     setConstructionPhase({ ...constructionPhase, [inquiry.id]: e.target.value })
// // // // //                   }
// // // // //                   label="Construction Phase"
// // // // //                 >
// // // // //                   <MenuItem value=""><em>Select Phase</em></MenuItem>
// // // // //                   <MenuItem value="Foundation">Foundation</MenuItem>
// // // // //                   <MenuItem value="Walls">Walls</MenuItem>
// // // // //                   <MenuItem value="Excavation">Excavation</MenuItem>
// // // // //                   <MenuItem value="Columns Casting">Columns Casting</MenuItem>
// // // // //                   <MenuItem value="Beams Casting">Beams Casting</MenuItem>
// // // // //                   <MenuItem value="Slab Casting">Slab Casting</MenuItem>
// // // // //                   <MenuItem value="Roofing">Roofing</MenuItem>
// // // // //                   <MenuItem value="Electrical & Plumbing">Electrical & Plumbing</MenuItem>
// // // // //                   <MenuItem value="Plastering">Plastering</MenuItem>
// // // // //                   <MenuItem value="Finishing">Finishing</MenuItem>
// // // // //                 </Select>
// // // // //               </FormControl>
// // // // //               <TextField
// // // // //                 label="Progress Percentage"
// // // // //                 type="number"
// // // // //                 value={progressPercentage[inquiry.id] || ''}
// // // // //                 onChange={(e) =>
// // // // //                   setProgressPercentage({ ...progressPercentage, [inquiry.id]: e.target.value })
// // // // //                 }
// // // // //                 inputProps={{ min: 0, max: 100 }}
// // // // //                 sx={{ maxWidth: 150 }}
// // // // //               />
// // // // //               <FormControl sx={{ minWidth: 200 }}>
// // // // //                 <InputLabel>Permit Status</InputLabel>
// // // // //                 <Select
// // // // //                   value={permitStatus[inquiry.id] || ''}
// // // // //                   onChange={(e) =>
// // // // //                     setPermitStatus({ ...permitStatus, [inquiry.id]: e.target.value })
// // // // //                   }
// // // // //                   label="Permit Status"
// // // // //                 >
// // // // //                   <MenuItem value=""><em>Select Status</em></MenuItem>
// // // // //                   <MenuItem value="Submitted">Submitted</MenuItem>
// // // // //                   <MenuItem value="Under Review">Under Review</MenuItem>
// // // // //                   <MenuItem value="Approved">Approved</MenuItem>
// // // // //                   <MenuItem value="Rejected">Rejected</MenuItem>
// // // // //                 </Select>
// // // // //               </FormControl>
// // // // //               <Button
// // // // //                 variant="contained"
// // // // //                 color="primary"
// // // // //                 onClick={() => handleUpdateProgress(inquiry.id)}
// // // // //                 disabled={
// // // // //                   !constructionPhase[inquiry.id] ||
// // // // //                   !progressPercentage[inquiry.id] ||
// // // // //                   !permitStatus[inquiry.id]
// // // // //                 }
// // // // //               >
// // // // //                 Update Progress
// // // // //               </Button>
// // // // //             </Box>
// // // // //             {updateStatus && (
// // // // //               <Alert severity={updateStatus.type} sx={{ mb: 2 }}>
// // // // //                 {updateStatus.message}
// // // // //               </Alert>
// // // // //             )}
// // // // //           </Box>
// // // // //           {/* Common Documents for Building Construction Services */}
// // // // //           <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
// // // // //             Common Documents
// // // // //           </Typography>
// // // // //           {Object.entries({
// // // // //             'Lalpurja': serviceData.lalpurja,
// // // // //             'Napi Naksa': serviceData.napi_naksa,
// // // // //             'Tax Clearance': serviceData.tax_clearance,
// // // // //             'Approved Building Drawings': serviceData.approved_building_drawings,
// // // // //           }).map(([key, value]) => (
// // // // //             value && (
// // // // //               <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // // //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px' }}>
// // // // //                   {key.toUpperCase()}:
// // // // //                 </Typography>
// // // // //                 <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //                   <Link href={`${backendBaseUrl}${value}`} target="_blank" sx={{ color: theme.palette.secondary.main }}>
// // // // //                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// // // // //                   </Link>
// // // // //                   <Link href={`${backendBaseUrl}${value}`} download sx={{ color: theme.palette.secondary.main }}>
// // // // //                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// // // // //                   </Link>
// // // // //                 </Box>
// // // // //               </Box>
// // // // //             )
// // // // //           ))}
// // // // //           {/* Sub-Service Specific Documents */}
// // // // //           <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2, mt: 2 }}>
// // // // //             Uploaded Documents
// // // // //           </Typography>
// // // // //           {inquiry.sub_service === 'Residential Construction' && Object.entries({
// // // // //             'Soil Test Report': serviceData.soil_test_report,
// // // // //             'Structural Stability Certificate': serviceData.structural_stability_certificate,
// // // // //             'House Design Approval': serviceData.house_design_approval,
// // // // //             'Neighbour Consent': serviceData.neighbour_consent,
// // // // //           }).map(([key, value]) => (
// // // // //             value && (
// // // // //               <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // // //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px' }}>
// // // // //                   {key.toUpperCase()}:
// // // // //                 </Typography>
// // // // //                 <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //                   <Link href={`${backendBaseUrl}${value}`} target="_blank" sx={{ color: theme.palette.secondary.main }}>
// // // // //                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// // // // //                   </Link>
// // // // //                   <Link href={`${backendBaseUrl}${value}`} download sx={{ color: theme.palette.secondary.main }}>
// // // // //                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// // // // //                   </Link>
// // // // //                 </Box>
// // // // //               </Box>
// // // // //             )
// // // // //           ))}
// // // // //           {inquiry.sub_service === 'Commercial Construction' && Object.entries({
// // // // //             'IEE Report': serviceData.iee_report,
// // // // //             'Fire Safety Certificate': serviceData.fire_safety_certificate,
// // // // //             'Lift Permit': serviceData.lift_permit,
// // // // //             'Parking Layout Plan': serviceData.parking_layout_plan,
// // // // //           }).map(([key, value]) => (
// // // // //             value && (
// // // // //               <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // // //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px' }}>
// // // // //                   {key.toUpperCase()}:
// // // // //                 </Typography>
// // // // //                 <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //                   <Link href={`${backendBaseUrl}${value}`} target="_blank" sx={{ color: theme.palette.secondary.main }}>
// // // // //                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// // // // //                   </Link>
// // // // //                   <Link href={`${backendBaseUrl}${value}`} download sx={{ color: theme.palette.secondary.main }}>
// // // // //                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// // // // //                   </Link>
// // // // //                 </Box>
// // // // //               </Box>
// // // // //             )
// // // // //           ))}
// // // // //           {inquiry.sub_service === 'Renovation and Remodeling Services' && Object.entries({
// // // // //             'Owner Permission Letter': serviceData.owner_permission_letter,
// // // // //             'Existing Structure Analysis': serviceData.existing_structure_analysis,
// // // // //             'Renovation Plan': serviceData.renovation_plan,
// // // // //             'NOC Municipality': serviceData.noc_municipality,
// // // // //             'Waste Management Plan': serviceData.waste_management_plan,
// // // // //           }).map(([key, value]) => (
// // // // //             value && (
// // // // //               <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // // //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px' }}>
// // // // //                   {key.toUpperCase()}:
// // // // //                 </Typography>
// // // // //                 <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //                   <Link href={`${backendBaseUrl}${value}`} target="_blank" sx={{ color: theme.palette.secondary.main }}>
// // // // //                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// // // // //                   </Link>
// // // // //                   <Link href={`${backendBaseUrl}${value}`} download sx={{ color: theme.palette.secondary.main }}>
// // // // //                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// // // // //                   </Link>
// // // // //                 </Box>
// // // // //               </Box>
// // // // //             )
// // // // //           ))}
// // // // //           {/* Progress Photos Upload and List */}
// // // // //           <Box sx={{ mb: 2, mt: 2 }}>
// // // // //             <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
// // // // //               Progress Photos:
// // // // //             </Typography>
// // // // //             {serviceData.progress_photos && serviceData.progress_photos.length > 0 && (
// // // // //               <Box sx={{ mb: 1, pl: 2 }}>
// // // // //                 {serviceData.progress_photos.map((photo, index) => (
// // // // //                   <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
// // // // //                     <Typography variant="body2" sx={{ minWidth: '160px' }}>
// // // // //                       Progress Photo {index + 1}:
// // // // //                     </Typography>
// // // // //                     <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //                       <Link href={`${backendBaseUrl}${photo}`} target="_blank" sx={{ color: theme.palette.secondary.main }}>
// // // // //                         <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// // // // //                       </Link>
// // // // //                       <Link href={`${backendBaseUrl}${photo}`} download sx={{ color: theme.palette.secondary.main }}>
// // // // //                         <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// // // // //                       </Link>
// // // // //                     </Box>
// // // // //                   </Box>
// // // // //                 ))}
// // // // //               </Box>
// // // // //             )}
// // // // //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
// // // // //               <Input
// // // // //                 type="file"
// // // // //                 multiple
// // // // //                 onChange={(e) => setProgressPhotos(e.target.files)}
// // // // //                 inputProps={{ accept: 'image/*,application/pdf' }}
// // // // //               />
// // // // //               <Button
// // // // //                 variant="contained"
// // // // //                 color="primary"
// // // // //                 size="small"
// // // // //                 onClick={() => handleProgressPhotosUpload(inquiry.id)}
// // // // //                 disabled={!progressPhotos}
// // // // //               >
// // // // //                 Upload Progress Photos
// // // // //               </Button>
// // // // //             </Box>
// // // // //           </Box>
// // // // //           {/* Inspection Reports Upload and List */}
// // // // //           <Box sx={{ mb: 2 }}>
// // // // //             <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
// // // // //               Inspection Reports:
// // // // //             </Typography>
// // // // //             {serviceData.inspection_reports && serviceData.inspection_reports.length > 0 && (
// // // // //               <Box sx={{ mb: 1, pl: 2 }}>
// // // // //                 {serviceData.inspection_reports.map((report, index) => (
// // // // //                   <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
// // // // //                     <Typography variant="body2" sx={{ minWidth: '160px' }}>
// // // // //                       Inspection Report {index + 1}:
// // // // //                     </Typography>
// // // // //                     <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //                       <Link href={`${backendBaseUrl}${report}`} target="_blank" sx={{ color: theme.palette.secondary.main }}>
// // // // //                         <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// // // // //                       </Link>
// // // // //                       <Link href={`${backendBaseUrl}${report}`} download sx={{ color: theme.palette.secondary.main }}>
// // // // //                         <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// // // // //                       </Link>
// // // // //                     </Box>
// // // // //                   </Box>
// // // // //                 ))}
// // // // //               </Box>
// // // // //             )}
// // // // //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
// // // // //               <Input
// // // // //                 type="file"
// // // // //                 multiple
// // // // //                 onChange={(e) => setInspectionReports(e.target.files)}
// // // // //                 inputProps={{ accept: 'application/pdf,image/*' }}
// // // // //               />
// // // // //               <Button
// // // // //                 variant="contained"
// // // // //                 color="primary"
// // // // //                 size="small"
// // // // //                 onClick={() => handleInspectionReportsUpload(inquiry.id)}
// // // // //                 disabled={!inspectionReports}
// // // // //               >
// // // // //                 Upload Inspection Reports
// // // // //               </Button>
// // // // //             </Box>
// // // // //           </Box>
// // // // //           {/* Completion Certificate Upload and List - Only shown when status is Completed */}
// // // // //           {inquiry.status === 'Completed' && (
// // // // //             <Box sx={{ mb: 2 }}>
// // // // //               <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
// // // // //                 Completion Certificate:
// // // // //               </Typography>
// // // // //               {serviceData.completion_certificate ? (
// // // // //                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
// // // // //                   <Typography variant="body2" sx={{ minWidth: '160px' }}>
// // // // //                     Completion Certificate:
// // // // //                   </Typography>
// // // // //                   <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //                     <Link href={`${backendBaseUrl}${serviceData.completion_certificate}`} target="_blank" sx={{ color: theme.palette.secondary.main }}>
// // // // //                       <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// // // // //                     </Link>
// // // // //                     <Link href={`${backendBaseUrl}${serviceData.completion_certificate}`} download sx={{ color: theme.palette.secondary.main }}>
// // // // //                       <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// // // // //                     </Link>
// // // // //                   </Box>
// // // // //                 </Box>
// // // // //               ) : (
// // // // //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
// // // // //                   <Input
// // // // //                     type="file"
// // // // //                     onChange={(e) => setCompletionCertificate(e.target.files[0])}
// // // // //                     inputProps={{ accept: 'application/pdf,image/*' }}
// // // // //                   />
// // // // //                   <Button
// // // // //                     variant="contained"
// // // // //                     color="primary"
// // // // //                     size="small"
// // // // //                     onClick={() => handleCompletionCertificateUpload(inquiry.id)}
// // // // //                     disabled={!completionCertificate}
// // // // //                   >
// // // // //                     Upload Completion Certificate
// // // // //                   </Button>
// // // // //                 </Box>
// // // // //               )}
// // // // //             </Box>
// // // // //           )}
// // // // //           {/* Comments Section */}
// // // // //           <Box sx={{ mt: 2 }}>
// // // // //             <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
// // // // //               Comments
// // // // //             </Typography>
// // // // //             {inquiry.comments && inquiry.comments.length > 0 ? (
// // // // //               <Box sx={{ pl: 2, mb: 2 }}>
// // // // //                 {inquiry.comments.map((comment) => (
// // // // //                   <Box key={comment.id} sx={{ mb: 1 }}>
// // // // //                     <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
// // // // //                       "{comment.comment_text}"
// // // // //                     </Typography>
// // // // //                     {comment.company_response ? (
// // // // //                       <Typography variant="body2" sx={{ pl: 2, color: theme.palette.text.secondary }}>
// // // // //                         Response: {comment.company_response}
// // // // //                       </Typography>
// // // // //                     ) : (
// // // // //                       <Box sx={{ display: 'flex', gap: 2, pl: 2, mt: 1 }}>
// // // // //                         <TextField
// // // // //                           label="Add Reply"
// // // // //                           multiline
// // // // //                           rows={2}
// // // // //                           value={replyingToCommentId === comment.id ? replyText : ''}
// // // // //                           onChange={(e) => {
// // // // //                             setReplyingToCommentId(comment.id);
// // // // //                             setReplyText(e.target.value);
// // // // //                           }}
// // // // //                           fullWidth
// // // // //                           sx={{ maxWidth: 400 }}
// // // // //                         />
// // // // //                         <Button
// // // // //                           variant="contained"
// // // // //                           color="primary"
// // // // //                           size="small"
// // // // //                           onClick={() => handleAddReply(comment.id)}
// // // // //                           disabled={replyingToCommentId !== comment.id || !replyText}
// // // // //                         >
// // // // //                           Submit Reply
// // // // //                         </Button>
// // // // //                       </Box>
// // // // //                     )}
// // // // //                     <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
// // // // //                       Added on {formatDate(comment.created_at)}
// // // // //                     </Typography>
// // // // //                     {replyStatus && replyingToCommentId === comment.id && (
// // // // //                       <Alert severity={replyStatus.type} sx={{ mt: 1, pl: 2 }}>
// // // // //                         {replyStatus.message}
// // // // //                       </Alert>
// // // // //                     )}
// // // // //                   </Box>
// // // // //                 ))}
// // // // //               </Box>
// // // // //             ) : (
// // // // //               <Typography variant="body2" sx={{ pl: 2, mb: 2, color: theme.palette.text.secondary }}>
// // // // //                 No comments yet.
// // // // //               </Typography>
// // // // //             )}
// // // // //             <Box sx={{ display: 'flex', gap: 2, pl: 2 }}>
// // // // //               <TextField
// // // // //                 label="Add Comment"
// // // // //                 multiline
// // // // //                 rows={3}
// // // // //                 value={commentText}
// // // // //                 onChange={(e) => setCommentText(e.target.value)}
// // // // //                 fullWidth
// // // // //                 sx={{ maxWidth: 500 }}
// // // // //               />
// // // // //               <Button
// // // // //                 variant="contained"
// // // // //                 color="primary"
// // // // //                 onClick={() => handleAddComment(inquiry.id)}
// // // // //                 disabled={!commentText}
// // // // //               >
// // // // //                 Submit Comment
// // // // //               </Button>
// // // // //             </Box>
// // // // //             {commentStatus && (
// // // // //               <Alert severity={commentStatus.type} sx={{ mt: 2, pl: 2 }}>
// // // // //                 {commentStatus.message}
// // // // //               </Alert>
// // // // //             )}
// // // // //           </Box>
// // // // //         </Box>
// // // // //       </Box>
// // // // //     );
// // // // //   };

// // // // //   const renderDocuments = (inquiry) => {
// // // // //     const serviceData = inquiry.service_data || {};
// // // // //     return (
// // // // //       <Box sx={{ mt: 2 }}>
// // // // //         <Typography variant="h6" sx={{ 
// // // // //           color: theme.palette.primary.main,
// // // // //           fontWeight: 'bold',
// // // // //           mb: 2
// // // // //         }}>
// // // // //           Uploaded Documents
// // // // //         </Typography>
// // // // //         {Object.entries({
// // // // //           'Site Plan': serviceData.site_plan,
// // // // //           'Architectural Plan': serviceData.architectural_plan,
// // // // //           'Soil Test Report': serviceData.soil_test_report,
// // // // //           'Foundation Design': serviceData.foundation_design,
// // // // //           'Electrical Plan': serviceData.electrical_plan,
// // // // //           'Plumbing Plan': serviceData.plumbing_plan,
// // // // //           'HVAC Plan': serviceData.hvac_plan,
// // // // //           'Construction Permit': serviceData.construction_permit,
// // // // //           'Cost Estimation': serviceData.cost_estimation,
// // // // //           'Maintenance Photos': serviceData.maintenance_photos,
// // // // //         }).map(([key, value]) => (
// // // // //           value && (
// // // // //             <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
// // // // //               <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px' }}>
// // // // //                 {key.replace(/_/g, ' ').toUpperCase()}:
// // // // //               </Typography>
// // // // //               <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //                 <Link 
// // // // //                   href={`${backendBaseUrl}${value}`} 
// // // // //                   target="_blank"
// // // // //                   sx={{ color: theme.palette.secondary.main }}
// // // // //                 >
// // // // //                   <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// // // // //                 </Link>
// // // // //                 <Link 
// // // // //                   href={`${backendBaseUrl}${value}`} 
// // // // //                   download
// // // // //                   sx={{ color: theme.palette.secondary.main }}
// // // // //                 >
// // // // //                   <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// // // // //                 </Link>
// // // // //               </Box>
// // // // //             </Box>
// // // // //           )
// // // // //         ))}
// // // // //       </Box>
// // // // //     );
// // // // //   };

// // // // //   const renderMaintenanceInfo = (inquiry) => {
// // // // //     const serviceData = inquiry.service_data || {};
// // // // //     return (
// // // // //       <Box sx={{ mt: 2 }}>
// // // // //         <Typography variant="h6" sx={{ 
// // // // //           color: theme.palette.primary.main,
// // // // //           fontWeight: 'bold',
// // // // //           mb: 2
// // // // //         }}>
// // // // //           Maintenance Information
// // // // //         </Typography>
// // // // //         <Box sx={{ pl: 2 }}>
// // // // //           {[
// // // // //             ['Maintenance Type', serviceData.maintenance_type],
// // // // //             ['Maintenance Details', serviceData.maintenance_details],
// // // // //             ['Preferred Date', serviceData.preferred_date],
// // // // //             ['Preferred Time', serviceData.preferred_time],
// // // // //             ['Payment Agreed', serviceData.payment_agreed ? 'Yes' : 'No'],
// // // // //           ].map(([label, value], index) => (
// // // // //             value && (
// // // // //               <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
// // // // //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px' }}>
// // // // //                   {label}:
// // // // //                 </Typography>
// // // // //                 <Typography variant="body2">
// // // // //                   {value}
// // // // //                 </Typography>
// // // // //               </Box>
// // // // //             )
// // // // //           ))}
// // // // //           {serviceData.maintenance_photos && (
// // // // //             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // // //               <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px' }}>
// // // // //                 Maintenance Photos:
// // // // //               </Typography>
// // // // //               <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //                 <Link 
// // // // //                   href={`${backendBaseUrl}${serviceData.maintenance_photos}`} 
// // // // //                   target="_blank"
// // // // //                   sx={{ color: theme.palette.secondary.main }}
// // // // //                 >
// // // // //                   <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// // // // //                 </Link>
// // // // //                 <Link 
// // // // //                   href={`${backendBaseUrl}${serviceData.maintenance_photos}`} 
// // // // //                   download
// // // // //                   sx={{ color: theme.palette.secondary.main }}
// // // // //                 >
// // // // //                   <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// // // // //                 </Link>
// // // // //               </Box>
// // // // //             </Box>
// // // // //           )}
// // // // //         </Box>
// // // // //         <Box sx={{ mt: 2 }}>
// // // // //           <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
// // // // //             Comments
// // // // //           </Typography>
// // // // //           {inquiry.comments && inquiry.comments.length > 0 ? (
// // // // //             <Box sx={{ pl: 2, mb: 2 }}>
// // // // //               {inquiry.comments.map((comment) => (
// // // // //                 <Box key={comment.id} sx={{ mb: 1 }}>
// // // // //                   <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
// // // // //                     "{comment.comment_text}"
// // // // //                   </Typography>
// // // // //                   <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
// // // // //                     Added on {formatDate(comment.created_at)}
// // // // //                   </Typography>
// // // // //                 </Box>
// // // // //               ))}
// // // // //             </Box>
// // // // //           ) : (
// // // // //             <Typography variant="body2" sx={{ pl: 2, mb: 2, color: theme.palette.text.secondary }}>
// // // // //               No comments yet.
// // // // //             </Typography>
// // // // //           )}
// // // // //           <Box sx={{ display: 'flex', gap: 2, pl: 2 }}>
// // // // //             <TextField
// // // // //               label="Add Comment"
// // // // //               multiline
// // // // //               rows={3}
// // // // //               value={commentText}
// // // // //               onChange={(e) => setCommentText(e.target.value)}
// // // // //               fullWidth
// // // // //               sx={{ maxWidth: 500 }}
// // // // //             />
// // // // //             <Button
// // // // //               variant="contained"
// // // // //               color="primary"
// // // // //               onClick={() => handleAddComment(inquiry.id)}
// // // // //               disabled={!commentText}
// // // // //             >
// // // // //               Submit Comment
// // // // //             </Button>
// // // // //           </Box>
// // // // //           {commentStatus && (
// // // // //             <Alert severity={commentStatus.type} sx={{ mt: 2, pl: 2 }}>
// // // // //               {commentStatus.message}
// // // // //             </Alert>
// // // // //           )}
// // // // //         </Box>
// // // // //       </Box>
// // // // //     );
// // // // //   };

// // // // //   const renderTrainingInfo = (inquiry) => {
// // // // //     const serviceData = inquiry.service_data || {};
// // // // //     return (
// // // // //       <Box sx={{ mt: 2 }}>
// // // // //         <Typography variant="h6" sx={{ 
// // // // //           color: theme.palette.primary.main,
// // // // //           fontWeight: 'bold',
// // // // //           mb: 2
// // // // //         }}>
// // // // //           Training Information
// // // // //         </Typography>
// // // // //         <Box sx={{ pl: 2 }}>
// // // // //           {[
// // // // //             ['Language Preference', serviceData.language_preference],
// // // // //             ['Language Preference (Other)', serviceData.language_preference_other],
// // // // //             ['Training Date', serviceData.training_date],
// // // // //             ['Training Time', serviceData.training_time],
// // // // //             ['Training Location', serviceData.training_location || inquiry.location],
// // // // //             ['Training Agreement', serviceData.training_agreement ? 'Yes' : 'No'],
// // // // //           ].map(([label, value], index) => (
// // // // //             value && (
// // // // //               <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
// // // // //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px' }}>
// // // // //                   {label}:
// // // // //                 </Typography>
// // // // //                 <Typography variant="body2">
// // // // //                   {value}
// // // // //                 </Typography>
// // // // //               </Box>
// // // // //             )
// // // // //           ))}
// // // // //         </Box>
// // // // //         {inquiry.category === 'Safety and Training Services' && inquiry.status !== 'Completed' && (
// // // // //           <Box sx={{ mt: 2 }}>
// // // // //             <Button
// // // // //               variant="contained"
// // // // //               color="primary"
// // // // //               size="small"
// // // // //               onClick={() => handleOpenEmailDialog(inquiry)}
// // // // //             >
// // // // //               Send Email
// // // // //             </Button>
// // // // //           </Box>
// // // // //         )}
// // // // //         {inquiry.category === 'Safety and Training Services' && inquiry.status !== 'Completed' && (
// // // // //           <Box sx={{ mt: 2 }}>
// // // // //             <Button
// // // // //               variant="contained"
// // // // //               color="success"
// // // // //               size="small"
// // // // //               onClick={() => updateInquiryStatus(inquiry.id, 'Completed')}
// // // // //             >
// // // // //               Mark as Completed
// // // // //             </Button>
// // // // //           </Box>
// // // // //         )}
// // // // //         {inquiry.status === 'Completed' && inquiry.category === 'Safety and Training Services' && (
// // // // //           <Box sx={{ mt: 2 }}>
// // // // //             <Typography variant="h6" sx={{ 
// // // // //               color: theme.palette.primary.main,
// // // // //               fontWeight: 'bold',
// // // // //               mb: 2
// // // // //             }}>
// // // // //               Certificate
// // // // //             </Typography>
// // // // //             {inquiry.certificate ? (
// // // // //               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // // //                 <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 2 }}>
// // // // //                   Certificate Uploaded:
// // // // //                 </Typography>
// // // // //                 <Link href={`${backendBaseUrl}${inquiry.certificate}`} target="_blank" sx={{ color: theme.palette.secondary.main }}>
// // // // //                   View/Download
// // // // //                 </Link>
// // // // //               </Box>
// // // // //             ) : (
// // // // //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// // // // //                 <Input
// // // // //                   type="file"
// // // // //                   onChange={(e) => setCertificateFile(e.target.files[0])}
// // // // //                   inputProps={{ accept: 'application/pdf,image/*' }}
// // // // //                 />
// // // // //                 <Button
// // // // //                   variant="contained"
// // // // //                   color="primary"
// // // // //                   size="small"
// // // // //                   onClick={() => handleCertificateUpload(inquiry.id)}
// // // // //                   disabled={!certificateFile}
// // // // //                 >
// // // // //                   Upload Certificate
// // // // //                 </Button>
// // // // //               </Box>
// // // // //             )}
// // // // //           </Box>
// // // // //         )}
        
// // // // //         {/* Comments Section for Safety and Training */}
// // // // //         <Box sx={{ mt: 2 }}>
// // // // //           <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
// // // // //             Comments
// // // // //           </Typography>
// // // // //           {inquiry.comments && inquiry.comments.length > 0 ? (
// // // // //             <Box sx={{ pl: 2, mb: 2 }}>
// // // // //               {inquiry.comments.map((comment) => (
// // // // //                 <Box key={comment.id} sx={{ mb: 1 }}>
// // // // //                   <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
// // // // //                     "{comment.comment_text}"
// // // // //                   </Typography>
// // // // //                   {comment.company_response ? (
// // // // //                     <Typography variant="body2" sx={{ pl: 2, color: theme.palette.text.secondary }}>
// // // // //                       Response: {comment.company_response}
// // // // //                     </Typography>
// // // // //                   ) : (
// // // // //                     <Box sx={{ display: 'flex', gap: 2, pl: 2, mt: 1 }}>
// // // // //                       <TextField
// // // // //                         label="Add Reply"
// // // // //                         multiline
// // // // //                         rows={2}
// // // // //                         value={replyingToCommentId === comment.id ? replyText : ''}
// // // // //                         onChange={(e) => {
// // // // //                           setReplyingToCommentId(comment.id);
// // // // //                           setReplyText(e.target.value);
// // // // //                         }}
// // // // //                         fullWidth
// // // // //                         sx={{ maxWidth: 400 }}
// // // // //                       />
// // // // //                       <Button
// // // // //                         variant="contained"
// // // // //                         color="primary"
// // // // //                         size="small"
// // // // //                         onClick={() => handleAddReply(comment.id)}
// // // // //                         disabled={replyingToCommentId !== comment.id || !replyText}
// // // // //                       >
// // // // //                         Submit Reply
// // // // //                       </Button>
// // // // //                     </Box>
// // // // //                   )}
// // // // //                   <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
// // // // //                     Added on {formatDate(comment.created_at)}
// // // // //                   </Typography>
// // // // //                   {replyStatus && replyingToCommentId === comment.id && (
// // // // //                     <Alert severity={replyStatus.type} sx={{ mt: 1, pl: 2 }}>
// // // // //                       {replyStatus.message}
// // // // //                     </Alert>
// // // // //                   )}
// // // // //                 </Box>
// // // // //               ))}
// // // // //             </Box>
// // // // //           ) : (
// // // // //             <Typography variant="body2" sx={{ pl: 2, mb: 2, color: theme.palette.text.secondary }}>
// // // // //               No comments yet.
// // // // //             </Typography>
// // // // //           )}
// // // // //           <Box sx={{ display: 'flex', gap: 2, pl: 2 }}>
// // // // //             <TextField
// // // // //               label="Add Comment"
// // // // //               multiline
// // // // //               rows={3}
// // // // //               value={commentText}
// // // // //               onChange={(e) => setCommentText(e.target.value)}
// // // // //               fullWidth
// // // // //               sx={{ maxWidth: 500 }}
// // // // //             />
// // // // //             <Button
// // // // //               variant="contained"
// // // // //               color="primary"
// // // // //               onClick={() => handleAddComment(inquiry.id)}
// // // // //               disabled={!commentText}
// // // // //             >
// // // // //               Submit Comment
// // // // //             </Button>
// // // // //           </Box>
// // // // //           {commentStatus && (
// // // // //             <Alert severity={commentStatus.type} sx={{ mt: 2, pl: 2 }}>
// // // // //               {commentStatus.message}
// // // // //             </Alert>
// // // // //           )}
// // // // //         </Box>
// // // // //       </Box>
// // // // //     );
// // // // //   };

// // // // //   const renderDetails = (inquiry) => {
// // // // //     const serviceHandlers = {
// // // // //       'Comprehensive Building Planning & Design': renderBuildingInfo,
// // // // //       'Structural & Geotechnical Consultation': renderDocuments,
// // // // //       'MEP System Design (Mechanical, Electrical & Plumbing)': renderDocuments,
// // // // //       'Construction Management & Cost Estimation': renderDocuments,
// // // // //       'Residential Construction': (inquiry) => (
// // // // //         <>
// // // // //           {renderBuildingInfo(inquiry)}
// // // // //           {renderConstructionInfo(inquiry)}
// // // // //         </>
// // // // //       ),
// // // // //       'Commercial Construction': (inquiry) => (
// // // // //         <>
// // // // //           {renderBuildingInfo(inquiry)}
// // // // //           {renderConstructionInfo(inquiry)}
// // // // //         </>
// // // // //       ),
// // // // //       'Renovation and Remodeling Services': (inquiry) => (
// // // // //         <>
// // // // //           {renderBuildingInfo(inquiry)}
// // // // //           {renderConstructionInfo(inquiry)}
// // // // //         </>
// // // // //       ),
// // // // //       'Post-Construction Maintenance': renderMaintenanceInfo,
// // // // //       'Workplace Safety Training Modules': renderTrainingInfo,
// // // // //     };

// // // // //     const handler = serviceHandlers[inquiry.sub_service];
// // // // //     return handler ? handler(inquiry) : null;
// // // // //   };

// // // // //   const getStatusColor = (status) => {
// // // // //     switch (status) {
// // // // //       case 'Pending': return 'warning';
// // // // //       case 'Scheduled': return 'info';
// // // // //       case 'Completed': return 'success';
// // // // //       case 'No-Show': return 'error';
// // // // //       case 'Permit Processing': return 'info';
// // // // //       case 'Under Construction': return 'warning';
// // // // //       case 'Awaiting Inspection': return 'warning';
// // // // //       case 'Finishing': return 'info';
// // // // //       case 'Handover Pending': return 'warning';
// // // // //       default: return 'default';
// // // // //     }
// // // // //   };

// // // // //   const formatDate = (dateString) => {
// // // // //     const options = { 
// // // // //       year: 'numeric', 
// // // // //       month: 'short', 
// // // // //       day: '2-digit', 
// // // // //       hour: '2-digit', 
// // // // //       minute: '2-digit',
// // // // //       hour12: true
// // // // //     };
// // // // //     return new Date(dateString).toLocaleString('en-US', options);
// // // // //   };

// // // // //   return (
// // // // //     <Box sx={{ p: 2 }}>
// // // // //       <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
// // // // //         <Typography variant="h4" sx={{ 
// // // // //           mb: 2, 
// // // // //           color: theme.palette.primary.main,
// // // // //           fontWeight: 'bold'
// // // // //         }}>
// // // // //           Client Inquiries
// // // // //         </Typography>

// // // // //         <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
// // // // //           <FormControl sx={{ minWidth: 200 }}>
// // // // //             <InputLabel>Filter by Category</InputLabel>
// // // // //             <Select
// // // // //               value={selectedCategory}
// // // // //               onChange={handleCategoryChange}
// // // // //               label="Filter by Category"
// // // // //             >
// // // // //               {categories.map((category) => (
// // // // //                 <MenuItem key={category} value={category}>
// // // // //                   {category}
// // // // //                 </MenuItem>
// // // // //               ))}
// // // // //             </Select>
// // // // //           </FormControl>

// // // // //           {selectedCategory === 'Safety and Training Services' && (
// // // // //             <FormControl sx={{ minWidth: 200 }}>
// // // // //               <InputLabel>Filter by Shift</InputLabel>
// // // // //               <Select
// // // // //                 value={selectedShift}
// // // // //                 onChange={handleShiftChange}
// // // // //                 label="Filter by Shift"
// // // // //               >
// // // // //                 {shifts.map((shift) => (
// // // // //                   <MenuItem key={shift} value={shift}>
// // // // //                     {shift}
// // // // //                   </MenuItem>
// // // // //                 ))}
// // // // //               </Select>
// // // // //             </FormControl>
// // // // //           )}
// // // // //         </Box>

// // // // //         {emailStatus && (
// // // // //           <Alert severity={emailStatus.type} sx={{ mb: 2 }}>
// // // // //             {emailStatus.message}
// // // // //           </Alert>
// // // // //         )}
// // // // //         {commentStatus && (
// // // // //           <Alert severity={commentStatus.type} sx={{ mb: 2 }}>
// // // // //             {commentStatus.message}
// // // // //           </Alert>
// // // // //         )}

// // // // //         {loading ? (
// // // // //           <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
// // // // //             <CircularProgress size={60} />
// // // // //           </Box>
// // // // //         ) : error ? (
// // // // //           <Typography color="error" sx={{ p: 2, bgcolor: '#ffeeee', borderRadius: 2 }}>
// // // // //             {error}
// // // // //           </Typography>
// // // // //         ) : filteredInquiries.length === 0 ? (
// // // // //           <Typography variant="h6" sx={{ p: 2, color: theme.palette.text.secondary }}>
// // // // //             No inquiries found
// // // // //           </Typography>
// // // // //         ) : (
// // // // //           <List sx={{ width: '100%' }}>
// // // // //             {filteredInquiries.map((inquiry) => {
// // // // //               const isNew = lastInquiryCheck && 
// // // // //                 new Date(inquiry.created_at) > new Date(lastInquiryCheck);

// // // // //               return (
// // // // //                 <Card 
// // // // //                   key={inquiry.id}
// // // // //                   sx={{ 
// // // // //                     mb: 3, 
// // // // //                     borderRadius: 3,
// // // // //                     borderLeft: isNew ? `4px solid ${theme.palette.error.main}` : 'none',
// // // // //                     boxShadow: theme.shadows[3],
// // // // //                     transition: 'transform 0.2s',
// // // // //                     '&:hover': {
// // // // //                       transform: 'translateY(-3px)',
// // // // //                       boxShadow: theme.shadows[6]
// // // // //                     }
// // // // //                   }}
// // // // //                 >
// // // // //                   <CardContent>
// // // // //                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// // // // //                       <Avatar sx={{ 
// // // // //                         bgcolor: theme.palette.primary.main, 
// // // // //                         mr: 2,
// // // // //                         width: 40,
// // // // //                         height: 40
// // // // //                       }}>
// // // // //                         <PersonIcon />
// // // // //                       </Avatar>
// // // // //                       <Box>
// // // // //                         <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
// // // // //                           {inquiry.full_name}
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
// // // // //                           Inquiry ID: #{inquiry.id}
// // // // //                         </Typography>
// // // // //                       </Box>
// // // // //                       {isNew && (
// // // // //                         <Chip
// // // // //                           label="NEW"
// // // // //                           color="error"
// // // // //                           size="small"
// // // // //                           sx={{ 
// // // // //                             ml: 2,
// // // // //                             fontWeight: 'bold',
// // // // //                             fontSize: '0.75rem',
// // // // //                             height: 24
// // // // //                           }}
// // // // //                         />
// // // // //                       )}
// // // // //                     </Box>

// // // // //                     <Box sx={{ pl: 6 }}>
// // // // //                       <Box sx={{ mb: 2 }}>
// // // // //                         <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // // //                           <LocationOnIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
// // // // //                           {inquiry.location}
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // // //                           <EmailIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
// // // // //                           {inquiry.email}
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // // //                           <PhoneIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
// // // // //                           {inquiry.phone_number}
// // // // //                         </Typography>
// // // // //                       </Box>

// // // // //                       <Box sx={{ mb: 2 }}>
// // // // //                         <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // // //                           <CategoryIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
// // // // //                           <strong>Category:</strong> {inquiry.category}
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // // //                           <BuildIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
// // // // //                           <strong>Sub-Service:</strong> {inquiry.sub_service}
// // // // //                         </Typography>
// // // // //                       </Box>

// // // // //                       {renderDetails(inquiry)}

// // // // //                       <Box sx={{ 
// // // // //                         display: 'flex', 
// // // // //                         justifyContent: 'space-between',
// // // // //                         alignItems: 'center',
// // // // //                         mt: 3,
// // // // //                         pt: 2,
// // // // //                         borderTop: `1px solid ${theme.palette.divider}`
// // // // //                       }}>
// // // // //                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // // // //                           <Typography variant="body2" sx={{ mr: 1 }}>
// // // // //                             <strong>Status:</strong>
// // // // //                           </Typography>
// // // // //                           {inquiry.category === 'Building Construction Services' ? (
// // // // //                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // // // //                               <FormControl sx={{ minWidth: 200 }}>
// // // // //                                 <InputLabel>Status</InputLabel>
// // // // //                                 <Select
// // // // //                                   value={inquiryStatus[inquiry.id] || inquiry.status}
// // // // //                                   onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
// // // // //                                   label="Status"
// // // // //                                 >
// // // // //                                   <MenuItem value="Pending">Pending</MenuItem>
// // // // //                                   <MenuItem value="Scheduled">Scheduled</MenuItem>
// // // // //                                   <MenuItem value="Completed">Completed</MenuItem>
// // // // //                                   <MenuItem value="No-Show">No-Show</MenuItem>
// // // // //                                   <MenuItem value="Permit Processing">Permit Processing</MenuItem>
// // // // //                                   <MenuItem value="Under Construction">Under Construction</MenuItem>
// // // // //                                   <MenuItem value="Awaiting Inspection">Awaiting Inspection</MenuItem>
// // // // //                                   <MenuItem value="Finishing">Finishing</MenuItem>
// // // // //                                   <MenuItem value="Handover Pending">Handover Pending</MenuItem>
// // // // //                                 </Select>
// // // // //                               </FormControl>
// // // // //                               <Button
// // // // //                                 variant="contained"
// // // // //                                 color="info"
// // // // //                                 size="small"
// // // // //                                 onClick={() => updateInquiryStatus(inquiry.id, 'Scheduled')}
// // // // //                               >
// // // // //                                 Reschedule
// // // // //                               </Button>
// // // // //                             </Box>
// // // // //                           ) : (
// // // // //                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // // // //                               <Chip
// // // // //                                 label={inquiry.status}
// // // // //                                 color={getStatusColor(inquiry.status)}
// // // // //                                 size="small"
// // // // //                                 sx={{ fontWeight: 'bold' }}
// // // // //                               />
// // // // //                               {inquiry.status === 'Pending' && (
// // // // //                                 <Button
// // // // //                                   variant="contained"
// // // // //                                   color="info"
// // // // //                                   size="small"
// // // // //                                   onClick={() => updateInquiryStatus(inquiry.id, 'Scheduled')}
// // // // //                                 >
// // // // //                                   Reschedule
// // // // //                                 </Button>
// // // // //                               )}
// // // // //                               {inquiry.status === 'Scheduled' && (
// // // // //                                 <>
// // // // //                                   <Button
// // // // //                                     variant="contained"
// // // // //                                     color="warning"
// // // // //                                     size="small"
// // // // //                                     onClick={() => updateInquiryStatus(inquiry.id, 'Pending')}
// // // // //                                   >
// // // // //                                     Mark as Pending
// // // // //                                   </Button>
// // // // //                                   <Button
// // // // //                                     variant="contained"
// // // // //                                     color="success"
// // // // //                                     size="small"
// // // // //                                     onClick={() => updateInquiryStatus(inquiry.id, 'Completed')}
// // // // //                                   >
// // // // //                                     Mark as Completed
// // // // //                                   </Button>
// // // // //                                 </>
// // // // //                               )}
// // // // //                             </Box>
// // // // //                           )}
// // // // //                         </Box>
// // // // //                         <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
// // // // //                           Submitted: {formatDate(inquiry.created_at)}
// // // // //                         </Typography>
// // // // //                       </Box>
// // // // //                     </Box>
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //               );
// // // // //             })}
// // // // //           </List>
// // // // //         )}
// // // // //       </Paper>

// // // // //       <Dialog open={openEmailDialog} onClose={handleCloseEmailDialog} maxWidth="sm" fullWidth>
// // // // //         <DialogTitle>Send Email to {selectedInquiry?.full_name}</DialogTitle>
// // // // //         <DialogContent>
// // // // //           <TextField
// // // // //             label="Email Body"
// // // // //             multiline
// // // // //             rows={8}
// // // // //             value={emailBody}
// // // // //             onChange={(e) => setEmailBody(e.target.value)}
// // // // //             fullWidth
// // // // //             sx={{ mt: 2 }}
// // // // //           />
// // // // //         </DialogContent>
// // // // //         <DialogActions>
// // // // //           <Button onClick={handleCloseEmailDialog} color="secondary">
// // // // //             Cancel
// // // // //           </Button>
// // // // //           <Button onClick={sendTrainingEmail} color="primary" variant="contained">
// // // // //             Send
// // // // //           </Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>
// // // // //     </Box>
// // // // //   );
// // // // // };

// // // // // export default InquiriesList;

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Paper,
// //   Typography,
// //   List,
// //   CircularProgress,
// //   Card,
// //   CardContent,
// //   Chip,
// //   Avatar,
// //   Link,
// //   useTheme,
// //   Button,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Alert,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   TextField,
// //   Input,
// //   Collapse,
// //   IconButton,
// //   Slider,
// //   Divider,
// // } from '@mui/material';
// // import {
// //   Person as PersonIcon,
// //   LocationOn as LocationOnIcon,
// //   Email as EmailIcon,
// //   Phone as PhoneIcon,
// //   Category as CategoryIcon,
// //   Build as BuildIcon,
// //   Visibility as VisibilityIcon,
// //   GetApp as DownloadIcon,
// //   ExpandMore as ExpandMoreIcon,
// //   ExpandLess as ExpandLessIcon,
// //   Clear as ClearIcon,
// // } from '@mui/icons-material';
// // import axios from 'axios';

// // const InquiriesList = ({ inquiries: initialInquiries, lastInquiryCheck, clickable }) => {
// //   const theme = useTheme();
// //   const [inquiries, setInquiries] = useState(initialInquiries || []);
// //   const [filteredInquiries, setFilteredInquiries] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState('All');
// //   const [selectedStatus, setSelectedStatus] = useState('All');
// //   const [progressRange, setProgressRange] = useState([0, 100]);
// //   const [showIncompleteCertificates, setShowIncompleteCertificates] = useState(false);
// //   const [loading, setLoading] = useState(!initialInquiries);
// //   const [error, setError] = useState('');
// //   const [emailStatus, setEmailStatus] = useState(null);
// //   const [openEmailDialog, setOpenEmailDialog] = useState(false);
// //   const [selectedInquiry, setSelectedInquiry] = useState(null);
// //   const [emailBody, setEmailBody] = useState('');
// //   const [certificateFile, setCertificateFile] = useState(null);
// //   const [commentText, setCommentText] = useState('');
// //   const [commentStatus, setCommentStatus] = useState(null);
// //   const [progressPhotos, setProgressPhotos] = useState(null);
// //   const [inspectionReports, setInspectionReports] = useState(null);
// //   const [completionCertificate, setCompletionCertificate] = useState(null);
// //   const [inquiry, set_Inquiries] = useState(clickable);
// //   const [replyText, setReplyText] = useState('');
// //   const [replyStatus, setReplyStatus] = useState(null);
// //   const [replyingToCommentId, setReplyingToCommentId] = useState(null);
// //   const [constructionPhase, setConstructionPhase] = useState({});
// //   const [progressPercentage, setProgressPercentage] = useState({});
// //   const [permitStatus, setPermitStatus] = useState({});
// //   const [updateStatus, setUpdateStatus] = useState(null);
// //   const [inquiryStatus, setInquiryStatus] = useState({});
// //   const [expandedInquiry, setExpandedInquiry] = useState(null);

// //   const backendBaseUrl = 'http://127.0.0.1:8000';

// //   // Auto-dismiss alerts after 2 seconds
// //   useEffect(() => {
// //     if (emailStatus) {
// //       const timer = setTimeout(() => setEmailStatus(null), 2000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [emailStatus]);

// //   useEffect(() => {
// //     if (commentStatus) {
// //       const timer = setTimeout(() => setCommentStatus(null), 2000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [commentStatus]);

// //   useEffect(() => {
// //     if (replyStatus) {
// //       const timer = setTimeout(() => setReplyStatus(null), 2000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [replyStatus]);

// //   useEffect(() => {
// //     if (updateStatus) {
// //       const timer = setTimeout(() => setUpdateStatus(null), 2000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [updateStatus]);

// //   const fetchInquiries = async () => {
// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem('access_token');
// //       const response = await axios.get(`${backendBaseUrl}/api/company-inquiries/`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       const sorted = response.data.sort((a, b) => 
// //         new Date(b.created_at) - new Date(a.created_at)
// //       );
// //       setInquiries(sorted);
// //       applyFilters(sorted);
// //       const phaseInit = {};
// //       const percentageInit = {};
// //       const permitInit = {};
// //       const statusInit = {};
// //       sorted.forEach((inquiry) => {
// //         const serviceData = inquiry.service_data || {};
// //         phaseInit[inquiry.id] = serviceData.construction_phase || '';
// //         percentageInit[inquiry.id] = serviceData.progress_percentage || 0;
// //         permitInit[inquiry.id] = serviceData.permit_status || '';
// //         statusInit[inquiry.id] = inquiry.status || 'Pending';
// //       });
// //       setConstructionPhase(phaseInit);
// //       setProgressPercentage(percentageInit);
// //       setPermitStatus(permitInit);
// //       setInquiryStatus(statusInit);
// //     } catch (err) {
// //       setError(err.response?.data?.error || 'Failed to load inquiries');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchInquiries();
// //   }, [inquiry]);

// //   const applyFilters = (data = inquiries) => {
// //     let filtered = [...data];

// //     // Filter by category
// //     if (selectedCategory !== 'All') {
// //       filtered = filtered.filter((inquiry) => inquiry.category === selectedCategory);
// //     }

// //     // Filter by status
// //     if (selectedStatus !== 'All') {
// //       filtered = filtered.filter((inquiry) => inquiry.status === selectedStatus);
// //     }

// //     // Filter by progress percentage (only for Building Construction Services)
// //     filtered = filtered.filter((inquiry) => {
// //       if (inquiry.category === 'Building Construction Services') {
// //         const progress = inquiry.service_data?.progress_percentage || 0;
// //         return progress >= progressRange[0] && progress <= progressRange[1];
// //       }
// //       return true;
// //     });

// //     // Filter for completed inquiries without certificates (only for Safety and Training Services)
// //     if (showIncompleteCertificates) {
// //       filtered = filtered.filter((inquiry) => 
// //         inquiry.category === 'Safety and Training Services' &&
// //         inquiry.status === 'Completed' &&
// //         !inquiry.certificate
// //       );
// //     }

// //     // Sort: Active services first, then completed
// //     filtered.sort((a, b) => {
// //       const aIsCompleted = a.status === 'Completed';
// //       const bIsCompleted = b.status === 'Completed';
// //       if (aIsCompleted && !bIsCompleted) return 1;
// //       if (!aIsCompleted && bIsCompleted) return -1;
// //       return new Date(b.created_at) - new Date(a.created_at);
// //     });

// //     setFilteredInquiries(filtered);
// //   };

// //   useEffect(() => {
// //     applyFilters();
// //   }, [selectedCategory, selectedStatus, progressRange, showIncompleteCertificates, inquiries]);

// //   const handleCategoryChange = (event) => {
// //     setSelectedCategory(event.target.value);
// //   };

// //   const handleFilterStatusChange = (event) => {
// //     setSelectedStatus(event.target.value);
// //   };

// //   const handleProgressRangeChange = (event, newValue) => {
// //     setProgressRange(newValue);
// //   };

// //   const handleCertificateFilterChange = (event) => {
// //     setShowIncompleteCertificates(event.target.checked);
// //   };

// //   const resetFilters = () => {
// //     setSelectedCategory('All');
// //     setSelectedStatus('All');
// //     setProgressRange([0, 100]);
// //     setShowIncompleteCertificates(false);
// //   };

// //   const categories = ['All', ...new Set(inquiries.map((inquiry) => inquiry.category))];
// //   const statuses = ['All', ...new Set(inquiries.map((inquiry) => inquiry.status))];

// //   const updateInquiryStatus = async (inquiryId, newStatus) => {
// //     try {
// //       const token = localStorage.getItem('access_token');
// //       await axios.patch(
// //         `${backendBaseUrl}/api/update-inquiry-status/${inquiryId}/`,
// //         { status: newStatus },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       fetchInquiries();
// //     } catch (err) {
// //       setError(err.response?.data?.error || 'Failed to update status');
// //     }
// //   };

// //   const handleOpenEmailDialog = (inquiry) => {
// //     const serviceData = inquiry.service_data || {};
// //     const defaultEmailBody = `Dear ${inquiry.full_name},

// // We are pleased to confirm your training session for Workplace Safety Training Modules.

// // Training Details:
// // - Date: ${serviceData.training_date || 'N/A'}
// // - Time: ${serviceData.training_time || 'N/A'}
// // - Location: ${serviceData.training_location || inquiry.location || 'N/A'}

// // Please arrive 15 minutes early. Let us know if you have any questions.

// // Best regards,
// // [Your Company Name]`;

// //     setSelectedInquiry(inquiry);
// //     setEmailBody(defaultEmailBody);
// //     setOpenEmailDialog(true);
// //   };

// //   const handleCloseEmailDialog = () => {
// //     setOpenEmailDialog(false);
// //     setSelectedInquiry(null);
// //     setEmailBody('');
// //   };

// //   const sendTrainingEmail = async () => {
// //     if (!emailBody) {
// //       setEmailStatus({ type: 'error', message: 'Please enter an email body' });
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem('access_token');
// //       const emailData = {
// //         to_email: selectedInquiry.email,
// //         full_name: selectedInquiry.full_name,
// //         email_body: emailBody,
// //         inquiry_id: selectedInquiry.id
// //       };

// //       await axios.post(
// //         `${backendBaseUrl}/api/send-training-email/`,
// //         emailData,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       setEmailStatus({ type: 'success', message: 'Email sent successfully!' });
// //       handleCloseEmailDialog();
// //       fetchInquiries();
// //     } catch (err) {
// //       setEmailStatus({
// //         type: 'error',
// //         message: err.response?.data?.error || 'Failed to send email',
// //       });
// //     }
// //   };

// //   const handleCertificateUpload = async (inquiryId) => {
// //     if (!certificateFile) {
// //       setEmailStatus({ type: 'error', message: 'Please select a certificate file to upload' });
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem('access_token');
// //       const formData = new FormData();
// //       formData.append('certificate', certificateFile);

// //       await axios.post(
// //         `${backendBaseUrl}/api/upload-certificate/${inquiryId}/`,
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'multipart/form-data',
// //           },
// //         }
// //       );

// //       setEmailStatus({ type: 'success', message: 'Certificate uploaded successfully!' });
// //       setCertificateFile(null);
// //       fetchInquiries();
// //     } catch (err) {
// //       setEmailStatus({
// //         type: 'error',
// //         message: err.response?.data?.error || 'Failed to upload certificate',
// //       });
// //     }
// //   };

// //   const handleProgressPhotosUpload = async (inquiryId) => {
// //     if (!progressPhotos) {
// //       setEmailStatus({ type: 'error', message: 'Please select progress photos to upload' });
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem('access_token');
// //       const formData = new FormData();
// //       for (let i = 0; i < progressPhotos.length; i++) {
// //         formData.append('photos', progressPhotos[i]);
// //       }

// //       await axios.post(
// //         `${backendBaseUrl}/api/upload-progress-photos/${inquiryId}/`,
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'multipart/form-data',
// //           },
// //         }
// //       );

// //       setEmailStatus({ type: 'success', message: 'Progress photos uploaded successfully!' });
// //       setProgressPhotos(null);
// //       fetchInquiries();
// //     } catch (err) {
// //       setEmailStatus({
// //         type: 'error',
// //         message: err.response?.data?.error || 'Failed to upload progress photos',
// //       });
// //     }
// //   };

// //   const handleInspectionReportsUpload = async (inquiryId) => {
// //     if (!inspectionReports) {
// //       setEmailStatus({ type: 'error', message: 'Please select inspection reports to upload' });
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem('access_token');
// //       const formData = new FormData();
// //       for (let i = 0; i < inspectionReports.length; i++) {
// //         formData.append('reports', inspectionReports[i]);
// //       }

// //       await axios.post(
// //         `${backendBaseUrl}/api/upload-inspection-reports/${inquiryId}/`,
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'multipart/form-data',
// //           },
// //         }
// //       );

// //       setEmailStatus({ type: 'success', message: 'Inspection reports uploaded successfully!' });
// //       setInspectionReports(null);
// //       fetchInquiries();
// //     } catch (err) {
// //       setEmailStatus({
// //         type: 'error',
// //         message: err.response?.data?.error || 'Failed to upload inspection reports',
// //       });
// //     }
// //   };

// //   const handleCompletionCertificateUpload = async (inquiryId) => {
// //     if (!completionCertificate) {
// //       setEmailStatus({ type: 'error', message: 'Please select a completion certificate to upload' });
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem('access_token');
// //       const formData = new FormData();
// //       formData.append('completion_certificate', completionCertificate);

// //       await axios.post(
// //         `${backendBaseUrl}/api/upload-completion-certificate/${inquiryId}/`,
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'multipart/form-data',
// //           },
// //         }
// //       );

// //       setEmailStatus({ type: 'success', message: 'Completion certificate uploaded successfully!' });
// //       setCompletionCertificate(null);
// //       fetchInquiries();
// //     } catch (err) {
// //       setEmailStatus({
// //         type: 'error',
// //         message: err.response?.data?.error || 'Failed to upload completion certificate',
// //       });
// //     }
// //   };

// //   const handleAddComment = async (inquiryId) => {
// //     if (!commentText) {
// //       setCommentStatus({ type: 'error', message: 'Please enter a comment' });
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem('access_token');
// //       await axios.post(
// //         `${backendBaseUrl}/api/add-comment/${inquiryId}/`,
// //         { comment_text: commentText, company_response: '' },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       setCommentStatus({ type: 'success', message: 'Comment added successfully!' });
// //       setCommentText('');
// //       fetchInquiries();
// //     } catch (err) {
// //       setCommentStatus({
// //         type: 'error',
// //         message: err.response?.data?.error || 'Failed to add comment',
// //       });
// //     }
// //   };

// //   const handleAddReply = async (commentId) => {
// //     if (!replyText) {
// //       setReplyStatus({ type: 'error', message: 'Please enter a reply' });
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem('access_token');
// //       await axios.patch(
// //         `${backendBaseUrl}/api/update-comment-response/${commentId}/`,
// //         { company_response: replyText },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       setReplyStatus({ type: 'success', message: 'Reply added successfully!' });
// //       setReplyText('');
// //       setReplyingToCommentId(null);
// //       fetchInquiries();
// //     } catch (err) {
// //       setReplyStatus({
// //         type: 'error',
// //         message: err.response?.data?.error || 'Failed to add reply',
// //       });
// //     }
// //   };

// //   const handleUpdateProgress = async (inquiryId) => {
// //     if (!constructionPhase[inquiryId] || !progressPercentage[inquiryId] || !permitStatus[inquiryId]) {
// //       setUpdateStatus({ type: 'error', message: 'Please fill all fields' });
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem('access_token');
// //       const data = {
// //         construction_phase: constructionPhase[inquiryId],
// //         progress_percentage: parseInt(progressPercentage[inquiryId]),
// //         permit_status: permitStatus[inquiryId],
// //       };
// //       await axios.patch(
// //         `${backendBaseUrl}/api/update-construction-progress/${inquiryId}/`,
// //         data,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       setUpdateStatus({ type: 'success', message: 'Progress updated successfully!' });
// //       fetchInquiries();
// //     } catch (err) {
// //       setUpdateStatus({
// //         type: 'error',
// //         message: err.response?.data?.error || 'Failed to update progress',
// //       });
// //     }
// //   };

// //   const handleStatusChange = (inquiryId, newStatus) => {
// //     setInquiryStatus((prev) => ({ ...prev, [inquiryId]: newStatus }));
// //     updateInquiryStatus(inquiryId, newStatus);
// //   };

// //   const handleToggleDetails = (inquiryId) => {
// //     setExpandedInquiry(expandedInquiry === inquiryId ? null : inquiryId);
// //   };

// //   const renderBuildingInfo = (inquiry) => {
// //     const serviceData = inquiry.service_data || {};
// //     let fields = [];
// //     if (inquiry.sub_service === 'Residential Construction') {
// //       fields = [
// //         ['Type of Building', serviceData.type_of_building],
// //         ['Building Purpose', serviceData.building_purpose],
// //         ['Number of Floors', serviceData.num_floors],
// //         ['Land Area', serviceData.land_area],
// //         ['Architectural Style', serviceData.architectural_style],
// //         ['Budget Estimate', serviceData.budget_estimate],
// //         ['Special Requirements', serviceData.special_requirements],
// //       ];
// //     } else if (inquiry.sub_service === 'Commercial Construction') {
// //       fields = [
// //         ['Type of Building', serviceData.type_of_building],
// //         ['Building Details', serviceData.building_details],
// //         ['Estimated Area', serviceData.estimated_area],
// //         ['Budget Estimate', serviceData.budget_estimate],
// //         ['Special Requirements', serviceData.special_requirements],
// //       ];
// //     } else if (inquiry.sub_service === 'Renovation and Remodeling Services') {
// //       fields = [
// //         ['Type of Building', serviceData.type_of_building],
// //         ['Building Details', serviceData.building_details],
// //         ['Estimated Area', serviceData.estimated_area],
// //         ['Budget Estimate', serviceData.budget_estimate],
// //         ['Special Requirements', serviceData.special_requirements],
// //       ];
// //     } else if (inquiry.sub_service === 'Comprehensive Building Planning & Design') {
// //       fields = [
// //         ['Type of Building', serviceData.type_of_building],
// //         ['Building Purpose', serviceData.building_purpose],
// //         ['Number of Floors', serviceData.num_floors],
// //         ['Estimated Land Area', serviceData.land_area],
// //         ['Preferred Architectural Style', serviceData.architectural_style],
// //         ['Architectural Style (Other)', serviceData.architectural_style_other],
// //         ['Budget Estimate', serviceData.budget_estimate],
// //         ['Special Requirements', serviceData.special_requirements],
// //       ];
// //     }

// //     return (
// //       <Box sx={{ mt: 2 }}>
// //         <Typography variant="h6" sx={{ 
// //           color: theme.palette.primary.main,
// //           fontWeight: 'bold',
// //           mb: 2
// //         }}>
// //           {inquiry.sub_service} Information
// //         </Typography>
// //         <Box sx={{ 
// //           display: 'grid',
// //           gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
// //           gap: 2,
// //           pl: 2,
// //           bgcolor: theme.palette.grey[50],
// //           p: 2,
// //           borderRadius: 2
// //         }}>
// //           {fields.map(([label, value], index) => (
// //             value && (
// //               <Box key={index} sx={{ display: 'flex', gap: 1 }}>
// //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
// //                   {label}:
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
// //                   {value}
// //                 </Typography>
// //               </Box>
// //             )
// //           ))}
// //         </Box>
// //         {inquiry.sub_service === 'Comprehensive Building Planning & Design' && (
// //           <>
// //             {/* Comments Section for Engineering Consulting */}
// //             <Box sx={{ mt: 3, borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
// //               <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
// //                 Comments
// //               </Typography>
// //               {inquiry.comments && inquiry.comments.length > 0 ? (
// //                 <Box sx={{ pl: 2, mb: 2 }}>
// //                   {inquiry.comments.map((comment) => (
// //                     <Box key={comment.id} sx={{ mb: 1, p: 1, bgcolor: theme.palette.grey[100], borderRadius: 2 }}>
// //                       <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.primary }}>
// //                         "{comment.comment_text}"
// //                       </Typography>
// //                       {comment.company_response ? (
// //                         <Typography variant="body2" sx={{ pl: 2, color: theme.palette.text.secondary, mt: 0.5 }}>
// //                           Response: {comment.company_response}
// //                         </Typography>
// //                       ) : (
// //                         <Box sx={{ display: 'flex', gap: 2, pl: 2, mt: 1 }}>
// //                           <TextField
// //                             label="Add Reply"
// //                             multiline
// //                             rows={2}
// //                             value={replyingToCommentId === comment.id ? replyText : ''}
// //                             onChange={(e) => {
// //                               setReplyingToCommentId(comment.id);
// //                               setReplyText(e.target.value);
// //                             }}
// //                             fullWidth
// //                             sx={{ maxWidth: 400, bgcolor: 'white' }}
// //                             variant="outlined"
// //                           />
// //                           <Button
// //                             variant="contained"
// //                             color="primary"
// //                             size="small"
// //                             onClick={() => handleAddReply(comment.id)}
// //                             disabled={replyingToCommentId !== comment.id || !replyText}
// //                             sx={{ borderRadius: 2, textTransform: 'none' }}
// //                           >
// //                             Submit Reply
// //                           </Button>
// //                         </Box>
// //                       )}
// //                       <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
// //                         Added on {formatDate(comment.created_at)}
// //                       </Typography>
// //                       {replyStatus && replyingToCommentId === comment.id && (
// //                         <Alert severity={replyStatus.type} sx={{ mt: 1, pl: 2 }}>
// //                           {replyStatus.message}
// //                         </Alert>
// //                       )}
// //                     </Box>
// //                   ))}
// //                 </Box>
// //               ) : (
// //                 <Typography variant="body2" sx={{ pl: 2, mb: 2, color: theme.palette.text.secondary }}>
// //                   No comments yet.
// //                 </Typography>
// //               )}
// //               <Box sx={{ display: 'flex', gap: 2, pl: 2, alignItems: 'flex-start' }}>
// //                 <TextField
// //                   label="Add Comment"
// //                   multiline
// //                   rows={3}
// //                   value={commentText}
// //                   onChange={(e) => setCommentText(e.target.value)}
// //                   fullWidth
// //                   sx={{ maxWidth: 500, bgcolor: 'white' }}
// //                   variant="outlined"
// //                 />
// //                 <Button
// //                   variant="contained"
// //                   color="primary"
// //                   onClick={() => handleAddComment(inquiry.id)}
// //                   disabled={!commentText}
// //                   sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
// //                 >
// //                   Submit Comment
// //                 </Button>
// //               </Box>
// //               {commentStatus && (
// //                 <Alert severity={commentStatus.type} sx={{ mt: 2, pl: 2 }}>
// //                   {commentStatus.message}
// //                 </Alert>
// //               )}
// //             </Box>
// //           </>
// //         )}
// //       </Box>
// //     );
// //   };

// //   const renderConstructionInfo = (inquiry) => {
// //     const serviceData = inquiry.service_data || {};

// //     return (
// //       <Box sx={{ mt: 3, borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
// //         <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
// //           Construction Progress
// //         </Typography>
// //         <Box sx={{ pl: 2, bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
// //           {/* Status Update Controls */}
// //           <Box sx={{ mb: 3 }}>
// //             <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
// //               Update Construction Progress
// //             </Typography>
// //             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
// //               <FormControl sx={{ minWidth: 200 }}>
// //                 <InputLabel>Construction Phase</InputLabel>
// //                 <Select
// //                   value={constructionPhase[inquiry.id] || ''}
// //                   onChange={(e) =>
// //                     setConstructionPhase({ ...constructionPhase, [inquiry.id]: e.target.value })
// //                   }
// //                   label="Construction Phase"
// //                   sx={{ bgcolor: 'white', borderRadius: 2 }}
// //                 >
// //                   <MenuItem value=""><em>Select Phase</em></MenuItem>
// //                   <MenuItem value="Foundation">Foundation</MenuItem>
// //                   <MenuItem value="Walls">Walls</MenuItem>
// //                   <MenuItem value="Excavation">Excavation</MenuItem>
// //                   <MenuItem value="Columns Casting">Columns Casting</MenuItem>
// //                   <MenuItem value="Beams Casting">Beams Casting</MenuItem>
// //                   <MenuItem value="Slab Casting">Slab Casting</MenuItem>
// //                   <MenuItem value="Roofing">Roofing</MenuItem>
// //                   <MenuItem value="Electrical & Plumbing">Electrical & Plumbing</MenuItem>
// //                   <MenuItem value="Plastering">Plastering</MenuItem>
// //                   <MenuItem value="Finishing">Finishing</MenuItem>
// //                 </Select>
// //               </FormControl>
// //               <TextField
// //                 label="Progress Percentage"
// //                 type="number"
// //                 value={progressPercentage[inquiry.id] || ''}
// //                 onChange={(e) =>
// //                   setProgressPercentage({ ...progressPercentage, [inquiry.id]: e.target.value })
// //                 }
// //                 inputProps={{ min: 0, max: 100 }}
// //                 sx={{ maxWidth: 150, bgcolor: 'white', borderRadius: 2 }}
// //                 variant="outlined"
// //               />
// //               <FormControl sx={{ minWidth: 200 }}>
// //                 <InputLabel>Permit Status</InputLabel>
// //                 <Select
// //                   value={permitStatus[inquiry.id] || ''}
// //                   onChange={(e) =>
// //                     setPermitStatus({ ...permitStatus, [inquiry.id]: e.target.value })
// //                   }
// //                   label="Permit Status"
// //                   sx={{ bgcolor: 'white', borderRadius: 2 }}
// //                 >
// //                   <MenuItem value=""><em>Select Status</em></MenuItem>
// //                   <MenuItem value="Submitted">Submitted</MenuItem>
// //                   <MenuItem value="Under Review">Under Review</MenuItem>
// //                   <MenuItem value="Approved">Approved</MenuItem>
// //                   <MenuItem value="Rejected">Rejected</MenuItem>
// //                 </Select>
// //               </FormControl>
// //               <Button
// //                 variant="contained"
// //                 color="primary"
// //                 onClick={() => handleUpdateProgress(inquiry.id)}
// //                 disabled={
// //                   !constructionPhase[inquiry.id] ||
// //                   !progressPercentage[inquiry.id] ||
// //                   !permitStatus[inquiry.id]
// //                 }
// //                 sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
// //               >
// //                 Update Progress
// //               </Button>
// //             </Box>
// //             {updateStatus && (
// //               <Alert severity={updateStatus.type} sx={{ mb: 2 }}>
// //                 {updateStatus.message}
// //               </Alert>
// //             )}
// //           </Box>
// //           {/* Common Documents for Building Construction Services */}
// //           <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
// //             Common Documents
// //           </Typography>
// //           {Object.entries({
// //             'Lalpurja': serviceData.lalpurja,
// //             'Napi Naksa': serviceData.napi_naksa,
// //             'Tax Clearance': serviceData.tax_clearance,
// //             'Approved Building Drawings': serviceData.approved_building_drawings,
// //           }).map(([key, value]) => (
// //             value && (
// //               <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
// //                   {key.toUpperCase()}:
// //                 </Typography>
// //                 <Box sx={{ display: 'flex', gap: 1 }}>
// //                   <Link href={`${backendBaseUrl}${value}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// //                   </Link>
// //                   <Link href={`${backendBaseUrl}${value}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// //                   </Link>
// //                 </Box>
// //               </Box>
// //             )
// //           ))}
// //           {/* Sub-Service Specific Documents */}
// //           <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2, mt: 2 }}>
// //             Uploaded Documents
// //           </Typography>
// //           {inquiry.sub_service === 'Residential Construction' && Object.entries({
// //             'Soil Test Report': serviceData.soil_test_report,
// //             'Structural Stability Certificate': serviceData.structural_stability_certificate,
// //             'House Design Approval': serviceData.house_design_approval,
// //             'Neighbour Consent': serviceData.neighbour_consent,
// //           }).map(([key, value]) => (
// //             value && (
// //               <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
// //                   {key.toUpperCase()}:
// //                 </Typography>
// //                 <Box sx={{ display: 'flex', gap: 1 }}>
// //                   <Link href={`${backendBaseUrl}${value}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// //                   </Link>
// //                   <Link href={`${backendBaseUrl}${value}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// //                   </Link>
// //                 </Box>
// //               </Box>
// //             )
// //           ))}
// //           {inquiry.sub_service === 'Commercial Construction' && Object.entries({
// //             'IEE Report': serviceData.iee_report,
// //             'Fire Safety Certificate': serviceData.fire_safety_certificate,
// //             'Lift Permit': serviceData.lift_permit,
// //             'Parking Layout Plan': serviceData.parking_layout_plan,
// //           }).map(([key, value]) => (
// //             value && (
// //               <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
// //                   {key.toUpperCase()}:
// //                 </Typography>
// //                 <Box sx={{ display: 'flex', gap: 1 }}>
// //                   <Link href={`${backendBaseUrl}${value}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// //                   </Link>
// //                   <Link href={`${backendBaseUrl}${value}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// //                   </Link>
// //                 </Box>
// //               </Box>
// //             )
// //           ))}
// //           {inquiry.sub_service === 'Renovation and Remodeling Services' && Object.entries({
// //             'Owner Permission Letter': serviceData.owner_permission_letter,
// //             'Existing Structure Analysis': serviceData.existing_structure_analysis,
// //             'Renovation Plan': serviceData.renovation_plan,
// //             'NOC Municipality': serviceData.noc_municipality,
// //             'Waste Management Plan': serviceData.waste_management_plan,
// //           }).map(([key, value]) => (
// //             value && (
// //               <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
// //                   {key.toUpperCase()}:
// //                 </Typography>
// //                 <Box sx={{ display: 'flex', gap: 1 }}>
// //                   <Link href={`${backendBaseUrl}${value}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// //                   </Link>
// //                   <Link href={`${backendBaseUrl}${value}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// //                   </Link>
// //                 </Box>
// //               </Box>
// //             )
// //           ))}
// //           {/* Progress Photos Upload and List */}
// //           <Box sx={{ mb: 2, mt: 2 }}>
// //             <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
// //               Progress Photos:
// //             </Typography>
// //             {serviceData.progress_photos && serviceData.progress_photos.length > 0 && (
// //               <Box sx={{ mb: 1, pl: 2 }}>
// //                 {serviceData.progress_photos.map((photo, index) => (
// //                   <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
// //                     <Typography variant="body2" sx={{ minWidth: '160px', color: theme.palette.text.primary }}>
// //                       Progress Photo {index + 1}:
// //                     </Typography>
// //                     <Box sx={{ display: 'flex', gap: 1 }}>
// //                       <Link href={`${backendBaseUrl}${photo}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                         <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// //                       </Link>
// //                       <Link href={`${backendBaseUrl}${photo}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                         <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// //                       </Link>
// //                     </Box>
// //                   </Box>
// //                 ))}
// //               </Box>
// //             )}
// //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
// //               <Input
// //                 type="file"
// //                 multiple
// //                 onChange={(e) => setProgressPhotos(e.target.files)}
// //                 inputProps={{ accept: 'image/*,application/pdf' }}
// //                 sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
// //               />
// //               <Button
// //                 variant="contained"
// //                 color="primary"
// //                 size="small"
// //                 onClick={() => handleProgressPhotosUpload(inquiry.id)}
// //                 disabled={!progressPhotos}
// //                 sx={{ borderRadius: 2, textTransform: 'none' }}
// //               >
// //                 Upload Progress Photos
// //               </Button>
// //             </Box>
// //           </Box>
// //           {/* Inspection Reports Upload and List */}
// //           <Box sx={{ mb: 2 }}>
// //             <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
// //               Inspection Reports:
// //             </Typography>
// //             {serviceData.inspection_reports && serviceData.inspection_reports.length > 0 && (
// //               <Box sx={{ mb: 1, pl: 2 }}>
// //                 {serviceData.inspection_reports.map((report, index) => (
// //                   <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
// //                     <Typography variant="body2" sx={{ minWidth: '160px', color: theme.palette.text.primary }}>
// //                       Inspection Report {index + 1}:
// //                     </Typography>
// //                     <Box sx={{ display: 'flex', gap: 1 }}>
// //                       <Link href={`${backendBaseUrl}${report}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                         <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// //                       </Link>
// //                       <Link href={`${backendBaseUrl}${report}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                         <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// //                       </Link>
// //                     </Box>
// //                   </Box>
// //                 ))}
// //               </Box>
// //             )}
// //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
// //               <Input
// //                 type="file"
// //                 multiple
// //                 onChange={(e) => setInspectionReports(e.target.files)}
// //                 inputProps={{ accept: 'application/pdf,image/*' }}
// //                 sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
// //               />
// //               <Button
// //                 variant="contained"
// //                 color="primary"
// //                 size="small"
// //                 onClick={() => handleInspectionReportsUpload(inquiry.id)}
// //                 disabled={!inspectionReports}
// //                 sx={{ borderRadius: 2, textTransform: 'none' }}
// //               >
// //                 Upload Inspection Reports
// //               </Button>
// //             </Box>
// //           </Box>
// //           {/* Completion Certificate Upload and List - Only shown when status is Completed */}
// //           {inquiry.status === 'Completed' && (
// //             <Box sx={{ mb: 2 }}>
// //               <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
// //                 Completion Certificate:
// //               </Typography>
// //               {serviceData.completion_certificate ? (
// //                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
// //                   <Typography variant="body2" sx={{ minWidth: '160px', color: theme.palette.text.primary }}>
// //                     Completion Certificate:
// //                   </Typography>
// //                   <Box sx={{ display: 'flex', gap: 1 }}>
// //                     <Link href={`${backendBaseUrl}${serviceData.completion_certificate}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                       <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// //                     </Link>
// //                     <Link href={`${backendBaseUrl}${serviceData.completion_certificate}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                       <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// //                     </Link>
// //                   </Box>
// //                 </Box>
// //               ) : (
// //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
// //                   <Input
// //                     type="file"
// //                     onChange={(e) => setCompletionCertificate(e.target.files[0])}
// //                     inputProps={{ accept: 'application/pdf,image/*' }}
// //                     sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
// //                   />
// //                   <Button
// //                     variant="contained"
// //                     color="primary"
// //                     size="small"
// //                     onClick={() => handleCompletionCertificateUpload(inquiry.id)}
// //                     disabled={!completionCertificate}
// //                     sx={{ borderRadius: 2, textTransform: 'none' }}
// //                   >
// //                     Upload Completion Certificate
// //                   </Button>
// //                 </Box>
// //               )}
// //             </Box>
// //           )}
// //           {/* Comments Section */}
// //           <Box sx={{ mt: 3, borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
// //             <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
// //               Comments
// //             </Typography>
// //             {inquiry.comments && inquiry.comments.length > 0 ? (
// //               <Box sx={{ pl: 2, mb: 2 }}>
// //                 {inquiry.comments.map((comment) => (
// //                   <Box key={comment.id} sx={{ mb: 1, p: 1, bgcolor: theme.palette.grey[100], borderRadius: 2 }}>
// //                     <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.primary }}>
// //                       "{comment.comment_text}"
// //                     </Typography>
// //                     {comment.company_response ? (
// //                       <Typography variant="body2" sx={{ pl: 2, color: theme.palette.text.secondary, mt: 0.5 }}>
// //                         Response: {comment.company_response}
// //                       </Typography>
// //                     ) : (
// //                       <Box sx={{ display: 'flex', gap: 2, pl: 2, mt: 1 }}>
// //                         <TextField
// //                           label="Add Reply"
// //                           multiline
// //                           rows={2}
// //                           value={replyingToCommentId === comment.id ? replyText : ''}
// //                           onChange={(e) => {
// //                             setReplyingToCommentId(comment.id);
// //                             setReplyText(e.target.value);
// //                           }}
// //                           fullWidth
// //                           sx={{ maxWidth: 400, bgcolor: 'white' }}
// //                           variant="outlined"
// //                         />
// //                         <Button
// //                           variant="contained"
// //                           color="primary"
// //                           size="small"
// //                           onClick={() => handleAddReply(comment.id)}
// //                           disabled={replyingToCommentId !== comment.id || !replyText}
// //                           sx={{ borderRadius: 2, textTransform: 'none' }}
// //                         >
// //                           Submit Reply
// //                         </Button>
// //                       </Box>
// //                     )}
// //                     <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
// //                       Added on {formatDate(comment.created_at)}
// //                     </Typography>
// //                     {replyStatus && replyingToCommentId === comment.id && (
// //                       <Alert severity={replyStatus.type} sx={{ mt: 1, pl: 2 }}>
// //                         {replyStatus.message}
// //                       </Alert>
// //                     )}
// //                   </Box>
// //                 ))}
// //               </Box>
// //             ) : (
// //               <Typography variant="body2" sx={{ pl: 2, mb: 2, color: theme.palette.text.secondary }}>
// //                 No comments yet.
// //               </Typography>
// //             )}
// //             <Box sx={{ display: 'flex', gap: 2, pl: 2, alignItems: 'flex-start' }}>
// //               <TextField
// //                 label="Add Comment"
// //                 multiline
// //                 rows={3}
// //                 value={commentText}
// //                 onChange={(e) => setCommentText(e.target.value)}
// //                 fullWidth
// //                 sx={{ maxWidth: 500, bgcolor: 'white' }}
// //                 variant="outlined"
// //               />
// //               <Button
// //                 variant="contained"
// //                 color="primary"
// //                 onClick={() => handleAddComment(inquiry.id)}
// //                 disabled={!commentText}
// //                 sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
// //               >
// //                 Submit Comment
// //               </Button>
// //             </Box>
// //             {commentStatus && (
// //               <Alert severity={commentStatus.type} sx={{ mt: 2, pl: 2 }}>
// //                 {commentStatus.message}
// //               </Alert>
// //             )}
// //           </Box>
// //         </Box>
// //       </Box>
// //     );
// //   };

// //   const renderDocuments = (inquiry) => {
// //     const serviceData = inquiry.service_data || {};
// //     return (
// //       <Box sx={{ mt: 2 }}>
// //         <Typography variant="h6" sx={{ 
// //           color: theme.palette.primary.main,
// //           fontWeight: 'bold',
// //           mb: 2
// //         }}>
// //           Uploaded Documents
// //         </Typography>
// //         <Box sx={{ bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
// //           {Object.entries({
// //             'Site Plan': serviceData.site_plan,
// //             'Architectural Plan': serviceData.architectural_plan,
// //             'Soil Test Report': serviceData.soil_test_report,
// //             'Foundation Design': serviceData.foundation_design,
// //             'Electrical Plan': serviceData.electrical_plan,
// //             'Plumbing Plan': serviceData.plumbing_plan,
// //             'HVAC Plan': serviceData.hvac_plan,
// //             'Construction Permit': serviceData.construction_permit,
// //             'Cost Estimation': serviceData.cost_estimation,
// //             'Maintenance Photos': serviceData.maintenance_photos,
// //           }).map(([key, value]) => (
// //             value && (
// //               <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
// //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
// //                   {key.replace(/_/g, ' ').toUpperCase()}:
// //                 </Typography>
// //                 <Box sx={{ display: 'flex', gap: 1 }}>
// //                   <Link 
// //                     href={`${backendBaseUrl}${value}`} 
// //                     target="_blank"
// //                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
// //                   >
// //                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// //                   </Link>
// //                   <Link 
// //                     href={`${backendBaseUrl}${value}`} 
// //                     download
// //                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
// //                   >
// //                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// //                   </Link>
// //                 </Box>
// //               </Box>
// //             )
// //           ))}
// //         </Box>
// //       </Box>
// //     );
// //   };

// //   const renderMaintenanceInfo = (inquiry) => {
// //     const serviceData = inquiry.service_data || {};
// //     return (
// //       <Box sx={{ mt: 2 }}>
// //         <Typography variant="h6" sx={{ 
// //           color: theme.palette.primary.main,
// //           fontWeight: 'bold',
// //           mb: 2
// //         }}>
// //           Maintenance Information
// //         </Typography>
// //         <Box sx={{ pl: 2, bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
// //           {[
// //             ['Maintenance Type', serviceData.maintenance_type],
// //             ['Maintenance Details', serviceData.maintenance_details],
// //             ['Preferred Date', serviceData.preferred_date],
// //             ['Preferred Time', serviceData.preferred_time],
// //             ['Payment Agreed', serviceData.payment_agreed ? 'Yes' : 'No'],
// //           ].map(([label, value], index) => (
// //             value && (
// //               <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
// //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
// //                   {label}:
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
// //                   {value}
// //                 </Typography>
// //               </Box>
// //             )
// //           ))}
// //           {serviceData.maintenance_photos && (
// //             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //               <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
// //                 Maintenance Photos:
// //               </Typography>
// //               <Box sx={{ display: 'flex', gap: 1 }}>
// //                 <Link 
// //                   href={`${backendBaseUrl}${serviceData.maintenance_photos}`} 
// //                   target="_blank"
// //                   sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
// //                 >
// //                   <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// //                 </Link>
// //                 <Link 
// //                   href={`${backendBaseUrl}${serviceData.maintenance_photos}`} 
// //                   download
// //                   sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
// //                 >
// //                   <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
// //                 </Link>
// //               </Box>
// //             </Box>
// //           )}
// //         </Box>
// //         <Box sx={{ mt: 3, borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
// //           <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
// //             Comments
// //           </Typography>
// //           {inquiry.comments && inquiry.comments.length > 0 ? (
// //             <Box sx={{ pl: 2, mb: 2 }}>
// //               {inquiry.comments.map((comment) => (
// //                 <Box key={comment.id} sx={{ mb: 1, p: 1, bgcolor: theme.palette.grey[100], borderRadius: 2 }}>
// //                   <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.primary }}>
// //                     "{comment.comment_text}"
// //                   </Typography>
// //                   <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
// //                     Added on {formatDate(comment.created_at)}
// //                   </Typography>
// //                 </Box>
// //               ))}
// //             </Box>
// //           ) : (
// //             <Typography variant="body2" sx={{ pl: 2, mb: 2, color: theme.palette.text.secondary }}>
// //               No comments yet.
// //             </Typography>
// //           )}
// //           <Box sx={{ display: 'flex', gap: 2, pl: 2, alignItems: 'flex-start' }}>
// //             <TextField
// //               label="Add Comment"
// //               multiline
// //               rows={3}
// //               value={commentText}
// //               onChange={(e) => setCommentText(e.target.value)}
// //               fullWidth
// //               sx={{ maxWidth: 500, bgcolor: 'white' }}
// //               variant="outlined"
// //             />
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               onClick={() => handleAddComment(inquiry.id)}
// //               disabled={!commentText}
// //               sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
// //             >
// //               Submit Comment
// //             </Button>
// //           </Box>
// //           {commentStatus && (
// //             <Alert severity={commentStatus.type} sx={{ mt: 2, pl: 2 }}>
// //               {commentStatus.message}
// //             </Alert>
// //           )}
// //         </Box>
// //       </Box>
// //     );
// //   };

// //   const renderTrainingInfo = (inquiry) => {
// //     const serviceData = inquiry.service_data || {};
// //     return (
// //       <Box sx={{ mt: 2 }}>
// //         <Typography variant="h6" sx={{ 
// //           color: theme.palette.primary.main,
// //           fontWeight: 'bold',
// //           mb: 2
// //         }}>
// //           Training Information
// //         </Typography>
// //         <Box sx={{ pl: 2, bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
// //           {[
// //             ['Language Preference', serviceData.language_preference],
// //             ['Language Preference (Other)', serviceData.language_preference_other],
// //             ['Training Date', serviceData.training_date],
// //             ['Training Time', serviceData.training_time],
// //             ['Training Location', serviceData.training_location || inquiry.location],
// //             ['Training Agreement', serviceData.training_agreement ? 'Yes' : 'No'],
// //           ].map(([label, value], index) => (
// //             value && (
// //               <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
// //                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
// //                   {label}:
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
// //                   {value}
// //                 </Typography>
// //               </Box>
// //             )
// //           ))}
// //         </Box>
// //         <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
// //           {inquiry.category === 'Safety and Training Services' && inquiry.status !== 'Completed' && (
// //             <>
// //               <Button
// //                 variant="contained"
// //                 color="primary"
// //                 size="small"
// //                 onClick={() => handleOpenEmailDialog(inquiry)}
// //                 sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
// //               >
// //                 Send Email
// //               </Button>
// //               <Button
// //                 variant="contained"
// //                 color="success"
// //                 size="small"
// //                 onClick={() => updateInquiryStatus(inquiry.id, 'Completed')}
// //                 sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
// //               >
// //                 Mark as Completed
// //               </Button>
// //             </>
// //           )}
// //         </Box>
// //         {inquiry.status === 'Completed' && inquiry.category === 'Safety and Training Services' && (
// //           <Box sx={{ mt: 2 }}>
// //             <Typography variant="h6" sx={{ 
// //               color: theme.palette.primary.main,
// //               fontWeight: 'bold',
// //               mb: 2
// //             }}>
// //               Certificate
// //             </Typography>
// //             {inquiry.certificate ? (
// //               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //                 <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 2, color: theme.palette.text.primary }}>
// //                   Certificate Uploaded:
// //                 </Typography>
// //                 <Link href={`${backendBaseUrl}${inquiry.certificate}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
// //                   View/Download
// //                 </Link>
// //               </Box>
// //             ) : (
// //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //                 <Input
// //                   type="file"
// //                   onChange={(e) => setCertificateFile(e.target.files[0])}
// //                   inputProps={{ accept: 'application/pdf,image/*' }}
// //                   sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
// //                 />
// //                 <Button
// //                   variant="contained"
// //                   color="primary"
// //                   size="small"
// //                   onClick={() => handleCertificateUpload(inquiry.id)}
// //                   disabled={!certificateFile}
// //                   sx={{ borderRadius: 2, textTransform: 'none' }}
// //                 >
// //                   Upload Certificate
// //                 </Button>
// //               </Box>
// //             )}
// //           </Box>
// //         )}
        
// //         {/* Comments Section for Safety and Training */}
// //         <Box sx={{ mt: 3, borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
// //           <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
// //             Comments
// //           </Typography>
// //           {inquiry.comments && inquiry.comments.length > 0 ? (
// //             <Box sx={{ pl: 2, mb: 2 }}>
// //               {inquiry.comments.map((comment) => (
// //                 <Box key={comment.id} sx={{ mb: 1, p: 1, bgcolor: theme.palette.grey[100], borderRadius: 2 }}>
// //                   <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.primary }}>
// //                     "{comment.comment_text}"
// //                   </Typography>
// //                   {comment.company_response ? (
// //                     <Typography variant="body2" sx={{ pl: 2, color: theme.palette.text.secondary, mt: 0.5 }}>
// //                       Response: {comment.company_response}
// //                     </Typography>
// //                   ) : (
// //                     <Box sx={{ display: 'flex', gap: 2, pl: 2, mt: 1 }}>
// //                       <TextField
// //                         label="Add Reply"
// //                         multiline
// //                         rows={2}
// //                         value={replyingToCommentId === comment.id ? replyText : ''}
// //                         onChange={(e) => {
// //                           setReplyingToCommentId(comment.id);
// //                           setReplyText(e.target.value);
// //                         }}
// //                         fullWidth
// //                         sx={{ maxWidth: 400, bgcolor: 'white' }}
// //                         variant="outlined"
// //                       />
// //                       <Button
// //                         variant="contained"
// //                         color="primary"
// //                         size="small"
// //                         onClick={() => handleAddReply(comment.id)}
// //                         disabled={replyingToCommentId !== comment.id || !replyText}
// //                         sx={{ borderRadius: 2, textTransform: 'none' }}
// //                       >
// //                         Submit Reply
// //                       </Button>
// //                     </Box>
// //                   )}
// //                   <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
// //                     Added on {formatDate(comment.created_at)}
// //                   </Typography>
// //                   {replyStatus && replyingToCommentId === comment.id && (
// //                     <Alert severity={replyStatus.type} sx={{ mt: 1, pl: 2 }}>
// //                       {replyStatus.message}
// //                     </Alert>
// //                   )}
// //                 </Box>
// //               ))}
// //             </Box>
// //           ) : (
// //             <Typography variant="body2" sx={{ pl: 2, mb: 2, color: theme.palette.text.secondary }}>
// //               No comments yet.
// //             </Typography>
// //           )}
// //           <Box sx={{ display: 'flex', gap: 2, pl: 2, alignItems: 'flex-start' }}>
// //             <TextField
// //               label="Add Comment"
// //               multiline
// //               rows={3}
// //               value={commentText}
// //               onChange={(e) => setCommentText(e.target.value)}
// //               fullWidth
// //               sx={{ maxWidth: 500, bgcolor: 'white' }}
// //               variant="outlined"
// //             />
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               onClick={() => handleAddComment(inquiry.id)}
// //               disabled={!commentText}
// //               sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
// //             >
// //               Submit Comment
// //             </Button>
// //           </Box>
// //           {commentStatus && (
// //             <Alert severity={commentStatus.type} sx={{ mt: 2, pl: 2 }}>
// //               {commentStatus.message}
// //             </Alert>
// //           )}
// //         </Box>
// //       </Box>
// //     );
// //   };

// //   const renderDetails = (inquiry) => {
// //     const serviceHandlers = {
// //       'Comprehensive Building Planning & Design': renderBuildingInfo,
// //       'Structural & Geotechnical Consultation': renderDocuments,
// //       'MEP System Design (Mechanical, Electrical & Plumbing)': renderDocuments,
// //       'Construction Management & Cost Estimation': renderDocuments,
// //       'Residential Construction': (inquiry) => (
// //         <>
// //           {renderBuildingInfo(inquiry)}
// //           {renderConstructionInfo(inquiry)}
// //         </>
// //       ),
// //       'Commercial Construction': (inquiry) => (
// //         <>
// //           {renderBuildingInfo(inquiry)}
// //           {renderConstructionInfo(inquiry)}
// //         </>
// //       ),
// //       'Renovation and Remodeling Services': (inquiry) => (
// //         <>
// //           {renderBuildingInfo(inquiry)}
// //           {renderConstructionInfo(inquiry)}
// //         </>
// //       ),
// //       'Post-Construction Maintenance': renderMaintenanceInfo,
// //       'Workplace Safety Training Modules': renderTrainingInfo,
// //     };

// //     const handler = serviceHandlers[inquiry.sub_service];
// //     return handler ? handler(inquiry) : null;
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'Pending': return 'warning';
// //       case 'Scheduled': return 'info';
// //       case 'Completed': return 'success';
// //       case 'No-Show': return 'error';
// //       case 'Permit Processing': return 'info';
// //       case 'Under Construction': return 'warning';
// //       case 'Awaiting Inspection': return 'warning';
// //       case 'Finishing': return 'info';
// //       case 'Handover Pending': return 'warning';
// //       default: return 'default';
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     const options = { 
// //       year: 'numeric', 
// //       month: 'short', 
// //       day: '2-digit', 
// //       hour: '2-digit', 
// //       minute: '2-digit',
// //       hour12: true
// //     };
// //     return new Date(dateString).toLocaleString('en-US', options);
// //   };

// //   return (
// //     <Box sx={{ p: 3, bgcolor: theme.palette.background.default, display: 'flex', gap: 3 }}>
// //       {/* Main Content */}
// //       <Box sx={{ flex: 3 }}>
// //         <Paper elevation={4} sx={{ p: 4, borderRadius: 3, bgcolor: 'white' }}>
// //           <Typography variant="h4" sx={{ 
// //             mb: 3, 
// //             color: theme.palette.primary.main,
// //             fontWeight: 'bold',
// //             letterSpacing: 0.5
// //           }}>
// //             Client Inquiries
// //           </Typography>

// //           {emailStatus && (
// //             <Alert severity={emailStatus.type} sx={{ mb: 2, borderRadius: 2 }}>
// //               {emailStatus.message}
// //             </Alert>
// //           )}
// //           {commentStatus && (
// //             <Alert severity={commentStatus.type} sx={{ mb: 2, borderRadius: 2 }}>
// //               {commentStatus.message}
// //             </Alert>
// //           )}

// //           {loading ? (
// //             <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
// //               <CircularProgress size={60} color="primary" />
// //             </Box>
// //           ) : error ? (
// //             <Typography color="error" sx={{ p: 2, bgcolor: '#ffeeee', borderRadius: 2, textAlign: 'center' }}>
// //               {error}
// //             </Typography>
// //           ) : filteredInquiries.length === 0 ? (
// //             <Typography variant="h6" sx={{ p: 2, color: theme.palette.text.secondary, textAlign: 'center' }}>
// //               No inquiries found
// //             </Typography>
// //           ) : (
// //             <List sx={{ width: '100%' }}>
// //               {filteredInquiries.map((inquiry) => {
// //                 const isNew = lastInquiryCheck && 
// //                   new Date(inquiry.created_at) > new Date(lastInquiryCheck);
// //                 const isExpanded = expandedInquiry === inquiry.id;

// //                 return (
// //                   <Card 
// //                     key={inquiry.id}
// //                     sx={{ 
// //                       mb: 3, 
// //                       borderRadius: 3,
// //                       borderLeft: isNew ? `4px solid ${theme.palette.error.main}` : `1px solid ${theme.palette.divider}`,
// //                       boxShadow: theme.shadows[4],
// //                       transition: 'all 0.3s ease',
// //                       '&:hover': {
// //                         transform: 'translateY(-4px)',
// //                         boxShadow: theme.shadows[8],
// //                         borderLeft: `4px solid ${theme.palette.primary.main}`
// //                       },
// //                       bgcolor: 'white'
// //                     }}
// //                   >
// //                     <CardContent sx={{ p: 3 }}>
// //                       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
// //                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                           <Avatar sx={{ 
// //                             bgcolor: theme.palette.primary.main, 
// //                             mr: 2,
// //                             width: 48,
// //                             height: 48
// //                           }}>
// //                             <PersonIcon fontSize="large" />
// //                           </Avatar>
// //                           <Box>
// //                             <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
// //                               {inquiry.full_name}
// //                             </Typography>
// //                             <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
// //                               Inquiry ID: #{inquiry.id}
// //                             </Typography>
// //                           </Box>
// //                           {isNew && (
// //                             <Chip
// //                               label="NEW"
// //                               color="error"
// //                               size="small"
// //                               sx={{ 
// //                                 ml: 2,
// //                                 fontWeight: 'bold',
// //                                 fontSize: '0.75rem',
// //                                 height: 24,
// //                                 borderRadius: 2
// //                               }}
// //                             />
// //                           )}
// //                         </Box>
// //                         <IconButton onClick={() => handleToggleDetails(inquiry.id)}>
// //                           {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
// //                         </IconButton>
// //                       </Box>

// //                       <Box sx={{ pl: 1, mb: 2 }}>
// //                         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
// //                           <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
// //                             <LocationOnIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
// //                             {inquiry.location}
// //                           </Typography>
// //                           <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
// //                             <EmailIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
// //                             {inquiry.email}
// //                           </Typography>
// //                           <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
// //                             <PhoneIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
// //                             {inquiry.phone_number}
// //                           </Typography>
// //                         </Box>

// //                         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
// //                           <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
// //                             <CategoryIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
// //                             <strong>Category:</strong> {inquiry.category}
// //                           </Typography>
// //                           <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
// //                             <BuildIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
// //                             <strong>Sub-Service:</strong> {inquiry.sub_service}
// //                           </Typography>
// //                         </Box>
// //                       </Box>

// //                       <Collapse in={isExpanded}>
// //                         <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
// //                           {renderDetails(inquiry)}

// //                           <Box sx={{ 
// //                             display: 'flex', 
// //                             justifyContent: 'space-between',
// //                             alignItems: 'center',
// //                             mt: 3,
// //                             pt: 2,
// //                             borderTop: `1px solid ${theme.palette.divider}`
// //                           }}>
// //                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
// //                               <Typography variant="body2" sx={{ mr: 1, fontWeight: 'bold', color: theme.palette.text.primary }}>
// //                                 Status:
// //                               </Typography>
// //                               {inquiry.category === 'Building Construction Services' ? (
// //                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
// //                                   <FormControl sx={{ minWidth: 200 }}>
// //                                     <InputLabel>Status</InputLabel>
// //                                     <Select
// //                                       value={inquiryStatus[inquiry.id] || inquiry.status}
// //                                       onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
// //                                       label="Status"
// //                                       sx={{ bgcolor: 'white', borderRadius: 2 }}
// //                                     >
// //                                       <MenuItem value="Pending">Pending</MenuItem>
// //                                       <MenuItem value="Scheduled">Scheduled</MenuItem>
// //                                       <MenuItem value="Completed">Completed</MenuItem>
// //                                       <MenuItem value="No-Show">No-Show</MenuItem>
// //                                       <MenuItem value="Permit Processing">Permit Processing</MenuItem>
// //                                       <MenuItem value="Under Construction">Under Construction</MenuItem>
// //                                       <MenuItem value="Awaiting Inspection">Awaiting Inspection</MenuItem>
// //                                       <MenuItem value="Finishing">Finishing</MenuItem>
// //                                       <MenuItem value="Handover Pending">Handover Pending</MenuItem>
// //                                     </Select>
// //                                   </FormControl>
// //                                   <Button
// //                                     variant="contained"
// //                                     color="info"
// //                                     size="small"
// //                                     onClick={() => updateInquiryStatus(inquiry.id, 'Scheduled')}
// //                                     sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
// //                                   >
// //                                     Reschedule
// //                                   </Button>
// //                                 </Box>
// //                               ) : (
// //                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
// //                                   <Chip
// //                                     label={inquiry.status}
// //                                     color={getStatusColor(inquiry.status)}
// //                                     size="small"
// //                                     sx={{ fontWeight: 'bold', borderRadius: 2 }}
// //                                   />
// //                                   {inquiry.status === 'Pending' && (
// //                                     <Button
// //                                       variant="contained"
// //                                       color="info"
// //                                       size="small"
// //                                       onClick={() => updateInquiryStatus(inquiry.id, 'Scheduled')}
// //                                       sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
// //                                     >
// //                                       Reschedule
// //                                     </Button>
// //                                   )}
// //                                   {inquiry.status === 'Scheduled' && (
// //                                     <>
// //                                       <Button
// //                                         variant="contained"
// //                                         color="warning"
// //                                         size="small"
// //                                         onClick={() => updateInquiryStatus(inquiry.id, 'Pending')}
// //                                         sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
// //                                       >
// //                                         Mark as Pending
// //                                       </Button>
// //                                       <Button
// //                                         variant="contained"
// //                                         color="success"
// //                                         size="small"
// //                                         onClick={() => updateInquiryStatus(inquiry.id, 'Completed')}
// //                                         sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
// //                                       >
// //                                         Mark as Completed
// //                                       </Button>
// //                                     </>
// //                                   )}
// //                                 </Box>
// //                               )}
// //                             </Box>
// //                             <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
// //                               Submitted: {formatDate(inquiry.created_at)}
// //                             </Typography>
// //                           </Box>
// //                         </Box>
// //                       </Collapse>
// //                     </CardContent>
// //                   </Card>
// //                 );
// //               })}
// //             </List>
// //           )}
// //         </Paper>
// //       </Box>

// //       {/* Filter Panel on the Right */}
// //       <Box sx={{ flex: 1, minWidth: 250 }}>
// //         <Paper elevation={4} sx={{ p: 3, borderRadius: 3, bgcolor: 'white', height: 'fit-content' }}>
// //           <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}>
// //             Filters
// //           </Typography>
// //           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
// //             {/* Category Filter */}
// //             <FormControl fullWidth>
// //               <InputLabel sx={{ color: theme.palette.text.primary }}>Service Category</InputLabel>
// //               <Select
// //                 value={selectedCategory}
// //                 onChange={handleCategoryChange}
// //                 label="Service Category"
// //                 sx={{ bgcolor: 'white', borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider } }}
// //               >
// //                 {categories.map((category) => (
// //                   <MenuItem key={category} value={category}>
// //                     {category}
// //                   </MenuItem>
// //                 ))}
// //               </Select>
// //             </FormControl>

// //             {/* Status Filter */}
// //             <FormControl fullWidth>
// //               <InputLabel sx={{ color: theme.palette.text.primary }}>Status</InputLabel>
// //               <Select
// //                 value={selectedStatus}
// //                 onChange={handleFilterStatusChange}
// //                 label="Status"
// //                 sx={{ bgcolor: 'white', borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider } }}
// //               >
// //                 {statuses.map((status) => (
// //                   <MenuItem key={status} value={status}>
// //                     {status}
// //                   </MenuItem>
// //                 ))}
// //               </Select>
// //             </FormControl>

// //             {/* Progress Filter (for Building Construction Services) */}
// //             <Box>
// //               <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', color: theme.palette.text.primary }}>
// //                 Progress Range (%)
// //               </Typography>
// //               <Slider
// //                 value={progressRange}
// //                 onChange={handleProgressRangeChange}
// //                 valueLabelDisplay="auto"
// //                 min={0}
// //                 max={100}
// //                 sx={{ color: theme.palette.primary.main }}
// //               />
// //               <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
// //                 {progressRange[0]}% - {progressRange[1]}%
// //               </Typography>
// //             </Box>

// //             {/* Certificate Filter (for Safety and Training Services) */}
// //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //               <input
// //                 type="checkbox"
// //                 checked={showIncompleteCertificates}
// //                 onChange={handleCertificateFilterChange}
// //                 id="certificate-filter"
// //               />
// //               <label htmlFor="certificate-filter" style={{ color: theme.palette.text.primary }}>
// //                 Show Completed without Certificates
// //               </label>
// //             </Box>

// //             {/* Reset Button */}
// //             <Button
// //               variant="outlined"
// //               color="secondary"
// //               startIcon={<ClearIcon />}
// //               onClick={resetFilters}
// //               sx={{ borderRadius: 2, textTransform: 'none', mt: 1 }}
// //             >
// //               Reset Filters
// //             </Button>
// //           </Box>
// //         </Paper>
// //       </Box>

// //       {/* Email Dialog */}
// //       <Dialog open={openEmailDialog} onClose={handleCloseEmailDialog} maxWidth="sm" fullWidth>
// //         <DialogTitle sx={{ bgcolor: theme.palette.primary.main, color: 'white', borderTopLeftRadius: 2, borderTopRightRadius: 2 }}>
// //           Send Email to {selectedInquiry?.full_name}
// //         </DialogTitle>
// //         <DialogContent sx={{ pt: 3 }}>
// //           <TextField
// //             label="Email Body"
// //             multiline
// //             rows={8}
// //             value={emailBody}
// //             onChange={(e) => setEmailBody(e.target.value)}
// //             fullWidth
// //             variant="outlined"
// //             sx={{ bgcolor: 'white' }}
// //           />
// //         </DialogContent>
// //         <DialogActions sx={{ p: 2 }}>
// //           <Button onClick={handleCloseEmailDialog} color="secondary" sx={{ borderRadius: 2, textTransform: 'none' }}>
// //             Cancel
// //           </Button>
// //           <Button onClick={sendTrainingEmail} color="primary" variant="contained" sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}>
// //             Send
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default InquiriesList;


// //#####
// import React, { useState, useEffect } from 'react';
// import { Box, Paper, Typography, List, CircularProgress, useTheme, Alert } from '@mui/material';
// import axios from 'axios';
// import InquiryCard from './inquaries/InquiryCard';
// import FilterPanel from './inquaries/FilterPanel';
// import EmailDialog from './inquaries/EmailDialog';

// const InquiriesList = ({ inquiries: initialInquiries, lastInquiryCheck, clickable }) => {
//   const theme = useTheme();
//   const [inquiries, setInquiries] = useState(initialInquiries || []);
//   const [filteredInquiries, setFilteredInquiries] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedStatus, setSelectedStatus] = useState('All');
//   const [progressRange, setProgressRange] = useState([0, 100]);
//   const [showIncompleteCertificates, setShowIncompleteCertificates] = useState(false);
//   const [showOnlyPaidInquiries, setShowOnlyPaidInquiries] = useState(false);
//   const [loading, setLoading] = useState(!initialInquiries);
//   const [error, setError] = useState('');
//   const [emailStatus, setEmailStatus] = useState(null);
//   const [openEmailDialog, setOpenEmailDialog] = useState(false);
//   const [selectedInquiry, setSelectedInquiry] = useState(null);
//   const [emailBody, setEmailBody] = useState('');
//   const [certificateFile, setCertificateFile] = useState(null);
//   const [commentText, setCommentText] = useState('');
//   const [commentStatus, setCommentStatus] = useState(null);
//   const [progressPhotos, setProgressPhotos] = useState(null);
//   const [inspectionReports, setInspectionReports] = useState(null);
//   const [completionCertificate, setCompletionCertificate] = useState(null);
//   const [replyText, setReplyText] = useState('');
//   const [replyStatus, setReplyStatus] = useState(null);
//   const [replyingToCommentId, setReplyingToCommentId] = useState(null);
//   const [constructionPhase, setConstructionPhase] = useState({});
//   const [progressPercentage, setProgressPercentage] = useState({});
//   const [permitStatus, setPermitStatus] = useState({});
//   const [updateStatus, setUpdateStatus] = useState(null);
//   const [inquiryStatus, setInquiryStatus] = useState({});
//   const [expandedInquiry, setExpandedInquiry] = useState(null);

//   const backendBaseUrl = 'http://127.0.0.1:8000';

//   // Auto-dismiss alerts
//   useEffect(() => {
//     if (emailStatus) {
//       const timer = setTimeout(() => setEmailStatus(null), 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [emailStatus]);

//   useEffect(() => {
//     if (commentStatus) {
//       const timer = setTimeout(() => setCommentStatus(null), 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [commentStatus]);

//   useEffect(() => {
//     if (replyStatus) {
//       const timer = setTimeout(() => setReplyStatus(null), 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [replyStatus]);

//   useEffect(() => {
//     if (updateStatus) {
//       const timer = setTimeout(() => setUpdateStatus(null), 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [updateStatus]);

//   const fetchInquiries = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('access_token');
//       const response = await axios.get(`${backendBaseUrl}/api/company-inquiries/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const sorted = response.data.sort((a, b) => 
//         new Date(b.created_at) - new Date(a.created_at)
//       );
//       setInquiries(sorted);
//       applyFilters(sorted);
//       const phaseInit = {};
//       const percentageInit = {};
//       const permitInit = {};
//       const statusInit = {};
//       sorted.forEach((inquiry) => {
//         const serviceData = inquiry.service_data || {};
//         phaseInit[inquiry.id] = serviceData.construction_phase || '';
//         percentageInit[inquiry.id] = serviceData.progress_percentage || 0;
//         permitInit[inquiry.id] = serviceData.permit_status || '';
//         statusInit[inquiry.id] = inquiry.status || 'Pending';
//       });
//       setConstructionPhase(phaseInit);
//       setProgressPercentage(percentageInit);
//       setPermitStatus(permitInit);
//       setInquiryStatus(statusInit);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to load inquiries');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInquiries();
//   }, [clickable]);

//   const applyFilters = (data = inquiries) => {
//     let filtered = [...data];
//     if (selectedCategory !== 'All') {
//       filtered = filtered.filter((inquiry) => inquiry.category === selectedCategory);
//     }
//     if (selectedStatus !== 'All') {
//       filtered = filtered.filter((inquiry) => inquiry.status === selectedStatus);
//     }
//     filtered = filtered.filter((inquiry) => {
//       if (inquiry.category === 'Building Construction Services') {
//         const progress = inquiry.service_data?.progress_percentage || 0;
//         return progress >= progressRange[0] && progress <= progressRange[1];
//       }
//       return true;
//     });
//     if (showIncompleteCertificates) {
//       filtered = filtered.filter((inquiry) => 
//         inquiry.category === 'Safety and Training Services' &&
//         inquiry.status === 'Completed' &&
//         !inquiry.certificate
//       );
//     }
//     if (showOnlyPaidInquiries) {
//       filtered = filtered.filter((inquiry) => inquiry.payments && inquiry.payments.length > 0);
//     }
//     filtered.sort((a, b) => {
//       const aIsCompleted = a.status === 'Completed';
//       const bIsCompleted = b.status === 'Completed';
//       if (aIsCompleted && !bIsCompleted) return 1;
//       if (!aIsCompleted && bIsCompleted) return -1;
//       return new Date(b.created_at) - new Date(a.created_at);
//     });
//     setFilteredInquiries(filtered);
//   };

//   useEffect(() => {
//     applyFilters();
//   }, [selectedCategory, selectedStatus, progressRange, showIncompleteCertificates, showOnlyPaidInquiries, inquiries]);

//   const updateInquiryStatus = async (inquiryId, newStatus) => {
//     try {
//       const token = localStorage.getItem('access_token');
//       await axios.patch(
//         `${backendBaseUrl}/api/update-inquiry-status/${inquiryId}/`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchInquiries();
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to update status');
//     }
//   };

//   const handleCertificateUpload = async (inquiryId) => {
//     if (!certificateFile) {
//       setEmailStatus({ type: 'error', message: 'Please select a certificate file to upload' });
//       return;
//     }
//     try {
//       const token = localStorage.getItem('access_token');
//       const formData = new FormData();
//       formData.append('certificate', certificateFile);
//       await axios.post(
//         `${backendBaseUrl}/api/upload-certificate/${inquiryId}/`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       setEmailStatus({ type: 'success', message: 'Certificate uploaded successfully!' });
//       setCertificateFile(null);
//       fetchInquiries();
//     } catch (err) {
//       setEmailStatus({
//         type: 'error',
//         message: err.response?.data?.error || 'Failed to upload certificate',
//       });
//     }
//   };

//   const handleProgressPhotosUpload = async (inquiryId) => {
//     if (!progressPhotos) {
//       setEmailStatus({ type: 'error', message: 'Please select progress photos to upload' });
//       return;
//     }
//     try {
//       const token = localStorage.getItem('access_token');
//       const formData = new FormData();
//       for (let i = 0; i < progressPhotos.length; i++) {
//         formData.append('photos', progressPhotos[i]);
//       }
//       await axios.post(
//         `${backendBaseUrl}/api/upload-progress-photos/${inquiryId}/`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       setEmailStatus({ type: 'success', message: 'Progress photos uploaded successfully!' });
//       setProgressPhotos(null);
//       fetchInquiries();
//     } catch (err) {
//       setEmailStatus({
//         type: 'error',
//         message: err.response?.data?.error || 'Failed to upload progress photos',
//       });
//     }
//   };

//   const handleInspectionReportsUpload = async (inquiryId) => {
//     if (!inspectionReports) {
//       setEmailStatus({ type: 'error', message: 'Please select inspection reports to upload' });
//       return;
//     }
//     try {
//       const token = localStorage.getItem('access_token');
//       const formData = new FormData();
//       for (let i = 0; i < inspectionReports.length; i++) {
//         formData.append('reports', inspectionReports[i]);
//       }
//       await axios.post(
//         `${backendBaseUrl}/api/upload-inspection-reports/${inquiryId}/`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       setEmailStatus({ type: 'success', message: 'Inspection reports uploaded successfully!' });
//       setInspectionReports(null);
//       fetchInquiries();
//     } catch (err) {
//       setEmailStatus({
//         type: 'error',
//         message: err.response?.data?.error || 'Failed to upload inspection reports',
//       });
//     }
//   };

//   const handleCompletionCertificateUpload = async (inquiryId) => {
//     if (!completionCertificate) {
//       setEmailStatus({ type: 'error', message: 'Please select a completion certificate to upload' });
//       return;
//     }
//     try {
//       const token = localStorage.getItem('access_token');
//       const formData = new FormData();
//       formData.append('completion_certificate', completionCertificate);
//       await axios.post(
//         `${backendBaseUrl}/api/upload-completion-certificate/${inquiryId}/`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       setEmailStatus({ type: 'success', message: 'Completion certificate uploaded successfully!' });
//       setCompletionCertificate(null);
//       fetchInquiries();
//     } catch (err) {
//       setEmailStatus({
//         type: 'error',
//         message: err.response?.data?.error || 'Failed to upload completion certificate',
//       });
//     }
//   };

//   const handleAddComment = async (inquiryId) => {
//     if (!commentText) {
//       setCommentStatus({ type: 'error', message: 'Please enter a comment' });
//       return;
//     }
//     try {
//       const token = localStorage.getItem('access_token');
//       await axios.post(
//         `${backendBaseUrl}/api/add-comment/${inquiryId}/`,
//         { comment_text: commentText, company_response: '' },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCommentStatus({ type: 'success', message: 'Comment added successfully!' });
//       setCommentText('');
//       fetchInquiries();
//     } catch (err) {
//       setCommentStatus({
//         type: 'error',
//         message: err.response?.data?.error || 'Failed to add comment',
//       });
//     }
//   };

//   const handleAddReply = async (commentId) => {
//     if (!replyText) {
//       setReplyStatus({ type: 'error', message: 'Please enter a reply' });
//       return;
//     }
//     try {
//       const token = localStorage.getItem('access_token');
//       await axios.patch(
//         `${backendBaseUrl}/api/update-comment-response/${commentId}/`,
//         { company_response: replyText },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setReplyStatus({ type: 'success', message: 'Reply added successfully!' });
//       setReplyText('');
//       setReplyingToCommentId(null);
//       fetchInquiries();
//     } catch (err) {
//       setReplyStatus({
//         type: 'error',
//         message: err.response?.data?.error || 'Failed to add reply',
//       });
//     }
//   };

//   const handleUpdateProgress = async (inquiryId) => {
//     if (!constructionPhase[inquiryId] || !progressPercentage[inquiryId] || !permitStatus[inquiryId]) {
//       setUpdateStatus({ type: 'error', message: 'Please fill all fields' });
//       return;
//     }
//     try {
//       const token = localStorage.getItem('access_token');
//       const data = {
//         construction_phase: constructionPhase[inquiryId],
//         progress_percentage: parseInt(progressPercentage[inquiryId]),
//         permit_status: permitStatus[inquiryId],
//       };
//       await axios.patch(
//         `${backendBaseUrl}/api/update-construction-progress/${inquiryId}/`,
//         data,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUpdateStatus({ type: 'success', message: 'Progress updated successfully!' });
//       fetchInquiries();
//     } catch (err) {
//       setUpdateStatus({
//         type: 'error',
//         message: err.response?.data?.error || 'Failed to update progress',
//       });
//     }
//   };

//   const handleOpenEmailDialog = (inquiry) => {
//     const serviceData = inquiry.service_data || {};
//     const defaultEmailBody = `Dear ${inquiry.full_name},

// We are pleased to confirm your training session for Workplace Safety Training Modules.

// Training Details:
// - Date: ${serviceData.training_date || 'N/A'}
// - Time: ${serviceData.training_time || 'N/A'}
// - Location: ${serviceData.training_location || inquiry.location || 'N/A'}

// Please arrive 15 minutes early. Let us know if you have any questions.

// Best regards,
// [Your Company Name]`;

//     setSelectedInquiry(inquiry);
//     setEmailBody(defaultEmailBody);
//     setOpenEmailDialog(true);
//   };

//   const handleCloseEmailDialog = () => {
//     setOpenEmailDialog(false);
//     setSelectedInquiry(null);
//     setEmailBody('');
//   };

//   const sendTrainingEmail = async () => {
//     if (!emailBody) {
//       setEmailStatus({ type: 'error', message: 'Please enter an email body' });
//       return;
//     }
//     try {
//       const token = localStorage.getItem('access_token');
//       const emailData = {
//         to_email: selectedInquiry.email,
//         full_name: selectedInquiry.full_name,
//         email_body: emailBody,
//         inquiry_id: selectedInquiry.id
//       };
//       await axios.post(
//         `${backendBaseUrl}/api/send-training-email/`,
//         emailData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEmailStatus({ type: 'success', message: 'Email sent successfully!' });
//       handleCloseEmailDialog();
//       fetchInquiries();
//     } catch (err) {
//       setEmailStatus({
//         type: 'error',
//         message: err.response?.data?.error || 'Failed to send email',
//       });
//     }
//   };

//   const categories = ['All', ...new Set(inquiries.map((inquiry) => inquiry.category))];
//   const statuses = ['All', ...new Set(inquiries.map((inquiry) => inquiry.status))];

//   return (
//     <Box sx={{ p: 3, bgcolor: theme.palette.background.default, display: 'flex', gap: 3 }}>
//       <Box sx={{ flex: 3 }}>
//         <Paper elevation={4} sx={{ p: 4, borderRadius: 3, bgcolor: 'white' }}>
//           <Typography variant="h4" sx={{ 
//             mb: 3, 
//             color: theme.palette.primary.main,
//             fontWeight: 'bold',
//             letterSpacing: 0.5
//           }}>
//             Client Inquiries
//           </Typography>

//           {emailStatus && (
//             <Alert severity={emailStatus.type} sx={{ mb: 2, borderRadius: 2 }}>
//               {emailStatus.message}
//             </Alert>
//           )}
//           {commentStatus && (
//             <Alert severity={commentStatus.type} sx={{ mb: 2, borderRadius: 2 }}>
//               {commentStatus.message}
//             </Alert>
//           )}
//           {updateStatus && (
//             <Alert severity={updateStatus.type} sx={{ mb: 2, borderRadius: 2 }}>
//               {updateStatus.message}
//             </Alert>
//           )}

//           {loading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//               <CircularProgress size={60} color="primary" />
//             </Box>
//           ) : error ? (
//             <Typography color="error" sx={{ p: 2, bgcolor: '#ffeeee', borderRadius: 2, textAlign: 'center' }}>
//               {error}
//             </Typography>
//           ) : filteredInquiries.length === 0 ? (
//             <Typography variant="h6" sx={{ p: 2, color: theme.palette.text.secondary, textAlign: 'center' }}>
//               No inquiries found
//             </Typography>
//           ) : (
//             <List sx={{ width: '100%' }}>
//               {filteredInquiries.map((inquiry) => (
//                 <InquiryCard
//                   key={inquiry.id}
//                   inquiry={inquiry}
//                   lastInquiryCheck={lastInquiryCheck}
//                   isExpanded={expandedInquiry === inquiry.id}
//                   onToggleDetails={() => setExpandedInquiry(expandedInquiry === inquiry.id ? null : inquiry.id)}
//                   inquiryStatus={inquiryStatus[inquiry.id] || inquiry.status}
//                   onStatusChange={(newStatus) => {
//                     setInquiryStatus((prev) => ({ ...prev, [inquiry.id]: newStatus }));
//                     updateInquiryStatus(inquiry.id, newStatus);
//                   }}
//                   onOpenEmailDialog={handleOpenEmailDialog}
//                   constructionPhase={constructionPhase[inquiry.id] || ''}
//                   progressPercentage={progressPercentage[inquiry.id] || 0}
//                   permitStatus={permitStatus[inquiry.id] || ''}
//                   onConstructionPhaseChange={(value) => 
//                     setConstructionPhase({ ...constructionPhase, [inquiry.id]: value })
//                   }
//                   onProgressPercentageChange={(value) => 
//                     setProgressPercentage({ ...progressPercentage, [inquiry.id]: value })
//                   }
//                   onPermitStatusChange={(value) => 
//                     setPermitStatus({ ...permitStatus, [inquiry.id]: value })
//                   }
//                   onUpdateProgress={() => handleUpdateProgress(inquiry.id)}
//                   onCertificateUpload={() => handleCertificateUpload(inquiry.id)}
//                   certificateFile={certificateFile}
//                   setCertificateFile={setCertificateFile}
//                   onProgressPhotosUpload={() => handleProgressPhotosUpload(inquiry.id)}
//                   progressPhotos={progressPhotos}
//                   setProgressPhotos={setProgressPhotos}
//                   onInspectionReportsUpload={() => handleInspectionReportsUpload(inquiry.id)}
//                   inspectionReports={inspectionReports}
//                   setInspectionReports={setInspectionReports}
//                   onCompletionCertificateUpload={() => handleCompletionCertificateUpload(inquiry.id)}
//                   completionCertificate={completionCertificate}
//                   setCompletionCertificate={setCompletionCertificate}
//                   commentText={commentText}
//                   setCommentText={setCommentText}
//                   onAddComment={() => handleAddComment(inquiry.id)}
//                   replyText={replyText}
//                   setReplyText={setReplyText}
//                   replyingToCommentId={replyingToCommentId}
//                   setReplyingToCommentId={setReplyingToCommentId}
//                   onAddReply={handleAddReply}
//                   replyStatus={replyStatus}
//                   backendBaseUrl={backendBaseUrl}
//                 />
//               ))}
//             </List>
//           )}
//         </Paper>
//       </Box>

//       <FilterPanel
//         selectedCategory={selectedCategory}
//         onCategoryChange={setSelectedCategory}
//         selectedStatus={selectedStatus}
//         onStatusChange={setSelectedStatus}
//         progressRange={progressRange}
//         onProgressRangeChange={setProgressRange}
//         showIncompleteCertificates={showIncompleteCertificates}
//         onCertificateFilterChange={setShowIncompleteCertificates}
//         showOnlyPaidInquiries={showOnlyPaidInquiries}
//         onPaymentFilterChange={setShowOnlyPaidInquiries}
//         categories={categories}
//         statuses={statuses}
//         onResetFilters={() => {
//           setSelectedCategory('All');
//           setSelectedStatus('All');
//           setProgressRange([0, 100]);
//           setShowIncompleteCertificates(false);
//           setShowOnlyPaidInquiries(false);
//         }}
//       />

//       <EmailDialog
//         open={openEmailDialog}
//         onClose={handleCloseEmailDialog}
//         inquiry={selectedInquiry}
//         emailBody={emailBody}
//         setEmailBody={setEmailBody}
//         onSend={sendTrainingEmail}
//       />
//     </Box>
//   );
// };

// export default InquiriesList;

import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, List, CircularProgress, useTheme, Alert } from '@mui/material';
import axios from 'axios';
import InquiryCard from './inquaries/InquiryCard';
import FilterPanel from './inquaries/FilterPanel';
import EmailDialog from './inquaries/EmailDialog';

const InquiriesList = ({ inquiries: initialInquiries, lastInquiryCheck, clickable }) => {
  const theme = useTheme();
  const [inquiries, setInquiries] = useState(initialInquiries || []);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [progressRange, setProgressRange] = useState([0, 100]);
  const [showIncompleteCertificates, setShowIncompleteCertificates] = useState(false);
  const [showOnlyPaidInquiries, setShowOnlyPaidInquiries] = useState(false);
  const [loading, setLoading] = useState(!initialInquiries);
  const [error, setError] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [emailBody, setEmailBody] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentStatus, setCommentStatus] = useState(null);
  const [progressPhotos, setProgressPhotos] = useState(null);
  const [inspectionReports, setInspectionReports] = useState(null);
  const [completionCertificate, setCompletionCertificate] = useState(null);
  const [structuralDesign, setStructuralDesign] = useState(null);
  const [structuralReport, setStructuralReport] = useState(null);
  const [architecturalDesign, setArchitecturalDesign] = useState(null);
  const [costEstimationFiles, setCostEstimationFiles] = useState(null);
  const [rateAnalysis, setRateAnalysis] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyStatus, setReplyStatus] = useState(null);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [constructionPhase, setConstructionPhase] = useState({});
  const [progressPercentage, setProgressPercentage] = useState({});
  const [permitStatus, setPermitStatus] = useState({});
  const [updateStatus, setUpdateStatus] = useState(null);
  const [inquiryStatus, setInquiryStatus] = useState({});
  const [expandedInquiry, setExpandedInquiry] = useState(null);

  const backendBaseUrl = 'http://127.0.0.1:8000';

  // Auto-dismiss alerts
  useEffect(() => {
    if (emailStatus) {
      const timer = setTimeout(() => setEmailStatus(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [emailStatus]);

  useEffect(() => {
    if (commentStatus) {
      const timer = setTimeout(() => setCommentStatus(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [commentStatus]);

  useEffect(() => {
    if (replyStatus) {
      const timer = setTimeout(() => setReplyStatus(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [replyStatus]);

  useEffect(() => {
    if (updateStatus) {
      const timer = setTimeout(() => setUpdateStatus(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [updateStatus]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${backendBaseUrl}/api/company-inquiries/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sorted = response.data.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      setInquiries(sorted);
      applyFilters(sorted);
      const phaseInit = {};
      const percentageInit = {};
      const permitInit = {};
      const statusInit = {};
      sorted.forEach((inquiry) => {
        const serviceData = inquiry.service_data || {};
        phaseInit[inquiry.id] = serviceData.construction_phase || '';
        percentageInit[inquiry.id] = serviceData.progress_percentage || 0;
        permitInit[inquiry.id] = serviceData.permit_status || '';
        statusInit[inquiry.id] = inquiry.status || 'Pending';
      });
      setConstructionPhase(phaseInit);
      setProgressPercentage(percentageInit);
      setPermitStatus(permitInit);
      setInquiryStatus(statusInit);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [clickable]);

  const applyFilters = (data = inquiries) => {
    let filtered = [...data];
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((inquiry) => inquiry.category === selectedCategory);
    }
    if (selectedStatus !== 'All') {
      filtered = filtered.filter((inquiry) => inquiry.status === selectedStatus);
    }
    filtered = filtered.filter((inquiry) => {
      if (inquiry.category === 'Building Construction Services') {
        const progress = inquiry.service_data?.progress_percentage || 0;
        return progress >= progressRange[0] && progress <= progressRange[1];
      }
      return true;
    });
    if (showIncompleteCertificates) {
      filtered = filtered.filter((inquiry) => 
        inquiry.category === 'Safety and Training Services' &&
        inquiry.status === 'Completed' &&
        !inquiry.certificate
      );
    }
    if (showOnlyPaidInquiries) {
      filtered = filtered.filter((inquiry) => inquiry.payments && inquiry.payments.length > 0);
    }
    filtered.sort((a, b) => {
      const aIsCompleted = a.status === 'Completed';
      const bIsCompleted = b.status === 'Completed';
      if (aIsCompleted && !bIsCompleted) return 1;
      if (!aIsCompleted && bIsCompleted) return -1;
      return new Date(b.created_at) - new Date(a.created_at);
    });
    setFilteredInquiries(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedStatus, progressRange, showIncompleteCertificates, showOnlyPaidInquiries, inquiries]);

  const updateInquiryStatus = async (inquiryId, newStatus) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.patch(
        `${backendBaseUrl}/api/update-inquiry-status/${inquiryId}/`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchInquiries();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update status');
    }
  };

  const handleCertificateUpload = async (inquiryId) => {
    if (!certificateFile) {
      setEmailStatus({ type: 'error', message: 'Please select a certificate file to upload' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('certificate', certificateFile);
      await axios.post(
        `${backendBaseUrl}/api/upload-certificate/${inquiryId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setEmailStatus({ type: 'success', message: 'Certificate uploaded successfully!' });
      setCertificateFile(null);
      fetchInquiries();
    } catch (err) {
      setEmailStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to upload certificate',
      });
    }
  };

  const handleProgressPhotosUpload = async (inquiryId) => {
    if (!progressPhotos) {
      setEmailStatus({ type: 'error', message: 'Please select progress photos to upload' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      for (let i = 0; i < progressPhotos.length; i++) {
        formData.append('photos', progressPhotos[i]);
      }
      await axios.post(
        `${backendBaseUrl}/api/upload-progress-photos/${inquiryId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setEmailStatus({ type: 'success', message: 'Progress photos uploaded successfully!' });
      setProgressPhotos(null);
      fetchInquiries();
    } catch (err) {
      setEmailStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to upload progress photos',
      });
    }
  };

  const handleInspectionReportsUpload = async (inquiryId) => {
    if (!inspectionReports) {
      setEmailStatus({ type: 'error', message: 'Please select inspection reports to upload' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      for (let i = 0; i < inspectionReports.length; i++) {
        formData.append('reports', inspectionReports[i]);
      }
      await axios.post(
        `${backendBaseUrl}/api/upload-inspection-reports/${inquiryId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setEmailStatus({ type: 'success', message: 'Inspection reports uploaded successfully!' });
      setInspectionReports(null);
      fetchInquiries();
    } catch (err) {
      setEmailStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to upload inspection reports',
      });
    }
  };

  const handleCompletionCertificateUpload = async (inquiryId) => {
    if (!completionCertificate) {
      setEmailStatus({ type: 'error', message: 'Please select a completion certificate to upload' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('completion_certificate', completionCertificate);
      await axios.post(
        `${backendBaseUrl}/api/upload-completion-certificate/${inquiryId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setEmailStatus({ type: 'success', message: 'Completion certificate uploaded successfully!' });
      setCompletionCertificate(null);
      fetchInquiries();
    } catch (err) {
      setEmailStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to upload completion certificate',
      });
    }
  };

  const handleStructuralDesignUpload = async (inquiryId) => {
    if (!structuralDesign) {
      setEmailStatus({ type: 'error', message: 'Please select a structural design file to upload' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('structural_design', structuralDesign);
      await axios.post(
        `${backendBaseUrl}/api/upload-structural-design/${inquiryId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setEmailStatus({ type: 'success', message: 'Structural design uploaded successfully!' });
      setStructuralDesign(null);
      fetchInquiries();
    } catch (err) {
      setEmailStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to upload structural design',
      });
    }
  };

  const handleStructuralReportUpload = async (inquiryId) => {
    if (!structuralReport) {
      setEmailStatus({ type: 'error', message: 'Please select a structural report file to upload' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('structural_report', structuralReport);
      await axios.post(
        `${backendBaseUrl}/api/upload-structural-report/${inquiryId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setEmailStatus({ type: 'success', message: 'Structural report uploaded successfully!' });
      setStructuralReport(null);
      fetchInquiries();
    } catch (err) {
      setEmailStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to upload structural report',
      });
    }
  };

  const handleArchitecturalDesignUpload = async (inquiryId) => {
    if (!architecturalDesign) {
      setEmailStatus({ type: 'error', message: 'Please select an architectural design file to upload' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('architectural_design', architecturalDesign);
      await axios.post(
        `${backendBaseUrl}/api/upload-architectural-design/${inquiryId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setEmailStatus({ type: 'success', message: 'Architectural design uploaded successfully!' });
      setArchitecturalDesign(null);
      fetchInquiries();
    } catch (err) {
      setEmailStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to upload architectural design',
      });
    }
  };

  const handleCostEstimationFilesUpload = async (inquiryId) => {
    if (!costEstimationFiles) {
      setEmailStatus({ type: 'error', message: 'Please select cost estimation files to upload' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('cost_estimation_files', costEstimationFiles);
      await axios.post(
        `${backendBaseUrl}/api/upload-cost-estimation-files/${inquiryId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setEmailStatus({ type: 'success', message: 'Cost estimation files uploaded successfully!' });
      setCostEstimationFiles(null);
      fetchInquiries();
    } catch (err) {
      setEmailStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to upload cost estimation files',
      });
    }
  };

  const handleRateAnalysisUpload = async (inquiryId) => {
    if (!rateAnalysis) {
      setEmailStatus({ type: 'error', message: 'Please select a rate analysis file to upload' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('rate_analysis', rateAnalysis);
      await axios.post(
        `${backendBaseUrl}/api/upload-rate-analysis/${inquiryId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setEmailStatus({ type: 'success', message: 'Rate analysis uploaded successfully!' });
      setRateAnalysis(null);
      fetchInquiries();
    } catch (err) {
      setEmailStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to upload rate analysis',
      });
    }
  };

  const handleAddComment = async (inquiryId) => {
    if (!commentText) {
      setCommentStatus({ type: 'error', message: 'Please enter a comment' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(
        `${backendBaseUrl}/api/add-comment/${inquiryId}/`,
        { comment_text: commentText, company_response: '' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentStatus({ type: 'success', message: 'Comment added successfully!' });
      setCommentText('');
      fetchInquiries();
    } catch (err) {
      setCommentStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to add comment',
      });
    }
  };

  const handleAddReply = async (commentId) => {
    if (!replyText) {
      setReplyStatus({ type: 'error', message: 'Please enter a reply' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      await axios.patch(
        `${backendBaseUrl}/api/update-comment-response/${commentId}/`,
        { company_response: replyText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyStatus({ type: 'success', message: 'Reply added successfully!' });
      setReplyText('');
      setReplyingToCommentId(null);
      fetchInquiries();
    } catch (err) {
      setReplyStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to add reply',
      });
    }
  };

  const handleUpdateProgress = async (inquiryId) => {
    if (!constructionPhase[inquiryId] || !progressPercentage[inquiryId] || !permitStatus[inquiryId]) {
      setUpdateStatus({ type: 'error', message: 'Please fill all fields' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const data = {
        construction_phase: constructionPhase[inquiryId],
        progress_percentage: parseInt(progressPercentage[inquiryId]),
        permit_status: permitStatus[inquiryId],
      };
      await axios.patch(
        `${backendBaseUrl}/api/update-construction-progress/${inquiryId}/`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUpdateStatus({ type: 'success', message: 'Progress updated successfully!' });
      fetchInquiries();
    } catch (err) {
      setUpdateStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to update progress',
      });
    }
  };

  const handleOpenEmailDialog = (inquiry) => {
    const serviceData = inquiry.service_data || {};
    const defaultEmailBody = `Dear ${inquiry.full_name},

We are pleased to confirm your training session for Workplace Safety Training Modules.

Training Details:
- Date: ${serviceData.training_date || 'N/A'}
- Time: ${serviceData.training_time || 'N/A'}
- Location: ${serviceData.training_location || inquiry.location || 'N/A'}

Please arrive 15 minutes early. Let us know if you have any questions.

Best regards,
[Your Company Name]`;

    setSelectedInquiry(inquiry);
    setEmailBody(defaultEmailBody);
    setOpenEmailDialog(true);
  };

  const handleCloseEmailDialog = () => {
    setOpenEmailDialog(false);
    setSelectedInquiry(null);
    setEmailBody('');
  };

  const sendTrainingEmail = async () => {
    if (!emailBody) {
      setEmailStatus({ type: 'error', message: 'Please enter an email body' });
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const emailData = {
        to_email: selectedInquiry.email,
        full_name: selectedInquiry.full_name,
        email_body: emailBody,
        inquiry_id: selectedInquiry.id
      };
      await axios.post(
        `${backendBaseUrl}/api/send-training-email/`,
        emailData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmailStatus({ type: 'success', message: 'Email sent successfully!' });
      handleCloseEmailDialog();
      fetchInquiries();
    } catch (err) {
      setEmailStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to send email',
      });
    }
  };

  const categories = ['All', ...new Set(inquiries.map((inquiry) => inquiry.category))];
  const statuses = ['All', ...new Set(inquiries.map((inquiry) => inquiry.status))];

  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.background.default, display: 'flex', gap: 3 }}>
      <Box sx={{ flex: 3 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, bgcolor: 'white' }}>
          <Typography variant="h4" sx={{ 
            mb: 3, 
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            letterSpacing: 0.5
          }}>
            Client Inquiries
          </Typography>

          {emailStatus && (
            <Alert severity={emailStatus.type} sx={{ mb: 2, borderRadius: 2 }}>
              {emailStatus.message}
            </Alert>
          )}
          {commentStatus && (
            <Alert severity={commentStatus.type} sx={{ mb: 2, borderRadius: 2 }}>
              {commentStatus.message}
            </Alert>
          )}
          {updateStatus && (
            <Alert severity={updateStatus.type} sx={{ mb: 2, borderRadius: 2 }}>
              {updateStatus.message}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={60} color="primary" />
            </Box>
          ) : error ? (
            <Typography color="error" sx={{ p: 2, bgcolor: '#ffeeee', borderRadius: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          ) : filteredInquiries.length === 0 ? (
            <Typography variant="h6" sx={{ p: 2, color: theme.palette.text.secondary, textAlign: 'center' }}>
              No inquiries found
            </Typography>
          ) : (
            <List sx={{ width: '100%' }}>
              {filteredInquiries.map((inquiry) => (
                <InquiryCard
                  key={inquiry.id}
                  inquiry={inquiry}
                  lastInquiryCheck={lastInquiryCheck}
                  isExpanded={expandedInquiry === inquiry.id}
                  onToggleDetails={() => setExpandedInquiry(expandedInquiry === inquiry.id ? null : inquiry.id)}
                  inquiryStatus={inquiryStatus[inquiry.id] || inquiry.status}
                  onStatusChange={(newStatus) => {
                    setInquiryStatus((prev) => ({ ...prev, [inquiry.id]: newStatus }));
                    updateInquiryStatus(inquiry.id, newStatus);
                  }}
                  onOpenEmailDialog={handleOpenEmailDialog}
                  constructionPhase={constructionPhase[inquiry.id] || ''}
                  progressPercentage={progressPercentage[inquiry.id] || 0}
                  permitStatus={permitStatus[inquiry.id] || ''}
                  onConstructionPhaseChange={(value) => 
                    setConstructionPhase({ ...constructionPhase, [inquiry.id]: value })
                  }
                  onProgressPercentageChange={(value) => 
                    setProgressPercentage({ ...progressPercentage, [inquiry.id]: value })
                  }
                  onPermitStatusChange={(value) => 
                    setPermitStatus({ ...permitStatus, [inquiry.id]: value })
                  }
                  onUpdateProgress={() => handleUpdateProgress(inquiry.id)}
                  onCertificateUpload={() => handleCertificateUpload(inquiry.id)}
                  certificateFile={certificateFile}
                  setCertificateFile={setCertificateFile}
                  onProgressPhotosUpload={() => handleProgressPhotosUpload(inquiry.id)}
                  progressPhotos={progressPhotos}
                  setProgressPhotos={setProgressPhotos}
                  onInspectionReportsUpload={() => handleInspectionReportsUpload(inquiry.id)}
                  inspectionReports={inspectionReports}
                  setInspectionReports={setInspectionReports}
                  onCompletionCertificateUpload={() => handleCompletionCertificateUpload(inquiry.id)}
                  completionCertificate={completionCertificate}
                  setCompletionCertificate={setCompletionCertificate}
                  onStructuralDesignUpload={() => handleStructuralDesignUpload(inquiry.id)}
                  structuralDesign={structuralDesign}
                  setStructuralDesign={setStructuralDesign}
                  onStructuralReportUpload={() => handleStructuralReportUpload(inquiry.id)}
                  structuralReport={structuralReport}
                  setStructuralReport={setStructuralReport}
                  onArchitecturalDesignUpload={() => handleArchitecturalDesignUpload(inquiry.id)}
                  architecturalDesign={architecturalDesign}
                  setArchitecturalDesign={setArchitecturalDesign}
                  onCostEstimationFilesUpload={() => handleCostEstimationFilesUpload(inquiry.id)}
                  costEstimationFiles={costEstimationFiles}
                  setCostEstimationFiles={setCostEstimationFiles}
                  onRateAnalysisUpload={() => handleRateAnalysisUpload(inquiry.id)}
                  rateAnalysis={rateAnalysis}
                  setRateAnalysis={setRateAnalysis}
                  commentText={commentText}
                  setCommentText={setCommentText}
                  onAddComment={() => handleAddComment(inquiry.id)}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  replyingToCommentId={replyingToCommentId}
                  setReplyingToCommentId={setReplyingToCommentId}
                  onAddReply={handleAddReply}
                  replyStatus={replyStatus}
                  backendBaseUrl={backendBaseUrl}
                />
              ))}
            </List>
          )}
        </Paper>
      </Box>

      <FilterPanel
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        progressRange={progressRange}
        onProgressRangeChange={setProgressRange}
        showIncompleteCertificates={showIncompleteCertificates}
        onCertificateFilterChange={setShowIncompleteCertificates}
        showOnlyPaidInquiries={showOnlyPaidInquiries}
        onPaymentFilterChange={setShowOnlyPaidInquiries}
        categories={categories}
        statuses={statuses}
        onResetFilters={() => {
          setSelectedCategory('All');
          setSelectedStatus('All');
          setProgressRange([0, 100]);
          setShowIncompleteCertificates(false);
          setShowOnlyPaidInquiries(false);
        }}
      />

      <EmailDialog
        open={openEmailDialog}
        onClose={handleCloseEmailDialog}
        inquiry={selectedInquiry}
        emailBody={emailBody}
        setEmailBody={setEmailBody}
        onSend={sendTrainingEmail}
      />
    </Box>
  );
};

export default InquiriesList;