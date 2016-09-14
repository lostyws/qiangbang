package com.qiangbang.handle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jfinal.handler.Handler;

public class UrlConvertHandler extends Handler{

	@Override
	public void handle(String target, HttpServletRequest request, HttpServletResponse response, boolean[] isHandled) {
		int index = target.indexOf("conn");
		if (index != -1){
		    return;
		}
		nextHandler.handle(target, request, response, isHandled);
	}

}
