import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER_USER_MUTATION } from '../mutations/UserMutation';
import { useHistory } from 'react-router-dom';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Gasaro Leila
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER_MUTATION);
  const history = useHistory();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = new FormData(event.currentTarget);
    try {
      const response = await registerUser({
        variables: {
          email: userData.get('email'),
          password: userData.get('password'),
          firstName: userData.get('firstName'),
          lastName: userData.get('lastName'),
          address: userData.get('address'),
          bio: userData.get('bio'),
          occupation: userData.get('occupation'),
          expertise: userData.get('expertise'),
          isActive: true,
          isMentor: false,
          isStaff: false,
        },
      });
      console.log('User registered successfully:', response.data.registerUser);
      history.push('/login');
    } catch (err) {
      console.error('Error registering user:', err);
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          style={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <LockOutlinedIcon />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="bio"
                  required
                  fullWidth
                  id="bio"
                  label="Bio"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Address"
                  label="Address"
                  name="address"
                  autoComplete="family-name"
                />
              </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="expertise"
                  required
                  fullWidth
                  id="expertise"
                  label="Expertise"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="occupation"
                  label="Occupation"
                  name="occupation"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to get learning inspirations."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign Up
            </Button>
            {/* <Grid container justifyContent="flex-end"> */}
              {/* <Grid item> */}
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              {/* </Grid> */}
            {/* </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}
