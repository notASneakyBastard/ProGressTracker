import React from 'react';
import Chart from 'chart.js';
import { arrayExpression } from '@babel/types';

// some of this code is a variation on https://jsfiddle.net/cmyker/u6rr5moq/
var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);
    
    var chart = this.chart.chart;
    var ctx = chart.ctx;
    var width = chart.width;
    var height = chart.height;

    var fontSize = (height / 114).toFixed(2);
    ctx.font = fontSize + "em Verdana";
    ctx.textBaseline = "middle";

    var text = chart.config.data.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2 + height * 0.07;

    ctx.fillText(text, textX, textY);
  }
});

export default class DoughnutChart extends React.Component {
	constructor(props) {
		super(props);

		this.canvasRef = React.createRef();
	}

	componentDidUpdate() {
		this.myChart.data.labels = this.props.data.map(d => d.label);
		this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
		this.myChart.data.text = this.props.data.map(d => d.value).reduce((a, b) => a + b, 0);
		this.myChart.update();
	}

	componentDidMount() {
		console.log(this.props)
		
		this.myChart = new Chart(this.canvasRef.current, {
			type: 'doughnut',
			options: {
				maintainAspectRatio: false,
				cutoutPercentage: 75,
				title: {
					display: true,
					text: this.props.title,
				}
			},
			data: {
				labels: this.props.data.map(d => d.label),
				datasets: [{
					label: this.props.title,
					data: this.props.data.map(d => d.value),
					backgroundColor: this.props.colors,
					pointRadius: 2,
					borderColor: "#fff",
					borderWidth: 1,
					lineTension: 0,
					weight: 5,
				}],
				text: this.props.data.map(d => d.value).reduce((a, b) => a + b, 0) + ' m'
			},
			
		});
	
	}


	render() {
		return <canvas ref={this.canvasRef} width={window.innerWidth * this.props.size} height={window.innerWidth * this.props.size} />;
	}
}

