package com.qiangbang.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.qiangbang.entity.Attachment;
import com.qiangbang.entity.Category;
import com.qiangbang.entity.Users;
import com.qiangbang.utils.ArithUtil;
import com.qiangbang.utils.EmojiFilter;
import com.qiangbang.utils.QbPage;
import com.qiangbang.utils.QbUtils;
import com.qiangbang.utils.Utility;
import com.qiangbang.utils.WeixinUtil;

/**
  * @ClassName: UserService 
  * @Description: TODO 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月21日 下午4:09:30 
  *
 */
public class UserService {
	public Record getUserDetails(int uid){
		Record record = Db.findFirst("SELECT a.id userid,nickname userName,wxopenid openId,mobile phoneNumber,"
				+ "idcard AS idCard,region,shipaddress expressAddress,a.ctime registrationTime,"
				+ "a.STATUS AS isCloseShop,a.STATUS AS isOpenShop,isauth AS isApprove,isbond isCashdeposit,"
				+ "b.catename classify,a.price,b.bondmoney,shopname storeName,"
				+ "mobile contactWay,truename realName,licensename businessLicenseName FROM users a LEFT JOIN business b ON a.id=b.uid "
				+ " WHERE a.id=? ", uid);
		
		record.set("userGrade", "0");
		List<Attachment> attachments =  Attachment.me.findAttachmentByUid(uid);
		String idCardfront = "";
		String idCardreverse = "";
		String businessLicense = "";
		String storefront = "";
		for (Attachment attachment : attachments) {
			int filetype = attachment.getInt("filetype");
			int id = attachment.getInt("id");
			if(filetype==1){
				idCardfront = "/file/download?aid="+id;
			} else if(filetype==2){
				idCardreverse = "/file/download?aid="+id;
			} else if(filetype==3){
				businessLicense = "/file/download?aid="+id;
			} else if(filetype==4){
				storefront = "/file/download?aid="+id;
			}
		}
		record.set("idCardfront", idCardfront);
		record.set("idCardreverse", idCardreverse);
		record.set("businessLicense", businessLicense);
		record.set("storefront", storefront);
		return record;
	}
	
	
	/**
	 * 根据微信openId查找或创建用户对象
	 * @param weixinId
	 * @return
	 */
	public Users findOrCreateUsers(String weixinId){
		Users users = Users.me.findUserByWxOpenId(weixinId);
		try {
			if(users==null){
				users = new Users();
				users.set("wxopenid", weixinId);
				users.set("status", 0);
				users.set("utype", 0);
				Map userInfo = WeixinUtil.getUserInfo(weixinId);
				if(userInfo!=null){
					if(!Utility.empty(userInfo.get("headimgurl"))){
						String imgUrl = (String) userInfo.get("headimgurl");
						users.set("personpath", imgUrl.replace("\\", ""));
					}
					
					if(!Utility.empty(userInfo.get("nickname"))){
						String nickname = (String) userInfo.get("nickname");
						users.set("enickname", QbUtils.encodeNickName(nickname));
						users.set("nickname", EmojiFilter.filterEmoji(nickname));
					}
					
					if(!Utility.empty(userInfo.get("province"))){
						String province = (String) userInfo.get("province");
						users.set("region", province);
					}
				}
				users.save();
			} else {
				Map userInfo = WeixinUtil.getUserInfo(weixinId);
				if(userInfo!=null){
					if(!Utility.empty(userInfo.get("headimgurl"))){
						String imgUrl = (String) userInfo.get("headimgurl");
						users.set("personpath", imgUrl.replace("\\", ""));
					}
					
					if(!Utility.empty(userInfo.get("nickname"))){
						String nickname = (String) userInfo.get("nickname");
						users.set("enickname", QbUtils.encodeNickName(nickname));
						users.set("nickname", EmojiFilter.filterEmoji(nickname));
					}
					
					if(!Utility.empty(userInfo.get("province"))){
						String province = (String) userInfo.get("province");
						users.set("region", province);
					}
				}
				users.update();
			}
		} catch (Exception e) {
			e.printStackTrace();
			users.set("nickname", "抢帮用户");
			users.save();
		}
		return users;
	}
	
	/**
	 * 是否是已经注册了的用户
	  * @Title: isRegisterUser 
	  * @Description: TODO  
	  * @return boolean  
	  * @throws
	 */
	public boolean isRegisterUser(Users users){
		int status = users.getInt("status");
		int utype = users.getInt("utype");
		return status==1&&utype>0;
	}
	
	/**
	 * 获取成交记录
	  * @Title: getBusCount 
	  * @Description: TODO  
	  * @return int  
	  * @throws
	 */
	public int getBusCount(int uid){
		Record record = Db.findFirst("select count(1) AS buscount FROM tradedetail WHERE cusid=? and remark='订单完成'",uid);
		int count = 0;
		if(record!=null){
			Long buscount = record.getLong("buscount");
			count = buscount == null?0:buscount.intValue();
		}
		return count;
	}
	
	/**
	 * 获取最近收入
	  * @Title: getBusSumPrice 
	  * @Description: TODO  
	  * @return int  
	  * @throws
	 */
	public double getBusSumPrice(int uid){
		Record record = Db.findFirst("select sum(money) AS sumamount FROM tradedetail WHERE cusid=? and type=1 and remark='订单完成'",uid);
		double sumamount = 0;
		if(record!=null){
			Double bussum = record.getDouble("sumamount");
			if(bussum!=null&&bussum>0){
				BigDecimal bg = new BigDecimal(bussum.doubleValue());  
				sumamount = bg.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
			}
		}
		return sumamount;
	}
	
	public List<Record> getShopList(String cateId){
		Category category = Category.me.findById(Integer.valueOf(cateId));
		List<Record> records = Db.find("select b.*,IFNULL(t.con,0) AS con from business b LEFT JOIN (select count(1) AS con,businessid FROM pubtask WHERE bid=1 GROUP BY businessid) AS t ON t.businessid=b.uid where catename like '%"+category.getStr("categoryname")+"%'");
		return records;
	}
	
	/**
	 * 首页大类别点击获取该类别所有商户
	 * @param cateId
	 * @return
	 */
	public List<Record> getParentShopList(String cateId){
		Category category = Category.me.findById(Integer.valueOf(cateId));
		if(category==null){
			return new ArrayList<Record>();
		}
		List<Category> childrens = Category.me.findCategoryByPid(Integer.valueOf(cateId));
		String whereClasue = "";
		for (Category cate : childrens) {
			if("".equals(whereClasue)){
				whereClasue += " where catename like '%"+cate.getStr("categoryname")+"%' ";
			} else {
				whereClasue += " or catename like '%"+cate.getStr("categoryname")+"%' ";
			}
		}
		List<Record> records = Db.find("select b.*,IFNULL(t.con,0) AS con from business b LEFT JOIN (select count(1) AS con,businessid FROM pubtask WHERE bid=1 GROUP BY businessid) AS t ON t.businessid=b.uid "+whereClasue);
		return records;
	}
}
