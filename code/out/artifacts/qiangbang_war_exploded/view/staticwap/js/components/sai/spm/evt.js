define("components/sai/spm/evt", [], function(require, exports, module){
var slice = [].slice;

function Event(context) {
    this._ = {};
    this.$ = context || this;
};

Event.prototype = {

    on: function (eventName, handler) {
        var me = this;
        var list = me._[eventName] || (me._[eventName] = []);
        list.push(handler);
        return me;
    },

    off: function (eventName, handler) {
        var me = this;

        // Remove *all* events
        if (!(eventName || handler)) {
            me._ = {};
        } else {

            var list = me._[eventName];
            if (list) {
                if (handler) {
                    for (var i = list.length - 1; i >= 0; i--) {
                        if (list[i] === handler) {
                            list.splice(i, 1);
                            break;
                        }
                    }
                }
                else {
                    delete me._[eventName];
                }
            }

        }

        return me;
    },

    emit: function (name) {
        var me = this;

        var list = me._[name];
        var args = slice.call(arguments);
        args.shift();

        if (list) {
            // Copy callback lists to prevent modification
            // https://github.com/seajs/seajs/issues/1058
            list = list.slice();

            // Execute event callbacks, use index because it's the faster.
            for (var i = 0, len = list.length; i < len; i++) {
                list[i].apply(me.$, args);
            }
        }

        return me;
    }

};

module.exports = Event;

});