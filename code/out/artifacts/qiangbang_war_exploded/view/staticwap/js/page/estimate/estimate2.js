/**
 * Created by qinpeng on 2015/11/1.
 */
seajs.use(['zepto','common','components/refer-statistics/refer-statistics'], function($, Common,ReferStatistics) {
    //自动识别所有必填项都填写的情况下按钮状态更改
    Common.submitState();

    var estimate = (function() {
        //所有表单输入元素和提交按钮,表单提示栏目
        var $radioScore = $('input[name="score"]'), //好评，中评，差评
            $radioAttitude = $('input[name="attitude"]'), //服务态度
            $radioSpeed = $('input[name="speed"]'), //完成速度
            $radioQuality = $('input[name="quality"]'), //完成速度
            $radioImpressions = $('input[name="impressions"]'), //第一印象
            $rextareaComment = $('textarea[name="comment"]'), //评论内容
            $btnSubmit = $('#btnFav'), //提交按钮
            $animationTipsSpan = $('#animationTips span'); //提交按钮
        var taskMode = $('input[name="taskMode"]');
        var taskId = Common.getPar('taskId');
        var workId = Common.getPar('workId');
        var salerId = Common.getPar('salerId');
        var imgList = [];//评价图
      //全局对象
    	var $webuploader = {};





    	//正面 ----> 实例化
    	$webuploader.uploadFront = WebUploader.create({
    	    pick: {
    	        id: '.upload-pick',
    	        multiple: true
    	    },
    	    swf: '/view/staticwap/webuploader/0.1.6/Uploader.swf',
    	    server: '/file/upload_wap?ftype=1',
    	    formData: {
    	        uploaderType: 2
    	    },
    	    accept: {
    	        title: 'Images',
    	        extensions: 'gif,jpg,jpeg,bmp,png',
    	        mimeTypes: 'image/*'
    	    },
    	    auto: true,
    	    // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
    	    disableGlobalDnd: true,
    	    fileNumLimit: 1,
    	    fileSizeLimit: 5 * 1024 * 1024,    // 5 M
    	    fileSingleSizeLimit: 5 * 1024 * 1024   // 5 M
    	});


    	//正面 ----> 选择文件
    	$webuploader.uploadFront.onFileQueued = function( file ) {
    	    
    	    $webuploader.uploadFront.makeThumb( file, function( error, src,a,b) {
    	    	//
    	    });
    	};

    	//正面 ----> 上传成功
    	$webuploader.uploadFront.on('uploadSuccess', function(file, res) {
    	    
    	    if(res.status === 0) {
    	    	$('.upload-warp').append('<img src="'+res.data.filename+'">');
    	    	imgList.push(res.data.filename);
    	    }
    	    else {
    	        Common.animaTips(res.msg || '上传失败');

    	    }
    	});


    	//正面 ----> 上传失败
    	$webuploader.uploadFront.on('uploadError', function(error) {
    	    
    	    if(config.uploadImgErrors['' + error]) {
    	        Common.animaTips(config.uploadImgErrors['' + error]);
    	    }else{
    	    	Common.animaTips('上传失败');
    	    }
    	});
        //点击评分并将对应值赋值给input (好评,中评,差评)
        function score() {
            var $scoreItem = $('.js_score li');
            $radioScore.val( $('.js_score li.active').data('score'));
            $scoreItem.on('click',function(){
                $(this).addClass('active').siblings('li').removeClass('active');
                $radioScore.val($(this).data('score'));
            });
        }

        //点击评价态度，速度，质量
        function scoreDetail() {
            //获取态度，速度，质量对应星号元素
            var $scoreAttitude = $('.js_attitude span'),
                $scoreSpeed = $('.js_speed span'),
                $scoreQuality = $('.js_quality span');

            //针对每个类别调用添加'active'状态函数
            addActive($radioAttitude, $scoreAttitude);
            addActive($radioSpeed, $scoreSpeed);
            addActive($radioQuality, $scoreQuality);

            /**
             * @func addActive
             * @desc 点击元素，从第一个元素到该元素的类名都添加'active',
             *       并将所有包括'active'类名的数量赋值给input元素的value
             * @param {object} $input - input对象
             * @param {array}  $listItem - 所有可点击的元素
             * @return
             */
            function addActive($input, $listItem) {
                //var $scoreAttitude = $('.js_attitude span');
                var length = $listItem.length;

                for(var i = 0; i < length; i++){
                    $listItem[i].index = i; //添加索引,
                    $($listItem[i]).on('click',function(){
                        $listItem.removeClass('active'); //首先清楚所有元素的'active'状态
                        for(var j = 0; j <= $(this)[0].index; j++){ //只有小于或等于所点击的元素添加'active'
                            $($listItem[j]).addClass('active');
                        }
                        $input.val($(this)[0].index+1);
                    });
                }
            }

        }

        //点击选择对商家的印象,并提取所有选中的印象值以','逗号相连接赋值给相应的input
        function impression() {
            var $impressionItem = $('.js_impression li'),
                impressionsArray = [],
                length = $impressionItem.length;

            $impressionItem.on('click',function(){
                $(this).toggleClass('active');

                impressionsArray = [];//每次点击都会先清空一下暂存数组，不然一直会累加;
                //每次点击都循环遍历找到状态为'active'的评价,并添加到暂存数组中.
                for(var i = 0; i <= length; i++){
                    if($($impressionItem[i]).hasClass('active')){
                        impressionsArray.push($($impressionItem[i]).html());
                    }
                }
                $radioImpressions.val(impressionsArray.join(',')); //将所有的印象以逗号','连接并赋值给相应的input

            });
        }

        //按钮提交检测
        function submit() {

            $btnSubmit.on('click',function(){
                if(
                    $radioAttitude.val() &&
                    $radioSpeed.val() &&
                    $radioQuality.val() &&

                    $rextareaComment.val() ){
                    //所有的内容选项都为必填项目

                    //comment评价的字数必须6-140个之间
                    if($rextareaComment.val().length < 6){
                        Common.animationTips();
                        $animationTipsSpan.html('请您输入6-140字的内容!');
                        return;
                    }
                    //添加图片
                    $("#imgList").val(imgList.toString());
                    //提交中,按钮样式切换
                    $btnSubmit.addClass('disabled').html('提交中...');

                    //异步提交
                    commitFunc();

                }else{
                    //内容没有填写完提示:
                    Common.animationTips();
                    $animationTipsSpan.html('您还没有写完，您的评价可以帮助我们提供更好的服务!');
                    return;
                }
            });

            //异步提交函数
            function commitFunc(){
                var url = $btnSubmit.closest('form').attr('data-formurl');
                //统计
                var referParam='?'+ReferStatistics.getStatisticsData()+'&pub_page='+encodeURIComponent(location.href);

                $.ajax({
                    url: url + referParam,
                    type: 'POST',
                    data: $('#estimateForm').serialize(),
                    dataType: 'json',
                    success: function(result){
                        if(result.success){
                            Common.animationTips();
                            $animationTipsSpan.html('感谢您的评价!');
                            $btnSubmit.html('提交完成');
                            setTimeout(function(){
                            	window.location.href = '/waptask/goWorkBench?taskId='+ taskId+'&sellId='+salerId;
                            },2000)
                        }else{
                            $btnSubmit.removeClass('disabled').html('提交');
                            Common.animationTips();
                            if(result.data){
                                $animationTipsSpan.html(result.data);
                            }else{
                                $animationTipsSpan.html('抱歉，出现异常<br/>请退出后重试!');
                            }
                        }
                    },
                    error: function () {
                        $btnSubmit.removeClass('disabled').html('提交');
                        Common.animationTips();
                        $animationTipsSpan.html('网络出现问题，请重试!');
                    }
                })
            }

        }

        //暴露的接口
        return {
            score: score,
            scoreDetail: scoreDetail,
            impression: impression,
            submit: submit
        };
    })();

    estimate.score();
    estimate.scoreDetail();
    estimate.impression();
    estimate.submit();



})