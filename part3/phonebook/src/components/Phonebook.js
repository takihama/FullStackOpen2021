import React from 'react'
import { useState, useEffect } from 'react'
import phonebookService from '../services/phonebook'

const Phonebook = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [alertMessage, setAlertMessage] = useState({ message: null, type: null })

  // Checks if the person already exists, if exists it asks
  // if wanted to update phonenumber, if not it add the new entry
  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.some(person => person.name === newName)) {
      const person = {
        name: newName,
        number: newNumber
      }
      phonebookService
        .create(person)
        .then(personAdded => {
          setPersons(persons.concat(personAdded))
          setNewName('')
          setNewNumber('')
          setAlertMessage({ message: `Added ${person.name}.`, type: 'success' })
          setTimeout(() => setAlertMessage({ message: null, type: null }), 5000)
        })
        .catch(error => {
          setAlertMessage({ message: `An error occurred when trying to add ${person.name}.`, type: 'error' })
          setTimeout(() => setAlertMessage({ message: null, type: null }), 5000)
        })
    }
    else {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }

      if (window.confirm(`${changedPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        phonebookService
          .update(changedPerson.id, changedPerson)
          .then(personUpdated => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : personUpdated))
            setNewName('')
            setNewNumber('')
            setAlertMessage({ message: `Updated phonenumber of ${person.name}-`, type: 'success' })
            setTimeout(() => setAlertMessage({ message: null, type: null }), 5000)
          })
          .catch(error => {
            setAlertMessage({ message: `An error occurred when trying to update ${person.name}.`, type: 'error' })
            setTimeout(() => setAlertMessage({ message: null, type: null }), 5000)
          })
      }
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService.remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setAlertMessage({ message: `${person.name} was deleted from the phonebook.`, type: 'success' })
          setTimeout(() => setAlertMessage({ message: null, type: null }), 5000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== person.id))
          setAlertMessage({ message: `Error trying to delete A${person.name}, it has already been removed from the phonebook`, type: 'error' })
          setTimeout(() => setAlertMessage({ message: null, type: null }), 5000)
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterName(event.target.value)

  const getPhonebookEntries = () => {
    phonebookService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }

  useEffect(getPhonebookEntries, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <AlertMessage message={alertMessage.message} type={alertMessage.type} />
      <FilterPerson handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleSubmit={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterName} deletePerson={deletePerson} />
    </div>
  )
}

const AlertMessage = ({ message, type }) => {
  let alertMessageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (type === 'success') alertMessageStyle = { ...alertMessageStyle, color: 'green' }
  else if (type === 'error') alertMessageStyle = { ...alertMessageStyle, color: 'red' }

  if (message === null) {
    return null
  }

  return (
    <div style={alertMessageStyle}>{message}</div>
  )
}

const PersonForm = ({ newName, newNumber, handleSubmit, handleNameChange, handleNumberChange }) => (
  <form onSubmit={handleSubmit}>
    <div> name: <input value={newName} onChange={handleNameChange} /> </div>
    <div> number:<input value={newNumber} onChange={handleNumberChange} /></div>
    <div> <button type="submit">add</button> </div>
  </form>
)

const FilterPerson = ({ handleFilterChange }) => (
  <div>
    filter shown with <input onChange={handleFilterChange} />
  </div>
)

const Persons = ({ persons, filterValue, deletePerson }) => (
  persons
    .filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    .map(person => <Person key={person.id} name={person.name} number={person.number} handleDeletePerson={() => deletePerson(person)} />)
)

const Person = ({ name, number, handleDeletePerson }) => (
  <div>
    {name} | {number} | <button onClick={handleDeletePerson}>delete</button>
  </div>
)

export default Phonebook