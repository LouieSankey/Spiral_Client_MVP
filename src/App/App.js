import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FaAlignRight } from 'react-icons/fa';
import Home from '../Home/TimerHome'
import Tracking from '../Tracking/Tracking'
import Splash from '../Splash/Splash'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'

export default class App extends Component {
    state = {
        toggleMobileNav:false,
        account_id: 1,
        // currentProject: null,
        // currentTask: null,
        tasks: []
    }

   componentDidMount() {

    Promise.all([
      fetch(`${config.API_ENDPOINT}/account/${this.state.account_id}`),
      fetch(`${config.API_ENDPOINT}/project/account/${this.state.account_id}`)
    ])
      .then(([accountRes, projectRes]) => {
        if (!accountRes.ok)
          return accountRes.json().then(e => Promise.reject(e))
        if (!projectRes.ok)
          return projectRes.json().then(e => Promise.reject(e))

        return Promise.all([
          accountRes.json(),
          projectRes.json(),
        ])
      })
      .then(([account, projects]) => {
        this.setState({ account, projects })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleAddProject = newProject => {
    console.log(this.state.projects)
    this.setState({
      currentProject: newProject,
      projects: [
        ...this.state.projects,
        newProject
      ]
    })
  }

  setCurrentProject = (project) => {
    this.setState({
      currentProject: project
    })
  }

  // handleAddTask = newTask => {
  //   this.setState({
  //     currentTask: newTask,
  //     tasks: [
  //       ...this.state.tasks,
  //       newTask
  //     ]
  //   })
  // }



    ToggleMobileNav = () => {
        this.setState({toggleMobileNav:!this.state.toggleMobileNav})
    }

    renderMainRoutes() {
      return (  
        <> 
          <Route
            exact
            path='/'
            component={Home}
          />
          <Route
            path='/tracking'
            component={Tracking}
          />
           <Route
            path='/splash'
            component={Splash}
          />
      </>
      )
    }

    render() {

      const value = {
        account_id: this.state.account_id,
        account: this.state.account,
        projects: this.state.projects,
        // currentProject: this.state.currentProject,
        // currentTask: this.state.currentTask,
        setCurrentProject: this.setCurrentProject,
        handleAddProject: this.handleAddProject,
        handleAddTask: this.handleAddTask,
        // setCurrentTaskName: this.setCurrentTaskName
      }
        return (
          <ApiContext.Provider value={value}>
              <div className="navBar">
                  <button className="nav-button" onClick={this.ToggleMobileNav}>
                      <FaAlignRight />
                  </button>
                  <li className="splash"> <Link to="/splash">Spiral</Link></li>
                  <ul className={this.state.toggleMobileNav ? "nav-links show-nav" : "nav-links"}>
                      <li> <Link to="/">Timer</Link></li>
                      <li> <Link to="/tracking">Tracking</Link></li>
                      <li> <Link to="/logout">Log Out</Link></li>
                  </ul>
              </div>
              {this.renderMainRoutes()}
          </ApiContext.Provider>

    )}

}

