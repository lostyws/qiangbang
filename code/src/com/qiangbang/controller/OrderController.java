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
import com.jfinal.aop.Duang;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.qiangbang.common.Constants;
import com.qiangbang.entity.Admin;
import com.qiangbang.entity.Assignment;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.Category;
import com.qiangbang.entity.Orders;
import com.qiangbang.entity.Tradedetail;
import com.qiangbang.entity.Users;
import com.qiangbang.interceptor.AdminInterceptor;
import com.qiangbang.service.OrderService;
import com.qiangbang.service.UserService;
import com.qiangbang.utils.ArithUtil;
import com.qiangbang.utils.JsonUtil;
import com.qiangbang.utils.QbPage;
import com.qiangbang.utils.Utility;

/**
  * @ClassName: OrderController 
  * @Description: 后台管理控制器--订单管理 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
@Before(AdminInterceptor.class)
public class OrderController extends BaseController{
	public void index(){
		render("index.jsp");
	}
	
    public void getList(){
    	int start = getParaToInt("start");
    	int length = getParaToInt("length");
    	String orderNumber = getPara("orderNumber");
    	int orderStatus = getParaToInt("orderStatus");
    	
    	if(empty(orderNumber)){
    		orderNumber = "";
		}
    	start = start==0?1:(start/length)+1;
    	Page<Record> pageOrders = Orders.me.paginate(start, length, orderNumber,orderStatus);
    	List<Record> list = pageOrders.getList();
    	for (Record record : list) {
    		record.set("status", Assignment.me.getStatus(record.getInt("status")));
		}
    	QbPage page = new QbPage(pageOrders);
    	renderJson(page);
    }
    
    public void goDetails(){
    	int id = getParaToInt("id");
    	render("detail.jsp?id="+id);
    }
    
    public void details(){
    	int taskid = getParaToInt("id");
//    	int start = getParaToInt("start");
//    	int length = getParaToInt("length");
//    	int start = 0;
//    	int length =20;
//    	start = start==0?1:(start/length)+1;
    	OrderService orderService = Duang.duang(OrderService.class);
    	Record record = orderService.getOrderDetails(taskid);
    	HashMap<String, Object> recordMap = new HashMap<String,Object>();
    	recordMap.put("data", record);
    	recordMap.put("status", 0);
    	renderJson(recordMap);
    }
    
    /**
     * 
      * @Title: stopOrder 
      * @Description: 终止订单  
      * @return void  
      * @throws
     */
    public void stopOrder(){
    	int taskId = getParaToInt("orderid");
    	Assignment assignment = Assignment.me.findById(taskId);
		
		Date date = new Date();
		assignment.set("status", 3);
		assignment.set("tradtime", date);
		assignment.update();

		Orders orders = Orders.me.findByOrderId(taskId);
		orders.set("status", 3);
		orders.update();
		System.out.println("终止订单号:"+taskId);
    	renderSuccess();
    }
    
    /**
     * 
      * @Title: deleteOrder 
      * @Description: 删除订单  
      * @return void  
      * @throws
     */
    public void deleteOrder(){
    	int taskId = getParaToInt("orderid");
    	Assignment assignment = Assignment.me.findById(taskId);
		
		Date date = new Date();
		assignment.set("status", 3);
		assignment.set("tradtime", date);
		assignment.update();

		Orders orders = Orders.me.findByOrderId(taskId);
		orders.set("status", 3);
		orders.update();
		System.out.println("删除订单号:"+taskId);
    	renderSuccess();
    }
    
    /**
     * 
      * @Title: finishOrder 
      * @Description: 强制也完成  
      * @return void  
      * @throws
     */
    public void finishOrder(){
    	int taskId = getParaToInt("orderid");
    	
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
		tradedetail.set("paryremark", "订单已经强制完成,金额到账");
		tradedetail.set("ctime", new Date());
		tradedetail.save();
		renderSuccess();
    }
	
   
}
