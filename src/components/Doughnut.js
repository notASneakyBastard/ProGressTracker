import React from 'react';
import Chart from 'chart.js';

export default class DoughnutChart extends React.Component {
	constructor(props) {
		super(props);

		this.canvasRef = React.createRef();
	}

	componentDidUpdate() {
		this.myChart.data.labels = this.props.data.map(d => d.label);
		this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
		this.myChart.update();
	}

	componentDidMount() {
		console.log(this.props)
		this.myChart = new Chart(this.canvasRef.current, {
			type: 'doughnut',
			options: {
				maintainAspectRatio: false,
				cutoutPercentage: 75,
			},
			data: this.props.data
		});

	}


	render() {
		return <canvas ref={this.canvasRef} />;
	}
}

