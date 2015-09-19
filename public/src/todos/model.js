var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: window.LOCALPATH + 'api/v1/todo',

  getDetail: function(id) {
    var self = this;
    return this.sync('read', this, {
      url: window.LOCALPATH + 'api/v1/todo/' + id
    }).then(function(ref){
      self.set(ref);
    });
  }
});
