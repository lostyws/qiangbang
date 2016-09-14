
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/webuploader/0.1.6/webuploader.css"/>

	
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/user/personreg.css"/>

<link rel="stylesheet" type="text/css" href="/view/staticwap/framework7/css/framework7.ios.css"/>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/framework7-qb-theme.css"/>
<body class="weixin-body">
	<!-- Status bar overlay for full screen mode (PhoneGap) -->
    <div class="statusbar-overlay"></div>
    <!-- Panels overlay-->
    <div class="panel-overlay"></div>
    <!-- Left panel with reveal effect-->
    <div class="panel panel-left panel-reveal">
      <div class="content-block">
        <p>Left panel content goes here</p>
      </div>
    </div>
    <!-- Views -->
    <div class="views">
      <!-- Your main view, should have "view-main" class -->
      <div class="view view-main">
        <!-- Top Navbar-->
        <div class="navbar ">
	        <div class="navbar-inner">
	            <div class="left">
	                <a class="link icon-only" href="javascript:history.go(-1);">
	                    <i class="icon icon-back"></i>
	                </a>
	            </div>
	            <div class="center sliding" style="left: -11.5px;">
	      	<div class="buttons-row buttons-inner">
	          	<a href="/shop/goNormalUser" class="button tab-link external active">普通注册</a>
	          	<a href="/shop/goShopUser" data-href="" class="  button tab-link external">个体注册</a>
	       	</div>
	            </div>
	            <div class="right">
	                <span class="js-showMenu"></span>
	            </div>
	        </div>
	    </div>
        <!-- Pages container, because we use fixed-through navbar and toolbar, it has additional appropriate classes-->
        <div class="pages navbar-through toolbar-through">
          <!-- Page, "data-page" contains page name -->
          <div data-page="index" class="page">
            <!-- Scrollable page content -->
            <div class="page-content login-register has-topbar">
		<img class="logo-img" src="/view/staticwap/image/page/user/login-logo.png" >
		<form class="clearfix">
			<div class="uploadIdCard">
                <div class="uploadIdCard-front webuploader-container"><div class="webuploader-pick">
                    <input type="hidden" class="input_check idCardFront" name="identityCardFront" nullmsg="请上传身份证正面图" errormsg="请上传身份证正面图">
                    <img class="uploadIdCard-front-img" src="/view/staticwap/image/page/common/webupload.png">
                    <p class="front-tip">身份证正面照</p>
                    
                </div>
                <div id="rt_rt_1ajb3i1f7gt716s1c5c1bvh2fq1">
                <input type="file" name="file" class="webuploader-element-invisible" accept="image/*"><label></label></div></div>
                <div class="uploadIdCard-back webuploader-container"><div class="webuploader-pick">
                    <input type="hidden" class="input_check idCardBack" name="identityCardBack" nullmsg="请上传身份证反面图" errormsg="请上传身份证反面图">
                    <img class="uploadIdCard-back-img" src="/view/staticwap/image/page/common/webupload.png">
                    <p class="back-tip">身份证反面照</p>
                </div><div id="rt_rt_1ajb3i1fc1dd3fjb18f81g1u1eo64" style="position: absolute; top: 0px; left: 0px; width: 188px; height: 117px; overflow: hidden; bottom: auto; right: auto;"><input type="file" name="file" class="webuploader-element-invisible" accept="image/*"><label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label></div></div>
            </div>
         
			<input type="hidden" name="puserid" value="">

			<div class="input-item must txt">
				<label>手机号</label>
				<input name="tel" type="text" maxlength="11" placeholder="请输入手机号">
				</div>
			
			<div class="input-item must txt">
				<label>验证码</label>
				<input name="code"type="text" maxlength="6" placeholder="请输入验证码">
				<button type="button" class="get-code disabled">获取验证码</button>
			</div>
			<div class="input-item must txt">
				<label>密码</label>
				<input name="password" type="password" placeholder="请设置密码"></div>
			<div class="list-block">
			  <ul>
			    <li><a href="#" class="item-link smart-select">
			        <!-- "multiple" attribute for multiple select-->
			        <select name="shoptype" id="shoptype" multiple>
			        <c:forEach var="item" items="${categorys}" varStatus="status">
						<optgroup label="${item.cateName }">
			          	 	<c:forEach var="category" items="${item.categorys}" >
			          	 		<option value="${category.id }" parentname="${item.cateName }">${category.categoryname }</option>
			          	 	</c:forEach>
			          	 </optgroup>
					</c:forEach>
			          <!-- options grouped within "optgroup" tag-->
			        </select>
			        <input type="hidden" name="shoptypeJson" value="" id="shoptypeJson"/>
			        <input type="hidden" name="shoptypename" value="" id="shoptypename"/>
			        <div class="item-content">
			          <div class="item-inner">
			            <div class="item-title">分类</div>
			          </div>
			        </div></a></li>
			  </ul>
			</div>
			<div class="input-item must txt">
				<label>真实姓名</label>
				<input name="name" type="text" maxlength="11" placeholder="请输入真实姓名"></div>
			<div class="input-item must txt">
				<label>身份证号码</label>
				<input name="icard" type="text" maxlength="18" placeholder="请输入身份证号码"></div>
			
			
			
				
			
			
				
			<!-- <button class="login-page-btn disabled" type="hidden" style="display: none;" id="register-btn">注册</button> -->
		</form>
	</div>
          </div>
        </div>
        <!-- Bottom Toolbar-->
        <div class="toolbar">
          <div class="toolbar-inner row">
            <!-- Toolbar links -->
            
            <a href="#" class=" col-100 button button-big button-fill button-red" id="register-btn">注册</a>
            <!-- <button class="login-page-btn disabled" type="button"id="register-btn">注册</button> -->
          </div>
        </div>
      </div>
    </div>






















</body>
<script>
var qbtoken="UQpyphquRKgGYU1aDRw4I5sH%2BhjLQIEUJjUhiEL7pCZnkAJGc1bYJaQeTrQqT32akIMWKzwA9rlCgbMubX7E2RXmCJYWyqST%2BwkoZRaCfl4%3D";
var config = {
		uploadImgErrors: {
            'Q_EXCEED_NUM_LIMIT':  '只能选择1张图',
            'Q_EXCEED_SIZE_LIMIT': '图片大小超过5mb',
            'Q_TYPE_DENIED': '图片类型不符合，请选择gif,jpg,jpeg,bmp,png'
        }

}
</script>
<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/js/jquery/1.11.1/jquery.js"></script>

<script type="text/javascript" src="/view/staticwap/webuploader/0.1.6/webuploader.custom.js"></script>

<script type="text/javascript" src="/view/staticwap/js/page/user/personreg.js"></script> 


</html>