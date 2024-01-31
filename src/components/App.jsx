import { fetchContacts } from '../../src/redux/Services/Api';
import { selectContactsAll } from '../../src/redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import Message from './Message/Message';
import css from './App.module.css';

export default function App() {
  const contactsItems = useSelector(selectContactsAll);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <span className={css.TitlePhonebook}>Phonebook</span>
      <ContactForm contacts={contactsItems} />
      <span className={css.ContactsTitle}>Contacts</span>
      {contactsItems?.length ? (
        <>
          <ContactFilter />
          <ContactList />
          
        </>
      ) : (
        <Message message="There are no contacts in your phonebook. Please add your first contact!" />
      )}
    </div>
  );
}
