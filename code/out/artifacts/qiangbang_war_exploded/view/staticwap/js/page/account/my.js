//添加toolbar
qbApp.showToolbar({
    'active': 4,
    'path': packageJson.JAVA_DOMAIN
});
//获取公司信息
$$('.phoneinfo').attr('href','tel:' + CONFIG.TEL).text(CONFIG.TEL);

//引导用户关注抢帮
//qbApp.followQB();

//导航栏目的交互
$$(".page-content").scroll(function() {
    if($$(this).scrollTop() >= $$(".user-info-wrapper").height()-$$(".navbar").height() ){
        $$(".navbar").removeClass("navbar-none").addClass("navbar-white");
        $$(".center").text("我的");
    }else {
        $$(".navbar").removeClass("navbar-white").addClass("navbar-none");
        $$(".center").text("");
    }
});
userDetail();


function userInfo(){
    myApp.showIndicator();
    $$.ajax({
        'url': 'http://127.0.0.1:3000',
        'type': 'post',
        'dataType': 'json',
        success: function(d){
            myApp.hideIndicator();
            if(d.status == 0){
                if(!d.data.member_avatar){
                $(".user-face").attr('src', packageJson.JAVA_STATICURL + "/css/images/head.jpg");
                }else{
                    $(".user-face").attr('src', d.data.member_avatar);
                }
                if(d.data.member_truename != ""){
                    $$('.user-name').text(d.data.member_truename||d.data.member_name||d.data.member_mobile);
                } else {
                    $$('.user-name').text(d.data.member_name != '' ? d.data.member_name : d.data.member_mobile);
                }

                if(d.data.is_audit == 0){
                    $$('.individual-status').text('认证中');
                } else if(d.data.is_audit == 1) {
                    $$('.individual-status').addClass('individual-status-1').text('未通过');
                } else if(d.data.is_audit == 2) {
                    $$('.individual-status').addClass('individual-status-2').attr('data-status', d.data.is_audit).text('已认证');
                } else {
                    $$('.individual-status').text('未认证');
                }

            } else {
                myApp.alert(d.msg);
            }


        }

    });
}

function userDetail(){
    myApp.showIndicator();
    $$.ajax({
        'url': 'http://127.0.0.1:3000',
        'type': 'post',
        'dataType': 'json',
        success: function(d){
            myApp.hideIndicator();
            if(d.status == 0){
                if (d.msgNum || d.unpayNum || d.renewNum) {
                    $$('.my-insured-wrapper').show();
                }
                if (d.msgNum) {
                    $$('.prompt').show()
                }

                hasNum(d.msgNum, 'message-num');
                hasNum(d.unpayNum, 'orders-num');
                hasNum(d.renewNum, 'renew-num');
                hasNum(d.voucherNum, 'voucher-num');
                hasNum(d.leftAmt, 'balance-fee');

                $$('.voucher-num').text(d.voucherNum);
                $$('.balance-fee').text((d.leftAmt).toFixed(2));
                $$('.invite-friend').text(d.inviteFriend);

                if($$('.individual-status').data('status')) {
                    $$('.individual-text').text('可享' + d.businessStr)
                } else {
                    $$('.individual-text').text('认证后' + d.businessStr)
                }
            }else{
                myApp.alert(d.msg);
           }
        },
        error: function(){
                myApp.hideIndicator();
                myApp.alert('加载失败，请刷新重试！');
            }
    });
}


function hasNum(num, id){
    if(num){
        $$("." + id).addClass("prompt-green").text(num);
    }
}