package com.qiangbang.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.qiangbang.common.Constants;
import com.qiangbang.entity.Category;
import com.qiangbang.vo.CategoryVo;

/**
  * @ClassName: CategoryService 
  * @Description: TODO 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月21日 下午4:09:30 
  *
 */
public class CategoryService {
	public List<Category> getOrderCategory(){
		List<Category> categoies = Constants.loadCategories();
		List<Category> onelevels = new ArrayList<Category>();
		for (Category category : categoies) {
			if(category.getInt("level")==0){
				onelevels.add(category);
			}
		}
		List<Category> categoryList = new ArrayList<Category>();
		for (Category category : onelevels) {
			categoryList.add(category);
			for (Category cate : categoies) {
				if(cate.getInt("parentId")==category.getInt("id")){
					categoryList.add(cate);
				}
			}
		}
		return categoryList;
	}
	
	/**
	  * @Title: getWapSearchCategory 
	  * @Description: 微信端分类  
	  * @return List<Category>  
	  * @throws
	 */
	public Map getWapSearchCategory(){
		List<Category> categoies = new ArrayList<Category>();
		categoies.addAll(Constants.loadCategories());
		List<Category> onelevels = new ArrayList<Category>();
		for (Category category : categoies) {
			if(category.getInt("level")==0){
				onelevels.add(category);
			}
		}
		categoies.removeAll(onelevels);
		Map<String, List<Category>> categroyMap = new HashMap<String, List<Category>>();
		categroyMap.put("parents", onelevels);
		categroyMap.put("childs", categoies);
		return categroyMap;
	}
	
	/**
	 * 根据父类别分组
	  * @Title: getBusinessCategory 
	  * @Description: TODO  
	  * @return List<CategoryVo>  
	  * @throws
	 */
	public List<CategoryVo> getBusinessCategory(){
		List<Category> categoies = Constants.loadCategories();
		List<CategoryVo> onelevels = new ArrayList<CategoryVo>();
		for (Category category : categoies) {
			if(category.getInt("level")==0){
				CategoryVo cateVo = new CategoryVo(category.getInt("id"), category.getStr("categoryname"));
				onelevels.add(cateVo);
			}
		}
		List<Category> categoryList = new ArrayList<Category>();
		for (CategoryVo cvo : onelevels) {
			for (Category cate : categoies) {
				if(cate.getInt("parentId")==cvo.getId()){
					cvo.addCategory(cate);
				}
			}
		}
		return onelevels;
	}
}
