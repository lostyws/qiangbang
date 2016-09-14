package com.qiangbang.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;


public class SignUtil {
	/**
	 * 网页授权接口签名验证
	 * 
	 * @param jsapiTicket
	 * @param timestamp
	 * @param noncestr
	 * @param url
	 * @return String
	 */
	public static String getSignature(String jsapiTicket, String timestamp,String noncestr,String url) {
		String[] arr = new String[] { "jsapi_ticket="+jsapiTicket,"noncestr="+noncestr, "timestamp="+timestamp, "url="+url};
		Arrays.sort(arr);
		String content = arr[0].concat("&"+arr[1]).concat("&"+arr[2]).concat("&"+arr[3]);
		MessageDigest md = null;
		String tmpStr = null;

		try {
			md = MessageDigest.getInstance("SHA-1");
			// 将三个参数字符串拼接成一个字符串进行sha1加密
			byte[] digest = md.digest(content.toString().getBytes());
			tmpStr = byteToStr(digest);
			System.out.println(tmpStr);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}

		content = null;
		return tmpStr;
	}

	/**
	 * 将字节数组转换为十六进制字符串
	 * 
	 * @param byteArray
	 * @return
	 */
	private static String byteToStr(byte[] byteArray) {
		String strDigest = "";
		for (int i = 0; i < byteArray.length; i++) {
			strDigest += byteToHexStr(byteArray[i]);
		}
		return strDigest;
	}

	/**
	 * 将字节转换为十六进制字符串
	 * 
	 * @param mByte
	 * @return
	 */
	private static String byteToHexStr(byte mByte) {
		char[] Digit = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A',
				'B', 'C', 'D', 'E', 'F' };
		char[] tempArr = new char[2];
		tempArr[0] = Digit[(mByte >>> 4) & 0X0F];
		tempArr[1] = Digit[mByte & 0X0F];

		String s = new String(tempArr);
		return s;
	}
	
    public static String create_timestamp() {
        return Long.toString(System.currentTimeMillis() / 1000);
    }
}
