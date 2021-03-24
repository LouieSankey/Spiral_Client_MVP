import React, { Component } from 'react'
import OneWeekTrailing from '../OneWeekTrailing/OneWeekTrailing'
import Grid from '../AG_Grid/Grid'
import './Tracking.css'
import Dropdown from 'react-dropdown'
import MainContext from '../../MainContext'
import config from '../../config'
import PieChart from '../PieChart/PieChart'
import { FormatTrackingHeader } from '../helper'
import APIService from '../../api-services'
import DotLoader from "react-spinners/ClipLoader"
import OneMonthTrailing from "../OneMonthTrailing/OneMonthTrailing"
import moment from 'moment'

export default class Tracking extends Component {

  state = {
    tasks: null,
    currentProject: {},
    currentTaskName: "All Tasks",
    tasksForPie: [],
    tasksForDailyView: [],
    displayLoader: true,
    timeRange: "1",
    timeRangeLabel: "Last 7 Days",
    timeRangeOptions: [
      {
        name: 'Last 7 Days',
        value: "1"

      },
      {
        name: 'Last 30 Days',
        value: "2"
      }

    ],

  }

  static contextType = MainContext;

  componentDidMount() {

    const contextValue = this.context;
    let currentProject =
      contextValue.currentProject ? contextValue.currentProject : JSON.parse(localStorage.getItem("recent_project"))

    this.setState({
      currentProject: currentProject,
    })

    this.getSelectedProjectTasksFromDB(this.state.timeRange, currentProject.id)

    setTimeout(() => {
      this.setState({
        displayLoader: false
      });
    }, 3000)
  }


  getSelectedProjectTasksFromDB = (timeRange, currentProjectId) => {

    let account_id = this.context.account_id ? this.context.account_id : JSON.parse(localStorage.getItem("account_id"))
    let project_id = currentProjectId ? currentProjectId : JSON.parse(localStorage.getItem("recent_project")).id

    let dateFrom, dateTo

    switch (timeRange) {
      case "1":
        dateFrom = moment().subtract(7, 'd').toDate().toISOString();
        dateTo = moment().subtract(0, 'd').toDate().toISOString();
        break;
      case "2":
        dateFrom = moment().subtract(30, 'd').toDate().toISOString();
        dateTo = moment().subtract(0, 'd').toDate().toISOString();
        break;
      default:
        break;
    }

    let params = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      timeRange: timeRange,
      project: project_id,
      account: account_id
    }

    APIService.getProjectTasksForRange(params)
      .then(([tasks]) => {
        this.setState({ tasks })
        this.getTimeForTasks(tasks)

      })
      .catch(error => {
        console.error({ error })
      })

  }


  onTimeRangeSelected = (event) => {
    this.setState({ timeRange: event.target.value, timeRangeLabel: event.nativeEvent.target[event.nativeEvent.target.selectedIndex].label })
    this.getSelectedProjectTasksFromDB(event.target.value, this.state.currentProject.id)
  }

  onProjectSelected = (event) => {
    let project = { ...this.state.currentProject, id: event.value, project: event.label }
    this.state.currentProject = project
    this.getSelectedProjectTasksFromDB(this.state.timeRange, event.value)
    localStorage.setItem("recent_project", JSON.stringify(project))
  }

  onSliceSelected = (event) => {

    this.setState({
      tasksForDailyView: this.state.currentTaskName === event.dataPoint.label
        ? this.state.tasks
        : this.addTimeLabelFormatting(this.state.tasks.filter(task => task.task === event.dataPoint.label)),

      currentTaskName: this.state.currentTaskName === event.dataPoint.label
        ? "All Tasks"
        : event.dataPoint.label,

      taskTimeHeader: this.state.currentTaskName === event.dataPoint.label
        ? FormatTrackingHeader(this.state.timeForAllTasks)
        : FormatTrackingHeader(event.dataPoint.y),

    })

  }


  getTimeForTasks = (tasks) => {

    let timeForAllTasks = 0
    tasks.forEach(task => {
      timeForAllTasks += task.cycle
    })

    let tasksForPie = this.getTimeTotalForEachTask(tasks)

    this.setState({
      tasksForDailyView: this.addTimeLabelFormatting(tasks),
      taskTimeHeader: FormatTrackingHeader(timeForAllTasks),
      tasksForPie: this.addTimeLabelFormatting(tasksForPie),
      timeForAllTasks: timeForAllTasks,
    })

  }


  getTimeTotalForEachTask = (tasks) => {
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

  addTimeLabelFormatting = (tasks) => {
    tasks.forEach(task => {
      task.time = moment(task.date_published).format("h:mm a")
      task.date = moment(task.date_published).format("dddd, MMMM Do YYYY")
      task.day = moment(task.date_published).format("ddd, MMM Do")
    })
    tasks.reverse()
    return tasks
  }


  mapProjectsForDropdown = (projects) => {

    if (!projects) {
      projects = localStorage.getItem("recent_projects")
    }

    return projects.map(project => {
      return { value: project.id, label: project.project }
    })
  }



  DeleteProject = (force = false) => {

    let confirm = true;
    if (!force) {
      confirm = window.confirm(`are you sure you want to delete "${this.state.currentProject.project}"?`)
    }
    if (confirm) {
      APIService.deleteProject(this.state.currentProject.id)
    }
  }



  render() {
    const { projects = [], currentProject = {} } = this.context
    const value = {
      tasks: this.state.tasksForDailyView,
      currentProject: currentProject,
    }


    return (
      <MainContext.Provider value={value}>
        <div className="tracking-container">
          <div className="projects-dropdown">

            <Dropdown className='dropdown' options={this.mapProjectsForDropdown(projects)} onChange={this.onProjectSelected} value={this.state.currentProject.project} placeholder="Select an option" />

            <h1 className="bar-chart-header">Selected Task: {this.state.currentTaskName} </h1>
            <select name="timeframe" className="timeframe" onChange={this.onTimeRangeSelected} value={this.state.timeRange}>
              {this.state.timeRangeOptions.map(item => (
                <option key={item.value} value={item.value} label={item.name}>
                  {item.name}
                </option>))}
            </select>


            <h2 className="bar-chart-sub-header">{this.state.taskTimeHeader}</h2>
          </div>

          {this.state.tasksForPie.length > 0 ?

            <PieChart data={this.state.tasksForPie.sort()} onSliceSelected={this.onSliceSelected} taskName={this.state.currentTaskName}></PieChart>
            :
            <div className={"loaderContainer"}>
              {this.state.displayLoader ?
                <DotLoader className={this.state.displayLoader} color={'#6b8bba'} size={60}></DotLoader>
                : <p className={'loader-empty'}>No Tasks Found</p>}
            </div>
          }
          <h2 className="tracking-header">{`${this.state.timeRangeLabel} - ${this.state.currentTaskName}`}</h2>

          {(() => {
            switch (this.state.timeRange) {
              case "1":
                return <OneWeekTrailing headline={this.state.projectName ? this.state.projectName : currentProject.project} />
              case "2":
                return <OneMonthTrailing headline={this.state.projectName ? this.state.projectName : currentProject.project} />
              default:
                return null;
            }
          })()}

          <h2 className="edit-label">Edit Task</h2>
          <Grid></Grid>
          <br></br>
          <p onClick={() => this.DeleteProject()} className="delete-project">DELETE PROJECT</p>
        </div>
      </MainContext.Provider>
    )
  }
}
