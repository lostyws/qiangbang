

import '{website}/js/common/common';

import '{plugins}/jquery-treegrid/js/jquery.treegrid';

$('.tree').treegrid();



$('.js-editcategory').click(function(event) {
	/* Act on the event */
	var cid = $(this).attr('itemid');
	window.location.href="/category/edit/"+cid;
});
$('.js-delcategory').click(function(event) {
	/* Act on the event */
	var cid = $(this).attr('itemid');
	if(confirm("确定删除吗 ？")){
		window.location.href="/category/delete/"+cid;
	}
});