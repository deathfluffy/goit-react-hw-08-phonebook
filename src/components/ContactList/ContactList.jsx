import { useSelector } from 'react-redux';
import ContactItem from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css';
import {  selectContactsAll } from '../../redux/selectors';


export default function ContactList() {
  const contacts = useSelector(selectContactsAll);

  return (
    <>  
      <ul className={css.list}>
        {contacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </ul>
    </>
  );
}
