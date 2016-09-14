<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html>
<%@ include file="../layout/head.jsp" %>
<link rel="stylesheet" href="/view/static/admin/js/adv/add.css">

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

        <div class="panel-body">
			<h4 class="no-m m-b-sm">首页(banner) &nbsp;&nbsp; &nbsp;(标准尺寸:750*225)</h4>
		</div>
		<div class="panel-body">
					<div>
						<a href="/banner/goAdd">
							<button type="button" class="btn btn-primary btn-addon m-b-sm" data-toggle="modal" data-target=".add-modal"><i class="fa fa-plus"></i> 新增</button>
						</a>
					</div>
					<div class="table-responsive">
						<table class="table">
							<colgroup>
								<col width="10%">
								<col width="20%">
								<col width="50%">
								<col width="20%">
							</colgroup>
							<thead>
								<tr>
									<th>序号</th>
									<th>广告标题</th>

									<th>广告链接</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
							<c:forEach var="item" items="${banners}" varStatus="status">
                     			<tr>
									<td>${item.id }</td>
									<td>${item.title }</td>
									<td>${item.href }</td>
									<td>
										<a href="/banner/goEdit/${item.id }"><span data-href="" data-toggle="modal" data-target=".edit-modal"><i class="glyphicon glyphicon-pencil"></i> 修改</span></a>&nbsp;&nbsp;
										<a href="javascript:void(0);"><span data-href="/banner/delete/${item.id }" class="delete-confirm" data-id=""><i class="glyphicon glyphicon-remove"></i> 删除</span></a>&nbsp;&nbsp;
									</td>
								</tr>
							</c:forEach>
							</tbody>
						</table>
					</div>

										<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
						<div class="btn-group f-fr" role="group" aria-label="First group">
						</div>
					</div>
				</div>
      </div>
    </div>
  <!-- Main Wrapper -->
  <%@ include file="../layout/footer.jsp" %>
</div>
</main>

</body>
</html>