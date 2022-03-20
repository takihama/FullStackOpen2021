import React from 'react'
import { useState, useEffect } from 'react'
import phonebookService from '../services/phonebook'

const Phonebook = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        // Before adding, it checks if the person already exists
        if (!persons.some(person => person.name === newName)) {
            const person = {
                id: persons.length + 1,
                name: newName,
                number: newNumber
            }
            phonebookService
                .create(person)
                .then(personAdded => {
                    setPersons(persons.concat(personAdded))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    console.log('error')
                })
        }
        else {
            const person = persons.find(p => p.name === newName)
            const changedPerson = {...person, number: newNumber}
            
            if (window.confirm(`${changedPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
                phonebookService
                    .update(changedPerson.id, changedPerson)
                    .then(personUpdated => {
                        setPersons(persons.map(person => person.id !== changedPerson.id ? person : personUpdated))
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        console.log('error')
                    })
            }
        }
    }

    const deletePerson = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            phonebookService.remove(person.id)
                .then(
                    setPersons(persons.filter(p => p.id !== person.id))
                )
                .catch(error => [
                    console.log('error')
                ])
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
            <FilterPerson handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm newName={newName} newNumber={newNumber} handleSubmit={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={persons} filterValue={filterName} deletePerson={deletePerson} />
        </div>
    )
}

const PersonForm = ({ newName, newNumber, handleSubmit, handleNameChange, handleNumberChange }) => (
    <form onSubmit={handleSubmit}>
        <div>
            name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            number:<input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
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