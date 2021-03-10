import React from 'react';
import ReactDOM from 'react-dom';
import GoldenRectangle from './GoldenRectangle';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <GoldenRectangle/>, div);
  ReactDOM.unmountComponentAtNode(div);
});