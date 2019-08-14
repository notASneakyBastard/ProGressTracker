import React from 'react';
import { Select, Warmup, Mainpart } from '../components/Components';
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
		this.createInputField = this.createInputField.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addField = this.addField.bind(this);
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
	addField() {
		let { data, inc } = this.state;
		this.props.addExcercise(0);
		data.push({ key: inc, value: 0, option: 'sprint' });
		console.log(data);
		this.setState({ data: data, inc: inc + 1 });
	}
	createInputField(item) {
		console.log(item)
		return (<li key={item.key}><input name={item.key.toString()} type="text" pattern="[0-9]*" onInput={this.handleNum.bind(this)} /><Select num={item.key.toString()} value={item.option} handleChange={this.handleChange} /></li>);
	}
	render() {
		console.log(this.props)
		return (
			<div>
				<Warmup />
				<Mainpart />
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