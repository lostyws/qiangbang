$(function () {
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
                        return '<a href="/order/goDetails?id='+data.taskid+'">'+data.orderNumber+'</a>'
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

	
	// 继承全局tableConfig
	var orderListTableConfig = $.extend(true, {} , globalDataTablesConfig , $details.orderListTableConfig);
	//实例化dataTables
    $details.orderListTable = $('.account-table').DataTable(orderListTableConfig);
    
	//员工状态选择
    $('.js-accountype').on('change','.accountype', function() {
        
        $details.orderListTable.ajax.reload();
    })
})