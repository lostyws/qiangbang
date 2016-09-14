seajs.use(['zepto','underscore','common','cookie','juicer','iscroll'],function($,_,Common,Cookie,Juicer,iScroll){
    var serviceTpl=$('#service-tpl').html();
    $('img[data-image]').each(
        function(){
            var $this=$(this);
            Common.changeImgDefault($this,$this.data('image'));
        }
    );
    //切换搜索类型
    function changeSearchType(){
        var searchType=$('.search-type');
        var searchTypeSpan=$('.search-type span');
        var searchTypeLi=$('.search-type li');
        function initType(){
            switch(Cookie.get('searchType')){
                case 'SERVICE':
                    searchTypeSpan.text('服务');
                    $('.service-cate').hide().siblings().show();
                    // searchTypeLi.removeClass('active').eq(0).addClass('active');
                    break;
                case 'SHOP':
                    searchTypeSpan.text('店铺');
                    $('.shop-cate').hide().siblings().show();
                    // searchTypeLi.removeClass('active').eq(1).addClass('active');
                    break;
                case 'TASK':
                    searchTypeSpan.text('案例');
                    $('.task-cate').hide().siblings().show();
                    // searchTypeLi.removeClass('active').eq(2).addClass('active');
                    break;
                default:
                    Cookie.set('searchType','SERVICE');
                    searchTypeSpan.text('服务');
                    $('.service-cate').hide().siblings().show();
                    // searchTypeLi.removeClass('active').eq(0).addClass('active');
                    break;
            }
        }
        initType();
        searchType.on('click',function(){
            $(this).toggleClass('active');
        });
        searchTypeLi.on('click',function(){
            var $this=$(this);
            Cookie.set('searchType',$this.data('type'));
            $this.hide().siblings().show();
            searchType.find('span').text($this.text());
        });
    }
    //搜索
    function search(){
        var searchText=$('.search-text');
        var searchBtn=$('.search-btn');
        var clearValue=$('.clear-value');
        if(searchText.val()){
            clearValue.addClass('active');
        }else{
            clearValue.removeClass('active');
        }
        searchText.on('input',function(){
            if(searchText.val()){
                clearValue.addClass('active');
            }else{
                clearValue.removeClass('active');
            }
        })
        clearValue.on('click',function(){
            searchText.val('');
            clearValue.removeClass('active');
        })
        searchBtn.on('click',function(){
            if(searchText.val()){
                addHistory('searchHistory',searchText.val());
                location.href='/search/searchbykey?keyword='+searchText.val();
            }else{
                Common.animaTips('请输入关键字！');
            }
        });
    }
    //类目切换
    function changeCate(){
        var cateItem=$('.search-cate .cate-item');
        var secondCate=$('.second-cate');
        cateItem.on('click',function(){
            var $this=$(this);
            cateItem.removeClass('active');
            secondCate.removeClass('active');
            $this.addClass('active');
            $('.second-cate[data-cate="'+$(this).data('cate')+'"]').addClass('active');
            $('.search-group').removeClass('active');
            if($this.data('cate')=='history'){
                $('.search-group[data-cate="history"]').addClass('active');
            }else if($this.data('cate')=='hot'){
                $('.search-group[data-cate="hot"]').addClass('active');
            }
        });
    }
    //搜索历史
    function addHistory(key,item){
        var history=Cookie.get(key);
        if(!history){
            history='';
        }
        history=item+','+history;
        history=history.split(',');
        history=_.without(history,'');
        history=_.uniq(history);
        history.splice(10,10);
        history=history.toString();
        Cookie.set(key,history);
        searchHistory();
    }
    function clearHistory(){
        Cookie.set('searchHistory','');
    }
    function searchHistory(){
        var tpl=$('#history-tpl').html();
        var historyGroup=$('.second-cate[data-cate="history"]');
        var searchHistory={};
        if(Cookie.get('searchHistory')){
            searchHistory.data=Cookie.get('searchHistory').split(',');
            historyGroup.html(Juicer(tpl,searchHistory));
            if($('.cate-item.active').data('cate')=="history"){
                historyGroup.show();
            }
        }else{
            historyGroup.hide();
        }
    }
    function viewHistory(){
        var viewHistory;

        if(!Cookie.get('viewHistory')){
            $('.search-group[data-cate="history"] .service-list,.search-group[data-cate="history"] .search-hot').remove();
            if(!Cookie.get('searchHistory')){
                $('.no-view-rec').addClass('active');
            }
        }else{
            loadHistory();
        }
        searchHistory();
    }
    var historyPage=0;
    function loadHistory(){
        if(Cookie.get('viewHistory')){
            var viewHistory=Cookie.get('viewHistory').split(',');
            var loadList=viewHistory.slice(historyPage*10,historyPage*10+10);
            if(loadList.length>0){
                $.get('/service/searchServRecViewed',{serv:loadList.toString()},function(json){
                    if(json.success){
                        $('.search-group[data-cate="history"] .service-list').append(Juicer(serviceTpl,json));
                        $('img[data-image]').each(
                            function(){
                                var $this=$(this);
                                Common.changeImgDefault($this,$this.data('image'));
                            }
                        );
                    }else{
                        Common.animaTips(json.data);
                    }
                })
                historyPage++;
            }
        }
    }
    //服务加载
    function loadService(){
        //获取数据
        var url="/service/hotServiceList";
        var page=1;
        var size=10;
        var limitPage=2;
        var loading=false;
        var canLoad=true;
        var tpl=$('#service-tpl').html();
        var body = document.body;
        var dde = document.documentElement;
        var ulDom=$('.search-group[data-cate="hot"] .service-list');
        var loadingDom=$('.list-data-loading');
        var loadMoreDom=$('.load-more');
        var loadNoneDom=$('.load-none')
        var loadOverDom=$('.load-over');
        function loadData(){
            $.ajax({
                url:url,
                data:{page:page,pagesize:size},
                type:'GET',
                dataType:'json',
                success:function(json){
                    if(json.success){
                        if(json.data&&json.data.length>0){
                            canLoad=true;
                            renderTpl(json);
                            page++;
                        }else{
                            canLoad=false;
                            loadMoreDom.hide();
                            if(page==1){
                                loadNoneDom.show();
                            }else if(ulDom.children().length>size){
                                loadOverDom.show();
                            }
                        }
                    }else{
                        if(json.code==1){
                            Common.animaTips(json.data);
                        }
                        canLoad=false;
                        loadMoreDom.hide();
                        if(page==1){
                            loadNoneDom.show();
                        }else if(ulDom.children().length>size){
                            loadOverDom.show();
                        }
                    }
                    loading=false;
                    loadingDom.hide();
                },
                error:function(){
                    Common.animaTips('网络错误');
                    canLoad=false;
                    loading=false;
                    loadingDom.hide();
                }
            })
        }
        //渲染当前模板
        function renderTpl(data){
            ulDom.append(Juicer(tpl,data));
            $('img[data-image]').each(
                function(){
                    var $this=$(this);
                    Common.changeImgDefault($this,$this.data('image'));
                }
            );
        }
        //滚动加载
        $('.search-recommend').on('scroll',function(){
            // console.log(1);
            var critical = $(this).get(0).scrollHeight - dde.clientHeight - $(this).get(0).scrollTop;
            if(critical < 502){
                // loading=true;
                if($('.search-group[data-cate="history"]').hasClass('active')){
                    loadHistory();
                }
            }
            //无法加载
            if(loading||!canLoad||page>2){
                return;
            }
            if(critical < 502){
                loading=true;
                if($('.search-group[data-cate="hot"]').hasClass('active')){
                    loadData();
                    loadingDom.show();
                }
            }
        });
    }

    function coverStatus(){
        var searchContent = $('.search-content');
        var wraper = $('.cover-download-app');
        $('.cover-download-app .close').bind('click', function(){
            searchContent.removeClass('slideDown');
            wraper.removeClass('current');
            Cookie.set('searchPageCoverDownload',1);
        });
        if(Cookie.get('searchPageCoverDownload')){
            searchContent.removeClass('slideDown');
            wraper.removeClass('current');
        }else {
            searchContent.addClass('slideDown');
            wraper.addClass('current');
        }
    }
    Common.coverDownloadApp();
//    changeSearchType();
    changeCate();
    search();
    viewHistory();
    loadService();
    coverStatus();
})



