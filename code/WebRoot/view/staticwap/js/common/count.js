//google universal analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();
    cookieValue = arguments[1].cookie;

    //存在cookie信息 或存在cookie时候，但不存在uniqid时候设置cookie信息的uniqid值
    if(!cookieValue || (cookieValue && cookieValue.indexOf('uniqid') === -1)) {
        //cookie中没有uniqid信息，需要重新生成
        var uniqid = 'd01' + Math.random().toString(35).slice(2, 30);
        document.cookie = 'uniqid=' + uniqid + '; domain=.zbj.com; path=/';
        cookieValue = document.cookie;
    }
    a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','__ga_new');

//主站UA统计
/**域名包含zbj.com, 但不能包含devzbj.com**/
(function() {
    var uaCode = '';
    var uaDomainName = [];
    var uaHost = location.host;
    if ( uaHost.match('zbj.com')
            && !uaHost.match('devzbj.')
            && !uaHost.match('ipr.')) {

        uaCode = 'UA-2919274-25';
        uaDomainName.push('zhubajie.com');

    } else if( uaHost.match('zhubajie.com') ){

        uaCode = 'UA-2919274-25';
        uaDomainName.push('zbj.com');

    } else if( uaHost.match('zhubiaoju.com') ) {

        uaCode = 'UA-2919274-26';
        uaDomainName.push('ipr.zbj.com');

    } else if( uaHost.match('ipr.zbj.com') ) {

        uaCode = 'UA-2919274-26';
        uaDomainName.push('zhubiaoju.com');

    }

    if( uaCode && uaDomainName.length > 0 ) {
        __ga_new('create', uaCode, {
            'allowLinker': true
        });
        __ga_new('require', 'linker');
        __ga_new('linker:autoLink', uaDomainName );

        __ga_new('send', 'pageview');
    }

})();

//网站GA统计
var _gaq = _gaq || [];
var gaCode = '';
var domainName = '';
var galogUrl = location.protocol +  '//galog.zbj.com/dot.gif?cookieValue=';
var gaHost = location.host;
if ( gaHost.match('zhubajie.com') ) {

    gaCode = 'UA-2919274-4';
    domainName = 'zhubajie.com';

} else if ( gaHost.match('zbj.com')
    && !gaHost.match('devzbj.')
    && !gaHost.match('ipr.')
    && !gaHost.match('tp.') ) {

    gaCode = 'UA-2919274-4';
    domainName = 'zbj.com';

} else if( gaHost.match('tianpeng.com') ) {

    gaCode = 'UA-65153154-1';
    domainName = 'tianpeng.com';

} else if( gaHost.match('tp.zbj.com') ) {

	gaCode = 'UA-65153154-1';
    domainName = 'tp.zbj.com';

} else if( gaHost.match('zhubiaoju.com') ) {

    gaCode = 'UA-2919274-26';
    domainName = 'zhubiaoju.com';

} else if( gaHost.match('ipr.zbj.com') ) {

	gaCode = 'UA-2919274-26';
    domainName = 'ipr.zbj.com';

} else {
    gaCode = 'UA-45159514-2';
    domainName = 'zhubajie.la';
    galogUrl = 'http://ga.log.zbj.la/dot.gif?cookieValue=';
}

_gaq.push(['_setAccount', gaCode]);
_gaq.push(['_setDomainName', domainName]);
_gaq.push(['_setLocalGifPath', galogUrl + cookieValue],['_setLocalRemoteServerMode']);

_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

/**
    描述：判断页面来源，当从BOSS数据系统跳转到抢帮首页时候，
        动态添加统计各个链接点击量的js文件
    author：baizhanning
    time：2015-09-28
*/
var docReferrer = document.referrer;
var DATA_URL = 'http://data.zbj.com:3000/';
var DATA_JS_URL = 'http://data.zbj.com:67/dataMonitor/click/clickdata.js';

/**
    动态加载JS文件
**/
function dynamicLoadJs(url, callback) {
    var script = document.createElement('script');
    script.src = url;
    callback = callback || function() {};
    script.onload = script.onreadystatechange = function() {
        if(!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
            callback();
            this.onload = this.onreadystatechange = null;
            this.parentNode.removeChild(this);
        }
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}

/**
    加载clickdata.js
 */
function loadClickDataJs() {
    dynamicLoadJs(DATA_JS_URL, function() {
        //1 定义方法获取location.href中type的值
        var getRquestType = function(type) {
            var reg = new RegExp("(^|&)" + type + "=([^&]*?)(&|$)");
            var searchPrams = window.location.search.substr(1).match(reg);
            if(null !== searchPrams) {
                return decodeURI(searchPrams[2]);
            } else {
                //如果location.href中type的值为空，则获取document.referrer中boss_data_type的值
                var refReg = new RegExp('boss_data_type=([^&]*?)(&|$)');
                var refParams = document.referrer.match(refReg);
                if(null !== refParams) {
                    return decodeURI(refParams[1]);
                }
            }
            return null;
        }

        //2 从URL中获取boss_data_type的值后
        var hrefType = getRquestType('boss_data_type');

        //3 给div设置bossDataHrefType属性，存放boss_data_type的值
        var pageDiv = document.getElementById('page-href-type');
        if(null !== pageDiv) {
            pageDiv.setAttribute('bossDataHrefType', hrefType);
        }
    })
}

if(docReferrer === DATA_URL || docReferrer.indexOf('boss_data_type') > -1) {
    //1 判断是否引入了jquery
    if(typeof jQuery === 'undefined' || typeof $ === 'undefined') {
        //2 动态加载JS文件
        dynamicLoadJs('http://data.zbj.com:67/dataMonitor/click/jquery.js', function() {
            //3 jquery加载完以后，再动态加载clickdata.js文件
            loadClickDataJs();
        })
    } else {
        //jquery已经加载过了，则直接加载clickdata.js文件
        loadClickDataJs();
    }
}

/**点击，性能及JS报错日志收集**/

var CollectingInterface = function(params) {
    this.BASE_LOG_URL = '//clicklog.zbj.com?';
    this.params = params;
}

CollectingInterface.prototype = {
    constructor: CollectingInterface,
    getCookieByName: function(name) {
        var reg= new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        var arr = document.cookie.match(reg);
        if( arr && arr.length > 2 ) {
            return decodeURI(arr[2]);
        }
        return null;
    },
    /**
        封装基础数据
    */
    getBaseParams: function() {
        var baseParams = {
            uniqid: this.getCookieByName('uniqid'),
            utmz: this.getCookieByName('__utmz'),
            time: Date.now ? Date.now() : +new Date(),
            page: document.location.href,
            pagefrom: document.referrer,
            //默认类型为click
            t: 'click'
        }

        return baseParams;
    },

    /**
        为了解决跨域采集数据问题，采用Image Ping方式
    */
    sendRequestByImg: function(url) {
        var img = new Image();
        img.onload = img.onerror = function() {
            img = null;
        }
        img.src = url;
    },

    /**
        将查询参数添加到URL后面
    */
    buildLogUrl: function(queryData) {
        if(!queryData) {
            return;
        }
        var queryArr = [];
        for(var data in queryData) {
            queryArr.push(data + '=' + queryData[data]);
        }

        if(queryArr.length > 0) {
            return this.BASE_LOG_URL + queryArr.join('&');
        }
        return this.BASE_LOG_URL;
    },
    getBaseParamsUrl: function() {
    	var queryParams = $.extend({}, this.getBaseParams(), this.params);
        var url = this.buildLogUrl(queryParams);
        return url;
    },
    collectDataByParams: function() {
        var url = this.getBaseParamsUrl();
        this.sendRequestByImg(url);
    }
};

/**
    数据采集接口
*/
window.DataInterface = {
    collectData: function(params){
        var cInterface = new CollectingInterface(params);
        cInterface.collectDataByParams();
    },
    getRequestUrl: function(params) {
    	var cInterface = new CollectingInterface(params);
    	return cInterface.getBaseParamsUrl();
    }
};

//触发自定义事件onDataInterface
window.$ && $(window).trigger('onDataInterface');