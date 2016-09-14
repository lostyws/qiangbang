import '{website}/js/common/common';
import '{plugins}/jquery-treegrid/js/jquery.treegrid';

selectDefaultCatalog();



function selectDefaultCatalog(){
	var _catalogID = $("#catalogID").val();
	console.log("selectDefaultCatalog._catalogID="+_catalogID);
	//if(_catalogID!='' && _catalogID>0){
		$("#catalogSelect").val(_catalogID);
	//}
}


$('#catalogSelect').change(function(obj) {
	/* Act on the event */
	var _pid = $(this).find("option:selected").attr("pid");
	var cur_pid = $(this).find("option:selected").val();
	console.log("_pid="+_pid);
	if(!(_pid && _pid==0)){
		alert("不能选择子类!");
		selectDefaultCatalog();
		return false;
	}
});

$('#submitCateAdd').click(function(event) {
	/* Act on the event */
	var pid = $("#catalogSelect").find("option:selected").val();
	if(pid==""){
		pid=0;
	}
	$("#catalogID").val(pid);
	$("#form").submit();
});