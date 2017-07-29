import { REQUEST } from '../actions/types';

export default function(state = {}, action){
	switch(action.type){
		case REQUEST:
			return { ...state, isFetching: true };
		default:
			return state;
	}

	return state;
}