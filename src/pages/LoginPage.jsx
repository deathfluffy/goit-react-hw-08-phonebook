import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import {  useRef, useState } from 'react';
import { apiLoginUser } from '../../src/redux/auth/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

function LoginPage() {
  const defaultTheme = createTheme();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !email.trim()) {
      setEmailError('Email is required');
      return;
    } else {
      setEmailError('');
    }

  
    if (!password || password.length < 7) {
      setPasswordError('Password is required and should be at least 7 symbols long');
      return;
    } else {
      setPasswordError('');
    }

    dispatch(apiLoginUser({ email, password })).then(response => {
      if (response.error) {
        if (response.payload.message === 'User already registered') {
          toast.error('Failed to login. Your account is already registered.');
        } else {
          toast.error('Failed to login. Your account is already registered or entered incorrectly password and email');
        }
        console.clear();
      }
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            ref={formRef}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              type="email"
              error={!!emailError}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="example@gmail.com"
              helperText={emailError}
            />
           

            <TextField
              error={!!passwordError}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="*******"
              inputProps={{ maxLength: 7 }}
              helperText={passwordError || 'Please enter only 7 symbols'}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link href="./register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
