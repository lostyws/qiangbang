
package com.qiangbang.entity;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

@SuppressWarnings("serial")
public class Category extends Model<Category>{
    public static final Category me = new Category();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<Category> paginate(int pageNumber, int pageSize){
        return paginate(pageNumber, pageSize, "select *",
                "from category order by corder desc");
    }

    public List<Category> findAllCategorys(){
        return Category.me.find("select * from category order by corder desc");
    }
    
    public List<Category> findWapCategorys(){
        return Category.me.find("SELECT id,parentId,categoryname name,minmoney,level,'' AS cndir,'' AS ishow,'' AS sort FROM category where parentId>0 order by corder desc");
    }
    
    public List<Category> findCategoryByPid(int pid){
        return Category.me.find("select * from category where parentId=? order by corder desc",pid);
    }
}
