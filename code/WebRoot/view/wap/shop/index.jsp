<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/shop.css"/>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/user/me.css" />
<script type="text/javascript" src="/view/staticwap/js/comet4j.js"></script>
<style>
body {
    background: #fff;
}
.my-insured-header {
	padding: 0 10px;
    overflow: hidden;
    height: 40px;
    line-height: 40px;

    background-color: #fff;
}
.my-action,.my-insured-detail {
	text-align:center;
	background-color:#fff;
	color:#858585
}
.my-insured-detail {
	padding:.1rem 0;
	margin-bottom:.15rem;
	border:1px solid #dfdfdf;
	border-right:0;
	border-left:0
}
.my-insured-detail a {
	display:inline-block;
	width:100%;
	color:#222
}
.my-insured-detail a>div:first-child {
	color:#c6c6c6
}
.my-action a {
	padding-top:.4rem;
	height:1.3rem;
	border:1px solid #dfdfdf;
	border-left:0
}
.my-action .num {
	position:absolute;
	top:-10px;
	right:-6px;
	min-width:.26rem;
	padding:2px;
	background-color:#fb6469;
	color:#fff;
	border-radius:20px;
	font-size:.18rem;
	border:1px solid #fff
}
.my-action .row:first-child a {
	border-bottom:0
}
.check-all,.col-25 a {
	display:block;
	font-size:.26rem;
	color:#858585
}
.check-all {
	float:right
}
.set-link {
	display:block;
	padding:2px 10px;
	width:40px;
	height:40px;
	color:#858585;
	background:url(/view/staticwap/image/myIcon/message-icon.png) no-repeat 30px 10px;
	background-size:40%;
	border-radius:20px
}
.navbar-white .set-link {
	background:url(/view/staticwap/image/myIcon/message-icon-1.png) no-repeat 30px 10px;
	background-size:40%
}
.navbar-none:after {
	background:0 0
}
.modal-text {
	margin:0 28px
}
table td,table th {
	border:none
}
.user-name {
	margin:0 .1rem;
	color:#fff;
	line-height:1rem;
	height:1rem;
	float:left
}
.prompt {
	display:none;
	position:absolute;
	top:10px;
	right:9px;
	border:3px solid #fb6469;
	border-radius:50%
}
.add-num,.jion-num,.no-jion-num,.page-content .balance-fee,.page-content .message-num,.page-content .orders-num,.page-content .renew-num,.page-content .voucher-num,.reduction-num {
	font-size:16px
}
.num-color {
	color:#2cca6f
}
.my-insured .row {
	margin-bottom:10px;
	font-size:.32rem;
	background:#fff
}
.my-insured .row .col-50 div {
	float:right;
	color:#c6c6c6
}
.row .col-50 a {
	display:block;
	padding:.2rem 20px .2rem 15px;
	color:#222
}
.row .col-50+.col-50 {
	border-left:1px solid #efefef
}

.balance-fee,.voucher-num {
	margin-right:5px
}
.individual-status {
	margin-left:2px;
	background:#ccc;
	color:#999
}
.individual-status-1 {
	margin-left:2px;
	background:#ff0;
	color:#f60;
	border:1px solid
}
.individual-status-2 {
	margin-left:2px;
	background:0 0;
	color:#2dcc70;
	border:1px solid
}
.tcenter {
	text-align:center
}
.list-block .individual-text,.list-block .invite-friend {
	color:#f60
}
.my-insured-wrapper .my-oder-warp {
	background:#f5f5f9;
}
.my-insured-wrapper .content-block {
	margin:8px 0;
	display: none;
}
.my-insured-wrapper .content-block.active {
	display: block;
}
.my-oder-warp .order-item {
    margin-bottom: 14px;
    background: #fff;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
    text-align: left
}

.my-oder-warp .order-item .order-status {
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
    color: #333
}

.my-oder-warp .order-item .order-status .order-resource {
    background: #f60;
    color: #fff;
    padding: 2px 6px;
    font-size: 10px;
    border-radius: 10px;
    display: inline-block;
    height: 14px;
    line-height: 14px;
    position: absolute;
    left: 2px;
    top: -8px;
    opacity: .6
}

.my-oder-warp .order-item .order-status.type0 {
    background: #e5e5e5;
    color: #939393
}

.my-oder-warp .order-item .order-status.type1 {
    background: #feecdd;
    color: #fc6622
}

.my-oder-warp .order-item .order-status.type2 {
    background: #e4f7ff;
    color: #1fabeb
}

.my-oder-warp .order-item .order-status.type3 {
    background: #e4f7ff;
    color: #1fabeb
}

.my-oder-warp .order-item .order-status.type4 {
    background: #e4f7ff;
    color: #6eb92b
}

.my-oder-warp .order-item .order-status.type5 {
    background: #e8f7d7;
    color: #6eb92b
}

.my-oder-warp .order-item .order-status.type6 {
    background: #e5e5e5;
    color: #939393
}

.my-oder-warp .order-item .order-status .tuoguan-reward {
    float: right;
    background: #fff;
    line-height: 25px;
    color: #fc6622;
    padding: 2px 15px;
    margin: 6px 0;
    border-radius: 5px;
    font-size: 14px
}

.my-oder-warp .order-item .order-title {
    padding: 8px 12px;
    color: #868686;
    border-bottom: 1px solid #eee;
    line-height: 30px
}

.my-oder-warp .order-item .order-info {
    display: box;
    display: -webkit-box;
    text-align: center;
    height: 37px;
    line-height: 26px
}

.my-oder-warp .order-item .order-info span {
    height: 25px;
    display: block;
    color: #cbcbcb;
    margin: 8px 0;
    font-size: 14px;
    box-flex: 1;
    -webkit-box-flex: 1;
    border-right: 1px solid #eee
}

.my-oder-warp .order-item .order-info span:last-child {
    border-right: 0
}

.my-oder-warp .order-item .order-info .amount {
    color: #fc6622
}

.display-flex {
    display: box;
    display: -webkit-box
}

.display-flex .item {
    display: block;
    box-flex: 1;
    -webkit-box-flex: 1
}
.infinite-scroll-preloader {
  margin-top:-20px;
  margin-bottom: 10px;
  text-align: center;
}
.infinite-scroll-preloader .preloader {
  width:34px;
  height:34px;
}
.my-insured-header .sift {
    background: 0 0;
    color: #bcbcbc;
    float: right;
    line-height: 40px;
    margin-bottom: -10px;
    font-size: 16px;
}
.my-insured-header .sift.down:after {
    font-family: iconfont!important;
    font-size: 14px;
    content: '\e601';
}
.my-insured-header .sift.up:after {
    font-family: iconfont!important;
    font-size: 14px;
    content: '\e600';
}
.button {
    border: 1px solid #2cca6f;
    color: #007aff;
    text-decoration: none;
    text-align: center;
    display: block;
    border-radius: 5px;
    line-height: 27px;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    background: none;
    padding: 0 10px;
    margin: 0;
    height: 29px;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-family: inherit;
    cursor: pointer;
}
.buttons-row .button:first-child {
    border-radius: 5px 0 0 5px;
    border-left-width: 1px;
    border-left-style: solid;
}
.button.active {
    background-color: #2cca6f;
    color: #fff;
}

</style>
<body class=mobile-page>
<div class="top-bar ">
    <div class="go-back">
        <button class="btn_back"></button>
    </div>
    <h1>${business.shopname }</h1>

    <div class="nav">
        <button class="more-action" data-linkid="100010825"></button>
        <ul class="nav-menu">
                <li class="item item-1 btn-press-down"><a href="/wapIndex/index" class="external" data-linkid="100010826"><i></i>首页</a></li>
                <li class="item item-2 btn-press-down"><a href="/wapIndex/goSearch" class="external" data-linkid="100010827"><i></i>分类</a></li>
                <li class="item item-3 btn-press-down"><a href="/wapact/index" class="external" data-linkid="100010828"><i></i>我的</a></li>
            <!-- <li class="item item-4"><a href="/search" class="btn-press-down external" data-linkid="100010829"><i></i>搜索</a></li> -->
        </ul>
    </div>
</div>
<div class="wx-top hide">
    <a>点我关注“抢帮网”优惠享不停</a>
    <i class="iconfont icon-close"></i>
</div>
<!-- wap -->
<input type="hidden" name="currentPageName" value="shop">
<header class="shop-title shop-bg2">
	<c:choose>
	    <c:when test="${not empty business.shopicon}">
	         <img src="${business.shopicon }" alt="shopicon">
	 	</c:when>
	 	<c:otherwise>
			<img class="user-face"
				src="http://wx.qlogo.cn/mmopen/XeaiaOGeIyMHZp3icDfJBsLWunRAFMJVUud6wJwKeWlFGs6Bp25icIRmcgbdZQGdHAcF1dGiaTN2PQmfldQCoVDvKwZ7D1kxkq3a/0">
	 	</c:otherwise>
	</c:choose>


    <p>最近收入：${busamount }元</p>

    <p>最近交易：${count }单</p>

    <p>综合评分：<fmt:formatNumber value="${res.allavg }" pattern="#.0#"/></p>

    <div class="level-row">
		<c:choose>
		<c:when test="${business.isauth==1 }">
	        <span class="provider-grade grade-1">已认证</span>
		</c:when>
		<c:otherwise>
			<a class="${isself==1?'external ':'' }provider-grade grade-2" href="${isself==1?'/wappay/qbpay?type=1':'' }">未认证</a>
		</c:otherwise>
		</c:choose>
		<c:choose>
		<c:when test="${business.isbond==1 && business.bondmoney>0 }">
	        <span class="provider-grade grade-3">已交保证金</span>
		</c:when>
		<c:otherwise>
			<c:if test="${business.isauth==1}">
				<a class="${isself==1?'external ':'' }provider-grade grade-4" href="${isself==1?'/shop/goCashdeposit':'' }">未交保证金</a>
			</c:if>
		</c:otherwise>
		</c:choose>
		<c:if test="${isself==1}">
			<a href="/view/wap/user/message.jsp"  class="external provider-grade grade-1">未读消息</a>
		</c:if>

    </div>
</header>
 <c:if test="${isself==1}">
<div class="my-insured-wrapper">
                            <div class="my-insured-header js-showorder">
                            待办事项
                            </div>
                            <div class="my-insured-detail my-oder-warp" style="display: block;">
                                <div class="buttons-row">

							      <a href="#tab0" type-value="0" class="tab-link active button">待选标</a>

							      <a href="#tab1" type-value="1" class="tab-link button">已中标</a>

							      <a href="#tab3" type-value="3" class="tab-link button">已取消</a>
							      <a href="#tab4" type-value="4" class="tab-link button">未中标</a>

							    </div>
							    <!-- Tabs, 标签内容区容器 -->
							  <div class="tabs">
							    <!-- Tab 1, 默认激活 -->
							    <div id="tab0" class="tab content-block active infinite-scroll">



    </div>
							    <!-- Tab 1, 默认激活 -->
							    <div id="tab1" class="tab content-block infinite-scroll">
									<div class="list-block"></div>
									<!-- 加载提示符 -->
									  <div class="infinite-scroll-preloader">
									    <div class="preloader"></div>
									  </div>

								</div>

								<div id="tab3" class="tab content-block infinite-scroll">
									<div class="list-block"></div>
									<!-- 加载提示符 -->
									  <div class="infinite-scroll-preloader">
									    <div class="preloader"></div>
									  </div>

								</div>
								<div id="tab4" class="tab content-block infinite-scroll">
									<div class="list-block"></div>
									<!-- 加载提示符 -->
									  <div class="infinite-scroll-preloader">
									    <div class="preloader"></div>
									  </div>

								</div>
							  </div>

                            </div>
                        </div>
</c:if>
<div class="sift-result">
            <div class="sift-content active" data-sift="all">
                <ul></ul>
                <div class="load-more">
                    <button>点击加载更多</button>
                </div>
                <div class="load-none no-order">抱歉，暂时没有相关订单</div>
                <div class="load-over">没有更多数据</div>
            </div>
            <div class="list-data-loading"></div>

        </div>
<c:if test="${isself==1}">
	<section class="shop-model shop-info" onclick="javascript:location.href='/shop/goShopSet'"
         data-linkid="10006644">
    <h3 class="shop-model-title clearfix">
        <i class="shop-icon shop-title-icon-1"></i>
        <strong>店铺设置</strong>
            <a class="float-right" href="/shop/goShopSet">

                                <i class="icon-arrow-right"></i>
            </a>
    </h3>


</section>
</c:if>
<section class="shop-model shop-info"
         data-linkid="10006644">
    <h3 class="shop-model-title clearfix">
        <i class="shop-icon shop-title-icon-1"></i>
        <strong>店铺介绍</strong>
            <a class="float-right" href="/shop/goCashdeposit">
                                    已交保证金：<span class="fcolor-orange">${business.bondmoney}元</span>
                                <i class="icon-arrow-right"></i>
            </a>
    </h3>

    <div class="shop-info-detail">${empty business.shopcontent?'该店铺未填写介绍': business.shopcontent}</div>
    <p class="shop-info-footer">

    </p>
</section>

<section class="shop-model shop-rate" onclick="javascript:location.href='/shop/shopEvaluation?uid=${business.uid}&goodpercent=${res.goodpercent }'"
         data-linkid="10006645">
    <h3 class="shop-model-title clearfix">
        <i class="shop-icon shop-title-icon-2"></i>
        <strong>交易评价</strong>
            <span class="float-right">
                <span>${res.goodpercent }%</span>好评
                <i class="icon-arrow-right"></i>
            </span>
    </h3>

    <div class="shop-rate-detail">
        <span class="">质量：${res.avgService }</span>
        <span class="">速度：${res.avgSpeed }</span>
        <span class="">态度：${res.avgQuality }</span>
    </div>
</section>


    <audio id="chatAudio">
		<source src="/view/staticwap/video/notify.ogg" type="audio/ogg">
		<source src="/view/staticwap/video/notify.mp3" type="audio/mpeg">
		<source src="/view/staticwap/video/notify.wav" type="audio/wav">
	</audio>
<script src="/view/staticwap/js/plugin/first-screen-time.js"></script>

<script>
    var param = {
        guaranteeFlag: 1
    }
</script>
<div class="popup hide guarantee-not">
    <div class="pop-box">
        <div class="pop-header">请注意<a class="question" href="/user/tohelp?item=safeguard"></a></div>
        <div class="pop-content">
            <p>此店铺没有加入雇主保障</p>

            <p>如果发生纠纷将无法保障您的权益</p>

            <p>建议您去其它店铺逛逛</p>
        </div>
        <div class="pop-footer">
            <button class="half go-buy">继续雇佣</button>
            <button class="half close">再去逛逛</button>
        </div>
    </div>
</div>
<!--
<section class="shop-nav">
    <a class="call-btn make-a-call" href="#" data-phone="4000-123-852" data-linkid="10006656">联系TA</a>
    <a class="buy-btn" href="/shop/hire?salerId=2839515" data-linkid="10006657">雇佣TA</a>
</section>
 -->
<%@ include file="/view/wap/layout/userfooter.jsp" %>

<script id="download-app" type="tpl">
        <div class="confirm-con download-app">
                            <a class="close" href="javascript: void(0);">X</a>





            <div class="confirm-body bg-white
                        radius-top
                        ">
                <p class='align-c'>功能正在开发</p>



            </div>



            <div class="confirm-bottom display-box">

                                            </div>
        </div>

</script>
<script type="text/template7" id="orderInfo">
        {{#each this}}
        <button class="external order-item" data-url="{{orderurl}}">
            <div class="order-status  type{{state}}">
                {{status}}

            </div>
            <div class="order-title">{{title}}</div>
            <div class="order-info">
                <span class="amount">&yen;{{amount}}</span>
                <span>{{works_num}}参与</span>
                <span>
					{{#if payurl}}
					<a class="color-red amount" onclick="goHref('{{payurl}}');">{{goValue}}</a>
					{{/if}}
				</span>
            </div>
        </button>
        {{/each}}
    </script>

<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
<script type="text/javascript" src="/view/staticwap/js/page/shop/index.js"></script>

<script type="text/javascript">
//初始化Framework7
var myApp = new Framework7({
//Tell Framework7 to compile templates on app init
    precompileTemplates: true
});
var $$ = Framework7.$;
//获取公司信息


//类型默认0 全部
var typeValue = 0;
//tab切换
$$('.my-oder-warp .tab-link').on('click',function(){
	//切换显示

	typeValue=$$(this).attr('type-value');
	var listDom=$$('#tab'+typeValue).find('.list-block');
	//不同筛选首页加载
	if(typeValue){

		loadData();
	}
});

$$(document).on('click', '.order-item', function() {
	var hrefData = $$(this).attr('data-url');
	if(hrefData){
		window.location.href = hrefData;
	}
});


//注册一个比较大小的Helper,判断v1是否大于v2
/*  Template7.templates.registerHelper("compare",function(v1,v2,options){
  if(v1==v2||v1===""){
    //满足添加继续执行
    return options.fn(this);
  }else{
    //不满足条件执行{{else}}部分
    return options.inverse(this);
  }
}); */
$$('.js-select-type').on('click',function(){
	//切换显示

	var tempValue=$$(this).attr('type-value');

	//不同筛选首页加载
	if(tempValue){
		myApp.showTab('#tab0');
		typeValue =tempValue;
		$$('.js-showorder span').removeClass('down').addClass('up');
		$$(".my-oder-warp").show();
		loadData();
	}
});
$$('.js-showorder').on('click',function(){
	//切换显示

	var spanDom=$$(this).find('span');
	var orderWarp = $$(".my-oder-warp");
	//不同筛选首页加载
	if(spanDom.hasClass('down')){
		orderWarp.show();
		spanDom.removeClass('down').addClass('up');
	}else{
		orderWarp.hide();
		spanDom.removeClass('up').addClass('down');
	}
});



//获取数据
function loadData(other){
	$$.ajax({
       url: "/wapact/getBusinessOrder",
       type: "post",
       data:{'typevalue':typeValue},
       dataType: "json",

       success: function(d){
       		if(d.code === 0){

       			var orderHTML = Template7.templates.orderInfo(d.list);
       			$$('#tab'+typeValue).html(orderHTML);



       		}
       },error: function(){
            myApp.hideIndicator();
            myApp.alert('加载失败，请刷新重试！');
        }

   });
}

function goHref(href,event){
	window.location.href=href;
	stopEventBubble(event)
}

//阻止事件冒泡
function stopEventBubble(event){
    var e=event || window.event;

    if (e && e.stopPropagation){
        e.stopPropagation();
    }
    else{
        e.cancelBubble=true;
    }
}
function init(){
    JS.Engine.on('msg', function(text){
        show(text);
    });

    JS.Engine.start('/conn');
}

init();
function show(text){
	if(window.Notification && Notification.permission !== "denied") {
	    Notification.requestPermission(function(status) {    // 请求权限
	        if(status === 'granted') {
	            // 弹出一个通知
	            var audio = document.getElementById('chatAudio');
	            audio.loop = true;
                audio.play(); //播放声音
	            var textObj = text.toString().split('#');
	            var instance = new Notification('新的消息', {
	                body : textObj[0],
	                icon : '/view/staticwap/image/qblogo.png'
	            });
	            setTimeout(function() {  
                    instance.close();  
                }, 10000000000);  
	            instance.onclick = function () {
                    instance.close();
	            	window.location.href = textObj[1]||'/wapIndex/index';

	           	};
	        }
	    });
	}
}

loadData();
</script>
</body>


</html>