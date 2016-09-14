
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>

<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/search.css" />

<body class=mobile-page>
	<div class="top-bar ">
		<div class="go-back">
			<button class="btn_back"></button>
		</div>
		<h1>搜索</h1>
		<div class="nav">
			<button class="more-action" data-linkid="100010825"></button>
			<ul class="nav-menu">
				<li class="item item-1 btn-press-down"><a href="/wapIndex/index"
					data-linkid="100010826"> <i></i> 首页
				</a></li>
				<li class="item item-2 btn-press-down"><a href="/wapIndex/goSearch"
					data-linkid="100010827"> <i></i> 分类
				</a></li>
				<li class="item item-3 btn-press-down"><a href="/wapact/index"
					data-linkid="100010828"> <i></i> 我的
				</a></li>

			</ul>
		</div>
	</div>
	<div class="wx-top hide">
		<a>点我关注“抢帮网”优惠享不停</a> <i class="iconfont icon-close"></i>
	</div>
	<!-- wap -->
	<style>
body {
	padding-top: 44px !important;
}

.bottom-nav {
	display: none;
}
</style>
	<div class="top-bar search-top">
		<div class="go-back">
			<button class="btn_back"></button>
		</div>
		<div class="search-form">
			<div class="search-type">
				<span>店铺</span>
				<!-- <ul class="">
					<li data-type="SERVICE" class="service-cate" data-linkid="10006632">服务</li>
					<li data-type="SHOP" class="shop-cate" data-linkid="10006633">店铺</li>
					<li data-type="TASK" class="task-cate" data-linkid="10006634">案例</li>
				</ul> -->
			</div>
			<div class="input-wrapper">
				<input type="text" name="keyword" maxlength="15" id="search-text"
					class="search-text" placeholder="快速找帮手">
			</div>
			<span class="clear-value iconfont icon-close"></span>
		</div>
		<button class="search-btn">搜索</button>
	</div>
	<div class="search-content search-content2">
		<div class="search-cate">
			<ul>
				<c:forEach var="item" items="${categoryMap['parents']}" varStatus="status">
					<li class="cate-item ${status.first?'active':''}" data-linkid="${item.id }" data-cate="${item.id }">${item.categoryname }</li>
				</c:forEach>
			</ul>
		</div>
		<div id="wrapper">
			<div class="search-recommend">
				<c:forEach var="parent" items="${categoryMap['parents']}" varStatus="status">
					<div class="second-cate ${status.first?'active':''}" data-cate="${parent.id }">
							<c:forEach var="item" items="${categoryMap['childs']}" varStatus="status">
								<c:if test="${parent.id==item.parentId}">

									<a href="/shop/shopList/${item.id }"
										data-linkid="${item.id }" class="cate-item flex-item">
										<span>${item.categoryname }</span>
									</a>

								</c:if>
							</c:forEach>
					</div>
				</c:forEach>
			</div>
		</div>

		<!-- /下载 -->

	</div>




	<script type="text/javascript" src="/view/staticwap/js/page/search/search.js"></script>



</body>

</html>