import React, { Component } from 'react'
import './TaskEntryBar.css'
import ApiContext from '../../ApiContext'
import config from '../../config'
import Clock from './Clock/Clock'
import folderIcon from '../../Img/folder_icon.png'

export default class TaskEntryBar extends Component {
    static defaultProps = {}
    static contextType = ApiContext;

    constructor(props) {
      super(props);
      this.taskName= "No Task";
      this.setTaskName = this.setTaskName.bind(this);
      this.postTask = this.postTask.bind(this);
  }

    setTaskName = event => {
      this.taskName = event.target.value
    } 

    postTask = (cycle) => {
      const task = {
        "account": this.context.account_id,
        "project": this.context.currentProject.id,
         "task": this.taskName,
        "cycle": cycle
      
      }

      console.log("my task " + JSON.stringify(task))

  fetch(`${config.API_ENDPOINT}/task`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(task => {
        console.log("posted task to db: " + JSON.stringify(task))
      
        //  this.taskName = ""

        //  this.context.setSelectedTask(task)
        //  this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

    render() {
        return ( 
            <div className="taskbar">
                <Clock postTask={this.postTask} cycle={this.props.cycle} pauseForModal={this.props.pauseForModal}></Clock>
                <input className="taskInput"  onChange={this.setTaskName} type="text" placeholder="what are you working on?" name="taskInput"></input>
                <div className="floatLeft"><img id="folder" src={folderIcon} onClick={this.props.showProjectsModal} width="30px" height="30px" alt=""></img></div>
            </div>
        )}
}