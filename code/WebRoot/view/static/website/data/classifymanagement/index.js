var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
    var query = url.parse(req.url, true).query;
    var callback = query.callback || "callback";

    /** ----------------------------------------
     * 请求参数格式数据说明
     * type: POST
     * -----------------------------------------
     */

    var data = {
        status: 0,
        data: [{
            text: "超级分类",
            
            children: [{
                text: "建材",
                children: [{
                    text: "橱柜",
                    children: [],
                    id: 5,
                    parentId: 4,
                    createTime: 1456297778,
                },{
                    text: "地板",
                    children: [],
                    id: 6,
                    parentId: 4,
                    createTime: 1456297778,
                }],
                
                id: 4,
                parentId: 1,
                createTime: 1456297778,
                
                
            },
            {
                text: "家具",
                
                children: [],
                id: 3,
                parentId: 1,
                createTime: 1456297757,
            }
            ],
            
            id: 1,
            parentId: 0,
            createTime: 1456285108,
        }],

    }
    res.writeHead(200, {
        'Context-Type': 'application/x-www-form-urlencode',
        'Access-Control-Allow-Origin': '*'
    })
    // res.end(callback+'('+JSON.stringify(data)+')');
    //
    res.end(JSON.stringify(data));
}).listen(3006,
function() {
    console.log('3006 classifymanagement server is runing...')
})