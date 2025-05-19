import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Input,
  Link,
} from '@mui/material';
import { Visibility as VisibilityIcon, GetApp as DownloadIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ConstructionDetails = ({
  inquiry,
  constructionPhase,
  progressPercentage,
  permitStatus,
  onConstructionPhaseChange,
  onProgressPercentageChange,
  onPermitStatusChange,
  onUpdateProgress,
  onProgressPhotosUpload,
  progressPhotos,
  setProgressPhotos,
  onInspectionReportsUpload,
  inspectionReports,
  setInspectionReports,
  onCompletionCertificateUpload,
  completionCertificate,
  setCompletionCertificate,
  backendBaseUrl,
}) => {
  const theme = useTheme();
  const serviceData = inquiry.service_data || {};

  return (
    <Box sx={{ mt: 3, borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
      <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
        Construction Progress
      </Typography>
      <Box sx={{ pl: 2, bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
            Update Construction Progress
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Construction Phase</InputLabel>
              <Select
                value={constructionPhase}
                onChange={(e) => onConstructionPhaseChange(e.target.value)}
                label="Construction Phase"
                sx={{ bgcolor: 'white', borderRadius: 2 }}
              >
                <MenuItem value=""><em>Select Phase</em></MenuItem>
                <MenuItem value="Foundation">Foundation</MenuItem>
                <MenuItem value="Walls">Walls</MenuItem>
                <MenuItem value="Excavation">Excavation</MenuItem>
                <MenuItem value="Columns Casting">Columns Casting</MenuItem>
                <MenuItem value="Beams Casting">Beams Casting</MenuItem>
                <MenuItem value="Slab Casting">Slab Casting</MenuItem>
                <MenuItem value="Roofing">Roofing</MenuItem>
                <MenuItem value="Electrical & Plumbing">Electrical & Plumbing</MenuItem>
                <MenuItem value="Plastering">Plastering</MenuItem>
                <MenuItem value="Finishing">Finishing</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Progress Percentage"
              type="number"
              value={progressPercentage}
              onChange={(e) => onProgressPercentageChange(e.target.value)}
              inputProps={{ min: 0, max: 100 }}
              sx={{ maxWidth: 150, bgcolor: 'white', borderRadius: 2 }}
              variant="outlined"
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Permit Status</InputLabel>
              <Select
                value={permitStatus}
                onChange={(e) => onPermitStatusChange(e.target.value)}
                label="Permit Status"
                sx={{ bgcolor: 'white', borderRadius: 2 }}
              >
                <MenuItem value=""><em>Select Status</em></MenuItem>
                <MenuItem value="Submitted">Submitted</MenuItem>
                <MenuItem value="Under Review">Under Review</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={onUpdateProgress}
              disabled={!constructionPhase || !progressPercentage || !permitStatus}
              sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
            >
              Update Progress
            </Button>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
          Common Documents
        </Typography>
        {Object.entries({
          'Lalpurja': serviceData.lalpurja,
          'Napi Naksa': serviceData.napi_naksa,
          'Tax Clearance': serviceData.tax_clearance,
          'Approved Building Drawings': serviceData.approved_building_drawings,
        }).map(([key, value]) => (
          value && (
            <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
                {key.toUpperCase()}:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Link href={`${backendBaseUrl}${value}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                </Link>
                <Link href={`${backendBaseUrl}${value}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                </Link>
              </Box>
            </Box>
          )
        ))}

        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2, mt: 2 }}>
          Uploaded Documents
        </Typography>
        {inquiry.sub_service === 'Residential Construction' && Object.entries({
          'Soil Test Report': serviceData.soil_test_report,
          'Structural Stability Certificate': serviceData.structural_stability_certificate,
          'House Design Approval': serviceData.house_design_approval,
          'Neighbour Consent': serviceData.neighbour_consent,
        }).map(([key, value]) => (
          value && (
            <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
                {key.toUpperCase()}:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Link href={`${backendBaseUrl}${value}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                </Link>
                <Link href={`${backendBaseUrl}${value}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                </Link>
              </Box>
            </Box>
          )
        ))}
        {inquiry.sub_service === 'Commercial Construction' && Object.entries({
          'IEE Report': serviceData.iee_report,
          'Fire Safety Certificate': serviceData.fire_safety_certificate,
          'Lift Permit': serviceData.lift_permit,
          'Parking Layout Plan': serviceData.parking_layout_plan,
        }).map(([key, value]) => (
          value && (
            <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
                {key.toUpperCase()}:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Link href={`${backendBaseUrl}${value}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                </Link>
                <Link href={`${backendBaseUrl}${value}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                </Link>
              </Box>
            </Box>
          )
        ))}
        {inquiry.sub_service === 'Renovation and Remodeling Services' && Object.entries({
          'Owner Permission Letter': serviceData.owner_permission_letter,
          'Existing Structure Analysis': serviceData.existing_structure_analysis,
          'Renovation Plan': serviceData.renovation_plan,
          'NOC Municipality': serviceData.noc_municipality,
          'Waste Management Plan': serviceData.waste_management_plan,
        }).map(([key, value]) => (
          value && (
            <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
                {key.toUpperCase()}:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Link href={`${backendBaseUrl}${value}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                </Link>
                <Link href={`${backendBaseUrl}${value}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                </Link>
              </Box>
            </Box>
          )
        ))}

        <Box sx={{ mb: 2, mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
            Progress Photos:
          </Typography>
          {serviceData.progress_photos && serviceData.progress_photos.length > 0 && (
            <Box sx={{ mb: 1, pl: 2 }}>
              {serviceData.progress_photos.map((photo, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ minWidth: '160px', color: theme.palette.text.primary }}>
                    Progress Photo {index + 1}:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link href={`${backendBaseUrl}${photo}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                    </Link>
                    <Link href={`${backendBaseUrl}${photo}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                    </Link>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Input
              type="file"
              multiple
              onChange={(e) => setProgressPhotos(e.target.files)}
              inputProps={{ accept: 'image/*,application/pdf' }}
              sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={onProgressPhotosUpload}
              disabled={!progressPhotos}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Upload Progress Photos
            </Button>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
            Inspection Reports:
          </Typography>
          {serviceData.inspection_reports && serviceData.inspection_reports.length > 0 && (
            <Box sx={{ mb: 1, pl: 2 }}>
              {serviceData.inspection_reports.map((report, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ minWidth: '160px', color: theme.palette.text.primary }}>
                    Inspection Report {index + 1}:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link href={`${backendBaseUrl}${report}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                    </Link>
                    <Link href={`${backendBaseUrl}${report}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                    </Link>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Input
              type="file"
              multiple
              onChange={(e) => setInspectionReports(e.target.files)}
              inputProps={{ accept: 'application/pdf,image/*' }}
              sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={onInspectionReportsUpload}
              disabled={!inspectionReports}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Upload Inspection Reports
            </Button>
          </Box>
        </Box>

        {inquiry.status === 'Completed' && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
              Completion Certificate:
            </Typography>
            {serviceData.completion_certificate ? (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
                <Typography variant="body2" sx={{ minWidth: '160px', color: theme.palette.text.primary }}>
                  Completion Certificate:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Link href={`${backendBaseUrl}${serviceData.completion_certificate}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                  </Link>
                  <Link href={`${backendBaseUrl}${serviceData.completion_certificate}`} download sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                  </Link>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Input
                  type="file"
                  onChange={(e) => setCompletionCertificate(e.target.files[0])}
                  inputProps={{ accept: 'application/pdf,image/*' }}
                  sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={onCompletionCertificateUpload}
                  disabled={!completionCertificate}
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Upload Completion Certificate
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ConstructionDetails;