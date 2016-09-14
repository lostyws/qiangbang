var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
  var query = url.parse(req.url, true).query;
  var callback=query.callback||"callback";

  var data = {
    status: 0,
    data:[{
        id:2,//id
        classify:'预收',//分类
        paymentType:'续缴',//缴纳类型
        paymentMonth:'201602',//缴费月
        socialMonth:'201602',//社保缴纳月
        socialTotal:'1234',//社保合计
        fundMonth:'201602',//公积金缴纳月
        fundTotal:'2345',//公积金合计
        protectTotal:'2345',//残保金合计
        otherTotal:'2345',//其他费用
        serviceCharge:'9.9',//服务费
        total:'4567',//服务费

    },{
        id:3,//id
        classify:'实缴',//分类
        paymentType:'续缴',//缴纳类型
        paymentMonth:'201602',//缴费月
        socialMonth:'201602',//社保缴纳月
        socialTotal:'1234',//社保合计
        fundMonth:'201602',//公积金缴纳月
        fundTotal:'2345',//公积金合计
        protectTotal:'2345',//残保金合计
        otherTotal:'2345',//其他费用
        serviceCharge:'9.9',//服务费
        total:'4567',//服务费

    },{
        id:4,//id
        classify:'预收',//分类
        paymentType:'续缴',//缴纳类型
        paymentMonth:'201602',//缴费月
        socialMonth:'201602',//社保缴纳月
        socialTotal:'1234',//社保合计
        fundMonth:'201602',//公积金缴纳月
        fundTotal:'2345',//公积金合计
        protectTotal:'2345',//残保金合计
        otherTotal:'2345',//其他费用
        serviceCharge:'9.9',//服务费
        total:'4567',//服务费

    },{
        id:5,//id
        classify:'预收',//分类
        paymentType:'续缴',//缴纳类型
        paymentMonth:'201602',//缴费月
        socialMonth:'201602',//社保缴纳月
        socialTotal:'1234',//社保合计
        fundMonth:'201602',//公积金缴纳月
        fundTotal:'2345',//公积金合计
        protectTotal:'2345',//残保金合计
        otherTotal:'2345',//其他费用
        serviceCharge:'9.9',//服务费
        total:'4567',//服务费

    }]

  };

  res.writeHead(200,{
    'Context-Type':'application/x-www-form-urlencode',
    'Access-Control-Allow-Origin':'*'
  })
  // res.end(callback+'('+JSON.stringify(data)+')');
  res.end(JSON.stringify(data));
}).listen(3001, function() {
  console.log('30001 server is runing...')
})