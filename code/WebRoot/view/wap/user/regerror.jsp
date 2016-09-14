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
					<div class="center sliding">注册失败。</div>
					<div class="right">
						<span class="js-showMenu"><i class="icon icon-bars"></i></span>
					</div>
				</div>
			</div>
        <div class="pages">
          <div data-page="home" class="page navbar-fixed">
          	<div class="page-content">
				<div class="content-block">
                    <p>对不起，用户无法申请为商户。请更换微信号或者致电客服解绑。</p>
                </div>
		
		        <div class="content-block">
		          <a href="javascript::void(0);" onclick="javascript:window.location.href='/wapact/index'" class="button button-fill button-big form-to-json">确定</a>
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