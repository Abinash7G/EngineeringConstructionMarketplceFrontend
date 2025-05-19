import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Visibility as VisibilityIcon, GetApp as DownloadIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const MaintenanceDetails = ({ inquiry, backendBaseUrl }) => {
  const theme = useTheme();
  const serviceData = inquiry.service_data || {};

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ 
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        mb: 2
      }}>
        Maintenance Information
      </Typography>
      <Box sx={{ pl: 2, bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
        {[
          ['Maintenance Type', serviceData.maintenance_type],
          ['Maintenance Details', serviceData.maintenance_details],
          ['Preferred Date', serviceData.preferred_date],
          ['Preferred Time', serviceData.preferred_time],
          ['Payment Agreed', serviceData.payment_agreed ? 'Yes' : 'No'],
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
        {serviceData.maintenance_photos && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
              Maintenance Photos:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link 
                href={`${backendBaseUrl}${serviceData.maintenance_photos}`} 
                target="_blank"
                sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
              </Link>
              <Link 
                href={`${backendBaseUrl}${serviceData.maintenance_photos}`} 
                download
                sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
              </Link>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MaintenanceDetails;