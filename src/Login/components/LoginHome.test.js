import React from 'react';
import ReactDOM from 'react-dom';
import LoginHome from './LoginHome';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <LoginHome/>, div);
  ReactDOM.unmountComponentAtNode(div);
});