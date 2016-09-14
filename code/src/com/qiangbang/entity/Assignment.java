
package com.qiangbang.entity;

import java.util.HashMap;
import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.qiangbang.utils.CommonUtils;

@SuppressWarnings("serial")
public class Assignment extends Model<Assignment>{
    public static final Assignment me = new Assignment();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<Assignment> paginate(int pageNumber, int pageSize){
        return paginate(pageNumber, pageSize, "select *",
                "from assignment order by id desc");
    }

    public List<Assignment> findByUsername(String username){
        return Assignment.me.find("select * from assignment where username = ?", username);
    }
    
    /**
      * @Title: getOrderCount 
      * @Description: 0.发布成功  1.达成合作、竞标成功 2.已完成 3.取消  4.待支付  5.待确认  6.申请退款 7.商户确认退款 8.退款成功  9.申请线下支付
      * @return int  
      * @throws
     */
    public HashMap getOrderCountMap(int uid){
    	List<Assignment> assignment = Assignment.me.find("select count(1) as con,status from assignment where uid = ? group by status", uid);
    	HashMap<String, Integer> resMap = new HashMap<String, Integer>();
    	int nopay = 0;
    	int noconfirm = 0;
    	for (Assignment asg : assignment) {
			if(asg.getInt("status")==4){
				Long buscount = asg.getLong("con");
				nopay = buscount == null?0:buscount.intValue();
			}
			if(asg.getInt("status")==5){
				Long buscount = asg.getLong("con");
				noconfirm = buscount == null?0:buscount.intValue();
			}
		}
    	resMap.put("nopay",nopay);
    	resMap.put("noconfirm",noconfirm);
        return resMap;
        
    }
    
    /**
     *  0.发布成功  1.达成合作、竞标成功 2.已完成 3.取消  4.待支付  5.待确认  6.申请退款 7.商户确认退款 8.退款成功
     * @param status
     * @return
     */
    public String getStatus(int status){
    	String statusStr = "";
    	switch (status) {
		case 0:
			statusStr = "进行中";
			break;
		case 1:
			statusStr = "进行中";
			break;
		case 2:
			statusStr = "已完成";
			break;
		case 3:
			statusStr = "取消";
			break;
		case 4:
			statusStr = "待支付";
			break;
		case 5:
			statusStr = "待确认";
			break;			
		case 6:
			statusStr = "申请退款中";
			break;
		case 7:
			statusStr = "申请退款中";
			break;
		case 8:
			statusStr = "退款成功";
			break;
		case 9:
			statusStr = "线下支付";
			break;
		default:
			break;
		}
    	return statusStr;
    }
    
}
