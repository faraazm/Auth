import { AUTH_USER, UNAUTH_USER, SIGNUP_ERROR, SIGNUP_SUCCESS, SIGNIN_ERROR } from '../actions/types';

export default function(state = {}, action){
	switch(action.type){
		case AUTH_USER:
			return { ...state, error: '', authenticated: true };
		case UNAUTH_USER:
			return { ...state, authenticated: false };
		case SIGNIN_ERROR:
			return { ...state, signinError: action.payload };
		case SIGNUP_ERROR:
			return { ...state, signupError: action.payload };
		case SIGNUP_SUCCESS:
			return { ...state, signupSuccess: action.payload };
		default:
			return state;
	}
	
	return state;
}