
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/newhead.jsp" %>

        <style type="text/css">
            table td, table th {
    border: none;
}

.output {
    margin: 0 auto;
    padding: 0.3rem 0;
    width: 200px;
}

.qrcode-wrapper {
    margin-top: 0.2rem;
    padding-top: 0.2rem;
    background: #fff;
}

.qrcode-wrapper p {
    margin: 0;
    text-align: center;
    font-size: 0.32rem;
}

.list-block a, .rule{
    color: #999;
    font-size: 0.26rem;
}

.list-block ul:before,.list-block ul:after, .list-block ul {
    background: none;
}

.list-block {
    margin-top: 0;
}
        </style>
    </head>		
    <body class="weixin-body">
   <div class="statusbar-overlay"></div>
<div class="views">
    <div class="view view-main">
        <div class="pages">
            <div data-page="home" class="page navbar-fixed">
                <div class="navbar navbar-white">
                    <div class="navbar-inner">
                        <div class="left">
                            <a href="javascript:history.go(-1);" class="link icon-only">
                                <i class="icon icon-back"></i>
                            </a>
                        </div>
                        <div class="center">确认开始工作</div>
                        <div class="right">
                            <span class="js-showMenu"><i class="icon icon-bars"></i></span>
                        </div>
                    </div>
                </div>
                <div class="page-content">
                    
                    <div class="list-block">
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>



<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>

<script type="text/javascript">

//添加菜单功能
qbApp.showMenu();
// var orderId = util.getUrlParam('orderid');
var orderId = "${orderid}";

myApp.modal({
    title:  '',
    text: '<div>确认已开始工作</div>',
    buttons: [
      {
        text: '确定',
        onClick: function() {
        	confirmStart(orderId);
            
            
            
        }
      },{
          text: '取消',
          onClick: function() {
        	//window.location.href = '去订单页面';
          }
        }
    ]
});
//确认开始工作
function confirmStart(id){
	$$.ajax({
       url: "/waptask/taskValdate",
       type: "post",
       data:{'orderid':id},
       dataType: "json",
       
       success: function(d){
       		if(d.status === 0){

       			
       			myApp.alert('成功开始工作', function () {
       				window.location.href = d.msg;
       		    });
       			
        		
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