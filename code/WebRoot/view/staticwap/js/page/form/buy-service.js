/**
 * Created by yangwenshou on 15/8/30.
 */
seajs.use(['zepto','common','layer.m','loginable','components/refer-statistics/refer-statistics','user-operation'], function($, Common, Layer, Loginable, ReferStatistics,UserOperation) {
    Common.osDetect();

    //发送验证码
    var buyServiceArea=$('#buyServiceArea');
    var yzmDom=$('[name="modifyphone-yzm"]');
    var contactPhone=$('[name="contactphone"]');

    //验证手机号是否正确
    function checkMobileStyle(mobile){
        var myreg = /^1\d{10}$/;
        if(!myreg.test(mobile)){
            return false;
        }else {
            return true;
        }
    }
    function trim(str){
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    var vcodeFieldVisible = false;
    var fieldVCode = $('.control-input-vcode');
    var vcodeImg = fieldVCode.find('img');
    var seed = URL.captchaURL.split('=')[1];
    window.mobileVerify=false;

    vcodeImg.on('click', function() {
        this.src = URL.captchaURL + '&_t=' + (+new Date());
    });
    $('[name="seed"]').val(seed);


    var priceNum = $('.buy-service-con .top .price').text().replace(/¥/g, '');
    var originalPrice = parseFloat(priceNum.slice(0,priceNum.indexOf('/')));  //原价
    var puserTelDom = $('input[name="tel"]'); // 用户电话
    $('#priceNum').val(originalPrice);

    if($('.page-container').data('special-activity47') == 'bajietehui'){
        $('#priceNum').attr('readonly','readonly');
    }
    if(puserTelDom.val() != ''){
        //用户电话
        $('input[name="modifyphone"]').val(puserTelDom.val());
    }


    var btnFavDom = $('#btnFav');
    var telephoneNum;
    var priceNumDom = $('#priceNum');
    function commit_common(){

        telephoneNum = $('input[name="modifyphone"]');

        var _this = btnFavDom;
        url = _this.closest('form').attr('data-formurl');
        //简单描述 可以为空
        if(!buyServiceArea.val()){
            Common.animaTips('请描述您的具体要求！');
            return;
        }
        if(telephoneNum.length > 0) {
            if(!telephoneNum.val() || !checkMobileStyle(telephoneNum.val())){
                Common.animaTips('请输入正确的手机号码！');
                return;
            }
            $('input[name="telephoneNum"]').val(telephoneNum.val());
        }
        if(contactPhone.length > 0 && !Common.trim(contactPhone.val())) {
            Common.animaTips('请确认您的联系方式！');
            return;
        }
        if(yzmDom.length>0&&!yzmDom.val()){
            Common.animaTips('请输入验证码！');
            return;
        }
        if(parseInt(priceNumDom.val()).toString().length > 6) {
            Common.animaTips('您输入的预算金额不能超过一百万！');
            return;
        }

        if(originalPrice/2 > priceNumDom.val()) {
            Common.animaTips('您输入的预算不能低于服务价格的50%！');
            return;
        }

        if(!Common.checkFormPrice(priceNumDom, '金额')){ //校验赏金金额
            return;
        }

        if(btnFavDom.hasClass('disabled')){
            return false;
        }

        btnFavDom.addClass('disabled').html('提交中...');

        var data = $('#needsForm').serialize()+(($('.item.active input').length>0&&!$('.item.active input').hasClass('disable'))?("&voucherId="+$('.item.active input').val()):'');

        //统计
        var referParam = '?'+ReferStatistics.getStatisticsData()+'&pub_page='+encodeURIComponent(location.href);

        function commitFunc(){
            $.ajax({
                url: url + referParam,
                type: 'post',
                data: data,
                dataType: 'json',
                success: function (result) {
                    if (result.success) {
                        var amount=result.data.amount || result.data.taskAmount;
                        if (result.data.taskId && amount && Number(amount)>0) {
                            UserOperation.tuoguanPop(result.data.taskId);
                            //location.href = "/pay/payorder?amount=" + result.data.amount + "&taskId=" + result.data.taskId;
                            return;
                        }
                        $('.trade-num').html('交易编号：' + result.data.taskId);
                        var pagei = Layer.open({
                            type: 1, //1代表页面层
                            content: $('#dialog-trust').html(),
                            style: 'width:270px; height:300px;border:none;-webkit-border-radius: 4px;border-radius: 4px;',
                            success: function () {
                                if (btnFavDom.hasClass('disabled')) {
                                    btnFavDom.removeClass('disabled').html('提交');
                                }
                                $('.home-trust-dialog-hd .close').on('click', function () {
                                    var _this = $(this);
                                    Layer.close(pagei);
                                    window.location.href = _this.attr('data-url') + result.data.taskId+'/';
                                })
                            }
                        });
                    } else {
                        btnFavDom.removeClass('disabled').html('提交');
                        Common.animaTips(result.data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.status == 302) {
                        location.href = location.href.slice(0, location.href.indexOf('service/buy')) + 'login';
                        return;
                    }
                    btnFavDom.removeClass('disabled').html('提交');
                    Common.animaTips('网络错误！');
                }
            });
        }

        if(telephoneNum.length > 0) {
            if(!Loginable.quickLogin()) {
                btnFavDom.removeClass('disabled').html('提交');
                return;
            }else {
                commitFunc();
            }
        }else {
            commitFunc();
        }

    }

    btnFavDom.on('click',function(){
        commit_common();
    });

    //监听输入框的状态，提交按钮状态改变
    Common.submitState();


});