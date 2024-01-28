import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button text={"good"} handleClick={() => setGood(good + 1)} />
      <Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
      <Button text={"bad"} handleClick={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
};

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const heading = <h1>Statistics</h1>;
  const total = good + neutral + bad;
  if (total === 0) {
    return (
      <>
        {heading}
        <p>No feedback given</p>
      </>
    );
  };

  const avg = (good - bad) / total;
  const positive = 100 * good / total;
  return (
    <>
      {heading}
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'all'} value={total} />
          <StatisticLine text={'average'} value={avg} />
          <StatisticLine text={'positive'} value={positive + ' %'} />
        </tbody>
      </table>
    </>
  )
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

export default App