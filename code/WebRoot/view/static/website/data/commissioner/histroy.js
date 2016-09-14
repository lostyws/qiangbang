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
        status: 0,
        "data": [{
            id: '2',
            time: '2016-03-01 13:16:22',
            type: '导出',
            fileUrl: 'http://www.baidu.com',
            fileName: 'asdasd'
        },{
            id: '1',
            time: '2016-03-01 13:16:22',
            type: '导出',
            fileUrl: 'http://www.baidu.com',
            fileName: 'asdasd'
        }]
    };

    res.writeHead(200, {
        'Context-Type': 'application/x-www-form-urlencode',
        'Access-Control-Allow-Origin': '*'
    });
    //res.end(callback+'('+JSON.stringify(data)+')');
    res.end(JSON.stringify(data));
}).listen(3005, function() {
    console.log('server is runing...');
});
