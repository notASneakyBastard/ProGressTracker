import React from 'react';
import { connect } from 'react-redux';
import { Select } from './Components';
import { changeType, changeDistance, addExcercise, addCombo, addComboExcercise, changeDistanceCombo, changeTypeCombo } from '../redux/actions';

class Mainpart extends React.Component {
	constructor(props) {
		super(props);
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
		this.forceUpdate();
	}
	addComboExcercise(key) {
		this.props.addComboExcercise(key);
		this.forceUpdate();
	}
	addCombo() {
		this.props.addCombo();
		this.forceUpdate()
	}
	changeDistanceCombo(id, event) {
		console.log(event.target.value);
		console.log(event.target.name);
		console.log(id);
		this.props.changeDistanceCombo(id, event.target.name, event.target.value);
		this.forceUpdate();
	}
	changeTypeCombo(id, event){
		console.log(event.target.value);
		console.log(event.target.name);
		console.log(id);
		this.props.changeTypeCombo(id, event.target.name, event.target.value);
		this.forceUpdate();
	}
	createInputFieldCombo(id, item) {
		console.log(item, id);
		return (
			<li key={item.key}>
				<input name={item.key.toString()} type="text" pattern="[0-9]*" onInput={this.changeDistanceCombo.bind(this, id)} />
				<Select num={item.key.toString()} value={item.option} handleChange={this.changeTypeCombo.bind(this, id)} />
			</li>
		);
	}
	createInputField(item) {
		console.log(item);
		if (item.option === 'combo') {
			return (
				<ul>
					{item.data.map(this.createInputFieldCombo.bind(this, item.key))}
					<button onClick={this.addComboExcercise.bind(this, item.key)}>+</button>
				</ul>
			)
		}
		return (
			<li key={item.key}>
				<input name={item.key.toString()} type="text" pattern="[0-9]*" onInput={this.handleNum.bind(this)} />
				<Select num={item.key.toString()} value={item.option} handleChange={this.handleChange} />
			</li>
		);
	}
	render() {
		console.log(this.props)
		return (
			<div>
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
	changeTypeCombo
}
export default connect(mapStateToProps, mapDispatchToProps)(Mainpart);