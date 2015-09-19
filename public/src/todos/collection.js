var Backbone = require('backbone');
var todoModel = require('./model');

module.exports = Backbone.Collection.extend({
  model: todoModel,

  url: 'http://localhost:7000/api/v1/todo',

  getList: function() {
    var self = this;
    return this.sync('read', this, null)
          .then(function(ref){
            self.reset(ref.records);
          });
  }
});
