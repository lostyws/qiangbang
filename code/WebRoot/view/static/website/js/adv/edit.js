



import '{myplugins}/util/util.css';
import '{plugins}/artdialog/css/ui-dialog.css';
import '{plugins}/layer/skin/layer.css';
import '{plugins}/validform/validform.css';
import '{website}/css/adv/index.css';

import '{website}/js/common/common';
import  Handlebars from '{plugins}/handlebars/handlebars.min';
import '{myplugins}/util/util';
import '{plugins}/dropzone/dropzone.min';
import layer from '{plugins}/layer/layer';
import '{plugins}/validform/validform';

var advDropzone = null;
/**
 * singleAdd
 * 单个替换上传
 */

function singleAdd(cls, text, maxSize) {
    console.log('singleAdd')
    return new Dropzone(cls, {
        url: '/file/upload_wap?ftype=2',
        previewsContainer: '.preview-none',
        maxFilesize: maxSize || 1, // MB(200KB),
        acceptedFiles: 'image/*',

        sending: function(file, xhr, formData) {
            //文件类型
            formData.append("type", 1);
        },
        success: function(data, json) {

            if (json.status !== 0) {

                layer.msg(json.message || '上传失败')
                return;
            }
            //add img
           /*  var img = new Image();
            img.src = json.file_path;
            img.className = 'small-img'; */
            $("#img_upload").val(json.data.filename);
            //$('.dropzone-warp').html(img);
            $('.dropzone-warp').html('<img src="'+json.data.filename+'" class="small-img"/>');



        },
        error: function(data, msg) {
            console.log(data)
            var size = data.size;

            if(size > 1024 * 200 && text) {

                layer.msg(text)
                return;
            }

            layer.msg(msg)
        },
        complete: function(data) {
            //hide loading
            util.loading.hide();

            //上传插件会强制添加display: none;原因不明
            setTimeout(function() {
            	$('.dropzone-warp').find('img').show().removeAttr('style');
            },300);

        }

    });
}
function pageInit () {


	advDropzone = singleAdd(".js-dropzoneImg", '广告位图片请控制在1M以内！');
}
pageInit();
//表单验证
$(".form-horizontal").Validform({
	tiptype:3,
	btnSubmit:".add_adv_submit",
	datatype:{
		"sn1-100" : /^[\d\w]{1,100}$/
	},
	showAllError:true,
	tiptype:function(i,t,o){
		if(!t.obj.is("div")){
			var _msg_obj = t.obj.attr("name");
			var r = $('#'+_msg_obj+'_msg');
			o(r,t.type),r.text(i);
			return false;
		}
	}
});
$("#add_adv_submit").click(function(){
	if($('.Validform_wrong').length>0){ return false; }

	var ajaxdata= {
			 title:$(".form-group input[name='title']").val(),

			 adv_url: $(".form-group input[name='adv_url']").val(),
			 bannerid: $("#bannerid").val(),
			 content: $(".form-group input[name='content']").val()

	}

	$.ajax({
		type:"post",
		url:"/banner/update",
		data:ajaxdata,
		dataType:"json",
		success:function(data){
				if(data.status == 0){
						layer.msg(data.msg,{icon: 1});
						window.location.href="/banner/index";

					}else{
						if(data.data){
							$('#'+data.data.filed+'_msg').html(data.data.vail_error);
		                	$('#'+data.data.filed+'_msg').addClass("watting-msg");
						}else{
							layer.msg(data.msg,{icon: 1});
							}
		                return false;
					}
				}
		});

});

