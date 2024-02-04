
import ContactFilter from 'components/ContactFilter/ContactFilter';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';


const ContactsPage = () => {
 
  return (
    <div>
      <ContactForm />
      <ContactFilter />
      <ul>
        <ContactList />
      </ul>
    </div>
  );
};
export default ContactsPage;
