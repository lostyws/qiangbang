<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<%@ include file="layout/head.jsp" %>
<link rel="stylesheet" href="/view/static/myplugins/util/util.css">
<link rel="stylesheet" href="/view/static/plugins/datatables/css/dataTables.bootstrap.min.css" />
<link rel="stylesheet" href="/view/static/plugins/datatables/css/fixedColumns.bootstrap.css" />
<link rel="stylesheet" href="/view/static/plugins/artdialog/css/ui-dialog.css">
<link rel="stylesheet" href="/view/static/admin/css/commercialtenant/index.css">
<link rel="stylesheet" href="/view/static/plugins/select2/css/select2.min.css" />
<link rel="stylesheet" href="/view/static/plugins/datetimepicker/datetimepicker.css">
<link rel="stylesheet" href="/view/static/plugins/validform/validform.css" />

<body>
    	<%@ include file="layout/head2.jsp" %>
        <%@ include file="layout/menu.jsp" %>
        <!-- Page Sidebar -->
        <div class="page-inner">
            <div class="page-title">
                    <h3>商户管理</h3>
                    <!-- <div class="page-breadcrumb">
                        <ol class="breadcrumb">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="#">UI Kits</a></li>
                            <li class="active">Icons</li>
                        </ol>
                    </div> -->
                </div>
            <div id="main-wrapper">
                <div class="panel panel-white">
					 welcome to qiangbao admin!!!            
                </div>
            </div>
            <!-- Main Wrapper -->
            <%@ include file="layout/footer.jsp" %>
        </div>
    </main>
    <script src="/view/static/myplugins/util/util.js"></script>
    <script src="/view/static/plugins/datatables/js/jquery.datatables.js"></script>
    <script src="/view/static/plugins/datatables/js/jquery.datatables.js"></script>
    <script src="/view/static/plugins/datatables/js/dataTables.bootstrap.min.js"></script>
    <script src="/view/static/plugins/datatables/js/dataTables.fixedColumns.js"></script>
    <script src="/view/static/plugins/artdialog/js/dialog.js"></script>
    <script src="/view/static/plugins/handlebars/handlebars.min.js"></script>
    <script src="/view/static/plugins/select2/js/select2.js"></script>
    <script src="/view/static/plugins/validform/validform.js"></script>
    <script src="/view/static/plugins/datetimepicker/datetimepicker.js"></script>
    <script src="/view/static/plugins/dropzone/dropzone.min.js"></script>
    <!-- 弹框模板 -->
    <script type="x-handlebars-template" id="dialog-tmpl">
        <div class="my-dialog-left"><em class="my-dialog-icon icon-bounce"></em></div>
        <div class="my-dialog-right">
            <p class="my-dialog-strong">你确定要给  {{userName}}<span class="my-dialog-red">{{text}}</span>？</p>
            
        </div>
    </script>
   
    <script>
    var config = {
        showListUrl: 'http://127.0.0.1:3001',//获取用户详情
        auditApproveUrl: 'http://127.0.0.1:3001',//审核认证
        auditCashdepositUrl: 'http://127.0.0.1:3001',//审核保证金
        openAccountUrl: 'http://127.0.0.1:3001',//开启账号
        freezeAccountUrl: 'http://127.0.0.1:3001'//冻结账户
       
    }
    </script>
    <script src="/view/static/admin/js/commercialtenant/index.js"></script>
</body>
</html>