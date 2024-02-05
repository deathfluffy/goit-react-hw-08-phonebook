import React from 'react';
import { useSelector } from 'react-redux';
import {selectVisibleContacts } from '../../redux/selectors';
import ContactItem from 'components/ContactItem/ContactItem';

export default function ContactList() {
  const contacts = useSelector(selectVisibleContacts);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        {contacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))}     
    </div>
  );
}