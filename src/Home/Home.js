import TaskEntryBar from '../TaskEntryBar/TaskEntryBar'
import MainRectangle from '../MainRectangle/MainRectangle'
import React, { Component } from 'react';


export default class Home extends Component {
  
    render() {
        return (
            <>
                <h1 className="center-text">Spiral</h1>
                <h2 className="center-text">Estimate the duration of a task or subtask you're working on (in minutes), then be rewarded with a break.</h2>
                <TaskEntryBar></TaskEntryBar>
                <MainRectangle></MainRectangle>
            </>
        )
    }
}

