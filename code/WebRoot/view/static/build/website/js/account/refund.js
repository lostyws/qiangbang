webpackJsonp([1],{0:function(t,e,a){t.exports=a(42)},42:function(t,e,a){(function(t){function e(t){return t&&t.__esModule?t:{"default":t}}function r(e,a){var r=t.Deferred();return t.ajax({url:e,type:"post",dataType:"json",data:a,success:function(t){"0"==t.status?r.resolve(t):r.reject(t)},error:function(){r.reject()}}),r.promise()}a(3),a(7),a(9),a(11),a(13),a(15),a(35),a(36);var n=a(37),o=e(n);a(39),a(40),a(41);var l={};l.dataTable=null,l.dataTableconfig={ajax:{url:config.showListUrl,data:function(e){e=t.extend(e,{orderStatus:t("[name=orderStatus]:checked").val(),orderNumber:t(".js-orderNumber").val()})},dataSrc:function(t){var e=t.data?t.data:"";return e}},columns:[{data:null,createdCell:function(e,a,r,n,o){var l=this.api().page()*this.api().page.info().length;t(e).html(n+1+l)}},{data:null,render:function(t){if("申请退款"==t.type){var e=t.orderNumber.substring(14);return'<a href="/order/goDetails?id='+e+'">'+e+"</a>"}return 0}},{data:null,render:function(t){return'<a href="/admin/goDetails?id='+t.userId+'">'+t.userName+"</a>"}},{data:"orderNumber"},{data:"transactionAmount"},{data:"releaseTime"},{data:"type"},{data:null,render:function(t){var e="",a={isaudit:'<button class="btn btn-link js-isaudit">审核</button>'},r=[];for(var n in a)1===t[n]&&r.push(n);if(r.length<=0)return"";for(var o=0,l=r.length;o<l;o++){var i=r[o];e+=a[i]}return'<div class="td-edit" orderid="'+t.id+'" username="'+t.userName+'" ordernumber="'+t.orderNumber+'">'+e+"</div>"}}]},l.stop=function(e){t.when(r(config.stopOrderUrl,{orderid:e})).then(function(t){util.prompt({type:"success",text:"终止订单成功",callback:function(){l.dataTable.ajax.reload()}})},function(t){var e=t?t.msg?t.msg:"终止订单失败":"服务器无响应, 终止订单失败";util.prompt({text:e})}).always(function(){util.loading.hide()})},l.deleted=function(e){t.when(r(config.delOrderUrl,{orderid:e})).then(function(t){util.prompt({type:"success",text:"删除订单成功",callback:function(){l.dataTable.ajax.reload()}})},function(t){var e=t?t.msg?t.msg:"删除订单失败":"服务器无响应, 删除订单失败";util.prompt({text:e})}).always(function(){util.loading.hide()})},l.affirm=function(e){t.when(r(config.affirmOderUrl,{orderid:e})).then(function(t){util.prompt({type:"success",text:"退款提交申请成功",callback:function(){l.dataTable.ajax.reload()}})},function(t){var e=t?t.msg?t.msg:"退款提交申请失败":"服务器无响应, 退款提交申请失败";util.prompt({text:e})}).always(function(){util.loading.hide()})};var i=t.extend(!0,{},globalDataTablesConfig,l.dataTableconfig);l.dataTable=t(".order-table").DataTable(i);var u=null;t(".js-orderNumber").on("input",function(){u&&clearTimeout(u),u=setTimeout(function(){l.dataTable.ajax.reload()},500)}),t(".js-orderStatus").on("change",".order-status",function(){t(".js-orderNumber").val(""),l.dataTable.ajax.reload()}),t(".table").on("click",".js-stopOrder",function(){var e=t(this).parents(".td-edit").eq(0),a=e.attr("orderid");if(!a)return util.prompt({text:"未获取到你选取的记录"}),!1;var r={text:t(this).text(),orderNumber:e.attr("ordernumber")};new dialog({button:[{value:"确定",autofocus:!0,callback:function(){l.stop(a)}},{value:"取消",callback:function(){}}],title:"终止订单",content:o["default"].compile(t("#dialog-tmpl").html())(r)}).showModal()}),t(".table").on("click",".js-deleteOrder",function(){var e=t(this).parents(".td-edit").eq(0),a=e.attr("orderid");if(!a)return util.prompt({text:"未获取到你选取的记录"}),!1;var r={text:t(this).text(),orderNumber:e.attr("ordernumber")};new dialog({button:[{value:"确定",autofocus:!0,callback:function(){l.deleted(a)}},{value:"取消",callback:function(){}}],title:"删除订单",content:o["default"].compile(t("#dialog-tmpl").html())(r)}).showModal()}),t(".table").on("click",".js-isaudit",function(){var e=t(this).parents(".td-edit").eq(0),a=e.attr("orderid");if(!a)return util.prompt({text:"未获取到你选取的记录"}),!1;var r={text:t(this).text(),username:e.attr("username")};new dialog({button:[{value:"确定",autofocus:!0,callback:function(){l.affirm(a)}},{value:"取消",callback:function(){}}],title:"审核退款",content:o["default"].compile(t("#dialog-tmpl").html())(r)}).showModal()})}).call(e,a(2))}});