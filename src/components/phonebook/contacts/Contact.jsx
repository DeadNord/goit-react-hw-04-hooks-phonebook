import PropTypes from 'prop-types';
import s from './Contacts.module.css';

const Contact = ({ name, number, id, deleteContact }) => {
  return (
    <li className={s.contact}>
      <p>
        <span className={s.name}>{name}</span>: {number}
      </p>
      <button className={s.button} onClick={() => deleteContact(id)}>
        Delete
      </button>
    </li>
  );
};
Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
export default Contact;
