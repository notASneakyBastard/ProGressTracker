import React from 'react'
import { connect } from 'react-redux'
import { Select } from './Components'
import { changeType, changeDistance, addExcercise, deleteExcercise } from '../redux/actions'


class Warmup extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			data: [{ key: 0, value: 0, option: 'sprint' }]
		}
		this.createInputField = this.createInputField.bind(this);
		this.addField = this.addField.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleNum = this.handleNum.bind(this)
	}
	handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.props.changeType(event.target.name, 0, event.target.value);
	}
	handleNum(event: React.ChangeEvent<HTMLSelectElement>) {
		this.props.changeDistance(event.target.name, 0, event.target.value);
	}
	addField() {
		this.props.addExcercise(0);
	}
	deleteExcercise(id){
		this.props.deleteExcercise(id, 0);
	}
	createInputField(item) {
		console.log(item)
		return (
			<li key={item.key}>
				<input name={item.key.toString()} className="inputField" defaultValue={0} type="text" pattern="[0-9]*" onInput={this.handleNum.bind(this)} />
				<Select num={item.key.toString()} value={item.option} handleChange={this.handleChange} />
				<button onClick={this.deleteExcercise.bind(this, item.key)}>X</button> 
			</li>
		);
	}
	render() {
		console.log(this.props)
		return (
			<div className="warmup">
				<h2>Warmup</h2>
				<ul>
					{this.props.warmup.map(this.createInputField)}
				</ul>
				<button className="addExcercise" onClick={this.addField}>Add Excercise</button>
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
	deleteExcercise,
}
export default connect(mapStateToProps, mapDispatchToProps)(Warmup);