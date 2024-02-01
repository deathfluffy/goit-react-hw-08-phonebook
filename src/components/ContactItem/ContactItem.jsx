import css from './ContactItem.module.css';
import { useDispatch } from 'react-redux';
import { apiRemoveContact } from '../../redux/Contact/ContactsSlice'; 
import { toast } from 'react-toastify';

export default function ContactItem({ contact }) {
  const { name, number } = contact;
  const dispatch = useDispatch();

  const handleRemoveContact = () => {
    dispatch(apiRemoveContact(contact.Id))
        .unwrap()
        .then(data => {
          toast.success(`${data.name} was successfully deleted!`);
        });
  };

  return (
    <li className={css.item}>
      <span>{name}:</span>
      <span>{number}</span>
      <button className={css.delButton} type="button" onClick={handleRemoveContact}>
        Delete
      </button>
    </li>
  );
}
