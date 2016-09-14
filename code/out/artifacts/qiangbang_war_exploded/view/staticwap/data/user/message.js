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
        status: 0,
        data: {
            total: "9",
            message: [{
                message_id: "25270",
                message_parent_id: "0",
                from_member_id: "0",
                to_member_id: "9629",
                message_title: "订单支付提醒",
                message_body: "亲，我们为您未支付的订单最多保留7天。截止到明天24点将有1笔订单到期被取消，请及时处理哦~http://localhost:8080/view/wap/user/me.jsp",
                message_time: "1445965801",
                message_update_time: null,
                message_open: "1",
                message_state: "0",
                message_type: "3",
                read_member_id: null,
                del_member_id: null,
                message_ismore: "0",
                from_member_name: null,
                to_member_name: null
            }, {
                message_id: "25020",
                message_parent_id: "0",
                from_member_id: "0",
                to_member_id: "9629",
                message_title: "新的需求",
                message_body: "用户23234545发布了需求，您可进行报价竞标http://localhost:8080/view/wap/task/details.jsp",
                message_time: "1445706601",
                message_update_time: null,
                message_open: "1",
                message_state: "0",
                message_type: "3",
                read_member_id: null,
                del_member_id: null,
                message_ismore: "0",
                from_member_name: null,
                to_member_name: null
            }, {
                message_id: "25019",
                message_parent_id: "0",
                from_member_id: "0",
                to_member_id: "9629",
                message_title: "订单支付提醒",
                message_body: "亲，我们为您未支付的订单最多保留7天。截止到明天24点将有1笔订单到期被取消，请及时处理哦~",
                message_time: "1445706601",
                message_update_time: null,
                message_open: "1",
                message_state: "0",
                message_type: "3",
                read_member_id: null,
                del_member_id: null,
                message_ismore: "0",
                from_member_name: null,
                to_member_name: null
            }, {
                message_id: "24474",
                message_parent_id: "0",
                from_member_id: "0",
                to_member_id: "9629",
                message_title: "订单支付提醒",
                message_body: "亲，我们为您未支付的订单最多保留7天。截止到明天24点将有1笔订单到期被取消，请及时处理哦~",
                message_time: "1445274601",
                message_update_time: null,
                message_open: "1",
                message_state: "0",
                message_type: "3",
                read_member_id: null,
                del_member_id: null,
                message_ismore: "0",
                from_member_name: null,
                to_member_name: null
            }, {
                message_id: "24348",
                message_parent_id: "0",
                from_member_id: "0",
                to_member_id: "9629",
                message_title: "订单支付提醒",
                message_body: "亲，我们为您未支付的订单最多保留7天。截止到明天24点将有1笔订单到期被取消，请及时处理哦~",
                message_time: "1445101802",
                message_update_time: null,
                message_open: "1",
                message_state: "0",
                message_type: "3",
                read_member_id: null,
                del_member_id: null,
                message_ismore: "0",
                from_member_name: null,
                to_member_name: null
            }, {
                message_id: "24347",
                message_parent_id: "0",
                from_member_id: "0",
                to_member_id: "9629",
                message_title: "订单支付提醒",
                message_body: "亲，我们为您未支付的订单最多保留7天。截止到明天24点将有1笔订单到期被取消，请及时处理哦~",
                message_time: "1445101802",
                message_update_time: null,
                message_open: "1",
                message_state: "0",
                message_type: "3",
                read_member_id: null,
                del_member_id: null,
                message_ismore: "0",
                from_member_name: null,
                to_member_name: null
            }, {
                message_id: "23719",
                message_parent_id: "0",
                from_member_id: "0",
                to_member_id: "9629",
                message_title: "及时参保提醒",
                message_body: "亲，系统检测到您的参保人“大幅度反弹”将于3天后过本月缴纳时间，请及时参保哦~~",
                message_time: "1444496704",
                message_update_time: null,
                message_open: "0",
                message_state: "0",
                message_type: "3",
                read_member_id: null,
                del_member_id: null,
                message_ismore: "0",
                from_member_name: null,
                to_member_name: null
            }, {
                message_id: "23251",
                message_parent_id: "0",
                from_member_id: "0",
                to_member_id: "9629",
                message_title: "订单支付提醒",
                message_body: "亲，我们为您未支付的订单最多保留7天。截止到明天24点将有1笔订单到期被取消，请及时处理哦~",
                message_time: "1443978602",
                message_update_time: null,
                message_open: "1",
                message_state: "0",
                message_type: "3",
                read_member_id: null,
                del_member_id: null,
                message_ismore: "0",
                from_member_name: null,
                to_member_name: null
            }, {
                message_id: "23250",
                message_parent_id: "0",
                from_member_id: "0",
                to_member_id: "9629",
                message_title: "订单支付提醒",
                message_body: "亲，我们为您未支付的订单最多保留7天。截止到明天24点将有1笔订单到期被取消，请及时处理哦~",
                message_time: "1443978601",
                message_update_time: null,
                message_open: "1",
                message_state: "0",
                message_type: "3",
                read_member_id: null,
                del_member_id: null,
                message_ismore: "0",
                from_member_name: null,
                to_member_name: null
            }]
        }

    }
    res.writeHead(200, {
            'Context-Type': 'application/x-www-form-urlencode',
            'Access-Control-Allow-Origin': '*'
        })
        // res.end(callback+'('+JSON.stringify(data)+')');
        //

    res.end(JSON.stringify(data));
}).listen(3004, function() {
    console.log('3004 user message server is runing...')
})
