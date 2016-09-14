package com.qiangbang.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jfinal.aop.Before;
import com.jfinal.aop.Duang;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.qiangbang.common.Constants;
import com.qiangbang.entity.Admin;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.Category;
import com.qiangbang.entity.Message;
import com.qiangbang.entity.Tradedetail;
import com.qiangbang.entity.Users;
import com.qiangbang.interceptor.AdminInterceptor;
import com.qiangbang.service.CategoryService;
import com.qiangbang.service.PushService;
import com.qiangbang.service.UserService;
import com.qiangbang.utils.ArithUtil;
import com.qiangbang.utils.JsonUtil;
import com.qiangbang.utils.MsgUtils;
import com.qiangbang.utils.QbPage;
import com.qiangbang.utils.Utility;
import com.qiangbang.utils.WeixinUtil;
import com.qiangbang.vo.CategoryVo;

/**
  * @ClassName: AdminsController 
  * @Description: 后台管理控制器 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
@Before(AdminInterceptor.class)
public class AdminsController extends BaseController{
	public void index(){
		render("index.jsp");
	}
	
    public void getList(){
    	int start = getParaToInt("start");
    	int length = getParaToInt("length");
    	String username = getPara("userName");
    	String userType = getPara("userType");
    	int utype = 0;
    	if(!empty(userType)){
    		utype = Integer.valueOf(userType);
    	}
//    	int userType = getParaToInt("userType");
    	Map<String, Object> dataMap = new HashMap<String, Object>();
    	Admin admin = (Admin) getSession().getAttribute(Constants.LOGINADMIN);
    	start = start==0?1:(start/length)+1;
    	Page pageUsers = null;
    	if(empty(username)){
			username = "";
		}
    	if(utype==0||utype==1){
    		pageUsers = Users.me.paginate(start, length,username);
    	} else {
    		pageUsers = Business.me.paginate(start, length, utype,username);//个体工商户
    	}
    	QbPage page = new QbPage(pageUsers);
    	renderJson(page);
    }
    
    /**
     * 开启账号
      * @Title: enableAccount 
      * @Description: TODO  
      * @return void  
      * @throws
     */
    public void enableAccount(){
    	int userid = getParaToInt("userid");
    	Users user = Users.me.findById(userid);
		user.set("status", 1).update();
    	renderSuccess();
    }
    
    public void disableAccount(){
    	int userid = getParaToInt("userid");
    	Users user = Users.me.findById(userid);
		user.set("status", 2).update();
    	renderSuccess();
    }
    
    /**
     * 开启商户
     */
    public void reviewBusiness(){
    	int userid = getParaToInt("userid");
    	Users user = Users.me.findById(userid);
    	Business business = Business.me.findByUid(userid);
		business.set("status", 1);
		business.set("msgstatus", 1);
		business.update();
		int count = Tradedetail.me.getTradeCount(userid);
		if(count==0){
			double price = user.getDouble("price");
			double amount = ArithUtil.add(price, 2);
			user.set("price", amount);
			user.update();
			Tradedetail tradedetail = new Tradedetail();
			tradedetail.set("cusid", userid);
			tradedetail.set("money", 2);
			tradedetail.set("amount", amount);
			tradedetail.set("type", 1);
			tradedetail.set("remark", "2元赠送不可提现");
			tradedetail.set("orderid", 0);
			tradedetail.set("payorder", 0);
			tradedetail.set("paryremark", "2元赠送,不可提现");
			tradedetail.set("ctime", new Date());
			tradedetail.save();
		}
		MsgUtils.sendBusinessPassCode(user.getStr("mobile"));
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushBusinessSucessMsg(user);;
    	renderSuccess();
    }
    
    /**
     * 关闭商户
     */
    public void choseBusiness(){
    	int userid = getParaToInt("userid");
    	Users user = Users.me.findById(userid);
    	Business business = Business.me.findByUid(userid);
		business.set("status", 0).update();
		MsgUtils.sendBusinessNotPassCode(user.getStr("mobile"),"您申请的资料,审核不通过");
    	renderSuccess();
    }
    
    public void reviewAuth(){
    	int userid = getParaToInt("userid");
    	Users user = Users.me.findById(userid);
//    	int userType = getParaToInt("userType");
    	Business business = Business.me.findByUid(userid);
		business.set("isauth", 1).update();
		
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushBusinessAuthMsg(user);
		
    	renderSuccess();
    }
    
    public void reviewBondmoney(){
    	int userid = getParaToInt("userid");
    	Users user = Users.me.findById(userid);
//    	int userType = getParaToInt("userType");
    	Business business = Business.me.findByUid(userid);
		business.set("isbond", 1).update();
		PushService pushService = Duang.duang(PushService.class);
		pushService.pushBusinessBondMsg(user);
    	renderSuccess();
    }
    
    public void goDetails(){
    	int id = getParaToInt("id");
    	render("detail.jsp?id="+id);
    }
    
    public void details(){
    	int userid = getParaToInt("id");
//    	int start = getParaToInt("start");
//    	int length = getParaToInt("length");
    	int start = 0;
    	int length =20;
    	start = start==0?1:(start/length)+1;
    	Page<Tradedetail> pages = Tradedetail.me.paginate(start, length, userid);
    	UserService userService = Duang.duang(UserService.class);
    	Record record = userService.getUserDetails(userid);
    	HashMap<String, Object> dataMap = new HashMap<String, Object>();
    	dataMap.put("status",0);
    	dataMap.put("recordsFiltered",pages.getTotalRow());
    	dataMap.put("recordsTotal",pages.getTotalRow());
    	dataMap.put("data",pages.getList());
    	dataMap.put("baseinfo",record);
    	renderJson(dataMap);
    }
    
    public void goEdit(){
    	int id = getParaToInt("id");
    	Business business = Business.me.findByUid(id);
    	List<CategoryVo> onelevels = new ArrayList<CategoryVo>();
    	if(business!=null){
			List<Category> categoies = Constants.loadCategories();
			for (Category category : categoies) {
				if(category.getInt("level")==0){
					CategoryVo cateVo = new CategoryVo(category.getInt("id"), category.getStr("categoryname"));
					onelevels.add(cateVo);
				}
			}
	    	
			for (CategoryVo cvo : onelevels) {
				for (Category cate : categoies) {
					if(cate.getInt("parentId")==cvo.getId()){
						Record cateRc = cate.toRecord();
						String cateId = business.getStr("cateid");
						String[] cateArray = cateId.split(",");
						List cateList = Arrays.asList(cateArray);
						if(cateList.contains(cate.getInt("id")+"")){
							cateRc.set("selected", 1);
						} else {
							cateRc.set("selected", 0);
						}
						cvo.addCateRecord(cateRc);
					}
				}
			}
    	}
    	setAttr("categorys", onelevels);
    	render("edit.jsp?id="+id);
    }
    
    public void updateUser(){
    	int userid = getParaToInt("userid");
		String storeName = getPara("storeName");
		String classify = getPara("classifyName");
		String classifyId = getPara("classifyVal");
		String realName = getPara("realName");
		String idCard = getPara("idCard");
		String businessLicenseName = getPara("businessLicenseName");
		String contactWay = getPara("contactWay");
		String expressAddress = getPara("expressAddress");
		Users users = Users.me.findById(userid);
		users.set("shipaddress", expressAddress);
		users.set("idcard", idCard);
		users.update();
		Business business = Business.me.findByUid(userid);
		business.set("cateid", classifyId);
		business.set("catename", classify);
		business.set("truename", realName);
		business.set("shopname", storeName);
		business.set("contactway", contactWay);
		business.set("licensename", businessLicenseName);
		business.update();
    	renderSuccess("更新成功");
    }
    
    public static void main(String[] args) throws Exception {
    	String json = "{\"name\":\"小民\",\"age\":20,\"birthday\":844099200000,\"email\":\"xiaomin@sina.com\"}";  
    	ObjectMapper objectMapper = new ObjectMapper();  
    	Map data = JsonUtil.parseJson(json);
    	System.out.println(data.get("name"));
    	
    	Map<String, Object> aa = new HashMap<String, Object>();
    	aa.put("sdf", "tds");
    	List test = new ArrayList();
    	test.add(1);
    	test.add("tds");
    	aa.put("aac", test);
    	String as = objectMapper.writeValueAsString(aa);
    	System.out.println(as);
    	
    	String vaa = " ";
    	System.out.println(Utility.empty(vaa));
	}

}
