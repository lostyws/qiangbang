<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<%@ include file="../layout/head.jsp" %>
<link rel="stylesheet" href="/view/static/admin/js/commercialtenant/edit.css" />
<style>
.select2-container--default .select2-results__group {
    color: #f60;

}
.webuploader-pick {
	text-align: left;
}
.webuploader-pick ul>li {
    list-style: none;
    float: left;
    margin-right: 5px;
    width: 100px;
    height: 100px;
}
</style>
<body>
    	<%@ include file="../layout/head2.jsp" %>
        <%@ include file="../layout/menu.jsp" %>
        <!-- Page Sidebar -->
        <div class="page-inner">

            <div class="page-title">
                    <h3>客户详情</h3>
                    <div class="page-breadcrumb">
                        <ol class="breadcrumb">
                            <li><a href="/index">主页</a></li>
                            <li><a href="/admin/index">客户列表</a></li>
                            <li class="active">编辑</li>
                        </ol>
                    </div>
                </div>
            <div id="main-wrapper">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h3 class="panel-title">基本信息</h3>
                    </div>
                    <div class="panel-body form-horizontal js-baseinfo">
                        <!-- <div class="form-group data-title">
                            <label class="col-md-2 control-label">账号：</label>
                            <div class="col-md-10">
                                <p><code>webtest01</code>
                                    <button class="btn btn-info">已认证</button>

                                    <button class="btn btn-default">未认证</button>
                                    <button class="btn btn-info">已交保证金</button>

                                    <button class="btn btn-default">未交保证金</button>
                                </p>
                            </div>



                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">手机号：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">15001894728</p>
                            </div>
                            <label class="col-md-2 control-label">oepenId：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">3d4343443dfdff3g3gh343</p>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">店名：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">小强五金店</p>
                            </div>
                            <label class="col-md-2 control-label">门店类别：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">
                                    建材（木头 石头 水泥）
                                </p>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">真实姓名：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">杨文寿</p>
                            </div>
                            <label class="col-md-2 control-label">身份证号：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">362331199112112118</p>
                            </div>

                        </div>

                        <div class="form-group">
                            <label class="col-md-2 control-label">营业执照名称：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">我是营业执照名称</p>
                            </div>
                            <label class="col-md-2 control-label">身份证正反面：</label>
                            <div class="col-md-4">
                                <div class="img-warp">
                                    <img src="/static/admin/images/abc.jpg" alt="身份证正面">
                                    <span class="iconfont icon-search js-showImg"></span>

                                </div>
                                <div class="img-warp">
                                    <img src="/static/admin/images/abc.jpg" alt="身份证反面">
                                    <span class="iconfont icon-search js-showImg"></span>

                                </div>
                            </div>


                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">营业执照照片：</label>
                            <div class="col-md-4">
                                <div class="img-warp">
                                    <img src="/static/admin/images/abc.jpg" alt="营业执照">
                                    <span class="iconfont icon-search js-showImg"></span>

                                </div>
                            </div>
                            <label class="col-md-2 control-label">门店照片：</label>
                            <div class="col-md-4">
                                <div class="img-warp">
                                    <img src="/static/admin/images/abc.jpg" alt="营业执照">
                                    <span class="iconfont icon-search js-showImg"></span>

                                </div>
                                <div class="img-warp">
                                    <img src="/static/admin/images/abc.jpg" alt="营业执照">
                                    <span class="iconfont icon-search js-showImg"></span>

                                </div>
                            </div>


                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">联系方式：</label>
                            <div class="col-md-10">
                                <p class="form-control-static">021-45669939</p>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">收货地址：</label>
                            <div class="col-md-10">
                                <p class="form-control-static">江西省上饶市万年县江西省上饶市万年县江西省上饶市万年县</p>
                            </div>

                        </div> -->
                    </div>
                </div>

            </div>
            <!-- Main Wrapper -->
            <%@ include file="../layout/footer.jsp" %>
        </div>
    </main>
    <script src="/view/static/myplugins/util/util.js"></script>

    <script src="/view/static/plugins/artdialog/js/dialog.js"></script>
    <script src="/view/static/plugins/handlebars/handlebars.min.js"></script>
    <script src="/view/static/plugins/select2/js/select2.js"></script>
    <script src="/view/static/plugins/validform/validform.js"></script>
    <script src="/view/static/plugins/datetimepicker/datetimepicker.js"></script>
    <script src="/view/staticwap/webuploader/0.1.6/webuploader.custom.js"></script>
        <!-- 弹框模板 -->
        <script type="x-handlebars-template" id="base-info-tmpl">
			<form class="clearfix editbase-form" action="/admin/details" method="post" >
            <div class="form-group data-title">
                <label class="col-md-2 control-label">账号：</label>
                <div class="col-md-10">
                    <p><code>{{userName}}</code>






                        {{#compare isApprove 1}}
                        <button class="btn btn-info">已认证</button>
                        {{else}}
                        <button class="btn btn-default">未认证</button>
                        {{/compare}}
                        {{#compare isCashdeposit 1}}
                        <button class="btn btn-info">已交保证金</button>
                        {{else}}
                        <button class="btn btn-default">未交保证金</button>
                        {{/compare}}
                        <i class="fa fa-star">{{userGrade}}</i>

                    </p>
                </div>



            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">手机号：</label>
                <div class="col-md-4">
                    <p class="form-control-static">{{phoneNumber}}</p>
                </div>
                <label class="col-md-2 control-label">oepenId：</label>
                <div class="col-md-4">
                    <p class="form-control-static">{{openId}}</p>
                </div>

            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">店名：</label>
                <div class="col-md-4">

					<input type="text" class="form-control" id="employee_mobile " value="{{storeName}}" name="storeName" nullmsg="请输入店名" errormsg="" defumsg="" datatype="s6-18" placeholder="请输入店名">
            		<span class="Validform_checktip"></span>
                </div>
                <label class="col-md-2 control-label">门店类别：</label>
                <div class="col-md-4">
              <span>${test}</span>
		<select class="select2 js-classify-select" name="classify" multiple style="width: 100%">
          <!-- options grouped within "optgroup" tag-->
		<c:forEach var="item" items="${categorys}" varStatus="status">
			<optgroup label="${item.cateName }">
				<c:forEach var="category" items="${item.cateRecords}" >
					<c:choose>
						<c:when test="${category.selected==1 }">
			      			<option value="${category.id }" selected>${category.categoryname }</option>
						</c:when>
						<c:otherwise>
							<option value="${category.id }">${category.categoryname }</option>
						</c:otherwise>
					</c:choose>
			    </c:forEach>
			</optgroup>
		</c:forEach>
        </select>

                </div>

            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">真实姓名：</label>
                <div class="col-md-4">

					<input type="text" class="form-control" id="realName " value="{{realName}}" name="realName" nullmsg="请输入" errormsg="" defumsg="" datatype="*" placeholder="请输入">
            		<span class="Validform_checktip"></span>
                </div>
                <label class="col-md-2 control-label">身份证号：</label>
                <div class="col-md-4">

					<input type="text" class="form-control" id="idCard " value="{{idCard}}" name="idCard" nullmsg="请输入" errormsg="" defumsg="" datatype="*" placeholder="请输入">
            		<span class="Validform_checktip"></span>
                </div>

            </div>

            <div class="form-group">
                <label class="col-md-2 control-label">营业执照名称：</label>
                <div class="col-md-4">
					<input type="text" class="form-control" id="businessLicenseName " value="{{businessLicenseName}}" name="businessLicenseName" nullmsg="请输入" errormsg="" defumsg="" datatype="*" placeholder="请输入">

					<span class="Validform_checktip"></span>
                </div>
                <label class="col-md-2 control-label">身份证正反面：</label>
                <div class="col-md-4">
                    <div class="img-warp js-upload-btn" uploader-url="/file/upload?ftype=1&uid={{userid}}">
                        <img src="{{idCardfront}}" alt="身份证正面">
                        <span class="iconfont icon-search js-showImg-idCardfront"></span>
						<input type="hidden" id="idCardfront" class="uploader-val" value="{{idCardfront}}" name="idCardfront">
                    </div>
                    <div class="img-warp js-upload-btn" uploader-url="/file/upload?ftype=2&uid={{userid}}">
                        <img src="{{idCardreverse}}" alt="身份证反面">
                        <span class="iconfont icon-search js-showImg"></span>
						<input type="hidden" id="idCardreverse" class="uploader-val" value="{{idCardreverse}}" name="idCardreverse">
                    </div>
                </div>


            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">营业执照照片：</label>
                <div class="col-md-4">
                    <div class="img-warp js-upload-btn" uploader-url="/file/upload?ftype=3&uid={{userid}}">
                        <img src="{{businessLicense}}" alt="营业执照">
                        <span class="iconfont icon-search js-showImg"></span>
						<input type="hidden" id="businessLicense" class="uploader-val" value="{{businessLicense}}" name="businessLicense">

                    </div>
                </div>
                <label class="col-md-2 control-label">门店照片：</label>
                <div class="col-md-4 ">


					<div class="img-warp js-upload-btn" uploader-url="/file/upload?ftype=4&uid={{userid}}">
                        <img src="{{storefront}}" alt="门店照片">
                        <span class="iconfont icon-search js-showImg"></span>
						<input type="hidden" id="businessLicense" class="uploader-val" value="{{storefront}}" name="storefront">

                    </div>

                </div>


            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">联系方式：</label>
                <div class="col-md-10">

					<input type="text" class="form-control" id="contactWay " value="{{contactWay}}" name="contactWay" nullmsg="请输入" errormsg="" defumsg="" datatype="*" placeholder="请输入">
            		<span class="Validform_checktip"></span>
                </div>

            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">收货地址：</label>
                <div class="col-md-10">

					<input type="text" class="form-control" id="expressAddress " value="{{expressAddress}}" name="expressAddress" nullmsg="请输入" errormsg="" defumsg="" datatype="*" placeholder="请输入">
            		<span class="Validform_checktip"></span>
                </div>

            </div>
			<div class="form-group text-center">
				<div class="btn btn-success js-editSave">保存</div>
			</div>
			<input type="hidden" id="userid " value="{{userid}}" name="userid">
			<input type="hidden" id="classifyName" value="{{classify}}" name="classifyName">
			<input type="hidden" id="classifyVal" value="{{classify}}" name="classifyVal">

			</form>
        </script>
    <!-- 弹框模板 -->
    <script type="x-handlebars-template" id="dialog-tmpl">
        <div class="my-dialog-left"><em class="my-dialog-icon icon-bounce"></em></div>
        <div class="my-dialog-right">
            <p class="my-dialog-strong">你确定要给  {{userName}}<span class="my-dialog-red">{{text}}</span>？</p>

        </div>
    </script>

    <script>
    var config = {
        	showDetailsUrl: '/admin/details',//获取用户详情
        	editDetailsUrl: '/admin/updateUser'//编辑用户详情
        }
    </script>
    <script src="/view/static/admin/js/commercialtenant/edit.js"></script>
</body>
</html>