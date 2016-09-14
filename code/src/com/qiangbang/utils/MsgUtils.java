package com.qiangbang.utils;

import com.jfinal.kit.PropKit;
import com.qiangbang.common.Constants;
import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;

/**
 * @ClassName: MsgUtils 
 * @Description: 短信验证码工具类
 * @author leroy(32504251@qq.com) 
 * @date 2016年5月14日 下午3:13:33 
 */
public class MsgUtils {
	public static void sendCode(String mobile,String code){
		try {
		TaobaoClient client = new DefaultTaobaoClient(Constants.msg_url, Constants.msg_appKey, Constants.msg_appSecret);
		AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
		req.setExtend("qb");
		req.setSmsType("normal");
		req.setSmsFreeSignName("抢帮网");
		req.setSmsParamString("{\"code\":\""+code+"\",\"product\":\"抢帮网\"}");
		req.setRecNum(mobile);
		req.setSmsTemplateCode("SMS_10680889");
		AlibabaAliqinFcSmsNumSendResponse rsp = client.execute(req);
		System.out.println(mobile+":"+rsp.getBody());
		} catch (ApiException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 用户发布新需求推送
	  * @Title: sendNewTaskCode 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public static boolean sendNewTaskCode(String mobile,String templateId){
		boolean isSend = false;
		try {
			TaobaoClient client = new DefaultTaobaoClient(Constants.msg_url, Constants.msg_appKey, Constants.msg_appSecret);
			AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
			req.setExtend("qb");
			req.setSmsType("normal");
			req.setSmsFreeSignName("抢帮网");
			req.setRecNum(mobile);
			req.setSmsTemplateCode(templateId);
			AlibabaAliqinFcSmsNumSendResponse rsp = client.execute(req);
			System.out.println(mobile+":"+rsp.getBody());
			if(rsp.getErrorCode()==null&&rsp.getSubCode()==null){
				isSend = true;
			}
		} catch (ApiException e) {
			e.printStackTrace();
		}
		return isSend;
	}
	
	/**
	 * 第一个商户报价
	  * @Title: sendCompetitiveCode 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public static void sendCompetitiveCode(String mobile){
		try {
			TaobaoClient client = new DefaultTaobaoClient(Constants.msg_url, Constants.msg_appKey, Constants.msg_appSecret);
			AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
			req.setExtend("qb");
			req.setSmsType("normal");
			req.setSmsFreeSignName("抢帮网");
			req.setRecNum(mobile);
			req.setSmsTemplateCode(Constants.mobile_competitive);
			AlibabaAliqinFcSmsNumSendResponse rsp = client.execute(req);
			System.out.println(mobile+":"+rsp.getBody());
		} catch (ApiException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 *	商户审核通过
	  * @Title: sendBusinessPassCode 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public static void sendBusinessPassCode(String mobile){
		try {
			TaobaoClient client = new DefaultTaobaoClient(Constants.msg_url, Constants.msg_appKey, Constants.msg_appSecret);
			AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
			req.setExtend("qb");
			req.setSmsType("normal");
			req.setSmsFreeSignName("抢帮网");
			req.setRecNum(mobile);
			req.setSmsTemplateCode(Constants.mobile_pass);
			AlibabaAliqinFcSmsNumSendResponse rsp = client.execute(req);
			System.out.println(mobile+":"+rsp.getBody());
		} catch (ApiException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 *	商户审核失败
	  * @Title: sendBusinessNotPassCode 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public static void sendBusinessNotPassCode(String mobile,String reason){
		try {
			TaobaoClient client = new DefaultTaobaoClient(Constants.msg_url, Constants.msg_appKey, Constants.msg_appSecret);
			AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
			req.setExtend("qb");
			req.setSmsType("normal");
			req.setSmsFreeSignName("抢帮网");
			req.setSmsParamString("{\"reason\":\""+reason+"\"}");
			req.setRecNum(mobile);
			req.setSmsTemplateCode(Constants.mobile_notpass);
			AlibabaAliqinFcSmsNumSendResponse rsp = client.execute(req);
			System.out.println(mobile+":"+rsp.getBody());
		} catch (ApiException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 *	需求退款
	  * @Title: sendRefundCode 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public static boolean sendRefundCode(String mobile,int orderId){
		boolean isSend = false;
		try {
			TaobaoClient client = new DefaultTaobaoClient(Constants.msg_url, Constants.msg_appKey, Constants.msg_appSecret);
			AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
			req.setExtend("qb");
			req.setSmsType("normal");
			req.setSmsFreeSignName("抢帮网");
			req.setSmsParamString("{\"order\":\""+orderId+"\"}");
			req.setRecNum(mobile);
			req.setSmsTemplateCode(Constants.mobile_orderrefund);
			AlibabaAliqinFcSmsNumSendResponse rsp = client.execute(req);
			System.out.println(mobile+":"+rsp.getBody());
			if(rsp.getErrorCode()==null&&rsp.getSubCode()==null){
				isSend = true;
			}
		} catch (ApiException e) {
			e.printStackTrace();
		}
		return isSend;
	}
	
	public static void main(String[] args) throws Exception {
		PropKit.use("config.properties");
//		System.out.println(sendNewTaskCode("18665376656",Constants.mobile_new));
		sendCode("18665376656", "1234");
//		sendCompetitiveCode("18665376656");
	}
}
