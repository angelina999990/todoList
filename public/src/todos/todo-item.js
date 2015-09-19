var Backbone = require('backbone'),
    template = require('./todo-item-template');

module.exports = Backbone.View.extend({
  template: template,

  tagName: 'li',
  className: 'list-group-item',

  events: {
    'click': 'handleClick',
    'click .destroy': 'handelDestroy',
    'click .toggle': 'handelToggel'
  },

  initialize: function() {
    this.model.on('remove', this.remove, this);
    this.model.on('change', this.render, this);
  },

  handleClick: function() {
    app.router.navigate('/todo/' + this.model.get('id'), {trigger: true});
  },

  handelDestroy: function(e) {
    e.stopPropagation(0);
    this.model.destroy();
    return this;
  },

  handelToggel: function(e){
    e.stopPropagation(0);
    this.model.save({
      done: !this.model.get('done')
    });
  },

  render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
  }
});
