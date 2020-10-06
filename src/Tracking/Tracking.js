import React, { Component } from 'react';
import BarChart from './Chart/Chart'
import Grid from './Grid/Grid'
import './Tracking.css'
import Dropdown from 'react-dropdown';
import ApiContext from '../ApiContext'

export default class Tracking extends Component {

    static contextType = ApiContext;

   componentDidMount(){
       //fetch call here to get the users tracking data
   }

render() {

    console.log("yours " +  JSON.stringify(this.context.project))

        return (
            <>
            <div className="tracking-container">
                <BarChart ></BarChart>
                <Dropdown className='dropdown' options={['one', 'two', 'three']} onChange={this._onSelect} value={"Project"} placeholder="Select an option" />
                <Dropdown className='dropdown' options={['Today', 'This Week', 'This Month']} onChange={this._onSelect} value={"Time Period"} placeholder="Select an option" />
                <Grid></Grid>
            </div>
            </>
        )
    }
}
