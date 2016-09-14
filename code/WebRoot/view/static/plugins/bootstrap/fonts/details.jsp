<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
    <link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/confirm/reward/add/add.css" />
    <link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/confirm/reward/sure-tuoguan/sure-tuoguan.css" />
    <link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/confirm/reward/common-edit-reward/common-edit-reward.css" />
    <link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/confirm/refuse/payfor/payfor.css" />
    <link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/index.css" />
    <link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/need-detail/zhaobiao.css" />


<body class=mobile-page>
    <div class="top-bar ">
        <div class="go-back">
            <button class="btn_back"></button>
        </div>
        <h1>需求详情</h1>
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
    <div class="page-container bg-grey zhaobiao-page">
        <input type="hidden" name="currentPageName" value="needDetail">
        <input type="hidden" name="isLogin" value="1">
        <input type="hidden" name="role" value="1">
        <input type="hidden" name="taskId" value="" />
        <input type="hidden" name="taskid" value="" />
        <input type="hidden" name="worksid" value="0" />
        <input type="hidden" name="salerid" value="0" />
        <input type="hidden" name="amount" value="500.0" />
        <input type="hidden" name="totalprice">
        <input type="hidden" name="not-pay-price">
        <input type="hidden" name="tuoguan-reward-percent">
        <div class="need-detail-top border-bottom-o">
            <div class="inner">
                <h3 class="with-padding border-bottom-o">
            <div class="clearfix">
                <div class="inner pull-l">状态：${task.status }</div>
                <div class="inner pull-r">订单编号：${task.id }</div>
            </div>
        </h3>
            </div>
        </div>
        <div class="need-detail-content border-top bg-white margin-b-15">
            <div class="with-padding border-bottom">
                <h2> ${task.title }</h2>
                <div class="price fsize-20 fcolor-orange">
                    ${task.pay }
                    <span class="fsize-12">元</span>(预付款,多退少补)
                </div>
                <div class="summary">
                    <div class="content-slidedown-con">
                       	${task.detail }
                        <div class="content-slidedown-btn hide"><span>详情</span><em></em></div>
                    </div>
                </div>
                <c:if test="${task.categoryId==4||task.categoryId==5}">
	                <div class="manu-file address-warp">
	                       	收货地址:${deployUsers.shipaddress }
	                </div>
                    <c:forEach var="item" items="${services}" varStatus="status">
                    <c:if test="${isgowork==1 && item.isbond==1 && item.isauth==1}">
                        <div class="manu-file address-warp">
                                        
                            联系电话:${item.mobile }
                        </div>
                    </c:if>
                    </c:forEach>


                    
                </c:if>

            </div>
            <!--/<div class="display-box border-bottom with-padding fsize-12">
        <div class="item item-1"><span></span>用时 5 天</div>
        <div class="item item-2"><span></span>125 人参与</div>
        <div class="item item-3"><span></span>招标</div>
    </div> -->
            <div class="clearfix with-padding-lr buyer">
                <div class="pull-l help-button">
                    <button class="adviser-cooperate js-evaluate" data-herf="/waptask/goConsultant"><i class="iconfont icon-adviser-cooperate"></i>顾问协作</button>
                    <c:if test="${taskstatus==2&&evalCount==0}">
                    	<c:choose>
                    		<c:when test="${isself==1 }">
			                    <button class="tuoguan-reward js-evaluate" data-herf="/waptask/goEvaluate?taskId=${task.id }&salerId=${evaluid}&type=1"><i class="iconfont icon-tuoguan-reward"></i>评价</button>
						 	</c:when>
						 	<c:otherwise>
						 		<button class="tuoguan-reward js-evaluate" data-herf="/waptask/goEvaluate?taskId=${task.id }&salerId=${task.uid}&type=2"><i class="iconfont icon-tuoguan-reward"></i>评价</button>
						 	</c:otherwise>
						 </c:choose>
                    </c:if>
                    <c:if test="${isself==1&&(taskstatus==0||taskstatus==4)}">
                    	<button class="power js-refund" data-herf="/waptask/goCloseTask?taskId=${task.id }"><i class="iconfont icon-power"></i>关闭需求</button>
                    </c:if>
                    <c:if test="${isself==1&&taskstatus==1}">
<%-- 	                    <button class="power js-seeqrcode" data-herf="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb3d0024cd88f6734&redirect_uri=http://www.yangwenshou.com/wapIndex/wxcallBack&response_type=code&scope=snsapi_base&state=${task.id }#wechat_redirect"><i class="iconfont icon-address"></i>验证</button> --%>
	                    <button class="power js-seeqrcode" data-herf="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb3d0024cd88f6734&redirect_uri=http://www.yangwenshou.com/wapIndex/wxcallBack&response_type=code&scope=snsapi_base&state=${task.id }#wechat_redirect"><i class="iconfont icon-address"></i>验证</button>
                    </c:if>
                    <c:if test="${isself==1&&(taskstatus==1||taskstatus==5)}">
                    	<button class="power js-refund" data-herf="/waptask/goRefund?taskId=${task.id }"><i class="iconfont icon-payfor1"></i>申请退款</button>
                    </c:if>

                </div>
            </div>
            <!-- /顾问协作-->
            <script id="contact-adviser" type="tpl">
                <div class="confirm-con contact-adviser">
                    <a class="close" href="javascript: void(0);">X</a>
                    <div class="confirm-title border-bottom">
                        有问题需要交易顾问协助？
                    </div>
                    <div class="confirm-body bg-white
                        ">
                        <p class='f-grey'>如果您遇到以下问题，请联系我们：</p>
                        <p>没有服务商和我联系</p>
                        <p>没有服务商满足我的需求</p>
                        <p>服务商一直拖欠我的工期</p>
                        <p>服务商的工作我不满意</p>
                    </div>
                    <div class="confirm-bottom display-box">
                        <button class="sure only-one item">拨打0797-2508000热线</button>
                    </div>
                </div>
            </script>
            <!-- /查看二维码-->
	        <script id="qrcode" type="tpl">

			<div class="confirm-con qrcode-wrapper">
                    <div class="confirm-title border-bottom">
                       验证二维码开始工作
                    </div>
                    <div class="confirm-body bg-white
                        ">
                        <div class="output"></div>
                    </div>
                    <div class="confirm-bottom display-box">

                        <button class="cancle  item">关闭</button>
                    </div>
                </div>
        	</script>
            <!-- /关闭需求-->
            <script id="task-close" type="tpl">
                <div class="confirm-con task-close">
                    <div class="confirm-title border-bottom">
                        确定关闭需求吗？
                    </div>
                    <div class="confirm-body bg-white
                        ">
                        <p>关闭的需求将不能接受投标并且不能再次开启</p>
                    </div>
                    <div class="confirm-bottom display-box">
                        <button class="cancle  item">取消</button>
                        <button class="sure  item">关闭</button>
                    </div>
                </div>
            </script>
            <!-- /增加赏金-->
            <script id="addTuoguanContent" type="text/tpl">
                <div class="tuoguan-reward-input">
                    <label for="">目前赏金元，已托管<span class="j-hasHostedAmount">0.00</span>元</label>
                    <div class="input-price">
                        ¥
                        <input type="number" maxlength="7" name="tuoguan-reward-input" placeholder="请输入新的赏金金额">
                    </div>
                    <div class="target-amount-dom">您想增加赏金至 <span class="fcolor-orange-highlight targetAmount"></span>元</div>
                </div>
            </script>
            <script id="add-tuoguan" type="tpl">
                <div class="confirm-con add-tuoguan">
                    <div class="confirm-body bg-white
                        radius-top
                        ">
                        <p></p>
                    </div>
                    <div class="confirm-bottom display-box">
                        <button class="cancle  item">取消</button>
                        <button class="sure  item">确认</button>
                    </div>
                </div>
            </script>
            <!-- /已托管，托管-->
            <script id="nextTuoguanNoPercentContent" type="text/tpl">
                <div class="warning"><i class="iconfont icon-warning"></i>托管赏金让服务商更好的响应您的需求</div>
                <div class="fcolor-orange-highlight">总赏金：<span class="j-reward-totalPrice"></span>元<span class="fsize-12"><em class="fcolor-5d">（未托管</em><span class="j-reward-not-pay"></span><em class="fcolor-5d">元）</em></span>
                </div>
                <div class="tuoguan-reward-input">
                    <label for="">托管金额：</label>
                    <div class="input-price">
                        ¥
                        <input type="number" name="tuoguan-reward-input" placeholder="">
                    </div>
                </div>
            </script>
            <script id="next-tuoguan-no-percent" type="tpl">
                <div class="confirm-con next-tuoguan-no-percent">
                    <div class="confirm-title border-bottom">
                        托管赏金
                    </div>
                    <div class="confirm-body bg-white
                        ">
                        <p></p>
                    </div>
                    <div class="confirm-bottom display-box">
                        <button class="cancle  item">暂不托管</button>
                        <button class="sure  item">确认，去托管</button>
                    </div>
                </div>
            </script>
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
                    <p>2.恶意下单不选标将列入黑名单，永久封号</p>

                </div>
                <div class="confirm-bottom display-box">
                    <button class="cancle  item">确定</button>
                    <button class="sure  item">取消</button>
                </div>
            </div>
        </script>
            <!-- /未托管，托管-->
            <script id="sureTuoguanContent" type="text/tpl">
                <div class="warning"><i class="iconfont icon-warning"></i>托管赏金让服务商更好的响应您的需求</div>
                <div>总赏金：<span class="fcolor-orange-highlight"><span class="j-reward-totalPrice"></span>元</span>
                </div>
                <p class="fsize-12 fcolor-a1">您也可以分期托管，最低可以只托管<span class="j-reward-percent"></span></p>
                <div class="tuoguan-reward-input">
                    <label for="">托管金额：</label>
                    <div class="input-price">
                        ¥
                        <input type="number" name="tuoguan-reward-input" placeholder="请输入托管金额">
                    </div>
                </div>
            </script>
            <script id="sure-tuoguan" type="tpl">

            </script>
            <!-- /付款给服务商-->
            <!-- /拒绝付款-->
            <script id="refusePayforContent" type="text/tpl">
                <div class="warning"><i class="iconfont icon-warning"></i>如果服务商的工作您不满意，您可以拒绝付款，满意后再支付</div>
                <form action="javascript:;">
                    <div class="display-flex">
                        <button class="flex-item">
                            <span>工作需要改进</span>
                            <input type="radio" name="refuse-payfor" value="1">
                        </button>
                        <button class="flex-item">
                            <span>没有交付工作</span>
                            <input type="radio" name="refuse-payfor" value="2">
                        </button>
                    </div>
                    <div class="display-flex">
                        <button class="flex-item">
                            <span>无法联系到服务商</span>
                            <input type="radio" name="refuse-payfor" value="3">
                        </button>
                        <button class="flex-item j-other-reason">
                            <span>其他</span>
                            <input type="radio" name="refuse-payfor" value="4">
                        </button>
                    </div>
                    <div class="input-text">
                        <input type="text" name="reason" max-length="20" placeholder="理由不超过200个字">
                    </div>
                </form>
            </script>
            <script id="refuse-payfor" type="tpl">
                <div class="confirm-con refuse-payfor">
                    <div class="confirm-title border-bottom">
                        拒绝付款
                    </div>
                    <div class="confirm-body bg-white
                        ">
                        <p></p>
                    </div>
                    <div class="confirm-bottom display-box">
                        <button class="cancle  item">取消</button>
                        <button class="sure  item">拒绝付款</button>
                    </div>
                </div>
            </script>
            <!-- /重新定价-->
            <script id="refreshAPriceContent" type="text/tpl">
                <div class="tuoguan-reward-input">
                    <label for="">目前赏金<span class="j-reward-totalPrice"></span>元，您想要修改为</label>
                    <div class="input-price">
                        ¥
                        <input type="number" name="tuoguan-reward-input" placeholder="请输入新的赏金金额">
                    </div>
                </div>
            </script>
            <script id="refresh-a-price" type="tpl">
                <div class="confirm-con refresh-a-price">
                    <div class="confirm-body bg-white
                        radius-top
                        ">
                        <p></p>
                    </div>
                    <div class="confirm-bottom display-box">
                        <button class="cancle  item">取消</button>
                        <button class="sure  item">确认</button>
                    </div>
                </div>
            </script>
            <!-- /确认赏金-->
            <script id="makeAPriceContent" type="text/tpl">
                <div class="tuoguan-reward-input">
                    <label for="">您的需求暂未定价，请确认您的任务金额</label>
                    <div class="input-price">
                        ¥
                        <input type="number" name="tuoguan-reward-input" placeholder="请输入金额">
                    </div>
                </div>
            </script>
            <script id="make-a-price" type="tpl">
                <div class="confirm-con make-a-price">
                    <div class="confirm-body bg-white
                        radius-top
                        ">
                        <p></p>
                    </div>
                    <div class="confirm-bottom display-box">
                        <button class="cancle  item">取消</button>
                        <button class="sure  item">确认</button>
                    </div>
                </div>
            </script>
            <!-- /取消定价-->
            <!-- /取消订单-->
            <script id="order-cancle" type="tpl">
                <div class="confirm-con order-cancle">
                    <div class="confirm-title border-bottom">
                        取消订单
                    </div>
                    <div class="confirm-body bg-white
                        ">
                        <p>取消订单后，将终止双方的合作，并且不能再次开启。如果已完成部分工作，取消后双方可以评价对方</p>
                    </div>
                    <div class="confirm-bottom display-box">
                        <button class="cancle  item">取消</button>
                        <button class="sure  item">确认取消</button>
                    </div>
                </div>
            </script>
            <!-- /关闭合同-->
            <script id="agreement-close" type="tpl">
                <div class="confirm-con agreement-close">
                    <div class="confirm-title border-bottom">
                        关闭合同
                    </div>
                    <div class="confirm-body bg-white
                        ">
                        <p>交易合同可以更好的保障您的权益，您确定要关闭吗？关闭后将不能开启</p>
                    </div>
                    <div class="confirm-bottom display-box">
                        <button class="cancle  item">取消</button>
                        <button class="sure  item">确认关闭</button>
                    </div>
                </div>
            </script>
        </div>
        <!--/ 需求详情-->
        <div class="provider-list bg-white border-top">
            <div class="title with-padding border-bottom">
                参与的服务商
            </div>
            <div class="provider-list-con with-padding">
                <!--/ 登录未发布 -->
                <c:if test="${fn:length(services)==0 && isself==1}">
	                <!-- <div class="recommend with-padding margin-b-15">
	                    <img src="/view/staticwap/image/page/need-detail/waiting.png" alt="" />
	                </div> -->
                </c:if>

                <!-- 服务商列表 -->
                <div class="provider-list-con with-padding">
         <!--/ 已公开的案例 -->
				<c:forEach var="item" items="${services}" varStatus="status">
					<div class="item">
		                <div class="top with-padding" onclick="javascript:location.href='/shop/shopDetail/${item.uid}'">
		                    <div class="img pull-l">
		                    	 <c:choose>
								 	<c:when test="${not empty item.shopicon}">
								         <img src="${item.shopicon }" alt="shopicon">
								 	</c:when>
								 	<c:otherwise>
										<img class="user-face"
											src="http://wx.qlogo.cn/mmopen/XeaiaOGeIyMHZp3icDfJBsLWunRAFMJVUud6wJwKeWlFGs6Bp25icIRmcgbdZQGdHAcF1dGiaTN2PQmfldQCoVDvKwZ7D1kxkq3a/0">
								 	</c:otherwise>
								</c:choose>
		                    </div>
		                    <div class="text">
		                        <p class="name">${item.shopname }
		                        	 <c:if test="${item.bid==1}">
		                        		<span class="provider-grade provider-grade-2">已中标</span>
		                        	</c:if>
		                        </p>
		                        <p>
	                        	<c:choose>
								 	<c:when test="${item.isauth!=1 }">
				                        <span class="provider-grade provider-grade-1">未认证</span>
								 	</c:when>
								 	<c:otherwise>
				                        <span class="provider-grade provider-grade-2">已认证</span>
								 	</c:otherwise>
								</c:choose>
								<c:choose>
								 	<c:when test="${item.isbond!=1 }">
				                        <span class="provider-grade provider-grade-4">未交保证金</span>
								 	</c:when>
								 	<c:otherwise>
				                        <span class="provider-grade provider-grade-3">已交保证金</span>
								 	</c:otherwise>
								</c:choose>
								 <span class="provider-grade provider-grade-txt">累计成交${item.con }单</span>
		                        </p>
		                        <c:if test="${isgowork==1 && item.isbond==1 && item.isauth==1}">
			                    <p class="edit pull-r">
			                            <a href="#" data-phone="${item.mobile }" class="contact make-a-call btn-press-down"></a>
<%-- 			                            <c:if test="${item.bid==1}"> --%>
<!-- 			                            	<span class="provider-grade provider-grade-2">已中标</span> -->
<%-- 			                            </c:if> --%>
			                    </p>
			                    </c:if>
		                    </div>
		                </div>

						<c:if test="${isgowork==1}">
	                       	<c:choose>
							 	<c:when test="${isself==1 }">
					                <div class="bottom" onclick="javascript:location.href='/waptask/goWorkBench?taskId=${task.id }&sellId=${item.uid }'">
							 	</c:when>
							 	<c:otherwise>
			                         <div class="bottom" onclick="javascript:location.href='/waptask/goWorkBench?taskId=${task.id }&sellId=${task.uid }'">
							 	</c:otherwise>
							</c:choose>
		                    <div class="detail-button">
		                        <p class="fsize-14 with-padding">报价：<span class="fcolor-orange">&yen;${item.busmoney}</span></p>
		                        <p class="fsize-14 arrow-right bg-blue" >选他</p>
		                    </div>
	                    </c:if>
		                </div>
		                                <!--/ 这期不显示
		                                    -->
		            </div>
				</c:forEach>
				<c:if test="${fn:length(services)==0 && isself==1}">
	                <div class="recommend with-padding margin-b-15">
	                    <!-- <img src="/view/staticwap/image/page/need-detail/remond.png" alt=""> -->
	                </div>
                </c:if>
    		</div>


            </div>
        </div>
        <!--/ 投标的服务商列表-->
        <div class="special-activities">
            <div class="heart">
                <span class="left"></span>
                <span class="center"><i class="iconfont icon-heart"></i>猜您喜欢</span>
                <span class="right"></span>
            </div>
        </div>




        <script>
        window.pageParam = {
            from: "2"
        }
        </script>
        <c:if test="${competitive==1}">
	        <div class="fixed-bottom order-entrust">

	            <a class="flex-right js-competitive" href="/waptask/goCompetitive/${task.id }" data-linkid="10006666">竞标</a>
	            <!-- <a class="flex-right" href="/view/wap/pay/index.jsp" data-linkid="10006666">去支付</a> -->
	        </div>
        </c:if>
        <script id="download-app" type="tpl">
            <div class="confirm-con download-app">
                <a class="close" href="javascript: void(0);">X</a>
                <div class="confirm-body bg-whiteradius-top">
                    <p class='align-c'>功能正在开发</p>
                </div>

            </div>
        </script>
        <script id="contact-adviser" type="tpl">
            <div class="confirm-con contact-adviser">
                <a class="close" href="javascript: void(0);">X</a>
                <div class="confirm-title border-bottom">
                    有问题需要交易顾问协助？
                </div>
                <div class="confirm-body bg-white
                        ">
                    <p class='f-grey'>如果您遇到以下问题，请联系我们：</p>
                    <p>没有服务商和我联系</p>
                    <p>没有服务商满足我的需求</p>
                    <p>服务商一直拖欠我的工期</p>
                    <p>服务商的工作我不满意</p>
                </div>
                <div class="confirm-bottom display-box">
                    <button class="sure only-one item">拨打4001886666热线</button>
                </div>
            </div>
        </script>
        <script id="task-close" type="tpl">
            <div class="confirm-con task-close">
                <div class="confirm-title border-bottom">
                    确定关闭需求吗？
                </div>
                <div class="confirm-body bg-white
                        ">
                    <p>关闭的需求将不能接受投标并且不能再次开启</p>
                </div>
                <div class="confirm-bottom display-box">
                    <button class="cancle  item">取消</button>
                    <button class="sure  item">关闭</button>
                </div>
            </div>
        </script>
        <!-- /已托管，托管-->
        <script id="nextTuoguanNoPercentContent" type="text/tpl">
            <div class="warning"><i class="iconfont icon-warning"></i>托管赏金让服务商更好的响应您的需求</div>
            <div class="fcolor-orange-highlight">总赏金：<span class="j-reward-totalPrice"></span>元<span class="fsize-12"><em class="fcolor-5d">（未托管</em><span class="j-reward-not-pay"></span><em class="fcolor-5d">元）</em></span>
            </div>
            <div class="tuoguan-reward-input">
                <label for="">托管金额：</label>
                <div class="input-price">
                    ¥
                    <input type="number" name="tuoguan-reward-input" placeholder="">
                </div>
            </div>
        </script>
        <script id="next-tuoguan-no-percent" type="tpl">
            <div class="confirm-con next-tuoguan-no-percent">
                <div class="confirm-title border-bottom">
                    托管赏金
                </div>
                <div class="confirm-body bg-white
                        ">
                    <p></p>
                </div>
                <div class="confirm-bottom display-box">
                    <button class="cancle  item">暂不托管</button>
                    <button class="sure  item">确认，去托管</button>
                </div>
            </div>
        </script>
        <!-- /未托管，托管-->
        <script id="sureTuoguanContent" type="text/tpl">
            <div class="warning"><i class="iconfont icon-warning"></i>托管赏金让服务商更好的响应您的需求</div>
            <div>总赏金：<span class="fcolor-orange-highlight"><span class="j-reward-totalPrice"></span>元</span>
            </div>
            <p class="fsize-12 fcolor-a1">您也可以分期托管，最低可以只托管<span class="j-reward-percent"></span></p>
            <div class="tuoguan-reward-input">
                <label for="">托管金额：</label>
                <div class="input-price">
                    ¥
                    <input type="number" name="tuoguan-reward-input" placeholder="请输入托管金额">
                </div>
            </div>
        </script>
        <script id="sure-tuoguan" type="tpl">
            <div class="confirm-con sure-tuoguan">
                <div class="confirm-title border-bottom">
                    托管赏金
                </div>
                <div class="confirm-body bg-white
                        ">
                    <p></p>
                </div>
                <div class="confirm-bottom display-box">
                    <button class="cancle  item">暂不托管</button>
                    <button class="sure  item">确认，去托管</button>
                </div>
            </div>
        </script>

        <script id="container" type="text/tpl">
            <div id="divs2" class="kslider">
                <div class="ks_dbox ks_ts">
                </div>
            </div>
        </script>
    </div>
    <%@ include file="/view/wap/layout/userfooter.jsp" %>
	<script type="text/javascript" src="/view/staticwap/js/jquery/1.11.1/jquery.min.js"></script>
	<script type="text/javascript" src="/view/staticwap/js/jquery/jquery.qrcode.js"></script>
    <script type="text/javascript" src="/view/staticwap/js/widget/confirm/refuse/payfor/payfor.js"></script>
    <script type="text/javascript" src="/view/staticwap/js/page/need-detail/zhaobiao.js"></script>
</body>


</html>
