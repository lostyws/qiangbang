
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
					<div class="center sliding">用户设置</div>
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
					            <div class="item-content">
					                <div class="item-inner">
					                    <div class="item-title">手机号</div>
					                    <div class="item-after">${sessionScope.users.mobile }</div>
					                </div>
					            </div>
					        </li>
							<li>
                                <a href="/wapact/goUpdatePwd" class="item-link external">
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-title">修改密码</div>
                                            <div class="item-after"></div>
                                        </div>
                                    </div>
                                </a>
                            </li>
							<li>
					            <div class="item-content">
					                <div class="item-inner">
					                    <div class="item-title">诚信指数</div>
					                    <div class="item-after">7.6</div>
					                </div>
					            </div>
					        </li>
					        <li>
					            <a href="/wapact/goMyAddress/1" class="item-link external">
					                <div class="item-content">
					                    <div class="item-inner">
					                        <div class="item-title">收货地址</div>
					                        <div class="item-after">${sessionScope.users.shipaddress }</div>
					                    </div>
					                </div>
					            </a>
					        </li>
					    </ul>
					    <ul>
					</ul>

		        </div>

          	</div>
          </div>
        </div>
      </div>
    </div>



<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>

</body>
</html>