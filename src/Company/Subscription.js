// // // // // import React, { useState } from "react";
// // // // // import { Box, Typography, Button, Grid, Paper, Alert } from "@mui/material";
// // // // // import API from "../services/api";

// // // // // const Subscription = ({ companyId, onLogout, remainingDays, onSubscribe }) => {
// // // // //   const [error, setError] = useState(null);
// // // // //   const [selectedPlan, setSelectedPlan] = useState(null);

// // // // //   const plans = [
// // // // //     { name: "Monthly", price: "RS. 500", duration: "30 days", days: 30 },
// // // // //     { name: "Quarterly", price: "RS. 1200", duration: "90 days", days: 90 },
// // // // //     { name: "Yearly", price: "RS. 4500", duration: "365 days", days: 365 },
// // // // //   ];

// // // // //   const handleSubscribe = async (plan) => {
// // // // //     try {
// // // // //       const response = await API.post(`/subscribe/${companyId}/`, {
// // // // //         plan: plan.name.toLowerCase(),
// // // // //       });
// // // // //       if (response.status === 200) {
// // // // //         onSubscribe(); // Call the onSubscribe callback to close modal and refresh
// // // // //       }
// // // // //     } catch (err) {
// // // // //       setError("Failed to subscribe. Please try again.");
// // // // //       console.error("Subscription error:", err);
// // // // //     }
// // // // //   };

// // // // //   const getTotalDays = (planDays) => {
// // // // //     return remainingDays + planDays;
// // // // //   };

// // // // //   return (
// // // // //     <Box
// // // // //       sx={{
// // // // //         p: 4,
// // // // //         maxWidth: 900,
// // // // //         mx: "auto",
// // // // //         mt: 4,
// // // // //         backgroundColor: "#f9f9f9",
// // // // //         borderRadius: 2,
// // // // //         boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
// // // // //       }}
// // // // //     >
// // // // //       <Typography
// // // // //         variant="h4"
// // // // //         gutterBottom
// // // // //         align="center"
// // // // //         sx={{
// // // // //           fontWeight: "bold",
// // // // //           color: "#333",
// // // // //           mb: 4,
// // // // //         }}
// // // // //       >
// // // // //         Choose Your Subscription Plan
// // // // //       </Typography>

// // // // //       {remainingDays > 0 && (
// // // // //         <Typography
// // // // //           variant="h6"
// // // // //           align="center"
// // // // //           sx={{ mb: 3, color: "#2196f3" }}
// // // // //         >
// // // // //           Remaining Days: {remainingDays}
// // // // //         </Typography>
// // // // //       )}

// // // // //       {error && (
// // // // //         <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
// // // // //           {error}
// // // // //         </Alert>
// // // // //       )}

// // // // //       <Grid container spacing={3} justifyContent="center">
// // // // //         {plans.map((plan) => (
// // // // //           <Grid item xs={12} sm={6} md={4} key={plan.name}>
// // // // //             <Paper
// // // // //               sx={{
// // // // //                 p: 4,
// // // // //                 textAlign: "center",
// // // // //                 border: selectedPlan === plan.name ? "2px solid #2196f3" : "2px solid #ddd",
// // // // //                 borderRadius: 2,
// // // // //                 transition: "transform 0.3s, box-shadow 0.3s",
// // // // //                 "&:hover": {
// // // // //                   transform: "scale(1.05)",
// // // // //                   boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
// // // // //                 },
// // // // //                 backgroundColor: "#fff",
// // // // //               }}
// // // // //               onClick={() => setSelectedPlan(plan.name)}
// // // // //             >
// // // // //               <Typography
// // // // //                 variant="h6"
// // // // //                 sx={{
// // // // //                   fontWeight: "bold",
// // // // //                   color: "#555",
// // // // //                   mb: 2,
// // // // //                 }}
// // // // //               >
// // // // //                 {plan.name}
// // // // //               </Typography>
// // // // //               <Typography
// // // // //                 variant="h4"
// // // // //                 sx={{
// // // // //                   color: "#2196f3",
// // // // //                   fontWeight: "bold",
// // // // //                   mb: 1,
// // // // //                 }}
// // // // //               >
// // // // //                 {plan.price}
// // // // //               </Typography>
// // // // //               <Typography
// // // // //                 sx={{
// // // // //                   color: "#777",
// // // // //                   mb: 1,
// // // // //                 }}
// // // // //               >
// // // // //                 {plan.duration}
// // // // //               </Typography>
// // // // //               {remainingDays > 0 && selectedPlan === plan.name && (
// // // // //                 <Typography
// // // // //                   sx={{
// // // // //                     color: "#2196f3",
// // // // //                     mb: 3,
// // // // //                     fontWeight: "bold",
// // // // //                   }}
// // // // //                 >
// // // // //                   Total Days: {getTotalDays(plan.days)}
// // // // //                 </Typography>
// // // // //               )}
// // // // //               <Button
// // // // //                 variant="contained"
// // // // //                 sx={{
// // // // //                   backgroundColor: "#2196f3",
// // // // //                   "&:hover": { backgroundColor: "#1976d2" },
// // // // //                   textTransform: "uppercase",
// // // // //                   fontWeight: "bold",
// // // // //                   px: 4,
// // // // //                   py: 1,
// // // // //                   borderRadius: 1,
// // // // //                 }}
// // // // //                 onClick={() => handleSubscribe(plan)}
// // // // //               >
// // // // //                 Subscription
// // // // //               </Button>
// // // // //             </Paper>
// // // // //           </Grid>
// // // // //         ))}
// // // // //       </Grid>
// // // // //     </Box>
// // // // //   );
// // // // // };

// // // // // export default Subscription;
// // // // import React, { useState, useEffect } from "react";
// // // // import {
// // // //   Box,
// // // //   Typography,
// // // //   Button,
// // // //   Grid,
// // // //   Paper,
// // // //   Alert,
// // // //   Dialog,
// // // //   DialogTitle,
// // // //   DialogContent,
// // // //   DialogActions,
// // // //   Snackbar,
// // // // } from "@mui/material";
// // // // import { loadStripe } from "@stripe/stripe-js";
// // // // import {
// // // //   Elements,
// // // //   useStripe,
// // // //   useElements,
// // // //   CardNumberElement,
// // // //   CardExpiryElement,
// // // //   CardCvcElement,
// // // // } from "@stripe/react-stripe-js";
// // // // import API from "../services/api";

// // // // const stripePromise = loadStripe("pk_test_51QnOg8HFXrh998Klft0d4A2QId9hPWxhNlU12COVn2WXlCgzx6BreTWwIE6zNBjINEMd1wANva7HvkWhHKS3XUnp00kQmaYhHn");

// // // // const PaymentForm = ({ plan: initialPlan, companyId, onSuccess, onCancel }) => {
// // // //   const stripe = useStripe();
// // // //   const elements = useElements();
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);
// // // //   const [plan, setPlan] = useState(initialPlan);
// // // //   const [openSnackbar, setOpenSnackbar] = useState(false);

// // // //   useEffect(() => {
// // // //     setPlan(initialPlan);
// // // //   }, [initialPlan]);

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!stripe || !elements || loading) return;

// // // //     setLoading(true);
// // // //     setError(null);

// // // //     try {
// // // //       if (!plan || !plan.name) {
// // // //         throw new Error("Plan is not defined. Please select a plan and try again.");
// // // //       }

// // // //       if (plan.name.toLowerCase() === 'trial') {
// // // //         const response = await API.post(`/api/subscribe/${companyId}/`, {
// // // //           plan: 'trial',
// // // //           payment_data: {}
// // // //         });
// // // //         if (response.status === 200) {
// // // //           setOpenSnackbar(true);
// // // //           onSuccess({ transaction_id: 'trial', method: 'none' });
// // // //         }
// // // //         return;
// // // //       }

// // // //       const response = await API.post(`/api/stripe/subscription-payment-intent/${companyId}/`, {
// // // //         plan: plan.name.toLowerCase(),
// // // //       });
// // // //       const { client_secret: clientSecret } = response.data;

// // // //       const result = await stripe.confirmCardPayment(clientSecret, {
// // // //         payment_method: {
// // // //           card: elements.getElement(CardNumberElement),
// // // //           billing_details: { name: "Customer Name" },
// // // //         },
// // // //       });

// // // //       if (result.error) {
// // // //         setError(result.error.message);
// // // //       } else if (result.paymentIntent.status === "succeeded") {
// // // //         setOpenSnackbar(true);
// // // //         onSuccess({
// // // //           transaction_id: result.paymentIntent.id,
// // // //           method: "stripe",
// // // //         });
// // // //       } else if (result.paymentIntent.status === "requires_action") {
// // // //         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);
// // // //         if (error) {
// // // //           setError(error.message);
// // // //         } else if (paymentIntent.status === "succeeded") {
// // // //           setOpenSnackbar(true);
// // // //           onSuccess({
// // // //             transaction_id: paymentIntent.id,
// // // //             method: "stripe",
// // // //           });
// // // //         } else {
// // // //           setError("Payment failed after additional action.");
// // // //         }
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Payment process failed:", err);
// // // //       if (err.response) {
// // // //         setError(err.response.data.error || "Payment failed. Please try again.");
// // // //       } else {
// // // //         setError("Payment failed: " + err.message);
// // // //       }
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleSnackbarClose = (event, reason) => {
// // // //     if (reason === "clickaway") return;
// // // //     setOpenSnackbar(false);
// // // //   };

// // // //   return (
// // // //     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
// // // //       {plan?.name.toLowerCase() !== 'trial' && (
// // // //         <>
// // // //           <Typography variant="body1" sx={{ mb: 1 }}>Card Number</Typography>
// // // //           <CardNumberElement options={{ style: { base: { fontSize: "16px" } } }} />
// // // //           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
// // // //             <Box sx={{ flex: 1 }}>
// // // //               <Typography variant="body1" sx={{ mb: 1 }}>Expiry Date</Typography>
// // // //               <CardExpiryElement options={{ style: { base: { fontSize: "16px" } } }} />
// // // //             </Box>
// // // //             <Box sx={{ flex: 1 }}>
// // // //               <Typography variant="body1" sx={{ mb: 1 }}>CVC</Typography>
// // // //               <CardCvcElement options={{ style: { base: { fontSize: "16px" } } }} />
// // // //             </Box>
// // // //           </Box>
// // // //         </>
// // // //       )}
// // // //       {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
// // // //       <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
// // // //         <Button variant="outlined" onClick={onCancel} disabled={loading}>
// // // //           Cancel
// // // //         </Button>
// // // //         <Button
// // // //           type="submit"
// // // //           variant="contained"
// // // //           color="primary"
// // // //           disabled={loading || (!stripe && plan?.name.toLowerCase() !== 'trial')}
// // // //         >
// // // //           {loading ? "Processing..." : plan?.name.toLowerCase() === 'trial' ? 'Start Trial' : `Pay ${plan?.price || ''}`}
// // // //         </Button>
// // // //       </Box>
// // // //       <Snackbar
// // // //         open={openSnackbar}
// // // //         autoHideDuration={6000}
// // // //         onClose={handleSnackbarClose}
// // // //         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
// // // //       >
// // // //         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
// // // //           {plan?.name.toLowerCase() === 'trial' ? 'Free trial started!' : `Payment Successful! Thank you for subscribing to ${plan?.name}.`}
// // // //         </Alert>
// // // //       </Snackbar>
// // // //     </Box>
// // // //   );
// // // // };

// // // // const Subscription = ({ companyId, onLogout, remainingDays, onSubscribe }) => {
// // // //   const [error, setError] = useState(null);
// // // //   const [selectedPlan, setSelectedPlan] = useState(null);
// // // //   const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
// // // //   const [plans, setPlans] = useState([]);
// // // //   const [loadingPlans, setLoadingPlans] = useState(true);
// // // //   const [hasUsedTrial, setHasUsedTrial] = useState(false);
// // // //   const [isSubscribed, setIsSubscribed] = useState(false);

// // // //   useEffect(() => {
// // // //     const fetchStatusAndPlans = async () => {
// // // //       try {
// // // //         // Fetch subscription status
// // // //         const statusResponse = await API.get(`/subscription-status/${companyId}/`);
// // // //         setHasUsedTrial(statusResponse.data.has_used_trial);
// // // //         setIsSubscribed(statusResponse.data.is_subscribed);

// // // //         // Fetch plans
// // // //         const plansResponse = await API.get("/api/plans/");
// // // //         let plansData = plansResponse.data;
        
// // // //         // Only show trial plan if the company has not used a trial AND is not currently subscribed
// // // //         if (!statusResponse.data.has_used_trial && !statusResponse.data.is_subscribed) {
// // // //           plansData = plansData.filter(plan => plan.name.toLowerCase() !== 'trial').concat({
// // // //             name: 'Trial',
// // // //             price: '0.00',
// // // //             duration: '15 days',
// // // //             days: 15
// // // //           });
// // // //         }
// // // //         setPlans(plansData);
// // // //         setLoadingPlans(false);
// // // //       } catch (err) {
// // // //         console.error("Failed to fetch data:", err);
// // // //         setError("Unable to load data. Please try again later.");
// // // //         setLoadingPlans(false);
// // // //       }
// // // //     };
// // // //     fetchStatusAndPlans();
// // // //   }, [companyId]);

// // // //   const handleSubscribe = async (plan) => {
// // // //     setSelectedPlan(plan);
// // // //     setOpenPaymentDialog(true);
// // // //   };

// // // //   const handlePaymentSuccess = async (paymentData) => {
// // // //     try {
// // // //       if (!selectedPlan) {
// // // //         throw new Error("No plan selected. Please try again.");
// // // //       }
// // // //       if (selectedPlan.name.toLowerCase() !== 'trial') {
// // // //         const response = await API.post(`/api/subscribe/${companyId}/`, {
// // // //           plan: selectedPlan.name.toLowerCase(),
// // // //           payment_data: paymentData,
// // // //         });
// // // //         if (response.status === 200) {
// // // //           setOpenPaymentDialog(false);
// // // //           setSelectedPlan(null);
// // // //           onSubscribe();
// // // //         }
// // // //       } else {
// // // //         setOpenPaymentDialog(false);
// // // //         setSelectedPlan(null);
// // // //         onSubscribe();
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Subscription error:", err);
// // // //       setError(err.response?.data?.error || "Failed to subscribe. Please try again.");
// // // //     }
// // // //   };

// // // //   const handleDialogClose = () => {
// // // //     setOpenPaymentDialog(false);
// // // //     setSelectedPlan(null);
// // // //   };

// // // //   const getTotalDays = (planDays) => {
// // // //     return remainingDays + planDays;
// // // //   };

// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         p: 4,
// // // //         maxWidth: 900,
// // // //         mx: "auto",
// // // //         mt: 4,
// // // //         backgroundColor: "#f9f9f9",
// // // //         borderRadius: 2,
// // // //         boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
// // // //       }}
// // // //     >
// // // //       <Typography
// // // //         variant="h4"
// // // //         gutterBottom
// // // //         align="center"
// // // //         sx={{ fontWeight: "bold", color: "#333", mb: 4 }}
// // // //       >
// // // //         Choose Your Subscription Plan
// // // //       </Typography>

// // // //       {remainingDays > 0 && (
// // // //         <Typography variant="h6" align="center" sx={{ mb: 3, color: "#2196f3" }}>
// // // //           Remaining Days: {remainingDays}
// // // //         </Typography>
// // // //       )}

// // // //       {error && (
// // // //         <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
// // // //           {error}
// // // //         </Alert>
// // // //       )}

// // // //       {loadingPlans ? (
// // // //         <Typography align="center">Loading plans...</Typography>
// // // //       ) : (
// // // //         <Grid container spacing={3} justifyContent="center">
// // // //           {plans.map((plan) => (
// // // //             <Grid item xs={12} sm={6} md={4} key={plan.name}>
// // // //               <Paper
// // // //                 sx={{
// // // //                   p: 4,
// // // //                   textAlign: "center",
// // // //                   border: selectedPlan?.name === plan.name ? "2px solid #2196f3" : "2px solid #ddd",
// // // //                   borderRadius: 2,
// // // //                   transition: "transform 0.3s, box-shadow 0.3s",
// // // //                   "&:hover": {
// // // //                     transform: "scale(1.05)",
// // // //                     boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
// // // //                   },
// // // //                   backgroundColor: "#fff",
// // // //                 }}
// // // //                 onClick={() => setSelectedPlan(plan)}
// // // //               >
// // // //                 <Typography
// // // //                   variant="h6"
// // // //                   sx={{ fontWeight: "bold", color: "#555", mb: 2 }}
// // // //                 >
// // // //                   {plan.name}
// // // //                 </Typography>
// // // //                 <Typography
// // // //                   variant="h4"
// // // //                   sx={{ color: "#2196f3", fontWeight: "bold", mb: 1 }}
// // // //                 >
// // // //                   {plan.price === '0.00' ? 'Free' : plan.price}
// // // //                 </Typography>
// // // //                 <Typography sx={{ color: "#777", mb: 1 }}>
// // // //                   {plan.duration}
// // // //                 </Typography>
// // // //                 {remainingDays > 0 && selectedPlan?.name === plan.name && (
// // // //                   <Typography sx={{ color: "#2196f3", mb: 3, fontWeight: "bold" }}>
// // // //                     Total Days: {getTotalDays(plan.days)}
// // // //                   </Typography>
// // // //                 )}
// // // //                 <Button
// // // //                   variant="contained"
// // // //                   sx={{
// // // //                     backgroundColor: "#2196f3",
// // // //                     "&:hover": { backgroundColor: "#1976d2" },
// // // //                     textTransform: "uppercase",
// // // //                     fontWeight: "bold",
// // // //                     px: 4,
// // // //                     py: 1,
// // // //                     borderRadius: 1,
// // // //                   }}
// // // //                   onClick={() => handleSubscribe(plan)}
// // // //                 >
// // // //                   {plan.name.toLowerCase() === 'trial' ? 'Start Trial' : 'Subscribe'}
// // // //                 </Button>
// // // //               </Paper>
// // // //             </Grid>
// // // //           ))}
// // // //         </Grid>
// // // //       )}

// // // //       <Dialog open={openPaymentDialog} onClose={handleDialogClose}>
// // // //         <DialogTitle>Complete Payment for {selectedPlan?.name || "Plan"}</DialogTitle>
// // // //         <DialogContent>
// // // //           {selectedPlan ? (
// // // //             <Elements stripe={stripePromise}>
// // // //               <PaymentForm
// // // //                 plan={selectedPlan}
// // // //                 companyId={companyId}
// // // //                 onSuccess={handlePaymentSuccess}
// // // //                 onCancel={handleDialogClose}
// // // //               />
// // // //             </Elements>
// // // //           ) : (
// // // //             <Typography color="error">No plan selected. Please try again.</Typography>
// // // //           )}
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={handleDialogClose}>Close</Button>
// // // //         </DialogActions>
// // // //       </Dialog>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default Subscription;
// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Box,
// // //   Typography,
// // //   Button,
// // //   Grid,
// // //   Paper,
// // //   Alert,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   Snackbar,
// // // } from "@mui/material";
// // // import { loadStripe } from "@stripe/stripe-js";
// // // import {
// // //   Elements,
// // //   useStripe,
// // //   useElements,
// // //   CardNumberElement,
// // //   CardExpiryElement,
// // //   CardCvcElement,
// // // } from "@stripe/react-stripe-js";
// // // import API from "../services/api";

// // // const stripePromise = loadStripe("pk_test_51QnOg8HFXrh998Klft0d4A2QId9hPWxhNlU12COVn2WXlCgzx6BreTWwIE6zNBjINEMd1wANva7HvkWhHKS3XUnp00kQmaYhHn");

// // // const PaymentForm = ({ plan: initialPlan, companyId, onSuccess, onCancel }) => {
// // //   const stripe = useStripe();
// // //   const elements = useElements();
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [plan, setPlan] = useState(initialPlan);
// // //   const [openSnackbar, setOpenSnackbar] = useState(false);

// // //   useEffect(() => {
// // //     setPlan(initialPlan);
// // //   }, [initialPlan]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!stripe || !elements || loading) return;

// // //     setLoading(true);
// // //     setError(null);

// // //     try {
// // //       if (!plan || !plan.name) {
// // //         throw new Error("Plan is not defined. Please select a plan and try again.");
// // //       }

// // //       if (plan.name.toLowerCase() === 'trial') {
// // //         const response = await API.post(`/api/subscribe/${companyId}/`, {
// // //           plan: 'trial',
// // //           payment_data: {}
// // //         });
// // //         if (response.status === 200) {
// // //           setOpenSnackbar(true);
// // //           onSuccess({ transaction_id: 'trial', method: 'none' });
// // //         }
// // //         return;
// // //       }

// // //       const response = await API.post(`/api/stripe/subscription-payment-intent/${companyId}/`, {
// // //         plan: plan.name.toLowerCase(),
// // //       });
// // //       const { client_secret: clientSecret } = response.data;

// // //       const result = await stripe.confirmCardPayment(clientSecret, {
// // //         payment_method: {
// // //           card: elements.getElement(CardNumberElement),
// // //           billing_details: { name: "Customer Name" },
// // //         },
// // //       });

// // //       if (result.error) {
// // //         setError(result.error.message);
// // //       } else if (result.paymentIntent.status === "succeeded") {
// // //         setOpenSnackbar(true);
// // //         onSuccess({
// // //           transaction_id: result.paymentIntent.id,
// // //           method: "stripe",
// // //         });
// // //       } else if (result.paymentIntent.status === "requires_action") {
// // //         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);
// // //         if (error) {
// // //           setError(error.message);
// // //         } else if (paymentIntent.status === "succeeded") {
// // //           setOpenSnackbar(true);
// // //           onSuccess({
// // //             transaction_id: paymentIntent.id,
// // //             method: "stripe",
// // //           });
// // //         } else {
// // //           setError("Payment failed after additional action.");
// // //         }
// // //       }
// // //     } catch (err) {
// // //       console.error("Payment process failed:", err);
// // //       if (err.response) {
// // //         setError(err.response.data.error || "Payment failed. Please try again.");
// // //       } else {
// // //         setError("Payment failed: " + err.message);
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSnackbarClose = (event, reason) => {
// // //     if (reason === "clickaway") return;
// // //     setOpenSnackbar(false);
// // //   };

// // //   return (
// // //     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
// // //       {plan?.name.toLowerCase() !== 'trial' && (
// // //         <>
// // //           <Typography variant="body1" sx={{ mb: 1 }}>Card Number</Typography>
// // //           <CardNumberElement options={{ style: { base: { fontSize: "16px" } } }} />
// // //           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
// // //             <Box sx={{ flex: 1 }}>
// // //               <Typography variant="body1" sx={{ mb: 1 }}>Expiry Date</Typography>
// // //               <CardExpiryElement options={{ style: { base: { fontSize: "16px" } } }} />
// // //             </Box>
// // //             <Box sx={{ flex: 1 }}>
// // //               <Typography variant="body1" sx={{ mb: 1 }}>CVC</Typography>
// // //               <CardCvcElement options={{ style: { base: { fontSize: "16px" } } }} />
// // //             </Box>
// // //           </Box>
// // //         </>
// // //       )}
// // //       {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
// // //       <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
// // //         <Button variant="outlined" onClick={onCancel} disabled={loading}>
// // //           Cancel
// // //         </Button>
// // //         <Button
// // //           type="submit"
// // //           variant="contained"
// // //           color="primary"
// // //           disabled={loading || (!stripe && plan?.name.toLowerCase() !== 'trial')}
// // //         >
// // //           {loading ? "Processing..." : plan?.name.toLowerCase() === 'trial' ? 'Start Trial' : `Pay ${plan?.price || ''}`}
// // //         </Button>
// // //       </Box>
// // //       <Snackbar
// // //         open={openSnackbar}
// // //         autoHideDuration={6000}
// // //         onClose={handleSnackbarClose}
// // //         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
// // //       >
// // //         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
// // //           {plan?.name.toLowerCase() === 'trial' ? 'Free trial started!' : `Payment Successful! Thank you for subscribing to ${plan?.name}.`}
// // //         </Alert>
// // //       </Snackbar>
// // //     </Box>
// // //   );
// // // };

// // // const Subscription = ({ companyId, onLogout, remainingDays, onSubscribe }) => {
// // //   const [error, setError] = useState(null);
// // //   const [selectedPlan, setSelectedPlan] = useState(null);
// // //   const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
// // //   const [plans, setPlans] = useState([]);
// // //   const [loadingPlans, setLoadingPlans] = useState(true);
// // //   const [hasUsedTrial, setHasUsedTrial] = useState(false);
// // //   const [isSubscribed, setIsSubscribed] = useState(false);

// // //   useEffect(() => {
// // //     const fetchStatusAndPlans = async () => {
// // //       try {
// // //         // Fetch subscription status
// // //         const statusResponse = await API.get(`/subscription-status/${companyId}/`);
// // //         setHasUsedTrial(statusResponse.data.has_used_trial);
// // //         setIsSubscribed(statusResponse.data.is_subscribed);

// // //         // Fetch plans
// // //         const plansResponse = await API.get("/api/plans/");
// // //         let plansData = plansResponse.data;
        
// // //         // Only show trial plan if the company has not used a trial AND is not currently subscribed
// // //         if (!statusResponse.data.has_used_trial && !statusResponse.data.is_subscribed) {
// // //           plansData = plansData.filter(plan => plan.name.toLowerCase() !== 'trial').concat({
// // //             name: 'Trial',
// // //             price: '0.00',
// // //             duration: '15 days',
// // //             days: 15
// // //           });
// // //         }
// // //         setPlans(plansData);
// // //         setLoadingPlans(false);
// // //       } catch (err) {
// // //         console.error("Failed to fetch data:", err);
// // //         setError("Unable to load data. Please try again later.");
// // //         setLoadingPlans(false);
// // //       }
// // //     };
// // //     fetchStatusAndPlans();
// // //   }, [companyId]);

// // //   const handleSubscribe = async (plan) => {
// // //     setSelectedPlan(plan);
// // //     setOpenPaymentDialog(true);
// // //   };

// // //   const handlePaymentSuccess = async (paymentData) => {
// // //     try {
// // //       if (!selectedPlan) {
// // //         throw new Error("No plan selected. Please try again.");
// // //       }
// // //       if (selectedPlan.name.toLowerCase() !== 'trial') {
// // //         const response = await API.post(`/api/subscribe/${companyId}/`, {
// // //           plan: selectedPlan.name.toLowerCase(),
// // //           payment_data: paymentData,
// // //         });
// // //         if (response.status === 200) {
// // //           setOpenPaymentDialog(false);
// // //           setSelectedPlan(null);
// // //           onSubscribe();
// // //         }
// // //       } else {
// // //         setOpenPaymentDialog(false);
// // //         setSelectedPlan(null);
// // //         onSubscribe();
// // //       }
// // //     } catch (err) {
// // //       console.error("Subscription error:", err);
// // //       setError(err.response?.data?.error || "Failed to subscribe. Please try again.");
// // //     }
// // //   };

// // //   const handleDialogClose = () => {
// // //     setOpenPaymentDialog(false);
// // //     setSelectedPlan(null);
// // //   };

// // //   const getTotalDays = (planDays) => {
// // //     return remainingDays + planDays;
// // //   };

// // //   return (
// // //     <Box
// // //       sx={{
// // //         p: 4,
// // //         maxWidth: 900,
// // //         mx: "auto",
// // //         mt: 4,
// // //         backgroundColor: "#f9f9f9",
// // //         borderRadius: 2,
// // //         boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
// // //       }}
// // //     >
// // //       <Typography
// // //         variant="h4"
// // //         gutterBottom
// // //         align="center"
// // //         sx={{ fontWeight: "bold", color: "#333", mb: 4 }}
// // //       >
// // //         Choose Your Subscription Plan
// // //       </Typography>

// // //       {remainingDays > 0 && (
// // //         <Typography variant="h6" align="center" sx={{ mb: 3, color: "#2196f3" }}>
// // //           Remaining Days: {remainingDays}
// // //         </Typography>
// // //       )}

// // //       {error && (
// // //         <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
// // //           {error}
// // //         </Alert>
// // //       )}

// // //       {loadingPlans ? (
// // //         <Typography align="center">Loading plans...</Typography>
// // //       ) : (
// // //         <Grid container spacing={3} justifyContent="center">
// // //           {plans.map((plan) => (
// // //             <Grid item xs={12} sm={6} md={4} key={plan.name}>
// // //               <Paper
// // //                 sx={{
// // //                   p: 4,
// // //                   textAlign: "center",
// // //                   border: selectedPlan?.name === plan.name ? "2px solid #2196f3" : "2px solid #ddd",
// // //                   borderRadius: 2,
// // //                   transition: "transform 0.3s, box-shadow 0.3s",
// // //                   "&:hover": {
// // //                     transform: "scale(1.05)",
// // //                     boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
// // //                   },
// // //                   backgroundColor: "#fff",
// // //                 }}
// // //                 onClick={() => setSelectedPlan(plan)}
// // //               >
// // //                 <Typography
// // //                   variant="h6"
// // //                   sx={{ fontWeight: "bold", color: "#555", mb: 2 }}
// // //                 >
// // //                   {plan.name}
// // //                 </Typography>
// // //                 <Typography
// // //                   variant="h4"
// // //                   sx={{ color: "#2196f3", fontWeight: "bold", mb: 1 }}
// // //                 >
// // //                   {plan.price === '0.00' ? 'Free' : plan.price}
// // //                 </Typography>
// // //                 <Typography sx={{ color: "#777", mb: 1 }}>
// // //                   {plan.duration}
// // //                 </Typography>
// // //                 {remainingDays > 0 && selectedPlan?.name === plan.name && (
// // //                   <Typography sx={{ color: "#2196f3", mb: 3, fontWeight: "bold" }}>
// // //                     Total Days: {getTotalDays(plan.days)}
// // //                   </Typography>
// // //                 )}
// // //                 <Button
// // //                   variant="contained"
// // //                   sx={{
// // //                     backgroundColor: "#2196f3",
// // //                     "&:hover": { backgroundColor: "#1976d2" },
// // //                     textTransform: "uppercase",
// // //                     fontWeight: "bold",
// // //                     px: 4,
// // //                     py: 1,
// // //                     borderRadius: 1,
// // //                   }}
// // //                   onClick={() => handleSubscribe(plan)}
// // //                 >
// // //                   {plan.name.toLowerCase() === 'trial' ? 'Start Trial' : 'Subscribe'}
// // //                 </Button>
// // //               </Paper>
// // //             </Grid>
// // //           ))}
// // //         </Grid>
// // //       )}

// // //       <Dialog open={openPaymentDialog} onClose={handleDialogClose}>
// // //         <DialogTitle>Complete Payment for {selectedPlan?.name || "Plan"}</DialogTitle>
// // //         <DialogContent>
// // //           {selectedPlan ? (
// // //             <Elements stripe={stripePromise}>
// // //               <PaymentForm
// // //                 plan={selectedPlan}
// // //                 companyId={companyId}
// // //                 onSuccess={handlePaymentSuccess}
// // //                 onCancel={handleDialogClose}
// // //               />
// // //             </Elements>
// // //           ) : (
// // //             <Typography color="error">No plan selected. Please try again.</Typography>
// // //           )}
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={handleDialogClose}>Close</Button>
// // //         </DialogActions>
// // //       </Dialog>
// // //     </Box>
// // //   );
// // // };

// // // export default Subscription;
// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Grid,
// //   Paper,
// //   Alert,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Snackbar,
// // } from "@mui/material";
// // import { loadStripe } from "@stripe/stripe-js";
// // import {
// //   Elements,
// //   useStripe,
// //   useElements,
// //   CardNumberElement,
// //   CardExpiryElement,
// //   CardCvcElement,
// // } from "@stripe/react-stripe-js";
// // import API from "../services/api";

// // const stripePromise = loadStripe("pk_test_51QnOg8HFXrh998Klft0d4A2QId9hPWxhNlU12COVn2WXlCgzx6BreTWwIE6zNBjINEMd1wANva7HvkWhHKS3XUnp00kQmaYhHn");

// // const PaymentForm = ({ plan: initialPlan, companyId, onSuccess, onCancel }) => {
// //   const stripe = useStripe();
// //   const elements = useElements();
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [plan, setPlan] = useState(initialPlan);
// //   const [openSnackbar, setOpenSnackbar] = useState(false);

// //   useEffect(() => {
// //     setPlan(initialPlan);
// //   }, [initialPlan]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!stripe || !elements || loading) return;

// //     setLoading(true);
// //     setError(null);

// //     try {
// //       if (!plan || !plan.name) {
// //         throw new Error("Plan is not defined. Please select a plan and try again.");
// //       }

// //       if (plan.name.toLowerCase() === 'trial') {
// //         const response = await API.post(`/api/subscribe/${companyId}/`, {
// //           plan: 'trial',
// //           price: '0.00', // Send price for trial
// //           payment_data: {},
// //         });
// //         if (response.status === 200) {
// //           setOpenSnackbar(true);
// //           onSuccess({ transaction_id: 'trial', method: 'none' });
// //         }
// //         return;
// //       }

// //       const response = await API.post(`/api/stripe/subscription-payment-intent/${companyId}/`, {
// //         plan: plan.name.toLowerCase(),
// //       });
// //       const { client_secret: clientSecret } = response.data;

// //       const result = await stripe.confirmCardPayment(clientSecret, {
// //         payment_method: {
// //           card: elements.getElement(CardNumberElement),
// //           billing_details: { name: "Customer Name" },
// //         },
// //       });

// //       if (result.error) {
// //         setError(result.error.message);
// //       } else if (result.paymentIntent.status === "succeeded") {
// //         setOpenSnackbar(true);
// //         onSuccess({
// //           transaction_id: result.paymentIntent.id,
// //           method: "stripe",
// //         });
// //       } else if (result.paymentIntent.status === "requires_action") {
// //         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);
// //         if (error) {
// //           setError(error.message);
// //         } else if (paymentIntent.status === "succeeded") {
// //           setOpenSnackbar(true);
// //           onSuccess({
// //             transaction_id: paymentIntent.id,
// //             method: "stripe",
// //           });
// //         } else {
// //           setError("Payment failed after additional action.");
// //         }
// //       }
// //     } catch (err) {
// //       console.error("Payment process failed:", err);
// //       if (err.response) {
// //         setError(err.response.data.error || "Payment failed. Please try again.");
// //       } else {
// //         setError("Payment failed: " + err.message);
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSnackbarClose = (event, reason) => {
// //     if (reason === "clickaway") return;
// //     setOpenSnackbar(false);
// //   };

// //   return (
// //     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
// //       {plan?.name.toLowerCase() !== 'trial' && (
// //         <>
// //           <Typography variant="body1" sx={{ mb: 1 }}>Card Number</Typography>
// //           <CardNumberElement options={{ style: { base: { fontSize: "16px" } } }} />
// //           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
// //             <Box sx={{ flex: 1 }}>
// //               <Typography variant="body1" sx={{ mb: 1 }}>Expiry Date</Typography>
// //               <CardExpiryElement options={{ style: { base: { fontSize: "16px" } } }} />
// //             </Box>
// //             <Box sx={{ flex: 1 }}>
// //               <Typography variant="body1" sx={{ mb: 1 }}>CVC</Typography>
// //               <CardCvcElement options={{ style: { base: { fontSize: "16px" } } }} />
// //             </Box>
// //           </Box>
// //         </>
// //       )}
// //       {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
// //       <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
// //         <Button variant="outlined" onClick={onCancel} disabled={loading}>
// //           Cancel
// //         </Button>
// //         <Button
// //           type="submit"
// //           variant="contained"
// //           color="primary"
// //           disabled={loading || (!stripe && plan?.name.toLowerCase() !== 'trial')}
// //         >
// //           {loading ? "Processing..." : plan?.name.toLowerCase() === 'trial' ? 'Start Trial' : `Pay ${plan?.price || ''}`}
// //         </Button>
// //       </Box>
// //       <Snackbar
// //         open={openSnackbar}
// //         autoHideDuration={6000}
// //         onClose={handleSnackbarClose}
// //         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
// //       >
// //         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
// //           {plan?.name.toLowerCase() === 'trial' ? 'Free trial started!' : `Payment Successful! Thank you for subscribing to ${plan?.name}.`}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // };

// // const Subscription = ({ companyId, onLogout, remainingDays, onSubscribe }) => {
// //   const [error, setError] = useState(null);
// //   const [selectedPlan, setSelectedPlan] = useState(null);
// //   const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
// //   const [plans, setPlans] = useState([]);
// //   const [loadingPlans, setLoadingPlans] = useState(true);
// //   const [hasUsedTrial, setHasUsedTrial] = useState(false);
// //   const [isSubscribed, setIsSubscribed] = useState(false);

// //   useEffect(() => {
// //     const fetchStatusAndPlans = async () => {
// //       try {
// //         // Fetch subscription status
// //         const statusResponse = await API.get(`/subscription-status/${companyId}/`); // Fixed endpoint path
// //         setHasUsedTrial(statusResponse.data.has_used_trial);
// //         setIsSubscribed(statusResponse.data.is_subscribed);

// //         // Fetch plans
// //         const plansResponse = await API.get("/api/plans/");
// //         let plansData = plansResponse.data;

// //         // Only show trial plan if the company has not used a trial AND is not currently subscribed
// //         if (!statusResponse.data.has_used_trial && !statusResponse.data.is_subscribed) {
// //           plansData = plansData.filter(plan => plan.name.toLowerCase() !== 'trial').concat({
// //             name: 'Trial',
// //             price: '0.00',
// //             duration: '15 days',
// //             days: 15,
// //           });
// //         }
// //         setPlans(plansData);
// //         setLoadingPlans(false);
// //       } catch (err) {
// //         console.error("Failed to fetch data:", err);
// //         setError("Unable to load data. Please try again later.");
// //         setLoadingPlans(false);
// //       }
// //     };
// //     fetchStatusAndPlans();
// //   }, [companyId]);

// //   const handleSubscribe = async (plan) => {
// //     setSelectedPlan(plan);
// //     setOpenPaymentDialog(true);
// //   };

// //   const handlePaymentSuccess = async (paymentData) => {
// //     try {
// //       if (!selectedPlan) {
// //         throw new Error("No plan selected. Please try again.");
// //       }
// //       if (selectedPlan.name.toLowerCase() !== 'trial') {
// //         const response = await API.post(`/api/subscribe/${companyId}/`, {
// //           plan: selectedPlan.name.toLowerCase(),
// //           price: selectedPlan.price, // Add price to the request
// //           payment_data: paymentData,
// //         });
// //         if (response.status === 200) {
// //           setOpenPaymentDialog(false);
// //           setSelectedPlan(null);
// //           onSubscribe();
// //         }
// //       } else {
// //         setOpenPaymentDialog(false);
// //         setSelectedPlan(null);
// //         onSubscribe();
// //       }
// //     } catch (err) {
// //       console.error("Subscription error:", err);
// //       setError(err.response?.data?.error || "Failed to subscribe. Please try again.");
// //     }
// //   };

// //   const handleDialogClose = () => {
// //     setOpenPaymentDialog(false);
// //     setSelectedPlan(null);
// //   };

// //   const getTotalDays = (planDays) => {
// //     return remainingDays + planDays;
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         p: 4,
// //         maxWidth: 900,
// //         mx: "auto",
// //         mt: 4,
// //         backgroundColor: "#f9f9f9",
// //         borderRadius: 2,
// //         boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
// //       }}
// //     >
// //       <Typography
// //         variant="h4"
// //         gutterBottom
// //         align="center"
// //         sx={{ fontWeight: "bold", color: "#333", mb: 4 }}
// //       >
// //         Choose Your Subscription Plan
// //       </Typography>

// //       {remainingDays > 0 && (
// //         <Typography variant="h6" align="center" sx={{ mb: 3, color: "#2196f3" }}>
// //           Remaining Days: {remainingDays}
// //         </Typography>
// //       )}

// //       {error && (
// //         <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
// //           {error}
// //         </Alert>
// //       )}

// //       {loadingPlans ? (
// //         <Typography align="center">Loading plans...</Typography>
// //       ) : (
// //         <Grid container spacing={3} justifyContent="center">
// //           {plans.map((plan) => (
// //             <Grid item xs={12} sm={6} md={4} key={plan.name}>
// //               <Paper
// //                 sx={{
// //                   p: 4,
// //                   textAlign: "center",
// //                   border: selectedPlan?.name === plan.name ? "2px solid #2196f3" : "2px solid #ddd",
// //                   borderRadius: 2,
// //                   transition: "transform 0.3s, box-shadow 0.3s",
// //                   "&:hover": {
// //                     transform: "scale(1.05)",
// //                     boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
// //                   },
// //                   backgroundColor: "#fff",
// //                 }}
// //                 onClick={() => setSelectedPlan(plan)}
// //               >
// //                 <Typography
// //                   variant="h6"
// //                   sx={{ fontWeight: "bold", color: "#555", mb: 2 }}
// //                 >
// //                   {plan.name}
// //                 </Typography>
// //                 <Typography
// //                   variant="h4"
// //                   sx={{ color: "#2196f3", fontWeight: "bold", mb: 1 }}
// //                 >
// //                   {plan.price === '0.00' ? 'Free' : plan.price}
// //                 </Typography>
// //                 <Typography sx={{ color: "#777", mb: 1 }}>
// //                   {plan.duration}
// //                 </Typography>
// //                 {remainingDays > 0 && selectedPlan?.name === plan.name && (
// //                   <Typography sx={{ color: "#2196f3", mb: 3, fontWeight: "bold" }}>
// //                     Total Days: {getTotalDays(plan.days)}
// //                   </Typography>
// //                 )}
// //                 <Button
// //                   variant="contained"
// //                   sx={{
// //                     backgroundColor: "#2196f3",
// //                     "&:hover": { backgroundColor: "#1976d2" },
// //                     textTransform: "uppercase",
// //                     fontWeight: "bold",
// //                     px: 4,
// //                     py: 1,
// //                     borderRadius: 1,
// //                   }}
// //                   onClick={() => handleSubscribe(plan)}
// //                 >
// //                   {plan.name.toLowerCase() === 'trial' ? 'Start Trial' : 'Subscribe'}
// //                 </Button>
// //               </Paper>
// //             </Grid>
// //           ))}
// //         </Grid>
// //       )}

// //       <Dialog open={openPaymentDialog} onClose={handleDialogClose}>
// //         <DialogTitle>Complete Payment for {selectedPlan?.name || "Plan"}</DialogTitle>
// //         <DialogContent>
// //           {selectedPlan ? (
// //             <Elements stripe={stripePromise}>
// //               <PaymentForm
// //                 plan={selectedPlan}
// //                 companyId={companyId}
// //                 onSuccess={handlePaymentSuccess}
// //                 onCancel={handleDialogClose}
// //               />
// //             </Elements>
// //           ) : (
// //             <Typography color="error">No plan selected. Please try again.</Typography>
// //           )}
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleDialogClose}>Close</Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default Subscription;
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Paper,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
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

// const stripePromise = loadStripe("pk_test_51QnOg8HFXrh998Klft0d4A2QId9hPWxhNlU12COVn2WXlCgzx6BreTWwIE6zNBjINEMd1wANva7HvkWhHKS3XUnp00kQmaYhHn");

// const PaymentForm = ({ plan: initialPlan, companyId, onSuccess, onCancel }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [plan, setPlan] = useState(initialPlan);
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   useEffect(() => {
//     setPlan(initialPlan);
//   }, [initialPlan]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || loading) return;

//     setLoading(true);
//     setError(null);

//     try {
//       if (!plan || !plan.name) {
//         throw new Error("Plan is not defined. Please select a plan and try again.");
//       }

//       if (plan.name.toLowerCase() === 'trial') {
//         const response = await API.post(`/api/subscribe/${companyId}/`, {
//           plan: 'trial',
//           price: '0.00', // Send price for trial
//           payment_data: {},
//         });
//         if (response.status === 200) {
//           setOpenSnackbar(true);
//           onSuccess({ transaction_id: 'trial', method: 'none' });
//         }
//         return;
//       }

//       const response = await API.post(`/api/stripe/subscription-payment-intent/${companyId}/`, {
//         plan: plan.name.toLowerCase(),
//       });
//       const { client_secret: clientSecret } = response.data;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//           billing_details: { name: "Customer Name" },
//         },
//       });

//       if (result.error) {
//         setError(result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         setOpenSnackbar(true);
//         onSuccess({
//           transaction_id: result.paymentIntent.id,
//           method: "stripe",
//         });
//       } else if (result.paymentIntent.status === "requires_action") {
//         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);
//         if (error) {
//           setError(error.message);
//         } else if (paymentIntent.status === "succeeded") {
//           setOpenSnackbar(true);
//           onSuccess({
//             transaction_id: paymentIntent.id,
//             method: "stripe",
//           });
//         } else {
//           setError("Payment failed after additional action.");
//         }
//       }
//     } catch (err) {
//       console.error("Payment process failed:", err);
//       if (err.response) {
//         setError(err.response.data.error || "Payment failed. Please try again.");
//       } else {
//         setError("Payment failed: " + err.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") return;
//     setOpenSnackbar(false);
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//       {plan?.name.toLowerCase() !== 'trial' && (
//         <>
//           <Typography variant="body1" sx={{ mb: 1 }}>Card Number</Typography>
//           <CardNumberElement options={{ style: { base: { fontSize: "16px" } } }} />
//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <Box sx={{ flex: 1 }}>
//               <Typography variant="body1" sx={{ mb: 1 }}>Expiry Date</Typography>
//               <CardExpiryElement options={{ style: { base: { fontSize: "16px" } } }} />
//             </Box>
//             <Box sx={{ flex: 1 }}>
//               <Typography variant="body1" sx={{ mb: 1 }}>CVC</Typography>
//               <CardCvcElement options={{ style: { base: { fontSize: "16px" } } }} />
//             </Box>
//           </Box>
//         </>
//       )}
//       {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
//       <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
//         <Button variant="outlined" onClick={onCancel} disabled={loading}>
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           disabled={loading || (!stripe && plan?.name.toLowerCase() !== 'trial')}
//         >
//           {loading ? "Processing..." : plan?.name.toLowerCase() === 'trial' ? 'Start Trial' : `Pay ${plan?.price || ''}`}
//         </Button>
//       </Box>
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
//           {plan?.name.toLowerCase() === 'trial' ? 'Free trial started!' : `Payment Successful! Thank you for subscribing to ${plan?.name}.`}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// const Subscription = ({ companyId, onLogout, remainingDays, onSubscribe }) => {
//   const [error, setError] = useState(null);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
//   const [plans, setPlans] = useState([]);
//   const [loadingPlans, setLoadingPlans] = useState(true);
//   const [hasUsedTrial, setHasUsedTrial] = useState(false);
//   const [isSubscribed, setIsSubscribed] = useState(false);

//   useEffect(() => {
//     const fetchStatusAndPlans = async () => {
//       try {
//         // Fetch subscription status
//         const statusResponse = await API.get(`/subscription-status/${companyId}/`);
//         setHasUsedTrial(statusResponse.data.has_used_trial);
//         setIsSubscribed(statusResponse.data.is_subscribed);

//         // Log for debugging
//         console.log("Subscription Status:", statusResponse.data);

//         // Fetch plans
//         const plansResponse = await API.get("/api/plans/");
//         let plansData = plansResponse.data;

//         // Only show trial plan if the company has not used a trial AND is not currently subscribed
//         if (!statusResponse.data.has_used_trial && !statusResponse.data.is_subscribed) {
//           plansData = plansData.filter(plan => plan.name.toLowerCase() !== 'trial').concat({
//             name: 'Trial',
//             price: '0.00',
//             duration: '15 days',
//             days: 15,
//           });
//         }
//         setPlans(plansData);
//         setLoadingPlans(false);
//       } catch (err) {
//         console.error("Failed to fetch data:", err);
//         setError("Unable to load data. Please try again later.");
//         setLoadingPlans(false);
//       }
//     };
//     fetchStatusAndPlans();
//   }, [companyId]);

//   const handleSubscribe = async (plan) => {
//     setSelectedPlan(plan);
//     setOpenPaymentDialog(true);
//   };

//   const handlePaymentSuccess = async (paymentData) => {
//     try {
//       if (!selectedPlan) {
//         throw new Error("No plan selected. Please try again.");
//       }
//       if (selectedPlan.name.toLowerCase() !== 'trial') {
//         const payload = {
//           plan: selectedPlan.name.toLowerCase(),
//           price: selectedPlan.price, // Add price to the request
//           payment_data: paymentData,
//         };
//         console.log("Subscription Payload:", payload); // Debug the payload
//         const response = await API.post(`/api/subscribe/${companyId}/`, payload);
//         if (response.status === 200) {
//           setOpenPaymentDialog(false);
//           setSelectedPlan(null);
//           onSubscribe();
//         }
//       } else {
//         setOpenPaymentDialog(false);
//         setSelectedPlan(null);
//         onSubscribe();
//       }
//     } catch (err) {
//       console.error("Subscription error:", err);
//       setError(err.response?.data?.error || "Failed to subscribe. Please try again.");
//     }
//   };

//   const handleDialogClose = () => {
//     setOpenPaymentDialog(false);
//     setSelectedPlan(null);
//   };

//   const getTotalDays = (planDays) => {
//     return remainingDays + planDays;
//   };

//   return (
//     <Box
//       sx={{
//         p: 4,
//         maxWidth: 900,
//         mx: "auto",
//         mt: 4,
//         backgroundColor: "#f9f9f9",
//         borderRadius: 2,
//         boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//       }}
//     >
//       <Typography
//         variant="h4"
//         gutterBottom
//         align="center"
//         sx={{ fontWeight: "bold", color: "#333", mb: 4 }}
//       >
//         Choose Your Subscription Plan
//       </Typography>

//       {remainingDays > 0 && (
//         <Typography variant="h6" align="center" sx={{ mb: 3, color: "#2196f3" }}>
//           Remaining Days: {remainingDays}
//         </Typography>
//       )}

//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
//           {error}
//         </Alert>
//       )}

//       {loadingPlans ? (
//         <Typography align="center">Loading plans...</Typography>
//       ) : (
//         <Grid container spacing={3} justifyContent="center">
//           {plans.map((plan) => (
//             <Grid item xs={12} sm={6} md={4} key={plan.name}>
//               <Paper
//                 sx={{
//                   p: 4,
//                   textAlign: "center",
//                   border: selectedPlan?.name === plan.name ? "2px solid #2196f3" : "2px solid #ddd",
//                   borderRadius: 2,
//                   transition: "transform 0.3s, box-shadow 0.3s",
//                   "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
//                   },
//                   backgroundColor: "#fff",
//                 }}
//                 onClick={() => setSelectedPlan(plan)}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: "bold", color: "#555", mb: 2 }}
//                 >
//                   {plan.name}
//                 </Typography>
//                 <Typography
//                   variant="h4"
//                   sx={{ color: "#2196f3", fontWeight: "bold", mb: 1 }}
//                 >
//                   {plan.price === '0.00' ? 'Free' : plan.price}
//                 </Typography>
//                 <Typography sx={{ color: "#777", mb: 1 }}>
//                   {plan.duration}
//                 </Typography>
//                 {remainingDays > 0 && selectedPlan?.name === plan.name && (
//                   <Typography sx={{ color: "#2196f3", mb: 3, fontWeight: "bold" }}>
//                     Total Days: {getTotalDays(plan.days)}
//                   </Typography>
//                 )}
//                 <Button
//                   variant="contained"
//                   sx={{
//                     backgroundColor: "#2196f3",
//                     "&:hover": { backgroundColor: "#1976d2" },
//                     textTransform: "uppercase",
//                     fontWeight: "bold",
//                     px: 4,
//                     py: 1,
//                     borderRadius: 1,
//                   }}
//                   onClick={() => handleSubscribe(plan)}
//                 >
//                   {plan.name.toLowerCase() === 'trial' ? 'Start Trial' : 'Subscribe'}
//                 </Button>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       <Dialog open={openPaymentDialog} onClose={handleDialogClose}>
//         <DialogTitle>Complete Payment for {selectedPlan?.name || "Plan"}</DialogTitle>
//         <DialogContent>
//           {selectedPlan ? (
//             <Elements stripe={stripePromise}>
//               <PaymentForm
//                 plan={selectedPlan}
//                 companyId={companyId}
//                 onSuccess={handlePaymentSuccess}
//                 onCancel={handleDialogClose}
//               />
//             </Elements>
//           ) : (
//             <Typography color="error">No plan selected. Please try again.</Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Subscription;
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
          price: '0.00', // Send price for trial
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
        price: plan.price, // Add price to the request
      };
      console.log("Payment Intent Payload:", payload); // Debug the payload
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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {plan?.name.toLowerCase() !== 'trial' && (
        <>
          <Typography variant="body1" sx={{ mb: 1 }}>Card Number</Typography>
          <CardNumberElement options={{ style: { base: { fontSize: "16px" } } }} />
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>Expiry Date</Typography>
              <CardExpiryElement options={{ style: { base: { fontSize: "16px" } } }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>CVC</Typography>
              <CardCvcElement options={{ style: { base: { fontSize: "16px" } } }} />
            </Box>
          </Box>
        </>
      )}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || (!stripe && plan?.name.toLowerCase() !== 'trial')}
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
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
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
        // Fetch subscription status
        const statusResponse = await API.get(`/subscription-status/${companyId}/`); // Fixed endpoint path
        setHasUsedTrial(statusResponse.data.has_used_trial);
        setIsSubscribed(statusResponse.data.is_subscribed);

        // Log for debugging
        console.log("Subscription Status:", statusResponse.data);

        // Fetch plans
        const plansResponse = await API.get("/api/plans/");
        let plansData = plansResponse.data;

        // Only show trial plan if the company has not used a trial AND is not currently subscribed
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
          price: selectedPlan.price, // Add price to the request
          payment_data: paymentData,
        };
        console.log("Subscription Payload:", payload); // Debug the payload
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
        p: 4,
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#333", mb: 4 }}
      >
        Choose Your Subscription Plan
      </Typography>

      {remainingDays > 0 && (
        <Typography variant="h6" align="center" sx={{ mb: 3, color: "#2196f3" }}>
          Remaining Days: {remainingDays}
        </Typography>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loadingPlans ? (
        <Typography align="center">Loading plans...</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.name}>
              <Paper
                sx={{
                  p: 4,
                  textAlign: "center",
                  border: selectedPlan?.name === plan.name ? "2px solid #2196f3" : "2px solid #ddd",
                  borderRadius: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  },
                  backgroundColor: "#fff",
                }}
                onClick={() => setSelectedPlan(plan)}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#555", mb: 2 }}
                >
                  {plan.name}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "#2196f3", fontWeight: "bold", mb: 1 }}
                >
                  {plan.price === '0.00' ? 'Free' : plan.price}
                </Typography>
                <Typography sx={{ color: "#777", mb: 1 }}>
                  {plan.duration}
                </Typography>
                {remainingDays > 0 && selectedPlan?.name === plan.name && (
                  <Typography sx={{ color: "#2196f3", mb: 3, fontWeight: "bold" }}>
                    Total Days: {getTotalDays(plan.days)}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#2196f3",
                    "&:hover": { backgroundColor: "#1976d2" },
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    px: 4,
                    py: 1,
                    borderRadius: 1,
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

      <Dialog open={openPaymentDialog} onClose={handleDialogClose}>
        <DialogTitle>Complete Payment for {selectedPlan?.name || "Plan"}</DialogTitle>
        <DialogContent>
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
            <Typography color="error">No plan selected. Please try again.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Subscription;