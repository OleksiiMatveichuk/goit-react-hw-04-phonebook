import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';

const KEY = 'Phonebook';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(KEY)) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (name, number) => {
    const newItem = { id: nanoid(), name, number };
    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert('Contact already exist');
      return;
    }
    setContacts(prev => [...prev, newItem]);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleFilerChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleFilter = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  const resultFilter = handleFilter();
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
      <ContactForm submit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filterChange={handleFilerChange} value={filter} />
      <ContactList array={resultFilter} clbDelete={handleDelete} />
    </div>
  );
};
