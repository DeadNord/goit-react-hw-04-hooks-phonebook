import { Component } from 'react';

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

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmit = data => {
    const contactData = this.state.contacts.find(elem =>
      elem.name.includes(data.name),
    );

    if (contactData) {
      const existUserAlert = alert({
        title: 'Alert',
        text: `${contactData.name} is already in contacts`,
      });
    } else {
      const userId = { id: nanoid() };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, { ...userId, ...data }],
      }));
    }
  };

  filterChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filterContacts = () => {
    const normalizeFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({
        contacts: contacts,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.contacts !== prevProps.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const filterContact = this.filterContacts();
    return (
      <>
        <Section title={'Phonebook'}>
          <Form onSubmit={this.formSubmit} />
        </Section>
        <Section title={'Contacts'}>
          <Filter value={this.state.filter} onChange={this.filterChange} />
          <Contacts
            contacts={filterContact}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}

export default App;
