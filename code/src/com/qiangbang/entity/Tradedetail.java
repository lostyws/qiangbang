
package com.qiangbang.entity;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.qiangbang.utils.ArithUtil;

@SuppressWarnings("serial")
public class Tradedetail extends Model<Tradedetail>{
    public static final Tradedetail me = new Tradedetail();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<Tradedetail> paginate(int pageNumber, int pageSize, int cusId){
        return paginate(pageNumber, pageSize, "SELECT a.id,b.id orderNumber,type category,money,remark mark ",
                "from tradedetail a LEFT JOIN assignment b ON a.orderid=b.id where cusid='"+cusId+"' order by id desc");
    }
    
    public Page<Tradedetail> paginateAdmin(int pageNumber, int pageSize,int type, String startTime, String endTime){
    	String typeWhere = "";
    	if(type==1){
    		typeWhere =" where t.type=0 ";
    	} else if(type==2){
    		typeWhere =" where t.type in(1,2) ";
    	} else if(type==3){
    		typeWhere =" where t.remark = '缴纳保证金 ' ";
    	} else if(type==4){
    		typeWhere =" where t.remark = '缴纳认证费' ";
    	}
    	
    	if(!"".equals(startTime)&&startTime!=null&&!startTime.equals("null")){
    		if(!"".equals(typeWhere)){
    			typeWhere += " and t.ctime>'"+startTime+"'";
    		} else {
    			typeWhere += " where t.ctime>'"+startTime+"'";
    		}
    	}
    	
    	if(!"".equals(endTime)&&endTime!=null&&!endTime.equals("null")){
    		if(!"".equals(typeWhere)){
    			typeWhere += " and t.ctime<='"+endTime+"'";
    		} else {
    			typeWhere += " where t.ctime<='"+endTime+"'";
    		}
    	}
    	
        return paginate(pageNumber, pageSize, "SELECT t.orderid AS id,IFNULL(t.orderid,'') orderNumber,CASE t.type WHEN 0 THEN 1 ELSE 0 END category,t.money,CONCAT(t.remark,'(',u.nickname,')') mark,t.ctime createTime,t.orderid ",
                "from tradedetail t left join users u on t.cusid=u.id  "+typeWhere+" order by t.ctime desc");
    }
    
    /**
     * 查询交易交易记录
     * @param uid
     * @return
     */
    public List<Tradedetail> getTradeByUid(int uid){
        return Tradedetail.me.find("SELECT cusid,money,amount,type,orderid,remark,ctime,msg FROM tradedetail where cusid = ? order by id desc", uid);
    }
    
    public Tradedetail findTradeDetailByTaskId(int taskId){
        return Tradedetail.me.findFirst("SELECT * FROM tradedetail where orderid = ?", taskId);
    }
    
    public Tradedetail findTradeDetailByPayOrder(String payorder){
        return Tradedetail.me.findFirst("SELECT * FROM tradedetail where payorder = ?", payorder);
    }
    
    /**
     * @Title: getTradeCount 
     * @Description: 是否赠送过金额
     * @return int  
     * @throws
    */
   public int getTradeCount(int uid){
		Tradedetail tradedetail = Tradedetail.me.findFirst("select count(1) as tcon from tradedetail where cusid=? and remark='2元赠送不可提现'", uid);
	   	int count = 0;
		if(tradedetail!=null){
			Long buscount = tradedetail.getLong("tcon");
			count = buscount == null?0:buscount.intValue();
		}
	     return count;
   }
    
	/**
	 * 获取收入和支出
	  * @Title: getBusSumPrice 
	  * @Description: TODO  
	  * @return int  
	  * @throws
	 */
	public Map<String,Double> getAdminSumPrice(){
		List<Record> records = Db.find("select sum(money) AS sumamount,type as stype FROM tradedetail group by type");
		Map<String,Double> adminSum = new HashMap<String,Double>(); 
		if(records!=null){
			double expenditureMoney = 0;
			for (Record record : records) {
				Double bussum = record.getDouble("sumamount");
				int type =record.getInt("stype");
				if(type==0){//用户支出、admin收入
					if(bussum!=null&&bussum>0){
						BigDecimal bg = new BigDecimal(bussum.doubleValue());  
						adminSum.put("income",bg.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
					}
				} else {
					if(bussum!=null&&bussum>0){
						BigDecimal bg = new BigDecimal(bussum.doubleValue());  
						double emoney = bg.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
						expenditureMoney = ArithUtil.add(emoney, expenditureMoney);
					}
				}
			}
			adminSum.put("expend",expenditureMoney);
		}
		return adminSum;
	}
	
	
	/**
	 * 获取成交量前三位
	  * @Title: getBusSumPrice 
	  * @Description: TODO  
	  * @return int  
	  * @throws
	 */
	public List<Record> getVolumeThree(){
		List<Record> records = Db.find("SELECT b.uid,b.shopicon FROM business b RIGHT JOIN (SELECT COUNT(1) con,cusid FROM tradedetail WHERE remark='订单完成'  GROUP BY cusid ORDER BY con DESC LIMIT 3) t ON b.uid=t.cusid");
		return records;
	}
}
