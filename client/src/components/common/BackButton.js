import React from 'react';
import { Button } from "shards-react";

const BackButton = ({ mTop = 0 }) => {
  return (
    <Button style={{ marginTop: mTop }} onClick={ () => { window.history.back(); } }>Trở về</Button>
  );
}

export default BackButton;
