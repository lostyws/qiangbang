

import '{myplugins}/util/util.css';
import '{plugins}/datatables/css/dataTables.bootstrap.min.css';
import '{plugins}/artdialog/css/ui-dialog.css';
import '{website}/css/commercialtenant/index.css';



import '{website}/js/common/common';
import '{myplugins}/util/util';
import  Handlebars from '{plugins}/handlebars/handlebars.min';
import '{plugins}/datatables/js/jquery.datatables';
import '{plugins}/datatables/js/dataTables.bootstrap';
import '{plugins}/artdialog/js/dialog';
//本页面全局变量
var $order = {};
//定义table
$order.dataTable = null;
//订单tableconfig
$order.dataTableconfig = {
	ajax: {
        url: config.showListUrl,
        data: function(d) {
            d = $.extend(d, {
                orderStatus:$('[name=orderStatus]:checked').val(),
        		orderNumber:$('.js-orderNumber').val()

            });
        },
        dataSrc: function(data) {

            var obj = data.data ? data.data : '';

            return obj;
        }
    },
    columns: [
        { //序号
            data: null,
            createdCell: function(nTd, sData, oData, iRow, iCol) {
                var startnum = this.api().page() * (this.api().page.info().length);
                $(nTd).html(iRow + 1 + startnum);
            }

        },{
            data:null,
            render:function(data){
                return '<a href="/order/goDetails?id='+data.id+'">'+data.orderNumber+'</a>'
            }
        },{
            data:null,
            render:function(data){
                return '<a href="/admin/goDetails?id='+data.buyerId+'">'+data.buyerName+'</a>'
            }
        },{
            data:null,
            render:function(data){
                return '<a href="/admin/goDetails?id='+data.sellerId+'">'+data.sellerName+'</a>'
            }
        },{
            data: 'transactionAmount'
        },{
            data: 'releaseTime'
        },{
            data: 'status'

        },{
            data:null,
            render:function(data){
                var str = '';
                // isStop: 1   终止订单
                // isDelete: 1  删除订单
                // isAffirmFinish: 1  确认订单已完成

                var obj = {
                    isStop: '<button class="btn btn-link js-stopOrder">终止订单</button>',//终止订单
                    isDelete: '<button class="btn btn-link js-deleteOrder">删除订单</button>', //删除订单
                    isAffirmFinish: '<button class="btn btn-link js-affirmOrder">强制已完成</button>', //强制已完成
                };

                //加入权限数组
                var objKeyArr = [];

                for (var k in obj) {
                    if (data[k] === 1) {
                        objKeyArr.push(k);
                    }
                }
                //无权限
                if (objKeyArr.length <= 0) {
                    return '';
                }
                //多个
                else {
                    for (var i = 0, l = objKeyArr.length; i < l; i++) {
                        var key = objKeyArr[i];
                        str += obj[key];
                    }

                }



                return '<div class="td-edit" orderid="'+data.id+'" ordernumber="'+data.orderNumber+'">'+str+'</div>'
            }
        }
        ]
}
/**
 * [stop 终止订单]
 * @param  {[type]} id [订单id]
 * @return {[type]}    [description]
 */
$order.stop = function (id){
	$.when(sendAjax(config.stopOrderUrl, {'orderid':id})).
    then(function(d) {
        util.prompt({
            type:'success',
            text: '终止订单成功',
            callback:function(){
                //重新加载表格
                $order.dataTable.ajax.reload();
            }
        });

    }, function(d) {
        var msg = d ? d.msg ? d.msg : '终止订单失败' : '服务器无响应, 终止订单失败';
        util.prompt({
            text: msg
        });
    }).always(function() {
        //hide load...
        util.loading.hide();
    });
}
/**
 * [stop 删除订单]
 * @param  {[type]} id [订单id]
 * @return {[type]}    [description]
 */
$order.deleted = function (id){
	$.when(sendAjax(config.delOrderUrl, {'orderid':id})).
    then(function(d) {
        util.prompt({
            type:'success',
            text: '删除订单成功',
            callback:function(){
                //重新加载表格
                $order.dataTable.ajax.reload();
            }
        });

    }, function(d) {
        var msg = d ? d.msg ? d.msg : '删除订单失败' : '服务器无响应, 删除订单失败';
        util.prompt({
            text: msg
        });
    }).always(function() {
        //hide load...
        util.loading.hide();
    });
}
/**
 * [stop 确认订单完成]
 * @param  {[type]} id [订单id]
 * @return {[type]}    [description]
 */
$order.affirm = function (id){
	$.when(sendAjax(config.affirmOderUrl, {'orderid':id})).
    then(function(d) {
        util.prompt({
            type:'success',
            text: '强制完成成功',
            callback:function(){
                //重新加载表格
                $order.dataTable.ajax.reload();
            }
        });

    }, function(d) {
        var msg = d ? d.msg ? d.msg : '强制完成失败' : '服务器无响应, 强制完成失败';
        util.prompt({
            text: msg
        });
    }).always(function() {
        //hide load...
        util.loading.hide();
    });
}
// 继承全局tableConfig

var newTableConfig = $.extend(true, {} , globalDataTablesConfig , $order.dataTableconfig);


//实例化dataTables
$order.dataTable = $('.order-table').DataTable(newTableConfig);
//search
var timedely = null;
$('.js-orderNumber').on('input', function() {

    if (timedely) {
        clearTimeout(timedely);
    }
    timedely = setTimeout(function() {

        $order.dataTable.ajax.reload();

    },500);
});
//员工状态选择
$('.js-orderStatus').on('change','.order-status', function() {
    $(".js-orderNumber").val('');
    $order.dataTable.ajax.reload();
})
//点击终止订单
$('.table').on('click','.js-stopOrder', function() {
    var editDiv = $(this).parents('.td-edit').eq(0);
    var orderid = editDiv.attr('orderid');

    if(orderid){
        //临时数据
        var tempData = {
            'text':$(this).text(),
            'orderNumber':editDiv.attr('ordernumber')
        }
        new dialog({
            button: [{
                value: '确定',
                autofocus: true,
                callback: function() {
                    $order.stop(orderid)
                }
            }, {
                value: '取消',
                callback: function() {
                    //alert('你点了取消');
                }
            }],
            title: "终止订单",
            content: Handlebars.compile($('#dialog-tmpl').html())(tempData)
        }).showModal();
    }else{
        util.prompt({
            text: '未获取到你选取的记录'
        });
        return false;
    }

});

//点击删除订单
$('.table').on('click','.js-deleteOrder', function() {
    var editDiv = $(this).parents('.td-edit').eq(0);
    var orderid = editDiv.attr('orderid');

    if(orderid){
        //临时数据
        var tempData = {
            'text':$(this).text(),
            'orderNumber':editDiv.attr('ordernumber')
        }
        new dialog({
            button: [{
                value: '确定',
                autofocus: true,
                callback: function() {
                    $order.deleted(orderid);
                }
            }, {
                value: '取消',
                callback: function() {
                    //alert('你点了取消');
                }
            }],
            title: "删除订单",
            content: Handlebars.compile($('#dialog-tmpl').html())(tempData)
        }).showModal();
    }else{
        util.prompt({
            text: '未获取到你选取的记录'
        });
        return false;
    }

});
//强制已完成
$('.table').on('click','.js-affirmOrder', function() {
    var editDiv = $(this).parents('.td-edit').eq(0);
    var orderid = editDiv.attr('orderid');

    if(orderid){
        //临时数据
        var tempData = {
            'text':$(this).text(),
            'orderNumber':editDiv.attr('ordernumber')
        }
        new dialog({
            button: [{
                value: '确定',
                autofocus: true,
                callback: function() {
                    $order.affirm(orderid);
                }
            }, {
                value: '取消',
                callback: function() {
                    //alert('你点了取消');
                }
            }],
            title: "强制已完成",
            content: Handlebars.compile($('#dialog-tmpl').html())(tempData)
        }).showModal();
    }else{
        util.prompt({
            text: '未获取到你选取的记录'
        });
        return false;
    }

});
/*
 * sendAjax 自定义发送ajax
 * @param url ajax请求地址
 * @param url ajax请求参数
 * */
function sendAjax(url, ajaxData) {
    var dtd = $.Deferred();
    $.ajax({
        'url': url,
        'type': 'post',
        'dataType': 'json',
        'data': ajaxData,
        success: function(d) {
            d.status == '0' ? dtd.resolve(d) : dtd.reject(d);
        },
        error: function() {
            dtd.reject();
        }
    });
    return dtd.promise();
}


