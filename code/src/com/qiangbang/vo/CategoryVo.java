package com.qiangbang.vo;

import java.util.ArrayList;
import java.util.List;

import com.jfinal.plugin.activerecord.Record;
import com.qiangbang.entity.Category;

public class CategoryVo {
	private int id;
	private String cateName;
	private List<Category> categorys = new ArrayList<Category>();//wap使用
	private List<Record> cateRecords = new ArrayList<Record>();//后台使用
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCateName() {
		return cateName;
	}
	public void setCateName(String cateName) {
		this.cateName = cateName;
	}
	
	public List<Category> getCategorys() {
		return categorys;
	}
	public void setCategorys(List<Category> categorys) {
		this.categorys = categorys;
	}
	public void addCategory(Category category){
		this.categorys.add(category);
	}
	
	public List<Record> getCateRecords() {
		return cateRecords;
	}
	public void setCateRecords(List<Record> cateRecords) {
		this.cateRecords = cateRecords;
	}
	
	public void addCateRecord(Record record){
		this.cateRecords.add(record);
	}
	
	public CategoryVo(int id, String cateName) {
		super();
		this.id = id;
		this.cateName = cateName;
	}
}
