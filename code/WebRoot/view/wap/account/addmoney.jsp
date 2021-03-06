
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<link rel="stylesheet" type="text/css" href="/view/staticwap/webuploader/0.1.6/webuploader.css"/>
<%@ include file="/view/wap/layout/newhead.jsp" %>

        <style type="text/css">
            .upload-box {
    margin: 0 0 0 10px;
    float: left;
    width: 1.6rem;
    height: 1.6rem;
    border: 1px dashed #ccc;
    overflow: hidden;
}
.upload-box .upload-symbol {
    line-height: 1.6rem;
}
.upload-box img{
    height: 1.6rem;
    width: 1.8rem;
}
.advice-content {
    padding: 0 0.2rem 0.1rem;
    background-color: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}
.advice-content>div {
    overflow: hidden;
}
.advice-contact {
    margin: 10px 0;
    background-color: #fff;
}
.advice-contact input {
    width: 100%;
    padding: 0.2rem 10px;
    border: none;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-radius:0;
    -webkit-appearance: none;
}
.webuploader-pick-hover {
    background: none;
}
.thank-icon {
    margin: 0.1rem auto;
    height: 0.78rem;
    width: 0.92rem;
    background: url(http://staticwyb.joyowo.com/images/icon/11.png) no-repeat;
    background-size: 100%;
}
.modal-text {
    color: #858585;
}
textarea {
    width: 100%;
    border: 0;
    height: 100px;
}
        </style>
    </head>		
    <body class="weixin-body">
    <div class="statusbar-overlay"></div>
<div class="views">
    <div class="view view-main">
        <div class="pages">
            <div data-page="home" class="page navbar-fixed toolbar-fixed">
                <div class="navbar">
                    <div class="navbar-inner">
                        <div class="left">
                            <a href="javascript:window.location.href='/shop/goShopSet';" class="link icon icon-only">
                                <i class="icon icon-back"></i>
                            </a>
                        </div>
                        <div class="center">账户充值</div>
                        <div class="right">
                            <span class="service-search"></span>
                            <span class="js-showMenu"><i class="icon icon-bars"></i></span>
                        </div>
                    </div>
                </div>
                <div class="page-content">
                	
                    
                    <div class="list-block">
					  <ul>
					    <!-- Single chekbox item -->
					    <li>
					      <label class="label-checkbox item-content">
					        <!-- Checked by default -->
					        <input type="radio" name="my-checkbox" value="10" checked="checked">
					        <div class="item-media">
					          <i class="icon icon-form-checkbox"></i>
					        </div>
					        <div class="item-inner">
					          <div class="item-title">&yen;10</div>
					        </div>
					      </label>
					    </li>
					    <!-- Another chekbox item -->
					    <li>
					      <label class="label-checkbox item-content">
					        <input type="radio" name="my-checkbox" value="50">
					        <div class="item-media">
					          <i class="icon icon-form-checkbox"></i>
					        </div>
					        <div class="item-inner">
					          <div class="item-title">&yen;50</div>
					        </div>
					      </label>
					    </li>
					    <li>
					      <label class="label-checkbox item-content">
					        <input type="radio" name="my-checkbox" value="100">
					        <div class="item-media">
					          <i class="icon icon-form-checkbox"></i>
					        </div>
					        <div class="item-inner">
					          <div class="item-title">&yen;100</div>
					        </div>
					      </label>
					    </li>
					  </ul>
					</div>
                    
                    <div class="content-block">
                        <input type="button" class="button button-big button-fill js-submit" value="支付" >  
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/js/jquery/1.11.1/jquery.js"></script>
<script type="text/javascript" src="/view/staticwap/webuploader/0.1.6/webuploader.custom.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
<script type="text/javascript">
var userId = "${task.id }";
var myApp = new Framework7();
var $$ = Dom7;
//添加菜单功能
qbApp.showMenu();



function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");  
}


$$('.js-submit').on('click',function(e){
	var cashmoney = $$('[name=my-checkbox]:checked').val();

    if(!cashmoney||cashmoney<10){
    	myApp.alert("请输入正确的金额");
        return false;
    }
	window.location.href="/wappay/qbpay?pay="+cashmoney+"&type=3";


})

</script>
</body>
</html>