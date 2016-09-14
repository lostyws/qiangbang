<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<%@ include file="../layout/head.jsp" %>
<link href="${domain}/view/static/plugins/datatables/css/jquery.datatables.css" rel="stylesheet" type="text/css">
<link href="${domain}/view/static/plugins/datatables/css/dataTables.bootstrap.css" rel="stylesheet" type="text/css">
<body>
    	<%@ include file="../layout/head2.jsp" %>
        <%@ include file="../layout/menu.jsp" %>
        <!-- Page Sidebar -->
        <div class="page-inner">

            <div class="page-title">
                    <h3>分类管理</h3>
                    <div class="page-breadcrumb">
                        <ol class="breadcrumb">
                            <li><a href="/index">主页</a></li>

                        </ol>
                    </div>
                </div>
               <div id="main-wrapper" class="organization">
                <div class="panel panel-white">
                    <div class="panel-body">
                    		<form action="/category/update" theme="simple" method="post" id="form" name="form">
								<input id="catalogID" name="category.parentId" value="${category.parentId }" style="display: none;"/>
								<input id="catalogID_currentID" name="category.id" value="${category.id }" style="display: none;"/>
								<input type="hidden" value="p" name="type" id="type"/>
								<input type="hidden" value="${category.level }" name="category.level"/>

								<table class="table table-bordered" style="width: 95%;margin: auto;">
									<tr style="background-color: #dff0d8">
										<td colspan="2" style="background-color: #dff0d8;text-align: center;">
											<strong>编辑分类</strong>
												<span class="badge badge-important">商品分类</span>&nbsp;<strong>
										</td>
									</tr>
									<tr style="display: none;">
										<td>id</td>
										<td><input type="hidden" value="20" name="id" label="id" /></td>
									</tr>
										<tr>
										<td style="text-align: right;">大类</td>
										<td style="text-align: left;">
											<select onchange="catalogChange(this);"  id="catalogSelect">
												<option></option>
												<c:forEach var="item" items="${categoies}" varStatus="status">
													 <c:choose>
													 	<c:when test="${item.level==0 }">
													 		<option pid="0" value="${item.id }"><font color='red'>${item.categoryname }</font></option>
													 	</c:when>
													 	<c:otherwise>
													 		<option value="${item.id }"><font color='red'>&nbsp;&nbsp;&nbsp;&nbsp;${item.categoryname }</font></option>
													 	</c:otherwise>
													 </c:choose>
												</c:forEach>
											</select>
										</td>
									</tr>
									<tr>
										<td style="text-align: right;">名称</td>
										<td style="text-align: left;"><input type="text"  value="${category.categoryname }" name="category.categoryname"  id="categoryname" size="20" maxlength="20"
												/></td>
									</tr>
									<tr>
										<td style="text-align: right;">最低价</td>
										<td style="text-align: left;"><input type="text"  value="${category.minmoney }" name="category.minmoney"  id="minmoney" size="20" maxlength="20"
												/></td>
									</tr>
									<tr>
										<td style="text-align: right;">佣金固定价</td>
										<td style="text-align: left;"><input type="text"  value="${category.price }" name="category.price"  id="price" size="20" maxlength="20"
												/></td>
									</tr>
									<tr>
										<td style="text-align: right;">佣金百分比</td>
										<td style="text-align: left;"><input type="text"  value="${category.percent }" name="category.percent"  id="percent" size="20" maxlength="20"
												/></td>
									</tr>
									<tr>
										<td style="text-align: right;">排序</td>
										<td style="text-align: left;"><input type="text"  value="${category.corder }" name="category.corder"  id="corder" size="20" maxlength="20"
												/></td>
									</tr>
									<tr>
										<td style="text-align: right;">描述</td>
										<td style="text-align: left;"><input type="text"  value="${category.description }" name="category.description" size="20" maxlength="20"/></td>
									</tr>
									<tr>
										<td colspan="2" style="text-align: center;">
						                        <button id="submitCateAdd" type="button" class="btn btn-success"><i class="icon-ok icon-white"></i> 保存</button>
						                        <button onclick="javascript:window.location.href='/category/index'" type="button" class="btn btn-success"><i class="icon-ok icon-white"></i> 返回</button>
										</td>
									</tr>
								</table>
							</form>
            		</div>
                </div>
            </div>
            <!-- Main Wrapper -->
            <%@ include file="../layout/footer.jsp" %>
        </div>
    </main>
    <script src="/view/static/admin/js/classifymanagement/edit.js"></script>

</body>
</html>