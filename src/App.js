import React, { useEffect, useState } from 'react';

import { convertTimer } from './helper/converter';

import Button from './components/Button/Button';
import Display from './components/Display/Display';
import Card from './components/Card/Card';
import SessionButton from './components/SessionButon/SessionButton';

import './app.css';

function App() {
  const [workTime, setWorkTime] = useState(1500);
  const [changeWorkTime, setChangeWorkTime] = useState(workTime);
  const [breakTime, setBreakTime] = useState(300);
  const [changeBreakTime, setChangeBreakTime] = useState(breakTime);
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
    setChangeWorkTime(1500);
    setChangeBreakTime(300);
  };

  const handlePlusClick = () => {
    setWorkTime(workTime + 60);
    setChangeWorkTime(changeWorkTime + 60);
  };

  const handleMinusClick = () => {
    workTime > 60 && setWorkTime(workTime - 60);
    changeWorkTime > 60 && setChangeWorkTime(changeWorkTime - 60);
  };

  if (isCountdown && workTime === 0 && breakTime === 0) {
    setWorkTime(changeWorkTime);
    setBreakTime(changeBreakTime);
  }

  return (
    <div className="container">
      <Card>
        <span className="title">
          {workTime === 0 ? 'Break Session' : 'Working Session'}
        </span>

        <Display>
          <SessionButton simbol="+" onClick={handlePlusClick} />
          {workTime === 0 ? breakTimeConverted : workTimeConverted}
          <SessionButton simbol="-" onClick={handleMinusClick} />
        </Display>

        <Button name={isCountdown ? 'Pause' : 'Start'} onClick={handleStart} />

        <Button name="Reset" onClick={handleReset} />
      </Card>
    </div>
  );
}

export default App;
