
import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Visibility as VisibilityIcon, GetApp as DownloadIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const BuildingDetails = ({ inquiry, isDocumentOnly = false, backendBaseUrl }) => {
  const theme = useTheme();
  const serviceData = inquiry.service_data || {};

  const renderBuildingInfo = () => {
    let fields = [];
    if (inquiry.sub_service === 'Comprehensive Building Planning & Design') {
      fields = [
        ['Type of Building', serviceData.type_of_building],
        ['Building Purpose', serviceData.building_purpose],
        ['Number of Floors', serviceData.num_floors],
        ['Estimated Land Area', serviceData.land_area],
        ['Preferred Architectural Style', serviceData.architectural_style],
        ['Architectural Style (Other)', serviceData.architectural_style_other],
        ['Budget Estimate', serviceData.budget_estimate],
        ['Special Requirements', serviceData.special_requirements],
      ];
    } else if (inquiry.sub_service === 'Construction Management & Cost Estimation') {
      fields = [
        ['Type of Building', serviceData.type_of_building],
        ['Building Purpose', serviceData.building_purpose],
        ['Number of Floors', serviceData.num_floors],
        ['Land Area', serviceData.land_area],
        ['Budget Estimate', serviceData.budget_estimate],
        ['Special Requirements', serviceData.special_requirements],
      ];
    } else if (inquiry.sub_service === 'Structural & Geotechnical Consultation') {
      fields = [
        ['Type of Building', serviceData.type_of_building],
        ['Building Purpose', serviceData.building_purpose],
        ['Number of Floors', serviceData.num_floors],
        ['Land Area', serviceData.land_area],
        ['Special Requirements', serviceData.special_requirements],
      ];
    } else if (inquiry.sub_service === 'MEP System Design (Mechanical, Electrical & Plumbing)') {
      fields = [
        ['Type of Building', serviceData.type_of_building],
        ['Special Requirements', serviceData.special_requirements],
      ];
    }

    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ 
          color: theme.palette.primary.main,
          fontWeight: 'bold',
          mb: 2
        }}>
          {inquiry.sub_service} Information
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 2,
          pl: 2,
          bgcolor: theme.palette.grey[50],
          p: 2,
          borderRadius: 2
        }}>
          {fields.map(([label, value], index) => (
            value && (
              <Box key={index} sx={{ display: 'flex', gap: 1 }}>
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
      </Box>
    );
  };

  const renderDocuments = () => {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ 
          color: theme.palette.primary.main,
          fontWeight: 'bold',
          mb: 2
        }}>
          General Documents
        </Typography>
        <Box sx={{ bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
          {Object.entries({
            'Site Plan': serviceData.site_plan,
            'Architectural Plan': serviceData.architectural_plan,
            'Soil Test Report': serviceData.soil_test_report,
            'Foundation Design': serviceData.foundation_design,
            'Electrical Plan': serviceData.electrical_plan,
            'Plumbing Plan': serviceData.plumbing_plan,
            'HVAC Plan': serviceData.hvac_plan,
            'Construction Permit': serviceData.construction_permit,
            'Cost Estimation': serviceData.cost_estimation,
          }).map(([key, value]) => (
            value && (
              <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
                  {key.replace(/_/g, ' ').toUpperCase()}:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Link 
                    href={`${backendBaseUrl}${value}`} 
                    target="_blank"
                    sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
                  </Link>
                  <Link 
                    href={`${backendBaseUrl}${value}`} 
                    download
                    sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
                  </Link>
                </Box>
              </Box>
            )
          ))}
        </Box>
      </Box>
    );
  };

  return isDocumentOnly ? renderDocuments() : renderBuildingInfo();
};

export default BuildingDetails;
