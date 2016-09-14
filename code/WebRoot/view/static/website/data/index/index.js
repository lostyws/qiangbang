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
                userName: 'webtest01',//用户名
                phoneNumber : '15001894728',  //手机号
                idCard : '362331199112112118', //身份证号码
                region: '万年县',//地区 可选 下单时候获取用户地址
                registrationTime: '2016-05-13 21:14', //注册时间
                isCloseShop:1, //1显示冻结账号(默认) 0不显示 个人也可以用
                isOpenShop:1,//1显示开启账号 0 不显示(默认)
                /*普通用户end*/
                classify:'水电工',//普通用户有的话显示身份类别 水电工 商户显示一级大类名称
                shopName:'小强五金店',//后期可以当做增加店铺的展示入口

                isApprove:1,//1显示认证审核 0 不显示(默认)
              
                isCashdeposit:1,//1显示保证金审核 0不显示(默认)
                /*个体工商户*/

            },
            {
                id:1,//
                userName: 'webtest01',//用户名
                phoneNumber : '15001894728',  //手机号
                idCard : '362331199112112118', //身份证号码
                region: '万年县',//地区 可选 下单时候获取用户地址
                registrationTime: '2016-05-13 21:14', //注册时间
                isCloseShop:1, //1显示冻结账号(默认) 0不显示 个人也可以用
                isOpenShop:1,//1显示开启账号 0 不显示(默认)
                /*普通用户end*/
                classify:'水电工',//普通用户有的话显示身份类别 水电工 商户显示一级大类名称
                shopName:'小强五金店',//后期可以当做增加店铺的展示入口

                isApprove:1,//1显示认证审核 0 不显示(默认)
              
                isCashdeposit:1,//1显示保证金审核 0不显示(默认)
                /*个体工商户*/

            },{
                id:1,
                userName: 'webtest01',//用户名
                phoneNumber : '15001894728',  //手机号
                idCard : '362331199112112118', //身份证号码
                region: '万年县',//地区 可选 下单时候获取用户地址
                registrationTime: '2016-05-13 21:14', //注册时间
                isCloseShop:0, //1显示关店(默认) 0不显示 个人也可以用来冻结账号
                isOpenShop:1,//1显示开店 0 不显示(默认)
                /*普通用户end*/
                classify:'水电工',//普通用户有的话显示身份类别 水电工 商户显示一级大类名称
                shopName:'小强五金店',//后期可以当做增加店铺的展示入口

                isApprove:0,//1显示认证审核 0 不显示(默认)
              
                isCashdeposit:0,//1显示保证金审核 0不显示(默认)
                /*个体工商户*/

            },{
                id:1,
                userName: 'webtest01',//用户名
                phoneNumber : '15001894728',  //手机号
                idCard : '362331199112112118', //身份证号码
                region: '万年县',//地区 可选 下单时候获取用户地址
                registrationTime: '2016-05-13 21:14', //注册时间
                isCloseShop:1, //1显示冻结账号(默认) 0不显示 个人也可以用
                isOpenShop:1,//1显示开启账号 0 不显示(默认)
                /*普通用户end*/
                classify:'水电工',//普通用户有的话显示身份类别 水电工 商户显示一级大类名称
                shopName:'小强五金店',//后期可以当做增加店铺的展示入口

                isApprove:0,//1显示认证审核 0 不显示(默认)
              
                isCashdeposit:0,//1显示保证金审核 0不显示(默认)
                /*个体工商户*/

            },{
                id:1,
                userName: 'webtest01',//用户名
                phoneNumber : '15001894728',  //手机号
                idCard : '362331199112112118', //身份证号码
                region: '万年县',//地区 可选 下单时候获取用户地址
                registrationTime: '2016-05-13 21:14', //注册时间
                isCloseShop:1, //1显示冻结账号(默认) 0不显示 个人也可以用
                isOpenShop:1,//1显示开启账号 0 不显示(默认)
                /*普通用户end*/
                classify:'水电工',//普通用户有的话显示身份类别 水电工 商户显示一级大类名称
                shopName:'小强五金店',//后期可以当做增加店铺的展示入口

                isApprove:0,//1显示认证审核 0 不显示(默认)
              
                isCashdeposit:0,//1显示保证金审核 0不显示(默认)
                /*个体工商户*/

            },{
                id:1,
                userName: 'webtest01',//用户名
                phoneNumber : '15001894728',  //手机号
                idCard : '362331199112112118', //身份证号码
                region: '万年县',//地区 可选 下单时候获取用户地址
                registrationTime: '2016-05-13 21:14', //注册时间
                isCloseShop:1, //1显示冻结账号(默认) 0不显示 个人也可以用
                isOpenShop:0,//1显示开启账号 0 不显示(默认)
                /*普通用户end*/
                classify:'水电工',//普通用户有的话显示身份类别 水电工 商户显示一级大类名称
                shopName:'小强五金店',//后期可以当做增加店铺的展示入口

                isApprove:0,//1显示认证审核 0 不显示(默认)
              
                isCashdeposit:0,//1显示保证金审核 0不显示(默认)
                /*个体工商户*/

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
}).listen(3001, function() {
    console.log('3001 server is runing...')
})
