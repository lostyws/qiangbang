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
                id:1,//订单id
                orderNumber: 'zd09090923',//订单号
                userName : 'webtest01',  //买家
                userId:12,//买家id
               
                transactionAmount: '1233.00',//交易金额
                releaseTime:'2016-05-15 13:24',//创建时间
                
                type:1,//或者小强直接显示文案 1关闭需求 2.申请退款 3.系统自动退款 4.用户提现 //
                isaudit:1,//审核 0 不显示 1显示
            },{
                id:1,//订单id
                orderNumber: 'zd09090923',//订单号
                userName : 'webtest01',  //买家
                userId:12,//买家id
               
                transactionAmount: '1233.00',//交易金额
                releaseTime:'2016-05-15 13:24',//创建时间
                
                type:1,//1关闭需求 2.申请退款 3.系统自动退款 4.用户提现
                isaudit:1,//审核 0 不显示 1显示
            },{
                id:1,//订单id
                orderNumber: 'zd09090923',//订单号
                userName : 'webtest01',  //买家
                userId:12,//买家id
               
                transactionAmount: '1233.00',//交易金额
                releaseTime:'2016-05-15 13:24',//创建时间
                
                type:1,//1关闭需求 2.申请退款 3.系统自动退款 4.用户提现
                isaudit:1,//审核 0 不显示 1显示
            },{
                id:1,//订单id
                orderNumber: 'zd09090923',//订单号
                userName : 'webtest01',  //买家
                userId:12,//买家id
               
                transactionAmount: '1233.00',//交易金额
                releaseTime:'2016-05-15 13:24',//创建时间
                
                type:1,//1关闭需求 2.申请退款 3.系统自动退款 4.用户提现
                isaudit:1,//审核 0 不显示 1显示
            },{
                id:1,//订单id
                orderNumber: 'zd09090923',//订单号 
                userName : 'webtest01',  //买家
                userId:12,//买家id
               
                transactionAmount: '1233.00',//交易金额
                releaseTime:'2016-05-15 13:24',//创建时间
                
                type:1,//1关闭需求 2.申请退款 3.系统自动退款 4.用户提现
                isaudit:1,//审核 0 不显示 1显示
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
}).listen(3006, function() {
    console.log('3006 server is runing...')
})
