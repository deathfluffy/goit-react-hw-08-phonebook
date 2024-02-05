import * as React from 'react';
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
import { apiRegisterUser } from '../redux/auth/authSlice';
import { toast } from 'react-toastify';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        PhoneBook
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const RegisterPage = () => {
  const dispatch = useDispatch();
  const formRef = React.useRef(null);
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const data = {
      name,
      email,
      password,
    };
    if (!name || !name.trim()) {
      setNameError('Name is required');
      return;
    } else {
      setNameError('');
    }
    if (!email || !email.trim()) {
      setEmailError('Email is required');
      return;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 7) {
      setPasswordError(
        'Password is required and should be at least 7 symbols long'
      );
      return;
    } else {
      setPasswordError('');
    }
    dispatch(apiRegisterUser(data)).then(response => {
      if (response.error) {
        if (response.payload.message === 'User already registered') {
          toast.error('Failed to regist. Try again.');
        } else {
          toast.error(
            'Failed to regist. Entered incorrectly password,email and name or your account is already registered'
          );
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            ref={formRef}
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  error={!!nameError}
                  helperText={nameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  error={!!emailError}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  error={!!passwordError}
                  id="password"
                  autoComplete="current-password"
                  placeholder="*******"
                  inputProps={{ maxLength: 7 }}
                  helperText={passwordError || 'Please enter only 7 symbols'}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default RegisterPage;
