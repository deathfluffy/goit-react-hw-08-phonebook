import { useDispatch, useSelector } from 'react-redux';
import css from './ContactFilter.module.css';
import {  changeFilter } from '../../redux/ContactFilter/ContactFilter';
import { selectFilter } from '../../redux/selectors';

export default function ContactFilter() {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  
  const handleFilterChange = event => {
    const value = event.target.value.toLowerCase();

    dispatch(changeFilter(value));
  };

  return (
    <section className={css.FilterSection}>
      <form className={css.FormLabel} htmlFor="filter">
        Find contacts by name
      </form>
      <div>
        <input
          className={css.inputfilter}
          type="text"
          name="filter"
          onChange={handleFilterChange}
          value={filter}
        />
      </div>
    </section>
  );
}
