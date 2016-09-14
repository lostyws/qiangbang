seajs.use(['zepto','underscore','common','components/refer-statistics/refer-statistics'], function($,_,Common,ReferStatistics) {
	// Initialize app

	var myApp = new Framework7();
	 
	// If we need to use custom DOM library, let's save it to $$ variable:
	var $$ = Dom7;
	 
	// Add view
	var mainView = myApp.addView('.view-main', {
	  // Because we want to use dynamic navbar, we need to enable it for this view:
	  dynamicNavbar: true
	});
	//变量定义
	var getBtn = $('.get-code');
	var registerBtn = $('#register-btn');
	var telDom = $('[name=tel]');
	var codeDom = $('[name=code]');
	var passwordDom = $('[name=password]');
	var verificationCodeDom = $('[name=verificationCode]');
	var icardDom = $('[name=icard]');
	var nameDom = $('[name=name]');
	var idCardFrontDom = $('.idCardFront');
	var idCardBackDom = $('.idCardBack');
	var puserId = $('input[name="puserid"]');
 	var verifyDom=$('.input-item.hide');
 	var verifyCode=$('.verify-code');
 	var mustDom=$('.input-item.must');
 	var wait=60;
 	var parentDom=null;
 	//输入校验
	function isPhone(val){
		return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(val)?true:false;
	}
	function isCode(val){
		return /^\d{6}$/.test(val)?true:false;
	}
	function isPassWord(val){
		return val.length>=6?true:false;
	}
	function isPassWord(val){
		return val.length>=6?true:false;
	}
	function isIcard(val){
		return /^[1-9]\d{5}(19||2[0-1])\d{2}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(val)?true:false;
	}
	function isName(val){
		return /^[\u4e00-\u9fa5a-zA-Z_\-0-9]{2,15}$/.test(val)?true:false;
	}
	
	
//	$(".typeselect").select2();
	//全局对象
	var $webuploader = {};





	//正面 ----> 实例化
	$webuploader.uploadFront = WebUploader.create({
	    pick: {
	        id: '.uploadIdCard-front',
	        multiple: false
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
	    	$('.uploadIdCard-front-img').attr('src', res.data.filename);
	        //赋值后触发一个change事件，实时验证时候需要
	    	$('.idCardFront').val(res.data.filename).change();

	        $('.uploadIdCard').removeClass('uploadDefualt');
	        $('.uploadIdCard-tip').hide();
	        $('.front-tip').text('重传正面照');
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




	//反面 ----> 实例化
	$webuploader.uploadBack = WebUploader.create({
	    pick: {
	        id: '.uploadIdCard-back',
	        multiple: false
	    },
	    swf: '/view/staticwap/webuploader/0.1.6/Uploader.swf',
	    server: '/file/upload_wap?ftype=2',
	    formData: {
	        uploaderType: 3
	    },
	    accept: {
	        title: 'Images',
	        extensions: 'gif,jpg,jpeg,bmp,png',
	        mimeTypes: 'image/*'
	    },
	    auto: true,
	    multiple: false,
	    // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
	    disableGlobalDnd: true,
	    fileNumLimit: 1,
	    fileSizeLimit: 5 * 1024 * 1024,    // 5 M
	    fileSingleSizeLimit: 5 * 1024 * 1024   // 5 M
	});


	//反面 ----> 选择文件
	$webuploader.uploadBack.onFileQueued = function( file ) {
	    
	    $webuploader.uploadBack.makeThumb( file, function( error, src,a,b) {
	        //
	    });
	};


	//反面 ----> 上传成功
	$webuploader.uploadBack.on('uploadSuccess', function(file, res) {
	    
	    if(res.status === 0) {
	    	$('.uploadIdCard-back-img').attr('src', res.data.filename);
	        //赋值后触发一个change事件，实时验证时候需要
	    	$('.idCardBack').val(res.data.filename).change();

	        $('.back-tip').text('重传反面照');
	    }
	    else {
	        
	        Common.animaTips(res.msg || '上传失败');
	    }
	});


	//反面 ----> 上传失败
	$webuploader.uploadBack.on('uploadError', function(error) {
	    
	    if(config.uploadImgErrors['' + error]) {
	        Common.animaTips(config.uploadImgErrors['' + error]);
	    }else{
	    	Common.animaTips('上传失败');
	    }
	});
	//营业执照 ----> 实例化
	$webuploader.businesslicense = WebUploader.create({
	    pick: {
	        id: '.businesslicense',
	        multiple: false
	    },
	    swf: '/view/staticwap/webuploader/0.1.6/Uploader.swf',
	    server: '/file/upload_wap?ftype=3',
	    formData: {
	        uploaderType: 3
	    },
	    accept: {
	        title: 'Images',
	        extensions: 'gif,jpg,jpeg,bmp,png',
	        mimeTypes: 'image/*'
	    },
	    auto: true,
	    multiple: false,
	    // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
	    disableGlobalDnd: true,
	    fileNumLimit: 1,
	    fileSizeLimit: 5 * 1024 * 1024,    // 5 M
	    fileSingleSizeLimit: 5 * 1024 * 1024   // 5 M
	});


	//反面 ----> 选择文件
	$webuploader.businesslicense.onFileQueued = function( file ) {
	    
	    $webuploader.businesslicense.makeThumb( file, function( error, src,a,b) {
	        //
	    });
	};


	//营业执照 ----> 上传成功
	$webuploader.businesslicense.on('uploadSuccess', function(file, res) {
	    
	    if(res.status === 0) {
	    	$('.businesslicense-img').attr('src', res.data.filename);
	        //赋值后触发一个change事件，实时验证时候需要
	    	$('.businesslicense').val(res.data.filename).change();

	        $('.businesslicense-tip').text('重传营业执照');
	    }
	    else {
	        
	        Common.animaTips(res.msg || '上传失败');
	    }
	});


	//营业执照 ----> 上传失败
	$webuploader.businesslicense.on('uploadError', function(error) {
	    
	    if(config.uploadImgErrors['' + error]) {
	        Common.animaTips(config.uploadImgErrors['' + error]);
	    }else{
	    	Common.animaTips('上传失败');
	    }
	});
	//反面 ----> 实例化
	$webuploader.shopimg = WebUploader.create({
	    pick: {
	        id: '.shopimg',
	        multiple: false
	    },
	    swf: '/view/staticwap/webuploader/0.1.6/Uploader.swf',
	    server: '/file/upload_wap?ftype=4',
	    formData: {
	        uploaderType: 3
	    },
	    accept: {
	        title: 'Images',
	        extensions: 'gif,jpg,jpeg,bmp,png',
	        mimeTypes: 'image/*'
	    },
	    auto: true,
	    multiple: false,
	    // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
	    disableGlobalDnd: true,
	    fileNumLimit: 1,
	    fileSizeLimit: 5 * 1024 * 1024,    // 5 M
	    fileSingleSizeLimit: 5 * 1024 * 1024   // 5 M
	});


	//店面照片----> 选择文件
	$webuploader.shopimg.onFileQueued = function( file ) {
	    
	    $webuploader.shopimg.makeThumb( file, function( error, src,a,b) {
	        //
	    });
	};


	//店面照片 ----> 上传成功
	$webuploader.shopimg.on('uploadSuccess', function(file, res) {
	    
	    if(res.status === 0) {
	    	$('.shopimg-img').attr('src', res.data.filename);
	        //赋值后触发一个change事件，实时验证时候需要
	    	$('.shopimg').val(res.data.filename).change();

	        $('.shopimg-tip').text('重传店面照片');
	    }
	    else {
	        
	        Common.animaTips(res.msg || '上传失败');
	    }
	});


	//店面照片 ----> 上传失败
	$webuploader.shopimg.on('uploadError', function(error) {
	    
	    if(config.uploadImgErrors['' + error]) {
	        Common.animaTips(config.uploadImgErrors['' + error]);
	    }else{
	    	Common.animaTips('上传失败');
	    }
	});
    //统计
    var referParam='?'+ReferStatistics.getStatisticsData()+'&reg_page='+encodeURIComponent(location.href);
	function getStart() {
        getBtn.text('正在发送');
        window.circulateTime=setInterval(function(){
            if(getBtn.text()=='正在发送'){
                getBtn.text('正在发送.');
            }else if(getBtn.text()=='正在发送.'){
                getBtn.text('正在发送..');
            }else if(getBtn.text()=='正在发送..'){
                getBtn.text('正在发送...');
            }else{
                getBtn.text('正在发送');
            }
        },350);
    }
    function getEnd(){
        getBtn.removeClass('disabled');
        getBtn.html('获取验证码');
        clearInterval(circulateTime);
    }
	//获取验证码
	function getCode(tel){
		getStart();
		var data = {
			tel:tel,
			puserid:puserId.val()
//			qbtoken:qbtoken
		};
		$.get(location.origin+"/user/getCode" + referParam, data , function(json){
			getEnd();
			if(json.success){
				endTime();
			}else{
				if(json.data=='user mobile is exists'){
					Common.animaTips('该手机号已注册，请直接登录！');
				}else{
					Common.animaTips(json.data);
				}
			}
		})
	}
	//倒计时
	function endTime(){
        if(wait == 0){
            getBtn.removeClass('disabled');
            getBtn.html('获取验证码');
            wait = 60;
        }else{
            getBtn.addClass('disabled');
            getBtn.html( '重发（' + wait + '）' );
            --wait;
            setTimeout(endTime,1000);
        }
    }

    //注册
    function register(regDate){
    	//格式分类数据
    	$("#shoptypeJson").val($('#shoptype').val().toString());
    	$("#shoptypename").val($(".item-content .item-after").html());
    	
    	var data = $('form.clearfix').serialize();
    	$.post(location.origin+"/shop/singleBusinessReg",
    		data,
    		function(json){
				if(json.success){
					location.href=json.data;
				}else{
					if(json.code=='1001'){
//						verifyCode.attr('src',verifyCode.attr('src')+new Date().getTime());
//						verifyDom.show();
						Common.animaTips(json.data);
						registerBtn.removeClass("disabled")
							.html("注册");
					} else {
						// if(json.data=='user mobile is exists'){
						// 	Common.animaTips('该手机号已注册，请直接登录！');
						// }else{
						Common.animaTips(json.data);
						registerBtn.removeClass("disabled")
							.html("注册");
						// }
					}
				}
		})
    }
   
    $(document).on('change', '.smart-select-page input', function() {
    	
    	if($(this).prop("checked")){
    		var tempValue = $(this).attr('parentname');
    		if(tempValue==parentDom||!parentDom){
    			if(!getsmartChecked()){
        			myApp.alert('最多只能选择三个子分类');
    				$(this).prop("checked",false);
    				return false;
        		}
    		
    			
    		}else{
    			$('.smart-select-page input').prop("checked",false);
    			$(this).prop("checked",true);
    			$("#shoptype").val($(this).val());
    			$(".item-content .item-after").html($(this).val());
    		}
    		parentDom=tempValue;
    		
    		
    	}else{
//    		checkedItems.push($(this).val());
    	}
//    	var parentDom = $(this).val();
    })
    //
    function getsmartChecked(){
    	var checkedLen = $('.smart-select-page input:checked').length;
    	
    	return checkedLen>3?false:true;
    }
    function cleanChecked(){
    	
    }
    //获取验证码按钮状态监听
    $$(document).on('keyup change', '[name=tel]', function() {
		if(wait!=60){
			return;
		}
    	if(isPhone(telDom.val())){
			getBtn.removeClass('disabled');
    	}else{
			getBtn.addClass('disabled');
    	}
    });
    function must(){
		var needMust=mustDom.not('.hide');
		if (_.some(needMust, function (dom) {
	        return $(dom).find('input').val() == '';
	    })) {
//	        registerBtn.addClass('disabled');
	    } else {
	        registerBtn.removeClass('disabled');
	    }
	}
	must();
	mustDom.on('keyup change',must);
    
    //获取验证码按钮点击事件
	$$(document).on('click', '.get-code', function() {
    	var tel=telDom.val();
    	// if(!$(this).hasClass('disabled')){
    		tel?(isPhone(tel)?getCode(tel):Common.animaTips('请输入正确的手机号')):Common.animaTips('请输入手机号');
			// if(isPhone(tel)){
			// 	getCode(tel);
			// }else{
			// 	Common.animaTips('请输入正确的手机号');
			// }
		// }
    });
    //注册按钮点击事件
    $$(document).on('click', '#register-btn', function() {

    	var tel=telDom.val();
    	var code=codeDom.val();
    	var password=passwordDom.val();
    	var verificationCode=verificationCodeDom.val();
    	var idCardFront =$('.idCardFront').val();
    	var idCardBack =$('.idCardBack').val();
    	var businesslicense =$('.businesslicense').val();
    	var shoptype = $("#shoptype").val();
    	var name = nameDom.val();
    	var icard = icardDom.val();
    	if(!idCardFront){
    		Common.animaTips('请上传身份证正面照片');
			return false;
    	}
    	if(!idCardBack){
    		Common.animaTips('请上传身份证背面照片');
			return false;
    	}
    	if(!businesslicense){
    		Common.animaTips('请上传营业执照照片');
			return false;
    	}

    	if(!tel){
			Common.animaTips('请输入手机号');
			return false;
		}
		if(!code){
			Common.animaTips('请输入验证码');
			return false;
		}
		if(!shoptype.length>0){
			Common.animaTips('请选择类别');
			return false;
		}
		if(!isName(name)){
			Common.animaTips('请输入正确的真实姓名');
			return false;
		}
		if(!isIcard(icard)){
			Common.animaTips('请输入正确的身份证号码');
			return false;
		}
		

		if(!password){
			Common.animaTips('请输入密码');
			return false;
		}
		if(!isPhone(tel)){
			Common.animaTips('请输入正确的手机号');
			return false;
		}
		if(!isCode(code)){
			Common.animaTips('请输入正确的验证码');
			return false;
		}
		if(!isPassWord(password)){
			Common.animaTips('请输入正确的密码，大于6位');
			return false;
		}
		// if(!$('#agreement').is(':checked')){
		// 	Common.animaTips('请先同意协议！');
		// 	return false;
		// }
		$(this).addClass("disabled")
			.html("注册中...");
		var regDate ={
				tel:tel,
				code:code,
				password:password,
				verificationCode:verificationCode,
				idCardFront:idCardFront,
				idCardBack:idCardBack,
				businesslicense:businesslicense,
				name:name,
				icard:icard

		}
		register(regDate);
	});
	//verify-code
	verifyCode.on('click',function(){
		verifyCode.attr('src',verifyCode.attr('src').split('=')[0]+'='+new Date().getTime());
	})
})