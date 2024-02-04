const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  const style = {
    color: "green",
    border: "solid 2px darkgreen",
    backgroundColor: "lightgreen",
    margin: 5
  };

  const errorStyle = {
    color: "red",
    border: "solid 2px darkred",
    backgroundColor: "pink",
    margin: 5
  };

  return (
    <div style={isError ? errorStyle : style}>
      {message}
    </div>
  )
}

export default Notification