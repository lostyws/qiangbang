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
        "status":0,
        "data":{"filename":"http://img.joyowo.com/formal/wuyoubao/positive_identification/201605221359bd50e430-0192-4c09-9be3-ad8e4727dbac.jpg"}

    }
    res.writeHead(200, {
            'Context-Type': 'application/x-www-form-urlencode',
            'Access-Control-Allow-Origin': '*'
        })
        // res.end(callback+'('+JSON.stringify(data)+')');
        //

    res.end(JSON.stringify(data));
}).listen(3001, function() {
    console.log('3001 user personreg server is runing...')
})
