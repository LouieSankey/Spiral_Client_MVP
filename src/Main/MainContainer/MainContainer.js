import React, { Component } from 'react';
import TaskEntryBar from '../TaskEntryBar/TaskEntryBar'
import GoldenRectangle from '../GoldenRectangle/GoldenRectangle'
import AllProjectsModal from '../Modals/ProjectsModal';
import NewProjectModal from '../Modals/NewProjectModal'
import BreakPrefsModal from '../Modals/BreakPrefsModal'
import './MainContainer.css'
import ApiContext from '../../ApiContext'
import  useSound from 'use-sound';




export default class Main extends Component {

  static contextType = ApiContext;

  state = {
    cycle: 0,
    showPrefs: false,
    showProjects: false,
    showAddProject: false,
    pauseTimer: false,
    taskName: "",
 
  };


  updateCycle = (cycleTime) => {
    this.setState({ cycle: cycleTime })
  }

  showBreakPrefsModal = () => {
    this.setState({
      showPrefs: true,
      pauseForModal: true
    });
  };
  hideBreakPrefsModal = () => {
    this.setState({
      showPrefs: false,
      pauseForModal: false
    });
  };

  showAllProjectsModal = () => {
    this.setState(prevState => ({
      showProjects: !prevState.showProjects,
      pauseForModal: !prevState.pauseForModal
    }));

  };

  hideAllProjectsModal = () => {
    this.setState({
      showProjects: false,
      pauseForModal: false
    });
  };

  showNewProjectModal = () => {
    this.setState({
      showAddProject: true,
      pauseForModal: true
    });
  };

  hideNewProjectModal = () => {
    this.setState({
      showAddProject: false,
      pauseForModal: false
    });
  };





  render() {
    return (
      <>
   
        <BreakPrefsModal showPrefs={this.state.showPrefs} handleClose={this.hideBreakPrefsModal}></BreakPrefsModal>
        <TaskEntryBar setTaskName={this.setLocalTaskName} pauseForModal={this.state.pauseForModal} cycle={this.state.cycle} showProjectsModal={this.showAllProjectsModal}></TaskEntryBar>
        <GoldenRectangle updateCycle={this.updateCycle}></GoldenRectangle>
        <AllProjectsModal show={this.state.showProjects} handleClose={this.hideAllProjectsModal} showAdd={this.showNewProjectModal}>
        </AllProjectsModal>
        <NewProjectModal show={this.state.showAddProject} handleClose={this.hideNewProjectModal}>
        </NewProjectModal>
        <br />
      </>
    )
  }
}