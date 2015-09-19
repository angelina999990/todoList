var Backbone = require('backbone'),
    Collection = require('./todos/collection'),
    Model = require('./todos/model'),
    TodoList = require('./todos/todo-list'),
    Detail = require('./todos/detail'),
    $ = require('jquery');

var Router = Backbone.Router.extend({
  routes: {
    '': 'list',
    'todo/:id': 'detail'

  },

  list: function() {
    var todos = new Collection();
    todos.getList().then(function(){
      var todoList = new TodoList({
        collection: todos
      });
      $(".container").html(todoList.render().el);
    });
  },

  detail: function(id) {
    var model = new Model();
    model.getDetail(id).then(function(){
      var detail = new Detail({
        model: model
      });
      $(".container").html(detail.render().el);
    });
  }
});

module.exports = Router;
