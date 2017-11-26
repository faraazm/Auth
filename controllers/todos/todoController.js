const Todo = require('../../models/todo');
const User = require('../../models/user');

exports.getTodos = (req, res, next) => {
	Todo.find({ user: req.user._id })
	.then(result => res.send(result))
	.catch(err => next(err));
}

exports.saveTodo = (req, res, next) => {
	const text = req.body.text;
	if(!text){
		res.status(400);
		res.json({ "error": "Invalid Data" });
	}
	
	const todo = new Todo({
		text: text,
		completed: false,
		user: req.user._id
	});

	todo.save((err, result) => {
		if(err){
			res.send(err);
		} else {
			res.send(result);
		}
	})
}

exports.deleteTodo = (req, res, next) => {
	const id = req.params.id;

	Todo.remove({ _id : id }, (err, result) => {
		if(err){
			res.send(err);
		} else {
			res.send({ id: id });
		}
	})
}

exports.editTodo = (req, res, next) => {
	const id = req.params.id;
	const text = req.body.text;

	Todo.findById(id, (err, todo) => {
		if(err){
			res.send(err);
		} else {
			todo.text = text;

			todo.save((err, result) => {
				if(err){
					res.send(err);
				}
				res.send(result);
			});
		}
	})
}

exports.complete = (req, res, next) => {
	const id = req.params.id;
	const completed = req.body.complete;

	Todo.findById(id, (err, todo) => {
		if(err){
			res.send(err);
		} else {
			todo.completed = !completed;

			todo.save((err, result) => {
				if(err){
					res.send(err);
				}
				res.send(result);
			})
		}
	})
}