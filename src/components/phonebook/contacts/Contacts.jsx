import PropTypes from 'prop-types';
import s from './Contacts.module.css';
import Contact from './Contact';

const Contacts = ({ contacts, deleteContact }) => {
  return (
    <ul className={s.contactsList}>
      {contacts.length > 0 &&
        contacts.map(item => (
          <Contact
            key={item.id}
            name={item.name}
            number={item.number}
            id={item.id}
            deleteContact={deleteContact}
          />
        ))}
    </ul>
  );
};
Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
export default Contacts;
