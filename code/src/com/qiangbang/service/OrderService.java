package com.qiangbang.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.math.RandomUtils;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.qiangbang.entity.Assignment;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.Evaluate;
import com.qiangbang.entity.Orders;
import com.qiangbang.entity.Pubtask;
import com.qiangbang.utils.CommonUtils;
import com.qiangbang.utils.QbPage;
import com.qiangbang.utils.QbUtils;
import com.qiangbang.utils.Utility;

/**
  * @ClassName: OrderService 
  * @Description: TODO 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月21日 下午4:09:30 
  *
 */
public class OrderService {
	public Record getOrderDetails(int taskid){
		Record record = Db.findFirst("SELECT a.id,a.id orderNumber,a.detail deployDetail,c.categoryname,pay intentionAmount,againpay,a.ctime releaseTime,"
				+ "a.status,b.buyerId,buyerName,sellerName,sellerId,b.price transactionAmount,"
				+ "1 AS isStop,1 AS isDelete,1 AS isAffirmFinish "
				+ "FROM assignment a LEFT JOIN orders b ON a.id=b.orderid left join category c on a.categoryId=c.id where a.id=?", taskid);
		
		List<Evaluate> evaluates = Evaluate.me.findEvaByTaskId(taskid);
		HashMap<String, Object> businessMap = new HashMap<String,Object>();
		HashMap<String, Object> cusMap = new HashMap<String,Object>();
		for (Evaluate evaluate : evaluates) {
			if(evaluate.getInt("type")==1){//商户
				List<String> imgList = QbUtils.convertStringToList(evaluate.getStr("imgs"), ",");
				businessMap.put("service", evaluate.get("service"));
				businessMap.put("quality", evaluate.get("quality"));
				businessMap.put("speed", evaluate.get("speed"));
				businessMap.put("imgList", imgList);
				businessMap.put("describe", evaluate.get("describe"));
			} else {
				cusMap.put("grade", evaluate.get("grade"));
				cusMap.put("describe", evaluate.get("describe"));
			}
		}
		
		List<Pubtask> pubtasks = Pubtask.me.findPubTaskByAssId(taskid);
		int status = record.getInt("status");
		record.set("status", Assignment.me.getStatus(status));
		record.set("buyerEvaluate", businessMap);
		record.set("sellerEvaluate", cusMap);
		record.set("offerList", pubtasks);
		return record;
	}
	
	/**
	 * wap我的订单列表
	 * @param uid
	 * @param status
	 * @return
	 */
    public List<Record> findAllAssign(int uid,int status){
        String sql = "SELECT a.id AS taskId,STATUS AS state,status,title,pay AS amount,"
        		+ " CASE WHEN p.con IS NULL THEN 0 ELSE p.con END AS works_num FROM assignment a LEFT JOIN (SELECT COUNT(1) AS con,"
        		+ "assignid FROM pubtask GROUP BY assignid) AS p ON a.id=p.assignid where a.uid=? ";
        if(status>0){
        	if(status==1){
        		sql += "and status in (0,1,5)";
        	} else if(status==3){
        		sql += "and status in (3,6,7,8)";
        	} else {
        		sql += "and status = "+status;
        	}
        }
        sql +=" order by id desc";
        List<Record> assignments =Db.find(sql, uid);
        for (Record rcord : assignments) {
        	int dbstatus = rcord.getInt("status");
        	rcord.set("status", Assignment.me.getStatus(dbstatus));
        	
        	String goValue = "";
        	String orderurl = "/waptask/detail/"+rcord.getInt("taskId");
        	String payurl = "";
        	if(dbstatus==0||dbstatus==1){
        		goValue = "查看详情";
        		payurl = "/waptask/detail/"+rcord.getInt("taskId");
        	}/* else if(dbstatus==2){
        		goValue = "去评价";
        		payurl = "/waptask/goEvaluate?taskId="+rcord.getInt("taskId")+"&salerId=${evaluid}&type=1";
        	}*/ else if(dbstatus==4){
        		goValue = "去支付";
        		payurl = "/wappay/detail?taskId="+rcord.getInt("taskId");
        	} else if(dbstatus==5){
        		goValue = "去确认";
        		payurl = "/waptask/detail/"+rcord.getInt("taskId");
        	} else if(dbstatus==3){
        		orderurl = "/waptask/goNull";
        	}
        	
        	
        	rcord.set("orderurl", orderurl);
        	rcord.set("payurl", payurl);
        	rcord.set("goValue", goValue);
		}
        return assignments;
    }
    
	/**
	 * wap我已经中标的订单列表
	 * @param uid
	 * @param status
	 * @return
	 */
    public List<Record> findBaoJiaAssign(int buid,int status){
        String sql = "SELECT a.id AS taskId,STATUS AS state,status,title,pay AS amount,"
        		+ " CASE WHEN p.con IS NULL THEN 0 ELSE p.con END AS works_num FROM pubtask pt LEFT JOIN assignment a  ON pt.assignid=a.id LEFT JOIN (SELECT COUNT(1) AS con,"
        		+ "assignid FROM pubtask GROUP BY assignid) AS p ON a.id=p.assignid where pt.bid=1 and a.status!=3 and pt.businessid=? ";
        sql +=" order by a.id desc";
        List<Record> assignments =Db.find(sql, buid);
        for (Record rcord : assignments) {
        	int dbstatus = rcord.getInt("status");
        	rcord.set("status", Assignment.me.getStatus(dbstatus));
        	
        	String goValue = "";
        	String orderurl = "/waptask/detail/"+rcord.getInt("taskId");
        	String payurl = "";
        	if(dbstatus==0){
        		goValue = "查看详情";
        		payurl = "/waptask/detail/"+rcord.getInt("taskId");
        	} else if(dbstatus==1){
        		goValue = "去申请确认";
        		payurl = "/waptask/detail/"+rcord.getInt("taskId");
        	}/* else if(dbstatus==2){
        		goValue = "去评价";
        		payurl = "/wappay/goEvaluate";
        	}*/ else if(dbstatus==3){
        		orderurl = "/waptask/goNull";
        	}
        	
        	rcord.set("orderurl", orderurl);
        	rcord.set("payurl", payurl);
        	rcord.set("goValue", goValue);
		}
        return assignments;
    }
    
	/**
	 * wap商户待选标的订单列表
	 * @param uid
	 * @param status
	 * @return
	 */
    public List<Record> findBusinessAssign(int buid,int status){
        String sql = "SELECT a.id AS taskId,STATUS AS state,status,title,pay AS amount,"
        		+ " CASE WHEN p.con IS NULL THEN 0 ELSE p.con END AS works_num FROM pubtask pt LEFT JOIN assignment a  ON pt.assignid=a.id LEFT JOIN (SELECT COUNT(1) AS con,"
        		+ "assignid FROM pubtask GROUP BY assignid) AS p ON a.id=p.assignid where a.status="+status+" and  pt.businessid=? order by a.id desc";
        
        List<Record> assignments =Db.find(sql, buid);
        for (Record rcord : assignments) {
        	int dbstatus = rcord.getInt("status");
        	rcord.set("status", Assignment.me.getStatus(dbstatus));
        	
        	String goValue = "查看详情";
        	String orderurl = "/waptask/detail/"+rcord.getInt("taskId");
        	String payurl = "";
        	
        	rcord.set("orderurl", orderurl);
        	rcord.set("payurl", payurl);
        	rcord.set("goValue", goValue);
		}
        return assignments;
    }
    
	/**
	 * wap商户未中标的订单列表
	 * @param uid
	 * @param status
	 * @return
	 */
    public List<Record> findBusinessNotAssign(int buid,int status){
        String sql = "SELECT a.id AS taskId,STATUS AS state,status,title,pay AS amount,"
        		+ " CASE WHEN p.con IS NULL THEN 0 ELSE p.con END AS works_num FROM pubtask pt LEFT JOIN assignment a  ON pt.assignid=a.id LEFT JOIN (SELECT COUNT(1) AS con,"
        		+ "assignid FROM pubtask GROUP BY assignid) AS p ON a.id=p.assignid where a.status not in (0,3,4) and pt.bid=0 and pt.businessid=? ";
        sql +=" order by a.id desc";
        List<Record> assignments =Db.find(sql, buid);
        for (Record rcord : assignments) {
        	int dbstatus = rcord.getInt("status");
        	rcord.set("status", "未中标");
        	String goValue = "查看详情";
        	String orderurl = "/waptask/detail/"+rcord.getInt("taskId");
        	String payurl = "";
        	
        	rcord.set("orderurl", orderurl);
        	rcord.set("payurl", payurl);
        	rcord.set("goValue", goValue);
		}
        return assignments;
    }
    
	/**
	 * 获取待选标数量
	  * @Title: getNoCompritiveCount 
	  * @Description: TODO  
	  * @return int  
	  * @throws
	 */
	public int getNoCompritiveCount(int uid,String cateId){
		Record record = Db.findFirst("select count(1) AS buscount FROM pubtask p LEFT JOIN assignment a ON a.id=p.assignid WHERE businessid=? AND status=0 ",uid);
		int count = 0;
		if(record!=null){
			Long buscount = record.getLong("buscount");
			count = buscount == null?0:buscount.intValue();
		}
		return count;
	}
    
    /**
     * 更新状态
     * @param taskId
     * @param businessId
     */
    public void updateOrderStatus(int taskId){
		Assignment assignment = Assignment.me.findById(taskId);
		
		assignment.set("status", 1);
		assignment.update();

		Orders orders = Orders.me.findByOrderId(taskId);
		orders.set("status", 1);
		orders.update();
    }
}
