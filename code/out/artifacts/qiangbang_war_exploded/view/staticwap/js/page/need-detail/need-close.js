/**
 * Created by yangwenshou on 16/3/11.
 */
seajs.use(['zepto','common','opption-collection-checkbox','bridge','bridge-data'], function($,Common, opptionCollectionCheckbox, Bridge, BridgeData) {
    $(document).ready(function () {
        opptionCollectionCheckbox.radioStatus($('.reason-list .item'));
        var data;
        var isMaiJiaBanApp = navigator.userAgent.match('zbj');
        var taskMode = $('input[name="taskMode"]'); //订单模式  bid为招标 其他为购买雇佣
        $('button.sure').on('click', function(){
            var checkedDom = $('input[checked="checked"]');
            var reason = checkedDom.val();
            var otherReasonDom = checkedDom.siblings('span').html();
            var otherReasonVal = $('.others-word').val();
            if(otherReasonDom == '其他问题'){
                if(otherReasonVal == ''){
                    Common.animaTips('请输入您遇到的问题');
                    return;
                }
                checkedDom.val(otherReasonVal);
                reason = otherReasonVal;
            }
            var result = {
                reason: reason,
                taskId: Common.getPar('taskId')
            };

            //关闭需求请求的接口地址，招标和购买雇佣不一样
            data = {
//                url: taskMode.val() == 'bid'? '/waptask/closeTask': '/task/canceltask',
                url:'/waptask/closeTask',
                data: result,
                type: 'post'
            };
            var result = opptionCollectionCheckbox.formCommit(data);
            if(result.flag){
            	 Common.animaTips('需求关闭成功');
            	 location.href = '/waptask/goNull';
            }else{
                Common.animaTips(result.data);
            }
        });
    });
})