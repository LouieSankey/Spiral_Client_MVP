import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import React, { Component } from 'react';
import './Grid.css'

import 'react-dropdown/style.css'; 

class Grid extends Component {

    state = {

        data: this.props.data, 
        columnDefs: [
            {headerName: "Task", field: "task"},
            {headerName: "Cycle", field: "cycle"},
            {headerName: "Date", field: "date"},
            {headerName: "Start/End", field: "time"},
        ],
        rowData: [
            {task: "Task 2", cycle: "34 min", date: '07/23/2020', time: "7:51 PM - 8:34 PM"},
        ],
    }


    render() {
        
        return (
            <>

            <div
                className="ag-theme-balham"
                style={{ height: '200px', width: '100%' }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.data}>
                </AgGridReact>
            </div>
          
            </>
        );
    }
}
export default Grid;