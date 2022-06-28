import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button setGood={setGood} setBad={setBad} setNeutral={setNeutral} />
      <h1>statistics</h1>
      {good || neutral || bad ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}

    </div>
  );
}

const Statistics = ({ good, neutral, bad, text, value }) => {
  const total = good + neutral + bad;
  const averange = (good - bad) / (total);
  const positive = `${(good / total) * 100} %`;
  if (text || value){
    return <p>{text} {value}</p>
  }
  return (
    <div>
      <Statistics text={'good'} value={good}/>
      <Statistics text={'neutral'} value={neutral}/>
      <Statistics text={'bad'} value={bad}/>
      <Statistics text={'total'} value={total}/>
      <Statistics text={'averange'} value={averange}/>
      <Statistics text={'positive'} value={positive}/>      
    </div>
  );
}

const Button = ({ text, setValue, setGood, setBad, setNeutral }) => {
  if (text) {
    return <button onClick={() => setValue((prev) => prev + 1)}>{text}</button>
  }  
  return (
    <div>
      <Button text={'good'} setValue={setGood} />
      <Button text={'neutral'} setValue={setNeutral} />
      <Button text={'bad'} setValue={setBad} />
    </div>
  );
}

ReactDOM.render(<App />, 
  document.getElementById('root')
);
