// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}
var qbApp = {
		/*
		 * showMenu
		 * ----------------------------------------------
		 * 页面右上角点击出来的下拉功能
		 */
		showMenu: function(){
			var redHtml = '';//小红点
			if(packageJson.isNews == 1){
				redHtml = '<em class="icon-circle"></em>';
				$$('.js-showMenu').parents('.navbar-inner .right').append('<em class="icon-circle"></em>');
			}

			var html =
				'<div class="head-nav">' +
					'<ul>' +
						'<li class="nav-li-01"><a href="/wapIndex/index" class="external">首页</a></li>' +
						'<li class="nav-li-02"><a href="/view/wap/user/message.jsp" class="external">消息' + redHtml + '</a></li>' +
						'<li class="nav-li-03"><a href="/wapact/index" class="external">我的</a></li>' +
						
					'</ul>' +
				'</div>';

			$$('body').append(html);

			$$('.js-showMenu').click(function(e){
				e.stopPropagation();
				$$('.head-nav').show();
			});

			$$(document).on('click', function(e){
				$$('.head-nav').hide();
			});
			$$('.head-nav').click(function(e){
				e.stopPropagation();
			});
		},
		/*
		 * showToolbar参数data详解
		 * ----------------------------------------------
		 * active：高亮显示，0代表首页，1代表我缴，2代表加号，3代表活动，4代表我的
		 * path: 路径前缀
		 */
		showToolbar: function(data){

			var udeskUrl = 'http://joyowo.udesk.cn/im_client?channel=wyb';

			if(udeskUrl.indexOf("?") > -1){
				udeskUrl+="&";
			}else{
				udeskUrl+="?";
			}
			udeskUrl+="cur_url="+escape(location.href);
			udeskUrl+="&";
			udeskUrl+="pre_url="+escape(document.referrer);

			var message = message?'<em class="icon icon-circle"></em>':'';
			var activity = activity?'<em class="icon icon-circle"></em>':'';
			var mainHtml =
				'<div class="toolbar tabbar bottom-toolbar jy-toolbar">'+
			  		'<div class="toolbar-inner">'+
			  			'<a href="'+ data.path +'/weixin/getweixin.do?name=index/index" class="tab-link external">'+
			  				'<i class="icon icon-bars-01"></i>'+
			  				'<span class="tabbar-label">首页</span>'+
			  			'</a>'+
			  			'<a href="'+ data.path +'/jsp/payshebao/selectcity.jsp" class="tab-link external dplus-jsb">'+
			  				'<i class="icon icon-bars-02"></i>'+
			  				'<span class="tabbar-label">缴社保</span>'+
			  			'</a>'+

			  			'<a href="'+ udeskUrl +'" target="_blank" id="baidu-into-addPerson1" class="tab-link external dplus-add">'+

			  				'<i class="icon icon-bars-03"></i>'+
			  			'</a>'+
			  			'<a href="'+ data.path +'/jsp/more/more.jsp" class="tab-link external">'+
			  				'<i class="icon icon-bars-04"></i>'+
			  				'<span class="tabbar-label">更多</span>'+
			  			'</a>'+
			  			'<a href="'+ data.path +'/my/" class="tab-link external">'+
			  				'<i class="icon icon-bars-05"></i>'+
			  				'<span class="tabbar-label">我的</span>'+
			  			'</a>'+
			  		'</div>'+
				'</div>';
			$$(mainHtml).insertAfter('.page-content');
			$$('.bottom-toolbar').find('a').eq(parseInt(data.active) || '0').addClass('active');
		},
		/*
		 * share参数data详解
		 * ----------------------------------------------
		 * title：标题
		 * desc: 描述
		 * link： 链接
		 * imgUrl： 图片地址
		 */
		share: function(data,pay){
			var overlay = '<div class="share-overlay" style="background-color: #000; position: fixed; z-index: 6000; height: 100%; width: 100%; top: 0; left: 0;opacity: 0.7; display: none"><img src="/css/images/sharePic.png" width="100%"></div>';
			if(pay){
				overlay = '<div class="share-overlay" style="display: none"><div style="background-color: rgba(0,0,0,.7); position: fixed; z-index: 6000; height: 100%; width: 100%; top: 0; left: 0;">'
					+'<img src="/css/images/alipayPic.png" width="100%"></div><div class="row" style="position: fixed; z-index: 6000; width: 90%; top: 7rem; left: 5%;">'
					+'<div class="col-60">'
				    +'<a href="/jsp/my/myorderall.jsp" class="button button-big button-fill external">查看支付结果</a>'
				    +'</div>'
				    +'<div class="col-40">'
				    +'<a href="javascript:;" class="button button-big js-addsave">放弃</a>'
				    +'</div>'
				    +'</div></div></div>';
			}
			if(data.type == 1){
				overlay = '<div class="share-overlay" style="background-color: #000; position: fixed; z-index: 6000; height: 100%; width: 100%; top: 0; left: 0;opacity: 0.7; display: none"><img src="/css/images/sharePic_2.png" width="100%"></div>';
			} else if(data.type == 2) {
				overlay = '<div class="share-overlay" style="background-color: #000; position: fixed; z-index: 6000; height: 100%; width: 100%; top: 0; left: 0;opacity: 0.7; display: none"><img src="/css/images/sharePic_3.png" width="100%"></div>';
			}
			$$('html').append(overlay);
			//分享展示遮罩层
			$$(document).on('click','.js-share', function() {
				$$('.share-overlay').show();
			});
			//点击遮罩层关闭
			$$(document).on('click','.share-overlay', function() {
				$$(this).hide();
			});
			//开启分享功能
			document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
				WeixinJSBridge.call('showToolbar'); //隐藏下菜单
				WeixinJSBridge.call('showOptionMenu');//隐藏右上角菜单
			});
			wx.ready(function () {
				var wxData = {
					title: data.title || '',
			    	desc: data.desc || '',
			    	link: data.link || '',
			    	imgUrl: data.imgUrl || ''
				};
				//监听分享给朋友
			    wx.onMenuShareAppMessage(wxData);
			    //监听分享到朋友圈”
			    wx.onMenuShareTimeline(wxData);
			    //分享到QQ
			    wx.onMenuShareQQ(wxData);
			    //分享到微博
			    wx.onMenuShareWeibo(wxData);
			});
		},
		/*
		 * followWuyou：未关注抢帮的用户30s后弹出关注窗口
		 * ----------------------------------------------
		 */
		followQB: function(){
			function showAlert(){
				myApp.params.modalButtonOk = "我知道了";
				myApp.alert(
					'<div class="follow-wrap">' +
					'<p class="follow-p-1"><img src="/images/icon/10.png">您还未关注“抢帮”微信号</p>' +
					'<div class="follow-qrcode"><img src="/images/icon/qrcode.png"></div>' +
					'<p class="follow-p-2">长按二维码识别<br/>或搜索“抢帮”公众号关注我们</p>' +
					'</div>'
				);
			}

			var backTime = 0;
			var _interVal = setInterval(function(){
				backTime ++;
				if(backTime == 30){
					//如果没有关注抢帮则弹出提示框
					if(!packageJson.subscribe || packageJson.subscribe == 'false'){
						showAlert();

						//弹出以后，告诉后台更新session，切换别的页面不再需要弹出，更新后的session值为1
						$$.ajax({
							'url': '/weixin/updateSession.do'
						});

					}
				}

				if(backTime > 30){
					clearInterval(_interVal);
				}
			},1000);
		},
		/*
		 * udesk：全局客服弹框
		 * ----------------------------------------------
		 */
		udesk: function(){
			var htmls = '<a id="udesk" class="external udesk" target="_blank" href="http://joyowo.udesk.cn/im_client?channel=wyb"><img src="http://qnudeskpub.flyudesk.com/im@2x-1437535730.png"></a>';

			function getReferrer(){
				var imEle = document.getElementById("udesk");
				if(imEle.href.indexOf("?") > -1){
					imEle.href+="&";
				}else{
					imEle.href+="?";
				}
				imEle.href+="cur_url="+escape(location.href);
				imEle.href+="&";
				imEle.href+="pre_url="+escape(document.referrer);
			}
			if($$('#udesk').length <= 0){
				$$('body').append(htmls);
				getReferrer();
			}
		}
	};
var util = {
		regexs: {
			email : /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,//邮箱
		    tel : /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,//座机号码
		    mobile : /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/,//手机号码
		    url : /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,// 网址
		    num : /^\d+$/,//数字
		    account : /^[A-Za-z0-9]\w{2,15}$/,//帐号
		    password : /[A-Za-z0-9]{6,20}$/,//密码
		    photo : /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/,// 图片格式
		    row : /\n/ig,
		    idcard:/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,//身份证号码验证
		    user:/^[0-9a-zA-Z\u4e00-\u9fa5-\_]+$/, // 只能是汉子，字母，数字，下划线组成
		    rmb: /^[0-9]+([.][0-9]{0,2}){0,1}$/, //验证金钱格式，x or x.x or x.xx ,x为数字
		    invitationCode: /^\d{1,15}$/,
		    voucherCode: /^\d{16}$/
		},//获取url参数
		getUrlParam: function(name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r !== null) return r[2];
	        return null;
	    },
	    //设置cookies
		setCookie:function(name,value, days) {
		    var Days = days || 30;
		    var exp = new Date();
		    exp.setTime(exp.getTime() + Days*24*60*60*1000);
		    document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString()+";path="+packageJson.JAVA_STATICURL;
		},
		//读取cookies
		getCookie:function (name) {
		    var arr,
		    	reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		    if(document.cookie.match(reg)){
		    	arr = document.cookie.match(reg);
		        return unescape(arr[2]);
			}else{
				return null;
			}
		},
		//删除cookies
		delCookie: function(name) {
		    var exp = new Date();
		    exp.setTime(exp.getTime() - 1);
		    var cval = util.getCookie(name);
		    if(cval !== null)
		        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		},
		//数组去重
		uniq: function(arr){
			var temp = {}, len = arr.length;
		    for(var i=0; i < len; i++)  {
		        if(typeof temp[arr[i]] == "undefined") {
		            temp[arr[i]] = 1;
		        }
		     }
		     arr.length = 0;
		     len = 0;
		     for(var j in temp) {
		    	 arr[len++] = j;
		     }
		     return arr;
		},
		//判断是否是微信打开（包括公众号和微信自带浏览器）
		isWeixnOpen: function(){
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i)=="micromessenger") {
				return true;
			} else {
				return false;
			}
		}
}
//格式化日期
//使用方法： new Date('1442286924000').format('YY-MM-DD hh:mm')
Date.prototype.format = function(tpl){
	var strs, w, keys, year, val;
	strs = [];
	tpl = tpl || 'YY\u5e74MM\u6708DD\u65e5 \u661f\u671fdd';
	w = 'FullYear,Month,Date,Hours,Minutes,Seconds,Day'.split(',');
	keys = [ /YY/g, /Y/g, /MM/g, /M/g, /DD/g, /D/g, /hh/g, /h/g, /mm/g, /m/g, /ss/g, /s/g, /dd/g, /d/g ];
	for ( var i = 0; i < 7; i++) {
		val = this['get' + w[i]]() + (w[i] === 'Month' ? 1 : 0);
		strs.push(('0' + val).slice(-2), val);
	}
	year = [ strs[1], strs[0] ].concat(strs.slice(2, -2));
	year.push('\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d'.substr(strs.slice(-1), 1), strs.slice(-1));
	for (var ii = 0; ii < 14; ii++) {
		tpl = tpl.replace(keys[ii], year[ii]);
	}
	return tpl;
};
//转换成rem
(function(_d){
	var _temp = {};
	_temp.widthScale = function() {
		var scale = (_d.body && _d.body.clientWidth || _d.getElementsByTagName('html')[0].offsetWidth) / 750;
		return scale;
	};
	_temp.changePage = function() {
		_d.getElementsByTagName('html')[0].setAttribute('style', 'font-size:' + _temp.widthScale() * 100 + 'px !important');
	};
	_temp.changePage();
	addEventListener('resize', _temp.changePage, false);
})(document);

//隐藏微信菜单
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {  
	WeixinJSBridge.call('hideToolbar'); //隐藏下菜单 
	WeixinJSBridge.call('hideOptionMenu');//隐藏右上角菜单
});

//配置ajax
$$.ajaxSetup({
	type: 'post',
	dataType: 'json',
	timeout: 30000
});

//全局常量
var CONFIG = {
	TEL: '0797-2508000',//服务电话
	ADDRESS: '--------------------'//公司地址
};