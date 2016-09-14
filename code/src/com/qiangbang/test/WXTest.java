package com.qiangbang.test;

import com.qiangbang.common.Constants;
import com.qiangbang.utils.SignUtil;
import com.qiangbang.utils.WeixinUtil;

public class WXTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
//		getToken();
		String token = "zEQSQc__6Y85cmwXLDMUW30hnl3D8kx2mxP_Q3RbmjeRpnQIMjo3yjbsnvAp-CAifwURFnhT5-4YaHCUq6Hsd-Z8FaDPNElyx8rmH6GZDpFjqqPNrrgjm4KH_q-RZuBMOGMdAIAUMS";
//		getTicket(token);
		sign();
	}
	
	public static void getToken(){
		String appId = Constants.WeiXinAppId;
		String sercret = Constants.WeiXinSecret;
		String token = WeixinUtil.getAccessToken(appId, sercret);
		System.out.println("token:"+token);
	}
	
	public static void getTicket(String token){
		String ticket = WeixinUtil.getJSSDKTicket(token);
		System.out.println("ticket:"+ticket);
	}
	
//	token:22uoJMr5nmE1oIsGRuxr7Max0-D_aTsIMevVnMXrzuo1xLFVdVXpz04dReyFXqMnpsOQFgTiYy7embs6mLKFVkmKaypNt-EIRoKCJiCuzlwbHX-EelxhYtY-P8-PUqjOSDCaAFAALK
	public static void sign(){
		String timestamp = SignUtil.create_timestamp();
		String jsapiTicket ="kgt8ON7yVITDhtdwci0qeXIv8XZcQBt1oWOtU2MfuwRxYUyxRxBtXmDh02gGWh2ItIJmMhZ6yRDMrIfaXqxbKA";
		String noncestr ="Ws3WZYTPz0wzccnW";
		String url ="http://www.yangwenshou.com";
		String signature = SignUtil.getSignature(jsapiTicket, timestamp, noncestr, url);
		System.out.println("timestamp:"+timestamp);
		System.out.println("noncestr:"+noncestr);
		System.out.println("signture:"+signature);
	}
}
