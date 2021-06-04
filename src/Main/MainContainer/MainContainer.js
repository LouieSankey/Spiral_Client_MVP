import React, { Component } from 'react';
import TaskEntryBar from '../TaskEntryBar/TaskEntryBar'
import GoldenRectangle from '../GoldenRectangle/GoldenRectangle'
import AllProjectsModal from '../Modals/ProjectsModal';
import NewProjectModal from '../Modals/NewProjectModal'
import BreakPrefsModal from '../Modals/BreakPrefsModal'
import './MainContainer.css'
import MainContext from '../../MainContext'
import  useSound from 'use-sound';


export default class Main extends Component {

  static contextType = MainContext;
  state = {
    cycle: 0,
    showPrefs: false,
    showProjects: false,
    showAddProject: false,
    pauseTimer: false,
    taskName: "",
    noClockStop: 0,
    takeBreak: 0,
    timeRemainingUntilBreak: 0
  };

  constructor(props){
  super(props);
  this.state = {
    timeRemainingUntilBreak: Number(props.timeUntilBreakFromDB),
    noClockStop: 0
  };

}

  componentWillReceiveProps = (nextProps) => {
  
    const timeUntilBreakFromDB = nextProps.timeUntilBreakFromDB
    this.setState(prevState => ({
      noClockStop: prevState.noClockStop + 1,
      timeRemainingUntilBreak: Number(timeUntilBreakFromDB),
    }))

    console.log("1", nextProps.noClockStop)
  
  }


  subtractFromTimeUntilBreak = (elapsedTime, bool) => {
    this.setState(prevState => ({ 
      noClockStop: prevState.noClockStop + 1,
      cycle: 0,
      timeRemainingUntilBreak: prevState.timeRemainingUntilBreak - elapsedTime
    }))
  }


  takeBreak = () => {
    this.setState(prevState => ({ 
      timeRemainingUntilBreak: 0,
      takeBreak: prevState.takeBreak + 1
    }))
  }

  updateCycle = (cycleTime) => {
    this.setState({ cycle: cycleTime })
  }

  showBreakPrefsModal = () => {
    this.setState({
      showPrefs: true,
    });
  };
  hideBreakPrefsModal = () => {
    this.setState({
      showPrefs: false,
    });
  };

  showAllProjectsModal = () => {
    this.setState(prevState => ({
      showProjects: !prevState.showProjects,
     noClockStop: prevState.noClockStop+1
    }));

  };

  hideAllProjectsModal = () => {
    this.setState(prevState => ({
      showProjects: false,
      noClockStop: prevState.noClockStop+1 
      }));
  };

  showNewProjectModal = () => {
    this.setState(prevState => ({
      showAddProject: true,
      noClockStop: prevState.noClockStop+1  
      }));
  };

  hideNewProjectModal = () => {
    this.setState(prevState => ({
      showAddProject: false,
      noClockStop: prevState.noClockStop+1
        }));
  };

  // noClockStop = () => {
 
  //   this.setState(prevState => ({
  //     noClockStop: prevState.noClockStop+1
  //       }));
  // }

  render() {
    return (
      <>
   
        <BreakPrefsModal showPrefs={this.state.showPrefs} handleClose={this.hideBreakPrefsModal}></BreakPrefsModal>
        <TaskEntryBar subtractFromTimeUntilBreak={this.subtractFromTimeUntilBreak} setTaskName={this.setLocalTaskName}  cycle={this.state.cycle} takeBreak={this.state.takeBreak}  noClockStop={this.state.noClockStop} showProjectsModal={this.showAllProjectsModal}></TaskEntryBar>
        <GoldenRectangle timeRemainingUntilBreak={this.state.timeRemainingUntilBreak} takeBreak={this.takeBreak} updateCycle={this.updateCycle}></GoldenRectangle>
        <AllProjectsModal show={this.state.showProjects} handleClose={this.hideAllProjectsModal} showAdd={this.showNewProjectModal}>
        </AllProjectsModal>
        <NewProjectModal show={this.state.showAddProject} noClockStop={this.noClockStop} handleClose={this.hideNewProjectModal}>
        </NewProjectModal>
        <br />
      </>
    )
  }
}