const express = require('express');
const router = express.Router();
const Todo = require('../controllers/todos/todoController');
const Home = require('../controllers/home');

const passport = require('passport');

/* GET home page. */
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/todos', requireAuth, Todo.getTodos);
router.post('/todo', requireAuth, Todo.saveTodo);
router.delete('/todo/:id', requireAuth, Todo.deleteTodo);
router.put('/todo/:id', requireAuth, Todo.editTodo);
router.put('/completetodo/:id', requireAuth, Todo.complete);

router.get('/home', requireAuth, Home.getHomePage);

module.exports = router;
