
package com.qiangbang.entity;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

@SuppressWarnings("serial")
public class Business extends Model<Business>{
    public static final Business me = new Business();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<Business> paginate(int pageNumber, int pageSize, int type,String username){
    	String selectSql = "select a.id,IFNULL(nickname,'') as userName,mobile phoneNumber,idcard AS idCard,region,a.ctime registrationTime,"
    			+ "case a.status when 1 then 2 when 0 then 1 when 2 then 1 end AS isCloseShop,a.status AS isOpenShop,isauth AS isApprove,isbond isCashdeposit,case b.status when 0 then 2 else 1 end as isBusiness,"
    			+ "b.catename classify,a.price,b.bondmoney,shopname shopName ";
    	String sql = "from users a left join business b on a.id=b.uid where a.utype='"+type+"'";
    	if(!"".equals(username)){
    		sql += " and (nickname like '%"+username+"%' or mobile like '%"+username+"%' or b.shopname like '%"+username+"%') ";
    	}
    	sql += " order by id desc";		
        return paginate(pageNumber, pageSize, selectSql,sql);
    }
    
    //SELECT b.id,username userName,mobile phoneNumber,idcard AS idCard,region,ctime registrationTime,1 AS isCloseShop,1 AS isOpenShop,1 AS isApprove,1 AS isCashdeposit,c.categoryName,shipname shopName FROM business b LEFT JOIN category c ON b.`category`=c.`id`

    public Business findByUid(int uid){
        return Business.me.findFirst("select * from business where uid = ?", uid);
    }
    
    public Business findUserInfoByUid(int uid){
        return Business.me.findFirst("select b.*,u.mobile from business b left join users u on b.uid=u.id where uid = ?", uid);
    }
}
