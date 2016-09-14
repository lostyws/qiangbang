package com.qiangbang.controller.wap;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.jfinal.aop.Duang;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.qiangbang.common.Constants;
import com.qiangbang.controller.BaseController;
import com.qiangbang.entity.Assignment;
import com.qiangbang.entity.Attachment;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.Evaluate;
import com.qiangbang.entity.Message;
import com.qiangbang.entity.Tradedetail;
import com.qiangbang.entity.Users;
import com.qiangbang.service.OrderService;
import com.qiangbang.utils.CommonUtils;
import com.qiangbang.utils.MsgUtils;
import com.qiangbang.utils.QbUtils;
import com.qiangbang.utils.Utility;

/**
  * @ClassName: WapActController 
  * @Description: 微信账号设置
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
public class WapActController extends BaseController{
	public void index(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		if(users==null){
			System.out.println("wapact index session usess is null");
			redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx042031f85a80d192&redirect_uri=http://qb.qq12306.cn/wapIndex/wxcallBack&response_type=code&scope=snsapi_base&state=2#wechat_redirect");
			return;
		}
		int uid = users.getInt("id");
		int utype = users.getInt("utype");
		int msgCount = Message.me.getMsgCount(uid);
		HashMap<String, Integer> resMap = Assignment.me.getOrderCountMap(uid);
		resMap.put("msgCount", msgCount);
		setAttr("res", resMap);
		setAttr("isbusiness", utype>1?1:0);
		Business business = Business.me.findByUid(uid);
		Users newUsers = Users.me.findById(uid);
		if(users.getDouble("price")!=newUsers.getDouble("price")){//更新session的的值
			getRequest().getSession().setAttribute("users", newUsers);
		}
		setAttr("users", newUsers);
		setAttr("business", business==null?new Business():business);
//		Constants.MSGMAP.put(uid+"", "用户test发布了需求，您可进行报价竞标#/waptask/detailByMsg?taskId="+10063);
		render("my.jsp");
		/*
		if(utype==1||utype==0){//utype==0说明新用户没注册，没有发布
			render("my.jsp");
		} else {
			OrderService orderService = Duang.duang(OrderService.class);
			Business business = Business.me.findByUid(uid);
			int noComprcount = 0;
			if(business!=null){
				String categoryId = business.getStr("cateid");
				noComprcount = orderService.getNoCompritiveCount(uid, categoryId);
			}
			setAttr("noComprcount", noComprcount);
			render("sellmy.jsp");
		}*/
	}
	
	public void noLoginActIndex(){
		int uid =getParaToInt("uid");
		Users users = (Users) getRequest().getSession().getAttribute("users");
		if(users==null){
			users = Users.me.findById(uid);
			if(users==null){
				System.out.println("current users is null......");
				render("null.jsp");
				return;
			}
			getRequest().getSession().setAttribute("users", users);
		}
		int utype = users.getInt("utype");
		int msgCount = Message.me.getMsgCount(uid);
		HashMap<String, Integer> resMap = Assignment.me.getOrderCountMap(uid);
		resMap.put("msgCount", msgCount);
		setAttr("res", resMap);
		setAttr("isbusiness", utype>1?1:0);
		Business business = Business.me.findByUid(uid);
		Users newUsers = Users.me.findById(uid);
		if(users.getDouble("price")!=newUsers.getDouble("price")){//更新session的的值
			getRequest().getSession().setAttribute("users", newUsers);
		}
		setAttr("users", newUsers);
		setAttr("business", business==null?new Business():business);
		render("my.jsp");
	}
	
	public void getUserOrder(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int uid = users.getInt("id");
    	int status = getParaToInt("typevalue");
//    	Page<Tradedetail> pages = Tradedetail.me.paginateAdmin(start, length);
    	OrderService orderService = Duang.duang(OrderService.class);
    	List<Record> assignments = orderService.findAllAssign(uid,status);
    	HashMap<String, Object> dataMap = new HashMap<String, Object>();
    	dataMap.put("page",1);
    	dataMap.put("total",1);
    	dataMap.put("total_page",1);
    	dataMap.put("code",assignments.size()>0?0:1);
    	dataMap.put("list",assignments);
    	renderJson(dataMap);
	}
	
	/**
	 * 去往消息中心页面
	 */
	public void goMsg(){
		render("/view/wap/user/message.jsp");
	}
	
	/**
	 * 获取消息列表
	 */
	public void getMsgList(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int uid = users.getInt("id");
    	int start = getParaToInt("page");
    	int length = getParaToInt("pageSize");
    	start = start==0?1:(start/length)+1;
    	Page page = Message.me.paginate(start, length, uid);
    	HashMap<String, Object> dataMap = new HashMap<String,Object>();
    	dataMap.put("message", page.getList());
    	dataMap.put("total", page.getTotalRow());
    	HashMap<String, Object> resMap = new HashMap<String,Object>();
    	resMap.put("data", dataMap);
    	resMap.put("status", 0);
    	renderJson(resMap);
	}
	
	/**
	 * 读取消息
	 */
	public void readMsg(){
		int mid = getParaToInt("messageId");
		System.out.println(mid);
		Message.me.findById(mid).set("status", 1).update();
		renderSuccess();
	}
	
	
	
	public void getBusinessOrder(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int uid = users.getInt("id");
    	int status = getParaToInt("typevalue");
//    	Page<Tradedetail> pages = Tradedetail.me.paginateAdmin(start, length);
    	OrderService orderService = Duang.duang(OrderService.class);
    	List<Record> assignments = null;
    	if (status == 0 || status ==3) {//待选标
    		assignments = orderService.findBusinessAssign(uid,status);
		} else if (status ==4){//未中标
			assignments = orderService.findBusinessNotAssign(uid,status);
		}else {
			//我报价被选标的
			assignments = orderService.findBaoJiaAssign(uid,status);
		}
    	HashMap<String, Object> dataMap = new HashMap<String, Object>();
    	dataMap.put("page",1);
    	dataMap.put("total",1);
    	dataMap.put("total_page",1);
    	dataMap.put("code",0);
    	dataMap.put("list",assignments);
    	renderJson(dataMap);
	}
	
	public void goAccountSet(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int utype =users.getInt("utype");
		render("meset.jsp");
		/*if(utype==1||utype==0){
			render("meset.jsp");
		} else {
			int uid = users.getInt("id");
			Business business = Business.me.findByUid(uid);
			Record record = Evaluate.me.findAvgService(uid);
			double avgService = 0;
			double avgSpeed = 0;
			double avgQuality = 0;
			
			HashMap<String, Object> res = new HashMap<String, Object>();
			res.put("allavg", 0);
			if(record!=null){
				BigDecimal serv = record.getBigDecimal("serv");
				avgService = serv == null?0:serv.doubleValue();
				BigDecimal speed = record.getBigDecimal("speed");
				avgSpeed = speed == null?0:speed.doubleValue();
				BigDecimal qua = record.getBigDecimal("qua");
				avgQuality = qua == null?0:qua.doubleValue();
				
				double allavg = avgService+avgSpeed+avgQuality;
				if(allavg>0){
					res.put("allavg", allavg/3);
				}
			}
			
			
			setAttr("res", res);
			setAttr("business", business);
			render("set.jsp");
		}*/
	}
	
	public void goMyAddress(){
		setAttr("type", getParaToInt());//1.用户 2.商户
		render("myaddress.jsp");
	}
	
	public void saveAddress(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int uid = users.getInt("id");
		int type = getParaToInt("type");
		String shipaddress = getPara("shipaddress");
		Users newUser = Users.me.findById(uid);
		newUser.set("shipaddress", shipaddress);
		boolean res = newUser.update();
		if(res){
			users.set("shipaddress", shipaddress);
			renderSuccess("/wapact/goAccountSet");
//			if(type==1){
//			} else {
//				renderSuccess("/wapact/goBusinessSet");
//			}
		} else {
			renderFaild("更新失败");
		}
	}
	
	public void goSetPwd(){
		render("password.jsp");
	}
	
	public void changepassword(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String oldPassword = getPara("oldPassword");
		String password = getPara("password");
		if(!Utility.MD5(oldPassword).equals(users.getStr("password"))){
			renderFaild("原密码有误,请重新输入");
			return;
		}
		Users oldUsers = Users.me.findById(users.getInt("id"));
		oldUsers.set("password", Utility.MD5(password));
		boolean update = oldUsers.update();
		if(update){
			users.set("password", Utility.MD5(password));
			renderSuccess("/wapact/goAccountSet");
		} else {
			renderFaild("修改失败");
		}
	}
	
	public void goUpdateShopName(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		Business business = Business.me.findByUid(users.getInt("id"));
		setAttr("business", business);
		render("shopname.jsp");
	}
	
	public void updateShopName(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String shopname = getPara("shopname");
		Business business = Business.me.findByUid(users.getInt("id"));
		business.set("shopname", shopname);
		boolean update = business.update();
		if(update){
			renderSuccess("/wapact/goAccountSet");
		} else {
			renderFaild("修改失败");
		}
	}
	
	public void goDescription(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		Business business = Business.me.findByUid(users.getInt("id"));
		setAttr("business", business);
		render("shopdescribe.jsp");
	}
	
	public void updateDescription(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String describeText = getPara("describeText");
		Business business = Business.me.findByUid(users.getInt("id"));
		business.set("shopcontent", describeText);
		boolean update = business.update();
		if(update){
			renderSuccess("/shop/goShopSet");
		} else {
			renderFaild("修改失败");
		}
	}
	
	public void goShopLogo(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		Business business = Business.me.findByUid(users.getInt("id"));
		setAttr("business", business);
		render("shopicon.jsp");
	}
	
	public void updateShopLogo(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String shopicon = getPara("shopicon");
		boolean update = false;
		if(StringUtils.isNotBlank(shopicon)){
			String aid = shopicon.substring(shopicon.lastIndexOf("=")+1);
			Attachment.me.findById(aid).set("status", "1").update();
			
			Business business = Business.me.findByUid(users.getInt("id"));
			business.set("shopicon", shopicon);
			
			update = business.update();
		}		
		if(update){
			renderSuccess("/shop/goShopSet");
		} else {
			renderFaild("修改失败");
		}
	}
	
	
	/**
	 * 我的余额明细
	 */
	public void goMybalance(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		List<Tradedetail> trades = Tradedetail.me.getTradeByUid(users.getInt("id"));
		setAttr("trades", trades);
		render("mybalance.jsp");
	}
	
	/**
	 * 用户申请提现金额
	 */
	public void applyBanlance(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int money = getParaToInt("value");//提现金额
		int currentPrice = users.getInt("price");
		if(money>currentPrice){
			renderFaild("提现金额大于当前余额");
		}
		
		
		
	}
	
	/**
	  * @Title: goAddMoney 
	  * @Description: 充值页面  
	  * @return void  
	  * @throws
	 */
	public void goAddMoney(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		render("addmoney.jsp");
	}
	
	/**
	  * @Title: noticeMsgOpen 
	  * @Description: 短信通知开启  
	  * @return void  
	  * @throws
	 */
	public void noticeMsgOpen(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int note = getParaToInt("note");
		Business business = Business.me.findByUid(users.getInt("id"));
		boolean update = false;
		if(business!=null){
			if(note==1){
				if(users.getDouble("price")>1){
					business.set("msgstatus", note);
					update = business.update();
				} else {
					renderFaild("账户余额不足");
					return;
				}
			} else {
				business.set("msgstatus", 0);
				update = business.update();
			}
		}
		if(update){
			renderSuccess();
		} else {
			renderFaild("开启失败");
		}
	}
	
	public void goUpdatePwd(){
		render("findpwd1.jsp");
	}
	
	public void firstValidateMobile(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String phone = getPara("phone");
		
		if(!users.getStr("mobile").equals(phone)){
			renderFaild("手机号不匹配,请重新填写");
			return;
		}
		if(StringUtils.isNotBlank(phone)){
			boolean flag = true;
			String time = Constants.SMS_CODE.get(phone+"_time");
			if(StringUtils.isNotBlank(time)){
				if(CommonUtils.getNowDatetime()-Integer.parseInt(time)<60){
					flag = false;
				} else {
					//如果超过60秒,清除缓存
					Constants.SMS_CODE.remove(phone+"_code");
					Constants.SMS_CODE.remove(phone+"_time");
				}
			}
			if(flag){
				String code = Constants.SMS_CODE.get(phone+"_code");
				if(!StringUtils.isNotBlank(code)){
					code = QbUtils.getRandomInt(6);
//					code = "111111";
					Constants.SMS_CODE.put(phone+"_code", code);
				}
				Constants.SMS_CODE.put(phone+"_time", String.valueOf(CommonUtils.getNowDatetime()));
				
				MsgUtils.sendCode(phone, code);
				if(QbUtils.getOSID()==1){
//					MsgUtils.sendCode(tel, code);
				}
//				result = "0";//短信验证码发送成功
				System.out.println("验证码："+code);
			}else{
				System.out.println("发送频率过快");//发送时间频率过快
			}
		}
		renderSuccess("验证手机号成功");
	}
	
	public void goUpdatePwd2(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		setAttr("mobile", users.getStr("mobile"));
		render("findpwd2.jsp");
	}
	
	public void updatepwd(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String phone = getPara("phone");
		String password = getPara("password");
		String code = getPara("securityCode");
		
		
		if(StringUtils.isBlank(code)){
			renderFaild("验证码错误");
			return;
		}
		
		String session_code = Constants.SMS_CODE.get(phone+"_code");
		if(!code.equals(session_code)){
			renderFaild("验证码错误");
			return;
		}
		
		Users newUser = Users.me.findById(users.getInt("id"));
		newUser.set("password", Utility.MD5(password));
		boolean res = newUser.update();
		if(res){
			Constants.SMS_CODE.remove(phone+"_code");
			Constants.SMS_CODE.remove(phone+"_time");
			users.set("password", Utility.MD5(password));
			renderSuccess();
		} else {
			renderFaild("更新失败");
		}
	}
}
