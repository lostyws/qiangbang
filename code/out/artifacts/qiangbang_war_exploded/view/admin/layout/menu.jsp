<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <div class="page-sidebar sidebar">
     <div class="page-sidebar-inner slimscroll" style="overflow: hidden; width: auto; height: 100%;">
         <ul class="menu accordion-menu">
              <li>
                 <a href="/category/index" class="waves-effect waves-button" parent="category">
                     <span class="menu-icon glyphicon glyphicon-th-list"></span>
                     <p>分类管理</p>
                 </a>
             </li>
             <li >
                 <a href="/admin/index" class="waves-effect waves-button" parent="admin">
                     <span class="menu-icon glyphicon glyphicon-tags"></span>
                     <p>客户管理</p>
                 </a>
             </li>
             <li >
                 <a href="/order/index" class="waves-effect waves-button" parent="order">
                     <span class="menu-icon glyphicon glyphicon-list-alt"></span>
                     <p>订单管理</p>
                 </a>
             </li>
             <li>
                 <a href="/account/index" class="waves-effect waves-button" parent="account">
                     <span class="menu-icon glyphicon glyphicon-briefcase"></span>
                     <p>账户明细</p>
                 </a>
             </li>
         </ul>
     </div>
 </div>
 <script type="text/javascript">
 $(function() {
     var url = window.location.href;
     url = url.replace("http://", "");
     if (url.indexOf("?") > 1) {
         url = url.substr(0, url.indexOf("?"))
     }
     url = url.substring(url.indexOf("/"), url.length);
     var len =url.split('/').length;
     url = url.split('/')[len-2];
     $(".accordion-menu li a").each(function() {
         if (url == $(this).attr("parent")) {
             $(this).parents(".sub-menu").show();
             $(this).parents(".droplink").addClass("open");
             $(this).parent().addClass("active");
         }
     })
 })
 </script>