package com.qiangbang.controller;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.jfinal.aop.Before;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.upload.UploadFile;
import com.qiangbang.common.Constants;
import com.qiangbang.config.QbConfig;
import com.qiangbang.entity.Attachment;
import com.qiangbang.entity.Users;
import com.qiangbang.interceptor.AdminInterceptor;
import com.qiangbang.utils.CommonUtils;
import com.qiangbang.utils.IpUtil;

/**
  * @ClassName: AttachmentController 
  * @Description: 微信端用户 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月14日 下午3:17:10 
 */
public class FileController extends BaseController{
	
	public void upload(){
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", -1);
		resultMap.put("data", "");
		int ftype = getParaToInt("ftype");
		Integer uid = getParaToInt("uid");
		System.out.println(ftype);
		UploadFile file = getFile();
		if(file!=null){
			String fileName = file.getFileName();
            String extentionName = fileName.substring(fileName
                    .lastIndexOf(".")); // 后缀名

            int id = uid==null?1:uid;
            String newName = id + "_" +CommonUtils.getCurrentTime()
                    + extentionName;// 新名

            String filePath = QbConfig.FILEPATH + "/" + newName;// 文件完整路径
            file.getFile().renameTo(new File(filePath)); // 重命名并上传文件
            
            Attachment oldAttach = Attachment.me.findByUidAndType(id, ftype);
            if(oldAttach!=null){
            	oldAttach.set("status", -1);
            	oldAttach.update();
            	File oldfile = new File(oldAttach.getStr("path"));
            	oldfile.delete();
            }
	        
	        Attachment attach = new Attachment();
	        attach.set("uid", id);
	        attach.set("filename", fileName);
	        attach.set("filetype", ftype);
	        attach.set("status", 0);
	        attach.set("path", filePath);
	        attach.set("ctime", new Date());
	        attach.save();
	        
	        HashMap<String, Object> dataMap = new HashMap<String, Object>();
	        dataMap.put("filename", "/file/download?aid="+attach.getInt("id"));
    		resultMap.put("status", 0);
    		resultMap.put("data", dataMap);
		}
		renderJson(resultMap);

	}
   
	public void upload_wap(){
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", -1);
		resultMap.put("data", "");
		int ftype = getParaToInt("ftype");
		System.out.println(ftype);
		Users users = (Users) getRequest().getSession().getAttribute("users");
		UploadFile file = getFile();
		if(file!=null){
			String fileName = file.getFileName();
            String extentionName = fileName.substring(fileName
                    .lastIndexOf(".")); // 后缀名

            int id = users==null?1:users.getInt("id");
            String newName = id + "_" +CommonUtils.getCurrentTime()
                    + extentionName;// 新名

            String filePath = QbConfig.FILEPATH + "/" + newName;// 文件完整路径
            file.getFile().renameTo(new File(filePath)); // 重命名并上传文件
            
            Attachment oldAttach = Attachment.me.findByUidAndType(id, ftype);
            if(oldAttach!=null){
            	oldAttach.set("status", -1);
            	oldAttach.update();
            	File oldfile = new File(oldAttach.getStr("path"));
            	oldfile.delete();
            }
	        
	        Attachment attach = new Attachment();
	        attach.set("uid", id);
	        attach.set("filename", fileName);
	        attach.set("filetype", ftype);
	        attach.set("status", 0);
	        attach.set("path", filePath);
	        attach.set("ctime", new Date());
	        attach.save();
	        
	        HashMap<String, Object> dataMap = new HashMap<String, Object>();
	        dataMap.put("filename", "/file/download?aid="+attach.getInt("id"));
    		resultMap.put("status", 0);
    		resultMap.put("data", dataMap);
		}
		renderJson(resultMap);

	}
	
	public void download(){
		int aid = getParaToInt("aid");
		Attachment att = Attachment.me.findById(aid);
		if(att!=null){
			String path = att.getStr("path");
			String filename = att.getStr("filename");
			downLoadFile(filename,path);
		}
		renderNull();
	}
	
	/**
	 * 文件下载
	 */
	public void downLoadFile(String fileName,String filePath){
		InputStream inputStream = null;
        OutputStream os = null;
		try {
	        //Content-Disposition 中文乱码处理
	        String userAgent = getRequest().getHeader("user-agent");
			userAgent = userAgent==null?"":userAgent.toLowerCase();
			String new_fileName = URLEncoder.encode(fileName, "utf-8");
			String content = "attachment;fileName=" + new_fileName;
			if (userAgent.indexOf("opera") != -1){ 
				content = "attachment;filename*=UTF-8''" + new_fileName;  
		    }else if(userAgent.indexOf("safari") != -1 || userAgent.indexOf("applewebkit") != -1 || userAgent.indexOf("firefox") != -1) { 
		    	content = "attachment;filename=\"" + new String(fileName.getBytes("UTF-8"),"ISO8859-1") + "\""; 
		    }  
	        getResponse().setCharacterEncoding("utf-8");
	        getResponse().setContentType("multipart/form-data");
	        getResponse().setHeader("Content-Disposition", content);
	        if(StringUtils.isNotBlank((filePath))){
	        	File file = new File(filePath);
	        	if(file.exists()){
	        		inputStream = new FileInputStream(file);
	        		os = getResponse().getOutputStream();
	        		byte[] b = new byte[2048];
	        		int length;
	        		while ((length = inputStream.read(b)) > 0) {
	        			os.write(b, 0, length);
	        		}
	        		os.flush();
	        	}
	        }
		}catch (Exception e) {
    		e.printStackTrace();
    	}finally{
    		try {
    			if(os!=null)
    				os.close();
    			if(inputStream!=null)
    				inputStream.close();
    		} catch (IOException e) {
    			e.printStackTrace();
    		}
    	}
	}
	
	/****
	    * 取得文件名的后缀
	    * @param fileName
	    * @return
	    */
		public static String getExtention(String fileName)  {
			if(fileName.indexOf(".")==-1){
				return "";
			}
	        int pos = fileName.lastIndexOf(".");
	        return fileName.substring(pos);
		}
	
	
}
