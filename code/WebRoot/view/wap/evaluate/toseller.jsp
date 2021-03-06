
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/webuploader/0.1.6/webuploader.css"/>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/estimate/estimate.css" />

<style type="text/css">
.webuploader-container {
	 width: 4.5rem;
}

</style>
<body class=mobile-page>
    <div class="top-bar ">
        <div class="go-back">
            <button class="btn_back"></button>
        </div>
        <h1>评价</h1>
        <div class="nav">
            <button class="more-action" data-linkid="100010825"></button>
            <ul class="nav-menu">
                <li class="item item-1 btn-press-down"><a href="/wapIndex/index" data-linkid="100010826"><i></i>首页</a></li>
                <li class="item item-2 btn-press-down"><a href="/wapIndex/goSearch" data-linkid="100010827"><i></i>分类</a></li>
                <li class="item item-3 btn-press-down"><a href="/wapact/index" data-linkid="100010828"><i></i>我的</a></li>
                <!-- <li class="item item-4"><a href="/search" class="btn-press-down" data-linkid="100010829"><i></i>搜索</a></li> -->
            </ul>
        </div>
    </div>
    <div class="wx-top hide">
        <a>点我关注“抢帮网”优惠享不停</a>
        <i class="iconfont icon-close"></i>
    </div>
    <!-- wap -->
    <div class="estimate-page bg-white">
        <form id="estimateForm" action="javascript:void(0);" data-formurl="/waptask/evaluate">
            <input type="hidden" name="taskMode" value="bid" />
            <div class="estimate-shop">
                <img class="estimate-shop-pic" alt="${orders.sellerName }" src="http://avatar.zbjimg.com/013/90/36/200x200_avatar_38.jpg!middle" onerror="this.src='/view/staticwap/image/widget/face-default.png'">
                <h3 class="estimate-shop-name">${orders.sellerName }</h3>
            </div>
            <div class="estimate-score">
                <input class="need-must" type="hidden" name="score" value="">
                <ul class="estimate-score-list js_score">
                    <li class="score-list-item active" data-score="2">
                        <i class="icon score-good"></i>好评
                    </li>
                    <li class="score-list-item" data-score="1">
                        <i class="icon score-middle"></i>中评
                    </li>
                    <li class="score-list-item" data-score="0">
                        <i class="icon score-bad"></i>差评
                    </li>
                </ul>
            </div>
            <div class="estimate-score-detail">
                <div class="estimate-score-detail-item">
                    <input class="need-must" type="hidden" name="attitude" value="">
                    <p class="score-attitude-list js_attitude">
                        服务态度 :
                        <span class="attitude-list-item icon-star" data-fex="1">
                            </span>
                        <span class="attitude-list-item icon-star" data-fex="2">
                            </span>
                        <span class="attitude-list-item icon-star" data-fex="3">
                            </span>
                        <span class="attitude-list-item icon-star" data-fex="4">
                            </span>
                        <span class="attitude-list-item icon-star" data-fex="5">
                            </span>
                    </p>
                </div>
                <div class="estimate-score-detail-item">
                    <input class="need-must" type="hidden" name="speed" value="">
                    <p class="score-speed-list js_speed">
                        完成速度 :
                        <span class="speed-list-item icon-star" data-fex="1">
                            </span>
                        <span class="speed-list-item icon-star" data-fex="2">
                            </span>
                        <span class="speed-list-item icon-star" data-fex="3">
                            </span>
                        <span class="speed-list-item icon-star" data-fex="4">
                            </span>
                        <span class="speed-list-item icon-star" data-fex="5">
                            </span>
                    </p>
                </div>
                <div class="estimate-score-detail-item">
                    <input class="need-must" type="hidden" name="quality" value="">
                    <p class="score-quality-list js_quality">
                        完成质量 :
                        <span class="quality-list-item icon-star" data-fex="1">
                            </span>
                        <span class="quality-list-item icon-star" data-fex="2">
                            </span>
                        <span class="quality-list-item icon-star" data-fex="3">
                            </span>
                        <span class="quality-list-item icon-star" data-fex="4">
                            </span>
                        <span class="quality-list-item icon-star" data-fex="5">
                            </span>
                    </p>
                </div>
            </div>
            <div class="estimate-impression">
                <input type="hidden" name="impressions" class="need-must" value="" />
                <p class="estimate-impression-tit">
                    请选择您对TA的第一个印象
                </p>
                <ul class="impression-list js_impression">
                    <li class="impression-list-item">服务周到</li>
                    <li class="impression-list-item">性价比高</li>
                    <li class="impression-list-item">质量很好</li>
                    <li class="impression-list-item">速度快</li>
                    <li class="impression-list-item">沟通流畅</li>
                    <li class="impression-list-item">敬业</li>
                    <li class="impression-list-item">细致耐心</li>
                </ul>
            </div>
            <div class="estimate-fuwu">
                <p class="estimate-fuwu-title">
                    请您具体评价一下TA
                </p>
                <textarea name="comment" class="need-must estimate-wufu-content" maxlength="140" value="" placeholder="您对本次交易满意吗？分享一下您的感受给大家吧!"></textarea>
            	<div class="estimate-fuwu-title">
                    <div class="upload-warp">
                    
                    	
                    </div>
                    <input type="hidden" name="imgList" id="imgList" value="">
                    <div class="upload-pick">
                    	<img class="upload-pick-img" src="/view/staticwap/image/page/common/webupload.png">
                    </div>
                </div>
            </div>
            <div class="estimate-btn">
                <button class="btn-press-down disabled btn-submit" id="btnFav">提交</button>
            </div>
            <!-- /表单错误提示-->
            <div id="animationTips" class="animationTips"><span></span></div>
            <!-- /该页面需要接受的参数taskId，并传递给submit提交页面-->
            <input type="hidden" name="taskId" value="${orders.orderid }" />
            <input type="hidden" name="workId" value="" />
            <input type="hidden" name="salerId" value="${orders.sellerId }" />
        </form>
    </div>
    <script>
	var config = {
			uploadImgErrors: {
	            'Q_EXCEED_NUM_LIMIT':  '只能选择1张图',
	            'Q_EXCEED_SIZE_LIMIT': '图片大小超过5mb',
	            'Q_TYPE_DENIED': '图片类型不符合，请选择gif,jpg,jpeg,bmp,png'
	        }
	
	}
	</script>
	<script type="text/javascript" src="/view/staticwap/js/jquery/1.11.1/jquery.js"></script>

	<script type="text/javascript" src="/view/staticwap/webuploader/0.1.6/webuploader.custom.js"></script>
    <script type="text/javascript" src="/view/staticwap/js/page/estimate/estimate.js"></script>
</body>


</html>
