
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/need-detail/adviser-cooperate.css" />

<body class=mobile-page>
    <div class="top-bar ">
        <div class="go-back">
            <button class="btn_back"></button>
        </div>
        <h1>顾问协作</h1>
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
    <input type="hidden" name="isAdviser" value="false">
    <input type="hidden" name="adviserId" value="">
    <div class="gendan-page adviser-null">
        <div class="provider with-padding">
            <div class="img"><img src="/view/staticwap/image/page/need-detail/adviser-avatar.png" onerror="javascript: this.src='/static/image/widget/face-default.png'" alt=""></div>
            <div class="text">
                如果您遇到以下问题，请联系我们
            </div>
        </div>
        <div class="problem-list with-padding">
            <p><em></em>没有服务商和我联系</p>
            <p><em></em>没有服务商满足我的需求</p>
            <p><em></em>服务商一直拖欠我的工期</p>
            <p><em></em>服务商的工作我不满意</p>
        </div>
        <div class="button-con">
            <div class="inner">
                <button type="button"><i class="iconfont icon-dianhua"></i>拨打400-888-8888热线</button>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="/view/staticwap/js/page/need-detail/adviser-cooperate.js"></script>
</body>


</html>
