var express = require('express');

var user = require('../routes/user');
var idea = require('../routes/idea');

module.exports = function (app) {
    /**主界面 */
    app.get('/', index);
    // app.get()


    //用户模块
    app.use('/user', user);

    //意见模块
    app.use('/idea', idea);

}

function index(req, res) {
    if (!req.session.user) {
        req.session.user = null;
        res.locals.user = null;
        // res.locals.error = null;
    }
    return res.render("index", {
        title: "webixDemo",
        content: "express+node.js+mongodb+webix    demo",
        author: "halu"
    })
}

