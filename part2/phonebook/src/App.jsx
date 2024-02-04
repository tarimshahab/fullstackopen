/**
 * Worked on so far 3.5 hours upto 2.15
 */
import personService from './services/persons';
import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons));
  }, []);

  const handleAddClick = e => {
    e.preventDefault();

    const foundPerson = persons.find(({ name }) => name === newName);
    if (foundPerson) {
      const confirmation = confirm(`${newName} is already added to the phone books. Do you want to update the number?`);
      if (!confirmation) return;

      personService
        .update(foundPerson.id, { ...foundPerson, number: newNumber })
        .then((changedPerson) => {
          setPersons(persons.map(p => p.id !== changedPerson.id ? p : changedPerson));
        })
        .then(() => {
          setNotification(`Updated ${newName} to ${newNumber}.`)
        })
        .catch(err => {
          setNotification(`${newName} ${newNumber} has already been deleted.`);
          setIsError(true);
        });
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then(newPerson => setPersons(persons.concat(newPerson)))
        .then(() => setNotification(`Added ${newName} ${newNumber}.`));
    }

    setNewName('');
    setNewNumber('');
    setTimeout(() => {
      setNotification(null);
      setIsError(false);
    }, 3000);
  };

  const handleDeleteClick = ({ name, id }) => {
    const person = persons.find(p => id === p.id);
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .then(() => {
          setNotification(`Deleted ${person.name} ${person.number}.`)
        })
        .catch(err => {
          setIsError(true);
          setNotification(`${person.name} ${person.number} has already been deleted.`);
        });

      setTimeout(() => {
        setNotification(null);
        setIsError(false);
      }, 3000);
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={isError} />
      <Filter value={filter} handleFilterChange={e => setFilter(e.target.value)} />

      <h2>Add A New Number</h2>
      <PersonForm
        name={newName}
        handleNameChange={e => setNewName(e.target.value)}
        number={newNumber}
        handleNumberChange={e => setNewNumber(e.target.value)}
        handleAddClick={handleAddClick}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDeleteClick={handleDeleteClick} />
    </div>
  )
}

export default App