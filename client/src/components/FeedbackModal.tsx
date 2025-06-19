import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 600,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: '#fcfcfc',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  border: '1px solid #ddd',
  fontFamily: 'Segoe UI, sans-serif',
};

type FeedbackType = {
  feedback: string;
};

type FeedbackModalProps = {
  open: boolean;
  onClose: () => void;
  feedback: FeedbackType[];
  currentIndex: number;
};

export default function FeedbackModal({
  open,
  onClose,
  feedback,
  currentIndex,
}: FeedbackModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ color: '#2c3e50', mb: 2 }}>
            Evaluation Feedback
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
            <ReactMarkdown>
              {feedback[currentIndex]?.feedback || 'No feedback available.'}
            </ReactMarkdown>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}
