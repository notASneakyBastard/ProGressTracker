import React from 'react';
import { DoughnutChart } from '../components/Components'

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<DoughnutChart />
			</div>
		);
	}
}

export default Home;