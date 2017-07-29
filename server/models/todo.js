const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	text: String,
	completed: Boolean,
	user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Todo', todoSchema);