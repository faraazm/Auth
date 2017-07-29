import { combineReducers } from 'redux';
import todoReducer from './todo_reducer';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import loadReducer from './loader_reducer';

const rootReducer = combineReducers({
	form,
	todos: todoReducer,
	auth: authReducer,
	loading: loadReducer
});

export default rootReducer;