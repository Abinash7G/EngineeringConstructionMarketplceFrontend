// import React, { useState } from "react"; 
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import { 
//   TextField, Button, Typography, Box, Container, Link, 
//   IconButton, InputAdornment, Checkbox, FormControlLabel,
//   Snackbar, Alert // Import Snackbar and Alert
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import Footer from "../pages/footer"; // Importing the Footer component

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     role: "User",
//   });
//   const [message, setMessage] = useState("");
//   const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility
//   const [severity, setSeverity] = useState("success"); // State to control Snackbar severity
//   const [showPassword, setShowPassword] = useState(false);
//   const [termsAgreed, setTermsAgreed] = useState(false); // New state for terms checkbox

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleTermsChange = (e) => {
//     setTermsAgreed(e.target.checked);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(formData);
//       const response = await API.post("api/signup/", formData);
//       setMessage(response.data.message);
//       setSeverity("success"); // Set severity to success for successful signup
//       setOpenSnackbar(true); // Show the Snackbar
//       setTimeout(() => {
//         setFormData({
//           username: "",
//           first_name: "",
//           last_name: "",
//           email: "",
//           password: "",
//           phoneNumber: "",
//           role: "User",
//         });
//         setTermsAgreed(false); // Reset terms checkbox
//       }, 1000);
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setMessage(error.response.data.error);
//       } else {
//         setMessage("Signup failed. Please try again.");
//       }
//       setSeverity("error"); // Set severity to error for failed signup
//       setOpenSnackbar(true); // Show the Snackbar
//     }
//   };

//   const handleSnackbarClose = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh", // Ensure the container takes the full viewport height
//       }}
//     >
//       <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
//         <Container
//           maxWidth="sm"
//           sx={{
//             mt: 4,
//             p: 3,
//             boxShadow: 3,
//             borderRadius: 2,
//             bgcolor: "#f9f9f9",
//           }}
//         >
//           <Typography variant="h4" align="center" gutterBottom sx={{ color: "#0073e6" }}>
//             Signup Page 
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//           >
//             <TextField
//               label="Username"
//               name="username"
//               variant="outlined"
//               value={formData.username || ""}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//             <TextField
//               label="First Name"
//               name="first_name"
//               variant="outlined"
//               value={formData.first_name || ""}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//             <TextField
//               label="Last Name"
//               name="last_name"
//               variant="outlined"
//               value={formData.last_name || ""}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//             <TextField
//               label="Email"
//               name="email"
//               type="email"
//               variant="outlined"
//               value={formData.email || ""}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//             <TextField
//               label="Password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               variant="outlined"
//               value={formData.password || ""}
//               onChange={handleChange}
//               fullWidth
//               required
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={togglePasswordVisibility} edge="end">
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               label="Phone Number"
//               name="phoneNumber"
//               type="text"
//               variant="outlined"
//               value={formData.phoneNumber || ""}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={termsAgreed}
//                   onChange={handleTermsChange}
//                   color="primary"
//                 />
//               }
//               label="I agree to the Terms and Conditions"
//             />
//             <Button 
//               type="submit" 
//               variant="contained" 
//               color="primary" 
//               fullWidth
//               disabled={!termsAgreed} // Disable button if terms not agreed
//             >
//               Signup
//             </Button>
//           </Box>
//           <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//             Already have an account?{' '}
//             <Link
//               component="button"
//               variant="body2"
//               onClick={() => navigate("/login")}
//               sx={{ color: "#0073e6", textDecoration: "underline" }}
//             >
//               Log in
//             </Link>
//           </Typography>
//           {/* Add Snackbar to display the message */}
//           <Snackbar 
//             open={openSnackbar} 
//             autoHideDuration={4000} 
//             onClose={handleSnackbarClose}
//             anchorOrigin={{ vertical: "top", horizontal: "right" }}
//             sx={{ mt: "60px" }} // Adjust margin-top to place it just below the navbar
//           >
//             <Alert 
//               onClose={handleSnackbarClose} 
//               severity={severity} 
//               sx={{ width: "100%" }}
//             >
//               {message}
//             </Alert>
//           </Snackbar>
//         </Container>
//       </Box>
//       {/* Footer at the bottom */}
//       <Box sx={{ mt: "auto" }}>
//         <Footer />
//       </Box>
//     </Box>
//   );
// };

// export default SignupPage;
import React, { useState, useRef } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import API from "../services/api";
import {
  TextField, Button, Typography, Box, Container, Link,
  IconButton, InputAdornment, Checkbox, FormControlLabel,
  Snackbar, Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Footer from "../pages/footer";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "User",
  });
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleTermsChange = (e) => {
    setTermsAgreed(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await API.post("api/signup/", formData);
      setMessage(response.data.message);
      setSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => {
        setFormData({
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          phoneNumber: "",
          role: "User",
        });
        setTermsAgreed(false);
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Signup failed. Please try again.");
      }
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
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
            Signup Page
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              value={formData.username || ""}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="First Name"
              name="first_name"
              variant="outlined"
              value={formData.first_name || ""}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="last_name"
              variant="outlined"
              value={formData.last_name || ""}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={formData.email || ""}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={formData.password || ""}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              type="text"
              variant="outlined"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              fullWidth
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAgreed}
                  onChange={handleTermsChange}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <Link component={RouterLink} to="/terms-and-conditions" sx={{ color: "#0073e6", textDecoration: "underline" }}>
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link component={RouterLink} to="/privacy-policy" sx={{ color: "#0073e6", textDecoration: "underline" }}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!termsAgreed}
            >
              Signup
            </Button>
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/login")}
              sx={{ color: "#0073e6", textDecoration: "underline" }}
            >
              Log in
            </Link>
          </Typography>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ mt: "60px" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={severity}
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
      <Box sx={{ mt: "auto" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default SignupPage;