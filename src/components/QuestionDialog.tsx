import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { REQUEST_SESSION } from '../mutations/UserMutation';
import { useMutation } from '@apollo/react-hooks';

const QuestionDialog = ({ open, onClose, mentorId}) => {
    const [question, setQuestion] = useState('');
    const [request, { data, loading, error }] = useMutation(REQUEST_SESSION);

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = async() => {
    // Perform any actions with the question data here
    try {
        const response = await request({
          variables: {
            mentorId: mentorId,
            question: question
            },
        });
        alert('Session requested successfully!');
      } catch (err) {
        console.error('Error changing user to mentor:', err);
      }
    handleClose();
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="question-dialog-title">
      <DialogTitle id="question-dialog-title">Ask a Question</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="question"
          label="Question"
          type="text"
          fullWidth
          value={question}
          onChange={handleQuestionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionDialog;
