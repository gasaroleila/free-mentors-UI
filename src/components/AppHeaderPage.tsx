import { AppBar, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { LOGGED_IN_USER } from '../queries/UserQuery';
import { useQuery } from '@apollo/react-hooks';

/**
 * @description holds App Header
 */

const AppHeaderPage = (props?: any) => {
  const { classes } = props;
  const { loading: isLoading, data: user, error: isError } = useQuery<any, {}>(
    LOGGED_IN_USER
  );


  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Free Mentors
        </Typography>
      </Toolbar>

      <Typography variant="h6" className={classes.title}>
          User: {user?.me?.firstName + " " + user?.me?.lastName}
      </Typography>
    </AppBar>
  );
}

export default withStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#e535ab",
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyItems: 'space-between',
    alignItems: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
}))(AppHeaderPage);
