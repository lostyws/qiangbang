
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
                        <a class="link icon-only" href="javascript:window.location.href='/shop/index'">
                            <i class="icon icon-back"></i>
                        </a>
                    </div>
					<div class="center sliding">店铺设置</div>
					<div class="right">
						<span class="js-showMenu"><i class="icon icon-bars"></i></span>
					</div>
				</div>
			</div>
			
        <div class="pages">
          <div data-page="home" class="page navbar-fixed">
          	<div class="page-content">
				<div class="list-block">
		            
		            	
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
					                <div class="item-content">
					                    <div class="item-inner">
					                        <div class="item-title">店名</div>
					                        <div class="item-after">${business.shopname }</div>
					                    </div>
					                </div>
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
		            	<li>
				            <div class="item-content">
				                <div class="item-inner">
				                    <div class="item-title">综合评价</div>
				                    <div class="item-after"><fmt:formatNumber value="${res.allavg }" pattern="#.0#"/></div>
				                </div>
				            </div>
				        </li>
				        <c:choose>
						<c:when test="${business.isauth==1 }">
					        <li>
					            <div class="item-content">
					                <div class="item-inner">
					                    <div class="item-title">认证</div>
					                    <div class="item-after">已认证</div>
					                </div>
					            </div>
					        </li>
						</c:when>
						<c:otherwise>
					        <li>
					            <a href="/wappay/qbpay?type=1" class="item-link external">
					                <div class="item-content">
					                    <div class="item-inner">
					                        <div class="item-title">认证</div>
					                        <div class="item-after">未认证</div>
					                    </div>
					                </div>
					            </a>
					        </li>
						</c:otherwise>
						</c:choose>
						
						<c:choose>
						<c:when test="${business.isbond==1&&business.bondmoney>0 }">
					        <li>
					            <div class="item-content">
					                <div class="item-inner">
					                    <div class="item-title">保证金</div>
					                    <div class="item-after">&yen;${business.bondmoney }</div>
					                </div>
					            </div>
					        </li>
						</c:when>
						<c:otherwise>
					        <li>
					            <a href="/shop/goCashdeposit" class="item-link external">
					                <div class="item-content">
					                    <div class="item-inner">
					                        <div class="item-title">保证金</div>
					                        <div class="item-after">未交保证金</div>
					                    </div>
					                </div>
					            </a>
					        </li>
						</c:otherwise>
						</c:choose>
					   
		                  <li>
					            <div class="item-content">
					                <div class="item-inner">
					                    <div class="item-title">开启短信通知</div>
					                    <div class="item-after">
					                    	<label class="label-switch">
					                            <input type="checkbox" name="switch" ${business.msgstatus==1?'checked':'' } class="js-note-notice" value="yes">
					                            <div class="checkbox"></div>
					                          </label>
					                    </div>
					                </div>
					            </div>
					        </li>  
					        
					       
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

$$(document).on('change','.js-note-notice',function(){
	console.log($$(this).prop('checked'));
	var isNote = $$(this).prop('checked')?1:0;
	noteOpen(isNote);


})
function noteOpen(note){
		$$.ajax({
	       url: "/wapact/noticeMsgOpen",
	       type: "post",
	       data:{'note':note},
	       dataType: "json",
	       
	       success: function(d){
	       		if(d.status === 0){
	       			myApp.alert(note?'成功开启':'成功关闭');
	        		
	       		}else{
	       			myApp.alert(d.msg);
	       			$$('.js-note-notice').prop('checked',!note);
	       		}
	       },error: function(){
                myApp.hideIndicator();
                myApp.alert('加载失败，请刷新重试！');
            }
		       
	   });
	}
	
</script>

</body>
</html>