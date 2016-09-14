/**
 * Created by yangwenshou on 15/8/31.
 */
seajs.use(['zepto','common','layer.m','loginable','juicer','components/refer-statistics/refer-statistics','user-operation'], function($, Common, Layer, Loginable, Juicer, ReferStatistics ,UserOperation) {
    Common.osDetect();

    var priceNumDom =  $('#priceNum');
    var yzmDom=$('[name="modifyphone-yzm"]');
    var contactPhone=$('[name="contactphone"]');
    var categorySelect = $('#category-select');
    var categoryDom = $('#category');
    var modeDom = $('#model');
    var animationTipsSpan = $('#animationTips span');
    var numDom = $('#num');
    var priceDom = $('#price');
    var needArea=$('#needArea');
    var telephoneNum;
    var priceNumReg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/; //两位小数
    var shadeLayer;
    var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1;

    //给发类似需求过来的表单页金额处重新赋值
    var priceNumSimilar = priceNumDom.val();
    var regPriceNum = /^[-+]?\d+(\.\d+)?$/.test(Number(priceNumSimilar));
    if(window.location.href.indexOf('similarRequirementDesc')>0){
        if(regPriceNum) {
            priceNumDom.val(Math.ceil(Number(priceNumSimilar)));
        }
    }

    var tpl = categorySelect.html();
    var url = categorySelect.attr('data-categoryUrl');
    $.getJSON(url,function(res){
        res.list = res.data || [];
        if(res.list.length) {
            //选择需求种类
            $('.select-category').on('click',function(e){
                e.preventDefault();
                var html = [];
                shadeLayer = Layer.open({
                    type: 1,
                    content: $('#shade-category').html(),
                    style: 'width:270px; height:300px; background-color:#f3f3f3; color:#373737; border-radius: 5px;'
                });

                var categorySelectDom = $('.shade-category .category-select');

                $.each(res.list, function (index, item) {
                    html.push(Juicer(tpl, item));
                });
                var items = $(html.join(""));
                categorySelectDom.append(items);

                var buttonDom = categorySelectDom.find('button');
                $(buttonDom).each(function(i){
                    $(this).attr('data-linkid',10006699+i);
                });

                $('.shade-category-title .close').on('click',function(){
                    Layer.close(shadeLayer);
                });

                if(isAndroid) {
                    Common.noBarsOnTouchScreen('categoryScroller');
                }
            });

        }else {
            Common.animaTips('获取类目失败！');
            return;
        }
    },function(){
        Common.animaTips('网络错误！');
        return;
    });
    //选择种类+自动切换交易模式
    $('body').on('click','.category-list',function(){
        categoryDom.val($(this).data('category'));
        categoryDom.attr('data-categoryId',$(this).data('categoryid'));
        categoryDom.attr('minimum',$(this).attr('minimum'));

        $('input[name="categoryId"]').val($(this).data('categoryid'));
        needArea.val('我需要做' + $(this).data('category'));
        $("#priceNum").attr('placeholder','最低'+$(this).attr('minimum')+'元');
        var minimum = $('#category').attr('minimum');
        //input[name=mode]  1：计件 2：招标 3：比稿
        switch(categoryDom.val()){
            case '社会化营销':
            case '店铺推广':
                modeDom.val(1);
                numDom.val('');
                $('.calculate').parent().removeClass('hide');
                priceNumDom.attr('readonly','readonly');
                numDom.addClass('need-must');
                priceDom.addClass('need-must');
                break;
            default :
                modeDom.val(2);
                numDom.val(0);
                numDom.removeClass('need-must');
                priceDom.removeClass('need-must');
                $('.calculate').parent().addClass('hide');
                if(priceNumDom.attr('readonly')){
                    priceNumDom.removeAttr('readonly');
                }
        }
        Layer.close(shadeLayer);
    });

    //自动计算赏金
    // numDom.on('blur',function(){

    // });
    // priceDom.on('blur',function(){

    // });


    var vcodeFieldVisible = false;
    var fieldVCode = $('.control-input-vcode');
    var vcodeImg = fieldVCode.find('img');
    var seed = URL.captchaURL.split('=')[1];
    vcodeImg.on('click', function() {
        this.src = URL.captchaURL + '&_t=' + (+new Date());
    });
    $('[name="seed"]').val(seed);



    // 金额、数量监听
    priceDom.on('change',function(){
        if(priceDom.val()){
            if(!Common.checkFormPrice(priceDom, '单件价格')){ //校验单件价格
                return;
            }
            if(priceDom.val()<1){ //校验单件价格
                Common.animaTips('投标很幸苦的，所以单价不要低于1元哟！');
                return;
            }
        }else{
            $('#priceNum').val(0);
        }
    });
    numDom.on('change',function(){
        if(numDom.val()){
            if(!/^[0-9]*$/.test(numDom.val())){
                Common.animaTips('请输入正确的数目！');
                return;
            }
        }else{
            $('#priceNum').val(0);
        }
    });
    priceDom.on('keyup',function(){
        if(!priceDom.val()==''&& priceNumReg.test(priceDom.val())&&
            !numDom.val()==''&&/^[0-9]*$/.test(numDom.val())){
            $('#priceNum').val(Math.ceil(priceDom.val())*numDom.val());
        }
    });
    numDom.on('keyup',function(){
       if(!priceDom.val()==''&& priceNumReg.test(priceDom.val())&&
            !numDom.val()==''&&/^[0-9]*$/.test(numDom.val())){
            $('#priceNum').val(Math.ceil(priceDom.val())*numDom.val()); //js浮点数相乘向上取整
        }
    });
    var puserAmount = $('input[name="puserAmount"]').val(); // 推广员金额
    var puserTelDom = $('input[name="tel"]'); // 用户电话
    if(puserAmount){
        $('#priceNum').val(puserAmount);
    }
    if(puserTelDom.val() != ''){
        //用户电话
        $('input[name="modifyphone"]').val(puserTelDom.val());
    }
    telephoneNum = $('input[name="modifyphone"]');

    //从搜索结果商机过来
    if(Common.getPar('tels') && Common.getPar('channelId')){
        telephoneNum.val(Common.getPar('tels'));
    }

    var btnFavDom = $('#btnFav');
    var priceNumDom = $('#priceNum');
    function commit_common(){
        function needsHtmlString(){
            var htmlString = '';
            $('.display-box .item p').each(function(){
                var _this = $(this);
                function textDomValue(dom){
                    return dom.contents().filter(function() {
                        return this.nodeType === 3;
                    }).text();
                }
                var _thisTextDom = textDomValue(_this);

                htmlString += _thisTextDom + _this.find('strong').text() + '。';
            });
            return htmlString;
        }
        //拼接添加的需求到需求描述
        var simpleDiscription;
        if(needsHtmlString()){
            simpleDiscription = $('#needs-title').val() + '。' + needsHtmlString();
        }else {
            simpleDiscription = $('#needs-title').val();
        }
        $('#needs-title').val(simpleDiscription);

        var _this = btnFavDom;
        url = _this.closest('form').attr('data-formurl');
        if(!Common.trim($('#needs-title').val())){
            Common.animaTips('请描述您的具体要求！');
            return;
        }
        if(telephoneNum.length > 0) {
            if (!telephoneNum.val() || !Common.checkMobileStyle(telephoneNum.val())) {
                Common.animaTips('请输入正确的手机号码！');
                return;
            }
            $('input[name="telephoneNum"]').val(telephoneNum.val());
        }
        if(contactPhone.length > 0 && !Common.trim(contactPhone.val())) {
            Common.animaTips('请确认您的联系方式！');
            return;
        }
        if(yzmDom.length>0&&!Common.trim(yzmDom.val())){
            Common.animaTips('请输入验证码！');
            return;
        }
        if(!$('#category').val()){
            Common.animaTips('请选择一个类目！');
            return;
        }

        var priceVal = $('#priceNum').val();
            if(priceVal<1){ //校验单件价格
                Common.animaTips('投标很幸苦的，所以单价不要低于1元哟！');
                return;
            }
            var minimum = $('#category').attr('minimum');

            if(priceVal==''||!/^[0-9]*$/.test(numDom.val())){
                Common.animaTips('请输入正确的数目！');
                return;
            }
            if(priceVal<minimum*1){ //校验最低价
                Common.animaTips('单价不能低于最低价'+minimum+'元');
                return;
            }


        if(parseInt(priceVal).toString().length > 6 ){
            Common.animaTips('预算不能超过一百万！');
            return;
        }

        if(!Common.checkFormPrice(priceNumDom, '金额')){ //校验赏金金额
            return;
        }

        if($('#category').val()=='选择类目')
        {
            $('#category').val('其他');
        }

        if(!priceDom.val()){
            priceDom.val('');  // 不是计件传空字符串
        }

        if(btnFavDom.hasClass('disabled')){
            return false;
        }
        btnFavDom.addClass('disabled').html('提交中...');

        //统计
        var referParam='?'+ReferStatistics.getStatisticsData()+'&pub_page='+encodeURIComponent(location.href);

        function commitFunc(){
            $.ajax({
                url: url + referParam,
                type: 'post',
                data: $('#needsForm').serialize(),
                dataType: 'json',
                success: function (result) {
                    // 处理验证码
                    /* vcodeImg[0].src = URL.captchaURL + '&_t=' + (+new Date());*/
                    if (!result) {
                        Common.animaTips('提交失败！');
                        btnFavDom.removeClass('disabled').html('提交');
                        return false;
                    }
                    if (result.success) {
                    	window.location.href = result.data;
                        btnFavDom.removeClass('disabled').html('提交');
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
            //表单提交
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

    //按钮状态更改
    Common.submitState();

});