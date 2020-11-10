import React from 'react';
import ReactDOM from 'react-dom';
import BreakPrefsModal from '../BreakPrefsModal';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BreakPrefsModal/>, div);
  ReactDOM.unmountComponentAtNode(div);
});