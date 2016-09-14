seajs.use(['zepto', 'common', 'swipe-3', 'juicer','components/refer-statistics/refer-statistics'], function ($, Common, Swipe, Juicer,ReferStatistics) {
    var swiper = new Swiper('.js-swiper-service', {
        pagination: '.js-swiper-pagination-service',
        paginationClickable: true,
        autoplay: false,
        autoplayDisableOnInteraction: false,
        observeParents: true,
        observer: true
    });
    //jyj  input事件
    var divService = $('#inputService');
    var inputService = divService.find('input.idx-text');
    var selServiceDiv = $('#selServiceDiv');
    var selServiceCons = selServiceDiv.find('a');
    var divPhoneNum = $('#inputPhoneNum');
    var inputPhoneNum = divPhoneNum.find('input.idx-text');
    var iptSubmit = $('#iptSubmit');
     window.keyword="";
    inputService.on("focus keyup change", function () {
        keyword=$.trim(inputService.val());
        if (!(divService.hasClass('idx-text-focus'))) {
            divService.addClass('idx-text-focus');
            // divPhoneNum.removeClass('idx-text-focus');
            divPhoneNum.removeClass('idx-text-focus');
            selServiceDiv.show(300);
        }
    });
    inputService.on('blur', function () {
        divService.removeClass('idx-text-focus');
        selServiceDiv.hide(200);
    });
    selServiceCons.click(function () {
        selServiceCons.removeClass('colskin');
        $(this).addClass('colskin');
        inputService.val($(this).text());
        keyword=inputService.val();
    });
    inputPhoneNum.on("focus", function () {
        if (!(divPhoneNum.hasClass('idx-text-focus'))) {
            divService.removeClass('idx-text-focus');
            // divPhoneNum.removeClass('idx-text-focus');
            selServiceDiv.hide(200);
            divPhoneNum.addClass('idx-text-focus');
        }

    });
    inputPhoneNum.on("blur", function () {
        divPhoneNum.removeClass('idx-text-focus');
    });
    iptSubmit.click(function (e) {
        var $this = $(this);
        var iptS = $.trim(inputService.val());
        keyword=iptS;
        var iptNum = $.trim(inputPhoneNum.val());
        inputPhoneNum.val(iptNum);
        var myreg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
        if (!iptS) {
            Common.animaTips('请输入需求');
            return false;
        }
        if (!myreg.test(iptNum)) {
            Common.animaTips('请输入正确的手机号');
            return false;
        }
        $this.val("提交中...");
        var url = '/chance/createBChance?from=2';
        //统计
        var referParam= '&'+ReferStatistics.getStatisticsData()+'&pub_page='+encodeURIComponent(location.href);
        $.ajax({
            type: 'POST',
            url:url + referParam,
            data: $('#shangjiForm').serialize(),
            dataType: 'json',
            success: function (json) {
                if (!json) {
                    Common.animaTips('提交失败,请重新提交！');
                    $this.val("马上为我服务");
                    return false;
                }
                if (json.success) {
                    Common.animaTips('需求已提交');
                    $this.val("马上为我服务");
                    inputService.val('').removeClass('idx-text-focus');
                    inputPhoneNum.val('').removeClass('idx-text-focus')
                } else {
                    $this.val("马上为我服务");
                    Common.animaTips(json.data);
                }
            },
            error: function () {
                Common.animaTips('网络错误');
                $this.val("马上为我服务");
            }

        });
        e.stopPropagation();
        return false;
    });


//列表异步加载
    var loadBar = $('.data-loading-status'),
        loadBtn = $('#load-more'),
        noDataStatus = $('#no-data-status'),
        hasWork=$('#hasWork');
    var url = '/task/case/page';
    var city = true;
    var page = 0;
    var pagesize = 1;
    var isLoading = false;
    var postNum = true;
    // $(window).scroll(function () {
    //     var start_h = $('#hotService').offset().top;
    //     var win_h = $(this).scrollTop() + $(this).height();
    //     if (win_h >= start_h) {
    //         //请求
    //         if (postNum) {
    //             loadData();
    //             postNum = false;
    //             pagesize = 3;
    //         }
    //     }
    // });
    $(window).trigger("scroll");
    function loadData() {
        if(keyword.length>0){
            var URL = url + '?pagesize=' + pagesize + '&page=' + page + '&city=' + city+'&keyword='+keyword;
        }else{
            var URL = url + '?pagesize=' + pagesize + '&page=' + page + '&city=' + city;
        }
        if (!isLoading) {
            isLoading = true;
            loadBtn.hide();
            loadBar.show();
            postJson(URL, function (data) {
                if (data.success) {
                    //没有数据就不要显示了
                    if (data.data.length > 0) {
                        var tpl = document.getElementById('tpl').innerHTML;
                        var html = Juicer(tpl, data);
                        $('.idx-zscq-infolist').append(html);
                        loadBar.hide();
                        loadBtn.show();
                        isLoading = false;
                        page++;
                    } else {
                        loadBar.hide();
                        isLoading = false;
                        if (page == 0) {
                            $('#hasWork').hide();
                           return false
                        } else {
                            noDataStatus.show();
                        }

                    }
                } else {
                    if (data.code == 1) {
                        Common.animaTips(data.data);
                    }
                    loadBar.hide();
                    isLoading = false;
                    loadBtn.hide();
                    //window.page.moreData = false; //防止请求数据返回空数组的时候继续发起请求
                }


            }, function (err1, err2, err3) {
                loadBar.hide();
                Common.animaTips('网络错误');
                loadBtn.show();
            });

        }
    }

    function postJson(url, success, error) {
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            contentType: 'application/json',
            success: success,
            error: error

        })
    }


    loadBtn.click(function () {
        loadData();
    })
})