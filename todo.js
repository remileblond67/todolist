var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

var app = express();

var title = 'Gestionnaire de tâches';


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
  res.render('todo.ejs', {title: title, todolist: req.session.todolist});
})

.get('/todo/del/:id', function(req, res) {
  if (req.params.id != '') {
      req.session.todolist.splice(req.params.id, 1);
  }
  res.redirect('/todo');
})

.post('/todo/add/', urlencodedParser, function(req, res) {
  if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
  }
  res.redirect('/todo');
})

.use(function(req, res, next) {
  res.redirect('/todo');
})

.listen(8080);
