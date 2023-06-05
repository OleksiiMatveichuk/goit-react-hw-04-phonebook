import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';

const KEY = 'Phonebook';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const locStor = localStorage.getItem(KEY);
    if (locStor) {
      this.setState({ contacts: JSON.parse(locStor) });
    }
  }

  componentDidUpdate(_, prev) {
    if (prev.contacts !== this.state.contacts) {
      localStorage.setItem(KEY, JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    const newItem = { id: nanoid(), name, number };
    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert('Contact already exist');
      return;
    }
    this.setState(prev => ({ contacts: [...prev.contacts, newItem] }));
  };

  handleDelete = id => {
    const { contacts } = this.state;
    this.setState({
      contacts: contacts.filter(contact => contact.id !== id),
    });
  };

  handleFilerChange = ev => {
    const { value } = ev.target;
    this.setState({ filter: value });
  };

  handleFilter = () => {
    const { filter, contacts } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  render() {
    const resultFilter = this.handleFilter();
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm submit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter
          filterChange={this.handleFilerChange}
          value={this.state.filter}
        />
        <ContactList array={resultFilter} clbDelete={this.handleDelete} />
      </div>
    );
  }
}
