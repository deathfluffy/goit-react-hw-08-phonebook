import React from 'react';
import Navigation from 'components/Navigation/Navigation';
import css from './Layout.module.css'


export default function Layout ({ children }) {
  return (
    <div>
      <header className={css.mainHeader}>
        <Navigation />
      </header>
      <main>
        {children}
        </main>
    </div>
  );
};