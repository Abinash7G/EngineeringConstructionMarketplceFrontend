// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import API from "../services/api";
// // import {
// //   Container,
// //   Typography,
// //   Box,
// //   TextField,
// //   Select,
// //   MenuItem,
// //   InputLabel,
// //   FormControl,
// //   Button,
// //   Link,
// //   Snackbar,
// //   Alert,
// // } from "@mui/material";

// // const CompanyRegistration = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     companyType: "",
// //     companyName: "",
// //     companyEmail: "",
// //     companyRegistrationId: "",
// //     location: "",
// //   });

// //   const [openSnackbar, setOpenSnackbar] = useState(false);
// //   const [message, setMessage] = useState("");
// //   const [severity, setSeverity] = useState("success");

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };
  
// //   // src/components/CompanyRegistration.js
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const payload = {
// //         company_type: formData.companyType,
// //         company_name: formData.companyName,
// //         company_email: formData.companyEmail,
// //         company_registration_id: formData.companyRegistrationId,
// //         location: formData.location,
// //     };

// //     if (!payload.company_type || !payload.company_name || !payload.company_email) {
// //         setMessage("Please fill out all required fields.");
// //         setSeverity("error");
// //         setOpenSnackbar(true);
// //         return;
// //     }

// //     try {
// //         const response = await API.post("/company-registration/", payload);
// //         if (response.status === 201) {
// //             setMessage(response.data.message || "Company registered successfully!");
// //             setSeverity("success");
// //             setOpenSnackbar(true);

// //             // Clear form fields after successful registration
// //             setFormData({
// //                 companyType: "",
// //                 companyName: "",
// //                 companyEmail: "",
// //                 companyRegistrationId: "",
// //                 location: "",
// //             });
// //         } else {
// //             throw new Error("Unexpected response status");
// //         }
// //     } catch (error) {
// //         if (error.response && error.response.data) {
// //             const errorMsg = error.response.data.error || "An error occurred during registration.";
// //             setMessage(JSON.stringify(errorMsg));  // Show the full error for debugging
// //         } else {
// //             setMessage("Registration failed. Please try again.");
// //         }
// //         setSeverity("error");
// //         setOpenSnackbar(true);
// //         console.error("Registration error:", error.response?.data || error.message);
// //     }
// //   };
// //   // const handleSubmit = async (e) => {
// //   //   e.preventDefault();

// //   //   const payload = {
// //   //     company_type: formData.companyType,
// //   //     company_name: formData.companyName,
// //   //     company_email: formData.companyEmail,
// //   //     company_registration_id: formData.companyRegistrationId,
// //   //     location: formData.location,
// //   //   };

// //   //   if (!payload.company_type || !payload.company_name || !payload.company_email) {
// //   //     setMessage("Please fill out all required fields.");
// //   //     setSeverity("error");
// //   //     setOpenSnackbar(true);
// //   //     return;
// //   //   }

// //   //   try {
// //   //     const response = await API.post("/company-registration/", payload);
// //   //     setMessage(response.data.message || "Company registered successfully!");
// //   //     setSeverity("success");
// //   //     setOpenSnackbar(true);

// //   //     // Clear form fields after successful registration
// //   //     setFormData({
// //   //       companyType: "",
// //   //       companyName: "",
// //   //       companyEmail: "",
// //   //       companyRegistrationId: "",
// //   //       location: "",
// //   //     });
// //   //   } catch (error) {
// //   //     if (error.response && error.response.data) {
// //   //       console.error("Backend Error:", error.response.data);
// //   //       setMessage(error.response.data.error || "An error occurred.");
// //   //     } else {
// //   //       setMessage("Registration failed. Please try again.");
// //   //     }
// //   //     setSeverity("error");
// //   //     setOpenSnackbar(true);
// //   //   }
// //   // };

// //   return (
// //     <Container
// //       maxWidth="sm"
// //       sx={{
// //         mt: 4,
// //         p: 3,
// //         boxShadow: 3,
// //         borderRadius: 2,
// //         bgcolor: "#f9f9f9",
// //       }}
// //     >
// //       <Typography variant="h4" align="center" gutterBottom sx={{ color: "#0073e6" }}>
// //         Company Registration
// //       </Typography>
// //       <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
// //         <FormControl fullWidth variant="outlined" required>
// //           <InputLabel>Company Type</InputLabel>
// //           <Select
// //             name="companyType"
// //             value={formData.companyType}
// //             onChange={handleChange}
// //             label="Company Type"
// //           >
// //             <MenuItem value="">
// //               <em>Select Company Type</em>
// //             </MenuItem>
// //             <MenuItem value="construction">Construction Company</MenuItem>
// //             <MenuItem value="supplier">Material Supplier</MenuItem>
// //           </Select>
// //         </FormControl>
// //         <TextField label="Company Name" name="companyName" variant="outlined" value={formData.companyName} onChange={handleChange} fullWidth required />
// //         <TextField label="Company Email" name="companyEmail" type="email" variant="outlined" value={formData.companyEmail} onChange={handleChange} fullWidth required />
// //         <TextField label="Company Registration ID" name="companyRegistrationId" variant="outlined" value={formData.companyRegistrationId} onChange={handleChange} fullWidth required />
// //         <TextField label="Location" name="location" variant="outlined" value={formData.location} onChange={handleChange} fullWidth required />
// //         <Button type="submit" variant="contained" color="primary" fullWidth>
// //           Register
// //         </Button>
// //       </Box>
// //       <Typography variant="body2" align="center" sx={{ mt: 2 }}>
// //         Already have an account?{" "}
// //         <Link component="button" variant="body2" onClick={() => navigate("/login")} sx={{ color: "#0073e6", textDecoration: "underline" }}>
// //           Log in
// //         </Link>
// //       </Typography>
// //       <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
// //         <Alert onClose={() => setOpenSnackbar(false)} severity={severity} sx={{ width: "100%" }}>
// //           {message}
// //         </Alert>
// //       </Snackbar>
// //     </Container>
// //   );
// // };

// // export default CompanyRegistration;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import {
//   Container,
//   Typography,
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Button,
//   Link,
//   Snackbar,
//   Alert,
//   Checkbox,
//   FormControlLabel
// } from "@mui/material";

// const CompanyRegistration = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     companyType: "",
//     companyName: "",
//     companyEmail: "",
//     companyRegistrationId: "",
//     location: "",
//   });
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [message, setMessage] = useState("");
//   const [severity, setSeverity] = useState("success");
//   const [termsAgreed, setTermsAgreed] = useState(false); // New state for terms checkbox

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleTermsChange = (e) => {
//     setTermsAgreed(e.target.checked);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       company_type: formData.companyType,
//       company_name: formData.companyName,
//       company_email: formData.companyEmail,
//       company_registration_id: formData.companyRegistrationId,
//       location: formData.location,
//     };

//     if (!payload.company_type || !payload.company_name || !payload.company_email) {
//       setMessage("Please fill out all required fields.");
//       setSeverity("error");
//       setOpenSnackbar(true);
//       return;
//     }

//     try {
//       const response = await API.post("/company-registration/", payload);
//       if (response.status === 201) {
//         setMessage(response.data.message || "Company registered successfully!");
//         setSeverity("success");
//         setOpenSnackbar(true);

//         setFormData({
//           companyType: "",
//           companyName: "",
//           companyEmail: "",
//           companyRegistrationId: "",
//           location: "",
//         });
//         setTermsAgreed(false); // Reset terms checkbox
//       } else {
//         throw new Error("Unexpected response status");
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         const errorMsg = error.response.data.error || "An error occurred during registration.";
//         setMessage(JSON.stringify(errorMsg));
//       } else {
//         setMessage("Registration failed. Please try again.");
//       }
//       setSeverity("error");
//       setOpenSnackbar(true);
//       console.error("Registration error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         mt: 4,
//         p: 3,
//         boxShadow: 3,
//         borderRadius: 2,
//         bgcolor: "#f9f9f9",
//       }}
//     >
//       <Typography variant="h4" align="center" gutterBottom sx={{ color: "#0073e6" }}>
//         Company Registration
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         <FormControl fullWidth variant="outlined" required>
//           <InputLabel>Company Type</InputLabel>
//           <Select
//             name="companyType"
//             value={formData.companyType}
//             onChange={handleChange}
//             label="Company Type"
//           >
//             <MenuItem value="">
//               <em>Select Company Type</em>
//             </MenuItem>
//             <MenuItem value="construction">Construction Company</MenuItem>
//             <MenuItem value="supplier">Material Supplier</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField 
//           label="Company Name" 
//           name="companyName" 
//           variant="outlined" 
//           value={formData.companyName} 
//           onChange={handleChange} 
//           fullWidth 
//           required 
//         />
//         <TextField 
//           label="Company Email" 
//           name="companyEmail" 
//           type="email" 
//           variant="outlined" 
//           value={formData.companyEmail} 
//           onChange={handleChange} 
//           fullWidth 
//           required 
//         />
//         <TextField 
//           label="Company Registration ID" 
//           name="companyRegistrationId" 
//           variant="outlined" 
//           value={formData.companyRegistrationId} 
//           onChange={handleChange} 
//           fullWidth 
//           required 
//         />
//         <TextField 
//           label="Location" 
//           name="location" 
//           variant="outlined" 
//           value={formData.location} 
//           onChange={handleChange} 
//           fullWidth 
//           required 
//         />
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={termsAgreed}
//               onChange={handleTermsChange}
//               color="primary"
//             />
//           }
//           label="I agree to the Terms and Conditions"
//         />
//         <Button 
//           type="submit" 
//           variant="contained" 
//           color="primary" 
//           fullWidth
//           disabled={!termsAgreed} // Disable button if terms not agreed
//         >
//           Register
//         </Button>
//       </Box>
//       <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//         Already have an account?{" "}
//         <Link 
//           component="button" 
//           variant="body2" 
//           onClick={() => navigate("/login")} 
//           sx={{ color: "#0073e6", textDecoration: "underline" }}
//         >
//           Log in
//         </Link>
//       </Typography>
//       <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
//         <Alert onClose={() => setOpenSnackbar(false)} severity={severity} sx={{ width: "100%" }}>
//           {message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default CompanyRegistration;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  Container,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Link,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyType: "",
    companyName: "",
    companyEmail: "",
    location: "",
  });
  const [certificateFile, setCertificateFile] = useState(null); // State for file
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCertificateFile(e.target.files[0]); // Store selected file
  };

  const handleTermsChange = (e) => {
    setTermsAgreed(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.companyType || !formData.companyName || !formData.companyEmail || !certificateFile) {
      setMessage("Please fill out all required fields and upload the certificate.");
      setSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    // Create FormData for file upload
    const payload = new FormData();
    payload.append("company_type", formData.companyType);
    payload.append("company_name", formData.companyName);
    payload.append("company_email", formData.companyEmail);
    payload.append("location", formData.location);
    payload.append("registration_certificate", certificateFile);

    try {
      const response = await API.post("/company-registration/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        setMessage(response.data.message || "Company registered successfully!");
        setSeverity("success");
        setOpenSnackbar(true);

        // Clear form fields
        setFormData({
          companyType: "",
          companyName: "",
          companyEmail: "",
          location: "",
        });
        setCertificateFile(null); // Clear file input
        setTermsAgreed(false); // Reset terms checkbox
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMsg = error.response.data.error || "An error occurred during registration.";
        setMessage(JSON.stringify(errorMsg));
      } else {
        setMessage("Registration failed. Please try again.");
      }
      setSeverity("error");
      setOpenSnackbar(true);
      console.error("Registration error:", error.response?.data || error.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "#0073e6" }}>
        Company Registration
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }} encType="multipart/form-data">
        <FormControl fullWidth variant="outlined" required>
          <InputLabel>Company Type</InputLabel>
          <Select
            name="companyType"
            value={formData.companyType}
            onChange={handleChange}
            label="Company Type"
          >
            <MenuItem value="">
              <em>Select Company Type</em>
            </MenuItem>
            <MenuItem value="construction">Construction Company</MenuItem>
            <MenuItem value="supplier">Material Supplier</MenuItem>
            
          </Select>
        </FormControl>
        <TextField
          label="Company Name"
          name="companyName"
          variant="outlined"
          value={formData.companyName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Company Email"
          name="companyEmail"
          type="email"
          variant="outlined"
          value={formData.companyEmail}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Location"
          name="location"
          variant="outlined"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Registration Certificate"
          type="file"
          name="registration_certificate"
          onChange={handleFileChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          inputProps={{ accept: ".pdf,.jpg,.jpeg,.png" }} // Restrict to common file types
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAgreed}
              onChange={handleTermsChange}
              color="primary"
            />
          }
          label="I agree to the Terms and Conditions"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!termsAgreed}
        >
          Register
        </Button>
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/login")}
          sx={{ color: "#0073e6", textDecoration: "underline" }}
        >
          Log in
        </Link>
      </Typography>
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CompanyRegistration;