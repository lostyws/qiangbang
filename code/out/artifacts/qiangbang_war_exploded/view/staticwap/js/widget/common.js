define("common", ["zepto", "underscore", "components/refer-statistics/refer-statistics", "components/log/log", "cookie", "weixin"],
function(t, e, n) {
    function o(t) {
        var t = t || a("body").width();
        if (s.get("canWebP")) window.canWebP = "true" == s.get("canWebP") ? !0 : !1,
        i(t);
        else {
            var e = new Image;
            e.onload = function() {
                s.set("canWebP", "true", {
                    path: "/"
                }),
                window.canWebP = !0,
                i(t)
            },
            e.onerror = function() {
                s.set("canWebP", "false", {
                    path: "/"
                }),
                window.canWebP = !1,
                i(t)
            },
            e.src = ""
        }
    }
    function i(t) {
        var e = a("img[data-original]");
        if (canWebP) e.each(function() {
            var t = a(this);
            t.data("original").match("//rms.") ? t.attr("src", t.data("original") + "&a.format=webp") : t.attr("src", t.data("original") + "?imageMogr2/format/webp")
        });
        else {
            var n = "?imageView2/2/w/" + t;
            e.each(function() {
                var e = a(this);
                e.data("original").match("//rms.") ? e.attr("src", e.data("original") + "&a.w=" + t) : e.attr("src", e.data("original") + n)
            })
        }
    }
    var a = t("zepto"),
    r = t("underscore"),
    s = t("cookie"),
    c = (t("weixin"), t("components/refer-statistics/refer-statistics"));
    c.init({
        env: "mobile",
        domain: "zbj.com"
    });
    var l = t("components/log/log");
    a(document.body).delegate("[data-linkid]", "click",
    function() {
        if (this.getAttribute("data-linkid")) {
            var t = a(this),
            e = t.data();
            e = a.extend({},
            e, {
                t: "click"
            }),
            l.sendLog(e)
        }
    });
    var d = document.body,
    u = (document.documentElement, navigator.userAgent),
    p = "vertival-middle",
    h = "vertival-center",
    f = (window.localStorage, a("#animationTips span")),
    m = !0;
    a(".btn_back").on("click",
    function() {
        window.location.href.indexOf("utm_source=baidu") >= 0 ? window.location.href = window.frontEndHost: window.history.go( - 1)
    });
    var g;
    a(".idx-footer .idx-pc").on("touchstart",
    function() {
        s.get("doNotBackToMobileWeb") || (g = location.host.match("zbj.com") ? ".zbj.com": location.host.match("zhubajie.com") ? ".zhubajie.com": location.host.match("zbjdev.com") ? ".zbjdev.com": ".zbj.com", s.set("doNotBackToMobileWeb", "yes", {
            path: "/",
            domain: g
        }))
    }),
    !
    function() {
        a(".nav .more-action").on("click",
        function() {
            a(".nav-menu").toggleClass("active")
        }),
        a(".bottom-nav .nav-button").on("click",
        function(t) {
            t.stopPropagation(),
            a(".nav-group").toggleClass("active"),
            a(".nav-item").toggleClass("animated tada")
        }),
        a(".nav-item").on("touchend",
        function(t) {
            t.stopPropagation()
        }),
        a("body").on("touchend",
        function(t) {
            a(t.target).hasClass("nav-button") || (a(".nav-group").removeClass("active"), a(".nav-item").removeClass("animated tada"))
        })
    } (),
    a("#search-href").length > 0 && a("#search-href").attr("href", "/search/searchbykey?keyword=" + encodeURIComponent(a("#search-href").attr("href").split("keyword=")[1])),
    a("#ft-search").on("click",
    function() {
        var t = encodeURIComponent(a("#ft-keywords").val());
        t && (location.href = "/search/searchbykey?keyword=" + t)
    }),
    a("body").on("touchstart", ".btn-press-down",
    function() {
        a(".btn-press-down").removeClass("active"),
        a(this).addClass("active")
    }).on("touchstart", ".click",
    function() {
        a(".click").removeClass("click-show"),
        a(this).addClass("click-show")
    }),
    a("body").on("touchend",
    function() {
        a(".btn-press-down").removeClass("active"),
        a(".click-show").removeClass("click-show")
    }),
    navigator.userAgent.toLowerCase().match("zbj") && (a(".as-extend.top-bar,.as-extend.top-bar-help-btn").remove(), a(".mobile-page").css({
        "padding-top": "0"
    })),
    (navigator.userAgent.toLowerCase().match("baiduboxapp") || navigator.userAgent.toLowerCase().match("360") || navigator.userAgent.toLowerCase().match("samsung") || navigator.userAgent.toLowerCase().match("huawei") || navigator.userAgent.toLowerCase().match("vivo")) && a(".model-one,.model-four,.model-three").addClass("baiduApp"),
    window.getCookie = function(t) {
        var e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
        return null != e ? unescape(e[2]) : null
    },
    window.setCookie = function(t) {
        var e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
        return null != e ? unescape(e[2]) : null
    },
    o(),
    n.exports = {
        interpolation: function(t, e) {
            var n, o, i, a, r, s, c, l = /\{\{.*?\}\}/gi,
            d = /^\{\{(.*)\}\}$/,
            u = e,
            p = t.match(l);
            for (a = 0, s = p.length; s > a; a++) {
                if (e = u, n = p[a].match(d)[1], o = n.split("."), o.length > 1) for (r = 0, c = o.length; c > r; r++) i = e[o[r]],
                e = i;
                else i = e[o[0]];
                t = t.replace(new RegExp("{{" + n + "}}", "gi"), i)
            }
            return t
        },
        throttle: function(t, e, n) {
            var o, i, a, r = null,
            s = 0;
            n || (n = {});
            var c = function() {
                s = n.leading === !1 ? 0 : +new Date,
                r = null,
                a = t.apply(o, i),
                r || (o = i = null)
            };
            return setTimeout(function() {
                var l = +new Date;
                s || n.leading !== !1 || (s = l);
                var d = e - (l - s);
                return o = this,
                i = arguments,
                0 >= d || d > e ? (clearTimeout(r), r = null, s = l, a = t.apply(o, i), r || (o = i = null)) : r || n.trailing === !1 || (r = setTimeout(c, d)),
                a
            },
            500),
            function() {
                var l = +new Date;
                s || n.leading !== !1 || (s = l);
                var d = e - (l - s);
                return o = this,
                i = arguments,
                0 >= d || d > e ? (clearTimeout(r), r = null, s = l, a = t.apply(o, i), r || (o = i = null)) : r || n.trailing === !1 || (r = setTimeout(c, d)),
                a
            }
        },
        fixedTop: function() {
            var t = document.body.scrollTop || d.scrollTop,
            e = a(".main-content .scrollTopFix");
            if (0 != a(".main-content").length) {
                var n = a(".main-content").offset().top;
                t >= n ? e.addClass("fixTop") : e.removeClass("fixTop")
            }
        },
        textLimit: function(t, e, n) {
            t.each(function() {
                var t = a(this);
                if (t.length > 0) {
                    var o = t.width() - parseInt(t.css("padding-left")) - parseInt(t.css("padding-right")),
                    i = parseInt(o / n) * e - 2;
                    t.text().length > i && t.text(t.text().slice(0, i) + "...")
                }
            })
        },
        changeImgStatus: function(t, e) {
            var n = new Image;
            n.onload = function() {
                this.width && (t.closest("div").addClass(this.width > this.height ? p: h), t.attr("src", e))
            },
            n.src = e
        },
        changeImgDefault: function(t, e) {
            var n = new Image;
            n.onload = function() {
                this.width && (t.attr("src", e), t.removeAttr("data-image"))
            },
            n.src = e
        },
        verifyYzm: function(t) {
            return /^\d{6}$/.test(t) ? !0 : !1
        },
        checkMobileStyle: function(t) {
            var e = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
            return e.test(t) ? !0 : !1
        },
        checkFormPrice: function(t, e) {
            var o = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
            return o.test(t.val()) ? !0 : (n.exports.animationTips(), f.html("请输入正确的" + e + "！"), !1)
        },
        animationTips: function() {
            a("#animationTips").removeClass().addClass("animationTips fadeInUpBig").one("webkitTransitionEnd Transitionend",
            function() {
                a(this).addClass("fadeOut").one("webkitTransitionEnd Transitionend",
                function() {
                    a(this).removeClass("fadeInUpBig fadeOut")
                })
            })
        },
        animaTips: function(t) {
            var e = '<div id="animationTips" class="animationTips"><span>' + t + "</span></div>";
            m && (a("body").append(e), m = !1, a("#animationTips").one("webkitTransitionEnd Transitionend",
            function() {
                a(this).addClass("fadeOut").one("webkitTransitionEnd Transitionend",
                function() {
                    a(".animationTips").remove(),
                    m = !0
                })
            }), setTimeout(function() {
                a("#animationTips").addClass("fadeInUpBig")
            },
            100))
        },
        queryMustDom: function() {
            var t = a(".need-must");
            r.some(t,
            function(t) {
                return "" == a(t).val()
            }) ? a("#btnFav").addClass("disabled") : a("#btnFav").removeClass("disabled")
        },
        submitState: function() {
            n.exports.queryMustDom(),
            a("body").on("keyup input click change", ".need-must,.category-list",
            function() {
                n.exports.queryMustDom()
            })
        },
        isPC: function() {
            for (var t = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"), e = !0, n = 0; n < t.length; n++) if (u.indexOf(t[n]) > 0) {
                e = !1;
                break
            }
            return e
        },
        getPar: function(t) {
            var e = document.location.href,
            n = e.indexOf(t + "=");
            if ( - 1 == n) return ! 1;
            var o = e.slice(t.length + n + 1),
            i = o.indexOf("&");
            return - 1 != i && (o = o.slice(0, i)),
            o
        },
        cookie: {
            set: function(t, e, n, o) {
                var i = 30,
                a = new Date;
                a.setTime(a.getTime() + 24 * i * 60 * 60 * 1e3),
                document.cookie = t + "=" + escape(e) + ";expires=Session;domain=" + n + "path=" + o
            },
            get: function(t) {
                var e, n = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
                return (e = document.cookie.match(n)) ? unescape(e[2]) : null
            },
            del: function(t) {
                var e = new Date;
                e.setTime(e.getTime() - 1);
                var n = this.get(t);
                null != n && (document.cookie = t + "=" + n + ";expires=" + e.toGMTString())
            }
        },
        downApp: function() {
            a(".downApp").on("click",
            function() {
                window.location.href = "http://" + window.appURL
            })
        },
        contentSlideDown: function(t, e, n) {
            var o = t.parent();
            t.height("auto");
            var i = t.height();
            e.length > 0 && (i < Number(n) ? e.addClass("hide") : (t.height(Number(n)), e.removeClass("hide")));
            var r = !1;
            e.off("click").on("click",
            function() {
                var e = a(this);
                e.toggleClass("slideDown"),
                t.toggleClass("slideDown"),
                t.attr("style", ""),
                r ? (t.height(Number(n)), e.find("span").html("详情"), o.hasClass("need-detail-nologin-new") && o.removeClass("need-detail-nologin-new-con")) : (t.height("auto"), e.children("span").html("收起"), o.hasClass("need-detail-nologin-new") && o.addClass("need-detail-nologin-new-con")),
                t.closest(".special-activities").length > 0 && (t.hasClass("slideDown") ? t.height("auto") : t.attr("style", "")),
                r = !r
            })
        },
        osDetect: function() {
            a(document).ready(function() {
                var t = {
                    versions: function() {
                        {
                            var t = navigator.userAgent;
                            navigator.appVersion
                        }
                        return {
                            trident: t.indexOf("Trident") > -1,
                            presto: t.indexOf("Presto") > -1,
                            webKit: t.indexOf("AppleWebKit") > -1,
                            gecko: t.indexOf("Gecko") > -1 && -1 == t.indexOf("KHTML"),
                            mobile: !!t.match(/AppleWebKit.*Mobile.*/),
                            ios: !!t.match(/\(iP[^;]+;( U;)? CPU.+Mac OS X/),
                            android: t.indexOf("Android") > -1 || t.indexOf("Linux") > -1,
                            iPhone: t.indexOf("iPhone") > -1,
                            iPad: t.indexOf("iPad") > -1,
                            webApp: -1 == t.indexOf("Safari")
                        }
                    } (),
                    language: (navigator.browserLanguage || navigator.language).toLowerCase()
                };
                a("body").on("touchstart", ".downApp",
                function(e) {
                    e.preventDefault(),
                    window.location.href = t.versions.ios ? "https://itunes.apple.com/cn/app/zhu-ba-jie-wei-ke-gai-bian/id597101749?ls=1&amp;mt=8": "http://cms.zbjimg.com/zbjmobile/appzhubajie/zhubajie_bz.apk"
                })
            })
        },
        plantformNum: function(t, e, n, o, i, r) {
            function s(t, e, n) {
                function s() {
                    d = setInterval(l, e),
                    u || (p.style.marginTop = parseInt(p.style.marginTop) - 1 + "px")
                }
                function l() {
                    parseInt(p.style.marginTop) % t != 0 ? (p.style.marginTop = parseInt(p.style.marginTop) - 1 + "px", Math.abs(parseInt(p.style.marginTop)) >= p.scrollHeight / 2 && (p.style.marginTop = 0)) : (clearInterval(d), setTimeout(s, n))
                }
                var d, u = !1,
                p = document.getElementById("marqueebox");
                p.innerHTML += p.innerHTML,
                p.style.marginTop = 0,
                p.style.opacity = 1,
                p.onmouseover = function() {
                    u = !0
                },
                p.onmouseout = function() {
                    u = !1
                },
                setTimeout(s, n),
                a.getJSON(URL,
                function(t) {
                    o.html(c(t.all.task_num)),
                    i.html(c(t.all.auth_talent_num)),
                    r.html(c(t.all.task_amount))
                })
            }
            var c = (a(".platform-number").attr("data-url"),
            function(t) {
                return t.toString().replace(/\B(?=((\d{3})+)$)/g, ",")
            });
            s(t, e, n)
        },
        tapEvent: function(t, e) {
            a("body").on("touchstart", t,
            function(t) {
                ex = t.originalEvent.changedTouches[0].clientX,
                ey = t.originalEvent.changedTouches[0].clientY
            }).on("touchend", t,
            function(t) {
                Math.abs(ex - t.originalEvent.changedTouches[0].clientX) < 10 && Math.abs(ey - t.originalEvent.changedTouches[0].clientY) < 10 && e()
            })
        },
        trim: function(t) {
            return t.replace(/(^\s*)|(\s*$)/g, "")
        },
        fileSize: function(t) {
            function e(t) {
                return t / 1024 >= 1 && 4 > o ? (o++, parseFloat(arguments.callee(t / 1024)).toFixed(2)) : 0 == o ? parseInt(t) : t.toFixed(2)
            }
            if (isNaN(Number(t))) return console.warn("传入参数不是数字！"),
            t;
            var n = ["byte", "kb", "mb", "gb", "tb"],
            o = 0;
            return e(Number(t)) + n[o]
        },
        formatPrice: function(t) {
            return isNaN(t) ? "": parseFloat(t)
        },
        bindFakeLink: function() {
            var t = {
                5 : "/target/type/5/{$1}",
                6 : "/shop/{$1}",
                21 : "/target/type/21/{$1}",
                22 : "/target/type/22/{$1}",
                23 : "/target/type/23/{$1}",
                24 : "/column/detail/{$1}"
            };
            a("body").delegate("[data-fake-link]", "click",
            function() {
                var e = a(this),
                n = e.data("fake-link"),
                o = e.data("fake-link-type");
                if (n) {
                    var i = t[o];
                    location.href = i ? i.replace("{$1}", n) : n
                }
            })
        },
        bindAdEvent: function() {
            new Swiper(".js-swiper-container", {
                pagination: ".js-swiper-pagination",
                paginationClickable: !0,
                loop: !0,
                autoplay: 2500,
                autoplayDisableOnInteraction: !1
            }),
            new Swiper(".js-swiper-container-6", {
                pagination: ".js-swiper-pagination-6",
                paginationClickable: !0,
                loop: !0,
                autoplay: 2500,
                autoplayDisableOnInteraction: !1
            }),
            new Swiper(".hot-top-scroll", {
                direction: "vertical",
                loop: !0,
                autoplay: 2500,
                autoplayDisableOnInteraction: !1
            })
        },
        getQueryString: function(t) {
            var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
            n = window.location.search.substr(1).match(e);
            return null != n ? unescape(n[2]) : void 0
        },
        getUrlLast: function() {
            var t = window.location.href;
            return t.substring(t.lastIndexOf("/") + 1)
        },
        bindLinkId: function(t) {
            isNaN(parseInt(t)) && (console.warn(t, "传入linkId不是数字！"), t = 100),
            t = parseInt(t);
            var e;
            a("[data-linkid]").each(function() {
                var n = a(this),
                o = n.data("linkid"),
                i = "string" == typeof o && o.indexOf("$1") >= 0,
                r = "string" == typeof o && o.indexOf("$2") >= 0;
                i && (0 == t ? n.removeAttr("data-linkid") : (t++, n.attr("data-linkid", t))),
                r && (0 == t ? n.removeAttr("data-linkid") : (t = e == o ? t: t + 1, n.attr("data-linkid", t), e = o))
            })
        },
        loadImage: function() {
            var t = this;
            a("img[data-original]").each(function() {
                var e = a(this),
                n = e.parent(),
                o = '<div class="ball-clip-rotate-mask"><div class="ball-clip-rotate"><div></div></div></div>';
                n.append(o),
                e.attr("src", e.data("original")),
                t.isLoaded(this,
                function() {
                    a(".ball-clip-rotate-mask", n).remove()
                },
                function() {
                    a(".ball-clip-rotate", n).remove()
                })
            })
        },
        replaceDefaultImage: function() {
            var t = this;
            a("img[data-image]").each(function() {
                var e = a(this);
                t.changeImgDefault(e, e.data("image"))
            })
        },
        isLoaded: function(t, e, n) {
            return "IMG" != t.tagName || "function" != typeof e || "function" != typeof n ? void console.warn("传入参数错误，请检查！img：", t, "loaded:", e, "error:", n) : (t.complete ? e() : t.onload = function() {
                e()
            },
            void a(t).error(n))
        },
        bindGoTop: function() {
            var t = a("#go-top");
            0 == t.length && (a("body").append('<div id="go-top" style="display:none;width: 34px;height: 34px;background: url(/static/image/widget/go-top.png) 0 0/34px 34px no-repeat;position:fixed;right: 10px;bottom: 80px;z-index: 99"></div>'), t = a("#go-top"), t.click(function() {
                var t = a("body"),
                e = t.scrollTop(),
                n = e / 20,
                o = 0,
                i = window.setInterval(function() {
                    return 20 == o ? (t.scrollTop(0), void clearInterval(i)) : (e -= n, t.scrollTop(e), void o++)
                },
                15)
            }), a(window).scroll(function() {
                t.css("display", a(this).scrollTop() > 1500 ? "block": "none")
            }))
        },
        getTimeBetween: function(t, e) {
            var n, o, i, a = new Date(1e3 * parseInt(t)),
            r = new Date(1e3 * parseInt(e)),
            s = {},
            c = a.getTime() - r.getTime();
            return isNaN(c) ? (console.warn("subNum不是数字，请调试！"), s) : 0 > c ? (console.warn("传入end小于start，请检查！end:", t, "start:", e), s) : (s.day = Math.floor(c / 864e5), n = c % 864e5, s.hour = Math.floor(n / 36e5), o = n % 36e5, s.minute = Math.floor(o / 6e4), i = o % 6e4, s.second = Math.round(i / 1e3), s)
        },
        scrollFixTop: function(t, e) { (0 != t.length || e) && (a("body").hasClass("weixin-page") && (e -= 44), a(window).on("scroll",
            function() {
                a(window).scrollTop() + e > t.parent().offset().top ? (t.css({
                    position: "fixed",
                    top: e,
                    width: "100%"
                }), t.css("z-index", 50)) : t.css("position", "static")
            }))
        },
        noBarsOnTouchScreen: function(t) {
            function e(t) {
                var e;
                1 == t.touches.length && (t.stopPropagation(), e = t.touches[0], i = e.pageX, a = e.pageY)
            }
            function n(t) {
                var e;
                1 == t.touches.length && (t.preventDefault(), t.stopPropagation(), e = t.touches[0], this.scrollTop += a - e.pageY, a = e.pageY)
            }
            var o, i, a;
            "ontouchstart" in document.documentElement && (o = document.getElementById(t)) && (o.style.overflow = "hidden", o.ontouchstart = e, o.ontouchmove = n)
        },
        coverDownloadApp: function() {
            var t = a(".cover-download-app"),
            e = t.find(".close"),
            n = t.find(".button");
            s.get("searchPageCoverDownload") ? t.removeClass("current") : t.addClass("current"),
            a(e).on("click",
            function() {
                t.removeClass("current"),
                s.set("searchPageCoverDownload", 1)
            }),
            a(n).on("click",
            function() {
                switch (n.attr("data-download-position")) {
                case "index":
                    location.href = "http://" + window.appURL + "/?fr=qjebzivm&pos=nyqysuij";
                    break;
                case "categoryList":
                    location.href = "http://" + window.appURL + "/?fr=vterchxo&pos=rnckzgzj";
                    break;
                case "searchList":
                    location.href = "http://" + window.appURL + "/?fr=poshsnhl&pos=bzubaxdd";
                    break;
                default:
                    location.href = "http://" + window.appURL
                }
            })
        },
        canwebP: o
    },
    a("#backToTop").size() && a(window).scroll(function() {
        a(window).scrollTop() > 100 ? a("#backToTop").show() : a("#backToTop").hide()
    }),
    a("#backToTop").on("click",
    function() {
        document.body.scrollTop = 0
    }),
    a("body").delegate(".contact-adviser .sure", "click",
    function() {
        window.location.href = "tel:4001886666"
    });
    var v = document.createElement("script");
    v.type = "text/javascript",
    // v.src = "http://t5.zbjimg.com/t5s/output/common/js/count.js?t=" + (new Date).getTime(),
    a("body").append(v),
    function() {
        function t(t, e) {
            var n = t.touches[0].clientX,
            o = t.touches[0].clientY + a(window).scrollTop();
            return r.some(e,
            function(t) {
                var e = a(t),
                i = e.width(),
                r = e.height(),
                s = e.offset().left,
                c = e.offset().top;
                return n > s - 15 && s + i + 15 > n && o > c - 15 && c + r + 15 > o
            })
        }
        var e = ".top-bar",
        n = ".fixed-uc",
        o = "input,textarea",
        i = "absolute",
        s = "fixed";
        if (window.UcIOSFix = {
            fn: {
                createTimer: function() {
                    this._timer = setInterval(function() {
                        this.fix()
                    }.bind(this), 10)
                },
                stopTimer: function() {
                    this._timer && clearInterval(this._timer)
                },
                fix: function() {
                    var t = a(window).scrollTop(),
                    e = a(window).height(),
                    n = a(document.body).height();
                    this.fixedTop.each(function() {
                        a(this).css({
                            position: i,
                            top: t
                        })
                    }),
                    this.fixedBottom.each(function() {
                        a(this).css({
                            position: i,
                            top: t + e - a(this).height()
                        })
                    }),
                    this.fixedLayer.each(function() {
                        var o = a(".laymshade", this),
                        r = a(".layermmain", this),
                        s = {
                            position: i,
                            height: n
                        };
                        a(this).css(s),
                        o.length && o.css(s),
                        r.length && r.css({
                            position: i,
                            top: t,
                            height: e
                        })
                    })
                },
                restore: function() {
                    this.fixedTop.each(function() {
                        a(this).css({
                            position: s,
                            top: 0
                        })
                    }),
                    this.fixedBottom.each(function() {
                        a(this).css({
                            position: s,
                            top: "auto",
                            bottom: 0
                        })
                    })
                },
                stopFix: function() {
                    this.stopTimer(),
                    this.restore()
                }
            },
            init: function(t) {
                var e = a([]);
                return t = t || {},
                t.fixedTop || t.fixedBottom || t.fixedLayer ? (this.fixedTop = t.fixedTop || e, this.fixedBottom = t.fixedBottom || e, this.fixedLayer = t.fixedLayer || e, this.fix(), void this.createTimer()) : void console.error("请配置至少一个需要处理的对象")
            },
            Create: function(t) {
                return this.init.prototype = this.fn,
                new this.init(t)
            }
        },
        navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X.+ucbrowser/i) && !window.UcIOSFixHandled) {
            window.UcIOSFixHandled = !0;
            var c, l = Element.prototype.setAttribute;
            Element.prototype.setAttribute = function(t) {
                var n = a(this);
                "index" === t && n.hasClass("layermbox") && n.children(o) && (c = window.UcIOSFix.Create({
                    fixedTop: a(e),
                    fixedBottom: a(".foot-bar"),
                    fixedLayer: n
                })),
                l.apply(this, arguments)
            };
            var d = Element.prototype.removeChild;
            Element.prototype.removeChild = function(t) {
                var e = a(t);
                "DIV" === t.tagName && e.hasClass("layermbox") && e.children(o) && c && c.stopFix(),
                d.apply(this, arguments)
            },
            a(n).each(function() {
                var n = a(this);
                n.on("touchstart",
                function(i) {
                    var r = a(o, n);
                    if (n.css("position") === s && t(i, r)) {
                        var c = window.UcIOSFix.Create({
                            fixedTop: a(e),
                            fixedBottom: n
                        });
                        a(r).blur(function() {
                            c.stopFix()
                        })
                    }
                },
                !0)
            });
            var u;
            a(o).focus(function() {
                u = window.UcIOSFix.Create({
                    fixedTop: a(e),
                    fixedBottom: a(n)
                })
            }).blur(function() {
                u.stopFix()
            })
        }
    } ()
});