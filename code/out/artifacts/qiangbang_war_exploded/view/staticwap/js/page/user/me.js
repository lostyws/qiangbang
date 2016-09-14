seajs.use(['zepto','common','juicer','user-operation'], function($,Common,Juicer,UserOperation) {
	//数据定义
	var cate='all';
	var siftDom=$('.sift');
	var moreDom=$('.attach-menu');
	var orderSiftDom=$('.order-sift');
	var loadingDom=$('.list-data-loading');
	var tpl=$('#order-tpl').html();
	var body = document.body;
	var dde = document.documentElement;
	//分页加载数据定义
	var loading = false;
	var limitPage=4;
	//设置sift
	function createSift(status,cate){
	　　var obj = new Object();
	　　obj.size = 10;
	　　obj.page = 1;
	　　obj.canLoad = true;
		obj.status=status;
		obj.cate=cate;
	　　return obj;
　　}
    var allSift=createSift('0','all');
    var waitSift=createSift('1','wait');
    var ingSift=createSift('2|3|4','ing');
    var endSift=createSift('5|6|7','end');
	//头像
	// $('[data-src]').each(function(){
	// 	Common.changeImgDefault($(this),$(this).data('src'));
	// })
	// $.get('/user/avatar',function(json){
	$.get('http://127.0.0.1:3001',function(json){
		if(json.success){
			// Common.changeImgDefault($('.user-face img'),json.data);
		}
	})
	$.get('http://127.0.0.1:3001',function(json){
	// $.get('/user/balance',function(json){
		if(json.success){
			$('.my-money .num').text(json.data);
		}
	})
	//tab切换
	$('.order-sift button').on('click',function(){
		//切换显示
		var $this=$(this);
		cate=$this.data('status');
		$this.addClass('active').siblings().removeClass('active');
		var ulDom=$('.sift-content[data-sift="'+cate+'"]');
		ulDom.addClass('active').siblings().removeClass('active');
		//不同筛选首页加载
		if(!ulDom.find('ul').html()&&getSift(cate).canLoad){
			loading=true;
            loadingDom.show();
			loadData(getSift(cate));
		}
	});
	//默认进入加载首页数据
	loading=true;
    loadingDom.show();
	loadData(allSift);
	//getSift
	function getSift(cate){
		// var tempSift;
		if(cate=="all"){
			return allSift;
		}else if(cate=="wait"){
			return waitSift;	
		}else if(cate=="ing") {
			return ingSift;
		}else{
			return endSift;
		}
	}
	//启用筛选
	siftDom.on('click',function(){
		if(siftDom.hasClass('down')){
			siftDom.removeClass('down').addClass('up');
			orderSiftDom.addClass('showflex');
		}else{
			siftDom.removeClass('up').addClass('down');
			orderSiftDom.removeClass('showflex');
		}
	});
	//右上更多功能
	$('.more-action').on('click',function(){
		if(moreDom.hasClass('active')){
			moreDom.removeClass('active');
		}else{			
			moreDom.addClass('active');
		}
	})
	//获取数据
	function loadData(tempSift){
		$.ajax({
			// url:'/user/getUserInfoCenterTask',
			url:'http://127.0.0.1:3000',
			data:{page:tempSift.page,size:tempSift.size,status:tempSift.status},
			type:'GET',
			dataType:'json',
			success:function(json){
				if(json.list){
					if(json.list.length>0){
						renderTpl(tempSift.cate,json);
						tempSift.page++;
						if(tempSift.page>limitPage){
							$('.sift-content[data-sift="'+tempSift.cate+'"] .load-more').show();
						}
					}else{
						tempSift.canLoad=false;
						$('.sift-content[data-sift="'+tempSift.cate+'"] .load-more').hide();
						if(tempSift.page==1){
							$('.sift-content[data-sift="'+tempSift.cate+'"] .load-none').show();
						}else if($('.sift-content[data-sift="'+tempSift.cate+'"] ul').children().length>tempSift.size){
							$('.sift-content[data-sift="'+tempSift.cate+'"] .load-over').show();							
						}
					}
				}else{
					Common.animaTips('未知错误');
					$('.sift-content[data-sift="'+tempSift.cate+'"] .load-more').hide();
					$('.sift-content[data-sift="'+tempSift.cate+'"] .load-over').show();
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
		$('.sift-content[data-sift="'+cate+'"] ul').append(Juicer(tpl,data));
	}
	var topTitle=$('.top-bar h1');
	//滚动加载
	$(window).on('scroll',function(){
		if(topTitle.length>0){
			if(body.scrollTop>200){
				topTitle.show()
			}else{
				topTitle.hide()
			}
		}
		//获取sift
		var tempSift=getSift(cate);
		//无法加载
		if(loading||!tempSift.canLoad||tempSift.page>4){
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
		loadData(getSift(cate));
		$('.sift-content[data-sift="'+cate+'"] .load-more').hide();
		loadingDom.show();
	});
	$('body').delegate('.sure-tuoguan .sure', 'click', function(){
		var price = $('input[name="tuoguan-reward-input"]').val();
		var totalprice = $('input[name="totalprice"]').val();
		var percent = $('input[name="tuoguan-reward-percent"]').val();
		if(!UserOperation.testInputPriceAdd(price, totalprice,percent)){
			return;
		}
		location.href = '/pay/payorder?amount=' + price + '&taskId=' + $('input[name="userItemTaskId"]').val();
	});

	//托管
	UserOperation.userOperationArea.tuoguanReward();

	//订单跳转
	$('body').delegate('.order-item', 'click', function(){
		location.href = $(this).attr('data-url');
	});

	//已托管接着托管, 未托管则直接确认托管
	$('body').delegate('.next-tuoguan-no-percent .sure', 'click', function(e){
		e.preventDefault();
		e.stopPropagation();
		var price = $('input[name="tuoguan-reward-input"]').val();
		var notPayPrice = $('input[name="not-pay-price"]').val();
		if(!UserOperation.testInputPrice(price)){
			return;
		}
		if(price && notPayPrice ){
			if((Number(price)).toFixed(2) > Number(notPayPrice) || (Number(price)).toFixed(2) < 0){
				Common.animaTips('请输入小于未托管的金额');
				return;
			}
		}
		location.href = '/pay/payorder?amount=' + price + '&taskId=' + $('input[name="userItemTaskId"]').val();
	});
});
/*
1.在loadData()后loadingDom.show()
2.loadData()方法的最后loadingDom.hide()
3.page>4时，load-more.show()load-over.hide()
*/
/*
1.tab时无content则加载   
2.scroll时page小于5则加载
3.click时加载
4.canLoad=false时显示不可加载信息
*/