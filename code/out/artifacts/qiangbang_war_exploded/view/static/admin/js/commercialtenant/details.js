$(function () {
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
            $('.js-baseinfo').html(baseTemplate(d.baseinfo));
            


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
	//交易明细table
	$details.orderListTable = null;
	//交易明细tableconfig
	$details.orderListTableConfig = {
		ajax: {
                url: config.showDetailsUrl,
                data: function(d) {
                    d = $.extend(d, {
                        'id': $details.id
                        
                    });
                },
                dataSrc: function(data) {

                    var obj = data.data ? data.data : '';
              //       var baseTemplate = Handlebars.compile($("#base-info-tmpl").html());
            		// $('.js-baseinfo').html(baseTemplate(d.baseinfo));
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
                    data: 'mark'
                }
                ]
	}
	// $details.init = function (){
	// 	$details.showDetails($details.id);
		

    	
	// }
	$details.showDetails($details.id);
	// 继承全局tableConfig
	var orderListTableConfig = $.extend(true, {} , globalDataTablesConfig , $details.orderListTableConfig);
	//实例化dataTables
    $details.orderListTable = $('.transaction-table').DataTable(orderListTableConfig);
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
})