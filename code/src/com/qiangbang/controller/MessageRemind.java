package com.qiangbang.controller;

import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.comet4j.core.CometConnection;
import org.comet4j.core.CometContext;
import org.comet4j.core.CometEngine;
import org.comet4j.core.event.ConnectEvent;
import org.comet4j.core.listener.ConnectListener;

import com.qiangbang.common.CacheConstant;
import com.qiangbang.common.CacheManager;
import com.qiangbang.common.Constants;
import com.qiangbang.entity.Message;
import com.qiangbang.entity.Users;
import com.qiangbang.utils.Utility;

public class MessageRemind extends ConnectListener implements ServletContextListener {
	 private static final String CHANNEL = "msg";

	public void contextInitialized(ServletContextEvent arg0) {
		//注册应用的channel  
        CometContext context = CometContext.getInstance();  
        context.registChannel(CHANNEL);  
          
        //添加监听器  
        CometEngine engine = CometContext.getInstance().getEngine();  
        engine.addConnectListener(this);  
		
	}

	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean handleEvent(ConnectEvent connEvent) {
		 final CometConnection conn = connEvent.getConn();  
         
	        //建立连接和用户的关系  
	        doCache(conn);  
	  
	        final String connId = conn.getId();  
	        System.out.println("start....................");	
	        System.out.println("conId==="+connId);	
	        /*模拟业务逻辑*/  
	        Timer timer = new Timer(true);  
	        TimerTask task = new TimerTask() {  
	            @Override  
	            public void run() {  
	                CometEngine engine = CometContext.getInstance().getEngine();  
	                //推送到所有客户端  
	                //engine.sendToAll("hello", connId + " - you have " + ((int)(Math.random() * 9) + 1) + " new message <br />");  
	  
	                if (CacheManager.getContent(connId).isExpired()) {  
	                    doCache(conn);  
	                }  
	                String msg = Constants.MSGMAP.get(String.valueOf(CacheManager.getContent(connId).getValue()));
	                if (!Utility.empty(msg)) {  
	                    //推送到指定的客户端  
	                    engine.sendTo(CHANNEL, engine.getConnection(connId),msg);  
	                    Constants.MSGMAP.remove(String.valueOf(CacheManager.getContent(connId).getValue())+"");
	                }  
	            } 
	        };  
	        timer.schedule(task, 10000, (1000 * 5));  
	        return true;  
	}
	
	 private void doCache(final CometConnection conn) {  
		 	Users users = (Users)conn.getRequest().getSession().getAttribute("users");  
	        if (users != null) {  
	            CacheManager.putContent(conn.getId(), String.valueOf(users.getInt("id")), CacheConstant.EXPIRE_AFTER_ONE_HOUR);  
	        }  
	    }  
	  
	    /** 
	     * 是否有未读消息 
	     * 返回true,false 
	     * true即表示需要推送消息,false即不需要推送 
	     */  
	    private boolean simulateService(String id) {  
//	        int count = Message.me.getMsgCount(Integer.valueOf(id)); 
	    	String msg = Constants.MSGMAP.get(Integer.valueOf(id));
	        if(!Utility.empty(msg)){
	        	return true;  
	        }
	        return false;
	    }  
	  
}