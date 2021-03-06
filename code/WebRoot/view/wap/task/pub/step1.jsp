
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>


<link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/common-edit-reward.css"/>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/form/form.css"/>

<body class=mobile-page>
    <div class="top-bar ">
        <div class="go-back">
            <button class="btn_back"></button>
        </div>
        <h1>发布需求</h1>
    </div>

    <div class="wx-top hide">
        <a>点我关注“抢帮网”优惠享不停</a> <i class="iconfont icon-close"></i>
    </div>
    <!-- wap -->
    <div class="form-page-loading circle">
        <div class="c1"></div>
    </div>
    <div class="page-container bg-grey">
        <form id="needsForm" class="buy-service-page" action="javascript:void(0);" data-formurl="/waptask/depleyTask">

            <div class="needs-discription bg-white">
                <div class="buy-service-container bg-grey">
                    <div class="buy-service-form bg-white">

                        <input type="hidden" name="hidekeyword" value="123"/>
                        <input type="hidden" name="seed" value=""/>
                        <input type="hidden" id="model" name="model" value=""/>
                        <input type="hidden" name="categoryId" value="">
                        <input type="hidden" name="telephoneNum" value="">
                        <input type="hidden" id="needArea" name="title" value="" />

                        <input type="hidden" name="puserid" value="">
                        <input type="hidden" name="puserAmount" value="">
                        <input type="hidden" name="tel" value="">

                        <div class="control-group control-textarea with-padding-lr bg-white">
                            <div class="control-group-title">您想要</div>
                            <div class="margin-b-15 bg-white select-category with-padding hire-discription" data-linkid="10006719">
                                <div class="indicate">
                                    <span class="category-l">
                                        <input readonly="readonly" class="fcolor-orange need-must" id="category"placeholder="请选择"></span>
                                    <span class="category-r">＞</span>
                                </div>
                            </div>
                        </div>

                        <div class="control-group with-padding-lr hide" data-linkid="10006719">
                            <div class="calculate clearfix">
                                <div class="input">
                                    <input class=" display-box" name="price" type="tel" id="price" placeholder="单价不低于1元" tabindex="1"></div>
                                <span class="multi">×</span>
                                <div class="input">
                                    <input class=" display-box" type="tel" value="" name="num" id="num" placeholder="件数" tabindex="2" ></div>
                            </div>
                        </div>

                        <div class="control-group control-textarea with-padding bg-white">
                            <div class="control-group-title">告诉服务商您的要求</div>
                            <div class="buy-service-discription">
                                <div class="hire-discription">
                                    <div class="inner display-box">
                                        <textarea name="content" id="needs-title" class="need-must" value="" placeholder="请描述您的具体要求，服务商可以更好的为您服务" tabindex="3" data-linkid="10006719"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input name="mstoken" value="xzQPHdCKzXZK71VzhVzGBIdLMZVPPRAuWJhUhw5YaH0QI66lKsdBUkED%2Fa1iNpaBeMyB4LZqJlmb1C8FzaFKbBXmCJYWyqST%2BwkoZRaCfl4%3D" type="hidden">
                        <input name="chanceId" value="0" type="hidden">

                        <!--/登陆 -->
                        <div class="control-group bg-white with-padding fsize-14" id="loginArea" data-islogin="0" data-user-mobile="" data-isverified="0">
                            <div class="control-group-title login-area-title">
                                留下您的联系方式
                                <span class="fcolor-grey-7 fsize-12">服务商会更快与您沟通</span>
                            </div>
							<c:choose>
								 	<c:when test="${isreg==0 }">
			                            <div class="employ-dialog-modifyphone" data-role="modifyphone-wrap">
			                                <div class="employ-dialog-modifyphone-inputwrap">
			                                    <input placeholder="请输入您的手机号码" maxlength=11 name="modifyphone" type="tel" class="employ-dialog-modifyphone-input" tabindex="4" data-linkid="10006719" />
			                                </div>
			                                <div>
			                                    <input name="modifyphone-yzm" maxlength=6 type="tel" class="employ-dialog-modifyphone-input need-must" placeholder="请输入验证码" tabindex="5" data-linkid="10006719" />
			                                    <a class="employ-dialog-modifyphone-verify btn-press-down disabled" data-role="verify-sender" href="javascript:void(0)">获取验证码</a>
			                                </div>
			                            </div>
								 	</c:when>
								 	<c:otherwise>
				                         <div class="employ-dialog-modifyphone" data-role="modifyphone-wrap">
			                                <div class="employ-dialog-modifyphone-inputwrap">
			                                	<lable>${mobile }</lable>
			                                </div>
                            			</div>
								 	</c:otherwise>
							</c:choose>
                        </div>
                        <div class="control-group control-textarea with-padding bg-white" style="display: none;" id="myaddress">
                            <div class="control-group-title">您的常用地址</div>
                            <div class="buy-service-discription">
                                <div class="hire-discription">
                                    <div class="inner display-box">
                                        <textarea name="shipaddress" id="shipaddress"  value="" placeholder="所有竞标服务商均可查看该地址，填写表示默认此规则。" tabindex="3" data-linkid="10006719">${shipaddress }</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <script id="telephone-modify" type="tpl">
        <div class="confirm-con telephone-modify">
                            <a class="close" href="javascript: void(0);">X</a>


                        <div class="confirm-title border-bottom">确认您的联系手机</div>



            <div class="confirm-body bg-white
                        ">
                <div class='employ-dialog-modifyphone' data-role='modifyphone-wrap'><div class='employ-dialog-modifyphone-inputwrap'><input placeholder='请输入您的手机号码' maxlength=11 name='modifyphone' type='tel' class='employ-dialog-modifyphone-input' data-linkid='10006719' /></div><div><input name='modifyphone-yzm' maxlength=6 type='tel' class='employ-dialog-modifyphone-input need-must' placeholder='请输入验证码' data-linkid='10006719' /><a class='employ-dialog-modifyphone-verify btn-press-down disabled' data-role='verify-sender' href='javascript:void(0)'>获取验证码</a></div></div>



            </div>



            <div class="confirm-bottom display-box">
                                                <button class="cancle  item">取消</button>
                                                                <button class="sure  item">确定</button>
                                            </div>
        </div>
    </script>

                    </div>
                    <p class="fcolor-grey-5 fsize-12 with-padding warning-text">1.预付款会冻结在您的账户中，商家完成工作且您验收完毕后才支付给对方，请放心支付。</p>
                    <p class="fcolor-grey-5 fsize-12 with-padding warning-text">2.用户永久免费发布需求，如果没有挑选到合适的报价可以全额退款。</p>
                </div>
            </div>
            <div class="bottom-button bg-white fcolor-orange border-top">
                <div class="display-box ">
                    <div class="price-item">
                        <div class="inner-con">
                            <span>¥</span>
                            <input type="number" id="priceNum" maxlength="3" name="amount" class="need-must" value="" placeholder="待商议" tabindex="6" data-linkid="10006720" />
                        </div>
                    </div>
                    <div class="button-item">
                        <button class="bg-orange btn-press-down disabled" id="btnFav" type="button" data-linkid="10006721">帮我</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <script src="/view/staticwap/js/plugin/first-screen-time.js"></script>

    <div id="dialog-trust" class="home-pub-dialog-con">
        <div class="home-trust-dialog">
            <div class="home-trust-dialog-hd">
                <a class="close" data-url="/wappay/pay/"></a>
            </div>
            <div class="home-trust-dialog-bd">

                <div class="trade-num">交易编号：123456</div>
                <div class="img-head"></div>
                <p class="title">订单已提交</p>

                <p class="content">让服务商马上为您开工！</p>
            </div>
            <div class="home-trust-dialog-ft">
                <a class="btn-trust downApp" href="http://qb.qq12306.cn/qrcode/addmoney">托管赏金</a>
            </div>
        </div>
    </div>

    <script id="shade-category" type="tpl">
            <div class="shade-category">
                <div class="shade-category-title border-bottom">请选择合适的类目 <a class="close" href="javascript: void(0);">X</a></div>
                <div class="category-select bg-white" id="categoryScroller"></div>
            </div>
        </script>
        <script class="tpl-content" id="category-select" type="text/x-handlebars" data-categoryUrl="/category/getWapCategory">
            <button class="category-list btn-press-down" data-category="{{name}}" data-linkid="{{linkid}}" minimum="{{minmoney}}" data-categoryId="{{id}}">{{name}}</button>
        </script>

    <script id="sureTuoguanContent" type="text/tpl">
    <div class="warning"><i class="iconfont icon-warning"></i>托管赏金让服务商更好的响应您的需求</div>
    <div>总赏金：<span class="fcolor-orange-highlight"><span class="j-reward-totalPrice"></span>元</span></div>
    <p class="fsize-12 fcolor-a1">您也可以分期托管，最低可以只托管<span class="j-reward-percent"></span></p>
<div class="tuoguan-reward-input">
    <label for="">托管金额：</label>
    <div class="input-price">
        ¥<input type="number" name="tuoguan-reward-input" placeholder="请输入托管金额"></div>
</div></script>

    <script id="sure-tuoguan" type="tpl">
        <div class="confirm-con sure-tuoguan">


                        <div class="confirm-title border-bottom">托管赏金</div>



            <div class="confirm-body bg-white
                        ">
                <p></p>



            </div>



            <div class="confirm-bottom display-box">
                                                <button class="cancle  item">暂不托管</button>
                                                                <button class="sure  item">确认，去托管</button>
                                            </div>
        </div>
    </script>
    <script id="nextTuoguanNoPercentContent" type="text/tpl">
    <div class="warning"><i class="iconfont icon-warning"></i>托管赏金让服务商更好的响应您的需求</div>
    <div class="fcolor-orange-highlight">总赏金：<span class="j-reward-totalPrice"></span>元<span class="fsize-12"><em class="fcolor-5d">（未托管</em><span class="j-reward-not-pay"></span><em class="fcolor-5d">元）</em></span></div>
    <div class="tuoguan-reward-input">
        <label for="">托管金额：</label>
        <div class="input-price">
            ¥<input type="number" name="tuoguan-reward-input" placeholder=""></div>
    </div>
</script>

    <script id="next-tuoguan-no-percent" type="tpl">
        <div class="confirm-con next-tuoguan-no-percent">


                        <div class="confirm-title border-bottom">托管赏金</div>



            <div class="confirm-body bg-white
                        ">
                <p></p>



            </div>



            <div class="confirm-bottom display-box">
                                                <button class="cancle  item">暂不托管</button>
                                                                <button class="sure  item">确认，去托管</button>
                                            </div>
        </div>
    </script>
    <script>
            var URL = {
                captchaURL: 'http://127.0.0.1:4001'//"main/verify?seed=8701425276711146"
            };

        </script>


    <script type="text/javascript" src="/view/staticwap/js/page/form/needs-discription.js"></script>
    <script type="text/javascript">
    	function btnpro(show){
    		if(show==1){
    			$("#address").show();
    			$("#shipaddress").addClass("need-must");
    		} else {
    			$("#address").hide();
    			$("#shipaddress").removeClass("need-must");
    		}
    	}
    </script>
</body>

</html>