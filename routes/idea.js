// exports
// module.exports = function () {
//     // test
//     console.log('test');
// }

var router = require("express").Router();

var Idea = require('../models/idea');

// export
module.exports = router;

//跳转意见回复
router.get('/reply', function (rep, res) {
    res.render('reply');
});

//意见删除
router.delete('delete', function (req, res) {
    var result = {};
    result.status = false;
    if (!req.body._id) {
        result.message = '删除失败';
        return res.send(result);
    }

    var query = { _id: req.body._id };

    Idea.remove(query, function (err) {
        if (err) {
            result.message = err;
            return res.send(result);
        }
        result.status = true;
        result.message = "删除成功";
        return res.send(result);
    });

});

//获取意见
router.get('/get', function (req, res, next) {
    var query = {};
    if (!!req.session.user) {//当用户未登录时,获取所有意见数据
        query.user_id = req.session.user._id;
    }
    Idea.find(query, function (err, ideas) {
        if (err) {
            res.locals.error = err;
            res.redirect('/');
        }
        return res.send(ideas);
    })

});

//提交意见
router.post('/put', function (req, res) {
    var resData = {};
    resData.status = false;//res的data状态默认为false
    if (!req.session.user) {
        resData.message = '用户不存在'
        return res.send(resData);
    }
    var ideaParam = {
        // _id: null,
        productType: req.body.productType,
        headLine: req.body.headLine,
        phoneNum: req.body.phoneNum,
        status: '待回复',
        publishDate: new Date(),
        replyDate: null,
        user_id: req.session.user._id
    }
    var idea = new Idea(ideaParam);

    idea.save(function (err) {
        if (err) {
            resData.message = err;
            return res.send(resData);
        }
        resData.message = '添加成功';
        resData.status = true;
        return res.send(resData);
    });
});



//通过类型获取意见
router.post('/getByType', function (req, res) {
    var result = {};
    // var query = {};
    result.status = false;

    var query = req.body.query;
    query = JSON.parse(query);

    if (!query.productType) {
        result.message = '参数为空,查询失败';
        return res.send(result);
    }

    Idea.find(query, function (error, ideaDatas) {
        if (error) {
            result.message = error;
            return res.send(result);
        }
        result.status = true;
        result.message = '查询成功';
        result.ideaDatas = ideaDatas;
        return res.send(result);
    });
});

//意见回复
router.post('/reply', function (req, res) {
    var result = {};
    result.status = false;
    if (!req.body._id && !req.body.reply) {
        result.message = '意见为空,回复失败';
        return res.send(result);
    }
    Idea.findByIdAndUpdate(req.body._id,
        { reply: req.body.reply, status: '已回复', replyDate: new Date() },
        function (err) {
            if (err) {
                result.message = err;
                return res.send(result);
            }
            // return res.send(result);
            var query = JSON.parse(req.body.query);
            Idea.find(query, function (err, ideaDatas) {
                if (err) {
                    result.message = err;
                    return res.send(result);
                }
                result.ideaDatas = ideaDatas;//将意见传入前端作为刷新加载
                result.status = true;
                result.message = '回复成功';
                return res.send(result);
            })

        });
});

router.get('/over', function (req, res) {
    var result = {};
    result.status = false;
    result.message = '完结失败';
    if (req.body._id) {
        return res.send(result);
    }
    Idea.remove({ _id: req.body._id }, function (err) {
        if (!err) {
            result.status = true;
            result.message = '完结成功';
        }
        return res.send(result);
    })
})