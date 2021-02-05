import React, { Component } from 'react';
import TaskEntryBar from './TaskEntryBar/TaskEntryBar'
import MainRectangle from './MainRectangle/MainRectangle'
import AllProjectsModal from './Modals/ProjectsModal';
import NewProjectModal from './Modals/NewProjectModal'
import BreakPrefsModal from './Modals/BreakPrefsModal'
import './TimerHome.css'
import ApiContext from '../ApiContext'
import WorkflowModal from './Modals/WorkflowModal'


export default class TimerHome extends Component {

  static contextType = ApiContext;

  state = {
    cycle: 0,
    showPrefs: false,
    showProjects: false,
    showAddProject: false,
    pauseTimer: false,
    taskName: "",
    showWorkflow: false
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

  showWorkflow = () => {
    this.setState({
      showWorkflow: true,
      pauseForModal: true
    });
  };
  hideWorkflow = () => {
    this.setState({
      showWorkflow: false,
      pauseForModal: false
    });
  };

  render() {
    return (
      <>
   
        <BreakPrefsModal showPrefs={this.state.showPrefs} handleClose={this.hideBreakPrefsModal}></BreakPrefsModal>
        <TaskEntryBar setTaskName={this.setLocalTaskName} pauseForModal={this.state.pauseForModal} cycle={this.state.cycle} showProjectsModal={this.showAllProjectsModal}></TaskEntryBar>
        <MainRectangle updateCycle={this.updateCycle}></MainRectangle>
        <AllProjectsModal show={this.state.showProjects} handleClose={this.hideAllProjectsModal} showAdd={this.showNewProjectModal}>
        </AllProjectsModal>
        <NewProjectModal show={this.state.showAddProject} handleClose={this.hideNewProjectModal}>
        </NewProjectModal>
        <br />
        <WorkflowModal showWorkflow={this.state.showWorkflow} handleClose={this.hideWorkflow}></WorkflowModal>
      </>
    )
  }
}