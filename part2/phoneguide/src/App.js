import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
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
    setPersons((prev) => prev.concat({ name: newName, number: newPhone }));
    setNewName('');
    setNewPhone('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        <input
          onChange={({ target }) => setFilter(target.value)}
          value={filter}
          name='filter'
        />
      </div>
      <h2>Add a new</h2>
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
      <h2>Numbers</h2>
      {persons.map((person) => person.name.toLowerCase().includes(filter.toLowerCase()) ? (
        <p key={person.name}>{person.name} {person.number}</p>
      ) : null)}
    </div>
  )
}

export default App