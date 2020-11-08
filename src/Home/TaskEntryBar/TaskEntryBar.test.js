import React from 'react';
import ReactDOM from 'react-dom';
import TaskEntryBar from './TaskEntryBar';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <TaskEntryBar/>, div);
  ReactDOM.unmountComponentAtNode(div);
});