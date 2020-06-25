import React, { useEffect, useState } from 'react';

import { convertTimer } from './helper/converter';

import Button from './components/Button/Button';
import Display from './components/Display/Display';
import Card from './components/Card/Card';

import './app.css';

function App() {
  const [workTime, setWorkTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [isCountdown, setIsCountdown] = useState(false);

  const workTimeConverted = convertTimer(workTime);
  const breakTimeConverted = convertTimer(breakTime);

  useEffect(() => {
    const timer =
      isCountdown &&
      workTime > 0 &&
      setInterval(() => setWorkTime(workTime - 1), 1000);
    return () => clearInterval(timer);
  }, [isCountdown, workTime]);

  useEffect(() => {
    const timer =
      isCountdown &&
      workTime === 0 &&
      breakTime > 0 &&
      setInterval(() => setBreakTime(breakTime - 1), 1000);
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
    setWorkTime(1500);
    setBreakTime(300);
  };

  if (isCountdown === true && workTime === 0 && breakTime === 0) {
    setWorkTime(workTime);
    setBreakTime(breakTime);
  }

  return (
    <div className="container">
      <Card>
        <span className="title">
          {workTime === 0 ? 'Break Session' : 'Working Session'}
        </span>

        <Display>
          {workTime === 0 ? breakTimeConverted : workTimeConverted}
        </Display>

        <Button name={isCountdown ? 'Pause' : 'Start'} onClick={handleStart} />

        <Button name="Reset" onClick={handleReset} />
      </Card>
    </div>
  );
}

export default App;
