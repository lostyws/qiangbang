seajs.use(['zepto', 'juicer','common','calling-download'], function($, Juicer, Common, callingDownload) {
	//初始化Framework7
	var myApp = new Framework7({
	//Tell Framework7 to compile templates on app init
	    precompileTemplates: true
	});
	var $$ = Framework7.$;
	var title=$('.top-bar h1');
    if(title.length>0&&title.text().length>10){
        title.text(title.text().slice(0,10)+"...");
    }
    var tpl=$('#tpl').html();
    var body = document.body;
    var dde = document.documentElement;
    var rateNav = $('.rate-nav li'),
        rateTab = $('.rate-tab'),
        loadingDom = $('.list-data-loading'),
        limit=10,
        limitOffset=40,
        loading = false;
    var focusStatus = {
        "focusId": "good",
        "userId": shopId,
        "good":{
            "offset": 10,
            "type": 1,
            "cate":"good",
            "canLoad":true
        },
        "normal": {
            "offset": 0,
            "type": 2,
            "cate":"normal",
            "canLoad":true
        },
        "bad": {
            "offset": 0,
            "type": 3,
            "cate":"bad",
            "canLoad":true
        }
    }
    //tab切换
    rateNav.click(function(event) {
        var $this = $(this);
        focusStatus.focusId = $this.data('category');
        //切换tab title
        rateNav.removeClass('active');
        $this.addClass('active');
        //切换tab content
        rateTab.hide();
        var showTab=$('#' + focusStatus.focusId);
        showTab.show();
        if(!showTab.find('ul').html()&&focusStatus[focusStatus.focusId].canLoad){
            loading=true;
            loadingDom.show();
            loadData(focusStatus[focusStatus.focusId]);
        }
    });
    //获取数据
    function loadData(tempSift){
        $.ajax({
            url:'/shop/loadMoreEvaluation',
//            url:'http://127.0.0.1:3002',
            data:{offset:tempSift.offset,limit:limit,type:tempSift.type,userid:shopId},
            type:'POST',
            dataType:'json',
            success:function(json){
                if(json.success){
                    if(json.data.evaluate&&json.data.evaluate.evaluateList&&json.data.evaluate.evaluateList.length>0){
                        renderTpl(tempSift.cate,json.data.evaluate);
                        
                        tempSift.offset+=10;
                        if(tempSift.offset>limitOffset){
                            $('#'+tempSift.cate+' .load-more').show();
                        }
                    }else{
                        tempSift.canLoad=false;
                        $('#'+tempSift.cate+' .load-more').hide();
                        if(tempSift.offset==0&&tempSift.type!=1){
                            $('#'+tempSift.cate+' .load-none').show();
                        }else if($('#'+tempSift.cate+' ul').children().length>limit){
                            $('#'+tempSift.cate+' .load-over').show();
                        }
                    }
                }else{
                    tempSift.canLoad=false;
                    Common.animaTips(json.data);
                    $('#'+tempSift.cate+' .load-more').hide();
                    // $('#'+tempSift.cate+' .load-over').show();
                }
                loading=false;
                loadingDom.hide();
            },
            error:function(){
                Common.animaTips('网络错误');
                loading=false;
                loadingDom.hide();
            }
        })
    }
    //渲染当前模板
    function renderTpl(cate,data){
       
        $('#'+cate+' ul').append(Template7.templates.tpl2(data));
    }
    //滚动加载
    $(window).on('scroll',function(){
        //获取sift
        var tempSift=focusStatus[focusStatus.focusId];
        //无法加载
        if(loading||!tempSift.canLoad||tempSift.offset>40){
            return;
        }
        var critical = body.scrollHeight - dde.clientHeight - body.scrollTop;
        if(critical < 502){
            loading=true;
            loadData(tempSift);
            loadingDom.show();
        }
    })
    $('.load-more button').on('click',function(){
        loading=true;
        loadData(focusStatus[focusStatus.focusId]);
        $('#'+focusStatus.focusId+' .load-more').hide();
        loadingDom.show();
    });
})
