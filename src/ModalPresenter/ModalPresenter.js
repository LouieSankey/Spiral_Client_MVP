import React, { Component } from 'react';
import TaskEntryBar from '../TaskEntryBar/TaskEntryBar'
import MainRectangle from '../MainRectangle/MainRectangle'
import AllProjectsModal from './ProjectsModal/ProjectsModal';
import NewProjectModal from './NewProjectModal/NewProjectModal'
import BreakPrefsModal from './BreakPrefsModal'
import './ModalPresenter.css'
  
export default class Home extends Component {

    state = { 
      cycleTimeSelected: 0,
      show: false,
      showProjects: false,
      showAdd: false,
      pauseTimer: false
    };

    UpdateCycleSelected = (cycleTime) => {
      this.setState({cycleTimeSelected: cycleTime})
    }

    showBreakPrefsModal = () => {
        this.setState({ show: true,
        pauseForModal: true });
      };
    hideBreakPrefsModal = () => {
        this.setState({ show: false,
        pauseForModal:false });
      };

    showAllProjectsModal = () => {
      this.setState({ showProjects: true,
        pauseForModal:true });
      console.log('Click');
    };
  
    hideAllProjectsModal = () => {
      this.setState({ showProjects: false,
        pauseForModal:false });
    };

    showNewProjectModal = () => {
      this.setState({ showAdd: true,
        pauseForModal:true });
      console.log('Click');
    };
  
    hideNewProjectModal = () => {
      this.setState({ showAdd: false,
        pauseForModal:false });
    };
  
    render() {
        return (
            <>
                <h1 className="center-text">Spiral</h1>
                <h2 className="center-text">Estimate the duration of a task or subtask you're working on (in minutes), then be rewarded with <span className="break-clickable" onClick={this.showBreakPrefsModal}>a break.</span></h2>
                <BreakPrefsModal show={this.state.show} handleClose={this.hideBreakPrefsModal}></BreakPrefsModal>
                <TaskEntryBar pauseForModal={this.state.pauseForModal} cycleTimeSelected={this.state.cycleTimeSelected} showProjectsModal={this.showAllProjectsModal}></TaskEntryBar>
               
                <MainRectangle updateCycleSelected={this.UpdateCycleSelected}></MainRectangle>
                <AllProjectsModal show={this.state.showProjects} handleClose={this.hideAllProjectsModal} showAdd={this.showNewProjectModal}>
                    <div className="modal-content">
                        <h2>Current Project: No Project</h2>
                        <ul className="projects-list">
                        <li>Example Project</li>
                        </ul>
                    </div>
                
                </AllProjectsModal>
                <NewProjectModal show={this.state.showAdd} handleClose={this.hideNewProjectModal}>
                    <div className="project-modal-content">
                        <h2 className="create-project-header">Create Project</h2>
                        <input  type="text" className="create-project-input"></input>
                    </div>
                </NewProjectModal>
            </>
        )
    }
}