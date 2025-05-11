// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaUsers, FaTools, FaChartBar, FaCog, FaSignOutAlt, FaCheck, FaTimes } from "react-icons/fa";

// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Button,
// } from "@mui/material";


// const Sidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     alert("You have been logged out!");
//     navigate("/"); // navigating to home page
//   };

//   return (
//     <Box
//       sx={{
//         width: "250px",
//         backgroundColor: "#007bff",
//         color: "white",
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         position: "sticky",
//         top: 0,
//       }}
//     >
//       {/* Logo and Menu */}
//       <Box>
//         <Typography
//           variant="h5"
//           component="h2"
//           sx={{ marginBottom: "20px", fontWeight: "bold", color: "white", textAlign: "center" }}
//         >
//           Admin
//         </Typography>

//         <List>
//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/admin">
//               <ListItemIcon sx={{ color: "white" }}>
//                 <FaChartBar />
//               </ListItemIcon>
//               <ListItemText primary="Dashboard" />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/admin/users">
//               <ListItemIcon sx={{ color: "white" }}>
//                 <FaUsers />
//               </ListItemIcon>
//               <ListItemText primary="Users" />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/admin/Services">
//               <ListItemIcon sx={{ color: "white" }}>
//                 <FaTools />
//               </ListItemIcon>
//               <ListItemText primary="Services" />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/admin/settings">
//               <ListItemIcon sx={{ color: "white" }}>
//                 <FaCog />
//               </ListItemIcon>
//               <ListItemText primary="Settings" />
//             </ListItemButton>
//           </ListItem>

//           {/* New Buttons for Approved & Rejected Companies */}
//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/admin/rejected-companies">
//               <ListItemIcon sx={{ color: "white" }}>
//                 <FaCheck />
//               </ListItemIcon>
//               <ListItemText primary="Approved Companies" />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/admin/approved-companies">
//               <ListItemIcon sx={{ color: "white" }}>
//                 <FaTimes />
//               </ListItemIcon>
//               <ListItemText primary="Rejected Companies" />
//             </ListItemButton>
//           </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton component={Link} to="/admin/rent-verification">
//               <ListItemIcon sx={{ color: "white" }}>
//                 <FaUsers />
//                 </ListItemIcon>
//                 <ListItemText primary="User Rent Verification" />
//                 </ListItemButton>
//                 </ListItem>
          
//         </List>
//       </Box>

//       {/* Logout Button */}
//       <Box>
//         <Button
//           variant="contained"
//           color="error"
//           startIcon={<FaSignOutAlt />}
//           onClick={handleLogout}
//           sx={{
//             width: "90%",
//             margin: "10px auto",
//             backgroundColor: "#dc3545",
//             "&:hover": { backgroundColor: "#c82333" },
//           }}
//         >
//           Logout
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Sidebar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChartBar, FaTools, FaCheck, FaTimes, FaSignOutAlt, FaUsers } from "react-icons/fa";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("You have been logged out!");
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: "250px",
        backgroundColor: "#1a73e8", // Modern blue color
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        boxShadow: 3,
      }}
    >
      {/* Logo and Menu */}
      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            marginBottom: "30px",
            marginTop: "20px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          Admin Dashboard
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin"
              sx={{
                padding: "12px 20px",
                "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                <FaChartBar size={20} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/Services"
              sx={{
                padding: "12px 20px",
                "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                <FaTools size={20} />
              </ListItemIcon>
              <ListItemText primary="Services" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/rejected-companies"
              sx={{
                padding: "12px 20px",
                "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                <FaCheck size={20} />
              </ListItemIcon>
              <ListItemText primary="Approved Companies" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/approved-companies"
              sx={{
                padding: "12px 20px",
                "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                <FaTimes size={20} />
              </ListItemIcon>
              <ListItemText primary="Rejected Companies" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/rent-verification"
              sx={{
                padding: "12px 20px",
                "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                <FaUsers size={20} />
              </ListItemIcon>
              <ListItemText primary="User Rent Verification" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ color: "white", padding: "0px 30px", }}>
        <Button
          variant="contained"
          startIcon={<FaSignOutAlt />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;