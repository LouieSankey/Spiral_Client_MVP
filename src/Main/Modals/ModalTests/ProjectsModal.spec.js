import React from 'react';
import ReactDOM from 'react-dom';
import ProjectsModal from '../ProjectsModal';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <ProjectsModal/>, div);
  ReactDOM.unmountComponentAtNode(div);
});