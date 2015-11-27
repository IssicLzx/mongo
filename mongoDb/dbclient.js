var mongoose = require('mongoose');    //引用mongoose模块

var createClient = function(config){

    var db = mongoose.createConnection(config.host, config.dbName); //创建一个数据库连接

    db.on('error',console.error.bind(console,'连接错误:'));

    return db;
};

module.exports = createClient;

