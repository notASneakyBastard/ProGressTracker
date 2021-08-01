import React from 'react';
import { connect } from 'react-redux';
import { changeType, changeDistance } from '../redux/actions';


class CoolDown extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleNum = this.handleNum.bind(this)
	}
	handleChange(event) {
		this.props.changeType(event.target.name, 2, event.target.value);
		this.forceUpdate();
	}
	handleNum(event) {
		this.props.changeDistance(event.target.name, 2, event.target.value);
		this.forceUpdate();
	}
	render() {
		return (
			<div className="cooldown">
				<h2>Cool Down</h2>
				<ul>
					<li>
						<input name="cooldown" className="inputField" defaultValue={0} value={this.props.cooldown.dist} type="text" pattern="[0-9]*" onInput={this.handleNum.bind(this)} />
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