import React, { Component } from "react";
import Chart from "react-apexcharts";


class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        name: 'Focus Time',
        data:   [{x: "Monday", y: 76},{x: "Tuesday", y: 0}, {x: "Wednesday", y: 21},{x: "Thursday", y: 55}, 
        {x: "Friday", y: 55},{x: "Saturaday", y: 5}  ],
      }],
        chart: {
        type: 'bar',
        //line, area, bar, radar, histogram, pie, donut, radialBar, scatter, bubble, heatmap, candlestick
        height: 350,
        animations: {
          enabled: true
        },
        zoom: {
          enabled: false
        },
      },
      
      
      options: {
      dataLabels: {
        enabled: true
        //position: 'top', // top, center, bottom
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.8,
        type: 'solid',
        pattern: {
          style: ['verticalLines', 'horizontalLines'],
          width: 5,
          height: 6
        },
      },
      markers: {
        size: 5,
        hover: {
          size: 9
        }
      },
      title: {
        text: '',
      },
      tooltip: {
        intersect: true,
        shared: false
      },
      theme: {
        palette: 'palette1'
      },
      xaxis: {
        // type: 'datetime',
        labels: {
          rotate: -45
        },
        tickPlacement: 'on'
      },
      yaxis: {
        title: {
          text: 'Focus Time (in minutes)'
        }
      }
    }
  }
   };


  render() {
    return (
      <div className="app">
        <h1>Tracking</h1>
        <h2>Project Name - This Week: 2 Hours and 21 Minutes</h2>
        <div className="row-">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="100%"
              height="300px"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BarChart;