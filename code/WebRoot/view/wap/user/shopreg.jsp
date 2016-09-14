
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/webuploader/0.1.6/webuploader.css"/>

	
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/user/personreg.css"/>

<link rel="stylesheet" type="text/css" href="/view/staticwap/framework7/css/framework7.ios.css"/>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/framework7-qb-theme.css"/>
<body class="weixin-body">
	<!-- Status bar overlay for full screen mode (PhoneGap) -->
    <div class="statusbar-overlay"></div>
    <!-- Panels overlay-->
    <div class="panel-overlay"></div>
    <!-- Left panel with reveal effect-->
    <div class="panel panel-left panel-reveal">
      <div class="content-block">
        <p>Left panel content goes here</p>
      </div>
    </div>
    <!-- Views -->
    <div class="views">
      <!-- Your main view, should have "view-main" class -->
      <div class="view view-main">
        <!-- Top Navbar-->
        <div class="navbar ">
	        <div class="navbar-inner">
	            <div class="left">
	                <a class="link icon-only" href="javascript:history.go(-1);">
	                    <i class="icon icon-back"></i>
	                </a>
	            </div>
	            <div class="center sliding" style="left: -11.5px;">
	      	<div class="buttons-row buttons-inner">
	          	<a href="/shop/goNormalUser" class="button tab-link external">普通注册</a>
	          	<a href="/shop/goShopUser" data-href="" class="active  button tab-link external">个体注册</a>
	       	</div>
	            </div>
	            <div class="right">
	                <span class="js-showMenu"></span>
	            </div>
	        </div>
	    </div>
        <!-- Pages container, because we use fixed-through navbar and toolbar, it has additional appropriate classes-->
        <div class="pages navbar-through toolbar-through">
          <!-- Page, "data-page" contains page name -->
          <div data-page="index" class="page">
          
            <!-- Scrollable page content -->
            <div class="login-register page-content has-topbar">
		<img class="logo-img" src="/view/staticwap/image/page/user/login-logo.png" >
		<form class="clearfix">
			<div class="uploadIdCard">
                <div class="uploadIdCard-front webuploader-container"><div class="webuploader-pick">
                    <input type="hidden" class="input_check idCardFront" name="identityCardFront" nullmsg="请上传身份证正面图" errormsg="请上传身份证正面图">
                    <img class="uploadIdCard-front-img" src="/view/staticwap/image/page/common/webupload.png">
                    <p class="front-tip">身份证正面照</p>
                    
                </div>
                <div id="rt_rt_1ajb3i1f7gt716s1c5c1bvh2fq1">
                <input type="file" name="file" class="webuploader-element-invisible" accept="image/*"><label></label></div></div>
                <div class="uploadIdCard-back webuploader-container"><div class="webuploader-pick">
                    <input type="hidden" class="input_check idCardBack" name="identityCardBack" nullmsg="请上传身份证反面图" errormsg="请上传身份证反面图">
                    <img class="uploadIdCard-back-img" src="/view/staticwap/image/page/common/webupload.png">
                    <p class="back-tip">身份证反面照</p>
                </div><div id="rt_rt_1ajb3i1fc1dd3fjb18f81g1u1eo64" style="position: absolute; top: 0px; left: 0px; width: 188px; height: 117px; overflow: hidden; bottom: auto; right: auto;"><input type="file" name="file" class="webuploader-element-invisible" accept="image/*"><label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label></div></div>
            </div>
            <div class="uploadIdCard">
                <div class="businesslicense webuploader-container"><div class="webuploader-pick ">
                    <input type="hidden" class="input_check businesslicense" name="businesslicense" nullmsg="请上传身份证正面图" errormsg="请上传身份证正面图">
                    <img class="businesslicense-img" src="/view/staticwap/image/page/common/webupload.png">
                    <p class="businesslicense-tip">营业执照</p>
                    
                </div>
                </div>
                <div class="shopimg webuploader-container"><div class="webuploader-pick">
                    <input type="hidden" class="input_check shopimg" name="shopimg" nullmsg="请上传身份证反面图" errormsg="请上传身份证反面图">
                    <img class="shopimg-img" src="/view/staticwap/image/page/common/webupload.png">
                    <p class="shopimg-tip">门店照片</p>
                </div><div id="rt_rt_1ajb3i1fc1dd3fjb18f81g1u1eo64" style="position: absolute; top: 0px; left: 0px; width: 188px; height: 117px; overflow: hidden; bottom: auto; right: auto;"><input type="file" name="file" class="webuploader-element-invisible" accept="image/*"><label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label></div></div>
            </div>
			<input type="hidden" name="puserid" value="">

			<div class="input-item must txt">
				<label>手机号</label>
				<input name="tel" type="text" maxlength="11" placeholder="请输入手机号">
				</div>
			
			<div class="input-item must txt">
				<label>验证码</label>
				<input name="code"type="text" maxlength="6" placeholder="请输入验证码">
				<button type="button" class="get-code disabled">获取验证码</button>
			</div>
			<div class="input-item must txt">
				<label>密码</label>
				<input name="password" type="password" placeholder="请设置密码"></div>
			<div class="list-block">
			  <ul>
			    <li><a href="#" class="item-link smart-select">
			        <!-- "multiple" attribute for multiple select-->
			        <select name="shoptype" id="shoptype" multiple>
			        <c:forEach var="item" items="${categorys}" varStatus="status">
						<optgroup label="${item.cateName }">
			          	 	<c:forEach var="category" items="${item.categorys}" >
			          	 		<option value="${category.id }" parentname="${item.cateName }">${category.categoryname }</option>
			          	 	</c:forEach>
			          	 </optgroup>
					</c:forEach>
			          <!-- options grouped within "optgroup" tag-->
			        </select>
			        <input type="hidden" name="shoptypeJson" value="" id="shoptypeJson"/>
			        <input type="hidden" name="shoptypename" value="" id="shoptypename"/>
			        <div class="item-content">
			          <div class="item-inner">
			            <div class="item-title">分类</div>
			          </div>
			        </div></a></li>
			  </ul>
			</div>
			<div class="input-item must txt">
				<label>真实姓名</label>
				<input name="name" type="text" maxlength="11" placeholder="请输入真实姓名"></div>
			<div class="input-item must txt">
				<label>身份证号码</label>
				<input name="icard" type="text" maxlength="18" placeholder="请输入身份证号码"></div>
			<div class="input-item must txt">
				<label>店名</label>
				<input name="shopname" type="text" maxlength="40" placeholder="请输入店名"></div>
			<div class="input-item must txt">
				<label>经营者</label>
				<input name="operator" type="text" maxlength="11" placeholder="请输入真实姓名"></div>
			<div class="input-item must txt">
				<label>营业执照名称</label>
				<input name="businessname" type="text" maxlength="40" placeholder="请输入营业执照名称"></div>
			<div class="input-item must txt">
				<label>注册号</label>
				<input name="regnumber" type="text" maxlength="18" placeholder="请输入注册号"></div>
			<div class="input-item must txt">
				<label>经营地</label>
				<input name="managesite" type="text" maxlength="200" placeholder="请输入经营地"></div>
			<div class="input-item must txt">
				<label>联系方式</label>
				<input name="contactway" type="tel" maxlength="18" placeholder="请输入联系方式"></div>
				
			
			
				
			<!-- <button class="login-page-btn disabled" type="hidden" style="display: none;" id="register-btn">注册</button> -->
		</form>
			<div class="page-content has-topbar">
				<div style="color:#999;text-align: center;">点击按钮"注册"即表示您同意</div>
				<div style="color:#2c6fb6;text-align: center;">
					<a style="color:#2c6fb6;" class="item-link a open-picker1" href="#" data-picker=".picker-1">《抢帮网用户使用协议》</a>
					<a style="color:#2c6fb6;" class="item-link a open-picker2" href="#" data-picker=".picker-2">《抢帮网商户入驻协议》</a>
					<a style="color:#2c6fb6;" class="item-link a open-picker3" href="#" data-picker=".picker-3">《抢帮网商户行为规范》</a>

				</div>
			</div>
	</div>


          </div>
        </div>
        <!-- Bottom Toolbar-->
        <div class="toolbar">
          <div class="toolbar-inner row">
            <!-- Toolbar links -->
            
            <a href="#" class=" col-100 button button-big button-fill button-red" id="register-btn">注册</a>
            <!-- <button class="login-page-btn disabled" type="button"id="register-btn">注册</button> -->
          </div>
        </div>
      </div>
    </div>





















<div class="picker-modal picker-info" style="display: none;">
    <div class="toolbar">
      <div class="toolbar-inner">
        <div class="left">抢帮网用户使用协议</div>
        <div class="right"><a href="#" class="close-picker">关闭</a></div>
      </div>
    </div>
    <div class="picker-modal-inner">
      <div class="content-block">
        <div id="registrationAgreement">
        
       
        <h2 style="text-align: center;">抢帮网用户使用协议</h2>

<p>为了维护抢帮网（以下简称“本网站”）正常运营秩序，推动非实物交易的繁荣，保障需求顺利进行，制定抢帮网用户使用协议（以下简称“本协议”），本协议系用户因使用抢帮网平台的各项服务，而与抢帮网平台订立的正式的、完整的协议。用户在平台注册，即表示接受本协议的所有条款和内容。用户部分或全部不接受本协议条款的，不得使用抢帮网平台或使用抢帮网平台所提供的服务。</p>

<p>一、定义 <br>
1. &nbsp; &nbsp; &nbsp;抢帮网平台：系冠以“抢帮”字样的微信公众号,以下简称“抢帮网”。 <br>
2. &nbsp; &nbsp; &nbsp;抢帮网平台服务：通过移动互联网以抢帮网微信公众号的服务形态（包括但不限于未来技术发展出现的新的服务形态）向用户提供的各项服务。 <br>
3. &nbsp; &nbsp; &nbsp;抢帮网平台规则：包括（1）抢帮网平台规则频道内已经发布的，以及后续发布的全部规则、解读、公告等内容；（2）平台上发布的各类规则、实施细则、产品流程说明、公告等；（3）以及上述规则的不时修订文本。 <br>
4. &nbsp; &nbsp; &nbsp;用户：在抢帮网平台使用抢帮网平台服务的主体，都是本协议所指用户。凡使用同一身份认证信息或经抢帮网排查认定多个抢帮网账户的实际控制人为同一人的，均视为同一用户。 <br>
二、协议条款的确认和约束 <br>
1. &nbsp; &nbsp; &nbsp;用户在使用抢帮网平台的服务之前必须认真阅读本协议全部条款内容，如对条款有任何疑问的，应向抢帮网咨询。用户注册、使用抢帮网平台的服务，即表示已阅读并接受本协议所有内容，不应以未阅读本协议条款的内容或者未获得抢帮网对用户问询的解答等理由，主张本协议条款无效，或要求撤销本协议条款。 <br>
2. &nbsp; &nbsp; &nbsp;用户必须完全同意所有服务条款并完成注册程序，才能成为抢帮网的注册用户。在用户按照注册页面提示填写信息、阅读并同意本协议条款并完成全部注册程序后或以其他抢帮网允许的方式实际使用抢帮网平台的服务时，用户即受本协议条款的约束。 <br>
3. &nbsp; &nbsp; &nbsp;用户须确认，在完成注册程序或以其他抢帮网允许的方式实际使用抢帮网平台的服务时，应当是具备相应民事行为能力的自然人、法人或其他组织。如果不具备前述主体资格（如用户在18周岁以下），只能在父母或监护人的监护参与下才能使用抢帮网创建任务事项，且用户及其监护人应承担因此而导致的一切后果；抢帮网有权注销该用户的账户。 <br>
4. &nbsp; &nbsp; &nbsp;当用户在线下提供服务的同时，用户也承认了用户拥有相应的权利能力和行为能力。用户对提供的任务事项的真实性、合法性负责，并能够独立承担法律责任。 <br>
5. &nbsp; &nbsp; &nbsp;用户确认：本协议条款是处理双方权利义务的约定依据，除非违反国家强制性法律，否则始终有效。 <br>
6. &nbsp; &nbsp; &nbsp;抢帮网保留在中华人民共和国法律允许的范围内单方决定拒绝服务、关闭用户账户或取消任务事项的权利。 <br>
7. &nbsp; &nbsp; &nbsp;本协议内容包括协议正文及所有抢帮网已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。除另行明确声明外，任何抢帮网平台的服务均适用于本协议，用户承诺接受并遵守本协议的约定。如果用户不同意本协议的约定，用户应立即停止注册程序或停止使用抢帮网平台的服务。 <br>
三、责任信息与相关限制 <br>
1. &nbsp; &nbsp; &nbsp;用户个人明确同意对网络服务的使用承担风险。抢帮网对此不作任何类型的担保，不论是明确的或隐含的。包括但不限于：不担保服务一定能满足用户的要求，也不担保服务不会受中断，对服务的及时性、安全性、出错发生等都不作担保；对在抢帮网上得到的任何服务或交易进程，不作担保；对平台服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、稳定性、完整性和及时性不作出任何承诺和保证；不担保平台服务的适用性、无错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。 <br>
2. &nbsp; &nbsp; &nbsp;用户理解并接受：抢帮网平台作为信息发布、服务平台，无法控制每一任务事项所涉及的物品的质量、安全或合法性，任务事项内容的真实性或准确性，以及任务事项所涉各方履行任务事项的能力。用户应自行谨慎判断确定相关信息的真实性、合法性和有效性，并自行承担因此产生的责任与损失。任何信息资料（下载或通过抢帮网平台服务取得），取决于用户自己并由其承担系统受损或资料丢失的所有风险和责任。 <br>
3. &nbsp; &nbsp; &nbsp;除非法律法规明确要求、司法行政等政府机关要求，或出现以下情况，否则，抢帮网没有义务对所有用户的信息数据、服务信息、任务发布行为以及与任务事项有关的其它事项进行事先审查： <br>
（1）抢帮网有合理的理由认为特定用户及具体任务事项可能存在重大违法或违约情形。 <br>
（2）抢帮网有合理的理由认为用户在抢帮网平台的行为涉嫌违法或有违道德等不当情形。 <br>
4. &nbsp; &nbsp; &nbsp;用户了解并同意，抢帮网不对因下述情况而导致的任何损害赔偿承担责任，包括但不限于利润、商誉、使用、数据等方面的损失或其它无形损失的损害赔偿： <br>
（1）使用或未能使用抢帮网平台的服务； <br>
（2）第三方未经批准地使用用户的账户或更改用户的数据； <br>
（3）通过抢帮网平台的服务购买或获取任何商品、样品、数据、信息等行为或替代行为产生的费用及损失； <br>
（4）用户对抢帮网平台的服务的误解； <br>
（5）任何非因抢帮网的原因而引起的与抢帮网平台的服务有关的其它损失。 <br>
5. &nbsp; &nbsp; &nbsp;如因不可抗力或其他抢帮网无法控制的原因使抢帮网系统崩溃或无法正常使用导致网上交易无法完成或丢失有关的信息、记录等，抢帮网不承担责任。但是抢帮网会尽可能合理地协助处理善后事宜，并努力使客户免受经济损失。 <br>
6. &nbsp; &nbsp; &nbsp;用户同意在发现抢帮网平台任何内容不符合法律规定，或不符合本用户协议条款规定的，有义务及时通知抢帮网。如果用户发现个人信息被盗用或者其他权利被侵害，请将此情况告知抢帮网并同时提供如下信息和材料： <br>
（1）侵犯用户权利的信息的网址，编号或其他可以找到该信息的细节； <br>
（2）用户的联系方式，包括联系人姓名，地址，电话号码和电子邮件； <br>
（3）用户的身份证复印件、营业执照等其他相关资料。 <br>
7. &nbsp; &nbsp; &nbsp;经审查得到证实的，我们将及时删除相关信息。我们仅接受邮寄、电子邮件或传真方式的书面侵权通知。情况紧急的，用户可以通过客服电话先行告知，我们会视情况采取相应措施。 <br>
8. &nbsp; &nbsp; &nbsp;用户应当严格遵守本协议及抢帮网发布的其他协议条款、活动规则，因用户违反协议或规则的行为给第三方、或抢帮网造成损失的，用户应当承担全部责任。 <br>
四、平台使用规范 <br>
1. &nbsp; &nbsp; &nbsp;用户无论是作为信息方发布方或接收方，须严格按照抢帮网平台提供、发布、更新的服务条款和业务规则执行。抢帮网平台不时发布的成文或非成文的业务规则，以及既成的交易模式或惯例，视为本协议的重要组成部分。 <br>
2. &nbsp; &nbsp; &nbsp;在使用抢帮网平台服务过程中，用户承诺遵守以下约定： <br>
（1）在使用抢帮网平台的服务过程中实施的所有行为均遵守国家法律、法规等规范文件及抢帮网平台的各项规则的规定和要求，不违背社会公共利益或公共道德，不损害他人的合法权益，不违反本协议及相关规则。用户如果违反前述承诺，产生任何法律后果的，用户应以自己的名义独立承担所有的法律责任，并确保抢帮网平台免于因此产生任何损失。 <br>
（2）不发布国家禁止发布的信息，不发布涉嫌侵犯他人知识产权或其它合法权益的信息，不发布违背社会公共利益或公共道德、公序良俗的信息，不发布其它涉嫌违法或违反本协议及各类规则的信息。 <br>
（3）不使用任何装置、软件或例行程序干预或试图干预抢帮网平台的正常运作或正在抢帮网平台上进行的任何活动。 <br>
（4）不得发表、传送、传播、储存侵害他人知识产权、商业秘密权等合法权利的内容或包含病毒、木马、定时炸弹等可能对抢帮网服务系统造成伤害或影响其稳定性的内容。 <br>
（5）不得进行危害计算机网络安全的行为，包括但不限于：使用未经许可的数据或进入未经许可的服务器帐号；不得未经允许进入公众计算机网络或者他人计算机系统并删除、修改、增加存储信息；不得未经许可，企图探查、扫描、测试本平台系统或网络的弱点或其它实施破坏网络安全的行为；不得企图干涉、破坏本平台系统的正常运行。 <br>
五、禁止通过抢帮网平台递送、传播违禁品。违禁品包括但不限于下列物品： <br>
1. &nbsp; &nbsp; &nbsp;各类武器、弹药。如枪支、子弹、炮弹、手榴弹、地雷、炸弹等。 <br>
2. &nbsp; &nbsp; &nbsp;各类易爆炸性物品。如雷管、炸药、火药、鞭炮等。 <br>
3. &nbsp; &nbsp; &nbsp;各类易燃烧性物品，包括液体、气体和固体。如汽油、煤油、桐油、酒精、生漆、柴油、气雾剂、气体打火机、瓦斯气瓶、磷、硫磺、火柴等。 <br>
4. &nbsp; &nbsp; &nbsp;各类易腐蚀性物品。如火硫酸、盐酸、硝酸、有机溶剂、农药、双氧水、危险化学品等。 <br>
5. &nbsp; &nbsp; &nbsp;各类放射性元素及容器。如铀、钴、镭、钚等。 <br>
6. &nbsp; &nbsp; &nbsp;各类烈性毒药。如铊、氰化物、砒霜等。 <br>
7. &nbsp; &nbsp; &nbsp;各类麻醉药物。如鸦片（包括罂粟壳、花、苞、叶）、吗啡、可卡因、海洛因、大麻、冰毒、麻黄素及其它制品等。 <br>
8. &nbsp; &nbsp; &nbsp;各类生化制品和传染性物品。如炭疽、危险性病菌、医药用废弃物等。 <br>
9. &nbsp; &nbsp; &nbsp;各种危害国家安全和社会政治稳定以及淫秽的出版物、宣传品、印刷品等。 <br>
六、平台服务内容的所有权 <br>
1. &nbsp; &nbsp; &nbsp;抢帮网平台各项服务的所有权和运作权归抢帮网。 <br>
2. &nbsp; &nbsp; &nbsp;抢帮网平台服务内容包括：文字、软件、声音、图片、录像、图表、广告中的全部内容，电子邮件的全部内容，抢帮网平台为用户提供的其他信息。所有这些内容受版权、商标、标签和其它财产权法律的保护。 <br>
3. &nbsp; &nbsp; &nbsp;用户可将与本人相关的包括订单在内的服务信息，通过抢帮网提供的分享入口自由分享给他人，但不得用于商业用途。分享时不得进行如遮挡“抢帮”标识、擅自添加其他信息等加工处理。 <br>
4. &nbsp; &nbsp; &nbsp;用户接受本协议条款，即表明该用户将其在抢帮网平台发表的任何形式的信息的著作权或其他合法权利，包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利无偿独家转让给抢帮网平台所有，同时表明该用户许可抢帮网平台有权就任何主体侵权而单独提起诉讼，并获得全部赔偿。本协议效力及于用户在抢帮网平台发布的任何受著作权法保护的作品内容，无论该内容形成于本协议签订前还是本协议签订后。同时，抢帮网平台保留删除站内各类不符合规定的信息而不通知用户的权利。 <br>
七、用户信息授权及保护 <br>
1. &nbsp; &nbsp; &nbsp;抢帮网非常重视用户个人信息（即能够独立或与其他信息结合后识别用户身份的信息）的保护，在用户使用抢帮网提供的服务时，用户同意抢帮网按照在抢帮网平台上公布的隐私权政策收集、存储、使用、披露和保护用户的个人信息。抢帮网希望通过隐私权政策向用户清楚地介绍抢帮网对用户个人信息的处理方式，因此抢帮网建议用户完整地阅读隐私权政策，以帮助用户更好地保护用户的隐私权。 <br>
2. &nbsp; &nbsp; &nbsp;用户声明并保证，用户对用户所发布的信息拥有相应、合法的权利。否则，抢帮网可对用户发布的信息依法或依本协议进行删除或屏蔽。用户应当确保用户所发布的信息不包含以下内容： <br>
（1）违反国家法律法规禁止性规定的； <br>
（2）政治宣传、封建迷信、淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的； <br>
（3）欺诈、虚假、不准确或存在误导性的； <br>
（4）侵犯他人知识产权或涉及第三方商业秘密及其他专有权利的； <br>
（5）侮辱、诽谤、恐吓、涉及他人隐私等侵害他人合法权益的； <br>
（6）存在可能破坏、篡改、删除、影响抢帮网平台任何系统正常运行或未经授权秘密获取抢帮网平台及其他用户的数据、个人资料的病毒、木马、爬虫等恶意软件、程序代码的； <br>
（7）其他违背社会公共利益或公共道德或依据相关抢帮网平台协议、规则的规定不适合在抢帮网平台上发布的。 <br>
3. &nbsp; &nbsp; &nbsp;信息的授权使用 <br>
（1）用户了解并同意，抢帮网有权应政府部门（包括司法及行政部门）的要求，向其提供用户向抢帮网提供的用户信息和交易记录等必要信息。如用户涉嫌侵犯他人知识产权等合法权益，则抢帮网亦有权在初步判断涉嫌侵权行为存在的情况下，向权利人提供用户必要的身份信息。 <br>
（2）对于用户提供及发布除个人信息外的文字、图片、视频、音频等非个人信息，在版权保护期内，用户同意无偿授予抢帮网许可使用权利，并以已知或日后开发的形式、媒体或技术将上述信息纳入其它产品内。 <br>
（3）为方便用户使用抢帮网相关服务，用户授权抢帮网将用户在账户注册和使用抢帮网平台服务过程中提供、形成的信息传递给抢帮网相关服务提供者，或从抢帮网相关服务提供者获取用户在注册、使用相关服务期间提供、形成的信息。 <br>
4. &nbsp; &nbsp; &nbsp;用户完全理解并授权抢帮网、抢帮网授权的第三方以及其他用户与抢帮网一致同意的第三方，根据本协议及抢帮网规则的规定，处理用户在抢帮网平台上发生的所有交易及可能产生的交易纠纷。用户同意接受抢帮网或抢帮网授权的第三方或用户与抢帮网一致同意的第三方的判断和调处决定，该决定将对用户具有法律约束力。 <br>
5. &nbsp; &nbsp; &nbsp;一旦用户违反本协议，或违反与抢帮网签订的其他协议之约定，抢帮网有权对用户的权益采取限制措施，包括但不限于要求支付机构将用户账户内的款项支付给抢帮网指定的对象，并在抢帮网平台暂停、终止对用户提供部分或全部服务，且在经营或实际控制的任何网站公示用户的违约情况，抢帮网无须就此承担任何责任。 <br>
八、协议变更及通知 <br>
1. &nbsp; &nbsp; &nbsp;抢帮网可根据国家法律法规变化及维护交易秩序、保护消费者权益的需要，单方面不时修改、补充本协议。 <br>
2. &nbsp; &nbsp; &nbsp;如您对变更事项不同意的，您应当于变更事项确定的生效之日起停止使用抢帮网平台服务，变更事项对您不产生效力；如您在变更事项生效后仍继续使用抢帮网平台服务，则视为您同意已生效的变更事项。 <br>
3. &nbsp; &nbsp; &nbsp;您同意抢帮网以下列任何一种方式向您送达各类通知： <br>
（1）在抢帮网官方网站等公开平台公示的文案； <br>
（2）站内信、弹出消息、客户端推送消息； <br>
（3）根据您预留于抢帮网平台的联系方式发出的电子邮件、短信、函件等； <br>
（4）其他法律或商业惯例认定的通知方式。 <br>
九、法律管辖及适用 <br>
1. &nbsp; &nbsp; &nbsp;本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，如无相关法律规定的，则应参照通行惯例或公众道德标尺。 <br>
2. &nbsp; &nbsp; &nbsp;如双方就本条款内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向抢帮网平台所在地的人民法院提起诉讼。 <br>
3. &nbsp; &nbsp; &nbsp;本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。 <br>
4. &nbsp; &nbsp; &nbsp;本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</p>
    </div>
	</div>
</div>
</div>

    <div class="picker-modal picker-info2" style="display: none;">
	    <div class="toolbar">
	      <div class="toolbar-inner">
	        <div class="left">抢帮网商户入驻协议</div>
	        <div class="right"><a href="#" class="close-picker">关闭</a></div>
	      </div>
	    </div>
	    <div class="picker-modal-inner">
	      <div class="content-block">
	        <div id="registrationAgreement">
	        
	       
	        
            <p></p>
            <p style="TEXT-ALIGN: center;"><h2 style="TEXT-ALIGN: center;">抢帮网商户入驻协议</h2></p>
           

            <p>抢帮网（以下简称“本网站”）依据《抢帮网商户入驻协议》（以下简称“本协议”）的规定提供服务，本协议具有合同效力。商户注册时，请您认真阅读本协议，审阅并接受或不接受本协议。</p>

			<p>
			若您已经注册为本网站商户，即表示您已充分阅读、理解并同意自己与本网站订立本协议，且您自愿受本协议的条款约束。本网站有权随时变更本协议并在本网站上予以公告。经修订的条款一经在本网站的公布后，立即自动生效。如您不同意相关变更，必须停止使用本网站。本协议内容包括协议正文及所有抢帮网已经发布的各类规则。所有规则为本协议不可分割的一部分，与本协议正文具有同等法律效力。一旦您继续使用本网站，则表示您已接受并自愿遵守经修订后的条款。</p>
			<h4>第一条　商户资格</h4>
 
			<p>1、只有符合下列条件之一的自然人或法人才能申请成为本网站商户，可以使用本网站的服务：</p>

			<p style="padding-left:10px">A、年满十八岁，并具有民事权利能力和民事行为能力的自然人；</p>

			<p style="padding-left:10px">B、无民事行为能力人或限制民事行为能力人应经过其监护人的同意；</p>

			<p style="padding-left:10px">C、根据中国法律、法规、行政规章成立并合法存在的机关、企事业单位、社团组织和其他组织。无法人资格的单位或组织不当注册为本网站商户的，其与本网站之间的协议自始无效，本网站一经发现，有权立即终止对该用户的服务，并追究其使用本网站服务的一切法律责任。</p>

			<p>2、商户需要提供明确的联系地址和联系电话，并提供真实姓名或名称。</p>

			<p>3、本网站用户须承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性。　</p>　

			<h4>第二条　商户的权利和义务 </h4>
			<p>1、商户有权根据本协议及本网站发布的相关规则，利用本网站发布需求信息、查询用户信息、参与需求投标，在本网站社区及相关产品发布信息，参加本网站的有关活动及有权享受本网站提供的其他有关资讯及信息服务。</p>

			<p>2、商户须自行负责自己的商户账号和密码，且须对在商户账号密码下发生的所有活动（包括但不限于发布需求信息、网上点击同意各类协议、规则、参与需求投标等）承担责任。商户有权根据需要更改登录和账户提现密码。因商户的过错导致的任何损失由商户自行承担，该过错包括但不限于：不按照交易提示操作，未及时进行交易操作，遗忘或泄漏密码，密码被他人破解，商户使用的计算机被他人侵入。</p>

			<p>3、商户应当向本网站提供真实准确的注册信息，包括但不限于真实姓名、身份证号、营业执照、联系电话、地址、邮政编码等。保证本网站可以通过上述联系方式与自己进行联系。同时，商户也应当在相关资料实际变更时及时更新有关注册资料。</p>

			<p>4、商户在本网站注册的账号名称，不得有下列情形：</p>

			<p style="padding-left:5px">（1）违反宪法或法律法规规定的；</p>

			<p style="padding-left:5px">（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>

			<p style="padding-left:5px">（3）损害国家荣誉和利益的，损害公共利益的；</p>

			<p style="padding-left:5px">（4）煽动民族仇恨、民族歧视，破坏民族团结的；</p>

			<p style="padding-left:5px">（5）破坏国家宗教政策，宣扬邪教和封建迷信的；</p>

			<p style="padding-left:5px">（6）散布谣言，扰乱社会秩序，破坏社会稳定的；</p>

			<p style="padding-left:5px">（7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>

			<p style="padding-left:5px">（8）侮辱或者诽谤他人，侵害他人合法权益的；</p>

			<p style="padding-left:5px">（9）含有法律、行政法规禁止的其他内容的。</p>
 
			<p>5、商户不得以虚假信息骗取账号名称注册，或其账号头像、简介等注册信息存在违法和不良信息。</p>

			<p>6、商户不得冒用、关联机构或社会名人注册账号名称。</p>

			<p>7、商户不得以任何形式擅自转让或授权他人使用自己在本网站的用户帐号（实名认证通过后，不能进行变更）。</p>

			<p>8、商户有义务确保在本网站上发布的需求信息真实、准确，无误导性。　</p>

			<p>9、商户在本网站上发布需求和在社区内及相关产品发布信息，不得违反国家法律、法规、行政规章的规定，不得侵犯他人知识产权或其他合法权益的信息，不得违背社会公共利益或公共道德，不得违反抢帮网的相关规定。</p>

			<p>10、商户在本网站交易中应当遵守诚实信用原则，不得以干预或操纵发布需求等不正当竞争方式扰乱网上交易秩序，不得从事与网上交易无关的不当行为。</p>

			<p>11、商户不应采取不正当手段（包括但不限于虚假需求、互换好评等方式）提高自身或他人信用度，或采用不正当手段恶意评价其他用户，降低其他用户信用度。</p>

			<p>12、商户不得违反《银行卡业务管理办法》使用银行卡，或利用信用卡套取现金（以下简称套现）；商户不得盗刷他人银行卡；商户不得明知或应知他人可能盗刷银行卡而与对方进行交易。</p>

			<p>13、商户承诺自己在使用本网站实施的所有行为遵守法律、法规、行政规章和本网站的相关规定以及各种社会公共利益或公共道德。如有违反导致任何法律后果的发生，商户将以自己的名义独立承担相应的法律责任。</p>

			<p>14、商户在本网站网上交易过程中如与其他用户因交易产生纠纷，可以请求本网站从中予以协调处理。商户如发现其他用户有违法或违反本协议的行为，可以向本网站举报。</p>

			<p>15、除抢帮网另有规定外，商户应当自行承担因交易产生的相关费用，并依法纳税。</p>

			<p>16、未经本网站书面允许，商户不得将本网站的任何资料以及在交易平台上所展示的任何信息作商业性利用（包括但不限于以复制、修改、翻译等形式制作衍生作品、分发或公开展示）。　</p>

			<p>17、商户不得使用以下方式登录网站或破坏网站所提供的服务：</p>

			　　<p style="padding-left:10px">A、以任何机器人软件、蜘蛛软件、爬虫软件、刷屏软件或其它自动方式访问或登录本网站；</p>

			　　<p style="padding-left:10px">B、通过任何方式对本公司内部结构造成或可能造成不合理或不合比例的重大负荷的行为；</p>

			　　<p style="padding-left:10px">C、通过任何方式干扰或试图干扰网站的正常工作或网站上进行的任何活动。</p>

			<p>18、商户同意接收来自本网站的信息，包括但不限于活动信息、交易信息、促销信息等。</p>

			<h4>第三条　抢帮网的权利和义务</h4>

			<p>1、本网站仅为一个信息交流平台，是用户发布需求和商家提供解决方案的一个交易市场，本网站对交易双方均不加以监视或控制，亦不主动介入交易的过程。</p>

			<p>2、本网站有义务在现有技术水平的基础上努力确保整个网上交流平台的正常运行，尽力避免服务中断或将中断时间限制在最短时间内，保证用户网上交流活动的顺利进行。</p>

			<p>3、本网站有义务对商户在注册使用本网站信息平台中所遇到的与交易或注册有关的问题及反映的情况及时作出回复。</p>　

			<p>4、本网站有权对商户的注册资料进行审查，对存在任何问题或怀疑的注册资料，本网站有权发出通知询问商户并要求商户做出解释、改正。</p>

			<p>5、商户因在本网站网上交易与其他用户产生纠纷的，用户将纠纷告知本网站，或本网站知悉纠纷情况的，经审核后，本网站有权通过电子邮件及电话联系向纠纷双方了解纠纷情况，并将所了解的情况通过电子邮件互相通知对方；用户通过司法机关依照法定程序要求本网站提供相关资料，本网站将积极配合并提供有关资料。</p>

			<p>6、因网上信息平台的特殊性，本网站不承担对所有用户和商户的交易行为以及与交易有关的其他事项进行事先审查的义务，但如发生以下情形，本网站有权无需征得商户的同意限制商户的活动、向商户核实有关资料、发出警告通知、暂时中止、无限期中止及拒绝向该商户提供服务：</p>

			　　<p style="padding-left:10px">A、商户以非自然人名义进行认证之后认证主体自行注销或者经有权机关吊销或撤销的；</p>

			　　<p style="padding-left:10px">B、商户违反本协议或因被提及而纳入本协议的相关规则；</p>

			　　<p style="padding-left:10px">C、存在用户或其他第三方通知本网站，认为某个商户或具体交易事项存在违法或不当行为，并提供相关证据，而本网站无法联系到该商户核证或验证该商户向本网站提供的任何资料；</p>

			<p style="padding-left:10px">D、存在用户或其他第三方通知本网站，认为某个商户或具体交易事项存在违法或不当行为，并提供相关证据。本网站以普通非专业人员的知识水平标准对相关内容进行判别，可以明显认为这些内容或行为可能对他方或本网站造成财务损失或承担法律责任。</p>

			<p>7、本网站依据本协议及相关规则，可以冻结、使用、先行赔付、退款、处置商户缴存并冻结在本网站账户内的资金。因违规而被封号的商户账户中的资金在按照规定进行处置后尚有余额的，该商户可申请提现。</p>

			<p>8、本网站有权在不通知商户的前提下，删除或采取其他限制性措施处理下列信息：包括但不限于以规避费用为目的；以炒作信用为目的；存在欺诈等恶意或虚假内容；与网上交易无关或不是以交易为目的；存在恶意竞价或其他试图扰乱正常交易秩序因素；违反公共利益或可能严重损害本网站和其他商户合法利益。</p>

			<h4>第四条　服务的中断和终止</h4>

			<p>1、若商户申请终止本网站服务，需经本网站审核同意，方可解除与本网站的协议关系，但本网站仍保留下列权利：</p>

			　　<p style="padding-left:10px">A、本网站有权在法律、法规、行政规章规定的时间内保留该商户的资料，包括但不限于以前的商户资料、交易记录等；</p>

			　　<p style="padding-left:10px">B、若终止服务之前，该商户在本网站交易平台上存在违法行为或违反本协议的行为，本网站仍可行使本协议所规定的权利。</p>

			<p>2、商户存在下列情况，本网站可以终止向该商户提供服务：</p>

	　　    	<p style="padding-left:10px">A、在商户违反本协议及相关规则规定时，本网站有权终止向该商户提供服务。
			本网站将在中断服务时通知用户。但该商户在被本网站终止提供服务后，再一次直接或间接或以他人名义注册为本网站用户的，本网站有权再次单方面终止为该商户提供服务；</p>

	　　		<p style="padding-left:10px">			
			B、本网站发现商户注册资料中主要内容是虚假的，本网站有权随时终止为该商户提供服务；</p>

	　　     <p style="padding-left:10px">

			C、本协议终止或更新时，商户未确认新的协议的；</p>

	　　     <p style="padding-left:10px">
			D、其它本网站认为需终止服务的情况。</p>

			<h4>第五条　本网站的责任范围</h4>

			<p>当商户接受该协议时，商户应当明确了解并同意：</p>

			<p>1、本网站不能随时预见到任何技术上的问题或其他困难。该等困难可能会导致数据损失或其他服务中断。本网站是在现有技术基础上提供的服务。本网站不保证以下事项：</p>

			　　<p style="padding-left:10px">A、本网站将符合所有用户和商户的要求；</p>

			　　<p style="padding-left:10px">B、本网站不受干扰、能够及时提供、安全可靠或免于出错；</p>

			　　<p style="padding-left:10px">C、本服务使用权的取得结果是正确或可靠的。</p>

			<p>2、是否经由本网站下载或取得任何资料，由商户自行考虑、衡量并且自负风险，因下载任何资料而导致商户设备系统的任何损坏或资料流失，商户应负完全责任。希望商户在使用本网站时，小心谨慎并运用常识。</p>

			<p>3、商户经由本网站取得的建议和资讯，无论其形式或表现，绝不构成本协议未明示规定的任何保证。</p>

			<p>4、基于以下原因而造成的利润、商誉、使用、资料损失或其它无形损失，本网站不承担任何直接、间接、附带、特别、衍生性或惩罚性赔偿（即使本网站已被告知前款赔偿的可能性）：</p>

			　　<p style="padding-left:10px">A、本网站的使用或无法使用；</p>

			　　<p style="padding-left:10px">B、商户的传输或资料遭到未获授权的存取或变更；</p>

			　　<p style="padding-left:10px">C、本网站中任何第三方之声明或行为；</p>

			　　<p style="padding-left:10px">D、本网站在服务交易中为商户提供交易机会，推荐交易方；</p>

			　　<p style="padding-left:10px">E、本网站其它相关事宜。</p>

			<p>5、本网站只是为用户和商户提供一个服务交易的平台，对于用户所发布的需求的合法性、真实性及其品质，以及商户履行交易的能力等，本网站一律不负任何担保责任。</p>

			<h4>第六条　知识产权</h4>

			<p>1、本网站及本网站所使用的任何相关资料经由本网站向用户呈现的广告或资讯，均由本网站或其它权利人依法享有相应的知识产权，包括但不限于著作权、商标权、专利权或其它专属权利等，受到相关法律的保护。未经本网站或权利人明示授权，商户保证不修改、出租、出借、出售、散布本网站及本网站所使用的上述任何资料和资源，或根据上述资料和资源制作成任何种类产品。</p>

			<p>2、本网站授予商户不可转移及非专属的使用权，使商户可以通过单机计算机使用本网站的目标代码（以下简称“软件”），但商户不得且不得允许任何第三方复制、修改、创作衍生作品、进行还原工程、反向组译，或以其它方式破译或试图破译源代码，或出售、转让“软件”或对“软件”进行再授权，或以其它方式移转“软件”之任何权利。商户同意不以任何方式修改“软件”，或使用修改后的“软件”。</p>

			<p>3、商户不得经由非本网站所提供的界面使用本网站。</p>

			<h4>第七条　隐私权</h4>

			<p>1、信息使用</p>

　　
	　　     <p style="padding-left:10px">

			A、本网站不会向任何人出售或出借商户的个人或法人信息，除非事先得到商户得许可；</p>

　　
	　　     <p style="padding-left:10px">
			B、本网站亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播商户的个人或法人信息。任何商户如从事上述活动，一经发现，本网站有权立即终止与该商户的服务协议，查封其账号。</p>

			<p>2、信息披露</p>

			<p>商户的个人或法人信息将在下述情况下部分或全部被披露：</p>

			　　<p style="padding-left:10px">A、经商户同意，向第三方披露；</p>

			　　<p style="padding-left:10px">B、商户在使用本网站过程中涉及到知识产权类纠纷，有他方主张权利的，本网站在审核主张方提交的资料后认为披露商户信息有助于纠纷解决的；</p>

			　　<p style="padding-left:10px">C、根据法律的有关规定，或者行政、司法机关的要求，向第三方或者行政、司法机关披露；</p>

			　　<p style="padding-left:10px">D、若商户出现违反中国有关法律或者网站规定的情况，需要向第三方披露；</p>

			　　<p style="padding-left:10px">E、为提供你所要求的产品和服务，而必须和第三方分享商户的个人或法人信息；</p>

			　　<p style="padding-left:10px">F、其它本网站根据法律或者网站规定认为合适的披露。</p>

			<p ><b>用户或者第三方申请本网站披露其他商户信息的，本网站有权视实际情况要求申请人出具申请书，申请书内容应包含申请披露的信息范围、用途及使用承诺等内容。</b></p>

			<p>3、信息安全</p>

			　　<p style="padding-left:10px">A、在使用本网站服务进行网上交易时，请商户妥善保护自己的个人或法人信息，仅在必要的情形下向他人提供；</p>

			　　<p style="padding-left:10px">B、如果商户发现自己的个人或法人信息泄密，尤其是商户账户或“支付账户管理”账户及密码发生泄露，请商家立即联络本网站客服，以便我们采取相应措施。</p>

			<h4>第八条　不可抗力</h4>

			<p>因不可抗力或者其他意外事件，使得本协议的履行不可能、不必要或者无意义的，双方均不承担责任。本合同所称之不可抗力意指不能预见、不能避免并不能克服的客观情况，包括但不限于战争、台风、水灾、火灾、雷击或地震、罢工、暴动、法定疾病、黑客攻击、网络病毒、电信部门技术管制、政府行为或任何其它自然或人为造成的灾难等客观情况。</p>

			<h4>第九条　保密</h4>

			<p>商户保证在使用本网站过程中所获悉的属于抢帮网及他方的且无法自公开渠道获得的文件及资料（包括但不限于商业秘密、公司计划、运营活动、财务信息、技术信息、经营信息及其他商业秘密）予以保密。未经该资料和文件的原提供方同意，商户不得向第三方泄露该商业秘密的全部或者部分内容。但法律、法规、行政规章另有规定或者双方另有约定的除外。</p>

			<h4>第十条　交易纠纷解决方式</h4>

			<p>1、本协议及其规则的有效性、履行和与本协议及其规则效力有关的所有事宜，将受中华人民共和国法律管辖，任何争议仅适用中华人民共和国法律。</p>

			<p>2、本网站有权受理并调处您与其他用户因交易服务产生的纠纷，同时有权单方面独立判断其他用户对您的举报及索偿是否成立，若判断索偿成立，则本网站有权划拨您缴纳的保证金以及账户余额进行相应偿付。本网站没有使用自用资金进行偿付的义务，但若进行了该等支付，您应及时赔偿本网站的全部损失，否则本网站有权通过前述方式抵减相应资金或权益，如仍无法弥补损失，则本网站保留继续追偿的权利。因本网站非司法机关，您完全理解并承认，本网站对证据的鉴别能力及对纠纷的处理能力有限，受理交易纠纷完全是基于您之委托，不保证处理结果符合您的期望，本网站有权决定是否参与争议的调处。</p>

			<p>3、凡因履行本协议及其规则发生的纠纷以及在抢帮网上交易产生的所有纠纷，各方可协商解决，若协商不成的，各方一致同意提交瑞金仲裁委员会按其仲裁规则进行仲裁。</p>

			<h4>第十一条　完整协议</h4>

			<p>本协议由本协议条款与《抢帮网商户行为规范》等本网站公示的各项规则组成，相关名词可互相引用参照，如有不同理解，以本协议条款为准。</p>

			<p>您对本协议理解和认同，您即对本协议所有组成部分的内容理解并认同，一旦您使用本服务，你和本公司即受本协议所有组成部分的约束。</p>

			<h4>第十二条　抢帮网对本服务协议包括基于本服务协议制定的各项规则拥有最终解释权。</h4>

			<h4>第十三条　附则</h4>

			<p>在本协议中所使用的下列词语，除非另有定义，应具有以下含义：</p>

			<p>“本网站”在无特别说明的情况下，均指"抢帮网"。</p>

			<p>“用户”：是指在本网站上进行发布需求 “买”操作的用户。</p>

			<p>“商户”：是指在本网站上参加竞标 “卖”操作的用户。
			</p>
            <p></p>
        </div></div>
    </div>
</div>
    <div class="picker-modal picker-info3" style="display: none;">
	    <div class="toolbar">
	      <div class="toolbar-inner">
	        <div class="left">抢帮网商户行为规范</div>
	        <div class="right"><a href="#" class="close-picker">关闭</a></div>
	      </div>
	    </div>
    <div class="picker-modal-inner">
      <div class="content-block">
        <div id="registrationAgreement">
        
       
        
            <p></p>
            <p style="TEXT-ALIGN: center;"><h2 style="TEXT-ALIGN: center;">抢帮网商户行为规范</h2></p>
           

            <p>第一条　为了维护抢帮网公平、和谐的商业氛围，推动服务交易的繁荣，保障买卖双方的合法权益，维护抢帮网正常运营秩序，根据《抢帮网商户入驻协议》，制定本规则。  第二条　商户使用抢帮网进行交易时，应当遵守抢帮网站上公示的各项规则，积极提升自身经营状况，为消费者提供高品质的商品及优质的服务。所有服务项目商户应严格遵守相关法律法规规定，商户以专家身份为用户提供服务。本网站提供相关服务平台，其交易成果仅供参考。  第三条　为了提升消费者的消费体验，维护抢帮网正常运营秩序，对于违反《抢帮网商户行为规范》的商户，抢帮网将按照本规则规定的情形对商户进行处罚。  第四条　本规则构成《抢帮网商户入驻协议》的有效组成部分，具有同等法律效力；两者约定不一致的内容，以本规则的约定为准。  您同意：本网站有权对抢帮网担保交易中产生的违规行为进行处理。本网站处理举报完全基于您的委托，本网站承诺秉持公平、公正、透明的态度处理违规行为，但本网站并非权力机构，对相关证据只能以普通人的立场进行形式和内容上的审查和判断，不保证举报处理结果符合您的期望，亦不对违规行为的处理结果承担任何责任。  第五条　本规则只适用于中华人民共和国大陆境内交易产生的纠纷，涉及到此范围以外的争议，不适用本规则。  <br>
第六条  商户在抢帮网上参与竞标，应当遵守法律、法规、行政规章的规定和抢帮网商户入驻服务协议及相关规则，商户禁止参与违规需求，否则一切不利后果由本人承担。</p>

<p>第七条　商户应当保证竞标中的所有信息真实、可靠。不得夸大或者伪造商品及服务的品质，以影响用户判断或者骗取用户信任。</p>

<p>第八条　商户不得捏造、散布不实言论、诋毁、污蔑其他商户，进行不正当竞争。 <br>
 第九条　如若商户违规，抢帮网将按照本规则规定的情形对商户采取以下违规处理措施：  1、限制竞标：指禁止商户在需求下方进行竞标；  2、限制参加营销活动：指限制商户参加抢帮网官方发起的营销活动；</p>

<p>3、限制系统派单：指停止通过派单系统向商户派发订单；  4、冻结账户：指禁止商户使用违规账户登录抢帮网，限制商户参与竞标服务。  第十条　商户可在被违规处理之时起15天内向抢帮网客服提交违规申诉申请。&nbsp;  第十一条　违规行为处罚措施  （一）不履行商品交付或提供服务职责：指商户不按照需求约定内容或正常的交易流程，向用户提供符合需求要求、可正常使用的商品或匹配的服务的行为，包括：  1、商户无论以任何方式要求或引导用户先支付全额，再提供商品或服务的；  2、商户提供的商品或服务与需求的要求不一致且不配合处理的；  3、其他因商品本身的质量问题导致用户无法使用且不配合处理的。  若商户被认定为不履行商品交付或提供服务职责，对商户进行封店一个月处理，取消该笔交易，并将用户需求保证金全额退还给用户。  （二）线下交易：商户与用户取得联系后，不通过抢帮网进行交易而通过其他支付方式进行交易的行为，包括：  1、用户引导商户线下交易，商户同意的，包括但不限于以下情形：  a、商户从抢帮网获取用户信息，无论以何种形式进行线下交易的；  b、商户从抢帮网以外的途径获取用户信息，单笔交易中，部分款项通过抢帮网支付，而另一部分通过其他途径支付的。  2、商户引导用户线下交易，无论用户是否同意的，无论是否打款，金额大小。  以上2种情形：  抢帮网第一次发现并确认商户进行线下交易行为，抢帮网将对此商户名下（以相同证件认证的实名信息为依据）所有账号做搜索降权(屏蔽)（30 天）处理，处罚期间商户除能登陆处理已达成交易的正常订单外，禁止进行其他操作。若商户为缴纳保证金商户，则保证金不予退还。  抢帮网第二次发现并确认商家进行线下交易行为，抢帮网将对此商户名下（以相同证件认证的实名信息为依据）所有账号做封店（永久封停）处理，进行中的订单商户自行联系用户协商处理；若商户为缴纳保证金商户，则保证金不予退还。  用户因线下交易造成的一切经济损失由用户自行承担，网站将不承担任何法律责任。  （三）不诚信的行为：若商户出现不诚信的行为，抢帮网将视情节对商户进行处罚；不诚信行为包括但不限于以下情况：  1、短时间产生大量纠纷或退款（例如一周内产生3笔纠纷或退款，情节严重）。  2、收了预付款（或定金）未工作的（非用户原因）。  3、商户通过故意曲解抢帮网规则和交易流程等方式诱骗用户选标或付款的行为。  4、商户在中标后不兑现自己在竞标中（出售的服务中）承诺的行为。  5、已书面、口头或其他形式作出承诺后，明示毁约的。  6、针对开发类订单，一旦发现商户在未经用户许可的情况下留有后门程序等潜在破坏计算机系统、软件系统的行为，网站核实后将永久封号。  抢帮网根据诚实信用和鼓励交易的原则对违背承诺的行为给予每次扣除诚信度20分的处罚，并视情节给予不同期限封店处分。  （四）商户失去联系或无法沟通：若出现以下情况将认定商户失去联系或无法沟通：  1、抢帮网在接到用户反映联系不上商户后，通过电话、短信、邮件、站内信等方式联系商户，在48小时内仍无法和商户取得联系的情况；  2、用户有证据能证明商户在未进行事先告知的情况下，连续72小时用户都联系不上商户的情况；  3、更换联系方式未通知网站或对方以致在争议处理过程中无法联系；  4、网站三次联系（无论任何途径）均无法在纠纷上进行实质沟通；  5、拒接电话、无人接听、在通话中因不属于网站的原因中断等任何一种或各种情况累加达三次；  6、恶意辱骂工作人员导致无法沟通。  平台将视该方自愿放弃辩解的权利。平台将依据现有证据给出处理意见。平台将以站内信、短信、邮件等形式通知其争议处理的进度及结果。  商户出现以上情况时，将根据情况将受到处罚，具体处罚如下：  1、若用户已支付部分或全部款项但商户工作还未完成的，平台将扣除商户诚信度40分并暂时封停账号直到此交易纠纷解决。 <br>
2、若用户未支付任何款项而商户失去联系的，平台将扣除商户诚信度20分，并取消该笔交易将需求保证金全额退还给用户。  （五）未按时完成工作：指在双方明确约定工作周期到期后的24小时内，商户因自身原因未按要求按时完成前期约定工作的行为，约定的工作周期包括但不限于：  1、协议及补充协议约定的时间；  2、聊天记录中双方另行约定的时间。  若商户被认定为未按时完成工作的，平台将扣除商户诚信度20分，取消该笔交易，并将用户需求保证金全额退还给用户。  第十二条　延期提现  延期提现是指在特定情况下，抢帮网用户和商户 的部分或全部资金将只能延期提现。  （一）延期提现的情形包括但不限于：  1、涉嫌违反国家法律、法规的订单，包括但不仅限于提供虚假商品或服务、骗取他人财物、危及交易安全、发布违禁信息、发布禁售信息等；  2、当抢帮网用户的账号存在账号被盗等安全风险时；  3、交易行为或交易流程存在异常，如：交易履行风险较高的订单，存在虚假交易的订单，提供劣质商品或服务的订单；  4、所提供的商品或服务已引发司法调查、行政监管、媒体报道、公众质疑等风险情形；  5、商户的交易量或维权量在短期内出现显著增幅或密集积累，可能引发用户维权大量集中受理的风险情形；  6、其他抢帮网认为需要进行交易资金保障的订单。  （二）延期提现的解除方式：  1、申诉成功：针对可以申诉的延期提现情况，您可以进行申诉。若申诉成功，延期提现立即解除。若申诉不成功或未申诉，则该资金继续不可用直至延期提现到期后解除；  2、延期提现到期：延期提现期限内买家无维权需求，则延期提现立即解除。在此期间，若买家发起售后维权，钱款归属以维权判定结果为准。  <br>
第十三条　用户若需要线下签署项目服务协议，中标商户有义务配合用户完成协议的签署，若商户拒绝签署，用户有权要求取消商户中标资格退还保证金，该商户也将视为“未完成工作”受到相应处罚。</p>

<p>第十四条　如果用户因该中标服务项目侵犯了其他任何第三方的权利而遭到损失，有权利向中标商户追偿。&nbsp;</p>

<p>第十五条　商户的违规行为，通过抢帮网用户投诉或抢帮网排查发现。  第十六条　商户发生违规行为的，依据抢帮网举报产品的处理结果执行诚信度扣分处罚，抢帮网可视商户违规情节、纠错表现等方面酌情予以从轻或减轻处理。 <br>
 第十七条　本规则中的“天”，以24小时计算。 <br>
 第十八条　本规则自公布之日起实行。</p>
            <p></p>
        </div>
    </div>
       
     
    </div>
  </div>
</body>

<script>
var mstoken="UQpyphquRKgGYU1aDRw4I5sH%2BhjLQIEUJjUhiEL7pCZnkAJGc1bYJaQeTrQqT32akIMWKzwA9rlCgbMubX7E2RXmCJYWyqST%2BwkoZRaCfl4%3D";
var config = {
		uploadImgErrors: {
            'Q_EXCEED_NUM_LIMIT':  '只能选择1张图',
            'Q_EXCEED_SIZE_LIMIT': '图片大小超过5mb',
            'Q_TYPE_DENIED': '图片类型不符合，请选择gif,jpg,jpeg,bmp,png'
        }

}
</script>
<script type="text/javascript" src="/view/staticwap/framework7/js/framework7.js"></script>
<script type="text/javascript" src="/view/staticwap/js/jquery/1.11.1/jquery.js"></script>


<script type="text/javascript" src="/view/staticwap/webuploader/0.1.6/webuploader.custom.js"></script>

<script type="text/javascript" src="/view/staticwap/js/page/user/shopreg.js"></script> 
<script type="text/javascript">
	var myApp = new Framework7();
 
	var $$ = Dom7;
	 
	$$('.open-picker1').on('click', function () {
	  myApp.pickerModal('.picker-info')
	});
	$$('.open-picker2').on('click', function () {
	  myApp.pickerModal('.picker-info2')
	});
	$$('.open-picker3').on('click', function () {
	  myApp.pickerModal('.picker-info3')
	});
</script>


</html>