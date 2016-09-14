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
                    <h3>客户详情</h3>
                    <div class="page-breadcrumb">
                        <ol class="breadcrumb">
                            <li><a href="index.html">主页</a></li>
                            <li><a href="index.html">订单列表</a></li>
                            <li class="active">详情</li>
                        </ol>
                    </div>
                </div>
            <div id="main-wrapper">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h3 class="panel-title">基本信息</h3>
                    </div>
                    <div class="panel-body form-horizontal js-baseinfo">
                        <!-- <div class="form-group td-edit" orderid="1" ordernumber="zd09090923">

                            <button class="btn btn-danger js-stopOrder">终止订单</button>
                            <button class="btn btn-danger js-deleteOrder">删除订单</button>
                            <button class="btn btn-danger js-affirmOrder">强制已完成</button>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">订单号：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">122</p>
                            </div>
                            <label class="col-md-2 control-label">金额：</label>
                            <div class="col-md-4">
                                
                                <p class="form-control-static" >
                                    <code>565656.00</code>
                                    
                                </p>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">买家：</label>
                            <div class="col-md-4">
                                <p class="form-control-static"><a href="/static/admin/html/commercial/details.html?id=12">webtest01</a></p>
                            </div>
                            <label class="col-md-2 control-label">卖家：</label>
                            <div class="col-md-4">
                                <p class="form-control-static"><a href="/static/admin/html/commercial/details.html?id=12">webtest01</a></p>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">发布时间：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">122</p>
                            </div>
                            <label class="col-md-2 control-label">订单状态：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">565656.00</p>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">买家评价：</label>
                            <div class="col-md-10">
                                <p class="form-control-static">服务态度-产品质量-</p>
                                
                                <p class="form-control-static">描述-</p>
                            </div>
                            

                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">卖家评价：</label>
                            <div class="col-md-10">
                                <p class="form-control-static">评价-</p>
                                
                                <p class="form-control-static">描述-</p>
                            </div>
                            

                        </div> -->
                        
                    </div>
                </div>
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h3 class="panel-title">报价列表</h3>
                    </div>
                    <div class="panel-body form-horizontal js-transaction-record">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered dataTable my-table-bordered offer-table" width="100%">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>卖家</th>
                                        <th>报价</th>
                                        <th>成交量</th>
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
    <script src="/view/static/plugins/select2/js/select2.js"></script>
    <script src="/view/static/plugins/validform/validform.js"></script>
    <script src="/view/static/plugins/datetimepicker/datetimepicker.js"></script>
    <script src="/view/static/plugins/dropzone/dropzone.min.js"></script>
        <!-- 基础信息模板 -->
        <script type="x-handlebars-template" id="base-info-tmpl">
            <div class="form-group" >
                <label class="col-md-2 control-label">订单号：</label>
                <div class="col-md-4">
                    <p class="form-control-static">{{orderNumber}}</p>
                </div>
                <div class="col-md-6 td-edit" orderid="{{id}}" ordernumber="{{orderNumber}}">
                    <button class="btn btn-danger js-stopOrder">终止订单</button>
                    <button class="btn btn-danger js-deleteOrder">删除订单</button>
                    <button class="btn btn-danger js-affirmOrder">强制已完成</button>
                </div>

            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">意向金额：</label>
                <div class="col-md-4">

                    <p class="form-control-static" >
                        {{intentionAmount}}

                    </p>
                </div>

                <label class="col-md-2 control-label">交易金额：</label>
                <div class="col-md-4">

                    <p class="form-control-static" >
                        <code>{{transactionAmount}}</code>

                    </p>
                </div>

            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">买家：</label>
                <div class="col-md-4">
                    <p class="form-control-static"><a href="/static/admin/html/commercial/details.html?id={{buyerId}}">{{buyerName}}</a></p>
                </div>
                <label class="col-md-2 control-label">卖家：</label>
                <div class="col-md-4">
                    <p class="form-control-static"><a href="/static/admin/html/commercial/details.html?id={{sellerId}}">{{sellerName}}</a></p>
                </div>

            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">发布时间：</label>
                <div class="col-md-4">
                    <p class="form-control-static">{{releaseTime}}</p>
                </div>
                <label class="col-md-2 control-label">订单状态：</label>
                <div class="col-md-4">
                    <p class="form-control-static">
                        {{#compare status 1}}
                        进行中
                        {{/compare}}
                        {{#compare status 2}}
                        已完成
                        {{/compare}}
                        {{#compare status 3}}
                        已取消
                        {{/compare}}

                    </p>
                </div>

            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">买家评价：</label>
                <div class="col-md-10">
                    <p class="form-control-static">服务态度-{{buyerEvaluate.service}}产品质量-{{buyerEvaluate.quality}}</p>

                    <p class="form-control-static">描述-{{buyerEvaluate.describe}}</p>
                    <p class="form-control-static">
                        {{#each buyerEvaluate.imgList}}
                    <div class="img-warp">
                        <img src="{{this}}" alt="">
                        <span class="iconfont icon-search js-showImg"></span>

                    </div>
                    {{/each}}
                    </p>
                </div>


            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">卖家评价：</label>
                <div class="col-md-10">
                    <p class="form-control-static">评价-{{sellerEvaluate.grade}}</p>

                    <p class="form-control-static">描述-{{sellerEvaluate.describe}}</p>
                </div>


            </div>


        </script>
        <!-- 报价列表模板 -->
        <script type="x-handlebars-template" id="offer-list-tmpl">
            {{#each this}}
            <tr role="row" class="odd">
                <td>1</td>
                <td><a href="/admin/goDetails?id={{sellerId}}">{{sellerName}}</a></td>
                <td>{{offerMoney}}</td>
                <td>{{sumOrders}}</td>
                <td><p>{{describe}}</p></td>
            </tr>
            {{/each}}


        </script>
        <!-- 弹框模板 -->
        <script type="x-handlebars-template" id="dialog-tmpl">
            <div class="my-dialog-left"><em class="my-dialog-icon icon-bounce"></em></div>
            <div class="my-dialog-right">
                <p class="my-dialog-strong">你确定要 <span class="my-dialog-red">{{text}}</span>？</p>

            </div>
        </script>
   
    <script>
    var config = {
        
        showDetailsUrl: '/order/details',//获取用户详情
        stopOrderUrl: 'http://127.0.0.1:3002',//终止订单
        delOrderUrl: 'http://127.0.0.1:3002',//删除订单
        affirmOderUrl: 'http://127.0.0.1:3002',//强制确定交易完成
        
       
    }
    </script>
    <script src="/view/static/admin/js/ordermanagement/details.js"></script>
</body>
</html>