define("refuse-payfor", ["zepto"], function(a, t, e) {
    var c = a("zepto"),
        n = { checkStatus: function(a) { c(a).on("click", function() {
                    var t = c(this),
                        e = t.closest("form").find(a),
                        n = t.find("input[type=radio]");
                    e.removeClass("active"), t.addClass("active"), t.hasClass("active") ? n.attr("checked", "checked") : n.attr("checked", "") }), c(".j-other-reason").on("click", function() { c(".input-text").removeClass("hide") }) }, formCommit: function(a) {
                var t = {};
                return c.ajax({ url: a.url, type: a.type, data: a.data, async: a.async || !1, success: function(a) { t = a.success ? { flag: !0, data: a.data } : { flag: !1, data: a.data } }, error: function() { t = { flag: !1, data: "网络错误" } } }), t } };
    e.exports = n });
