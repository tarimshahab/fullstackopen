const Entry = ({ person, handleDeleteClick }) => {
  return (<p>{person.name} {person.number} <button onClick={handleDeleteClick}>Delete</button> </p>)
}

const Persons = ({ persons, filter, handleDeleteClick }) => {
  const personsToShow = persons.filter(({ name }) => name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1);
  return (
    <div>
      {personsToShow.map(person =>
        <Entry key={person.id} person={person} handleDeleteClick={() => handleDeleteClick(person)} />
      )}
    </div>
  )
}

export default Persons;