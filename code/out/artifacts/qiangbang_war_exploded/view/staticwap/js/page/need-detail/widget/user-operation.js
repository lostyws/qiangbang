define(__uri('user-operation'),['zepto','common','layer.m','bridge','bridge-data'],function(require, exports, module) {
    var $ = require('zepto');
    var Common = require('common');
    var Layer = require('layer.m');
    var Bridge = require('bridge');
    var BridgeData = require('bridge-data');
    var shadeLayer;
    var reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
    var isMaiJiaBanApp = navigator.userAgent.match('zbj');

    var UserOperation = {
        closeLayer: function(domList,layerName){
            domList.on('click',function(e){
                e.preventDefault();
                Layer.close(layerName);
            });
        },
        postJson: function(url, data, success, error){
            $.ajax({
                url: url,
                data: data,
                dataType: 'json',
                type: 'post',
                success: success,
                error: error
            });
        },
        jumpToNewPage: function(dom, url, BridgeDataName, BrigeDataParam){
            $(dom).on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                if(!isMaiJiaBanApp || !BrigeDataParam){
                    var isZhaoBiao = $('input[name="isBid"]').val();
                    if(isZhaoBiao == 'true' && dom == '.agreement-view'){
                        Common.animaTips('功能正在开发中，请移步至网站查看');
                        return;
                    }
                    location.href = url;
                }else {
                    if(BrigeDataParam){
                        var bridgeData = BridgeDataName;
                        $.each(BrigeDataParam, function(key, value){
                            bridgeData.param[key] = value;
                        });
                        Bridge.callByJS(bridgeData);
                    }
                }
            });
        },
        layerOpen: function(option, flagAndJump){
            //option {} targetDom目标操作元素  tpl：待打开的弹窗id， closeDom：关闭弹窗时触发的dom  replaceContentDom:替换弹窗中content内容, totalPrice:总价--
            //---percent：比例 notPay：未支付金额
            //flagAndJump {}  flag 满足哪种条件  url 跳转的地址 isFormPrice 表单金额
            option = option || {};
            flagAndJump = flagAndJump || {};

            function layerContent(){
                var rewardIptDom = $('input[name="tuoguan-reward-input"]');
                var price;
                if(flagAndJump && flagAndJump.isFormPrice) {
                    price = rewardIptDom.val();
                    if(!UserOperation.testInputPrice(price)){
                        return;
                    }
                    flagAndJump.param.amount = price;
                }
                if(flagAndJump && flagAndJump.flag){
                    //分配了交易顾问则直接跳往交易协作页面
                    window.location = flagAndJump.url + (flagAndJump.param ? '?' + $.param(flagAndJump.param) : '');
                    return;
                }
                if(shadeLayer != undefined) {
                    //此时证明当前已经有个弹窗了，默认把当前弹窗关掉,
                    //业务场景：工作台或者雇佣购买详情，重新定价和增加赏金会有两个弹窗出现的时候
                    //若不需要关闭，则扩展插件即可
                    Layer.close(shadeLayer);
                }
                shadeLayer = Layer.open({
                    type: 1,
                    content: $(option.tpl).html()
                });
                if(option.replaceTitleContent){
                    $('.confirm-title').html(option.replaceTitleContent);
                }
                if(option.replaceContentDom){
                    $('.confirm-body').html($(option.replaceContentDom).html());
                }
                if(option.totalPrice){
                    $('.j-reward-totalPrice').html(option.totalPrice);
                    $('input[name="totalprice"]').val(option.totalPrice);
                }
                if(option.percent){
                    $('.j-reward-percent').html(option.percent);
                    $('input[name="tuoguan-reward-percent"]').val(option.percent);
                }
                if(option.notPay){
                    $('.j-reward-not-pay').html(option.notPay);
                    $('.next-tuoguan-no-percent input[name="tuoguan-reward-input"]').val(Number(option.notPay));
                    $('input[name="not-pay-price"]').val(Number(option.notPay));
                }
                //给弹窗的输入框自动填充剩余金额
                UserOperation.closeLayer($(option.closeDom), shadeLayer);
                UserOperation.shadeLayer();
            }

            if(option.targetDom){
                $(option.targetDom).on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    layerContent();
                });
            }else{
                layerContent();
            }
        },
        testInputPrice: function(price){
            if(parseInt(price).toString().length > 7) {
                Common.animaTips('输入的金额不能超过一百万');
                return false;
            }
            if(!reg.test(price) || Number(price) == 0){
                Common.animaTips('请输入正确的金额');
                return false;
            }
            return true;
        },
        addClassForRefresh: function(){
            $('.confirm-con').addClass('refresh-current-page');
        },

        //max 托管总金额 如2000.0
        //percent 托管最小百分比 如 10%
        testInputPriceAdd:function(price,max,percent){
            if(UserOperation.testInputPrice(price)){
                if(Number(price) > Number(max)) {
                    Common.animaTips('托管金额不得大于总金额');
                    return false;
                }
                if(Number(price) < Number(max) * Number(percent.replace("%","")) / 100){
                    Common.animaTips('分期托管金额不得小于总金额的'+percent);
                    return false;
                }
                return true;
            }
            else{
                return false;
            }
        },
        //callback为bridge操作
        tuoguanPop:function(taskId,callback){
            if(!window.tuoguanSend){
                window.tuoguanSend=true;
                $.getJSON('/pay/isStagehost/?taskId=' + taskId, function(res){
                    window.tuoguanSend=false;
                    if( navigator.userAgent.toLowerCase().match('zbj') && res.data.taskAmount && callback){
                        callback(res.data.taskAmount);
                        return;
                    }
                    if(res.success && !!res.data.isAllowStagesHost){ //可分期
                        //根据未支付金额和订单金额相比是否相等，相等则未托管
                        if(Number(res.data.notHostedAmount) != Number(res.data.taskAmount)){
                            //已经托管了，再次托管就不受百分比控制，只需要关心未托管的金额
                            UserOperation.layerOpen({
                                targetDom: '',
                                tpl: '#next-tuoguan-no-percent',
                                closeDom: '.close, .laymshade,.next-tuoguan-no-percent .cancle',
                                replaceContentDom: '#nextTuoguanNoPercentContent',
                                totalPrice: res.data.taskAmount,
                                notPay: res.data.notHostedAmount
                            });
                        }else{
                            UserOperation.layerOpen({
                                targetDom: '',
                                tpl: '#sure-tuoguan',
                                closeDom: '.close, .laymshade,.sure-tuoguan .cancle',
                                replaceContentDom: '#sureTuoguanContent',
                                totalPrice: res.data.taskAmount,
                                percent: res.data.taskLowestPercent
                            });
                        }
                        $('.confirm-bottom .sure').click(function(){
                            var price = $('input[name="tuoguan-reward-input"]').val();
                            var not_pay = $('.j-reward-not-pay').html();
                            var max=res.data.taskAmount;
                            var percent = res.data.taskLowestPercent;
                            if(not_pay){
                                max=Number(not_pay);
                                percent="0";
                            }
                            if(!UserOperation.testInputPriceAdd(price,max,percent)) {
                                return;
                            }
                            location.href = '/pay/payorder?taskId='+ taskId + '&amount=' + price;
                        });

                        $('.confirm-bottom .cancle').click(function(){
                            location.href = '/task/'+ taskId;
                        });
                    }else{
                        //不满足分期就跳收银台 taskAmount: 接口返回的订单金额
                        location.href = '/pay/payorder?taskId='+ taskId + '&amount=' + res.data.notHostedAmount;
                    }
                }, function(){
                    window.tuoguanSend=true;
                    Common.animaTips('网络错误');
                });
            }
        },
        userOperationArea: {
            moreHelpBtn: function(){
                var moreHelpButtonList = $('.more-help-button-list');
                $('.need-detail-content .more-action').on('click', function(){
                    moreHelpButtonList.toggleClass('active');
                    $('.help-container').toggleClass('active');
                });
            },
            adviserOperation: function(hasAdviser,param){
                //顾问协助
                var adviserjump = {
                    flag: !!hasAdviser && !!hasAdviser.val(),
                    url: '/hire/toConnectionPage',
                    param: param
                };
                var dom = {
                    targetDom: '.adviser-cooperate',
                    tpl: '#contact-adviser',
                    closeDom: '.close, .laymshade'
                };
                UserOperation.layerOpen(dom,adviserjump);
            },
            closeTask: function(taskId){
                //关闭需求
                var shadeLayer = UserOperation.layerOpen({
                    targetDom: '.help-button .power',
                    tpl: '#task-close',
                    closeDom: ' .task-close .cancle'
                });

                $('body').delegate('.task-close .sure', 'click', function(){
                    var data = {
                        taskId: taskId
                    };
                    UserOperation.postJson('/task/canceltask', data, function(data){
                        if(data.success){
                            Common.animaTips('需求关闭成功！');
                            setTimeout(function(){
                                window.location.href = '/task/' + taskId + '/';
                            },500)
                        }else{
                            Common.animaTips(data.data);
                        }
                        Layer.close(shadeLayer);
                    },function(){
                        Common.animaTips('网络错误');
                        Layer.close(shadeLayer);
                    });
                });
            },
            tuoguanReward: function(taskId,totalAmount){
                //托管赏金 是否满足分期，不满足直接跳收银台  满足则弹窗：  已托管->继续托管  未托管->确认托管
                $('.tuoguan-reward').on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    var _this = $(this);
                    tuoguanInner(_this,taskId,totalAmount);
                });

                $('body').delegate('.tuoguan-reward', 'click', function(e){
                    e.stopImmediatePropagation();
                    var _this = $(this);
                    tuoguanInner(_this,taskId,totalAmount);
                });

                function tuoguanInner(_this,taskId, totalAmount){
                    var price,userItemTaskId;
                    //个人中心订单列表托管按钮处，获取金额
                    if(!totalAmount){
                        var priceValue = Common.trim(_this.closest('.order-item').find('.amount').html());
                        if(priceValue.match('¥')){
                            price = priceValue.replace('¥','');
                        }
                    }
                    totalAmount = totalAmount || price;

                    userItemTaskId = _this.attr('data-taskid');
                    taskId = userItemTaskId || taskId ;
                    $('input[name="userItemTaskId"]').val(userItemTaskId);

                    $.getJSON('/pay/isStagehost/?taskId=' + taskId, function(res){
                        if(res.success){
                            if(!isMaiJiaBanApp){
                                if(!!res.data.isAllowStagesHost) {//可分期
                                    //根据未支付金额和订单金额相比是否相等，相等则未托管
                                    if(Number(res.data.notHostedAmount) != Number(res.data.taskAmount)){
                                        //已经托管了，再次托管就不受百分比控制，只需要关心未托管的金额frog
                                        UserOperation.layerOpen({
                                            targetDom: '',
                                            tpl: '#next-tuoguan-no-percent',
                                            closeDom: '.close, .laymshade,.next-tuoguan-no-percent .cancle',
                                            replaceContentDom: '#nextTuoguanNoPercentContent',
                                            totalPrice: res.data.taskAmount,
                                            notPay: res.data.notHostedAmount
                                        });
                                    }else{
                                        UserOperation.layerOpen({
                                            targetDom: '',
                                            tpl: '#sure-tuoguan',
                                            closeDom: '.close, .laymshade,.sure-tuoguan .cancle',
                                            replaceContentDom: '#sureTuoguanContent',
                                            totalPrice: res.data.taskAmount,
                                            percent: res.data.taskLowestPercent
                                        });
                                    }
                                }else{
                                    //不满足分期
                                    window.location = '/pay/payorder?taskId='+ taskId + '&amount=' + res.data.notHostedAmount;
                                }
                            }else{
                                var bridgeData = BridgeData.rewardTuoguan;
                                bridgeData.param.taskid = taskId;
                                bridgeData.param.amount = res.data.notHostedAmount;
                                Bridge.callByJS(bridgeData);
                            }
                        }else{
                            //比稿计件不满足分期，直接用总金额付款
                            window.location = '/pay/payorder?taskId='+ taskId + '&amount=' + totalAmount;
                        }
                    },function(){
                        Common.animaTips('网络错误');
                    });
                }
            },
            payfor: function(taskId, workId, salerId){
                //同意付款、付款给服务商
                var url = '/bidpay/tobuyerpay?taskId='+ taskId +'&workId='+ workId +'&salerId=' + salerId;
                var BridgeDataName = BridgeData.agreePay;
                var BrigeDataParam = {
                    taskid: taskId,
                    workid: workId,
                    salerid: salerId
                };
                UserOperation.jumpToNewPage('.confirm, .payfor', url, BridgeDataName, BrigeDataParam);
            },
            refresh: function(taskId){
                //重新定价
                UserOperation.layerOpen({
                    targetDom: '.refresh',
                    tpl: '#refresh-a-price',
                    closeDom: '.close, .laymshade,.refresh-a-price .cancle',
                    replaceContentDom: '#refreshAPriceContent'
                });

                $('body').delegate('.refresh-a-price .sure', 'click', function(){
                    var price = $('input[name="tuoguan-reward-input"]').val();
                    if(!UserOperation.testInputPrice(price)) {
                        return;
                    }
                    //if(Number(price) <= Number($('input[name="totalprice"]').val())){
                    //    Common.animaTips('修改的金额不能小于托管金额噢');
                    //    return;
                    //}
                    var data = {
                        taskId: taskId,
                        amount: price
                    };
                    UserOperation.postJson('/task/editreward',data, function(result){
                        if(result.success){
                            $.getJSON('/pay/isStagehost/?taskId=' + taskId, function(res){
                                if(res.success && !!res.data.isAllowStagesHost){ //可分期
                                    //满足分期就弹窗
                                    var dom = {
                                        targetDom: '',
                                        tpl: '#sure-tuoguan',
                                        closeDom: '.close, .laymshade,.sure-tuoguan .cancle',
                                        replaceContentDom: '#sureTuoguanContent',
                                        totalPrice: res.data.taskAmount,
                                        percent: res.data.taskLowestPercent
                                    };
                                    UserOperation.layerOpen(dom);
                                    //重新定价和增加赏金均在第一次请求后端数据之后的弹窗，点第二个弹窗的‘暂不托管’应该刷新页面
                                    UserOperation.addClassForRefresh();
                                }else{
                                    if(!isMaiJiaBanApp){
                                        //不满足分期就跳收银台 taskAmount: 接口返回的订单金额
                                        location.href = '/pay/payorder?taskId='+ taskId + '&amount=' + res.data.taskAmount;
                                    }else{
                                        var bridgeData = BridgeData.rewardTuoguan;
                                        bridgeData.param.taskid = taskId;
                                        bridgeData.param.amount = res.data.taskAmount;
                                        Bridge.callByJS(bridgeData);
                                    }
                                }
                            }, function(){
                                Common.animaTips('网络错误');
                            });
                        }else{
                            Common.animaTips(result.data);
                        }
                    },function(){
                        Common.animaTips('网络错误');
                    })
                });
            },
            addReward: function(taskId){
                //增加赏金-请求接口后直接跳往收银台
                if(!isMaiJiaBanApp){
                    UserOperation.layerOpen({
                        targetDom: '.add-need',
                        tpl: '#add-tuoguan',
                        closeDom: '.close, .laymshade,.add-tuoguan .cancle',
                        replaceContentDom: '#addTuoguanContent'
                    });
                }else {
                    $('.add-need').on('click', function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        var bridgeData = BridgeData.rewardAdd;
                        bridgeData.param.taskid = taskId;
                        Bridge.callByJS(bridgeData);
                    });
                }

                //增加赏金弹窗输入框下面，用户想增加至的金额
                $('body').on('input change','input[name="tuoguan-reward-input"]',function(){
                    var tuoguanRewardIpt = $('input[name="tuoguan-reward-input"]');
                    var targetAmountDom = $('.target-amount-dom');
                    var inputVal = tuoguanRewardIpt.val();
                    if(!/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(inputVal)){
                        targetAmountDom.html('<span class="fcolor-orange-highlight">请输入正确的金额</span>');
                        return;
                    }else{
                        if(inputVal.length > 7) {
                            tuoguanRewardIpt.val(inputVal.substring(0,7));
                            targetAmountDom.html('<span class="fcolor-orange-highlight">您输入的金额不能超过一百万！</span>');
                            return;
                        }
                    }
                    targetAmountDom.html('您想增加赏金至<span class="fcolor-orange-highlight targetAmount">'+ (Number($('input[name="amount"]').val())+ Number($(this).val())).toFixed(2) +'</span>元');
                });
                //增加赏金确认按钮
                $('body').delegate('.add-tuoguan .sure','click', function(){
                    var price = $('input[name="tuoguan-reward-input"]').val();
                    if(!UserOperation.testInputPrice(price)){
                        return;
                    }
                    var data = {
                        taskId: taskId,
                        amount: price
                    };
                    UserOperation.postJson('/task/addneed', data ,function(result){
                        if(result.success){
                            $.getJSON('/pay/isStagehost/?taskId=' + taskId, function(res){
                                if(res.success && !!res.data.isAllowStagesHost) { //可分期
                                    //满足分期就弹窗
                                    var dom = {
                                        targetDom: '',
                                        tpl: '#next-tuoguan-no-percent',
                                        closeDom: '.close, .laymshade,.next-tuoguan-no-percent .cancle',
                                        replaceContentDom: '#nextTuoguanNoPercentContent',
                                        totalPrice: res.data.taskAmount,
                                        notPay: res.data.notHostedAmount
                                    };
                                    UserOperation.layerOpen(dom);
                                    //重新定价和增加赏金均在第一次请求后端数据之后的弹窗，点第二个弹窗的‘暂不托管’应该刷新页面
                                    UserOperation.addClassForRefresh();
                                }else{
                                    if(!isMaiJiaBanApp){
                                        //不满足分期就跳收银台
                                        location.href = '/pay/payorder?taskId='+ taskId + '&amount=' + res.data.notHostedAmount;
                                    }else{
                                        var bridgeData = BridgeData.rewardTuoguan;
                                        bridgeData.param.taskid = taskId;
                                        bridgeData.param.amount = res.data.notHostedAmount;
                                        Bridge.callByJS(bridgeData);
                                    }
                                }
                            });
                        }else{
                            Common.animaTips(result.data);
                        }
                    },function(){
                        Common.animaTips('网络错误');
                    })
                });
            },
            cancleOrder: function(taskId){
                UserOperation.layerOpen({
                    targetDom: '',
                    tpl: '#order-cancle',
                    closeDom: '.close, .laymshade,.order-cancle .cancle'
                });
                $('body').delegate('.order-cancle .sure', 'click', function(){
                    UserOperation.postJson('/task/endtask', $.param({taskId : taskId}),function(res){
                        if(res.success){
                            Common.animaTips('提交成功！');
                            setTimeout(function(){
                                window.location.href = location.href;
                            },3000);
                        }else{
                            Common.animaTips(res.data);
                        }
                    },function(){
                        Common.animaTips('网络错误');
                    });
                });
            }
        },
        shadeLayer: function(){
            return shadeLayer;
        }
    };
    module.exports = UserOperation;
});