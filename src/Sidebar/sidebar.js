import React, { Component } from 'react';
import './sidebar.css'
import { Link } from "react-router-dom"
import NavModal from '../Main/Modals/NavModal'

import ApiContext from '../ApiContext'

class Sidebar extends Component {

  state = {
    isSidebarVisible: false,
    showNav: false,
    showBreakPrefs: false,
    showPrefs: false,
    showNavModal: false
  };

  constructor(props) {
    super(props)

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


  static contextType = ApiContext;


  updateBreakPrefs = () => {
    this.context.changeBreakPrefs(this.newPrefs)

  }

  changePreferenceValue = event => {
    this.newPrefs[event.target.getAttribute('name')] = event.target.value
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

  handleClose = () => {
    this.setState({showNavModal:false})
  }

  navigateToInsights = () => {
    if(this.context.timerRef.current?.innerText === "00:00"  || this.context.timerRef.current?.innerText === undefined){
      this.insightsLinkRef.current.click()
    }else{
     this.setState({showNavModal:true})
    }
  }

  navigateToLogout = () => {
    if(this.context.timerRef.current?.innerText === "00:00" || this.context.timerRef.current?.innerText === undefined){
      this.logoutLinkRef.current.click()
    }else{
      this.setState({showNavModal:true})
    }
  }

  navigateToTimer = () => {
    if(this.context.timerRef.current?.innerText === "00:00"  || this.context.timerRef.current?.innerText === undefined){
      this.homeLinkRef.current.click()
    }

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
              <img className="spiral-text-logo-small" src={require("../Img/spiral-text-logo.png")} alt="" />


              <h2 onClick={() => this.setState({ showNav: !this.state.showNav })} className="white accordion">Menu</h2>
              <div className="panel" className={this.state.showNav ? 'display-block' : 'display-none'}>
              

                <ul className={this.state.showNav ? 'display-block' : 'display-none'}>
                 
                  <li className="nav-link" onClick={() => this.navigateToTimer()}> <Link  ref={this.homeLinkRef} to="/"></Link>Timer</li>
                  <li className="nav-link" onClick={() => this.navigateToInsights()}> <Link ref={this.insightsLinkRef} to="/tracking"></Link>Insights</li>
                  <li className="nav-link" onClick={() => this.navigateToLogout()}> <Link ref={this.logoutLinkRef} onClick={() => { this.props.logout(); this.ToggleSidebar() }} to="/spiral" ></Link>Logout</li>
               
                
                </ul>
              </div>
              <NavModal handleClose={this.handleClose} show={this.state.showNavModal}></NavModal>


              <h2 onClick={() => this.setState({ showBreakPrefs: !this.state.showBreakPrefs })} className="white accordion">Breaks</h2>
              <div className="panel" className={this.state.showBreakPrefs ? 'display-block' : 'display-none'}>
            <h3 className="white">Cycle : Break Duration</h3>

                {this.context.prefs && <>
                  <ul className="breakprefs-list">

                    <li className="pref-li">89 : <input type="integer" onChange={this.changePreferenceValue} defaultValue={this.context.prefs['89']} name="89" className="edit-break"></input></li>
                    <li className="pref-li">55 : <input type="integer" onChange={this.changePreferenceValue} defaultValue={this.context.prefs['55']} name="55" className="edit-break" ></input></li>
                    <li className="pref-li">34 : <input type="integer" onChange={this.changePreferenceValue} defaultValue={this.context.prefs['34']} name="34" className="edit-break" ></input></li>
                    <li className="pref-li">21 : <input type="integer" onChange={this.changePreferenceValue} defaultValue={this.context.prefs['21']} name="21" className="edit-break" ></input></li>
                    <li className="pref-li">13 : <input type="integer" onChange={this.changePreferenceValue} defaultValue={this.context.prefs['13']} name="13" className="edit-break" ></input></li>
                    <li className="pref-li"> 08 : <input type="integer" onChange={this.changePreferenceValue} defaultValue={this.context.prefs['8']} name="8" className="edit-break" ></input></li>
                    <li className="pref-li"> 05 : <input type="integer" onChange={this.changePreferenceValue} defaultValue={this.context.prefs['5']} name="5" className="edit-break" ></input></li>
                    <li className="pref-li"> 03 : <input type="integer" onChange={this.changePreferenceValue} defaultValue={this.context.prefs['3']} name="3" className="edit-break" ></input></li>
                    <li className="pref-li"> 02 : <input type="integer" onChange={this.changePreferenceValue} defaultValue={this.context.prefs['2']} name="2" className="edit-break" ></input></li>
                  </ul>




                  <button onClick={this.updateBreakPrefs} className="save-break-prefs-button" >SAVE</button>


                </>
                }
              </div>


              <h2 onClick={() => this.setState({ showPrefs: !this.state.showPrefs })} className="white accordion">Theme</h2>
              <div className="panel" className={this.state.showPrefs ? 'display-block' : 'display-none'}>

              <h3 className="prefs-label">Break Sound</h3>
              <select>
                <option>Bird Tweet</option>

              </select>
              <h3 className="prefs-label">Resume Sound</h3>
              <select>
                <option>Dog Bark</option>
              </select>

              <h3 className="prefs-label">Away Sound</h3>
              <select>
                <option>Crickets</option>
              </select>

              </div>

              <h2 className="white accordion" onClick={() => this.props.toggleHelpModal()}>Help</h2>


            </div>



          </div>
          <div id="main">
            <button className="openbtn" onClick={this.ToggleSidebar} >{``}</button>

          </div>
        </>

        }


      </>
    )
  }

}

export default Sidebar;