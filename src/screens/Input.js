import React from 'react';
import { Warmup, Mainpart, CoolDown } from '../components/Components';
import { connect } from 'react-redux';
import { changeType, changeDistance, addExcercise, reset, changeDate } from '../redux/actions';

class Input extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			data: [{ key: 0, value: 0, option: 'sprint' }],
			inc: 1,
		}
		this.postData = this.postData.bind(this);
		this.changeDate = this.changeDate.bind(this);
	}
	changeDate(event) {
		console.log(event.target.value);
		var timestamp = Date.UTC(parseInt(event.target.value.substring(0, 4)), parseInt(event.target.value.substring(5, 7)), parseInt(event.target.value.substring(7)));
		this.props.changeDate(event.target.value);
	}
	postData() {
		let { warmup, mainpart, cooldown, user } = this.props;
		console.log(warmup, mainpart, cooldown, user.uid);
		let url = 'https://us-central1-progressmonitor-398b2.cloudfunctions.net/api/addData/';
		fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ warmup: warmup, mainpart: mainpart, cooldown: cooldown, uid: user.uid })
		})
			.then(response => response.json())
			.then(responseJson => {
				this.props.reset();
				console.log(responseJson);
				console.log("Upalilo valjd");
			})
			.catch(err => console.error(err));
	}
	render() {
		console.log(this.props)
		return (
			<div className="input">
				<Warmup />
				<Mainpart />
				<CoolDown />
				<div className="dateInput">
					<span>Date of training: </span>
					<input type="date" onChange={this.changeDate} data-date-format="DD-MM-YYYY" defaultValue={(new Date(this.props.timestamp)).toISOString().substring(0, 10)} />
				</div>
				<button className="post" onClick={this.postData}>Post</button>
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
}
export default connect(mapStateToProps, mapDispatchToProps)(Input);