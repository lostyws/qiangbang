/**
 * Created by yangwenshou on 16/3/11.
 */
seajs.use(['zepto','common', 'layer.m' ,'opption-collection-checkbox','page-load-loadmore-limit','user-operation'], function($,Common, Layer, opptionCollectionCheckbox, PageLoad, UserOperation) {
    $(document).ready(function () {
        opptionCollectionCheckbox.checkboxStatus($('.help-list .item'));
        var adviserHelpDom = $('.adviser-help');
        var adviserHelpDomInner = $('.adviser-help-inner');
        var buttonDom = $('.bottom-button');
        if(buttonDom[0]){
            var buttonTop = buttonDom.css('top');
        }
        var checkedBox;
        var data; //提交表单需要的数据
        var shadeLayer;
        var formData; //请求协助操作，选取的原因

        var helplistArr = [];
        var relationId, displayTxt, siblingsSpanDom; //请求协作传入的协助的具体选项

        //没有交易顾问的时候拨打400
        $('.adviser-null .button-con').on('click', function(){
           window.location.href = 'tel:4001886666';
        });

        $('button.sure').on('click', function(){
            checkedBox = $('input[checked="checked"]');
            var textareaDom = $('.textarea textarea');
            if(checkedBox.length > 0){
                checkedBox.each(function(i){
                    var _this = $(this);
                    siblingsSpanDom = _this.siblings('span')[0];
                    relationId = $(siblingsSpanDom).data('relationid');
                    displayTxt = $(siblingsSpanDom).html();
                    helplistArr[i] = {
                        relationId: relationId,
                        displayTxt: displayTxt
                    }
                });
            }else if(textareaDom.val()) {
                helplistArr.push({
                    relationId: textareaDom.data('relationid'),
                    displayTxt: '其他：' + textareaDom.val()
                });
            }else {
                Common.animaTips('亲，您的理由可以帮助我们更好的为您服务');
                return;
            }


            formData = {
                taskId : Common.getPar('taskId'),
                adviser: $('input[name="adviserId"]').val(),
                assistItemNdtoList: encodeURIComponent(JSON.stringify(helplistArr))
            };


            data = {
                url: '/hire/assist',
                data: formData,
                type: 'post'
            };
            var result = opptionCollectionCheckbox.formCommit(data);
            if(result.flag){
                Common.animaTips(result.data);
                //adviserHelpDom.addClass('slideUp');
                //adviserHelpDomInner.addClass('slideUp');
                setTimeout(function(){
                    location.href = location.href;
                },3000);
            }else{
                Common.animaTips(result.data);
            }
            //buttonDom.css('top',buttonTop);
        });

        //取消  直接收起顾问协作表单
        $('button.cancle').on('click', function(){
            adviserHelpDom.addClass('slideUp');
            adviserHelpDomInner.addClass('slideUp');
            buttonDom.css('top',buttonTop);
        });

        //有问题请求协作  展示顾问协作表单
        $('.need-help').on('click', function(){
            //
            //
            //
            //从页面获取当前需求是否有交易顾问
            var isAdviser = $('input[name="isAdviser"]').val();
            //
            //
            //

            if(isAdviser == 'true'){
                //有交易顾问
                adviserHelpDom.removeClass('slideUp');
                adviserHelpDom.addClass('slideDown');
                adviserHelpDomInner.removeClass('slideUp');
                adviserHelpDomInner.addClass('slideDown');
                buttonDom.css('top', $(window).height()-buttonDom.height());
            }else{
                //需求没有分配交易顾问时/需求已经结束时弹窗
                shadeLayer = Layer.open({
                    type: 1,
                    content: $('#contact-adviser').html()
                });
            }
        });

        $('body').delegate('.close', 'click', function(){
            Layer.close(shadeLayer);
        });

        PageLoad.pageLoad($('#tpl').html(), window.page.pageLoad, window.page.url,'get');
        //顾问协作问答加载更多数据
        var serviceId = $('.page-item.active').data('cate-id');
        PageLoad.loadData(window.page.url,serviceId,$('#tpl').html(),'get');
    });
})