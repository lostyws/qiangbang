



import '{myplugins}/util/util.css';
import '{plugins}/datatables/css/dataTables.bootstrap.min.css';
import '{plugins}/select2/css/select2.min.css';
import '{plugins}/artdialog/css/ui-dialog.css';
import '{plugins}/validform/validform.css';
import '{plugins}/webuploader/0.1.6/webuploader.css'
import '{plugins}/datetimepicker/datetimepicker.css';

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

//本页面全局变量
var $details = {};
//获取用户ID

/**
 * [上传图片的变量]
 */



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

        $details.bindEvent();

        $('.js-upload-btn').each(function(){
            var uploaderDom = $(this);
            var webuploaderData = {
                pick:$(this),
                url:$(this).attr('uploader-url'),
                multi:$(this).attr('multi')?true:false
            }

            webuploader(webuploaderData);
        })

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



// }
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
$details.bindEvent = function(){
	var editDom = $('.js-baseinfo');
	var classifySelect = $('.js-classify-select');
	classifySelect.select2().on('change',function(e){
		console.log('change=========='+e);

	});
	classifySelect.on('select2:select', function (evt) {
  	  // Do something
      	console.log(evt);
      	var selectParent = classifySelect.find("option:selected").parent().attr('label');
      	var selectLen = classifySelect.val().length;
      	if(selectLen === 2){
      		if(getParentVal(0)!==getParentVal(1)){
      			classifySelect.val('').trigger('change');
      		}
      	}
      	if(selectLen === 3){
      		if(getParentVal(1)!==getParentVal(2)){
      			classifySelect.val('').trigger('change');
      		}
      	}
      	if(selectLen>3){
      		classifySelect.val('').trigger('change');

      	}



        //放大图片
      	editDom.on('click', '.small-img', function() {
            var url = $(this).attr('src');

            new dialog({
                title: '预览大图',
                content: '<img src="' + url + '" />',
                button: [{
                    value: '取消',
                    callback: function() {

                    }
                }],
                width: 700
            }).showModal();
        });


  	});
	$('.js-editSave').on('click',function(){

		var classifyVal = $('.js-classify-select').val();
        if(classifyVal){
            $('#classifyVal').val(classifyVal.toString());
            var classfyData=$(".js-classify-select").select2('data');

            var classfyName = [];
            for(var i =0;i<classfyData.length;i++){
                classfyName.push(classfyData[i].text);
            }

            $('#classifyName').val(classfyName.toString());
        }



			var ajaxData = $('.editbase-form').serialize();
    		util.loading.show();

            $.when(sendAjax(config.editDetailsUrl, ajaxData)).
            then(function(d) {
            	//基本信息模版


            	util.prompt({
                    type:'success',
                    text: '保存成功',
                    callback:function(){
                        //重新加载表格
                    	window.location.reload();
                    }
                });

            }, function(d) {
                var msg = d ? d.msg ? d.msg : '保存失败' : '服务器无响应, 保存失败';
                util.prompt({
                    text: msg
                });
            }).always(function() {
                //hide load...
                util.loading.hide();
            });





	})
}

function getParentVal(index){
	var classifySelect = $('.js-classify-select');
	var pval = classifySelect.find("option:selected").eq(index).parent().attr('label');
	 return pval?pval:'';

}
function webuploader(configData) {
    // if(uploader){
    //     uploader.destroy();
    // }
    uploader = WebUploader.create({
        // swf文件路径
    	swf: '/view/staticwap/webuploader/0.1.6/Uploader.swf',
 	    server: configData.url||'/file/upload_wap?ftype=2',
        //不加载队列中直接上传
        auto: true,
        //是否允许重复上传(默认false)
        duplicate: true,

        // 单个文件大小限制默认5M
        fileSingleSizeLimit:1024*1024*8,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: configData.pick,
        // pick: $('.js-uploaderBtn'),
        // // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false
    });

    uploader.on('uploadSuccess', function(file, res) {

        // 是否多个上传
        if(configData.multi){
            var li = '<li><img class="small-img" src="' + res.data.filename + '" alt=""/><i class="glyphicon glyphicon-trash delete-img"></i><input class="contract-hidden-name" type="hidden" /><input class="contract-hidden-url" type="hidden" value="' + res.data.filename + '" /></li>';
            configData.pick.find('ul').append(li);
        //单个上传
        }else{
        	configData.pick.find('img').attr('src',res.data.filename);//val(res.file_path);
            configData.pick.find('.uploader-val').val(res.data.filename);//val(res.file_path);
        }
    });

    uploader.on('uploadError', function(file, res) {
        util.prompt({
            text: res || '上传失败'
        });
    });
    uploader.on('error', function(type,res) {
        if(type == 'F_EXCEED_SIZE'){
            util.prompt({
                text: '文件超过上传大小限制'
            });
            return false;
        }

        util.prompt({
            text: res || '上传失败'
        });
    });
    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
    });



}


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
