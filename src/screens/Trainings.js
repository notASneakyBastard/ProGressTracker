import React from 'react';
import { connect } from 'react-redux';
import { changeType, changeDistance, addExcercise, reset, changeDate } from '../redux/actions';

class Trainings extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			data: [{ key: 0, value: 0, option: 'sprint' }],
			inc: 1,
		}
	}
	render() {
		console.log(this.props)
		return (
			<div className="trainings">
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
export default connect(mapStateToProps, mapDispatchToProps)(Trainings);