/**   
* @Title: QbUtils.java 
* @Package com.qiangbang.utils 
* @Description: TODO 
* @author leroy(32504251@qq.com)   
* @date 2016年5月22日 下午2:46:57 
* @version V1.0   
*/ 
package com.qiangbang.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** 
  * @ClassName: QbUtils 
  * @Description: TODO 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月22日 下午2:46:57 
  *  
  */
public class QbUtils {
	public static List<String> convertStringToList(String data,String region){
		List<String> list = new ArrayList<String>();
		if(Utility.empty(data)){
			return list;
		}
		String[] dataArray = data.split(region);
		list = Arrays.asList(dataArray);
		return list;
	}
	
	/**
	 *	获取随机字符串（数字） 
	 *	@param length
	 *	@return
	 */
	public static String getRandomInt(int length) {
	    StringBuffer buffer = new StringBuffer("0123456789");
	    StringBuffer sb = new StringBuffer();
	    Random r = new Random();
	    int range = buffer.length();
	    for (int i = 0; i < length; i ++) {
	        sb.append(buffer.charAt(r.nextInt(range)));
	    }
	    return sb.toString();
	}
	
	public static int getOSID(){
		String osname = System.getProperty("os.name").toLowerCase();
		if (osname.indexOf("windows") >= 0){
			return 0;
		}else if (osname.indexOf("linux") >= 0){
			return 1;
		}
		return -1;
	}

	/**
	 * 手机号码验证
	 */
	public static boolean checkMobile(String mobile) {
		if(mobile!=null && mobile.length()>0){
			Pattern p = Pattern.compile("^0?1(3|4|5|7|8)\\d{9}$");
			Matcher m = p.matcher(mobile);
			return m.matches();
		}
		return false;
	}
	
	public static boolean isValidate(String detail){
		if(detail.indexOf("毒")>-1||detail.indexOf("黄色")>-1
				||detail.indexOf("淫")>-1||detail.indexOf("海洛因")>-1
				||detail.indexOf("小姐")>-1||detail.indexOf("色情")>-1
				||detail.indexOf("枪")>-1||detail.indexOf("炸弹")>-1
				||detail.indexOf("药")>-1||detail.indexOf("赌")>-1){
			return false;
		}
		return true;
	}
	
	/**
	 * 加密微信名称,处理表情
	 * @param nickName
	 * @return
	 */
	public static String encodeNickName(String nickName){
		if(Utility.empty(nickName)){
			return "";
		}
		String encodeData = "";
		try {
			encodeData = URLEncoder.encode(nickName, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			encodeData = "";
		}
		return encodeData;
	}
	
	/**
	 * 解密微信名称,处理表情
	 * @param nickName
	 * @return
	 */
	public static String decodeNickName(String nickName){
		if(Utility.empty(nickName)){
			return "";
		}
		String decodeData = "";
		try {
			decodeData = URLDecoder.decode(nickName, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			decodeData = "";
		}
		return decodeData;
	}
	
	/**
	  * @Title: convertStrToList 
	  * @Description: str转换为list  
	  * @return List<String>  
	  * @throws
	 */
	public static List<String> convertStrToList(String data,String splitFlag){
		List<String> list = new ArrayList<>();
		if(Utility.empty(data)){
			return list;
		}
		String[] dataArray = data.split(splitFlag);
		return Arrays.asList(dataArray);
	}
	
}
