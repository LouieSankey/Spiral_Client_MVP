import React, { Component } from 'react'
import './TaskEntryBar.css'
import { PausePresentation, SkipNext, Stop } from '@material-ui/icons';
import folderIcon from '../img/folder_icon.png'

export default class TaskEntryBar extends Component {
    static defaultProps = {}

    render() {
        // const { } = this.props
        return ( 
            <div className="taskbar">
                <div className="floatLeft"><i className="material-icons bottom-toolbar stop"><Stop/></i></div>
                <div className="floatLeft"><i className="material-icons bottom-toolbar skip_next"><SkipNext/></i></div>
                <div className="floatLeft"><i className="material-icons pause"><PausePresentation/></i></div>
                <div className="floatLeft"><div id="timer">Remaining: 00:00</div></div>
                <input className="taskInput" type="text" placeholder="what are you working on?" name="taskInput"></input>
                <div className="floatLeft"><img id="folder" src={folderIcon} width="30px" height="30px" alt=""></img></div>
            </div>
        )}
}