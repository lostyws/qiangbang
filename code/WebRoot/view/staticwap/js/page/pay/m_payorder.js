! function() {
    function a(a, b, c) {
        var d;
        switch (c) {
            case 1:
                d = (100 * a + 100 * b) / 100;
                break;
            case 2:
                d = (100 * a - 100 * b) / 100;
                break;
            case 3:
                d = 100 * a * 100 * b / 1e4;
                break;
            case 4:
                d = 100 * a / (100 * b);
                break;
            default:
                d = (100 * a + 100 * b) / 100 }
        return parseFloat(d.toFixed(2)) }

    function b() {
        return M.prop("checked") && !M.prop("disabled") ? parseFloat($("#pay-coupon-amount").attr("data-value")) : 0 }

    function c() {
        return M.prop("checked") && !M.prop("disabled") ? parseFloat($("#pay-coupon-amount").val()) : 0 }

    function d() {
        return Q.prop("checked") && Q.length ? parseFloat(Q.attr("data-value")) : 0 }

    function e() {
        var e, h, i = b(),
            j = c(),
            k = d(),
            l = a(i, k);
        return 0 === l ? (I = 0, J = 0, K = U, e = K, h = T - U > 0 ? U : T) : 0 >= U - i ? (I = U, J = 0, K = 0, e = 0, h = 0) : 0 >= U - l ? (I = i, J = a(U, i, 2), K = 0, h = J, e = 0) : (I = i, J = k, K = a(U, l, 2), h = J > 0 ? J : T - K > 0 ? K : T, e = K), f(h, e), g(J, j, K), K }

    function f(a, b) { 0 === a ? Q.prop("disabled", !0) : Q.prop("disabled", !1), $("#pay-balance-amount").html("￥" + parseFloat(a).toFixed(2)), $(".pay-net-amount").html("￥" + parseFloat(b).toFixed(2)) }

    function g(a, b, c) { $(".J_pay-with-balance").val(a), $(".J_pay-with-coupon").val(b), $(".J_pay-with-money").val(c) }

    function h() { $("#J_balance-pay-form").find(".coupon-check").on("click", function() {
            var a = $(this);
            if (M.prop("checked")) M.removeAttr("checked"), M.removeAttr("disabled"), a.removeClass("check-active"), $(".coupon-amount").html("￥0.00");
            else { $("#pay-coupon-amount").val() || M.attr("disabled", "disabled"), M.attr("checked", !0), a.addClass("check-active");
                var b = $("#pay-coupon-amount").attr("data-value"),
                    c = parseFloat(b) > parseFloat(U) ? U : b;
                $(".coupon-amount").html("￥" + parseFloat(c).toFixed(2)) }
            e() }) }

    function i() {
        var a = $("#coupon-loading"),
            b = !0;
        O.on("click", function() {
            var c = [];
            b && (b = !1, N.hasClass("select-active") ? (j(!1), b = !0) : (c = ['<ul><li data-id="" data-amount="0"><span>不使用优惠券</span></li>'], j(!0), a.show(), $.ajax({ type: "GET", url: "/payorder/getcouponlist", data: { data: S }, dataType: "json", success: function(d) {
                    if (1 === d.state) {
                        if ("undefined" == typeof d.data || !$(d.data).length) return ZDK.Tips("抱歉，当前没有可使用的优惠劵！", 2e3, "error"), M.removeAttr("checked"), $(".coupon-check").removeClass("check-active"), a.hide(), $(".coupon-text").text("无可用优惠券"), j(!1), void(b = !0);
                        for (var e = 0, f = d.data.length; f > e; e++) c.push('<li data-id="' + d.data[e].coup_no + '" data-amount="' + d.data[e].deduc_mon + '"><span>' + d.data[e].spec_name + "</span></li>");
                        c.push("</ul>"), a.hide(), P.append(c.join("")), k();
                        for (var g = P.find("li"), e = 1; e < g.length; e++) l(P.find("span").eq(e), P.find("li").eq(e)) }
                    b = !0 }, error: function() { a.hide(), ZDK.Tips(W, 2e3, "error"), b = !0 } }))) }) }

    function j(a) { a ? (N.addClass("select-active"), P.show(), O.removeClass("dt-default"), O.addClass("dt-active")) : (N.removeClass("select-active"), P.hide(), O.removeClass("dt-active"), O.addClass("dt-default"), P.find("ul").remove()) }

    function k() { N.find("li").on("click", function() { $(this).data("id") ? ($(".coupon-check").addClass("check-active"), M.attr("checked", "checked"), M.removeAttr("disabled")) : (M.removeAttr("checked"), $(".coupon-check").removeClass("check-active")), $("#pay-coupon-amount").val($(this).data("id")), $("#pay-coupon-amount").attr("data-value", $(this).data("amount")), $(".coupon-text").remove(), $(".flow-wrap").append('<span class="coupon-text"></span>'), $(".coupon-text").text($(this).find("span").text()), j(!1);
            var a = parseFloat($(this).data("amount")) > parseFloat(U) ? U : $(this).data("amount");
            $(".coupon-amount").html("￥" + parseFloat(a).toFixed(2)), e(), l($(".coupon-text"), N.find(".flow-wrap")) }) }

    function l(a, b) {
        var c = 0,
            d = 0,
            e = parseInt(a.width()),
            f = parseInt(b.width());
        a.removeClass("text-flow"), e > f && (a.addClass("text-flow"), c = setInterval(function() {
            if (-parseInt(a.css("left")) + f == e + 4) {
                if (d) return;
                d = setTimeout(function() { a.css("left", "2px"), d = 0 }, 1e3) } else if ("2px" == a.css("left")) {
                if (d) return;
                d = setTimeout(function() { a.css("left", "1px"), d = 0 }, 1e3) } else a.css("left", a.position().left - 1 + "px") }, 32)) }

    function m() { $(".balance-pay").on("click", function() {
            var a = $(this);
            Q.prop("checked") ? (Q.removeAttr("checked"), a.find(".balance-check").removeClass("check-active"), $("#pay-balance-amount").hide(), $(".pay-balance-amount").show()) : (Q.attr("checked", !0), a.find(".balance-check").addClass("check-active"), $(".pay-balance-amount").hide(), $("#pay-balance-amount").show()), e() }) }

    function n() {
        var c = b(),
            e = d(),
            f = (a(c, e), $.Dialog({ title: '支付操作 <a href="javascript:;" class="ui-dialog-select">[重新选择支付方式]</a>', autoOpen: !1, closeBtn: !1, buttons: { "取消": function() { v(), f.destroy() }, "确认支付": function() {
                        var a = f.getWrap().find(".ui-btn-2");
                        a.attr("disabled") || t(function() { f.destroy() }, a) } }, content: $("#sendMsgTpl").html() })),
            g = f.getWrap(),
            h = g.find(".ui-dialog-select"),
            i = g.find(".ui-btn-1"),
            j = g.find(".ui-btn-2"),
            k = g.find(".btn-get-code");
        I > 0 ? ($("#J_message-coupon-wrap").show(), $("#J_message-coupon-amount").text(I)) : $("#J_message-coupon-wrap").hide(), J > 0 ? ($("#J_message-balance-wrap").show(), $("#J_message-balance-amount").text(J)) : $("#J_message-balance-wrap").hide(), K > 0 ? ($("#J_pay-alipay-checkbox").prop("checked") ? $("#J_message-money-wrap").show().find(".amount-title").html("支付宝支付：") : $("#J_message-money-wrap").show().find(".amount-title").html("微信支付："), $("#J_message-money-amount").text(K)) : $("#J_message-money-wrap").hide(), j.addClass("btn-ok"), i.addClass("btn-cancel"), h.on("click", function() { v(), f.destroy() }), k.on("click", function() { x(this) }), f.open() }

    function o(a) {
        var b = a,
            c = $("#loadingWXPay").html(),
            d = $.Dialog({ title: "微信支付", autoOpen: !1, closeBtn: !0, buttons: {}, content: c });
        d.open(), $.ajax({ type: "post", url: "/payorder/to", data: b.serialize(), dataType: "json", cache: !1, success: function(a) { 1 === a.state ? p(d, b, a.url, a.time) : (ZDK.Tips(a.msg, 3e3, "warning"), d.destroy()) }, error: function(a) { ZDK.Tips(a.msg, 3e3, "warning"), d.destroy() } }) }

    function p(a, b, c, d) {
        function e() { clearTimeout(L), v(), f.destroy() }
        var f = a,
            g = b,
            h = g.find(".J_pay-with-money").val(),
            i = "/qrcode.php?data=",
            j = i + c,
            k = f.getWrap();
        k.find(".ui-dialog-content").html($("#wxPayTpl").html());
        var l = k.find("#reChooseUrl"),
            m = k.find(".ui-dialog-close"),
            n = navigator.userAgent,
            o = !!n.match(/AppleWebKit.*Mobile.*/),
            p = n.match(/MicroMessenger\/([\d\.]+)/i);
        if (o) { p ? k.find(".wx-price").parent().html('支付金额 <span class="wx-price"><i>¥</i><span>79.00</span></span>，请长按二维码，选择识别二维码进行支付') : k.find(".wx-price").parent().html('支付金额 <span class="wx-price"><i>¥</i><span>79.00</span></span>，请长按二维码保存图片，并用微信扫码功能打开图片进行支付');
            var q = k.css("top");
            k.css("top", parseFloat(q) - 100 + "px") }
        m.on("click", function() { e() }), l.on("click", function() { e() }), k.addClass("ui-dialog-wx-pay"), k.find(".wx-price span").html(h), k.find(".wx-content-box img").attr("src", j), k.find(".wx-order-time").html(d), r() }

    function q() { $.ajax({ type: "post", url: "/payorder/checkstate", data: { data: S }, dataType: "json", cache: !1, success: function(a) { 1 === a.state ? (ZDK.Tips("支付已完成，页面正在跳转中...", 6e3), setTimeout(function() { window.location.href = a.url }, 3e3)) : r() }, error: function(a) { r() } }) }

    function r() { s() }

    function s() { clearTimeout(L), L = setTimeout(function() { q() }, 3500) }

    function t(a, b) {
        var c, d, e = $(".ui-dialog-code").val();
        return !e && $("#amount-code-wrap").length ? void ZDK.Tips("请输入验证码", 3e3, "error") : (b.attr("disabled", !0), $("#J_balance-code").val(e), void(K > 0 && J > 0 ? (1 === V ? c = $("#J_deposit-pay-form") : 2 === V && (c = $("#J_credit-pay-form")), u(function() { c.find("#J_pay-weixin-checkbox").prop("checked") ? (o(c), a && a()) : (c.submit(), A(c), a && a(), b.removeAttr("disabled")) })) : (d = $("#J_balance-pay-form").serialize(), u(function() { $.ajax({ type: "post", url: "/payorder/to", data: d, dataType: "json", success: function(c) { 1 === c.state ? (ZDK.Tips("支付成功，页面正在跳转中...", 6e3), setTimeout(function() { window.location.href = c.url }, 3e3), a && a(), b.removeAttr("disabled")) : (ZDK.Tips(c.msg, 2e3, "warning"), b.removeAttr("disabled")) }, error: function(a) { ZDK.Tips(W, 2e3, "warning"), b.removeAttr("disabled") } }) })))) }

    function u(a) {
        if (0 === $("#amount-code-wrap").length) return void(a && a());
        var b = w();
        $.ajax({ type: "post", url: "/ajax/checkcode", data: b + "&sendkey=" + $("#sendKey").val(), dataType: "json", success: function(b) { 1 === b.state ? a && a() : ZDK.Tips(b.msg, 2e3, "warning") }, error: function(a) { ZDK.Tips(W, 2e3, "warning") } }) }

    function v() { Q.removeAttr("checked"), $(".balance-check").removeClass("check-active"), $("#pay-balance-amount").hide(), $(".pay-balance-amount").show(), e() }

    function w() {
        if ($("#J_message-code-input").length) {
            var a, b, c;
            return a = $("#J_balance-key").attr("name") + "=" + $("#J_balance-key").val(), b = $("#J_balance-code").attr("name") + "=" + $("#J_balance-code").val(), c = a + "&" + b }
        return "" }

    function x(a) {
        function b(a) { f.text(a + " 秒后重试") }
        var c, d, e = a,
            f = $(e);
        f.attr("disabled") || (d = 59, f.attr("disabled", !0), f.parent().addClass("loading"), b(d), y(), c = setInterval(function() { d--, d ? b(d) : (clearInterval(c), f.parent().removeClass("loading"), f.text("重试").removeAttr("disabled")) }, 1e3)) }

    function y() { $.ajax({ type: "post", url: "/ajax/sendmsg", data: { sendkey: $("#sendKey").val() }, dataType: "json", success: function(a) { 1 === a.state ? (ZDK.Tips("已经成功发送验证码至 " + $("#J_message-receiver").html() + "。", 3e3), $("#J_balance-key").val(a.msg)) : ZDK.Tips(a.msg, 2e3, "warning") }, error: function(a) { ZDK.Tips(W, 3e3, "warning") } }) }

    function z() { R.on("click", function() {
            var a, b = $(this),
                c = $("#J_deposit-pay-form"),
                d = $("#J_credit-pay-form"),
                f = $("#J_balance-pay-form"),
                g = e();
            return 0 >= g ? void(!M.prop("checked") || M.prop("disabled") || Q.prop("checked") ? n() : C(function() { b.prop("disabled", !1) }, b)) : 0 >= K ? void(a = f) : (1 === V ? a = c : 2 === V && (a = d), void(a.find('input[name="balance_amount"]').val() <= 0 ? a.find("#J_pay-weixin-checkbox").prop("checked") ? o(a) : (a.submit(), A()) : n())) }) }

    function A(a) {
        var b = $.Dialog({ title: "支付提示", autoOpen: !1, buttons: { "返回选择其他方式": function() { v(), b.destroy() }, "完成支付": function() {
                        var a = b.getWrap().find(".ui-btn-2");
                        a.attr("disabled") || D(function() { b.destroy() }, a) } }, content: $("#payingTipsTpl").html() }),
            c = b.getWrap().find(".ui-btn-1"),
            d = b.getWrap().find(".ui-btn-2");
        if (a) {
            var e = b.getWrap().find(".submit-tips");
            e.show(), e.find("a").on("click", function() { a.submit(), e.hide() }) }
        c.addClass("btn-cancel"), d.addClass("btn-ok"), b.open() }

    function B() { $("#pay-btn-coupon").on("click", function() {
            var a = $(this);
            a.prop("disabled") || (C(function() { a.prop("disabled", !1) }, a), R.trigger("click")) }) }

    function C(a, b) { b.prop("disabled", !0).addClass("ui-btn-loading"), $.ajax({ type: "post", url: "/payorder/to", data: $("#J_balance-pay-form").serialize(), dataType: "json", success: function(a) { 1 === a.state ? (ZDK.Tips("支付已完成，页面正在跳转中...", 6e3), setTimeout(function() { window.location.href = a.url }, 3e3), b.prop("disabled", !1).removeClass("ui-btn-loading")) : (ZDK.Tips(a.msg, 3e3, "warning"), b.prop("disabled", !1).removeClass("ui-btn-loading")) }, error: function(a) { ZDK.Tips(W, 3e3, "warning"), b.prop("disabled", !1).removeClass("ui-btn-loading") } }) }

    function D(a, b) { b.attr("disabled", !0).addClass("ui-btn-loading"), $.ajax({ type: "post", url: "/payorder/checkstate", data: { data: S }, dataType: "json", success: function(c) { 1 === c.state ? (ZDK.Tips("支付已完成，页面正在跳转中...", 6e3), setTimeout(function() { window.location.href = c.url }, 3e3), a && a(), b.removeAttr("disabled").removeClass("ui-btn-loading")) : (ZDK.Tips(c.msg, 3e3, "warning"), b.removeAttr("disabled").removeClass("ui-btn-loading")) }, error: function(a) { ZDK.Tips(W, 3e3, "warning"), b.removeAttr("disabled").removeClass("ui-btn-loading") } }) }

    function E() {
        var a = navigator.userAgent,
            b = a.match(/MicroMessenger\/([\d\.]+)/i);
        b ? ($("#ali-wrap").hide(), $(".wechat-border").addClass("no-border").show(), $("#wechat-wrap").find(".radio-btn").addClass("radio-btn-active").end().find(".pay-net-amount").show(), $("#J_pay-alipay-checkbox").removeAttr("checked"), $("#J_pay-weixin-checkbox").attr("checked", !0), F($("#J_pay-weixin-checkbox"))) : ($("#ali-wrap").find(".radio-btn").addClass("radio-btn-active").end().find(".pay-net-amount").show(), $(".ali-border").show(), F($("#J_pay-alipay-checkbox")), $(".more-platform").show().on("click", function() {
            var a = $(this).find(".more-arrow");
            a.hasClass("arrow-active") ? (a.removeClass("arrow-active"), a.prev().text("更多支付方式")) : (a.addClass("arrow-active"), a.prev().text("收起")), $("#wechat-wrap").toggle("slide") })), $(".platform-way").find("li").not(".more-platform").on("click", function() { $(".radio-btn").removeClass("radio-btn-active"), $(this).find(".radio-btn").addClass("radio-btn-active"), $(".pay-net-amount").hide(), $(this).find(".pay-net-amount").show(), $(this).find(".ali-ico").length ? ($("#J_pay-weixin-checkbox").removeAttr("checked"), $("#J_pay-alipay-checkbox").attr("checked", !0), F($("#J_pay-alipay-checkbox"))) : ($("#J_pay-alipay-checkbox").removeAttr("checked"), $("#J_pay-weixin-checkbox").attr("checked", !0), F($("#J_pay-weixin-checkbox"))) }) }

    function F(a) {
        var b, c = a,
            d = c.attr("data-paychnid"),
            e = c.closest("form");
        e.is("#J_deposit-pay-form") ? b = 1 : e.is("#J_credit-pay-form") && (b = 2), 1 === b ? $("#J_deposit-chnid").val(d) : 2 === b && $("#J_credit-chnid").val(d) }

    function G() {
        var a = $("#coupon-loading"),
            b = ['<ul><li data-id="" data-amount="0"><span>不使用优惠券</span></li>'];
        j(!0), a.show(), $.ajax({ type: "GET", url: "/payorder/getcouponlist", data: { data: S }, dataType: "json", success: function(c) {
                if (1 === c.state) {
                    if ("undefined" == typeof c.data || !$(c.data).length) return a.hide(), $(".coupon-text").text("无可用优惠券"), void j(!1);
                    for (var d = 0, e = c.data.length; e > d; d++) b.push('<li data-id="' + c.data[d].coup_no + '" data-amount="' + c.data[d].deduc_mon + '"><span>' + c.data[d].spec_name + "</span></li>");
                    b.push("</ul>"), a.hide(), P.append(b.join("")), k(), P.find("li").eq(1).trigger("click") } }, error: function() { a.hide() } }) }

    function H() { E(), h(), G(), i(), m(), z(), B() }
    var I, J, K, L, M = $("#J_agreement-coupon"),
        N = $("#coupon-select"),
        O = N.find("dt"),
        P = N.find("dd"),
        Q = $("#J_agreement-balance"),
        R = $("#pay-btn-bank"),
        S = $("#order-data").val(),
        T = $("#balance").val(),
        U = $("#order-amount").val(),
        V = 1,
        W = "世界上最遥远的距离就是网络异常，请稍后再试。";
    H() }(), ZDK.lazy(function() { $(".ui-tools-bottom").remove() });
