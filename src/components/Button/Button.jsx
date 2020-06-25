import React from 'react';

import './style.css';

export default function Button({ ...props }) {
  return (
    <button
      {...props}
      className={props.name === 'Reset' ? 'buttonRed' : 'button'}
    >
      {props.name}
    </button>
  );
}
