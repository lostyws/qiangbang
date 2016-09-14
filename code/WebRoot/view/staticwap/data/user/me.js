var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
    var query = url.parse(req.url, true).query;
    var callback = query.callback || "callback";

    /** ----------------------------------------
     * 请求参数格式数据说明
     * type: POST
     * -----------------------------------------
     */




    var data = {
        page: 1,
        total: 1,
        code:0,
        total_page: 1,
        list: [{
            taskId: 7536250,
            user_id: "",
            nickname: "",
            title: "我是来测试的",
            at_amount: 0,
            amount: 100,
            hosted: "",
            mode: 13,
            works_num: 0,
            createtime: "",
            sl_nickname: "",
            stattime: "",
            endtiem: "",
            date: "",
            state: 9,
            status: "交易失败",
            deadline: 0,
            modeMsg: "招标",
            cateogryId: 0,
            taskSource: "",
            taskType: "0"
        }, {
            taskId: 7478983,
            user_id: "",
            nickname: "",
            title: "首页前端开发与设计",
            at_amount: 0,
            amount: 500,
            hosted: "",
            mode: 13,
            works_num: 10,
            createtime: "",
            sl_nickname: "",
            stattime: "",
            endtiem: "",
            date: "",
            state: 9,
            status: "交易失败",
            deadline: 0,
            modeMsg: "招标",
            cateogryId: 0,
            taskSource: "",
            taskType: "0"
        }, {
            taskId: 7346406,
            user_id: "",
            nickname: "",
            title: "我需要做APP开发",
            at_amount: 0,
            amount: 11111,
            hosted: "",
            mode: 13,
            works_num: 0,
            createtime: "",
            sl_nickname: "",
            stattime: "",
            endtiem: "",
            date: "",
            state: 9,
            status: "交易失败",
            deadline: 0,
            modeMsg: "招标",
            cateogryId: 0,
            taskSource: "",
            taskType: "0"
        }]

    }
    res.writeHead(200, {
            'Context-Type': 'application/x-www-form-urlencode',
            'Access-Control-Allow-Origin': '*'
        })
        // res.end(callback+'('+JSON.stringify(data)+')');
        //

    res.end(JSON.stringify(data));
}).listen(3000, function() {
    console.log('3000 user me server is runing...')
})
