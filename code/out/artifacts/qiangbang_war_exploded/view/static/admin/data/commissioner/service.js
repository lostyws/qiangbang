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
                c_name: '杭州今元标矩科技有限公司',//企业名称
                name : '杨文寿',  //员工姓名
                certificate_number : '362331199112112118', //证件号码
                social_security_status: '新增中',//参保状态
                city_name:'浙江杭州主城区',//参保地
                household_name: '本地城镇', //户籍性质
                social_security_start_month: '201601', //社保起缴月
                social_security_base: '3000.00', //社保基数
                housing_fund_start_month: '201601', //公积金起缴月
                housing_fund_current_month: '3001.00', //公积金基数
                personId:12,//用户id
                c_id:11//企业id
            },
            {
                id:2,
                c_name: '杭州今元标矩科技有限公司',//企业名称
                name : '杨文寿',  //员工姓名
                certificate_number : '362331199112112118', //证件号码
                social_security_status: '新增中',//参保状态
                city_name:'浙江杭州主城区',//参保地
                household_name: '本地城镇', //户籍性质
                social_security_start_month: '201601', //社保起缴月
                social_security_base: '3000.00', //社保基数
                housing_fund_start_month: '201601', //公积金起缴月
                housing_fund_current_month: '3001.00', //公积金基数
                personId:13,//用户id
                c_id:11//企业id
            },{
                id:3,
                c_name: '杭州今元标矩科技有限公司',//企业名称
                name : '杨文寿',  //员工姓名
                certificate_number : '362331199112112118', //证件号码
                social_security_status: '新增中',//参保状态
                city_name:'浙江杭州主城区',//参保地
                household_name: '本地城镇', //户籍性质
                social_security_start_month: '201601', //社保起缴月
                social_security_base: '3000.00', //社保基数
                housing_fund_start_month: '201601', //公积金起缴月
                housing_fund_current_month: '3001.00', //公积金基数
                personId:11,//用户id
                c_id:11//企业id
            },{
                id:4,
                c_name: '杭州今元标矩科技有限公司',//企业名称
                name : '杨文寿',  //员工姓名
                certificate_number : '362331199112112118', //证件号码
                social_security_status: '新增中',//参保状态
                city_name:'浙江杭州主城区',//参保地
                household_name: '本地城镇', //户籍性质
                social_security_start_month: '201601', //社保起缴月
                social_security_base: '3000.00', //社保基数
                housing_fund_start_month: '201601', //公积金起缴月
                housing_fund_current_month: '3001.00', //公积金基数
                personId:14,//用户id
                c_id:11//企业id
            },{
                id:5,
                c_name: '杭州今元标矩科技有限公司',//企业名称
                name : '杨文寿',  //员工姓名
                certificate_number : '362331199112112118', //证件号码
                social_security_status: '新增中',//参保状态
                city_name:'浙江杭州主城区',//参保地
                household_name: '本地城镇', //户籍性质
                social_security_start_month: '201601', //社保起缴月
                social_security_base: '3000.00', //社保基数
                housing_fund_start_month: '201601', //公积金起缴月
                housing_fund_current_month: '3001.00', //公积金基数
                personId:15,//用户id
                c_id:11//企业id
            }


        ],
        recordList:[
            {
                id:1,
                communicate_time:'2016-01-02  12:20:33',
                task_related_party:'杭州今元标矩科技有限公司',
                communicate_content:'我是待办事项',
            },
            {
                id:2,
                communicate_time:'2016-01-02  12:20:33',
                task_related_party:'杭州今元标矩科技有限公司',
                communicate_content:'我是待办事项',
            },
            {
                id:3,
                communicate_time:'2016-01-02  12:20:33',
                task_related_party:'杭州今元标矩科技有限公司',
                communicate_content:'我是待办事项',
            },
            {
                id:4,
                communicate_time:'2016-01-02  12:20:33',
                task_related_party:'杭州今元标矩科技有限公司',
                communicate_content:'我是待办事项',
            },
            {
                id:5,
                communicate_time:'2016-01-02  12:20:33',
                task_related_party:'杭州今元标矩科技有限公司',
                communicate_content:'我是待办事项',
            },
            {
                id:6,
                communicate_time:'2016-01-02  12:20:33',
                task_related_party:'杭州今元标矩科技有限公司',
                communicate_content:'我是待办事项',
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
}).listen(3003, function() {
    console.log('3003 server is runing...')
})
