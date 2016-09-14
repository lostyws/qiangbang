<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/shop.css" />

<body class=mobile-page>
    <div class="top-bar ">
        <div class="go-back">
            <button class="btn_back"></button>
        </div>
        <h1>橙果企业营销策划有限公司</h1>
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
    <div class="shop-info-content">
        <p>橙果设计-企业维C补给中心！</p>
        <ul class="shop-honor">
            <li>
                <label for=""><span class="provider-grade grade-2">猪九戒</span></label>
                <span class="shop-honor-text">当前能力值166899.12，值得信赖</span>
            </li>
            <li>
                <label for=""><i class="medal-level medal-6"></i></label>
                <span class="shop-honor-text">
                                                八戒通会员，可以为您提供更好的服务
                                            </span>
            </li>
            <li>
                <label for=""><i class="medal-level medal-t"></i></label>
                <span class="shop-honor-text">已加入雇主保障，支持双倍赔付，交纳保障金6000元</span>
            </li>
        </ul>
    </div>
    <section class="shop-model">
        <h3 class="shop-model-title clearfix">
                <i class="shop-icon shop-title-icon-4"></i>
                <strong>服务范围</strong>
            </h3>
        <div class="shop-scope">
            <a class="shop-scope-item" href="#120">名片设计</a>
            <a class="shop-scope-item" href="#123">贺卡设计</a>
            <a class="shop-scope-item" href="#126">明信片设计</a>
            <a class="shop-scope-item" href="#129">请柬设计</a>
            <a class="shop-scope-item" href="#131">工作证设计</a>
            <a class="shop-scope-item" href="#1134">吊牌设计</a>
            <a class="shop-scope-item" href="#1212">包装设计</a>
            <a class="shop-scope-item" href="#1363">VI系统设计</a>
            <a class="shop-scope-item" href="#1375">网站UI设计</a>
            <a class="shop-scope-item" href="#1428">其它卡片设计</a>
            <a class="shop-scope-item" href="#1448">LOGO设计</a>
            <a class="shop-scope-item" href="#1617">袋装设计</a>
            <a class="shop-scope-item" href="#1731">企业支付</a>
        </div>
    </section>
    <script src="http://m.zbjimg.com/j-mobile/static/js/plugin/first-screen-time.js"></script>
    <section class="shop-model ">
        <h3 class="shop-model-title clearfix">
                <i class="shop-icon shop-title-icon-5"></i>
                <strong>TA承诺</strong>
            </h3>
        <div class="promise-list">
            <div class="promise-item">
                <div class="promise-flag"><i class="promise-icon icon-2">保证原创</i></div>
                <div>
                    <p>保证提供原创作品。</p>
                    <p>若有违背承诺，雇主可申请双倍赔付。</p>
                </div>
            </div>
            <div class="promise-item">
                <div class="promise-flag"><i class="promise-icon icon-1">保证完成</i></div>
                <div>
                    <p>保证按时完成，保证质量并修改到满意为止。</p>
                    <p>若有违背承诺，雇主可获得双倍赔付。</p>
                </div>
            </div>
        </div>
    </section>
    <section class="shop-nav">
        <a class="call-btn make-a-call" href="#" data-phone="4000-123-852">联系TA</a>
        <a class="buy-btn" href="/shop/hire?salerId=2839515">雇佣TA</a>
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

    <script type="text/javascript" src="/view/staticwap/js/page/shop/info.js"></script>
</body>


</html>
