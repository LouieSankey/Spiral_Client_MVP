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
    this.setState({
      showProjects: true,
      pauseForModal: true
    });

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
        <h1 className=" spiral-title">Spiral</h1>
        <h2 className="spiral-headline">Start a timer for your task using one of the provided minute durations in the rectangle.</h2>
        <br />
        <BreakPrefsModal showPrefs={this.state.showPrefs} handleClose={this.hideBreakPrefsModal}></BreakPrefsModal>
        <TaskEntryBar setTaskName={this.setLocalTaskName} pauseForModal={this.state.pauseForModal} cycle={this.state.cycle} showProjectsModal={this.showAllProjectsModal}></TaskEntryBar>
        <MainRectangle updateCycle={this.updateCycle}></MainRectangle>
        <AllProjectsModal show={this.state.showProjects} handleClose={this.hideAllProjectsModal} showAdd={this.showNewProjectModal}>
        </AllProjectsModal>
        <NewProjectModal show={this.state.showAddProject} handleClose={this.hideNewProjectModal}>
        </NewProjectModal>
        <br />
        <h2 className="bottom-text">After your countdown expires, you'll be rewarded with a break (a bird tweet begins a break, a dog bark ends one). You can configure your break preferences <span className="break-clickable" onClick={this.showBreakPrefsModal}> here.</span></h2>
        <br />
        <h2 className="bottom-text">If you'd like this task to show up in <span onClick={() => this.props.history.push('./tracking')} className="link-tracking">tracking</span>, use the '+' button, then enter a project and task name.</h2>
        <br />
        <h2 onClick={this.showWorkflow} className=" bottom-text underline">Example Workflow</h2>
        <WorkflowModal showWorkflow={this.state.showWorkflow} handleClose={this.hideWorkflow}></WorkflowModal>
      </>
    )
  }
}