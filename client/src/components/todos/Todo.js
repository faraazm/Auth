import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Todo extends Component {
	constructor(props){
		super(props);

		this.state = {
			editMode: false,
			edit: 'Edit',
			value: this.props.text,
			checked: this.props.completed
		}

		this.editToggle = this.editToggle.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.editTodo = this.editTodo.bind(this);
		this.completeTodo = this.completeTodo.bind(this);
	}

	editToggle(){
		this.setState({ 
			editMode: !this.state.editMode,
			edit: this.state.editMode ? 'Edit' : 'Cancel Edit' });
	}

	onInputChange(event){
		this.setState({ value: event.target.value });
	}

	deleteTodo(){
		this.props.deleteTodo(this.props._id);
	}

	editTodo(e){
		e.preventDefault();
		this.props.editTodo(this.props._id, this.state.value);
		this.setState({ editMode: false, edit: 'Edit' });
	}

	completeTodo(){
		this.setState({ checked: !this.state.checked });
		this.props.completeTodo(this.props._id, this.state.checked);
	}

	render(){
		return (
			<div>
				<li className="list-group-item" style={{ textDecoration: this.state.checked ? 'line-through' : 'none' }}>
					<span className="badge" onClick={this.deleteTodo}>Delete</span>
					<span className="badge" onClick={this.editToggle}>{this.state.edit}</span>
					<input onClick={this.completeTodo} checked={this.state.checked} type="radio" id="optionsRadios1"/>
					<span><h3>{this.props.text}</h3></span>
					<h5>ID: {this.props._id}</h5>
					{
					this.state.editMode ?
					<form className="bs-component" onSubmit={this.editTodo}>
	                    <div className="form-group">
	                      <div className="input-group">
						    <span className="input-group-addon">Edit Todo</span>
						    <input type="text" placeholder="Edit Todo" className="form-control" value={this.state.value} onChange={this.onInputChange}/>
						    <span className="input-group-btn">
						      <button className="btn btn-success" type="submit">Submit</button>
						    </span>
						  </div>
	                    </div>
	                </form>
					: null
					}
				</li>
			</div>
		);
	}
}

export default connect(null, actions)(Todo);