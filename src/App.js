import React, { useEffect, useState } from 'react';
import './app.css';
import { convertTimer } from './helper/converter';
import Button from './components/Button/Button';
import Display from './components/Display/Display';

function App() {
  const [workTime, setworkTime] = useState(1500);
  const [breakTime, setbreakTime] = useState(300);
  const [isCountdown, setIsCountdown] = useState(false);

  const workTimeConverted = convertTimer(workTime);
  const breakTimeConverted = convertTimer(breakTime);

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
    setworkTime(1500);
    setbreakTime(300);
  };

  if (isCountdown === true && workTime === 0 && breakTime === 0) {
    setworkTime(workTime);
    setbreakTime(breakTime);
  }

  return (
    <div className="App">
      <div className="flexRow">
        <span className="title">
          {workTime === 0 ? 'break session' : 'working session'}
        </span>

        <Display>
          {workTime === 0 ? breakTimeConverted : workTimeConverted}
        </Display>

        <Button name={isCountdown ? 'Pause' : 'Start'} onClick={handleStart} />

        <Button name="Reset" onClick={handleReset} />
      </div>
    </div>
  );
}

export default App;
