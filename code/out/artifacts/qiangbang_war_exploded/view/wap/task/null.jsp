<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/common/error.css" />
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/need-detail/hire.css" />

<body class=mobile-page>
    <div class="top-bar ">
        <div class="go-back">
            <button class="btn_back"></button>
        </div>
        <h1>需求详情</h1>
        <div class="nav">
            <button class="more-action" data-linkid="100010825"></button>
            <ul class="nav-menu">
                <li class="item item-1 btn-press-down"><a href="/" data-linkid="100010826"><i></i>首页</a></li>
                <li class="item item-2 btn-press-down"><a href="/search" data-linkid="100010827"><i></i>分类</a></li>
                <li class="item item-3 btn-press-down"><a href="/user/me" data-linkid="100010828"><i></i>我的</a></li>
                <!-- <li class="item item-4"><a href="/search" class="btn-press-down" data-linkid="100010829"><i></i>搜索</a></li> -->
            </ul>
        </div>
    </div>
    <div class="wx-top hide">
        <a>点我关注“抢帮网”优惠享不停</a>
        <i class="iconfont icon-close"></i>
    </div>
    <!-- wap -->
    <div class="error-page has-topbar">
        <img class="corner" src="/view/staticwap/image/page/common/not-found.png">
        <p class="tips3">您所查看的需求已关闭</p>
    </div>
    <div class="page-container bg-grey hire-page">
        <div class="special-activities">
            <div class="heart">
                <span class="left"></span>
                <span class="center"><i class="iconfont icon-heart"></i>猜您喜欢</span>
                <span class="right"></span>
            </div>
        </div>
    </div>
    
	<%@ include file="/view/wap/layout/userfooter.jsp" %>
    <script type="text/javascript" src="/view/staticwap/js/page/need-detail/hire.js"></script>
</body>


</html>
