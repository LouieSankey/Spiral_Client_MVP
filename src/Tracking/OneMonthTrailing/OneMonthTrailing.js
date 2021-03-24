import React, { Component } from "react";
import Chart from "react-apexcharts";
import MainContext from '../../MainContext'
import moment from 'moment'
import './OneMonthTrailing.css'
import { FormatTrackingHeader } from '../helper'


class OneMonthTrailing extends Component {

    static contextType = MainContext;

    constructor(props) {
        super(props);


        let days = []

        for (let i = 0; i < 30; i++) {
            let date = moment().subtract(i, 'days').format("ddd, MMM Do")
            days.push(date)

        }

        days.reverse()

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
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: false,
                            position: 'top', // top, center, bottom
                        },
                    }
                },
                dataLabels: {

                    offsetY: -20,
                    position: 'top', // top, center, bottom

                    formatter: (value) => {
                        //  return value + "m"
                        const minutes = (value % 60 === 0) ? "" : value % 60 + "m"
                        return (Math.floor(value / 60) > 0) ? Math.floor(value / 60) + "h " + minutes : minutes
                    },
                    style: {
                        fontSize: '12px',
                    },

                    enabled: true,

                },
                stroke: {
                    curve: 'straight'
                },
                fill: {
                    opacity: 0.8,
                    type: 'solid',
                    colors: '#3368ba',

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
                            return (Math.floor(value / 60) > 0) ? Math.floor(value / 60) + "h " + minutes : minutes
                        }
                    },
                    title: {
                        style: {
                            color: "#ffffff"
                        },
                        text: ''
                    },

                }
            }

        }
    }



    getSeries = (tasks) => {

        let month = {}
        this.state.days.forEach(day => {
            month[day] = 0
        });

        let totalTime = 0

        if (tasks) {
            tasks.forEach(task => {
                if (task.day in month) {
                    month[task.day] += task.cycle
                    totalTime += task.cycle
                }
            })
        }


        let data = []
        for (var key in month) {
            data.push({ x: key, y: month[key] })
        }

        let timeData = {
            displayTime: FormatTrackingHeader(totalTime),
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

                <div className="row-">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={timeData.series}
                            type="bar"
                            width="98%"
                            height="380px"
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default OneMonthTrailing;