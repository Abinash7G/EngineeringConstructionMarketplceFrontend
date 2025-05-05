// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   TextField,
//   Alert,
//   Snackbar,
// } from "@mui/material";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
// } from "@stripe/react-stripe-js";

// import API from "../services/api";

// // Initialize Stripe with the public key
// const stripePromise = loadStripe(
//   "pk_test_51QnOg8HFXrh998Klft0d4A2QId9hPWxhNlU12COVn2WXlCgzx6BreTWwIE6zNBjINEMd1wANva7HvkWhHKS3XUnp00kQmaYhHn"
// );

// const StripePaymentForm = ({ amount, inquiryId, purpose, onSuccess, onClose }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || loading) return;
  
//     setLoading(true);
//     setError(null);
  
//     try {
//       const accessToken = localStorage.getItem("access_token");
//       if (!accessToken) {
//         throw new Error("User not authenticated. Please log in.");
//       }
  
//       const response = await API.post(
//         "api/payments/",
//         {
//           amount: Math.round(amount * 100),
//           inquiry_id: inquiryId,
//           purpose: purpose,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       const { client_secret: clientSecret } = response.data;
  
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//           billing_details: { name: "Customer Name" },
//         },
//       });
  
//       if (result.error) {
//         setError(result.error.message);
//         setSnackbarMessage(result.error.message);
//         setSnackbarOpen(true);
//       } else if (result.paymentIntent.status === "succeeded") {
//         onSuccess({
//           method: "stripe",
//           amount: amount,
//           inquiry_id: inquiryId,
//           purpose: purpose,
//         });
//         onClose();
//       }
//     } catch (err) {
//       console.error("Payment API error:", err.response);
//       const errorMessage =
//         err.response?.data?.error || "Payment failed. Please try again.";
//       setError(errorMessage);
//       setSnackbarMessage(errorMessage);
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//       <Typography variant="body1" sx={{ mb: 1 }}>
//         Card Number
//       </Typography>
//       <CardNumberElement options={{ style: { base: { fontSize: "16px" } } }} />
//       <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="body1" sx={{ mb: 1 }}>
//             Expiry Date
//           </Typography>
//           <CardExpiryElement
//             options={{ style: { base: { fontSize: "16px" } } }}
//           />
//         </Box>
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="body1" sx={{ mb: 1 }}>
//             CVC
//           </Typography>
//           <CardCvcElement options={{ style: { base: { fontSize: "16px" } } }} />
//         </Box>
//       </Box>
//       {error && (
//         <Alert severity="error" sx={{ mt: 2 }}>
//           {error}
//         </Alert>
//       )}
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         disabled={loading || !stripe || !elements}
//         sx={{ mt: 3, width: "100%" }}
//       >
//         {loading ? "Processing..." : `Pay Rs. ${amount.toFixed(2)}`}
//       </Button>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbarOpen(false)}
//           severity="error"
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// const PaymentModal = ({ open, onClose, inquiryId, onSuccess }) => {
//   const [amount, setAmount] = useState("");
//   const [purpose, setPurpose] = useState("");
//   const [amountError, setAmountError] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   const handleAmountChange = (e) => {
//     const value = e.target.value;
//     setAmount(value);
//     setAmountError(isNaN(value) || Number(value) <= 0);
//   };

//   const handlePurposeChange = (e) => {
//     setPurpose(e.target.value);
//   };

//   const handlePaymentSuccess = (paymentData) => {
//     setSnackbarMessage(
//       `Payment of Rs. ${paymentData.amount.toFixed(2)} for Inquiry ${paymentData.inquiry_id} was successful!`
//     );
//     setSnackbarOpen(true);
//     onSuccess(paymentData);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Make a Payment</DialogTitle>
//       <DialogContent>
//         <Box sx={{ mb: 2 }}>
//           <TextField
//             label="Amount (Rs.)"
//             value={amount}
//             onChange={handleAmountChange}
//             type="number"
//             fullWidth
//             margin="dense"
//             size="small"
//             error={amountError}
//             helperText={amountError ? "Please enter a valid amount" : ""}
//             inputProps={{ min: 0, step: "0.01" }}
//           />
//         </Box>
//         <Box sx={{ mb: 2 }}>
//           <TextField
//             label="Purpose of Payment"
//             value={purpose}
//             onChange={handlePurposeChange}
//             fullWidth
//             margin="dense"
//             size="small"
//           />
//         </Box>
//         {amount && !amountError && (
//           <Elements stripe={stripePromise}>
//             <StripePaymentForm
//               amount={Number(amount)}
//               inquiryId={inquiryId}
//               purpose={purpose}
//               onSuccess={handlePaymentSuccess}
//               onClose={onClose}
//             />
//           </Elements>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary">
//           Cancel
//         </Button>
//       </DialogActions>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbarOpen(false)}
//           severity="success"
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Dialog>
//   );
// };

// export default PaymentModal;
import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
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

// Initialize Stripe with the public key
const stripePromise = loadStripe(
  "pk_test_51QnOg8HFXrh998Klft0d4A2QId9hPWxhNlU12COVn2WXlCgzx6BreTWwIE6zNBjINEMd1wANva7HvkWhHKS3XUnp00kQmaYhHn"
);

const StripePaymentForm = ({ amount, inquiryId, purpose, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || loading) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("User not authenticated. Please log in.");
      }
  
      const response = await API.post(
        "api/payments/",
        {
          amount: Math.round(amount * 100),
          inquiry_id: inquiryId,
          purpose: purpose,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { client_secret: clientSecret } = response.data;
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name: "Customer Name" },
        },
      });
  
      if (result.error) {
        setError(result.error.message);
        setSnackbarMessage(result.error.message);
        setSnackbarOpen(true);
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess({
          method: "stripe",
          amount: amount,
          inquiry_id: inquiryId,
          purpose: purpose,
        });
        onClose();
      }
    } catch (err) {
      console.error("Payment API error:", err.response);
      const errorMessage =
        err.response?.data?.error || "Payment failed. Please try again.";
      setError(errorMessage);
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
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
        disabled={loading || !stripe || !elements}
        sx={{ mt: 3, width: "100%" }}
      >
        {loading ? "Processing..." : `Pay Rs. ${amount.toFixed(2)}`}
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const PaymentModal = ({ open, onClose, inquiryId, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false); // State for success modal
  const [successData, setSuccessData] = useState(null); // Store payment success data

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setAmountError(isNaN(value) || Number(value) <= 0);
  };

  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  const handlePaymentSuccess = (paymentData) => {
    setSuccessData(paymentData); // Store the payment data for the success modal
    setSuccessModalOpen(true); // Open the success modal
    onSuccess(paymentData); // Call the parent onSuccess callback
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false); // Close the success modal
    onClose(); // Close the payment modal
  };

  return (
    <>
      {/* Payment Modal */}
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Make a Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Amount (Rs.)"
              value={amount}
              onChange={handleAmountChange}
              type="number"
              fullWidth
              margin="dense"
              size="small"
              error={amountError}
              helperText={amountError ? "Please enter a valid amount" : ""}
              inputProps={{ min: 0, step: "0.01" }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Purpose of Payment"
              value={purpose}
              onChange={handlePurposeChange}
              fullWidth
              margin="dense"
              size="small"
            />
          </Box>
          {amount && !amountError && (
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                amount={Number(amount)}
                inquiryId={inquiryId}
                purpose={purpose}
                onSuccess={handlePaymentSuccess}
                onClose={onClose}
              />
            </Elements>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Success Modal */}
      <Dialog open={successModalOpen} onClose={handleSuccessModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>Payment Successful</DialogTitle>
        <DialogContent>
          {successData && (
            <Typography variant="body1">
              Payment of Rs. {successData.amount.toFixed(2)} for Inquiry {successData.inquiry_id} was successful!
              {successData.purpose && (
                <>
                  <br />
                  Purpose: {successData.purpose}
                </>
              )}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentModal;