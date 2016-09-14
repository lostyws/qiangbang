!
function(e) {
    "use strict";
    var t = document,
    n = "querySelectorAll",
    i = "getElementsByClassName",
    a = function(e) {
        return t[n](e)
    };
    document.head.appendChild(function() {
        var e = t.createElement("link");
        return e.href = "/view/staticwap/css/widget/layer.css",
        e.type = "text/css",
        e.rel = "styleSheet",
        e.id = "layermcss",
        e
    } ());
    var r = {
        type: 0,
        shade: !0,
        shadeClose: !0,
        fixed: !0,
        anim: !0
    };
    e.ready = {
        extend: function(e) {
            var t = JSON.parse(JSON.stringify(r));
            for (var n in e) t[n] = e[n];
            return t
        },
        timer: {},
        end: {}
    };
    var o = 0,
    s = ["layermbox"],
    d = function(e) {
        var t = this;
        t.config = ready.extend(e),
        t.view()
    };
    d.prototype.view = function() {
        var e = this,
        n = e.config,
        r = t.createElement("div");
        e.id = r.id = s[0] + o,
        r.setAttribute("class", s[0] + " " + s[0] + (n.type || 0)),
        r.setAttribute("index", o);
        var d = function() {
            var e = "object" == typeof n.title;
            return n.title ? '<h3 style="' + (e ? n.title[1] : "") + '">' + (e ? n.title[0] : n.title) + '</h3><button class="layermend"></button>': ""
        } (),
        c = function() {
            var e, t = (n.btn || []).length;
            return 0 !== t && n.btn ? (e = '<span type="1">' + n.btn[0] + "</span>", 2 === t && (e = '<span type="0">' + n.btn[1] + "</span>" + e), '<div class="layermbtn">' + e + "</div>") : ""
        } ();
        if (n.fixed || (n.top = n.hasOwnProperty("top") ? n.top: 100, n.style = n.style || "", n.style += " top:" + (t.body.scrollTop + n.top) + "px"), 2 === n.type && (n.content = '<i></i><i class="laymloadtwo"></i><i></i><div>' + (n.content || "") + "</div>"), r.innerHTML = (n.shade ? '<div class="laymshade"></div>': "") + '<div class="layermmain" ' + (n.fixed ? "": 'style="position:static;"') + '><div class="section"><div class="layermchild ' + (n.type || n.shade ? "": "layermborder ") + (n.anim ? "layermanim": "") + '" ' + (n.style ? 'style="' + n.style + '"': "") + ">" + d + '<div class="layermcont">' + n.content + "</div>" + c + "</div></div></div>", !n.type || 2 === n.type) {
            var y = t[i](s[0] + n.type),
            u = y.length;
            u >= 1 && l.close(y[0].getAttribute("index"))
        }
        document.body.appendChild(r);
        var m = e.elem = a("#" + e.id)[0];
        setTimeout(function() {
            try {
                m.className = m.className + " layermshow"
            } catch(e) {
                return
            }
            n.success && n.success(m)
        },
        1),
        e.index = o++,
        e.action(n, m)
    },
    d.prototype.action = function(e, t) {
        var n = this;
        if (e.time && (ready.timer[n.index] = setTimeout(function() {
            l.close(n.index)
        },
        1e3 * e.time)), e.title && (t[i]("layermend")[0].onclick = function() {
            e.cancel && e.cancel(),
            l.close(n.index)
        }), e.btn) for (var a = t[i]("layermbtn")[0].children, r = a.length, o = 0; r > o; o++) a[o].onclick = function() {
            var t = this.getAttribute("type");
            0 == t ? (e.no && e.no(), l.close(n.index)) : e.yes ? e.yes(n.index) : l.close(n.index)
        };
        if (e.shade && e.shadeClose) {
            var s = t[i]("laymshade")[0];
            s.onclick = function() {
                l.close(n.index, e.end)
            },
            s.ontouchmove = function() {
                l.close(n.index, e.end)
            }
        }
        e.end && (ready.end[n.index] = e.end)
    };
    var l = {
        v: "1.2",
        index: o,
        open: function(e) {
            var t = new d(e || {});
            return t.index
        },
        close: function(e) {
            var n = a("#" + s[0] + e)[0];
            n && (n.innerHTML = "", t.body.removeChild(n), clearTimeout(ready.timer[e]), delete ready.timer[e], "function" == typeof ready.end[e] && ready.end[e](), delete ready.end[e])
        },
        closeAll: function() {
            for (var e = t[i](s[0]), n = 0, a = e.length; a > n; n++) l.close(e[n].getAttribute("index"))
        }
    };
    "function" == typeof define ? define("layer.m", [],
    function() {
        return l
    }) : e.layer = l
} (window);