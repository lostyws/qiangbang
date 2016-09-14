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
					<div class="center sliding">编辑店名</div>
					<div class="right">
						<span class="js-showMenu"><i class="icon icon-bars"></i></span>
					</div>
				</div>
			</div>
        <div class="pages">
          <div data-page="home" class="page navbar-fixed">
          	<div class="page-content">
       			<p class="tips">一旦提交不可更改，请谨慎填写。</p>
				<form id="my-form" class="list-block">
		          <ul>
		            <li>
		              <div class="item-content">
		                <div class="item-inner">
		                  <div class="item-title label">店铺名称：</div>
		                  <div class="item-input">
		                    <input type="text" name="shopname" value="${business.shopname }" maxlength="20" class="address-detail" placeholder="请输入店铺名称">
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
	        //初始化Framework7
	        var myApp = new Framework7(),
	        	$$ = Framework7.$;
	        	
        	//添加菜单功能
			qbApp.showMenu();
	        	
			//保存按钮的事件
	        $$('.form-to-json').on('click', function(){
	        	var shopname = $$('input[name="shopname"]').val();
	        	if(shopname.length>20){
	        		myApp.alert('长度请控制在20字内！');
	        		return false;
	        	}
	        	dataAjax(shopname);
          });
        
        
        function dataAjax(shopname) {
        	//show loading...
		    myApp.showIndicator();
		    
        	$$.ajax({
        		url: "/wapact/updateShopName",
        		type: "post",
        		dataType: "json",
        		data: {
        			shopname:shopname
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