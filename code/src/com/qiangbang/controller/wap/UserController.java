package com.qiangbang.controller.wap;

import java.text.MessageFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

//import org.apache.commons.lang3.StringUtils;
//import org.json.JSONObject;

import com.jfinal.aop.Duang;
import com.jfinal.plugin.activerecord.Db;
import com.qiangbang.common.Constants;
import com.qiangbang.controller.BaseController;
import com.qiangbang.entity.Assignment;
import com.qiangbang.entity.Attachment;
import com.qiangbang.entity.Business;
import com.qiangbang.entity.Orders;
import com.qiangbang.entity.Users;
import com.qiangbang.service.CategoryService;
import com.qiangbang.service.OrderService;
import com.qiangbang.service.UserService;
import com.qiangbang.utils.CommonUtils;
import com.qiangbang.utils.MsgUtils;
import com.qiangbang.utils.QbUtils;
import com.qiangbang.utils.RequestUtils;
import com.qiangbang.utils.Utility;
import com.qiangbang.vo.CategoryVo;

/**
  * @ClassName: UserController 
  * @Description: 微信端用户 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
public class UserController extends BaseController{
	public void index(){
		render("index.jsp");
	}
   
	public void getCode(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String tel = getPara("tel");
		String puserid = getPara("puserid");
		String qbtoken = getPara("qbtoken");
		
		if(StringUtils.isNotBlank(tel)){
			boolean flag = true;
			String time = Constants.SMS_CODE.get(tel+"_time");
			if(StringUtils.isNotBlank(time)){
				if(CommonUtils.getNowDatetime()-Integer.parseInt(time)<60){
					flag = false;
				} else {
					//如果超过60秒,清除缓存
					Constants.SMS_CODE.remove(tel+"_code");
					Constants.SMS_CODE.remove(tel+"_time");
				}
			}
			if(flag){
				Users oldUsers = Users.me.findUserByMobile(tel);
				if(oldUsers!=null&&users.getInt("id")!=oldUsers.getInt("id")){
					renderWapFaild("user mobile is exists");
					return ;
				}
				
				String code = Constants.SMS_CODE.get(tel+"_code");
				if(!StringUtils.isNotBlank(code)){
					code = QbUtils.getRandomInt(6);
//					code = "111111";
					Constants.SMS_CODE.put(tel+"_code", code);
				}
				Constants.SMS_CODE.put(tel+"_time", String.valueOf(CommonUtils.getNowDatetime()));
				
				MsgUtils.sendCode(tel, code);
				if(QbUtils.getOSID()==1){
//					MsgUtils.sendCode(tel, code);
				}
//				result = "0";//短信验证码发送成功
				renderWapSuccess();
				System.out.println("验证码："+code);
			}else{
				renderWapFaild("发送频率过快");//发送时间频率过快
			}
		}
	}
	
	public void getQuickCode(){
		getCode();
	}

	public void getUpdatePwdCode(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		String tel = getPara("tel");
		if(!users.getStr("mobile").equals(tel)){
			renderFaild("手机号不匹配,请重新填写");
			return;
		}
		getCode();
	}
	
	public void register(){
		String tel = getPara("tel");
		String code = getPara("code");
		if(!"111111".equals(code)){
			renderWapFaild("1001", "验证码错误");
			return;
		}
		String password = getPara("password");
		String qbtoken = getPara("qbtoken");
		Users user = Users.me.set("username", "test");
		user.set("password", Utility.MD5(password));
		user.set("mobile", tel);
		user.set("wxopenid", "fdsfdsfs");
		user.set("utype", 1);
		user.set("price", 0);
		user.set("status", 0);
		user.set("ctime", new Date());
		user.save();
		renderWapSuccess("tologin.jsp");
	}
	
	public void toLogin(){
		render("tologin.jsp");
	}
	
	public void toReg(){
		render("toreg.jsp");
	}
	
	public void toRegError(){
		render("regerror.jsp");
	}
	
	//商户页面登录
	public void login(){
		String tel = getPara("tel");
		String password = getPara("password");
		String puserid = getPara("puserid");
		String qbtoken = getPara("qbtoken");
//		String code = getPara("code");
//		if(!"111111".equals(code)){
//			renderWapFaild("1003","验证码错误");
//			return;
//		}
		Users users = Users.me.findUserByMobile(tel);
		if(users==null){
			renderWapFaild("1002","账号不存在,请先注册");
			return;
		}
		if(users.getInt("utype")==1){
			renderWapFaild("1001","账号有误");
			return;
		}
		
		if(!Utility.MD5(password).equals(users.getStr("password"))){
			renderWapFaild("1000","账号或密码有误");
			return;
		}
		getRequest().getSession().setAttribute("users", users);
		
		renderWapSuccess("/wapact/index");
	}
	
	/**
	 * 微信静默登录
	  * @Title: quickLogin 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public void quickLogin(){
		Users users = (Users) getRequest().getSession().getAttribute("users");
		
		UserService userService = Duang.duang(UserService.class);
		if(!userService.isRegisterUser(users)){//用户没有注册
			String tel = getPara("tel");
			String qbtoken = getPara("qbtoken");
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
			
			users.set("username", "m_"+Utility.getRandomString(10));
			users.set("password", Utility.MD5("123456"));
			users.set("mobile", tel);
			users.set("utype", 1);
			users.set("status", 1);
			if(users.getDate("ctime")==null){
				users.set("ctime", new Date());
			}
			users.update();
			
			Constants.SMS_CODE.remove(tel+"_code");
			Constants.SMS_CODE.remove(tel+"_time");
		}
		renderWapSuccess();
	}
}
