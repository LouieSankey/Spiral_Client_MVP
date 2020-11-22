import React, { Component } from 'react';
import { BrowserRouter as Redirect, useLocation, Route, Link, withRouter } from "react-router-dom";
import { FaAlignRight } from 'react-icons/fa';
import Home from '../Home/TimerHome'
import Tracking from '../Tracking/Tracking'
import Splash from '../Splash/Splash'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'
import APIService from '../api-services';
import Sidebar from '../Sidebar/sidebar'
import '../Sidebar/sidebar.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.handleAPIRequest = this.handleAPIRequest.bind(this);
  }

  state = {
    toggleMobileNav: false,
    account_id: null,
    tasks: []
  }

  handleAPIRequest = (account_id) => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/account/${account_id}`),
      fetch(`${config.API_ENDPOINT}/project/account/${account_id}`),
      fetch(`${config.API_ENDPOINT}/pref/account/${account_id}`)
    ])
      .then(([accountRes, projectRes, prefsRes]) => {
        if (!accountRes.ok)
          return accountRes.json().then(e => Promise.reject(e))
        if (!projectRes.ok)
          return projectRes.json().then(e => Promise.reject(e))
        if (!prefsRes.ok)
          return prefsRes.json().then(e => Promise.reject(e))

        return Promise.all([
          accountRes.json(),
          projectRes.json(),
          prefsRes.json()
        ])
      })
      .then(([account, projects, prefsRes]) => {
        for (const key in prefsRes) {
          if (key.charAt(0) === "_") {
            delete Object.assign(prefsRes, { [key.substring(1)]: prefsRes[key] })[key];
          }
        }

        const currentProject = projects[0]
        this.setState({ account, projects, prefsRes, account_id, currentProject })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleAddProject = newProject => {
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

  componentDidMount = () => {

    document.title = "Spiral"
    let account_id = localStorage.getItem('account_id')
    account_id = Number(account_id)
    if (account_id) {
      this.handleAPIRequest(account_id)
    } else {
      this.props.history.push('/Spiral')
    }
  }

  ToggleMobileNav = () => {
    this.setState({ toggleMobileNav: !this.state.toggleMobileNav })
  }

  renderMainRoutes() {
    return (
      <>
        <Route
          path='/spiral'
          component={Splash} />
          
        <Route path="/tracking">
          <Tracking />
        </Route>
        <Route
          exact
          path='/'
          render={(props) => <Home {...props} />} />
      </>

    )
  }

  Logout = () => {
    // console.log("margin removed")
    // document.body.classList.add('body-margin-left-none')
    // document.body.classList.remove('body-margin-left')

    localStorage.setItem("account_id", null)
    this.setState({
      account: {},
      prefsRes: {},
      projects: [],
      tasks: [],
      account_id: null
    })
    this.ToggleMobileNav()
  }


  changeBreakPrefs = (newPrefs) => {
    let prefs = {}
    let dbPrefs = {}
    for (const key in newPrefs) {
      if (newPrefs[key] !== null) {
        prefs[key] = newPrefs[key]
        dbPrefs["_" + key] = newPrefs[key]
      }
    }

    const promises = []
    for (const key in prefs) {
      promises.push(Promise.resolve(
        this.setState(prevState => ({
          prefsRes: {
            ...prevState.prefsRes,
            [`${key}`]: Number(prefs[key])
          }

        }))))
    }

    Promise.all(promises).then(() => {
      APIService.saveUserPrefs(dbPrefs, this.state.account_id)
    })
  }


  render() {
    const value = {
      account_id: this.state.account_id,
      account: this.state.account,
      projects: this.state.projects,
      currentProject: this.state.currentProject,
      prefs: this.state.prefsRes,
      changeBreakPrefs: this.changeBreakPrefs,
      setCurrentProject: this.setCurrentProject,
      handleAddProject: this.handleAddProject,
      handleAPIRequest: this.handleAPIRequest,
      handleAddTask: this.handleAddTask,
    }

    return (
      <ApiContext.Provider value={value}>

        

          <Sidebar logout={this.Logout}></Sidebar>

        {this.renderMainRoutes()}
      </ApiContext.Provider>

    )
  }

}

export default withRouter(App)

