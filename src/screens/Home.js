import React from 'react';
import { DoughnutChart } from '../components/Components'

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totals: [],
			intensityTotals: [],
			totalByIntensities: [],
			inComboIntensities: [],
			updatedUser: false,
		}
		this.getData = this.getData.bind(this);
		this.editData = this.editData.bind(this);
	}
	componentDidUpdate() {
		let { user } = this.props;
		let { updatedUser } = this.state;
		if(user && !updatedUser){
			this.getData();
		} 
		console.log(this.props)
		
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
		let inCombo = intensities.inCombo;
		let arr = [];
		let total = 0
		for (let [key, value] of Object.entries(mapa)) {
			arr.push({ label: key, value });
			total += value
		}
		let high = [], highTotal = 0;
		for (let [key, value] of Object.entries(intensities.highIntensity)) {
			high.push({ label: key, value });
			highTotal += value;
		}
		let medium = [], mediumTotal = 0;
		for (let [key, value] of Object.entries(intensities.mediumIntensity)) {
			medium.push({ label: key, value });
			mediumTotal += value;
		}
		let light = [], lightTotal = 0;
		for (let [key, value] of Object.entries(intensities.lightIntensity)) {
			light.push({ label: key, value });
			lightTotal += value;
		}
		let inComboIntensities = [{ label: 'Light', value: inCombo.light }, { label: 'Medium', value: inCombo.medium }, { label: 'High', value: inCombo.high }];
		let totalByIntensities = [{ label: 'Light', value: lightTotal }, { label: 'Medium', value: mediumTotal }, { label: 'High', value: highTotal }];
		this.setState({ updatedUser: true, totals: arr, intensityTotals: { high, medium, light }, total, totalByIntensities, inComboIntensities });
	}
	render() {
		let { totals, total, intensityTotals, totalByIntensities, inComboIntensities } = this.state;
		console.log(totals, intensityTotals);
		return (
			<div>
				<div>
					{totals.length !== 0 ? <DoughnutChart data={totalByIntensities} title="Total by Intensities" colors={["#1E555C", "#F4D8CD", "#EDB183"]} total={total} size={0.3} /> : <p>Loading</p>}
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
				<div className="inline">
					<div className="inline">
						{totals.length !== 0 ? <DoughnutChart data={totals} title="Total by Parts" colors={["#eaed24", "#d97d14", "#eb2821"]} total={total} size={0.25} /> : <p></p>}
					</div>
					<div className="inline">
						{totals.length !== 0 ? <DoughnutChart data={inComboIntensities} title="Intensities in combo" colors={["#1E555C", "#F4D8CD", "#EDB183"]} total={total} size={0.25} /> : <p></p>}
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