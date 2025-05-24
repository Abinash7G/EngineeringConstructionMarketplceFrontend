
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaChartBar, FaTools, FaCheck, FaTimes, FaSignOutAlt, FaUsers, FaBuilding, FaFileAlt } from "react-icons/fa";
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
//     navigate("/");
//   };

//   return (
//     <Box
//       sx={{
//         width: "250px",
//         backgroundColor: "#1a73e8",
//         color: "white",
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         position: "sticky",
//         top: 0,
//         boxShadow: 3,
//       }}
//     >
//       {/* Logo and Menu */}
//       <Box>
//         <Typography
//           variant="h5"
//           component="h2"
//           sx={{
//             marginBottom: "30px",
//             marginTop: "20px",
//             fontWeight: "bold",
//             color: "white",
//             textAlign: "center",
//             letterSpacing: "1px",
//           }}
//         >
//           Admin Dashboard
//         </Typography>

//         <List>
//           <ListItem disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/admin"
//               sx={{
//                 padding: "12px 20px",
//                 "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
//                 <FaChartBar size={20} />
//               </ListItemIcon>
//               <ListItemText primary="Dashboard" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/admin/users"
//               sx={{
//                 padding: "12px 20px",
//                 "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
//                 <FaUsers size={20} />
//               </ListItemIcon>
//               <ListItemText primary="Users" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/admin/Services"
//               sx={{
//                 padding: "12px 20px",
//                 "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
//                 <FaTools size={20} />
//               </ListItemIcon>
//               <ListItemText primary="Services" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/admin/rejected-companies"
//               sx={{
//                 padding: "12px 20px",
//                 "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
//                 <FaCheck size={20} />
//               </ListItemIcon>
//               <ListItemText primary="Approved Companies" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/admin/approved-companies"
//               sx={{
//                 padding: "12px 20px",
//                 "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
//                 <FaTimes size={20} />
//               </ListItemIcon>
//               <ListItemText primary="Rejected Companies" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/admin/rent-verification"
//               sx={{
//                 padding: "12px 20px",
//                 "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
//                 <FaUsers size={20} />
//               </ListItemIcon>
//               <ListItemText primary="User Rent Verification" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/admin/subscription-companies"
//               sx={{
//                 padding: "12px 20px",
//                 "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
//                 <FaBuilding size={20} />
//               </ListItemIcon>
//               <ListItemText primary="Subscription Companies" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/admin/subscription-plans"
//               sx={{
//                 padding: "12px 20px",
//                 "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
//                 <FaFileAlt size={20} />
//               </ListItemIcon>
//               <ListItemText primary="Subscription Plans" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Box>

//       {/* Logout Button */}
//       <Box sx={{ color: "white", padding: "0px 30px" }}>
//         <Button
//           variant="contained"
//           startIcon={<FaSignOutAlt />}
//           onClick={handleLogout}
//         >
//           Logout
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Sidebar;
// Sidebar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaChartBar, 
  FaTools, 
  FaCheck, 
  FaTimes, 
  FaSignOutAlt, 
  FaUsers, 
  FaBuilding, 
  FaFileAlt, 
  FaEnvelope, 
  FaExclamationCircle 
} from "react-icons/fa";
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
        backgroundColor: "#1a73e8",
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
              to="/admin/users"
              sx={{
                padding: "12px 20px",
                "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                <FaUsers size={20} />
              </ListItemIcon>
              <ListItemText primary="Users" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
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

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/subscription-companies"
              sx={{
                padding: "12px 20px",
                "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                <FaBuilding size={20} />
              </ListItemIcon>
              <ListItemText primary="Subscription Companies" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/subscription-plans"
              sx={{
                padding: "12px 20px",
                "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                <FaFileAlt size={20} />
              </ListItemIcon>
              <ListItemText primary="Subscription Plans" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
            </ListItemButton>
          </ListItem>

          {/* New Support Requests Link */}
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/support-requests"
              sx={{
                padding: "12px 20px",
                "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                <FaEnvelope size={20} />
              </ListItemIcon>
              <ListItemText primary="Support Requests" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
            </ListItemButton>
          </ListItem>

          {/* New Complaints Link */}
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/complaints"
              sx={{
                padding: "12px 20px",
                "&:hover": { backgroundColor: "#1565c0", transition: "background-color 0.3s" },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                <FaExclamationCircle size={20} />
              </ListItemIcon>
              <ListItemText primary="Complaints" sx={{ "& .MuiTypography-root": { fontSize: "1rem", fontWeight: 500 } }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ color: "white", padding: "0px 30px" }}>
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