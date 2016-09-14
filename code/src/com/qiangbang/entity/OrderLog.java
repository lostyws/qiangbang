
package com.qiangbang.entity;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.qiangbang.utils.CommonUtils;

@SuppressWarnings("serial")
public class OrderLog extends Model<OrderLog>{
    public static final OrderLog me = new OrderLog();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<OrderLog> paginate(int pageNumber, int pageSize){
        return paginate(pageNumber, pageSize, "select *",
                "from admin order by id asc");
    }

    public Map<Integer, String> findLogByOrderId(int orderid){
        List<OrderLog> orderLogs = OrderLog.me.find("select * from orderlog where orderid = ?", orderid);
        Map<Integer, String> orderLogMap = new HashMap<Integer, String>();
        for (OrderLog orderLog : orderLogs) {
        	orderLogMap.put(orderLog.getInt("status"), CommonUtils.formatDateEn(orderLog.getDate("ctime")));
		}
        return orderLogMap;
    }
    
    public boolean saveOrderlog(int orderId,int status,Date ctime){
    	OrderLog orderLog = new OrderLog();
    	orderLog.set("orderid", orderId);
    	orderLog.set("status", status);
    	orderLog.set("ctime", ctime);
    	return orderLog.save();
    }
}
