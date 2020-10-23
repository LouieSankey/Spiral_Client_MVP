import React, { Component } from 'react';
import { BrowserRouter as Redirect, Route, Link, withRouter } from "react-router-dom";
import { FaAlignRight } from 'react-icons/fa';
import Home from '../Home/TimerHome'
import Tracking from '../Tracking/Tracking'
import Splash from '../Splash/Splash'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'
import { useLocation } from 'react-router-dom'


class App extends Component {

  constructor(props){
    super(props);
    this.handleAPIRequest = this.handleAPIRequest.bind(this);
  }

    state = {
        toggleMobileNav:false,
        account_id: null,
        tasks: []
    }
    
    handleAPIRequest = (account_id) => {

      console.log("account is " + account_id)

      //Leaving the second call (after login/sigup) to get account info here for 
      // because I'm not yet sure how to handle returning users
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
        const currentProject = projects[0]
        this.setState({ account, projects, prefsRes, account_id, currentProject})
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

  componentDidMount = () => {
    let account_id = localStorage.getItem('account_id')
    account_id = Number(account_id)
    if(account_id){
      this.handleAPIRequest(account_id)
      console.log("logged in with token")
    }else{
      //redirect to splash page
      console.log("redirected to splash")
      this.props.history.push('/Spiral')

    }


  }

    ToggleMobileNav = () => {
        this.setState({toggleMobileNav:!this.state.toggleMobileNav})
    }

    renderMainRoutes() {
      return (  
        <> 
      <Route
           path='/spiral'
           component={Splash}/>
        
          <Route path="/tracking">
              <Tracking />
          </Route>

           <Route
            exact
            path='/'
            render={(props) => <Home {...props}/>}/>

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
      console.log("account id :: " + localStorage.getItem("account_id"))
      this.ToggleMobileNav()
    }

    changeBreakPrefs = (newPrefs) => {

        for (const key in newPrefs) {
          if(newPrefs[key] !== null){

            console.log(`${key}: ${newPrefs[key]}`);
          }
       
        }

    }

  

    render() {

      const value = {
        account_id: this.state.account_id,
        account: this.state.account,
        projects: this.state.projects,
        currentProject: this.state.currentProject,
        prefs: this.state.prefsRes,
        // currentTask: this.state.currentTask,
        changeBreakPrefs: this.changeBreakPrefs,
        setCurrentProject: this.setCurrentProject,
        handleAddProject: this.handleAddProject,
        handleAPIRequest: this.handleAPIRequest,
        handleAddTask: this.handleAddTask,
        // setCurrentTaskName: this.setCurrentTaskName
      }

      const isSplashPage = (window.location.pathname === "/Spiral" || window.location.pathname === "/spiral")


        return (
          <ApiContext.Provider value={value}>
            
             
                {isSplashPage ? null :
              <div className="navBar">
              <button className="nav-button" onClick={this.ToggleMobileNav}>
                  <FaAlignRight />
              </button>
                  {/* <p> <Link className="example-workflow" onClick={this.Logout}>Example Workflow</Link></p> */}

                  <ul className={this.state.toggleMobileNav ? "nav-links show-nav" : "nav-links"}>
                      <li> <Link onClick={this.ToggleMobileNav} to="/">Timer</Link></li>
                      <li> <Link onClick={this.ToggleMobileNav} to="/tracking">Tracking</Link></li>
                      <li> <Link onClick={this.Logout} to="/Spiral" >Log Out</Link></li>
                  </ul>
              </div>}
            
              {this.renderMainRoutes()}
            
          </ApiContext.Provider>

    )}

}

export default withRouter(App)

