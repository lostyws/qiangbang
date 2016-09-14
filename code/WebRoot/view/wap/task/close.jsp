<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>

<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/need-detail/need-close.css" />

<body class=mobile-page>
	<div class="top-bar ">
	    <div class="go-back"><button class="btn_back"></button></div>
	    <h1>关闭需求</h1>
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
</div>			            <!-- wap -->

<form action="javascript:;">
    <input type="hidden" name="taskMode" value="bid" />
    <div class="reason-list">
        <div class="fsize-14 with-padding title">请选择您可能遇到的问题</div>
        <ul class="unstyled help-list with-padding-lr">
            <li class="item">
                <span data-relationid="">有服务商私下联系我价格更低</span>
                <input class="hide" type="radio" name="reason" value="有服务商私下联系我价格更低">
                <span class="status"><i class="iconfont"></i></span>
            </li>
            <li class="item">
                <span data-relationid="">我改主意了</span>
                <input class="hide" type="radio" name="reason" value="我改主意了">
                <span class="status"><i class="iconfont"></i></span>
            </li>

            <li class="item">
                <span data-relationid="">服务商做不了我的需求</span>
                <input class="hide" type="radio" name="reason" value="服务商做不了我的需求">
                <span class="status"><i class="iconfont"></i></span>
            </li>
            <li class="item">
                <span data-relationid="">需求价格未达成一致</span>
                <input class="hide" type="radio" name="reason" value="需求价格未达成一致">
                <span class="status"><i class="iconfont"></i></span>
            </li>
            <li class="item">
                <span data-relationid="">我找到了更合适的服务商</span>
                <input class="hide" type="radio" name="reason" value="我找到了更合适的服务商">
                <span class="status"><i class="iconfont"></i></span>
            </li>
        </ul>
        <div class="textarea with-padding-lr">
            <div class="item">
                <span>其他问题</span>
                <input class="hide" type="radio" name="reason" value="">
                <span class="status"><i class="iconfont"></i></span>
            </div>

            <div class="block">
                <input class="others-word" disabled="disabled" name="other" type="text" maxlength="20" placeholder="不超过20字">
            </div>
        </div>
        <p class="tip">退款金额会通过微信直接转入你的微信余额</p>
    </div>
    <div class="display-box bottom-fix-button">
        <button type="button" class="item sure">确定</button>

    </div>

</form>

<script id="refund-tpl" type="tpl">
            <div class="confirm-con refund-tpl">
                <a class="close" href="javascript: void(0);">X</a>
                <div class="confirm-title border-bottom">
                    重要提醒
                </div>
                <div class="confirm-body bg-white
                        ">
                    <p class='f-grey'></p>
                    <p>1.服务商不管以任何形式要求线下交易，都存在诈骗风险，请提高警惕</p>
                    <p>2.多次恶意下单不选标将列入黑名单，永久封号</p>
                   
                </div>
                <div class="confirm-bottom display-box">
                    <button class="cancle  item">确定</button>
                    <button class="sure  item">取消</button>
                </div>
            </div>
        </script>

    <script type="text/javascript" src="/view/staticwap/js/page/need-detail/need-close.js"></script>
</body>


</html>
