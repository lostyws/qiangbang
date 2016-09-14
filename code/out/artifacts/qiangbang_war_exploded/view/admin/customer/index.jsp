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
                    <h3>客户管理</h3>
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
                   
                    <div class="panel-body panel-tab">
                        <div role="tabpanel">
                            <!-- Nav tabs -->
                           
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" class="active col-md-2"><a href="#tab1" role="tab" tab-type="1" data-toggle="tab">普通用户</a></li>
                                <li role="presentation" class="col-md-2"><a href="#tab2" role="tab" tab-type="2" data-toggle="tab">普通商户</a></li>
                                <li role="presentation" class="col-md-2"><a href="#tab3" role="tab" tab-type="3" data-toggle="tab">个体工商户</a></li>
                                <li class="tab-operate col-md-6">
                                    <div class="col-sm-offset-6 col-md-6">
                                        <div class="input-group">
                                            <input type="text" class="form-control js-customerName" placeholder="请输入用户名">
                                            <span class="input-group-addon add-on"><i class="glyphicon glyphicon-search"></i></span>
                                        </div>
                                    </div>
                                    
                                    <!-- <div class="col-md-4 batch-operate">
                                        <span class="dropdown">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                            <span class="menu-icon glyphicon glyphicon-cog"></span><span class="operate">批量操作</span><span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu dropdown-list js-operate-list" role="menu">
                                            <li role="presentation"><a href="javascript:;;">开放至公海</a></li>
                                            <li role="presentation"><a href="javascript:;;">转移</a></li>
                                            <li role="presentation"><a href="javascript:;;">删除</a></li>
                                            <li role="presentation"><a href="javascript:;;">导入</a></li>
                                        </ul>
                                        </span>
                                    </div> -->
                                </li>
                            </ul>
                            <!-- Tab panes -->
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane active" id="tab1">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered dataTable my-table-bordered user-table1" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>序号</th>
                                                    <th>用户名</th>
                                                    <th>手机号</th>
                                                    <th>身份证号码</th>
                                                    <th>地区</th>
                                                    <th>注册时间</th>
                                                    <th>余额</th>
                                                    <th>操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="odd">
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane" id="tab2">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered dataTable person-table-bordered user-table2" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>序号</th>
                                                    <th>用户名</th>
                                                    <th>手机号</th>
                                                    <th>身份证号码</th>
                                                    <th>职业</th>
                                                    <th>地区</th>
                                                    <th>注册时间</th>
                                                    <th>保证金</th>
                                                    <th>余额</th>
                                                    <th>操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="odd">
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane" id="tab3">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered dataTable person-table-bordered user-table3" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>序号</th>
                                                    <th>用户名</th>
                                                    <th>手机号</th>
                                                    <th>身份证号码</th>
                                                    <th>店名</th>
                                                    <th>行业类型</th>
                                                    <th>地区</th>
                                                    <th>注册时间</th>
                                                    <th>保证金</th>
                                                    <th>余额</th>
                                                    <th>操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="odd">
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Main Wrapper -->
            <%@ include file="../layout/footer.jsp" %>
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
        showListUrl: '/admin/getList',//获取用户详情
        auditApproveUrl: '/admin/reviewAuth',//审核认证
        auditCashdepositUrl: '/admin/reviewBondmoney',//审核保证金
        openAccountUrl: '/admin/enableAccount',//开启账号
        freezeAccountUrl: '/admin/disableAccount'//冻结账户
       
    }
    </script>
    <script src="/view/static/admin/js/commercialtenant/index.js"></script>
</body>
</html>