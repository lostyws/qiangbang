
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
				<li class="item item-1 btn-press-down"><a href="index.htm"
					data-linkid="100010826"> <i></i> 首页
				</a></li>
				<li class="item item-2 btn-press-down"><a href="search.htm"
					data-linkid="100010827"> <i></i> 分类
				</a></li>
				<li class="item item-3 btn-press-down"><a href="user/me.htm"
					data-linkid="100010828"> <i></i> 我的
				</a></li>

			</ul>
		</div>
	</div>
	<div class="wx-top hide">
		<a>点我关注“帮抢网”优惠享不停</a> <i class="iconfont icon-close"></i>
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
				<span>服务</span>
				<ul class="">
					<li data-type="SERVICE" class="service-cate" data-linkid="10006632">服务</li>
					<li data-type="SHOP" class="shop-cate" data-linkid="10006633">店铺</li>
					<li data-type="TASK" class="task-cate" data-linkid="10006634">案例</li>
				</ul>
			</div>
			<div class="input-wrapper">
				<input type="text" name="keyword" maxlength="15" id="search-text"
					class="search-text" placeholder="快速找帮手、找服务～">
			</div>
			<span class="clear-value iconfont icon-close"></span>
		</div>
		<button class="search-btn">搜索</button>
	</div>
	<div class="search-content">
		<div class="search-cate">
			<ul>
				<li class="cate-item active" data-cate="hot">热门分类</li>
				<li class="cate-item " data-linkid="10011659" data-cate="1">设计分类</li>

				<li class="cate-item" data-cate="history">最近浏览</li>
			</ul>
		</div>
		<div id="wrapper">
			<div class="search-recommend">

				<div class="second-cate active" data-cate="hot">

					<div class="display-flex">
						<a href="search/searchbykey-keyword=网店装修.htm"
							tppabs="/search/searchbykey?keyword=网店装修"
							class="cate-item flex-item" data-linkid="10011682"> <span>网店装修</span>
						</a> <a href="search/searchbykey-keyword=海报设计.htm"
							tppabs="/search/searchbykey?keyword=海报设计"
							class="cate-item flex-item" data-linkid="10011683"> <span>海报设计</span>
						</a>
					</div>
				</div>
				<script src="/view/staticwap/js/plugin/first-screen-time.js"></script>

				<div class="second-cate general-cate" data-cate="1">

					<div class="display-flex">
						<a href="sjsj/index.htm"> <img
							src="/view/staticwap/image/icon/410/category/20160118sjsj.png"
							
							alt=""> <span>书籍设计</span>
						</a> <a href="fzpssj/index.htm" 
							data-linkid="10011697" class="cate-item flex-item"> <img
							src="/view/staticwap/image/icon/410/category/20160118fzpssj.png"
							
							alt=""> <span>服装配饰设计</span>
						</a> <a href="ysfw/index.htm" 
							data-linkid="10011698" class="cate-item flex-item"> <img
							src="/view/staticwap/image/icon/410/category/20160118ysfw.png"
							
							alt=""> <span>印刷服务</span>
						</a>
					</div>
				</div>



				<div class="second-cate general-cate" data-cate="6">
					<div class="display-flex">
						<a href="sbzc/index.htm" tppabs="/sbzc/"
							data-linkid="10011799" class="cate-item flex-item"> <img
							src="/view/staticwap/image/icon/410/category/20160118sbzc.png"
							
							alt=""> <span>商标注册</span>
						</a> <a href="zlzc/index.htm" tppabs="/zlzc/"
							data-linkid="10011800" class="cate-item flex-item"> <img
							src="/view/staticwap/image/icon/410/category/20160118zlzc.png"
							tppabs="http://cms.zbjimg.com/mobile/icon/410/category/20160118zlzc.png"
							alt=""> <span>专利注册</span>
						</a> <a href="gszc/index.htm" tppabs="/gszc/"
							data-linkid="10011801" class="cate-item flex-item"> <img
							src="/view/staticwap/image/icon/410/category/20160118gszc.png"
							tppabs="http://cms.zbjimg.com/mobile/icon/410/category/20160118gszc.png"
							alt=""> <span>公司注册</span>
						</a>
					</div>
					<div class="display-flex">
						<a href="dljz/index.htm" tppabs="/dljz/"
							data-linkid="10011802" class="cate-item flex-item"> <img
							src="/view/staticwap/image/icon/410/category/20160118dljz.png"
							tppabs="http://cms.zbjimg.com/mobile/icon/410/category/20160118dljz.png"
							alt=""> <span>代理记账</span>
						</a> <a href="dlsj/index.htm" tppabs="/dlsj/"
							data-linkid="10011803" class="cate-item flex-item"> <img
							src="/view/staticwap/image/icon/410/category/20160118dlsj.png"
							tppabs="http://cms.zbjimg.com/mobile/icon/410/category/20160118dlsj.png"
							alt=""> <span>代理审计</span>
						</a> <a href="csyn/index.htm" tppabs="/csyn/"
							data-linkid="10011804" class="cate-item flex-item"> <img
							src="/view/staticwap/image/icon/410/category/20160118csyn.png"
							tppabs="http://cms.zbjimg.com/mobile/icon/410/category/20160118csyn.png"
							alt=""> <span>财税疑难</span>
						</a>
					</div>
					<div class="display-flex">
						<a href="zzyz/index.htm" data-linkid="10011805"
							class="cate-item flex-item"> <img
							src="/view/staticwap/image/icon/410/category/20160118zzyz.png"
							tppabs="http://cms.zbjimg.com/mobile/icon/410/category/20160118zzyz.png"
							alt=""> <span>增资验资</span>
						</a> <a href="qybg/index.htm" tppabs="/qybg/"
							data-linkid="10011806" class="cate-item flex-item"> <img
							src="/view/staticwap/image/icon/410/category/20160118qybg.png"
							tppabs="http://cms.zbjimg.com/mobile/icon/410/category/20160118qybg.png"
							alt=""> <span>企业变更</span>
						</a> <a href="qynj/index.htm" tppabs="/qynj/"
							data-linkid="10011807" class="cate-item flex-item"> <img
							src="/view/staticwap/image/icon/410/category/20160118qynj.png"
							tppabs="http://cms.zbjimg.com/mobile/icon/410/category/20160118qynj.png"
							alt=""> <span>企业年检</span>
						</a>
					</div>
				</div>
				<div class="second-cate" data-cate="history"></div>

				<script type="text/tpl" id="history-tpl">
                                                {@each data as item,indext}
                            {@if indext%2 == 0}
                                <div class="display-flex">
                            {@/if}
                            <a href="search/searchbykey-keyword=${item}.htm"/*tpa=/search/searchbykey?keyword=${item}*/ data-linkid="10011808" class="cate-item flex-item"><span>${item}</span></a>
                            {@if indext%2 == 1 || indext == data.length-1}
                                {@if indext%2 == 0}
                                <div class="flex-item"></div>
                                {@/if}
                                </div>
                            {@/if}
                        {@/each}
                        </script>
				<!-- </div>
            -->
				<div class="search-group active" data-cate="hot">
					<div class="search-hot">热门服务</div>
					<ul class="service-list">
						<li class="click"><a class="clearfix list-parent"
							data-linkid="10006635" href="shop/1439914/sid-641182.html"
							tppabs="/shop/1439914/sid-641182.html">
								<div class="list-img">
									<img src="/view/staticwap/image/widget/face-default.png"
										tppabs="/view/staticwap/image/widget/face-default.png"
										data-image="/service/2016-04/16/service/5711a186d9fdd.jpg"
										alt="">
								</div>
								<div class="list-body">
									<p class="list-title">【辉煌推广】收藏淘宝天猫宝贝店铺淘宝推广微淘粉丝</p>
									<div class="list-price">
										<span class="count">¥49.00元</span>
										<!-- <span class="discount">已省1.0元</span>
                                -->
									</div>
									<div class="list-info clearfix">
										<span class="label orange">在线</span> <span class="label blue">店铺优化</span>
										<span class="sales">成交33314</span>
									</div>
								</div> <!-- <div class="list-sub">这是一句描述相关的什么什么鬼</div>
                    -->
						</a></li>
						<li class="click"><a class="clearfix list-parent"
							data-linkid="10006635" href="shop/11656226/sid-587309.html"
							tppabs="/shop/11656226/sid-587309.html">
								<div class="list-img">
									<img src="/view/staticwap/image/widget/face-default.png"
										tppabs="/view/staticwap/image/widget/face-default.png"
										data-image="/service/2016-04/26/service/571ee319c7c7e.jpg"
										alt="">
								</div>
								<div class="list-body">
									<p class="list-title">【淘宝推广热门推荐套餐】收藏流量销量打造爆款包月网店铺推广</p>
									<div class="list-price">
										<span class="count">¥187.00元</span>
										<!-- <span class="discount">已省13.0元</span>
                        -->
									</div>
									<div class="list-info clearfix">
										<span class="label orange">在线</span> <span class="label blue">流量推广</span>
										<span class="sales">成交14179</span>
									</div>
								</div> <!-- <div class="list-sub">这是一句描述相关的什么什么鬼</div>
            -->
						</a></li>
						<li class="click"><a class="clearfix list-parent"
							data-linkid="10006635" href="shop/7558336/sid-387227.html"
							tppabs="/shop/7558336/sid-387227.html">
								<div class="list-img">
									<img src="/view/staticwap/image/widget/face-default.png"
										tppabs="/view/staticwap/image/widget/face-default.png"
										data-image="/service/2016-03/20/service/56edffbe59e0c.jpg"
										alt="">
								</div>
								<div class="list-body">
									<p class="list-title">阿里巴巴天猫淘宝宝贝收藏送店铺人工收藏网店人气流量手机推广</p>
									<div class="list-price">
										<span class="count">¥50.00元</span>
									</div>
									<div class="list-info clearfix">
										<span class="label orange">在线</span> <span class="label blue">店铺优化</span>
										<span class="sales">成交9579</span>
									</div>
								</div> <!-- <div class="list-sub">这是一句描述相关的什么什么鬼</div>
        -->
						</a></li>
						<li class="click"><a class="clearfix list-parent"
							data-linkid="10006635" href="shop/4638507/sid-344102.html"
							tppabs="/shop/4638507/sid-344102.html">
								<div class="list-img">
									<img src="/view/staticwap/image/widget/face-default.png"
										tppabs="/view/staticwap/image/widget/face-default.png"
										data-image="/service/2016-02/19/service/56c7191a24e57.jpg"
										alt="">
								</div>
								<div class="list-body">
									<p class="list-title">网店推广包月打造爆款优化销量排名提升淘宝店铺人气流量手机无线</p>
									<div class="list-price">
										<span class="count">¥175.00元</span>
										<!-- <span class="discount">已省5.0元</span>
            -->
									</div>
									<div class="list-info clearfix">
										<span class="label orange">在线</span> <span class="label blue">流量推广</span>
										<span class="sales">成交8267</span>
									</div>
								</div> <!-- <div class="list-sub">这是一句描述相关的什么什么鬼</div>
-->
						</a></li>
						<li class="click"><a class="clearfix list-parent"
							data-linkid="10006635" href="shop/1439914/sid-641114.html"
							tppabs="/shop/1439914/sid-641114.html">
								<div class="list-img">
									<img src="/view/staticwap/image/widget/face-default.png"
										tppabs="/view/staticwap/image/widget/face-default.png"
										data-image="/service/2016-04/18/service/5713bf564fa42.jpg"
										alt="">
								</div>
								<div class="list-body">
									<p class="list-title">【辉煌推广】包月网店铺淘宝推广天猫手机流量宝贝收藏打造爆款</p>
									<div class="list-price">
										<span class="count">¥78.00元</span>
										<!-- <span class="discount">已省2.0元</span>
    -->
									</div>
									<div class="list-info clearfix">
										<span class="label orange">在线</span> <span class="label blue">流量推广</span>
										<span class="sales">成交5925</span>
									</div>
								</div> <!-- <div class="list-sub">这是一句描述相关的什么什么鬼</div>
-->
						</a></li>
						<li class="click"><a class="clearfix list-parent"
							data-linkid="10006635" href="shop/7087149/sid-462134.html"
							tppabs="/shop/7087149/sid-462134.html">
								<div class="list-img">
									<img src="/view/staticwap/image/widget/face-default.png"
										tppabs="/view/staticwap/image/widget/face-default.png"
										data-image="/service/2016-02/22/service/56cacd34a4da3.jpg"
										alt="">
								</div>
								<div class="list-body">
									<p class="list-title">淘宝推广流量收藏 天猫宝贝网店人工收藏店铺提升排名关键词优化</p>
									<div class="list-price">
										<span class="count">¥48.00元</span>
										<!-- <span class="discount">已省2.0元</span>
-->
									</div>
									<div class="list-info clearfix">
										<span class="label orange">在线</span> <span class="label blue">流量推广</span>
										<span class="sales">成交5474</span>
									</div>
								</div> <!-- <div class="list-sub">这是一句描述相关的什么什么鬼</div>
-->
						</a></li>
						<li class="click"><a class="clearfix list-parent"
							data-linkid="10006635" href="shop/4256886/sid-584684.html"
							tppabs="/shop/4256886/sid-584684.html">
								<div class="list-img">
									<img src="/view/staticwap/image/widget/face-default.png"
										tppabs="/view/staticwap/image/widget/face-default.png"
										data-image="/service/2016-03/22/service/56f0e0075b51f.jpg"
										alt="">
								</div>
								<div class="list-body">
									<p class="list-title">【淘宝推广热门推荐套餐】收藏销量流量打造爆款包月网店铺推广</p>
									<div class="list-price">
										<span class="count">¥165.00元</span>
										<!-- <span class="discount">已省4.0元</span>
-->
									</div>
									<div class="list-info clearfix">
										<span class="label orange">在线</span> <span class="label blue">流量推广</span>
										<span class="sales">成交5347</span>
									</div>
								</div> <!-- <div class="list-sub">这是一句描述相关的什么什么鬼</div>
-->
						</a></li>
						<li class="click"><a class="clearfix list-parent"
							data-linkid="10006635" href="shop/9457294/sid-409045.html"
							tppabs="/shop/9457294/sid-409045.html">
								<div class="list-img">
									<img src="/view/staticwap/image/widget/face-default.png"
										tppabs="/view/staticwap/image/widget/face-default.png"
										data-image="/service/2016-03/08/service/56de492d21223.jpg"
										alt="">
								</div>
								<div class="list-body">
									<p class="list-title">【论坛推广】论坛发帖顶贴回复论坛发贴外链热帖炒作加精置顶推广</p>
									<div class="list-price">
										<span class="count">¥98.00元</span>
										<!-- <span class="discount">已省1.0元</span>
-->
									</div>
									<div class="list-info clearfix">
										<span class="label orange">在线</span> <span class="label blue">论坛推广</span>
										<span class="sales">成交5270</span>
									</div>
								</div> <!-- <div class="list-sub">这是一句描述相关的什么什么鬼</div>
-->
						</a></li>
						<li class="click"><a class="clearfix list-parent"
							data-linkid="10006635" href="shop/11621032/sid-609828.html"
							tppabs="/shop/11621032/sid-609828.html">
								<div class="list-img">
									<img src="/view/staticwap/image/widget/face-default.png"
										tppabs="/view/staticwap/image/widget/face-default.png"
										data-image="/service/2016-03/31/service/56fcd5d6d3174.jpg"
										alt="">
								</div>
								<div class="list-body">
									<p class="list-title">淘宝店铺推广宝贝店铺收藏 开团提醒 加购物车微淘关注打造爆款</p>
									<div class="list-price">
										<span class="count">¥49.00元</span>
										<!-- <span class="discount">已省1.0元</span>
-->
									</div>
									<div class="list-info clearfix">
										<span class="label orange">在线</span> <span class="label blue">店铺优化</span>
										<span class="sales">成交4871</span>
									</div>
								</div> <!-- <div class="list-sub">这是一句描述相关的什么什么鬼</div>
-->
						</a></li>
						<li class="click"><a class="clearfix list-parent"
							data-linkid="10006635" href="shop/8955395/sid-456150.html"
							tppabs="/shop/8955395/sid-456150.html">
								<div class="list-img">
									<img src="/view/staticwap/image/widget/face-default.png"
										tppabs="/view/staticwap/image/widget/face-default.png"
										data-image="/service/2016-02/18/service/56c5dcd89e89b.jpg"
										alt="">
								</div>
								<div class="list-body">
									<p class="list-title">【特惠专场】企业商业网站Logo设计丨标志设计丨商标设计丨</p>
									<div class="list-price">
										<span class="count">¥529.00元</span>
										<!-- <span class="discount">已省1.0元</span>
-->
									</div>
									<div class="list-info clearfix">
										<span class="label orange">在线</span> <span class="sales">成交4010</span>
									</div>
								</div> <!-- <div class="list-sub">这是一句描述相关的什么什么鬼</div>
-->
						</a></li>
					</ul>
					<div class="load-more">
						<button>点击加载更多</button>
					</div>
					<div class="load-over">没有更多数据</div>
					<div class="list-data-loading"></div>
				</div>
				<div class="search-group" data-cate="history">
					<div class="search-hot">最近浏览</div>
					<ul class="service-list"></ul>
					<div class="load-more">
						<button>点击加载更多</button>
					</div>
					<div class="load-over">没有更多数据</div>
					<div class="list-data-loading"></div>
					<div class="no-view-rec">
						<img src="/view/staticwap/image/page/search/no-view-rec.png">
						<p>木有浏览，快去逛逛吧～</p>
					</div>
				</div>
			</div>
		</div>
		<!-- /下载 -->

	</div>
	<script type="text/tpl" id="service-tpl">
        {@each data as item}
        <li class="click">
            <a class="clearfix list-parent" data-linkid="10006635" href="/shop/${item.userId}/sid-${item.serviceId}.html">
                <div class="list-img">
                    <img src="/view/staticwap/image/widget/face-default.png" data-image="${item.img}" alt="">
                                    </div>
                <div class="list-body">
                    <p class="list-title">${item.subject}</p>
                    {@if item.flag == 1}
                        <div class="list-price">
                            <span class="count">¥${item.amountApp}元</span>
                            <!--已省<span class="discount">${item.priceMinus}元</span>-->
                        </div>
                    {@else}
                        <div class="list-price">
                            <span class="count">¥${item.amount}元</span>
                        </div>
                    {@/if}
                    <div class="list-info clearfix">
                        {@if item.adType == 1}
                            <span class="label orange">至尊</span>
                        {@else if item.adType == 2}
                            <span class="label orange">标王</span>
                        {@/if}
                        {@if item.catelog3Name}
                            <span class="label blue">${item.catelog3Name}</span>
                        {@/if}
                                                                                                    <span class="sales">
                        {@if item.provinceName&&item.provinceName!=""}
                            <!--${item.provinceName}|-->
                        {@/if}
                        成交${item.sales}
                        </span>
                    </div>
                </div>
                <!-- <div class="list-sub">
                    这是一句描述相关的什么什么鬼
                </div> -->
            </a>
        </li>
        {@/each}
    </script>
	

	<script type="text/javascript" src="/view/staticwap/js/page/search/search.js"></script>



</body>

</html>