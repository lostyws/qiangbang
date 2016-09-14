package com.qiangbang.controller.wap;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.aop.Duang;
import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.weixin.sdk.kit.PaymentKit;
import com.qiangbang.common.Constants;
import com.qiangbang.controller.BaseController;
import com.qiangbang.entity.Assignment;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.Category;
import com.qiangbang.entity.Evaluate;
import com.qiangbang.entity.Message;
import com.qiangbang.entity.OrderLog;
import com.qiangbang.entity.Orders;
import com.qiangbang.entity.Pubtask;
import com.qiangbang.entity.Refund;
import com.qiangbang.entity.Tradedetail;
import com.qiangbang.entity.Users;
import com.qiangbang.service.CategoryService;
import com.qiangbang.service.PushService;
import com.qiangbang.service.UserService;
import com.qiangbang.utils.ArithUtil;
import com.qiangbang.utils.CommonUtils;
import com.qiangbang.utils.QbUtils;
import com.qiangbang.utils.Utility;
import com.qiangbang.utils.WeixinUtil;

/**
  * @ClassName: WapTaskController 
  * @Description: 任务控制器
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
public class WapTaskController extends BaseController{
	public void goDeploy(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		UserService userService = Duang.duang(UserService.class);
		int isreg = userService.isRegisterUser(users)?1:0;
		String shipaddress = "";
		setAttr("isreg", isreg);
		if (isreg==1) {
			String mobile = users.getStr("mobile");
			mobile = mobile.replaceAll("(\\d{3})\\d{4}(\\d{4})","$1****$2");
			setAttr("mobile", mobile);
			shipaddress = users.getStr("shipaddress");
		}
		setAttr("shipaddress", shipaddress);
		render("pub/step1.jsp");
	}
	
	/**
	  * @Title: goChooseCategory 
	  * @Description: 发布需求选择分类  
	  * @return void  
	  * @throws
	 */
	public void goChooseCategory(){
		CategoryService categoryService = Duang.duang(CategoryService.class);
		Map dataMap = categoryService.getWapSearchCategory();
		setAttr("categoryMap", dataMap);
		render("pub/selectclassify.jsp");
	}
	
	/**
	 * 发布需求
	  * @Title: depleyTask 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public void depleyTask(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		
		UserService userService = Duang.duang(UserService.class);
		if(!userService.isRegisterUser(users)){//用户没有注册
			String tel = getPara("modifyphone");
			String qbtoken = getPara("qbtoken");
			String code = getPara("modifyphone-yzm");
			String session_code = Constants.SMS_CODE.get(tel+"_code");
			if(!code.equals(session_code)){
				renderWapFaild("1003","验证码错误");
				return;
			}
			Constants.SMS_CODE.remove(tel+"_code");
			Constants.SMS_CODE.remove(tel+"_time");
		}
		
		double amount = Double.valueOf(getPara("amount"));
		int cateId = getParaToInt("categoryId");
		String title = getPara("title");
		String detail = getPara("content");
		
		if(!empty(detail)){
			detail = detail.replace("\n", "");
		}
		
		String shipaddress = getPara("shipaddress");
		
		if(!QbUtils.isValidate(detail)){
			renderWapFaild("1005","您发布的需求包含不合法字符!");
			return;
		}
		
		if(!empty(shipaddress)){
			users.set("shipaddress", shipaddress);
			users.update();
		}
		
		Assignment assignment = new Assignment();
		Date date = new Date();
		int uid = users.getInt("id");
		assignment.set("categoryId", cateId);
		assignment.set("title", title);
		assignment.set("detail", detail);
		//保留两位小数
	    BigDecimal bg = new BigDecimal(amount);  
        double deployPay = bg.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue(); 
		assignment.set("pay", deployPay);
		assignment.set("uid", uid);
		assignment.set("status", 4);//待支付
//		assignment.set("status", 0);//待支付
		assignment.set("ctime", date);
		boolean save = assignment.save();
		int taskId = assignment.getInt("id");
		if(save){
			Orders orders = new Orders();
			orders.set("orderid", taskId);
			orders.set("buyerId", uid);
			orders.set("price", amount);
			orders.set("buyerName", users.getStr("nickname"));
			orders.set("status", 4);//待支付
//			orders.set("status", 0);//待支付
			orders.set("ctime", date);
			boolean osave = orders.save();
//			PushService pushService = Duang.duang(PushService.class);
//			pushService.pushNewTask(assignment);
			
		}
		
		HashMap<String, Object> res = new HashMap<String, Object>();
		renderWapSuccess("/wappay/detail?taskId="+taskId);
	}
	
	/**
	 * 订单详情页
	 */
	public void detail(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt();
		int uid = users.getInt("id");
		int utype = users.getInt("utype");//用户类型
		
		Assignment assignment = Assignment.me.findById(taskId);
		int status = assignment.getInt("status");
		if(status==3){
			render("null.jsp");
			return;
		}
		assignment.set("status", Assignment.me.getStatus(status));
		int current_uid = assignment.getInt("uid").intValue();//发起用户id
		Users deployUsers = Users.me.findById(current_uid);
		int self = current_uid==uid?1:0;//1.是任务发起人  0。不是
		int isgowork = status==0?1:0;;//是否可以点击工作台
		int bid = (status!=0&&status!=4)?1:0; //是否竞标成功
		int competitive = 0;//是否可报价
		int evalCount = 0;//是否评价过改订单
		
		
		
		List<Pubtask> pubtasks = new ArrayList<Pubtask>();
		int evaluid = 0;
		if(bid==1){//已经被竞标
			Orders order = Orders.me.findByOrderId(taskId);
			if(self==1){
				//任务发起人是用户,通过order查看竞标人是谁，再查看竞标详情
				evaluid = order.getInt("sellerId");
				isgowork = 1;
				pubtasks = Pubtask.me.findServiceTaskByUidAndAssId(taskId, order.getInt("sellerId"));//该用户是否竞价
			} else {
				isgowork = order.getInt("sellerId").intValue()==uid?1:0;
				evaluid = uid;
				pubtasks = Pubtask.me.findServiceTaskByUidAndAssId(taskId, order.getInt("sellerId"));
			}
			evalCount = Evaluate.me.getEvaluateCount(taskId, uid);
		} else {
			isgowork = 1;
			if(self==1){
				pubtasks = Pubtask.me.findServiceTaskByAssId(taskId);
			} else {
				pubtasks = Pubtask.me.findServiceTaskByUidAndAssId(taskId, uid);
				if(pubtasks.size()<1){
					competitive = 1;
				}
			}
		}
		
		setAttr("task", assignment);//当前任务
		setAttr("taskstatus", status);//当前任务状态
		setAttr("services", pubtasks);//报价列表,已经竞标只需查询已经竞标的
		setAttr("evaluid", evaluid);//被评价人id
		setAttr("evalCount", evalCount);//是否评价过
		setAttr("competitive", competitive);//是否可以报价
		setAttr("isself", self);//是否是任务发起人
		setAttr("isgowork", isgowork);//是否可以点击工作台
		setAttr("deployUsers", deployUsers);//发起人对象
		
		
		render("details.jsp");
	}
	
	/**
	 * 订单详情页
	 */
	public void detailByMsg(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
		int uid = users.getInt("id");
		int utype = users.getInt("utype");//用户类型
		Integer frommsg = users.getInt("from");//是否是从消息提醒里面进入
		if(frommsg!=null&&frommsg.intValue()==1){
			if(Constants.MSGMAP.containsKey(uid+"")){
				Constants.MSGMAP.remove(uid+"");
			}
		}
		
		Assignment assignment = Assignment.me.findById(taskId);
		int status = assignment.getInt("status");
		if(status==3){
			render("null.jsp");
			return;
		}
		assignment.set("status", Assignment.me.getStatus(status));
		
		int current_uid = assignment.getInt("uid").intValue();//发起用户id
		Users deployUsers = Users.me.findById(current_uid);
		int self = current_uid==uid?1:0;//1.是任务发起人  0。不是
		int isgowork = status==0?1:0;;//是否可以点击工作台
		int bid = (status!=0&&status!=4)?1:0; //是否竞标成功
		int competitive = 0;//是否可报价
		int evalCount = 0;//是否评价过改订单
		
		
		
		List<Pubtask> pubtasks = new ArrayList<Pubtask>();
		int evaluid = 0;
		if(bid==1){//已经被竞标
			Orders order = Orders.me.findByOrderId(taskId);
			if(self==1){
				//任务发起人是用户,通过order查看竞标人是谁，再查看竞标详情
				evaluid = order.getInt("sellerId");
				isgowork = 1;
				pubtasks = Pubtask.me.findServiceTaskByUidAndAssId(taskId, order.getInt("sellerId"));//该用户是否竞价
			} else {
				isgowork = order.getInt("sellerId").intValue()==uid?1:0;
				evaluid = uid;
				pubtasks = Pubtask.me.findServiceTaskByUidAndAssId(taskId, order.getInt("sellerId"));
			}
			evalCount = Evaluate.me.getEvaluateCount(taskId, uid);
		} else {
			isgowork = 1;
			if(self==1){
				pubtasks = Pubtask.me.findServiceTaskByAssId(taskId);
			} else {
				pubtasks = Pubtask.me.findServiceTaskByUidAndAssId(taskId, uid);
				if(pubtasks.size()<1){
					competitive = 1;
				}
			}
		}
		
		setAttr("task", assignment);//当前任务
		setAttr("taskstatus", status);//当前任务状态
		setAttr("services", pubtasks);//报价列表,已经竞标只需查询已经竞标的
		setAttr("evaluid", evaluid);//被评价人id
		setAttr("evalCount", evalCount);//是否评价过
		setAttr("competitive", competitive);//是否可以报价
		setAttr("isself", self);//是否是任务发起人
		setAttr("isgowork", isgowork);//是否可以点击工作台
		setAttr("deployUsers", deployUsers);//发起人对象
		render("details.jsp");
	}
	
	
	/**
	 * 微信通知进入订单详情页
	 */
	public void noLoginDetail(){
		int taskId = getParaToInt("taskId");
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
		
		int utype = users.getInt("utype");//用户类型
		
		Assignment assignment = Assignment.me.findById(taskId);
		int status = assignment.getInt("status");
		if(status==3){
			render("null.jsp");
			return;
		}
		assignment.set("status", Assignment.me.getStatus(status));
		
		int current_uid = assignment.getInt("uid").intValue();//发起用户id
		Users deployUsers = Users.me.findById(current_uid);
		int self = current_uid==uid?1:0;//1.是任务发起人  0。不是
		int isgowork = status==0?1:0;;//是否可以点击工作台
		int bid = (status!=0&&status!=4)?1:0; //是否竞标成功
		int competitive = 0;//是否可报价
		int evalCount = 0;//是否评价过改订单
		
		List<Pubtask> pubtasks = new ArrayList<Pubtask>();
		int evaluid = 0;
		if(bid==1){//已经被竞标
			Orders order = Orders.me.findByOrderId(taskId);
			if(self==1){
				isgowork = 1;
				//任务发起人是用户,通过order查看竞标人是谁，再查看竞标详情
				evaluid = order.getInt("sellerId");
				pubtasks = Pubtask.me.findServiceTaskByUidAndAssId(taskId, order.getInt("sellerId"));//该用户是否竞价
			} else {
				evaluid = uid;
				isgowork = order.getInt("sellerId").intValue()==uid?1:0;
				pubtasks = Pubtask.me.findServiceTaskByUidAndAssId(taskId, order.getInt("sellerId"));
			}
			evalCount = Evaluate.me.getEvaluateCount(taskId, uid);
		} else {
			if(self==1){
				isgowork = 1;
				pubtasks = Pubtask.me.findServiceTaskByAssId(taskId);
			} else {
				pubtasks = Pubtask.me.findServiceTaskByUidAndAssId(taskId, uid);
				if(pubtasks.size()<1){
					competitive = 1;
				}
			}
		}
		
		setAttr("task", assignment);//当前任务
		setAttr("taskstatus", status);//当前任务状态
		setAttr("services", pubtasks);//报价列表,已经竞标只需查询已经竞标的
		setAttr("evaluid", evaluid);//被评价人id
		setAttr("evalCount", evalCount);//是否评价过
		setAttr("competitive", competitive);//是否可以报价
		setAttr("isself", self);//是否是任务发起人
		setAttr("isgowork", isgowork);//是否可以点击工作台
		setAttr("deployUsers", deployUsers);//发起人对象
		render("details.jsp");
	}
	
	
	/**
	 * 关闭需求地址
	  * @Title: goNull 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public void goNull(){
		render("null.jsp");
	}
	
	
	/**
	 * 进入顾问协作
	 */
	public void goConsultant(){
		render("/view/wap/hire/toConnectionPage.jsp");
	}
	
	/**
	 * 进入评价
	 */
	public void goEvaluate(){
		int taskId = getParaToInt("taskId");
		int type = getParaToInt("type");//1.买家评价卖家 2.卖家评价买家
//		int salerId = getParaToInt("salerId");
		Orders orders = Orders.me.findByOrderId(taskId);
		setAttr("orders", orders);
		if(type==1){
			render("/view/wap/evaluate/toseller.jsp");
		} else {
			render("/view/wap/evaluate/tobuyer.jsp");
		}
	}
	
	
	/**
	 * 评价
	 */
	public void evaluate(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int uid = users.getInt("id");//评价人Id
		int score = getParaToInt("score");//0(差评) 1(中评) 2(好评)
		int taskId = getParaToInt("taskId");
		int salerId = getParaToInt("salerId");//被评价人id
		int attitude = getParaToInt("attitude");
		int speed = getParaToInt("speed");
		int quality = getParaToInt("quality");
		String impressions = getPara("impressions");
		String comment = getPara("comment");
		String imgList = getPara("imgList");
		
		int count = Evaluate.me.getEvaluateCount(taskId, uid);
		if(count>0){
			renderWapFaild("您已经评价过该订单");
			return;
		}
		
		Evaluate evaluate = new Evaluate();
		evaluate.set("uid", uid);
		evaluate.set("type", 1);
		evaluate.set("score", score);
		evaluate.set("content", comment);
		evaluate.set("service", attitude);
		evaluate.set("speed", speed);
		evaluate.set("quality", quality);
		evaluate.set("euid", salerId);
		evaluate.set("taskid", taskId);
		evaluate.set("imgs", imgList);
		evaluate.set("impressions", impressions);
		evaluate.set("ctime", new Date());
		evaluate.save();
		
		//触发推送
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushEvaluateMsg(evaluate);
		renderSuccess("/waptask/detail/"+taskId);
		
		renderWapSuccess();
	}
	
	/**
	 * 商户评价客户
	 */
	public void evaluateUser(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int uid = users.getInt("id");//评价人Id
		int taskId = getParaToInt("taskId");
		int salerId = getParaToInt("salerId");//被评价人id
		int attitude = getParaToInt("attitude");
		int speed = getParaToInt("speed");
		int quality = getParaToInt("quality");
		String comment = getPara("comment");
		String imgList = getPara("imgList");
		
		int count = Evaluate.me.getEvaluateCount(taskId, uid);
		if(count>0){
			renderWapFaild("您已经评价过该订单");
			return;
		}
		
		Evaluate evaluate = new Evaluate();
		evaluate.set("uid", uid);
		evaluate.set("type", 0);
		evaluate.set("score", 0);
		evaluate.set("content", comment);
		evaluate.set("service", attitude);
		evaluate.set("speed", speed);
		evaluate.set("quality", quality);
		evaluate.set("euid", salerId);
		evaluate.set("taskid", taskId);
		evaluate.set("imgs", imgList);
		evaluate.set("ctime", new Date());
		evaluate.save();
		renderWapSuccess();
	}
	
	
	/**
	 * 进入关闭需求
	 */
	public void goCloseTask(){
		render("close.jsp");
	}
	
	/**
	 * 进入关闭需求
	 */
	public void closeTask(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId =  getParaToInt("taskId");
		String reason = getPara("reason");
		
		Assignment assignment = Assignment.me.findById(taskId);
		Tradedetail tradeDetail = Tradedetail.me.findTradeDetailByTaskId(taskId);
		if(assignment!=null&&assignment.getInt("status")!=3){
			if(tradeDetail!=null){
				String xmlResult = WeixinUtil.refund(tradeDetail.getStr("payorder"), tradeDetail.getDouble("money"));
				Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
				
				String return_code = result.get("return_code");
	//			String return_msg = result.get("return_msg");
				String err_code_des = result.get("err_code_des");
				if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
					renderWapFaild(err_code_des);
					return;
				}
				assignment = Assignment.me.findById(taskId);
				
				assignment.set("status", 3);
				assignment.set("reason", reason);//取消原因
				assignment.update();
	
				Orders orders = Orders.me.findByOrderId(taskId);
				orders.set("status", 3);
				orders.update();
				
				Tradedetail newTrade = new Tradedetail();
				newTrade.set("cusid", tradeDetail.getInt("cusid"));
				newTrade.set("money", tradeDetail.getDouble("money"));
				if(users!=null){
					newTrade.set("amount", users.getDouble("price"));
				}
				newTrade.set("type", 1);
				newTrade.set("remark", "订单关闭");
				newTrade.set("orderid", taskId);
				newTrade.set("payorder", tradeDetail.getStr("payorder"));
				newTrade.set("paryremark", "订单关闭,退款成功,退回微信余额");
				newTrade.set("ctime", new Date());
				newTrade.save();
			}
		}
		renderWapSuccess("关闭成功");
	}
	
	/**
	 * 进入报价页面
	 */
	public void goCompetitive(){
		int taskId = getParaToInt();
		Assignment assignment = Assignment.me.findById(taskId);
		setAttr("task", assignment);
		render("competitive.jsp");
	}
	
	
	/**
	 * 报价
	 */
	public void competitive(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int uid = users.getInt("id");
		int taskId = getParaToInt("taskid");
		
		Business business = Business.me.findByUid(uid);
		String shopname = business.getStr("shopname");
		if(empty(shopname)){
			renderFaild(-2,"请完善您的店铺信息");
			return;
		}
		
/*		int competitiveCount = Pubtask.me.getTodayPubTask(uid);//今天报价次数
		boolean iscompetitive = true;
		//未认证未缴纳保证金的 2次
		if(business.getInt("isauth")!=1&&business.getInt("isbond")!=1){
			if(competitiveCount>=2){
				iscompetitive =false;
			}
		} else if(business.getInt("isauth")==1&&business.getInt("isbond")!=1){//已认证未缴纳保证金的 6次
			if(competitiveCount>=6){
				iscompetitive =false;
			}
		}
		if(!iscompetitive){
			renderFaild(-2,"您今天的报价次数已经超过限制.");
			return;
		}*/
		
		if(Pubtask.me.getPubTaskCount(taskId, uid)>0){
			renderFaild("您已经竞价过该需求。");
			return;
		}
		String content = getPara("content");
		String moneyStr = getPara("money");
		double money = 0;
		if(!empty(moneyStr)){
			money = Double.valueOf(moneyStr);
		}
		Date date = new Date();
		Pubtask pubtask = new Pubtask();
		pubtask.set("assignid", taskId);
		pubtask.set("businessid", uid);
		pubtask.set("busmoney", money);
		pubtask.set("describe", content);
		pubtask.set("bid", 0);
		pubtask.set("ctime",date);
		boolean issave = pubtask.save();
		if(issave){
			//触发推送
			PushService pushService = Duang.duang(PushService.class);
			pushService.pushNewOrderMsg(business,taskId,date);
			renderSuccess("/waptask/detail/"+taskId);
		} else {
			renderFaild("竞价失败。");
		}
	}
	
	/**
	 * 进入工作台
	 */
	public void goWorkBench(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int utype = users.getInt("utype");
		int taskId = getParaToInt("taskId");
		int sellId = getParaToInt("sellId");
		int callPhone = 0;//是否可以查看手机号码
		
		Assignment assignment = Assignment.me.findById(taskId);
		boolean isself = users.getInt("id").equals(assignment.getInt("uid"));//判断当前用户是否是发布人
		
		if(isself){//发布人查看详情
			Business business = Business.me.findUserInfoByUid(sellId);//卖家id
			Pubtask pubtask = Pubtask.me.findBusinessTask(taskId, sellId);
			Evaluate evaluate = Evaluate.me.findEvaByTaskIdAndEUid(taskId, sellId);
			
			/*List<Evaluate> evaluates = Evaluate.me.findEvaluateByTaskId(taskId);
			Evaluate evaluateData = null;
			int isEvaluate = 0;//是否评价过
			for (Evaluate evaluate : evaluates) {
				int uid = evaluate.getInt("uid");
				int euid = evaluate.getInt("euid");
				if(euid==users.getInt("id")){
					evaluateData = evaluate;
				}
				if(uid==users.getInt("id")){
					isEvaluate = 1;
				}
			}*/
			if(business.getInt("isbond")==1&&business.getInt("isauth")==1){
				callPhone = 1;
			} else {
				int status = pubtask.getInt("status");
				if(status==1||status==2||status==5||status==6||status==7||status==8){
					if(pubtask.getInt("bid")==1){
						callPhone = 1;
					}
				}
			}
			
			setAttr("business", business);
			setAttr("pubtask", pubtask);
			setAttr("evaluate", evaluate);
			if(evaluate!=null){
				String imgs = evaluate.getStr("imgs");
				String[] imgarray = {};
				if(imgs!=null&&imgs.length()>0){
					imgarray = imgs.split(",");
				}
				setAttr("imgs", imgarray);
			}
			setAttr("callPhone", callPhone);
//			setAttr("evaluate", evaluateData==null?new Evaluate():evaluateData);
//			setAttr("isEvaluate", isEvaluate);
			render("/view/wap/bid/workBench.jsp");
		} else {//卖家登录查看详情
			Users qusers = Users.me.findById(sellId);//发布人id
			int businessId = users.getInt("id");
			Pubtask pubtask = Pubtask.me.findBusinessTask(taskId, businessId);
			
/*			List<Evaluate> evaluates = Evaluate.me.findEvaluateByTaskId(taskId);
			Evaluate evaluateData = null;
			int isEvaluate = 0;//是否评价过
			for (Evaluate evaluate : evaluates) {
				int uid = evaluate.getInt("uid");
				int euid = evaluate.getInt("euid");
				if(euid==users.getInt("id")){
					evaluateData = evaluate;
				}
				if(uid==users.getInt("id")){
					isEvaluate = 1;
				}
			}*/
			
//			Evaluate evaluate = Evaluate.me.findEvaByTaskIdAndEUid(taskId,sellId);//查看买家评价
			
			Evaluate evaluate = Evaluate.me.findEvaByTaskIdAndEUid(taskId,businessId);//查看卖家评价
			
			Business business = Business.me.findByUid(businessId);//获取服务商信息
			if(business.getInt("isbond")==1&&business.getInt("isauth")==1){
				callPhone = 1;
			} else {
				int status = pubtask.getInt("status");
				if(status==1||status==2||status==5||status==6||status==7||status==8){
					if(pubtask.getInt("bid")==1){
						callPhone = 1;
					}
				}
			}
			
//			setAttr("evaluate", evaluateData==null?new Evaluate():evaluateData);
//			setAttr("isEvaluate", isEvaluate);
			setAttr("evaluate", evaluate);
			if(evaluate!=null){
				String imgs = evaluate.getStr("imgs");
				String[] imgarray = {};
				if(imgs!=null&&imgs.length()>0){
					imgarray = imgs.split(",");
				}
				setAttr("imgs", imgarray);
			}
			setAttr("users", qusers);
			setAttr("callPhone", callPhone);
			setAttr("pubtask", pubtask);
			String enickname = QbUtils.decodeNickName(qusers.getStr("enickname"));
			setAttr("nickname", "".equals(enickname)?qusers.getStr("nickname"):enickname);
			render("/view/wap/bid/bworkBench.jsp");
		}
	}
	
	/**
	 * 选择服务商签单
	 */
	public void signing(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
		int businessId = getParaToInt("businessId");
		Assignment assignment = Assignment.me.findById(taskId);
		
		Pubtask pubtask = Pubtask.me.findPubTaskByOrdreIdAndUid(taskId, businessId);
		
		double deployPay = assignment.getDouble("pay");
		double busmoney = pubtask.getDouble("busmoney");
		//发布金额小于报价金额，需要补差价
		if(deployPay<busmoney){
			double pay = ArithUtil.sub(busmoney,deployPay);
	    	Map<String, Object> result = new HashMap<String, Object>();
			result.put("success", true);
			result.put("href", "/wappay/payDiff?taskId="+taskId+"&pay="+pay+"&businessId="+businessId);
			result.put("data", "订单补差价");
			renderJson(result);
			return;
		}
		
		Date date = new Date();
		assignment.set("status", 1);
		assignment.set("signtime", date);
		assignment.update();
		
		pubtask.set("bid", 1);
		pubtask.update();
		
		Orders orders = Orders.me.findByOrderId(taskId);
		Business business = Business.me.findByUid(businessId);
		orders.set("status", 1);
		orders.set("sellerName", business.getStr("shopname"));
		orders.set("sellerId", businessId);
		orders.set("price", pubtask.getDouble("busmoney"));
		orders.update();
		
		if(deployPay>busmoney){
			Users dusers = Users.me.findById(users.getInt("id"));
			double pay = ArithUtil.sub(deployPay,busmoney);
			double money = dusers.getDouble("price");
			double amount = ArithUtil.add(pay, money);
			dusers.set("price", amount);
			dusers.update();
			
			//更新session
			users.set("price", amount);
			
			Tradedetail tradedetail = new Tradedetail();
			tradedetail.set("cusid", users.getInt("id"));
			tradedetail.set("money", pay);
			tradedetail.set("amount", amount);
			tradedetail.set("type", 1);
			tradedetail.set("remark", "多退少补");
			tradedetail.set("orderid", taskId);
			tradedetail.set("payorder", 0);
			tradedetail.set("paryremark", "订单完成,金额到账");
			tradedetail.set("ctime", new Date());
			tradedetail.save();
		}
		
		//触发推送
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushOrderChangeMsg(business,taskId,date);
		
		pushService.pushOrderChangeNotBidMsg(users, taskId, date);
		
		renderWapSuccess();
	}
	
	
	/**
	 * 选择服务商签单---订单补交差价签单
	 */
	public void signingdiff(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String payorder = getPara("paynum");
		int businessId = getParaToInt("businessId");
		
		Tradedetail detail = Tradedetail.me.findTradeDetailByPayOrder(payorder);
		if(detail==null){
			System.out.println("签单失败");
			redirect("/waptask/goWorkBench?taskId=");
			return;
		}
		
		int taskId = detail.getInt("orderid");
		
		Assignment assignment = Assignment.me.findById(taskId);
		
		Pubtask pubtask = Pubtask.me.findPubTaskByOrdreIdAndUid(taskId, businessId);
		
		Date date = new Date();
		assignment.set("status", 1);
		assignment.set("signtime", date);
		assignment.update();
		
		pubtask.set("bid", 1);
		pubtask.update();
		
		Orders orders = Orders.me.findByOrderId(taskId);
		Business business = Business.me.findByUid(businessId);
		orders.set("status", 1);
		orders.set("sellerName", business.getStr("shopname"));
		orders.set("sellerId", businessId);
		orders.set("price", pubtask.getDouble("busmoney"));
		orders.update();
		
		//触发推送
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushOrderChangeMsg(business,taskId,date);
		
		pushService.pushOrderChangeNotBidMsg(users, taskId, date);
		
		redirect("/waptask/goWorkBench?taskId="+taskId+"&sellId="+businessId);
	}
	
	
	/**
	 * 进入商户申请补差价页面
	 */
	public void goPosAgainPay(){
		Assignment assignment = Assignment.me.findById(getParaToInt());
		setAttr("task", assignment);
		render("postageagain.jsp");
	}
	
	/**
	 * 商户申请补差价
	 */
	public void bussinessAgainPay(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskid");
		Assignment assignment = Assignment.me.findById(taskId);
		
		Date date = new Date();
		String content = getPara("content");
		String moneyStr = getPara("money");
		double money = 0;
		if(!empty(moneyStr)){
			money = Double.valueOf(moneyStr);
		}
		assignment.set("againpay", money);//申请补差金额
		assignment.set("againreason", content);//申请补差描述
		assignment.set("applypaytime", date);//申请确认时间
		assignment.update();
		
		Orders orders = Orders.me.findByOrderId(taskId);
		//触发推送
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushBusinessAgainPayMsg(orders,date);
		renderSuccess("/waptask/goWorkBench?taskId="+taskId+"&sellId="+orders.getInt("buyerId"));
	}
	
	/**
	 * 用户同意补全差价
	 */
	public void againPostPay(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
		int businessId = getParaToInt("businessId");
		Assignment assignment = Assignment.me.findById(taskId);
		double pay = assignment.getDouble("againpay");
    	Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		result.put("href", "/wappay/payAgainDiff?taskId="+taskId+"&pay="+pay+"&businessId="+businessId);
		result.put("data", "订单补差价");
		renderJson(result);
	}
	
	/**
	 * 用户补全差价成功
	 */
	public void payAgainMoney(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String payorder = getPara("paynum");
		int businessId = getParaToInt("businessId");
		
		Tradedetail detail = Tradedetail.me.findTradeDetailByPayOrder(payorder);

		int taskId = detail.getInt("orderid");
		
		Assignment assignment = Assignment.me.findById(taskId);
		Date date = new Date();
		assignment.set("paytime", date);
		assignment.update();
		
		Orders orders = Orders.me.findByOrderId(taskId);
		
		//触发推送
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushUserPayMsg(orders,date);
		
		redirect("/waptask/goWorkBench?taskId="+taskId+"&sellId="+businessId);
	}
	
	
	/**
	 * 商户申请确认完成
	 */
	public void businessConfirm(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
		Assignment assignment = Assignment.me.findById(taskId);
		
		Date date = new Date();
		assignment.set("status", 5);
		assignment.set("applytime", new Date());//申请确认时间
		assignment.update();

		Orders orders = Orders.me.findByOrderId(taskId);
		orders.set("status", 5);
		orders.update();
		
		
		
		//触发推送
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushOrderConfirmMsg(orders,date);
		
		renderWapSuccess();
	}
	
	/**
	 * 用户确认已完成
	 */
	public void confirmFinish(){
		Users session_users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
//		int businessId = getParaToInt("sellId");
		Assignment assignment = Assignment.me.findById(taskId);
		
		Date date = new Date();
		assignment.set("status", 2);
		assignment.set("tradtime", date);
		assignment.update();

		Orders orders = Orders.me.findByOrderId(taskId);
		orders.set("status", 2);
		orders.update();
		
		int sellerId = orders.getInt("sellerId");
		Users users = Users.me.findById(sellerId);
		double price = orders.getDouble("price");//订单金额
		
		Category category = Category.me.findById(assignment.getInt("categoryId"));
		double yprice = category.getDouble("price");//类别佣金
		double percent = category.getDouble("percent");//类别佣金百分比
		
		//佣金+(订单金额*佣金百分比)
		if(percent>0){
			double mulprice = ArithUtil.mul(price, percent);
			double perprice = mulprice/100;
			yprice = ArithUtil.add(yprice, perprice);
		}
		//订单金额-佣金=商户得到的钱
		double finsihPrice = ArithUtil.sub(price, yprice);//商户得到的金额
		
		double addPay = assignment.getDouble("againpay");//订单后面增加的差价
		//订单金额-佣金金额+后面补差价的金额
		if(addPay>0){
			finsihPrice = ArithUtil.add(finsihPrice, addPay);
		}
		
		double money = users.getDouble("price");
		double amount = ArithUtil.add(finsihPrice, money);//增加后金额
		users.set("price", amount);
		users.update();
		
		if(session_users!=null){
			session_users.set("price", amount);
		}
		
		Tradedetail tradedetail = new Tradedetail();
		tradedetail.set("cusid", sellerId);
		tradedetail.set("money", finsihPrice);
		tradedetail.set("amount", amount);
		if(addPay>0){
			tradedetail.set("msg", "增加交易"+addPay+"元");
		}
		tradedetail.set("type", 1);
		tradedetail.set("remark", "订单完成");
		tradedetail.set("orderid", taskId);
		tradedetail.set("payorder", 0);
		tradedetail.set("paryremark", "订单完成,金额到账");
		tradedetail.set("ctime", new Date());
		tradedetail.save();
		
		//触发推送
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushOrderFinishMsg(orders,date);
		
		renderWapSuccess();
	}
	
	/**
	 * 进入关闭需求
	 */
	public void goRefund(){
		render("refund.jsp");
	}
	
	
	/**
	 * 用户申请退款
	 */
	public void refund(){
//		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
		String reason = getPara("reason");
		Assignment assignment = Assignment.me.findById(taskId);
		
		Date date = new Date();
		assignment.set("status", 6);
		assignment.set("reason", reason);
		assignment.set("refundtime", date);
		assignment.update();

		Orders orders = Orders.me.findByOrderId(taskId);
		orders.set("status", 6);
		orders.update();
		
		//触发推送
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushRefundMsg(orders,date);
		
		renderWapSuccess();
	}
	
	/**
	 * 商户确认退款
	 */
	public void confirmfund(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
		Assignment assignment = Assignment.me.findById(taskId);
		
		Date date = new Date();
		assignment.set("status", 7);
		assignment.set("crefundtime", date);
		assignment.update();

		Orders orders = Orders.me.findByOrderId(taskId);
		orders.set("status", 7);
		orders.update();
		
		double price = orders.getDouble("price");
		double addPay = assignment.getDouble("againpay");//订单后面增加的差价
		//订单金额+后面补差价的金额
		if(addPay>0){
			price = ArithUtil.add(price, addPay);
		}
		
		Users rusers = Users.me.findById(orders.getInt("buyerId"));//申请用户id
		Refund refund = new Refund();
		refund.set("orderNumber", CommonUtils.getCurrentTime(new Date())+taskId);
		refund.set("userName", rusers.getStr("nickname"));
		refund.set("userId", rusers.getInt("id"));
		refund.set("money", price);
		refund.set("type", 2);
		refund.set("status", 1);
		refund.set("ctime", new Date());
		refund.save();
			
		
		//触发推送
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushRefundConfirmMsg(orders,date);
		
		renderWapSuccess();
	}
	
	/**
	 * 用户提现接口
	 */
	public void withdraw(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String value = getPara("value");//提现金额
		double money = 0;
		if(users.getDouble("price")==null||users.getDouble("price")==0){
			renderFaild("抱歉，您的账号余额为0。");
			return;
		}
		
		if(empty(value)){
			renderFaild("金额错误.");
			return;
		}
		money = Double.valueOf(value);
		
		if(money>users.getDouble("price")){
			renderFaild("提现金额不能大于账户余额");
			return;
		}
		
		Refund refund = new Refund();
		String orderNum = CommonUtils.getCurrentTime(new Date())+Utility.getRandomSign();
		refund.set("orderNumber", orderNum);
		refund.set("userName", users.getStr("nickname"));
		refund.set("userId", users.getInt("id"));
		refund.set("money", money);
		refund.set("type", 4);
		refund.set("status", 1);
		refund.set("ctime", new Date());
		refund.save();
		
		double umoney = ArithUtil.sub(users.getDouble("price"), money);
		users.set("price", umoney);
		users.update();
		
		Tradedetail tradedetail = new Tradedetail();
		tradedetail.set("cusid", users.getInt("id"));
		tradedetail.set("money", money);
		tradedetail.set("amount", umoney);
		tradedetail.set("type", 2);
		tradedetail.set("remark", "处理中");
		tradedetail.set("orderid", 0);
		tradedetail.set("payorder", orderNum);
		tradedetail.set("paryremark", "申请提现,后台审核处理");
		tradedetail.set("ctime", new Date());
		tradedetail.save();
		
		renderSuccess();
	}
	
	/**
	  * @Title: offlinepay 
	  * @Description: 线下交易  
	  * @return void  
	  * @throws
	 */
	public void offlinepay(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
		int businessId = getParaToInt("bussinessId");
		String paymoneyStr = getPara("paymoney");
		double paymoney = 0;
		if(!empty(paymoneyStr)){
			paymoney = Double.valueOf(paymoneyStr);
		}
		Date date = new Date();
		Assignment assignment = Assignment.me.findById(taskId);
		assignment.set("status", 9);
		assignment.set("offlinepay", paymoney);
		assignment.set("offlinetime", new Date());
		assignment.update();

		Pubtask pubtask = Pubtask.me.findPubTaskByOrdreIdAndUid(taskId, businessId);
		
		Orders orders = Orders.me.findByOrderId(taskId);
		orders.set("status", 9);
		Business business = Business.me.findByUid(businessId);
		orders.set("sellerName", business.getStr("shopname"));
		orders.set("sellerId", businessId);
		orders.set("price", pubtask.getDouble("busmoney"));
		orders.update();
		orders.update();
		
		//触发推送
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushOfflinepayMsg(orders,date);
		//触发推送
		renderSuccess();
	}
	
	/**
	 * 商户确认线下交易
	 */
	public void confirmOffline(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int taskId = getParaToInt("taskId");
		Assignment assignment = Assignment.me.findById(taskId);
		
		Date date = new Date();
		assignment.set("status", 1);
		assignment.set("signtime", date);
		assignment.set("cofflinetime", date);
		assignment.update();

		Orders orders = Orders.me.findByOrderId(taskId);
		orders.set("status", 1);
		orders.update();
		
		Pubtask pubtask = Pubtask.me.findPubTaskByOrdreIdAndUid(taskId, orders.getInt("sellerId"));
		pubtask.set("bid", 1);
		pubtask.update();
		
		//触发推送
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushConfirmOfflinepayyMsg(orders,date);
		
		Users deployUsers = Users.me.findById(orders.getInt("buyerId"));
		pushService.pushOrderChangeNotBidMsg(deployUsers, taskId, date);
		//触发推送
		renderWapSuccess();
	}
	
	public void goStart(){
		render("start.jsp");
	}
	
	public void taskValdate(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int orderId = getParaToInt("orderid");
		Orders orders = Orders.me.findByOrderId(orderId);
		if(orders!=null){
			int sellerId = orders.getInt("sellerId");
			if(users.getInt("id")==sellerId){
				Assignment.me.findById(orderId).set("starttime", new Date()).update();
				renderSuccess("/waptask/detail/"+orderId);
			}
		}
		renderSuccess("/waptask/detail/"+orderId);
		System.out.println("验证失败");
	}
	
	
	public void goDeploySucess(){
		render("success.jsp");
	}
	
	public static void main(String[] args) {
//		 Map<Integer, String> orderLogMap = new HashMap<Integer, String>();
//		 orderLogMap.put(1, "123");
//		 orderLogMap.put(2, "223");
//		 orderLogMap.put(3, "323");
//		 System.out.println(orderLogMap.get(4));
		
		double yprice = 0;//佣金
		double percent = 0;//佣金百分比
		
		//佣金+(订单金额*佣金百分比)
		if(percent>0){
			double mulprice = ArithUtil.mul(3, percent);
			double perprice = mulprice/100;
			yprice = ArithUtil.add(yprice, perprice);
		}
		//订单金额-佣金=商户得到的钱
		double finsihPrice = ArithUtil.sub(3, yprice);
		double money = 0;
		double amount = ArithUtil.add(finsihPrice, money);
		System.out.println(finsihPrice+":"+amount);
		System.out.println("我".hashCode());
	}
}
