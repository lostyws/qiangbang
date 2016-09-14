<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<%@ include file="../layout/head.jsp" %>

<link rel="stylesheet" href="/view/static/admin/js/ordermanagement/index.css" />

<body>
    	<%@ include file="../layout/head2.jsp" %>
        <%@ include file="../layout/menu.jsp" %>
        <!-- Page Sidebar -->
        <div class="page-inner">
            <div class="page-title">
                    <h3>订单管理</h3>
                    <div class="page-breadcrumb">
                        <ol class="breadcrumb">
                            <li><a href="/index">主页</a></li>

                        </ol>
                    </div>
                </div>
            <div id="main-wrapper">
                <div class="panel panel-white">

                    <div class="panel-body form-horizontal js-orderlist">
                        <div class="form-group">
                        	<div class="col-ms-6 col-md-6">
                                <div class="control-group js-orderStatus">


                                    <label class="label-radio">
                                        <input type="radio" name="orderStatus" value="1" class="order-status" checked=""> <span class="radio-text">进行中</span>
                                    </label>

                                    <label class="label-radio">
                                        <input type="radio" name="orderStatus" value="2" class="order-status"> <span class="radio-text">已完成</span>
                                    </label>
                                    <label class="label-radio">
                                        <input type="radio" name="orderStatus" value="3" class="order-status"> <span class="radio-text">已取消</span>
                                    </label>

                                </div>
                            </div>
                            <div class="col-md-offset-2 col-md-4">
                                <div class="input-group">
                                    <input type="text" class="form-control js-orderNumber" placeholder="请输入订单号">
                                    <span class="input-group-addon add-on"><i class="glyphicon glyphicon-search"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered dataTable my-table-bordered order-table" width="100%">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>订单号</th>
                                        <th>买家</th>
                                        <th>卖家</th>
                                        <th>交易金额</th>
                                        <th>发布时间</th>
                                        <th>状态</th>
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
            <!-- Main Wrapper -->
            <%@ include file="../layout/footer.jsp" %>
        </div>
    </main>

    <!-- 弹框模板 -->
    <script type="x-handlebars-template" id="dialog-tmpl">
        <div class="my-dialog-left"><em class="my-dialog-icon icon-bounce"></em></div>
        <div class="my-dialog-right">
            <p class="my-dialog-strong">你确定要给  {{userName}}<span class="my-dialog-red">{{text}}</span>？</p>

        </div>
    </script>

    <script>
    var config = {

        showListUrl: '/order/getList',//获取订单详情
        stopOrderUrl: '/order/stopOrder',//终止订单
        delOrderUrl: '/order/deleteOrder',//删除订单
        affirmOderUrl: '/order/finishOrder',//强制确定交易完成


    }
    </script>
    <script src="/view/static/admin/js/ordermanagement/index.js"></script>
</body>
</html>