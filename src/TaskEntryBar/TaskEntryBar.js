import React, { Component } from 'react'
import './TaskEntryBar.css'

import folderIcon from '../img/folder_icon.png'
import ReactDOM from "react-dom";
import Projects from './ProjectsModal/ProjectsModal';
import NewProjectModal from './NewProjectsModal/NewProjectsModal'

import Timer from './Timer/Timer'

export default class TaskEntryBar extends Component {
    static defaultProps = {}

    state = { 
      showProjects: false,
      showAdd: false
     };


      showProjectsModal = () => {
        this.setState({ showProjects: true });
        console.log('Click');
      };
    
      hideProjectsModal = () => {
        this.setState({ showProjects: false });
      };

      showNewProjectModal = () => {
        this.setState({ showAdd: true });
        console.log('Click');
      };
    
      hideNewProjectModal = () => {
        this.setState({ showAdd: false });
      };


    render() {
        return ( 
            <>
            <div className="taskbar">
  
                <Timer cycleTimeSelected={this.props.cycleTimeSelected}></Timer>
                <input className="taskInput" type="text" placeholder="what are you working on?" name="taskInput"></input>
                <div className="floatLeft"><img id="folder" src={folderIcon} onClick={this.showProjectsModal} width="30px" height="30px" alt=""></img></div>
            </div>
            <Projects show={this.state.showProjects} handleClose={this.hideProjectsModal} showAdd={this.showNewProjectModal}>
                <div className="modal-content">
                    <h2>Current Project: No Project</h2>
                    <ul className="projects-list">
                    <li>Example Project</li>
                    </ul>
                  
                </div>
            </Projects>

            <NewProjectModal show={this.state.showAdd} handleClose={this.hideNewProjectModal}>
                <div className="project-modal-content">
                    <h2 className="create-project-header">Create Project</h2>
                    <input  type="text" className="create-project-input"></input>

                </div>
            </NewProjectModal>
            </>
        )}
}