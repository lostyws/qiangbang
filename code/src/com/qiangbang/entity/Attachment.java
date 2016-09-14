package com.qiangbang.entity;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

@SuppressWarnings("serial")
public class Attachment extends Model<Attachment>{
    public static final Attachment me = new Attachment();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<Attachment> paginate(int pageNumber, int pageSize){
        return paginate(pageNumber, pageSize, "select *",
                "from attachment order by id desc");
    }

    public Attachment findByUidAndType(int uid,int filetype){
        return Attachment.me.findFirst("select * from attachment where uid = ? and filetype=? and status>-1", uid,filetype);
    }
    
    public List<Attachment> findAttachmentByUid(int uid){
        return Attachment.me.find("select id,filetype from attachment where uid = ? and  status>-1", uid);
    }
}
