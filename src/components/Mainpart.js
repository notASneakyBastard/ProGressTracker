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
	changeMultiplierCombo,
	changeExcerciseMulti
} from '../redux/actions';

class Mainpart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			combos: 1,
			excercises: 1
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
		let { excercises } = this.state
		this.props.addExcercise(1, excercises);
		this.setState({
			excercises: excercises + 1,
		})
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
			<li key={item.key} className="excercise inCombo">
				<h4>Excercise #{item.excerciseID}</h4>
				<input name={item.key.toString()} type="text" pattern="[0-9]*" onInput={this.changeDistanceCombo.bind(this, id)} />
				<Select num={item.key.toString()} value={item.option} handleChange={this.changeTypeCombo.bind(this, id)} />
				<br />
				<button className="delete" onClick={this.deleteComboExcercise.bind(this, id, item.key)}>Delete</button>
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
	changeExcerciseMulti(id, event){
		this.props.changeExcerciseMulti(id, event.target.value);
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
					<button className="addExcercise" onClick={this.addComboExcercise.bind(this, item.key)}>Add Excercise</button>
					<button className="delete" onClick={this.deleteExcercise.bind(this, item.key)}>Delete Combo</button>
				</ul>
			)
		}
		return (
			<li key={item.key} className="excercise">
				<h4>Excercise #{item.excerciseID}</h4>
				<input name={item.key.toString()} type="text" pattern="[0-9]*" className="inputField" defaultValue={0} onInput={this.handleNum.bind(this)} />
				<Select num={item.key.toString()} value={item.option} handleChange={this.handleChange} />
				<br />
				<span>Times performed:</span>
				<input type="text" pattern="[0-9]*" className="inputFieldMulti" defaultValue={0} onInput={this.changeExcerciseMulti.bind(this, item.key)} />
				<br />
				<button onClick={this.deleteExcercise.bind(this, item.key)}>Delete</button>
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
				<button className="addExcercise" onClick={this.addField}>Add Excercise</button>
				<button className="addCombo" onClick={this.addCombo}>Add Combo</button>
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
	changeExcerciseMulti,
}
export default connect(mapStateToProps, mapDispatchToProps)(Mainpart);