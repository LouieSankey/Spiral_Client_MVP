import React, { Component } from "react";
import CanvasJSReact from "../../canvasjs.react";
import ApiContext from '../../ApiContext'
import { render } from "react-dom";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var CanvasJS = CanvasJSReact.CanvasJS;

CanvasJS.addColorSet("colorset1",
	"#1500ff",
	"#0700cc",
	"#050090",
	"#03004b"
       
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
				dataPoints: this.props.data


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