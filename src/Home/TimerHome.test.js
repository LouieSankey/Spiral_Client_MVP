import React from 'react';
import ReactDOM from 'react-dom';
import TimerHome from './TimerHome';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <TimerHome/>, div);
  ReactDOM.unmountComponentAtNode(div);
});