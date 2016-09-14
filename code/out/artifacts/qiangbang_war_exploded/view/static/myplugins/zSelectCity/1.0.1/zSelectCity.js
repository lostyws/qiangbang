    $.fn.selectCity = function(args) {
        var _this = this;
        //默认参数
        var opts = {
            container: "body",
            deep: [ "p", "c", "d", "s" ],
            deepName: [ "省份", "城市", "县区", "街道" ],
            offset: {
                left: 0,
                top: 0
            },
            eventType: "click",
            quickClose: true,
            blacklist: "请选择"
        };
        if (!args.data) {
            args.data = address;
        }

        //覆盖默认参数
        $.extend(opts, args);
        _this.tmpls = {
            p: '<div class="select_city"><div class="select_city_tab">{{#each deep}}<a href="#" type="{{en}}" {{fOl @index ../this.deep.length w }}>{{zn}}</a>{{/each}}</div><div class="select_city_con_wrap">{{#each deep}}<div class="select_city_con {{fOl2 @index}}" type="{{en}}">{{#if tag}}{{#each ../../adress}}<dl><dt>{{area}}</dt><dd>{{#each citylist}}<a title="{{p}}"  attrid="{{v}}" href="javascript:;">{{p}}</a>{{/each}}</dd></dl>{{/each}}{{/if}}</div>{{/each}}</div></div>',
            c: '{{#each c}}<dl><dt>{{area}}</dt><dd class="diff_dd">{{#each citylist}}<a title="{{n}}"  attrid="{{v}}" href="javascript:;">{{n}}</a>{{/each}}</dd></dl>{{/each}}',
            d: '<dl><dd class="diff_dd">{{#each d}}<a title="{{n}}"  attrid="{{v}}" href="javascript:;">{{n}}</a>{{/each}}</dd></dl>',
            s: '<dl><dd class="diff_dd">{{#each s}}<a title="{{n}}" attrid="{{v}}" href="javascript:;">{{n}}</a>{{/each}}</dd></dl>'
        };
        //最后一个deep
        var last = opts.deep[opts.deep.length - 1];
        //是否有默认width
        var dataWidth = _this.attr("data-width") || args.dataWidth;
        //定位参数
        var parent_info = {
            l: $(_this).offset().left + opts.offset.left,
            t: $(_this).offset().top + $(_this).outerHeight() + opts.offset.top,
            w: dataWidth || $(_this).outerWidth() - 2
        };
        //模板
        var f_tmpl = Handlebars.compile(_this.tmpls.p);

        var area_data = null, //缓存区间data
        p_data = null, //缓存省级data
        c_data = null, //缓存城市级data
        d_data = null, //缓存区县级data
        s_data = null;
        //街道级data
        var checkFlg = [ 0, 0, 0, 0 ];
        //添加深度
        opts.data.deep = [];
        for (var i = 0, l = opts.deep.length; i < l; i++) {
            var obj = {
                w: parent_info.w,
                en: opts.deep[i],
                zn: opts.deepName[i]
            };
            if (i == 0) {
                obj.tag = "first";
            }
            opts.data.deep.push(obj);
        }
        /*
      ** 注册Handlebars函数
      */
        //tab的第一个还是最后一个
        Handlebars.registerHelper("fOl", function(i, l, w) {
            if (i == 0) {
                return new Handlebars.SafeString('class="actived" style="width:' + (w / l - 1) + 'px"');
            }
            if (i == l - 1) {
                return new Handlebars.SafeString('class="last" style="width:' + w / l + 'px"');
            } else {
                return new Handlebars.SafeString('style="width:' + (w / l - 1) + 'px"');
            }
        });
        //tabcon的第一个
        Handlebars.registerHelper("fOl2", function(i) {
            if (i == 0) {
                return "actived";
            }
        });
        /*
        */
        //初始化
        //生成的城市联动元素
        _this.init = function() {
            //删除之前的
            _this.selectCity = null;
            var scid = _this.attr("selectCityId");
            if (scid) {
                $("#" + scid).remove();
            }
            //创建新的
            var id = new Date().getTime(), status = _this.attr("status");
            _this.attr({
                selectCityId: "sc" + id,
                status: status || false
            });
            _this.selectCity = $(f_tmpl(opts.data)).css({
                left: parent_info.l,
                top: parent_info.t,
                width: parent_info.w
            }).attr("id", "sc" + id);
            $(opts.container).append(_this.selectCity);

            //设置dl的宽度
            setDLwidth();

            //绑定切换和点击
            bindCityClick();
            bindTabClick();
            //是否有默认城市
            if (opts.defaultId && opts.defaultId.length > 1) {
                var tempType = null, tempP = opts.defaultId[0], tempName = null, area = null;
                _this.attr({
                    p: tempP
                });
                //检查默认id在自己的级别中是否是唯一，length==1
                checkOnly();
                for (var i = 0, l = opts.defaultId.length; i < l && i < 4; i++) {
                    if (i == 0) tempType = "p";
                    if (i == 1) tempType = "c";
                    if (i == 2) tempType = "d";
                    if (i == 3) tempType = "s";
                    if (checkFlg[i] == 1) continue;
                    // console.log(temp_id)
                    $("#sc" + id).find(".select_city_con a[attrid=" + opts.defaultId[i] + "]").trigger("click", tempType);
                }
            }
            opts.initCallback && opts.initCallback(_this);
        };

        //判断下的如果有dt就设置下dd的宽度，让其在一行
        function setDLwidth() {
            if(_this.selectCity.find("dt").length > 0) {
                _this.selectCity.find("dd").css({
                    width: parent_info.w - 30 - 38
                });
            }
        }

        function checkOnly() {
            var temp_adress = args.data;
            checkId: for (var a = 0, l1 = temp_adress.adress.length; a < l1; a++) {
                var temp_area = temp_adress.adress[a];
                for (var b = 0, l2 = temp_area.citylist.length; b < l2; b++) {
                    var temp_p = temp_area.citylist[b];
                    if (temp_p.v != opts.defaultId[0]) continue;
                    if (!opts.defaultId[1]) break;
                    for (var c = 0, l3 = temp_p.c.length; c < l3; c++) {
                        var temp_c = temp_p.c[c];
                        if (temp_c.v != opts.defaultId[1]) continue;
                        if (l3 == 1) checkFlg[1] = 1;
                        if (!opts.defaultId[2]) break checkId;
                        for (var d = 0, l4 = temp_c.d.length; d < l4; d++) {
                            var temp_d = temp_c.d[d];
                            if (temp_d.v != opts.defaultId[2]) continue;
                            if (l4 == 1) checkFlg[2] = 1;
                            if (!opts.defaultId[3]) break checkId;
                            for (var e = 0, l5 = temp_d.s.length; e < l5; e++) {
                                var temp_s = temp_d.s[e];
                                if (temp_s.v != opts.defaultId[3]) continue;
                                if (l5 == 1) checkFlg[3] = 1;
                            }
                        }
                    }
                }
            }
        }
        //点击切换tab
        function bindTabClick() {
            $(_this.selectCity).on("click", ".select_city_tab a", function(e) {
                var type = $(this).attr("type");
                $(this).addClass("actived").siblings("a").removeClass("actived");
                $(_this.selectCity).find(".select_city_con[type=" + type + "]").addClass("actived").siblings(".select_city_con").removeClass("actived");
                e.preventDefault();
                e.stopPropagation();
                setDLwidth();
            });
        }
        //点击切换城市
        function bindCityClick() {
            $(_this.selectCity).on("click", ".select_city_con a", function(e, type) {

                var val = $(this).text(), type = type || $(this).parents(".select_city_con").attr("type"), id = $(this).attr("attrid"), area;
                temp_id = id;
                if (type == "p") {
                    _this.attr({
                        p: id
                    });
                } else if (type == "c") {
                    _this.attr({
                        c: id
                    });
                } else if (type == "d") {
                    _this.attr({
                        d: id
                    });
                } else if (type == "s") {
                    _this.attr({
                        s: id
                    });
                }
                if (type == "p" || type == "c") {
                    area = $(this).parent().siblings("dt").text();
                }
                $(this).parents(".select_city_con").find("a").removeClass("actived");
                $(this).addClass("actived");
                $(this).parents(".select_city_con").nextAll(".select_city_con").html("");
                // area_en = area;
                _this.setVal(val, type);
                //设置值
                //判断是否为最后一个
                if (type == last) {
                    _this.selectCity.hide();
                    _this.attr("status", true);
                    opts.callback && opts.callback(_this);
                } else {
                    _this.attr("status", false);
                }
                _this.tabChange(val, type, area);
                //切换城市
                _this.selectCity.find(".diff_dd").css({
                    width: parent_info.w - 30 - 12
                });
                opts.check && opts.check(_this);
                e.preventDefault();
                e.stopPropagation();
                setDLwidth();
            });
        }
        _this.setVal = function(val, type) {
            _this.is("div") == true ? _this.setval = _this.text : _this.setval = _this.val;
            //判断是什么元素
            var p_val = _this.setval() == opts.blacklist ? "" : _this.setval();
            if (type == "p") {
                _this.setval(val + " ");
            } else if (type == "c") {
                var arr = p_val.split(" ");
                arr[1] = val;
                arr[2] = arr[3] = "";
                _this.setval(arr.join(" "));
            } else if (type == "d") {
                var arr = p_val.split(" ");
                arr[2] = val;
                arr[3] = "";
                _this.setval(arr.join(" "));
            } else if (type == "s") {
                var arr = p_val.split(" ");
                arr[3] = val;
                _this.setval(arr.join(" "));
            }
        };
        //切换城市 
        _this.tabChange = function(val, type, area) {
            var temp = opts.data.adress;
            if (area) {
                for (var i = 0, l = temp.length; i < l; i++) {
                    if (temp[i]["area"] == area) {
                        area_data = temp[i];
                        break;
                    }
                }
            }
            if (type == "p") {
                //获取省级数据
                temp = area_data.citylist;
                for (var i = 0, l = temp.length; i < l; i++) {
                    if (val == temp[i]["p"]) {
                        p_data = temp[i];
                        break;
                    }
                }
                if (!p_data.c || type == last) {
                    _this.attr({
                        status: true,
                        c: 0
                    });
                }
                _this.selectCity.find(".select_city_tab a[type=c],.select_city_con[type=c]").addClass("actived").siblings().removeClass("actived");
                var c_tmpl = Handlebars.compile(_this.tmpls.c);

                _this.selectCity.find(".select_city_con[type=c]").html(c_tmpl(p_data));
                if (p_data.c.length == 1) {
                    //this.selectCity.find(".select_city_con[class*=actived]").find("a").trigger("click");
                }
            } else if (type == "c") {
                //获取市级数据
                temp = p_data.c;

                if (area) {
                    for (var i = 0, l = temp.length; i < l; i++) {
                        if (temp[i]["area"] == area) {
                            area_data = temp[i];
                            break;
                        }
                    }
                }
                temp = area_data.citylist;

                
                for (var i = 0, l = temp.length; i < l; i++) {
                    if (val == temp[i]["n"]) {
                        c_data = temp[i];
                        break;
                    }
                }

                if (!c_data.d || type == last) {
                    _this.selectCity.hide();
                    _this.attr({
                        status: true,
                        d: 0
                    });
                    return;
                }
                _this.selectCity.find(".select_city_tab a[type=d],.select_city_con[type=d]").addClass("actived").siblings().removeClass("actived");
                var d_tmpl = Handlebars.compile(_this.tmpls.d);
                _this.selectCity.find(".select_city_con[type=d]").html(d_tmpl(c_data));
                if (c_data.d.length == 1) {
                    _this.selectCity.find(".select_city_con[class*=actived]").find("a").trigger("click");
                }
            } else if (type == "d") {
                //获取市级数据
                temp = c_data.d;
                for (var i = 0, l = temp.length; i < l; i++) {
                    if (val == temp[i]["n"]) {
                        d_data = temp[i];
                        break;
                    }
                }
                if (!d_data.s || type == last) {
                    _this.selectCity.hide();
                    _this.attr({
                        status: true,
                        s: 0
                    });
                    return;
                }
                _this.selectCity.find(".select_city_tab a[type=s],.select_city_con[type=s]").addClass("actived").siblings().removeClass("actived");
                var s_tmpl = Handlebars.compile(_this.tmpls.s);
                _this.selectCity.find(".select_city_con[type=s]").html(s_tmpl(d_data));
                if (d_data.s.length == 1) {
                    _this.selectCity.find(".select_city_con[class*=actived]").find("a").trigger("click");
                }
            }
        };
        //隐藏城市
        _this.hide = function() {
            _this.selectCity.hide();
        };
        //显示城市
        _this.show = function() {
            calibration();
            _this.selectCity.show();
        };
        _this.remove = function() {
            _this.selectCity = null;
            var scid = _this.attr("selectCityId");
            if (scid) {
                $("#" + scid).remove();
            }
        };
        //点击显示城市
        _this.on(opts.eventType, function(e) {
            if(_this.hasClass('disabled') || _this.attr('disabled') != undefined ) {
                return;
            }
            $(".select_city").hide();
            _this.selectCity.show();
            _this.blur();
            e.stopPropagation();
        });
        if (opts.quickClose) {
            $(document).click(function(e) {
                if (_this.selectCity) {
                    _this.selectCity.hide();
                }
            });
        }
        $(window).on("resize", function() {
            calibration();
        });

        //重新校准位置
        function calibration() {
            var parent_info = {
                l: $(_this).offset().left + opts.offset.left,
                t: $(_this).offset().top + $(_this).outerHeight() + opts.offset.top,
            };
            _this.selectCity.css({
                left: parent_info.l,
                top: parent_info.t
            });
        }

        _this.init();
        return _this;
    };
    /*****************/
    $.fn.ul_select = function(args) {
        var _this = this;
        //默认参数
        var opts = {
            offset: {
                left: 0,
                top: 0
            },
            has_default: true,
            eventType: "click",
            quickClose: true
        };
        //覆盖默认阐述
        $.extend(opts, args);
        _this.tmpls = {
            u: '<ul class="ul_select">{{#each this}}<li attrid="{{v}}">{{n}}</li>{{/each}}</ul>'
        };
        //定位参数
        var parent_info = {
            l: $(_this).offset().left + opts.offset.left,
            t: $(_this).offset().top + $(_this).outerHeight() + opts.offset.top,
            w: $(_this).outerWidth() - 2
        };
        _this.data = [];
        var temp_data = _this.attr("ul_selete_list").split(","), temp_dataId = _this.attr("ul_selete_listId").split(",");
        for (var i = 0; i < temp_data.length; i++) {
            if (i == 0 && opts.has_default) {
                _this.val(temp_data[i]);
                _this.attr("attrid", temp_dataId[i]);
            }
            _this.data.push({
                n: temp_data[i],
                v: temp_dataId[i]
            });
        }
        //初始化
        _this.init = function() {
            _this.ul_select = null;
            var tmpl = Handlebars.compile(_this.tmpls.u);
            _this.ul_select = $(tmpl(_this.data)).css({
                left: parent_info.l,
                top: parent_info.t,
                width: parent_info.w
            });
            $(opts.container + " .ul_select").remove();
            $(opts.container).append(_this.ul_select);
        };
        _this.init();
        _this.show = function() {
            _this.ul_select.show();
        };
        _this.hide = function() {
            _this.ul_select.hide();
        };
        _this.ul_select.find("li").click(function(e) {
            if (_this.val() == $(this).text()) {
                _this.hide();
                e.stopPropagation();
                return false;
            }
            _this.val($(this).text());
            _this.attr("attrid", $(this).attr("attrid"));
            //opts.callback && opts.callback();
            _this.hide();
            e.stopPropagation();
        });
        //点击显示下拉
        _this.on(opts.eventType, function(e) {
            _this.ul_select.show();
            _this.blur();
            e.stopPropagation();
        });
        if (opts.quickClose) {
            $(document).click(function(e) {
                _this.ul_select.hide();
            });
        }
        return _this;
    };
