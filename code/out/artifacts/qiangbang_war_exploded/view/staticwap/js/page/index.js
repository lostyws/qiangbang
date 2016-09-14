seajs.use(['zepto','common', 'swipe-3'], function($, Common, Swipe) {

    var swiper = new Swiper('.js-swiper-container', {
        pagination: '.js-swiper-pagination',
        paginationClickable: true,
        // spaceBetween: 30,
        // centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });

    var swiper = new Swiper('.js-swiper-container-6', {
        pagination: '.js-swiper-pagination-6',
        paginationClickable: true,
        // spaceBetween: 30,
        // centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });

    $('.idx-top').click(function(){
        window.scrollTo(0,0);
    });

    Common.coverDownloadApp();

    window.onscroll = function(){
        var wraperDownload = $('.cover-download-app');
        if($(window).scrollTop() > 44) {
            wraperDownload.addClass('fixed');
        }else{
            wraperDownload.removeClass('fixed');
        }
    }
})