import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiLogoutUser } from '../../redux/auth/authSlice';
import {
  selectAuthIsLoading,
  selectAuthUserData,
} from '../../redux/selectors';
import css from './UserMenu.module.css'
const UserMenu = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectAuthUserData);
  const isLoading = useSelector(selectAuthIsLoading);

  const handleLogOut = () => dispatch(apiLogoutUser());

  const userEmail = userData?.email ?? "Could't get user email";
  return (
    <div>
      <p>{userEmail}</p>
      <button onClick={handleLogOut} disabled={isLoading} className={css.userButton} type="button">
        Logout
      </button>
    </div>
  );
};

export default UserMenu;