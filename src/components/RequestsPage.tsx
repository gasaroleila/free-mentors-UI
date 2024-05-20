import { useMutation, useQuery } from '@apollo/react-hooks';
import { Container, GridList, GridListTile, withStyles, Fab, Box, Button } from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { CHANGE_USER_TO_MENTOR_MUTATION, GET_ALL_MENTORS, GET_ALL_REQUESTS, GET_USERS, LOGGED_IN_USER, MentorsData, UsersData } from '../queries/UserQuery';
// import UserDialog from './UserDialog';
import UserPage from './UserPage';
import { User } from '../models/UserModel';
import { DialogAction } from '../models/CommonModel';
import { globalStoreManager } from '../store';
import { useHistory } from 'react-router-dom';
import AppHeaderPage from './AppHeaderPage';
import MentorRequest from './MentorRequest';

/**
 * @description holds user list component
 */

// style properties
type StyleProps = {
  classes: any
}

type Props = StyleProps;

/**
 * User List Component
 * @param props properties
 */
const RequestsPage = (props: Props) => {
  // sends get users query to graphql server

  const { classes } = props;

  const { loading, data, error } = useQuery<any, {}>(
    GET_ALL_REQUESTS
  );

  const history = useHistory()

  const handleLogout = () => {
    localStorage.clear()
    history.push('/login')
  }


  return (
    <>
    <AppHeaderPage/>
    <Container className={classes.container}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button className={classes.logoutButton} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <div className={classes.userList}>
      {
        loading ? (
          <p>Loading ...</p>
        ) :
        error ? (
          <p>{error.message}</p>
        ) : (
          <GridList cellHeight={200} className={classes.gridList} cols={4}>
            {data && data.mentorRequests.map(req => (
              <GridListTile key={req.id}><MentorRequest req={req}/></GridListTile>
            ))}
          </GridList>
        )
      }
      </div>
      {/* <UserDialog onCallback={updateState} /> */}
      </Container>
      </>
  );
}

export default withStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
  },
  userList: {
    marginTop: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}))(RequestsPage);
