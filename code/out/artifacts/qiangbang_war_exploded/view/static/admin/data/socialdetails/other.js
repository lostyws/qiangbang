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
        recordsFiltered: 26,
        recordsTotal: 26,
        data: [
            {
                id:1,
                communicate_time: '2016-01-15  13：12：30',//沟通时间
                communicate_content : '公司HR电话咨询进展，情绪急躁',  //内容
                operation_staff : '杨文寿', //操作员
                is_transact: '是',//是否有待办
                transact_result: '' //待办事项处理结果

            },
            {
                id:2,
                communicate_time: '2016-01-15  13：12：30',//沟通时间
                communicate_content : '公司HR电话咨询进展，情绪急躁',  //内容
                operation_staff : '杨文寿', //操作员
                is_transact: '是',//是否有待办
                transact_result: '' //待办事项处理结果

            },
            {
                id:3,
                communicate_time: '2016-01-15  13：12：30',//沟通时间
                communicate_content : '公司HR电话咨询进展，情绪急躁',  //内容
                operation_staff : '杨文寿', //操作员
                is_transact: '否',//是否有待办
                transact_result: '' //待办事项处理结果

            },


        ]
    }
    res.writeHead(200, {
            'Context-Type': 'application/x-www-form-urlencode',
            'Access-Control-Allow-Origin': '*'
        })
        // res.end(callback+'('+JSON.stringify(data)+')');
        //

    res.end(JSON.stringify(data));
}).listen(3002, function() {
    console.log('3002 server is runing...')
})
