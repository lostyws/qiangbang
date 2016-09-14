
package com.qiangbang.entity;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

@SuppressWarnings("serial")
public class Pubtask extends Model<Pubtask>{
    public static final Pubtask me = new Pubtask();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<Pubtask> paginate(int pageNumber, int pageSize){
        return paginate(pageNumber, pageSize, "select *",
                "from pubtask order by id desc");
    }

    public List<Pubtask> findPubTaskByAssId(int assignId){
        return Pubtask.me.find("SELECT a.id offerId,businessid sellerId,nickname sellerName,busmoney offerMoney,a.describe,IFNULL(t.buscount,0) AS sumOrders from pubtask a LEFT JOIN users b ON a.businessid=b.id LEFT JOIN (SELECT COUNT(1) AS buscount,cusid FROM tradedetail group by cusid) t ON a.businessid=t.cusid  where assignid = ? order by a.id desc", assignId);
    }
    
    public List<Pubtask> findServiceTaskByAssId(int assignId){
    	return Pubtask.me.find("SELECT b.uid,u.mobile,b.shopname,b.shopicon,b.isauth,b.isbond,p.busmoney,p.bid,IFNULL(t.con,0) AS con FROM pubtask p LEFT JOIN users u ON p.businessid=u.id LEFT JOIN business b ON u.id=b.uid LEFT JOIN (select count(1) AS con,businessid FROM pubtask WHERE bid=1 GROUP BY businessid) AS t ON t.businessid=p.businessid WHERE assignid=? order by isauth desc,b.bondmoney desc",assignId);
    }
    
    /**
     * 根据任务号 商户号查询
      * @Title: findServiceTaskByUidAndAssId 
      * @Description: TODO  
      * @return List<Pubtask>  
      * @throws
     */
    public List<Pubtask> findServiceTaskByUidAndAssId(int assignId,int uid){
    	return Pubtask.me.find("select b.uid,b.shopname,u.mobile,b.shopicon,b.isauth,b.isbond,p.busmoney,p.bid,(select count(1) from pubtask where businessid="+uid+" and bid=1) as con FROM pubtask p LEFT JOIN users u ON p.businessid=u.id LEFT JOIN business b ON u.id=b.uid where p.assignid=? and p.businessid=?",assignId,uid);
    }
    
    
    /**
     * 工作台使用
     * @param assignId
     * @param uid
     * @return
     */
    public Pubtask findBusinessTask(int assignId,int uid){
    	return Pubtask.me.findFirst("select p.*,a.status,a.signtime,a.tradtime,a.refundtime,a.crefundtime,a.starttime,a.againpay,a.againreason,a.applypaytime,a.paytime,a.offlinetime,a.offlinepay,a.cofflinetime from pubtask p left join assignment a on p.assignid=a.id where assignid=? and businessid=?", assignId,uid);
    }
    
    /**
     * 根据服务商id和任务号查询
     * @param assignId
     * @param uid
     * @return
     */
    public Pubtask findPubTaskByOrdreIdAndUid(int assignId,int uid){
    	return Pubtask.me.findFirst("select * from pubtask where assignid=? and businessid=?", assignId,uid);
    }
    
    /**
     * 是否有报价过该需求
     * @param assignId
     * @param uid
     * @return
     */
    public int getPubTaskCount(int assignId,int uid){
		Record record = Db.findFirst("select count(1) AS buscount FROM pubtask WHERE assignid=? and businessid=?",assignId,uid);
		int count = 0;
		if(record!=null){
			Long buscount = record.getLong("buscount");
			count = buscount == null?0:buscount.intValue();
		}
		return count;
    }
    
    /**
     * 是否有报价过该需求--有几个人报价过改订单
     * @param assignId
     * @return
     */
    public int getPubTaskCount(int assignId){
		Record record = Db.findFirst("select count(1) AS buscount FROM pubtask WHERE assignid=?",assignId);
		int count = 0;
		if(record!=null){
			Long buscount = record.getLong("buscount");
			count = buscount == null?0:buscount.intValue();
		}
		return count;
    }
    
    /**
     * 今天报价过几次
     * @param uid
     * @return
     */
    public int getTodayPubTask(int uid){
		Record record = Db.findFirst("select count(1) AS buscount FROM pubtask WHERE TO_DAYS(ctime)=TO_DAYS(NOW()) and businessid=?",uid);
		int count = 0;
		if(record!=null){
			Long buscount = record.getLong("buscount");
			count = buscount == null?0:buscount.intValue();
		}
		return count;
    }
}
