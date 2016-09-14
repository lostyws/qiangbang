<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<footer class="idx-footer">
        <div class="idx-nav">
            <div class="idx-breadcrumb" data-linkid="10006672">

            </div>

        </div>
        <script>
        //登录后跳回原网页
        if (document.getElementById('idx-logo-icon')) {
            document.getElementById('idx-logo-icon').setAttribute('href', '/user/toLogin?preUrl=' + location.href);
        }
        </script>
        <div class="idx-search">
            <input id="ft-keywords" maxlength="15">
            <button id="ft-search" data-linkid="10006675"></button>
        </div>


        <div class="idx-copyright">
	        ©2005-2016  赣ICP备14000720号
	        <br/>
	        抢帮网络科技有限公司
	        <br/>
	        0797-2508000
	    </div>
    </footer>
    <audio id="chatAudio" loop="loop">
		<source src="/view/staticwap/video/notify.ogg" type="audio/ogg">
		<source src="/view/staticwap/video/notify.mp3" type="audio/mpeg">
		<source src="/view/staticwap/video/notify.wav" type="audio/wav">
	</audio>