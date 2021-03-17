import React, { Component } from 'react'
import './TaskEntryBar.css'
import ApiContext from '../../ApiContext'
import Clock from '../Clock/Clock'
import ApiServices from '../../api-services'
import { isElementOfType } from 'react-dom/test-utils'
import config from '../../config'

export default class TaskEntryBar extends Component {
  static defaultProps = {}
  static contextType = ApiContext;

  state = {
    showTaskbar: false,
    tasks: []

  }


  constructor(props) {
    super(props);
    this.taskName = "No Task";
    this.setTaskName = this.setTaskName.bind(this);
    this.updateDBWithTask = this.updateDBWithTask.bind(this);
    this.taskInput = React.createRef();
    this.handleFocus = this.handleFocus.bind(this);
  }
 

  handleFocus = event => {
    this.taskInput.current.focus();
  }

  setTaskName = event => {
    this.taskName = event.target.value
  }

  updateDBWithTask = (cycle) => {
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



 onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


  render() {
    const plusbutton = this.state.showTaskbar ? "-" : "+"
    const projectName = (typeof this.context.currentProject === 'undefined') ? "PROJECT" : this.context.currentProject.project
    const tasks = (typeof this.context.tasksRes === 'undefined') ? [] : this.context.tasksRes

    { this.taskInput.current 
      && this.taskName !== "No Task"
      && this.taskName.length > 0
      && this.handleFocus() }

    return (
      <>
        <Clock updateDBWithTask={this.updateDBWithTask} cycle={this.props.cycle}  ></Clock>
        <div className="taskbar">
        {/* <button onClick={this.toggleTaskbar} className="plus-button" >{plusbutton}</button>
          {this.state.showTaskbar &&
          
          } */}

            <div>
              <label htmlFor="taskInput" className="task-name"  alt="an input for tracking to provide a name for your current task"></label>
              <input list="tasks" autoComplete="off" className="taskInput" name="taskInput" id="taskInput" ref={this.taskInput} onKeyPress={event => (event.key === 'Enter') && this.handleFocus} onChange={this.setTaskName} type="text" placeholder="Task Name" onFocus={(event) => event.target.select()} ></input>
              <datalist id="tasks">
                  {
       
                  
                  
                  tasks.filter(task => {return task.project === this.context.currentProject.id})
                  .map(task => {return task.task})
                  .filter( this.onlyUnique )
                  .map((task, key) =>
                    <option key={key} value={task} />
                  )}
              </datalist>
              <hr id="fake-underline"></hr>
              <div><button id="folder" onClick={this.props.showProjectsModal} alt="">{projectName}</button></div>
            </div>
        </div>
      </>
    )
  }
}