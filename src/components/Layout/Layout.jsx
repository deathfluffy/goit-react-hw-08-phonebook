import React from 'react';
import { useSelector } from 'react-redux';

import { selectAuthIsLoggedIn } from '../../redux/selectors';
import UserMenu from 'components/UserMenu/UserMenu';
import Navigation from 'components/Navigation/Navigation';


export default function Layout ({ children }) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn)

  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center' }}>
        <Navigation />
        {isLoggedIn && <UserMenu />}
      </header>

      <main>{children}</main>
    </div>
  );
};