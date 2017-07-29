import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { reduxForm, Field, Form } from 'redux-form';
import Loader from 'halogen/PulseLoader';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

const renderInput = field => {
	// const input = field.input;
	// const type = field.type;
	const { input, type, placeholder, meta: { error, touched } } = field;
		return (
			<div>
				<input {...input} type={type} placeholder={placeholder} className="form-control"/>
				{ touched && error && <div className="text-danger">{error}</div> }
			</div>
		)
}

class Register extends Component {
	handleFormSubmit({ username, password }){
		this.props.signupUser({ username, password });
	}

	renderAlert(){
		if(this.props.signupError){
			return (
				<div className="col-lg-12">
					<div className="col-lg-3 col-lg-offset-5 alert alert-danger">
						<strong>Oops!</strong> {this.props.signupError}
					</div>
				</div>
			);
		} else if(this.props.signupSuccess){
			return (
				<div className="col-lg-12">
					<div className="col-lg-3 col-lg-offset-5 alert alert-success">
						<strong>Success!</strong> {this.props.signupSuccess}
					</div>
				</div>
			);
		}
	}

	render(){
		const { handleSubmit, fields: { username, password, confirmPassword }} = this.props;

		return (
			<div className="container">
			  		<Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="form-horizontal">
			          <div className="form-group">
			            <h1 className="text-center">Sign Up</h1>
			          </div>	  		
			          <div className="form-group">
			            <label htmlFor="inputEmail" className="col-lg-2 col-lg-offset-2 control-label">Username</label>
			            <div className="col-lg-6">
			              <Field 
			              type="text" 
			              className="form-control"
			              placeholder="Username"
			              name="username"
			              component={renderInput}
			              />
			            </div>
			          </div>
			          <div className="form-group">
			            <label htmlFor="inputPassword" className="col-lg-2 col-lg-offset-2 control-label">Password</label>
			            <div className="col-lg-6">
			              <Field 
			              type="password" 
			              className="form-control"
			              placeholder="Password"
			              name="password"
			              component={renderInput}
			              />			            </div>
			          </div>
			          <div className="form-group">
			            <label htmlFor="inputPassword" className="col-lg-2 col-lg-offset-2 control-label">Confirm Password</label>
			            <div className="col-lg-6">
			              <Field 
			              type="password" 
			              className="form-control"
			              placeholder="Confirm Password"
			              name="confirmPassword"
			              component={renderInput}
			              />			            </div>
			          </div>
			          <div className="form-group">
			            <p className="text-center"><Link to="/login">Already Have an Account? Click here to <strong>Sign in</strong></Link></p>
			          </div>
			          <div className="form-group">
			            <div className="col-lg-8 col-lg-offset-4">
			              <button type="submit" className="btn btn-primary">Register</button>
			            </div>
			          </div>
			          {this.renderAlert()}
			      </Form>
		      </div>
		);
	}
};

function validate(formProps){
	const errors = {};
	const { username, password, confirmPassword } = formProps;

	if(!username){
		errors.username = 'Please enter a Username';
	}

	if(!password){
		errors.password = 'Please enter a password';
	}

	if(!confirmPassword){
		errors.confirmPassword = 'Please confirm the password';
	}

	if(password !== confirmPassword){
		errors.password = '';
		errors.confirmPassword = 'Passwords must match';
	}

	if(!username && !password){
		errors.both = 'Please enter a Username and Password';
	}

	return errors;
}

function mapStateToProps(state){
	return { 
		signupError: state.auth.signupError,
		signupSuccess: state.auth.signupSuccess,
		authenticated: state.auth.authenticated,
		loader: state.loading.isFetching
	};
}

Register = connect(mapStateToProps, actions)(Register);
Register = reduxForm({
	form: 'Register',
	fields: ['username', 'password', 'confirmPassword'],
	validate
})(Register);

export default withRouter(Register);