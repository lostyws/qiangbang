
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
 <link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/confirm/reward/add/add.css" />
 <link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/confirm/reward/sure-tuoguan/sure-tuoguan.css" />
 <link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/confirm/reward/common-edit-reward/common-edit-reward.css" />
 <link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/confirm/refuse/payfor/payfor.css" />
 <link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/need-detail/platform.css" />

<body class=mobile-page>
    <div class="top-bar ">
        <div class="go-back">
            <button class="btn_back"></button>
        </div>
        <h1>工作台</h1>
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
    <div class="page-container" data-hostState="false">
        <form action="#" class="hiddenform">
            <input type="hidden" name="token" />
            <input type="hidden" name="dk" />
            <input type="hidden" name="providerid" />
            <input type="hidden" name="taskid" value="${pubtask.assignid }" />
            <input type="hidden" name="worksid" value="" />
            <input type="hidden" name="salerid" value="${users.id}" />
            <input type="hidden" name="amount" value="500.0" />
            <input type="hidden" name="isBid" value="true" />
            <input type="hidden" name="totalprice">
            <input type="hidden" name="not-pay-price">
            <input type="hidden" name="tuoguan-reward-percent">
        </form>
        <div class="process platform-detail">
            <div class="provider-msg with-padding" data-shopid="0">
                <div class="img">
                <c:choose>
				 	<c:when test="${not empty users.personpath}">
				         <img src="${users.personpath }" alt="shopicon">
				 	</c:when>
				 	<c:otherwise>
						<img class="user-face"
							src="http://wx.qlogo.cn/mmopen/XeaiaOGeIyMHZp3icDfJBsLWunRAFMJVUud6wJwKeWlFGs6Bp25icIRmcgbdZQGdHAcF1dGiaTN2PQmfldQCoVDvKwZ7D1kxkq3a/0">
				 	</c:otherwise>
				</c:choose>
                </div>
                <div class="text">
                    <p class="name">${nickname }</p>
                    <p><span class="provider-grade provider-grade-1">抢帮</span></p>
                    <c:if test="${callPhone==1}">
	                    <p class="edit">
	                        <a href="#" data-phone="${users.mobile }" class="contact make-a-call btn-press-down"></a>
	                    </p>
                    </c:if>
                </div>
            </div>
            <ul>
                <li data-dstate="bid_node" class="active ">
                    <div class="underline item">
                        <div class="title">参与需求</div>
                        <div class="body">
                            <div class="time"><fmt:formatDate value="${pubtask.ctime}" pattern="yyyy-MM-dd HH:mm:ss"/></div>
                            <div class="desc">您报名参与了该用户的需求</div>
                            <p>报价：<span class="fcolor-orange">&yen;${pubtask.busmoney }</span></p>
                            <div class="desc">描述：${pubtask.describe }</div>
                        </div>
                    </div>
                    <div class="none"></div>
                </li>
                <!--
                <li data-dstate="connection_node" class="active ">
                    <div class="underline item">
                        <div class="title">服务商联系您</div>
                        <div class="body">
                            <div class="time">2016-05-20 11:27:01</div>
                            <div class="desc">服务商博海网络工作室已与您联系</div>
                        </div>
                    </div>
                    <div class="none"></div>
                </li>
                 -->
                <c:if test="${not empty pubtask.offlinetime}">
	                <li data-dstate="agreement_node" class="active">
	                    <div class="underline item">
	                        <div class="title">线下支付</div>
	                        <c:if test="${not empty pubtask.cofflinetime}">
	                          	<div class="body">
		                            <div class="time">${pubtask.cofflinetime}</div>
		                             <div class="desc"></div>
		                        </div>
		                    </c:if>
	                        <div class="body">
	                            <!-- /雇佣日志-->
	                            <!-- /交易合同-->
	                            <div class="l-item">
	                                <div></div>
	                                <div class="time">时间:${pubtask.offlinetime}</div>
	                                <div class="time">金额:${pubtask.offlinepay }</div>
	                            </div>
								<c:if test="${pubtask.status==9}">
									<div class="buttons">
	                                    <button class="confirmoffpay b-orange">
	                                         	确认，收到线下款项
	                                    </button>
                                	</div>
								</c:if>
	                            <div class="desc">交易合同可以保障双方的交易安全，您可以和服务商先沟通，托管赏金后签署</div>
	                        </div>
	                    </div>
	                    <div class="none"></div>
	                </li>
				</c:if>


                <c:if test="${not empty pubtask.signtime}">
	                <li data-dstate="agreement_node" class="active">
	                    <div class="underline item">
	                        <div class="title">签单</div>
	                         <!-- <div class="body">
	                            <div class="time">2016-05-20 11:27:01</div>
	                            <div class="desc">签单金额：<span class="fcolor-orange">&yen;122.00</span></div>
	                        </div> -->
	                        <div class="body">
	                            <!-- /雇佣日志-->
	                            <!-- /交易合同-->
	                            <div class="l-item">
	                                <div></div>
	                                <div class="time">${pubtask.signtime}</div>
	                            </div>

	                            <div class="desc">交易合同可以保障双方的交易安全，您可以和服务商先沟通，托管赏金后签署</div>
	                        </div>
	                    </div>
	                    <div class="none"></div>
	                </li>
				</c:if>

				<c:if test="${not empty pubtask.starttime}">
	                <li data-dstate="agreement_node" class="active">
	                    <div class="underline item">
	                        <div class="title">开始工作时间</div>
	                         <!-- <div class="body">
	                            <div class="time">2016-05-20 11:27:01</div>
	                            <div class="desc">签单金额：<span class="fcolor-orange">&yen;122.00</span></div>
	                        </div> -->
	                        <div class="body">
	                            <!-- /雇佣日志-->
	                            <!-- /交易合同-->
	                            <div class="l-item">
	                                <div></div>
	                                <div class="time">${pubtask.starttime}</div>
	                            </div>

	                            <div class="desc">交易合同可以保障双方的交易安全，您可以和服务商先沟通，托管赏金后签署</div>
	                        </div>
	                    </div>
	                    <div class="none"></div>
	                </li>
				</c:if>

				<c:if test="${not empty pubtask.signtime}">
	                <li data-dstate="agreement_node" class="active">
	                    <div class="underline item">
	                        <div class="title">增加交易金额</div>
	                         <!-- <div class="body">
	                            <div class="time">2016-05-20 11:27:01</div>
	                            <div class="desc">签单金额：<span class="fcolor-orange">&yen;122.00</span></div>
	                        </div> -->
	                        <div class="body">
	                        	<c:choose>
								<c:when test="${not empty pubtask.applypaytime}">
		                            <!-- /雇佣日志-->
		                            <!-- /交易合同-->
		                            <div class="l-item">
		                                <div></div>
		                                <div class="time">时间:${pubtask.applypaytime}</div>
		                                <c:if test="${not empty pubtask.paytime}">
		                                	<div class="time">时间:${pubtask.paytime}</div>
		                                </c:if>
		                            </div>
		                            <div class="desc">原因:${pubtask.againreason }</div>
	                           </c:when>
							   <c:otherwise>
									<div class="buttons">
				                       	<button class="postageAgain" onclick="javascript:window.location.href='/waptask/goPosAgainPay/${pubtask.assignid }'">
				                             	增加交易金额
				                        </button>
					                </div>
								</c:otherwise>
								</c:choose>
	                        </div>
	                    </div>
	                    <div class="none"></div>
	                </li>
                 </c:if>

				<c:if test="${pubtask.status==1||pubtask.status==2||pubtask.status==5}">
	            	<li data-dstate="connection_node" class="active ">
	                    <div class="underline item">
	                        <div class="title">交易完成</div>
	                        <div class="body">
	                            <div class="time">${pubtask.tradtime }</div>
	                            <div class="desc"></div>
	                        </div>
	                        <div class="body">
								<c:if test="${pubtask.status==5}">
		                            <div class="l-item">
		                                <div>您已通知申请用户确认验收</div>
		                                <div class="time"></div>
		                            </div>
								</c:if>
	                            <div class="desc">交易合同可以保障双方的交易安全，您可以和服务商先沟通，托管赏金后签署</div>
	                            <div class="buttons">
                                    <c:if test="${pubtask.status==1}">
	                                	<button class="applyfinish">
	                                    	申请交易完成
	                                	</button>
	                                </c:if>
	                                <c:if test="${empty evaluate && pubtask.status==2}">
		                                <button class="b-orange" onclick="javascript:window.location.href='/waptask/goEvaluate?taskId=${pubtask.assignid }&salerId=${users.id}&type=2'">
		                                    	评价
		                                </button>
	                                </c:if>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="none"></div>
	                </li>
                </c:if>

                <c:if test="${not empty pubtask.refundtime}">
	                <li data-dstate="agreement_node" class="active">
	                    <div class="underline item">
	                        <div class="title">退款处理</div>
	                         <!-- <div class="body">
	                            <div class="time">2016-05-20 11:27:01</div>
	                            <div class="desc">签单金额：<span class="fcolor-orange">&yen;122.00</span></div>
	                        </div> -->
	                        <div class="body">
	                            <!-- /雇佣日志-->
	                            <!-- /交易合同-->
	                            <div class="l-item">
	                                <div></div>
	                                <div class="time">时间:${pubtask.refundtime}</div>
	                                <div class="time">申请原因:${pubtask.reason}</div>
	                                <c:if test="${not empty pubtask.crefundtime}">
	                                	<div class="time">确认时间:${pubtask.crefundtime}</div>
	                                </c:if>
	                            </div>

	                            <div class="desc">交易合同可以保障双方的交易安全，您可以和服务商先沟通，托管赏金后签署</div>
	                        	<div class="buttons">
	                                <c:if test="${not empty pubtask.refundtime && empty pubtask.crefundtime}">
	                                	<button class="confirmrefund">
		                                    	确认退款
		                                </button>
		                            </c:if>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="none"></div>
	                </li>
				</c:if>

                <c:if test="${not empty evaluate}">
	                <li data-dstate="connection_node" class="current">
	                    <div class="underline item">
	                        <div class="title">评价</div>
	                        <div class="body">
	                            <div class="time">${evaluate.ctime }</div>
<%-- 	                            <p>配合态度:${evaluate.service }&nbsp;&nbsp;收获速度:${evaluate.speed }&nbsp;&nbsp;用户素质:${evaluate.quality }</p> --%>
	                            <p>服务态度:${evaluate.service }&nbsp;&nbsp;完成速度:${evaluate.speed }&nbsp;&nbsp;完成质量:${evaluate.quality }</p>
	                            <div class="desc">评价内容：${evaluate.content }
	                             <br>
	                            <c:forEach var="img" items="${imgs}" varStatus="status">
			                    	<img alt="" src="${img}">
			                    </c:forEach>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="none"></div>
	                </li>
                </c:if>
            </ul>
        </div>
    </div>
    <div class="need-detail-content">
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
                    <button class="sure only-one item">拨打4001886666热线</button>
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
        <script id="confirm-refund" type="tpl">
            <div class="confirm-con confirm-refund">
                <div class="confirm-title border-bottom">
                    用户申请退款
                </div>
                <div class="confirm-body bg-white
                        ">
                    <p>同意退款给用户</p>
                </div>
                <div class="confirm-bottom display-box">
                    <button class="cancle  item">取消</button>
                    <button class="sure  item">同意</button>
                </div>
            </div>
        </script>
        <script id="confirm-offpay" type="tpl">
            <div class="confirm-con confirm-offpay">
                <div class="confirm-title border-bottom">
                    确认款项
                </div>
                <div class="confirm-body bg-white
                        ">
                    <p>确认已收到用户的线下支付款</p>
                </div>
                <div class="confirm-bottom display-box">
                    <button class="cancle  item">取消</button>
                    <button class="sure  item">确认</button>
                </div>
            </div>
        </script>
        <!-- /增加赏金-->
        <script id="addTuoguanContent" type="text/tpl">
            <div class="tuoguan-reward-input">
                <label for="">目前赏金500.0元，已托管<span class="j-hasHostedAmount">0.00</span>元</label>
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
            <div class="fcolor-orange-highlight">总赏金：<span class="j-reward-totalPrice">500.0</span>元<span class="fsize-12"><em class="fcolor-5d">（未托管</em><span class="j-reward-not-pay"></span><em class="fcolor-5d">元）</em></span>
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
            <div>总赏金：<span class="fcolor-orange-highlight"><span class="j-reward-totalPrice">500.0</span>元</span>
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
                <label for="">目前赏金<span class="j-reward-totalPrice">500.0</span>元，您想要修改为</label>
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
    <script id="change-provider" type="tpl">
        <div class="confirm-con change-provider">
            <div class="confirm-title border-bottom">
                确定要换一个服务商吗？
            </div>
            <div class="confirm-body bg-white
                        ">
                <p>选择换掉<span class='fcolor-orange'>“博海网络工作室”</span>后，您这次的需求，对方将不再参与，我们将重新为您推荐其他优质服务商。</p>
            </div>
            <div class="confirm-bottom display-box">
                <button class="cancle  item">取消</button>
                <button class="sure  item">给我换一个</button>
            </div>
        </div>
    </script>
    <script id="select-provider" type="tpl">
        <div class="confirm-con select-provider">
            <div class="confirm-title border-bottom">
                确定要选择TA吗？
            </div>
            <div class="confirm-body bg-white
                        ">
                <p>选择<span class='fcolor-orange'>“博海网络工作室”</span>代表：</p>
                <p>您同意将赏金托管至平台，验收工作后才会付款给服务商</p>
                <p>服务商将立刻开始为您工作</p>
                <div class="confirm-input">
                    托管：
                    <input type="text" readonly="readonly" name="confirm-input" value="500.00" />
                </div>
            </div>
            <div class="confirm-bottom display-box">
                <button class="cancle  item">取消</button>
                <button class="sure  item">确定</button>
            </div>
        </div>
    </script>
    <script id="apply-finish" type="tpl">
        <div class="confirm-con apply-finish">
            <div class="confirm-title border-bottom">
                确定要向用户发起申请完成吗？
            </div>
            <div class="confirm-body bg-white
                        ">

                <p>平台将发送系统信息，通知用户验收需求</p>

            </div>
            <div class="confirm-bottom display-box">
                <button class="cancle  item">取消</button>
                <button class="sure  item">确定</button>
            </div>
        </div>
    </script>

    <script id="select-tuoguan" type="tpl">
        <div class="confirm-con select-tuoguan">
            <div class="confirm-title border-bottom">
                请先托管
            </div>
            <div class="confirm-body bg-white
                        ">
                <p>选择服务商需要您先托管赏金至平台，托管后您可以选择服务商中标为您工作，验收工作后才会付款给服务商</p>
                <div class="confirm-input">
                    托管：
                    <input type="text" readonly="readonly" name="confirm-input" value="500.00" />
                </div>
            </div>
            <div class="confirm-bottom display-box">
                <button class="cancle  item">取消</button>
                <button class="sure  item">确定</button>
            </div>
        </div>
    </script>
    <script id="download-app" type="tpl">
        <div class="confirm-con download-app">
            <a class="close" href="javascript: void(0);">X</a>
            <div class="confirm-body bg-white
                        radius-top
                        ">
                <p class='align-c'>功能正在开发</p>
            </div>
            <div class="confirm-bottom display-box">

            </div>
        </div>
    </script>

    <script type="text/javascript" src="/view/staticwap/js/widget/confirm/refuse/payfor/payfor.js"></script>
    <script type="text/javascript" src="/view/staticwap/js/page/need-detail/platform-hire-buy.js"></script>
    <script type="text/javascript" src="/view/staticwap/js/page/need-detail/platform.js"></script>
</body>


</html>
