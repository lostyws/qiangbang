var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
    var query = url.parse(req.url, true).query;
    var callback = query.callback || "callback";
    var data = {
        errcode: 0,
        msg: "查询成功",
        recordsFiltered: "14",
        recordsTotal: "14",
        status: 0,
        hasCreate: false,
        total: {
            'company_total': 1000, //公司
            'person_total': 10000, //个人
            'supplement_company_total': 10000, //补充公司
            'supplement_person_total': 10000, //补充个人
            'total': 1000, //总计
        },
        "data": [{
            id: '1',
            social_type_name: '2222',
            user_social_name: '萨大声',
            certificate_number: '1000',
            insurance_fees_month: '2',
            household_name: '2',
            base: 2000,
            company_money: 1000,
            company_base: 1001,
            housing_fund_company_pro: 1500,
            person_money: 1000,
            person_base: 1000,
            housing_fund_person_pro: 1100,
            fund_money: 1000,
            supplement_company_money: 1000, //补充公积金公司费用
            supplement_company_base: 10001, //补充公积金公司基数
            supplement_company_pro: 10002, //补充公积金公司比例
            supplement_person_money: 1003, //补充公积金个人金额
            supplement_person_base: 1004, //补充公积金个人基数
            supplement_person_pro: 1005 //补充公积金个人比例

        }]
    };

    res.writeHead(200, {
        'Context-Type': 'application/x-www-form-urlencode',
        'Access-Control-Allow-Origin': '*'
    });
    //res.end(callback+'('+JSON.stringify(data)+')');
    res.end(JSON.stringify(data));
}).listen(3007, function() {
    console.log('server is runing...');
});
