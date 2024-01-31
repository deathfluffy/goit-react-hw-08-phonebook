import { createSelector } from '@reduxjs/toolkit';

const selectContacts = state => state.contacts;
export const selectFilter = state => state.filter
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
