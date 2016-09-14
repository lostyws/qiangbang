<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/newhead.jsp" %>
<body>

    <div class="views">
      <div class="view view-main">
       <div class="navbar navbar-white">
				<div class="navbar-inner">
                    <div class="left">
                        <a class="link icon-only" href="javascript:history.go(-1)">
                            <i class="icon icon-back"></i>
                        </a>
                    </div>
					<div class="center sliding">消息中心</div>
					<div class="right">
						<span class="js-showMenu"><i class="icon icon-bars"></i></span>
					</div>
				</div>
			</div>
        <div class="pages navbar-through">
	        <div data-page="home" class="page">
            	<div class="page-content infinite-scroll">
            		<div class="infinite-scroll-preloader"></div>
            	</div>
	    	</div>
		</div>
      </div>
    </div>

<style>
.card-markRead {
	color: #AAA;
}

.infinite-scroll-preloader {
	margin-top: 10px;
	margin-bottom: 10px;
	text-align: center;
}
.infinite-scroll-preloader .preloader {
	width:34px;
	height:34px;
}
.nullTip {
	text-align: center;
}
.card .source {
	color: #999;
}
.card.already {
	color: #999;
}
.already a {
	color: #999;
}
.card-footer .link i {
    width: 0.8em;
    height: 0.8em;
    border-top: 2px solid #ddd;
    border-right: 2px solid #ddd;
    position: relative;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}
.card-content-inner {
	padding: 5px 15px;
}
.card-footer {
	color: #999;
}
.card-footer, .card-header {
    position: static;
}
</style>


<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
<script type="text/javascript">
//F7，此页面不可删除，会导致infinite方法不能用
var myApp = new Framework7(); 
var $$ = Dom7;

//添加菜单功能
qbApp.showMenu();





/*
 * 滚动到底部自动刷新
 * -----------------------------------------------------------------------------------------------------
 */

var loading = false;
var page = 0;//页码
var pageSize = 10;//每页返回数据条数
var maxItems = '';//数据最大条数

/*
 * 获取数据方法
 *---------------------------------
 * page: 页码，从1开始
 * pageSize: 一次请求条数，默认10条
 *
 *
 */
function getData(data){
	loading = true;
	$$.ajax({
		'url': 'http://127.0.0.1:3004',
		'type': 'post',
		'dataType': 'json',
		'data': {
			'page': data.page,
			'pageSize': data.pageSize
		},
		success: function(d){
			if(d.status == 0){
				page ++;
				loading = false;
				maxItems = d.data.total;//获取最大条数
				var message = d.data.message;//数组类型

			    //插入数据
			    var html = '';
			    for(var i = 0; i < message.length && i < data.pageSize; i++){
			    	//message_open: 0是未读状态，其他是已读状态
			    	var isRead = message[i].message_open == 0 ? '' : ' already';


			    	var message_time = new Date((message[i].message_time*1000)).format('YY-MM-DD hh:mm');


			    	var splitxt ="http://";
			    	var message_url='';
			    	var message_body = message[i].message_body.split(splitxt);

			    	if(message_body[1]){
			    		message_url = '<div class="card-footer"><span>'+ message_time +'</span><a href="javascript:void(0);" data-href="'+(splitxt+message_body[1])+'"  class="link external" mid="'+message[i].message_id+'">查看详情<i></i></a></div>'
			    	}
			    	html += 
					    	'<div class="card'+ isRead +'" >'+
								'<div class="card-header">'+ message[i].message_title +'</div>'+
								'<div class="card-content">'+
									'<div class="card-content-inner"><a href="javascript:void(0);" data-href="'+(splitxt+message_body[1])+'" mid="'+message[i].message_id+'" class="external">'+ message_body[0] +'</a></div>'+
								'</div>'+message_url+
							'</div>';
			    }
			    $$(html).insertBefore('.infinite-scroll-preloader');
			    //已加载完成的时候，把infinite方法禁止掉，并且把loading状态清楚掉
			    var maxPage = Math.ceil(maxItems/pageSize);
			    //当不够一页的时候，移除loading状态
			    if($$('.infinite-scroll .card').length <= data.pageSize && maxPage == 1){
			    	$$('.infinite-scroll-preloader').remove();
			    }
			    if(page > maxPage){
			    	//添加没有数据的提示
			    	var nullHtml = '<p class="nullTip">没有数据啦~~</p>';
			    	$$(nullHtml).insertBefore('.infinite-scroll-preloader');
			    	myApp.detachInfiniteScroll($$('.infinite-scroll'));
			    	$$('.infinite-scroll-preloader').remove();
			    }



			    $$(".card a").click(function() {
			    	var mid = $$(this).attr("mid"),
                        _this = $$(this);
			    	if(mid){
			    		$$.ajax({
			    			'url': '/stationletter/read.do',
			    			'data': {
			    				'messageId': mid
			    			},
                            success: function(d){
                                if(d.status == '0'){
                                    window.location.href = _this.data("href");
                                }
                            },error: function(){
					            myApp.hideIndicator();
					            myApp.alert('加载失败，请刷新重试！');
					        }
			    		})
			    	}
			    })
			}else{
				myApp.hideIndicator();
	            myApp.alert('1111111111！');
			}
		},error: function(){
            myApp.hideIndicator();
            myApp.alert('加载失败，请刷新重试！');
        }
	})
}
// 初始调用，页面加载10条
getData({
	'page': page,
	'pageSize': pageSize
})
//滚动到页面底部再去调用
$$('.infinite-scroll').on('infinite', function () {
	if (loading) return;	
	getData({
		'page': page,
		'pageSize': pageSize
	})
});



/*
 * 滚动到底部自动刷新结束
 * -----------------------------------------------------------------------------------------------------
 */
</script>
  


</body>
</html>