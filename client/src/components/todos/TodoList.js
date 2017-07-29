import React, { Component } from 'react';
import { connect } from 'react-redux';
import Todo from './Todo';
import * as actions from '../../actions';

class TodoList extends Component {
	componentWillMount(){
		this.props.fetchTodos();
	}

	renderTodos(){
		return this.props.todos.map((todo) => {
			return (
				<Todo key={todo._id} {...todo} />
			)
		});
	}

	render(){
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<ul className="list-group">
							{this.renderTodos()}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { todos: state.todos };
}

export default connect(mapStateToProps, actions)(TodoList);