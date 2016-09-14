seajs.use(['common','calling-download'], function(Common,callingDownload) {
	var title=$('.top-bar h1');
    if(title.length>0&&title.text().length>10){
        title.text(title.text().slice(0,10)+"...");
    }
})