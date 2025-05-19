import React from 'react';
import { Box, Typography, Button, Input, Link } from '@mui/material';
import { Visibility as VisibilityIcon, GetApp as DownloadIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const TrainingDetails = ({
  inquiry,
  onOpenEmailDialog,
  onCertificateUpload,
  certificateFile,
  setCertificateFile,
  backendBaseUrl,
}) => {
  const theme = useTheme();
  const serviceData = inquiry.service_data || {};

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ 
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        mb: 2
      }}>
        Training Information
      </Typography>
      <Box sx={{ pl: 2, bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
        {[
          ['Language Preference', serviceData.language_preference],
          ['Language Preference (Other)', serviceData.language_preference_other],
          ['Training Date', serviceData.training_date],
          ['Training Time', serviceData.training_time],
          ['Training Location', serviceData.training_location || inquiry.location],
          ['Training Agreement', serviceData.training_agreement ? 'Yes' : 'No'],
        ].map(([label, value], index) => (
          value && (
            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
                {label}:
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                {value}
              </Typography>
            </Box>
          )
        ))}
      </Box>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        {inquiry.category === 'Safety and Training Services' && inquiry.status !== 'Completed' && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onOpenEmailDialog(inquiry)}
            sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
          >
            Send Email
          </Button>
        )}
      </Box>
      {inquiry.status === 'Completed' && inquiry.category === 'Safety and Training Services' && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            mb: 2
          }}>
            Certificate
          </Typography>
          {inquiry.certificate ? (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 2, color: theme.palette.text.primary }}>
                Certificate Uploaded:
              </Typography>
              <Link href={`${backendBaseUrl}${inquiry.certificate}`} target="_blank" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                View/Download
              </Link>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Input
                type="file"
                onChange={(e) => setCertificateFile(e.target.files[0])}
                inputProps={{ accept: 'application/pdf,image/*' }}
                sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={onCertificateUpload}
                disabled={!certificateFile}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Upload Certificate
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TrainingDetails;