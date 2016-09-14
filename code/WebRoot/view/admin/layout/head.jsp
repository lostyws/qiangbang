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
    <link href="${domain}/view/static/admin/base.css" rel="stylesheet">


    <script src="${domain}/view/static/admin/plugins/jquery/jquery-2.1.4.min.js"></script>
    <script src="${domain}/view/static/admin/base.js"></script>

    <!--<![endif]-->
</head>