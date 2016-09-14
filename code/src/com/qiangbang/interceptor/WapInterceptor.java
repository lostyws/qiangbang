
package com.qiangbang.interceptor;

import javax.servlet.http.HttpSession;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import com.qiangbang.common.Constants;
import com.qiangbang.entity.Admin;
import com.qiangbang.entity.Users;
import com.qiangbang.utils.Utility;

/**
  * @ClassName: WapInterceptor 
  * @Description: 微信登录过滤器 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午4:03:18 
 */
public class WapInterceptor implements Interceptor{

    @Override
    public void intercept(Invocation inv){
    	System.out.println("wap interceptor...");
    	inv.invoke();
    	
        Controller controller = inv.getController();
        HttpSession session = controller.getSession();
        Users u = (Users) session.getAttribute("users");
        if(!Utility.empty(u)){
            inv.invoke();
        }else{
            String message = "请先登录再进行操作！";
            controller.setAttr("message", message);
            String redirectionUrl = controller.getRequest().getContextPath()
                    + "/";
            controller.setAttr("redirectionUrl", redirectionUrl);
            controller.renderJsp("/WEB-INF/content/common/result.jsp");
        }
    }
}
