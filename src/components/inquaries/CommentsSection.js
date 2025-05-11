import React from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CommentsSection = ({
  inquiry,
  commentText,
  setCommentText,
  onAddComment,
  replyText,
  setReplyText,
  replyingToCommentId,
  setReplyingToCommentId,
  onAddReply,
  replyStatus,
  formatDate,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 3, borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
      <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
        Comments
      </Typography>
      {inquiry.comments && inquiry.comments.length > 0 ? (
        <Box sx={{ pl: 2, mb: 2 }}>
          {inquiry.comments.map((comment) => (
            <Box key={comment.id} sx={{ mb: 1, p: 1, bgcolor: theme.palette.grey[100], borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.primary }}>
                "{comment.comment_text}"
              </Typography>
              {comment.company_response ? (
                <Typography variant="body2" sx={{ pl: 2, color: theme.palette.text.secondary, mt: 0.5 }}>
                  Response: {comment.company_response}
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', gap: 2, pl: 2, mt: 1 }}>
                  <TextField
                    label="Add Reply"
                    multiline
                    rows={2}
                    value={replyingToCommentId === comment.id ? replyText : ''}
                    onChange={(e) => {
                      setReplyingToCommentId(comment.id);
                      setReplyText(e.target.value);
                    }}
                    fullWidth
                    sx={{ maxWidth: 400, bgcolor: 'white' }}
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => onAddReply(comment.id)}
                    disabled={replyingToCommentId !== comment.id || !replyText}
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                  >
                    Submit Reply
                  </Button>
                </Box>
              )}
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
                Added on {formatDate(comment.created_at)}
              </Typography>
              {replyStatus && replyingToCommentId === comment.id && (
                <Alert severity={replyStatus.type} sx={{ mt: 1, pl: 2 }}>
                  {replyStatus.message}
                </Alert>
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" sx={{ pl: 2, mb: 2, color: theme.palette.text.secondary }}>
          No comments yet.
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 2, pl: 2, alignItems: 'flex-start' }}>
        <TextField
          label="Add Comment"
          multiline
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          fullWidth
          sx={{ maxWidth: 500, bgcolor: 'white' }}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onAddComment}
          disabled={!commentText}
          sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
        >
          Submit Comment
        </Button>
      </Box>
    </Box>
  );
};

export default CommentsSection;