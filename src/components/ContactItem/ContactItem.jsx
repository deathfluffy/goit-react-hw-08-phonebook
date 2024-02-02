import css from './ContactItem.module.css';
import { useDispatch } from 'react-redux';
import { apiRemoveContact } from '../../redux/Contact/ContactsSlice';

export default function ContactItem({ contact }) {
  const { id, name, number } = contact;
  const dispatch = useDispatch();

  const handleRemoveContact = () => {
    dispatch(apiRemoveContact(id));
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
