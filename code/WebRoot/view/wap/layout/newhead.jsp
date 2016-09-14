<%--
  Created by IntelliJ IDEA.
  User: yws
  Date: 16/5/22
  Time: 下午11:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<head>
    <meta charset="utf-8">

	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="format-detection" content="telephone=no">
    <title>抢帮</title>
    
    
    <meta name="wap-font-scale"  content="no"/>
</head>	

<!-- <link rel="stylesheet" type="text/css" href="/view/staticwap/css/basic.css"/> -->
<link rel="stylesheet" type="text/css" href="/view/staticwap/framework7/css/framework7.ios.css"/>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/framework7-qb-theme.css"/>
<script type="text/javascript">
    var packageJson = {
    	userId: "${sessionScope.users.id}",//用户ID
    	isNews: 1,//是否有未读消息（1是，0否，未登录为空）
    	subscribe: "${sessionScope.Subscribe}",//是否关注公众号，返回状态四种状态（'true','false','',1）,值为1的情况代表页面已弹窗
    	checkuser: false,
    	
    	IMG_STATICURL: '',//上传后图片域名
    	openId: '${sessionScope.openid}',//空或者字符串
    	
    }
    </script>
    
    <script async="" src="//www.google-analytics.com/analytics.js"></script>
    <script type="text/javascript">try {
		window.AG_onLoad = function(func) { if (window.addEventListener) { window.addEventListener('DOMContentLoaded', func); } };
		window.AG_removeElementById = function(id) { var element = document.getElementById(id); if (element && element.parentNode) { element.parentNode.removeChild(element); }};
		window.AG_removeElementBySelector = function(selector) { if (!document.querySelectorAll) { return; } var nodes = document.querySelectorAll(selector); if (nodes) { for (var i = 0; i < nodes.length; i++) { if (nodes[i] && nodes[i].parentNode) { nodes[i].parentNode.removeChild(nodes[i]); } } } };
		window.AG_each = function(selector, fn) { if (!document.querySelectorAll) return; var elements = document.querySelectorAll(selector); for (var i = 0; i < elements.length; i++) { fn(elements[i]); }; };
		var AG_removeParent = function(el, fn) { while (el && el.parentNode) { if (fn(el)) { el.parentNode.removeChild(el); return; } el = el.parentNode; } };
		} catch (ex) { console.error('Error executing AG js: ' + ex); }
	</script>
   
