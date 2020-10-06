import React, { Component } from 'react';
import TaskEntryBar from './TaskEntryBar/TaskEntryBar'
import MainRectangle from './MainRectangle/MainRectangle'
import AllProjectsModal from './Modals/ProjectsModal';
import NewProjectModal from './Modals/NewProjectModal'
import BreakPrefsModal from './Modals/BreakPrefsModal'
import './TimerHome.css'
import ApiContext from '../ApiContext'
  
export default class TimerHome extends Component {

  static contextType = ApiContext;

    state = { 
      cycle: 0,
      showPrefs: false,
      showProjects: false,
      showAddProject: false,
      pauseTimer: false,
      taskName: ""
    };



    updateCycle = (cycleTime) => {
      this.setState({cycle: cycleTime})
    }

    showBreakPrefsModal = () => {
        this.setState({ showPrefs: true,
        pauseForModal: true });
      };
    hideBreakPrefsModal = () => {
        this.setState({ showPrefs: false,
        pauseForModal:false });
      };

    showAllProjectsModal = () => {
      this.setState({ showProjects: true,
        pauseForModal:true });
  
    };
  
    hideAllProjectsModal = () => {
      this.setState({ showProjects: false,
        pauseForModal:false });
    };

    showNewProjectModal = () => {
      this.setState({ showAddProject: true,
        pauseForModal:true });
      console.log('Click');
    };
  
    hideNewProjectModal = () => {
      this.setState({ showAddProject: false,
        pauseForModal:false });
    };
  
    render() {
        return (
            <>
                <h1 className="center-text">Spiral</h1>
                <h2 className="center-text">Estimate the duration of a task or subtask you're working on (in minutes), then be rewarded with <span className="break-clickable" onClick={this.showBreakPrefsModal}>a break.</span></h2>
                <BreakPrefsModal showPrefs={this.state.showPrefs} handleClose={this.hideBreakPrefsModal}></BreakPrefsModal>
                <TaskEntryBar setTaskName={this.setLocalTaskName} pauseForModal={this.state.pauseForModal} cycle={this.state.cycle} showProjectsModal={this.showAllProjectsModal}></TaskEntryBar>
                <MainRectangle updateCycle={this.updateCycle}></MainRectangle>
                <AllProjectsModal show={this.state.showProjects} handleClose={this.hideAllProjectsModal} showAdd={this.showNewProjectModal}>
                </AllProjectsModal>
                <NewProjectModal show={this.state.showAddProject} handleClose={this.hideNewProjectModal}>
                </NewProjectModal>
            </>
        )
    }
}