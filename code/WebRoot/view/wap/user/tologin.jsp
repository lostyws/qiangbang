
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/user/register-login.css"/>
<body class=mobile-page>
	<div class="top-bar ">
		<div class="go-back">
			<button class="btn_back"></button>
		</div>
	</div>
	<div class="wx-top hide">
		<a>点我关注“抢帮网”优惠享不停</a> <i class="iconfont icon-close"></i>
	</div>
	<!-- wap -->
	<div class="login-register has-topbar" data-platform="wap">
		<img class="logo-img" src="/view/staticwap/image/bglogo.png">
		<!--<div class="toggle">
		-->
		<!--<button class="to-login-btn active">普通登录</button>
	-->
	<!--<button class="to-quick-btn">动态密码登录</button>
-->
<!--</div>
-->
<form class="login-form clearfix">
	<div class="input-item must tel">
		<input  name="username" type="text" value="" maxlength="11" placeholder="请输入您的手机号"></div>
	<div class="input-item must last password">
		<input  name="password" value="" maxlength="30" type="password" placeholder="请输入密码">

	</div>
	<button class="login-page-btn disabled" type="button">登录</button>
	<!-- <div class="to-login">
		没有账号？
		<a href="/shop/goNormalUser">请先注册</a>
	</div> -->
</form>
</div>
<script>
	window.preUrl="/user/me";
    window.isLogin="";
</script>

<script type="text/javascript" src="/view/staticwap/js/page/user/login.js"></script>


</html>