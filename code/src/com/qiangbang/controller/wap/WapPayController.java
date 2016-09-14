package com.qiangbang.controller.wap;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.jfinal.aop.Duang;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.api.PaymentApi;
import com.jfinal.weixin.sdk.api.PaymentApi.TradeType;
import com.jfinal.weixin.sdk.kit.IpKit;
import com.jfinal.weixin.sdk.kit.PaymentKit;
import com.jfinal.weixin.sdk.utils.JsonUtils;
import com.qiangbang.common.Constants;
import com.qiangbang.controller.BaseController;
import com.qiangbang.entity.Assignment;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.OrderLog;
import com.qiangbang.entity.Orders;
import com.qiangbang.entity.Refund;
import com.qiangbang.entity.Tradedetail;
import com.qiangbang.entity.Users;
import com.qiangbang.service.PushService;
import com.qiangbang.utils.ArithUtil;
import com.qiangbang.utils.CommonUtils;
import com.qiangbang.utils.Utility;

/**
  * @ClassName: WapIndexController 
  * @Description: 支付控制器 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
public class WapPayController extends BaseController{
/*	public void index(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
		Assignment assignment = Assignment.me.findById(taskId);
		
		String paytitle = assignment.getStr("title");
		String paynum = CommonUtils.getCurrentTime(new Date())+Utility.getRandomSign();//订单交易号
		double pay = assignment.getDouble("pay");
		
		HashMap<String, Object> res = new HashMap<String, Object>();
		res.put("paytitle", paytitle);
		res.put("paynum", paynum);
		res.put("pay", pay);
		setAttr("pays", res);
		render("index.jsp");
	}*/
	
	
	public void detail(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
		Assignment assignment = Assignment.me.findById(taskId);
		
		String paytitle = assignment.getStr("title");
//		String paynum = CommonUtils.getCurrentTime(new Date())+Utility.getRandomSign();//订单交易号
		String paynum = CommonUtils.getCurrentTime(new Date())+taskId;//订单交易号
		double pay = assignment.getDouble("pay");
		
		HashMap<String, Object> res = new HashMap<String, Object>();
		res.put("paytitle", paytitle);
		res.put("paynum", paynum);
		res.put("pay", pay);
		setAttr("pays", res);
		
		int a = 1;
		int b = 1;
		if(a==b){
			// openId，采用 网页授权获取 access_token API：SnsAccessTokenApi获取
			String openId = users.getStr("wxopenid");
//			String openId = "ouiH2wKaqhhmKHg2sWw2mixZAYq4";
	
			// 统一下单文档地址：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1
			
			Map<String, String> params = new HashMap<String, String>();
			params.put("appid", Constants.appid);
			params.put("mch_id", Constants.partner);
			params.put("body", paytitle);
			params.put("out_trade_no", paynum);
			int payamount = ArithUtil.mulInteger(pay, 100);
			params.put("total_fee", payamount+"");//以分为单位
			
			String ip = IpKit.getRealIp(getRequest());
			if (StrKit.isBlank(ip)) {
				ip = "127.0.0.1";
			}
			System.out.println("current ip:"+ip);
			params.put("spbill_create_ip", "127.0.0.1");
			params.put("trade_type", TradeType.JSAPI.name());
			params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
			params.put("notify_url", Constants.notify_url);
			params.put("openid", openId);
	
			String sign = PaymentKit.createSign(params, Constants.paternerKey);
			params.put("sign", sign);
			String xmlResult = PaymentApi.pushOrder(params);
			
			System.out.println(xmlResult);
			Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
			
			String return_code = result.get("return_code");
			String return_msg = result.get("return_msg");
			if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
				renderText(return_msg);
				return;
			}
			String result_code = result.get("result_code");
			if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
				renderText(return_msg);
				return;
			}
			// 以下字段在return_code 和result_code都为SUCCESS的时候有返回
			String prepay_id = result.get("prepay_id");
			
			Map<String, String> packageParams = new HashMap<String, String>();
			packageParams.put("appId", Constants.appid);
			packageParams.put("timeStamp", System.currentTimeMillis() / 1000 + "");
			packageParams.put("nonceStr", System.currentTimeMillis() + "");
			packageParams.put("package", "prepay_id=" + prepay_id);
			packageParams.put("signType", "MD5");
			String packageSign = PaymentKit.createSign(packageParams, Constants.paternerKey);
			packageParams.put("paySign", packageSign);
			
			String jsonStr = JsonUtils.toJson(packageParams);
			setAttr("json", jsonStr);
			System.out.println(jsonStr);
		}
		render("index.jsp");
	}
	
	/**
	 * 订单补差价
	  * @Title: payDiff 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public void payDiff(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
		int businessId = getParaToInt("businessId");
		Assignment assignment = Assignment.me.findById(taskId);
		
		String paytitle = assignment.getStr("title")+"-"+"补充差价";
		String paynum = CommonUtils.getCurrentTime(new Date())+taskId;//订单交易号
		double pay = Double.valueOf(getPara("pay"));
		double summoney = ArithUtil.add(assignment.getDouble("pay"), pay);//订单金额+补差金额=订单总金额(商户报价金额)
		
		HashMap<String, Object> res = new HashMap<String, Object>();
		res.put("paytitle", paytitle);
		res.put("paynum", paynum);
		res.put("pay", pay);
		res.put("sumpay", summoney);
		res.put("taskId", taskId);
		setAttr("pays", res);
		
		int a = 1;
		int b = 1;
		if(a==b){
			// openId，采用 网页授权获取 access_token API：SnsAccessTokenApi获取
			String openId = users.getStr("wxopenid");
//			String openId = "ouiH2wKaqhhmKHg2sWw2mixZAYq4";
	
			// 统一下单文档地址：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1
			
			Map<String, String> params = new HashMap<String, String>();
			params.put("appid", Constants.appid);
			params.put("mch_id", Constants.partner);
			params.put("body", paytitle);
			params.put("out_trade_no", paynum);
			int payamount = ArithUtil.mulInteger(pay, 100);
			params.put("total_fee", payamount+"");//以分为单位
			
			String ip = IpKit.getRealIp(getRequest());
			if (StrKit.isBlank(ip)) {
				ip = "127.0.0.1";
			}
			System.out.println("current ip:"+ip);
			params.put("spbill_create_ip", "127.0.0.1");
			params.put("trade_type", TradeType.JSAPI.name());
			params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
			params.put("notify_url", Constants.notifydiff_url);
			params.put("openid", openId);
	
			String sign = PaymentKit.createSign(params, Constants.paternerKey);
			params.put("sign", sign);
			String xmlResult = PaymentApi.pushOrder(params);
			
			System.out.println(xmlResult);
			Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
			
			String return_code = result.get("return_code");
			String return_msg = result.get("return_msg");
			if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
				renderText(return_msg);
				return;
			}
			String result_code = result.get("result_code");
			if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
				renderText(return_msg);
				return;
			}
			// 以下字段在return_code 和result_code都为SUCCESS的时候有返回
			String prepay_id = result.get("prepay_id");
			
			Map<String, String> packageParams = new HashMap<String, String>();
			packageParams.put("appId", Constants.appid);
			packageParams.put("timeStamp", System.currentTimeMillis() / 1000 + "");
			packageParams.put("nonceStr", System.currentTimeMillis() + "");
			packageParams.put("package", "prepay_id=" + prepay_id);
			packageParams.put("signType", "MD5");
			String packageSign = PaymentKit.createSign(packageParams, Constants.paternerKey);
			packageParams.put("paySign", packageSign);
			
			String jsonStr = JsonUtils.toJson(packageParams);
			setAttr("json", jsonStr);
			setAttr("businessId", businessId);
			System.out.println(jsonStr);
		}
		render("diffindex.jsp");
	}
	
	/**
	 * 订单再次补差价
	  * @Title: payAgainDiff 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public void payAgainDiff(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
		int businessId = getParaToInt("businessId");
		Assignment assignment = Assignment.me.findById(taskId);
		
		String paytitle = assignment.getStr("title")+"-"+"补全差价";
		String paynum = CommonUtils.getCurrentTime(new Date())+taskId;//订单交易号
		double pay = Double.valueOf(getPara("pay"));
		
		HashMap<String, Object> res = new HashMap<String, Object>();
		res.put("paytitle", paytitle);
		res.put("paynum", paynum);
		res.put("pay", pay);
		setAttr("pays", res);
		
		int a = 1;
		int b = 1;
		if(a==b){
			// openId，采用 网页授权获取 access_token API：SnsAccessTokenApi获取
			String openId = users.getStr("wxopenid");
//			String openId = "ouiH2wKaqhhmKHg2sWw2mixZAYq4";
	
			// 统一下单文档地址：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1
			
			Map<String, String> params = new HashMap<String, String>();
			params.put("appid", Constants.appid);
			params.put("mch_id", Constants.partner);
			params.put("body", paytitle);
			params.put("out_trade_no", paynum);
			int payamount = ArithUtil.mulInteger(pay, 100);
			params.put("total_fee", payamount+"");//以分为单位
			
			String ip = IpKit.getRealIp(getRequest());
			if (StrKit.isBlank(ip)) {
				ip = "127.0.0.1";
			}
			System.out.println("current ip:"+ip);
			params.put("spbill_create_ip", "127.0.0.1");
			params.put("trade_type", TradeType.JSAPI.name());
			params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
			params.put("notify_url", Constants.payagain_notify_url);
			params.put("openid", openId);
	
			String sign = PaymentKit.createSign(params, Constants.paternerKey);
			params.put("sign", sign);
			String xmlResult = PaymentApi.pushOrder(params);
			
			System.out.println(xmlResult);
			Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
			
			String return_code = result.get("return_code");
			String return_msg = result.get("return_msg");
			if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
				renderText(return_msg);
				return;
			}
			String result_code = result.get("result_code");
			if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
				renderText(return_msg);
				return;
			}
			// 以下字段在return_code 和result_code都为SUCCESS的时候有返回
			String prepay_id = result.get("prepay_id");
			
			Map<String, String> packageParams = new HashMap<String, String>();
			packageParams.put("appId", Constants.appid);
			packageParams.put("timeStamp", System.currentTimeMillis() / 1000 + "");
			packageParams.put("nonceStr", System.currentTimeMillis() + "");
			packageParams.put("package", "prepay_id=" + prepay_id);
			packageParams.put("signType", "MD5");
			String packageSign = PaymentKit.createSign(packageParams, Constants.paternerKey);
			packageParams.put("paySign", packageSign);
			
			String jsonStr = JsonUtils.toJson(packageParams);
			setAttr("json", jsonStr);
			setAttr("businessId", businessId);
			System.out.println(jsonStr);
		}
		render("againindex.jsp");
	}
	
	
	
	/**
	 * 保证金、认证费调用、充值
	 */
	public void qbpay(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int type = getParaToInt("type");
		
		String paytitle ="";
		String paynum = CommonUtils.getCurrentTime(new Date())+"qiangbang"+users.getInt("id");//订单交易号
		double pay = 0;
		String notifyURL = "";
		if(type==1){
			paytitle = "缴纳抢帮网认证费";
			pay = 300;
			notifyURL = Constants.auth_notify_url;
		} else if(type==2){
			paytitle = "缴纳抢帮网保证金";
			pay = Integer.valueOf(getPara("pay"));
			notifyURL = Constants.bail_notify_url;
		} else {
			paytitle = "账户充值";
			pay = Integer.valueOf(getPara("pay"));
			notifyURL = Constants.add_notify_url;
		}
		
		
		
		HashMap<String, Object> res = new HashMap<String, Object>();
		res.put("paytitle", paytitle);
		res.put("paynum", paynum);
		res.put("pay", pay);
		setAttr("pays", res);
		
		// openId，采用 网页授权获取 access_token API：SnsAccessTokenApi获取
		String openId = users.getStr("wxopenid");
//			String openId = "ouiH2wKaqhhmKHg2sWw2mixZAYq4";

		// 统一下单文档地址：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1
		
		Map<String, String> params = new HashMap<String, String>();
		params.put("appid", Constants.appid);
		params.put("mch_id", Constants.partner);
		params.put("body", paytitle);
		params.put("out_trade_no", paynum);
		int payamount = ArithUtil.mulInteger(pay, 100);
		params.put("total_fee", payamount+"");//以分为单位
		
		String ip = IpKit.getRealIp(getRequest());
		if (StrKit.isBlank(ip)) {
			ip = "127.0.0.1";
		}
		System.out.println("current ip:"+ip);
		params.put("spbill_create_ip", "127.0.0.1");
		params.put("trade_type", TradeType.JSAPI.name());
		params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
		params.put("notify_url", notifyURL);
		params.put("openid", openId);

		String sign = PaymentKit.createSign(params, Constants.paternerKey);
		params.put("sign", sign);
		String xmlResult = PaymentApi.pushOrder(params);
		
		System.out.println(xmlResult);
		Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
		
		String return_code = result.get("return_code");
		String return_msg = result.get("return_msg");
		if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
			renderText(return_msg);
			return;
		}
		String result_code = result.get("result_code");
		if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
			renderText(return_msg);
			return;
		}
		// 以下字段在return_code 和result_code都为SUCCESS的时候有返回
		String prepay_id = result.get("prepay_id");
		
		Map<String, String> packageParams = new HashMap<String, String>();
		packageParams.put("appId", Constants.appid);
		packageParams.put("timeStamp", System.currentTimeMillis() / 1000 + "");
		packageParams.put("nonceStr", System.currentTimeMillis() + "");
		packageParams.put("package", "prepay_id=" + prepay_id);
		packageParams.put("signType", "MD5");
		String packageSign = PaymentKit.createSign(packageParams, Constants.paternerKey);
		packageParams.put("paySign", packageSign);
		
		String jsonStr = JsonUtils.toJson(packageParams);
		setAttr("json", jsonStr);
		System.out.println(jsonStr);
		if(type==3){
			render("addindex.jsp");
		} else {
			render("authindex.jsp");
		}
	}
   
	
	public void pay() {
		Users users = (Users) getRequest().getSession().getAttribute("users");
		
		int taskId = getParaToInt("taskId");
		// openId，采用 网页授权获取 access_token API：SnsAccessTokenApi获取
		String openId = "ouiH2wKaqhhmKHg2sWw2mixZAYq4";

		// 统一下单文档地址：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1
		
		Map<String, String> params = new HashMap<String, String>();
		params.put("appid", Constants.appid);
		params.put("mch_id", Constants.partner);
		params.put("body", "test");
		String orderno = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())+"05";
		params.put("out_trade_no", orderno);
		params.put("total_fee", "100");
		
		String ip = IpKit.getRealIp(getRequest());
		if (StrKit.isBlank(ip)) {
			ip = "127.0.0.1";
		}
		System.out.println("current ip:"+ip);
		params.put("spbill_create_ip", "127.0.0.1");
		params.put("trade_type", TradeType.JSAPI.name());
		params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
		params.put("notify_url", Constants.notify_url);
		params.put("openid", openId);

		String sign = PaymentKit.createSign(params, Constants.paternerKey);
		params.put("sign", sign);
		String xmlResult = PaymentApi.pushOrder(params);
		
		System.out.println(xmlResult);
		Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
		
		String return_code = result.get("return_code");
		String return_msg = result.get("return_msg");
		if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
			renderText(return_msg);
			return;
		}
		String result_code = result.get("result_code");
		if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
			renderText(return_msg);
			return;
		}
		// 以下字段在return_code 和result_code都为SUCCESS的时候有返回
		String prepay_id = result.get("prepay_id");
		
		Map<String, String> packageParams = new HashMap<String, String>();
		packageParams.put("appId", Constants.appid);
		packageParams.put("timeStamp", System.currentTimeMillis() / 1000 + "");
		packageParams.put("nonceStr", System.currentTimeMillis() + "");
		packageParams.put("package", "prepay_id=" + prepay_id);
		packageParams.put("signType", "MD5");
		String packageSign = PaymentKit.createSign(packageParams, Constants.paternerKey);
		packageParams.put("paySign", packageSign);
		
		String jsonStr = JsonUtils.toJson(packageParams);
		setAttr("json", jsonStr);
		System.out.println(jsonStr);
		render("/jsp/pay.jsp");
	}
	
	public void pay_notify() {
		// 支付结果通用通知文档: https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7
		String xmlMsg = HttpKit.readData(getRequest());
		System.out.println("pay_notify支付通知="+xmlMsg);
		Map<String, String> params = PaymentKit.xmlToMap(xmlMsg);
		
		String result_code  = params.get("result_code");
		// 总金额
		String totalFee     = params.get("total_fee");
		// 商户订单号
		String orderId      = params.get("out_trade_no");
		// 微信支付订单号
		String transId      = params.get("transaction_id");
		// 支付完成时间，格式为yyyyMMddHHmmss
		String timeEnd      = params.get("time_end");
		
		// 注意重复通知的情况，同一订单号可能收到多次通知，请注意一定先判断订单状态
		// 避免已经成功、关闭、退款的订单被再次更新
		
		if(PaymentKit.verifyNotify(params, Constants.paternerKey)){
			if (("SUCCESS").equals(result_code)) {
				//更新订单信息
				System.out.println("更新订单信息");
				String sysOrderId = orderId.substring(14, orderId.length());
				System.out.println(orderId+"-----"+sysOrderId);
				Assignment assignment = Assignment.me.findById(Integer.valueOf(sysOrderId));
				if(assignment!=null){
					assignment.set("status", 0);
					assignment.update();
					Orders orders = Orders.me.findByOrderId(Integer.valueOf(sysOrderId));
					if(orders!=null){
						orders.set("status", 0);
						boolean oupdate = orders.update();
					}
					int uid = assignment.getInt("uid");
					Tradedetail tradedetail = new Tradedetail();
					tradedetail.set("cusid", uid);
					Users users = Users.me.findById(uid);
					tradedetail.set("money", (Double.valueOf(totalFee)/100));
					tradedetail.set("amount", users.getDouble("price"));
					tradedetail.set("type", 0);
					tradedetail.set("remark", "订单报价");
					tradedetail.set("orderid", sysOrderId);
					tradedetail.set("payorder", orderId);
					tradedetail.set("paryremark", "发布需求,托管资金");
					tradedetail.set("ctime", new Date());
					tradedetail.save();
					
					//触发推送
					PushService pushService = Duang.duang(PushService.class);
					pushService.pushNewTask(assignment);
				}
				
				Map<String, String> xml = new HashMap<String, String>();
				xml.put("return_code", "SUCCESS");
				xml.put("return_msg", "OK");
				renderText(PaymentKit.toXml(xml));
				return;
			}
		}
		renderText("");
	}
	
	public void paydiff_notify() {
		// 支付结果通用通知文档: https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7
		String xmlMsg = HttpKit.readData(getRequest());
		System.out.println("paydiff_notify支付通知="+xmlMsg);
		Map<String, String> params = PaymentKit.xmlToMap(xmlMsg);
		
		String result_code  = params.get("result_code");
		// 总金额
		String totalFee     = params.get("total_fee");
		// 商户订单号
		String orderId      = params.get("out_trade_no");
		// 微信支付订单号
		String transId      = params.get("transaction_id");
		// 支付完成时间，格式为yyyyMMddHHmmss
		String timeEnd      = params.get("time_end");
		
		// 注意重复通知的情况，同一订单号可能收到多次通知，请注意一定先判断订单状态
		// 避免已经成功、关闭、退款的订单被再次更新
		
		if(PaymentKit.verifyNotify(params, Constants.paternerKey)){
			if (("SUCCESS").equals(result_code)) {
				//更新订单信息
				System.out.println("更新订单信息");
				String sysOrderId = orderId.substring(14, orderId.length());
				System.out.println(orderId+"-----"+sysOrderId);
				Assignment assignment = Assignment.me.findById(Integer.valueOf(sysOrderId));
				if(assignment!=null){
					int uid = assignment.getInt("uid");
					Tradedetail tradedetail = new Tradedetail();
					tradedetail.set("cusid", assignment.getInt("uid"));
					Users users = Users.me.findById(uid);
					tradedetail.set("money", (Double.valueOf(totalFee)/100));
					tradedetail.set("amount", users.getDouble("price"));
					tradedetail.set("type", 0);
					tradedetail.set("remark", "订单补差");
					tradedetail.set("orderid", sysOrderId);
					tradedetail.set("payorder", orderId);
					tradedetail.set("paryremark", "发布需求,托管资金补差价");
					tradedetail.set("ctime", new Date());
					tradedetail.save();
				}
				
				Map<String, String> xml = new HashMap<String, String>();
				xml.put("return_code", "SUCCESS");
				xml.put("return_msg", "OK");
				renderText(PaymentKit.toXml(xml));
				return;
			}
		}
		renderText("");
	}
	
	
	public void authpay_notify() {
		// 支付结果通用通知文档: https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7
		String xmlMsg = HttpKit.readData(getRequest());
		System.out.println("authpay_notify支付通知="+xmlMsg);
		Map<String, String> params = PaymentKit.xmlToMap(xmlMsg);
		
		String result_code  = params.get("result_code");
		// 总金额
		String totalFee     = params.get("total_fee");
		// 商户订单号
		String orderId      = params.get("out_trade_no");
		// 微信支付订单号
		String transId      = params.get("transaction_id");
		// 支付完成时间，格式为yyyyMMddHHmmss
		String timeEnd      = params.get("time_end");
		
		// 注意重复通知的情况，同一订单号可能收到多次通知，请注意一定先判断订单状态
		// 避免已经成功、关闭、退款的订单被再次更新
		
		if(PaymentKit.verifyNotify(params, Constants.paternerKey)){
			if (("SUCCESS").equals(result_code)) {
				//更新订单信息
				System.out.println("更新订单信息");
				String sysuid = orderId.substring(23, orderId.length());
				System.out.println(sysuid+"-----"+sysuid);
				
				Business business = Business.me.findByUid(Integer.valueOf(sysuid));
				if(business!=null){
					business.set("isauth", 2);//审核中
					business.update();
				}
				
				Tradedetail tradedetail = new Tradedetail();
				tradedetail.set("cusid", sysuid);
				Users users = Users.me.findById(sysuid);
				tradedetail.set("money", (Double.valueOf(totalFee)/100));
				tradedetail.set("amount", users.getDouble("price"));
				tradedetail.set("type", 0);
				tradedetail.set("remark", "缴纳认证费");
				tradedetail.set("orderid", 0);
				tradedetail.set("payorder", orderId);
				tradedetail.set("paryremark", "缴纳认证费");
				tradedetail.set("ctime", new Date());
				tradedetail.save();
				
				Map<String, String> xml = new HashMap<String, String>();
				xml.put("return_code", "SUCCESS");
				xml.put("return_msg", "OK");
				renderText(PaymentKit.toXml(xml));
				return;
			}
		}
		renderText("");
	}
	
	
	public void bailpay_notify() {
		// 支付结果通用通知文档: https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7
		String xmlMsg = HttpKit.readData(getRequest());
		System.out.println("bailpay_notify支付通知="+xmlMsg);
		Map<String, String> params = PaymentKit.xmlToMap(xmlMsg);
		
		String result_code  = params.get("result_code");
		// 总金额
		String totalFee     = params.get("total_fee");
		// 商户订单号
		String orderId      = params.get("out_trade_no");
		// 微信支付订单号
		String transId      = params.get("transaction_id");
		// 支付完成时间，格式为yyyyMMddHHmmss
		String timeEnd      = params.get("time_end");
		
		// 注意重复通知的情况，同一订单号可能收到多次通知，请注意一定先判断订单状态
		// 避免已经成功、关闭、退款的订单被再次更新
		
		if(PaymentKit.verifyNotify(params, Constants.paternerKey)){
			if (("SUCCESS").equals(result_code)) {
				//更新订单信息
				System.out.println("更新订单信息");
				String sysuid = orderId.substring(23, orderId.length());
				System.out.println(sysuid+"-----"+sysuid);
				
				Business business = Business.me.findByUid(Integer.valueOf(sysuid));
				if(business!=null){
					business.set("isbond", 2);//进入审核中
					double bondmoney = business.getDouble("bondmoney");
					double fee = (Double.valueOf(totalFee)/100);
					business.set("bondmoney", ArithUtil.add(bondmoney, fee));
					business.update();
				}
				
				Tradedetail tradedetail = new Tradedetail();
				tradedetail.set("cusid", sysuid);
				Users users = Users.me.findById(sysuid);
				tradedetail.set("money", (Double.valueOf(totalFee)/100));
				tradedetail.set("amount", users.getDouble("price"));
				tradedetail.set("type", 0);
				tradedetail.set("remark", "缴纳保证金");
				tradedetail.set("orderid", 0);
				tradedetail.set("payorder", orderId);
				tradedetail.set("paryremark", "缴纳保证金");
				tradedetail.set("ctime", new Date());
				tradedetail.save();
				
				Map<String, String> xml = new HashMap<String, String>();
				xml.put("return_code", "SUCCESS");
				xml.put("return_msg", "OK");
				renderText(PaymentKit.toXml(xml));
				return;
			}
		}
		renderText("");
	}
	
	public void addpay_notify() {
		// 支付结果通用通知文档: https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7
		String xmlMsg = HttpKit.readData(getRequest());
		System.out.println("addpay_notify支付通知="+xmlMsg);
		Map<String, String> params = PaymentKit.xmlToMap(xmlMsg);
		
		String result_code  = params.get("result_code");
		// 总金额
		String totalFee     = params.get("total_fee");
		// 商户订单号
		String orderId      = params.get("out_trade_no");
		// 微信支付订单号
		String transId      = params.get("transaction_id");
		// 支付完成时间，格式为yyyyMMddHHmmss
		String timeEnd      = params.get("time_end");
		
		// 注意重复通知的情况，同一订单号可能收到多次通知，请注意一定先判断订单状态
		// 避免已经成功、关闭、退款的订单被再次更新
		
		if(PaymentKit.verifyNotify(params, Constants.paternerKey)){
			if (("SUCCESS").equals(result_code)) {
				//更新订单信息
				System.out.println("账户充值信息");
				String sysuid = orderId.substring(23, orderId.length());
				System.out.println(sysuid+"-----"+sysuid);
				
				Users users = Users.me.findById(sysuid);
				double money = users.getDouble("price");
				double addMoney = (Double.valueOf(totalFee)/100);//充值金额
				double amount = ArithUtil.add(money, addMoney);
				users.set("price", amount);
				users.update();
				
				
				Tradedetail tradedetail = new Tradedetail();
				tradedetail.set("cusid", sysuid);
				tradedetail.set("money", addMoney);
				tradedetail.set("amount", amount);
				tradedetail.set("type", 1);
				tradedetail.set("remark", "账户充值");
				tradedetail.set("orderid", 0);
				tradedetail.set("payorder", orderId);
				tradedetail.set("paryremark", "账户充值");
				tradedetail.set("ctime", new Date());
				tradedetail.save();
				
				Map<String, String> xml = new HashMap<String, String>();
				xml.put("return_code", "SUCCESS");
				xml.put("return_msg", "OK");
				renderText(PaymentKit.toXml(xml));
				return;
			}
		}
		renderText("");
	}
	
	/**
	  * @Title: payagain_notify 
	  * @Description: 商户再次申请补差  
	  * @return void  
	  * @throws
	 */
	public void payagain_notify() {
		// 支付结果通用通知文档: https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7
		String xmlMsg = HttpKit.readData(getRequest());
		System.out.println("payagain_notify支付通知="+xmlMsg);
		Map<String, String> params = PaymentKit.xmlToMap(xmlMsg);
		
		String result_code  = params.get("result_code");
		// 总金额
		String totalFee     = params.get("total_fee");
		// 商户订单号
		String orderId      = params.get("out_trade_no");
		// 微信支付订单号
		String transId      = params.get("transaction_id");
		// 支付完成时间，格式为yyyyMMddHHmmss
		String timeEnd      = params.get("time_end");
		
		// 注意重复通知的情况，同一订单号可能收到多次通知，请注意一定先判断订单状态
		// 避免已经成功、关闭、退款的订单被再次更新
		
		if(PaymentKit.verifyNotify(params, Constants.paternerKey)){
			if (("SUCCESS").equals(result_code)) {
				//更新订单信息
				System.out.println("更新订单信息");
				String sysOrderId = orderId.substring(14, orderId.length());
				System.out.println(orderId+"-----"+sysOrderId);
				Assignment assignment = Assignment.me.findById(Integer.valueOf(sysOrderId));
				if(assignment!=null){
					int uid = assignment.getInt("uid");
					Tradedetail tradedetail = new Tradedetail();
					tradedetail.set("cusid", assignment.getInt("uid"));
					Users users = Users.me.findById(uid);
					tradedetail.set("money", (Double.valueOf(totalFee)/100));
					tradedetail.set("amount", users.getDouble("price"));
					tradedetail.set("type", 0);
					tradedetail.set("remark", "增加交易金额");
					tradedetail.set("orderid", sysOrderId);
					tradedetail.set("payorder", orderId);
					tradedetail.set("paryremark", "商户发起补全差价");
					tradedetail.set("ctime", new Date());
					tradedetail.save();
				}
				
				Map<String, String> xml = new HashMap<String, String>();
				xml.put("return_code", "SUCCESS");
				xml.put("return_msg", "OK");
				renderText(PaymentKit.toXml(xml));
				return;
			}
		}
		renderText("");
	}
	
	
	public void paywap(){
		render("/jsp/pay.jsp");
	}
	
	
	public static void main(String[] args) {
		String openId = "ouiH2wKaqhhmKHg2sWw2mixZAYq4";

		// 统一下单文档地址：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1
		
		Map<String, String> params = new HashMap<String, String>();
		params.put("appid", Constants.appid);
		params.put("mch_id", Constants.partner);
		params.put("body", "小胖子下单");
		params.put("out_trade_no", "977773682111");
		params.put("total_fee", "1");
		
		String ip = "127.0.0.1";
		
		params.put("spbill_create_ip", ip);
		params.put("trade_type", TradeType.JSAPI.name());
		params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
		params.put("notify_url", Constants.notify_url);
		params.put("openid", openId);
		
		for (String string : params.keySet()) {
			System.out.println(string+":"+params.get(string));
		}
		
		String sign = PaymentKit.createSign(params, Constants.paternerKey);
		params.put("sign", sign);
		String xmlResult = PaymentApi.pushOrder(params);
		
		System.out.println(xmlResult);
	}
}
