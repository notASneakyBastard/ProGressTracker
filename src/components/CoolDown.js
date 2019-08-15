import React from 'react';
import { connect } from 'react-redux';
import { Select } from './Components';
import { changeType, changeDistance, addExcercise, deleteExcercise } from '../redux/actions';


class CoolDown extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleNum = this.handleNum.bind(this)
	}
	handleChange(event) {
		console.log(event.target.value);
		console.log(event.target.name);
		this.props.changeType(event.target.name, 2, event.target.value);
		this.forceUpdate();
	}
	handleNum(event) {
		console.log(event.target.value);
		console.log(event.target.name);
		this.props.changeDistance(event.target.name, 2, event.target.value);
		this.forceUpdate();
	}
	render() {
		console.log(this.props)
		return (
			<div>
				<h2>Cool Down</h2>
				<ul>
					<li>
						<input name="cooldown" type="text" pattern="[0-9]*" onInput={this.handleNum.bind(this)} />
						<select name="cooldown" onChange={this.handleChange}>
							<option value="10km">10 km tempo</option>
							<option value="hm">Half-marathon tempo</option>
							<option value="m">Marathon tempo</option>
							<option value="easy">Easy tempo</option>
						</select>
					</li>
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
}
export default connect(mapStateToProps, mapDispatchToProps)(CoolDown);