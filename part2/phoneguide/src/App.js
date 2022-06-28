import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.name.value);
    setPersons((prev) => prev.concat({ name: event.target.name.value }));
    setNewName('');
  }
  console.log(newName);
  console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App