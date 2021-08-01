import React from 'react';
import { Warmup, Mainpart, CoolDown } from '../components/Components';
import { connect } from 'react-redux';
import { changeType, changeDistance, addExcercise, reset, changeDate } from '../redux/actions';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [{ key: 0, value: 0, option: 'sprint' }],
			inc: 1,
		}
		this.postData = this.postData.bind(this);
		this.changeDate = this.changeDate.bind(this);
	}
	changeDate(event) {
		if (event.target.value === "") {
			return;
		}
		else {
			var timestamp = Date.UTC(parseInt(event.target.value.substring(0, 4)), parseInt(event.target.value.substring(5, 7)), parseInt(event.target.value.substring(7)));
			this.props.changeDate(event.target.value);
		}
	}
	postData() {
		let { warmup, mainpart, cooldown, user } = this.props;
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
			})
			.catch(err => console.error(err));
	}
	min(a, b) {
		return a < b ? a : b;
	}
	render() {
		
		if(this.props.user === undefined){
			let size = this.min(window.innerHeight * 0.6, window.innerWidth * 0.6);
			return (
				<div style={{ alignContent: 'center', width: size, paddingTop: '90px', marginLeft: (window.innerWidth - size) / 2 }}>
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
		return (
			<div className="input">
				<Warmup />
				<Mainpart />
				<CoolDown />
				<div className="dateInput">
					<span>Date of training: </span>
					<input type="date" onChange={this.changeDate} defaultValue={(new Date(this.props.timestamp)).toISOString().substring(0, 10)} />
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