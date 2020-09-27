import React, { Component } from 'react';
import BarChart from './Chart'
import Grid from './Grid/Grid'
import './Tracking.css'


export default class Tracking extends Component {
  
    render() {
        return (
            <>
            <div className="tracking-container">
                <BarChart></BarChart>
                <Grid></Grid>
            </div>
            </>
        )
    }
}
