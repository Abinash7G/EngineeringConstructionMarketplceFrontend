
import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Input,
  Link,
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationOnIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Category as CategoryIcon,
  Build as BuildIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Visibility as VisibilityIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import BuildingDetails from './BuildingDetails';
import ConstructionDetails from './ConstructionDetails';
import TrainingDetails from './TrainingDetails';
import MaintenanceDetails from './MaintenanceDetails';
import PaymentDetails from './PaymentDetails';
import CommentsSection from './CommentsSection';

const InquiryCard = ({
  inquiry,
  lastInquiryCheck,
  isExpanded,
  onToggleDetails,
  inquiryStatus,
  onStatusChange,
  onOpenEmailDialog,
  constructionPhase,
  progressPercentage,
  permitStatus,
  onConstructionPhaseChange,
  onProgressPercentageChange,
  onPermitStatusChange,
  onUpdateProgress,
  onCertificateUpload,
  certificateFile,
  setCertificateFile,
  onProgressPhotosUpload,
  progressPhotos,
  setProgressPhotos,
  onInspectionReportsUpload,
  inspectionReports,
  setInspectionReports,
  onCompletionCertificateUpload,
  completionCertificate,
  setCompletionCertificate,
  onStructuralDesignUpload,
  structuralDesign,
  setStructuralDesign,
  onStructuralReportUpload,
  structuralReport,
  setStructuralReport,
  onArchitecturalDesignUpload,
  architecturalDesign,
  setArchitecturalDesign,
  onCostEstimationFilesUpload,
  costEstimationFiles,
  setCostEstimationFiles,
  onRateAnalysisUpload,
  rateAnalysis,
  setRateAnalysis,
  commentText,
  setCommentText,
  onAddComment,
  replyText,
  setReplyText,
  replyingToCommentId,
  setReplyingToCommentId,
  onAddReply,
  replyStatus,
  backendBaseUrl,
}) => {
  const theme = useTheme();
  const isNew = lastInquiryCheck && new Date(inquiry.created_at) > new Date(lastInquiryCheck);
  const isEngineeringConsulting = inquiry.category === 'Engineering Consulting';
  const serviceData = inquiry.service_data || {};

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Scheduled': return 'info';
      case 'Completed': return 'success';
      case 'No-Show': return 'error';
      case 'Permit Processing': return 'info';
      case 'Under Construction': return 'warning';
      case 'Awaiting Inspection': return 'warning';
      case 'Finishing': return 'info';
      case 'Handover Pending': return 'warning';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const renderDetails = () => {
    const serviceHandlers = {
      'Comprehensive Building Planning & Design': () => (
        <BuildingDetails inquiry={inquiry} backendBaseUrl={backendBaseUrl} />
      ),
      'Structural & Geotechnical Consultation': () => (
        <BuildingDetails inquiry={inquiry} isDocumentOnly backendBaseUrl={backendBaseUrl} />
      ),
      'MEP System Design (Mechanical, Electrical & Plumbing)': () => (
        <BuildingDetails inquiry={inquiry} isDocumentOnly backendBaseUrl={backendBaseUrl} />
      ),
      'Construction Management & Cost Estimation': () => (
        <BuildingDetails inquiry={inquiry} isDocumentOnly backendBaseUrl={backendBaseUrl} />
      ),
      'Residential Construction': () => (
        <>
          <BuildingDetails inquiry={inquiry} />
          <ConstructionDetails
            inquiry={inquiry}
            constructionPhase={constructionPhase}
            progressPercentage={progressPercentage}
            permitStatus={permitStatus}
            onConstructionPhaseChange={onConstructionPhaseChange}
            onProgressPercentageChange={onProgressPercentageChange}
            onPermitStatusChange={onPermitStatusChange}
            onUpdateProgress={onUpdateProgress}
            onProgressPhotosUpload={onProgressPhotosUpload}
            progressPhotos={progressPhotos}
            setProgressPhotos={setProgressPhotos}
            onInspectionReportsUpload={onInspectionReportsUpload}
            inspectionReports={inspectionReports}
            setInspectionReports={setInspectionReports}
            onCompletionCertificateUpload={onCompletionCertificateUpload}
            completionCertificate={completionCertificate}
            setCompletionCertificate={setCompletionCertificate}
            backendBaseUrl={backendBaseUrl}
          />
        </>
      ),
      'Commercial Construction': () => (
        <>
          <BuildingDetails inquiry={inquiry} />
          <ConstructionDetails
            inquiry={inquiry}
            constructionPhase={constructionPhase}
            progressPercentage={progressPercentage}
            permitStatus={permitStatus}
            onConstructionPhaseChange={onConstructionPhaseChange}
            onProgressPercentageChange={onProgressPercentageChange}
            onPermitStatusChange={onPermitStatusChange}
            onUpdateProgress={onUpdateProgress}
            onProgressPhotosUpload={onProgressPhotosUpload}
            progressPhotos={progressPhotos}
            setProgressPhotos={setProgressPhotos}
            onInspectionReportsUpload={onInspectionReportsUpload}
            inspectionReports={inspectionReports}
            setInspectionReports={setInspectionReports}
            onCompletionCertificateUpload={onCompletionCertificateUpload}
            completionCertificate={completionCertificate}
            setCompletionCertificate={setCompletionCertificate}
            backendBaseUrl={backendBaseUrl}
          />
        </>
      ),
      'Renovation and Remodeling Services': () => (
        <>
          <BuildingDetails inquiry={inquiry} />
          <ConstructionDetails
            inquiry={inquiry}
            constructionPhase={constructionPhase}
            progressPercentage={progressPercentage}
            permitStatus={permitStatus}
            onConstructionPhaseChange={onConstructionPhaseChange}
            onProgressPercentageChange={onProgressPercentageChange}
            onPermitStatusChange={onPermitStatusChange}
            onUpdateProgress={onUpdateProgress}
            onProgressPhotosUpload={onProgressPhotosUpload}
            progressPhotos={progressPhotos}
            setProgressPhotos={setProgressPhotos}
            onInspectionReportsUpload={onInspectionReportsUpload}
            inspectionReports={inspectionReports}
            setInspectionReports={setInspectionReports}
            onCompletionCertificateUpload={onCompletionCertificateUpload}
            completionCertificate={completionCertificate}
            setCompletionCertificate={setCompletionCertificate}
            backendBaseUrl={backendBaseUrl}
          />
        </>
      ),
      'Post-Construction Maintenance': () => (
        <MaintenanceDetails inquiry={inquiry} backendBaseUrl={backendBaseUrl} />
      ),
      'Workplace Safety Training Modules': () => (
        <TrainingDetails
          inquiry={inquiry}
          onOpenEmailDialog={onOpenEmailDialog}
          onCertificateUpload={onCertificateUpload}
          certificateFile={certificateFile}
          setCertificateFile={setCertificateFile}
          backendBaseUrl={backendBaseUrl}
        />
      ),
    };

    const handler = serviceHandlers[inquiry.sub_service];
    return handler ? (
      <>
        {handler()}
        {isEngineeringConsulting && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ 
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              mb: 2
            }}>
              Engineering Consulting Documents
            </Typography>
            <Box sx={{ bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
              {/* Structural Design */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
                  Structural Design:
                </Typography>
                {serviceData.structural_design ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Link 
                        href={`${backendBaseUrl}${serviceData.structural_design}`} 
                        target="_blank"
                        sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                      </Link>
                      <Link 
                        href={`${backendBaseUrl}${serviceData.structural_design}`} 
                        download
                        sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                      </Link>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, pl: 2 }}>
                    <Input
                      type="file"
                      onChange={(e) => setStructuralDesign(e.target.files[0])}
                      inputProps={{ accept: 'application/pdf,image/*' }}
                      sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={onStructuralDesignUpload}
                      disabled={!structuralDesign}
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Upload Structural Design
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Structural Report */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
                  Structural Report:
                </Typography>
                {serviceData.structural_report ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Link 
                        href={`${backendBaseUrl}${serviceData.structural_report}`} 
                        target="_blank"
                        sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                      </Link>
                      <Link 
                        href={`${backendBaseUrl}${serviceData.structural_report}`} 
                        download
                        sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                      </Link>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, pl: 2 }}>
                    <Input
                      type="file"
                      onChange={(e) => setStructuralReport(e.target.files[0])}
                      inputProps={{ accept: 'application/pdf' }}
                      sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={onStructuralReportUpload}
                      disabled={!structuralReport}
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Upload Structural Report
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Architectural Design */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
                  Architectural Design:
                </Typography>
                {serviceData.architectural_design ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Link 
                        href={`${backendBaseUrl}${serviceData.architectural_design}`} 
                        target="_blank"
                        sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                      </Link>
                      <Link 
                        href={`${backendBaseUrl}${serviceData.architectural_design}`} 
                        download
                        sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                      </Link>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, pl: 2 }}>
                    <Input
                      type="file"
                      onChange={(e) => setArchitecturalDesign(e.target.files[0])}
                      inputProps={{ accept: 'application/pdf,image/*' }}
                      sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={onArchitecturalDesignUpload}
                      disabled={!architecturalDesign}
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Upload Architectural Design
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Cost Estimation Files */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
                  Cost Estimation Files:
                </Typography>
                {serviceData.cost_estimation_files ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Link 
                        href={`${backendBaseUrl}${serviceData.cost_estimation_files}`} 
                        target="_blank"
                        sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                      </Link>
                      <Link 
                        href={`${backendBaseUrl}${serviceData.cost_estimation_files}`} 
                        download
                        sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                      </Link>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, pl: 2 }}>
                    <Input
                      type="file"
                      onChange={(e) => setCostEstimationFiles(e.target.files[0])}
                      inputProps={{ accept: 'application/pdf' }}
                      sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={onCostEstimationFilesUpload}
                      disabled={!costEstimationFiles}
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Upload Cost Estimation Files
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Rate Analysis */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
                  Rate Analysis:
                </Typography>
                {serviceData.rate_analysis ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Link 
                        href={`${backendBaseUrl}${serviceData.rate_analysis}`} 
                        target="_blank"
                        sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                      </Link>
                      <Link 
                        href={`${backendBaseUrl}${serviceData.rate_analysis}`} 
                        download
                        sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                      </Link>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, pl: 2 }}>
                    <Input
                      type="file"
                      onChange={(e) => setRateAnalysis(e.target.files[0])}
                      inputProps={{ accept: 'application/pdf' }}
                      sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={onRateAnalysisUpload}
                      disabled={!rateAnalysis}
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Upload Rate Analysis
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        )}
        <PaymentDetails inquiry={inquiry} />
        <CommentsSection
          inquiry={inquiry}
          commentText={commentText}
          setCommentText={setCommentText}
          onAddComment={onAddComment}
          replyText={replyText}
          setReplyText={setReplyText}
          replyingToCommentId={replyingToCommentId}
          setReplyingToCommentId={setReplyingToCommentId}
          onAddReply={onAddReply}
          replyStatus={replyStatus}
          formatDate={formatDate}
        />
      </>
    ) : null;
  };

  return (
    <Card 
      sx={{ 
        mb: 3, 
        borderRadius: 3,
        borderLeft: isNew ? `4px solid ${theme.palette.error.main}` : `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[4],
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
          borderLeft: `4px solid ${theme.palette.primary.main}`
        },
        bgcolor: 'white'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ 
              bgcolor: theme.palette.primary.main, 
              mr: 2,
              width: 48,
              height: 48
            }}>
              <PersonIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                {inquiry.full_name}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Inquiry ID: #{inquiry.id}
              </Typography>
            </Box>
            {isNew && (
              <Chip
                label="NEW"
                color="error"
                size="small"
                sx={{ 
                  ml: 2,
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  height: 24,
                  borderRadius: 2
                }}
              />
            )}
          </Box>
          <IconButton onClick={onToggleDetails}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        <Box sx={{ pl: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
              {inquiry.location}
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
              {inquiry.email}
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
              {inquiry.phone_number}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <CategoryIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
              <strong>Category:</strong> {inquiry.category}
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <BuildIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
              <strong>Sub-Service:</strong> {inquiry.sub_service}
            </Typography>
          </Box>
        </Box>

        <Collapse in={isExpanded}>
          <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
            {renderDetails()}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="body2" sx={{ mr: 1, fontWeight: 'bold', color: theme.palette.text.primary }}>
                  Status:
                </Typography>
                {inquiry.category === 'Building Construction Services' ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <FormControl sx={{ minWidth: 200 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={inquiryStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                        label="Status"
                        sx={{ bgcolor: 'white', borderRadius: 2 }}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Scheduled">Scheduled</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="No-Show">No-Show</MenuItem>
                        <MenuItem value="Permit Processing">Permit Processing</MenuItem>
                        <MenuItem value="Under Construction">Under Construction</MenuItem>
                        <MenuItem value="Awaiting Inspection">Awaiting Inspection</MenuItem>
                        <MenuItem value="Finishing">Finishing</MenuItem>
                        <MenuItem value="Handover Pending">Handover Pending</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => onStatusChange('Scheduled')}
                      sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                    >
                      Reschedule
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={inquiryStatus}
                      color={getStatusColor(inquiryStatus)}
                      size="small"
                      sx={{ fontWeight: 'bold', borderRadius: 2 }}
                    />
                    {inquiryStatus === 'Pending' && (
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        onClick={() => onStatusChange('Scheduled')}
                        sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                      >
                        Reschedule
                      </Button>
                    )}
                    {inquiryStatus === 'Scheduled' && (
                      <>
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          onClick={() => onStatusChange('Pending')}
                          sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                        >
                          Mark as Pending
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => onStatusChange('Completed')}
                          sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                        >
                          Mark as Completed
                        </Button>
                      </>
                    )}
                  </Box>
                )}
              </Box>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                Submitted: {formatDate(inquiry.created_at)}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default InquiryCard;
