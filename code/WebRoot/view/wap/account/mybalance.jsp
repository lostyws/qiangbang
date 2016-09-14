
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<%@ include file="/view/wap/layout/newhead.jsp" %>
<style type="text/css">
.balance-list .item-title{line-height:24px}.balance-list .item-input{margin:0;line-height:24px;padding:10px 0;text-align:right}.balance-list .item-title>div:first-child{color:#666}.balance-list .item-inner{padding-right:15px;color:#999}.balance-head{padding:15px;font-size:.32rem;background:#58d287;color:#fff}.balance-head a{float:right;font-size:.28rem;color:#fff}.balance-fee{margin-top:.2rem;font-size:.72rem}.icon-link{margin-right:5px;display:inline-block;width:.36rem;height:.36rem;text-align:center;border:1px solid;border-radius:50%}.blance-pic img{width:100%}.blance-content{padding:0 .3rem}
.list-block .item-title.label{width:60%}
.js-withdraw {background-color: #f60;}
.button.color-purple {background-color: #9c27b0;}
</style>

<body class=mobile-page>
    <div class="views">
    <div class="view view-main" data-page="mybalance">
        <div class="navbar navbar-white">
            <div class="navbar-inner navbar-on-center">
                <div class="left sliding" style="transform: translate3d(0px, 0px, 0px);">
                    <a href="javascript:history.go(-1);" class="link icon-only">
                        <i class="icon icon-back"></i>
                    </a>
                </div>
                <div class="center sliding" style="left: -11.5px; transform: translate3d(0px, 0px, 0px);">我的余额</div>
                <div class="right">
                    <span class="js-showMenu"><i class="icon icon-bars"></i></span>
                <em class="icon-circle"></em></div>
            </div>
        </div>
        <div class="pages navbar-through toolbar-through">
            <div data-page="mybalance" class="page navbar-fixed page-on-center">
                <div class="page-content">
                    <div class="balance-head">
                        <div><span>我的余额</span><a href="/wapact/goAddMoney" class="external button button-raised button-fill color-purple">充值</a><a href="javascript:void(0);" class="js-withdraw button color-red">提现</a></div>
                        <div class="balance-fee">¥ <span>${sessionScope.users.price }</span></div>
                    </div>
                    <div class="content-block-title">近期收支明细</div>
						<div class="list-block balance-list">
						    <ul>
						        <c:forEach var="item" items="${trades}" varStatus="status">
							        <li>
							            <div class="item-content">
							                <div class="item-inner">
							                    <div class="item-title label">
							                       	<c:choose>
													 	<c:when test="${item.orderid>0}">
									                        <div>${item.type==1?'收入':'支出' }--(${item.orderid }-${item.remark })</div>
													 	</c:when>
													 	<c:otherwise>
													 		<div>${item.type==1?'收入':'支出' }--(${item.remark })</div>
													 	</c:otherwise>
													</c:choose>
							                        <div>余额：&yen; ${item.amount }</div>
							                    </div>
							                    <div class="item-input">
							                        <div>${item.ctime }</div>
							                       	<c:choose>
													 	<c:when test="${item.type==1}">
									                        <div class="prompt-green">&yen; ${item.money }
									                        <c:if test="${not empty item.msg}">
									                        	(${item.msg })
									                        </c:if>
									                        </div>
													 	</c:when>
													 	<c:otherwise>
													 		<div class="prompt-red">&yen; ${item.money }
													 		<c:if test="${not empty item.msg}">
									                        	(${item.msg })
									                        </c:if>
													 		</div>
													 	</c:otherwise>
													</c:choose>
							                    </div>
							                </div>
							            </div>
							        </li>
						        </c:forEach>
						    </ul>
						</div>
                </div>
            </div>
        </div>
    </div>
</div>


</body>
<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
<script type="text/javascript">
        //初始化Framework7
        var myApp = new Framework7(),
        	$$ = Framework7.$;

       	//添加菜单功能
		qbApp.showMenu();

		//保存按钮的事件
        $$('.js-withdraw').on('click', function () {

        	var balance = $$('.balance-fee span').html()*1;
        	myApp.params.modalButtonOk='确定';
        	myApp.params.modalButtonCancel='取消';
        	myApp.prompt('请输入你要提现金额', function (value) {
		        if(value<balance||value==balance){
		        	withdraw(value);
		        }else if(value>balance){
		        	myApp.alert('提现金额大于账户余额');
		        	return false;
		        }else if(value<1){
		        	myApp.alert('提现金额必须大于一元');
		        	return false;
		        }
		        else{
		        	myApp.alert('请输入正确的提现金额');
		        	return false;
		        }
		    });
		});


       function withdraw(value) {
       	//show loading...
	    myApp.showIndicator();

       	$$.ajax({
       		url: "/waptask/withdraw",
       		type: "post",
       		dataType: "json",
       		data: {
       			value:value
       		},
       		success: function(d){
       			//hide loading...
	        	myApp.hideIndicator();

       			if(d.status == 0){


       				myApp.alert('提现款项将在2个工作日内转入您微信账户，请留意“微信支付”零钱入账通知！', function () {
       					window.location.reload();
       			    });
       			} else {
       				myApp.alert(d.msg,'');
       			}
       		},error: function(){
                   myApp.hideIndicator();

                   myApp.alert('加载失败，请刷新重试！');
               }
       	});
       }
       </script>


</html>
