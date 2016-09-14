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
					<div class="center sliding">修改密码</div>
					<div class="right">
						<span class="js-showMenu"><i class="icon icon-bars"></i></span>
					</div>
				</div>
			</div>
        <div class="pages">
          <div data-page="home" class="page navbar-fixed">
          	<div class="page-content">
				<form id="my-form" class="list-block">
		          <ul>
		            <li>
		              <div class="item-content">
		                <div class="item-inner">
		                  <div class="item-title label">原密码：</div>
		                  <div class="item-input">
		                    <input type="password" name="oldPassword" class="oldPassword" placeholder="请输入原密码">
		                  </div>
		                </div>
		              </div>
		            </li>
		            <li>
		              <div class="item-content">
		                <div class="item-inner">
		                  <div class="item-title label">新密码：</div>
		                  <div class="item-input">
		                    <input type="password" name="newPassword" class="newPassword" placeholder="请输入新密码(6~20)">
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
	        	var oldPassword = $$('input[name="oldPassword"]').val(),
	        		newPassword = $$('input[name="newPassword"]').val();
        	
        	if(oldPassword === "") {
        		myApp.alert('原密码不能为空','');
        		return false;
        	
        	}
        	else if(newPassword === "") {
        		myApp.alert('新密码不能为空','');
        		return false;
        	}
        	 else {
        		if(!util.regexs.password.test(newPassword)){
        			myApp.alert('新密码格式不符合，请输入6－20位的数字或字母','');
        			return false;
        		}
        	}
        	
        	dataAjax(oldPassword,newPassword);
          });
        
        
        function dataAjax(oldPassword,newPassword) {
        	//show loading...
		    myApp.showIndicator();
		    
        	$$.ajax({
        		url: "/wapact/changepassword",
        		type: "post",
        		dataType: "json",
        		data: {
        			oldPassword:oldPassword,
        			password:newPassword
        		},
        		success: function(d){
        			//hide loading...
		        	myApp.hideIndicator();
		        	
        			if(d.status == 0){
        				window.location.href="/wapact/goAccountSet";
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