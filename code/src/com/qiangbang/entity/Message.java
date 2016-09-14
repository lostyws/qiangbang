
package com.qiangbang.entity;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.qiangbang.utils.CommonUtils;

@SuppressWarnings("serial")
public class Message extends Model<Message>{
    public static final Message me = new Message();

    /**
     * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
     */
    public Page<Message> paginate(int pageNumber, int pageSize,int uid){
    	Calendar c = Calendar.getInstance();  
        c.add(Calendar.DATE, - 7);  
        Date monday = c.getTime();
        return paginate(pageNumber, pageSize, "select *",
                "from message where uid = ? and ctime>? order by id desc",uid,monday);
    }

    /**
     * 查询前7天的
     * @param uid
     * @return
     */
    public List<Message> findMsgByUid(int uid){
        return Message.me.find("select * from message where uid = ? and ctime>?", uid);
    }
    
    /**
      * @Title: getMsgCount 
      * @Description: 是否有未读消息  
      * @return int  
      * @throws
     */
    public int getMsgCount(int uid){
    	Message message = Message.me.findFirst("select count(1) as mcon from message where status=0 and uid=?", uid);
    	int count = 0;
		if(message!=null){
			Long buscount = message.getLong("mcon");
			count = buscount == null?0:buscount.intValue();
		}
        return count;
    }
}
