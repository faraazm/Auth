import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import App from './components/App';
import { AUTH_USER, UNAUTH_USER } from './actions/types';

import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

const store = createStore(
  	reducers,
  	applyMiddleware(thunk)
);

const token = localStorage.getItem('token');
if(token){
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App/>
    	</Router>
	</Provider>
, document.getElementById('root'));
registerServiceWorker();