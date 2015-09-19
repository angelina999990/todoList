var Sequelize = require('sequelize'),
    node_env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    config = require('./config')[node_env],
    db = new Sequelize(config.database, config.username, config.password, config.option);

module.exports = db;
