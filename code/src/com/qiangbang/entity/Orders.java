
package com.qiangbang.entity;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

@SuppressWarnings("serial")
public class Orders extends Model<Orders>{
    public static final Orders me = new Orders();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<Record> paginate(int pageNumber, int pageSize,String orderNumber,int status){
    	String selectSql ="select orderid as id,orderid orderNumber,buyerId,buyerName,price as transactionAmount,ifnull(sellerName,'') as sellerName,sellerId,status,"
    			+ "ctime releaseTime,1 as isStop,1 as isDelete,1 as isAffirmFinish ";
    	
    	String sql = "from orders ";
    	boolean haswhere = false;
    	if(!"".equals(orderNumber)){
    		haswhere = true;
    		sql += " where orderid like '%"+orderNumber+"%' ";
    	}
    	if(status>0){
    		if(status==2||status==3){
    			sql += haswhere?" and status = "+status :" where status = "+status;
    		} else {
    			sql += haswhere?" and status not in (2,3)":" where status not in (2,3)";
    		}
    	}
    	sql += " order by id desc";				
        return Db.paginate(pageNumber, pageSize, selectSql, sql);
    }

    public Orders findByOrderId(int orderId){
        return Orders.me.findFirst("select * from orders where orderid = ?", orderId);
    }
    
    public Orders findByOrderIdAndSellId(int orderId,int sellId){
        return Orders.me.findFirst("select * from orders where orderid = ? and sellerId = ?", orderId,sellId);
    }
    
    public Orders findAdminByUserName(String username){
        return Orders.me.findFirst("select * from admin where username = ?", username);
    }
}
