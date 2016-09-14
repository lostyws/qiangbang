define(__uri('loginable'),['zepto','common','juicer','layer.m'],function(require, exports, module){
    var $ = require('zepto');
    var Common = require('common');
    var Juicer = require('juicer');
    var Layer = require('layer.m');
    var ReferStatistics = require('components/refer-statistics/refer-statistics');
    var mstoken=$('[name="mstoken"]').val();
    Juicer.set({
        'tag::interpolateOpen': '{{',
        'tag::interpolateClose': '}}'
    });

    var flag=false;//判断是否执行了ready方法
    var modifyPhoneYzm = $('input[name="modifyphone-yzm"]');
    var modifyphone = $('input[name="modifyphone"]');
    var modifyphoneBtn = $('.employ-dialog-modifyphone-verify');//验证
    var puserid = $('input[name="puserid"]').val(); // 推广员金额

    //改变默认的样式
    function ready(){
        $('.form-page-loading').remove();//移除loading
        var inputVerifyVal,modifyphoneVal ;
        var loginArea = $('#loginArea');

        var wait=60;
        function time(modifyphoneBtn,e){
            if( modifyphoneBtn.hasClass('disabled') ){
                return false;
            }
            loopTimer(modifyphoneBtn);
        }

        function loopTimer(modifyphoneBtn){
            // if( wait > 0 ){
            //     modifyphoneBtn.addClass('disabled');
            //     modifyphoneBtn.removeClass('btn-press-down');
            //     modifyphoneBtn.html("重新发送(" + wait + ")");
            //     wait--;
            //     console.log(setTimeout(loopTimer,1000));
            // } else {
            //     modifyphoneBtn.html("获取验证码");
            //     modifyphoneBtn.removeClass('disabled');
            //     modifyphoneBtn.addClass('btn-press-down');
            //     wait = 60;
            // }

            //从setTimeout修改为Interval
            if( wait > 0 ){
                modifyphoneBtn.addClass('disabled');
                modifyphoneBtn.removeClass('btn-press-down');
                modifyphoneBtn.html("重新发送(" + wait + ")");
                wait--;
                // console.log(setTimeout(loopTimer,1000));
            }
            window.timeInterval=setInterval(function(){
                if( wait > 0 ){
                    modifyphoneBtn.html("重新发送(" + wait + ")");
                    wait--;
                    // console.log(timeInterval);
                } else {
                    modifyphoneBtn.html("获取验证码");
                    modifyphoneBtn.removeClass('disabled');
                    modifyphoneBtn.addClass('btn-press-down');
                    wait = 60;
                    clearInterval(window.timeInterval);
                }
            },1000)
        }
        function getStart() {
            modifyphoneBtn.text('正在发送');
            window.circulateTime=setInterval(function(){
                if(modifyphoneBtn.text()=='正在发送'){
                    modifyphoneBtn.text('正在发送.');
                }else if(modifyphoneBtn.text()=='正在发送.'){
                    modifyphoneBtn.text('正在发送..');
                }else if(modifyphoneBtn.text()=='正在发送..'){
                    modifyphoneBtn.text('正在发送...');
                }else{
                    modifyphoneBtn.text('正在发送');
                }
            },350);
        }
        function getEnd(){
            modifyphoneBtn.html("获取验证码");
            modifyphoneBtn.removeClass('disabled');
            modifyphoneBtn.addClass('btn-press-down');
            clearInterval(circulateTime);
        }
        //监听输入框状态
        $('body').delegate('input[name="modifyphone"]', 'keyup change',function(e){
            e.stopPropagation;
            var modifyphone = $('input[name="modifyphone"]');
            var modifyphoneBtn = $('.employ-dialog-modifyphone-verify');//验证
            modifyphoneVal = modifyphone.val();
            if(!Common.checkMobileStyle(modifyphoneVal)){
                modifyphoneBtn.addClass('disabled');
            }else {
                modifyphoneBtn.removeClass('disabled');
            }
        });

        if(Common.checkMobileStyle(modifyphone.val())){
            modifyphoneBtn.removeClass('disabled');
        }

        $('body').delegate('.employ-dialog-modifyphone-verify', 'click', function(e){
            e.preventDefault();
            e.stopPropagation();
            var modifyphone = $('input[name="modifyphone"]');
            var modifyphoneBtn = $('.employ-dialog-modifyphone-verify');//验证
            if(!/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(modifyphone.val())) {
                Common.animationTips();
                $('#animationTips span').html('请输入正确的手机号');
                return;
            }
            if(modifyphoneBtn.hasClass('disabled')) {
                Common.animationTips();
                $('#animationTips span').html('请等待或刷新页面重试！');
                return;
            }
            var data = {
                tel: modifyphone.val(),
                mstoken: mstoken
            };
            var getCodeUrl;
            getStart();
            if(loginArea.data('islogin') == 1){
                //已登录，修改用户联系手机号--验证码
                getCodeUrl = '/user/sendVerifyCode';
            }else {
                getCodeUrl = '/user/getQuickCode';
            }
            $.ajax({
                type: 'post',
                url: location.origin + getCodeUrl,
                data: data,
                success: function(res){
                    getEnd();
                    if(res.success){
                        time(modifyphoneBtn,e);
                    }else{
                        Common.animationTips();
                        $('#animationTips span').html(res.data);
                    }

                },
                error: function(){
                    getEnd();
                    Common.animationTips();
                    $('#animationTips span').html('网络错误');
                }
            })
        });

        var shadeLayerModify;
        //修改联系方式
        $('.employ-dialog-modifyphone-bind').on('click',function(){
            shadeLayerModify = Layer.open({
                type: 1,
                content: $('#telephone-modify').html(),
                style: 'width:270px; height:230px; background-color:#f3f3f3; color:#373737; border-radius: 5px;',
                shadeClose: false,
            });
        });

        $('body').delegate('.telephone-modify .close,.telephone-modify .cancle', 'click', function(){
            Layer.close(shadeLayerModify);
        });

        //发送短信修改
        $('body').delegate('.telephone-modify .sure', 'click', function(){
            var contactPhone = $('input[name="contactphone"]');
            var modifyPhone = $('input[name="modifyphone"]');
            //展示已登录的手机号
            //modifyPhone.val(contactPhone.val());
            if(module.exports.modifyTelephone()){
                Layer.close(shadeLayerModify);
                var modifyphoneVal = modifyPhone.val();
                contactPhone.val(modifyphoneVal);
                contactPhone.trigger('change');
            }
        });
    }

    window.onload = function () {
        if (!flag) {
            flag = true;
            ready();
        }
    }

    setTimeout(function () {
        if (!flag) {
            flag = true;
            window.stop();
            ready();
        }
    }, 5000);
    module.exports = {
        quickLogin: function () {
            var isLoginFlag = false;
            var loginUrl = '/user/quickLogin';
            var modifyphone = $('input[name="modifyphone"]');
            var modifyPhoneYzm = $('input[name="modifyphone-yzm"]');
            //统计
            var referParam = '?'+ReferStatistics.getStatisticsData()+'&reg_page='+encodeURIComponent(location.href);
            var data = {
                code: modifyPhoneYzm.val(),
                tel: modifyphone.val(),
                mstoken: mstoken,
                puserid: puserid
            };
            $.ajax({
                url: loginUrl + referParam,
                type: 'post',
                data: data,
                async: false,
                success: function (res) {
                    if (res.success) {
                        isLoginFlag = true;
                    }else{
                        
                        Common.animaTips(res.data);
                        
                        isLoginFlag = false;
                    }
                },
                error: function () {
                    Common.animationTips();
                    $('#animationTips span').html('网络错误！');
                    isLoginFlag = false;
                }
            });
            return isLoginFlag;
        },
        modifyTelephone: function(){
            var isModifyTelePhone = false;
            var modifyphone = $('input[name="modifyphone"]');
            var modifyPhoneYzm = $('input[name="modifyphone-yzm"]');
            var url = '/user/editUserMobile';
            var data = {
                tel: modifyphone.val(),
                code: modifyPhoneYzm.val(),
                mstoken: mstoken
            }
            $.ajax({
                url: url,
                data: data,
                type: 'post',
                async: false,
                success: function(res){
                    if(res.success){
                        isModifyTelePhone = true;
                    }else{
                        Common.animationTips();
                        $('#animationTips span').html(res.data);
                        modifyPhoneYzm.val('');
                        isModifyTelePhone = false;
                    }
                },
                error: function(){
                    Common.animationTips();
                    $('#animationTips span').html('网络错误');
                    modifyPhoneYzm.val('');
                    isModifyTelePhone = false;
                }
            });
            return isModifyTelePhone;
        }
    }
});

