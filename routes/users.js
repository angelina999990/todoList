var db = require('../config/db'),
    sequelize = require('sequelize'),
    User = require('../models/user'),
    user = new User(db, sequelize),
    Todo = require('../models/todo'),
    todo = new Todo(db,sequelize),
    Chance = require('chance'),
    chance = new Chance();

user.associate(todo);
module.exports.controller = function(app) {
  app.get('/addUsers', function(req, res) {
    db.sync()
      .then(function() {
        user.create({
          firstName : chance.first(),
          lastName : chance.last(),
          email : chance.email(),
          password : chance.word()
        }).then(function(userInstance) {
          res.writeHead(200, { 'Content-Type': 'application/json'});
          var resData = JSON.stringify(userInstance.dataValues);
          res.end(resData);
        });
      });
  });

  app.get('/user/:id/todos', function(req, res) {
    user.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(user){
      user.getTodos().then(function(todoArr){
        var todos = [];
        todoArr.forEach(function(item){
          item.dataValues.creator = user;
          todos.push(item);
        });
        res.writeHead(200, { 'Content-Type': 'application/json'});
        var resData = JSON.stringify({
          records: todos
        });
        // console.log(resData);
        res.end(resData);
      });
    });
  });
};
