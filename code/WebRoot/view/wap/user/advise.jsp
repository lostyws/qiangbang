
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<link rel="stylesheet" type="text/css" href="/view/staticwap/webuploader/0.1.6/webuploader.css"/>
<%@ include file="/view/wap/layout/newhead.jsp" %>

        <style type="text/css">
            .upload-box {
    margin: 0 0 0 10px;
    float: left;
    width: 1.6rem;
    height: 1.6rem;
    border: 1px dashed #ccc;
    overflow: hidden;
}
.upload-box .upload-symbol {
    line-height: 1.6rem;
}
.upload-box img{
    height: 1.6rem;
    width: 1.8rem;
}
.advice-content {
    padding: 0 0.2rem 0.1rem;
    background-color: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}
.advice-content>div {
    overflow: hidden;
}
.advice-contact {
    margin: 10px 0;
    background-color: #fff;
}
.advice-contact input {
    width: 100%;
    padding: 0.2rem 10px;
    border: none;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-radius:0;
    -webkit-appearance: none;
}
.webuploader-pick-hover {
    background: none;
}
.thank-icon {
    margin: 0.1rem auto;
    height: 0.78rem;
    width: 0.92rem;
    background: url(http://staticwyb.joyowo.com/images/icon/11.png) no-repeat;
    background-size: 100%;
}
.modal-text {
    color: #858585;
}
textarea {
    width: 100%;
    border: 0;
    height: 100px;
}
        </style>
    </head>		
    <body class="weixin-body">
    <div class="statusbar-overlay"></div>
<div class="views">
    <div class="view view-main">
        <div class="pages">
            <div data-page="home" class="page navbar-fixed toolbar-fixed">
                <div class="navbar">
                    <div class="navbar-inner">
                        <div class="left">
                            <a href="javascript:history.go(-1);" class="link icon icon-only">
                                <i class="icon icon-back"></i>
                            </a>
                        </div>
                        <div class="center">我要吐槽</div>
                        <div class="right">
                            <span class="service-search"></span>
                            <span class="js-showMenu"><i class="icon icon-bars"></i></span>
                        </div>
                    </div>
                </div>
                <div class="page-content">
                    <div class="advice-content">
                    <textarea class="advice-text" placeholder="请输入您的建议或在使用过程中遇到问题反馈给我们，我们将会有针对性的筛选，并在常见问题中做出解答。"></textarea>
                        <div>
                            <div class="upload-box choose-companyimg1">
                                <div class="upload-symbol ">╋</div>
                            </div>
                            <div class="upload-box choose-companyimg2">
                                <div class="upload-symbol ">╋</div>
                            </div>
                            <div class="upload-box choose-companyimg3">
                                <div class="upload-symbol ">╋</div>
                            </div>
                        </div>
                    </div>
                    <div class="advice-contact">
                        <input type="text" placeholder="联系方式(手机号或邮箱)" />
                    </div>
                    <input id="img1" class="imgurl" type="hidden" >
                    <input id="img2" class="imgurl" type="hidden" >
                    <input id="img3" class="imgurl" type="hidden" >
                    <div class="content-block">
                        <input type="button" class="button button-big button-fill js-submit" value="提交" >  
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/js/jquery/1.11.1/jquery.js"></script>
<script type="text/javascript" src="/view/staticwap/webuploader/0.1.6/webuploader.custom.js"></script>
<script type="text/javascript" src="/view/staticwap/framework7/js/my-app.js"></script>
<script type="text/javascript">
var myApp = new Framework7();
var $$ = Dom7;
//添加菜单功能
qbApp.showMenu();

var config = {

    uploadImgErrors: {
        'Q_EXCEED_NUM_LIMIT':  '只能选择1张图',
        'Q_EXCEED_SIZE_LIMIT': '图片大小超过5mb',
        'Q_TYPE_DENIED': '图片类型不符合，请选择gif,jpg,jpeg,bmp,png'
    }
}

var reverseuploader;
webuploaderImg('.choose-companyimg1','#img1');
webuploaderImg('.choose-companyimg2','#img2');
webuploaderImg('.choose-companyimg3','#img3');
var isWeixin =packageJson.openId?true:false;
function webuploaderImg(id, imgId){
    // 实例化
    reverseuploader = WebUploader.create({
        pick: {
            id: id,
            multiple: false
        },
        swf: '/view/staticwap/webuploader/0.1.6/Uploader.swf',
	    server: '/file/upload_wap?ftype=1',
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
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");  
}

function checkText(str){
    if(str.length <= 0){
        myApp.alert("请填写您要吐嘈的内容");
        return false;
    } else if(str.length > 500){
        myApp.alert("内容控制在500个字之内");
        return false;
    } else {
        return true;
    }
}

function checkCantact(str){
    if(str.length <= 0){
        myApp.alert("请填写您的联系方式，手机号优先");
        return false;
    } else if(str.length > 32){
        myApp.alert("联系方式控制在32个字之内");
        return false;
    } else {
        return true;
    }
}

$$('.js-submit').on('click',function(e){
    var str = trim($$('.advice-text').val()),
        contactStr = trim($$('.advice-contact input').val()),
        picId = [];
    if(!checkText(str)){
        return false;
    }
    if(!checkCantact(contactStr)){
        return false;
    }

    $$('.imgurl').each(function(){
        var imgUrl = $$(this).val();
        if(imgUrl){
          picId.push(imgUrl)  
        }
    });

    $$.ajax({
        url:'/personsocial/feedback.do',
        type:'post',
        dataType:'json',
        data:{
            isWeixin: isWeixin,
            content: str,
            picId: picId,
            contactWay: contactStr
        },
        success: function(d){
            if(d.status == 0){
                myApp.modal({
                    title:  '',
                    text: '<div><div class="thank-icon"></div><div>感谢您的反馈！</div><div>我们将会针对性的筛选，并在常见问题中做出解答，特别问题将与您取得联系。</div></div>',
                    buttons: [
                      {
                        text: '我知道了',
                        onClick: function() {
                            window.location.href = '/';
                        }
                      }
                    ]
                });
            } else {
                myApp.alert(d.msg);
            }
            
        },error: function(){
            myApp.hideIndicator();
            myApp.alert('加载失败，请刷新重试！');
        }
    });
})

</script>
</body>
</html>