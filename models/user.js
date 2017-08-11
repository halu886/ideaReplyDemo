/**
 * 用户模块
 */
var mongoose = require('./mongoose');

var db = mongoose.connection;

var userSchema = new mongoose.Schema({
    // _id: { type: ObjectId },

    userName: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);