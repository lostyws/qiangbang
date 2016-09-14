
package com.qiangbang.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletRequest;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import com.jfinal.core.Controller;
import com.qiangbang.utils.Utility;


/**
 * @ClassName: BaseController 
 * @Description: 控制器父类 
 * @author leroy(32504251@qq.com) 
 * @date 2016年5月14日 下午3:13:33 
 */
public class BaseController extends Controller{
    protected String message = "";

    protected String redirectionUrl = "";

    protected String UUID(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
    
    protected boolean empty(Object o){
        return Utility.empty(o);
    }

    /**
     * 获得当前Request真实的IP地址
     */
    protected String getIpAddress(){
        HttpServletRequest request = getRequest();

        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    /**
     * 获得未被XSS过滤器处理过的原始参数值
     */
    protected String getOriginalParameter(String name){
        HttpServletRequest request = getRequest();
        ServletRequest r = request;
        while (r instanceof HttpServletRequestWrapper)
        {
            r = ((HttpServletRequestWrapper) r).getRequest();
        }
        return r.getParameter(name);
    }

    /**
     * 按照名称获得Cookie中存储的值
     */
    protected String getCookieValue(String name){
        HttpServletRequest request = getRequest();
        Cookie[] cookies = request.getCookies();
        String value = null;
        if (cookies != null) {
            for (Cookie cookie : cookies)
            {
                if (name.equals(cookie.getName()))
                {
                    value = cookie.getValue();
                    break;
                }
            }
        }
        return value;
    }

    /**
     * 判断当前访问设备是否是手机
     */
    protected boolean isPhone(){
        HttpServletRequest request = getRequest();
        String agent = request.getHeader("user-agent");
        if (agent != null)
        {
            agent = agent.toLowerCase();
            return agent.indexOf("iphone") != -1
                    || agent.indexOf("android") != -1;
        }
        else
            return false;
    }
    
    /**
     * 成功
     */
    protected void renderSuccess(){
    	Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", 0);
		result.put("msg", "操作成功");
		renderJson(result);
    }
    
    /**
     * 成功
     */
    protected void renderSuccess(String msg){
    	Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", 0);
		result.put("msg", msg);
		renderJson(result);
    }
    
    /**
     * 失败
     */
    protected void renderFaild(String msg){
    	Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", -1);
		result.put("msg", msg);
		renderJson(result);
    }
    
    /**
     * 失败
     */
    protected void renderFaild(int status,String msg){
    	Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", status);
		result.put("msg", msg);
		renderJson(result);
    }
    
    
    /**
     * 成功
     */
    protected void renderWapSuccess(){
    	Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		result.put("data", "操作成功");
		renderJson(result);
    }
    
    /**
     * 成功
     */
    protected void renderWapSuccess(String msg){
    	Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		result.put("data", msg);
		renderJson(result);
    }
    
    /**
     * 成功
     */
    protected void renderWapSuccess(Object msg){
    	Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		result.put("data", msg);
		renderJson(result);
    }
    
    
    /**
     * 成功
     */
    protected void renderWapFaild(String code,Object msg){
    	Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", false);
		result.put("code", code);
		result.put("data", msg);
		renderJson(result);
    }
    
    /**
     * 成功
     */
    protected void renderWapFaild(String msg){
    	Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", false);
		result.put("data", msg);
		renderJson(result);
    }

}
