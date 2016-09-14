
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<%@ include file="/view/wap/layout/newhead.jsp" %>

<link rel="stylesheet" type="text/css" href="/view/staticwap/css/font/iconfont.css"/>
<style type="text/css">
            .navbar-fixed .page-content,.navbar-through .page-content {
	padding-top:0
}
.my-insured-header {
	padding:0 10px;
	overflow:hidden;
	height:.7rem;
	line-height:.7rem;
	background-color:#fff
}
.user-info {
	margin:0;
	padding:1rem 0 .2rem .2rem;
	background-image:url(/view/staticwap/image/bg.jpg);
	background-repeat:no-repeat;
	overflow:hidden
}
.user-info a>div {
	position:relative;
	overflow:hidden
}
.user-face+div {
	float:left;
	position:relative
}
.qrcode-wrapper p {
	margin:0
}
.user-face {
	float:left;
	width:1rem;
	height:1rem;
	border-radius:50%
}
.user-info a {
	position:relative;
	display:block;
	overflow:hidden
}
.user-info a:after {
	content:'';
	background:url(/view/staticwap/image/arrow_right.png) no-repeat;
	position:absolute;
	right:10px;
	top:1px;
	bottom:1px;
	margin:auto;
	width:.24rem;
	height:.38rem;
	z-index:1111;
	background-size:100%
}
.qrcode-wrapper {
	position:relative
}
.qrcode-icon {
	display:none;
	position:absolute;
	top:1px;
	bottom:1px;
	right:-24px;
	margin:auto;
	width:24px;
	height:24px
}
.qrcode-btn img {
	width:100%;
	height:100%
}
.navbar-none {
	background:0 0
}
.invite-0 {
	background:url(/view/staticwap/image/myIcon/invite-0.png) no-repeat right top;
	background-size:50%
}
.about-icon,.individual-icon-0,.insured-icon,.invite-icon,.orders-icon,.refund-icon,.service-icon,.voucher-icon {
	position:relative;
	top:2px;
	width:.4rem;
	height:.5rem
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
.shop-warp {
	    background: #f60;
    color: #fff;
}
</style>

<body class=mobile-page>
    <div class="views">
    <div class="view view-main">
        <div class="pages toolbar-through">
            <div data-page="home" class="page navbar-fixed">
                <div class="navbar navbar-none">
                    <div class="navbar-inner">
                        <div class="left">
                            <a href="javascript:history.go(-1);" class="link icon-only">
                                <i class="icon icon-back"></i>
                            </a>
                        </div>
                        <div class="center"></div>
                        <div class="right">
                            <a href="/view/wap/user/message.jsp" class="set-link external">
                            </a>
                            <span class="prompt"></span>
                        </div>
                    </div>
                </div>
                <div class="page-content">
                    <div class="user-info-wrapper">
                        <div class="user-info">
								<a href="/wapact/goAccountSet" class="external need-login">
									<div>
										<img class="user-face"
											src="http://wx.qlogo.cn/mmopen/XeaiaOGeIyMHZp3icDfJBsLWunRAFMJVUud6wJwKeWlFGs6Bp25icIRmcgbdZQGdHAcF1dGiaTN2PQmfldQCoVDvKwZ7D1kxkq3a/0">
										<div>
											<span class="user-name">杨文寿</span>
										</div>
									</div>

								</a>
							</div>
                    </div>
                    <div class="my-insured">
                        <div class="row">
                            <div class="col-50">
                                <a href="mybalance.jsp" class="external need-login">
                                    余额<div><span class="balance-fee">${sessionScope.users.price }</span>元</div>
                                </a>
                            </div>
                            <div class="col-50">
                                <a href="/view/wap/user/message.jsp" class="external need-login">
                                    未读消息<div><span class="voucher-num">${res.msgCount }</span>条</div>
                                </a>
                            </div>
                        </div>
                        
                        <div class="my-insured-wrapper">
                            <div class="my-insured-header js-showorder">
                            我的订单 <span class="sift down"></span>
                            </div>
                            <div class="my-insured-detail my-oder-warp" style="display:none">
                                <div class="buttons-row">
							     
							      <a href="#tab0" type-value='0' class="tab-link active button">全部</a>
							    
							      <a href="#tab1" type-value='1' class="tab-link button">进行中</a>
							   
							      <a href="#tab2" type-value='2' class="tab-link button">已完成</a>
							      <a href="#tab3" type-value='3' class="tab-link button">已取消</a>
							    </div>
							    <!-- Tabs, 标签内容区容器 -->
							  <div class="tabs">
							    <!-- Tab 1, 默认激活 -->
							    <div id="tab0" class="tab content-block active infinite-scroll">
									<div class="list-block"></div>		
									<!-- 加载提示符 -->
									  <div class="infinite-scroll-preloader">
									    <div class="preloader"></div>
									  </div>
											
								</div>
							    <!-- Tab 1, 默认激活 -->
							    <div id="tab1" class="tab content-block infinite-scroll">
									<div class="list-block"></div>		
									<!-- 加载提示符 -->
									  <div class="infinite-scroll-preloader">
									    <div class="preloader"></div>
									  </div>
											
								</div>
							    <div id="tab2" class="tab content-block infinite-scroll">
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
							  </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    
                    


                    <div class="list-block">
                        <ul>
                            <!-- <li>
                                <a href="/personsocial/recommendfriend.do" class="item-link item-content need-login external">
                                <div class="item-media"><div class="invite-icon"></div></div>
                                    <div class="item-inner">
                                        <div class="item-title">邀请好友</div>
                                        <div class="item-after invite-friend"></div>
                                    </div>
                                </a>
                            </li> -->
                            <li class="shop-warp">
                                <a href="/view/wap/shop/index.jsp" class="item-link item-content need-login external">
                                    <div class="item-media"><div class="orders-icon"><i class="iconfont icon-manu-shop"></i></div></div>
                                    <div class="item-inner">
                                        <div class="item-title">我的店铺</div>
                                        <div class="item-after"></div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>

                    
                    <p class="tcenter tgray">咨询电话： <a class="phoneinfo external"></a></p>       
                </div>
            </div>
        </div>
    </div>
</div>

    
</body>
<script type="text/template7" id="orderInfo">
        {{#each this}}
        <button class="external order-item" data-url="/view/wap/task/details.jsp?taskId={{taskId}}">
            <div class="order-status  type{{state}}">
                {{status}}
               
            </div>
            <div class="order-title">{{title}}</div>
            <div class="order-info">
                <span class="amount">&yen;{{amount}}</span>
                <span>{{works_num}}参与</span>
                <span>
					
					{{#if payurl}}
					<a class="color-red amount" href="{{payurl}}">{{goValue}}</a>
					{{/if}}
					
</span>
            </div>
        </button>
        {{/each}}
    </script>

<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
<script type="text/javascript">
//初始化Framework7
var myApp = new Framework7({
//Tell Framework7 to compile templates on app init
    precompileTemplates: true
});
var $$ = Framework7.$;
//获取公司信息
$$('.phoneinfo').attr('href','tel:' + CONFIG.TEL).text(CONFIG.TEL);
qbApp.showMenu();
//引导用户关注抢帮
//qbApp.followQB();


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
	       url: "/wapact/getUserOrder",
	       type: "post",
	       data:{'typevalue':typeValue},
	       dataType: "json",
	       
	       success: function(d){
	       		if(d.code === 0){

	       			var orderHTML = Template7.templates.orderInfo(d.list);
	       			if(typeValue>3){
	       				$$('#tab0').html(orderHTML);
	       			}else{
	       				$$('#tab'+typeValue).html(orderHTML);
	       			}
					
	       			
	        		
	       		}
	       },error: function(){
                myApp.hideIndicator();
                myApp.alert('加载失败，请刷新重试！');
            }
		       
	   });
	}
		
	loadData();
</script>


</html>
