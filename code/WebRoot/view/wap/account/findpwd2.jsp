<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/newhead.jsp" %>
<body>
<style type="text/css">
.list-block .item-inner {
    padding: 0 10px 0 0;
}
.views .item-input input {
    float: left;
}
.views input.boxinput {
    width: 60%;
}
.views input.shortMessage {
    background: transparent none repeat scroll 0 0;
    border: 1px solid #2cca6f;
    border-radius: 20px;
    color: #2cca6f;
    float: right;

    margin-top: 8px;
    padding: 5px;
}

</style>

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
                                                    <div class="item-title label">验证码</div>

                                                    <div class="item-input">
                                                        <input type="text" name="securityCode" class="boxinput " placeholder="请输入验证码">
                                                        <input type="button" id="shortMessage" class="shortMessage shortMessage-ccc" value="重发（49s）">



                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="item-content">
                                                <div class="item-inner">
                                                    <div class="item-title label">密&nbsp;&nbsp;&nbsp;码</div>
                                                    <div class="item-input">
                                                        <input type="text" name="password" placeholder="请设置登录密码(6-20)">
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="content-block"><input type="button" class="button button-fill button-big form-to-json js-savepwd" value="确定"></div>




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
    var mobile = "${mobile}";
    var phonetemp = mobile,iCount;



        var phone =  mobile;
        iCount=self.setInterval(time_l,1000);
        $(".phone").html(phone);
        $("#shortMessage").addClass("shortMessage-ccc");


    //发送验证码

    function registersend(vCode){
        $$.ajax({
            'url': '/user/getUpdatePwdCode',
            'data': {"tel":phonetemp, vCode: vCode},
            success: function(data){
                if(data.success){
                    $$('#shortMessage').addClass("shortMessage-ccc");
                    //倒计时
                    if(time_show == 0){time_show = 60;}
                    iCount=self.setInterval(time_l,1000);
                    //提示
                    $("#register_span").html("验证码已发送到手机："+phonetemp);
                    $("#phoneregister").val(phonetemp);
                }else{
                    myApp.alert(data.msg || '');
                }
            }
        });
    }





    var time_show = 60, isOk = true ;
    function time_l(){
        time_show=time_show-1 ;
        $("#shortMessage").val("重发（"+time_show+"s）");
        if(time_show==0){
            clearInterval(iCount);
            $("#shotstats").val('1');
            $("#shortMessage").val("点击重新发送").removeClass("shortMessage-ccc");
        }
    }


      $$('#shortMessage').click(function(){
          if($$(this).hasClass('shortMessage-ccc')){return false;}
          registersend(phonetemp)
      })



    $$(".js-savepwd").click(function(){
        savepwd();
    })
    function savepwd(){

        var password = $('input[name=password]').val(),
                    securityCode = $('input[name=securityCode]').val(),
                    succ = true;

        if(securityCode==""){
            myApp.alert("验证码不能为空");
            succ = false;
            return false;
        }
        if(!util.regexs.password.test(password)){
            myApp.alert("密码格式不正确！");
            succ = false;
        }
        if(succ){
            $$.ajax({
                url: "/wapact/updatepwd",
                type: 'post',
                dataType: 'json',
                data: {
                    "securityCode":securityCode,
                    "password":password,
                    "phone":phone
                },
                success: function(d) {
                    if(d.status==0){

                        myApp.alert('密码修改成功', function () {
                            window.location.href="/wapact/index";
                        });
                     }else{

                        myApp.alert(d.msg);
                     }
                },error: function(){
                myApp.hideIndicator();
                myApp.alert('加载失败，请刷新重试！');
            }
            })

        }
    }

    </script>



</body>
</html>