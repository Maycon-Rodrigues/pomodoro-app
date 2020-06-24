import React, { useEffect, useState } from 'react';
import './app.css';

function App() {
  const [workTime, setworkTime] = useState(10);
  const [breakTime, setbreakTime] = useState(5);
  const [isCountdown, setIsCountdown] = useState(false);

  useEffect(() => {
    const timer =
      isCountdown &&
      workTime > 0 &&
      setInterval(() => setworkTime(workTime - 1), 1000);
    return () => clearInterval(timer);
  }, [isCountdown, workTime]);

  useEffect(() => {
    const timer =
      isCountdown &&
      workTime === 0 &&
      breakTime > 0 &&
      setInterval(() => setbreakTime(breakTime - 1), 1000);
    return () => clearInterval(timer);
  }, [isCountdown, workTime, breakTime]);

  const handleStart = () => {
    setIsCountdown(!isCountdown);
  };

  const handleReset = () => {
    resetCountdown();
  };

  const resetCountdown = () => {
    setIsCountdown(false);
    setworkTime(10);
    setbreakTime(5);
  };

  if (isCountdown === true && workTime === 0 && breakTime === 0) {
    setworkTime(10);
    setbreakTime(5);
  }

  return (
    <div className="App">
      <div className="flexRow">
        <span className="title">
          {workTime === 0 ? 'break session' : 'working session'}
        </span>

        <span className="timer">{workTime === 0 ? breakTime : workTime}</span>

        <button
          onClick={handleStart}
          className="button"
          disabled={workTime === 0 && true}
        >
          {isCountdown && workTime > 0 ? 'Pause' : 'Start'}
        </button>

        <button onClick={handleReset} className="button">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
