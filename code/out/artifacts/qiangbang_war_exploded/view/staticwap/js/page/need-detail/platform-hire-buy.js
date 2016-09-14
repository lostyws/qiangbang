/**
 * Created by yangwenshou on 16/03/18.
 */
seajs.use(['zepto','common','layer.m','user-operation','bridge','bridge-data','task-bottom','calling-download'], function($, Common, Layer, UserOperation, Bridge, BridgeData, taskBottom, callingDownload){
    Common.osDetect();
    var taskId = $('input[name="taskid"]').val();
    var workId = $('input[name="worksid"]').val();
    var salerId = $('input[name="salerid"]').val();
    var evaluationId = $('input[name="evaluationId"]').val();//评价id
    var totalAmount = $('input[name="amount"]').val();//订单金额
    var shadeLayer;
    var loadString;
    var confirmDom = $('span.confirm i,a.confirm i,button.confirm i');
    var confirmAttr = $('span.confirm, a.confirm, button.confirm').attr('data-deadline');
    var ts;
    var reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
    var isMaiJiaBanApp = navigator.userAgent.match('zbj'); //监测是否是在买家版或者钉耙app

    var platform = {
        init: function(){
            //页面默认元素倒计时
            if(confirmAttr){
                ts = (confirmAttr-parseInt(new Date().getTime() / 1000)) ;
                setInterval(this.timer,1000);
            }
            //用户操作按钮
            this.operationButtons();

            //底部用户操作区域
            //UserOperation.userOperationArea.closeTask(taskId);
            UserOperation.userOperationArea.moreHelpBtn(); //更多按钮
            UserOperation.userOperationArea.tuoguanReward(taskId,totalAmount); //托管
            UserOperation.userOperationArea.refresh(taskId); //重新定价
            UserOperation.userOperationArea.addReward(taskId); //增加赏金
            UserOperation.userOperationArea.payfor(taskId, workId, salerId); //支付给服务商

            //取消订单
            $('.more-help-button-list .close2, .help-button .close2, .contact-con button.close2').on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                UserOperation.userOperationArea.cancleOrder(taskId);
            });
            //顾问协作
            UserOperation.jumpToNewPage('.adviser-cooperate',  '/hire/toConnectionPage?taskId='+ taskId);

            //关闭需求
            UserOperation.jumpToNewPage('.help-button .power, .more-help-button-list .power', '/task/toCloseTask?taskId=' + taskId);

            //已托管接着托管, 未托管则直接确认托管
            $('body').delegate('.next-tuoguan-no-percent .sure', 'click', function(e){
                e.preventDefault();
                e.stopPropagation();
                var price = $('input[name="tuoguan-reward-input"]').val();
                var notPayPrice = $('input[name="not-pay-price"]').val();
                if(!UserOperation.testInputPrice(price)){
                    return;
                }
                if(price && notPayPrice ){
                    if((Number(price)).toFixed(2) > Number(notPayPrice) || (Number(price)).toFixed(2) < 0){
                        Common.animaTips('请输入小于未托管的金额');
                        return;
                    }
                }
                if(!isMaiJiaBanApp){
                    location.href = '/pay/payorder?amount=' + price + '&taskId=' + taskId;
                }else {
                    var bridgeData = BridgeData.rewardTuoguan;
                    bridgeData.param.taskid = taskId;
                    bridgeData.param.amount = price;
                    Bridge.callByJS(bridgeData);
                }

            });

            $('body').delegate('.next-tuoguan-no-percent .cancle, .sure-tuoguan .cancle', 'click',function(){
                Layer.close(UserOperation.shadeLayer());
            });

            $('body').delegate('.sure-tuoguan .sure', 'click', function(){
                var price = $('input[name="tuoguan-reward-input"]').val();
                var totalprice = $('input[name="totalprice"]').val();
                var percent = $('input[name="tuoguan-reward-percent"]').val();
                if(!UserOperation.testInputPriceAdd(price, totalprice,percent)){
                    return;
                }
                if(!isMaiJiaBanApp){
                    location.href = '/pay/payorder?amount=' + price + '&taskId=' + taskId;
                }else{
                    var bridgeData = BridgeData.rewardTuoguan;
                    bridgeData.param.taskid = taskId;
                    bridgeData.param.amount = price;
                    Bridge.callByJS(bridgeData);
                }
            });

            $('body').delegate('.refresh-current-page .cancle', 'click', function(){
               location.href = location.href;
            });
        },
        timer: function(){
            //倒计时
            if(ts < 0){
                clearInterval(platform.timer);
                return;
            }
            var dd = parseInt(ts / 60 / 60 / 24, 10);//计算剩余的天数
            var hh = parseInt(ts / 60 / 60 % 24, 10);//计算剩余的小时数
            var mm = parseInt(ts / 60 % 60, 10);//计算剩余的分钟数
            var ss = parseInt(ts % 60, 10);//计算剩余的秒数

            var hours = (hh>9)? hh:('0'+ hh);
            var minitus = (mm>9)?mm:('0'+mm);
            var seconds = (ss>9)?ss:('0'+ss);

            if(ts != 0){
                if(dd != 0){
                    confirmDom.html('( '+ dd + '天' + hours  + ':' + minitus + ':' + seconds + ' )');
                }else {
                    confirmDom.html('( '+ hours + ':' + minitus + ':' + seconds + ' )');
                }

            }else {
                window.location.href = window.location.href;
                return;
            }
            ts--;
        },
        loadStart: function(loadBtn){
            loadString=loadBtn.text();
            loadBtn.addClass('disabled');
            loadBtn.text('提交中');
            window.circulateTime=setInterval(function(){
                if(loadBtn.text()=='提交中'){
                    loadBtn.text('提交中.');
                }else if(loadBtn.text()=='提交中.'){
                    loadBtn.text('提交中..');
                }else if(loadBtn.text()=='提交中..'){
                    loadBtn.text('提交中...');
                }else{
                    loadBtn.text('提交中');
                }
            },350);
        },
        loadEnd: function(loadBtn){
            clearInterval(circulateTime);
            loadBtn.removeClass('disabled');
            loadBtn.text(loadString);
        },
        operationButtons: function(){
            var operationButtonsDetail = {
                refusePay: function(){
                    //拒绝付款
                    $('.refuse').on('click', function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        UserOperation.layerOpen({
                            targetDom: '',
                            tpl: '#refuse-payfor',
                            closeDom: '.refuse-payfor .cancle, .laymshade',
                            replaceContentDom: '#refusePayforContent'
                        });
                    });

                    $('body').delegate('.flex-item','click', function(){
                        var inputDom = $('input[name="reason"]');
                        var _this = $(this);
                        var html = _this.find('span').html();
                        _this.closest('form').find('.flex-item').removeClass('active');
                        _this.addClass('active');
                        if(html == '其他'){
                            inputDom.val('');
                            inputDom.attr('placeholder','请输入拒绝理由');
                        }else{
                            inputDom.val(html);
                        }
                    });

                    $('body').delegate('.refuse-payfor .sure','click',function(){
                        var inputDom = $('input[name="reason"]');

                        var $this=$(this);
                        if($this.hasClass('disabled')){
                            return;
                        }
                        if(!inputDom.val()){
                            inputDom.attr('placeholder','请输入拒绝理由');
                            Common.animaTips('请输入拒绝理由');
                            return;
                        }
                        var data = {
                            taskId: taskId,
                            salerId: salerId,
                            workId: workId,
                            reason: inputDom.val()
                        };
                        platform.loadStart($this);
                        UserOperation.postJson('/bidpay/refusepay', data, function(data){
                            platform.loadEnd($this);
                            if(data.success){
                                Common.animaTips(data.data);
                                setTimeout(function(){
                                    window.location.href = location.href;
                                },3000);
                            }else{
                                Common.animaTips(data.data);
                            }
                            //Layer.close(UserOperation.shadeLayer());
                        },function(){
                            platform.loadEnd($this);
                            Common.animaTips('网络错误，请重试');
                            //Layer.close(UserOperation.shadeLayer());
                        });

                    });
                },
                evaluate: function(){
                    //评价
                    var evaluateUrl = '/evaluate/toseller?taskId='+ taskId +'&salerId=' + salerId +'&workId='+workId;
                    var BridgeDataName = BridgeData.evaluateServer;
                    var BrigeDataParam = {
                        taskid: taskId,
                        workid: workId,
                        salerid: salerId
                    };
                    UserOperation.jumpToNewPage('.evaluate', evaluateUrl, BridgeDataName, BrigeDataParam);

                    //追加评价
                    var evaluateAddUrl = '/evaluate/toaddevaluate?taskId='+ taskId +'&salerId=' + salerId +'&evaluationId='+evaluationId;
                    UserOperation.jumpToNewPage('.evaluate-add', evaluateAddUrl);
                },
                agreement: function(){
                    //查看交易合同、去签合同
                    var url = '/agreement/toagree?taskId='+ taskId +'&workId='+ workId + '&salerId=' + salerId;
                    var BridgeDataName = BridgeData.viewAgreement;
                    var BrigeDataParam = {
                        taskid: taskId
                    };
                    UserOperation.jumpToNewPage('.agreement-view', url, BridgeDataName, BrigeDataParam);
                    //关闭合同
                    $('.agreement-close').on('click', function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        UserOperation.layerOpen({
                            targetDom: '',
                            tpl: '#agreement-close',
                            closeDom: '.close, .laymshade,.agreement-close .cancle'
                        });
                    });
                    $('body').delegate('.agreement-close .sure', 'click', function(){
                        var data = {
                            taskId: taskId,
                            workId: workId
                        };
                        UserOperation.postJson('/agreement/close', $.param(data), function(res){
                            Common.animaTips(res.data);
                            setTimeout(function(){
                                location.href = location.href;
                            },3000);
                        },function(){
                            Common.animaTips('网络错误，关闭合同失败');
                        });
                    })
                },
                resourceView: function(){
                    //查看源文件
                    var url = '/hire/tosourcepage?taskId='+ taskId;
                    var BridgeDataName = BridgeData.resourceView;
                    var BrigeDataParam = {
                        workid: workId
                    };
                    UserOperation.jumpToNewPage('.resource-view', url, BridgeDataName, BrigeDataParam);
                },
                remind: function(){
                    //提醒服务商发起
                    $('.agreement-remind').on('click', function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        var data = {
                            taskId: taskId,
                            workId: workId
                        };
                        UserOperation.postJson('/agreement/remindseller', $.param(data), function(res){
                            Common.animaTips(res.data);
                            if(res.success){
                                setTimeout(function(){
                                    location.href = location.href;
                                },3000);
                            }
                        },function(){
                            Common.animaTips('网络错误');
                        });
                    });
                }
            };

            operationButtonsDetail.refusePay();
            operationButtonsDetail.evaluate();
            operationButtonsDetail.agreement();
            operationButtonsDetail.resourceView();
            operationButtonsDetail.remind();

        }
    };

    platform.init();

    //雇主操作区
    var helpButton = $('.help-button');
    var helpButtonSpan = $('.help-button button, .help-button span');
    var totalLength = 0;
    helpButtonSpan.forEach(function(i){
        totalLength += $(i).width();
    });
    if(helpButton.width() < totalLength + 8){
        //按钮与按钮之间的间隙 3*2 + 2（border的宽度）
        helpButton.width(helpButtonSpan.width() * 3 + 51);
    }
});