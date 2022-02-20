import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    if (!persons.some(person => person.name == newName)) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else {
      window.alert(`${newName} is already added to phonebook person exist`)
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPerson handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleSubmit={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterName}/>
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
    filter shown with<input onChange={handleFilterChange} />
  </div>
)

const Persons = ({ persons, filterValue }) => (
  persons
  .filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
  .map(person => <Person key={person.id} name={person.name} number={person.number} />)
)

const Person = ({ name, number }) => (
  <div>
    <p>{name} | {number}</p>
  </div>
)

export default App