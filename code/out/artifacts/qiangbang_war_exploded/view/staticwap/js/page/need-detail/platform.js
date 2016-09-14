
seajs.use(['zepto','common','layer.m','user-operation','bridge','bridge-data','task-bottom','calling-download'], function($, Common, Layer, UserOperation, Bridge, BridgeData,taskBottom, callingDownload){
    Common.osDetect();
    var taskId = Common.getPar('taskId');
    var workId = Common.getPar('sellId');
    var salerId = Common.getPar('salerId');
    var quoteId = $('input[name="quoteId"]').val();
    var shadeLayer;
    var totalAmount = $('input[name="amount"]').val();
    var isMaiJiaBanApp = navigator.userAgent.match('zbj');

    function postJson(url, data, success, error){
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            type: 'post',
            success: success,
            error: error
        });
    }

    function closeLayer(domList,layerName){
        domList.on('click',function(e){
            e.preventDefault();
            Layer.close(layerName);
        });
    }

    $(document).ready(function(){
        $('.provider-msg').on('click', function(){
            window.location.href = '/shop/' + $(this).attr('data-shopid') + '/';
        });

        //付款
        $('.confirm').on('click',function(){
            window.location.href = '/bidpay/tobuyerpay?taskId='+ taskId +'&workId='+ workId +'&salerId=' + salerId;
        });

        //评价
        $('.evaluate').on('click',function(){
            window.location.href = '/evaluate/toseller?taskId='+ taskId +'&salerId=' + salerId +'&workId='+workId;
        });

        //查看报价方案
        $('.viewScheme').on('click', function(){
            location.href = '/quote/view?taskId=' + taskId + '&quoteId=' + quoteId;
        });

        //服务商已发起合同后，雇主还未签署，从触屏版选标时应该提示需要先签合同
        $('.bidPageHasAgreementToast').on('click', function(){
            Common.animaTips('请移步网站签署合同');
            return;
        });

    });
    var loadString;
    function loadStart(loadBtn){
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
    }
    function loadEnd(loadBtn){
        clearInterval(circulateTime);
        loadBtn.removeClass('disabled');
        loadBtn.text(loadString);
    }
    //换一个

    $('.exchange').on('click', function(){
        shadeLayer = Layer.open({
            type: 1,
            content: $('#change-provider').html()
        });
        closeLayer($('.change-provider .cancle, .laymshade'), shadeLayer);

        //淘汰（换一个）
        $('.change-provider .sure').on('click', function(){
            var $this=$(this);
            if($this.hasClass('disabled')){
                return;
            }
            var data = {
                taskId: taskId,
                workId: workId
            };
            loadStart($this);
            postJson('/task/out/', data, function(data){
                loadEnd($this);
                if(data.success){
                    Common.animaTips('提交成功！');
                    window.location.href = location.href;
                }else{
                    Common.animaTips(data.data);
                }
                Layer.close(shadeLayer);
            },function(){
                loadEnd($this);
                Common.animaTips('网络错误');
                Layer.close(shadeLayer);
            });
        });
    });
    //选择
    $('.select').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var hostStatus = $('.page-container').attr('data-hostState');
        
        //已托管，选ta中标
        shadeLayer = Layer.open({
            type: 1,
            content: $('#select-provider').html()
        });
        closeLayer($('.select-provider .cancle, .laymshade'), shadeLayer);
        

    });
    
    //
    $('.taskconfirm').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var hostStatus = $('.page-container').attr('data-hostState');
        
        //已托管，选ta中标
        shadeLayer = Layer.open({
            type: 1,
            content: $('#comfirm-finish').html()
        });
        closeLayer($('.comfirm-finish .cancle, .laymshade'), shadeLayer);
        

    });
    
    $('.applyfinish').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var hostStatus = $('.page-container').attr('data-hostState');
        
        //已托管，选ta中标
        shadeLayer = Layer.open({
            type: 1,
            content: $('#apply-finish').html()
        });
        closeLayer($('.apply-finish .cancle, .laymshade'), shadeLayer);
        

    });
  //申请完成
    $('body').on('click','.apply-finish .sure', function(){
        var $this=$(this);
        if($this.hasClass('disabled')){
            return;
        }
        var data = {
            taskId: taskId
            
        };
        loadStart($this);
        postJson('/waptask/businessConfirm', data, function(res){
            loadEnd($this);
            if(res.success){
                Common.animaTips(res.data);
                window.location.href = location.href;
            }else{
                Common.animaTips(res.data);
            }
            Layer.close(shadeLayer);
        },function(){
            loadEnd($this);
            Common.animaTips('网络失败');
            Layer.close(shadeLayer);
        });
    });
  //申请完成
    $('body').on('click','.comfirm-finish .sure', function(){
        var $this=$(this);
        if($this.hasClass('disabled')){
            return;
        }
        var data = {
            taskId: taskId
            
        };
        loadStart($this);
        postJson('/waptask/confirmFinish', data, function(res){
            loadEnd($this);
            if(res.success){
                Common.animaTips(res.data);
                window.location.href = location.href;
            }else{
                Common.animaTips(res.data);
            }
            Layer.close(shadeLayer);
        },function(){
            loadEnd($this);
            Common.animaTips('网络失败');
            Layer.close(shadeLayer);
        });
    });
    //中标（选他签单）
    $('body').on('click','.select-provider .sure', function(){
        var $this=$(this);
        if($this.hasClass('disabled')){
            return;
        }
        var data = {
            taskId: taskId,
            businessId: workId
        };
        loadStart($this);
        postJson('/waptask/signing', data, function(res){
            loadEnd($this);
            if(res.success){
                Common.animaTips(res.data);
                window.location.href = location.href;
            }else{
                Common.animaTips(res.data);
            }
            Layer.close(shadeLayer);
        },function(){
            loadEnd($this);
            Common.animaTips('网络失败');
            Layer.close(shadeLayer);
        });
    });


    var confirmDom = $('span.confirm i');
    var confirmAttr = $('span.confirm').attr('data-deadline');

    if(confirmAttr){
        var ts = (confirmAttr-parseInt(new Date().getTime() / 1000)) ;
        setInterval(timer,1000);
    }

    //倒计时
    function timer(){
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
    }
});