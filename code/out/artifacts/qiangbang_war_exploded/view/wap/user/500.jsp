
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/common/error.css"/>


<body class=mobile-page>
    <div class="top-bar ">
        <div class="go-back">
            <button class="btn_back"></button>
        </div>
        <h1>错误页</h1>
        <div class="nav">
            <button class="more-action"></button>
            <ul class="nav-menu">
                <li class="item item-1 btn-press-down">
                    <a href="../index.htm"> <i></i>
                        首页
                    </a>
                </li>
                <li class="item item-2 btn-press-down">
                    <a href="../search.htm" > <i></i>
                        分类
                    </a>
                </li>
                <li class="item item-3 btn-press-down">
                    <a href="me.htm">
                        <i></i>
                        我的
                    </a>
                </li>
                <!-- <li class="item item-4">
                <a href="/search" class="btn-press-down" data-linkid="100010829">
                    <i></i>
                    搜索
                </a>
            </li>
            -->
            </ul>
        </div>
</div>
<div class="wx-top hide">
    <a>点我关注“帮抢网”优惠享不停</a>
    <i class="iconfont icon-close"></i>
</div>
<!-- wap -->
<div class="error-page">
    <img class="not-found" src="/view/staticwap/image/page/common/404.png" >
    
    <a class="goto" href='/'>回首页</a>
</div>

</body>

</html>