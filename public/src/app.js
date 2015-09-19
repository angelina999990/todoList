var Backbone = require('backbone'),
    Router = require('./router');

var app = {};

if (Backbone.history){
  app.router = new Router();
  Backbone.history.start();
}

window.app = app;
