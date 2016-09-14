package com.qiangbang.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.math.RandomUtils;

import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.weixin.sdk.api.ApiConfig;
import com.jfinal.weixin.sdk.api.ApiConfigKit;
import com.qiangbang.common.Constants;
import com.qiangbang.entity.Assignment;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.Category;
import com.qiangbang.entity.Evaluate;
import com.qiangbang.entity.Message;
import com.qiangbang.entity.Orders;
import com.qiangbang.entity.Pubtask;
import com.qiangbang.entity.Tradedetail;
import com.qiangbang.entity.Users;
import com.qiangbang.utils.ArithUtil;
import com.qiangbang.utils.CommonUtils;
import com.qiangbang.utils.MsgUtils;
import com.qiangbang.utils.QbPage;
import com.qiangbang.utils.QbUtils;
import com.qiangbang.utils.Utility;
import com.qiangbang.utils.WeixinUtil;

/**
  * @ClassName: PushService 
  * @Description: 推送通知 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月21日 下午4:09:30 
  *
 */
public class PushService {
	public void setApiConfig(){
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
	 * 新需求推送
	 * @param users
	 * @param assign
	 */
	public void pushNewTask(final Assignment assign){
		System.out.println("pubNewTask start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				int uid = assign.getInt("uid");
				Users users = Users.me.findById(uid);
//				String uname =users.getStr("nickname");
				String uname =users.getStr("username");
				int cateId = assign.getInt("categoryId");
				Category category = Category.me.findById(cateId);
				String deployDate = CommonUtils.formatDateEn(assign.getDate("ctime"));
				int orderId = assign.getInt("id");
//				List<Record> records = Db.find("select u.id,u.wxopenid,u.price,u.mobile,b.msgstatus,b.status from business b left join users u on b.uid=u.id where b.catename like '%"+category.getStr("categoryname")+"%' and b.uid != ?",uid);
				List<Record> records = Db.find("select u.id,u.wxopenid,u.price,u.mobile,b.msgstatus,b.cateid,b.status from business b left join users u on b.uid=u.id where b.uid != ?",uid);
				for (Record record : records) {
					String cateIds = record.getStr("cateid");
					List<String> cateList = QbUtils.convertStringToList(cateIds, ",");
					if(cateList.contains(cateId+"")){
						int status = record.getInt("status");
						int msgStatus = record.getInt("msgstatus");
						if(status==1){//审核通过
							int userid = record.getInt("id");
							try {
								Message message = new Message();
								message.set("uid", userid);
								message.set("msgtitle", "商户抢单通知");
								message.set("msgcontent", "您好，您有新的抢帮网需求，请及时抢单报价。已缴纳保证金商户在报完价后可查看用户的手机号码，提前与用户电话沟通会提高中标概率哦！活动：商户转发菜单栏上“商户专区”-“商户优惠”至微信朋友圈集满78个赞即可免费开通300元的商户认证功能。#/waptask/detail/"+orderId);
								message.set("status", 0);
								message.set("fromuid", uid);
								message.set("ctime", new Date());
								message.save();
								Constants.MSGMAP.put(userid+"", "您好，您有新的抢帮网需求，请及时抢单报价。已缴纳保证金商户在报完价后可查看用户的手机号码，提前与用户电话沟通会提高中标概率哦！活动：商户转发菜单栏上“商户专区”-“商户优惠”至微信朋友圈集满78个赞即可免费开通300元的商户认证功能。#/waptask/detailByMsg?taskId="+orderId);
								
								if(msgStatus==1){//开启短信功能
									String mobile = record.getStr("mobile");
									double price = record.getDouble("price");
									if(price>=Constants.mobile_min_money){//当余额大于0.5元 才会发送
										String templateId = Constants.mobile_new;
										if(price<=2){
											templateId = Constants.mobile_new_notprice;
										}
										boolean isSend = MsgUtils.sendNewTaskCode(mobile, templateId);
										if(isSend){
											Users buser = Users.me.findById(userid);
											double bprice = buser.getDouble("price");
											double amount = ArithUtil.sub(bprice, 0.1);
											buser.set("price", amount);
											buser.update();
											
											Tradedetail tradedetail = new Tradedetail();
											tradedetail.set("cusid", userid);
											tradedetail.set("money", 0.1);
											tradedetail.set("amount", amount);
											tradedetail.set("type", 0);
											tradedetail.set("remark", "定制短信提醒");
											tradedetail.set("orderid", 0);
											tradedetail.set("payorder", 0);
											tradedetail.set("paryremark", "用户推送新需求,发送短信");
											tradedetail.set("ctime", new Date());
											tradedetail.save();
										}
									}
								}
							} catch (Exception e) {
								e.printStackTrace();
							} finally{
								String openId = record.getStr("wxopenid");
								String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+orderId+"&uid="+userid;
								WeixinUtil.sendNewTaskMsg(openId, assign.getStr("detail"), uname, deployDate, orderId,url);
							}
						}
					}
				}
				System.out.println("pubNewTask end..................");
			}
		});
		thread.start();
	}
	
	
	/**
	 *  商户报价通知用户
	 * @param users 报价商户
	 * @param taskid
	 * @param date
	 */
	public void pushNewOrderMsg(final Business business,final int taskid, final Date date){
		System.out.println("pushNewOrderMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				String detail = "您好,您编号为"+taskid+"的需求已找到服务商("+business.getStr("shopname")+")给您报价啦！,点击此信息后即可查看服务商报价，后续可能会有更多的服务商给您联系及报价请保持手机的畅通！";
				Record record = Db.findFirst("select u.id,u.wxopenid,u.mobile from assignment a left join users u on a.uid=u.id WHERE a.id= ?",taskid);
				String openId = record.getStr("wxopenid");
				int userid = record.getInt("id");
				try {
					Message message = new Message();
					message.set("uid", userid);
					message.set("msgtitle", "订单通知");
					message.set("msgcontent", "您好,您编号为"+taskid+"的需求已找到服务商("+business.getStr("shopname")+")给您报价啦！,点击此信息后即可查看服务商报价，后续可能会有更多的服务商给您联系及报价请保持手机的畅通！#/waptask/detail/"+taskid);
					message.set("status", 0);
					message.set("fromuid", business.getInt("uid"));
					message.set("ctime", new Date());
					message.save();

					//发送短信
					int count = Pubtask.me.getPubTaskCount(taskid);
					if(count<2){
						String mobile = record.getStr("mobile");
						MsgUtils.sendCompetitiveCode(mobile);
					}
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+taskid+"&uid="+userid;
					WeixinUtil.sendOrderMsg(openId, taskid, detail, "用户选标通知", CommonUtils.formatDateEn(date),url);
				}
				System.out.println("pushNewOrderMsg end..................");
			}
		});
		thread.start();
	}
	
	
	/**
	 *  用户选单通知中标商户
	 * @param users 用户签单
	 * @param taskid
	 * @param date
	 */
	public void pushOrderChangeMsg(final Business business,final int taskid, final Date date){
		System.out.println("pushOrderChangeMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				String detail = "恭喜您，订单编号为"+taskid+"的需求竞标成功！请及时与用户取得联系。获取电话方法：点击此信息找到报价旁边的“进入选我”并点击，进入后页面右上角会有个电话标致点击后可获取用户电话号码。";
				Record record = Db.findFirst("select a.buyerId,u.wxopenid from orders a left join users u on a.sellerId=u.id WHERE a.orderid= ?",taskid);
				String openId = record.getStr("wxopenid");
				int userid = business.getInt("uid");//服务商id
				try {
					Message message = new Message();
					message.set("uid", userid);
					message.set("msgtitle", "订单通知");
					message.set("msgcontent", "恭喜您，订单编号为"+taskid+"的需求竞标成功！请及时与用户取得联系。获取电话方法：点击此信息找到报价旁边的“进入选我”并点击，进入后页面右上角会有个电话标致点击后可获取用户电话号码。#/waptask/detail/"+taskid);
					message.set("status", 0);
					message.set("fromuid", record.getInt("buyerId"));
					message.set("ctime", new Date());
					message.save();
					Constants.MSGMAP.put(userid+"", "恭喜您，订单编号为"+taskid+"的需求竞标成功！请及时与用户取得联系。获取电话方法：点击此信息找到报价旁边的“进入选我”并点击，进入后页面右上角会有个电话标致点击后可获取用户电话号码。#/waptask/detailByMsg?taskId="+taskid);
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+taskid+"&uid="+userid;
					WeixinUtil.sendOrderMsg(openId, taskid, detail, "商户中标通知", CommonUtils.formatDateEn(date),url);
				}
				System.out.println("pushOrderChangeMsg end..................");
			}
		});
		thread.start();
	}
	
	/**
	 *  用户选单通知未中标商户
	 * @param users 用户签单
	 * @param taskid
	 * @param date
	 */
	public void pushOrderChangeNotBidMsg(final Users users,final int taskid, final Date date){
		System.out.println("pushOrderChangeNotBidMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				String detail = "很遗憾，订单编号为"+taskid+"的需求被他人中标！点击此信息可查看中标服务商。提高中标方法：申请成为抢帮最高级别商户“已认证已缴保证金”，可提高用户对您的信任同时可获得抢帮网最高商户权限，查看权限方法：进入店铺设置--缴保证金--点击查看第1条说明。";
				List<Record> records = Db.find("select u.id,u.wxopenid from pubtask p left join users u on p.businessid=u.id where assignid=? and bid=0",taskid);
				for (Record record : records) {
					int userid = record.getInt("id");
					try {
						Message message = new Message();
						message.set("uid", userid);
						message.set("msgtitle", "竞标失败");
						message.set("msgcontent", "很遗憾，订单编号为"+taskid+"的需求被他人中标！点击此信息可查看中标服务商。提高中标方法：申请成为抢帮最高级别商户“已认证已缴保证金”，可提高用户对您的信任同时可获得抢帮网最高商户权限，查看权限方法：进入店铺设置--缴保证金--点击查看第1条说明。#/waptask/detail/"+taskid);
						message.set("status", 0);
						message.set("fromuid", users.getInt("id"));
						message.set("ctime", new Date());
						message.save();
						Constants.MSGMAP.put(userid+"", "很遗憾，订单编号为"+taskid+"的需求被他人中标！点击此信息可查看中标服务商。提高中标方法：申请成为抢帮最高级别商户“已认证已缴保证金”，可提高用户对您的信任同时可获得抢帮网最高商户权限，查看权限方法：进入店铺设置--缴保证金--点击查看第1条说明。#/waptask/detailByMsg?taskId="+taskid);
					} catch (Exception e) {
						e.printStackTrace();
					} finally{
						String openId = record.getStr("wxopenid");
						String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+taskid+"&uid="+userid;
						WeixinUtil.sendOrderMsg(openId, taskid, detail, "商户未中标通知", CommonUtils.formatDateEn(date),url);
					}
				}
				System.out.println("pushOrderChangeNotBidMsg end..................");
			}
		});
		thread.start();
	}

	
	/**
	 *  商户申请补差价
	 * @param users 用户签单
	 * @param taskid
	 * @param date
	 */
	public void pushBusinessAgainPayMsg(final Orders orders, final Date date){
		System.out.println("pushAgainPayMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				int taskid = orders.getInt("orderid");
				String detail = "您好,您编号为"+taskid+"的需求,服务商("+orders.getStr("sellerName")+")已经向您发起了“增加交易金额“请求，请点击此详情在“选他“里面支付";
				int sellerId = orders.getInt("sellerId");//服务商id
				int buyerId = orders.getInt("buyerId");//服务商id
				Users users = Users.me.findById(buyerId);
				String openId = users.getStr("wxopenid");
				try {
					Message message = new Message();
					message.set("uid", buyerId);
					message.set("msgtitle", "用户订单补差通知");
					message.set("msgcontent", "您好,您编号为"+taskid+"的需求,服务商("+orders.getStr("sellerName")+")已经向您发起了“增加交易金额“请求，请点击此详情在“选他“里面支付#/waptask/detail/"+taskid);
					message.set("status", 0);
					message.set("fromuid", sellerId);
					message.set("ctime", new Date());
					message.save();
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+taskid+"&uid="+buyerId;
					WeixinUtil.sendOrderMsg(openId, taskid, detail, "用户订单补差通知", CommonUtils.formatDateEn(date),url);
				}
				System.out.println("pushAgainPayMsg end..................");
			}
		});
		thread.start();
	}
	
	/**
	 * 用户补差价成功
	 * @param users 用户签单
	 * @param taskid
	 * @param date
	 */
	public void pushUserPayMsg(final Orders orders, final Date date){
		System.out.println("pushUserPayMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				int taskid = orders.getInt("orderid");
				String detail = "您好,订单编号为"+taskid+"的需求已成功支付了剩余款项，请立即查看订单详情";
				int sellerId = orders.getInt("sellerId");//服务商id
				int buyerId = orders.getInt("buyerId");//服务商id
				Users users = Users.me.findById(sellerId);
				String openId = users.getStr("wxopenid");
				try {
					Message message = new Message();
					message.set("uid", sellerId);
					message.set("msgtitle", "用户订单补差通知");
					message.set("msgcontent", "您好,订单编号为"+taskid+"的需求已成功支付了剩余款项，请立即查看订单详情#/waptask/detail/"+taskid);
					message.set("status", 0);
					message.set("fromuid", buyerId);
					message.set("ctime", new Date());
					message.save();
					Constants.MSGMAP.put(sellerId+"", "订单编号为"+taskid+"的用户需求已成功支付了剩余款项，请立即查看订单详情#/waptask/detailByMsg?taskId="+taskid);
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+taskid+"&uid="+sellerId;
					WeixinUtil.sendOrderMsg(openId, taskid, detail, "用户订单补差通知", CommonUtils.formatDateEn(date),url);
				}
				System.out.println("pushUserPayMsg end..................");
			}
		});
		thread.start();
	}
	
	
	/**
	 * 用户线下交易成功
	 * @param orders 用户签单
	 * @param date
	 */
	public void pushOfflinepayMsg(final Orders orders, final Date date){
		System.out.println("pushofflinepayMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				int taskid = orders.getInt("orderid");
				String detail = "您好,订单编号为"+taskid+"的需求用户已线下支付了剩余款项，请立即查看订单详情";
				int sellerId = orders.getInt("sellerId");//服务商id
				int buyerId = orders.getInt("buyerId");//服务商id
				Users users = Users.me.findById(sellerId);
				String openId = users.getStr("wxopenid");
				try {
					Message message = new Message();
					message.set("uid", sellerId);
					message.set("msgtitle", "用户订单补差通知");
					message.set("msgcontent", "您好,订单编号为"+taskid+"的需求用户已线下支付了剩余款项，请立即查看订单详情#/waptask/detail/"+taskid);
					message.set("status", 0);
					message.set("fromuid", buyerId);
					message.set("ctime", new Date());
					message.save();
					Constants.MSGMAP.put(sellerId+"", "订单编号为"+taskid+"的需求用户已线下支付了剩余款项，请立即查看订单详情#/waptask/detailByMsg?taskId="+taskid);
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+taskid+"&uid="+sellerId;
					WeixinUtil.sendOrderMsg(openId, taskid, detail, "用户线下交易通知", CommonUtils.formatDateEn(date),url);
				}
				System.out.println("pushofflinepayMsg end..................");
			}
		});
		thread.start();
	}
	
	/**
	 *  商户确认线下交易
	 * @param orders 确认线下交易
	 * @param date
	 */
	public void pushConfirmOfflinepayyMsg(final Orders orders, final Date date){
		System.out.println("pushConfirmOfflinepayyMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				int taskid = orders.getInt("orderid");
				String detail = "您好,您编号为"+taskid+"的需求,服务商("+orders.getStr("sellerName")+")已经确认同意线下交易，请查看订单详情。";
				int sellerId = orders.getInt("sellerId");//服务商id
				int buyerId = orders.getInt("buyerId");//服务商id
				Users users = Users.me.findById(buyerId);
				String openId = users.getStr("wxopenid");
				try {
					Message message = new Message();
					message.set("uid", buyerId);
					message.set("msgtitle", "用户订单补差通知");
					message.set("msgcontent", "您好,您编号为"+taskid+"的需求,服务商("+orders.getStr("sellerName")+")已经确认同意线下交易，请查看订单详情#/waptask/detail/"+taskid);
					message.set("status", 0);
					message.set("fromuid", sellerId);
					message.set("ctime", new Date());
					message.save();
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+taskid+"&uid="+buyerId;
					WeixinUtil.sendOrderMsg(openId, taskid, detail, "商户确认线下交易通知", CommonUtils.formatDateEn(date),url);
				}
				System.out.println("pushConfirmOfflinepayyMsg end..................");
			}
		});
		thread.start();
	}
	
	/**
	 *  商户申请确认完成
	 * @param users 用户签单
	 * @param taskid
	 * @param date
	 */
	public void pushOrderConfirmMsg(final Orders orders, final Date date){
		System.out.println("pushOrderConfirmMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				int taskid = orders.getInt("orderid");
				String detail = "您好,您编号为"+taskid+"的需求,服务商("+orders.getStr("sellerName")+")已经向您发起了订单验收请求！如您确认该服务商提供的商品或服务无误后请及时点击该订单详情里的报价旁边的“选他”--页面下拉后点击“确认验收”";
				int sellerId = orders.getInt("sellerId");//服务商id
				int buyerId = orders.getInt("buyerId");//服务商id
				Users users = Users.me.findById(buyerId);
				String openId = users.getStr("wxopenid");
				try {
					Message message = new Message();
					message.set("uid", buyerId);
					message.set("msgtitle", "用户订单验收通知");
					message.set("msgcontent", "您好,您编号为"+taskid+"的需求已经被服务商("+orders.getStr("sellerName")+")完成,请查看您的订单详情进行确认#/waptask/detail/"+taskid);
					message.set("status", 0);
					message.set("fromuid", sellerId);
					message.set("ctime", new Date());
					message.save();
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+taskid+"&uid="+buyerId;
					WeixinUtil.sendOrderMsg(openId, taskid, detail, "用户订单验收通知", CommonUtils.formatDateEn(date),url);
				}
				System.out.println("pushOrderConfirmMsg end..................");
			}
		});
		thread.start();
	}
	
	/**
	 *  用户确认已完成
	 * @param users 用户签单
	 * @param taskid
	 * @param date
	 */
	public void pushOrderFinishMsg(final Orders orders, final Date date){
		System.out.println("pushOrderFinishMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				int taskid = orders.getInt("orderid");
				String detail = "您好,订单编号为"+taskid+"的需求已经被发布人确认完成,请查看您的订单详情。";
				int sellerId = orders.getInt("sellerId");//服务商id
				int buyerId = orders.getInt("buyerId");//服务商id
				Users users = Users.me.findById(sellerId);
				String openId = users.getStr("wxopenid");
				try {
					Message message = new Message();
					message.set("uid", sellerId);
					message.set("msgtitle", "用户订单验收通知");
					message.set("msgcontent", "您好,订单编号为"+taskid+"的需求已经被发布人确认完成,请查看您的订单详情进认#/waptask/detail/"+taskid);
					message.set("status", 0);
					message.set("fromuid", buyerId);
					message.set("ctime", new Date());
					message.save();
					Constants.MSGMAP.put(sellerId+"", "订单编号为"+taskid+"的用户已经确认完成#/waptask/detailByMsg?taskId="+taskid);
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+taskid+"&uid="+sellerId;
					WeixinUtil.sendOrderMsg(openId, taskid, detail, "用户订单验收通知", CommonUtils.formatDateEn(date),url);
				}
				System.out.println("pushOrderFinishMsg end..................");
			}
		});
		thread.start();
	}
	
	
	/**
	 *  用户申请退款
	 * @param users 用户退款
	 * @param taskid
	 * @param date
	 */
	public void pushRefundMsg(final Orders orders, final Date date){
		System.out.println("pushRefundMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				int taskid = orders.getInt("orderid");
				String detail = "您好,订单编号为"+taskid+"的需求,用户申请退款,请及时与客户联系。";
				int sellerId = orders.getInt("sellerId");//服务商id
				int buyerId = orders.getInt("buyerId");//发布人id
				Users users = Users.me.findById(sellerId);
				String openId = users.getStr("wxopenid");
				try {
					Message message = new Message();
					message.set("uid", sellerId);
					message.set("msgtitle", "订单通知");
					message.set("msgcontent", "您好,订单编号为"+taskid+"的需求,用户申请退款,请查看您的订单详情查看#/waptask/detail/"+taskid);
					message.set("status", 0);
					message.set("fromuid", buyerId);
					message.set("ctime", new Date());
					message.save();
					Constants.MSGMAP.put(sellerId+"", "订单编号为"+taskid+"的用户进行申请退款,请查看订单详情#/waptask/detailByMsg?taskId="+taskid);
					
					Business business = Business.me.findByUid(sellerId);
					if(business!=null){
						int msgStatus = business.getInt("msgstatus");
						if(msgStatus==1){//开启短信功能
							String mobile = users.getStr("mobile");
							double price = users.getDouble("price");
							if(price>=Constants.mobile_min_money){//当余额大于0.5元 才会发送
								boolean isSend = MsgUtils.sendRefundCode(mobile, taskid);
								if(isSend){
									double amount = ArithUtil.sub(price, 0.1);
									users.set("price", amount);
									users.update();
									
									Tradedetail tradedetail = new Tradedetail();
									tradedetail.set("cusid", sellerId);
									tradedetail.set("money", 0.1);
									tradedetail.set("amount", amount);
									tradedetail.set("type", 0);
									tradedetail.set("remark", "定制短信提醒");
									tradedetail.set("orderid", 0);
									tradedetail.set("payorder", 0);
									tradedetail.set("paryremark", "用户申请退款,发送短信");
									tradedetail.set("ctime", new Date());
									tradedetail.save();
								}
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+taskid+"&uid="+sellerId;
					WeixinUtil.sendOrderMsg(openId, taskid, detail, "订单退款", CommonUtils.formatDateEn(date),url);
				}
				System.out.println("pushRefundMsg end..................");
			}
		});
		thread.start();
	}
	
	/**
	 *  商户确认退款
	 * @param users 确认退款
	 * @param taskid
	 * @param date
	 */
	public void pushRefundConfirmMsg(final Orders orders, final Date date){
		System.out.println("pushRefundConfirmMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				int taskid = orders.getInt("orderid");
				String detail = "您好,您编号为"+taskid+"的退款已经被服务商("+orders.getStr("sellerName")+")同意,退款申请需先经服务商同意再由抢帮网工作人员1-2工作日审核通过后才能退回您的抢帮网帐户上，请留意您抢帮网账户余额，如需提现请及时操作。";
				int sellerId = orders.getInt("sellerId");//服务商id
				int buyerId = orders.getInt("buyerId");//服务商id
				Users users = Users.me.findById(buyerId);
				String openId = users.getStr("wxopenid");
				try {
					Message message = new Message();
					message.set("uid", buyerId);
					message.set("msgtitle", "订单退款通知");
					message.set("msgcontent", "您好,您编号为"+taskid+"的退款已经被服务商("+orders.getStr("sellerName")+")同意,退款申请需先经服务商同意再由抢帮网工作人员1-2工作日审核通过后才能退回您的抢帮网帐户上，请留意您抢帮网账户余额，如需提现请及时操作#/waptask/detail/"+taskid);
					message.set("status", 0);
					message.set("fromuid", sellerId);
					message.set("ctime", new Date());
					message.save();
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+taskid+"&uid="+buyerId;
					WeixinUtil.sendOrderMsg(openId, taskid, detail, "订单退款", CommonUtils.formatDateEn(date),url);
				}
				System.out.println("pushRefundConfirmMsg end..................");
			}
		});
		thread.start();
	}
	
	/**
	 *  审核商户通过
	 * @param users 用户签单
	 * @param taskid
	 * @param date
	 */
	public void pushBusinessSucessMsg(final Users users){
		System.out.println("pushBusinessSucessMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				String detail = "恭喜您,您注册的抢帮商户资料审核通过啦!";
				try {
					int uid = users.getInt("id");
					Message message = new Message();
					message.set("uid", users.getInt("id"));
					message.set("msgtitle", "商户审核成功通知");
					message.set("msgcontent", "恭喜您,您注册的抢帮商户资料审核通过啦!#/wapact/noLoginActIndex?uid="+uid);
					message.set("status", 0);
					message.set("fromuid", 0);
					message.set("ctime", new Date());
					message.save();
					Constants.MSGMAP.put(uid+"", "恭喜您,您注册的抢帮商户资料审核通过啦!#/wapact/noLoginActIndex?uid="+uid);
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/wapact/noLoginActIndex?uid="+users.getInt("id");
					WeixinUtil.sendBusinessSucessMsg(users.getStr("wxopenid"), detail, users.getStr("mobile"), "注册资料",CommonUtils.formatDateEn(new Date()),url);
				}
				System.out.println("pushBusinessSucessMsg end..................");
			}
		});
		thread.start();
	}
	
	/**
	 *  审核商户认证费通过
	 * @param users 用户签单
	 * @param taskid
	 * @param date
	 */
	public void pushBusinessAuthMsg(final Users users){
		System.out.println("pushBusinessAuthMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				String detail = "您提交的商户认证申请费我司已经收到，现您可以享受商户认证的各种权限。认证费发票或收据会以快递的方式寄送到您的经营地址（运费到付）请注意查收。";
				try {
					int uid = users.getInt("id");
					Message message = new Message();
					message.set("uid", users.getInt("id"));
					message.set("msgtitle", "商户认证通知");
					message.set("msgcontent", "您好，提交的商户保证金本公司已经收到。现您可以享受商户最高权限。保证金收据会以快递的方式寄送到您的经营地址（运费到付）请注意查收。#/wapact/noLoginActIndex?uid="+uid);
					message.set("status", 0);
					message.set("fromuid", 0);
					message.set("ctime", new Date());
					message.save();
					Constants.MSGMAP.put(uid+"", "您好，提交的商户保证金本公司已经收到。现您可以享受商户最高权限。保证金收据会以快递的方式寄送到您的经营地址（运费到付）请注意查收。#/wapact/noLoginActIndex?uid="+uid);
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/wapact/noLoginActIndex?uid="+users.getInt("id");
					WeixinUtil.sendBusinessSucessMsg(users.getStr("wxopenid"), detail, users.getStr("mobile"), "认证费用",CommonUtils.formatDateEn(new Date()),url);
				}
				System.out.println("pushBusinessAuthMsg end..................");
			}
		});
		thread.start();
	}
	
	
	/**
	 *  审核商户保证金通过
	 * @param users 用户签单
	 * @param taskid
	 * @param date
	 */
	public void pushBusinessBondMsg(final Users users){
		System.out.println("pushBusinessBondMsg start..................");
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				String detail = "您好，提交的商户保证金本公司已经收到。现您可以享受商户最高权限。保证金收据会以快递的方式寄送到您的经营地址（运费到付）请注意查收。";
				try {
					int uid = users.getInt("id");
					Message message = new Message();
					message.set("uid", users.getInt("id"));
					message.set("msgtitle", "商户保证金通知");
					message.set("msgcontent", "您好，提交的商户保证金本公司已经收到。现您可以享受商户最高权限。保证金收据会以快递的方式寄送到您的经营地址（运费到付）请注意查收。#/wapact/noLoginActIndex?uid="+uid);
					message.set("status", 0);
					message.set("fromuid", 0);
					message.set("ctime", new Date());
					message.save();
					Constants.MSGMAP.put(uid+"", "您好，提交的商户保证金本公司已经收到。现您可以享受商户最高权限。保证金收据会以快递的方式寄送到您的经营地址（运费到付）请注意查收。#/wapact/noLoginActIndex?uid="+uid);
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/wapact/noLoginActIndex?uid="+users.getInt("id");
					WeixinUtil.sendBusinessSucessMsg(users.getStr("wxopenid"), detail, users.getStr("mobile"), "保证金费用",CommonUtils.formatDateEn(new Date()),url);
				}
				System.out.println("pushBusinessBondMsg end..................");
			}
		});
		thread.start();
	}
	
	/**
	 *  用户给商户
	 * @param users 用户签单
	 * @param taskid
	 * @param date
	 */
	public void pushEvaluateMsg(final Evaluate evaluate){
		System.out.println("pushEevaluateMsg start..................");
		if(evaluate==null){
			System.out.println("评价为空");
			return;
		}
		
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				setApiConfig();
				String detail = "您好，订单编号"+evaluate.getInt("taskid")+"为的需求用户给您的服务做出了评价，击此信息找到报价旁边的“选我”并点击。";
				int uid = evaluate.getInt("euid");//被评价人id
				Users users = Users.me.findById(uid);
				try {
					Message message = new Message();
					message.set("uid", uid);
					message.set("msgtitle", "商户保证金通知");
					message.set("msgcontent", "您好，订单编号"+evaluate.getInt("taskid")+"为的需求用户给您的服务做出了评价，击此信息找到报价旁边的“选我”并点击。##/waptask/detail/"+evaluate.getInt("taskid"));
					message.set("status", 0);
					message.set("fromuid", evaluate.getInt("uid"));//评价人id
					message.set("ctime", new Date());
					message.save();
					Constants.MSGMAP.put(uid+"", "您好，订单编号"+evaluate.getInt("taskid")+"为的需求用户给您的服务做出了评价，击此信息找到报价旁边的“选我”并点击。#/waptask/detailByMsg?taskId="+evaluate.getInt("taskid"));
				} catch (Exception e) {
					e.printStackTrace();
				} finally{
					String url = Constants.baseURL+"/waptask/noLoginDetail?taskId="+evaluate.getInt("taskid")+"&uid="+uid;
					WeixinUtil.sendEvaluateMsg(users.getStr("wxopenid"), detail,  "抢帮用户",CommonUtils.formatDateEn(new Date()),url);
				}
				System.out.println("pushEevaluateMsg end..................");
			}
		});
		thread.start();
	}
	
	public static void main(String[] args) {
		PropKit.use("config.properties");
		PushService pushService = new PushService();
		Users users = new Users();
		users.set("id", 1);
		users.set("mobile", "15107078796");
		users.set("wxopenid", "oFa_9jtMn5spWrrZu2H9KQ44MfEY");
		pushService.pushBusinessSucessMsg(users);
	}
}
