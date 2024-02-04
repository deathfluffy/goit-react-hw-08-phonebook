import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiLogoutUser } from '../../redux/auth/authSlice';
import { selectAuthIsLoading, selectAuthUserData } from '../../redux/selectors';

import { Box, IconButton, Tooltip } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const UserMenu = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthIsLoading);
  const userData = useSelector(selectAuthUserData);
  const userEmail = userData?.email ?? "Could't get user email";

  const handleLogOut = () => {
    if (!isLoading) {
      dispatch(apiLogoutUser());
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title={`Logout (${userEmail})`}>
          <span>
            <IconButton onClick={handleLogOut} disabled={isLoading}>
              <ExitToAppIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </div>
  );
};

export default UserMenu;
