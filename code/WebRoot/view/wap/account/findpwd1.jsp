<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/newhead.jsp" %>
<body>

    <div class="views">
    <div class="view view-main" data-page="findpwd">
        <div class="pages">
            <div data-page="findpwd" class="page navbar-fixed">
                <div class="navbar">
                    <div class="navbar-inner">
                        <div class="left">
                            <a href="/weixin/getweixin.do?name=index/index" class="external link icon icon-only"> <i class="icon icon-back"></i>
                            </a>
                        </div>
                        <div class="center" style="left: -11.5px;">找回密码</div>
                        <div class="right">
                            <span class="js-showMenu"><i class="icon icon-bars"></i></span>
                        </div>
                    </div>
                </div>
                <div class="page-content">
                    <div class="list-block">
                        <ul>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">手机号</div>
                                        <div class="item-input">
                                            <input type="tel" name="phone" class="phoneNumber" placeholder="请输入您的手机号">
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="content-block"><input type="button" class="button button-fill button-big form-to-json js-next" value="下一步"></div>

                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="/view/staticwap/js/jquery/1.11.1/jquery.js"></script>

<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
        <script type="text/javascript">
    var myApp = new Framework7();
    //lib
    var $$ = Dom7;
    //添加菜单功能
    qbApp.showMenu();


    $(function(){

         $$('.js-next').on('click', function () {
                var phone = $('.phoneNumber').val(),
                succ = true,
                _this = $(this);

                if(_this.hasClass('btn_aaa')){
                    succ = false;
                }

                if(!util.regexs.mobile.test(phone)){
                    myApp.alert("号码格式不正确！");
                    succ=false;
                }

                if(succ){
                    _this.addClass('btn_aaa').val('处理中');

                    function cancel(){
                        _this.removeClass('btn_aaa').val('下一步');
                    }

                    $$.ajax({
                        url: '/wapact/firstValidateMobile',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            phone:phone
                        },
                        success: function(d) {
                            if(d.status==0){
                                myApp.alert('系统已将验证码发送至你的手机，请注意查收', function () {
                                    window.location.href="/wapact/goUpdatePwd2";
                                });

                             }else{
                                _this.removeClass('btn_aaa').val('下一步');
                                myApp.alert(d.msg || '');
                             }
                        },error: function(){
                            myApp.hideIndicator();
                            myApp.alert('加载失败，请刷新重试！');
                        }
                    })



                }
            })
    })
    </script>



</body>
</html>