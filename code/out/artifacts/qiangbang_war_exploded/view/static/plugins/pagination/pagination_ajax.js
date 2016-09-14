function Paginationajax(args) {
  this.tag = true;
  this.ajaxurl = args.ajaxurl;
  this.callback = args.callback || function() {};
  this.setData = args.setData || function() {}; 
  this.ajaxdata = args.ajaxdata;
  this.paginationCls = args.paginationCls;
  this.type = args.type;
  this.dataType = args.dataType;
}

Paginationajax.prototype.ajax = function() {
  var _this = this;

  if(!_this.tag) return;
  
  var dtd = $.Deferred();

  var current_page = arguments[0];

  /**设置需要的ajax data**/
  var data = _this.setData();

  /**扩展ajax data**/
  _this.ajaxdata = $.extend(_this.ajaxdata, {current_page: current_page}, data || {} );

  $.ajax({
    type: _this.type,
    url: _this.ajaxurl,
    // data: {
    //   page_size: 20,
    //   current_page : arguments[0] 
    // },
    data: _this.ajaxdata,
    dataType: _this.dataType,
    success: function(data){
      dtd.resolve(data);
      _this.callback(data);
      _this.setData();
      _this.tag = true;
    }
  });
  
  return dtd.promise();
}

Paginationajax.prototype.pagination = function(data) {
  var _this = this;
  _this.tag = false;
  var total_page = Math.ceil(data.total_size/data.page_size);

  $(_this.paginationCls).pagination(total_page, {
    'items_per_page': 1,
    'num_display_entries': 5,
    'num_edge_entries': 10,
    'prev_text': '上一页',
    'next_text': '下一页',
    'callback': function() {_this.ajax.apply(_this, arguments);}
  });
}

Paginationajax.prototype.init = function() {
  var _this = this;
  $.when(this.ajax()).then(
    function(data) {
      _this.pagination(data);//初始化一次
    },
    function() {
      alert('请求失败');
    }
  );
}
