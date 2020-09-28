import TaskEntryBar from '../TaskEntryBar/TaskEntryBar'
import MainRectangle from '../MainRectangle/MainRectangle'
import React, { Component } from 'react';
import './Home.css'

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "break-modal display-block" : "break-modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-break-main">
        <button className="modal-close-button" onClick={handleClose}>x</button>
          {children}
         
        </section>
      </div>
    );
  };


export default class Home extends Component {

    state = { show: false };

    showModal = () => {
        this.setState({ show: true });
        console.log('Click');
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };
  
  
    render() {
        return (
            <>
                <h1 className="center-text">Spiral</h1>
                <h2 className="center-text">Estimate the duration of a task or subtask you're working on (in minutes), then be rewarded with <span className="break-clickable" onClick={this.showModal}>a break.</span></h2>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <div className="modal-content">
                    <h2 className="break-modal-header">Break Preferences</h2>
                            <h3 className="prefs-label">Cycle: Break Time</h3>
                            <ul className="projects-list">
                        <li className="pref-li">89 min: <input type="integer" value="13" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li">55 min: <input type="integer" value="8" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li">34 min: <input type="integer" value="5" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li">21 min: <input type="integer" value="3" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li">13 min: <input type="integer" value="0" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li"> 08 min: <input type="integer" value="0" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li"> 05 min: <input type="integer" value="0" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li"> 03 min: <input type="integer" value="0" className="edit-break" name="edit-break"></input>min</li>
                        </ul>
                      
                            <h3 className="prefs-label">Break Sound</h3>
                            <select>
                                    <option>Bird Tweet</option>
                                    <option>Bell</option>
                                </select>
                                <h3 className="prefs-label">Resume Sound</h3>
                                <select>
                                    <option>Dog Bark</option>
                                    <option>Whistle</option>
                                </select>
                            <h3 class="gong-checkbox">Opening Gong <input type="checkbox" checked="checked"></input></h3>
                            <button className="save-break-prefs-button">SAVE</button>                 
                    </div>
                </Modal>
                <TaskEntryBar></TaskEntryBar>
                <MainRectangle></MainRectangle>
            </>
        )
    }
}

