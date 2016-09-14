<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
   <head>
        <!-- Title -->
        <title>抢帮 | 登陆 - Sign in</title>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <meta charset="UTF-8">
        <meta name="description" content="Admin Dashboard Template" />
        <meta name="keywords" content="admin,dashboard" />
        <meta name="author" content="Steelcoders" />

        <!-- Styles -->
  
        <link href="/view/static/admin/base.css" rel="stylesheet">


        <script src="/view/static/admin/plugins/jquery/jquery-2.1.4.min.js"></script>
        <script src="/view/static/admin/base.js"></script>


        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

    </head>
    <style type="text/css">
        .login-box {
            border: none;
            background-color: transparent;
        }
        .login-box .logo-name {
            font-size: 32px;
        }
    </style>
    <body class="page-login">
        <main class="page-content">
            <div class="page-inner">
                <div id="main-wrapper">
                    <div class="row">
                        <div class="col-md-6 center">
                            <div class="login-box">
                                <a href="index.html" class="logo-name text-lg text-center">抢帮管理后台</a>
                                <p class="text-center m-t-md">Please login into your account.</p>
                                <form class="m-t-md" action="/index" method="post">
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="username" value="${username }" placeholder="用户名" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" name="password"  placeholder="Password" required>
                                    </div>
                                    <button type="submit" class="btn btn-success btn-block">登陆</button>
                                    <div style="color:red;">${message }</div>
                                </form>
                                <p class="text-center m-t-xs text-sm">2016 &copy; 抢帮网 </p>
                            </div>
                        </div>
                    </div><!-- Row -->
                </div><!-- Main Wrapper -->
            </div><!-- Page Inner -->
        </main><!-- Page Content -->


        <!-- Javascripts -->
        

    </body>
</html>