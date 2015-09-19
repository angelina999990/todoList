var User = require('./user');
'use strict';

module.exports = function(sequelize, Datatypes) {
  var Todo = sequelize.define('Todo', {
    title: Datatypes.STRING,
    done: Datatypes.BOOLEAN,
    describe: Datatypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        /*
         * as 指代 target model 的别名，belongsTo方法里面默认生成的foreignKey名为 targetModelName + targetPrimaryKeyName
         * 所以这里即使不指定foreignKey 也会生成creatorId 为字段名
         */
        this.belongsTo(models, {as: 'creator', foreignKey: 'creatorId'});
      }
    }
  });
  return Todo;
};
