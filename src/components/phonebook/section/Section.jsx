import PropTypes from 'prop-types';
import s from './Section.module.css';

const Section = ({ children, title }) => {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.title}>{title}</h2>
        {children}
      </div>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Section;
