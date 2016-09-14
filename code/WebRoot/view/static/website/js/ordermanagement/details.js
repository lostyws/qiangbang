


import '{myplugins}/util/util.css';
import '{plugins}/datatables/css/dataTables.bootstrap.min.css';
import '{plugins}/artdialog/css/ui-dialog.css';
import '{plugins}/artdialog/css/ui-dialog.css';
import '{website}/css/commercialtenant/index.css';



import '{website}/js/common/common';
import '{myplugins}/util/util';
import  Handlebars from '{plugins}/handlebars/handlebars.min';
import '{plugins}/datatables/js/jquery.datatables';
import '{plugins}/datatables/js/dataTables.bootstrap';
import '{plugins}/artdialog/js/dialog';
//本页面全局变量
var $details = {};
//获取用户ID
$details.id = util.getUrlParam('id');
/**
 * [showDetails 获取用户信息]
 * @param  {[type]} id [用户id]
 * @return {[type]}    [description]
 */
$details.showDetails = function(id){
	util.loading.show();

    $.when(sendAjax(config.showDetailsUrl, {'id':id})).
    then(function(d) {
    	//基本信息模版
		var baseTemplate = Handlebars.compile($("#base-info-tmpl").html());
        $('.js-baseinfo').html(baseTemplate(d.data));
        //报价列表模板
        var offerTemplate = Handlebars.compile($("#offer-list-tmpl").html());
        $('.offer-table tbody').html(offerTemplate(d.data.offerList));



    }, function(d) {
        var msg = d ? d.msg ? d.msg : '获取信息失败' : '服务器无响应, 获取信息失败';
        util.prompt({
            text: msg
        });
    }).always(function() {
        //hide load...
        util.loading.hide();
    });
};
/**
 * [stop 终止订单]
 * @param  {[type]} id [订单id]
 * @return {[type]}    [description]
 */
$details.stop = function (id){
    $.when(sendAjax(config.stopOrderUrl, {'orderid':id})).
    then(function(d) {
        util.prompt({
            type:'success',
            text: '终止订单成功',
            callback:function(){
                //重新加载表格
                $details.showDetails(id);
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
$details.delete = function (id){
    $.when(sendAjax(config.delOrderUrl, {'orderid':id})).
    then(function(d) {
        util.prompt({
            type:'success',
            text: '删除订单成功',
            callback:function(){
                //重新加载表格
                $details.showDetails(id);
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
$details.affirm = function (id){
    $.when(sendAjax(config.affirmOderUrl, {'orderid':id})).
    then(function(d) {
        util.prompt({
            type:'success',
            text: '强制完成成功',
            callback:function(){
                //重新加载表格
                $details.showDetails(id);
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
$details.showDetails($details.id);

//注册一个比较大小的Helper,判断v1是否等于v2
Handlebars.registerHelper("compare",function(v1,v2,options){
  if(v1==v2){
    //满足添加继续执行
    return options.fn(this);
  }else{
    //不满足条件执行{{else}}部分
    return options.inverse(this);
  }
});
//点击终止订单
$('.js-baseinfo').on('click','.js-stopOrder', function() {
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
                    $details.stop(orderid)
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
$('.js-baseinfo').on('click','.js-deleteOrder', function() {
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
                    $details.delete(orderid);
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
$('.js-baseinfo').on('click','.js-affirmOrder', function() {
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
                    $details.affirm(orderid);
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
function sendAjax(url,ajaxData){
    var dtd= $.Deferred();
    $.ajax({
        'url': url,
        'type': 'post',
        'dataType': 'json',
        'data': ajaxData,
        success: function(d){
            d.status == '0' ? dtd.resolve(d) : dtd.reject(d);
        },
        error: function() {
            dtd.reject();
        }
    });
    return dtd.promise();
}
