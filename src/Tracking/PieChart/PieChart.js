import React, { Component } from "react";
import CanvasJSReact from "../../canvasjs.react";
import ApiContext from '../../ApiContext'
import { render } from "react-dom";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var CanvasJS = CanvasJSReact.CanvasJS;

CanvasJS.addColorSet("colorset1",

[


	'#B6B8BA',
	'#a3abba',
	'#91A1BA',
	'#7e95b8',
	'#6b8bba',
	'#587eba',
	'#4673b9',
	'#3368ba',
	'#225db9',

	'#1352b9',
	


	

	




   ]);


class PieChart extends Component {

	/** @param {Record<string, any>} props */
	constructor(props) {
		super(props);
	}

	static contextType = ApiContext;

	state = {
		options: {}
	}


	render() {
		console.log("data " + JSON.stringify(this.props.data))

		const onSelect = (event) => {
			var dataSeries = event.dataSeries;
			var dataPointIndex = event.dataPointIndex;

			for (var i = 0; i < dataSeries.dataPoints.length; i++) {
				if (i === dataPointIndex) {

					if (!dataSeries.dataPoints[i].exploded == false) {
						dataSeries.dataPoints[i].exploded = true;
					} else {
						dataSeries.dataPoints[i].exploded = false;
					}

				} else
					dataSeries.dataPoints[i].exploded = false;
			}

			this.props.onSliceSelected(event)
		}

		const options = {
			colorSet: "colorset1",
			backgroundColor: "black",
			animationEnabled: true,
			fontColor: "white",


			toolTip: {
				enabled: false
			},

			title: {
				text: "",
				fontSize: 22,
				padding: 20,
				fontColor: 'white'

			},
			data: [{
				type: "pie",
				click: onSelect,
				startAngle: 75,
				toolTipContent: "",
				showInLegend: false,
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabelFontColor: "white",
				indexLabel: "{label}",
				dataPoints: this.props.data.sort(function(a,b) {
					return a.y - b.y; })


			}]
		}

		return (

			<div>
				<CanvasJSChart options={options}
					onRef={ref => this.chart = ref}
				/>
			</div>

		);
	}
}


export default PieChart;                      