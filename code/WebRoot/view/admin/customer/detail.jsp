<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<%@ include file="../layout/head.jsp" %>
<link rel="stylesheet" href="/view/static/admin/js/commercialtenant/details.css">


<body>
    	<%@ include file="../layout/head2.jsp" %>
        <%@ include file="../layout/menu.jsp" %>
        <!-- Page Sidebar -->
        <div class="page-inner">

            <div class="page-title">
                    <h3>客户详情</h3>
                    <div class="page-breadcrumb">
                        <ol class="breadcrumb">
                            <li><a href="/index">主页</a></li>
                            <li><a href="/admin/index">客户列表</a></li>
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
                        <!-- <div class="form-group data-title">
                            <label class="col-md-2 control-label">账号：</label>
                            <div class="col-md-10">
                                <p><code>webtest01</code>
                                    <button class="btn btn-info">已认证</button>

                                    <button class="btn btn-default">未认证</button>
                                    <button class="btn btn-info">已交保证金</button>

                                    <button class="btn btn-default">未交保证金</button>
                                </p>
                            </div>



                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">手机号：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">15001894728</p>
                            </div>
                            <label class="col-md-2 control-label">oepenId：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">3d4343443dfdff3g3gh343</p>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">店名：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">小强五金店</p>
                            </div>
                            <label class="col-md-2 control-label">门店类别：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">
                                    建材（木头 石头 水泥）
                                </p>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">真实姓名：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">杨文寿</p>
                            </div>
                            <label class="col-md-2 control-label">身份证号：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">362331199112112118</p>
                            </div>

                        </div>

                        <div class="form-group">
                            <label class="col-md-2 control-label">营业执照名称：</label>
                            <div class="col-md-4">
                                <p class="form-control-static">我是营业执照名称</p>
                            </div>
                            <label class="col-md-2 control-label">身份证正反面：</label>
                            <div class="col-md-4">
                                <div class="img-warp">
                                    <img src="/static/admin/images/abc.jpg" alt="身份证正面">
                                    <span class="iconfont icon-search js-showImg"></span>

                                </div>
                                <div class="img-warp">
                                    <img src="/static/admin/images/abc.jpg" alt="身份证反面">
                                    <span class="iconfont icon-search js-showImg"></span>

                                </div>
                            </div>


                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">营业执照照片：</label>
                            <div class="col-md-4">
                                <div class="img-warp">
                                    <img src="/static/admin/images/abc.jpg" alt="营业执照">
                                    <span class="iconfont icon-search js-showImg"></span>

                                </div>
                            </div>
                            <label class="col-md-2 control-label">门店照片：</label>
                            <div class="col-md-4">
                                <div class="img-warp">
                                    <img src="/static/admin/images/abc.jpg" alt="营业执照">
                                    <span class="iconfont icon-search js-showImg"></span>

                                </div>
                                <div class="img-warp">
                                    <img src="/static/admin/images/abc.jpg" alt="营业执照">
                                    <span class="iconfont icon-search js-showImg"></span>

                                </div>
                            </div>


                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">联系方式：</label>
                            <div class="col-md-10">
                                <p class="form-control-static">021-45669939</p>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">收货地址：</label>
                            <div class="col-md-10">
                                <p class="form-control-static">江西省上饶市万年县江西省上饶市万年县江西省上饶市万年县</p>
                            </div>

                        </div> -->
                    </div>
                </div>
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h3 class="panel-title">交易记录</h3>
                    </div>
                    <div class="panel-body form-horizontal js-transaction-record">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered dataTable my-table-bordered transaction-table" width="100%">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>订单号</th>
                                        <th>类别</th>
                                        <th>金额</th>
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

        <!-- 弹框模板 -->
        <script type="x-handlebars-template" id="base-info-tmpl">

            <div class="form-group data-title">
                <label class="col-md-2 control-label">账号：</label>
                <div class="col-md-10">
                    <p><code>{{userName}}</code>






                        {{#compare isApprove 1}}
                        <button class="btn btn-info">已认证</button>
                        {{else}}
                        <button class="btn btn-default">未认证</button>
                        {{/compare}}
                        {{#compare isCashdeposit 1}}
                        <button class="btn btn-info">已交保证金</button>
                        {{else}}
                        <button class="btn btn-default">未交保证金</button>
                        {{/compare}}
                        <i class="fa fa-star">{{userGrade}}</i>

                    </p>
                </div>



            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">手机号：</label>
                <div class="col-md-4">
                    <p class="form-control-static">{{phoneNumber}}</p>
                </div>
                <label class="col-md-2 control-label">oepenId：</label>
                <div class="col-md-4">
                    <p class="form-control-static">{{openId}}</p>
                </div>

            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">店名：</label>
                <div class="col-md-4">
                    <p class="form-control-static">{{storeName}}</p>
                </div>
                <label class="col-md-2 control-label">门店类别：</label>
                <div class="col-md-4">
                    <p class="form-control-static">
                        {{classify}}
                    </p>
                </div>

            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">真实姓名：</label>
                <div class="col-md-4">
                    <p class="form-control-static">{{realName}}</p>
                </div>
                <label class="col-md-2 control-label">身份证号：</label>
                <div class="col-md-4">
                    <p class="form-control-static">{{idCard}}</p>
                </div>

            </div>

            <div class="form-group">
                <label class="col-md-2 control-label">营业执照名称：</label>
                <div class="col-md-4">
                    <p class="form-control-static">{{businessLicenseName}}</p>
                </div>
                <label class="col-md-2 control-label">身份证正反面：</label>
                <div class="col-md-4">
                    <div class="img-warp">
                        <img src="{{idCardfront}}" alt="身份证正面">
                        <span class="iconfont icon-search js-showImg"></span>

                    </div>
                    <div class="img-warp">
                        <img src="{{idCardreverse}}" alt="身份证反面">
                        <span class="iconfont icon-search js-showImg"></span>

                    </div>
                </div>


            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">营业执照照片：</label>
                <div class="col-md-4">
                    <div class="img-warp">
                        <img src="{{businessLicense}}" alt="营业执照">
                        <span class="iconfont icon-search js-showImg"></span>

                    </div>
                </div>
                <label class="col-md-2 control-label">门店照片：</label>
                <div class="col-md-4">
                    <div class="img-warp">
                        <img src="{{storefront}}" alt="门店照片">
                        <span class="iconfont icon-search js-showImg"></span>

                    </div>

                </div>


            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">联系方式：</label>
                <div class="col-md-10">
                    <p class="form-control-static">{{contactWay}}</p>
                </div>

            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">收货地址：</label>
                <div class="col-md-10">
                    <p class="form-control-static">{{expressAddress}}</p>
                </div>

            </div>

        </script>
    <!-- 弹框模板 -->
    <script type="x-handlebars-template" id="dialog-tmpl">
        <div class="my-dialog-left"><em class="my-dialog-icon icon-bounce"></em></div>
        <div class="my-dialog-right">
            <p class="my-dialog-strong">你确定要给  {{userName}}<span class="my-dialog-red">{{text}}</span>？</p>

        </div>
    </script>

    <script>
    var config = {
    	showDetailsUrl: '/admin/details'//获取用户详情
    }
    </script>
    <script src="/view/static/admin/js/commercialtenant/details.js"></script>
</body>
</html>