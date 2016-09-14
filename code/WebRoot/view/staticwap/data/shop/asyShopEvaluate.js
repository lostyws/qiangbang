/**
 * Created by Administrator on 2016/5/20.
 */
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
        code: 0,
        data: {evaluate: {evaluateList: []}},
        evaluate: {evaluateList: []},
        evaluateList: [],
        success: true
    }

    res.writeHead(200, {
        'Context-Type': 'application/x-www-form-urlencode',
        'Access-Control-Allow-Origin': '*'
    })
    // res.end(callback+'('+JSON.stringify(data)+')');
    //

    res.end(JSON.stringify(data));
}).listen(3002, function() {
    console.log('3002 shop asyShopEvaluate server is runing...')
})
