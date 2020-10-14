import React, { Component } from 'react'
import './TaskEntryBar.css'
import ApiContext from '../../ApiContext'
import Clock from './Clock/Clock'
import folderIcon from '../../Img/folder_icon.png'
import ApiServices from '../../api-services'

export default class TaskEntryBar extends Component {
    static defaultProps = {}
    static contextType = ApiContext;

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

    render() {
        return ( 
            <div className="taskbar">
                <Clock updateDB={this.updateDB} cycle={this.props.cycle} pauseForModal={this.props.pauseForModal}></Clock>
                <input className="taskInput"  onChange={this.setTaskName} type="text" placeholder="what are you working on?" name="taskInput"></input>
                <div className="floatLeft"><img id="folder" src={folderIcon} onClick={this.props.showProjectsModal} width="30px" height="30px" alt=""></img></div>
            </div>
        )}
}