<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/newhead.jsp" %>
<body>
    <div class="views">
      <div class="view view-main">
       <div class="navbar navbar-white">
				<div class="navbar-inner">
                    <div class="left">
                        <a class="link icon-only" href="javascript:history.go(-1)">
                            <i class="icon icon-back"></i>
                        </a>
                    </div>
					<div class="center sliding">修改资料</div>
					<div class="right">
						<span class="js-showMenu"><i class="icon icon-bars"></i></span>
					</div>
				</div>
			</div>
        <div class="pages">
          <div data-page="home" class="page navbar-fixed">
          	<div class="page-content">
       			<p class="tips">可作为物流寄送地址，建议填写。</p>
				<form id="my-form" class="list-block">
		          <ul>
		            <li>
		              <div class="item-content">
		                <div class="item-inner">
		                  <div class="item-title label">收货地址：</div>
		                  <div class="item-input">
		                    <input type="text" name="shipaddress" value="${sessionScope.users.shipaddress }" class="address-detail" placeholder="请输入收货地址">
		                  </div>
		                </div>
		              </div>
		            </li>
		            
		          </ul>
		        </form>
		
		        <div class="content-block">
		          <a href="#" class="button button-fill button-big form-to-json">保存</a>
		        </div>
          	</div>
          </div>
        </div>
      </div>
    </div>



<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
        <script type="text/javascript">
        	var type = "${type }";
	        //初始化Framework7
	        var myApp = new Framework7(),
	        	$$ = Framework7.$;
	        	
        	//添加菜单功能
			qbApp.showMenu();
	        	
			//保存按钮的事件
	        $$('.form-to-json').on('click', function(){
	        	var shipaddress = $$('input[name="shipaddress"]').val();
	        	dataAjax(shipaddress);
          });
        
        
        function dataAjax(shipaddress) {
        	//show loading...
		    myApp.showIndicator();
		    
        	$$.ajax({
        		url: "/wapact/saveAddress",
        		type: "post",
        		dataType: "json",
        		data: {
        			shipaddress:shipaddress,
        			type:type
        		},
        		success: function(d){
        			//hide loading...
		        	myApp.hideIndicator();
		        	
        			if(d.status == 0){
        				window.location.href=d.msg;
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
  


</body>
</html>