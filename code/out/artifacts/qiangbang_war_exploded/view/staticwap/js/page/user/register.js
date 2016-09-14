seajs.use(['zepto','underscore','common','components/refer-statistics/refer-statistics'], function($,_,Common,ReferStatistics) {
	//变量定义
	var getBtn = $('.get-code');
	var registerBtn = $('#register-btn');
	var telDom = $('[name=tel]');
	var codeDom = $('[name=code]');
	var passwordDom = $('[name=password]');
	var verificationCodeDom = $('[name=verificationCode]');
	var puserId = $('input[name="puserid"]');
 	var verifyDom=$('.input-item.hide');
 	var verifyCode=$('.verify-code');
 	var mustDom=$('.input-item.must');
 	var wait=60;
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
			puserid:puserId.val(),
			qbtoken:qbtoken
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
    function register(tel,code,password,verificationCode){
    	var data={
    		tel:tel,
    		code:code,
    		password:password,
    		verificationCode:verificationCode,
    		qbtoken:qbtoken
    	}
    	$.post(location.origin+"/user/register",
    		data,
    		function(json){
				if(json.success){
					location.href=json.data;
				}else{
					if(json.code=='1001'){
						//verifyCode.attr('src',verifyCode.attr('src')+new Date().getTime());
						verifyDom.show();
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
    //获取验证码按钮状态监听
	telDom.on('keyup change',function(){
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
	        registerBtn.addClass('disabled');
	    } else {
	        registerBtn.removeClass('disabled');
	    }
	}
	must();
	mustDom.on('keyup change',must);
    
    //获取验证码按钮点击事件
    getBtn.on('click',function(){
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
	registerBtn.on('click',function(){
    	var tel=telDom.val();
    	var code=codeDom.val();
    	var password=passwordDom.val();
    	var verificationCode=verificationCodeDom.val();
    	if(!tel){
			Common.animaTips('请输入手机号');
			return false;
		}
		if(!code){
			Common.animaTips('请输入验证码');
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
		register(tel, code, password, verificationCode);
	});
	//verify-code
	verifyCode.on('click',function(){
		verifyCode.attr('src',verifyCode.attr('src').split('=')[0]+'='+new Date().getTime());
	})
})