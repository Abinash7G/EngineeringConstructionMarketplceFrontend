import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PaymentDetails = ({ inquiry }) => {
  const theme = useTheme();
  const payments = inquiry.payments || [];

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <Box sx={{ mt: 3, borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
      <Typography variant="h6" sx={{ 
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        mb: 2
      }}>
        Payment Information
      </Typography>
      {payments.length > 0 ? (
        <Box sx={{ pl: 2, bgcolor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
          {payments.map((payment, index) => (
            <Box key={payment.id} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
                  Amount:
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Rs:{payment.amount}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
                  Payment Method:
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {payment.payment_method}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
                  Purpose:
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {payment.purpose}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '160px', color: theme.palette.text.primary }}>
                  Date:
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {formatDate(payment.created_at)}
                </Typography>
              </Box>
              {index < payments.length - 1 && (
                <Divider sx={{ my: 1, bgcolor: theme.palette.divider }} />
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" sx={{ pl: 2, color: theme.palette.text.secondary }}>
          No payment information available.
        </Typography>
      )}
    </Box>
  );
};

export default PaymentDetails;