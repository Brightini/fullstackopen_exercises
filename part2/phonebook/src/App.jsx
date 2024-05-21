import axios from "axios";
import { useState, useEffect } from "react";

const Filter = (props) => {
  return (
    <div>
      filter displayed number by name{" "}
      <input type="text" onChange={props.handleFilter} />
    </div>
  );
};

const Form = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name:
        <input type="text" onChange={props.handleNewName} />
      </div>
      <div>
        number:
        <input onChange={props.handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = (props) => {
  return (
    <>
      {props.filter.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNumbers, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addNewname();
  };

  const addNewname = () => {
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (!nameExists) {
      setPersons(persons.concat(nameObject));
    } else alert(`${newName} is already added to the phonebook`);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filteredNumbers.toLowerCase())
  );

  return (
    <>
      <h1>Phonebook</h1>
      <Filter handleFilter={handleFilter} />
      <h3>Add a New Number</h3>
      <Form
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Person filter={filteredPersons} />
    </>
  );
}

export default App;
