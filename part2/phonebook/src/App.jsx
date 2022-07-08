import { useEffect, useState } from "react";
import Input from "./Input";
import Persons from "./Persons";
import Search from "./Search";
import { personsService } from "./services/persons";
import "./App.css";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    personsService.getAll().then((personsData) => setPersons(personsData));
  }, []);

  const filterPerson = persons.filter((p) =>
    p.name.toLowerCase().includes(search)
  );

  const notification = (message, type) => {
    setNotif({ message, type });
    setTimeout(() => {
      setNotif(null);
    }, 1000);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const person = persons.find(
      (p) => p.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );
    //person ? updateNumber(person.id, newPerson) : 
    createPerson(newPerson);
    setNewName("");
    setNewNumber("");
  };

  const createPerson = async (newPerson) => {
    await personsService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
    notification(`${newPerson.name} created succesfully`, "success");
  };

  const updateNumber = async (id, person) => {
    if (
      window.confirm(
        `Name already exists. Do you want to update number for ${person.name} ?`
      )
    ) {
      try {
        const updatedPerson = await personsService.update(id, person);

        setPersons(
          persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
        );
        notification(`${person.name} updated succesfully`, "success");
      } catch {
        notification(`${person.name} does not exist. Please refresh`, "error");
        setPersons(persons.filter((p) => p.id !== id));
      }
    }
  };

  const removePerson = async (deletePerson, id) => {
    try {
      console.log(id);
      await personsService.remove(id).then((person) => {
        setPersons(persons.filter((p) => p !== deletePerson));
      });
      notification(`${deletePerson.name} deleted succesfully`, "success");
    } catch {
      notification(
        `${deletePerson.name} does not exist. Please refresh`,
        "error"
      );
    }
  };

  const toDelete = (deletePerson) => {
    const deleteId = deletePerson.id;
    console.log(deleteId);
    console.log(persons);
    console.log(deletePerson);
    deletePerson ? console.log(deletePerson.name) : console.log("brrr");
    if (window.confirm(`Do you want to delete ${deletePerson.name} ?`)) {
      removePerson(deletePerson, deleteId);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <br />

      <h2>Add new</h2>
      {notif && <Notification message={notif.message} type={notif.type} />}
      <form onSubmit={formSubmit}>
        <Input
          text="name : "
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <br />
        <Input
          text="number : "
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <Persons persons={filterPerson} onDelete={toDelete} />
    </div>
  );
};

export default App;
