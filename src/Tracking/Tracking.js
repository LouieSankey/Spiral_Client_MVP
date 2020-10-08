import React, { Component } from 'react'
import BarChart from './Chart/Chart'
import Grid from './Grid/Grid'
import './Tracking.css'
import Dropdown from 'react-dropdown'
import ApiContext from '../ApiContext'
import config from '../config'
import moment from 'moment'

export default class Tracking extends Component {

//   constructor(props) {
//     super(props);
// }

      state = {
        tasks: null,
        sortedTasks: [],
        projects: [],
        currentProject: {},
    
    }
 

static contextType = ApiContext;

 componentDidMount() {
  const contextValue = this.context;
  this.setState({
    currentProject: contextValue.currentProject
  })
  
      this.getTasks() 
  }


  getTasks(){
      Promise.all([
      fetch(`${config.API_ENDPOINT}/task/account/${this.context.account_id}`),
    ])
      .then(([taskRes]) => {
        if (!taskRes.ok)
          return taskRes.json().then(e => Promise.reject(e))
       
        return Promise.all([
          taskRes.json(),
        ])
      })
      .then(([tasks]) => {
             this.setState({ tasks })
             this.getCurrentTasks(this.state.currentProject)
        
      })
      .catch(error => {
        console.error({ error })
      })
  }


  getProjectNames = (projects) => {

      return projects.map(project => {
          return { value: project.id, label: project.project}
        })

  }

  getCurrentTasks = currentProject => {
    let sortedTasks = this.state.tasks.filter(task => task.project === currentProject.id)
    let tasks = this.parseTaskDate(sortedTasks)

    this.setState({
        sortedTasks: tasks
    })
  }

  sortTasks = event => { 
       let sortedTasks = this.state.tasks.filter(task => task.project === event.value)
        let tasks = this.parseTaskDate(sortedTasks)
      
        this.setState({
            sortedTasks: tasks,
            projectName: event.label
        })

  }

  parseTaskDate = (tasks) => {

      tasks.forEach( task => {
        task.time = moment(task.date_published).format("h:mm a")
        task.date = moment(task.date_published).format("dddd, MMMM Do YYYY")
        task.day = moment(task.date_published).format("ddd, MMM Do")
      })

      tasks.reverse()

    return tasks
  }

 
render() {
    const { projects=[], currentProject={} } = this.context
     const value = {
        tasks: this.state.sortedTasks,
        currentProject: currentProject,
    }

        return (
         <ApiContext.Provider value={value}>
           
            <div className="tracking-container">
              
                <BarChart headline={this.state.projectName ? this.state.projectName : currentProject.project}>
   
                </BarChart>
                <Dropdown className='dropdown' options={this.getProjectNames(projects)} onChange={this.sortTasks}  value={currentProject.project} placeholder="Select an option" />
                <Dropdown className='dropdown' options={['This Week']} onChange={this._onSelect} value={"This Week"} placeholder="Select an option" />
                <Grid></Grid>
            </div>
           
         </ApiContext.Provider>
        )
    }
}
