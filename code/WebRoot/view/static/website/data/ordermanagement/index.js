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
                buyerName : 'webtest01',  //买家
                buyerId:12,//买家id
                sellerName : 'webtest02', //卖家
                sellerId:13,//卖家id
                transactionAmount: '1233.00',//交易金额
                releaseTime:'2016-05-15 13:24',//发布时间
                status: 1, //状态 1进行中 2已完成 3已取消
                isStop:1, //终止订单 用户发布不合法订单时候后台可以手动终止订单 用户可查看 1显示(默认)0 不显示
                isDelete:1,//删除订单 用户发布不合法订单时候后台可以手动删除订单 用户不可查看 1显示(默认)0 不显示
                isAffirmFinish:1,//强制确认订单已完成  确认后卖家将收到订单交易金额
               
            },{
                id:1,
                orderNumber: 'zd09090923',//订单号
                buyerName : 'webtest01',  //买家
                buyerId:12,//买家id
                sellerName : 'webtest02', //卖家
                sellerId:13,//卖家id
                transactionAmount: '1233.00',//交易金额
                releaseTime:'2016-05-15 13:24',//发布时间
                status: 1, //状态 1进行中 2已完成 3已取消
                isStop:1, //终止订单 用户发布不合法订单时候后台可以手动终止订单 用户可查看 1显示(默认)0 不显示
                isDelete:1,//删除订单 用户发布不合法订单时候后台可以手动删除订单 用户不可查看 1显示(默认)0 不显示
                isAffirmFinish:1,//强制确认订单已完成  确认后卖家将收到订单交易金额
               
            }
            ,{
                id:1,
                orderNumber: 'zd09090923',//订单号
                buyerName : 'webtest01',  //买家
                buyerId:12,//买家id
                sellerName : 'webtest02', //卖家
                sellerId:13,//卖家id
                transactionAmount: '1233.00',//交易金额
                releaseTime:'2016-05-15 13:24',//发布时间
                status: 1, //状态 1进行中 2已完成 3已取消
                isStop:1, //终止订单 用户发布不合法订单时候后台可以手动终止订单 用户可查看 1显示(默认)0 不显示
                isDelete:1,//删除订单 用户发布不合法订单时候后台可以手动删除订单 用户不可查看 1显示(默认)0 不显示
                isAffirmFinish:1,//强制确认订单已完成  确认后卖家将收到订单交易金额
               
            }
            ,{
                id:1,
                orderNumber: 'zd09090923',//订单号
                buyerName : 'webtest01',  //买家
                buyerId:12,//买家id
                sellerName : 'webtest02', //卖家
                sellerId:13,//卖家id
                transactionAmount: '1233.00',//交易金额
                releaseTime:'2016-05-15 13:24',//发布时间
                status: 1, //状态 1进行中 2已完成 3已取消
                isStop:1, //终止订单 用户发布不合法订单时候后台可以手动终止订单 用户可查看 1显示(默认)0 不显示
                isDelete:1,//删除订单 用户发布不合法订单时候后台可以手动删除订单 用户不可查看 1显示(默认)0 不显示
                isAffirmFinish:0,//强制确认订单已完成  确认后卖家将收到订单交易金额 1显示（默认）0不显示
               
            },{
                id:1,
                orderNumber: 'zd09090923',//订单号
                buyerName : 'webtest01',  //买家
                buyerId:12,//买家id
                sellerName : 'webtest02', //卖家
                sellerId:13,//卖家id
                transactionAmount: '1233.00',//交易金额
                status: 1, //状态 1进行中 2已完成 3已取消
                releaseTime:'2016-05-15 13:24',//发布时间
                isStop:1, //终止订单 用户发布不合法订单时候后台可以手动终止订单 用户可查看 1显示(默认)0 不显示
                isDelete:1,//删除订单 用户发布不合法订单时候后台可以手动删除订单 用户不可查看 1显示(默认)0 不显示
                isAffirmFinish:1,//强制确认订单已完成  确认后卖家将收到订单交易金额
               
            }
            ,{
                id:1,
                orderNumber: 'zd09090923',//订单号
                buyerName : 'webtest01',  //买家
                buyerId:12,//买家id
                sellerName : 'webtest02', //卖家
                sellerId:13,//卖家id
                releaseTime:'2016-05-15 13:24',//发布时间
                transactionAmount: '1233.00',//交易金额
                status: 1, //状态 1进行中 2已完成 3已取消
                isStop:1, //终止订单 用户发布不合法订单时候后台可以手动终止订单 用户可查看 1显示(默认)0 不显示
                isDelete:1,//删除订单 用户发布不合法订单时候后台可以手动删除订单 用户不可查看 1显示(默认)0 不显示
                isAffirmFinish:1,//强制确认订单已完成  确认后卖家将收到订单交易金额
               
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
}).listen(3002, function() {
    console.log('3002 server is runing...')
})
