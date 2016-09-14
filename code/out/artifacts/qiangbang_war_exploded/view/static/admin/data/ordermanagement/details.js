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
       
        data:{
            id:1,//订单id
            orderNumber: 'zd09090923',//订单号
            buyerName : 'webtest01',  //买家
            buyerId:12,//买家id
            sellerName : 'webtest02', //卖家
            sellerId:13,//卖家id
            intentionAmount:'999.99',//用户意向金额
            transactionAmount: '1233.00',//交易金额
            releaseTime:'2016-05-15 13:24',//发布时间
            status: 1, //状态 1进行中 2已完成 3已取消
            isStop:1, //终止订单 用户发布不合法订单时候后台可以手动终止订单 用户可查看 1显示(默认)0 不显示
            isDelete:1,//删除订单 用户发布不合法订单时候后台可以手动删除订单 用户不可查看 1显示(默认)0 不显示
            isAffirmFinish:1,//强制确认订单已完成  确认后卖家将收到订单交易金额
            buyerEvaluate:{ //买家评价
                service:'5', //服务态度
                quality:'4', //质量
                imgList:['/static/admin/images/abc.jpg','/static/admin/images/abc.jpg','/static/admin/images/abc.jpg'],//评论图片
                describe:'这个人很懒什么都没留下' //描述/原因
            },
            sellerEvaluate:{ //买家评价
                grade:'4' ,//评分
                describe:'什么也没留下'//描述/原因
            },
            offerList:[{ //报价列表
                offerId:1,//报价id
                sellerId:14, //卖家id
                sellerName:'webtest03',//卖家用户名
                offerMoney:'2323.00',//卖家报价
                sumOrders:123,//买家总成交订单数
                describe:'这个很简单,交给我没问题'//描述怎么做
            },{ //报价列表
                offerId:1,//报价id
                sellerId:15, //卖家id
                sellerName:'webtest06',//卖家用户名
                offerMoney:'323.00',//卖家报价
                sumOrders:123,//买家总成交订单数
                describe:'这个很简单,交给我没问题'//描述怎么做
            },{ //报价列表
                offerId:1,//报价id
                sellerId:14, //卖家id
                sellerName:'webtest03',//卖家用户名
                offerMoney:'223.00',//卖家报价
                sumOrders:123,//买家总成交订单数
                describe:'这个很简单,交给我没问题'//描述怎么做
            },{ //报价列表
                offerId:1,//报价id
                sellerId:13, //卖家id
                sellerName:'webtest03',//卖家用户名
                offerMoney:'233.00',//卖家报价
                sumOrders:123,//买家总成交订单数
                describe:'这个很简单,交给我没问题'//描述怎么做
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
    console.log('3004 ordermanagement details server is runing...')
})
