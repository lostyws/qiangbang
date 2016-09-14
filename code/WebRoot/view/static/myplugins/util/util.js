window.util = {
    prompt: function(args) {
        var opts = {
            type: "fail",
            text: "操作失败",
            time: 2e3
        };
        $.extend(opts, args);
        var type_class = "prompt-box-text";
        if (opts.type == "fail") {
            type_class = "prompt-box-text prompt-box-error";
        }
        var h = '<div class="prompt-box-wrap"><div class="prompt-box-black"></div><div class="' + type_class + '"><span></span>' + opts.text + "</div></div>";
        if ($(".prompt-box-wrap").length) {
            $(".prompt-box-wrap").remove();
        }
        $("body").append(h);
        window.setTimeout(function() {
            $(".prompt-box-wrap").hide();
            if (opts.callback) {
                opts.callback();
            }
            // opts.callback && opts.callback();
        }, opts.time);
    },
    getUrlParam: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return decodeURI(r[2]);
        return null;
    },
    loading: {
        node: $('<div class="spinner-overlay"></div><div class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>'),
        show: function() {
            $('body').append(this.node);
        },
        hide: function() {
            this.node.remove();
        }
    },
    /**
     * Function formatMoney 数值转或货币格式
     *  -@param {Number} number 要转换的数值
     *  -@param {Number} places 保留小数点位数
     *  -@param {String} symbol 货币符号
     *  -@param {String} thousand 间隔符
     *  -@param {String} decimal 小数位符号
     * Return {String}
     */
    formatMoney: function(number, places, symbol, thousand, decimal) {
        number = number || 0;
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "$";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var negative = number < 0 ? "-" : "",
            i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    },
    // 两个浮点数求和
    accAdd: function(num1, num2) {
        var r1, r2, m;
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        // return (num1*m+num2*m)/m;
        return Math.round(num1 * m + num2 * m) / m;
    },

    // 两个浮点数相减
    accSub: function(num1, num2) {
        var r1, r2, m;
        if(isNaN(num1)) {
            num1 = 0;
        }
        if(isNaN(num2)) {
            num2 = 0;
        }
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
    },
    // 两数相除
    accDiv: function(num1, num2) {
        var t1, t2, r1, r2;
        try {
            t1 = num1.toString().split('.')[1].length;
        } catch (e) {
            t1 = 0;
        }
        try {
            t2 = num2.toString().split(".")[1].length;
        } catch (e) {
            t2 = 0;
        }
        r1 = Number(num1.toString().replace(".", ""));
        r2 = Number(num2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },
    //两个相乘
    accMul: function(num1, num2) {
        var m = 0,
            s1 = num1.toString(),
            s2 = num2.toString();
        try {
            m += s1.split(".")[1].length;
        } catch (e) {}
        try {
            m += s2.split(".")[1].length;
        } catch (e) {}
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    /**
     * formFromJSON
     * form表单对象转json
     */
    formToJSON: function(form) {
        form = $(form);
        if (form.length !== 1) return false;

        // Form data
        var formData = {};

        // Skip input types
        var skipTypes = ['submit', 'image', 'button', 'file'];
        var skipNames = [];
        form.find('input, select, textarea').each(function() {
            var input = $(this);
            var name = input.attr('name');
            var type = input.attr('type');
            var tag = this.nodeName.toLowerCase();
            if (skipTypes.indexOf(type) >= 0) return;
            if (skipNames.indexOf(name) >= 0 || !name) return;
            if (tag === 'select' && input.prop('multiple')) {
                skipNames.push(name);
                formData[name] = [];
                form.find('select[name="' + name + '"] option').each(function() {
                    if (this.selected) formData[name].push(this.value);
                });
            } else {
                switch (type) {
                    case 'checkbox':
                        skipNames.push(name);
                        formData[name] = [];
                        form.find('input[name="' + name + '"]').each(function() {
                            if (this.checked) formData[name].push(this.value);
                        });
                        break;
                    case 'radio':
                        skipNames.push(name);
                        form.find('input[name="' + name + '"]').each(function() {
                            if (this.checked) formData[name] = this.value;
                        });
                        break;
                    default:
                        formData[name] = input.val();
                        break;
                }
            }

        });
        form.trigger('formToJSON', {
            formData: formData
        });

        return formData;
    },
    parseHtml: function() {
        // console.log(this);
        // return;
        this.REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;

        this.REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;

        this.REGX_TRIM = /(^\s*)|(\s*$)/g;

        this.HTML_DECODE = {
            "&lt;": "<",
            "&gt;": ">",
            "&amp;": "&",
            "&nbsp;": " ",
            "&quot;": "\"",
            "&copy;": ""

            // Add more
        };

        this.encodeHtml = function(s) {
            s = (s !== undefined) ? s : this.toString();
            return (typeof s != "string") ? s :
                s.replace(this.REGX_HTML_ENCODE,
                    function($0) {
                        var c = $0.charCodeAt(0),
                            r = ["&#"];
                        c = (c == 0x20) ? 0xA0 : c;
                        r.push(c);
                        r.push(";");
                        return r.join("");
                    });
        };

        this.decodeHtml = function(s) {
            var HTML_DECODE = this.HTML_DECODE;

            s = (s !== undefined) ? s : this.toString();
            return (typeof s != "string") ? s :
                s.replace(this.REGX_HTML_DECODE,
                    function($0, $1) {
                        var c = HTML_DECODE[$0];
                        if (c === undefined) {
                            // Maybe is Entity Number
                            if (!isNaN($1)) {
                                c = String.fromCharCode(($1 == 160) ? 32 : $1);
                            } else {
                                c = $0;
                            }
                        }
                        return c;
                    });
        };

        this.trim = function(s) {
            s = (s !== undefined) ? s : this.toString();
            return (typeof s != "string") ? s :
                s.replace(this.REGX_TRIM, "");
        };


        this.hashCode = function() {
            var hash = this.__hash__,
                _char;
            if (hash === undefined || hash === 0) {
                hash = 0;
                for (var i = 0, len = this.length; i < len; i++) {
                    _char = this.charCodeAt(i);
                    hash = 31 * hash + _char;
                    hash = hash & hash; // Convert to 32bit integer
                }
                hash = hash & 0x7fffffff;
            }
            this.__hash__ = hash;

            return this.__hash__;
        };
    },
    /**
     * [CtoH 输入内容全角转半角]
     * @param {[type string]} str [输入字符串]
     */
    CtoH: function(str) {　　
        var result = '';　　
        for (var i = 0; i < str.length; i++) {　　　
            if (str.charCodeAt(i) == 12288) {　　　　
                result += String.fromCharCode(str.charCodeAt(i) - 12256);　　　　
                continue;　　　
            }　　　
            if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) result += String.fromCharCode(str.charCodeAt(i) - 65248);　　　
            else result += String.fromCharCode(str.charCodeAt(i));　　
        }
        return result;
    }
};
