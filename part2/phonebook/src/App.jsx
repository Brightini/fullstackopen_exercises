import personServices from "./services/persons";
import { useState, useEffect } from "react";

const Filter = (props) => {
  return (
    <div>
      filter displayed persons by name{" "}
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
      {props.persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number} {}
          <Delete
            name={person.name}
            id={person.id}
            setPersonss={props.setPersons}
            persons={props.persons}
          />
        </div>
      ))}
    </>
  );
};

const Delete = (props) => {
  const deletePerson = () => {
    if (window.confirm(`Delete ${props.name}?`)) {
      personServices.deletePerson(props.id);
      const updatePersons = props.persons.filter(
        (person) => person.id !== props.id
      );
      props.setPerson(updatePersons);
    }
  };
  return (
    <>
      <button onClick={deletePerson}>delete</button>
    </>
  );
};

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilter] = useState("");

  useEffect(() => {
    personServices.getAllPersons().then((initialListOfPersons) => {
      setPersons(initialListOfPersons);
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
    const numberExists = persons.some((person) => person.number === newNumber);
    const person = persons.find((person) => person.name === newName);

    if (!nameExists) {
      personServices.create(nameObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
      });
    } else if (nameExists && !numberExists) {
      // To update number of existing person
      if (
        window.confirm(
          `${person.name} is already added to phonebook. Replace the old number with a new one?`
        )
      ) {
        personServices
          .updatePerson(person.id, nameObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== updatedPerson.id ? p : updatedPerson
              )
            );
          });
      }
    } else alert(`${newName} is already added to the phonebook`);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filteredNames.toLowerCase())
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
      <Person persons={filteredPersons} setPersons={setPersons} />
    </>
  );
}

export default App;
