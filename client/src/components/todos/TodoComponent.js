import React, { Component } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default class TodoComponent extends Component {
	render(){
		return (
			<div>
				<TodoForm/>
				<TodoList/>
			</div>
		);
	}
}