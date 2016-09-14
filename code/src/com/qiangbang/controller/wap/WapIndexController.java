package com.qiangbang.controller.wap;

import java.text.MessageFormat;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import com.jfinal.aop.Duang;
import com.qiangbang.common.Constants;
import com.qiangbang.controller.BaseController;
import com.qiangbang.entity.Message;
import com.qiangbang.entity.Orders;
import com.qiangbang.entity.Tradedetail;
import com.qiangbang.entity.Users;
import com.qiangbang.service.CategoryService;
import com.qiangbang.service.UserService;
import com.qiangbang.utils.QbUtils;
import com.qiangbang.utils.RequestUtils;

/**
  * @ClassName: WapIndexController 
  * @Description: 后台管理控制器--账户明细 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
public class WapIndexController extends BaseController{
	public void index(){
		setAttr("volumes", Tradedetail.me.getVolumeThree());
		render("index.jsp");
	}
	
	/**
	 * 微信回调
	  * @Title: callback 
	  * @Description: TODO  
	  * @return void  
	  * @throws
	 */
	public void callback(){
		String openid = getPara("openid");
		int state = getParaToInt("state");
		UserService userService = Duang.duang(UserService.class);
		Users users = userService.findOrCreateUsers(openid);
		// 绑定信息为空则跳转至登录 否则直接到跳转之前页面
		if(users!=null && users.getInt("id")>0){
			getRequest().getSession().setAttribute("users", users);
			getRequest().getSession().setAttribute("weixinId",openid);
		}
		if(state==1){
			redirect("/wapIndex/index");
		} else if (state==2){
			if(userService.isRegisterUser(users)){
				if(users.getInt("utype")==1){
					redirect("/wapact/index");
					return;
				}
				redirect("/shop/index");
			} else {
				redirect("/shop/goNormalUser");
			}
		} else if(state==3){
			if(userService.isRegisterUser(users)){
				if(users.getInt("utype")==1){
					redirect("/wapact/index");
					return;
				}
				redirect("/shop/index");
			} else {
				redirect("/shop/goShopUser");
			}
		} else if(state==4){
			redirect("/waptask/goDeploy");
		}
	}
	
	
	public void wxcallBack(){
		String state = getPara("state");
		String code = getPara("code");
		System.out.println("state:"+state+"##code===="+code);
		System.out.println("callback state: "+state);//配置地址的state参数
		String weixinAPI = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={0}&secret={1}&code={2}&grant_type=authorization_code";
		try {
			JSONObject json = RequestUtils.getRemoteIntefaceResult(new JSONObject(), MessageFormat.format(weixinAPI, Constants.WeiXinAppId, Constants.WeiXinSecret, code));
			String openid = "";
			if(json.has("openid")){
				openid = json.getString("openid");
			}
			System.out.println("openId===="+openid);
			if(StringUtils.isNotBlank(openid)){
				openid = openid.replace("\"", openid);
				UserService userService = Duang.duang(UserService.class);
				Users users = userService.findOrCreateUsers(openid);
				// 绑定信息为空则跳转至登录 否则直接到跳转之前页面
				if(users!=null && users.getInt("id")>0){
					String enickname = QbUtils.decodeNickName(users.getStr("enickname"));
					getRequest().getSession().setAttribute("users", users);
					int msgCount = Message.me.getMsgCount(users.getInt("id"));
					getRequest().getSession().setAttribute("isNews", msgCount>0?1:0);
					getRequest().getSession().setAttribute("Subscribe",empty(openid)?false:true);
					getRequest().getSession().setAttribute("nickname", "".equals(enickname)?users.getStr("nickname"):enickname);
				} 
				//state  1.首页   2.商户入驻
				int type = Integer.valueOf(state);
				if(type==1){
					redirect("/wapIndex/index");
				} else if (type==2){
					if(userService.isRegisterUser(users)){
						if(users.getInt("utype")==2||users.getInt("utype")==3){
							redirect("/shop/index");
						} else {
							redirect("/user/toRegError");
						}
					} else {
						redirect("/shop/goNormalUser");
					}
				} else if(type==3){
					if(userService.isRegisterUser(users)){
						if(users.getInt("utype")==2||users.getInt("utype")==3){
							redirect("/shop/index");
						} else {
							redirect("/user/toRegError");
						}
					} else {
						redirect("/shop/goShopUser");
					}
				} else if(type==4){
					redirect("/waptask/goDeploy");
				} else if(type==5){
					redirect("/wapact/index");
				} else {
					int validate = 0;
					Orders orders = Orders.me.findByOrderId(type);
					if(orders!=null){
						int status = orders.getInt("status");
						int sellerId = orders.getInt("sellerId");
						if(status!=0&&status!=3&&status!=4){
							int uid = users.getInt("id");
							if(uid==sellerId){
								validate = 1;
							}
						}
					} 
					if(validate==0){
						render("/view/wap/task/error.jsp");
					} else {
						setAttr("orderid", type);
						render("/view/wap/task/start.jsp");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void goSearch(){
		CategoryService categoryService = Duang.duang(CategoryService.class);
		Map dataMap = categoryService.getWapSearchCategory();
		setAttr("categoryMap", dataMap);
		render("search.jsp");
	}
	
	public void search(){
		
	}
   
}
