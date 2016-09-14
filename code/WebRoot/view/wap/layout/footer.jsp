<%--
  Created by IntelliJ IDEA.
  User: yws
  Date: 16/5/23
  Time: 下午9:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<footer class="idx-footer">
<!--
    <div class="idx-status clearfix">
        <div class="idx-entry">
            <a href="/user/toLogin">登录</a>
            <span>|</span>
            <a href="/user/toreg">注册</a>
        </div>
        <a class="idx-top">回到顶部</a>
    </div>
 -->
    <div class="idx-copyright">
        ©2005-2016  赣ICP备14000720号
        <br/>
        抢帮网络科技有限公司
        <br/>
        0797-2508000
    </div>
</footer>
<audio id="chatAudio">
		<source src="/view/staticwap/video/notify.ogg" type="audio/ogg">
		<source src="/view/staticwap/video/notify.mp3" type="audio/mpeg">
		<source src="/view/staticwap/video/notify.wav" type="audio/wav">
	</audio>
<script>
    window.frontEndHost = '';
    window.domainURLHost = ''; //解决商机中引了birdge导致frontEndHost被重写
    window.iapiURL = '';
    window.wxURL = "weixin.qiangbang.com";
    window.REQUEST_SOURCE = "";
    window.appURL =  '';
    MonitorHD.sd = +new Date;
</script>
<script type="text/javascript" src="/view/staticwap/js/components/sai/seer/seer.js"></script>