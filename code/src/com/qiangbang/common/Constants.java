
package com.qiangbang.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.jfinal.kit.PropKit;
import com.jfinal.weixin.sdk.api.ApiConfigKit;
import com.qiangbang.entity.Category;

/**
  * @ClassName: Constants 
  * @Description: TODO 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:23:41 
 */
public class Constants{
    // 登陆用户
    public static final String LOGINADMIN = "loginAdmin";
    
    public static String certpath = PropKit.get("certpath");
    
	public static String WeiXinUrl = "https://open.weixin.qq.com/connect/oauth2/authorize";
	public static String WeiXinAppId = PropKit.get("appId");
	public static String WeiXinSecret = PropKit.get("appSecret");
	
	
	//商户相关资料
	public static String appid = PropKit.get("appId");
	public static String partner = PropKit.get("partner");
	public static String paternerKey = PropKit.get("paternerKey");
	public static String notify_url = PropKit.get("notify_url");
	
	public static String notifydiff_url = PropKit.get("notifydiff_url");
	
	public static String payagain_notify_url = PropKit.get("payagain_notify_url");
	
	public static String auth_notify_url = PropKit.get("auth_notify_url");
	
	
	public static String bail_notify_url = PropKit.get("bail_notify_url");
	
	public static String add_notify_url = PropKit.get("add_notify_url");
	
	public static HashMap<String,String> SMS_CODE = new HashMap<String, String>();//存放手机验证码以及发送时间
	
	//附件类型
	public static HashMap<Integer,String> FILETYPEMAP = new HashMap<Integer, String>();
	
	//存储新消息
	public static HashMap<String,String> MSGMAP = new HashMap<String, String>();
	
	public static List<Category> categoies = new ArrayList<Category>();
	
	
	public static String msg_appKey = "23390915";
	public static String msg_appSecret = "8870fc6d28e9a42f09035275bfe8309b";
	public static String msg_url = "http://gw.api.taobao.com/router/rest"; 
	
	public static String baseURL=PropKit.get("domain");
	public static String template_tk=PropKit.get("template_tk");
	public static String template_new=PropKit.get("template_new");
	public static String template_order=PropKit.get("template_order");
	public static String template_business=PropKit.get("template_business");
	public static String template_evaluate=PropKit.get("template_evaluate");
	public static String mobile_new="SMS_11040892";//推送新需求
	public static String mobile_new_notprice="SMS_11001452";//推送新需求余额不足
	public static String mobile_competitive="SMS_11016133";//报价
	public static String mobile_pass="SMS_11260229";//商户审核通过
	public static String mobile_notpass="SMS_11026030";//商户审核不通过
	public static String mobile_orderrefund="SMS_11071457";//用户发起退款
	
	public static double  mobile_min_money=0.5;//短信通知,最低余额需要有0.5元
	
	
	static{
			
			//1.正面 2.反面 3.营业执照 4.门店
			FILETYPEMAP.put(1, "身份证正面");
			FILETYPEMAP.put(2, "身份证反面");
			FILETYPEMAP.put(3, "营业执照");
			FILETYPEMAP.put(4, "门店");
	}
	
	public static List<Category> loadCategories(){
		if(categoies==null||categoies.size()==0){
			categoies = Category.me.findAllCategorys();
		}
		return categoies;
	}
	
	public static void refreshCategories(){
		categoies = Category.me.findAllCategorys();
	}
}
