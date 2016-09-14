<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<%@ include file="../layout/head.jsp" %>

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
                    		<form action="/category/save" theme="simple" method="post" id="form" name="form">
								<input id="catalogID" name="category.parentId" style="display: none;"/>
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
											<select onchange="catalogChange(this);" id="catalogSelect">
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
										<td style="text-align: left;"><input type="text"  name="category.categoryname"  id="price" size="20" maxlength="20"
												/></td>
									</tr>
									<tr>
										<td style="text-align: right;">最低价</td>
										<td style="text-align: left;"><input type="text"  name="category.minmoney"  id="minmoney" size="20" maxlength="20"
												/></td>
									</tr>
									<tr>
										<td style="text-align: right;">佣金固定价</td>
										<td style="text-align: left;"><input type="text"  name="category.price"  id="price" size="20" maxlength="20"
												/></td>
									</tr>
									<tr>
										<td style="text-align: right;">佣金百分比</td>
										<td style="text-align: left;"><input type="text"  name="category.percent"  id="price" size="20" maxlength="20"
												/></td>
									</tr>
									<tr>
										<td style="text-align: right;">描述</td>
										<td style="text-align: left;"><input type="text"  name="category.description" size="20" maxlength="20"/></td>
									</tr>
									<tr>
										<td colspan="2" style="text-align: center;">
						                        <button onclick="submitCateAdd();" type="button" class="btn btn-success"><i class="icon-ok icon-white"></i> 新增</button>
						                        <button method="back" class="btn btn-success"><i class="icon-ok icon-white"></i> 返回</button>
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
    	selectDefaultCatalog();
	});
	
    function selectDefaultCatalog(){
    	var _catalogID = $("#catalogID").val();
    	console.log("selectDefaultCatalog._catalogID="+_catalogID);
    	//if(_catalogID!='' && _catalogID>0){
    		$("#catalogSelect").val(_catalogID);
    	//}
    }
	
    function catalogChange(obj){
    	var _pid = $(obj).find("option:selected").attr("pid");
    	var cur_pid = $(obj).find("option:selected").val();
    	console.log("_pid="+_pid);
    	if(!(_pid && _pid==0)){
    		alert("不能选择子类!");
    		selectDefaultCatalog();
    		return false;
    	}
    }
    
    function submitCateAdd(){
    	var pid = $("#catalogSelect").find("option:selected").val();
    	if(pid==""){
    		pid=0;
    	}
    	$("#catalogID").val(pid);
    	$("#form").submit();
    }
    </script>
   
</body>
</html>