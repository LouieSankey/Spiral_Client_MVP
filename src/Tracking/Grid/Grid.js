import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import React, { Component } from 'react';
import './Grid.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Delete from './delete.png';




class Grid extends Component {
    state = {
        columnDefs: [
            {headerName: "Task", field: "task"},
            {headerName: "Cycle", field: "cycle"},
            {headerName: "Date", field: "date"},
            {headerName: "Start/End", field: "start"},
            

        ],
        rowData: [
            {task: "Task 1", cycle: "55 min", date: '07/23/2020', start: "7:51 PM - 8:34 PM"},
            {task: "Task 2", cycle: "34 min", date: '07/23/2020', start: "7:51 PM - 8:34 PM"},
            {task: "Task 3", cycle: "21 min", date: '07/23/2020', start:  "7:51 PM - 8:34 PM"}
        ], 
    }

    render() {
        return (
            <>

            <Dropdown className='dropdown' options={['one', 'two', 'three']} onChange={this._onSelect} value={"Project"} placeholder="Select an option" />
            <Dropdown className='dropdown' options={['Today', 'This Week', 'This Month']} onChange={this._onSelect} value={"Time Period"} placeholder="Select an option" />

            <div
                className="ag-theme-balham"
                style={{ height: '200px', width: '100%' }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
             
            </div>
          
            </>
        );
    }
}
export default Grid;