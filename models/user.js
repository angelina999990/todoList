'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        /*
         * as: 是 getter 和 setter 的方法名。 foreignKey 是插入到target model (即参数model)的字段名
         */
        this.hasMany(models, {as: 'Todos', foreignKey: 'creatorId'});
      }
    }
  });
  return User;
};
