import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Loader from 'halogen/PulseLoader';
import * as actions from '../../actions/auth';

const renderInput = field => {
	// const input = field.input;
	// const type = field.type;
	const { input, type, meta: { error, touched } } = field;
		return (
			<div>
				<input {...input} type={type} className="form-control"/>
				{ touched && error && <div className="text-danger">{error}</div> }
			</div>
		)
}

class Login extends Component {
	handleFormSubmit({ username, password }){
		this.props.signInUser({ username, password });
	}

	renderAlert(){
		if(this.props.signinError){
			return (
				<div className="col-lg-12">
					<div className="col-lg-3 col-lg-offset-5 alert alert-danger">
						<strong>Oops!</strong> {this.props.signinError}
					</div>
				</div>
			);
		}
	}

	componentWillUpdate(nextProps){
		if(nextProps.authenticated){
			this.props.history.push('/todos');
		}
	}

	loader(){
		return (
			<div>
				<Loader color="#26A65B" size="16px" margin="4px"/>
			</div>
		);
	}

	render(){
		const { handleSubmit, fields: { username, password }} = this.props;

		return (
		<div className="container">
	  		<Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="form-horizontal">
	          <div className="form-group">
	            <h1 className="text-center">Login</h1>
	          </div>	
	          <div className="form-group">
	            <label htmlFor="inputEmail" className="col-lg-2 col-lg-offset-2 control-label">Username</label>
	            <div className="col-lg-6">
	              <Field name="username" 
	              type="text" 
	              className="form-control" 
	              placeholder="Username"
	              component={renderInput}
	              />
	            </div>
	          </div>
	          <div className="form-group">
	            <label htmlFor="inputPassword" className="col-lg-2 col-lg-offset-2 control-label">Password</label>
	            <div className="col-lg-6">
	              <Field name="password" 
	              type="password" 
	              className="form-control" 
	              placeholder="Password"
	              component={renderInput}
	              />
	            </div>
	          </div>
	          <div className="form-group">
	            <div className="col-lg-8 col-lg-offset-4">
	              <button action="submit" className="btn btn-primary">Sign In</button>
	            </div>
	          </div>
	          {this.renderAlert()}
	          { this.props.loader ? this.loader() : '' }
	          <div className="form-group">
	            <p className="text-center"><Link to="/register">Dont have an account? Click here to <strong>Sign up</strong></Link></p>
	          </div>
	      </Form>
      	</div>
		)
	}
}

function validate(formProps){
	const errors = {};
	const { username, password } = formProps;

	if(!username){
		errors.username = 'Please enter a Username';
	}

	if(!password){
		errors.password = 'Please enter a password';
	}

	if(!username && !password){
		errors.both = 'Please enter a Username and Password';
	}

	return errors;
}

function mapStateToProps(state){
	return { 
		signinError: state.auth.signinError, 
		authenticated: state.auth.authenticated,
		loader: state.loading.isFetching
	};
}

Login = connect(mapStateToProps, actions)(Login);
Login = reduxForm({
	form: 'login',
	fields: ['username', 'password'],
	validate
})(Login);

export default withRouter(Login);