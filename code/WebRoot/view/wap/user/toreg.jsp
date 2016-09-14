
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
	<div class="login-register has-topbar">
		<img class="logo-img" src="/view/staticwap/image/page/user/login-logo.png" >
		<form class="clearfix">
			<input type="hidden" name="puserid" value="">

			<div class="input-item must tel">
				<input name="tel" type="text" maxlength="11" placeholder="请输入手机号"></div>
			<div class="input-item must code">
				<input name="code"type="text" maxlength="6" placeholder="请输入验证码">
				<button type="button" class="get-code disabled">获取验证码</button>
			</div>
			<div class="input-item must password  hide">
				<input name="verificationCode"type="text"placeholder="请输入右侧验证码">
				<img class="verify-code"src="/view/staticwap/image/qblogo.png"></div>
			<div class="input-item must password">
				<input name="password"type="password"placeholder="请设置密码"></div>
			<button class="login-page-btn disabled" type="button"id="register-btn">注册</button>
			<div class="to-login">
				已有账号？
				<a href=" tologin.jsp">直接登录</a>
			</div>
		</form>
	</div>

</body>
<script>
var qbtoken="UQpyphquRKgGYU1aDRw4I5sH%%2BwkoZRaCfl4%3D";
</script>

<script type="text/javascript" src="/view/staticwap/js/page/user/register.js"></script> 



</html>