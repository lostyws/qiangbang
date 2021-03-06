
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/newhead.jsp" %>

        <style type="text/css">
            .wechat-pic {
                margin: 0 auto 35px;
                width: 55px;
                height: 55px;
                border-radius: 50%;
                overflow: hidden;
            }
            img {
                width: 100%;
                height: 100%;
            }
            
            .list-block ul {
                margin: 10px 0;
            }
            
            .item-inner {
                font-size: 14px;
            }
            .item-inner .approve {
                line-height: 50px;
            }
            .activity {
                font-size: 12px;
            }
            .exit {
                width: 60%;
                margin: 0 auto 20px;
            }
            .exit a {
                color: #2cca6f;
                line-height: 32px;
                height: 32px;
                border: 1px solid #2cca6f;
            }
            .activity-info {
                position: absolute;
                left: 0;
                bottom: 8px;
                padding-left: 15px;
            }
            .audit .item-content, .audit0 .item-content{
                position: relative;
                overflow: hidden;
            }
            .prompt {
                color: red;
            }
        </style>
    </head>		
    <body class="weixin-body">
    <div class="views">
      <div class="view view-main">
       <div class="navbar">
				<div class="navbar-inner">
                    <div class="left">
                        <a class="link icon-only" href="javascript:window.location.href='/wapact/index'">
                            <i class="icon icon-back"></i>
                        </a>
                    </div>
					<div class="center sliding">商户设置</div>
					<div class="right">
						<span class="js-showMenu"><i class="icon icon-bars"></i></span>
					</div>
				</div>
			</div>
			
        <div class="pages">
          <div data-page="home" class="page navbar-fixed">
          	<div class="page-content">
				<div class="list-block">
		            <div class="content-block-title">账号信息</div>
		            	<ul>
					        <li>
					                <div class="item-content">
					                    <div class="item-inner">
					                        <div class="item-title">用户名</div>
					                        <div class="item-after">${sessionScope.nickname }</div>
					                    </div>
					                </div>
					           
					        </li>
							<li>
					            <a href="/wapact/goSetPwd" class="item-link external">
					                <div class="item-content">
					                    <div class="item-inner">
					                        <div class="item-title">登录密码</div>
					                        <div class="item-after">修改</div>
					                    </div>
					                </div>
					            </a>
					        </li>
					        <li>
					            <div class="item-content">
					                <div class="item-inner">
					                    <div class="item-title">手机号</div>
					                    <div class="item-after">${sessionScope.users.mobile }</div>
					                </div>
					            </div>
					        </li>
							<li>
					            
					                <div class="item-content">
					                    <div class="item-inner">
					                        <div class="item-title">姓名</div>
					                        <div class="item-after">${business.bossname }</div>
					                    </div>
					                </div>
					            
					        </li>
							<li>
					                <div class="item-content">
					                    <div class="item-inner">
					                        <div class="item-title">身份证号码</div>
					                        <div class="item-after">${sessionScope.users.idcard }</div>
					                    </div>
					                </div>
					           
					        </li>
							<li>
					            <div class="item-content">
					                <div class="item-inner">
					                    <div class="item-title">诚信指数</div>
					                    <div class="item-after"><fmt:formatNumber value="${res.allavg }" pattern="#.0#"/></div>
					                </div>
					            </div>
					        </li>
					        <li>
					            <a href="/wapact/goMyAddress/2" class="item-link external">
					                <div class="item-content">
					                    <div class="item-inner">
					                        <div class="item-title">收货地址</div>
					                        <div class="item-after">${sessionScope.users.shipaddress }</div>
					                    </div>
					                </div>
					            </a>
					        </li>
					</ul>
					<div class="content-block-title">店铺信息</div>
		            <ul>
		            	<c:choose>
							<c:when test="${not empty business.shopname}">
						        <!-- 不可编辑状态 -->
						        <li >
					                <div class="item-content">
					                    <div class="item-inner">
					                        <div class="item-title">店名</div>
					                        <div class="item-after">${business.shopname }</div>
					                    </div>
					                </div>
						        </li>
							</c:when>
							<c:otherwise>
								<li >
						            <a href="/wapact/goUpdateShopName" class="item-link external">
						                <div class="item-content">
						                    <div class="item-inner">
						                        <div class="item-title">店名</div>
						                        <div class="item-after">${business.shopname }</div>
						                    </div>
						                    
						                </div>
						            </a>
						        </li>
							</c:otherwise>
						</c:choose>

				        <li >
				            <a href="/wapact/goShopLogo" class="item-link external">
				                <div class="item-content">
				                    <div class="item-inner">
				                        <div class="item-title">logo</div>
				                        <div class="item-after">修改</div>
				                    </div>
				                    
				                </div>
				            </a>
				        </li>
				        <li >
				            <a href="/wapact/goDescription" class="item-link external">
				                <div class="item-content">
				                    <div class="item-inner">
				                        <div class="item-title">简介</div>
				                        <div class="item-after">修改</div>
				                    </div>
				                    
				                </div>
				            </a>
				        </li>
		            	<c:choose>
							<c:when test="${business.isauth==1 }">
						        <li class="audit0">
						        	<a href="" class="item-link external">
						                <div class="item-content">
						                    <div class="item-inner">
						                        <div class="item-title">我是个体工商户<span>(已认证)</span></div>
						                    </div>
						                </div>
						            </a>
						        </li>
							</c:when>
						</c:choose>
		            
                	</ul>
		        </div>
                
          	</div>
          </div>
        </div>
      </div>
    </div>

<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
<script type="text/javascript">
//初始化Framework7
var myApp = new Framework7({
//Tell Framework7 to compile templates on app init
    precompileTemplates: true
});
var $$ = Framework7.$;

qbApp.showMenu();
</script>

</body>
</html>