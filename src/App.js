import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import boopSfx from './assets/sms-alert-5-daniel_simon.mp3';

import { convertTimer } from './helper/converter';

import Button from './components/Button/Button';
import Display from './components/Display/Display';
import Card from './components/Card/Card';
import SessionButton from './components/SessionButon/SessionButton';
import CardFooter from './components/CardFooter/CardFooter';

import './app.css';

function App() {
  const [workTime, setWorkTime] = useState(1500);
  const [changeWorkTime, setChangeWorkTime] = useState(workTime);
  const [breakTime, setBreakTime] = useState(300);
  const [changeBreakTime, setChangeBreakTime] = useState(breakTime);
  const [isCountdown, setIsCountdown] = useState(false);

  const [play] = useSound(boopSfx);

  const workTimeConverted = convertTimer(workTime);
  const breakTimeConverted = convertTimer(breakTime);

  const breakTimeDisplay = changeBreakTime / 60;

  useEffect(() => {
    if (isCountdown && workTime === 0) play();
    const timer =
      isCountdown &&
      workTime > 0 &&
      setInterval(() => setWorkTime(workTime - 1), 1000);
    return () => clearInterval(timer);
  }, [isCountdown, workTime, play]);

  useEffect(() => {
    if (isCountdown && breakTime < 5) play();
    const timer =
      isCountdown &&
      workTime === 0 &&
      breakTime > 0 &&
      setInterval(() => setBreakTime(breakTime - 1), 1000);
    return () => clearInterval(timer);
  }, [isCountdown, workTime, breakTime, play]);

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

  const handlePlusBreakClick = () => {
    setBreakTime(breakTime + 60);
    setChangeBreakTime(changeBreakTime + 60);
  };

  const handleMinusBreakClick = () => {
    breakTime > 60 && setBreakTime(breakTime - 60);
    changeBreakTime > 60 && setChangeBreakTime(changeBreakTime - 60);
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

        <CardFooter>
          <SessionButton simbol="+" onClick={handlePlusBreakClick} />
          <div className="flexCol">
            <span>Break Session</span>
            <span>{breakTimeDisplay} min</span>
          </div>
          <SessionButton simbol="-" onClick={handleMinusBreakClick} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
