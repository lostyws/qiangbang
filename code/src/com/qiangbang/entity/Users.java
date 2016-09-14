
package com.qiangbang.entity;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

@SuppressWarnings("serial")
public class Users extends Model<Users>{
    public static final Users me = new Users();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<Users> paginate(int pageNumber, int pageSize,String username){
    	String selectSql = "select id,IFNULL(nickname,'') as userName,mobile phoneNumber,idcard as idCard,region,ctime registrationTime,case status when 1 then 2 when 0 then 1 when 2 then 1 end as isCloseShop,status as isOpenShop,price,0 as isApprove,0 as isCashdeposit ";
    	
    	String sql = "from users where utype=1 ";
    	if(!"".equals(username)){
    		sql += " and (nickname like '%"+username+"%' or mobile like '%"+username+"%') ";
    	}
    	sql += "order by id desc";
    	
        return paginate(pageNumber, pageSize, selectSql, sql);
    }

    public Users findUserByMobile(String mobile){
        return Users.me.findFirst("select * from users where mobile = ?", mobile);
    }
    
    public Users findUserByMobileAndType(String mobile,int type){
        return Users.me.findFirst("select * from users where mobile = ? and utype = ?", mobile,type);
    }
    
    public Users findUserByWxOpenId(String wxopenId){
        return Users.me.findFirst("select * from users where wxopenId = ?", wxopenId);
    }
}
