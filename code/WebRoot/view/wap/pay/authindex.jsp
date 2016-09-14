<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html lang="zh-cn">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="renderer" content="webkit" />
    <meta name="google-site-verification" content="EGpeU8lMdt7x_LsqOd7MAXeYZW9ZKf1MML-n6C4emtA" />
    <meta http-equiv="Cache-Control" content="no-transform " />
    <title>收银台-抢帮网</title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <script>
    /*MonitorHD*/
    (function(w, d, m) {
        w[m] = w[m] || function() {
            (w[m].q = w[m].q || []).push(arguments)
        }, w[m].r = +new Date;
    })(window, document, "MonitorHD");
    </script>

    <link type="text/css" rel="stylesheet" href="/view/staticwap/css/pay/global.css" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <link type="text/css" rel="stylesheet" href="/view/staticwap/css/page/pay/withdraw.css" />
    <link type="text/css" rel="stylesheet" href="/view/staticwap/css/page/pay/payorder.css" />
    <link type="text/css" rel="stylesheet" href="/view/staticwap/css/page/pay/dialog.css" />
    <link type="text/css" rel="stylesheet" href="/view/staticwap/css/page/pay/m_payorder.css" />
    <script type="text/javascript" src="/view/staticwap/js/vendor/seajs/2.3.0/sea.js"></script>
    <script type="text/javascript" src="/view/staticwap/js/libs/storage.js"></script>
    <script type="text/javascript" src="/view/staticwap/js/sea.config.js"></script>

    <script>
    MonitorHD.sh = +new Date;
    </script>
</head>

<body>
    <!--[if lte IE 7]>
<div class="ui-tips ui-tips-warning ie-update zbj-tips text-center">
    你正在使用IE低级浏览器，为了您的抢帮账号安全和更好的产品体验，<br />强烈建议您立即 <a class="blue" href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" target="_blank">升级IE浏览器</a> 或者用更快更安全的 <a class="blue" href="https://www.baidu.com/s?ie=UTF-8&wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8" target="_blank">谷歌浏览器Chrome</a> 。
</div>
<![endif]-->
    <header class="page-header">
        <h1>收银台</h1>
        <div class="back-btn" onclick="history.go(-1);"></div>
    </header>
    <div class="m-payorder-main">
        <table class="order-info">
            <tbody>
                <tr class="order-money">
                    <td class="t-title">订单金额：</td>
                    <td class="money-number">￥${pays.pay }</td>
                </tr>
                <tr class="order-number">
                    <td class="t-title">订单编号：</td>
                    <td>${pays.paynum }</td>
                </tr>
                <tr class="order-name">
                    <td class="t-title">订单名称：</td>
                    <td>${pays.paytitle }</td>
                </tr>
            </tbody>
        </table>
        <div class="pay-way">
            <div class="other-pay">
<!--                 <form id="J_deposit-pay-form" method="post" action="/payorder/to" target="_blank"> -->
                    <div style="display: none;">
                        <input id="J_pay-alipay-checkbox" type="radio" checked name="bankcode" value="" class="pay-channel-radio" data-paychnid="1" />
                        <input id="J_pay-weixin-checkbox" type="radio" name="bankcode" value="" class="pay-channel-radio" data-paychnid="65" />
                    </div>
                    <!-- <ul class="platform-way">
                        <li id="ali-wrap" class="ali-border">
                            <div class="radio-btn fl"></div>
                            <div class="platform-ico ali-ico fl">支付宝</div>
                            <div class="pay-net-amount pay-money fr">￥500.00</div>
                        </li>
                        <li id="wechat-wrap" class="wechat-border">
                            <div class="radio-btn fl"></div>
                            <div class="platform-ico wx-ico fl">微信支付</div>
                            <div class="pay-net-amount pay-money fr">￥${pays.pay }</div>
                        </li>
                        <li class="more-platform">
                            <div>
                                <span>更多支付方式</span>
                                <span class="more-arrow"></span>
                            </div>
                        </li>
                    </ul> -->
                    <div class="hidden">
                        <!-- 储蓄卡支付信息新版本 ebank_amount默认值为订单金额 -->
                        <input id="J_deposit-balance" class="J_pay-with-balance" name="balance_amount" type="hidden" />
                        <input id="J_deposit-pay" class="J_pay-with-money" name="ebank_amount" type="hidden" value="500" />
                        <input id="J_deposit-coupon" class="J_pay-with-coupon" name="coupon" type="hidden" />
                        <input id="J_deposit-chnid" name="paychnid" type="hidden" />
                        <!-- 订单信息 -->
                        <input type="hidden" name="data" value="D8rbUcriahJ8c0gBQwVoLZxbLZO1QhFYaMJjdEQKsyxbNEr6dCrfUhgKc0tkdmO5pgYGQzsWUgv5ucRfahq5p5QMsZAnpyI6Q5b5UCW4dC7iQwV5syxbNwx5NEriuct13lQKQhv83mJ8JmgidmogQ5b5AMJ5c0v83mJ8c074QwV5LwIisyB7pyI5NEr63cr0uCsgc0s43mP5p5rElgREQzWdNEre3FvgahF5amP5pwx1QhvWdFv5ucRfahq5p5Q8LZO0LZPopyQosyAbsZ9bLZLos8Q1QzsWUhRgUM95p5r4AhtgAgtRdmogQ5b5dcsgAgvR3EQKLy9npyP6LwO1Qzs7ahsfdcr1QwV5uStiAZRANWb4dmF6u6QjDhreNhs4aJb4AmF7aMrB3crANWR5ugTkDJs7a5Q1QhF6DC7wcMJ8aEQKQhkidSxKcEvANMtkA018NzR5u57wa0WANMTkDCv83mJ8cEvuUhR9UcgkPMgjQ5b5U0kkAhdgc0v8uCdRa5QKLwtv" />
                    </div>
<!--                 </form> -->
            </div>
        </div>
        <p class="pay-tips">
            1.预付款会冻结在您的账户中，商家完成工作且您验收完毕后才支付给对方，请放心支付。
            <br/>
            2.用户永久免费发布需求，如果没有挑选到合适的报价可以全额退款。
        </p>
        <div class="pay-btn">
            <button id="pay-btn-bank" onclick="wpay();">确认支付</button>
        </div>
    </div>
    <script type="text/javascript">
//     	var json = "${json}"

    	function wpay(){
    		console.log("start pay");
    		if (typeof WeixinJSBridge == "undefined"){
    			if( document.addEventListener ){
    				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    			}else if (document.attachEvent){
    				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
    				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    			}
    		}else{
    			onBridgeReady();
    		}
    	}

	    function onBridgeReady(){
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest',
				${json},
				function(res){
					// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
					if(res.err_msg === 'get_brand_wcpay_request:ok'){
						   window.location.href="/shop/index";
					}else if(res.err_msg === 'get_brand_wcpay_request:cancel'){
						   alert('取消支付！');
					}
				}
			);
		}

    </script>

</body>

</html>
