define(__uri('weixin'), ['zepto', 'wx', 'cookie'], function (require, exports, module) {
    var $ = require('zepto'),
        wx = require('wx'),
        Cookie = require('cookie'),
        url = '/weixin/sign';
    window.isWXConfig = false;

    var dom = {
        wxTop: $('.wx-top'),
        wxTopClose: $('.wx-top .icon-close')
    }
    // console.log(wx);
    var appId = 'wxc55a854df68827af';
    if (location.href.indexOf('.t4.') > -1) {
        appId = "wxc4247e1e5e6d2032";
    } else if (location.href.indexOf('.stage.') > -1) {
        appId = "wx916be8968d5943f1";
    } else if (location.href.indexOf('.dev.') > -1) {
        appId = "wx815fd85dc4c67f3e";
    } else {
        appId = "wxc55a854df68827af";
    }

    //在微信中时处理
    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1) {
        //未关注且未关闭顶部提示
    	// if (dom.wxTop.length > 0 && Cookie.get('wx-top') != "close") {
     //        dom.wxTop.removeClass('hide');
     //        dom.wxTop.on('click', function (e) {
     //            if (!$(e.target).hasClass('icon-close')) {
     //                location.href = 'http://www.baidu.com';
     //            }
     //        })
     //        dom.wxTopClose.on('click', function () {
     //            dom.wxTop.addClass('hide');
     //            Cookie.set('wx-top', 'close', {expires: 'Session'});
     //        });
     //    }
        //非微信版页面，通用分享
        if (location.href.indexOf('weixin/') == -1) {
            var meta = document.getElementsByTagName('meta');
            var share_desc = '';
            for (i in meta) {
                if (typeof meta[i].name != "undefined" && meta[i].name.toLowerCase() == "description") {
                    share_desc = meta[i].content;
                }
            }
            share({
                title: document.title, // 分享标题
                link: location.href, // 分享链接
                imgUrl: '/mobile/icon/APPICON120.jpg', // 分享图标
                desc: share_desc, // 分享描述
                success: function () {
                },
                cancel: function () {
                }
            });
        }
        //某些页面禁用分享等按钮
        if (location.href.indexOf('weixin/qrcode/login') > -1||location.href.indexOf('subscribe/topage') > -1) {
            hideAll();
        } else {
            showAll();
        }
    }
    function getSign() {
        //获取微信签名凭证
        $.ajax({
            url: url,
            type: 'post',
            data: {
                url: encodeURIComponent(location.href.split('#')[0])
            },
            success: function (json) {
                wx.config({
                    debug: false,
                    appId: appId, // 必填，公众号的唯一标识
                    timestamp: json.timestamp, // 必填，生成签名的时间戳
                    nonceStr: json.nonceStr, // 必填，生成签名的随机串
                    signature: json.signature, // 必填，签名，见附录1
                    jsApiList: ['getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'hideMenuItems', 'showAllNonBaseMenuItem','hideAllNonBaseMenuItem']
                });
                window.isWXConfig = true;
            },
            error: function () {
                //                    Common.animaTips('');
            }
        })
    };
    function share(data) {
        if (!window.isWXConfig) {
            getSign();
        }
        wx.ready(function () {
            wx.onMenuShareTimeline(data);
            wx.onMenuShareAppMessage(data);
            wx.onMenuShareQQ(data);
            wx.onMenuShareQZone(data);
        });
    };
    function getLocation(callback) {
        if (!window.isWXConfig) {
            getSign();
        }
        wx.ready(function () {
            wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                    callback(res);
                }
            });
        });
    };
    function hideItem(itemArr) {
        if (!window.isWXConfig) {
            getSign();
        }
        wx.ready(function () {
            wx.hideMenuItems({
                menuList: itemArr
            });
        });
    };
    function hideAll() {
        if (!window.isWXConfig) {
            getSign();
        }
        wx.ready(function () {
            wx.hideAllNonBaseMenuItem();
        });
    };

    function showAll() {
        if (!window.isWXConfig) {
            getSign();
        }
        wx.ready(function () {
            wx.showAllNonBaseMenuItem();
        });
    };

    module.exports = {
        getSign: getSign,
        share: share,
        getLocation: getLocation,
        hideItem: hideItem,
        showAll: showAll
    }
});