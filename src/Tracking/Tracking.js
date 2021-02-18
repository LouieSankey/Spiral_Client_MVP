import React, { Component } from 'react'
import BarChart from './Chart/Chart'
import Grid from './Grid/Grid'
import './Tracking.css'
import Dropdown from 'react-dropdown'
import ApiContext from '../ApiContext'
import config from '../config'
import moment from 'moment'
import PieChart from './PieChart/PieChart'
import { FormatTrackingHeader } from './helper'
import APIService from '../api-services'

export default class Tracking extends Component {

  state = {
    tasks: null,
    sortedTasks: [],
    projects: [],
    currentProject: {},
    sortedProjectTasks: [],
    tasksForBarChart: [],
    data: [
      { label: "apple", y: 10 },
      { label: "orange", y: 15 },
      { label: "banana", y: 25 },
      { label: "mango", y: 30 },
      { label: "grape", y: 28 }
    ]

  }

  static contextType = ApiContext;

  componentDidMount() {

    const contextValue = this.context;
    this.setState({
      currentProject: contextValue.currentProject,
      currentTaskName: "All",
    })

    this.getTasks()
  }


  //right now I'm querying all tasks associated with a user then sorting, 
  //instead you should query each time the project or date paramaters change and display what you get
  //to avoid refresh issues could store the current project and date selection in local storage
  
  getTasks() {
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
        this.getTasksForProject(this.state.currentProject, tasks)

      })
      .catch(error => {
        console.error({ error })
      })
  }

  getTasksForProject = (currentProject) => {

    let projectName = currentProject.value ? currentProject.value : currentProject.id
    let sortedTasks = this.state.tasks.filter(task => task.project === projectName)


    let allTasksTime = 0
    sortedTasks.forEach(task => {
      allTasksTime += task.cycle
    })

    let sortedProjectTasks = this.filterArrayForPieChart(sortedTasks)

    this.setState({
      sortedTasks: this.formatTasks(sortedTasks),
      tasksForBarChart: this.formatTasks(sortedTasks),
      taskTimeHeader: FormatTrackingHeader(allTasksTime),
      allTasksTime: allTasksTime,
      selectedProjectName: projectName,
      sortedProjectTasks: this.formatTasks(sortedProjectTasks)

    })

  }

  // sortedProjectTasks = () => {
  //   return
  // }

  filterArrayForPieChart = (tasks) => {

    let hash = {}
    tasks.forEach(task => {
      if (hash[task.task]) {
        hash[task.task] += task.cycle
      } else {
        hash[task.task] = task.cycle
      }
    })

    let data = []

    Object.keys(hash).forEach(key => {
      data.push({ y: hash[key], label: key })
    })

    return data
  }

  formatTasks = (tasks) => {
    tasks.forEach(task => {
      task.time = moment(task.date_published).format("h:mm a")
      task.date = moment(task.date_published).format("dddd, MMMM Do YYYY")
      task.day = moment(task.date_published).format("ddd, MMM Do")
    })
    tasks.reverse()
    return tasks
  }

  mapProjectsForDropdown = (projects) => {
    return projects.map(project => {
      return { value: project.id, label: project.project }
    })

  }

  onSliceSelected = (event) => {
    console.log(this.state.sortedTasks)

    this.setState({
      tasksForBarChart: this.state.currentTaskName === event.dataPoint.label
        ? this.state.sortedTasks
        : this.formatTasks(this.state.sortedTasks.filter(task => task.task === event.dataPoint.label)),

      currentTaskName: this.state.currentTaskName === event.dataPoint.label
        ? "All"
        : event.dataPoint.label,

      taskTimeHeader: this.state.currentTaskName === event.dataPoint.label
        ? FormatTrackingHeader(this.state.allTasksTime)
        : FormatTrackingHeader(event.dataPoint.y),

    })

  }

  DeleteProject = () => {
    APIService.deleteProject(this.state.currentProject.id)

  }

  render() {
    const { projects = [], currentProject = {} } = this.context
    const value = {

      tasks: this.state.tasksForBarChart,
      currentProject: currentProject,

    }

    return (
      <ApiContext.Provider value={value}>
        <div className="tracking-container">
          <div className="projects-dropdown">

            <Dropdown className='dropdown' options={this.mapProjectsForDropdown(projects)} onChange={this.getTasksForProject} value={currentProject.project} placeholder="Select an option" />

            <h1 className="bar-chart-header">Selected Task: {this.state.currentTaskName} </h1>
            <select name="timeframe" className="timeframe">
              <option value="today">This Week:</option>

            </select>

            <h2 className="bar-chart-sub-header">{this.state.taskTimeHeader}</h2>
          </div>

          <PieChart data={this.state.sortedProjectTasks.sort()} onSliceSelected={this.onSliceSelected} taskName={this.state.currentTaskName}></PieChart>

          <h2 className="tracking-header">{`Daily View (This Week - ${this.state.currentTaskName})`}</h2>
          <BarChart tasks={this.state.tasksForPieChart} headline={this.state.projectName ? this.state.projectName : currentProject.project}>
          </BarChart>
          <h2 className="edit-label">Edit Task</h2>
          <Grid></Grid>
          <br></br>
          <p onClick={() => this.DeleteProject()} className="delete-project">DELETE PROJECT</p>
        </div>
      </ApiContext.Provider>
    )
  }
}
