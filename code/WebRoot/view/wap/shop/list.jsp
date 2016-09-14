
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
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
	<div class="search-group full-list active slideDown">
		<ul class="service-list">
			<c:forEach var="item" items="${businessData}" varStatus="status">
			<li class="click"><a class="clearfix list-parent" href="/shop/shopDetail/${item.uid }">
					<div class="list-img">
						<img src="${item.shopicon }" alt="">
					</div>
					<div class="list-body">
						<p class="list-title">${item.shopname }</p>
						<div class="list-price">
							<!-- <span class="count">¥0元</span> <span class="discount">已省1.0元</span> -->
						</div>
						<div class="list-info clearfix">
						   <c:choose>
                    		<c:when test="${item.isauth==1 }">
			                    <span class="label blue">已认证</span>
						 	</c:when>
						 	<c:otherwise>
								 <span class="label orange">未认证</span>
						 	</c:otherwise>
						 	</c:choose>
						 	<c:choose>
                    		<c:when test="${item.bondmoney>0 && item.isbond>0 }">
								<span class="label blue">已交保证金</span>
						 	</c:when>
						 	<c:otherwise>
								 <span class="label orange">未交保证金</span>
						 	</c:otherwise>
						 	</c:choose>

							<span class="sales">成交${item.con } </span>
						</div>
					</div> <!-- <div class="list-sub">
                            这是一句描述相关的什么什么鬼
                        </div> -->
			</a></li>
			</c:forEach>

		</ul>
		<div class="no-search-data ">
			<div class="no-data-info">抱歉，没有找到相关内容～</div>
			<div class="to-chance">
				<div class="chance-info">
					<!-- <img src="../../static/image/page/search/phone-pig.png"> -->

					<div class="info-content">我们会有专业顾问了解您的需求</div>
				</div>

			</div>
		</div>
		<div class="load-more">
			<button>点击加载更多</button>
		</div>
		<div class="load-over">没有更多数据</div>
		<div class="list-data-loading"></div>

	</div>












	<script type="text/javascript" src="/view/staticwap/js/page/search/search.js"></script>



</body>

</html>