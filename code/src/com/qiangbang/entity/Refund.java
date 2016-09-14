package com.qiangbang.entity;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

@SuppressWarnings("serial")
public class Refund extends Model<Refund>{
    public static final Refund me = new Refund();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<Refund> paginate(int pageNumber, int pageSize ,String orderNumber){
    	String sql = " from refund order by status";
    	if(!"".equals(orderNumber)&&orderNumber!=null){
    		sql = " from refund where orderNumber like '%"+orderNumber+"%'  order by status";
    	}
        return paginate(pageNumber, pageSize, "SELECT id,orderNumber,userName,userId,money AS transactionAmount,ctime AS releaseTime,case type when 1 then '关闭需求' when 2 then '申请退款' when 4 then '用户提现' end as type,CASE STATUS WHEN 2 THEN 0 ELSE 1 END AS isaudit",
        		sql);
    }
}
