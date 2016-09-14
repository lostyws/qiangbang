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
              <li class="item item-2 btn-press-down"><a href="/wapIndex/goSearch" data-linkid="100010827"><i></i>分类</a></li>
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
<div class="shop-rate main-content">
    <div class="rate-progress">
        <div class="rate-scale">
            <p>好评率：</p>

            <div class="scale-display">
                <div class="rate-size" style="width:100%"></div>
            </div>
        </div>
        <div class="rate-result">${goodpercent }%</div>
    </div>
    <div class="scrollTopFix">
        <ul class="rate-nav fsize-14 bg-white with-padding">
            <li class="active" data-category="good">
                <a href="javascript:;"><p>好评</p></a>
            </li>
            <li data-category="normal">
                <a href="javascript:;" class=""><p>中评</p></a>
            </li>
            <li data-category="bad">
                <a href="javascript:;" class=""><p style="border-right: 0 none;">差评</p></a>
            </li>
        </ul>
    </div>
    <div class="tabs-content  margin-b-15">
        <div class="eva-content rate-tab active" id="good">
            <ul>
            	<c:forEach var="item" items="${evaluates}" varStatus="status">
	                <li>
	                    <h4>
	                        ${item.brandName }
	                        <span class="rate-time">${item.dataymd }</span>
	                    </h4>
	
	                    <p>${item.content }<br>
	                    <c:forEach var="img" items="${item.imgs}" varStatus="status">
	                    	<img alt="" src="${img}">
	                    </c:forEach>
	                    </p>
	                </li>
                </c:forEach>

            </ul>
            <div class="load-more">
                <button>点击加载更多</button>
            </div>
            <div class="load-none no-rate"></div>
            <div class="load-over">没有更多数据</div>
        </div>

        <script src="/view/staticwap/js/plugin/first-screen-time.js"></script>

        <div class="eva-content rate-tab" id="normal">
            <ul></ul>
            <div class="load-more">
                <button>点击加载更多</button>
            </div>
            <div class="load-none no-rate"></div>
            <div class="load-over">没有更多数据</div>
        </div>
        <div class="eva-content rate-tab" id="bad">
            <ul></ul>
            <div class="load-more">
                <button>点击加载更多</button>
            </div>
            <div class="load-none no-rate"></div>
            <div class="load-over">没有更多数据</div>
        </div>
        <div class="list-data-loading"></div>
    </div>
</div>
<!-- 
<section class="shop-nav">
    <a class="call-btn make-a-call" href="#" data-phone="4000-123-852">联系TA</a>
    <a class="buy-btn" href="/shop/hire?salerId=2839515">雇佣TA</a>
</section>
 -->
<%@ include file="/view/wap/layout/footer.jsp" %>
<script>
    window.shopId = "${business.uid}";
</script>
<script id="tpl" type="text/template">
 {{#each evaluateList}}
<li>
        <h4>
            {{brandName}}<span class="rate-time">{{dataymd}}</span>
        </h4>

        <p>{{content}}
		<br>
		{{#each imgs}}
			<img alt="" src="{{this}}">
		{{/each}}
		</p>
    </li>
{{/each}}
</script>
<script type="text/template7" id="tpl2">    
{{#each evaluateList}}
<li>
        <h4>
            {{brandName}}<span class="rate-time">{{dataymd}}</span>
        </h4>

        <p>{{content}}
		<br>
		{{#each imgs}}
			<img alt="" src="{{this}}">
		{{/each}}
		</p>
    </li>
{{/each}}

</script>

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
<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
<script type="text/javascript" src="/view/staticwap/js/page/shop/rate.js"></script>
</body>


</html>