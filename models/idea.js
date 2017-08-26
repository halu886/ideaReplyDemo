/**
 * 意见对象
 */
var mongoose = require('./mongoose');

var ideaSchema = new mongoose.Schema({
    productType: String, //产品类型
    headLine: String,  //标题
    phoneNum: String,  //联系方式
    status: String,    //状态 已回复/未回复/已完成
    reply: String,      //回复
    publishDate: Date,  //发布日期
    replyDate: Date,    //回复日期
    fileName: Array,    //图片名称
    filePath: Array,    //文件路径
    user_id: String    //引用用户ID
});

module.exports = mongoose.model('idea', ideaSchema)