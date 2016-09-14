<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<%@ include file="../layout/head.jsp" %>
<link rel="stylesheet" href="/view/static/myplugins/util/util.css">
<link rel="stylesheet" href="/view/static/plugins/datatables/css/dataTables.bootstrap.min.css" />
<link rel="stylesheet" href="/view/static/plugins/datatables/css/fixedColumns.bootstrap.css" />
<link rel="stylesheet" href="/view/static/plugins/artdialog/css/ui-dialog.css">
<link rel="stylesheet" href="/view/static/admin/css/commercialtenant/index.css">
<link rel="stylesheet" href="/view/static/plugins/select2/css/select2.min.css" />
<link rel="stylesheet" href="/view/static/plugins/datetimepicker/datetimepicker.css">
<link rel="stylesheet" href="/view/static/plugins/validform/validform.css" />

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
            <div class="init-wrap">
                <div class="init-bg-wrap">
                    <span class="tips">亲，从这里可以开始新增分类哦！</span>
                    <button class="btn btn-add btn-init">新增分类</button>
                </div>
                <i class="org-icon icon-bounce"></i>
            </div>
            <div class="init-save-wrap">
                <div class="col-xs-8">
                    <div class="input-group">
                        <input type="text" class="form-control root-name"> <span class="input-group-btn">
                        <button class="btn btn-add btn-save" type="button">保存</button></span>
                    </div>
                </div>
                <button class="btn btn-default btn-cancel col-xs-2" type="button">取消</button>
            </div>
            <div id="mytree" class="org-tree jstree jstree-1 jstree-default" role="tree" aria-multiselectable="true" tabindex="0" aria-activedescendant="1" aria-busy="false">
                <ul class="jstree-container-ul jstree-children" role="group"></ul></div>
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

    <script src="/view/static/plugins/jstree/jstree.js"></script>
    <!-- 弹框模板 -->
    <script type="text/html" id="jstree-editable-tpl">
        <ul class="jstree-editable">
            <li class="add"><i class="icon icon-plus"></i>新增</li>
            <li class="edit"><i class="icon fa fa-edit"></i>编辑</li>
            <li class="del"><i class="icon glyphicon glyphicon-trash"></i>删除</li>
        </ul>
    </script>

    <script>
    var config = {

        orgUrl: 'http://127.0.0.1:3006',//分类详情
        nodeUrl: 'http://127.0.0.1:3006', //创建
        updateNode: 'http://127.0.0.1:3006', //更新
        deleteNode: 'http://127.0.0.1:3006' //删除
    }

    </script>
    <script src="/view/static/admin/js/classifymanagement/index.js"></script>
</body>
</html>