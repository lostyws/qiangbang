<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/index.css" />
<body class=mobile-page>
<div class="top-bar ">
    <div class="go-back">
        <button class="btn_back"></button>
    </div>
    <h1>主页</h1>
    <div class="nav">
        <button class="more-action" data-linkid="100010825"></button>
        <ul class="nav-menu">
            <li class="item item-1 btn-press-down">
                <a href="/wapIndex/index"  data-linkid="100010826"> <i></i>
                    首页
                </a>
            </li>
            <li class="item item-2 btn-press-down">
                <a href="/wapIndex/goSearch" data-linkid="100010827"> <i></i>
                    分类
                </a>
            </li>
            <li class="item item-3 btn-press-down">
                <a href="/wapact/index" data-linkid="100010828">
                    <i></i>
                    我的
                </a>
            </li>

        </ul>
    </div>
</div>
<div class="wx-top hide">
    <a>点我关注“抢帮网”优惠享不停</a>
    <i class="iconfont icon-close"></i>
</div>
<!-- wap -->
<div class="grid">
    <style>
        #pullDown {
            display: none;
        }

        .top-bar {
            display: none;
        }

        .mobile-page {
            padding-top: 0;
        }

        .bottom-nav {
            display: none;
        }
    </style>
    <header class="idx-head">

        <h1 class="idx-logo">抢帮</h1>
        <a data-linkid="10006628" class="idx-search" href="/wapIndex/goSearch" tppabs="/search">电商营销季</a>
    </header>

    <nav class="idx-nav">
        <a class="idx-nav-menu" data-linkid="10006629" href="/wapIndex/goSearch" tppabs="/search">
            <i class="nav-search-icon"></i>
            <span>分类</span>
        </a>
        <a class="idx-nav-menu" data-linkid="10006630" href="/wapact/index" tppabs="/user/me">
            <i class="nav-user-icon"></i>
            <span>我的</span>
        </a>
        <a class="idx-nav-btn btn-press-down" data-linkid="10006631" href="/waptask/goDeploy" tppabs="/waptask/goDeploy">发布需求</a>
    </nav>

    <div class="swiper-container js-swiper-container">
        <div class="swiper-wrapper">
            <a class="swiper-slide" data-linkid="10001810" tppabs="/ztoper/april?from=m">
                <img src="/view/staticwap/image/page/index/banner1.jpg" alt="抢帮"></a>
            <a class="swiper-slide" data-linkid="10001811" >
                <img src="/view/staticwap/image/page/index/banner2.jpg" alt="抢帮"></a>
            <a class="swiper-slide" data-linkid="10001812" >
                <img src="/view/staticwap/image/page/index/banner3.jpg" alt="抢帮"></a>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination js-swiper-pagination"></div>
    </div>

    <ul class="idx-category clearfix">
        <li>
            <a data-linkid="10001814" href="/shop/shopParentList/18" >
                <img src="/view/staticwap/image/page/index/logo1.jpg" width="48" height="48" alt="维修"/>
                <p>维修</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001815" href="/shop/shopParentList/13">
                <img src="/view/staticwap/image/page/index/logo2.jpg" width="48" height="48" alt="酒店"/>
                <p>酒店</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001816" href="/shop/shopParentList/33">
                <img src="/view/staticwap/image/page/index/logo3.jpg" width="48" height="48" alt="餐饮"/>
                <p>餐饮</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001817" href="/shop/shopParentList/66" tppabs="/activity/channel/zxsj">
                <img src="/view/staticwap/image/page/index/logo4.jpg" width="48" height="48" alt="电器"/>
                <p>电器</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001818" href="/shop/shopParentList/54" tppabs="/activity/channel/wscyz">
                <img src="/view/staticwap/image/page/index/logo5.jpg" width="48" height="48" alt="建材"/>
                <p>建材</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001819" href="/shop/shopParentList/79" tppabs="/activity/wach/?type=15&title=%E6%96%87%E6%A1%88%E7%AD%96%E5%88%92&spid=20">
                <img src="/view/staticwap/image/page/index/logo6.jpg" width="48" height="48" alt="家具家纺"/>
                <p>家具</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001820" href="/shop/shopParentList/0">
                <img src="/view/staticwap/image/page/index/logo7.jpg" width="48" height="48" alt="百货"/>
                <p>百货</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001821" href="/shop/shopParentList/0" tppabs="/activity/pftl-index">
                <img src="/view/staticwap/image/page/index/logo8.jpg"  width="48" height="48" alt="租房"/>
                <p>租房</p>
            </a>
        </li>
    </ul>

    <div class="swiper-container js-swiper-container">
        <div class="swiper-wrapper">
            <a class="swiper-slide" data-linkid="10001822" >
                <img src="/view/staticwap/image/page/index/banner4.jpg" alt="抢帮"></a>
            <a class="swiper-slide" data-linkid="10001823" >
                <img src="/view/staticwap/image/page/index/banner5.jpg" alt="抢帮"></a>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination js-swiper-pagination"></div>
    </div>



    <div class="idx-model model-three">
        <h2 class="idx-model-title">店铺排行</h2>
        <ul class="idx-model-body">
            <c:forEach var="item" items="${volumes}" varStatus="status">
				<li>
	                <a href="/shop/shopDetail/${item.uid }" tppabs="/shop/11113688/sid-550204.html" data-linkid="10001852">
	                    <img src="${item.shopicon }" tppabs="/mobile/sportspic2/2016041108.jpg"></a>
            	</li>          	
            </c:forEach>
        </ul>
    </div>

    <%@ include file="/view/wap/layout/footer.jsp" %>
</div>


	<script type="text/javascript" src="/view/staticwap/js/page/index.js"></script>
<script type="text/javascript" src="/view/staticwap/js/page/index-zscq.js"></script>
<script>



</script>




</body>

</html>