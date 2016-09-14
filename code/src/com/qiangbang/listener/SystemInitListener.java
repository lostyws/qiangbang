
package com.qiangbang.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
  * @ClassName: SystemInitListener 
  * @Description: 启动监听器 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:18:55 
 */
public class SystemInitListener implements ServletContextListener{

  @Override
  public void contextDestroyed(ServletContextEvent arg0){
    // TODO Auto-generated method stub

  }

  @Override
  public void contextInitialized(ServletContextEvent arg0){
    System.out.println("listener开始.................");
  }
}
