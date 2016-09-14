package com.qiangbang.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jfinal.aop.Before;
import com.jfinal.aop.Duang;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.qiangbang.common.Constants;
import com.qiangbang.entity.Admin;
import com.qiangbang.entity.Attachment;
import com.qiangbang.entity.Banner;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.Orders;
import com.qiangbang.entity.Tradedetail;
import com.qiangbang.entity.Users;
import com.qiangbang.interceptor.AdminInterceptor;
import com.qiangbang.service.OrderService;
import com.qiangbang.service.UserService;
import com.qiangbang.utils.JsonUtil;
import com.qiangbang.utils.QbPage;
import com.qiangbang.utils.Utility;

/**
  * @ClassName: OrderController 
  * @Description: 后台管理控制器--banner管理 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
@Before(AdminInterceptor.class)
public class BannerController extends BaseController{
	public void index(){
		List<Banner> bannerList = Banner.me.findAllBanner();
		setAttr("banners", bannerList);
		render("index.jsp");
	}
	
	public void goAdd(){
		render("add.jsp");
	}
	
	public void goEdit(){
		int bannerId = getParaToInt();
		Banner banner = Banner.me.findById(bannerId);
		setAttr("banner", banner);
		render("edit.jsp");
	}
	
    public void update(){
    	int bannerId = getParaToInt("bannerid");
    	String title = getPara("title");
    	String url = getPara("adv_url");
    	String path = getPara("content");
    	Integer order = getParaToInt("order");
    	Banner banner = Banner.me.findById(bannerId);
    	if(banner!=null){
        	banner.set("title", title);
        	banner.set("href", url);
        	if(order!=null){
        		banner.set("border", order);
        	} else {
        		banner.set("border", 0);
        	}
        	if(!empty(path)){
        		banner.set("path", path);
        	}
        	banner.update();
    	}
    	renderSuccess();
    }
    
    public void add(){
    	String title = getPara("title");
    	String url = getPara("adv_url");
    	String path = getPara("content");
    	Integer order = getParaToInt("order");
    	Banner banner = new Banner();
    	banner.set("title", title);
    	banner.set("href", url);
    	if(order!=null){
    		banner.set("border", order);
    	} else {
    		banner.set("border", 0);
    	}
    	banner.set("path", path);
    	banner.set("ctime", new Date());
    	banner.save();
    	renderSuccess();
    }
    
    public void delete(){
    	int bannerId = getParaToInt();
    	Banner banner = Banner.me.findById(bannerId);
    	if(banner!=null){
    		String path = banner.getStr("path");
    		if(!empty(path)){
    			String aid = path.substring(path.lastIndexOf("=")+1);
    			Attachment attachment = Attachment.me.findById(aid);
    			if(attachment!=null){
    				attachment.set("status", -1);
    				attachment.update();
                	File oldfile = new File(attachment.getStr("path"));
                	oldfile.delete();
    			}
    		}
    		banner.delete();
    	}
    	renderSuccess("/banner/index");
    }
	
   
}
