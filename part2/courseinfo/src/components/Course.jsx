const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>
}

const Total = ({ sumOfExercises }) => {
  return <p><b>total of {sumOfExercises} exercises</b></p>
}

const Part = ({ partName, exercises }) => {
  return (
    <p>
      {partName} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} partName={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Course = ({ course }) => {
  const sumOfExercises = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total sumOfExercises={sumOfExercises} />
    </div>
  );
}

export default Course