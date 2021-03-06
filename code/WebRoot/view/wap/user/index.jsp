
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>

<%@ include file="/view/wap/layout/head.jsp" %>
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/confirm/reward/sure-tuoguan/sure-tuoguan.css" />
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/widget/confirm/reward/common-edit-reward/common-edit-reward.css" />
<link rel="stylesheet" type="text/css" href="/view/staticwap/css/page/user/me.css" />

<body class=mobile-page>
    <div class="top-bar ">
        <div class="go-back">
            <button class="btn_back"></button>
        </div>
        <h1 style="display:none;">我的</h1>
        <div class="home">
            <button class="more-action"></button>
            <ul class="attach-menu">
                <li><a href="/user/tohelp">查看帮助</a></li>
                <li><a href="/user/advise">意见反馈</a></li>
                <li><a href="/user/loginout">退出登录</a></li>
            </ul>
        </div>
    </div>
    <div class="wx-top hide">
        <a>点我关注“抢帮网”优惠享不停</a>
        <i class="iconfont icon-close"></i>
    </div>
    <!-- wap -->
    <input type="hidden" name="totalprice">
    <input type="hidden" name="not-pay-price">
    <input type="hidden" name="tuoguan-reward-percent">
    <input type="hidden" name="userItemTaskId">
    <div class="user-me has-topbar">
        <div class="person-message">
            <div class="user-face"><img src="/view/staticwap/image/widget/face-default.png" alt=""></div>
            <p class="fsize-14 fcolor-white">m_47283ukdvy</p>
            <div class="bottom">
                <ul class="unstyled display-flex">
                    <li class="item non">
                        <a class="">未认证</a>
                    </li>
                    <li class="vertival-middle"></li>
                    <li class="item">
                        <a class=" ">未交保证金</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="my-property">
            <a class="my-item my-coupon" href="/user/coupon" data-linkid="10006658">
                <span>我的保证金</span>
                <span class="num">0</span>
            </a>
            <span class="line"></span>
            <div class="my-item my-money">
                <span>我的余额</span>
                <span class="num">0</span>
            </div>
        </div>
        <div class="my-order open">
            <span>我的订单</span>
            <button class="sift down" data-linkid="10006659">筛选</button>
        </div>
        <div class="order-sift">
            <button class="active" data-status="all" data-linkid="10006660">全部</button>
            
            <button data-status="ing" data-linkid="10006662">进行中</button>
            <button data-status="end" data-linkid="10006663">已结束</button>
            <button data-status="wait" data-linkid="10006661">已取消</button>
        </div>
        <div class="sift-result">
            <div class="sift-content active" data-sift="all">
                <ul></ul>
                <div class="load-more">
                    <button>点击加载更多</button>
                </div>
                <div class="load-none no-order">抱歉，暂时没有相关订单</div>
                <div class="load-over">没有更多数据</div>
            </div>
            <div class="sift-content" data-sift="wait">
                <ul></ul>
                <div class="load-more">
                    <button>点击加载更多</button>
                </div>
                <div class="load-none no-order">抱歉，暂时没有相关订单</div>
                <div class="load-over">没有更多数据</div>
            </div>
            <div class="sift-content" data-sift="ing">
                <ul></ul>
                <div class="load-more">
                    <button>点击加载更多</button>
                </div>
                <div class="load-none no-order">抱歉，暂时没有相关订单</div>
                <div class="load-over">没有更多数据</div>
            </div>
            <div class="sift-content" data-sift="end">
                <ul></ul>
                <div class="load-more">
                    <button>点击加载更多</button>
                </div>
                <div class="load-none no-order">抱歉，暂时没有相关订单</div>
                <div class="load-over">没有更多数据</div>
            </div>
            <div class="list-data-loading"></div>
        </div>
    </div>
    <script src="/view/staticwap/js/plugin/first-screen-time.js"></script>
    <script type="text/template" id="order-tpl">
        {@each list as item}
        <button class="order-item click" data-url="/task/${item.taskId}/">
            <div class="order-status  type${item.state}">
                ${item.status} {@if item.taskType == '1'}
                <span class="order-resource">天蓬</span> {@/if} {@if item.state==1 && item.amount!=0}
                <input type="button" class="tuoguan-reward" data-taskid="${item.taskId}" data-linkid="10006664" value="托管"> {@/if}
            </div>
            <div class="order-title">${item.title}</div>
            <div class="order-info">
                <span class="amount">
							{@if item.amount==0}
							可议价
							{@else}
							¥${item.amount}
							{@/if}
						</span>
                <span>${item.works_num}参与</span>
                <span>${item.modeMsg}</span>
            </div>
        </button>
        {@/each}
    </script>
    <!-- /已托管，托管-->
    <script id="nextTuoguanNoPercentContent" type="text/tpl">
        <div class="warning"><i class="iconfont icon-warning"></i>托管赏金让服务商更好的响应您的需求</div>
        <div class="fcolor-orange-highlight">总赏金：<span class="j-reward-totalPrice"></span>元<span class="fsize-12"><em class="fcolor-5d">（未托管</em><span class="j-reward-not-pay"></span><em class="fcolor-5d">元）</em></span>
        </div>
        <div class="tuoguan-reward-input">
            <label for="">托管金额：</label>
            <div class="input-price">
                ¥
                <input type="number" name="tuoguan-reward-input" placeholder="">
            </div>
        </div>
    </script>
    <script id="next-tuoguan-no-percent" type="tpl">
        <div class="confirm-con next-tuoguan-no-percent">
            <div class="confirm-title border-bottom">
                托管赏金
            </div>
            <div class="confirm-body bg-white
                        ">
                <p></p>
            </div>
            <div class="confirm-bottom display-box">
                <button class="cancle  item">暂不托管</button>
                <button class="sure  item">确认，去托管</button>
            </div>
        </div>
    </script>
    <!-- /未托管，托管-->
    <script id="sureTuoguanContent" type="text/tpl">
        <div class="warning"><i class="iconfont icon-warning"></i>托管赏金让服务商更好的响应您的需求</div>
        <div>总赏金：<span class="fcolor-orange-highlight"><span class="j-reward-totalPrice"></span>元</span>
        </div>
        <p class="fsize-12 fcolor-a1">您也可以分期托管，最低可以只托管<span class="j-reward-percent"></span></p>
        <div class="tuoguan-reward-input">
            <label for="">托管金额：</label>
            <div class="input-price">
                ¥
                <input type="number" name="tuoguan-reward-input" placeholder="请输入托管金额">
            </div>
        </div>
    </script>
    <script id="sure-tuoguan" type="tpl">
        <div class="confirm-con sure-tuoguan">
            <div class="confirm-title border-bottom">
                托管赏金
            </div>
            <div class="confirm-body bg-white
                        ">
                <p></p>
            </div>
            <div class="confirm-bottom display-box">
                <button class="cancle  item">暂不托管</button>
                <button class="sure  item">确认，去托管</button>
            </div>
        </div>
    </script>

    <script type="text/javascript" src="/view/staticwap/js/page/user/me.js"></script>
</body>



</html>
