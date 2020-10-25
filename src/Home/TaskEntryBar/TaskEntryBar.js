import React, { Component } from 'react'
import './TaskEntryBar.css'
import ApiContext from '../../ApiContext'
import Clock from './Clock/Clock'
import folderIcon from '../../Img/folder_icon.png'
import ApiServices from '../../api-services'

export default class TaskEntryBar extends Component {
    static defaultProps = {}
    static contextType = ApiContext;

    state={
      showTaskbar: false,
      taskBarCounter: 0,
   
    }



    constructor(props) {
      super(props);
      this.taskName= "No Task";
      this.setTaskName = this.setTaskName.bind(this);
      this.updateDB = this.updateDB.bind(this);
  }

    setTaskName = event => {
      this.taskName = event.target.value
    } 

    updateDB = (cycle) => {

//if no project selected
let projectId;
  if(typeof this.context.currentProject === 'undefined'){
  projectId = "0000"
  }else{
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

    if(this.state.showTaskbar){
      this.setState({
        showTaskbar: false
      })
    }else{
      this.setState({
        showTaskbar: true
      })
    }
  }

    render() {

const plusbutton = this.state.showTaskbar ? "-" : "+"

const projectName = (typeof this.context.currentProject === 'undefined') ? "PROJECT" : this.context.currentProject.project

return ( 
          <>
          
          <Clock updateDB={this.updateDB} cycle={this.props.cycle} pauseForModal={this.props.pauseForModal} taskBarCounter={this.state.taskBarCounter}></Clock>

            <div className="taskbar">
               
        <button onClick={this.toggleTaskbar} className="plus-button" >{plusbutton}</button>
                
                {this.state.showTaskbar &&
                <div className="toggle-taskbar">
                  <p className="task-name">Task Name</p>
                  <input className="taskInput"  onChange={this.setTaskName} type="text" placeholder="" name="taskInput"></input>
                <div className="floatLeft"><button id="folder" onClick={this.props.showProjectsModal} alt="">{projectName}</button></div>
                </div>
                
                }
           
            </div>
            </>
        )}
}