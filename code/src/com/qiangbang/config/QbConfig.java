package com.qiangbang.config;

import org.apache.log4j.Logger;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.kit.PathKit;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.render.ViewType;
import com.jfinal.weixin.sdk.api.ApiConfig;
import com.jfinal.weixin.sdk.api.ApiConfigKit;
import com.qiangbang.controller.AccountController;
import com.qiangbang.controller.AdminsController;
import com.qiangbang.controller.BannerController;
import com.qiangbang.controller.FileController;
import com.qiangbang.controller.CategoryController;
import com.qiangbang.controller.IndexController;
import com.qiangbang.controller.OrderController;
import com.qiangbang.controller.wap.BusinessController;
import com.qiangbang.controller.wap.UserController;
import com.qiangbang.controller.wap.WapActController;
import com.qiangbang.controller.wap.WapIndexController;
import com.qiangbang.controller.wap.WapPayController;
import com.qiangbang.controller.wap.WapTaskController;
import com.qiangbang.controller.wap.WapTestController;
import com.qiangbang.entity.Admin;
import com.qiangbang.entity.Assignment;
import com.qiangbang.entity.Attachment;
import com.qiangbang.entity.Banner;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.Category;
import com.qiangbang.entity.Evaluate;
import com.qiangbang.entity.Log;
import com.qiangbang.entity.Message;
import com.qiangbang.entity.OrderLog;
import com.qiangbang.entity.Orders;
import com.qiangbang.entity.Pubtask;
import com.qiangbang.entity.Refund;
import com.qiangbang.entity.Tradedetail;
import com.qiangbang.entity.Users;
import com.qiangbang.handle.UrlConvertHandler;
import com.qiangbang.interceptor.AdminInterceptor;
import com.qiangbang.utils.CommonUtils;

/**
 * 
* @ClassName: QbConfig 
* @Description: API引导式配置 
* @author leroy(32504251@qq.com) 
* @date 2016年5月14日 下午12:43:28 
*
 */
public class QbConfig extends JFinalConfig
{
    private static Logger logger = Logger.getLogger(QbConfig.class);
    
    public final static String rooturl = PropKit.use("config.properties").get("urlroot");
//    public final static String relativePath = "upload/";  //相对路径
    public final static String FILEPATH = PropKit.get("filepath");//存放文件路径
    
    /**
     * 配置常量
     */
    public void configConstant(Constants me) {
        logger.info("配置常量开始..");
        PropKit.use("config.properties"); // 加载少量必要配置，随后可用PropKit.get(...)获取值
        me.setDevMode(PropKit.getBoolean("devMode", false));
        me.setViewType(ViewType.JSP);// 2.2中默认的视图为jsp
//        me.setBaseViewPath("/WEB-INF/content");
//        me.setBaseUploadPath(PathKit.getWebRootPath() + "/attached/temp");// 2.2中有所改动
        me.setEncoding("utf-8");
//        me.setError404View("/WEB-INF/content/common/404.jsp");
//        me.setError500View("/WEB-INF/content/common/500.jsp");
        logger.info("配置常量结束..");
    }

    /**
     * 配置路由
     */
    public void configRoute(Routes me){
        logger.info("配置路由开始..");
		me.add("/", IndexController.class,"/view/admin/");	// 第三个参数为该Controller的视图存放路径
		me.add("/admin", AdminsController.class,"/view/admin/customer/");
		me.add("/order", OrderController.class,"/view/admin/order/");
		me.add("/category", CategoryController.class,"/view/admin/category/");
		me.add("/account", AccountController.class,"/view/admin/account/");	
		me.add("/banner", BannerController.class,"/view/admin/adv/");
		me.add("/wapIndex", WapIndexController.class,"/view/wap/");
		
		me.add("/waptest", WapTestController.class,"/view/weixin_test/");
		
		me.add("/user", UserController.class,"/view/wap/user/");
		me.add("/shop", BusinessController.class,"/view/wap/");
		me.add("/wappay", WapPayController.class,"/view/wap/pay/");
		me.add("/wapact", WapActController.class,"/view/wap/account/");
		me.add("/waptask", WapTaskController.class,"/view/wap/task/");
		me.add("/file", FileController.class);
        logger.info("配置路由结束..");
    }
    
	public static C3p0Plugin createC3p0Plugin() {
		return new C3p0Plugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password").trim());
	}

    /**
     * 配置插件
     */
    public void configPlugin(Plugins me){
        logger.info("配置插件开始..");
     // 配置C3p0数据库连接池插件
 		C3p0Plugin C3p0Plugin = createC3p0Plugin();
 		me.add(C3p0Plugin);
 		// 配置ActiveRecord插件
 		ActiveRecordPlugin arp = new ActiveRecordPlugin(C3p0Plugin);
 		arp.setShowSql(true);
 		me.add(arp);
 		arp.addMapping("admin", Admin.class); // 管理员
 		arp.addMapping("users", Users.class);// 用户
 		arp.addMapping("business", Business.class);// 商户
 		arp.addMapping("category", Category.class);// 类别
 		arp.addMapping("assignment", Assignment.class);// 任务
 		arp.addMapping("evaluate", Evaluate.class);// 评价
 		arp.addMapping("log", Log.class);// 日志
 		arp.addMapping("orders", Orders.class);// 交易明细
 		arp.addMapping("tradedetail", Tradedetail.class);// 交易明细
 		arp.addMapping("pubtask", Pubtask.class);// 角色
 		arp.addMapping("attachment", Attachment.class);// 角色
 		arp.addMapping("message", Message.class);// 角色
 		arp.addMapping("refund", Refund.class);// 退款/提现标
 		arp.addMapping("banner", Banner.class);// 退款/提现标
        logger.info("配置插件结束..");
    }

    /**
     * 配置全局拦截器
     */
    public void configInterceptor(Interceptors me){
        logger.info("配置全局拦截器开始..");
//        me.add(new AdminInterceptor());
        logger.info("配置全局拦截器结束..");
    }

    /**
     * 配置处理器
     */
    public void configHandler(Handlers me){
        logger.info("配置处理器开始..");
        me.add(new UrlConvertHandler());
        logger.info("配置处理器结束..");
    }

    @Override
    public void afterJFinalStart(){
        logger.info("afterJFinalStart开始..");
        com.qiangbang.common.Constants.loadCategories();
        logger.info("afterJFinalStart结束..");
    }

    @Override
    public void beforeJFinalStop(){
        beforeJFinalStop();
        logger.info("beforeJFinalStop结束");
    }

    public static void main(String[] args){
        JFinal.start("WebRoot", 80, "/qiangbang", 5);

    }
}
