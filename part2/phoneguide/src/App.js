import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAll, postData } from './services/personService';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');
  const [ filter, setFilter ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let isUsed = false;
    persons.forEach((item) => item.name === newName ? isUsed = true : null );
    if (isUsed) {
      window.alert(`${newName} is alredy added to phonebook`);
      return;
    }
    const newPerson = { name: newName, number: newPhone }
    postData(newPerson)
      .then((data) => {
        setPersons((prev) => prev.concat(data));
        setNewName('');
        setNewPhone('');
      })
  }

  useEffect(() => {
    getAll().then((data) => setPersons(data))
  }, [])
  

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter setFilter={setFilter} filter={filter} />

      <h3>Add a new</h3>
      
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} />
    </div>
  )
}

const Filter = ({ setFilter, filter }) => {
  return (
    <div>
        filter shown with:
        <input
          onChange={({ target }) => setFilter(target.value)}
          value={filter}
          name='filter'
        />
      </div>
  )
}

const PersonForm = ({ handleSubmit, newName, setNewName, newPhone, setNewPhone }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input
          onChange={({ target }) => setNewName(target.value)}
          value={newName}
          name='name'
        />
      </div>
      <div>
        number:
        <input
          onChange={({ target }) => setNewPhone(target.value)}
          value={newPhone}
          name='phone'
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter }) => {
  return (
    persons.map((person) => person.name.toLowerCase().includes(filter.toLowerCase()) ? (
      <p key={person.name}>{person.name} {person.number}</p>
    ) : null)
  )
}

export default App