import React, { useEffect, useState } from 'react';
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
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { LOGIN_USER_MUTATION } from '../mutations/UserMutation';
import { LOGGED_IN_USER } from '../queries/UserQuery';
import jwtDecode from 'jwt-decode';
import { decode } from 'punycode';




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

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const [refetched, setRefetched] = useState(false)
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER_MUTATION);

  const history = useHistory();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = new FormData(event.currentTarget);
    event.preventDefault();
    try {
      const response = await loginUser({
        variables: {
          email: userData.get('email'),
          password: userData.get('password')
        },
      });
      // Store the token and refreshToken as needed
      localStorage.setItem('token', response.data.tokenAuth.token);
      localStorage.setItem('refreshToken', response.data.tokenAuth.refreshToken);
      const decoded:any = jwtDecode(response.data.tokenAuth.token);

      decoded.isMentor ? window.location.href = "/requests": window.location.href="/home";
    } catch (err) {
      console.error('Error logging in:', err);
    }

  };



  return (
    // <ThemeProvider theme={defaultTheme}>
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
            <LockOutlinedIcon />
          {/* </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: 3, marginBottom: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    // </ThemeProvider>
  );
}
