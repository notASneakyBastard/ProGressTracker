import {
	ADD_COMBO,
	ADD_EXCERCISEW,
	ADD_EXCERCISEMP,
	CHANGE_DISTANCEW,
	CHANGE_DISTANCEMP,
	CHANGE_TYPEW,
	CHANGE_TYPEMP,
	ADD_COMBO_EXCERCISE,
	CHANGE_DISTANCE_COMBO,
	CHANGE_TYPE_COMBO,
	DELETE_EXCERCISEW,
	DELETE_EXCERCISEMP,
	DELETE_COMBO_EXCERCISE,
	CHANGE_DISTANCECD,
	CHANGE_TYPECD,
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
		case 2:
			return {
				type: CHANGE_DISTANCECD,
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
		case 2:
			return {
				type: CHANGE_TYPECD,
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

export function changeDistanceCombo(id, key, dist) {
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

export function addCombo() {
	return {
		type: ADD_COMBO,
	}
}

export function addComboExcercise(key) {
	return {
		type: ADD_COMBO_EXCERCISE,
		key,
	}
}

export function deleteExcercise(id, d) {
	switch (d) {
		case 0:
			return {
				type: DELETE_EXCERCISEW,
				id,
			}
		case 1:
			return {
				type: DELETE_EXCERCISEMP,
				id,
			}
	}
}

export function deleteComboExcercise(id, key) {
	return {
		type: DELETE_COMBO_EXCERCISE,
		id,
		key,
	}
}