<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/newhead.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/webuploader/0.1.6/webuploader.css"/>
<style type="text/css">
.webuploader-container {
	 width: 4.5rem;
}

.item-content img {
	width:2rem;
	margin-right:5px;
	
}
.upload-pick {
	padding: 1rem 0;
}

</style>
<body>
    <div class="views">
      <div class="view view-main">
       <div class="navbar navbar-white">
				<div class="navbar-inner">
                    <div class="left">
                        <a class="link icon-only" href="javascript:history.go(-1)">
                            <i class="icon icon-back"></i>
                        </a>
                    </div>
					<div class="center sliding">编辑logo</div>
					<div class="right">
						<span class="js-showMenu"><i class="icon icon-bars"></i></span>
					</div>
				</div>
			</div>
        <div class="pages">
          <div data-page="home" class="page navbar-fixed">
          	<div class="page-content">
       			
				<form id="my-form" class="list-block">
		          <ul>
		            <li>
		              <div class="item-content">
		                <div class="item-inner">
		                  <div class="item-title label">店铺logo：</div>
		                  <div class="item-input">
		                    <input type="hidden" name="shopicon" id="shopicon" value="">
		                    <div class="upload-pick">
		                    	<img class="upload-pick-img" src="${business.shopicon }">
		                    </div>
		                  </div>
		                </div>
		              </div>
		            </li>
		            
		          </ul>
		        </form>
		
		        <div class="content-block">
		          <a href="#" class="button button-fill button-big form-to-json">保存</a>
		        </div>
          	</div>
          </div>
        </div>
      </div>
    </div>



<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
<script type="text/javascript" src="/view/staticwap/js/jquery/1.11.1/jquery.js"></script>

<script type="text/javascript" src="/view/staticwap/webuploader/0.1.6/webuploader.custom.js"></script>
<script type="text/javascript">
     	var type = "${type }";
      //初始化Framework7
      var myApp = new Framework7(),
      	$$ = Framework7.$;
      	
     	//添加菜单功能
qbApp.showMenu();
var reverseuploader;
webuploaderImg('.upload-pick','#shopicon');

var isWeixin =packageJson.openId?true:false;
function webuploaderImg(id, imgId){
    // 实例化
    reverseuploader = WebUploader.create({
        pick: {
            id: id,
            multiple: false
        },
        swf: '/view/staticwap/webuploader/0.1.6/Uploader.swf',
	    server: '/file/upload_wap?ftype=5',
        formData: {
            uploaderType: 4
        },
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        auto: true,
        // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
        disableGlobalDnd: true,
        fileNumLimit: 3,
        fileSizeLimit: 5 * 1024 * 1024,    // 5 M
        fileSingleSizeLimit: 5 * 1024 * 1024   // 5 M
    });
    
    //选择文件
    reverseuploader.onFileQueued = function( file ) {

        //show loading...
        myApp.showIndicator();
        
        reverse = true;

        var img;
        reverseuploader.makeThumb( file, function( error, src,a,b) {
            img = '<img src="'+src+'">';
            $$(id + ' .webuploader-pick').html(img);
            
            //hide loading...
            myApp.hideIndicator();
        });
    };

    //上传成功
    reverseuploader.on('uploadSuccess', function(file, res) {
        //hide loading        
        if(res.status == 0) {
            serverId = res.data.filename;
            $$(imgId).val(serverId)
            
        }
        else {
            myApp.hideIndicator();
            myApp.alert(res.msg || '上传失败')
            
        }   
    })
    
    
    //error
    reverseuploader.on('uploadError', function(error) {
        myApp.hideIndicator();
        if(config.uploadImgErrors['' + error]) {
            myApp.alert(config.uploadImgErrors['' + error])
        }
    })
}      	
//保存按钮的事件
      $$('.form-to-json').on('click', function(){
      	var shopname = $$('#shopicon').val();
      	if(!shopname){
      		myApp.alert('请上传店铺logo');
      		return false;
      	}
      	dataAjax(shopname);
       });
     
     
     function dataAjax(shopname) {
     	//show loading...
   myApp.showIndicator();
   
     	$$.ajax({
     		url: "/wapact/updateShopLogo",
     		type: "post",
     		dataType: "json",
     		data: {
     			shopicon:$$('#shopicon').val(),
     			type:type
     		},
     		success: function(d){
     			//hide loading...
       	myApp.hideIndicator();
       	
     			if(d.status == 0){
     				window.location.href=d.msg;
     			} else {
     				myApp.alert(d.msg,'');
     			}
     		},error: function(){
                 myApp.hideIndicator();
                 myApp.alert('加载失败，请刷新重试！');
             }
     	});
     }
     </script>
  


</body>
</html>