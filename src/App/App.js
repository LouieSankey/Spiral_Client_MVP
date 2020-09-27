import React, { Component } from 'react';

import Home from '../Home/Home'
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
    Toggle = () => {
        this.setState({toggle:!this.state.toggle})
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
        return (
         <Router>
              <div className="navBar">
                  <button class="nav-button" onClick={this.Toggle}>
                      <FaAlignRight />
                  </button>
                  <li className="splash"> <Link to="/splash">Spiral</Link></li>
                  <ul className={this.state.toggle ? "nav-links show-nav" : "nav-links"}>
                    
                      <li> <Link to="/">Timer</Link></li>
                      <li> <Link to="/tracking">Tracking</Link></li>
                  </ul>
              </div>
              {this.renderMainRoutes()}
      </Router>

    )}


}

