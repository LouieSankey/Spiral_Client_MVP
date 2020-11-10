import React from 'react';
import ReactDOM from 'react-dom';
import Tracking from './Tracking';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
      <Tracking />, div);
      
});