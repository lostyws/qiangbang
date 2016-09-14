/**  
 * @Title: WeixinUtil.java
 * @Package com.flt.utils
 * @Description: TODO
 * @author huangzhenyang
 * @date 2016-1-7
 */
package com.qiangbang.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import com.jfinal.kit.PropKit;
import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.api.ApiConfig;
import com.jfinal.weixin.sdk.api.ApiConfigKit;
import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.api.PaymentApi;
import com.jfinal.weixin.sdk.api.TemplateMsgApi;
import com.jfinal.weixin.sdk.api.UserApi;
import com.jfinal.weixin.sdk.api.PaymentApi.TradeType;
import com.jfinal.weixin.sdk.kit.IpKit;
import com.jfinal.weixin.sdk.kit.PaymentKit;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.qiangbang.common.Constants;

/**
 * ClassName: WeixinUtil 
 * @Description: TODO
 * @author huangzhenyang
 * @date 2016-5-26
 */
public class WeixinUtil {

	/**
	 * 调用access_token接口URL
	 */
   public static final String ACCESS_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";
   
   /**
    * 调用微信JS接口的临时票据
    */
   public static final String  TICKET_GETTICKET_URL="https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi";
  
   
	/**
	 * 刷新accessToken
	 * @param appid 应用ID
	 * @param appsecret 应用密钥
	 * @return
	 */
	public static  String getAccessToken(String appId,String sercret) {
		String accessToken = null;
//		String requestUrl = ACCESS_TOKEN_URL.replace("APPID", Constants.WeiXinAppId).replace("APPSECRET", Constants.WeiXinSecret);
		String requestUrl = ACCESS_TOKEN_URL.replace("APPID", appId).replace("APPSECRET", sercret);
		JSONObject jsonObject = RequestUtils.getRemoteIntefaceResult(new JSONObject(), requestUrl);
		// 如果请求成功   
        if (null != jsonObject) {  
            try {
            	System.out.println(jsonObject);
            	accessToken=jsonObject.getString("access_token");  
            } catch (JSONException e) {  
            	accessToken = null;  
            }  
        }  
		return accessToken;
	}
	
	 /**
     * 获取微信JSSDK的ticket 
     * @author Benson
     */
    public static String getJSSDKTicket(String access_token) {  
        String ticket="";
        String requestUrl = TICKET_GETTICKET_URL.replace("ACCESS_TOKEN", access_token);  
        JSONObject jsonObject = RequestUtils.getRemoteIntefaceResult(new JSONObject(), requestUrl);
        if (null != jsonObject) {  
            try {
            	System.out.println(jsonObject);
            	ticket=jsonObject.getString("ticket");  
            } catch (JSONException e) {  
            	ticket = null;  
            }  
        }  
        return ticket;  
    }

    
	public static void setApiConfig(){
		ApiConfig ac = new ApiConfig();
		
		// 配置微信 API 相关常量
		ac.setToken(PropKit.get("token"));
		ac.setAppId(PropKit.get("appId"));
		ac.setAppSecret(PropKit.get("appSecret"));
		/**
		 *  是否对消息进行加密，对应于微信平台的消息加解密方式：
		 *  1：true进行加密且必须配置 encodingAesKey
		 *  2：false采用明文模式，同时也支持混合模式
		 */
		ac.setEncryptMessage(PropKit.getBoolean("encryptMessage", false));
		ac.setEncodingAesKey(PropKit.get("encodingAesKey", "setting it in config file"));
        ApiConfigKit.setThreadLocalApiConfig(ac);
	}
    
	/**
	 * 获取用户信息
	 */
	public static Map getUserInfo(String openId){
		setApiConfig();
		ApiResult apiResult = UserApi.getUserInfo(openId);
		String json = apiResult.getJson();
		Map res = JsonUtil.parseJson(json);
		System.out.println(apiResult.getJson());
		return res;
	}
	
	/**
	 * 发送模板消息
	 * 退款申请通知
	 */
	public static void sendTkMsg(String openId,double price,String orderDetail,String orderNum){
		String str = " {\n" +
				"           \"touser\":\""+openId+"\",\n" +
				"           \"template_id\":\""+Constants.template_tk+"\",\n" +
				"           \"url\":\"http://www.qiangbang.com\",\n" +
				"           \"topcolor\":\"#FF0000\",\n" +
				"           \"data\":{\n" +
				"                   \"first\": {\n" +
				"                       \"value\":\"您已申请退款，等待确认退款信息。\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"orderProductPrice\":{\n" +
				"                       \"value\":\""+price+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"orderProductName\":{\n" +
				"                       \"value\":\""+orderDetail+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"orderName\":{\n" +
				"                       \"value\":\""+orderNum+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"remark\":{\n" +
				"                       \"value\":\"感谢您对抢帮的支持,及时登录平台进行报价\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   }\n" +
				"           }\n" +
				"       }";
		ApiResult apiResult = TemplateMsgApi.send(str);
		System.out.println(apiResult.getJson());
	}
	
	/**
	 * 发送模板消息
	 * 客户新需求模版
	 */
	public static void sendNewTaskMsg(String openId,String description,String uname,String deployDate,int orderid,String url){
//		openId = "ouiH2wG2VMVWale7WTqhWEqIm9m0";
//		openId = "ouiH2wKaqhhmKHg2sWw2mixZAYq4";//leroy
		String str = " {\n" +
				"           \"touser\":\""+openId+"\",\n" +
				"           \"template_id\":\""+Constants.template_new+"\",\n" +
				"           \"url\":\""+url+"\",\n" +
				"           \"topcolor\":\"#FF0000\",\n" +
				"           \"data\":{\n" +
				"                   \"first\": {\n" +
				"                       \"value\":\"您好，您有新的抢帮网需求，请及时抢单报价。已缴纳保证金商户在报完价后可查看用户的手机号码，提前与用户电话沟通会提高中标概率哦！活动：商户转发菜单栏上“商户专区”-“商户优惠”至微信朋友圈集满78个赞即可免费开通300元的商户认证功能。\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"keyword1\":{\n" +
				"                       \"value\":\""+description+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"keyword2\":{\n" +
				"                       \"value\":\""+uname+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"keyword3\":{\n" +
				"                       \"value\":\""+deployDate+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"remark\":{\n" +
				"                       \"value\":\"感谢您对抢帮的支持,及时登录平台进行报价\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   }\n" +
				"           }\n" +
				"       }";
		ApiResult apiResult = TemplateMsgApi.send(str);
		System.out.println(apiResult.getJson());
	}
	
	/**
	 * 发送模板消息
	 * 订单消息模版
	 */
	public static void sendOrderMsg(String openId,int orderid,String detail,String msgtype,String date,String url){
//		openId = "ouiH2wG2VMVWale7WTqhWEqIm9m0";
//		openId = "ouiH2wKaqhhmKHg2sWw2mixZAYq4";//leroy
		String str = " {\n" +
				"           \"touser\":\""+openId+"\",\n" +
				"           \"template_id\":\""+Constants.template_order+"\",\n" +
				"           \"url\":\""+url+"\",\n" +
				"           \"topcolor\":\"#FF0000\",\n" +
				"           \"data\":{\n" +
				"                   \"first\": {\n" +
				"                       \"value\":\""+detail+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"keyword1\":{\n" +
				"                       \"value\":\""+msgtype+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"keyword2\":{\n" +
				"                       \"value\":\""+date+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"remark\":{\n" +
				"                       \"value\":\"感谢您对抢帮的支持\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   }\n" +
				"           }\n" +
				"       }";
		ApiResult apiResult = TemplateMsgApi.send(str);
		System.out.println(apiResult.getJson());
	}
	
	
	/**
	 * 发送模板消息
	 * 审核通过信息模版
	 */
	public static void sendBusinessSucessMsg(String openId,String detail,String uname,String content,String date,String url){
//		openId = "ouiH2wG2VMVWale7WTqhWEqIm9m0";
//		openId = "ouiH2wKaqhhmKHg2sWw2mixZAYq4";//leroy
		String str = " {\n" +
				"           \"touser\":\""+openId+"\",\n" +
				"           \"template_id\":\""+Constants.template_business+"\",\n" +
				"           \"url\":\""+url+"\",\n" +
				"           \"topcolor\":\"#FF0000\",\n" +
				"           \"data\":{\n" +
				"                   \"first\": {\n" +
				"                       \"value\":\""+detail+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"keyword1\":{\n" +
				"                       \"value\":\""+uname+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"keyword2\":{\n" +
				"                       \"value\":\""+content+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"keyword3\":{\n" +
				"                       \"value\":\""+date+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"remark\":{\n" +
				"                       \"value\":\"感谢您对抢帮的支持\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   }\n" +
				"           }\n" +
				"       }";
		ApiResult apiResult = TemplateMsgApi.send(str);
		System.out.println(apiResult.getJson());
	}
	
	
	/**
	 * 发送模板消息
	 * 评价消息模版
	 */
	public static void sendEvaluateMsg(String openId,String detail,String from,String date,String url){
//		openId = "ouiH2wG2VMVWale7WTqhWEqIm9m0";
//		openId = "ouiH2wKaqhhmKHg2sWw2mixZAYq4";//leroy
		String str = " {\n" +
				"           \"touser\":\""+openId+"\",\n" +
				"           \"template_id\":\""+Constants.template_evaluate+"\",\n" +
				"           \"url\":\""+url+"\",\n" +
				"           \"topcolor\":\"#FF0000\",\n" +
				"           \"data\":{\n" +
				"                   \"first\": {\n" +
				"                       \"value\":\""+detail+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"keyword1\":{\n" +
				"                       \"value\":\""+from+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"keyword2\":{\n" +
				"                       \"value\":\""+date+"\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"remark\":{\n" +
				"                       \"value\":\"感谢您对抢帮的支持\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   }\n" +
				"           }\n" +
				"       }";
		ApiResult apiResult = TemplateMsgApi.send(str);
		System.out.println(apiResult.getJson());
	}
   
	
	/**
	 * 企业转账(提现)
	 */
	public static String mmpaymkttransfers(String username,String openId,double money,String tradenum){
		String mmpaymkttransfersUrl = "https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers";
		Map<String, String> params = new HashMap<String, String>();
		params.put("mch_appid", Constants.appid);
		params.put("mchid", Constants.partner);
		params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
		params.put("partner_trade_no", tradenum);
		params.put("openid", openId);//以分为单位
		
		params.put("check_name", "NO_CHECK");
//		params.put("re_user_name", "'");
		params.put("amount", (money*100)+"");
		params.put("desc", "用户"+username+"提现");
		
//		String ip = IpKit.getRealIp(getRequest());
//		if (StrKit.isBlank(ip)) {
//			ip = "127.0.0.1";
//		}
		
		String ip = "127.0.0.1";
		
		params.put("spbill_create_ip", ip);

		String sign = PaymentKit.createSign(params, Constants.paternerKey);
		params.put("sign", sign);
//		String xml = HttpUtils.post(mmpaymkttransfersUrl, PaymentKit.toXml(params));
		String xmlResult = HttpUtils.postSSL(mmpaymkttransfersUrl, PaymentKit.toXml(params), Constants.certpath, Constants.partner);
		System.out.println(xmlResult);
		return xmlResult;
	}
	
	/**
	 * 退款
	 */
	public static String refund(String paynum,double paymount){
		Map<String, String> params = new HashMap<String, String>();
		params.put("appid", Constants.appid);
		params.put("mch_id", Constants.partner);
		params.put("op_user_id", Constants.partner);
		params.put("out_refund_no", paynum);
		params.put("out_trade_no", paynum);
		params.put("total_fee", ((int)(paymount*100))+"");//以分为单位
		params.put("refund_fee", ((int)(paymount*100))+"");//以分为单位
		params.put("nonce_str", System.currentTimeMillis() + "");
		String sign = PaymentKit.createSign(params, Constants.paternerKey);
		params.put("sign", sign);
		String partner = params.get("mch_id");
		String xmlStr = HttpUtils.postSSL(PaymentApi.refundUrl, PaymentKit.toXml(params), Constants.certpath, partner);
		System.out.println(xmlStr);
		return xmlStr;
	}
	
	
	public static void main(String[] args) {
		/*PropKit.use("config.properties");
		ApiConfig ac = new ApiConfig();
		
		// 配置微信 API 相关常量
		ac.setToken(PropKit.get("token"));
		ac.setAppId(PropKit.get("appId"));
		ac.setAppSecret(PropKit.get("appSecret"));*/
		/**
		 *  是否对消息进行加密，对应于微信平台的消息加解密方式：
		 *  1：true进行加密且必须配置 encodingAesKey
		 *  2：false采用明文模式，同时也支持混合模式
		 */
		/*ac.setEncryptMessage(PropKit.getBoolean("encryptMessage", false));
		ac.setEncodingAesKey(PropKit.get("encodingAesKey", "setting it in config file"));
        ApiConfigKit.setThreadLocalApiConfig(ac);*/
        
//        sendNewTaskMsg("ouiH2wG2VMVWale7WTqhWEqIm9m0", "小胖子,你钱掉了", "小胖子", "2016-05-31 18:33",123);
//        String shopname = "小胖金铺";
//        String detail = "您好,您编号为"+10000+"的需求已找到服务商("+shopname+"),请查看您的订单详情,请保持手机畅通。";
//        sendOrderMsg("oFa_9jtMn5spWrrZu2H9KQ44MfEY", 10000, detail, "服务商投标", "2016-06-03 11:47:21","1");
       // sendNewTaskMsg("oFa_9jtMn5spWrrZu2H9KQ44MfEY", detail, "test","2016-06-03 11:47:21",10000,"1");
//        sendTkMsg("oFa_9jtMn5spWrrZu2H9KQ44MfEY", 100, detail, "20160213131231");
		
//		ServicePointManager
		
		/*String tradenum = CommonUtils.getCurrentTime(new Date())+Utility.getRandomSign();
		String xmlResult = mmpaymkttransfers("张三","ouiH2wKaqhhmKHg2sWw2mixZAYq4",100,tradenum);
		Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
		
		String return_code = result.get("return_code");
		String return_msg = result.get("return_msg");
		if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
//			renderText(return_msg);
			System.out.println(return_msg);
			return;
		}
		String result_code = result.get("result_code");
		if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
//			renderText(return_msg);
			System.out.println(return_msg);
			return;
		}*/
		
/*		String xmlResult = refund("43q2fdsfds",0.01);
		System.out.println(xmlResult);
		Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
		
		String return_code = result.get("return_code");
		String return_msg = result.get("return_msg");
		if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
			System.out.println(return_msg);
			return;
		}
		String result_code = result.get("result_code");
		if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
			System.out.println(return_msg);
			return;
		}
		System.out.println("start");*/
	}

}
