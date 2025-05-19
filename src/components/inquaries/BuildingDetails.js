// // import React from 'react';
// // import { Box, Typography, Link } from '@mui/material';
// // import { Visibility as VisibilityIcon, GetApp as DownloadIcon } from '@mui/icons-material';
// // import { useTheme } from '@mui/material/styles';

// // const BuildingDetails = ({ inquiry, isDocumentOnly = false }) => {
// //   const theme = useTheme();
// //   const serviceData = inquiry.service_data || {};

// //   const renderBuildingInfo = () => {
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
// //       </Box>
// //     );
// //   };

// //   const renderDocuments = () => {
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
// //                     href={`http://127.0.0.1:8000${value}`} 
// //                     target="_blank"
// //                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
// //                   >
// //                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
// //                   </Link>
// //                   <Link 
// //                     href={`http://127.0.0.1:8000${value}`} 
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

// //   return isDocumentOnly ? renderDocuments() : renderBuildingInfo();
// // };

// // export default BuildingDetails;
// import React from 'react';
// import { Box, Typography, Link, Input, Button } from '@mui/material';
// import { Visibility as VisibilityIcon, GetApp as DownloadIcon } from '@mui/icons-material';
// import { useTheme } from '@mui/material/styles';

// const BuildingDetails = ({
//   inquiry,
//   isDocumentOnly = false,
//   onStructuralDesignUpload,
//   structuralDesign,
//   setStructuralDesign,
//   onStructuralReportUpload,
//   structuralReport,
//   setStructuralReport,
//   onArchitecturalDesignUpload,
//   architecturalDesign,
//   setArchitecturalDesign,
//   onCostEstimationFilesUpload,
//   costEstimationFiles,
//   setCostEstimationFiles,
//   onRateAnalysisUpload,
//   rateAnalysis,
//   setRateAnalysis,
//   backendBaseUrl,
// }) => {
//   const theme = useTheme();
//   const serviceData = inquiry.service_data || {};

//   const renderBuildingInfo = () => {
//     let fields = [];
//     if (inquiry.sub_service === 'Comprehensive Building Planning & Design') {
//       fields = [
//         ['Type of Building', serviceData.type_of_building],
//         ['Building Purpose', serviceData.building_purpose],
//         ['Number of Floors', serviceData.num_floors],
//         ['Estimated Land Area', serviceData.land_area],
//         ['Preferred Architectural Style', serviceData.architectural_style],
//         ['Architectural Style (Other)', serviceData.architectural_style_other],
//         ['Budget Estimate', serviceData.budget_estimate],
//         ['Special Requirements', serviceData.special_requirements],
//       ];
//     } else if (inquiry.sub_service === 'Construction Management & Cost Estimation') {
//       fields = [
//         ['Type of Building', serviceData.type_of_building],
//         ['Building Purpose', serviceData.building_purpose],
//         ['Number of Floors', serviceData.num_floors],
//         ['Land Area', serviceData.land_area],
//         ['Budget Estimate', serviceData.budget_estimate],
//         ['Special Requirements', serviceData.special_requirements],
//       ];
//     } else if (inquiry.sub_service === 'Structural & Geotechnical Consultation') {
//       fields = [
//         ['Type of Building', serviceData.type_of_building],
//         ['Building Purpose', serviceData.building_purpose],
//         ['Number of Floors', serviceData.num_floors],
//         ['Land Area', serviceData.land_area],
//         ['Special Requirements', serviceData.special_requirements],
//       ];
//     } else if (inquiry.sub_service === 'MEP System Design (Mechanical, Electrical & Plumbing)') {
//       fields = [
//         ['Type of Building', serviceData.type_of_building],
//         ['Special Requirements', serviceData.special_requirements],
//       ];
//     }

//     return (
//       <Box sx={{ mt: 2 }}>
//         <Typography variant="h6" sx={{ 
//           color: theme.palette.primary.main,
//           fontWeight: 'bold',
//           mb: 2
//         }}>
//           {inquiry.sub_service} Information
//         </Typography>
//         <Box sx={{ 
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//           gap: 2,
//           pl: 2,
//           bgcolor: theme.palette.grey[50],
//           p: 2,
//           borderRadius: 2
//         }}>
//           {fields.map(([label, value], index) => (
//             value && (
//               <Box key={index} sx={{ display: 'flex', gap: 1 }}>
//                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
//                   {label}:
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
//                   {value}
//                 </Typography>
//               </Box>
//             )
//           ))}
//         </Box>
//       </Box>
//     );
//   };

//   const renderDocuments = () => {
//     return (
//       <>
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6" sx={{ 
//             color: theme.palette.primary.main,
//             fontWeight: 'bold',
//             mb: 2
//           }}>
//             General Documents
//           </Typography>
//           <Box sx={{ bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
//             {Object.entries({
//               'Site Plan': serviceData.site_plan,
//               'Architectural Plan': serviceData.architectural_plan,
//               'Soil Test Report': serviceData.soil_test_report,
//               'Foundation Design': serviceData.foundation_design,
//               'Electrical Plan': serviceData.electrical_plan,
//               'Plumbing Plan': serviceData.plumbing_plan,
//               'HVAC Plan': serviceData.hvac_plan,
//               'Construction Permit': serviceData.construction_permit,
//               'Cost Estimation': serviceData.cost_estimation,
//             }).map(([key, value]) => (
//               value && (
//                 <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
//                   <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
//                     {key.replace(/_/g, ' ').toUpperCase()}:
//                   </Typography>
//                   <Box sx={{ display: 'flex', gap: 1 }}>
//                     <Link 
//                       href={`${backendBaseUrl}${value}`} 
//                       target="_blank"
//                       sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                     >
//                       <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
//                     </Link>
//                     <Link 
//                       href={`${backendBaseUrl}${value}`} 
//                       download
//                       sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                     >
//                       <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
//                     </Link>
//                   </Box>
//                 </Box>
//               )
//             ))}
//           </Box>
//         </Box>

//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6" sx={{ 
//             color: theme.palette.primary.main,
//             fontWeight: 'bold',
//             mb: 2
//           }}>
//             Structural Design
//           </Typography>
//           <Box sx={{ bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
//             {serviceData.structural_design ? (
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
//                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
//                   Structural Design:
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <Link 
//                     href={`${backendBaseUrl}${serviceData.structural_design}`} 
//                     target="_blank"
//                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                   >
//                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
//                   </Link>
//                   <Link 
//                     href={`${backendBaseUrl}${serviceData.structural_design}`} 
//                     download
//                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                   >
//                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
//                   </Link>
//                 </Box>
//               </Box>
//             ) : (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, pl: 2 }}>
//                 <Input
//                   type="file"
//                   onChange={(e) => setStructuralDesign(e.target.files[0])}
//                   inputProps={{ accept: 'application/pdf,image/*' }}
//                   sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   onClick={onStructuralDesignUpload}
//                   disabled={!structuralDesign}
//                   sx={{ borderRadius: 2, textTransform: 'none' }}
//                 >
//                   Upload Structural Design
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         </Box>

//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6" sx={{ 
//             color: theme.palette.primary.main,
//             fontWeight: 'bold',
//             mb: 2
//           }}>
//             Structural Report
//           </Typography>
//           <Box sx={{ bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
//             {serviceData.structural_report ? (
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
//                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
//                   Structural Report:
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <Link 
//                     href={`${backendBaseUrl}${serviceData.structural_report}`} 
//                     target="_blank"
//                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                   >
//                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
//                   </Link>
//                   <Link 
//                     href={`${backendBaseUrl}${serviceData.structural_report}`} 
//                     download
//                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                   >
//                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
//                   </Link>
//                 </Box>
//               </Box>
//             ) : (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, pl: 2 }}>
//                 <Input
//                   type="file"
//                   onChange={(e) => setStructuralReport(e.target.files[0])}
//                   inputProps={{ accept: 'application/pdf' }}
//                   sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   onClick={onStructuralReportUpload}
//                   disabled={!structuralReport}
//                   sx={{ borderRadius: 2, textTransform: 'none' }}
//                 >
//                   Upload Structural Report
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         </Box>

//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6" sx={{ 
//             color: theme.palette.primary.main,
//             fontWeight: 'bold',
//             mb: 2
//           }}>
//             Architectural Design
//           </Typography>
//           <Box sx={{ bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
//             {serviceData.architectural_design ? (
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
//                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
//                   Architectural Design:
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <Link 
//                     href={`${backendBaseUrl}${serviceData.architectural_design}`} 
//                     target="_blank"
//                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                   >
//                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
//                   </Link>
//                   <Link 
//                     href={`${backendBaseUrl}${serviceData.architectural_design}`} 
//                     download
//                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                   >
//                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
//                   </Link>
//                 </Box>
//               </Box>
//             ) : (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, pl: 2 }}>
//                 <Input
//                   type="file"
//                   onChange={(e) => setArchitecturalDesign(e.target.files[0])}
//                   inputProps={{ accept: 'application/pdf,image/*' }}
//                   sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   onClick={onArchitecturalDesignUpload}
//                   disabled={!architecturalDesign}
//                   sx={{ borderRadius: 2, textTransform: 'none' }}
//                 >
//                   Upload Architectural Design
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         </Box>

//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6" sx={{ 
//             color: theme.palette.primary.main,
//             fontWeight: 'bold',
//             mb: 2
//           }}>
//             Cost Estimation Files
//           </Typography>
//           <Box sx={{ bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
//             {serviceData.cost_estimation_files ? (
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
//                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
//                   Cost Estimation Files:
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <Link 
//                     href={`${backendBaseUrl}${serviceData.cost_estimation_files}`} 
//                     target="_blank"
//                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                   >
//                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
//                   </Link>
//                   <Link 
//                     href={`${backendBaseUrl}${serviceData.cost_estimation_files}`} 
//                     download
//                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                   >
//                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
//                   </Link>
//                 </Box>
//               </Box>
//             ) : (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, pl: 2 }}>
//                 <Input
//                   type="file"
//                   onChange={(e) => setCostEstimationFiles(e.target.files[0])}
//                   inputProps={{ accept: 'application/pdf' }}
//                   sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   onClick={onCostEstimationFilesUpload}
//                   disabled={!costEstimationFiles}
//                   sx={{ borderRadius: 2, textTransform: 'none' }}
//                 >
//                   Upload Cost Estimation Files
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         </Box>

//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6" sx={{ 
//             color: theme.palette.primary.main,
//             fontWeight: 'bold',
//             mb: 2
//           }}>
//             Rate Analysis
//           </Typography>
//           <Box sx={{ bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
//             {serviceData.rate_analysis ? (
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
//                 <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
//                   Rate Analysis:
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <Link 
//                     href={`${backendBaseUrl}${serviceData.rate_analysis}`} 
//                     target="_blank"
//                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                   >
//                     <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} /> View
//                   </Link>
//                   <Link 
//                     href={`${backendBaseUrl}${serviceData.rate_analysis}`} 
//                     download
//                     sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                   >
//                     <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} /> Download
//                   </Link>
//                 </Box>
//               </Box>
//             ) : (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, pl: 2 }}>
//                 <Input
//                   type="file"
//                   onChange={(e) => setRateAnalysis(e.target.files[0])}
//                   inputProps={{ accept: 'application/pdf' }}
//                   sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   onClick={onRateAnalysisUpload}
//                   disabled={!rateAnalysis}
//                   sx={{ borderRadius: 2, textTransform: 'none' }}
//                 >
//                   Upload Rate Analysis
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         </Box>
//       </>
//     );
//   };

//   return isDocumentOnly ? renderDocuments() : renderBuildingInfo();
// };

// export default BuildingDetails;

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
