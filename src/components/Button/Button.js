import React from 'react';

import './style.css';

export default function Button({ ...props }) {
  return (
    <button {...props} className="button">
      {props.name}
    </button>
  );
}
