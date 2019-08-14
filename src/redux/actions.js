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

export function addExcercise(d){
	switch(d) {
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