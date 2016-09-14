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
                <a href="search.jsp" data-linkid="100010827"> <i></i>
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
    <a>点我关注“帮抢网”优惠享不停</a>
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

        <h1 class="idx-logo">帮抢</h1>
        <a data-linkid="10006628" class="idx-search" href="search.jsp" tppabs="/search">电商营销季</a>
    </header>

    <nav class="idx-nav">
        <a class="idx-nav-menu" data-linkid="10006629" href="search.jsp" tppabs="/search">
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
                <img src="/view/staticwap/image/sportspic2/2016042009.jpg" tppabs="/mobile/sportspic2/2016042009.jpg" alt=""></a>
            <a class="swiper-slide" data-linkid="10001811" >
                <img src="/view/staticwap/image/sportspic2/2016042503.jpg" tppabs="/mobile/sportspic2/2016042503.jpg" alt=""></a>
            <a class="swiper-slide" data-linkid="10001812" >
                <img src="/view/staticwap/image/sportspic2/2016042703.jpg" tppabs="/mobile/sportspic2/2016042703.jpg" alt=""></a>
            <a class="swiper-slide" data-linkid="10001813" >
                <img src="/view/staticwap/image/sportspic2/2016042704.jpg" tppabs="/mobile/sportspic2/2016042704.jpg" alt=""></a>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination js-swiper-pagination"></div>
    </div>

    <ul class="idx-category clearfix">
        <li>
            <a data-linkid="10001814" href="activity/channel/wlyx.htm" tppabs="/activity/channel/wlyx">
                <img src="/view/staticwap/image/icon/410/2016010706.png" tppabs="/mobile/icon/410/2016010706.png" width="48" height="48" alt="营销推广"/>
                <p>营销推广</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001815" href="activity/channel/pmsj.htm" tppabs="/activity/channel/pmsj">
                <img src="/view/staticwap/image/icon/410/2016010705.png" tppabs="/mobile/icon/410/2016010705.png" width="48" height="48" alt="平面设计"/>
                <p>平面设计</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001816" href="activity/channel/wach.htm" tppabs="/activity/channel/wach">
                <img src="/view/staticwap/image/icon/410/2016010707.png" tppabs="/mobile/icon/410/2016010707.png" width="48" height="48" alt="开发建站"/>
                <p>开发建站</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001817" href="activity/channel/zxsj.htm" tppabs="/activity/channel/zxsj">
                <img src="/view/staticwap/image/icon/410/2016021801.png" tppabs="/mobile/icon/410/2016021801.png" width="48" height="48" alt="装修设计"/>
                <p>装修设计</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001818" href="activity/channel/wscyz.htm" tppabs="/activity/channel/wscyz">
                <img src="/view/staticwap/image/icon/410/2016010701.png" tppabs="/mobile/icon/410/2016010701.png" width="48" height="48" alt="创业者必备"/>
                <p>创业者必备</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001819" href="activity/wach/-type=15&title=文案策划&spid=20.htm" tppabs="/activity/wach/?type=15&title=%E6%96%87%E6%A1%88%E7%AD%96%E5%88%92&spid=20">
                <img src="/view/staticwap/image/icon/410/2016010702.png" tppabs="/mobile/icon/410/2016010702.png" width="48" height="48" alt="文案策划"/>
                <p>文案策划</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001820" href="activity/wach/-type=14&title=电商服务&spid=17.htm">
                <img src="/view/staticwap/image/icon/410/2016010703.png" width="48" height="48" alt="电商服务"/>
                <p>电商服务</p>
            </a>
        </li>
        <li>
            <a data-linkid="10001821" href="activity/pftl-index.htm" tppabs="/activity/pftl-index">
                <img src="/view/staticwap/image/sportspic2/2016022302.jpg"  width="48" height="48" alt="八戒特惠"/>
                <p>八戒特惠</p>
            </a>
        </li>
    </ul>

    <div class="swiper-container js-swiper-container">
        <div class="swiper-wrapper">
            <a class="swiper-slide" data-linkid="10001822" >
                <img src="/view/staticwap/image/sportspic2/2016042625.jpg" alt=""></a>
            <a class="swiper-slide" data-linkid="10001823" href="wap/activity/v2/5.htm">
                <img src="/view/staticwap/image/sportspic2/2016041913.jpg"></a>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination js-swiper-pagination"></div>
    </div>

    <div class="idx-model model-four">
        <h2 class="idx-model-title">特惠</h2>
        <ul class="idx-model-body">

            <li>
                <a href="activity/foolsday-baokuan.htm" >
                    <img src="/view/staticwap/image/sportspic2/2016042609.jpg"></a>
            </li>
            <li>
                <a href="shop/14745106/sid-719017.html" >
                    <img src="/view/staticwap/image/sportspic2/2016042712.jpg"></a>
            </li>
            <li>
                <a href="shop/11498807/sid-651490.html" >
                    <img src="/view/staticwap/image/sportspic2/2016041104.jpg"></a>
            </li>
        </ul>
    </div>

    <div class="idx-model model-three">
        <h2 class="idx-model-title">网站建设精品排行</h2>
        <ul class="idx-model-body">
            <li>
                <a href="shop/11113688/sid-550204.html" tppabs="/shop/11113688/sid-550204.html" data-linkid="10001852">
                    <img src="/view/staticwap/image/sportspic2/2016041108.jpg" tppabs="/mobile/sportspic2/2016041108.jpg"></a>
            </li>
            <li>
                <a href="shop/9936546/sid-635007.html" tppabs="/shop/9936546/sid-635007.html" data-linkid="10001853">
                    <img src="/view/staticwap/image/sportspic2/2016032904.jpg" tppabs="/mobile/sportspic2/2016032904.jpg"></a>
            </li>
            <li>
                <a href="shop/9598622/sid-565194.html" tppabs="/shop/9598622/sid-565194.html" data-linkid="10001854">
                    <img src="/view/staticwap/image/sportspic2/2016032905.jpg" tppabs="/mobile/sportspic2/2016032905.jpg"></a>
            </li>
        </ul>
    </div>

    <%@ include file="/view/wap/layout/footer.jsp" %>
</div>


<script type="text/javascript" src="/view/staticwap/js/page/index.js"></script>
<script type="text/javascript" src="/view/staticwap/js/page/index-zscq.js"></script>





</body>

</html>