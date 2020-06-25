import React from 'react';

import './style.css';

export default function SessionButton({ ...props }) {
  return (
    <button {...props} className="buttonSession">
      {props.simbol}
    </button>
  );
}
