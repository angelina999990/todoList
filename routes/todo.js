var db = require('../config/db'),
    sequelize = require('sequelize'),
    Todo = require('../models/todo'),
    todo = new Todo(db,sequelize),
    User = require('../models/user'),
    user = new User(db, sequelize),
    Chance = require('chance'),
    chance = new Chance();

todo.associate(user);

module.exports.controller = function(app) {
  app.route('/api/v1/todo/:id')
    .delete(function(req,res){
      todo.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(){
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end();
      });
    })
    .put(function(req,res){
      todo.update({
        done: req.body.done
      },
      {
        where: {
          id: req.body.id
        }
      }).then(function(affectedCount){
        todo.findById(req.body.id)
            .then(function(instance){
              res.writeHead(200, { 'Content-Type': 'application/json'});
              res.end(JSON.stringify(instance.dataValues));
            });
      });
    })
    .get(function(req,res){
      todo.findById(req.params.id)
          .then(function(instance){
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(instance.dataValues));
          });
    });

  app.route('/api/v1/todo')
    .get(function(req,res){
      todo.findAndCountAll({
        include: [
          { model: user, as: 'creator'}
        ]
      }).then(function(ref) {
        var records = [];
        ref.rows.forEach(function(item) {
          records.push(item);
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          records: records,
          totalRecords: ref.count
        })
        );
      });
    })
    .post(function(req,res){
      db.sync()
        .then(function() {
          todo.create({
            title : req.body.title,
            done : req.body.done,
            describe : chance.paragraph(),
            creatorId : chance.integer({min: 1, max: 3})
          }).then(function(todoInstance) {
            res.writeHead(200, { 'Content-Type': 'application/json'});
            var resData = JSON.stringify(todoInstance.dataValues);
            res.end(resData);
          });
        });
    });
};
