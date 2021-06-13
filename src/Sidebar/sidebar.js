import React, { Component } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import NavModal from "../Main/Modals/NavModal";

import MainContext from "../MainContext";
import HelpModal from "../Main/Modals/HelpModal";

class Sidebar extends Component {
  state = {
    isSidebarVisible: false,
    showNav: false,
    showBreakPrefs: false,
    showPrefs: false,
    showNavModal: false,
    showHelp: false,
    elapsedTimeUntilBreak: 90,
    breakDuration: 20,
    idleReset: 5
  };

  constructor(props) {
    super(props);

    this.homeLinkRef = React.createRef();
    this.insightsLinkRef = React.createRef();
    this.logoutLinkRef = React.createRef();  
  }

  static contextType = MainContext;

  updateBreakPrefs = () => {
    const newPrefs = {
      elapsed_time_until_break: this.state.elapsedTimeUntilBreak,
      break_duration: this.state.breakDuration,
      idle_reset: this.state.idleReset
    }
    this.context.changeBreakPrefs(newPrefs);
  };

  changeElapsedUntilBreakValue = (event) => {
    this.context.setTimeUntilBreakFromDB(Number(event.target.value));
    this.setState({
      elapsedTimeUntilBreak: Number(event.target.value),
    });
  };

  changeBreakDuration = (event) => {
    this.setState(({
      breakDuration:  Number(event.target.value)
  }))
  };

  changeBreakIdleReset = (event) => {
    this.setState(({
      idleReset:  Number(event.target.value)
  }))
  };

  updateGongValue = (event) => {
    if (event.target.checked) {
      this.newPrefs["gong"] = false;
    } else {
      this.newPrefs["gong"] = true;
    }
  };

  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  ToggleSidebar = () => {
    this.setState((prevState) => ({
      isSidebarVisible: !prevState.isSidebarVisible,
    }));
  };

  CloseSidebar = () => {
    document.body.classList.add("body-margin-left-none");
    document.body.classList.remove("body-margin-left");
  };

  navAccordianClose = () => {
    this.setState({ showNavModal: false });
  };

  allowNavigateToInsights = () => {
    if (
      this.context.timerRef.current?.innerText === "00:00" ||
      this.context.timerRef.current?.innerText === undefined
    ) {
      this.insightsLinkRef.current.click();
    } else {
      this.setState({ showNavModal: true });
    }
  };

  allowNavigateToLogout = () => {
    if (
      this.context.timerRef.current?.innerText === "00:00" ||
      this.context.timerRef.current?.innerText === undefined
    ) {
      this.logoutLinkRef.current.click();
    } else {
      this.setState({ showNavModal: true });
    }
  };

  allowNavigateToTimer = () => {
    if (
      this.context.timerRef.current?.innerText === "00:00" ||
      this.context.timerRef.current?.innerText === undefined
    ) {
      this.homeLinkRef.current.click();
    }
  };

  showHelp = () => {
    this.setState({
      showHelp: true,
    });
  };

  hideHelp = () => {
    this.setState({
      showHelp: false,
    });
  };

  ToggleHelp = () => {
    this.setState({ showHelp: !this.state.showHelp });
  };

 

  render() {
    this.state.isSidebarVisible
      ? document.body.classList.add("body-margin-left")
      : this.CloseSidebar();
    const isLandingPage =
      window.location.pathname === "/Spiral" ||
      window.location.pathname === "/spiral";

    return (
      <>
        {isLandingPage ? null : (
          <>
            <div
              id="mySidebar"
              className={`sidebar ${
                this.state.isSidebarVisible ? "sidebar-visible" : ""
              }`}
            >
              <a className="closebtn" onClick={this.ToggleSidebar}>
                &times;
              </a>

              <div className="sidebar-content">
                <img
                  className="spiral-text-logo-small"
                  src={require("../Img/spiral-text-logo.png").default}
                  alt=""
                />

                <h2
                  onClick={() =>
                    this.setState({ showNav: !this.state.showNav })
                  }
                  className="white accordion"
                >
                  Menu
                </h2>
                <div
                  className="panel "
                  className={
                    this.state.showNav ? "display-block" : "display-none"
                  }
                >
                  <ul
                    className={
                      this.state.showNav ? "display-block" : "display-none"
                    }
                  >
                    <li
                      className="nav-link"
                      onClick={() => this.allowNavigateToTimer()}
                    >
                      {" "}
                      <Link ref={this.homeLinkRef} to="/"></Link>Timer
                    </li>
                    <li
                      className="nav-link"
                      onClick={() => this.allowNavigateToInsights()}
                    >
                      {" "}
                      <Link ref={this.insightsLinkRef} to="/tracking"></Link>
                      Insights
                    </li>
                    <li
                      className="nav-link"
                      onClick={() => this.allowNavigateToLogout()}
                    >
                      {" "}
                      <Link
                        ref={this.logoutLinkRef}
                        onClick={() => {
                          this.props.logout();
                          this.ToggleSidebar();
                        }}
                        to="/spiral"
                      ></Link>
                      Logout
                    </li>
                  </ul>
                </div>
                <NavModal
                  handleClose={this.navAccordianClose}
                  show={this.state.showNavModal}
                ></NavModal>

                <h2
                  onClick={() =>
                    this.setState({
                      showBreakPrefs: !this.state.showBreakPrefs,
                    })
                  }
                  className="white accordion"
                >
                  Breaks
                </h2>
                <div
                  className="panel "
                  className={
                    this.state.showBreakPrefs ? "display-block" : "display-none"
                  }
                >
                  <h4 className="grey">Suggest Break After:</h4>

                  {/* break interval needs to be called from here to persist local change */}
                  {this.context.prefs && (
                    <>
                  <select
                    onChange={this.changeElapsedUntilBreakValue}
                    defaultValue={this.context.prefs["elapsed_time_until_break"]}
                    name="elapsed_time_until_break"
                    id="break-durations"
                  >
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

                
                      {/* this corresponds to break interval for now */}
                      <input
                        type="integer"
                        onChange={this.changeBreakDuration}
                        defaultValue={this.context.prefs["break_duration"]}
                        name="break_duration"
                        className="edit-break"
                      ></input>

                      <h4 className="grey">Idle Time Before Break Reset:</h4>

                      {/* this corresponds to idle reset */}
                      <input
                        type="integer"
                        onChange={this.changeBreakIdleReset}
                        defaultValue={this.context.prefs["idle_reset"]}
                        name="idle_reset"
                        className="edit-break"
                      ></input>
                      <br />
                      <br />

                      <button
                        onClick={this.updateBreakPrefs}
                        className="save-break-prefs-button"
                      >
                        SAVE
                      </button>
                    </>
                  )}
                </div>

                <h2
                  onClick={() =>
                    this.setState({ showPrefs: !this.state.showPrefs })
                  }
                  className="white accordion"
                >
                  Theme
                </h2>
                <div
                  className="panel "
                  className={
                    this.state.showPrefs ? "display-block" : "display-none"
                  }
                >
                  <h3 className="grey">Break Sound</h3>
                  <select>
                    <option>Gong</option>
                  </select>
                  <h3 className="grey">Resume Sound</h3>
                  <select>
                    <option>Gong</option>
                  </select>

                  <h3 className="grey">Idle Sound</h3>
                  <select>
                    <option>Crickets</option>
                  </select>
                </div>

                <h2
                  className="white accordion"
                  onClick={() => this.ToggleHelp()}
                >
                  Help
                </h2>
              </div>
            </div>
            <div id="main">
              <button
                className="openbtn"
                onClick={this.ToggleSidebar}
              >{``}</button>
            </div>
          </>
        )}
        <HelpModal
          showHelp={this.state.showHelp}
          handleClose={this.hideHelp}
        ></HelpModal>
      </>
    );
  }
}

export default Sidebar;
