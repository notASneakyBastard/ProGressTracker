import React from 'react';
import { Warmup, Mainpart, CoolDown } from '../components/Components';
import { connect } from 'react-redux';
import { changeType, changeDistance, addExcercise, reset } from '../redux/actions';

class Input extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			data: [{ key: 0, value: 0, option: 'sprint' }],
			inc: 1,
		}
		this.postData = this.postData.bind(this);
	}
	postData(){
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
				<button onClick={this.postData}>Post</button>
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
	reset
}
export default connect(mapStateToProps, mapDispatchToProps)(Input);