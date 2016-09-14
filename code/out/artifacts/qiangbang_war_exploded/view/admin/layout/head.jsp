<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 <head>
 	 <%
		response.setHeader("Expires", "Sat, 6 May 1995 12:00:00 GMT"); 
		response.setHeader("Pragma","No-cache");
		//response.setHeader("Cache-Control","no-cache,no-store");
		
		String path = request.getContextPath();
		String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
		request.setAttribute("basePath", basePath);
		request.setAttribute("domain", basePath);
	%>
    <meta charset="UTF-8">
    <title><c:out value="${title}" /></title>
    <!-- Styles -->
    <link href="${domain}/view/static/plugins/pace-master/themes/blue/pace-theme-flash.css" rel="stylesheet">
    <link href="${domain}/view/static/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="${domain}/view/static/plugins/fontawesome/css/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="${domain}/view/static/plugins/line-icons/simple-line-icons.css" rel="stylesheet">
    <!-- Theme Styles -->
    <link href="${domain}/view/static/public/css/modern.min.css" rel="stylesheet" type="text/css">
    <link href="${domain}/view/static/public/css/green.css" class="theme-color" rel="stylesheet" type="text/css">
    <!-- Common Style -->
    <link href="${domain}/view/static/admin/css/common/common.css" rel="stylesheet" type="text/css">
    <!-- Scripts -->
    <script src="${domain}/view/static/plugins/jquery/jquery-2.1.4.min.js"></script>
    <script src="${domain}/view/static/plugins/bootstrap/js/bootstrap.min.js"></script>
    <!-- Global Script-->
    <script src="${domain}/view/static/public/js/global.js"></script>
    <!--<![endif]-->
</head>