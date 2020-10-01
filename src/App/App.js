import React, { Component } from 'react';

import ModalPresenter from '../ModalPresenter/ModalPresenter'
import Tracking from '../Tracking/Tracking'
import Splash from '../Splash/Splash'
import './App.css'
import { FaAlignRight } from 'react-icons/fa';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



export default class App extends Component {
  
  static defaultProps = {}
    state = {
        toggle:false
   
    }



    ToggleMobileNav = () => {
        this.setState({toggle:!this.state.toggle})
    }


    renderMainRoutes() {
      return (  
        <> 
          <Route
            exact
            path='/'
            component={() => <ModalPresenter/>}
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
        return (
         <Router>
              <div className="navBar">
                  <button className="nav-button" onClick={this.ToggleMobileNav}>
                      <FaAlignRight />
                  </button>
                  <li className="splash"> <Link to="/splash">Spiral</Link></li>
                  <ul className={this.state.toggle ? "nav-links show-nav" : "nav-links"}>
                    
                      <li> <Link to="/">Timer</Link></li>
                      <li> <Link to="/tracking">Tracking</Link></li>
                      <li> <Link to="/logout">Log Out</Link></li>
                  </ul>
              </div>
              {this.renderMainRoutes()}
      </Router>

    )}


}

