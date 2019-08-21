import React from 'react';
import { connect } from 'react-redux';
import { Select } from './Components';
import {
	changeType,
	changeDistance,
	addExcercise,
	addCombo,
	addComboExcercise,
	changeDistanceCombo,
	changeTypeCombo,
	deleteExcercise,
	deleteComboExcercise,
	changeMultiplierCombo
} from '../redux/actions';

class Mainpart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			combos: 1,
		}
		this.createInputField = this.createInputField.bind(this);
		this.addField = this.addField.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleNum = this.handleNum.bind(this);
		this.addCombo = this.addCombo.bind(this);
	}
	handleChange(event) {
		console.log(event.target.value);
		console.log(event.target.name);
		this.props.changeType(event.target.name, 1, event.target.value);
		this.forceUpdate();
	}
	handleNum(event) {
		console.log(event.target.value);
		console.log(event.target.name);
		this.props.changeDistance(event.target.name, 1, event.target.value);
		this.forceUpdate();
	}
	addField() {
		this.props.addExcercise(1);
	}
	addComboExcercise(key) {
		this.props.addComboExcercise(key);
	}
	addCombo() {
		let { combos } = this.state
		this.props.addCombo(combos);
		this.setState({
			combos: combos + 1,
		})
	}
	changeDistanceCombo(id, event) {
		console.log(event.target.value);
		console.log(event.target.name);
		console.log(id);
		this.props.changeDistanceCombo(id, event.target.name, event.target.value);
	}
	changeTypeCombo(id, event) {
		console.log(event.target.value);
		console.log(event.target.name);
		console.log(id);
		this.props.changeTypeCombo(id, event.target.name, event.target.value);
	}
	createInputFieldCombo(id, item) {
		console.log(item, id);
		return (
			<li key={item.key}>
				<input name={item.key.toString()} type="text" pattern="[0-9]*" onInput={this.changeDistanceCombo.bind(this, id)} />
				<Select num={item.key.toString()} value={item.option} handleChange={this.changeTypeCombo.bind(this, id)} />
				<button onClick={this.deleteComboExcercise.bind(this, id, item.key)}>X</button>
			</li>
		);
	}
	changeMultiplierCombo(id, event) {
		this.props.changeMultiplierCombo(id, event.target.value);
	}
	deleteComboExcercise(id, key) {
		this.props.deleteComboExcercise(id, key);
	}
	deleteExcercise(id) {
		this.props.deleteExcercise(id, 1);
	}
	createInputField(item) {
		console.log(item);
		if (item.option === 'combo') {
			return (
				<ul>
					<h4>Combo #{item.comboID}</h4>
					{item.data.map(this.createInputFieldCombo.bind(this, item.key))}
					<div>
						Times performed:
						<input name={item.key.toString()} defaultValue={1} type="text" pattern="[0-9]*" onInput={this.changeMultiplierCombo.bind(this, item.key)} />
					</div>
					<button onClick={this.addComboExcercise.bind(this, item.key)}>+</button>
					<button onClick={this.deleteExcercise.bind(this, item.key)}>X</button>
				</ul>
			)
		}
		return (
			<li key={item.key} className="excercise">
				<input name={item.key.toString()} type="text" pattern="[0-9]*" onInput={this.handleNum.bind(this)} />
				<Select num={item.key.toString()} value={item.option} handleChange={this.handleChange} />
				<button onClick={this.deleteExcercise.bind(this, item.key)}>X</button>
			</li>
		);
	}
	render() {
		console.log(this.props)
		return (
			<div className="mainpart">
				<h2>Main Part</h2>
				<ul>
					{this.props.mainpart.map(this.createInputField)}
				</ul>
				<button onClick={this.addField}>Add Excercise</button>
				<button onClick={this.addCombo}>Add Combo</button>
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
	addCombo,
	addComboExcercise,
	changeDistanceCombo,
	changeTypeCombo,
	deleteExcercise,
	deleteComboExcercise,
	changeMultiplierCombo,
}
export default connect(mapStateToProps, mapDispatchToProps)(Mainpart);