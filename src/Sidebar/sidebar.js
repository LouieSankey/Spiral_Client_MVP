import React, { Component } from 'react';
import './sidebar.css'
import { Link } from "react-router-dom"
import NavModal from '../Main/Modals/NavModal'

import MainContext from '../MainContext'
import HelpModal from '../Main/Modals/HelpModal'


class Sidebar extends Component {

  state = {
    isSidebarVisible: false,
    showNav: false,
    showBreakPrefs: false,
    showPrefs: false,
    showNavModal: false,
    showHelp: false,
    breakAfter: 90,
    breakDuration: 20
  };

  constructor(props) {
    super(props)
//refacotred how the breaks work. Temporarily using
//89 for break interval
//55 for break duration
//34 for idle reset
    this.newPrefs = {
     
      "89": null,
      "55": null,
      "34": null,
      "21": null,
      "13": null,
      "8": null,
      "5": null,
      "3": null,
      "2": null,
      "gong": null
    }

    this.homeLinkRef = React.createRef()
    this.insightsLinkRef = React.createRef()
    this.logoutLinkRef = React.createRef()

  }


  static contextType = MainContext;

  updateBreakPrefs = () => {
    this.context.changeBreakPrefs(this.newPrefs)
  }

  changePreferenceValue = event => {
    this.newPrefs[event.target.getAttribute('name')] = event.target.value
    this.context.setTimeUntilBreakFromDB(event.target.value)
    this.setState({
      breakAfter: event.target.value
    })
  };

  updateGongValue = event => {
    if (event.target.checked) {
      this.newPrefs["gong"] = false
    } else {
      this.newPrefs["gong"] = true
    }
  }

  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  ToggleSidebar = () => {
    this.setState(prevState => ({
      isSidebarVisible: !prevState.isSidebarVisible
    }));
  }



  CloseSidebar = () => {
    document.body.classList.add('body-margin-left-none')
    document.body.classList.remove('body-margin-left')

  }

  navAccordianClose = () => {
    this.setState({ showNavModal: false })
  }

  allowNavigateToInsights = () => {
    if (this.context.timerRef.current?.innerText === "00:00" || this.context.timerRef.current?.innerText === undefined) {
      this.insightsLinkRef.current.click()
    } else {
      this.setState({ showNavModal: true })
    }
  }

  allowNavigateToLogout = () => {
    if (this.context.timerRef.current?.innerText === "00:00" || this.context.timerRef.current?.innerText === undefined) {
      this.logoutLinkRef.current.click()
    } else {
      this.setState({ showNavModal: true })
    }
  }

  allowNavigateToTimer = () => {
    if (this.context.timerRef.current?.innerText === "00:00" || this.context.timerRef.current?.innerText === undefined) {
      this.homeLinkRef.current.click()
    }

  }

  showHelp = () => {
    this.setState({
      showHelp: true,
      // pauseForModal: true
    });
  };

  hideHelp = () => {
    this.setState({
      showHelp: false,
    });
  };

  ToggleHelp = () => {
    this.setState({ showHelp: !this.state.showHelp })

  }

  changeBreakDuration = (event) =>{
 
    this.setState({breakDuration: event.target.value});
  }
   


  render() {

    this.state.isSidebarVisible ? document.body.classList.add('body-margin-left') : this.CloseSidebar()
    const isLandingPage = (window.location.pathname === "/Spiral" || window.location.pathname === "/spiral")

    return (
      <>

        {isLandingPage ? null : <>
          <div id="mySidebar" className={`sidebar ${this.state.isSidebarVisible ? "sidebar-visible" : ""}`}>
            <a className="closebtn" onClick={this.ToggleSidebar}>&times;</a>

            <div className="sidebar-content">
              <img className="spiral-text-logo-small" src={require("../Img/spiral-text-logo.png").default} alt="" />

              <h2 onClick={() => this.setState({ showNav: !this.state.showNav })} className="white accordion">Menu</h2>
              <div className="panel " className={this.state.showNav ? 'display-block' : 'display-none'}>

                <ul className={this.state.showNav ? 'display-block' : 'display-none'}>

                  <li className="nav-link" onClick={() => this.allowNavigateToTimer()}> <Link ref={this.homeLinkRef} to="/"></Link>Timer</li>
                  <li className="nav-link" onClick={() => this.allowNavigateToInsights()}> <Link ref={this.insightsLinkRef} to="/tracking"></Link>Insights</li>
                  <li className="nav-link" onClick={() => this.allowNavigateToLogout()}> <Link ref={this.logoutLinkRef} onClick={() => { this.props.logout(); this.ToggleSidebar() }} to="/spiral" ></Link>Logout</li>

                </ul>
              </div>
              <NavModal handleClose={this.navAccordianClose} show={this.state.showNavModal}></NavModal>


              <h2 onClick={() => this.setState({ showBreakPrefs: !this.state.showBreakPrefs })} className="white accordion">Breaks</h2>
              <div className="panel " className={this.state.showBreakPrefs ? 'display-block' : 'display-none'}>
                
                <h4 className="grey">Suggest Break After:</h4>

{/* break interval needs to be called from here to persist local change */}
                <select onChange={this.changePreferenceValue} value={this.state.breakAfter} name="89" id="break-durations">
                <option value={15}>0:15m</option>
                  <option value={30}>0:30m</option>
                  <option value={45}>0:45m</option>
                  <option value={60}>1h</option>
                  <option value={90}>1:30m</option>
                  <option value={120}>2h</option>
                  <option value={150}>2:30m</option>
                  <option value={180}>3h</option>
                  <option value={210}>3:30m</option>
                  <option value={240}>4h</option>
                </select>

                <h4 className="grey">Break Duration In Minutes:</h4>

                {this.context.prefs && <>
                {/* this corresponds to break interval for now */}
                  <input type="integer" onChange={this.changeBreakDuration} defaultValue={this.context.prefs['55']} name="55" className="edit-break" ></input>

                  <h4 className="grey">Idle Time Before Break Reset:</h4>

                  {/* this corresponds to idle reset */}
                  <input type="integer" onChange={this.changeBreakReset} defaultValue={this.context.prefs['34']} name="34" className="edit-break" ></input>
                <br/><br/>

                  <button onClick={this.updateBreakPrefs} className="save-break-prefs-button" >SAVE</button>
               
                </>
                }


              </div>


              <h2 onClick={() => this.setState({ showPrefs: !this.state.showPrefs })} className="white accordion">Theme</h2>
              <div className="panel " className={this.state.showPrefs ? 'display-block' : 'display-none'}>

                <h3 className="grey">Break Sound</h3>
                <select>
                  <option>Bird Tweet</option>

                </select>
                <h3 className="grey">Resume Sound</h3>
                <select>
                  <option>Dog Bark</option>
                </select>

                <h3 className="grey">Idle Sound</h3>
                <select>
                  <option>Crickets</option>
                </select>

              </div>

              <h2 className="white accordion" onClick={() => this.ToggleHelp()}>Help</h2>


            </div>



          </div>
          <div id="main">
            <button className="openbtn" onClick={this.ToggleSidebar} >{``}</button>

          </div>
        </>

        }
        <HelpModal showHelp={this.state.showHelp} handleClose={this.hideHelp}></HelpModal>


      </>
    )
  }

}

export default Sidebar;