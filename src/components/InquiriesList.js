

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