
package com.qiangbang.entity;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

@SuppressWarnings("serial")
public class Evaluate extends Model<Evaluate>{
    public static final Evaluate me = new Evaluate();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<Record> paginate(int pageNumber, int pageSize,int euid,int status){
    	Page<Record> paginate = Db.paginate(pageNumber, pageSize, "SELECT u.username AS brandName,e.ctime AS dataymd,e.content,e.imgs ",
                "from evaluate e LEFT JOIN users u ON e.uid=u.id where e.euid =? and score =? order by e.id desc",euid,status);
    	List<Record> records = paginate.getList();
    	for (Record record : records) {
			String imgs = record.getStr("imgs");
			String[] imgarray = {};
			if(imgs!=null&&imgs.length()>0){
				imgarray = imgs.split(",");
			}
			record.set("imgs", imgarray);
		}
    	return paginate;
    }

    public List<Evaluate> findEvaByTaskId(int taskid){
        return Evaluate.me.find("select service,speed,quality,imgs,content 'describe',type,score from evaluate where taskid = ?", taskid);
    }
    
    /**
     * 查看自己评价了哪些人
      * @Title: findEvaByTaskIdAndUid 
      * @Description: TODO  
      * @return Evaluate  
      * @throws
     */
    public Evaluate findEvaByTaskIdAndUid(int taskid,int uid){
        return Evaluate.me.findFirst("select * from evaluate where taskid = ? and uid =?", taskid,uid);
    }
    
    //通过当前id和taskId查看自己的评价列表
    public Evaluate findEvaByTaskIdAndEUid(int taskid,int euid){
        return Evaluate.me.findFirst("select * from evaluate where taskid = ?  and euid =?", taskid,euid);
    }
    
    //通过当前id和taskId查看自己的评价列表,以及自己有没有评价别人
    public List<Evaluate> findEvaluateByTaskId(int taskid){
        return Evaluate.me.find("select uid,service,speed,quality,content,euid,ctime from evaluate where taskid = ? order by id desc", taskid);
    }
    
    /**
     * 验证该评价人是否评价过
     * @param assignId
     * @param uid
     * @return
     */
    public int getEvaluateCount(int assignId,int uid){
		Record record = Db.findFirst("select count(1) AS buscount FROM evaluate WHERE uid=? and taskid=?",uid,assignId);
		int count = 0;
		if(record!=null){
			Long buscount = record.getLong("buscount");
			count = buscount == null?0:buscount.intValue();
		}
		return count;
    }
    
    /**
     * 验证该订单卖家是否被评价
     * @param assignId
     * @param uid
     * @return
     */
    public int getEvaluateBusinessCount(int assignId,int euid){
		Record record = Db.findFirst("select count(1) AS buscount FROM evaluate WHERE euid=? and taskid=?",euid,assignId);
		int count = 0;
		if(record!=null){
			Long buscount = record.getLong("buscount");
			count = buscount == null?0:buscount.intValue();
		}
		return count;
    }
    
    //通过商铺的评价列表
    public List<Evaluate> findEvaByEUid(int euid){
        return Evaluate.me.find("select * from evaluate where euid =?", euid);
    }
    
    /**
     * 综合评价、评价分
     * @param euid
     * @return
     */
    public Record findAvgService(int euid){
        return Db.findFirst("select avg(service) as serv,avg(speed) as speed,avg(quality) as qua,count(1) as esum,(select count(1) from evaluate "
        		+ "where score=2 and euid="+euid+") as good from evaluate where euid="+euid);
    }
    
    /**
     * 综合评价
     * @param euid
     * @return
     */
    public Record findComplexService(int euid){
        return Db.findFirst("select count(1) as esum,(select count(1) from evaluate "
        		+ "where score=2 and euid="+euid+") as good from evaluate where euid="+euid);
    }
}
