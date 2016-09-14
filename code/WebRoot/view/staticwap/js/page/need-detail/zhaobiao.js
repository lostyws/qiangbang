/**
 * Created by yangwenshou on 15/9/10.
 */
seajs.use(['zepto','common','juicer','task-bottom','calling-download','pic-view','layer.m'], function($, Common, Juicer, taskBottom, callingDownload, PicView,Layer){
    Common.osDetect();

    var slideCon = $('.content-slidedown-con');
    var slideBtn = $('.content-slidedown-btn');
    var descHeight = slideCon.height();
    if(descHeight>40){
        Common.contentSlideDown(slideCon,slideBtn,'40');
        slideBtn.removeClass('hide');
    }else{
        Common.contentSlideDown(slideCon,slideBtn,descHeight);
        slideBtn.addClass('hide');
    }

    var shadeLayer;
    var taskId = $('input[name="taskId"]').val();
    var animationTipsSpan = $('#animationTips span');

    //选择中标---------二期做
    //$('.select').on('click', function(){
    //    var _this = $(this);
    //    shadeLayer = Layer.open({
    //        type: 1,
    //        content: $('#select-provider').html()
    //    });
    //});
    //
    //$('.cancle').on('click', function(){
    //    Layer.clone(shadeLayer);
    //})

    function closeLayer(domList,layerName){
        domList.on('click',function(e){
            e.preventDefault();
            Layer.close(layerName);
        });
    }

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

    //列表按钮点击弹出下载提示
    $('.contact-con .change, .contact-con .select').on('click', function(){
        shadeLayer = Layer.open({
            type: 1,
            content: $('#download-app').html()
        });
        closeLayer($('.close, .laymshade'), shadeLayer);
    });


    if($('#has-no-login').length > 0){
        var noLoginLayer = Layer.open({
            type: 1,
            content: $('#has-no-login').html()
        });
    }

    //未登录用户弹窗
    $('.has-no-login .sure').on('click' ,function(){
        window.location.href = '/user/tologin?preUrl=' + location.href; //雇主登录跳往登录页
    });

    $('.has-no-login .cancle').on('click' ,function(){
        if(document.referrer){
            window.history.go(-1);  //有上一页则返回上一页
        }else{
            window.location.href = '/';  //首页
        }
    });
    $('.js-evaluate').on('click',function(){
    	var evaluateHref = $(this).attr('data-herf')
    	if(evaluateHref){
    		window.location.href = evaluateHref;
    		
    	}
    });
    $('.js-refund').on('click',function(){
    	var evaluateHref = $(this).attr('data-herf')
    	if(evaluateHref){
    		var shadeLayer = Layer.open({
                type: 1,
                content: $('#refund-tpl').html()
            });
            closeLayer($('.close, .refund-tpl .sure'), shadeLayer);
            $('.refund-tpl .cancle').on('click' ,function(){
           	 window.location.href = evaluateHref;
            });
    	}
    });
    
    
    //顾问协助
    $('.adviser').on('click',function(){
        shadeLayer = Layer.open({
            type: 1,
            content: $('#contact-adviser').html()
        });
        closeLayer($('.close, .laymshade'), shadeLayer);
        ////交易顾问 拨打400
        //$('.contact-adviser .sure').on('click', function(){
        //    window.location.href = 'tel:4001886666';
        //});
    });
  //查看二维码
    $('.js-seeqrcode').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
       var recodeHref = $(this).attr('data-herf')||window.location.href;
        
        //已托管，选ta中标
        shadeLayer = Layer.open({
            type: 1,
            content: $('#qrcode').html()
        });
        //二维码生成
        jQuery('.output').qrcode({
            text    : recodeHref,
            width: 200,
            height: 200
        });
        (function(){
            var mycanvas = document.getElementsByTagName("canvas")[0];
            console.log(mycanvas)
            var image = mycanvas.toDataURL("image/png");
            $('.output').html("<img src='"+image+"' alt='from canvas'/>");
        })();
        closeLayer($('.qrcode-wrapper .cancle, .laymshade'), shadeLayer);
        

    });
    //关闭需求
    $('.close-task').on('click',function(){
        shadeLayer = Layer.open({
            type: 1,
            content: $('#task-close').html()
        });
        closeLayer($('.close, .laymshade, .task-close .cancle'), shadeLayer);
        $('.task-close .sure').on('click', function(){
            var data = {
                taskId: taskId
            };
            postJson('/task/closeTask', data, function(data){
                if(data.success){
                    Common.animationTips();
                    animationTipsSpan.html('需求关闭成功！');
                    setTimeout(function(){
                        window.location.href = '/task/' + taskId + '/';
                    },500)
                }else{
                    Common.animationTips();
                    animationTipsSpan.html(data.data);
                }
                Layer.close(shadeLayer);
            },function(){
                Common.animationTips();
                animationTipsSpan.html('网络失败');
                Layer.close(shadeLayer);
            })
        });
    });


    //浏览图片
    PicView.startView();
});