/**
 * Created by Administrator on 2016/5/20.
 */
seajs.use(['zepto', 'swipe','common','calling-download'], function($, Swipe,Common,callingCownload) {
	
	var slider = $('#slider');
    var indicators = $('.service-nav li');
    var indexSlider;
    var title=$('.top-bar h1');
    if(title.length>0&&title.text().length>10){
        title.text(title.text().slice(0,10)+"...");
    }
    if (slider) {
        indexSlider = new Swipe(slider[0], {
            speed: 400,
            auto: 5000,
            continuous: true,
            callback: function (index) {
                indicators.removeClass('active');
                indicators.eq(index).addClass('active');
            }
        });
    }

    //购买
    var buyDom=$('.buy-btn');
    var buyFaildDom=$('.popup.buy-faild');
    var guaranteeNotDom=$('.popup.guarantee-not');
    var closeDom=$('.close');
    var popupDom=$('.popup');
    var goBuyDom=$('.go-buy');
    //产品临时取消弹窗，或许后期又会恢复，故不要删
    //buyDom.on('click',function(e){
    //    // if(1!=1){
    //    //     buyFaildDom.show();
    //    // }else
    //    e.preventDefault();
    //    if(param.guaranteeFlag=="0"){
    //        guaranteeNotDom.show();
    //    }else{
    //        location.href=buyDom.attr('href');
    //    }
    //})
    closeDom.on('click',function(){
        popupDom.hide();
    })
    goBuyDom.on('click',function(){
        location.href=buyDom.attr('href');
    })
  
	
	$('body').delegate('.sure-tuoguan .sure', 'click', function(){
		var price = $('input[name="tuoguan-reward-input"]').val();
		var totalprice = $('input[name="totalprice"]').val();
		var percent = $('input[name="tuoguan-reward-percent"]').val();
		if(!UserOperation.testInputPriceAdd(price, totalprice,percent)){
			return;
		}
		location.href = '/pay/payorder?amount=' + price + '&taskId=' + $('input[name="userItemTaskId"]').val();
	});

	

	//订单跳转
	$('body').delegate('.order-item', 'click', function(){
		location.href = $(this).attr('data-url');
	});
})