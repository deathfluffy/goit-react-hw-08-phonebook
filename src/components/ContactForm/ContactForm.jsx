import { nanoid } from '@reduxjs/toolkit';
import css from './ContactForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {  addContacts } from '../../redux/Services/Api';
import { selectContactsAll } from '../../redux/selectors';
import { useState } from 'react';

export default function ContactForm() {
  const contacts = useSelector(selectContactsAll);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isFormValid = () => {
    return formData.name.trim() !== '' && formData.number.trim() !== '';
  };

  const handleAddContact = () => {
    const { name, number } = formData;

    if (!contacts) {
      console.error("Contacts are not defined.");
      return;
    }

    const nameInContacts = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (nameInContacts) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = { id: nanoid(), name, number };
    dispatch(addContacts(contact));
    setFormData({ name: '', number: '' });
  };
  const onFormSubmit = (formData) => {
    const contact = { id: nanoid(), ...formData };
    dispatch(addContacts(contact));
  };
  return (
    <div className={css.formContainer}>
      <form className={css.MainForm} onSubmit={onFormSubmit} autoComplete="off">
        <div>
          <span className={css.FormLabel} htmlFor="name">
            Name
          </span>
          <div>
            <input
              className={css.InputField}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>
        </div>
        <div>
          <span className={css.FormLabel} htmlFor="number">
            Number
          </span>
          <div>
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleInputChange}
              value={formData.number}
            />
          </div>
        </div>
        <button className={css.addButton} type="button" onClick={handleAddContact} disabled={!isFormValid()}>
          Add contact
        </button>
      </form>
    </div>
  );
}
