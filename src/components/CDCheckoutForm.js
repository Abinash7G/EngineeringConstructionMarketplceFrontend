import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import API from "../services/api";
import { v4 as uuidv4 } from "uuid";

const stripePromise = loadStripe(
  "pk_test_51QnOg8HFXrh998Klft0d4A2QId9hPWxhNlU12COVn2WXlCgzx6BreTWwIE6zNBjINEMd1wANva7HvkWhHKS3XUnp00kQmaYhHn"
);

const StripePaymentForm = ({
  totalPrice,
  onSuccess,
  invoices,
  isSubmitting,
  setIsSubmitting,
  companyIds,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || isSubmitting) return;

    setIsSubmitting(true);
    setLoading(true);
    setError(null);

    try {
      const response = await API.post("/api/stripe/create-payment-intent/", {
        amount: Math.round(totalPrice * 100),
        booking_id: invoices.booking_id,
        company_ids: companyIds,
      });
      const { client_secret: clientSecret } = response.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: "Customer Name",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess({
          transaction_id: result.paymentIntent.id,
          method: "stripe",
          invoices: invoices,
        });
      }
    } catch (err) {
      setSnackbarMessage(
        err.response?.data?.error || "Payment failed. Please try again."
      );
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Card Number
      </Typography>
      <CardNumberElement options={{ style: { base: { fontSize: "16px" } } }} />
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Expiry Date
          </Typography>
          <CardExpiryElement
            options={{ style: { base: { fontSize: "16px" } } }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            CVC
          </Typography>
          <CardCvcElement options={{ style: { base: { fontSize: "16px" } } }} />
        </Box>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading || !stripe || !elements || isSubmitting}
        sx={{ mt: 3, width: "100%" }}
      >
        {loading ? "Processing..." : `Pay Rs. ${totalPrice.toFixed(2)}`}
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
};

const CDCheckoutForm = ({ setCartItems, setWishlistItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { buyingItems = [], rentingItems = [], cartTotal = 0 } =
    location.state || {};

  const [activeStep, setActiveStep] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
  });
  const [formData, setFormData] = useState({
    deliveryLocation: "",
    surveyType: "",
    rentingDays: 1,
    dateNeeded: "",
    payNow: false,
  });
  const [errors, setErrors] = useState({
    deliveryLocation: false,
    rentingDays: false,
    dateNeeded: false,
  });
  const [totalPrice, setTotalPrice] = useState(cartTotal);
  const [rentingPrice, setRentingPrice] = useState(0);
  const [bookingId, setBookingId] = useState("");
  const [invoices, setInvoices] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [paymentSuccessModalOpen, setPaymentSuccessModalOpen] = useState(false);

  const generateBookingId = () => {
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `BID-${timestamp}-${randomPart}`;
  };

  useEffect(() => {
    // // Calculate renting price based on discounted prices
    // const defaultRentingPrice = rentingItems.reduce((total, item) => {
    //   const price = parseFloat(item.per_day_rent || item.price);
    //   const discount = parseFloat(item.discount) || 0; // Use discount field from API
    //   const discountedPrice = price - (price * discount) / 100;
    //   return total + discountedPrice * formData.rentingDays * (item.quantity || 1);
    // }, 0);
    // setRentingPrice(defaultRentingPrice);

    // // Use cartTotal (which already includes discounts) and adjust for renting days
    // const buyingPrice = buyingItems.reduce((total, item) => {
    //   const price = parseFloat(item.discounted_price || item.price); // Use discounted_price if available
    //   return total + price * (item.quantity || 1);
    // }, 0);
    // setTotalPrice(buyingPrice + defaultRentingPrice);
    // Unified price calculation for both cart and direct checkout
const calculateItemPrice = (item) => {
  // Prefer discounted_price if available (from cart)
  if (item.discounted_price) {
    return parseFloat(item.discounted_price);
  }
  
  // Calculate discount if percentage is available (direct from product)
  const originalPrice = parseFloat(item.price || item.per_day_rent);
  const discount = parseFloat(item.discount_percentage || item.discount || 0);
  return originalPrice - (originalPrice * discount / 100);
};

// In useEffect where prices are calculated
const buyingPrice = buyingItems.reduce((total, item) => {
  const finalPrice = calculateItemPrice(item);
  return total + finalPrice * (item.quantity || 1);
}, 0);

const rentingPrice = rentingItems.reduce((total, item) => {
  const finalPrice = calculateItemPrice(item);
  return total + finalPrice * formData.rentingDays * (item.quantity || 1);
}, 0);

setTotalPrice(buyingPrice + rentingPrice);

    const fetchData = async () => {
      try {
        const profileResponse = await API.get("/api/user-profile/");
        setUserDetails({
          fullName: `${profileResponse.data.first_name} ${profileResponse.data.last_name}`.trim() || "",
          contactNumber: profileResponse.data.phone_number || "",
          email: profileResponse.data.email || "",
        });

        if (rentingItems.length > 0) {
          const verificationResponse = await API.get(
            "/api/rent-verification/user/"
          );
          setVerificationStatus(verificationResponse.data.status);
        } else {
          setVerificationStatus("not_required");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 404) {
          setVerificationStatus("not_found");
        } else {
          setVerificationStatus("error");
        }
      }
    };

    setBookingId(generateBookingId());
    fetchData();
  }, [buyingItems, rentingItems, formData.rentingDays]);

  useEffect(() => {
    if (activeStep === steps.length - 1 && !orderCreated) {
      const createOrder = async () => {
        try {
          await handleCreateOrder();
          setOrderCreated(true);
        } catch (error) {
          console.error("Failed to create order before payment:", error);
          setSnackbarMessage(error.message || "Failed to create order. Please try again.");
          setSnackbarOpen(true);
          setActiveStep((prev) => prev - 1);
        }
      };
      createOrder();
    }
  }, [activeStep]);

  const handleRentingDaysChange = (e) => {
    const days = parseInt(e.target.value, 10) || 1;
    setFormData({ ...formData, rentingDays: days });
    setErrors({ ...errors, rentingDays: days <= 0 });
    const newRentingPrice = rentingItems.reduce((total, item) => {
      const price = parseFloat(item.per_day_rent || item.price);
      const discount = parseFloat(item.discount) || 0; // Use discount field from API
      const discountedPrice = price - (price * discount) / 100;
      return total + discountedPrice * days * (item.quantity || 1);
    }, 0);
    setRentingPrice(newRentingPrice);
    const buyingPrice = buyingItems.reduce((total, item) => {
      const price = parseFloat(item.discounted_price || item.price); // Use discounted_price if available
      return total + price * (item.quantity || 1);
    }, 0);
    setTotalPrice(buyingPrice + newRentingPrice);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const steps =
    rentingItems.length > 0
      ? ["Verification Check", "Details", "Payment"]
      : ["Details", "Payment"];

  const handleNext = () => {
    if (activeStep === 0 && rentingItems.length > 0) {
      if (verificationStatus !== "verified") {
        setSnackbarMessage("You need to verify your profile to rent items.");
        setSnackbarOpen(true);
        navigate("/upload-kyc");
        return;
      }
    }
    if (activeStep === steps.length - 2) {
      const validationErrors = {
        deliveryLocation: buyingItems.length > 0 && !formData.deliveryLocation.trim(),
        rentingDays: rentingItems.length > 0 && formData.rentingDays <= 0,
        dateNeeded: rentingItems.length > 0 && !formData.dateNeeded,
      };
      setErrors(validationErrors);

      const hasErrors = Object.values(validationErrors).some((error) => error);
      if (hasErrors) {
        const errorMessages = [];
        if (validationErrors.deliveryLocation) errorMessages.push("Delivery Location");
        if (validationErrors.rentingDays) errorMessages.push("Renting Days");
        if (validationErrors.dateNeeded) errorMessages.push("Date Needed");
        setSnackbarMessage(
          `Please fill the following required fields: ${errorMessages.join(", ")}`
        );
        setSnackbarOpen(true);
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleCreateOrder = async () => {
    try {
      if (!buyingItems.length && !rentingItems.length) {
        throw new Error("At least one buying or renting item is required");
      }

      const orderType =
        buyingItems.length > 0 && rentingItems.length > 0
          ? "mixed"
          : buyingItems.length > 0
          ? "buying"
          : "renting";

      const companyAmounts = {};
      buyingItems.forEach((item) => {
        const companyId = item.company || item.company_id;
        const price = parseFloat(item.discounted_price || item.price); // Use discounted price
        const amount = price * (item.quantity || 1);
        companyAmounts[companyId] = (companyAmounts[companyId] || 0) + amount;
      });
      rentingItems.forEach((item) => {
        const companyId = item.company || item.company_id;
        const price = parseFloat(item.per_day_rent || item.price);
        const discount = parseFloat(item.discount) || 0;
        const discountedPrice = price - (price * discount) / 100;
        const amount = discountedPrice * formData.rentingDays * (item.quantity || 1);
        companyAmounts[companyId] = (companyAmounts[companyId] || 0) + amount;
      });

      const payload = {
        user_id: localStorage.getItem("user_id"),
        order_type: orderType,
        total_amount: totalPrice.toFixed(2),
        buying_items: buyingItems.map((item) => ({
          product_id: item.product_id,
          name: item.title || item.name,
          quantity: parseInt(item.quantity, 10) || 1,
          price: parseFloat(item.discounted_price || item.price), // Use discounted price
          company_id: item.company || item.company_id,
        })),
        renting_items: rentingItems.map((item) => ({
          product_id: item.product_id,
          name: item.title || item.name,
          quantity: parseInt(item.quantity, 10) || 1,
          price: parseFloat(item.per_day_rent || item.price),
          company_id: item.company || item.company_id,
        })),
        billing_details:
          buyingItems.length > 0
            ? {
                fullName: userDetails.fullName || "",
                email: userDetails.email || "",
                contactNumber: userDetails.contactNumber || "",
                deliveryLocation: formData.deliveryLocation || "",
              }
            : null,
        renting_details:
          rentingItems.length > 0
            ? {
                name: userDetails.fullName || "",
                contactNumber: userDetails.contactNumber || "",
                surveyType: formData.surveyType || "",
                rentingDays: parseInt(formData.rentingDays, 10) || 1,
                dateNeeded: formData.dateNeeded || "",
                verified: verificationStatus === "verified",
              }
            : null,
        booking_id: bookingId,
        transaction_uuid: uuidv4(),
      };

      const response = await API.post("/api/orders/create/", payload);
      setInvoices({
        ...response.data.invoices,
        booking_id: bookingId,
        company_amounts: companyAmounts,
      });
      return response.data.transaction_uuid;
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response ? error.response.data : error.message
      );
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error.includes("Booking ID already exists")
      ) {
        setBookingId(generateBookingId());
        return await handleCreateOrder();
      }
      throw new Error(
        error.response?.data?.error || "Failed to create order. Please try again."
      );
    }
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("access_token");
      if (!userId || !token) {
        throw new Error("User not logged in. Please log in to place an order.");
      }

      const orderPayload = {
        user_id: userId,
        booking_id: bookingId,
        order_type: paymentData.invoices.order_type,
        total_amount: totalPrice.toFixed(2),
        payment_data: {
          transaction_id: paymentData.transaction_id,
          method: paymentData.method,
        },
        invoices: paymentData.invoices,
      };

      await API.post(
        "/api/orders/update-payment/",
        orderPayload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Clear the cart after successful payment
      await API.delete("/api/cart/clear/");
      if (setCartItems) {
        setCartItems([]);
      }

      // Clear the wishlist after successful payment
      await API.delete("/api/wishlist/clear/");
      if (setWishlistItems) {
        setWishlistItems([]);
      }

      setPaymentSuccessModalOpen(true);
    } catch (error) {
      console.error("Error updating order with payment data:", error);
      setSnackbarMessage(
        error.message || "Failed to update order with payment data. Please try again."
      );
      setSnackbarOpen(true);
    }
  };

  const handleModalClose = () => {
    setPaymentSuccessModalOpen(false);
    navigate("/client/order");
  };

  const companyIds = [
    ...new Set([
      ...buyingItems.map((item) => String(item.company || item.company_id)),
      ...rentingItems.map((item) => String(item.company || item.company_id)),
    ]),
  ].filter(Boolean);

  const renderStepContent = (step) => {
    if (rentingItems.length > 0 && step === 0) {
      return (
        <Box>
          <Typography variant="h6">Verification Check</Typography>
          {verificationStatus === "verified" ? (
            <Alert severity="success">Your profile is verified!</Alert>
          ) : verificationStatus === "not_found" ? (
            <Alert severity="warning">
              Verify your profile to rent items.{" "}
              <Button
                onClick={() => navigate("/rent-verification")}
                color="warning"
              >
                Verify Now
              </Button>
            </Alert>
          ) : verificationStatus === "error" ? (
            <Alert severity="error">Error checking status. Try again.</Alert>
          ) : (
            <Alert severity="info">Checking status...</Alert>
          )}
        </Box>
      );
    }
    if (
      (rentingItems.length > 0 && step === 1) ||
      (buyingItems.length > 0 && step === 0)
    ) {
      return (
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              User Details
            </Typography>
            <TextField
              label="Full Name"
              value={userDetails.fullName}
              margin="dense"
              size="small"
              sx={{ width: "100%" }}
              disabled
            />
            <TextField
              label="Contact Number"
              value={userDetails.contactNumber}
              margin="dense"
              size="small"
              sx={{ width: "100%" }}
              disabled
            />
            <TextField
              label="Email"
              value={userDetails.email}
              margin="dense"
              size="small"
              sx={{ width: "100%" }}
              disabled
            />
          </Box>

          {buyingItems.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Delivery Details
              </Typography>
              <TextField
                label="Delivery Location"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleInputChange}
                margin="dense"
                required
                size="small"
                sx={{ width: "100%" }}
                error={errors.deliveryLocation}
                helperText={errors.deliveryLocation && "Required"}
              />
            </Box>
          )}

          {rentingItems.length > 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Renting Details
              </Typography>
              <TextField
                label="Survey Type / Purpose"
                name="surveyType"
                value={formData.surveyType}
                onChange={handleInputChange}
                margin="dense"
                size="small"
                sx={{ width: "100%" }}
                helperText="Optional"
              />
              <TextField
                label="Renting Days"
                name="rentingDays"
                type="number"
                value={formData.rentingDays}
                onChange={handleRentingDaysChange}
                margin="dense"
                required
                size="small"
                sx={{ width: "100%" }}
                inputProps={{ min: 1 }}
                error={errors.rentingDays}
                helperText={errors.rentingDays && "Must be at least 1"}
              />
              <TextField
                label="Date Needed"
                name="dateNeeded"
                type="date"
                value={formData.dateNeeded}
                onChange={handleInputChange}
                margin="dense"
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ width: "100%" }}
                error={errors.dateNeeded}
                helperText={errors.dateNeeded && "Required"}
              />
            </Box>
          )}
        </Box>
      );
    }
    if (step === steps.length - 1) {
      return (
        <Box>
          <Typography variant="h6">Payment</Typography>
          {rentingItems.length > 0 && (
            <Typography
              variant="h6"
              sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: "4px" }}
            >
              Total Renting Price: Rs. {rentingPrice.toFixed(2)}
            </Typography>
          )}
          <Typography
            variant="h6"
            sx={{ mt: 1, p: 2, bgcolor: "#f5f5f5", borderRadius: "4px" }}
          >
            Grand Total Price: Rs. {totalPrice.toFixed(2)}
          </Typography>
          {orderCreated ? (
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                totalPrice={totalPrice}
                onSuccess={handlePaymentSuccess}
                invoices={invoices}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                companyIds={companyIds}
              />
            </Elements>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Creating order, please wait...
            </Typography>
          )}
        </Box>
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        padding: "20px",
        overflowY: "auto",
        paddingTop: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          width: "100%",
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h5"
          sx={{
            flex: 1,
            textAlign: "center",
            fontWeight: 500,
            marginLeft: "-40px",
          }}
        >
          Checkout Form
        </Typography>
      </Box>

      <Paper
        sx={{
          padding: "16px",
          borderRadius: "8px",
          boxShadow: 3,
          width: "90%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            {activeStep === steps.length - 2 ? "Proceed to Payment" : "Next"}
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={paymentSuccessModalOpen}
        onClose={handleModalClose}
        aria-labelledby="payment-success-dialog-title"
      >
        <DialogTitle id="payment-success-dialog-title">
          Payment Successful
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your payment was successful! Your order has been placed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
};

export default CDCheckoutForm;