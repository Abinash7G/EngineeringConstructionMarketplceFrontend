import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const EmailDialog = ({ open, onClose, inquiry, emailBody, setEmailBody, onSend }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: theme.palette.primary.main, color: 'white', borderTopLeftRadius: 2, borderTopRightRadius: 2 }}>
        Send Email to {inquiry?.full_name}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <TextField
          label="Email Body"
          multiline
          rows={8}
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ bgcolor: 'white' }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="secondary" sx={{ borderRadius: 2, textTransform: 'none' }}>
          Cancel
        </Button>
        <Button onClick={onSend} color="primary" variant="contained" sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailDialog;