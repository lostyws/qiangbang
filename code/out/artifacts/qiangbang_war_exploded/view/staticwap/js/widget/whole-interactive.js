define("whole-interactive",["zepto"],function(e){function l(){o=new IScroll("#wrapper",{scrollbars:!0,mouseWheel:!0,interactiveScrollbars:!0,shrinkScrollbars:"scale",fadeScrollbars:!0})}var n=e("zepto");e("iscroll-widget");var o;if(window.addEventListener("load",l,!1),n(".businessChance").length>0){var r=0,t=null;document.onscroll=function(){null==t&&(t=setInterval("judge()",3e3)),r=document.documentElement.scrollTop}}});