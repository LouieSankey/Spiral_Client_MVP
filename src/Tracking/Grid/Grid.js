import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import React, { Component } from 'react';
import './Grid.css'
import 'react-dropdown/style.css'; 
import ApiContext from '../../ApiContext'
// import config from '../config'

class Grid extends Component {

        static contextType = ApiContext;


    state = {

        // sortedTasks: this.context.sortedTasks, 
        columnDefs: [
            {headerName: "Task", field: "task"},
            {headerName: "Cycle", field: "cycle"},
            {headerName: "Date", field: "date"},
            {headerName: "Start", field: "time"},
            // {headerName: "Start/End", field: "time"},
        ],
        rowData: [
            {task: "Task 2", cycle: "34 min", date: '07/23/2020'},
        ],
    }

    // parseTasks = (tasks) => {
    //     tasks.map(task => {
    //         task.date_published
    //     })


    // }


    render() {

        
        return (
            <>

            <div
                className="ag-theme-balham"
                style={{ height: '220px', width: '100%' }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.context.tasks}>
                </AgGridReact>
            </div>
          
            </>
        );
    }
}
export default Grid;