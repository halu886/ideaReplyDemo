/**
 * 数据库的连接
 */
var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/demo';
/**
 * 连接
 */
mongoose.connect(url);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('mongodb connect to ' + url);
});

mongoose.connection.on('error', function (err) {
    console.error('mongodb error ' + err);
})

mongoose.connection.on('disconnected', function () {
    console.log('mongodb disconnected');
})

module.exports = mongoose;
