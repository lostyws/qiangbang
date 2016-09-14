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
                orderNumber: 'o12233333',//订单号
                category : 0, //类别（0支出 1收入）
                money: '1233',//金额
                mark: '订单保价' //备注

            },{
                id:1,
                orderNumber: 'o122333444',//订单号
                category : 0, //类别（0支出 1收入）
                money: '1233',//金额
                mark: '订单保价' //备注

            },{
                id:1,
                orderNumber: 'o12233333',//订单号
                category : 1, //类别（0支出 1收入）
                money: '1233',//金额
                mark: '订单补差' //备注

            },{
                id:1,
                orderNumber: 'o12233333',//订单号
                category : 0, //类别（0支出 1收入）
                money: '1233',//金额
                mark: '订单退款' //备注

            }
            


        ],
        baseinfo:{
            userid:1,
            userName: 'webtest01',//用户名
            userGrade: '6.7',//普通用户
            phoneNumber : '15001894728',  //手机号
            idCard : '362331199112112118', //身份证号码
            region: '万年县',//地区 可选 下单时候获取用户地址
            openId:'kjdkdkfjdkfjk233dddd',//微信openid
            registrationTime: '2016-05-13 21:14', //注册时间
            isCloseShop:1, //1显示冻结账号(默认) 0不显示 个人也可以用
            isOpenShop:1,//1显示开启账号 0 不显示(默认)
            /*普通用户end*/
            classify:'水电工',//普通用户有的话显示身份类别 水电工 商户显示一级大类名称
            shopName:'小强五金店',//后期可以当做增加店铺的展示入口

            isApprove:1,//1显示认证审核 0 不显示(默认)
          
            isCashdeposit:1,//1显示保证金审核 0不显示(默认)
            realName:'杨文寿',//真实姓名
            businessLicenseName:'小强五金店',//营业执照名称

            storeName:'小强五金店',//营业执照名称
            contactWay:'021-1234567',//联系方式
            expressAddress:'江西省上饶市万年县江西省上饶市万年县江西省上饶市万年县江西省上饶市万年县',//收货地址
            idCardfront:'http://localhost:8080/trunk/admin/images/abc.jpg',//身份证正面
            idCardreverse:'http://localhost:8080/trunk/admin/images/abc.jpg',//身份证反面
            businessLicense:'http://localhost:8080/trunk/admin/images/abc.jpg',//营业执照照片
            storefront:'http://localhost:8080/trunk/admin/images/abc.jpg',//店名照片
            /*个体工商户*/
        }
    }
    res.writeHead(200, {
            'Context-Type': 'application/x-www-form-urlencode',
            'Access-Control-Allow-Origin': '*'
        })
        // res.end(callback+'('+JSON.stringify(data)+')');
        //

    res.end(JSON.stringify(data));
}).listen(3000, function() {
    console.log('3000 server is runing...')
})
