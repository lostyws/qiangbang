<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<%@ include file="../layout/head.jsp" %>
<link rel="stylesheet" href="/view/static/plugins/jquery-treegrid/css/jquery.treegrid.css">
<link rel="stylesheet" href="/view/static/plugins/datatables/css/dataTables.bootstrap.min.css" />


<body>
    	<%@ include file="../layout/head2.jsp" %>
        <%@ include file="../layout/menu.jsp" %>
        <!-- Page Sidebar -->
        <div class="page-inner">
            
            <div class="page-title">
                    <h3>分类管理</h3>
                    <div class="page-breadcrumb">
                        <ol class="breadcrumb">
                            <li><a href="index.html">主页</a></li>
                            
                        </ol>
                    </div>
                </div>
            <div id="main-wrapper" class="organization">
                <div class="panel panel-white">
                    <div class="panel-body">
                    	<table class="table table-bordered table-condensed table-hover">
							<tr>
								<td colspan="16">
									<a href="/category/add" class="btn btn-success">
										<i class="icon-plus-sign icon-white"></i> 添加
									</a>
								</td>
							</tr>
						</table>
						    <table class="table tree">
								<tr>
									<td>类别</td>
									<td>最低价</td><td>佣金</td>
									<td>佣金百分比</td>
									<td>操作</td>
								</tr>
								<c:forEach var="item" items="${categoies}" varStatus="status">
									 <c:choose>
									 	<c:when test="${item.level==0 }">
									 		<tr class="treegrid-${item.id }">
									 	</c:when>
									 	<c:otherwise>
									 		<tr class="treegrid-${item.id } treegrid-parent-${item.parentId }">
									 	</c:otherwise>
									 </c:choose>     
								      
					                    <td>${item.categoryname }</td>
										<td>${item.minmoney }</td><td>${item.price }</td>
										<td>${item.percent }</td>
										<td>
											<button class="btn btn-warning" onclick="editCategory(${item.id })">
											<i class="icon-edit icon-white"></i> 编辑
											</button>
											<button method="deletes" class="btn btn-danger" onclick="delCategory(${item.id })">
												<i class="icon-remove-sign icon-white"></i> 删除
											</button>
										</td>
					                </tr>
								</c:forEach>
				            </table> 
            		</div>
                </div>
            </div>
            <!-- Main Wrapper -->
            <%@ include file="../layout/footer.jsp" %>
        </div>
    </main>
    <script src="/view/static/plugins/jquery-treegrid/js/jquery.treegrid.js"></script>
    <script src="/view/static/plugins/handlebars/handlebars.min.js"></script>
    <!-- 弹框模板 -->
    <script type="text/html" id="jstree-editable-tpl">
        <ul class="jstree-editable">
            <li class="add"><i class="icon icon-plus"></i>新增</li>
            <li class="edit"><i class="icon fa fa-edit"></i>编辑</li>
            <li class="del"><i class="icon glyphicon glyphicon-trash"></i>删除</li>
        </ul>
    </script>
    <script type="text/javascript">
    	$(document).ready(function() {
        	$('.tree').treegrid();
      });
    	
    	function editCategory(id){
    		window.location.href="/category/edit/"+id;
    		
    	}
    </script>
   
</body>
</html>