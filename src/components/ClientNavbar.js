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
//   Alert,
// } from "@mui/material";
// import {
//   Menu as MenuIcon,
//   Search,
//   Favorite,
//   ShoppingCart,
//   AccountCircle,
//   Notifications,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import ClientSidebar from "./ClientSidebar";

// const ClientNavbar = ({ wishlist, cartItems, onNavigateToProfile }) => {
//   const navigate = useNavigate();
//   const [profileAnchor, setProfileAnchor] = useState(null);
//   const [notificationAnchor, setNotificationAnchor] = useState(null);
//   const [firstName, setFirstName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [error, setError] = useState(null);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await API.get("/api/user-profile/");
//         setFirstName(response.data.first_name || "Guest");
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setError("Failed to load profile");
//       }
//     };
//     fetchData();
//   }, []);

//   // SSE for notifications
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       setError("Please log in to receive notifications");
//       return;
//     }
//     let eventSource;
//         const connectSSE = () => {
//               eventSource = new EventSource(`http://127.0.0.1:8000/api/sse/notifications/?token=${token}`);
//               eventSource.addEventListener('notification', (event) => {
//                 try {
//                   const newNotification = JSON.parse(event.data);
//                   setNotifications((prev) => [newNotification, ...prev]);
//                   if (!newNotification.is_read) {
//                     setUnreadCount((prev) => prev + 1);
//                   }
//                 } catch (err) {
//                   console.error("Error parsing SSE message:", err);
//                 }
//                 });
//               eventSource.onmessage = (event) => {
                
//               };
        
//               eventSource.onerror = () => {
//                 console.log("SSE error, reconnecting...");
//                 eventSource.close();
//                 setTimeout(connectSSE, 5000); // Reconnect after 5 seconds
//               };
//             };
        
//             connectSSE();
        
//             return () => eventSource.close();
//           }, []);
        
//           // Mark notification as read
//           const handleMarkAsRead = async (notificationId) => {
//             try {
//               const token = localStorage.getItem("access_token");
//               const response = await API.post(
//                 "/api/notifications/mark_read/",
//                 { notification_id: notificationId },
//                 { headers: { Authorization: `Bearer ${token}` } }
//               );
//               if (response.data.status === "success") {
//                 setNotifications((prev) =>
//                   prev.map((notif) =>
//                     notif.id === notificationId ? { ...notif, is_read: true } : notif
//                   )
//                 );
//                 setUnreadCount((prev) => Math.max(prev - 1, 0));
//               }
//             } catch (error) {
//               console.error("Error marking notification as read:", error);
//               setError("Failed to mark notification as read");
//             }
//           };
    
    

//   const handleWishlistClick = () => navigate("/client/wishlist");
//   const handleCartClick = () => navigate("/client/cart");
//   const handleProfileClick = (event) => setProfileAnchor(event.currentTarget);
//   const handleProfileClose = () => setProfileAnchor(null);
//   const handleLogout = () => navigate("/");
//   const handleSidebarToggle = () => setSidebarOpen(true);
//   const handleSidebarClose = () => setSidebarOpen(false);
//   const handleNotificationClick = (event) => setNotificationAnchor(event.currentTarget);
//   const handleNotificationClose = () => setNotificationAnchor(null);

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
//             <IconButton onClick={handleNotificationClick}>
//               <Badge badgeContent={unreadCount} color="error">
//                 <Notifications sx={{ fontSize: 24 }} />
//               </Badge>
//             </IconButton>
//             <Menu
//               anchorEl={notificationAnchor}
//               open={Boolean(notificationAnchor)}
//               onClose={handleNotificationClose}
//               PaperProps={{ style: { maxHeight: 400, width: 300 } }}
//             >
//               {notifications.length === 0 ? (
//                 <MenuItem>No notifications</MenuItem>
//               ) : (
//                 notifications.map((notification) => (
//                   <MenuItem
//                     key={notification.id}
//                     onClick={() => handleMarkAsRead(notification.id)}
//                     sx={{ backgroundColor: notification.is_read ? "inherit" : "#f5f5f5",
//                       whiteSpace: "normal",
//                       padding: "10px",
//                      }}
//                   >
//                     <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
//                       <Typography variant="body2">{notification.message}</Typography>
//                       <Typography variant="caption" color="textSecondary">
//                         {new Date(notification.created_at).toLocaleString()}
//                       </Typography>
//                     </Box>
//                   </MenuItem>
//                 ))
//               )}
//             </Menu>
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

//       {error && (
//         <Alert severity="error" sx={{ m: 2 }} onClose={() => setError(null)}>
//           {error}
//         </Alert>
//       )}

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
  Alert,
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
import SearchResults from "./SearchResults"; // Import the new SearchResults component

const ClientNavbar = ({ wishlist, cartItems, onNavigateToProfile }) => {
  const navigate = useNavigate();
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/api/user-profile/");
        setFirstName(response.data.first_name || "Guest");
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile");
      }
    };
    fetchData();
  }, []);

  // Fetch companies and products for search
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await API.get("/company-registration-list/");
        const filteredCompanies = response.data.filter(
          (item) => item.is_approved && item.company_type === "construction"
        );
        const transformed = filteredCompanies.map((item) => ({
          id: item.id,
          name: item.company_name,
          location: item.location,
        }));
        setCompanies(transformed);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setError("Failed to load companies for search");
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await API.get("/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products for search");
      }
    };

    fetchCompanies();
    fetchProducts();
  }, []);

  // Filter companies and products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCompanies([]);
      setFilteredProducts([]);
      setShowResults(false);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredComp = companies.filter((company) =>
      company.name.toLowerCase().includes(lowerCaseQuery)
    );
    const filteredProd = products.filter((product) =>
      product.title.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredCompanies(filteredComp);
    setFilteredProducts(filteredProd);
    setShowResults(true);
  }, [searchQuery, companies, products]);

  // SSE for notifications
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please log in to receive notifications");
      return;
    }
    let eventSource;
    const connectSSE = () => {
      eventSource = new EventSource(`http://127.0.0.1:8000/api/sse/notifications/?token=${token}`);
      eventSource.addEventListener('notification', (event) => {
        try {
          const newNotification = JSON.parse(event.data);
          setNotifications((prev) => [newNotification, ...prev]);
          if (!newNotification.is_read) {
            setUnreadCount((prev) => prev + 1);
          }
        } catch (err) {
          console.error("Error parsing SSE message:", err);
        }
      });

      eventSource.onmessage = (event) => {};

      eventSource.onerror = () => {
        console.log("SSE error, reconnecting...");
        eventSource.close();
        setTimeout(connectSSE, 5000);
      };
    };

    connectSSE();

    return () => eventSource.close();
  }, []);

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await API.post(
        "/api/notifications/mark_read/",
        { notification_id: notificationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
      setError("Failed to mark notification as read");
    }
  };

  const handleWishlistClick = () => navigate("/client/wishlist");
  const handleCartClick = () => navigate("/client/cart");
  const handleProfileClick = (event) => setProfileAnchor(event.currentTarget);
  const handleProfileClose = () => setProfileAnchor(null);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    navigate("/");
  };
  const handleSidebarToggle = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);
  const handleNotificationClick = (event) => setNotificationAnchor(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchor(null);
  const handleSearchClose = () => {
    setShowResults(false);
    setSearchQuery("");
  };

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

          <Box sx={{ position: "relative", width: "230px", mr: "10px" }}>
            <TextField
              placeholder="Search products and companies..."
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                width: "100%",
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
              onFocus={() => setShowResults(true)}
            />
            {showResults && (filteredCompanies.length > 0 || filteredProducts.length > 0) && (
              <SearchResults
                companies={filteredCompanies}
                products={filteredProducts}
                onClose={handleSearchClose}
              />
            )}
          </Box>

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
                    sx={{
                      backgroundColor: notification.is_read ? "inherit" : "#f5f5f5",
                      whiteSpace: "normal",
                      padding: "10px",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
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

      {error && (
        <Alert severity="error" sx={{ m: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <ClientSidebar open={sidebarOpen} onClose={handleSidebarClose} />
    </>
  );
};

export default ClientNavbar;