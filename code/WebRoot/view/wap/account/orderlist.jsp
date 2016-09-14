
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<%@ include file="/view/wap/layout/newhead.jsp" %>
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
.orders-icon {
	background:url(/view/staticwap/image/myIcon/orders-icon.png) no-repeat;
	background-size:100%
}
.refund-icon {
	background:url(/view/staticwap/image/myIcon/refund-icon.png) no-repeat;
	background-size:100%
}
.service-icon {
	background:url(/view/staticwap/image/myIcon/service-icon.png) no-repeat;
	background-size:100%
}
.invite-icon {
	background:url(/view/staticwap/image/myIcon/invite-icon.png) no-repeat;
	background-size:100%
}
.individual-icon-0 {
	background:url(/view/staticwap/image/myIcon/individual-icon-0.png) no-repeat;
	background-size:100%
}
.about-icon {
	background:url(/view/staticwap/image/myIcon/about-icon.png) no-repeat;
	background-size:100%
}
.insured-icon {
	background:url(/view/staticwap/image/myIcon/insured-icon.png) no-repeat;
	background-size:100%
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
.my-insured-wrapper {
	display:none
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
                            <a href="view/wap/user/message.jsp" class="set-link external">
                            </a>
                            <span class="prompt"></span>
                        </div>
                    </div>
                </div>
                <div class="page-content">
                    <div class="user-info-wrapper">
                        <div class="user-info">
                        <a href="/jsp/my/set.jsp" class="external need-login">
                            <div>
                            <img class="user-face" src=""><div><span class="user-name"></span><img class="qrcode-icon" src="http://staticwyb.joyowo.com/images/qrcode.png" /></div>
                            </div>
                           
                            </a>
                        </div>
                    </div>
                    <div class="my-insured">
                        <div class="row">
                            <div class="col-50">
                                <a href="/jsp/my/mybalance.jsp" class="external need-login">
                                    余额<div><span class="balance-fee">0.00</span>元</div>
                                </a>
                            </div>
                            <div class="col-50">
                                <a href="/jsp/my/myvouchers.jsp" class="external need-login">
                                    代金券<div><span class="voucher-num">0</span>张</div>
                                </a>
                            </div>
                        </div>
                        <div class="my-insured-wrapper">
                            <div class="my-insured-header">
                            待办事项
                            </div>
                            <div class="my-insured-detail">
                                <div class="row">
                                <div class="col-33"><a href="/jsp/my/orderlistunpay.jsp" class="external need-login"><div><span class="orders-num">0</span>单</div><div>待支付</div></a></div>
                                <div class="col-33"><a href="/jsp/my/myinsured.jsp" class="external need-login"><div><span class="renew-num">0</span>人</div><div>待续费</div></a></div>
                                <div class="col-33"><a href="/jsp/user/message.jsp" class="external need-login"><div><span class="message-num">0</span>条</div><div>未读信息</div></a></div>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    <!-- <div class="content-block ">
						tabs控制面板
					    <div class="content-block-inner buttons-row">
					      关联到第一个tab, 默认激活
					      <a href="#tab1" class="tab-link active button">全部</a>
					      关联到第二个tab
					      <a href="#tab2" class="tab-link button">Tab 2</a>
					      关联到第三个tab
					      <a href="#tab3" class="tab-link button">Tab 3</a>
					    </div>
				    </div> -->
                    <div class="list-block">
                        <ul>
                            
                            <li>
                                <a href="allorderlist.jsp" class="item-link item-content need-login external">
                                    <div class="item-media"><div class="orders-icon"></div></div>
                                    <div class="item-inner">
                                        <div class="item-title">我的订单</div>
                                        <div class="item-after"></div>
                                    </div>
                                </a>
                            </li>
                            
                        </ul>
                    </div>


                    <div class="list-block">
                        <ul>
                            <li>
                                <a href="/personsocial/recommendfriend.do" class="item-link item-content need-login external">
                                <div class="item-media"><div class="invite-icon"></div></div>
                                    <div class="item-inner">
                                        <div class="item-title">邀请好友</div>
                                        <div class="item-after invite-friend"></div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="shop.jsp" class="item-link item-content need-login external">
                                    <div class="item-media"><div class="orders-icon"></div></div>
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
<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
<script type="text/javascript" src="/view/staticwap/js/page/account/my.js"></script>


</html>
