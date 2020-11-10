import React from 'react';
import ReactDOM from 'react-dom';
import WorkflowModal from '../WorkflowModal';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <WorkflowModal/>, div);
  ReactDOM.unmountComponentAtNode(div);
});