import React from 'react';

class Select extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            data: [{ key: 0, value: 0, option: 'sprint' }]
        }
    }
    render() {
        return (
        <select name={this.props.num} onChange={this.props.handleChange}>
            <option value="sprint">Sprint</option>
            <option value="1km">1 km tempo</option>
            <option value="2km">2 km tempo</option>
            <option value="5km">5 km tempo</option>
            <option value="10km">10 km tempo</option>
            <option value="hm">Half-marathon tempo</option>
            <option value="m">Marathon tempo</option>
            <option value="easy">Easy tempo</option>
        </select>
        );
    }
}

export default Select;