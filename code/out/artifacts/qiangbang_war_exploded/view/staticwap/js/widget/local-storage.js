define("local-storage",["zepto"],function(t,e,a){var r=t("zepto");a.exports={localStorage:function(){function t(t){if(e.getItem("searchHistory")){var a=e.getItem("searchHistory");s.show(),c=JSON.parse(a);for(var i in c)c[i]==t&&c.splice(i,1);c.unshift(t),e.setItem("searchHistory",JSON.stringify(c)),c=JSON.parse(e.getItem("searchHistory")),o.html("");for(var i in c)r('<li><a href="'+r(".searchForm").attr("data-searchResult")+c[i]+'">'+c[i]+"</a> </li>").appendTo(o)}else{var c=[];c.unshift(t),e.setItem("searchHistory",JSON.stringify(c)),o.html("");var n=JSON.parse(e.getItem("searchHistory"));r('<li><a href="'+r(".searchForm").attr("data-searchResult")+n+'">'+n+"</a> </li>").appendTo(o),s.show()}window.location.href=r(".searchForm").attr("data-searchResult")+r("#searchIpt").val()}var e=window.localStorage,a=[],o=r("#searchList"),s=r("#clearAll");if(e.getItem("searchHistory")){var i=e.getItem("searchHistory");a=JSON.parse(i),s.show(),e.setItem("searchHistory",JSON.stringify(a)),a=JSON.parse(e.getItem("searchHistory")),o.html("");for(var c in a)r('<li><a href="'+r(".searchForm").attr("data-searchResult")+a[c]+'">'+a[c]+"</a> </li>").appendTo(o)}else o.html("<li>当前没有搜索记录</li>"),s.hide();r("#searchBtn").on("click",function(){return r("#searchIpt").val()?(t(r("#searchIpt").val()),void r("#searchHistoryForm")[0].submit()):void alert("请输入关键字！")}),r(".the-searche-tag a,.search-tag a").on("click",function(e){var a=r(e.target).text();t(a)}),s.on("click",function(){e.removeItem("searchHistory"),o.html("<li>当前没有搜索记录</li>"),s.hide()})},removeStorage:function(){var t=window.localStorage;r(".removestorageBtn").on("click",function(){t.removeItem(r(this).attr("data-nextPageStorageName"))})},logout:function(){var t=window.localStorage;r("#backHome").on("click",function(e){r.ajax({url:r(this).attr("data-url"),type:"GET",data:"",dataType:"json",success:function(e){""==e.errCode&&(t.getItem("loginStatus")&&t.removeItem("loginStatus"),window.location.href=e.url)},error:function(){}}),e.preventDefault()})}}});