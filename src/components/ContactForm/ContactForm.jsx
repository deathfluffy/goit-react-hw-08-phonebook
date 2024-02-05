import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Tooltip,
  Typography,
  createTheme,
} from '@mui/material';
import { ThemeProvider } from 'styled-components';
import { apiAddContact, apiGetContacts } from '../../redux/Contact/ContactsSlice';
import { toast } from 'react-toastify';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { selectVisibleContacts } from '../../redux/selectors';

export default function ContactForm() {
  const defaultTheme = createTheme();
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts); 

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const onSubmit = evt => {
    evt.preventDefault();
  
    const { name, phone } = formData;
  
    if (!name.trim() || !phone.trim()) {
      setError('Name and phone number are required');
      return;
    }
  
    if (contacts.some(({ name: contactName }) => contactName === name)) {
      setError(`${name} is already in contacts`);
      return;
    }

    if (contacts.some(({ number: contactNumber }) => contactNumber === phone)) {
      setError(`${phone} is already in contacts`);
      return;
    }

    const contactData = {
      name,
      number: phone,
    };
  
    dispatch(apiAddContact(contactData))
      .unwrap()
      .then(() => {
        toast.success('Contact was successfully added!');
        setFormData({ name: '', phone: '' });
        setError('');
      })
      .catch(error => {
        toast.error('Failed to add contact: ' + error.message);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
            <LocalPhoneIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            PhoneBook
          </Typography>
          <form onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              placeholder="Joe Doe"
              inputProps={{ maxLength: 20 }}
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Number"
              type="tel"
              id="phone"
              autoComplete="phone"
              placeholder="+380983789924"
              inputProps={{ maxLength: 13 }}
              value={formData.phone}
              onChange={handleInputChange}
            />
            {error && (
              <Typography variant="body2" color="error">{error}</Typography>
            )}
            <Tooltip title="Add Contact">
              <span>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!formData.name || !formData.phone}
                >
                  Add Contact
                </Button>
              </span>
            </Tooltip>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
