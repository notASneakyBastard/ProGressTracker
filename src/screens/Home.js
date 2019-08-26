import React from 'react';
import { DoughnutChart } from '../components/Components'
import { addLogs } from '../redux/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import equal from 'fast-deep-equal';
import { RingLoader } from 'react-spinners';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totals: [],
			intensityTotals: [],
			totalByIntensities: [],
			inComboIntensities: [],
			updatedUser: false,
			empty: false,
		}
		this.getData = this.getData.bind(this);
		this.editData = this.editData.bind(this);
	}
	componentDidUpdate(prevProps) {
		let { user, logs } = this.props;
		let { updatedUser } = this.state;
		if (!equal(user, prevProps.user) || equal(logs, {})) {
			this.getData();
		}

	}
	componentDidMount() {
		let { user, logs } = this.props;
		let { updatedUser } = this.state;
		if (equal(logs, {})) {
			this.getData();
		}
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
				if (responseJson.status === 'empty')
					this.setState({ empty: true })
				else
					this.editData(responseJson.logs.totals, responseJson.logs.intensityTotals)
			})
			.catch(err => console.error(err));

	}
	filterOption(option) {
		switch (option) {
			case 'sprint':
				return 'Sprint';
			case 'km1':
				return '1 km tempo';
			case 'km2':
				return '2 km tempo';
			case 'km5':
				return '5 km tempo';
			case 'km10':
				return '10 km tempo';
			case 'hm':
				return 'Half-marathon tempo';
			case 'm':
				return 'Marathon tempo';
			case 'easy':
				return 'Easy tempo';
			case 'warmup':
				return 'Warmup';
			case 'mainpart':
				return 'Main Part';
			case 'cooldown':
				return 'Cool Down';
			default:
				return '';
		}
	}
	editData(mapa, intensities) {
		let inCombo = intensities.inCombo;
		let arr = [];
		let total = 0
		for (let [key, value] of Object.entries(mapa)) {
			arr.push({ label: this.filterOption(key), value });
			total += value
		}
		let high = [], highTotal = 0;
		for (let [key, value] of Object.entries(intensities.highIntensity)) {
			high.push({ label: this.filterOption(key), value });
			highTotal += value;
		}
		let medium = [], mediumTotal = 0;
		for (let [key, value] of Object.entries(intensities.mediumIntensity)) {
			medium.push({ label: this.filterOption(key), value });
			mediumTotal += value;
		}
		let light = [], lightTotal = 0;
		for (let [key, value] of Object.entries(intensities.lightIntensity)) {
			light.push({ label: this.filterOption(key), value });
			lightTotal += value;
		}
		let inComboIntensities = [{ label: 'Light', value: inCombo.light }, { label: 'Medium', value: inCombo.medium }, { label: 'High', value: inCombo.high }];
		let totalByIntensities = [{ label: 'Light', value: lightTotal }, { label: 'Medium', value: mediumTotal }, { label: 'High', value: highTotal }];
		this.props.addLogs({ totals: arr, intensityTotals: { high, medium, light }, total, totalByIntensities, inComboIntensities })
		this.setState({ updatedUser: true, totals: arr, intensityTotals: { high, medium, light }, total, totalByIntensities, inComboIntensities });
	}
	min(a, b) {
		return a < b ? a : b;
	}
	render() {
		let { user } = this.props;
		let { empty } = this.state;
		let { totals, total, intensityTotals, totalByIntensities, inComboIntensities } = this.props.logs;
		if (equal(this.props.logs, {})) {
			totals = []; total = 0; intensityTotals = []; totalByIntensities = []; inComboIntensities = [];
		}
		if (user === undefined) {
			let size = this.min(window.innerHeight * 0.6, window.innerWidth * 0.6);
			return (
				<div style={{ alignContent: 'center', width: size, paddingTop: '90px', marginLeft: (window.innerWidth - size) / 2 }}>
					<RingLoader size={size} />
				</div>
			);
		}
		else if (user === null) {
			return <p>Please <Link to="/login">log in</Link></p>
		} else if(empty){
			return <p>You don't have any trainings yet. Add them in <Link to="/input">Add</Link> tab.</p>
		}
		return (
			<div style={{ paddingTop: '90px', }}>
				<div>
					{totals.length !== 0 ? <DoughnutChart data={totalByIntensities} title="Total by Intensities" colors={["#1E555C", "#F4D8CD", "#EDB183"]} total={total} size={0.3} /> : <p></p>}
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
			</div >
		);

	}
}

const mapStateToProps = (state) => {
	return state;
}

const mapDispatchToProps = {
	addLogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);