import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class TodoForm extends Component {
	constructor(props){
		super(props);
		this.state = { value: '' }

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event){
		this.setState({ value: event.target.value });
	}

	onFormSubmit(e){
		e.preventDefault();
		this.props.addTodo(this.state.value);
		this.setState({ value: '' });
	}

	render(){
		return (
		<div className="container">
			<div className="row">
				<div className="col-md-8 col-md-offset-2">
					<div className="well">
						<h1>Redux Todos</h1>
						<form onSubmit={this.onFormSubmit}>
							<div className="form-group">
							    <label htmlFor="formGroupExampleInput">Add a Todo</label>
							    <input type="text"
							          	className="form-control" 
							          	id="formGroupExampleInput" 
							          	placeholder="Todo Title"
							          	value={this.state.value}
							          	onChange={this.onInputChange}
							          	 />
							</div>
							<button type="submit" className="btn btn-primary">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>		
		);
	}
}

export default connect(null, actions)(TodoForm);