$(function() {
    var bForm = function() {};
    bForm.prototype.newSelect = function() {
        $(".js-select").each(function() {
            if ($(this).parents(".select-wrap").length > 0) return;
            var _this = $(this),
                _width = _this.attr("w") * 1,
                _div = $('<div class="select-wrap"></div>'),
                _input = $('<input type="text" class="select-input" readonly>'),
                _ulDiv = $('<div class="select-ulDiv"><ul></ul></div>'),
                _li = "",
                _Triangle = $('<span class="triangle"></span>'),
                _addClass = $(this).attr("addClass");
            //给input添加class
            if (_addClass) {
                _input.addClass(_addClass);
            }
            //_this.hide();
            _this.find("option").each(function() {
                var _text = $(this).text();
                var _val = $(this).val();
                if ($(this).attr("disabled")) {
                    _li += '<li class="disabled" val=' + _val + ">" + _text + "</li>";
                } else {
                    _li += "<li val=" + _val + ">" + _text + "</li>";
                }
            });
            if (_this.attr("disabled")) {
                _input.addClass("disabled");
            }
            if (_width) {
                _input.css("width", _width);
                _ulDiv.css("width", _width + 20);
            }
            _input.appendTo(_div);
            _ulDiv.find("ul").append(_li);
            var dataFooter = _this.attr("data-footer");
            if (dataFooter) {
                _ulDiv.append(dataFooter);
            }
            _ulDiv.hide().appendTo(_div);
            _Triangle.appendTo(_div);
            _div.insertBefore(_this);
            _this.appendTo(_div);
            // console.log(_this.parents(".select-wrap").find(".select-input").outerWidth(true))
            _this.outerWidth(_this.parents(".select-wrap").find(".select-input").outerWidth(true));
            _ulDiv.find("li").click(function(e, noChange) {
                var _index = $(this).index();
                if (_this.find("option").eq(_index).attr("disabled")) {
                    return false;
                }
                if ($(this).attr("class") == "footer-wrap") {
                    return false;
                }
                var _wrap = $(this).parents(".select-wrap");
                _wrap.find(".select-ulDiv").hide();
                _wrap.find(".js-select option").removeAttr("selected");

                /**
                 * Bug #1273
                 * Safrai下，不能使用对option使用attr，建议使用prop
                 * fixed by zhanghaiyang 2015-07-07 15:38
                 */
                _wrap.find(".js-select option:eq(" + _index + ")").prop("selected", true);
                /**
                 * Bug ff下select需要手动回填option的值
                 * ff的bug修改，刷新后默认值不一样导致提交值不一样
                 * fixed by zhanghaiyang 2015-03-05 11:43
                 */
                var selectedVal = _wrap.find(".js-select option:eq(" + _index + ")").attr("value");
                //console.log(selectedVal)
                _wrap.find(".js-select").val(selectedVal);
                //console.log(_wrap.find(".js-select"))
                var nowInput = _wrap.find(".select-input");
                var nowVal = nowInput.attr("val");
                var liVal = $(this).attr("val");
                if (nowVal == liVal) return;
                //如果2个val相等，认为没有选择select
                nowInput.val($(this).text());
                nowInput.attr("val", liVal);
                if (!noChange) {
                    _wrap.find(".js-select").trigger("change");
                }
            });
            var tip = _this.attr("tip");
            if (tip) {
                _this.parent().find(".select-input").val(tip);
            } else {
                var _defuSelect = _this.find("option:selected").index();
                _this.parent().find(".select-ulDiv li").eq(_defuSelect).trigger("click", true);
            }
            _input.click(function(e) {
                $(".select-wrap .select-ulDiv").hide();
                if (_this.attr("disabled")) {
                    return false;
                }
                var _t = $(this).outerHeight(true);
                _inputThis = $(this);
                e.stopPropagation();
                $(this).parent().find(".select-ulDiv").css({
                    top: _t
                }).show();
            });
        });
        $(document).click(function() {
            $(".select-wrap .select-ulDiv").hide();
        });
    };
    bForm.prototype.newRadio = function() {
        $(".js-radio-wrap").each(function(i, v) {
            $(this).find(".js-radio").each(function(i2, v2) {
                if ($(this).parent("label").length > 0) return;
                var _w = $(this).attr("w"),
                    _h = $(this).attr("h"),
                    _text = $(this).attr("tip"),
                    _label = $('<label class="radio-label"><a style="width:' + _w + "px;height:" + _h + "px; line-height:" + _h + 'px;" href="javascript:;"><s></s></a></label>'),
                    _addClass = $(this).attr("addClass");
                var sHtml = $('<s class="hook"></s>');
                _label.find("a").text(_text).append(sHtml);
                if (_addClass) {
                    _label.find("a").attr("class", _addClass);
                }
                if ($(this).attr("disabled")) {
                    _label.find("a").addClass("disabled");
                }
                _label.insertBefore($(this));
                $(this).hide().appendTo(_label);
                _label.click(function(e) {
                    //删除自定义场景时候不冒泡上来
                    if (e.target.className == "custom-radio-del") return;
                    if ($(this).find(".js-radio").attr("disabled")) {
                        return false;
                    }
                    $(this).siblings().find(".js-radio").prop("checked", false);
                    $(this).find(".js-radio").prop("checked", true).trigger('change');

                    $(this).find("a").addClass("actived").parent().siblings().find("a").removeClass("actived");
                });

                if ($(this).attr("checked")) {
                    $(this).parent("label").trigger("click");
                }
            });
        });
    };
    bForm.prototype.newCheckbox = function() {
        $(".js-checkbox-wrap").each(function(i, v) {
            $(this).find(".js-checkbox").each(function(i2, v2) {
                if ($(this).parent("label").length > 0) return;
                var _w = $(this).attr("w"),
                    _h = $(this).attr("h"),
                    _text = $(this).attr("tip"),
                    _label = $('<label class="checkbox-label"><a style="width:' + _w + "px;height:" + _h + "px; line-height:" + _h + 'px;" href="javascript:;"></a></label>'),
                    _addClass = $(this).attr("addClass");
                var sHtml = $('<s class="hook"></s>');
                _label.find("a").text(_text).append(sHtml);
                if (_addClass) {
                    _label.addClass(_addClass);
                    // _label.find("a").attr("class", _addClass);
                }
                if ($(this).attr("disabled")) {
                    _label.find("a").addClass("disabled");
                }
                _label.insertBefore($(this));
                $(this).hide().appendTo(_label);
                _label.click(function() {
                    if ($(this).find(".js-checkbox").attr("disabled")) {
                        return false;
                    }
                    var _checkbox = $(this).find(".js-checkbox");
                    if (_checkbox.prop("checked")) {
                        _checkbox.prop("checked", false);
                        $(this).find("a").removeClass("actived");
                    } else {
                        _checkbox.prop("checked", true);
                        $(this).find("a").addClass("actived");
                    }
                });
                if ($(this).attr("checked")) {
                    $(this).parent().find("a").addClass("actived");
                }
            });
        });
    };
    bForm.prototype.init = function() {
        this.newSelect();
        this.newRadio();
        this.newCheckbox();
    };
    window.bForm = bForm;
});
