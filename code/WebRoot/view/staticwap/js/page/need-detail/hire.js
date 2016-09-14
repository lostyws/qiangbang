/**
 * Created by yws on 16/3/9.
 */
seajs.use(['zepto','common','juicer','calling-download','pic-view'], function($, Common, Juicer, callingDownload, PicView){
    Common.osDetect();

    var slideCon = $('.content-slidedown-con');
    var slideBtn = $('.content-slidedown-btn');
    var descHeight = slideCon.height();

    var hire = {
        init: function(){
            this.detailSlideDownUp();
        },
        detailSlideDownUp: function(){
            if(descHeight>40){
                Common.contentSlideDown(slideCon,slideBtn,'40');
                slideBtn.removeClass('hide');
            }else{
                Common.contentSlideDown(slideCon,slideBtn,descHeight);
                slideBtn.addClass('hide');
            }
        }
    };

    hire.init();

    //浏览图片
    PicView.startView();
});