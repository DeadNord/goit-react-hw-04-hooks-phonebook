import { useState, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

// importComponent
import Section from './components/phonebook/section/Section';
import Form from './components/phonebook/form/Form';
import Contacts from './components/phonebook/contacts/Contacts';
import Filter from './components/phonebook/filter/Filter';

// importScripts
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { nanoid } from 'nanoid';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const filterChange = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const formSubmit = data => {
    const contactData = contacts.find(elem => elem.name.includes(data.name));

    if (contactData) {
      alert({
        title: 'Alert',
        text: `${contactData.name} is already in contacts`,
      });
    } else {
      const userId = { id: nanoid() };
      setContacts(contacts => [...contacts, { ...userId, ...data }]);
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId),
    );
  };

  const filterContact = useMemo(() => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  }, [contacts, filter]);

  return (
    <>
      <Section title={'Phonebook'}>
        <Form onSubmit={formSubmit} />
      </Section>
      <Section title={'Contacts'}>
        <Filter value={filter} onChange={filterChange} />
        <Contacts contacts={filterContact} deleteContact={deleteContact} />
      </Section>
    </>
  );
  // }
}

export default App;
