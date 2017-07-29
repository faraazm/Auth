import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
	<div className="container">
	<div className="jumbotron text-center">
	  <h2>MERN Todos Starter Kit</h2>
	  <br/>
	  <p>This is a simple MERN (MongoDB, Express, React, Node) App.</p>
	  <p>This app includes an Express REST API with Authentication, and User Encryption.</p>
	  <p>On the client side, the app is using Redux to manage Application Level State, Redux Form for Form Validation,
	  and React Router for navigation.</p>
	  <p><Link className="btn btn-primary" to="/register">Register Now</Link></p>
	  <h4><Link to="/login">Already Have an Account? Click here to <strong>Sign in</strong></Link></h4>
	</div>
	</div>
)

export default Home;