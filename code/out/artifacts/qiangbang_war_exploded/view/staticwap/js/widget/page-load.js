define("page-load",["zepto","common","underscore","juicer"],function(a,e,t){function n(a){for(var e=new Object,t=0;t<a.length;t++)e[a[t]]=new Object,e[a[t]].id=a[t],e[a[t]].page=window.page.activePage||0,e[a[t]].size=10,e[a[t]].canLoad=!0;return e}function o(a,e,t,n,o,i,c){if(1!=I){var r=o||"cndir",u=i||"page",m=c||"pageSize";I=!0,v[e].page++;var g={};g[r]=v[e].id,g[u]=v[e].page,g[m]=v[e].size,"all"==g[r]&&(g[r]=""),window.page.taskId&&(g.taskId=window.page.taskId),window.page.channelType&&(g.type=window.page.channelType),p.ajax({url:a,data:g,type:n,dataType:"json",success:function(a){d(e,t,a.data),I=!1,h.hide()},error:function(){s.animaTips("网络错误"),I=!1,h.hide()}})}}function i(a){a.forEach(function(a){0!=a.discountAmount?(a.decimal=a.discountAmount>parseInt(a.discountAmount)?(a.discountAmount-parseInt(a.discountAmount)).toFixed(2).slice(1):"",a.discountAmount=parseInt(a.discountAmount),a.amount==parseInt(a.amount)&&(a.amount=parseInt(a.amount))):(a.decimal=a.amount>parseInt(a.amount)?(a.amount-parseInt(a.amount)).toFixed(2).slice(1):"",a.amount=parseInt(a.amount)),parseInt(a.priceMinus)==a.priceMinus&&(a.priceMinus=parseInt(a.priceMinus)),parseInt(a.amountApp)==a.amountApp&&(a.amountApp=parseInt(a.amountApp)),a.grade<9?a.grade=1:a.grade<17?a.grade=2:a.grade<25?a.grade=3:a.grade<33&&(a.grade=4)})}function d(a,e,t){w.hide(),p('.page-item[data-cate-id="'+a+'"]').show(),t&&t.length>0?(i(t),c(a,e,t),v[a]&&v[a].page>3&&p('.page-item[data-cate-id="'+a+'"] .load-more').show()):(v[a].canLoad=!1,p('.page-item[data-cate-id="'+a+'"] .load-more').hide(),v[a].page>3&&p('.page-item[data-cate-id="'+a+'"] .load-over').show())}function c(a,e,t){var n={};n.list=t,p('.ul-dom[data-cate-id="'+a+'"]').append(g(e,n)),p('.ul-dom[data-cate-id="'+a+'"]').find("a").each(function(){p(this).attr("data-linkid",p(".tab-link.active").data("linkid"))}),p("img[data-image]").each(function(){var a=p(this);s.changeImgDefault(a,a.data("image"))}),s.canwebP(200)}function r(a,e,t,i,d,c,r){v=m.isArray(e)?n(e):e,p(window).on("scroll",function(){var e=p(".page-item:visible").data("cateId");if(!(I||!v[e].canLoad||v[e].page>3)){var n=l.scrollHeight-f.clientHeight-l.scrollTop;502>n&&(o(t,e,a,i,d,c,r),h.show())}}),p(".load-more").on("click",function(e){var n=p(e.target).parents(".page-item").data("cateId");o(t,n,a,i,d,c,r),h.show(),p(".page-item[data-cate-id="+n+"] .load-more").hide()})}function u(a,e,t,n){d(a,e,t),"function"==typeof n&&n()}var p=a("zepto"),s=a("common"),m=a("underscore"),g=a("juicer"),l=document.body,f=document.documentElement,h=p(".data-loading-status"),w=p(".page-item"),I=!1,v={};t.exports={pageLoad:r,loadData:o,loadFakeData:u}});