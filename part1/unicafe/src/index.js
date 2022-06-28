import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <button onClick={() => setGood((prev) => prev + 1)}>good</button>
        <button onClick={() => setNeutral((prev) => prev + 1)}>neutral</button>
        <button onClick={() => setBad((prev) => prev + 1)}>bad</button>
      </div>
      <h1>statistics</h1>
      {good || neutral || bad ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}

    </div>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const averange = (good - bad) / (total);
  const positive = (good / total) * 100;
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>averange {averange}</p>
      <p>positive {positive} %</p>      
    </div>
  );
}

ReactDOM.render(<App />, 
  document.getElementById('root')
);
