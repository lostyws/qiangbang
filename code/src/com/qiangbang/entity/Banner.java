
package com.qiangbang.entity;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

@SuppressWarnings("serial")
public class Banner extends Model<Banner>{
    public static final Banner me = new Banner();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<Banner> paginate(int pageNumber, int pageSize){
        return paginate(pageNumber, pageSize, "select *",
                "from banner order by id asc");
    }

    public List<Banner> findAllBanner(){
        return Banner.me.find("select * from banner");
    }
}
