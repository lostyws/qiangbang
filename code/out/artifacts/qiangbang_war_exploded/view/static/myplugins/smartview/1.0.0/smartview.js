$(function() {



    /**
     * 数据配置项
     */
    var dataDefaultOptions = {
        custom: false,
        serverSide: false,
        defaultActiveIndex: [0, 0],
        ajax: {
            type: 'post',
            dataType: 'json'
        },
        mainTitle: ''
    };

    /**
     * 回调函数配置项
     */
    var handleDefaultOptions = {

    };


    /**
     * 模板hash对象
     */
    var templatesMap = {
        0: 'viewTableUl', //左侧
        1: 'viewListUl', //右侧常规
        2: 'viewCustomUl' //右侧自定义
    };



    /**
     * smartview
     */
    var smartview = function(data, handle) {
        //深度拷贝，偷懒下
        dataDefaultOptions = $.extend(true, dataDefaultOptions, data);
        handleDefaultOptions = $.extend(handleDefaultOptions, handle);

        
        // /* 实例化对象 */
        // $(this).each(function() {
            
        // });
        this.Smartview = new Smartview(this);
        return this;
    };


    /**
     * 构造函数
     * Smartview
     * @param {Jqb} _this dom的jQuery对象
     */
    function Smartview(_this) {
        this._this = _this;
        this.handleDefaultOptions = handleDefaultOptions;
        this.dataDefaultOptions = dataDefaultOptions;
        this.init(true);

    }


    /**
     * Smartview.prototype.init
     * 原型方法init
     * 初始化
     */
    Smartview.prototype.init = function(flag) {

        var _this = this;

        //如果是服务器端获取数据
        if (_this.dataDefaultOptions.serverSide && _this.dataDefaultOptions.ajax && _this.dataDefaultOptions.ajax.url) {

            //异步事件流
            $.when(_this.sendAjax())
                //ie8
                .then(
                    function(data) {
                        _this.ajaxSuccess.call(_this, data, flag);
                    },
                    _this.ajaxFail
                );
            //高级的bind
            //.then(_this.ajaxSuccess.bind(_this), _this.ajaxFail);
        }
        if (!_this.dataDefaultOptions.serverSide && _this.dataDefaultOptions.localData) {
            _this.ajaxSuccess.call(_this, _this.dataDefaultOptions.localData, true);
        }
    };



    /**
     * Smartview.prototype.ajaxSuccess
     * 获取ajax数据成功之后的操作
     */
    Smartview.prototype.ajaxSuccess = function(data, flag) {
        var _this = this;

        //渲染html
        _this.renderHtml(data);
        //设置活动的对象数据到实例化对象上
        _this.setActiveData();
        //绑定事件
        _this.eventHandle();


        if (_this.handleDefaultOptions.init && typeof _this.handleDefaultOptions.init == 'function' && flag) {
            _this.handleDefaultOptions.init(_this.activeData);
        }

    };


    /**
     * Smartview.prototype.renderHtml
     * 渲染html
     */
    Smartview.prototype.renderHtml = function(data) {
        var _this = this;


        //模板
        var templates = _this.util.templates;

        //
        var calculateHighlightNumbers = _this.util.calculateHighlightNumbers;

        //高亮的总数
        var highlightNumbers = 0;

        //视图切换触发层
        var $smartviewTab = $('<div class="js-smartview-tab pointer"><span class="view-main-title"></span><span class="view-name"></span><i class="fa fa-angle-down"></i><span class="badge badge-danger pull-right total-number"></span></div>');

        //视图显示层大容器
        var $smartviewPanel = $('<div class="js-smartview-panel"><div class="panel-bg"></div></div>');
        //左侧视图层容器
        var $viewLeft = $('<div class="view-left"></div>');
        //右侧视图层容器
        var $viewRight = $('<div class="view-right"></div>');

        //左侧视图层容器的tab数据
        var tableData = [];

        //循环数据
        for (var i = 0, l = data.length; i < l; i++) {

            //如果没开启自定义检索的话跳过
            if (_this.dataDefaultOptions.custom === false && data[i].type == 2) {
                continue;
            }

            //右侧视图层容器的内容列表
            var $viewRightList = $('<div class="view-right-list-wrap"></div>');



            var list = data[i].list;
            templatesValue = templatesMap[data[i].type];

            //累计高亮的总数
            highlightNumbers += calculateHighlightNumbers(list);

            //push左侧视图层容器的tab数据
            tableData.push({
                name: data[i].name,
                type: data[i].type
            });

         

            //右侧列表添加详细内容
            $viewRightList.append((templates[templatesValue]).call(_this, list, i));

            //如果是活动状态的添加高亮active
            if (_this.dataDefaultOptions.defaultActiveIndex[0] == i) {
                $viewRightList.addClass('active');

            }


            //右侧视图层容器加入内容列表
            $viewRight.append($viewRightList);
        }


        //如果高亮>0 显示高亮的总数
        if (highlightNumbers > 0) {
            $smartviewTab.find('.total-number').text(highlightNumbers);
        }

        //加主标题

        if (_this.dataDefaultOptions.mainTitle) {
            $smartviewTab.find('.view-main-title').html(_this.dataDefaultOptions.mainTitle);
        }


        var tableDataTemplatesValue = templatesMap[0];
        $viewLeft.append((templates[tableDataTemplatesValue]).call(_this, tableData));

        //视图显示层大容器追加左侧视图层容器和右侧视图层容器
        $smartviewPanel.find('.panel-bg').append($viewLeft).append($viewRight);


        //$html绑定在实例化对象上
        _this.$html = {
            $smartviewTab: $smartviewTab,
            $smartviewPanel: $smartviewPanel,
            $viewLeft: $viewLeft,
            $viewRight: $viewRight
        };

        //追加完整内容

        $(_this._this).html('').append($smartviewTab).append($smartviewPanel);




    };

    /**
     * Smartview.prototype.eventHandle
     * 事件绑定
     */
    Smartview.prototype.eventHandle = function() {
        var _this = this,
            $smartviewTab = _this.$html.$smartviewTab,
            $smartviewPanel = _this.$html.$smartviewPanel,
            $viewLeft = _this.$html.$viewLeft,
            $viewRight = _this.$html.$viewRight,
            $viewTabLi = $viewLeft.find('.view-table-ul li'),
            $viewListLi = $viewRight.find('.view-list-ul li');

        //smartviewTab的点击选择
        $smartviewTab.on('click', function(e) {
            e.stopPropagation();
            _this.show();
        });


        //快速关闭
        $(document).on('click', function() {
            _this.hide();
        });


        //切换tab
        $viewTabLi.on('click', function(e) {
            e.stopPropagation();


            //更新高亮
            $viewTabLi.removeClass('active');
            $(this).addClass('active');
            var index = $(this).index();
            $viewRight.find('.view-right-list-wrap').removeClass('active').eq(index).addClass('active');

        });

        //change条件
        $viewListLi.on('click', function(e) {

            var _activeData = _this.activeData,
                liData = $(this).data();
            if (_activeData.id == liData.id || $(this).hasClass('active')) {
                e.stopPropagation();
                return;
            }
            _this.dataDefaultOptions.defaultActiveIndex = [0 , $(this).index()];

            //更新高亮
            $viewListLi.removeClass('active');
            $(this).addClass('active');

            //更新当前的data
            _this.setActiveData(liData);


            if (_this.handleDefaultOptions.change && typeof _this.handleDefaultOptions.change == 'function') {
                _this.handleDefaultOptions.change(_this.activeData);
            }



        });





    };


    /**
     * Smartview.prototype.show
     * 显示$smartviewTab
     */
    Smartview.prototype.show = function() {
        var _this = this,
            $smartviewPanel = _this.$html.$smartviewPanel;
        $smartviewPanel.addClass('active');
    };



    /**
     * Smartview.prototype.hide
     * 隐藏$smartviewTab
     */
    Smartview.prototype.hide = function() {
        var _this = this,
            $smartviewPanel = _this.$html.$smartviewPanel;
        $smartviewPanel.removeClass('active');
    };


    /**
     * Smartview.prototype.setActiveData
     * 设置活动的对象数据
     */
    Smartview.prototype.setActiveData = function(data) {
        var _this = this,
            $viewRight = _this.$html.$viewRight;
        _this.activeData = data || $viewRight.find('.view-list-ul li.active').data();
        _this.setViewName();
    };

    /**
     * Smartview.prototype.getActiveData
     * 获取活动的对象数据
     */
    Smartview.prototype.getActiveData = function() {
        var _this = this;
        return _this.activeData;
    };

    /**
     * Smartview.prototype.setViewName
     * 设置ViewName
     */
    Smartview.prototype.setViewName = function(activeData) {
        var _this = this;
        _this.$html.$smartviewTab.find('.view-name').text(_this.activeData.name);
    };

    /**
     * Smartview.prototype.ajaxFail
     * 获取ajax数据成功之后的操作
     */
    Smartview.prototype.ajaxFail = function(d) {
        var msg = d && d.msg ? d.msg : '操作失败';

        if (util && util.prompt) {
            util.prompt({
                text: msg
            });
        }
    };




    /**
     * Smartview.prototype.sendAjax
     * 原型方法发送ajax
     */
    Smartview.prototype.sendAjax = function() {
        var _this = this;
        var dtd = $.Deferred();

        _this.dataDefaultOptions.ajax.success = function(d) {

            if (d.status === 0 || d.errcode === 0) {
                dtd.resolve(d.data);
            } else {
                dtd.reject(d);
            }
        };

        _this.dataDefaultOptions.ajax.error = function() {
            dtd.reject({
                msg: '服务器无响应'
            });
        };

        $.ajax(dataDefaultOptions.ajax);

        return dtd.promise();
    };


    /**
     * Smartview.prototype.util
     * 工具方法
     */
    Smartview.prototype.util = {
        //模板
        templates: {
            //左侧tab切换
            viewTableUl: function(data) {
                var _this = this;
                var $ul = $('<ul class="view-table-ul"></ul>');
                for (var i = 0, l = data.length; i < l; i++) {
                    var $li = $('<li><a href="javascript:;">' + data[i].name + '</a><span class="triangle-left"></span></li>');
                    //赋值属性
                    $li.data(data[i]);

                    if (_this.dataDefaultOptions.defaultActiveIndex[0] == i) {
                        $li.addClass('active');
                    }

                    $ul.append($li);
                }
                return $ul;
            },
            //右侧常规list
            viewListUl: function(data, index) {
                var _this = this;

                var $ul = $('<ul class="view-list-ul"></ul>');
                for (var i = 0, l = data.length; i < l; i++) {
                    var $li = $('<li><a href="javascript:;">' + data[i].name + '</a></li>');


                    //赋值属性
                    $li.data(data[i]);

                    var $span;

                    //单独高亮
                    if(data[i].highlightNumber > 0) {
                        $span = $('<span class="arrow-tip"></span>').html('<strong>'+ data[i].highlightNumber + '</strong>'+ (data[i].highlightText || ''));
                         $li.append($span);
                    }
                    

                   

                    if (_this.dataDefaultOptions.defaultActiveIndex[1] == i && _this.dataDefaultOptions.defaultActiveIndex[0] == index) {
                        $li.addClass('active');

                    }

                    $ul.append($li);
                }
                return $ul;
            },
            //右侧自定义列表
            viewCustomUl: function(data) {
                return '';
            }
        },
        //计算高亮的总数
        calculateHighlightNumbers: function(data) {
            if (!$.isArray(data)) return 0;

            var total = 0;
            for (var i = 0, l = data.length; i < l; i++) {
                var highlightNumber = parseInt(data[i].highlightNumber);
                if (highlightNumber === highlightNumber) {
                    total += highlightNumber;
                }
            }
            return total;
        }
    };







    $.fn.smartview = smartview;

});
