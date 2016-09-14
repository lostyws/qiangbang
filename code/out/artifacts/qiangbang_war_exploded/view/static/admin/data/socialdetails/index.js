var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
  var query = url.parse(req.url, true).query;
  var callback=query.callback||"callback";

  var data = {
    status: 0,
    data:{
        insuredList:[{
            id:12,
            //客户名
            customerName:'杭州今元标矩科技有限公司',
            //员工姓名
            ename:'杨文寿',
            //证件类型
            cardType:1, //1身份证 2 护照
            //证件号码
            cardNumber:'362331199112112118',
            //参保状态
            insuredState:'新增中',
            //参保地
            insuredAddress:'杭州市',
            //户籍性质
            accountType :'外地农村',
            //社保起缴月
            socialStart:'2016-05',
            //社保基数
            socialBase:'1234',
            //公积金起缴月
            fundStart:'2016-05',
            //公积金基数
            fundBase:'2345',
            //状态 判断是否可编辑 1可编辑 其他不可
            state:1
        },{
            id:12,
            //客户名
            customerName:'杭州今元标矩科技有限公司',
            //员工姓名
            ename:'杨文寿',
            //证件类型
            cardType:1,//1身份证 2 护照
            //证件号码
            cardNumber:'362331199112112118',
            //参保状态
            insuredState:'新增中',
            //参保地
            insuredAddress:'杭州市',
            //户籍性质
            accountType :'外地农村',
            //社保起缴月
            socialStart:'2016-05',
            //社保基数
            socialBase:'1234',
            //公积金起缴月
            fundStart:'2016-05',
            //公积金基数
            fundBase:'2345',
            //状态 判断是否可编辑 1可编辑 其他不可
            state:0
        }],
        fundAddList:[{
            id:12,//id
            feedbackDate:'2016-04-20',//新增申报结果反馈时间
            feedbackInfo:'申报成功',//新增申报结果反馈内容
            followDate:'2016-03-25',//金柚网跟进时间
            followInfo:'已发送通知给员工和其公司HR',//金柚网跟进内容 状态
            ename:'杨文寿',//姓名 (重新填写弹框使用)
            ecardNo:'362331199112112118',//身份证(重新填写弹框使用)
            feedbackStatu:1, //根据申报状态显示客户反馈 1 空 2确认上家已停缴按钮 3重新填写 姓名/身份证号

        },{
            id:13,//id
            feedbackDate:'2016-04-20',//新增申报结果反馈时间
            feedbackInfo:'申报成功',//新增申报结果反馈内容
            followDate:'2016-03-25',//金柚网跟进时间
            followInfo:'已发送通知给员工和其公司HR',//金柚网跟进内容 状态
            ename:'杨文寿',//姓名 (重新填写弹框使用)
            ecardNo:'362331199112112118',//身份证(重新填写弹框使用)
            feedbackStatu:2, //根据申报状态显示客户反馈 1 空 2确认上家已停缴按钮 3重新填写 姓名/身份证号

        },{
            id:14,//id
            feedbackDate:'2016-04-20',//新增申报结果反馈时间
            feedbackInfo:'申报成功',//新增申报结果反馈内容
            followDate:'2016-03-25',//金柚网跟进时间
            followInfo:'已发送通知给员工和其公司HR',//金柚网跟进内容 状态
            ename:'杨文寿',//姓名 (重新填写弹框使用)
            ecardNo:'362331199112112118',//身份证(重新填写弹框使用)
            feedbackStatu:3, //根据申报状态显示客户反馈 1 空 2确认上家已停缴按钮 3重新填写 姓名/身份证号

        }],
        socialAddList:[{
            id:12,//id
            feedbackDate:'2016-04-20',//新增申报结果反馈时间
            feedbackInfo:'申报成功',//新增申报结果反馈内容
            followDate:'2016-03-25',//金柚网跟进时间
            followInfo:'已发送通知给员工和其公司HR',//金柚网跟进内容 状态
            ename:'杨文寿',//姓名 (重新填写弹框使用)
            ecardNo:'362331199112112118',//身份证(重新填写弹框使用)
            feedbackStatu:1, //根据申报状态显示客户反馈 1 空 2确认上家已停缴按钮 3重新填写 姓名/身份证号

        },{
            id:13,//id
            feedbackDate:'2016-04-20',//新增申报结果反馈时间
            feedbackInfo:'申报成功',//新增申报结果反馈内容
            followDate:'2016-03-25',//金柚网跟进时间
            followInfo:'已发送通知给员工和其公司HR',//金柚网跟进内容 状态
            ename:'杨文寿',//姓名 (重新填写弹框使用)
            ecardNo:'362331199112112118',//身份证(重新填写弹框使用)
            feedbackStatu:2, //根据申报状态显示客户反馈 1 空 2确认上家已停缴按钮 3重新填写 姓名/身份证号

        },{
            id:14,//id
            feedbackDate:'2016-04-20',//新增申报结果反馈时间
            feedbackInfo:'申报成功',//新增申报结果反馈内容
            followDate:'2016-03-25',//金柚网跟进时间
            followInfo:'已发送通知给员工和其公司HR',//金柚网跟进内容 状态
            ename:'杨文寿',//姓名 (重新填写弹框使用)
            ecardNo:'362331199112112118',//身份证(重新填写弹框使用)
            feedbackStatu:3, //根据申报状态显示客户反馈 1 空 2确认上家已停缴按钮 3重新填写 姓名/身份证号

        }],
        fundStopList:[{
            id:12,//id
            feedbackDate:'2016-04-20',//新增申报结果反馈时间
            feedbackInfo:'申报成功',//新增申报结果反馈内容
            followDate:'2016-03-25',//金柚网跟进时间
            followInfo:'已发送通知给员工和其公司HR',//金柚网跟进内容 状态
            ename:'杨文寿',//姓名 (重新填写弹框使用)
            ecardNo:'362331199112112118',//身份证(重新填写弹框使用)
            feedbackStatu:1, //根据申报状态显示客户反馈 1 空 2确认上家已停缴按钮 3重新填写 姓名/身份证号

        },{
            id:13,//id
            feedbackDate:'2016-04-20',//新增申报结果反馈时间
            feedbackInfo:'申报成功',//新增申报结果反馈内容
            followDate:'2016-03-25',//金柚网跟进时间
            followInfo:'已发送通知给员工和其公司HR',//金柚网跟进内容 状态
            ename:'杨文寿',//姓名 (重新填写弹框使用)
            ecardNo:'362331199112112118',//身份证(重新填写弹框使用)
            feedbackStatu:2, //根据申报状态显示客户反馈 1 空 2确认上家已停缴按钮 3重新填写 姓名/身份证号

        },{
            id:14,//id
            feedbackDate:'2016-04-20',//新增申报结果反馈时间
            feedbackInfo:'申报成功',//新增申报结果反馈内容
            followDate:'2016-03-25',//金柚网跟进时间
            followInfo:'已发送通知给员工和其公司HR',//金柚网跟进内容 状态
            ename:'杨文寿',//姓名 (重新填写弹框使用)
            ecardNo:'362331199112112118',//身份证(重新填写弹框使用)
            feedbackStatu:3, //根据申报状态显示客户反馈 1 空 2确认上家已停缴按钮 3重新填写 姓名/身份证号

        }],
        socialStopList:[{
            id:12,//id
            feedbackDate:'2016-04-20',//新增申报结果反馈时间
            feedbackInfo:'申报成功',//新增申报结果反馈内容
            followDate:'2016-03-25',//金柚网跟进时间
            followInfo:'已发送通知给员工和其公司HR',//金柚网跟进内容 状态
            ename:'杨文寿',//姓名 (重新填写弹框使用)
            ecardNo:'362331199112112118',//身份证(重新填写弹框使用)
            feedbackStatu:1, //根据申报状态显示客户反馈 1 空 2确认上家已停缴按钮 3重新填写 姓名/身份证号

        },{
            id:13,//id
            feedbackDate:'2016-04-20',//新增申报结果反馈时间
            feedbackInfo:'申报成功',//新增申报结果反馈内容
            followDate:'2016-03-25',//金柚网跟进时间
            followInfo:'已发送通知给员工和其公司HR',//金柚网跟进内容 状态
            ename:'杨文寿',//姓名 (重新填写弹框使用)
            ecardNo:'362331199112112118',//身份证(重新填写弹框使用)
            feedbackStatu:2, //根据申报状态显示客户反馈 1 空 2确认上家已停缴按钮 3重新填写 姓名/身份证号

        },{
            id:14,//id
            feedbackDate:'2016-04-20',//新增申报结果反馈时间
            feedbackInfo:'申报成功',//新增申报结果反馈内容
            followDate:'2016-03-25',//金柚网跟进时间
            followInfo:'已发送通知给员工和其公司HR',//金柚网跟进内容 状态
            ename:'杨文寿',//姓名 (重新填写弹框使用)
            ecardNo:'362331199112112118',//身份证(重新填写弹框使用)
            feedbackStatu:3, //根据申报状态显示客户反馈 1 空 2确认上家已停缴按钮 3重新填写 姓名/身份证号

        }]

    }

  };

  res.writeHead(200,{
    'Context-Type':'application/x-www-form-urlencode',
    'Access-Control-Allow-Origin':'*'
  })
  // res.end(callback+'('+JSON.stringify(data)+')');
  res.end(JSON.stringify(data));
}).listen(3000, function() {
  console.log('server is runing...')
})