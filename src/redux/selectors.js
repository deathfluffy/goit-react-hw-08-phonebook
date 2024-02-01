import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts;
export const selectFilter = state => state.filter

export const selectAuthToken = state => state.auth.token;
export const selectAuthUserData = state => state.auth.userData;
export const selectAuthIsLoggedIn = state => state.auth.isLoggedIn;
export const selectAuthError = state => state.auth.error;
export const selectAuthIsLoading = state => state.auth.isLoading;

export const selectIsLoading = createSelector(
  selectContacts,
  contacts => contacts.isLoading
);

export const selectError = createSelector(
  selectContacts,
  contacts => contacts.error

);
export const selectContactsAll = createSelector(
  selectContacts,
  contacts => contacts.items
);

export const selectVisibleContacts = createSelector(
  [selectContactsAll, selectFilter],
  (contacts, filter) => {

      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
  }
);
