import React, { Component } from 'react'
import './TaskEntryBar.css'
import { PausePresentation, SkipNext, Stop } from '@material-ui/icons';
import folderIcon from '../img/folder_icon.png'
import ReactDOM from "react-dom";

const Projects = ({ handleClose, show, children, showAdd}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      <button className="modal-close-button" onClick={handleClose}>x</button>
        {children}
        <button onClick={(event) => {
      handleClose(); showAdd();
   }} className="add-project-button">Create Project</button>
      </section>
    </div>
  );
};



  const AddNew = ({ handleClose, show, children}) => {
    const showHideClassName = show ? "add-project-modal display-block" : "add-project-modal display-none";
    
    return (
      <div className={showHideClassName}>
        <section className="add-project-modal-main">
        <button className="modal-close-button" onClick={handleClose}>x</button>
          {children}
          <button onClick={handleClose} className="save-project-button">CREATE</button>
        </section>
      </div>
    );
  };


export default class TaskEntryBar extends Component {
    static defaultProps = {}
    state = { 
      showProjects: false,
      showAdd: false
     };


    showProjects = () => {
        this.setState({ showProjects: true });
        console.log('Click');
      };
    
      hideProjects = () => {
        this.setState({ showProjects: false });
      };



      showAdd = () => {
        this.setState({ showAdd: true });
        console.log('Click');
      };
    
      hideAdd = () => {
        this.setState({ showAdd: false });
      };

    render() {
        return ( 
            <>
            <div className="taskbar">
                <div className="floatLeft"><i className="material-icons bottom-toolbar stop"><Stop/></i></div>
                <div className="floatLeft"><i className="material-icons bottom-toolbar skip_next"><SkipNext/></i></div>
                <div className="floatLeft"><i className="material-icons pause"><PausePresentation/></i></div>
                <div className="floatLeft"><div id="timer">Remaining: 00:00</div></div>
                <input className="taskInput" type="text" placeholder="what are you working on?" name="taskInput"></input>
                <div className="floatLeft"><img id="folder" src={folderIcon} onClick={this.showProjects} width="30px" height="30px" alt=""></img></div>
            </div>
            <Projects show={this.state.showProjects} handleClose={this.hideProjects} showAdd={this.showAdd}>
                <div className="modal-content">
                    <h2>Current Project: No Project</h2>
                    <ul className="projects-list">
                    <li>Example Project</li>
                    </ul>
                  
                </div>
            </Projects>

            <AddNew show={this.state.showAdd} handleClose={this.hideAdd}>
                <div className="project-modal-content">
                    <h2 className="create-project-header">Create Project</h2>
                    <input  type="text" className="create-project-input"></input>

                </div>
            </AddNew>
            </>
        )}
}