var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
    var query = url.parse(req.url, true).query;
    var callback = query.callback || "callback";

    /** ----------------------------------------
     * 请求参数格式数据说明dd
     * type: POST
     * -----------------------------------------
     */




    var data = {
        success: true,
        code: 0,
        data: [
            {
                parentId: 0,
                id: 1000179,
                name: "11111111",
                level: 0,
                cndir: "",
                children: [ ],
                isShow: "",
                sort: ""
            },
            {
                parentId: 0,
                id: 1000180,
                name: "22222222",
                level: 0,
                cndir: "",
                children: [ ],
                isShow: "",
                sort: ""
            },
            {
                parentId: 0,
                id: 1000168,
                name: "3333333",
                level: 0,
                cndir: "",
                children: [ ],
                isShow: "",
                sort: ""
            },
            {
                parentId: 0,
                id: 1000210,
                name: "44444",
                level: 0,
                cndir: "",
                children: [ ],
                isShow: "",
                sort: ""
            },
            {
                parentId: 0,
                id: 1000174,
                name: "5555555",
                level: 0,
                cndir: "",
                children: [ ],
                isShow: "",
                sort: ""
            },
            {
                parentId: 0,
                id: 1000177,
                name: "建材",
                level: 0,
                cndir: "",
                children: [ ],
                isShow: "",
                sort: ""
            }


        ]
    }
    res.writeHead(200, {
        'Context-Type': 'application/x-www-form-urlencode',
        //'Context-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'

    })
    // res.end(callback+'('+JSON.stringify(data)+')');
    //

    res.end(JSON.stringify(data));
}).listen(4001, function() {
    console.log('4001 task pub server is runing...')
})
