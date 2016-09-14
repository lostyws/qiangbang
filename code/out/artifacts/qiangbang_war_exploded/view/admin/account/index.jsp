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
      <h3>账户管理</h3>
      <div class="page-breadcrumb">
        <ol class="breadcrumb">
          <li><a href="index.html">主页</a></li>

        </ol>
      </div>
    </div>
    <div id="main-wrapper">
      <div class="panel panel-white">

        <div class="panel-body form-horizontal js-accountList">
          <div class="form-group">
            <div class="col-ms-6 col-md-6">
              <div class="control-group js-accountype">


                <label class="label-radio">
                  <input type="radio" name="accountype" value="1" class="accountype" checked=""> <span class="radio-text">收入<em class="text-success income">&yen;0.00</em></span>
                </label>

                <label class="label-radio">
                  <input type="radio" name="accountype" value="2" class="accountype"> <span class="radio-text">支出<em class="text-danger expense">&yen;0.00</em></span>
                </label>


              </div>
            </div>

          </div>
          <div class="table-responsive">
            <table class="table table-striped table-bordered dataTable my-table-bordered account-table" width="100%">
              <thead>
              <tr>
                <th>序号</th>
                <th>订单号</th>
                <th>类别</th>
                <th>金额</th>
                <th>时间</th>
                <th>备注</th>

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

<script src="/view/static/plugins/validform/validform.js"></script>
<script src="/view/static/plugins/datetimepicker/datetimepicker.js"></script>

<!-- 弹框模板 -->


<script>
  var config = {

    showListUrl: '/account/getList',//获取账户详情



  }
</script>
<script src="/view/static/admin/js/account/index.js"></script>


</body>
</html>