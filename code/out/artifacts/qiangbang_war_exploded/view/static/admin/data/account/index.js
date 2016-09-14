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
        recordsFiltered: 26, //总计记录条数
        recordsTotal: 26,//总计记录条数
        expenseMoney:'1223.00',//支出总计
        incomeMoney:'3443.00',//收入总计
        data: [
            {
                id:1,
                orderNumber: 'o12233333',//订单号
                category : 0, //类别（0支出 1收入）
                money: '1233',//金额
                createTime:'2016-05-15 16:54',//创建时间
                mark: '订单保价' //备注

            },{
                id:1,
                orderNumber: 'o122333444',//订单号
                category : 0, //类别（0支出 1收入）
                money: '1233',//金额
                createTime:'2016-05-15 16:54',//创建时间
                mark: '订单保价' //备注

            },{
                id:1,
                orderNumber: 'o12233333',//订单号
                category : 1, //类别（0支出 1收入）
                money: '1233',//金额
                createTime:'2016-05-15 16:54',//创建时间
                mark: '订单补差' //备注

            },{
                id:1,
                orderNumber: 'o12233333',//订单号
                category : 0, //类别（0支出 1收入）
                money: '1233',//金额
                createTime:'2016-05-15 16:54',//创建时间
                mark: '订单退款' //备注

            }
            


        ]
        
    }
    res.writeHead(200, {
            'Context-Type': 'application/x-www-form-urlencode',
            'Access-Control-Allow-Origin': '*'
        })
        // res.end(callback+'('+JSON.stringify(data)+')');
        //

    res.end(JSON.stringify(data));
}).listen(3005, function() {
    console.log('3005 account server is runing...')
})
