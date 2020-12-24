import React, { Component } from "react";
import CanvasJSReact from "../../canvasjs.react";
import ApiContext from '../../ApiContext'
import { render } from "react-dom";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var CanvasJS = CanvasJSReact.CanvasJS;

CanvasJS.addColorSet("colorset1",
    [//colorSet Array
        "#1500ff",
        "#0700cc",
        "#050090",
        "#03004b"
       
   ]);


class PieChart extends Component {

	/** @param {Record<string, any>} props */
	constructor(props) {
		super(props);
		// this.sortData = this.sortdata.bind(this);
	}

	static contextType = ApiContext;

	state = {
		options: {}
	}



	// componentDidUpdate(prevProps, prevState) {
	// 	if(prevProps.data !== this.props.data){

	// 		this.setState({
				
	// 		})
	
	// 	  this.chart.render()
		
	// 	}

	//   }






	render() {

		const onSelect = (event) => {
			var dataSeries = event.dataSeries;  
			var dataPointIndex = event.dataPointIndex;
		
			for(var i = 0; i < dataSeries.dataPoints.length; i++){
			  if(i === dataPointIndex){

				if( !dataSeries.dataPoints[i].exploded  == false){
					dataSeries.dataPoints[i].exploded = true; 
				}else{
					dataSeries.dataPoints[i].exploded = false; 
				}
				   
				// dataSeries.dataPoints[i].exploadOnClick = true; 
		
			  }else        
				dataSeries.dataPoints[i].exploded = false;            
			}

				 this.props.onSliceSelected(event)
		}

		const options =  {
			colorSet: "colorset1",
			 backgroundColor: "black",
			 // exportEnabled: true,
			 animationEnabled: true,
			 fontColor: "white",
			 
		 
			 toolTip:{
				 enabled: false },
			
			 title: {
				 text: "",
				 fontSize: 22,
				 padding:20,
				 fontColor: 'white'
			  
			 },
			 data: [{
				 type: "pie",
				 click: onSelect,
				 // animationEnabled: true,
				 startAngle: 75,
				 // toolTipContent: "Select: <b>{label}</b> - {y}% of Total",
				 toolTipContent: "",
				 showInLegend: false,
				 legendText: "{label}",
				 indexLabelFontSize: 16,
				 indexLabelFontColor: "white",
				 indexLabel: "{label}",
				 // explodeOnClick: true,
				 // click: this.props.onSliceSelected,
				 dataPoints: this.props.data
				 // click: console.log(this.props),
				 
	
			 }]
			}

		return (
			
		<div>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref} 
			/>
		</div>
			
		);
	}
}

// class PieChart extends Component {

// 	 	static contextType = ApiContext;
// 	constructor(props) {
// 	  super(props);
// 	  this.chart = null;
// 	}
// 	updateLabel = e => {
// 		for (var i = 0; i < e.dataSeries.dataPoints.length; i++) {
// 			e.dataSeries.dataPoints[i].exploded = false;
// 		  }
// 		  e.dataPoint.exploded = true;
// 	//   this.chart.options.data[e.dataSeriesIndex].dataPoints[
// 	// 	e.dataPointIndex
// 	//   ].label = "New Label";
// 	this.context.onSliceSelected(e)
// 	  this.chart.render();
// 	};
// 	render() {
// 	  const options = {
// 		  title: {
// 			text: "Pie Chart in React"
// 		  },
// 		  data: [
// 			{
// 			  type: "pie",
// 			  click: this.updateLabel,
// 			  dataPoints: [
// 				{ label: "apple", y: 10 },
				
// 				{ label: "orange", y: 15 },
// 				{ label: "banana", y: 25 },
// 				{ label: "mango", y: 30 },
// 				{ label: "grape", y: 28 }
// 			  ]
// 			}
// 		  ]
// 		},
// 		//Styling Chart Container
// 		containerProps = {
// 		  width: "100%",
// 		  height: "300px"
// 		};
  
// 	  return (
// 		<div>
// 		  <CanvasJSChart
// 			options={options}
// 			onRef={ref => (this.chart = ref)} //Reference to the chart-instance
// 			containerProps={containerProps}
// 		  />
// 		</div>
// 	  );
// 	}
//   }

export default PieChart;                      