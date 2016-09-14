<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html>
<%@ include file="../layout/head.jsp" %>

<link rel="stylesheet" href="/view/static/admin/js/adv/edit.css">

<body>
<%@ include file="../layout/head2.jsp" %>
<%@ include file="../layout/menu.jsp" %>
<!-- Page Sidebar -->

  <div class="page-inner">

    <div class="page-title">
      <h3>内容管理</h3>
      <div class="page-breadcrumb">
        <ol class="breadcrumb">
          <li><a href="/index">主页</a></li>

        </ol>
      </div>
    </div>
    <div id="main-wrapper">
      <div class="panel panel-white">
				<div class="panel-heading clearfix">
					<h3 class="panel-title">新增广告</h3>
					<input type="hidden" id="bannerid" value="${banner.id }"/>
				</div>
				<div class="panel-body">
					<div class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-2 control-label">广告标题：</label>
							<div class="col-md-2"><input class="form-control" name="title" value="${banner.title }" type="text" datatype="*1-50" errormsg="广告标题允许1-20位的英文、数字、汉字" nullmsg="请输入广告标题" maxlength="50"></div>
							<div class="col-md-2"><p class="help-block" id="title_msg">请输入广告标题</p></div>


						</div>

                        <div class="form-group">
							<label class="col-sm-2 control-label">广告跳转URL：</label>
							<div class="col-md-6"><input class="form-control" name="adv_url" value="${banner.href }" type="text" datatype="*0-1000" nullmsg="请输入完整的url地址(含:http://)"></div>
							<div class="col-md-2"><p class="help-block" id="adv_url_msg">请输入完整的URL链接地址</p></div>
						</div>
																					<!-- 图片  幻灯-->
								<div class="form-group">
									<label class="col-sm-2 control-label">上传图片：</label>
									<div class="col-md-6">
		                         		<input name="content" type="hidden" id="img_upload" value="${banner.path }">
	                                 	<div class="dropzone-warp">



		                                </div>
	                              	</div>
		                            <div class="col-md-2"><a class="col-md-12 btn btn-info js-dropzoneImg dz-clickable">上传</a></div>
								</div>
																										<div class="form-group">
							<label class="col-sm-2 control-label">&nbsp;</label>
							<div class="col-md-4">

								<button type="submit" class="btn btn-success add_adv_submit" id="add_adv_submit">保存</button>
							</div>
						</div>
					</div>
				</div>
			</div>
    </div>
    <div class="preview-none" style="display: none;"></div>
  <!-- Main Wrapper -->
  <%@ include file="../layout/footer.jsp" %>
</div>
</main>

<script src="/view/static/admin/js/adv/edit.js"></script>


<!-- 弹框模板 -->



<script>

</script>


</body>
</html>