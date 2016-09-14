package com.qiangbang.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jfinal.aop.Before;
import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.weixin.sdk.kit.PaymentKit;
import com.qiangbang.common.Constants;
import com.qiangbang.entity.Admin;
import com.qiangbang.entity.Assignment;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.Orders;
import com.qiangbang.entity.Refund;
import com.qiangbang.entity.Tradedetail;
import com.qiangbang.entity.Users;
import com.qiangbang.interceptor.AdminInterceptor;
import com.qiangbang.utils.ArithUtil;
import com.qiangbang.utils.CommonUtils;
import com.qiangbang.utils.JsonUtil;
import com.qiangbang.utils.QbPage;
import com.qiangbang.utils.Utility;
import com.qiangbang.utils.WeixinUtil;

/**
  * @ClassName: AccountController 
  * @Description: 后台管理控制器--账户明细 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
@Before(AdminInterceptor.class)
public class AccountController extends BaseController{
	public void index(){
		render("index.jsp");
	}
	
    public void getList(){
    	int start = getParaToInt("start");
    	int length = getParaToInt("length");
    	String orderNumber = getPara("orderNumber");
    	int accountType = getParaToInt("accountype");
    	String startTime = getPara("starTime");
    	String endTime = getPara("endTime");
    	start = start==0?1:(start/length)+1;
    	Page<Tradedetail> pages = Tradedetail.me.paginateAdmin(start, length, accountType,startTime,endTime);
    	HashMap<String, Object> dataMap = new HashMap<String, Object>();
    	dataMap.put("status",0);
    	dataMap.put("recordsFiltered",pages.getTotalRow());
    	dataMap.put("recordsTotal",pages.getTotalRow());
    	dataMap.put("data",pages.getList());
    	Map<String,Double> moneyMap = Tradedetail.me.getAdminSumPrice();
    	dataMap.put("expenseMoney",moneyMap.get("expend")!=null?moneyMap.get("expend"):0);
    	dataMap.put("incomeMoney",moneyMap.get("income")!=null?moneyMap.get("income"):0);
    	renderJson(dataMap);
    }
    
    public void refund(){
    	render("refund.jsp");
    }
    
    public void refundList(){
    	int start = getParaToInt("start");
    	int length = getParaToInt("length");
    	String orderNumber = getPara("orderNumber");
    	start = start==0?1:(start/length)+1;
    	Page<Refund> pages = Refund.me.paginate(start, length,orderNumber);
    	HashMap<String, Object> dataMap = new HashMap<String, Object>();
    	dataMap.put("status",0);
    	dataMap.put("recordsFiltered",pages.getTotalRow());
    	dataMap.put("recordsTotal",pages.getTotalRow());
    	dataMap.put("data",pages.getList());
    	renderJson(dataMap);
    }
    
    
    /**
     * 退款和提现处理
     */
    public void reviewMmpaymkttransfers(){
    	int id = getParaToInt("orderid");
    	Refund refund = Refund.me.findById(id);
    	String tradenum = refund.getStr("orderNumber");
    	Users users = Users.me.findById(refund.getInt("userId"));
		int type = refund.getInt("type");
		double price = users.getDouble("price");
		double money = refund.getDouble("money");
		double pay = 0;
		if(type==2){//申请退款---直接转入用户余额
			pay = ArithUtil.add(price, money);
			users.set("price", pay);
			users.update();
			String sysOrderId = tradenum.substring(14, tradenum.length());
			Assignment assignment = Assignment.me.findById(sysOrderId);
			if(assignment!=null){
				assignment.set("status", 8);
				assignment.update();
			}
			Tradedetail tradedetail = new Tradedetail();
			tradedetail.set("orderid", sysOrderId);
			tradedetail.set("type", 1);
			tradedetail.set("remark", "订单退款");
			tradedetail.set("paryremark", "后台订单退款");
			tradedetail.set("cusid", users.getInt("id"));
			tradedetail.set("money", money);
			tradedetail.set("amount", pay);
			tradedetail.set("payorder", tradenum);
			tradedetail.set("ctime", new Date());
			tradedetail.save();
		} else if(type==4){//用户提现---提现到微信余额中
			String xmlResult = WeixinUtil.mmpaymkttransfers(users.getStr("nickname"),users.getStr("wxopenid"),refund.getDouble("money"),tradenum);
			Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
			
			String return_code = result.get("return_code");
			String return_msg = result.get("return_msg");
			if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
				renderFaild(return_msg);
				System.out.println(return_msg);
				return;
			}
			String result_code = result.get("result_code");
			if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
				renderFaild(return_msg);
				System.out.println(return_msg);
				return;
			}
			
			//用户申请提现的时候，已经扣除，这里不需要扣除了
//			pay = ArithUtil.sub(price, money);
//			users.set("price", pay);
//			users.update();
			
			Tradedetail tradedetail = Tradedetail.me.findTradeDetailByPayOrder(tradenum);
			tradedetail.set("remark", "提现成功");
			tradedetail.set("paryremark", "审核金额提现成功");
			tradedetail.update();
		}
		
		refund.set("status", 2);
		refund.update();
		
		renderSuccess();
     }
	
   
}
