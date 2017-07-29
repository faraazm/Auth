import axios from 'axios';
import { AUTH_USER, SIGNUP_ERROR, SIGNIN_ERROR, SIGNUP_SUCCESS, UNAUTH_USER, REQUEST } from './types';

const ROOT_URL = 'http://localhost:8080';

export function authMessage(message, actionType){
	return {
		type: actionType,
		payload: message
	}
}

export function signInUser({ username, password }){
	return function(dispatch, { history }){
		axios.post(`${ROOT_URL}/users/login`, { username, password })
		.then(response => {
			localStorage.setItem('token', response.data.token);
			dispatch({ type: AUTH_USER });
			dispatch({ type: REQUEST });
		})
		.catch(serve => dispatch(authMessage(serve.response.data.error, SIGNIN_ERROR)));
	}
}

export function signupUser({ username, password }){
	return function(dispatch){
		axios.post(`${ROOT_URL}/users/register`, { username, password })
		.then(response => {
			dispatch(authMessage(response.data.message, SIGNUP_SUCCESS))
			localStorage.setItem('token', response.data.token);
		})
		.catch(serve => dispatch(authMessage(serve.response.data.error, SIGNUP_ERROR)));
	}
}

export function signoutUser({ history }){
		localStorage.removeItem('token');
		history.push('/register');
		return { type: UNAUTH_USER };
}