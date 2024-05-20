import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography, withStyles } from '@material-ui/core';
import QuestionDialog from './QuestionDialog'; // Import your QuestionDialog component here

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
    width: "100%",
  },
});

const UserPage = ({ user, classes }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {user.firstName || "Admin"}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Id: {user.id}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Email: {user.email}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog} // Open the dialog when the button is clicked
        >
          Request Session
        </Button>
      </CardActions>

      {/* Render the QuestionDialog component */}
      <QuestionDialog open={dialogOpen} onClose={handleCloseDialog} mentorId={user.id} />
    </Card>
  );
};

export default withStyles(styles)(UserPage);
