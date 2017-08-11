/**
 * 意见对象
 */
var mongoose = require('./mongoose');

/**
 *     	this.productType = idea.productType;//产品类型
	this.headLine = idea.headLine;//标题
	this.phoneNum = idea.phoneNum;//联系方式
	this.status = idea.status;//状态 （待回复/已回复/已完结）
	this.reply = idea.reply;
	this.user_id = idea.user_id;//关联用户
 */
var ideaSchema = new mongoose.Schema({
    productType: String,
    headLine: String,
    phoneNum: String,
    status: String,
    reply: String,
    publishDate: Date,
    replyDate: Date,
    user_id: String
});

module.exports = mongoose.model('idea', ideaSchema)