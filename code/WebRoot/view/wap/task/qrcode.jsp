
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
                        <div class="center">我的二维码</div>
                        <div class="right">
                            <span class="js-showMenu"><i class="icon icon-bars"></i></span>
                        </div>
                    </div>
                </div>
                <div class="page-content">
                    <div class="qrcode-wrapper">
                        <p>手机扫描下方二维码</p>
                        <p>即可成为您推荐的好友</p>
                        <div class="output"></div>
                    </div>
                    <div class="list-block">
                        <ul>
                           <li class="item-link item-content">
                                <div class="item-inner">
                                    <div class="item-media rule">查看邀请规则
                                    </div>
                                <div class="item-after">
                                    <a href="/jsp/my/inviterecord.jsp" class="item-link external">查看我的邀请记录</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
<div class="popup popup-services">
    <div class="content-block">
        <a href="#" class="close-popup">关闭</a>
        <div  id="registrationAgreement" ></div>
    </div>
</div>


<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
<script type="text/javascript" src="/view/staticwap/js/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript" src="/view/staticwap/js/jquery/jquery.qrcode.js"></script>
<script type="text/javascript">

//添加菜单功能
qbApp.showMenu();

//二维码生成
jQuery('.output').qrcode({
    text    : 'www.baidu.com',
    width: 200,
    height: 200
});
(function(){
    var mycanvas = document.getElementsByTagName("canvas")[0];
    console.log(mycanvas)
    var image = mycanvas.toDataURL("image/png");
    $('.output').html("<img src='"+image+"' alt='from canvas'/>");
})();


</script>

</body>
</html>