var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

var app = express();

app.use(session({secret: 'todosecret'}))

/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next) {
  if (typeof(req.session.todolist) == 'undefined') {
    req.session.todolist = [];
  }
  next();
})

.get('/todo', function(req, res) {
  res.render('todo.ejs', {title: 'test'});
})

.use(function(req, res, next) {
  res.redirect('/todo');
})

.listen(8080);
