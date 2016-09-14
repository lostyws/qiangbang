import '{plugins}/bootstrap/css/bootstrap.min.css';
import '{plugins}/pace-master/themes/blue/pace-theme-flash.css';
import '{plugins}/fontawesome/css/font-awesome.css';
import '{plugins}/line-icons/simple-line-icons.css';
import '{public}/css/modern.min.css';
import '{public}/css/green.css';
import '{website}/css/common/common.css';

import '{plugins}/jquery/jquery-2.1.4.min';

import '{plugins}/bootstrap/js/bootstrap.min';
import '{public}/js/global';


// $(document).ready(function() {



//     // Fullscreen
//     function toggleFullScreen() {
//         if ((document.fullScreenElement && document.fullScreenElement !== null) ||
//             (!document.mozFullScreen && !document.webkitIsFullScreen)) {
//             if (document.documentElement.requestFullScreen) {
//                 document.documentElement.requestFullScreen();
//             } else if (document.documentElement.mozRequestFullScreen) {
//                 document.documentElement.mozRequestFullScreen();
//             } else if (document.documentElement.webkitRequestFullScreen) {
//                 document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
//             }
//         } else {
//             if (document.cancelFullScreen) {
//                 document.cancelFullScreen();
//             } else if (document.mozCancelFullScreen) {
//                 document.mozCancelFullScreen();
//             } else if (document.webkitCancelFullScreen) {
//                 document.webkitCancelFullScreen();
//             }
//         }
//     }

//     $('.toggle-fullscreen').click(function() {
//         toggleFullScreen();
//     });




//     // Sidebar Menu
//     var parent, ink, d, x, y;
//     $('.sidebar .accordion-menu li .sub-menu').slideUp(0);
//     $('.sidebar .accordion-menu li.open .sub-menu').slideDown(0);
//     $('.small-sidebar .sidebar .accordion-menu li.open .sub-menu').hide(0);
//     $('.sidebar .accordion-menu > li.droplink > a').click(function() {

//         if (!($('body').hasClass('small-sidebar')) && (!$('body').hasClass('page-horizontal-bar')) && (!$('body').hasClass('hover-menu'))) {

//             var menu = $('.sidebar .menu'),
//                 sidebar = $('.page-sidebar-inner'),
//                 page = $('.page-content'),
//                 sub = $(this).next(),
//                 el = $(this);

//             menu.find('li').removeClass('open');
//             $('.sub-menu').slideUp(200, function() {
//                 sidebarAndContentHeight();
//             });
//             sidebarAndContentHeight();

//             if (!sub.is(':visible')) {
//                 $(this).parent('li').addClass('open');
//                 $(this).next('.sub-menu').slideDown(200, function() {
//                     sidebarAndContentHeight();
//                 });
//             } else {
//                 sub.slideUp(200, function() {
//                     sidebarAndContentHeight();
//                 });
//             }
//             return false;
//         };
//     });

//     $('.sidebar .accordion-menu .sub-menu li.droplink > a').click(function() {

//         var menu = $(this).parent().parent(),
//             sidebar = $('.page-sidebar-inner'),
//             page = $('.page-content'),
//             sub = $(this).next(),
//             el = $(this);

//         menu.find('li').removeClass('open');
//         sidebarAndContentHeight();

//         if (!sub.is(':visible')) {
//             $(this).parent('li').addClass('open');
//             $(this).next('.sub-menu').slideDown(200, function() {
//                 sidebarAndContentHeight();
//             });
//         } else {
//             sub.slideUp(200, function() {
//                 sidebarAndContentHeight();
//             });
//         }
//         return false;
//     });

//     // Makes .page-inner height same as .page-sidebar height
//     var sidebarAndContentHeight = function() {
//         var content = $('.page-inner'),
//             sidebar = $('.page-sidebar'),
//             body = $('body'),
//             height,
//             footerHeight = $('.page-footer').outerHeight(),
//             pageContentHeight = $('.page-content').height();

//         content.attr('style', 'min-height:' + sidebar.height() + 'px !important');

//         if (body.hasClass('page-sidebar-fixed')) {
//             height = sidebar.height() + footerHeight;
//         } else {
//             height = sidebar.height() + footerHeight;
//             if (height < $(window).height()) {
//                 height = $(window).height();
//             }
//         }

//         if (height >= content.height()) {
//             content.attr('style', 'min-height:' + height + 'px !important');
//         }
//     };

//     sidebarAndContentHeight();

//     window.onresize = sidebarAndContentHeight;



// });
