import { 
ADD_TODO,
DELETE_TODO,
EDIT_TODO,
COMPLETE_TODO,
FETCH_TODOS
 } from '../actions/types';

export default function(state = [], action){
	switch(action.type) {
		case FETCH_TODOS:
			return [ ...action.payload.data ];
		case ADD_TODO:
			return [
				...state,
				{
					text: action.payload.data.text,
					completed: action.payload.data.completed,
					_id: action.payload.data._id
				}
			];
		case DELETE_TODO:
			return state.filter(todo => todo._id !== action.payload.data.id);
		case EDIT_TODO:
			return state.map((todo) => {
				if(todo._id !== action.payload.data._id){
					return todo;
				} else if(todo._id === action.payload.data._id){
					return { ...todo,
					 		text : action.payload.data.text }
				}
			});
		case COMPLETE_TODO:
			return state.map((todo) => {
				if(todo._id !== action.payload.data._id){
					return todo;
				} else if(todo._id === action.payload.data._id){
					return { ...todo,
					 		completed : !action.payload.data.completed }
				}
			});
		default:
			return state;
		}
}