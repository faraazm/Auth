import axios from 'axios';
import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, FETCH_TODOS } from './types';

const ROOT_URL = 'http://localhost:8080';

export function fetchTodos(){
	return function(dispatch){
		axios.get(`${ROOT_URL}/todos`, 
			{ headers: { Authorization: localStorage.getItem('token') } 
		})
		.then(response => {
			console.log(localStorage);
			dispatch({ type: FETCH_TODOS, payload: response });
		})
		.catch(() => {	
			console.log('error');
		})
	}	
}

export function addTodo(todo){
	return function(dispatch){
		axios.post(`${ROOT_URL}/todo`, { text: todo })
		.then(response => {
			dispatch({ type: ADD_TODO, payload: response })
		})
		.catch(() => {	
			console.log('error');
		})
	}
}

export function deleteTodo(id){
	return function(dispatch){
		axios.delete(`${ROOT_URL}/todo/${id}`)
		.then(response => {
			dispatch({ type: DELETE_TODO, payload: response })
		})
		.catch(() => {	
			console.log('error');
		})
	}
}

export function editTodo(id, text){
	return function(dispatch){
		axios.put(`${ROOT_URL}/todo/${id}`, { text: text })
		.then(response => {
			dispatch({ type: EDIT_TODO, payload: response })
		})
		.catch(() => {	
			console.log('error');
		})
	}
}

export function completeTodo(id, complete){
		return function(dispatch){
		axios.put(`${ROOT_URL}/completetodo/${id}`, { complete: complete })
		.then(response => {
			dispatch({ type: COMPLETE_TODO, payload: response })
		})
		.catch(() => {	
			console.log('error');
		})
	}
}