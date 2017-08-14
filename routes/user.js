/**
 * 用户相关操作
 */

var User = require('../models/user')
var crypto = require('crypto');

var express = require('express');

var router = express.Router();


//用户登录
router.get('/login', function (req, res) {
    res.render('login');
})



//用户登录表单提交
router.post('/login', function (req, res) {
    var result = {}
    result.status = false;
    result.message = '登录失败';
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest("base64");

    var newUser = { userName: req.body.userName, password: password };

    User.find(newUser, function (err, user) {
        if (err || user.length != 1) {
            result.mmessage = '用户异常'

        } else {
            user = user[0];
            if (user.password == password) {
                req.session.user = user;
                result.message = '登录成功';
                result.status = true;
            } else {
                result.message = '密码错误';
            }
        }
        return res.send(result);
    })
});

//注册
router.get('/reg', function (req, res) {
    res.render('reg', {
        title: '用户注册'
    });
});

//注册表单提交
router.post('/reg', function (req, res) {
    //检验用户两次输入口令是否一致
    var result = {};
    result.status = false;
    result.message = '注册失败';

    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({ userName: req.body.userName, password: password });

    //检查用户名是否已经存在
    // User.fi
    // User.fin
    User.find({ userName: req.body.userName }, function (err, user) {
        if (user.length) {
            err = '用户名已存在';
        }
        if (err) {
            result.message = err;
            return res.send(result);
        }
        // newUser.
        newUser.save(function (err, resUser) {
            if (err) {
                result.message = err;
                return res.send(result);
            } else {
                req.session.user = newUser;
                result.message = '注册成功';
                result.status = true;
            }
            return res.send(result);
        });
    })
});

//用户登出
router.get('/logout', function (req, res) {
    req.session.user = null;
    // req.flash('success', '登出成功');
    // res.locals.success = '登出成功'
    res.send({ status: true, message: '登出成功' });
});


module.exports = router;