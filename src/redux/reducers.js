import {
	ADD_COMBO,
	ADD_EXCERCISEW,
	ADD_EXCERCISEMP,
	DELETE_EXCERCISEW,
	DELETE_EXCERCISEMP,
	CHANGE_DISTANCEW,
	CHANGE_TYPEW,
	CHANGE_DISTANCEMP,
	CHANGE_TYPEMP,
	ADD_COMBO_EXCERCISE,
	CHANGE_DISTANCE_COMBO,
	CHANGE_TYPE_COMBO,
	DELETE_COMBO_EXCERCISE,
	CHANGE_DISTANCECD,
	CHANGE_TYPECD,
	RESET,
	SIGN_IN,
	SIGN_OUT,
	CHANGE_MULTIPLIER_COMBO,
	CHANGE_EXCERCISE_MULTI,
} from './types';
import { combineReducers } from 'redux'

const warmup = (state = [{ key: 0, dist: 0, option: 'sprint' }], action) => {
	let newState = [ ...state ];
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
		case DELETE_EXCERCISEW:
			newState.splice(action.id, 1);
			for (var i = action.id; i < newState.length; i++) {
				newState[i].key--;
			}
			return newState;
		case RESET:
			return [];
		default:
			return state;
	}
}

const mainpart = (state = [], action) => {
	let newState = [ ...state ];
	switch (action.type) {
		case CHANGE_TYPEMP:
			newState[action.id].option = action.option;
			return newState;
		case CHANGE_DISTANCEMP:
			newState[action.id].dist = parseInt(action.dist);
			return newState;
		case ADD_EXCERCISEMP:
			newState.push({ key: state.length, excerciseID: action.id, dist: 0, option: 'sprint', excerciseMultiplier: 1 });
			return newState;
		case ADD_COMBO:
			newState.push({ key: state.length, option: 'combo', comboID: action.id, excerciseMultiplier: 1, comboMultiplier: 1, data: [{ key: 0, dist: 0, excerciseID: 1, option: 'sprint' }] })
			return newState;
		case ADD_COMBO_EXCERCISE:
			newState[action.key].data.push({ key: state[action.key].data.length, dist: 0, excerciseID: newState[action.key].data.length + 1, option: 'sprint' })
			return newState;
		case CHANGE_MULTIPLIER_COMBO:
			newState[action.id].comboMultiplier = parseInt(action.multi);
			return newState;
		case CHANGE_EXCERCISE_MULTI:
			newState[action.id].excerciseMultiplier = parseInt(action.multi);
			return newState;
		case CHANGE_DISTANCE_COMBO:
			newState[action.id].data[action.key].dist = parseInt(action.dist);
			return newState;
		case CHANGE_TYPE_COMBO:
			newState[action.id].data[action.key].option = action.option;
			return newState;
		case DELETE_EXCERCISEMP:
			newState.splice(action.id, 1);
			for (var i = action.id; i < newState.length; i++) {
				newState[i].key--;
			}
			return newState;
		case DELETE_COMBO_EXCERCISE:
			newState[action.id].data.splice(action.key, 1);
			for (var i = action.key; i < newState[action.id].data.length; i++) {
				newState[action.id].data[i].key--;
			}
			return newState;
		case RESET:
			return [];
		default:
			return state;
	}
}

const cooldown = (state = { type: 'cooldown', dist: 0, option: '10km' }, action) => {
	let newState = { ...state };
	switch (action.type) {
		case CHANGE_DISTANCECD:
			newState.dist = parseInt(action.dist);
			return newState;
		case CHANGE_TYPECD:
			newState.option = action.option;
			return newState;
		case RESET:
			return { type: 'cooldown', dist: 0, option: '10km' };
		default:
			return state;
	}
}

const userInfo = (state = { type: 'none' }, action) => {
	let newState = { ...state };
	switch(action.type){
		case SIGN_IN:
			newState = action.user;
			return newState;
		case SIGN_OUT:
			return { type: 'none' };
		default:
			return state;
	}
}

const root = combineReducers({ warmup, mainpart, cooldown, userInfo });
export default root;