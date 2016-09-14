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
        success: true,
        code: 0,
        data: {
            member_id: "9629",
            member_name: "yangwenshou",
            member_truename: "杨文寿",
            member_avatar: "http://wx.qlogo.cn/mmopen/XeaiaOGeIyMHZp3icDfJBsLWunRAFMJVUud6wJwKeWlFGs6Bp25icIRmcgbdZQGdHAcF1dGiaTN2PQmfldQCoVDvKwZ7D1kxkq3a/0",
            member_mobile: "15001894728",
            member_email: "yangwensou@qq.com",
            member_areaid: "500",
            member_cityid: "52",
            member_provinceid: "2",
            member_old_login_time: "1464269176",
            address: "夯筑是大开口费",
            is_perfect: 0,
            area_name: "北京北京东城区",
            emergency_contact_tel: null,
            emergency_contact: null,
            name_edit_number: "0",
            register_invitation_code: null,
            code_edit_number: "0",
            is_remind: "1",
            invitation_code: "v5p5v8",
            is_person_business: 0,
            business_name: "dfdfd",
            is_audit: "1",
            no_audit_reason: "认证系统升级，须进一步完善认证资料",
            legal_person: null,
            identity_card: "",
            identity_card_file_up: null,
            identity_card_file_down: null,
            need_update: true,
            file: "http://img.joyowo.com/formal/wuyoubao/business_license/2015101909569b1c50a3-36d3-4af5-9932-78560378e1b7.jpg",
            business_discount: 5,
            is_news: 1
        }

    }
    res.writeHead(200, {
            'Context-Type': 'application/x-www-form-urlencode',
            'Access-Control-Allow-Origin': '*'
        })
        // res.end(callback+'('+JSON.stringify(data)+')');
        //

    res.end(JSON.stringify(data));
}).listen(3002, function() {
    console.log('3000 user me server is runing...')
})
