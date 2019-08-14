import {
	ADD_COMBO,
	ADD_EXCERCISEW,
	ADD_EXCERCISEMP,
	DELETE_EXCERCISE,
	DELETE_COMBO,
	CHANGE_DISTANCEW,
	CHANGE_DISTANCEMP,
	CHANGE_TYPEW,
	CHANGE_TYPEMP,
	ADD_COMBO_EXCERCISE,
	CHANGE_DISTANCE_COMBO,
	CHANGE_TYPE_COMBO,
} from './types';

export function changeDistance(id, d, dist) {
	switch (d) {
		case 0:
			return {
				type: CHANGE_DISTANCEW,
				id,
				dist,
			}
		case 1:
			return {
				type: CHANGE_DISTANCEMP,
				id,
				dist,
			}
	}
}

export function changeType(id, d, option) {
	switch (d) {
		case 0:
			return {
				type: CHANGE_TYPEW,
				id,
				option,
			}
		case 1:
			return {
				type: CHANGE_TYPEMP,
				id,
				option,
			}
	}
}

export function changeTypeCombo(id, key, option) {
	return {
		type: CHANGE_TYPE_COMBO,
		id,
		key,
		option,
	}
}

export function changeDistanceCombo(id, key, dist){
	return {
		type: CHANGE_DISTANCE_COMBO,
		id,
		key,
		dist,
	}
}

export function addExcercise(d) {
	switch (d) {
		case 0:
			return {
				type: ADD_EXCERCISEW,
			}
		case 1:
			return {
				type: ADD_EXCERCISEMP,
			}
	}
}

export function addCombo(){
	return {
		type: ADD_COMBO,
	}
}

export function addComboExcercise(key){
	return {
		type: ADD_COMBO_EXCERCISE,
		key,
	}
}