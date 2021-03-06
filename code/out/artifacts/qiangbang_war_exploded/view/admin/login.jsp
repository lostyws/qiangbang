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
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600' rel='stylesheet' type='text/css'>
        <link href="/view/static/plugins/pace-master/themes/blue/pace-theme-flash.css" rel="stylesheet"/>
        <link href="/view/static/plugins/uniform/css/uniform.default.min.css" rel="stylesheet"/>
        <link href="/view/static/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="/view/static/plugins/fontawesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
        <link href="/view/static/plugins/line-icons/simple-line-icons.css" rel="stylesheet" type="text/css"/>	
        <link href="/view/static/plugins/offcanvasmenueffects/css/menu_cornerbox.css" rel="stylesheet" type="text/css"/>	
        <link href="/view/static/plugins/waves/waves.min.css" rel="stylesheet" type="text/css"/>	
        <link href="/view/static/plugins/switchery/switchery.min.css" rel="stylesheet" type="text/css"/>
        <link href="/view/static/plugins/3d-bold-navigation/css/style.css" rel="stylesheet" type="text/css"/>	
        
        <!-- Theme Styles -->
        <link href="/view/static/public/css/modern.css" rel="stylesheet" type="text/css"/>
        <link href="/view/static/public/css/themes/green.css" class="theme-color" rel="stylesheet" type="text/css"/>
        <link href="/view/static/public/css/custom.css" rel="stylesheet" type="text/css"/>
        
        <script src="/view/static/plugins/3d-bold-navigation/js/modernizr.js"></script>
        <script src="/view/static/plugins/offcanvasmenueffects/js/snap.svg-min.js"></script>
        
        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        
    </head>
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
                                        <input type="text" class="form-control" name="username" value="leroy" placeholder="用户名" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" name="password" value="123456" placeholder="Password" required>
                                    </div>
                                    <button type="submit" class="btn btn-success btn-block">登陆</button>
                                    
                                </form>
                                <p class="text-center m-t-xs text-sm">2016 &copy; 抢帮网 by 南昌微越.</p>
                            </div>
                        </div>
                    </div><!-- Row -->
                </div><!-- Main Wrapper -->
            </div><!-- Page Inner -->
        </main><!-- Page Content -->
	

        <!-- Javascripts -->
        <script src="/view/static/plugins/jquery/jquery-2.1.4.min.js"></script>
        <script src="/view/static/plugins/jquery-ui/jquery-ui.min.js"></script>
        <script src="/view/static/plugins/pace-master/pace.min.js"></script>
        <script src="/view/static/plugins/jquery-blockui/jquery.blockui.js"></script>
        <script src="/view/static/plugins/bootstrap/js/bootstrap.min.js"></script>
        <script src="/view/static/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>
        <script src="/view/static/plugins/switchery/switchery.min.js"></script>
        <script src="/view/static/plugins/uniform/jquery.uniform.min.js"></script>
        <script src="/view/static/plugins/offcanvasmenueffects/js/classie.js"></script>
        <script src="/view/static/plugins/waves/waves.min.js"></script>
        <script src="/view/static/public/js/modern.min.js"></script>
        
    </body>
</html>