webpackJsonp([2],{0:function(e,t,i){e.exports=i(43)},43:function(e,t,i){(function(e){function t(e){return e&&e.__esModule?e:{"default":e}}function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function o(t,i,n){return console.log("singleAdd"),new Dropzone(t,{url:"/file/upload_wap?ftype=2",previewsContainer:".preview-none",maxFilesize:n||1,acceptedFiles:"image/*",sending:function(e,t,i){i.append("type",1)},success:function(t,i){return 0!==i.status?void l["default"].msg(i.message||"上传失败"):(e("#img_upload").val(i.data.filename),void e(".dropzone-warp").html('<img src="'+i.data.filename+'" class="small-img"/>'))},error:function(e,t){console.log(e);var n=e.size;return n>204800&&i?void l["default"].msg(i):void l["default"].msg(t)},complete:function(t){util.loading.hide(),setTimeout(function(){e(".dropzone-warp").find("img").show().removeAttr("style")},300)}})}function a(){f=o(".js-dropzoneImg","广告位图片请控制在1M以内！")}i(3),i(9),i(44),i(46),i(15);var r=i(37);t(r);i(36),i(48);var s=i(49),l=t(s),f=null;a(),e(".form-horizontal").Validform(n({tiptype:3,btnSubmit:".add_adv_submit",datatype:{"sn1-100":/^[\d\w]{1,100}$/},showAllError:!0},"tiptype",function(t,i,n){if(!i.obj.is("div")){var o=i.obj.attr("name"),a=e("#"+o+"_msg");return n(a,i.type),a.text(t),!1}})),e("#add_adv_submit").click(function(){if(e(".Validform_wrong").length>0)return!1;var t={title:e(".form-group input[name='title']").val(),adv_url:e(".form-group input[name='adv_url']").val(),content:e(".form-group input[name='content']").val()};e.ajax({type:"post",url:"/banner/add",data:t,dataType:"json",success:function(t){return 0!=t.status?(t.data?(e("#"+t.data.filed+"_msg").html(t.data.vail_error),e("#"+t.data.filed+"_msg").addClass("watting-msg")):l["default"].msg(t.msg,{icon:1}),!1):(l["default"].msg(t.msg,{icon:1}),void(window.location.href="/banner/index"))}})})}).call(t,i(2))},44:function(e,t){},46:function(e,t){},49:function(e,t,i){var n;(function(o){var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};!function(r,s){"use strict";var l,f,c={getPath:function(){var e=document.scripts,t=e[e.length-1],i=t.src;if(!t.getAttribute("merge"))return i.substring(0,i.lastIndexOf("/")+1)}(),enter:function(e){13===e.keyCode&&e.preventDefault()},config:{},end:{},btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],type:["dialog","page","iframe","loading","tips"]},u={v:"2.0",ie6:!!r.ActiveXObject&&!r.XMLHttpRequest,index:0,path:c.getPath,config:function(e,t){var i=0;return e=e||{},u.cache=c.config=l.extend(c.config,e),u.path=c.config.path||u.path,"string"==typeof e.extend&&(e.extend=[e.extend]),u.use("skin/layer.css",e.extend&&e.extend.length>0?function n(){var o=e.extend;u.use(o[o[i]?i:i-1],i<o.length?function(){return++i,n}():t)}():t),this},use:function(e,t,i){var n=l("head")[0],e=e.replace(/\s/g,""),o=/\.css$/.test(e),a=document.createElement(o?"link":"script"),r="layui_layer_"+e.replace(/\.|\//g,"");return u.path?(o&&(a.rel="stylesheet"),a[o?"href":"src"]=/^http:\/\//.test(e)?e:u.path+e,a.id=r,l("#"+r)[0]||n.appendChild(a),function s(){(o?1989===parseInt(l("#"+r).css("width")):u[i||r])?function(){t&&t();try{o||n.removeChild(a)}catch(e){}}():setTimeout(s,100)}(),this):void 0},ready:function(e,t){var i="function"==typeof e;return i&&(t=e),u.config(l.extend(c.config,function(){return i?{}:{path:e}}()),t),this},alert:function(e,t,i){var n="function"==typeof t;return n&&(i=t),u.open(l.extend({content:e,yes:i},n?{}:t))},confirm:function(e,t,i,n){var o="function"==typeof t;return o&&(n=i,i=t),u.open(l.extend({content:e,btn:c.btn,yes:i,cancel:n},o?{}:t))},msg:function(e,t,i){var n="function"==typeof t,o=c.config.skin,a=(o?o+" "+o+"-msg":"")||"layui-layer-msg",r=p.anim.length-1;return n&&(i=t),u.open(l.extend({content:e,time:3e3,shade:!1,skin:a,title:!1,closeBtn:!1,btn:!1,end:i},n&&!c.config.skin?{skin:a+" layui-layer-hui",shift:r}:function(){return t=t||{},(-1===t.icon||t.icon===s&&!c.config.skin)&&(t.skin=a+" "+(t.skin||"layui-layer-hui")),t}()))},load:function(e,t){return u.open(l.extend({type:3,icon:e||0,shade:.01},t))},tips:function(e,t,i){return u.open(l.extend({type:4,content:[e,t],closeBtn:!1,time:3e3,maxWidth:210},i))}},d=function(e){var t=this;t.index=++u.index,t.config=l.extend({},t.config,c.config,e),t.creat()};d.pt=d.prototype;var p=["layui-layer",".layui-layer-title",".layui-layer-main",".layui-layer-dialog","layui-layer-iframe","layui-layer-content","layui-layer-btn","layui-layer-close"];p.anim=["layui-anim","layui-anim-01","layui-anim-02","layui-anim-03","layui-anim-04","layui-anim-05","layui-anim-06"],d.pt.config={type:0,shade:.3,fix:!0,move:p[1],title:"&#x4FE1;&#x606F;",offset:"auto",area:"auto",closeBtn:1,time:0,zIndex:19891014,maxWidth:360,shift:0,icon:-1,scrollbar:!0,tips:2},d.pt.vessel=function(e,t){var i=this,n=i.index,o=i.config,r=o.zIndex+n,s="object"==a(o.title),l=o.maxmin&&(1===o.type||2===o.type),f=o.title?'<div class="layui-layer-title" style="'+(s?o.title[1]:"")+'">'+(s?o.title[0]:o.title)+"</div>":"";return o.zIndex=r,t([o.shade?'<div class="layui-layer-shade" id="layui-layer-shade'+n+'" times="'+n+'" style="'+("z-index:"+(r-1)+"; background-color:"+(o.shade[1]||"#000")+"; opacity:"+(o.shade[0]||o.shade)+"; filter:alpha(opacity="+(100*o.shade[0]||100*o.shade)+");")+'"></div>':"",'<div class="'+p[0]+" "+(p.anim[o.shift]||"")+(" layui-layer-"+c.type[o.type])+(0!=o.type&&2!=o.type||o.shade?"":" layui-layer-border")+" "+(o.skin||"")+'" id="'+p[0]+n+'" type="'+c.type[o.type]+'" times="'+n+'" showtime="'+o.time+'" conType="'+(e?"object":"string")+'" style="z-index: '+r+"; width:"+o.area[0]+";height:"+o.area[1]+(o.fix?"":";position:absolute;")+'">'+(e&&2!=o.type?"":f)+'<div class="layui-layer-content'+(0==o.type&&-1!==o.icon?" layui-layer-padding":"")+(3==o.type?" layui-layer-loading"+o.icon:"")+'">'+(0==o.type&&-1!==o.icon?'<i class="layui-layer-ico layui-layer-ico'+o.icon+'"></i>':"")+(1==o.type&&e?"":o.content||"")+'</div><span class="layui-layer-setwin">'+function(){var e=l?'<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>':"";return o.closeBtn&&(e+='<a class="layui-layer-ico '+p[7]+" "+p[7]+(o.title?o.closeBtn:4==o.type?"1":"2")+'" href="javascript:;"></a>'),e}()+"</span>"+(o.btn?function(){var e="";"string"==typeof o.btn&&(o.btn=[o.btn]);for(var t=0,i=o.btn.length;i>t;t++)e+='<a class="'+p[6]+t+'">'+o.btn[t]+"</a>";return'<div class="'+p[6]+'">'+e+"</div>"}():"")+"</div>"],f),i},d.pt.creat=function(){var e=this,t=e.config,i=e.index,n=t.content,o="object"==("undefined"==typeof n?"undefined":a(n));switch("string"==typeof t.area&&(t.area="auto"===t.area?["",""]:[t.area,""]),t.type){case 0:t.btn="btn"in t?t.btn:c.btn[0],u.closeAll("dialog");break;case 2:var n=t.content=o?t.content:[t.content||"http://sentsin.com?from=layer","auto"];t.content='<iframe scrolling="'+(t.content[1]||"auto")+'" allowtransparency="true" id="'+p[4]+i+'" name="'+p[4]+i+'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="'+t.content[0]+'"></iframe>';break;case 3:t.title=!1,t.closeBtn=!1,-1===t.icon&&0===t.icon,u.closeAll("loading");break;case 4:o||(t.content=[t.content,"body"]),t.follow=t.content[1],t.content=t.content[0]+'<i class="layui-layer-TipsG"></i>',t.title=!1,t.shade=!1,t.fix=!1,t.tips="object"==a(t.tips)?t.tips:[t.tips,!0],t.tipsMore||u.closeAll("tips")}e.vessel(o,function(a,r){l("body").append(a[0]),o?function(){2==t.type||4==t.type?function(){l("body").append(a[1])}():function(){n.parents("."+p[0])[0]||(n.show().addClass("layui-layer-wrap").wrap(a[1]),l("#"+p[0]+i).find("."+p[5]).before(r))}()}():l("body").append(a[1]),e.layero=l("#"+p[0]+i),t.scrollbar||p.html.css("overflow","hidden").attr("layer-full",i)}).auto(i),2==t.type&&u.ie6&&e.layero.find("iframe").attr("src",n[0]),l(document).off("keydown",c.enter).on("keydown",c.enter),4==t.type?e.tips():e.offset(),t.fix&&f.on("resize",function(){e.offset(),(/^\d+%$/.test(t.area[0])||/^\d+%$/.test(t.area[1]))&&e.auto(i),4==t.type&&e.tips()}),t.time<=0||setTimeout(function(){u.close(e.index)},t.time),e.move().callback()},d.pt.auto=function(e){function t(e){e=o.find(e),e.height(a[1]-r-s-2*(0|parseFloat(e.css("padding"))))}var i=this,n=i.config,o=l("#"+p[0]+e);""===n.area[0]&&n.maxWidth>0&&(/MSIE 7/.test(navigator.userAgent)&&n.btn&&o.width(o.innerWidth()),o.outerWidth()>n.maxWidth&&o.width(n.maxWidth));var a=[o.innerWidth(),o.innerHeight()],r=o.find(p[1]).outerHeight()||0,s=o.find("."+p[6]).outerHeight()||0;switch(n.type){case 2:t("iframe");break;default:""===n.area[1]?n.fix&&a[1]>=f.height()&&(a[1]=f.height(),t("."+p[5])):t("."+p[5])}return i},d.pt.offset=function(){var e=this,t=e.config,i=e.layero,n=[i.outerWidth(),i.outerHeight()],o="object"==a(t.offset);e.offsetTop=(f.height()-n[1])/2,e.offsetLeft=(f.width()-n[0])/2,o?(e.offsetTop=t.offset[0],e.offsetLeft=t.offset[1]||e.offsetLeft):"auto"!==t.offset&&(e.offsetTop=t.offset,"rb"===t.offset&&(e.offsetTop=f.height()-n[1],e.offsetLeft=f.width()-n[0])),t.fix||(e.offsetTop=/%$/.test(e.offsetTop)?f.height()*parseFloat(e.offsetTop)/100:parseFloat(e.offsetTop),e.offsetLeft=/%$/.test(e.offsetLeft)?f.width()*parseFloat(e.offsetLeft)/100:parseFloat(e.offsetLeft),e.offsetTop+=f.scrollTop(),e.offsetLeft+=f.scrollLeft()),i.css({top:e.offsetTop,left:e.offsetLeft})},d.pt.tips=function(){var e=this,t=e.config,i=e.layero,n=[i.outerWidth(),i.outerHeight()],o=l(t.follow);o[0]||(o=l("body"));var a={width:o.outerWidth(),height:o.outerHeight(),top:o.offset().top,left:o.offset().left},r=i.find(".layui-layer-TipsG"),s=t.tips[0];t.tips[1]||r.remove(),a.autoLeft=function(){a.left+n[0]-f.width()>0?(a.tipLeft=a.left+a.width-n[0],r.css({right:12,left:"auto"})):a.tipLeft=a.left},a.where=[function(){a.autoLeft(),a.tipTop=a.top-n[1]-10,r.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color",t.tips[1])},function(){a.tipLeft=a.left+a.width+10,a.tipTop=a.top,r.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color",t.tips[1])},function(){a.autoLeft(),a.tipTop=a.top+a.height+10,r.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color",t.tips[1])},function(){a.tipLeft=a.left-n[0]-10,a.tipTop=a.top,r.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color",t.tips[1])}],a.where[s-1](),1===s?a.top-(f.scrollTop()+n[1]+16)<0&&a.where[2]():2===s?f.width()-(a.left+a.width+n[0]+16)>0||a.where[3]():3===s?a.top-f.scrollTop()+a.height+n[1]+16-f.height()>0&&a.where[0]():4===s&&n[0]+16-a.left>0&&a.where[1](),i.find("."+p[5]).css({"background-color":t.tips[1],"padding-right":t.closeBtn?"30px":""}),i.css({left:a.tipLeft,top:a.tipTop})},d.pt.move=function(){var e=this,t=e.config,i={setY:0,moveLayer:function(){var e=i.layero,t=parseInt(e.css("margin-left")),n=parseInt(i.move.css("left"));0===t||(n-=t),"fixed"!==e.css("position")&&(n-=e.parent().offset().left,i.setY=0),e.css({left:n,top:parseInt(i.move.css("top"))-i.setY})}},n=e.layero.find(t.move);return t.move&&n.attr("move","ok"),n.css({cursor:t.move?"move":"auto"}),l(t.move).on("mousedown",function(e){if(e.preventDefault(),"ok"===l(this).attr("move")){i.ismove=!0,i.layero=l(this).parents("."+p[0]);var n=i.layero.offset().left,o=i.layero.offset().top,a=i.layero.outerWidth()-6,r=i.layero.outerHeight()-6;l("#layui-layer-moves")[0]||l("body").append('<div id="layui-layer-moves" class="layui-layer-moves" style="left:'+n+"px; top:"+o+"px; width:"+a+"px; height:"+r+'px; z-index:2147483584"></div>'),i.move=l("#layui-layer-moves"),t.moveType&&i.move.css({visibility:"hidden"}),i.moveX=e.pageX-i.move.position().left,i.moveY=e.pageY-i.move.position().top,"fixed"!==i.layero.css("position")||(i.setY=f.scrollTop())}}),l(document).mousemove(function(e){if(i.ismove){var n=e.pageX-i.moveX,o=e.pageY-i.moveY;if(e.preventDefault(),!t.moveOut){i.setY=f.scrollTop();var a=f.width()-i.move.outerWidth(),r=i.setY;0>n&&(n=0),n>a&&(n=a),r>o&&(o=r),o>f.height()-i.move.outerHeight()+i.setY&&(o=f.height()-i.move.outerHeight()+i.setY)}i.move.css({left:n,top:o}),t.moveType&&i.moveLayer(),n=o=a=r=null}}).mouseup(function(){try{i.ismove&&(i.moveLayer(),i.move.remove(),t.moveEnd&&t.moveEnd()),i.ismove=!1}catch(e){i.ismove=!1}}),e},d.pt.callback=function(){function e(){var e=n.cancel&&n.cancel(t.index);e===!1||u.close(t.index)}var t=this,i=t.layero,n=t.config;t.openLayer(),n.success&&(2==n.type?i.find("iframe")[0].onload=function(){this.className="",n.success(i,t.index)}:n.success(i,t.index)),u.ie6&&t.IE6(i),i.find("."+p[6]).children("a").on("click",function(){var o=l(this).index();0===o?n.yes?n.yes(t.index,i):u.close(t.index):1===o&&e(),n["btn"+(o+1)]?n["btn"+(o+1)](t.index,i):u.close(t.index)}),i.find("."+p[7]).on("click",e),n.shadeClose&&l("#layui-layer-shade"+t.index).on("click",function(){u.close(t.index)}),i.find(".layui-layer-min").on("click",function(){u.min(t.index,n),n.min&&n.min(i)}),i.find(".layui-layer-max").on("click",function(){l(this).hasClass("layui-layer-maxmin")?(u.restore(t.index),n.restore&&n.restore(i)):(u.full(t.index,n),n.full&&n.full(i))}),n.end&&(c.end[t.index]=n.end)},c.reselect=function(){l.each(l("select"),function(e,t){var i=l(this);i.parents("."+p[0])[0]||1==i.attr("layer")&&l("."+p[0]).length<1&&i.removeAttr("layer").show(),i=null})},d.pt.IE6=function(e){function t(){e.css({top:n+(i.config.fix?f.scrollTop():0)})}var i=this,n=e.offset().top;t(),f.scroll(t),l("select").each(function(e,t){var i=l(this);i.parents("."+p[0])[0]||"none"===i.css("display")||i.attr({layer:"1"}).hide(),i=null})},d.pt.openLayer=function(){var e=this;u.zIndex=e.config.zIndex,u.setTop=function(e){var t=function(){u.zIndex++,e.css("z-index",u.zIndex+1)};return u.zIndex=parseInt(e[0].style.zIndex),e.on("mousedown",t),u.zIndex}},c.record=function(e){var t=[e.outerWidth(),e.outerHeight(),e.position().top,e.position().left+parseFloat(e.css("margin-left"))];e.find(".layui-layer-max").addClass("layui-layer-maxmin"),e.attr({area:t})},c.rescollbar=function(e){p.html.attr("layer-full")==e&&(p.html[0].style.removeProperty?p.html[0].style.removeProperty("overflow"):p.html[0].style.removeAttribute("overflow"),p.html.removeAttr("layer-full"))},u.getChildFrame=function(e,t){return t=t||l("."+p[4]).attr("times"),l("#"+p[0]+t).find("iframe").contents().find(e)},u.getFrameIndex=function(e){return l("#"+e).parents("."+p[4]).attr("times")},u.iframeAuto=function(e){if(e){var t=u.getChildFrame("body",e).outerHeight(),i=l("#"+p[0]+e),n=i.find(p[1]).outerHeight()||0,o=i.find("."+p[6]).outerHeight()||0;i.css({height:t+n+o}),i.find("iframe").css({height:t})}},u.iframeSrc=function(e,t){l("#"+p[0]+e).find("iframe").attr("src",t)},u.style=function(e,t){var i=l("#"+p[0]+e),n=i.attr("type"),o=i.find(p[1]).outerHeight()||0,a=i.find("."+p[6]).outerHeight()||0;(n===c.type[1]||n===c.type[2])&&(i.css(t),n===c.type[2]&&i.find("iframe").css({height:parseFloat(t.height)-o-a}))},u.min=function(e,t){var i=l("#"+p[0]+e),n=i.find(p[1]).outerHeight()||0;c.record(i),u.style(e,{width:180,height:n,overflow:"hidden"}),i.find(".layui-layer-min").hide(),"page"===i.attr("type")&&i.find(p[4]).hide(),c.rescollbar(e)},u.restore=function(e){var t=l("#"+p[0]+e),i=t.attr("area").split(",");t.attr("type"),u.style(e,{width:parseFloat(i[0]),height:parseFloat(i[1]),top:parseFloat(i[2]),left:parseFloat(i[3]),overflow:"visible"}),t.find(".layui-layer-max").removeClass("layui-layer-maxmin"),t.find(".layui-layer-min").show(),"page"===t.attr("type")&&t.find(p[4]).show(),c.rescollbar(e)},u.full=function(e){var t,i=l("#"+p[0]+e);c.record(i),p.html.attr("layer-full")||p.html.css("overflow","hidden").attr("layer-full",e),clearTimeout(t),t=setTimeout(function(){var t="fixed"===i.css("position");u.style(e,{top:t?0:f.scrollTop(),left:t?0:f.scrollLeft(),width:f.width(),height:f.height()}),i.find(".layui-layer-min").hide()},100)},u.title=function(e,t){var i=l("#"+p[0]+(t||u.index)).find(p[1]);i.html(e)},u.close=function(e){var t=l("#"+p[0]+e),i=t.attr("type");if(t[0]){if(i===c.type[1]&&"object"===t.attr("conType")){t.children(":not(."+p[5]+")").remove();for(var n=0;2>n;n++)t.find(".layui-layer-wrap").unwrap().hide()}else{if(i===c.type[2])try{var o=l("#"+p[4]+e)[0];o.contentWindow.document.write(""),o.contentWindow.close(),t.find("."+p[5])[0].removeChild(o)}catch(a){}t[0].innerHTML="",t.remove()}l("#layui-layer-moves, #layui-layer-shade"+e).remove(),u.ie6&&c.reselect(),c.rescollbar(e),l(document).off("keydown",c.enter),"function"==typeof c.end[e]&&c.end[e](),delete c.end[e]}},u.closeAll=function(e){l.each(l("."+p[0]),function(){var t=l(this),i=e?t.attr("type")===e:1;i&&u.close(t.attr("times")),i=null})},c.run=function(){l=o,f=l(r),p.html=l("html"),u.open=function(e){var t=new d(e);return t.index}},n=function(){return c.run(),u}.call(t,i,t,e),!(void 0!==n&&(e.exports=n))}(window)}).call(t,i(2))}});