import React from 'react';
import { connect } from 'react-redux';
import {
	changeType,
	changeDistance,
	addExcercise,
	reset,
	changeDate,
	addTrainings
} from '../redux/actions';
import { Link } from 'react-router-dom';
import equal from 'fast-deep-equal';
import { RingLoader } from 'react-spinners';

class Trainings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [{ key: 0, value: 0, option: 'sprint' }],
			inc: 1,
			empty: false,
		}
		this.getLogs = this.getLogs.bind(this);
	}
	componentWillMount() {
		this.getLogs();
	}
	componentDidUpdate(prevProps) {
		let { user, logs } = this.props;
		if (!equal(user, prevProps.user)) {
			this.getLogs();
		}
	}
	getLogs() {
		let { user, addTrainings } = this.props;
		if (!user) return;
		let url = 'https://us-central1-progressmonitor-398b2.cloudfunctions.net/api/getUserLogs/';
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
				if (responseJson.status === 'empty') {
					this.setState({ empty: true })
				}
				else
					addTrainings(responseJson.logs.sort((a, b) => b.timestamp - a.timestamp));
			})
			.catch(err => console.error(err));
	}
	renderTrainings(item) {

		let date = new Date(item.timestamp);

		return (
			<li key={item.key}>
				<div>
					<Link to={"/trainings/" + item.timestamp}>
						<h3>{date.getDate() + '. ' + date.getMonth() + '. ' + date.getFullYear() + '.'}</h3>
						<p>Total: <b>{item.total}</b> m</p>
					</Link>
				</div>
			</li>
		);
	}
	min(a, b) {
		return a < b ? a : b;
	}
	render() {

		if (this.props.user === undefined) {
			let size = this.min(window.innerHeight * 0.6, window.innerWidth * 0.6);
			return (
				<div style={{ alignContent: 'center', width: size, paddingTop: '90px', marginLeft: ((window.innerWidth - size) / 2) }}>
					<RingLoader size={size} />
				</div>
			);
		}
		if (this.props.user === null) {
			return (
				<div style={{ paddingTop: '90px' }}>
					<p style={{ fontSize: '25px' }}>Please <Link to="/login">log in</Link></p>
				</div>
			);
		}
		if (this.state.empty) {
			return (
				<div style={{ paddingTop: '90px' }}>
					<p style={{ fontSize: '25px' }}>You don't have any trainings yet. Add them in <Link to='/input'>Add</Link> tab.</p>
				</div>
			);
		}
		return (
			<div className="trainings">
				<ul>
					{this.props.trainings.map(this.renderTrainings)}
				</ul>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return state;
}
const mapDispatchToProps = {
	changeDistance,
	changeType,
	addExcercise,
	reset,
	changeDate,
	addTrainings,
}
export default connect(mapStateToProps, mapDispatchToProps)(Trainings);