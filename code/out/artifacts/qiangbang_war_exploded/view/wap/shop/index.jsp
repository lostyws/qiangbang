<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/shop.css"/>
<body class=mobile-page>
<div class="top-bar ">
    <div class="go-back">
        <button class="btn_back"></button>
    </div>
    <h1>${business.shopname }</h1>

    <div class="nav">
        <button class="more-action" data-linkid="100010825"></button>
        <ul class="nav-menu">
            <li class="item item-1 btn-press-down"><a href="/wapIndex/index" data-linkid="100010826"><i></i>首页</a></li>
            <li class="item item-2 btn-press-down"><a href="/search" data-linkid="100010827"><i></i>分类</a></li>
            <li class="item item-3 btn-press-down"><a href="/wapact/index" data-linkid="100010828"><i></i>我的</a></li>
            <!-- <li class="item item-4"><a href="/search" class="btn-press-down" data-linkid="100010829"><i></i>搜索</a></li> -->
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
    <img src="http://avatar.zbjimg.com/002/83/95/200x200_avatar_15.jpg!middle" alt="">

    <p>最近收入：${busamount }元</p>

    <p>最近交易：${count }笔</p>

    <p>综合评分：4.99</p>

    <div class="level-row">
		<c:choose>
		<c:when test="${business.isauth==1 }">
	        <span class="provider-grade grade-2">已认证</span>
		</c:when>
		<c:otherwise>
			<a class="provider-grade grade-2" href="#">未认证</a>
		</c:otherwise>
		</c:choose>


    </div>
</header>

<section class="shop-model shop-info" onclick="javascript:location.href='/shop/2839515-salerinfo.html'"
         data-linkid="10006644">
    <h3 class="shop-model-title clearfix">
        <i class="shop-icon shop-title-icon-1"></i>
        <strong>店铺介绍</strong>
            <a class="float-right" href="/view/wap/user/cashdeposit.jsp">
                                    已交保证金：<span class="fcolor-orange">${business.bondmoney}元</span>
                                <i class="icon-arrow-right"></i>
            </a>
    </h3>

    <div class="shop-info-detail">橙果设计-企业维C补给中心！</div>
    <p class="shop-info-footer">
        <span> <i class="promise-icon icon-1"></i></span>
        <span> <i class="promise-icon icon-2"></i></span>
    </p>
</section>

<section class="shop-model shop-rate" onclick="javascript:location.href='/shop/2839515-evaluation.html'"
         data-linkid="10006645">
    <h3 class="shop-model-title clearfix">
        <i class="shop-icon shop-title-icon-2"></i>
        <strong>交易评价</strong>
            <span class="float-right">
                <span>100%</span>好评
                <i class="icon-arrow-right"></i>
            </span>
    </h3>

    <div class="shop-rate-detail">
        <span class="">质量：4.97</span>
        <span class="">速度：5.00</span>
        <span class="">态度：5.00</span>
    </div>
</section>



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
<section class="shop-nav">
    <a class="call-btn make-a-call" href="#" data-phone="4000-123-852" data-linkid="10006656">联系TA</a>
    <a class="buy-btn" href="/shop/hire?salerId=2839515" data-linkid="10006657">雇佣TA</a>
</section>
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

<script type="text/javascript" src="/view/staticwap/js/page/shop/index.js"></script>
</body>

</html>