import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderLinks(){
		if(this.props.authenticated){
			return (
				<li><Link to="/" onClick={this.props.signoutUser}>Sign Out</Link></li>
			);
		} else {
			return [
				<li key={1}><Link to="/">Home</Link></li>,
		        <li key={2}><Link to="/login">Login</Link></li>,
		        <li key={3}><Link to="/register">Sign Up</Link></li>
			]
		}
	}

	render(){
		return (
		<nav className="navbar navbar-inverse">
		  <div className="container">
		    <div className="navbar-header">
		      <Link to="/" className="navbar-brand">
		       		Redux Todos
		      </Link>
		    </div>
		    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		        <ul className="nav navbar-nav navbar-right">
		          {this.renderLinks()}
		        </ul>
      		</div>{/* /.navbar-collapse */}
		  </div>
		</nav>
		);
	}
}

function mapStateToProps(state){
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(mapStateToProps, actions)(Header);