/**
 * Created by Administrator on 2016/3/26.
 */
void function(window, document) {
    var imgList = [];
    var startTime = +new Date();

    function loadCb(){
        imgList.push({
            img: this,
            time: +new Date()
        });
    }

    var currentImgDoms = document.getElementsByTagName("img");

    for ( var i = 0, item; item = currentImgDoms[i++]; ) {
        if ( item.complete ) {
            loadCb.call( item );
        } else {
            item.onload = function(){
                this.onload = null;
                loadCb.call( this );
            }
        }
    }

    MonitorHD.getFirstSImg = imgList;
    MonitorHD.getFirstSTime = startTime;
}(window, document);