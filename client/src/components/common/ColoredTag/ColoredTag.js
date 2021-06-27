import React from 'react';

import './styles.css';

const ColoredTag = ({ label, color = '#5a6169' }) => {
  return (
    <div className="colored-tag" style={{ color: color }}>
      { label }
    </div>
  )
}

export default ColoredTag;
