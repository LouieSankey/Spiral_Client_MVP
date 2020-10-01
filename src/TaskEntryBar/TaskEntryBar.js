import React, { Component } from 'react'
import './TaskEntryBar.css'
import folderIcon from '../img/folder_icon.png'
import Timer from './Timer/Timer'

export default class TaskEntryBar extends Component {
    static defaultProps = {}

    render() {
        return ( 
            <div className="taskbar">
                <Timer cycleTimeSelected={this.props.cycleTimeSelected} pauseForModal={this.props.pauseForModal}></Timer>
                <input className="taskInput" type="text" placeholder="what are you working on?" name="taskInput"></input>
                <div className="floatLeft"><img id="folder" src={folderIcon} onClick={this.props.showProjectsModal} width="30px" height="30px" alt=""></img></div>
            </div>
        )}
}