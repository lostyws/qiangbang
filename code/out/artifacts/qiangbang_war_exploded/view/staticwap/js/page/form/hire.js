seajs.use(['zepto','common','layer.m','loginable','juicer','components/refer-statistics/refer-statistics','user-operation'], function($, Common, Layer, Loginable,Juicer, ReferStatistics,UserOperation) {
    Common.osDetect();
    //监听输入框的状态，提交按钮状态改变
    Common.submitState();

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
    var btnFavDom = $('#btnFav');
    var priceNumDom=$('#priceNum');
    var vcodeFieldVisible = false;
    var fieldVCode = $('.control-input-vcode');
    var vcodeImg = fieldVCode.find('img');
    var seed = URL.captchaURL.split('=')[1];
    vcodeImg.on('click', function() {
        this.src = URL.captchaURL + '&_t=' + (+new Date());
    });
    $('[name="seed"]').val(seed);

    var puserAmount = $('input[name="puserAmount"]').val(); // 推广员金额
    var puserTelDom = $('input[name="telephoneNum"]'); // 用户电话
    if(puserAmount){
        $('#priceNum').val(puserAmount);
    }
    if(puserTelDom.val() != ''){
        //用户电话
        $('input[name="modifyphone"]').val(puserTelDom.val());
    }


    function commit_common(){

        var telephoneNum = $('input[name="modifyphone"]');

        var hireArea=$('#hireArea');
        var priceNum = $('#priceNum');
        var modifyphoneYzm = $('input[name="modifyphone-yzm"]').val();
        var categoryHire=$("#category-hire");

        var _this = btnFavDom;
        url = _this.closest('form').attr('data-formurl');
        if(!categoryHire.val()){
            Common.animaTips('请选择合适的类目');
        }
        if(!hireArea.val()){
            Common.animaTips('请描述您的具体要求！');
            return;
        }
        if(telephoneNum.length > 0) {
            if (!telephoneNum.val() || !checkMobileStyle(telephoneNum.val())) {
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
        if(!Common.checkFormPrice(priceNumDom, '金额')){ //校验赏金金额
            return;
        }


        if(btnFavDom.hasClass('disabled')){
            return false;
        }

        btnFavDom.addClass('disabled').html('提交中...');

        var price = $('input[name="price"]').val(),
            content = $('input[name="content"]').val(),
            modifyphone = $('input[name="modifyphone"]').val();

        //统计
        var referParam = '?'+ReferStatistics.getStatisticsData()+'&pub_page='+encodeURIComponent(location.href);

        function commitFunc(){
            $.ajax({
                url: url + referParam,
                type: 'post',
                data: $('#needsForm').serialize(),
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
                            style: 'width:270px; height:300px; border:none;-webkit-border-radius: 4px;border-radius: 4px;',
                            success: function () {
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
                error: function () {
                    btnFavDom.removeClass('disabled').html('提交');
                    Common.animaTips('网络错误！');
                }
            })
        }






        if(telephoneNum.length > 0) {
            if (!Loginable.quickLogin()) {
                btnFavDom.removeClass('disabled').html('提交');
                return;
            } else {
                commitFunc();
            }
        }else{
            commitFunc();
        }
    }

    //这里是冗余代码，由于其他分支里文件有改动，等之后再重构
    (function(){
        var telephoneNum = $('input[name="modifyphone"]');

        var hireArea=$('#hireArea');
        var priceNum = $('#priceNum');
        var modifyphoneYzm = $('input[name="modifyphone-yzm"]').val();

        var _this = btnFavDom;
        url = _this.closest('form').attr('data-formurl');
        if(!hireArea.val()){
            return;
        }
        if(telephoneNum.length > 0) {
            if (!telephoneNum.val() || !checkMobileStyle(telephoneNum.val())) {
                return;
            }
            $('input[name="telephoneNum"]').val(telephoneNum.val());
        }
        if(contactPhone.length > 0 && !Common.trim(contactPhone.val())) {
            return;
        }
        if(yzmDom.length>0&&!yzmDom.val()){
            return;
        }
        if(parseInt(priceNumDom.val()).toString().length > 6) {
            return;
        }

        if(!Common.checkFormPrice(priceNumDom, '金额')){ //校验赏金金额
            return;
        }

        btnFavDom.removeClass('disabled')

    })();
    //冗余代码结束

    btnFavDom.on('click',function(){
        commit_common();
    });

    //保障没有时候，不占位
    if(!$(".guarantee p").length){
        $(".guarantee").addClass("displayed");
    }

    //雇用新增类目--展示类目
    window.juicer=Juicer;
    $.ajax({
        url: "/hirecategory/"+Common.getPar('salerId')+"/",
        //url: "/hirecategory/",
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if(result.success){
                //模版渲染
                var categorySelect = $('#category-hire-select').html(),
                    hireBox=$(".category-layermmain");

                var html = Juicer(categorySelect, result);
                //console.log(html);
                hireBox.html(html);
                $(".indicate").on('click', function () {
                    //console.log( $(".category-laymshade"));
                    $(".category-laymshade").addClass("sideshow");
                    $("body").addClass("position-fixed");
                    $(".category-layermmain").addClass("sideanimat").removeClass("sideanimat-out");
                });
                $(".category-layer-list").on('click',function(){
                    $(".category-laymshade").removeClass("sideshow");
                    $("body").removeClass("position-fixed");
                    $(".category-layermmain").removeClass("sideanimat").addClass("sideanimat-out");
                    $("#category-hire").val($(this).text().trim());

                    $('input[name="baseCat1"]').val($(this).attr('data-baseCat1'));
                    $('input[name="baseCat2"]').val($(this).attr('data-baseCat2'));
                    $('input[name="baseCat3"]').val($(this).attr('data-baseCat3'));
                    $('#category-hire').change();
                });
                $(".category-laymshade").on('click',function(){
                    $(this).removeClass("sideshow");
                    $("body").removeClass("position-fixed");
                    $(".category-layermmain").removeClass("sideanimat").addClass("sideanimat-out");
                });
            }else{
                Common.animaTips(result.data);
            }
        },
        error: function () {
            btnFavDom.removeClass('disabled').html('提交');
            Common.animaTips('网络错误！');
        }
    });


});