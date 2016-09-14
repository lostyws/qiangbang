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
        "data": [{
            id: '1',
            social_type_name: '2222',
            user_social_name: '萨大声',
            certificate_number: '1000',
            insurance_fees_month: '2',
            household_name: '2',
            insurance_base: 2000,
            endowment: {
                company_money: 1000,
                company_base: 1000,
                company_pro: 1000,
                person_money: 2000,
                person_base: 2000,
                person_pro: 2000,
            },
            medical: {
                company_money: 1000,
                company_base: 1000,
                company_pro: 1000,
                person_money: 2000,
                person_base: 2000,
                person_pro: 2000,
            },
            unemployment: {
                company_money: 1000,
                company_base: 1000,
                company_pro: 1000,
                person_money: 2000,
                person_base: 2000,
                person_pro: 2000,
            },
            injury: {
                company_money: 1000,
                company_base: 1000,
                company_pro: 1000,
            },
            maternity: {
                company_money: 1000,
                company_base: 1000,
                company_pro: 1000,
            },
            illness: {
                company_money: 1000,
                person_money: 2000,
            },
            other_medical: {
                company_month: 1006,
                local_supplement_medicine: 10001,
                person_account: 1000,
                hospital_supplement_medicine: 1001,
                hospital_medicine: 1002,
                other: 1003,
                workers: 1004,
                security: 1005,

            },
            supplement_injury: 1000,
            residual: {
                company_year: 1000,
                company_month: 1001,
            },
            other: {
                company_rubbish_fee: 1000,
                person_rubbish_fee: 1001,
                union_fee: 1002,
                heating_fee: 1003,
                edu_fee: 1004,
                fee: 1005,
                card_fee: 1006,
                archives_fee: 1007,
                account_fee: 1008,
                government_fines: 1009,
                delay_fee: 1010
            },
            insurance_money: 1500,
            remark: 1000,
        }],
        "total": {
            endowment_company_total: 120,
            endowment_person_total: 120,
            medical_company_total: 120,
            medical_person_total: 120,
            unemployment_company_total: 120,
            unemployment_person_total: 120,

            injury_company_total: 120,
            maternity_company_total: 120,
            illness_company_total: 120,
            illness_person_total: 120,

            other_account_fee: 120,
            other_archives_fee: 120,
            other_card_fee: 120,
            other_company_rubbish_fee: 120,
            other_delay_fee: 120,
            other_edu_fee: 120,
            other_fee: 120,
            other_government_fines: 120,
            other_heating_fee: 120,
            other_person_rubbish_fee: 120,
            other_union_fee: 120,

            residual_company_month: 120,
            residual_company_year: 120,

            supplement_medicine_company_month: 120,
            supplement_medicine_hospital_medicine: 120,
            supplement_medicine_hospital_supplement_medicine: 120,
            supplement_medicine_local_supplement_medicine: 0,
            supplement_medicine_other: 120,
            supplement_medicine_person_account: 120,
            supplement_medicine_security: 120,
            supplement_medicine_workers: 120,
            supplement_injury_company_money:100,

            total: 0,


        }
    };

    res.writeHead(200, {
        'Context-Type': 'application/x-www-form-urlencode',
        'Access-Control-Allow-Origin': '*'
    });
    //res.end(callback+'('+JSON.stringify(data)+')');
    res.end(JSON.stringify(data));
}).listen(3004, function() {
    console.log('server is runing...');
});
