import React from 'react';
import { connect } from 'react-redux';
import equal from 'fast-deep-equal';


class Training extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			combos: 1,
			excercises: 1,
			training: {}
		}
		this.createInputField = this.createInputField.bind(this);
	}
	componentDidMount() {
		let training = this.props.trainings.find((a) => parseInt(this.props.match.params.timestamp) === a.timestamp);
		this.setState({ training });
	}
	filterOption(option) {
		switch (option) {
			case 'sprint':
				return 'Sprint';
			case '1km':
				return '1 km tempo';
			case '2km':
				return '2 km tempo';
			case '5km':
				return '5 km tempo';
			case '10km':
				return '10 km tempo';
			case 'hm':
				return 'Half-marathon tempo';
			case 'm':
				return 'Marathon tempo';
			case 'easy':
				return 'Easy tempo';
			default:
				return '';
		}
	}
	createInputFieldCombo(id, item) {
		return (
			<li key={item.key} style={{ width: '100%', textAlign: 'left', marginLeft: '0px' }}>

				<span style={{ width: '50%', marginLeft: '10%', display: 'inline-block' }}>{this.filterOption(item.option) + ''}</span>
				<span style={{ width: '30%', marginLeft: '5%' }}>{item.dist + ' m'}</span>
			</li>
		);
	}
	createInputField(item) {
		if (item.option === 'combo') {
			return (
				<ul>
					<h4>Combo #{item.comboID}</h4>
					{item.data.map(this.createInputFieldCombo.bind(this, item.key))}
					<div style={{ textAlign: 'left' }}>
						<span style={{ width: '50%', marginLeft: '10%', display: 'inline-block' }}>Excercises in combo x{item.comboMultiplier}</span>
						<span>Combo x{item.excerciseMultiplier}</span>
					</div>
				</ul>
			)
		}
		return (
			<li key={item.key}>
				<div>
					<span>{item.dist + ' m  '}</span>
					<span>{this.filterOption(item.option)}</span>
					<span> x{item.excerciseMultiplier || 1}</span>
					<br />
				</div>
			</li>
		);
	}
	render() {
		let { training } = this.state;
		if (training === undefined || equal(training, {})) {
			return <p></p>
		}
		else
			return (
				<div style={{ paddingTop: '80px', height: window.innerHeight * 0.9 }}>
					<div style={{ width: '36%', marginLeft: '32%', textAlign: 'center', marginTop: '20px' }} className="training">
						<div className="cell">
							<h3>Warmup</h3>
							<ul>
								{training.warmup.map(this.createInputField)}
							</ul>
						</div>
						<hr style={{ width: '80%' }} />
						<div className="cell main">
							<h3>Main Part</h3>
							<ul>
								{training.mainpart.map(this.createInputField)}
							</ul>
						</div>
						<hr style={{ width: '80%' }} />
						<div className="cell">
							<h3>Cool Down</h3>
							<ul>
								<li>
									<span>{training.cooldown.dist + ' m  '}</span>
									<span>{this.filterOption(training.cooldown.option)}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			);
	}
}
const mapStateToProps = (state) => {
	return state;
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Training);