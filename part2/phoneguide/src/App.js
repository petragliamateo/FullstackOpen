import React, { useState, useEffect } from 'react';
import { getAll, postData, deleteData, updateData } from './services/personService';
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ notification, setNotification ] = useState({
    msg: '',
    isError: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newPhone }
    let usedId = null;
    persons.forEach((item) => item.name === newName ? usedId = item.id : null );
    if (usedId) {
      if (window.confirm(`${newName} is alredy added to phonebook, replace the old number with a new one?`)){
        updateData(usedId, newPerson)
          .then((res) => {
            const data = res.data
            setPersons((prev) => (
              prev.map((p) => p.id === usedId ? data : p
            )));
            setNewName('');
            setNewPhone('');
            setNotification(() => ({ isError: false, msg: `Updated ${data.name}` }));
            setTimeout(() => setNotification((prev) => (
                { ...prev, msg: '' }
              )), 5000)
          }).catch((error) => {
            // Para poder usar el catch modifique personService para que retorne el response.
            // Ademas admitir el update validator en mongoose.
            console.log(error);
            setNotification(() => (
              { isError: true, msg: error.response.data.error }
            ))
            setTimeout(() => setNotification(() => (
              { isError: false, msg: '' }
            )), 5000)
          })
      }
      return;
    }
    postData(newPerson)
      .then((res) => {
        const data = res.data;
        setPersons((prev) => prev.concat(data));
        setNewName('');
        setNewPhone('');
        setNotification((prev) => ({ isError: false, msg: `Added ${data.name}` }));
        setTimeout(() => setNotification(''), 5000)
      }).catch((error) => {
        // error trae la respuesta
        // Para poder usar el catch modifique personService para que retorne el response.
        console.log(error);
        setNotification(() => (
          { isError: true, msg: error.response.data.error }
        ))
        setTimeout(() => setNotification(() => (
          { isError: false, msg: '' }
        )), 5000)
      })
  }

  const handleDelete = ({ name, id }) => {
    if (window.confirm(`delete ${name}?`)) {
      deleteData(id)
        .then(() => {
          setPersons((prev) => prev.filter((p) => p.id !== id));
        })
    }
  }

  useEffect(() => {
    getAll().then((data) => setPersons(data))
  }, [])
  

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification msg={notification.msg} isError={notification.isError} />
      
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

      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
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

const Persons = ({ persons, filter, handleDelete }) => {
  return (
    persons.map((person) => person.name.toLowerCase().includes(filter.toLowerCase()) ? (
      <div key={person.name}>
        <p>{person.name} {person.number}</p>
        <button onClick={() => handleDelete(person)}>Delete</button>
      </div>
    ) : null)
  )
}

const Notification = ({ msg, isError }) => {
  if (!msg) {
    return null;
  }
  return (
    <div className={isError ? 'notificationError' : 'notification'}>
      {msg}
    </div>
  )
}

export default App