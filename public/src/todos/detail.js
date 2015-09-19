var Backbone = require('backbone'),
    template = require('./detail-template');

module.exports = Backbone.View.extend({
  template: template,

  render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
  }
});
