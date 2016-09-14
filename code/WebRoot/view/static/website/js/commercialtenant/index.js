




import '{myplugins}/util/util.css';
import '{plugins}/datatables/css/dataTables.bootstrap.min.css';
import '{plugins}/select2/css/select2.min.css';
import '{plugins}/artdialog/css/ui-dialog.css';
import '{plugins}/validform/validform.css';
import '{plugins}/webuploader/0.1.6/webuploader.css'
import '{plugins}/datetimepicker/datetimepicker.css';
import '{website}/css/common/common.css';
import '{website}/css/commercialtenant/index.css';


import '{website}/js/common/common';
import '{myplugins}/util/util';
import  Handlebars from '{plugins}/handlebars/handlebars.min';
import '{plugins}/datatables/js/jquery.datatables';
import '{plugins}/datatables/js/dataTables.bootstrap';
import '{plugins}/artdialog/js/dialog';
import '{plugins}/select2/js/select2';
import '{plugins}/validform/validform';
import '{plugins}/datetimepicker/datetimepicker';
import '{plugins}/webuploader/0.1.6/webuploader.custom';

var $service = {
    //用户table
    userTable1:null,
    userTable2:null,
    userTable3:null,
    userType:'1', //1普通用户 2普通商户 3个体工商户


    //普通用户config
    userTableConfig1:{

        ajax: {
            url: config.showListUrl,
            data: function(d) {
                d = $.extend(d, {
                    'userName': $('.js-customerName').val(),
                    'userType': this.userType

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
                    return '<a href="/admin/goDetails?id='+data.id+'">'+data.userName+'</a>'
                }
            },{
                data: 'phoneNumber'
            },{
                data: 'idCard'
            },{
                data: 'region'
            },{
                data: 'registrationTime'
            },{
                data: 'price'
            },{
                data:null,
                render:function(data){
                    var str = '';
                    // isCloseShop: 1   关店
                    // isOpenShop: 1  开店
                    // isApprove: 1  审核认证
                    // isCashdeposit: 1  审核保证金

                    var obj = {
                        isCloseShop: '<button class="btn btn-link js-closeAccount">冻结账号</button>',//关店 开启账号
                        isOpenShop: '<button class="btn btn-link js-openAccount">开启账号</button>', //关店 冻结账号
                        isApprove: '<button class="btn btn-link js-approve">审核认证</button>', //审核认证
                        isCashdeposit: '<button class="btn btn-link js-cashdeposit">审核保证金</button>', //审核保证金
                        isBusiness:'<button class="btn btn-link js-business">开启商户</button>',//注册审核
                    };

                    //加入权限数组
                    var objKeyArr = [];

                    for (var k in obj) {
                        if (data[k] === 2) {
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


                    str += '<a class="btn btn-link js-business" href="/admin/goEdit?id='+data.id+'">编辑</a>';
                    return '<div class="td-edit" userid="'+data.id+'" username="'+data.userName+'">'+str+'</div>'
                }
            }
            ]

    },
    //普通商户config
    userTableConfig2:{

        ajax: {
            url: config.showListUrl,
            data: function(d) {
                d = $.extend(d, {
                    'userName': $('.js-customerName').val(),
                    'userType': this.userType

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
//                        return '<a href="/view/admin/customer/detail.jsp?id='+data.id+'">'+data.userName+'</a>'
                	 return '<a href="/admin/goDetails?id='+data.id+'">'+data.userName+'</a>'
                }
            },{
                data: 'phoneNumber'
            },{
                data: 'idCard'
            },{
                data: 'classify'
            },{
                data: 'region'
            },{
                data: 'registrationTime'
            },{
                data: 'bondmoney'
            },{
                data: 'price'
            },{
                data:null,
                render:function(data){
                    var str = '';
                    // isCloseShop: 1   关店
                    // isOpenShop: 1  开店
                    // isApprove: 1  审核认证
                    // isCashdeposit: 1  审核保证金
                    // isBusiness:1 注册审核

                    var obj = {
                        isCloseShop: '<button class="btn btn-link js-closeAccount">冻结账号</button>',//关店 开启账号
                        isOpenShop: '<button class="btn btn-link js-openAccount">开启账号</button>', //关店 冻结账号
                        isApprove: '<button class="btn btn-link js-approve">审核认证</button>', //审核认证
                        isCashdeposit: '<button class="btn btn-link js-cashdeposit">审核保证金</button>', //审核保证金
                        isBusiness:'<button class="btn btn-link js-business">开启商户</button>',//注册审核

                    };

                    //加入权限数组
                    var objKeyArr = [];

                    for (var k in obj) {
                        if (data[k] === 2) {
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


                    str += '<a class="btn btn-link js-business" href="/admin/goEdit?id='+data.id+'">编辑</a>';
                    return '<div class="td-edit" userid="'+data.id+'" username="'+data.userName+'">'+str+'</div>'
                }
            }
            ]
    },//个体工商户config
    userTableConfig3:{

        ajax: {
            url: config.showListUrl,
            data: function(d) {
                d = $.extend(d, {
                    'userName': $('.js-customerName').val(),
                    'userType': this.userType

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
                    return '<a href="/view/admin/customer/detail.jsp?id='+data.id+'">'+data.userName+'</a>'
                }
            },{
                data: 'phoneNumber'
            },{
                data: 'idCard'
            },{
                data:'shopName'

            },{
                data: 'classify'
            },{
                data: 'region'
            },{
                data: 'registrationTime'
            },{
                data: 'bondmoney'
            },{
                data: 'price'
            },{
                data:null,
                render:function(data){
                    var str = '';
                    // isCloseShop: 1   关店
                    // isOpenShop: 1  开店
                    // isApprove: 1  审核认证
                    // isCashdeposit: 1  审核保证金
                    // isBusiness:1 注册审核

                    var obj = {
                        isCloseShop: '<button class="btn btn-link js-closeAccount">冻结账号</button>',//关店 开启账号
                        isOpenShop: '<button class="btn btn-link js-openAccount">开启账号</button>', //关店 冻结账号
                        isApprove: '<button class="btn btn-link js-approve">审核认证</button>', //审核认证
                        isCashdeposit: '<button class="btn btn-link js-cashdeposit">审核保证金</button>', //审核保证金
                        isBusiness:'<button class="btn btn-link js-business">开启商户</button>',//注册审核

                    };

                    //加入权限数组
                    var objKeyArr = [];

                    for (var k in obj) {
                        if (data[k] === 2) {
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

                    str += '<a class="btn btn-link js-business" href="/admin/goEdit?id='+data.id+'">编辑</a>';

                    return '<div class="td-edit" userid="'+data.id+'" username="'+data.userName+'">'+str+'</div>'
                }
            }
            ]
    },

    /**
     * [freezeAccount 冻结账号]
     * @param  {[type]} userid [用户id]
     * @return {[type]}          [description]
     */
    freezeAccount:function(userid){
        $.when(sendAjax(config.freezeAccountUrl, {'userid':userid,'userType': this.userType})).
        then(function(d) {
            util.prompt({
                type:'success',
                text: '冻结账号成功',
                callback:function(){
                    //重新加载表格
                    reloadTable();
                }
            });

        }, function(d) {
            var msg = d ? d.msg ? d.msg : '冻结账号失败' : '服务器无响应, 冻结账号失败';
            util.prompt({
                text: msg
            });
        }).always(function() {
            //hide load...
            util.loading.hide();
        });
    },
    /**
     * [openAccount 开启账号]
     * @param  {[type]} userid [用户id]
     * @return {[type]}          [description]
     */
    openAccount:function(userid){
        $.when(sendAjax(config.openAccountUrl, {'userid':userid,'userType': this.userType})).
        then(function(d) {
            util.prompt({
                type:'success',
                text: '开启账号成功',
                callback:function(){
                    //重新加载表格
                    reloadTable();
                }
            });

        }, function(d) {
            var msg = d ? d.msg ? d.msg : '开启账号失败' : '服务器无响应, 开启账号失败';
            util.prompt({
                text: msg
            });
        }).always(function() {
            //hide load...
            util.loading.hide();
        });
    },
    /**
     * [openBusiness 开启商户]
     * @param  {[type]} userid [用户id]
     * @return {[type]}          [description]
     */
    openBusiness:function(userid){
        $.when(sendAjax(config.openBusinessUrl, {'userid':userid,'userType': this.userType})).
        then(function(d) {
            util.prompt({
                type:'success',
                text: '开启商户成功',
                callback:function(){
                    //重新加载表格
                    reloadTable();
                }
            });

        }, function(d) {
            var msg = d ? d.msg ? d.msg : '开启商户失败' : '服务器无响应, 开启商户失败';
            util.prompt({
                text: msg
            });
        }).always(function() {
            //hide load...
            util.loading.hide();
        });
    },
    /**
     * [auditApprove 审核认证]
     * @param  {[type]} userid [用户id]
     * @return {[type]}          [description]
     */
    auditApprove:function(userid){
        $.when(sendAjax(config.auditApproveUrl, {'userid':userid,'userType': this.userType})).
        then(function(d) {
            util.prompt({
                type:'success',
                text: '审核认证成功',
                callback:function(){
                    //重新加载表格
                    reloadTable();
                }
            });

        }, function(d) {
            var msg = d ? d.msg ? d.msg : '审核认证失败' : '服务器无响应, 审核认证失败';
            util.prompt({
                text: msg
            });
        }).always(function() {
            //hide load...
            util.loading.hide();
        });
    },
    /**
     * [auditApprove 审核保证金]
     * @param  {[type]} userid [用户id]
     * @return {[type]}          [description]
     */
    auditCashdeposit:function(userid){
        $.when(sendAjax(config.auditCashdepositUrl, {'userid':userid,'userType': this.userType})).
        then(function(d) {
            util.prompt({
                type:'success',
                text: '审核保证金成功',
                callback:function(){
                    //重新加载表格
                    reloadTable();
                }
            });

        }, function(d) {
            var msg = d ? d.msg ? d.msg : '审核保证金失败' : '服务器无响应, 审核保证金失败';
            util.prompt({
                text: msg
            });
        }).always(function() {
            //hide load...
            util.loading.hide();
        });
    },
    /**
     * [auditApprove 审核保证金]
     * @param  {[type]} userid [用户id]
     * @return {[type]}          [description]
     */
    openBusiness:function(userid){
        $.when(sendAjax(config.openBusinessUrl, {'userid':userid,'userType': this.userType})).
        then(function(d) {
            util.prompt({
                type:'success',
                text: '审核保证金成功',
                callback:function(){
                    //重新加载表格
                    reloadTable();
                }
            });

        }, function(d) {
            var msg = d ? d.msg ? d.msg : '审核保证金失败' : '服务器无响应, 审核保证金失败';
            util.prompt({
                text: msg
            });
        }).always(function() {
            //hide load...
            util.loading.hide();
        });
    }




}
/**
 * [reloadTable 重新加载表格]
 * @return {[type]}
 */
function reloadTable(){
    var userType = $service.userType;
    //普通用户
    if(userType ==='1'){
        $service.userTable1.ajax.reload();
    }
    //普通商户
    if(userType ==='2'){
        $service.userTable2.ajax.reload();
    }
    //个体工商户
    if(userType ==='3'){
        $service.userTable3.ajax.reload();
    }
}
// 继承全局tableConfig

var userTableConfig1 = $.extend(true, {} , globalDataTablesConfig , $service.userTableConfig1);
var userTableConfig2 = $.extend(true, {} , globalDataTablesConfig , $service.userTableConfig2);
var userTableConfig3 = $.extend(true, {} , globalDataTablesConfig , $service.userTableConfig3);
// var backlogTableConfig = $.extend(true, {} , globalDataTablesConfig , $service.userTableConfig2);

//实例化dataTables
$service.userTable1 = $('.user-table1').DataTable(userTableConfig1);


//tab点击切换
$('.panel-tab a[role=tab]').click(function (e) {
    e.preventDefault();
    userType = $(this).attr('tab-type');
    if(!$(this).parent('li').hasClass('active')){
        //清空输入框
        $('.js-customerName').val('');
        $service.userType =  userType;
        //普通用户   默认显示所以注释掉了
        // if(userType ==='1' & !$service.userTable1){
        //     $service.userTable1 = $('.user-table1').DataTable(userTableConfig1);
        // }
        //普通商户
        if(userType ==='2' & !$service.userTable2){
            $service.userTable2 = $('.user-table2').DataTable(userTableConfig2);
        }
        //个体工商户
        if(userType ==='3' & !$service.userTable3){
            $service.userTable3 = $('.user-table3').DataTable(userTableConfig3);
        }
    }



});



//search
var timedely = null;
$('.js-customerName').on('input', function() {

    if (timedely) {
        clearTimeout(timedely);
    }
    timedely = setTimeout(function() {

        reloadTable();

    },500);
});
//点击冻结账号
$('.table').on('click','.js-closeAccount', function() {
    var editDiv = $(this).parents('.td-edit').eq(0);
    var userid = editDiv.attr('userid');

    if(userid){
        //临时数据
        var tempData = {
            'text':$(this).text(),
            'userName':editDiv.attr('username')
        }
        new dialog({
            button: [{
                value: '确定',
                autofocus: true,
                callback: function() {
                    $service.freezeAccount(userid)
                }
            }, {
                value: '取消',
                callback: function() {
                    //alert('你点了取消');
                }
            }],
            title: "冻结账号",
            content: Handlebars.compile($('#dialog-tmpl').html())(tempData)
        }).showModal();
    }else{
        util.prompt({
            text: '未获取到你选取的记录'
        });
        return false;
    }

});
//点击开启账号
$('.table').on('click','.js-openAccount', function() {
    var editDiv = $(this).parents('.td-edit').eq(0);
    var userid = editDiv.attr('userid');

    if(userid){
        //临时数据
        var tempData = {
            'text':$(this).text(),
            'userName':editDiv.attr('username')
        }
        new dialog({
            button: [{
                value: '确定',
                autofocus: true,
                callback: function() {
                    $service.openAccount(userid)
                }
            }, {
                value: '取消',
                callback: function() {
                    //alert('你点了取消');
                }
            }],
            title: "开启账号",
            content: Handlebars.compile($('#dialog-tmpl').html())(tempData)
        }).showModal();
    }else{
        util.prompt({
            text: '未获取到你选取的记录'
        });
        return false;
    }

});
//点击审核认证
$('.table').on('click','.js-approve', function() {
    var editDiv = $(this).parents('.td-edit').eq(0);
    var userid = editDiv.attr('userid');

    if(userid){
        //临时数据
        var tempData = {
            'text':$(this).text(),
            'userName':editDiv.attr('username')
        }
        new dialog({
            button: [{
                value: '确定',
                autofocus: true,
                callback: function() {
                    $service.auditApprove(userid)
                }
            }, {
                value: '取消',
                callback: function() {
                    //alert('你点了取消');
                }
            }],
            title: "审核认证",
            content: Handlebars.compile($('#dialog-tmpl').html())(tempData)
        }).showModal();
    }else{
        util.prompt({
            text: '未获取到你选取的记录'
        });
        return false;
    }

});
//点击开启商户
$('.table').on('click','.js-business', function() {
    var editDiv = $(this).parents('.td-edit').eq(0);
    var userid = editDiv.attr('userid');

    if(userid){
        //临时数据
        var tempData = {
            'text':$(this).text(),
            'userName':editDiv.attr('username')
        }
        new dialog({
            button: [{
                value: '确定',
                autofocus: true,
                callback: function() {
                    $service.openBusiness(userid)
                }
            }, {
                value: '取消',
                callback: function() {
                    //alert('你点了取消');
                }
            }],
            title: "开启商户",
            content: Handlebars.compile($('#dialog-tmpl').html())(tempData)
        }).showModal();
    }else{
        util.prompt({
            text: '未获取到你选取的记录'
        });
        return false;
    }

});
//点击审核保证金
$('.table').on('click','.js-cashdeposit', function() {
    var editDiv = $(this).parents('.td-edit').eq(0);
    var userid = editDiv.attr('userid');

    if(userid){
        //临时数据
        var tempData = {
            'text':$(this).text(),
            'userName':editDiv.attr('username')
        }
        new dialog({
            button: [{
                value: '确定',
                autofocus: true,
                callback: function() {
                    $service.auditCashdeposit(userid)
                }
            }, {
                value: '取消',
                callback: function() {
                    //alert('你点了取消');
                }
            }],
            title: "审核保证金",
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

