import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

export default function(ComposedComponent){
	class Authentication extends Component {
		componentWillMount(){
			if(!this.props.authenticated){
				console.log(this.props.authenticated);
				<Redirect push to='/' />;
			}
		}

		componentWillUpdate(nextProps){
			if(!nextProps.authenticated){
				console.log(this.props.authenticated);
				<Redirect push to='/' />;
			}
		}

		render(){
			return <ComposedComponent {...this.props} />
		}
	}

	function mapStateToProps(state){
		return { authenticated: state.auth.authenticated };
	}

	return connect(mapStateToProps)(Authentication);
}