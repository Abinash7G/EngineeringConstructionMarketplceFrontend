import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Divider,
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

const stripePromise = loadStripe("pk_test_51QnOg8HFXrh998Klft0d4A2QId9hPWxhNlU12COVn2WXlCgzx6BreTWwIE6zNBjINEMd1wANva7HvkWhHKS3XUnp00kQmaYhHn");

const PaymentForm = ({ plan: initialPlan, companyId, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [plan, setPlan] = useState(initialPlan);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setPlan(initialPlan);
  }, [initialPlan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || loading) return;

    setLoading(true);
    setError(null);

    try {
      if (!plan || !plan.name) {
        throw new Error("Plan is not defined. Please select a plan and try again.");
      }

      if (plan.name.toLowerCase() === 'trial') {
        const response = await API.post(`/api/subscribe/${companyId}/`, {
          plan: 'trial',
          price: '0.00',
          payment_data: {},
        });
        if (response.status === 200) {
          setOpenSnackbar(true);
          onSuccess({ transaction_id: 'trial', method: 'none' });
        }
        return;
      }

      const payload = {
        plan: plan.name.toLowerCase(),
        price: plan.price,
      };
      console.log("Payment Intent Payload:", payload);
      const response = await API.post(`/api/stripe/subscription-payment-intent/${companyId}/`, payload);
      const { client_secret: clientSecret } = response.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name: "Customer Name" },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setOpenSnackbar(true);
        onSuccess({
          transaction_id: result.paymentIntent.id,
          method: "stripe",
        });
      } else if (result.paymentIntent.status === "requires_action") {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);
        if (error) {
          setError(error.message);
        } else if (paymentIntent.status === "succeeded") {
          setOpenSnackbar(true);
          onSuccess({
            transaction_id: paymentIntent.id,
            method: "stripe",
          });
        } else {
          setError("Payment failed after additional action.");
        }
      }
    } catch (err) {
      console.error("Payment process failed:", err);
      if (err.response) {
        setError(err.response.data.error || "Payment failed. Please try again.");
      } else {
        setError("Payment failed: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {plan?.name.toLowerCase() !== 'trial' && (
        <>
          <Typography variant="body1" sx={{ mb: 1, color: "#424242", fontWeight: 500 }}>
            Card Number
          </Typography>
          <Box sx={{ mb: 2, p: 1, border: "1px solid #e0e0e0", borderRadius: 1, bgcolor: "#fafafa" }}>
            <CardNumberElement options={{ style: { base: { fontSize: "16px", color: "#424242", "::placeholder": { color: "#9e9e9e" } } } }} />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ mb: 1, color: "#424242", fontWeight: 500 }}>
                Expiry Date
              </Typography>
              <Box sx={{ p: 1, border: "1px solid #e0e0e0", borderRadius: 1, bgcolor: "#fafafa" }}>
                <CardExpiryElement options={{ style: { base: { fontSize: "16px", color: "#424242", "::placeholder": { color: "#9e9e9e" } } } }} />
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ mb: 1, color: "#424242", fontWeight: 500 }}>
                CVC
              </Typography>
              <Box sx={{ p: 1, border: "1px solid #e0e0e0", borderRadius: 1, bgcolor: "#fafafa" }}>
                <CardCvcElement options={{ style: { base: { fontSize: "16px", color: "#424242", "::placeholder": { color: "#9e9e9e" } } } }} />
              </Box>
            </Box>
          </Box>
        </>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: 2, boxShadow: 1 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap", // Allow buttons to wrap on smaller screens
        }}
      >
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={loading}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: { xs: 3, sm: 4 },
            py: 1,
            fontWeight: 500,
            color: "#757575",
            borderColor: "#e0e0e0",
            "&:hover": { borderColor: "#bdbdbd", bgcolor: "#f5f5f5" },
            minWidth: { xs: "120px", sm: "150px" }, // Prevent buttons from shrinking too much
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || (!stripe && plan?.name.toLowerCase() !== 'trial')}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: { xs: 3, sm: 4 },
            py: 1,
            fontWeight: 500,
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#1565c0" },
            "&:disabled": { bgcolor: "#bdbdbd" },
            minWidth: { xs: "120px", sm: "150px" }, // Prevent buttons from shrinking too much
          }}
        >
          {loading ? "Processing..." : plan?.name.toLowerCase() === 'trial' ? 'Start Trial' : `Pay ${plan?.price || ''}`}
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}>
          {plan?.name.toLowerCase() === 'trial' ? 'Free trial started!' : `Payment Successful! Thank you for subscribing to ${plan?.name}.`}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const Subscription = ({ companyId, onLogout, remainingDays, onSubscribe }) => {
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [hasUsedTrial, setHasUsedTrial] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchStatusAndPlans = async () => {
      try {
        const statusResponse = await API.get(`/subscription-status/${companyId}/`);
        setHasUsedTrial(statusResponse.data.has_used_trial);
        setIsSubscribed(statusResponse.data.is_subscribed);

        console.log("Subscription Status:", statusResponse.data);

        const plansResponse = await API.get("/api/plans/");
        let plansData = plansResponse.data;

        if (!statusResponse.data.has_used_trial && !statusResponse.data.is_subscribed) {
          plansData = plansData.filter(plan => plan.name.toLowerCase() !== 'trial').concat({
            name: 'Trial',
            price: '0.00',
            duration: '15 days',
            days: 15,
          });
        }
        setPlans(plansData);
        setLoadingPlans(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Unable to load data. Please try again later.");
        setLoadingPlans(false);
      }
    };
    fetchStatusAndPlans();
  }, [companyId]);

  const handleSubscribe = async (plan) => {
    setSelectedPlan(plan);
    setOpenPaymentDialog(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      if (!selectedPlan) {
        throw new Error("No plan selected. Please try again.");
      }
      if (selectedPlan.name.toLowerCase() !== 'trial') {
        const payload = {
          plan: selectedPlan.name.toLowerCase(),
          price: selectedPlan.price,
          payment_data: paymentData,
        };
        console.log("Subscription Payload:", payload);
        const response = await API.post(`/api/subscribe/${companyId}/`, payload);
        if (response.status === 200) {
          setOpenPaymentDialog(false);
          setSelectedPlan(null);
          onSubscribe();
        }
      } else {
        setOpenPaymentDialog(false);
        setSelectedPlan(null);
        onSubscribe();
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setError(err.response?.data?.error || "Failed to subscribe. Please try again.");
    }
  };

  const handleDialogClose = () => {
    setOpenPaymentDialog(false);
    setSelectedPlan(null);
  };

  const getTotalDays = (planDays) => {
    return remainingDays + planDays;
  };

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        backgroundColor: "#ffffff",
        borderRadius: 3,
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        animation: "fadeIn 0.5s ease-in",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 700,
          color: "#1a237e",
          mb: 2,
          fontSize: { xs: "1.8rem", md: "2.125rem" },
        }}
      >
        Choose Your Subscription Plan
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          color: "#757575",
          mb: 4,
          fontSize: { xs: "1rem", md: "1.1rem" },
        }}
      >
        Unlock premium features with a plan that suits your needs.
      </Typography>

      {remainingDays > 0 && (
        <Typography
          variant="h6"
          align="center"
          sx={{
            mb: 4,
            color: "#388e3c",
            fontWeight: 500,
            bgcolor: "#e8f5e9",
            py: 1,
            borderRadius: 2,
          }}
        >
          Remaining Days: {remainingDays}
        </Typography>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loadingPlans ? (
        <Typography align="center" sx={{ color: "#757575", py: 3 }}>
          Loading plans...
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.name}>
              <Paper
                sx={{
                  p: 4,
                  textAlign: "center",
                  border: selectedPlan?.name === plan.name ? "2px solid #1976d2" : "1px solid #e0e0e0",
                  borderRadius: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    borderColor: "#1976d2",
                  },
                  backgroundColor: "#fff",
                  animation: "fadeIn 0.5s ease-in",
                }}
                onClick={() => setSelectedPlan(plan)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1a237e",
                    mb: 2,
                    fontSize: "1.25rem",
                  }}
                >
                  {plan.name}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#1976d2",
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: "1.8rem", md: "2rem" },
                  }}
                >
                  {plan.price === '0.00' ? 'Free' : plan.price}
                </Typography>
                <Typography
                  sx={{
                    color: "#757575",
                    mb: 2,
                    fontSize: "0.95rem",
                  }}
                >
                  {plan.duration}
                </Typography>
                {remainingDays > 0 && selectedPlan?.name === plan.name && (
                  <Typography
                    sx={{
                      color: "#388e3c",
                      mb: 3,
                      fontWeight: 500,
                      fontSize: "0.95rem",
                    }}
                  >
                    Total Days: {getTotalDays(plan.days)}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#1565c0" },
                    textTransform: "none",
                    fontWeight: 500,
                    px: 4,
                    py: 1,
                    borderRadius: 2,
                    fontSize: "0.9rem",
                    width: "100%", // Ensure button doesn't overflow
                  }}
                  onClick={() => handleSubscribe(plan)}
                >
                  {plan.name.toLowerCase() === 'trial' ? 'Start Trial' : 'Subscribe'}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={openPaymentDialog}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            maxWidth: 500,
            width: "100%",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#1976d2",
            color: "#ffffff",
            fontWeight: 600,
            py: 2,
            fontSize: "1.25rem",
          }}
        >
          Complete Payment for {selectedPlan?.name || "Plan"}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedPlan ? (
            <Elements stripe={stripePromise}>
              <PaymentForm
                plan={selectedPlan}
                companyId={companyId}
                onSuccess={handlePaymentSuccess}
                onCancel={handleDialogClose}
              />
            </Elements>
          ) : (
            <Typography color="error" sx={{ py: 2 }}>
              No plan selected. Please try again.
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleDialogClose}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
              fontWeight: 500,
              color: "#757575",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default Subscription;