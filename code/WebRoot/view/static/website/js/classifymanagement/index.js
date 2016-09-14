

import '{myplugins}/util/util.css';
import '{plugins}/datatables/css/dataTables.bootstrap.min.css';
import '{plugins}/artdialog/css/ui-dialog.css';
import '{website}/css/commercialtenant/index.css';

import '{website}/js/common/common';
import '{myplugins}/util/util';
import '{plugins}/datatables/js/jquery.datatables';
import '{plugins}/datatables/js/dataTables.bootstrap';
import '{plugins}/artdialog/js/dialog';

var orgTree = null;

/**
 * entry
 */
$.when(getOrg())
    .then(treeInit)
    .always(function() {
        //hide loading
        util.loading.hide();

        //展开
        setTimeout(function() {
            var orgTree = $('.org-tree').jstree(true);
            orgTree.open_all();
        }, 100);
    });


/**
 * getOrg
 * 获取分类json
 * @param {Object} data 发送ajax的参数
 */
function getOrg(data) {
    //show loading
    util.loading.show();

    var dtd = $.Deferred();

    //ajax
    $.ajax({
        url: config.orgUrl,
        data: data,
        success: function(d) {
            if (d.status === 0) {
                dtd.resolve(d.data);
            } else {
                showErrorMsg({
                    msg: d.msg || '获取分类数据失败'
                });
                dtd.reject();
            }
        },
        error: function() {
            showErrorMsg({
                msg: '服务器无响应,获取分类数据失败'
            });
            dtd.reject();
        }
    });


    return dtd.promise();
}


/**
 * treeInit
 * 分类初始化
 * @param {Object} data 分类数据
 */
function treeInit(data) {
    console.log(data);
    $('.org-tree').jstree({
        "core": {
            "check_callback": true,
            data: data
        },
        types: {
            users: {
                icon: "icon icon-user"
            }
        },
        plugins: ["types"]
    });

    if (data.length <= 0) {
        $('.init-wrap').show();
    }

}




/**
 * 错误消息弹窗提示
 * @param {Object} data 消息对象
 */
function showErrorMsg(data) {
    if (util && util.prompt) {
        util.prompt({
            text: data.msg
        });
    }
}


/**
 * 成功消息弹窗提示
 * @param {Object} data 消息对象
 */
function showSuccessMsg(data) {
    if (util && util.prompt) {
        util.prompt({
            type: 'success',
            text: data.msg
        });
    }
}

/**
 * 发送ajax获取节点id
 * @param {Object} data 节点数据
 */
function getNodeId(data) {
    //show loading
    util.loading.show();

    var dtd = $.Deferred();

    //ajax
    $.ajax({
        url: config.nodeUrl,
        data: data,
        success: function(d) {
            //扩展d.data
            d.data = $.extend(d.data, data);

            if (d.status === 0) {
                dtd.resolve(d.data);
            } else {
                showErrorMsg({
                    msg: d.msg || '创建分类失败'
                });
                dtd.reject();
            }
        },
        error: function() {
            showErrorMsg({
                msg: '服务器无响应,创建分类失败'
            });
            dtd.reject();
        }
    });


    return dtd.promise();
}


/**
 * saveRoot
 * 点击保存根节点
 */
function saveRoot(e) {
    var rootName = $('.root-name').val().trim();
    if (!rootName) {
        showErrorMsg({
            msg: '请输入分类名称'
        });
        return;
    }

    if (rootName.length > 30) {
        showErrorMsg({
            msg: '分类名称为1-30位字符'
        });
        return;
    }

    createRoot({
        name: rootName
    });
}


/**
 * createRoot
 * 创建根节点
 * @param {Object} data 节点数据
 */
function createRoot(data) {
    //ajax
    $.ajax({
        url: config.nodeUrl,
        data: data,
        success: function(d) {
            //hide loading
            util.loading.hide();
            if (d.status !== 0) {
                showErrorMsg({
                    msg: d.msg || '创建一级分类失败'
                });
            } else {
                var orgTree = $('.org-tree').jstree(true);
                var node = orgTree.create_node('#', {
                    text: data.name,
                    id: d.data.id
                });
                console.log(data);
                $('.init-save-wrap').hide();
                $('.org-tree').fadeIn();

            }
        },
        error: function() {
            showErrorMsg({
                msg: '服务器无响应,创建一级分类失败'
            });
            //hide loading
            util.loading.hide();
        }
    });





    // var orgTree = $('.org-tree').jstree(true);
    // var node = orgTree.create_node('#', {
    //     type: 'users',
    //     text: data.name,
    //     id: data.id
    // });

}

/**
 * addChild
 * 添加子节点
 * @param {Object} data 节点数据
 */
function addChild(data) {

    //show loading
    //util.loading.show();

    var dtd = $.Deferred();


    var orgTree = $('.org-tree').jstree(true);

    data.id = new Date().getTime();

    var node = orgTree.create_node(data.parentId + '_anchor', {
        id: data.id
    });
    console.log(node);

    var siblingsNode = orgTree.get_children_dom(data.parentId + '_anchor');


    var objMap = {};
    for (var i = 0, l = siblingsNode.length; i < l; i++) {
        var text = $(siblingsNode[i]).find('.jstree-anchor').text().trim();
        objMap[text] = true;
    }

    console.log(objMap);


    console.log(siblingsNode);



    var name = '请输入分类名称';

    function editNodeFocus() {
        orgTree.edit(node, name, function() {
            var newName = orgTree.get_text(node).trim();
            var flg = true;
            if (newName === name) {
                showErrorMsg({
                    msg: '请输入分类名称'
                });

                flg = false;
            }
            if (newName.length < 1 || newName.length > 30) {
                showErrorMsg({
                    msg: '分类名称为1-30位字符'
                });

                flg = false;

            }
            if (objMap.hasOwnProperty(newName) && objMap[newName] !== '') {
                flg = false;
                showErrorMsg({
                    msg: '同一级别下的分类名称不能重复'
                });

            }
            if (flg === false) {
                editNodeFocus();
                return;
            }

            data.name = newName;

            dtd.resolve(data);

        });
    }

    editNodeFocus();

    return dtd.promise();
}


/**
 * editNode
 * 编辑节点
 */
function editNode() {
    var orgTree = $('.org-tree').jstree(true);
    var id = $(this).parents('.jstree-node').attr('id');
    var name = orgTree.get_text(id);

    function editNodeFocus() {
        orgTree.edit(id + '_anchor', name, function() {
            var newName = orgTree.get_text(id).trim();
            if (newName.length < 1 || newName.length > 30) {
                showErrorMsg({
                    msg: '分类名称为1-30位字符'
                });
                editNodeFocus();
                return;
            }
            //更新节点
            updateNode({
                id: id,
                name: orgTree.get_text(id)
            });
        });
    }

    editNodeFocus();
}


/**
 * editNode
 * 删除节点
 */
function delNode() {
    var orgTree = $('.org-tree').jstree(true);
    var id = $(this).parents('.jstree-node').attr('id');
    var children = orgTree.get_children_dom(id);
    if (children.length > 0) {
        showErrorMsg({
            msg: '该分类下有其他分类，不能删除'
        });
        return;
    }


    new dialog({
        id: 'delete',
        title: '提示',
        content: '<div class="my-dialog-wrap"><div class="my-dialog-left"><em class="my-dialog-icon icon-bounce"></em></div><div class="my-dialog-right"><p class="my-dialog-strong">确认删除？</p><p class="my-dialog-red">注：删除成功之后，该操作将无法恢复</p></div></div>',
        button: [{
            value: '确定',
            autofocus: true,
            callback: function() {
                $.when(deleteNodeAjax({
                        id: id
                    }))
                    .then(function() {
                        orgTree.delete_node(id + '_anchor');

                        if ($('.org-tree li.jstree-node').length <= 0) {
                            $('.init-wrap').fadeIn();
                        }
                    })
                    .always(function() {
                        //hide loading
                        util.loading.hide();
                    });

            }
        }, {
            value: '取消'
        }]
    }).showModal();
}


/**
 * deleteNodeAjax
 * 删除节点ajax
 * @param {Object} data 节点数据
 */
function deleteNodeAjax(data) {
    //show loading
    util.loading.show();

    var dtd = $.Deferred();

    //ajax
    $.ajax({
        url: config.deleteNode,
        data: data,
        success: function(d) {
            if (d.status === 0) {
                dtd.resolve(d.data);
            } else {
                showErrorMsg({
                    msg: d.msg || '删除分类失败'
                });
                dtd.reject();
            }
        },
        error: function() {
            showErrorMsg({
                msg: '服务器无响应,删除分类失败'
            });
            dtd.reject();
        }
    });


    return dtd.promise();
}





/**
 * updateID
 * 更新id
 * @param {Object} data ajax参数
 */
function updateID(data) {
    //show loading
    util.loading.show();


    var orgTree = $('.org-tree').jstree(true);


    //ajax
    $.ajax({
        url: config.nodeUrl,
        data: data,
        success: function(d) {
            //hide loading
            util.loading.hide();

            if (d.status !== 0) {
                showErrorMsg({
                    msg: d.msg || '更新分类id失败'
                });
            } else {
                //更新id
                orgTree.set_id(data.id + '_anchor', d.data.id);
            }

        },
        error: function() {
            showErrorMsg({
                msg: '服务器无响应,更新分类id失败'
            });
            //hide loading
            util.loading.hide();
        }
    });
}


/**
 * updateNode
 * 更新结点
 * @param {Object} data 节点数据
 */
function updateNode(data) {
    //show loading
    util.loading.show();

    //ajax
    $.ajax({
        url: config.updateNode,
        data: data,
        success: function(d) {
            //hide loading
            util.loading.hide();

            if (d.status !== 0) {
                showErrorMsg({
                    msg: d.msg || '更新分类失败'
                });
            }

        },
        error: function() {
            showErrorMsg({
                msg: '服务器无响应,更新分类失败'
            });
            //hide loading
            util.loading.hide();
        }
    });
}


/**
 * createChild
 * 创建子节点
 */
function createChild() {
    var orgTree = $('.org-tree').jstree(true);
    var parentId = $(this).parents('.jstree-node').attr('id');

    // $.when(getNodeId({
    //         parentId: parentId
    //     }))
    $.when(addChild({
            parentId: parentId
        }))
        .then(updateID)
        .always(function() {
            //hide loading
            util.loading.hide();
        });


}


/**
 * 根节点新建事件
 */
$('.btn-init').on('click', function(e) {
    $('.init-wrap').hide();
    $('.init-save-wrap').fadeIn();
    $('.root-name').val('').focus();
});


/**
 * 根节点取消事件
 */
$('.btn-cancel').on('click', function(e) {
    $('.init-wrap').fadeIn();
    $('.init-save-wrap').hide();
});


/**
 * 根节点保存事件
 */
$('.btn-save').on('click', saveRoot);



/**
 * 添加hover出现操作
 */
$('#mytree').on('mouseenter', '.jstree-anchor', function() {
    if ($(this).find('.jstree-editable').length <= 0) {
        $(this).append($('#jstree-editable-tpl').html());
    }
}).on('mouseleave', '.jstree-anchor', function() {
    $(this).find('.jstree-editable').remove();
});


/**
 * hover 新增
 */
$('.org-tree').on('click', '.jstree-editable .add', createChild);


/**
 * hover 编辑
 */
$('.org-tree').on('click', '.jstree-editable .edit', editNode);
/**
 * hover 删除
 */
$('.org-tree').on('click', '.jstree-editable .del', delNode);









