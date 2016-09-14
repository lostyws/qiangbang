package com.qiangbang.controller.wap;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.jfinal.aop.Duang;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.qiangbang.common.Constants;
import com.qiangbang.controller.BaseController;
import com.qiangbang.entity.Attachment;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.Evaluate;
import com.qiangbang.entity.Users;
import com.qiangbang.service.CategoryService;
import com.qiangbang.service.UserService;
import com.qiangbang.utils.Utility;
import com.qiangbang.vo.CategoryVo;

/**
  * @ClassName: UserController 
  * @Description: 微信端商户注册 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
public class BusinessController extends BaseController{
	public void index(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		if(users==null){
			System.out.println("business index session usess is null");
			redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx042031f85a80d192&redirect_uri=http://qb.qq12306.cn/wapIndex/wxcallBack&response_type=code&scope=snsapi_base&state=2#wechat_redirect");
			return;
		}
		UserService userService = Duang.duang(UserService.class);
		int uid = users.getInt("id");
		int count =userService.getBusCount(uid);//最近交易
		double busamount =userService.getBusSumPrice(uid);//最近收入
		Business business = Business.me.findByUid(uid);
		
		Record record = Evaluate.me.findAvgService(uid);
		double avgService = 0;
		double avgSpeed = 0;
		double avgQuality = 0;
		int sum = 0;
		int goodper = 0;
		
//		Constants.MSGMAP.put(uid+"","欢迎登录抢帮商户后台!");

		HashMap<String, Object> res = new HashMap<String, Object>();
		if(record!=null){
			BigDecimal serv = record.getBigDecimal("serv");
			avgService = serv == null?0:serv.doubleValue();
			BigDecimal speed = record.getBigDecimal("speed");
			avgSpeed = speed == null?0:speed.doubleValue();
			BigDecimal qua = record.getBigDecimal("qua");
			avgQuality = qua == null?0:qua.doubleValue();
			
			res.put("avgService", avgService);
			res.put("avgSpeed", avgSpeed);
			res.put("avgQuality", avgQuality);
			
			double allavg = avgService+avgSpeed+avgQuality;
			if(allavg>0){
				res.put("allavg", allavg/3);
			} else {
				res.put("allavg", 0);
			}
			
			Long esum = record.getLong("esum");
			sum = esum == null?0:esum.intValue();
			Long good = record.getLong("good");
			goodper = good == null?0:good.intValue();
			if(sum==0||goodper==0){
				res.put("goodpercent", 0);
			} else {
				res.put("goodpercent", ((goodper/sum)*100));
			}
		}
		setAttr("res", res);
		
		
		
		setAttr("count", count);
		setAttr("busamount", busamount);
		setAttr("business", business);
		setAttr("evalrec", record);
		setAttr("isself", 1);
		render("shop/index.jsp");
	}
	
	/**
	 * 从订单详情过来，用户查看商户店铺
	 */
	public void shopDetail(){
		UserService userService = Duang.duang(UserService.class);
		int uid = getParaToInt();
		int count =userService.getBusCount(uid);//最近交易
		double busamount =userService.getBusSumPrice(uid);//最近收入
		Business business = Business.me.findByUid(uid);
		
		Record record = Evaluate.me.findAvgService(uid);
		double avgService = 0;
		double avgSpeed = 0;
		double avgQuality = 0;
		int sum = 0;
		int goodper = 0;
		HashMap<String, Object> res = new HashMap<String, Object>();
		if(record!=null){
			BigDecimal serv = record.getBigDecimal("serv");
			avgService = serv == null?0:serv.doubleValue();
			BigDecimal speed = record.getBigDecimal("speed");
			avgSpeed = speed == null?0:speed.doubleValue();
			BigDecimal qua = record.getBigDecimal("qua");
			avgQuality = qua == null?0:qua.doubleValue();
			
			res.put("avgService", avgService);
			res.put("avgSpeed", avgSpeed);
			res.put("avgQuality", avgQuality);
			
			double allavg = avgService+avgSpeed+avgQuality;
			if(allavg>0){
				res.put("allavg", allavg/3);
			} else {
				res.put("allavg", 0);
			}
			
			Long esum = record.getLong("esum");
			sum = esum == null?0:esum.intValue();
			Long good = record.getLong("good");
			goodper = good == null?0:good.intValue();
			if(sum==0||goodper==0){
				res.put("goodpercent", 0);
			} else {
				res.put("goodpercent", ((goodper/sum)*100));
			}
		}
		setAttr("res", res);
		setAttr("count", count);
		setAttr("busamount", busamount);
		setAttr("business", business);
		setAttr("evalrec", record);
		setAttr("isself", 0);
		render("shop/index.jsp");
	}
	
	/**
	 * 进入店铺设置
	  * @Title: goShopSet 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public void goShopSet(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
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
		render("shop/set.jsp");
	}
	
	
	public void shopList(){
		String cateId  = getPara();
		UserService userService = Duang.duang(UserService.class);
		setAttr("businessData", userService.getShopList(cateId));
		render("shop/list.jsp");
	}
	
	public void shopParentList(){
		String cateId  = getPara();//大类别id
		UserService userService = Duang.duang(UserService.class);
		setAttr("businessData", userService.getParentShopList(cateId));
		render("shop/list.jsp");
	}
   
	public void goNormalUser(){
		CategoryService categoryService = Duang.duang(CategoryService.class);
		List<CategoryVo> categoryVos = categoryService.getBusinessCategory();
		setAttr("categorys", categoryVos);
		render("user/personreg.jsp");
	}
	
	public void goShopUser(){
		CategoryService categoryService = Duang.duang(CategoryService.class);
		List<CategoryVo> categoryVos = categoryService.getBusinessCategory();
		setAttr("categorys", categoryVos);
		render("user/shopreg.jsp");
	}
	
	
	public void goRegSucess(){
		render("/view/wap/user/regsuccess.jsp");
	}
	
	/**
	 *  普通商户注册
	  * @Title: normalBusinessReg 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public void normalBusinessReg(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String tel = getPara("tel");
		String code = getPara("code");
		
		
		if(StringUtils.isBlank(code)){
			renderWapFaild("1001", "验证码错误");
			return;
		}
		
		String session_code = Constants.SMS_CODE.get(tel+"_code");
		if(!code.equals(session_code)){
			renderWapFaild("1001", "验证码错误");
			return;
		}
		
		Users oldUsers = Users.me.findUserByMobile(tel);
		if(oldUsers!=null){
			renderWapFaild("1002", "该用户已经存在");
			return;
		}
		
		String password = getPara("password");
		String idcard = getPara("icard");
		
		String qbtoken = getPara("qbtoken");
		users.set("username", "m_"+Utility.getRandomString(10));
		users.set("password", Utility.MD5(password));
		users.set("idcard", idcard);
		users.set("mobile", tel);
		users.set("utype", 2);
		users.set("status", 1);
		users.set("ctime", new Date());
		boolean update = users.update();
		if(update){
			String shoptypeJson = getPara("shoptypeJson");//分类id,以逗号隔开
			String shoptypeName = getPara("shoptypename");//分类名称,以逗号隔开
			String name = getPara("name");//真实姓名
//			String contactway =  getPara("contactway");
			Business business = Business.me.findByUid(users.getInt("id"));
			boolean isSave = false;
			if(business==null){
				isSave = true;
				business = new Business();
				business.set("uid", users.getInt("id"));
				business.set("ctime", new Date());
			}
			business.set("cateid", shoptypeJson);
			business.set("catename", shoptypeName);
			business.set("truename", name);
			business.set("bossname", name);
			business.set("shopname", name);
			business.set("status", 0);
			if(isSave){
				business.save();
			} else {
				business.update();
			}
			
			String idCardFront = getPara("identityCardFront");
			String idCardBack = getPara("identityCardBack");
			if(StringUtils.isNotBlank(idCardFront)){
				String aid = idCardFront.substring(idCardFront.lastIndexOf("=")+1);
				Attachment.me.findById(aid).set("status", "1").update();
			}
			if(StringUtils.isNotBlank(idCardBack)){
				String aid = idCardBack.substring(idCardBack.lastIndexOf("=")+1);
				Attachment.me.findById(aid).set("status", "1").update();
			}
//			Db.update("update attachment set status=1 where id in (?)", paras);
		}
		
		Constants.SMS_CODE.remove(tel+"_code");
		Constants.SMS_CODE.remove(tel+"_time");
		
		renderWapSuccess("/shop/goRegSucess");
	}
	
	/**
	 * 个体商户注册
	  * @Title: singleBusinessReg 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public void singleBusinessReg(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String tel = getPara("tel");
		String code = getPara("code");
		
		if(StringUtils.isBlank(code)){
			renderWapFaild("1001", "验证码错误");
			return;
		}
		
		String session_code = Constants.SMS_CODE.get(tel+"_code");
		if(!code.equals(session_code)){
			renderWapFaild("1001", "验证码错误");
			return;
		}
		
		Users oldUsers = Users.me.findUserByMobile(tel);
		if(oldUsers!=null){
			renderWapFaild("1002", "该用户已经存在");
			return;
		}
		//创建商户模块
		String password = getPara("password");
		String icard = getPara("icard");
		
		users.set("username", "m_"+Utility.getRandomString(10));
		users.set("password", Utility.MD5(password));
		users.set("idcard", icard);
		users.set("mobile", tel);
		users.set("utype", 3);
		users.set("status", 1);
		users.set("ctime", new Date());
		boolean update = users.update();
		if(update){
			//商户属性模块
			String shoptypeJson = getPara("shoptypeJson");//分类id,以逗号隔开
			String shoptypeName = getPara("shoptypename");//分类名称,以逗号隔开
			String shopname = getPara("shopname");//店铺名
			String name = getPara("name");//真实姓名
			String managesite = getPara("managesite");//经验地址
			String operator = getPara("operator");//经营者
			String businessname = getPara("businessname");
			String regnumber = getPara("regnumber");//营业执照code
			String contactway =  getPara("contactway");
			Business business = Business.me.findByUid(users.getInt("id"));
			boolean isSave = false;
			if(business==null){
				isSave = true;
				business = new Business();
				business.set("uid", users.getInt("id"));
				business.set("ctime", new Date());
			}
			business.set("shopname", shopname);
			business.set("truename", name);
			business.set("shopaddress", managesite);
			business.set("licensename", businessname);
			business.set("licensecode", regnumber);
			business.set("cateid", shoptypeJson);
			business.set("catename", shoptypeName);
			business.set("bossname", operator);
			business.set("contactway", contactway);
			business.set("status", 0);
			if(isSave){
				business.save();
			} else {
				business.update();
			}
		}
		//附件模块
		String idCardFront = getPara("identityCardFront");
		String idCardBack = getPara("identityCardBack");
		String businesslicense = getPara("businesslicense");
		String shopimg = getPara("shopimg");
		if(StringUtils.isNotBlank(idCardFront)){
			String aid = idCardFront.substring(idCardFront.lastIndexOf("=")+1);
			Attachment.me.findById(aid).set("status", "1").update();
		}
		if(StringUtils.isNotBlank(idCardBack)){
			String aid = idCardBack.substring(idCardBack.lastIndexOf("=")+1);
			Attachment.me.findById(aid).set("status", "1").update();
		}
		if(StringUtils.isNotBlank(businesslicense)){
			String aid = businesslicense.substring(idCardFront.lastIndexOf("=")+1);
			Attachment.me.findById(aid).set("status", "1").update();
		}
		if(StringUtils.isNotBlank(shopimg)){
			String aid = shopimg.substring(idCardBack.lastIndexOf("=")+1);
			Attachment.me.findById(aid).set("status", "1").update();
		}
		
		Constants.SMS_CODE.remove(tel+"_code");
		Constants.SMS_CODE.remove(tel+"_time");
		
		renderWapSuccess("/shop/goRegSucess");
	}
	
	
	public void shopEvaluation(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int uid = getParaToInt("uid");//服务商id
		String goodpercent = getPara("goodpercent");
		Business business = Business.me.findByUid(uid);
		Page<Record> page = Evaluate.me.paginate(1, 10, uid,2);
		List<Record> evaluate = page.getList();
		for (Record evalat : evaluate) {
			String username = evalat.getStr("brandName");
			evalat.set("brandName", "**"+username.substring(2));
		}
		setAttr("business", business);
		setAttr("evaluates", page.getList());
		setAttr("goodpercent", goodpercent);
		render("shop/evaluation.jsp");
	}
	
	public void loadMoreEvaluation(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		int start = getParaToInt("offset");
		int length = getParaToInt("limit");
		int uid =getParaToInt("userid");//服务商id
		int status = 2;
		String typeStr = getRequest().getParameter("type");
		if(!empty(typeStr)){
			int type = Integer.valueOf(typeStr);
			if(type==3){
				status = 0;
			} else if(type==2){
				status = 1;
			}
		}
		start = start==0?1:(start/length)+1;
		Page<Record> page = Evaluate.me.paginate(start, length, uid,status);
		List<Record> evaluate = page.getList();
		for (Record evalat : evaluate) {
			String username = evalat.getStr("brandName");
			evalat.set("brandName", "**"+username.substring(2));
		}
		HashMap<String, Object> dataMap = new HashMap<String,Object>();
		dataMap.put("evaluateList", evaluate);
		HashMap<String, Object> evaluateMap = new HashMap<String,Object>();
		evaluateMap.put("evaluate", dataMap);
		
		HashMap<String, Object> resMap = new HashMap<String,Object>();
		resMap.put("code", 0);
		resMap.put("data", evaluateMap);
		resMap.put("evaluate", dataMap);
		resMap.put("success", true);
		renderJson(resMap);
	}
	
	
	public void goCashdeposit(){
		render("/view/wap/user/cashdeposit.jsp");
	}
	
	public static void main(String[] args) {
		String username = "mfdsfsdfs";
		System.out.println("**"+username.substring(2));
	}
}
