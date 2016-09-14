package com.qiangbang.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jfinal.aop.Before;
import com.jfinal.aop.Clear;
import com.jfinal.aop.Duang;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.qiangbang.common.Constants;
import com.qiangbang.entity.Admin;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.Category;
import com.qiangbang.entity.Users;
import com.qiangbang.interceptor.AdminInterceptor;
import com.qiangbang.service.CategoryService;
import com.qiangbang.service.OrderService;
import com.qiangbang.utils.JsonUtil;
import com.qiangbang.utils.QbPage;
import com.qiangbang.utils.Utility;

/**
  * @ClassName: CategoryController 
  * @Description: 后台管理控制器--分类 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
@Before(AdminInterceptor.class)
public class CategoryController extends BaseController{
	public void index(){
		List<Category> categoies = Category.me.findAllCategorys();
		List<Category> onelevels = new ArrayList<Category>();
		for (Category category : categoies) {
			if(category.getInt("level")==0){
				onelevels.add(category);
			}
		}
		List<Category> categoryList = new ArrayList<Category>();
		for (Category category : onelevels) {
			categoryList.add(category);
			//List<Category> twolevels = new ArrayList<Category>();
			for (Category cate : categoies) {
				if(cate.getInt("parentId")==category.getInt("id")){
					categoryList.add(cate);
				}
				//category.set("childrens", twolevels);
			}
		}
		setAttr("categoies", categoryList);
		render("index.jsp");
	}
	
	public void edit(){
		CategoryService categoryService = Duang.duang(CategoryService.class);
		setAttr("categoies", categoryService.getOrderCategory());
		setAttr("category", Category.me.findById(getParaToInt()));
	}
	
	public void update(){
		Category category = getModel(Category.class);
//		String parentIdStr = getPara("parentId");
//		int parentId = empty(parentIdStr)?0:Integer.valueOf(parentIdStr);
		if(category.getInt("level")==0){
			category.set("parentId", 0);
		}
		category.update();
		Constants.refreshCategories();
		redirect("/category/index");
	}
	
	public void add(){
		CategoryService categoryService = Duang.duang(CategoryService.class);
		setAttr("categoies", categoryService.getOrderCategory());
	}
	
	public void save(){
		Category category = getModel(Category.class);
		if(category.getInt("parentId")==0){
			category.set("level", 0);
		} else {
			category.set("level", 1);
		}
		category.set("ctime", new Date());
//		String parentIdStr = getPara("parentId");
//		int parentId = empty(parentIdStr)?0:Integer.valueOf(parentIdStr);
//		category.set("parentId", parentId);
		category.save();
		Constants.refreshCategories();
		redirect("/category/index");
	}
	
	public void delete(){
		int id = getParaToInt();
		List<Category> categorys = Category.me.findCategoryByPid(id);
		for (Category category : categorys) {
			Category.me.deleteById(category.getInt("id"));
		}
		Category.me.deleteById(id);
		Constants.refreshCategories();
		redirect("/category/index");
	}
	
	@Clear
	public void getWapCategory(){
		HashMap<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("success", true);
		dataMap.put("code", 0);
		List<Category> categorys = Category.me.findWapCategorys();
		List<String> childrens = new ArrayList<String>();
		for (Category category : categorys) {
			category.put("children", childrens);
		}
		dataMap.put("data", categorys);
		renderJson(dataMap);
		
	}
   
}
