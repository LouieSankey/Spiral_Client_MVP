import React from 'react';
import ReactDOM from 'react-dom';
import MainRectangle from './MainRectangle';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MainRectangle/>, div);
  ReactDOM.unmountComponentAtNode(div);
});