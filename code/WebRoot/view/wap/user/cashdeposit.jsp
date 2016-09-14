
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
                        <div class="center">缴纳保证金</div>
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
					        <input type="radio" name="my-checkbox" value="500" checked="checked">
					        <div class="item-media">
					          <i class="icon icon-form-checkbox"></i>
					        </div>
					        <div class="item-inner">
					          <div class="item-title">&yen;500</div>
					        </div>
					      </label>
					    </li>
					    <!-- Another chekbox item -->
					    <li>
					      <label class="label-checkbox item-content">
					        <input type="radio" name="my-checkbox" value="1000">
					        <div class="item-media">
					          <i class="icon icon-form-checkbox"></i>
					        </div>
					        <div class="item-inner">
					          <div class="item-title">&yen;1000</div>
					        </div>
					      </label>
					    </li>
					    <li>
					      <label class="label-checkbox item-content">
					        <input type="radio" name="my-checkbox" value="2000">
					        <div class="item-media">
					          <i class="icon icon-form-checkbox"></i>
					        </div>
					        <div class="item-inner">
					          <div class="item-title">&yen;2000</div>
					        </div>
					      </label>
					    </li>
					  </ul>
					</div>
                    
                    
                    
                    <div class="content-block">
	                    
	                    <p>1.<a class="external button-raised link" href="https://mp.weixin.qq.com/s?__biz=MjM5ODk5MDEwMQ==&mid=502045665&idx=1&sn=f364af3b44cefdc6fcb670269861e178&scene=1&srcid=0628FBGLieAh7RxKv4enIhd5&key=77421cf58af4a653d9fb7132dc29bc7592003df2838c2203b7a936e68bed58eb55e6ef5136a4ad499dc5deafd9a12954&ascene=0&uin=MTU5NDkyMzEyMA%3D%3D&devicetype=iMac+MacBookAir7%2C2+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=YcwmpD5BbzwpJFYS5tegwVUyX026Z5VmVckkiCjR9acSSDwTO%2BTL1lEdU6c69S6P">
	                    点击此处</a>查看商户级别权限</p>
	                    <p>2.完成认证或缴纳保证金后需工作人员审核，缴费收据工作人员会邮寄到您的指定地址，请保持电话畅通！</p>
	                    
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
function checkCantact(str){
    if(str.length <= 0){
        myApp.alert("请填写您的保证金额");
        return false;
    } else if(isNaN(str)){
        myApp.alert("请输入正确的金额");
        return false;
    } else {
        return true;
    }
}

$$('.js-submit').on('click',function(e){
	var cashmoney = $$('[name=my-checkbox]:checked').val();

    if(!cashmoney||cashmoney<500){
    	myApp.alert("请输入正确的金额");
        return false;
    }
	window.location.href="/wappay/qbpay?pay="+cashmoney+"&type=2";

/*	console.log(cashmoney)
    var isWeixin =packageJson.openId?true:false;
    $$.ajax({
        url:'/waptask/competitive',
        type:'post',
        dataType:'json',
        data:{
            isWeixin: isWeixin,
            userId : userId,
            pay: cashmoney
        },
        success: function(d){
            if(d.status == 0){
            	window.location.href = d.msg;
            } else {
                myApp.alert(d.msg);
            }
            
        },error: function(){
            myApp.hideIndicator();
            myApp.alert('加载失败，请刷新重试！');
        }
    });*/
})

</script>
</body>
</html>