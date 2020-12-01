import React, { Component } from "react";
import Chart from "react-apexcharts";
import ApiContext from '../../ApiContext'
import moment from 'moment'
import './Chart.css'


class BarChart extends Component {

  static contextType = ApiContext;

  constructor(props) {
    super(props);

    let today = moment().format("ddd, MMM Do")
    let todayLess1 = moment().subtract(1, 'days').format("ddd, MMM Do")
    let todayLess2 = moment().subtract(2, 'days').format("ddd, MMM Do")
    let todayLess3 = moment().subtract(3, 'days').format("ddd, MMM Do")
    let todayLess4 = moment().subtract(4, 'days').format("ddd, MMM Do")
    let todayLess5 = moment().subtract(5, 'days').format("ddd, MMM Do")
    let todayLess6 = moment().subtract(6, 'days').format("ddd, MMM Do")
    let days = [todayLess6, todayLess5, todayLess4, todayLess3, todayLess2, todayLess1, today]
    

    this.state = {

      days: days,

      chart: {
        type: 'bar',
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
          offsetY: 10,
          style: {
            fontSize: '12px',
          },
        //   formatter: function (value, opts) {
        //     const minutes = (value % 60 === 0) ? "" : value % 60 + ""
        //     return (Math.floor(value/60) > 0) ? "0" +Math.floor(value / 60) + ":" + minutes :  minutes
        // },
          enabled: true,
         
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
          labels: {
            rotate: -45,
            style: {
              colors: "#ffffff"
          }
          },
          tickPlacement: 'on'
        },
        yaxis: {
        tickAmount: 5,
        max: 60 * 5, 
          // max: (max) => { return (Math.floor(max / 60) * 60) + 30},
          // forceNiceScale: true,
          labels: {
            tickAmount: 4,
            style: {
              colors: "#ffffff"
          },

          formatter: (value) => { 
            const minutes = (value % 60 === 0) ? "" : value % 60 + "m"
            return (Math.floor(value/60) > 0) ? Math.floor(value / 60) + "h " + minutes : minutes
            }
          },
          title: {
            style: {
              color: "#ffffff"
          },
            text: 'Time in Minutes'
          },

        }
      }

    }
  }



  getSeries = (tasks) => {

    let week = {}
    this.state.days.forEach(day => {
      week[day] = 0
    });

    let totalTime = 0

    if(tasks){
    tasks.forEach(task => {
      if (task.day in week) {
        week[task.day] += task.cycle
        totalTime += task.cycle
      }
    })
  }

    var hours = Math.floor(totalTime / 60);
    var minutes = totalTime % 60;
    let headline = "This Week: " + hours + " hours and " + minutes + " Minutes"
    let data = []
    for (var key in week) {

      let formattedDate;
      if((moment().format('dddd') ===  moment(key, "ddd, MMM Do").format('dddd'))){
        formattedDate = "Today"
      }else if((moment().subtract('days', 1).format('dddd') ===  moment(key, "ddd, MMM Do").format('dddd'))){
      formattedDate = "Yesterday"
    }else{
      formattedDate = moment(key, "ddd, MMM Do").format('dddd')
    }
       
      
      
      

      data.push({ x: formattedDate, y: week[key] })
    }

    let timeData = {
 
      displayTime: headline,
      series: [{
        name: 'Time',
        data: data
      }]

    }
    return timeData
  }

  

  render() {

    let timeData = this.getSeries(this.context.tasks)
    return (
      <div className="app">
        <h2 className="tracking-header">All Tasks</h2>
        <h2 className="tracking-subheader">{timeData.displayTime}</h2>
        <div className="row-">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={timeData.series}
              type="bar"
              width="98%"
              height="320px"
            />

          </div>
        </div>
      </div>
    );
  }
}

export default BarChart;