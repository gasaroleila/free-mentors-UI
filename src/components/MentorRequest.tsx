import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography, withStyles } from '@material-ui/core';
import QuestionDialog from './QuestionDialog'; // Import your QuestionDialog component here
import { useMutation } from '@apollo/react-hooks';
import { ACCEPT_REQUEST, REJECT_REQUEST } from '../mutations/UserMutation';

const styles = theme => ({
  card: {
    maxWidth: 345,
    height: "100%",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'space-between', // Adjusts the space between buttons
    width: "80%",
  },
});

const MentorRequest = ({ req, classes }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [acceptRequest, { data: accept, loading: acceptLoading, error: acceptError }] = useMutation(ACCEPT_REQUEST);
  const [rejectRequest, { data: reject, loading: loading, error }] = useMutation(REJECT_REQUEST);


  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAcceptRequest = () => {
    try {
      const response = acceptRequest({
        variables: {
         requestId: parseInt(req?.id),
       }
      })
      alert('Request Accepted Successfully!')
    } catch (e) {
      alert('Try Again!')
    }
  }

  const handleRejectRequest = () => {
      try {
        const response = rejectRequest({
          variables: {
          requestId: parseInt(req?.id),
        }
        })
        alert('Request Rejected Successfully!')
      } catch (e) {
        alert('Try Again!')
      }
  }

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {/* {req.firstName} */}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Question: {req?.question}
        </Typography>
      </CardContent>
      {req?.status == "Pending" && <CardActions className={classes.cardAction}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAcceptRequest} // Open the dialog when the button is clicked
        >
          Accept
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleRejectRequest} // Open the dialog when the button is clicked
        >
          Reject
        </Button>
      </CardActions>}

      {/* Render the QuestionDialog component */}
    </Card>
  );
};

export default withStyles(styles)(MentorRequest);
