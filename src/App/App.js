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

    const isSplashPage = (window.location.pathname === "/Spiral" || window.location.pathname === "/spiral")
    return (
      <ApiContext.Provider value={value}>
        {isSplashPage ? null :
          <div className="navBar">
            <button className="nav-button" onClick={this.ToggleMobileNav} alt="a button that opens the navigation menu on mobile devices">
              <FaAlignRight />
              
            </button>
            <ul className={this.state.toggleMobileNav ? "nav-links show-nav" : "nav-links"}>
              <li> <Link onClick={this.ToggleMobileNav} to="/">Timer</Link></li>
              <li> <Link onClick={this.ToggleMobileNav} to="/tracking">Tracking</Link></li>
              <li> <Link onClick={this.Logout} to="/Spiral" >Log Out</Link></li>
            </ul>
          </div>}

        {this.renderMainRoutes()}
      </ApiContext.Provider>

    )
  }

}

export default withRouter(App)

