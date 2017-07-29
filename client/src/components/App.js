import React, { Component } from 'react';
import Header from './Header';
import Login from './auth/Login';
import Home from './Home';
import Register from './auth/Register';
import TodoComponent from './todos/TodoComponent';
import { Route, Switch } from 'react-router-dom';
import { RouteTransition } from 'react-router-transition';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class App extends Component {
	render(){
		return (
			<div>
				<Header />
				<Route render={({location, history, match}) => {
					return (
				<RouteTransition
					runOnMount={true}
			        pathname={location.pathname}
			        atEnter={{ opacity: 0 }}
			        atLeave={{ opacity: 1 }}
			        atActive={{ opacity: 1 }}
			    >
				    <Switch key={location.key} location={location}>
				      	<Route exact path="/" component={Home}/>
						<Route path="/login" component={Login}/>
						<Route path="/register" component={Register}/>
						<Route path="/todos" render={() => (
						  this.props.authenticated ? (
						    <TodoComponent />
						  ) : (
						    <Login />
						  )
						)}/>
				    </Switch>
				</RouteTransition>
				);
				}} />
			</div>
		);
	}
}

function mapStateToProps(state){
	return { authenticated: state.auth.authenticated };
}

export default withRouter(connect(mapStateToProps)(App));