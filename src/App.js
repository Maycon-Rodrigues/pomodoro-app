import React, { useEffect, useState } from 'react';
import './app.css';

function App() {
  const [workTime, setworkTime] = useState(10);
  const [breakTime, setbreakTime] = useState(5);
  const [isCountdown, setIsCountdown] = useState(false);

  return (
    <div className="App">
      <div className="flexRow">
        <span className="title">working session</span>
        <span className="timer">{workTime}</span>
        <button onClick={handleStart} className="button">
          {isCountdown && workTime > 0 ? 'Pause' : 'Start'}
        </button>
      </div>
      <p>break session: {breakTime}</p>
    </div>
  );
}

export default App;
