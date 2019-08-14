import {
	ADD_COMBO,
	ADD_EXCERCISEW,
	ADD_EXCERCISEMP,
	DELETE_EXCERCISE,
	DELETE_COMBO,
	CHANGE_DISTANCEW,
	CHANGE_TYPEW,
	CHANGE_DISTANCEMP,
	CHANGE_TYPEMP,
	ADD_COMBO_EXCERCISE,
	CHANGE_DISTANCE_COMBO,
	CHANGE_TYPE_COMBO,
} from './types';
import { combineReducers } from 'redux'

const warmup = (state = [], action) => {
	let newState = state;
	switch (action.type) {
		case CHANGE_TYPEW:
			newState[action.id].option = action.option;
			return newState;
		case CHANGE_DISTANCEW:
			newState[action.id].dist = parseInt(action.dist);
			return newState;
		case ADD_EXCERCISEW:
			newState.push({ key: state.length, dist: 0, option: 'sprint' });
			return newState;
		default:
			return state;
	}
}

const mainpart = (state = [], action) => {
	let newState = state;
	switch (action.type) {
		case CHANGE_TYPEMP:
			newState[action.id].option = action.option;
			return newState;
		case CHANGE_DISTANCEMP:
			newState[action.id].dist = parseInt(action.dist);
			return newState;
		case ADD_EXCERCISEMP:
			newState.push({ key: state.length, dist: 0, option: 'sprint' });
			return newState;
		case ADD_COMBO:
			newState.push({ key: state.length, option: 'combo', data: [{ key: 0, dist: 0, option: 'sprint' }] })
			return newState;
		case ADD_COMBO_EXCERCISE:
			newState[action.key].data.push({ key: state[action.key].data.length, dist: 0, option: 'sprint' })
			return newState;
		case CHANGE_DISTANCE_COMBO:
			newState[action.id].data[action.key].dist = parseInt(action.dist);
			return newState;
		case CHANGE_TYPE_COMBO:
			newState[action.id].data[action.key].option = action.option;
			return newState;
		default:
			return state;
	}
}

const root = combineReducers({ warmup, mainpart });
export default root;