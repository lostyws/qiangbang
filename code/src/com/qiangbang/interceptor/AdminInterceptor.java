
package com.qiangbang.interceptor;

import javax.servlet.http.HttpSession;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import com.qiangbang.common.Constants;
import com.qiangbang.entity.Admin;
import com.qiangbang.utils.Utility;

/**
  * @ClassName: AdminInterceptor 
  * @Description: 后台管理员登录过滤器 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午4:03:18 
 */
public class AdminInterceptor implements Interceptor{

    @Override
    public void intercept(Invocation inv){
    	System.out.println("admin interceptor...");
    	
        Controller controller = inv.getController();
        HttpSession session = controller.getSession();
        Admin u = (Admin) session.getAttribute(Constants.LOGINADMIN);
        if(!Utility.empty(u)){
            inv.invoke();
        }else{
            String message = "请先登录再进行操作！";
            controller.setAttr("message", message);
            String redirectionUrl = controller.getRequest().getContextPath()
                    + "/";
            controller.setAttr("redirectionUrl", redirectionUrl);
            controller.redirect("/login");
        }
    }
}
