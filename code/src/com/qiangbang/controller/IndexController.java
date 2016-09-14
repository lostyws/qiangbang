package com.qiangbang.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jfinal.plugin.activerecord.Page;
import com.qiangbang.common.Constants;
import com.qiangbang.entity.Admin;
import com.qiangbang.entity.Users;
import com.qiangbang.utils.JsonUtil;
import com.qiangbang.utils.QbPage;
import com.qiangbang.utils.Utility;

/**
  * @ClassName: IndexController 
  * @Description: 后台管理首页控制器 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
public class IndexController extends BaseController{
    public void login(){
        render("login.jsp");
    }
    /**
     * @Title: login 
     * @Description: TODO  
     * @return void  
     * @throws
    */
   public void index(){
   	String username = getPara("username");
   	String password = getPara("password");
       if (empty(username)){
           String message = "用户名不能为空";
           setAttr("message", message);
           render("login.jsp");
           return;
       }
       if (empty(password)){
           String message = "密码不能为空";
           setAttr("username", username);
           setAttr("message", message);
           render("login.jsp");
           return;
       }
       Admin oldAdmin = new Admin();
       oldAdmin =Admin.me.findAdminByUserName(username);
       if (empty(oldAdmin)){
           String message = "不存在该用户";
           setAttr("username", username);
           setAttr("message", message);
           render("login.jsp");
           return;
       }
       if (!Utility.MD5(password).equals(oldAdmin.getStr("password"))){
           String message = "用户或密码错误";
           setAttr("username", username);
           setAttr("message", message);
           render("login.jsp");
           return;
       }
       if (oldAdmin.getInt("status") == 1){
           String message = "您的账号已被冻结，请联系管理员解封";
           setAttr("username", username);
           setAttr("message", message);
           render("login.jsp");
           return;
       }
       getSession().setAttribute(Constants.LOGINADMIN, oldAdmin);
       renderJsp("index.jsp");

   }
   
   public void logout(){
       if (getSession().getAttribute(Constants.LOGINADMIN) != null){
           // 暂时存放的是字符串，真实项目中应该是登陆用户的Admin实体类
           removeSessionAttr(Constants.LOGINADMIN);
           renderJsp("login.jsp");
           return;
       } else {
    	   renderJsp("login.jsp");
           return;
       }

   }

   public void logoutside(){
       if (getSession().getAttribute(Constants.LOGINADMIN) != null) {
           // 暂时存放的是字符串，真实项目中应该是登陆用户的User实体类
           removeSessionAttr(Constants.LOGINADMIN);
           redirect("/index");
           return;
       }else{
           redirect("/index");
           return;
       }
   }
}
