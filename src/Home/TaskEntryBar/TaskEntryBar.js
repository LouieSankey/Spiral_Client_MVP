import React, { Component } from 'react'
import './TaskEntryBar.css'
import ApiContext from '../../ApiContext'
import Clock from './Clock/Clock'
import folderIcon from '../../Img/folder_icon.png'
import ApiServices from '../../api-services'
import { isElementOfType } from 'react-dom/test-utils'

export default class TaskEntryBar extends Component {
  static defaultProps = {}
  static contextType = ApiContext;

  state = {
    showTaskbar: false,
    taskBarCounter: 0,

  }

  constructor(props) {
    super(props);
    this.taskName = "No Task";
    this.setTaskName = this.setTaskName.bind(this);
    this.updateDB = this.updateDB.bind(this);
    this.taskInput = React.createRef();
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus = event => {
    this.taskInput.current.focus();
  }

  setTaskName = event => {
    this.taskName = event.target.value
  }

  updateDB = (cycle) => {
    let projectId;
    if (typeof this.context.currentProject === 'undefined') {
      projectId = "0000"
    } else {
      projectId = this.context.currentProject.id
    }
    const task = {
      "account": this.context.account_id,
      "project": projectId,
      "task": this.taskName,
      "cycle": cycle
    }
    ApiServices.postTask(task)
  }

  toggleTaskbar = () => {
    this.setState({
      taskBarCounter: this.state.taskBarCounter + 1
    })

    if (this.state.showTaskbar) {
      this.setState({
        showTaskbar: false
      })
    } else {
      this.setState({
        showTaskbar: true
      })
    }
  }


  render() {
    const plusbutton = this.state.showTaskbar ? "-" : "+"
    const projectName = (typeof this.context.currentProject === 'undefined') ? "PROJECT" : this.context.currentProject.project

    { this.taskInput.current 
      && this.taskName !== "No Task"
      && this.taskName.length > 0
      && this.handleFocus() }

    return (
      <>
        <Clock updateDB={this.updateDB} taskBarOpen={this.state.showTaskbar} cycle={this.props.cycle} pauseForModal={this.props.pauseForModal} taskBarCounter={this.state.taskBarCounter}></Clock>
        <div className="taskbar">
        {/* <button onClick={this.toggleTaskbar} className="plus-button" >{plusbutton}</button>
          {this.state.showTaskbar &&
          
          } */}

            <div>
              <label htmlFor="taskInput" className="task-name"  alt="an input for tracking to provide a name for your current task"></label>
              <input className="taskInput" name="taskInput" id="taskInput" ref={this.taskInput} onKeyPress={event => (event.key === 'Enter') && this.handleFocus} onChange={this.setTaskName} type="text" placeholder="Task Name" onFocus={(event) => event.target.select()} ></input>
              <div><button id="folder" onClick={this.props.showProjectsModal} alt="">{projectName}</button></div>
            </div>
        </div>
      </>
    )
  }
}