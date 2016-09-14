var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
    var query = url.parse(req.url, true).query;
    var callback = query.callback || "callback";
    var data = {
        errcode: 0,
        msg: "查询成功",
        recordsFiltered: "14",
        recordsTotal: "14",
        status: 0 ,
        "data": [
            {
                user_social_id: '1',
                c_id: '2',
                social_type_name: '新增',
                user_social_name: '张3',
                certificate_number: 33111111,
                household_name: '农村',
                social_security_start_month: '201601',
                social_security_base: 3000,
                feedback_time: '2016-03-01 13:16:22',
                feedback_result: '撒旦撒旦撒',
                user_feedback : '2016.1.3 已确认上家停缴'
            }
        ]
    };
    res.writeHead(200, {
        'Context-Type': 'application/x-www-form-urlencode',
        'Access-Control-Allow-Origin': '*'
    });
    //res.end(callback+'('+JSON.stringify(data)+')');
    res.end(JSON.stringify(data));
}).listen(3003, function() {
    console.log('server is runing...');
});
