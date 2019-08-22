import React from 'react';
import { connect } from 'react-redux';
import { changeType, changeDistance, addExcercise, reset, changeDate, addTrainings } from '../redux/actions';

class Trainings extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			data: [{ key: 0, value: 0, option: 'sprint' }],
			inc: 1,
		}
		this.getLogs = this.getLogs.bind(this);
	}
	componentWillMount() {
		this.getLogs();
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
				console.log(responseJson);
				console.log("Upalilo valjd");
				addTrainings(responseJson.logs.sort((a, b) => b.timestamp - a.timestamp));
			})
			.catch(err => console.error(err));
	}
	renderTrainings(item) {
		console.log(item);
		let date = new Date(item.timestamp);

		return(
			<li key={item.key}>
				<h3>{date.getDate() + '. ' + date.getMonth() + '. ' + date.getFullYear() + '.'}</h3>
				<p>Total: {item.total}</p>
			</li>
		);
	}
	render() {
		console.log(this.props)
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