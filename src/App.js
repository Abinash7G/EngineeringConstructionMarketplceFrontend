import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ClientNavbar from "./components/ClientNavbar";
import Footer from "./pages/footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CompanyRegistration from "./components/companyregistration";
import AdminDashboard from "./pages/AdminDashboard";
import EmailConfirmation from "./components/EmailConfirmation";
import ViewCompanyDetails from "./components/ViewCompanyDetails";
import CompanyDashboard from "./pages/CompanyDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import RestPasswordView from "./pages/RestPassswordView";
import ClientProfile from "./pages/ClientProfile";
import CDProduct from "./components/CDProduct";
import CDCompany from "./components/CDCompany";
import CDBanner from "./components/CDBanner";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import CDCheckoutForm from "./components/CDCheckoutForm";
import Appointments from "./components/Appointments";
import Documents from "./components/Documents";
import ServicesManagement from "./components/ServicesManagement";
import MaterialsManagement from "./components/MaterialsManagement";
import ProfileSettings from "./components/ProfileSettings";
import CompanyDetails from "./components/CompanyDetails";
import EsewaPayment from "./components/EsewaPayment";
import KhaltiButton from "./components/KhaltiButton";
import Success from "./components/Success";
import Failure from "./components/Failure";
import ApprovedCompanies from "./components/ApprovedCompanies";
import RejectedCompanies from "./components/RejectedCompanies";
import CDRentVerificationform from "./components/CDRentVerificationform";
import RentVerificationAdmin from "./components/RentVerificationAdmin";
import CDConsultingInquiryForm from "./components/CDConsultingInquiryForm";
import InquiriesList from "./components/InquiriesList";
import CDAgreements from "./components/CDAgreements";
import ClientServices from "./components/ClientServices";
import AboutUsPage from "./pages/aboutus";
import Services from "./Admin/Services";
import Subscription from "./Company/Subscription";
import OrdersPage from "./components/OrdersPage";
import SuppliersDashboard from "./pages/SuppliersDashboard";
import CompanyOrdersPage from "./components/CompanyordersPage";
import {
  fetchUserProfile,
  fetchCartItems,
  fetchWishlistItems,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  removeFromCart,
} from "./services/api";
import { Box, Snackbar, Alert } from "@mui/material";
import PaymentModal from "./components/PaymentModal";
import ProductDetail from "./components/ProductDetails";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermAndConditions";

const App = () => {
  const location = useLocation();
  const [username, setUsername] = useState("Guest");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Define routes where Navbar, ClientNavbar, and Footer should appear
  const navbarRoutes = ["/", "/home", "/login", "/signup", "/companyregistration", "/about"];
  const clientNavbarRoutes = [
    "/client",
    "/client/client-profile",
    "/all-products",
    "/all-companies",
    "/client/wishlist",
    "/client/cart",
    "/checkout",
    "/upload-kyc",
    "/client/agreements",
    "/client/clientservices",
    "/client/order",
    "/companydetails/:id",
    "/CDConsultingInquiryForm/:id",
    "/productdetails/:id",
  ];
  const footerRoutes = [
    // "/",
    // "/home",
    // "/login",
    // "/signup",
    // "/companyregistration",
    "/about",
    "/client",
    // "/client/client-profile",
    // "/all-products",
    // "/all-companies",
    // "/client/wishlist",
    // "/client/cart",
    "/checkout",
    "/upload-kyc",
    "/client/agreements",
    "/client/clientservices",
    "/client/order",
    "/companydetails/:id",
    "/CDConsultingInquiryForm/:id",
  ];

  // Fetch user profile, cart, and wishlist data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        if (!token || !refreshToken) {
          return;
        }

        const userData = await fetchUserProfile();
        setUsername(userData.username);

        await loadCartAndWishlist();
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };

    loadInitialData();
  }, []);

  const loadCartAndWishlist = async () => {
    try {
      const [cartData, wishlistData] = await Promise.all([
        fetchCartItems(),
        fetchWishlistItems(),
      ]);
      setCartItems(cartData.data || []);
      setWishlistItems(wishlistData.data || []);
    } catch (error) {
      console.error("Error loading cart and wishlist:", error);
      setCartItems([]);
      setWishlistItems([]);
    }
  };

  const handleWishlistToggle = async (product) => {
    try {
      const isInWishlist = wishlistItems.some(item => item.id === product.id);
      if (isInWishlist) {
        await removeFromWishlist(product.id);
        setWishlistItems(prev => prev.filter(item => item.id !== product.id));
        showSnackbar("Removed from wishlist", "info");
      } else {
        await addToWishlist(product.id);
        setWishlistItems(prev => [...prev, { ...product }]);
        showSnackbar("Added to wishlist", "success");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      showSnackbar("Failed to update wishlist", "error");
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id, product.quantity || 1);
      await loadCartAndWishlist();
      showSnackbar("Added to cart", "success");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showSnackbar("Failed to add to cart", "error");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      await loadCartAndWishlist();
      showSnackbar("Removed from cart", "info");
    } catch (error) {
      console.error("Error removing from cart:", error);
      showSnackbar("Failed to remove from cart", "error");
    }
  };

  const handleUpdateCartQuantity = async (productId, change) => {
    try {
      await addToCart(productId, change);
      await loadCartAndWishlist();
      showSnackbar("Cart updated", "success");
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      showSnackbar("Failed to update cart", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Helper function to check if ClientNavbar should be shown
  const shouldShowClientNavbar = () => {
    return clientNavbarRoutes.some(route => {
      if (route.includes(":id")) {
        const baseRoute = route.split("/:")[0];
        return location.pathname.startsWith(baseRoute);
      }
      return location.pathname === route;
    });
  };

  // Helper function to check if Footer should be shown
  const shouldShowFooter = () => {
    return footerRoutes.some(route => {
      if (route.includes(":id")) {
        const baseRoute = route.split("/:")[0];
        return location.pathname.startsWith(baseRoute);
      }
      return location.pathname === route;
    });
  };

  return (
    <>
      {navbarRoutes.includes(location.pathname) && <Navbar />}
      {shouldShowClientNavbar() && (
        <ClientNavbar
          username={username}
          wishlist={wishlistItems}
          cartItems={cartItems}
          onNavigateToProfile={() => window.location.href = "/client/client-profile"}
        />
      )}
      <Box sx={{ pt: shouldShowClientNavbar() ? "64px" : 0, pb: shouldShowFooter() ? "40px" : 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/companyregistration" element={<CompanyRegistration />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/confirm-email/:token" element={<EmailConfirmation />} />
          <Route path="/view-company-details/:id" element={<ViewCompanyDetails />} />
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/client" element={<ClientDashboard handleWishlistToggle={handleWishlistToggle} handleAddToCart={handleAddToCart} wishlistItems={wishlistItems} />} />
          <Route path="/suppliers" element={<SuppliersDashboard />} />
          <Route path="/restpasswordview/:token" element={<RestPasswordView />} />
          <Route path="/client/client-profile" element={<ClientProfile />} />
          <Route path="/all-products" element={<CDProduct handleWishlistToggle={handleWishlistToggle} handleAddToCart={handleAddToCart} wishlistItems={wishlistItems} />} />
          <Route path="/all-companies" element={<CDCompany />} />
          <Route path="/CDBanner" element={<CDBanner />} />
          <Route path="/client/wishlist" element={<Wishlist wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} handleAddToCart={handleAddToCart} showSnackbar={showSnackbar} />} />
          <Route path="/client/cart" element={<Cart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQuantity={handleUpdateCartQuantity} showSnackbar={showSnackbar} />} />
          <Route path="/checkout" element={<CDCheckoutForm />} />
          <Route path="/upload-kyc" element={<CDRentVerificationform />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/services-management" element={<ServicesManagement />} />
          <Route path="/materials-management" element={<MaterialsManagement />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/companydetails/:id" element={<CompanyDetails />} />
          <Route path="/CDConsultingInquiryForm/:id" element={<CDConsultingInquiryForm />} />
          <Route path="/InquiriesList" element={<InquiriesList />} />
          <Route path="/esewa-payment" element={<EsewaPayment />} />
          <Route path="/khalti" element={<KhaltiButton />} />
          <Route path="/admin/rejected-companies" element={<ApprovedCompanies />} />
          <Route path="/admin/approved-companies" element={<RejectedCompanies />} />
          <Route path="/admin/rent-verification" element={<RentVerificationAdmin />} />
          <Route path="/admin/Services" element={<Services />} />
          <Route path="/client/agreements" element={<CDAgreements />} />
          <Route path="/client/clientservices" element={<ClientServices />} />
          <Route path="/company/subscription" element={<Subscription />} />
          <Route path="/products" element={<CDProduct handleWishlistToggle={handleWishlistToggle} handleAddToCart={handleAddToCart} wishlistItems={wishlistItems} />} />
          <Route path="/client/order" element={<OrdersPage />} />
          <Route path="/company_order" element={<CompanyOrdersPage />} />
          <Route path= "/payment-test" element={<PaymentModal/>}/>
          <Route path="/productdetails/:id" element={<ProductDetail/>}/>
          <Route path="/privacy" element={<PrivacyPolicy/>}/>
          <Route path="/terms" element={<TermsAndConditions/>}/>
        </Routes>
      </Box>
      {shouldShowFooter() && <Footer />}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

const AppWithRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWithRouter;