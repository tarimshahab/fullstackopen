const Filter = ({ value, handleFilterChange }) => {
  return (
    <div>
      filter: <input value={value} onChange={handleFilterChange} />
    </div>
  );
}

export default Filter