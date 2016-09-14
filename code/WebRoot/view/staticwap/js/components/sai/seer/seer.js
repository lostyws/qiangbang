
(function(global){

    if(global.Sai){return;}

    var M = global.Sai = {};
    M._DATAS = [];


    var EVENTS = M._EVENTS = [];
    M.on = function(evt, handler){
        EVENTS.push([evt, handler]);
    };
    M.off = function(){};


    var DEFAULT_PROFILE = "log";

    // 通用监控接口。
    // @param {Object,String} seed, 监控信息详情。
    // @param {String} profile, 监控类型，默认为 `log`。
    // @return {Object}
    M.log = function(seed, profile){
        if(!seed){return;}

        // 取消老版产品监控。
        if(arguments.length >= 3){return;}

        var data;
        if(Object.prototype.toString.call(seed) === "[object Object]"){
            data = seed;
            data.profile = profile || data.profile || DEFAULT_PROFILE;
        }else{
            data = {
                profile: profile || DEFAULT_PROFILE,
                seed: seed
            };
        }
        M._DATAS.push(data);
        return data;
    };

})(this);


(function(global, Sai){

    if(!Sai){return;}

    var DEFAULT_PROFILE = "jserror";
    var MAX_STACKTRACE_DEEP = 5;
    var RE_FUNCTION = /^\s*function\b[^\)]+\)/;

    var lost_resources = [];
    var lost_resources_cache = {};

    // 客户端资源加载失败时调用这个接口。
    Sai.lost = function(uri){
        if(lost_resources_cache.hasOwnProperty(uri)){return;}
        lost_resources_cache[uri] = true;

        lost_resources.push(uri);
        return lost_resources;
    };

    // 获得函数名。
    // @param {Function} func, 函数对象。
    // @return {String} 函数名。
    function function_name(func){
        var match = String(func).match(RE_FUNCTION);
        return match ? match[0] : "global";
    }

    // 函数调用堆栈。
    // @param {Function} call, function's caller.
    // @return {String} stack trace.
    function stacktrace(call){
        var stack = [];
        var deep = 0;

        while(call.arguments && call.arguments.callee && call.arguments.callee.caller){

            call = call.arguments.callee.caller;
            stack.push("at " + function_name(call));

            // Because of a bug in Navigator 4.0, we need this line to break.
            // c.caller will equal a rather than null when we reach the end
            // of the stack. The following line works around this.
            if (call.caller === call){break;}

            if((deep++) > MAX_STACKTRACE_DEEP){break;}
        }
        return stack.join("\n");
    }

    // 用于缓存识别同一个异常。
    var ERROR_CACHE = {};

    // JavaScript 异常统一处理函数。
    // @param {String} catchType, 捕获异常的类型。
    // @param {String} message, 异常消息。
    // @param {String} file, 异常所在文件。
    // @param {Number} line, 异常所在行。
    // @param {Number,String} number, 异常编码，IE 支持。
    // @return {Object} 主要用于单元测试，本身可以不返回。
    function error(catchType, message, file, line, column, number, stack){
        if(!stack && arguments.callee.caller){
            stack = stacktrace(arguments.callee.caller);
        }

        var data = {
            t: DEFAULT_PROFILE,
            area: catchType,
            msg: message || "",
            file: file || "",
            line: line || 0,
            col: column || 0,
            num: number || "",
            stack: stack || "",
            lang: navigator.language || navigator.browserLanguage || "",
            lost: lost_resources.join(",")
        };

        var key = file + ":" + line + ":" + message;
        if(!ERROR_CACHE.hasOwnProperty(key)){
            data.uv = 1;
            ERROR_CACHE[key] = true;
        }

        return Sai.log(data);
    }


    // JavaScript 异常接口，用于监控 `try/catch` 中被捕获的异常。
    // @param {Error} err, JavaScript 异常对象。
    // @return {Object} 主要用于单元测试。
    Sai.error = function(ex){
        if(!(ex instanceof Error)){return;}

        return error(
            "catched",
            ex.message || ex.description,
            ex.filename || ex.fileName || ex.sourceURL,
            ex.lineno || ex.lineNumber || ex.line,
            ex.colno || ex.columnNumber,
            ex.number,
            ex.stack || ex.stacktrace
        );
    };

    // 全局 JavaScript 异常监控。
    // @return {Boolean} 返回 `true` 则捕获异常，浏览器控制台不显示异常信息。
    //                   返回 `false` 则不捕获异常，浏览器控制台显示异常信息。
    //                   建议返回 `false`。
    global.onerror = function(message, file, line, column) {
        error("global", message, file, line, column);
        return false;
    };

})(this, this.Sai);

(function(global,Sai){
    /*
    *  依赖页面部署时间点分别在head,fistscreen,domend,loaded:
    *  MonitorHD.sh
    *  MonitorHD.sf
    *  MonitorHD.sd
    *  MonitorHD.sl
    *  未部署返回计时初步返回0
    * */
    if(!Sai){return;}
    var DEFAULT_PROFILE = "pagespeed";
    window.onload = function(){
        MonitorHD.sl = +new Date;

        var sImg = MonitorHD.getFirstSImg;
        var sh = document.documentElement.clientHeight;
        var sfArr = [];
        var fcursor = 0;

        function getTop(e){
            var offset=e.offsetTop;
            if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
            return offset;
        }

        for(var i=0;sImg && i < sImg.length; i++){
            var itemImg = sImg[i].img,
                itemTime = sImg[i].time,
                itemTop = getTop(itemImg) || 0;
            if(itemTop > 0 && itemTop < sh){
                sfArr[fcursor] = itemTime ? itemTime : 0;
                fcursor++;
            }
        }

        if(sfArr.length > 0){
            MonitorHD.sf = Math.max.apply({},sfArr);
        }else{
            MonitorHD.sf = NaN;
        }

        var ht = (MonitorHD.sh - MonitorHD.r) || 0,
            fs = (MonitorHD.sf - MonitorHD.r) || 0,
            drt = (MonitorHD.sd - MonitorHD.r) || 0,
            lt = (MonitorHD.sl - MonitorHD.r) || 0,
            browseNum = 0;

        if(!fs){
            fs = drt;
        }

        function _uaMatch(ua) {
            var rchrome = /(chrome)\/(\d+\.\d)/,
                rsafari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/,
                ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                rmsie = /(msie) ([\w.]+)/,
                rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
                ua = ua.toLowerCase()
            var match = rchrome.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
            if (rsafari.test(ua) && !/chrome/.test(ua)) {
                match[1] = "safari";
                match[2] = RegExp["$1"] || RegExp["$2"]
            }
            return {
                browser: match[1] || "unknown",
                version: match[2] || "0"
            }
        }

        function _browser() {
            var b = _uaMatch(navigator.userAgent);
            var browser = b.browser;
            if (browser == "msie") {
                if (document.documentMode) {
                    if (window.performance) {
                        browser += "9.0";
                    } else {
                        browser += "8.0";
                    }
                } else {
                    browser += b.version
                }
            }
            var map = {
                "msie6.0": 16,
                "msie7.0": 17,
                "msie8.0": 18,
                "msie9.0": 19,
                chrome: 20,
                mozilla: 30,
                safari: 40,
                opera: 50
            };
            browseNum = map[browser] || 0;
        }


        function speedLog(){
            _browser();
            var data = {
                t: DEFAULT_PROFILE,
                ht: ht,
                fs: fs,
                drt: drt,
                lt: lt,
                browser: browseNum,
                product: monitorConfig.product
            }
            return Sai.log(data);
        }

        speedLog();
    }
})(this,this.Sai);

/*启用监控*/
(function(window){
    // 随机采样命中算法。
    // @param {Nuber} rate, 采样率，[0,1] 区间的数值。
    // @return {Boolean}
    function hit(rate){
        return 0 === Math.floor(Math.random() / rate);
    };
    // 命中率：[0,1]: 实际对应采样率：[0%,100%]
    var rate = 1;
    if(!hit(rate)){return;}
    seajs.use("components/sai/sai", function(Sai){});
})(this);