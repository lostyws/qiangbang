seajs.use(['zepto','underscore','common','components/refer-statistics/refer-statistics'],function($,_,Common,ReferStatistics) {
    if(window.isLogin=='yes'){
        location.href=window.preUrl;
    }
	//变量定义
 	var getBtn=$('.get-code');
	var loginRegisterDom = $('.login-register');
 	var loginBtn=$('.login-form .login-page-btn');
 	var quickBtn=$('.quick-form .login-page-btn');
 	var usernameDom=$('[name=username]');
 	var passwordDom=$('[name=password]');
 	var telDom=$('[name=tel]');
 	var codeDom=$('[name=code]');
 	var loginForm=$('.login-form');
 	var quickForm=$('.quick-form');
 	var verificationCodeDom=$('[name=verificationCode]');
 	var loginVerifyDom=$('.login-form .input-item.hide');
 	var quickVerifyDom=$('.quick-form .input-item.hide');
 	var loginVerifyCode=$('.login-form .verify-code');
 	var quickVerifyCode=$('.login-form .verify-code');
 	var loginMustDom=$('.login-form .input-item.must');
 	var quickMustDom=$('.quick-form .input-item.must');
 	var wait=60;
 	var verifyUrl='http://'+window.iapiURL+'/main/verify?seed=';
 	var needVerify=false;
 	var seed='';
	var	qbtoken =quickForm.attr('data-auth');
 	if(Common.getPar('preUrl')){
 		preUrl=Common.getPar('preUrl');
 	}
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
    var referParam = '?'+ReferStatistics.getStatisticsData()+'&reg_page='+encodeURIComponent(location.href);
	//获取验证码
	function getCode(tel){
		getStart();
		var data = {
			tel: tel,
			qbtoken: qbtoken
		};
		$.post(location.origin+"/user/getQuickCode",data,function(json){
			getEnd();
			if(json.success){
				endTime();
			}else{
				Common.animaTips(json.data);
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
    //普通登录
    function login(tel,password,verificationCode){
    	var data={
    		tel:tel,
    		password:password,
    		verificationCode:verificationCode,
    		seed:seed,
    		preUrl:preUrl,
			qbtoken: qbtoken
		};
    	$.post(location.origin+'/user/login',
    		data,
    		function(json){
				if(json.success){
					// Cookie.set('userkey',json.data.msg);
					location.href=json.data;
				}else{
					Common.animaTips(json.data);
					loginBtn.removeClass("disabled");
					loginBtn.html("登录");
				}
		})
    }
    //快速登录
    function quick(tel,code){
    	var data={
    		tel:tel,
    		code:code,
    		preUrl:preUrl,
			qbtoken: qbtoken
    	}
    	$.post(location.origin+"/user/quickLogin" + referParam,
    		data,
    		function(json){
				if(json.success){
					// Cookie.set('userkey',json.data.msg);
					location.href=json.data;
				}else{
					if(json.code=='1003'){
//						needVerify=true;
						$('.login-form .password').removeClass('last');
//						quickVerifyCode.attr('src',verifyUrl+ new Date().getTime());
//						quickVerifyDom.show();
						Common.animaTips(json.data);
						quickBtn.removeClass("disabled")
							.html("登录");
					} else {
						Common.animaTips(json.data);
						quickBtn.removeClass("disabled")
							.html("登录");
					}
				}
		})
    }
    telDom.on('keyup change',function(){
    	usernameDom.val(telDom.val());
    });
    usernameDom.on('keyup change',function(){
    	if(isPhone(usernameDom.val())){
			getBtn.removeClass('disabled');
    		telDom.val(usernameDom.val());
    		codeChange();
    	}else{
			getBtn.addClass('disabled');
		}
    });
    function codeChange(){
		if(wait!=60){
			return;
		}
    	if(isPhone(telDom.val())){
			getBtn.removeClass('disabled');
    	}else{
			getBtn.addClass('disabled');
			if(loginRegisterDom.data('platform') != 'fwh'){
				//切换普通登录
				quickForm.hide();
				loginForm.show();
			}
    	}
    }
    //获取验证码按钮监听
    telDom.on('keyup change',codeChange);
	//开启了记住密码功能，页面一进来就判断
	if(isPhone(usernameDom.val())){
		getBtn.removeClass('disabled');
	}
  //   telDom.on('keyup change',function(){
  //   	if(wait!=60){
		// 	return;
		// }
  //   	if(isPhone(telDom.val())){
		// 	getBtn.removeClass('disabled');
  //   	}else{
		// 	getBtn.addClass('disabled');
  //   	}
  //   });
    function must(mustDom,btnDom){
	    function btnMust(){
			var needMust=mustDom.not('.hide');
	    	if (_.some(needMust, function (dom) {
	            return $(dom).find('input').val() == '';
	        })) {
	            btnDom.addClass('disabled');
	        } else {
	            btnDom.removeClass('disabled');
	        }
	    }
		mustDom.on('keyup change',btnMust);
		btnMust();
    }
    must(loginMustDom,loginBtn);
    must(quickMustDom,quickBtn);
    //获取验证码按钮click事件
    getBtn.on('click',function(){
    	var tel=telDom.val();
    	var username = usernameDom.val();
		//处于login-form的时候
		if(getBtn.hasClass('disabled')){
			Common.animaTips('请输入正确的手机号');
			return;
		}
		if(isPhone(username)){
			tel = username;
			telDom.val(tel);
		}
    	// if(!$(this).hasClass('disabled')){
    		if(!tel){
				Common.animaTips('请输入手机号');
				return;
    		}
    		if(!isPhone(tel)){
				Common.animaTips('请输入正确的手机号');
				return;
			}
			if(getBtn.text()!="获取验证码"){
				Common.animaTips('请耐心等待');
				return;
			}
			// else if(){
			getCode(tel);
			//切换快速登录
			loginForm.hide();
			quickForm.show();
			// }
		// }else{
			
		// }
    });
    //快速登陆按钮click事件
	quickBtn.on('click',function(){
    	var tel=telDom.val();
    	var code=codeDom.val();
    	if(!tel){
			Common.animaTips('请输入手机号');
			return false;
		}
		if(!code){
			Common.animaTips('请输入验证码');
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
		// if(!isPassWord(password)){
		// 	Common.animaTips('请输入正确的密码，大于6位');
		// 	return false;
		// }
		// if(!$('#agreement').is(':checked')){
		// 	Common.animaTips('请先同意协议！');
		// 	return false;
		// }
		$(this).addClass("disabled")
			.html("登录中...");
		quick(tel, code);
	});
	//普通登录click事件
	loginBtn.on('click',function(){
		// if(loginBtn.hasClass)
    	var username=usernameDom.val();
    	// var code=codeDom.val();
    	var password=passwordDom.val();
    	var verificationCode=verificationCodeDom.val();
		if(!username){
			Common.animaTips('请输入账号');
			return false;
		}
		if(!password){
			Common.animaTips('请输入密码');
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
			.html("登录中...");
		login(username, password, verificationCode);
	});

	//更新验证码
	loginVerifyCode.on('click',function(){
		seed=new Date().getTime();
		loginVerifyCode.attr('src',verifyUrl+seed);
	})
	//
	//更新验证码
	quickVerifyCode.on('click',function(){
		seed=new Date().getTime();
		quickVerifyCode.attr('src',verifyUrl+seed);
	})
})