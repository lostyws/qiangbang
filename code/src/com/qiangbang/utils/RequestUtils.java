package com.qiangbang.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.text.ParseException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONException;
import org.json.JSONObject;


public class RequestUtils {
	
	public static String getResult(HttpServletRequest request){    
		String content="";
		try {
			 ServletInputStream in = request.getInputStream();// 取HTTP请求流
	        int size = request.getContentLength(); // 取HTTP请求流长度
	        byte[] buffer = new byte[size]; // 用于缓存每次读取的数据 
	        byte[] inStream = new byte[size]; // 用于存放结果的数组
	        int count = 0;
	        int rbyte = 0; 
	        while (count < size){ 
	            rbyte = in.read(buffer); // 每次实际读取长度存于rbyte中 sflj
	            for (int i = 0; i < rbyte; i++){
	            	inStream[count + i] = buffer[i];
	            }
	            count += rbyte;
	        }
	        content=new String(inStream,0,inStream.length,"UTF-8");
		} catch (IOException e) {
			e.printStackTrace();
		} 
		return content;
	}
	
	/**
	 * @return 
	 * @return 
	 * @return 
	 * @return 
	 * 
	 */
	public static <T>  T requestToBean(HttpServletRequest request,T t){
		//Map<String, String> map = request.getParameterMap();
		Enumeration<?> parameNames = request.getParameterNames();
		try{
		while(parameNames.hasMoreElements()){
			String key=parameNames.nextElement().toString();
			String value = request.getParameter(key);
			BeanUtils.setProperty(t, key,value );
		}
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
		return t;
		
	}
	
	/**
	 * 方法描述：根据参数名从reuqest中获取int值
	 * @author luoyuan
	 * @param @return
	 * 2014-8-23 上午11:29:36
	 * @return &{return_type}
	 * @throws
	 */
	public static int getIntBySession(HttpServletRequest request,String name){
		return request.getSession().getAttribute(name)==null||request.getSession().getAttribute(name).toString().length()==0?0:Integer.parseInt(request.getSession().getAttribute(name).toString());
	}
	
	/**
	 * 方法描述：根据参数名从reuqest中获取int值
	 * @author luoyuan
	 * @param @return
	 * 2014-8-23 上午11:29:36
	 * @return &{return_type}
	 * @throws
	 */
	public static double getDoubleBySession(HttpServletRequest request,String name){
		return request.getSession().getAttribute(name)==null||request.getSession().getAttribute(name).toString().length()==0.0?0:Double.parseDouble(request.getSession().getAttribute(name).toString());
	}
	
	/**
	 * 方法描述：从Session从获取String类型参数
	 * @author luoyuan
	 * @param @param request
	 * @param @param name
	 * @param @return
	 * 2014-8-29 下午02:08:10
	 * @return &{return_type}
	 * @throws
	 */
	public static String getStringBySession(HttpServletRequest request,String name){
		return request.getSession().getAttribute(name)==null?"":request.getSession().getAttribute(name).toString();
	}
	
	/**
	 * 方法描述：从请求从获取String类型参数
	 * @author luoyuan
	 * @param @param request
	 * @param @param name
	 * @param @return
	 * 2014-8-29 下午02:08:10
	 * @return &{return_type}
	 * @throws
	 */
	public static String getStringByReqeust(HttpServletRequest request,String name){
		return request.getParameter(name)==null?"":request.getParameter(name).toString().trim();
	}
	
	/**
	 * 方法描述：根据参数名从reuqest中获取int值
	 * @author luoyuan
	 * @param @return
	 * 2014-8-23 上午11:29:36
	 * @return &{return_type}
	 * @throws
	 */
	public static int getIntByRequest(HttpServletRequest request,String name){
		return request.getParameter(name)==null||request.getParameter(name).toString().length()==0?0:Integer.parseInt(request.getParameter(name).toString());
	}
	
	/**
	 * 方法描述：根据参数名从reuqest中获取int值
	 * @author luoyuan
	 * @param @return
	 * 2014-8-23 上午11:29:36
	 * @return &{return_type}
	 * @throws
	 */
	public static double getDoubleByRequest(HttpServletRequest request,String name){
		return request.getParameter(name)==null||request.getParameter(name).toString().length()==0.0?0:Double.parseDouble(request.getParameter(name).toString());
	}
	
	/**
	 * 方法描述：根据参数名从reuqest中 getIntByAttribute 获取int值
	 * @author luoyuan
	 * @param @return
	 * 2014-8-23 上午11:29:36
	 * @return &{return_type}
	 * @throws
	 */
	public static int getIntByAttribute(HttpServletRequest request,String name){
		return request.getAttribute(name)==null||request.getAttribute(name).toString().length()==0?0:Integer.parseInt(request.getAttribute(name).toString());
	}
	
	/**
	 * 拼接请求参数
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static String chainingParams(HttpServletRequest request){
		//迭代请求参数
		Enumeration<String> e = request.getParameterNames();
		String out = "";
		while (e.hasMoreElements()){
			String name = (String) e.nextElement();
			//最后一个参数时不用加&符号
			if(e.hasMoreElements()){
				out += name+"="+request.getParameter(name)+"&";
			}else{
				out += name+"="+request.getParameter(name);
			}
		}
		return out;
	}
	
	public static String getResult(String url, String param) {
		PrintWriter out = null;
		BufferedReader in = null;
		String result = "";
		try {
			URL realUrl = new URL(url);
			// 打开和URL之间的连接
			URLConnection conn = realUrl.openConnection();
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("user-agent","Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)");
			// 发送POST请求必须设置如下两行
			conn.setDoOutput(true);
			conn.setDoInput(true);

			// 获取URLConnection对象对应的输出流
			out = new PrintWriter(new OutputStreamWriter(conn.getOutputStream(),"utf-8"));
			// 发送请求参数
			out.print(param);
			// flush输出流的缓冲
			out.flush();
			// 定义BufferedReader输入流来读取URL的响应
			in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			System.out.println("发送POST请求出现异常！" + url);
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException ex) {
			}
		}
		return result;
	}
	
	/**
	 * 获取远程接口JSON数据,转化成Map
	 * @param params
	 * @param remoteUrl
	 * @return
	 * @throws IOException 
	 * @throws ParseException 
	 */
	public static JSONObject getRemoteIntefaceResult(JSONObject params ,String remoteUrl){
		String resultStr = getResult(remoteUrl, params.toString());
		if(StringUtils.isNotBlank(remoteUrl)){
			try {
				return new JSONObject(resultStr);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return new JSONObject();
	}
	
}
