import React, { Component } from 'react';
import './sidebar.css'

class Sidebar extends Component {

    state = {
        isSidebarVisible:false
      };

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
ToggleSidebar = () => {
    this.setState(prevState => ({
        isSidebarVisible: !prevState.isSidebarVisible
      }));
  }

  CloseSidebar = () =>{
  
    document.body.classList.add('body-margin-left-none')
    document.body.classList.remove('body-margin-left')
    document.body.classList.add('body-margin-left-none')
    document.body.classList.remove('body-margin-left')

  }

    render(){
{this.state.isSidebarVisible ? document.body.classList.add('body-margin-left') : this.CloseSidebar()}
        
      return(
        <>
            <div id="mySidebar" className={`sidebar ${this.state.isSidebarVisible ? "sidebar-visible" : ""}`}>
            <a href="javascript:void(0)" class="closebtn" onClick="closeNav()">&times;</a>
            <a href="#">View Tracking</a>
          
            </div>

            <div id="main">
            <button className="openbtn" onClick={this.ToggleSidebar} >{``}</button>

            </div>
  
        </>
      )
    }
  
  }

  export default Sidebar;