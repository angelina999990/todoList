var Backbone = require('backbone'),
    Model = require('./model'),
    TodoItem = require('./todo-item'),
    template = require('./todo-list-template');


module.exports = Backbone.View.extend({
  template: template,
  className: 'col-lg-6 col-lg-offset-3',

  events: {
    'keypress #new-todo': 'createOnEnter'
  },

  initialize: function() {
    this.collection.on('add', this.addOne, this);
    this.collection.on('destroy', this.delOne, this);
    this.$el.html(this.template({}));
    this.addAll();
  },

  addAll: function() {
    this.collection.each(this.addOne, this);
    return this;
  },

  addOne: function(todoModel) {
    var ItemView = new TodoItem({
      model: todoModel
    });
    this.$el.find("#todo-list").append(ItemView.render().el);
    return this;
  },

  createOnEnter: function(e) {
    var self = this;
    if (e.keyCode != 13) return;

    if (!this.$el.find("#new-todo").val()) return;

    var model = new Model({
      title: this.$el.find("#new-todo").val(),
      done: false
    });
    model.save().then(function(){
      self.collection.add(model);
    });

    this.$el.find("#new-todo").val('');
    return this;
  },

  delOne: function(model) {
    this.collection.remove(model);
  }
});
