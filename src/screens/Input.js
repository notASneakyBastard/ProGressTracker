import React from 'react';
import { Warmup, Mainpart, CoolDown } from '../components/Components';
import { connect } from 'react-redux';
import { changeType, changeDistance, addExcercise } from '../redux/actions';

class Input extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			data: [{ key: 0, value: 0, option: 'sprint' }],
			inc: 1,
		}
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		console.log(event.target.value);
		console.log(event.target.name);
		this.props.changeType(event.target.name, 0, event.target.value);
		let { data } = this.state;
		data[event.target.name].option = event.target.value;
		this.setState({ data: data });
	}
	handleNum(event) {
		console.log(event.target.value);
		console.log(event.target.name);
		this.props.changeDistance(event.target.name, 0, event.target.value);
		let { data } = this.state;
		data[event.target.name].value = parseInt(event.target.value);
		this.setState({ data: data });
	}
	render() {
		console.log(this.props)
		return (
			<div>
				<Warmup />
				<Mainpart />
				<CoolDown />
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
	addExcercise
}
export default connect(mapStateToProps, mapDispatchToProps)(Input);