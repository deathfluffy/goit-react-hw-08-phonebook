import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/ContactFilter/ContactFilter';
import { selectFilter } from '../../redux/selectors';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  CssBaseline,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  createTheme,
} from '@mui/material';
import { ThemeProvider } from 'styled-components';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ContactFilter() {
  const defaultTheme = createTheme();
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    const value = event.target.value.toLowerCase();

    dispatch(changeFilter(value));
  };

  return (
    <ThemeProvider theme={defaultTheme} component="section">
      <CssBaseline />
      <Box component="form" noValidate sx={{ mt: 1 }} htmlFor="filter">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Find contacts by name
          </Typography>

          <TextField
            margin="normal"
            required
            id="filter"
            autoFocus
            type="text"
            name="filter"
            onChange={handleFilterChange}
            value={filter}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
