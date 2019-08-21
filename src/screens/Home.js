import React from 'react';
import { DoughnutChart } from '../components/Components'

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totals: [],
			intensityTotals: [],
		}
		this.getData = this.getData.bind(this);
		this.editData = this.editData.bind(this);
	}
	componentWillMount() {
		console.log(this.props)
		this.getData();
	}
	getData() {
		let { user } = this.props;
		if (!user) return;
		let url = 'https://us-central1-progressmonitor-398b2.cloudfunctions.net/api/getData/';
		fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ uid: user.uid })
		})
			.then(response => response.json())
			.then(responseJson => {
				console.log(responseJson);
				console.log("Upalilo valjd");
				this.editData(responseJson.logs.totals, responseJson.logs.intensityTotals)
			})
			.catch(err => console.error(err));

	}
	editData(mapa, intensities) {
		let arr = [];
		let total = 0
		for (let [key, value] of Object.entries(mapa)) {
			arr.push({ label: key, value });
			total += value
		}
		let high = []
		for (let [key, value] of Object.entries(intensities.highIntensity)) {
			high.push({ label: key, value });
		}
		let medium = []
		for (let [key, value] of Object.entries(intensities.mediumIntensity)) {
			medium.push({ label: key, value });
		}
		let light = []
		for (let [key, value] of Object.entries(intensities.lightIntensity)) {
			light.push({ label: key, value });
		}
		this.setState({ totals: arr, intensityTotals: { high, medium, light }, total });
	}
	render() {
		let { totals, total, intensityTotals } = this.state;
		console.log(totals, intensityTotals);
		return (
			<div>
				<div>
					{totals.length !== 0 ? <DoughnutChart data={totals} title="Total by Parts" colors={["#eaed24", "#d97d14", "#eb2821"]} total={total} size={0.3} /> : <p>Loading</p>}
				</div>
				<div className="inline">
					<div className="inline">
						{totals.length !== 0 ? <DoughnutChart data={intensityTotals.high} title="High Intensity Total" colors={["#1E555C", "#F4D8CD", "#EDB183"]} total={total} size={0.25} /> : <p></p>}
					</div>
					<div className="inline">
						{totals.length !== 0 ? <DoughnutChart data={intensityTotals.medium} title="Medium Intensity Total" colors={["#0B4F6C", "#01BAEF", "#FBFBFF"]} total={total} size={0.25} /> : <p></p>}
					</div>
					<div className="inline">
						{totals.length !== 0 ? <DoughnutChart data={intensityTotals.light} title="Light Intensity Total" colors={["#eaed24", "#d97d14", "#eb2821"]} total={total} size={0.25} /> : <p></p>}
					</div>
				</div>
			</div>
		);
	}
}

export default Home;