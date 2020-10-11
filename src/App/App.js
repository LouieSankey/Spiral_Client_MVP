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
    this.state = {
       account_id:null
    };

  }
  

    state = {
        toggleMobileNav:false,
        account_id: null,
        tasks: []
    }
    
    handleAPIRequest = (account_id) => {

      console.log("account is " + account_id)

      this.setState({
        account_id: account_id
      })


      //Leaving the second call (after login/sigup) to get account info here for 
      // because I'm not yet sure how to handle returning users
    Promise.all([
      fetch(`${config.API_ENDPOINT}/account/${account_id}`),
      fetch(`${config.API_ENDPOINT}/project/account/${account_id}`)
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

  

    ToggleMobileNav = () => {
        this.setState({toggleMobileNav:!this.state.toggleMobileNav})
    }

    renderMainRoutes() {
      return (  
        <> 

      

      <Route
           
           path='/spiral-react'
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

  

    render() {

      const value = {
         account_id: this.state.account_id,
        account: this.state.account,
        projects: this.state.projects,
        currentProject: this.state.currentProject,
        // currentTask: this.state.currentTask,
        setCurrentProject: this.setCurrentProject,
        handleAddProject: this.handleAddProject,
        handleAPIRequest: this.handleAPIRequest,
        handleAddTask: this.handleAddTask,
        // setCurrentTaskName: this.setCurrentTaskName
      }

      const isSplashPage = (window.location.pathname === "/Spiral-React")
      console.log(isSplashPage)

        return (
          <ApiContext.Provider value={value}>
            
             
                  {isSplashPage ? null :
              <div className="navBar">
              <button className="nav-button" onClick={this.ToggleMobileNav}>
                  <FaAlignRight />
              </button>
                  <ul className={this.state.toggleMobileNav ? "nav-links show-nav" : "nav-links"}>
                      <li> <Link to="/">Timer</Link></li>
                      <li> <Link to="/tracking">Tracking</Link></li>
                      <li> <Link to="/logout" >Log Out</Link></li>
                  </ul>
              </div>}
            

              {this.renderMainRoutes()}
            
          </ApiContext.Provider>

    )}

}

export default withRouter(App)

