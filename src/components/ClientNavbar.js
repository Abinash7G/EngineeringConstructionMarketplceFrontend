// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   IconButton,
//   Badge,
//   Menu,
//   MenuItem,
//   TextField,
//   InputAdornment,
// } from "@mui/material";
// import { Menu as MenuIcon, Search, Favorite, ShoppingCart, AccountCircle } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import ClientSidebar from "./ClientSidebar";

// const ClientNavbar = ({ wishlist, cartItems, onNavigateToProfile }) => {
//   const navigate = useNavigate();
//   const [profileAnchor, setProfileAnchor] = useState(null);
//   const [firstName, setFirstName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await API.get("/api/user-profile/");
//         setFirstName(response.data.first_name || "Guest");
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleWishlistClick = () => navigate("/client/wishlist");
//   const handleCartClick = () => navigate("/client/cart");
//   const handleProfileClick = (event) => setProfileAnchor(event.currentTarget);
//   const handleProfileClose = () => setProfileAnchor(null);
//   const handleLogout = () => navigate("/");
//   const handleSidebarToggle = () => setSidebarOpen(true);
//   const handleSidebarClose = () => setSidebarOpen(false);

//   return (
//     <>
//       <AppBar position="fixed" color="primary" sx={{ padding: "5px 20px" }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <IconButton color="inherit" onClick={handleSidebarToggle}>
//             <MenuIcon sx={{ fontSize: 28 }} />
//           </IconButton>

//           <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left", fontSize: "18px" }}>
//             Welcome, {firstName}
//           </Typography>

//           <TextField
//             placeholder="Search products..."
//             variant="outlined"
//             size="small"
//             sx={{
//               backgroundColor: "white",
//               borderRadius: "8px",
//               width: "230px",
//               marginRight: "10px",
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search sx={{ color: "gray" }} />
//                 </InputAdornment>
//               ),
//             }}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />

//           <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
//             <IconButton onClick={handleWishlistClick}>
//               <Badge badgeContent={wishlist.length} color="secondary">
//                 <Favorite sx={{ fontSize: 24 }} />
//               </Badge>
//             </IconButton>
//             <IconButton onClick={handleCartClick}>
//               <Badge badgeContent={cartItems.length} color="secondary">
//                 <ShoppingCart sx={{ fontSize: 24 }} />
//               </Badge>
//             </IconButton>
//             <IconButton onClick={handleProfileClick}>
//               <AccountCircle sx={{ fontSize: 26 }} />
//             </IconButton>

//             <Menu anchorEl={profileAnchor} open={Boolean(profileAnchor)} onClose={handleProfileClose}>
//               <MenuItem onClick={onNavigateToProfile}>Profile</MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <ClientSidebar open={sidebarOpen} onClose={handleSidebarClose} />
//     </>
//   );
// };

// export default ClientNavbar;
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
  Favorite,
  ShoppingCart,
  AccountCircle,
  Notifications,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ClientSidebar from "./ClientSidebar";

const ClientNavbar = ({ wishlist, cartItems, onNavigateToProfile }) => {
  const navigate = useNavigate();
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch user profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/api/user-profile/");
        setFirstName(response.data.first_name || "Guest");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchData();
  }, []);

  // SSE for notifications
  useEffect(() => {
    const token = localStorage.getItem("token"); // Adjust based on your auth setup
    if (!token) return;

    const eventSource = new EventSource("/api/sse/notifications/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [newNotification, ...prev]);
      if (!newNotification.is_read) {
        setUnreadCount((prev) => prev + 1);
      }
    };

    eventSource.onerror = () => {
      console.log("SSE error, reconnecting...");
    };

    return () => eventSource.close();
  }, []);

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.post("/api/notifications/mark_read/", {
        notification_id: notificationId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.status === "success") {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, is_read: true } : notif
          )
        );
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleWishlistClick = () => navigate("/client/wishlist");
  const handleCartClick = () => navigate("/client/cart");
  const handleProfileClick = (event) => setProfileAnchor(event.currentTarget);
  const handleProfileClose = () => setProfileAnchor(null);
  const handleLogout = () => navigate("/");
  const handleSidebarToggle = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);
  const handleNotificationClick = (event) => setNotificationAnchor(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchor(null);

  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ padding: "5px 20px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <IconButton color="inherit" onClick={handleSidebarToggle}>
            <MenuIcon sx={{ fontSize: 28 }} />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left", fontSize: "18px" }}>
            Welcome, {firstName}
          </Typography>

          <TextField
            placeholder="Search products..."
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              width: "230px",
              marginRight: "10px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <IconButton onClick={handleNotificationClick}>
              <Badge badgeContent={unreadCount} color="error">
                <Notifications sx={{ fontSize: 24 }} />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={notificationAnchor}
              open={Boolean(notificationAnchor)}
              onClose={handleNotificationClose}
              PaperProps={{ style: { maxHeight: 400, width: 300 } }}
            >
              {notifications.length === 0 ? (
                <MenuItem>No notifications</MenuItem>
              ) : (
                notifications.map((notification) => (
                  <MenuItem
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    sx={{ backgroundColor: notification.is_read ? "inherit" : "#f5f5f5" }}
                  >
                    <Box>
                      <Typography variant="body2">{notification.message}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(notification.created_at).toLocaleString()}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              )}
            </Menu>
            <IconButton onClick={handleWishlistClick}>
              <Badge badgeContent={wishlist.length} color="secondary">
                <Favorite sx={{ fontSize: 24 }} />
              </Badge>
            </IconButton>
            <IconButton onClick={handleCartClick}>
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCart sx={{ fontSize: 24 }} />
              </Badge>
            </IconButton>
            <IconButton onClick={handleProfileClick}>
              <AccountCircle sx={{ fontSize: 26 }} />
            </IconButton>

            <Menu anchorEl={profileAnchor} open={Boolean(profileAnchor)} onClose={handleProfileClose}>
              <MenuItem onClick={onNavigateToProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <ClientSidebar open={sidebarOpen} onClose={handleSidebarClose} />
    </>
  );
};

export default ClientNavbar;