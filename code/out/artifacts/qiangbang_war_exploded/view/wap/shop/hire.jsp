<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/confirm/reward/sure-tuoguan/sure-tuoguan.css" />
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/confirm/reward/common-edit-reward/common-edit-reward.css" />
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/form/form.css" />

<body class=mobile-page>
    <div class="top-bar ">
        <div class="go-back">
            <button class="btn_back"></button>
        </div>
        <h1>雇佣服务商</h1>
    </div>
    <div class="top-bar-help-btn as-extend"><a href="/user/tohelp" data-linkid="10006697">帮助</a></div>
    <div class="wx-top hide">
        <a>点我关注“抢帮网”优惠享不停</a>
        <i class="iconfont icon-close"></i>
    </div>
    <!-- wap -->
    <div class="form-page-loading circle">
        <div class="c1"></div>
    </div>
    <div class="page-container bg-grey">
        <form id="needsForm" class="buy-service-page hire-page" action="javascript:void(0);" data-formurl="/shop/doHire">
            <div class="bg-white">
                <div class="buy-service-container bg-grey">
                    <div class="buy-service-con bg-white margin-b-15 border-bottom">
                        <div class="top border-bottom with-padding">
                            <div class="img"><img src="http://avatar.zbjimg.com/002/83/95/200x200_avatar_15.jpg!middle" onerror="this.src='/view/staticwap/image/widget/face-default.png'" alt="" /></div>
                            <div class="text">
                                <h2 class="fcolor-grey-2 fsize-14">橙果企业营销策划有限公司</h2>
                            </div>
                            <p>
                                <span class="provider-grade provider-grade-2">猪九戒</span>
                                <span class="medal-level medal-6"></span>
                                <span class="youxuan collect"></span>
                            </p>
                        </div>
                        <div class="border-bottom guarantee with-padding fsize-12">
                            <p class="item"><i></i>保证原创</p>
                            <p class="item"><i></i>保证完成</p>
                        </div>
                    </div>
                    <div class="buy-service-form border-top bg-white">
                        <input type="hidden" name="telephoneNum" value="">
                        <input type="hidden" name="salerId" value="2839515" />
                        <input type="hidden" name="puserid" value="">
                        <input type="hidden" name="puserAmount" value="">
                        <input type="hidden" name="tel" value="">
                        <input type="hidden" name="baseCat1" value="">
                        <input type="hidden" name="baseCat2" value="">
                        <input type="hidden" name="baseCat3" value="">
                        <div class="control-group control-textarea with-padding-lr bg-white">
                            <div class="control-group-title">
                                您想要做什么
                            </div>
                            <div class="margin-b-15 bg-white select-category with-padding hire-discription" data-linkid="10006719" style="margin-bottom:28px;">
                                <div class="indicate">
                                    <span class="category-l category-hire ">
                                                <input readonly="readonly" class="fcolor-orange need-must" id="category-hire" placeholder="请选择类目">
                                            </span>
                                    <span class="category-r-ico">＞</span>
                                </div>
                            </div>
                        </div>
                        <div class="category-layer">
                            <div class="category-laymshade"></div>
                            <div class="category-layermmain"></div>
                        </div>
                        <script class="tpl-content" id="category-hire-select" type="text/x-handlebars">
                            {@each data as item1}
                            <dl class="category-layer-group">
                                <dt class="category-layer-title">{{item1.categoryName}}</dt>
                                {@each item1.children as item2,index}
                                <dd class="category-layer-list" data-baseCat1="{{item2.category1id}}" data-baseCat2="{{item2.category2id}}" data-baseCat3="{{item2.category3Id}}">
                                    {{item2.category3Name}}
                                </dd>
                                {@/each}
                            </dl>
                            {@/each}
                        </script>
                        <div class="control-group bg-white
                                                                with-padding-lr
                                                                ">
                            <div class="control-group-title">
                                告诉服务商您的要求
                            </div>
                            <div class="hire-discription">
                                <div class="inner display-box">
                                    <textarea name="content" id="hireArea" class="need-must" placeholder="请描述您的具体要求，服务商可以更好的为您服务" tabindex="1" data-linkid="10006694"></textarea>
                                </div>
                            </div>
                        </div>
                        <input name="mstoken" value="%2BFBm98HfNnd5qKJvvS3BLlpM%2BoV%2FN78D0BRgaS0KS983axl%2BERJW8sbdOtB7QZlIFFxjz9PG6xnAI71iQFQ%2BrxXmCJYWyqST%2BwkoZRaCfl4%3D" type="hidden">
                        <!--/登陆 -->
                        <div class="control-group bg-white with-padding fsize-14" id="loginArea" data-islogin="0" data-user-mobile="" data-isverified="0">
                            <div class="control-group-title login-area-title">
                                留下您的联系方式 <span class="fcolor-grey-7 fsize-12">服务商会更快与您沟通</span>
                            </div>
                            <div class="employ-dialog-modifyphone" data-role="modifyphone-wrap">
                                <div class="employ-dialog-modifyphone-inputwrap">
                                    <input placeholder="请输入您的手机号码" maxlength=11 name="modifyphone" type="tel" class="employ-dialog-modifyphone-input" tabindex="2" data-linkid="10006694" />
                                </div>
                                <div>
                                    <input name="modifyphone-yzm" maxlength=6 type="tel" class="employ-dialog-modifyphone-input need-must" placeholder="请输入验证码" tabindex="3" data-linkid="10006694" />
                                    <a class="employ-dialog-modifyphone-verify btn-press-down disabled" data-role="verify-sender" href="javascript:void(0)">获取验证码</a>
                                </div>
                            </div>
                        </div>
                        <script id="telephone-modify" type="tpl">
                            <div class="confirm-con telephone-modify">
                                <a class="close" href="javascript: void(0);">X</a>
                                <div class="confirm-title border-bottom">
                                    确认您的联系手机
                                </div>
                                <div class="confirm-body bg-white
                        ">
                                    <div class='employ-dialog-modifyphone' data-role='modifyphone-wrap'>
                                        <div class='employ-dialog-modifyphone-inputwrap'>
                                            <input placeholder='请输入您的手机号码' maxlength=11 name='modifyphone' type='tel' class='employ-dialog-modifyphone-input' data-linkid='10006694' />
                                        </div>
                                        <div>
                                            <input name='modifyphone-yzm' maxlength=6 type='tel' class='employ-dialog-modifyphone-input need-must' placeholder='请输入验证码' data-linkid='10006694' /><a class='employ-dialog-modifyphone-verify btn-press-down disabled' data-role='verify-sender' href='javascript:void(0)'>获取验证码</a></div>
                                    </div>
                                </div>
                                <div class="confirm-bottom display-box">
                                    <button class="cancle  item">取消</button>
                                    <button class="sure  item">确定</button>
                                </div>
                            </div>
                        </script>
                    </div>
                    <p class="fcolor-grey-5 fsize-12 with-padding warning-text">抢帮网郑重承诺不收取您和服务商的任何佣金</p>
                </div>
            </div>
            <div class="bottom-button bg-white fcolor-orange border-top fixed-uc">
                <div class="display-box ">
                    <div class="price-item">
                        <div class="inner-con">
                            <span>¥</span>
                            <input type="number" id="priceNum" name="amount" class="need-must" value="" placeholder="请输入您的预算" tabindex="4" data-linkid="10006695" />
                        </div>
                    </div>
                    <div class="button-item">
                        <button class="bg-orange btn-press-down disabled" id="btnFav" type="button" data-linkid="10006696">提交</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <!-- /表单错误提示-->
    <script src="/view/staticwap/js/plugin/first-screen-time.js"></script>
    <div id="dialog-trust" class="home-pub-dialog-con">
        <div class="home-trust-dialog">
            <div class="home-trust-dialog-hd">
                <a class="close" data-url="/task/"></a>
            </div>
            <div class="home-trust-dialog-bd">
                <div class="trade-num">交易编号：123456</div>
                <div class="img-head"></div>
                <p class="title">订单已提交</p>

                <p class="content">让服务商马上为您开工！</p>
            </div>
            <div class="home-trust-dialog-ft">
                <a class="btn-trust downApp" href="/qrcode/scan/app">托管赏金</a>
            </div>
        </div>
    </div>
    <script id="sureTuoguanContent" type="text/tpl">
        <div class="warning"><i class="iconfont icon-warning"></i>托管赏金让服务商更好的响应您的需求</div>
        <div>总赏金：<span class="fcolor-orange-highlight"><span class="j-reward-totalPrice"></span>元</span>
        </div>
        <p class="fsize-12 fcolor-a1">您也可以分期托管，最低可以只托管<span class="j-reward-percent"></span></p>
        <div class="tuoguan-reward-input">
            <label for="">托管金额：</label>
            <div class="input-price">
                ¥
                <input type="number" name="tuoguan-reward-input" placeholder="请输入托管金额">
            </div>
        </div>
    </script>
    <script id="sure-tuoguan" type="tpl">
        <div class="confirm-con sure-tuoguan">
            <div class="confirm-title border-bottom">
                托管赏金
            </div>
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
        captchaURL: "/main/verify?seed=8701425276711146"
    };
    </script>

    <script type="text/javascript" src="/view/staticwap/js/page/form/hire.js"></script>
</body>


</html>
