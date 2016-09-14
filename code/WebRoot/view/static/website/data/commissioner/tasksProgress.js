var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
    var query = url.parse(req.url, true).query;
    var callback = query.callback || "callback";
    var data = {
        errcode: 0,
        "data": {
            insured: { //新增
                total: 20001, //总人数
                notExported: 10, // 未导出
                exportedNoFeedback: 2001, //导出未反馈
                exportedSuccess: 343, //导出申报成功
                exportedFail: 17647 //导出申报失败
            },
            stop: { //停保
                total: 20001,
                notExported: 1000,
                exportedNoFeedback: 2001,
                exportedSuccess: 343,
                exportedFail: 16657
            },
            renewal: { //续保
                total: 20001
            }
        }
    };

    res.writeHead(200, {
        'Context-Type': 'application/x-www-form-urlencode',
        'Access-Control-Allow-Origin': '*'
    });
    //res.end(callback+'('+JSON.stringify(data)+')');
    res.end(JSON.stringify(data));
}).listen(3001, function() {
    console.log('server is runing...');
});
