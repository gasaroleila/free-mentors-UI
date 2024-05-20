import { useMutation, useQuery } from '@apollo/react-hooks';
import { Container, GridList, GridListTile, withStyles, Fab, Box, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { CHANGE_USER_TO_MENTOR_MUTATION, GET_ALL_MENTORS, GET_USERS, LOGGED_IN_USER, MentorsData, UsersData } from '../queries/UserQuery';
// import UserDialog from './UserDialog';
import UserPage from './UserPage';
import { User } from '../models/UserModel';
import { DialogAction } from '../models/CommonModel';
import { globalStoreManager } from '../store';
import { useHistory } from 'react-router-dom';
import AppHeaderPage from './AppHeaderPage';

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
const UsersPage = (props: Props) => {
  // sends get users query to graphql server
  const { loading, data, error } = useQuery<MentorsData, {}>(
    GET_ALL_MENTORS
  );

  const [changeUserToMentor, { data: mentorData, loading: mentorLoading, error: mentorError }] = useMutation(CHANGE_USER_TO_MENTOR_MUTATION);

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const history = useHistory();

  const { classes } = props;

  /**
   * updates user list with updated / created / deleted user
   * @param user user instance
   * @param action dialog action
   */
  // const updateState = (user: User, action: DialogAction) => {
  //   if (data && data?.users) {
  //     if (action === DialogAction.Edit || action === DialogAction.Delete) {
  //       let oldUserIndex = data.users.map(u => {
  //         return u.id;
  //       }).indexOf(user.id);
  //       if (oldUserIndex != null && oldUserIndex >= 0) {
  //         if (action === DialogAction.Edit) {
  //           data.users[oldUserIndex] = user;
  //         } else if (action === DialogAction.Delete) {
  //           data.users.splice(oldUserIndex, 1);
  //         }
  //       }
  //     } else if(action === DialogAction.New) {
  //       data.users.push(user);
  //     }
  //   }
  //   setLastUpdated(new Date());
  // }

  /**
   * opens user dialog on create mode
   */
  // const openCreateDialog = () => {
  //   const {userDialog} = globalStoreManager.getGlobalStore();
  //   userDialog.openDialog({} as User, DialogAction.New);
  // }

  const handleLogout = () => {
    localStorage.clear()
    history.push('/login')
  }



  const handleBecomeMentor = async() => {
    try {
      const response = await changeUserToMentor();
      console.log('User changed to mentor successfully:', response.data.changeUserToMentor.success);
      if (response.data.changeUserToMentor.success) {
        alert('User successfully changed to mentor');
      } else {
        alert('Failed to change user to mentor');
      }
    } catch (err) {
      console.error('Error changing user to mentor:', err);
    }
  }

  return (
    <>
    <AppHeaderPage/>
    <Container className={classes.container} id={lastUpdated.toDateString()}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Fab variant="extended" onClick={handleBecomeMentor}>
          <AddIcon className={classes.extendedIcon} />
          Become a Mentor
        </Fab>
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
            {data && data.mentors.map(user => (
              <GridListTile key={user.id}><UserPage user={user} /></GridListTile>
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
}))(UsersPage);
