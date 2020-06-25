import React from 'react';

import './style.css';

export default function Display({ children }) {
  return <span className="timer">{children}</span>;
}
