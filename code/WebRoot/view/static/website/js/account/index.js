



import '{myplugins}/util/util.css';
import '{plugins}/datatables/css/dataTables.bootstrap.min.css';
import '{plugins}/artdialog/css/ui-dialog.css';
import '{plugins}/datetimepicker/datetimepicker.css';
import '{website}/css/commercialtenant/index.css';


import '{website}/js/common/common';
import '{plugins}/datetimepicker/datetimepicker';
import '{myplugins}/util/util';
import  Handlebars from '{plugins}/handlebars/handlebars.min';

import '{plugins}/datatables/js/jquery.datatables';
import '{plugins}/datatables/js/dataTables.bootstrap';
import '{plugins}/artdialog/js/dialog';


//本页面全局变量
var $details = {};

//交易明细table
$details.orderListTable = null;
//交易明细tableconfig
$details.orderListTableConfig = {
	ajax: {
            url: config.showListUrl,
            data: function(d) {
                d = $.extend(d, {
                    accountype:$('[name=accountype]:checked').val(),
                    starTime:$('#date_timepicker_start').val(),
                    endTime:$('#date_timepicker_end').val()

                });
            },
            dataSrc: function(data) {

                var obj = data.data ? data.data : '';
          //       var baseTemplate = Handlebars.compile($("#base-info-tmpl").html());
        		// $('.js-baseinfo').html(baseTemplate(d.baseinfo));
                if(data.expenseMoney & data.incomeMoney){
                    $('.js-accountype .income').html('&yen;'+data.incomeMoney);
                    $('.js-accountype .expense').html('&yen;'+data.expenseMoney);
                }
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
                    if(data.orderNumber==0){
                        return ''
                    }else{
                        return '<a href="/order/goDetails?id='+data.orderid+'">'+data.orderNumber+'</a>'
                    }

                }
            },{
                data:null,
                render:function(data){
                	var str = data.category===1?'<span class="text-success">收入</span>':'<span class="text-danger">支出</span>';
                	return str;
                }

            },{
            	data:null,
                render:function(data){
                	var str = data.category===1?'<span class="text-success">'+data.money+'</span>':'<span class="text-danger">'+data.money+'</span>';
                	return str;
                }

            },{
                data: 'createTime'
            },{
                data: 'mark'
            }
            ]
}
/*2个日期之间（between）*/
$.datetimepicker.setLocale('ch');//设置中文
$('#date_timepicker_start').datetimepicker({
    lang: 'zh',
    format: 'Y-m-d',
    formatDate: 'Y-m-d',
    onShow:function( ct ){
        this.setOptions({
            maxDate:$('#date_timepicker_end').val() ? $('#date_timepicker_end').val() : false
        })
    },
    onSelectDate: function(current_time, $input) {
    	$details.orderListTable.ajax.reload();
	},
    timepicker:false
});
$('#date_timepicker_end').datetimepicker({
    lang: 'zh',
    format: 'Y-m-d',
    formatDate: 'Y-m-d',
    onShow:function( ct ){
        this.setOptions({
            minDate:$('#date_timepicker_start').val() ? $('#date_timepicker_start').val() : false
        })
    },
    onSelectDate: function(current_time, $input) {
    	$details.orderListTable.ajax.reload();
	},
    timepicker:false
});

// 继承全局tableConfig
var orderListTableConfig = $.extend(true, {} , globalDataTablesConfig , $details.orderListTableConfig);
//实例化dataTables
$details.orderListTable = $('.account-table').DataTable(orderListTableConfig);

//员工状态选择
$('.js-accountype').on('change','.accountype', function() {

    $details.orderListTable.ajax.reload();
})
