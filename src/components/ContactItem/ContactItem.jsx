import css from './ContactItem.module.css';
import { useDispatch } from 'react-redux';
import { deleteContacts } from '../../redux/Services/Api'; 

export default function ContactItem({ contact }) {
  const { id, name, number } = contact;
  const dispatch = useDispatch();

  const handleRemoveContact = () => {
    dispatch(deleteContacts(id));
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
