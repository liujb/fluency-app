(function(window, undefined) {
    /**
     * 防止命名空间冲突
     * @type {[type]}
     */
    var didi = window.didi || {};
    if (didi.dialog) {
        return didi.dialog;
    } else {
        window.didi = didi; // 注册didi对象到window下\
    }

    var docElem = document.documentElement,
        docEleScrollT = docElem.scrollTop,
        docEleScrollL = docElem.scrollLeft,
        docEleClientH = docElem.clientHeight,
        docEleClientW = docElem.clientWidth;

    var dvWall = null,
        dvWrap = null,
        dialog = null;
    /**
     * 判断一个对象是否为数组
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    var isArray = function(obj) {
        return (typeof Array.isArray) ? Array.isArray(obj) : (Object.prototype.toString.call(obj) === '[object Array]');
    };

    /**
     * 往body中插入div
     * @param  {[type]} newNode [description]
     * @return {[type]}         [description]
     */
    var insertDom = function(newNode) {
        var firstScriptInBody = document.getElementsByTagName("script")[0];
        return firstScriptInBody ? document.body.insertBefore(newNode, firstScriptInBody) : document.body.appendChild(newNode);
    };
    /**
     * 初始化配置
     * @param  {[type]} opts [description]
     * @return {[type]}      [description]
     */
    var initOpts = function(opts) {
        if (!opts) return;

        opts.type = opts.type || "loading";
        opts.bg = opts.bg || "#000";
        opts.op = opts.op || "0.3";

        opts.width = opts.width || "280px";
        opts.d_bg = opts.d_bg || "#fff";
        opts.d_op = opts.d_op || "";

        // opts.filter = opts.op ? "alpha(opacity=" + (opts.op * 100) + ")" : "alpha(opacity=20)";
        // opts.d_filter = opts.d_op ? "alpha(opacity=" + (opts.d_op * 100) + ")" : "alpha(opacity=20)";
        //生成弹出框背景样式&弹出框wrap样式
        opts.wallCss = "position:absolute;left:0;top:0;display:none;z-index:9998;background-color:" + opts.bg + ";opacity:" + opts.op + ";filter:" + opts.filter + ";";
        opts.wrapCss = "text-align:center;position:absolute;border-radius:5px;z-index:9999;width:" + opts.width + ";height:" + opts.height + ";background-color:" + opts.d_bg + ";opacity:" + opts.d_op + ";filter:" + opts.d_filter + ";" + ((opts.type === 'loading') ? "padding:0;" : "") + "";
    };

    var util = {

        /**
         * 生成icon相关的html
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        genIcon: function(opts) {
            var res = "";
            opts.icon = opts.icon || {};
            var w = opts.icon.width || "8px",
                h = opts.icon.height || "36px",
                url = opts.icon.url || "/static/webapp/images/i-plaint.png";
            var margin = "",
                icon = "",
                cssText = "";
            if (opts.type !== 'loading') {
                margin = "margin:24px 0 12px";
                cssText = 'display:inline-block;width:60px;height:60px;background-color:#f0f0f0;background-size:60px 60px;border-radius:50%;'
                 icon = '<span style="vertical-align:middle;display:inline-block;height:100%;"></span><img src='+url+' style="width:'+w+';height:'+h+';vertical-align:middle;" />'
            } else {
                margin = "margin:36px 0 10px";
                cssText = 'display:inline-block;width:30px;height:30px;background:url(/static/webapp/images/loading_2.gif) no-repeat;background-size:30px 30px;';
            }
            res = '<p style="' + margin + '"><span style="' + cssText + '">' + icon + '</span></p>';
            return res;
        },

        /**
         * Title的样式和HTML
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        genTitle: function(opts) {
            opts.title = opts.title || {};
            var color = opts.title.color || "#ff8a01",
                size = opts.title.size || "1.9rem";
            return '<p style="margin-bottom: 5px;color:' + color + ';font-size:' + size + ';">' + (opts.title.txt || "") + '</p>';
        },

        /**
         * 生成提示信息
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        genTip: function(opts) {
            if (opts.title && opts.title.txt) {
                opts.tip.color = opts.tip.color || "#666";
                opts.tip.size = opts.tip.size || '1.4rem'
            } else {
                opts.tip.color = opts.tip.color || "#333";
                opts.tip.size = opts.tip.size || '1.6rem';
            }
            return opts.tip ? '<p style="' + ((opts.type !== "loading") ? "text-align:left;" : "") + 'padding:0 4px;line-height:1.9rem;color:' + opts.tip.color + ';font-size:' + opts.tip.size + ';">' + opts.tip.txt + '</p>' : "";
        },

        /**
         * 尾部红包
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        genButtons: function(opts) {
            var res = "";
            if (opts.btns && isArray(opts.btns)) {
                res += '<div style="padding:20px 0;">';
                for (var i = 0, l = opts.btns.length; i < l; i++) {
                    var btn = opts.btns[i];
                    if (btn && opts.type === 'alert') {
                        res += '<a class="' + btn.kls + '" id="' + btn.id + '">' + btn.val + '</a>';
                    } else if (btn && opts.type === 'confirm') {
                        res += '<a class="' + btn.kls + '" id="' + btn.id + '" style="width: 43%; height: 40px; line-height: 40px; margin:0 3%;">' + btn.val + '</a>';
                    } else {
                        res += '<a class="' + btn.kls + '" id="' + btn.id + '" sdscs style="margin:5px 0;">' + btn.val + '</a>';
                    }
                }
                res += '</div>';
            }
            console.log(opts.ext);
            if (opts.ext && typeof opts.ext === 'string') {
                res += opts.ext;
            }
            return res;
        },

        /**
         * 为按钮注册事件
         * @param {[type]} opts [description]
         */
        addEvents: function(opts) {
            var btn = null;
            if (!isArray(opts.btns) || !opts.btns.length) return;
            for (var i = 0, l = opts.btns.length; i < l; i++) {
                btn = opts.btns[i];
                if (btn) {
                    var ev = btn.event || "click",
                        ele = document.getElementById(btn.id);
                    if (ele) {
                        ele.removeEventListener(ev, btn.handler, false);
                        ele.addEventListener(ev, btn.handler, false);
                    }
                }
            }
        }
    };

    /**
     * Dialog对象应该使用强制使用new模式
     * @param  {[type]} opts [description]
     * @return {[type]}      [description]
     */
    var Dialog = function(opts) {
        if (!(this instanceof Dialog)) {
            dialog = new Dialog(opts);
            return dialog; // 当不使用new的时候，会走到前一句，然后再走到dialog.fn.init,然后再执行return
        } else {
            new Dialog.fn.init(opts);
        }
    };


    /**
     * Dialog prototype
     * @type {Function}
     */
    Dialog.fn = Dialog.prototype = {
        constructor: Dialog,
        init: function(opts) {
            if (!opts) return;
            initOpts(opts); //初始化配置
            // console.log(opts);

            var div_wall = document.createElement('div');
            var div_wrap = document.createElement("div");
            div_wall.id = "d-wall";
            div_wrap.id = "d-wrap";

            div_wall.style.cssText = opts.wallCss;
            div_wrap.style.cssText = opts.wrapCss;

            var html = "<div style='" + ((opts.type === 'loading') ? "padding:0px;" : "padding: 0px 6%;") + "'>" + util.genIcon(opts) + util.genTitle(opts) + util.genTip(opts) + util.genButtons(opts) + "</div>";
            div_wrap.innerHTML = html;

            if (dvWall) {
                document.body.removeChild(dvWall);
                dvWall = null;
            }
            if (dvWrap) {
                document.body.removeChild(dvWrap)
                dvWrap = null;
            }

            if (!dvWall) {
                insertDom(div_wall);
                dvWall = document.getElementById('d-wall');
            }
            if (!dvWrap) {
                insertDom(div_wrap);
                dvWrap = document.getElementById('d-wrap');
                util.addEvents(opts);
            }
        },
        show: function() {
            var that = this;
            if (dvWall && dvWrap) {
                dvWall.style.display = "block";
                dvWrap.style.display = "inline-block";
                that.reset();

                window.addEventListener("resize", function() {
                    that.reset.call(that);
                }, false);
                window.addEventListener("scroll", function() {
                    that.reset.call(that);
                }, false);
            }
        },
        hide: function() {
            if (dvWall && dvWrap) {
                dvWall.style.display = "none";
                dvWrap.style.display = "none";
            }
        },
        reset: function() {
            if (dvWall && dvWrap) {
                var p = this._dialogPosi();

                dvWall.style.width = docEleClientW + "px";
                dvWall.style.height = docEleClientH + "px";

                dvWrap.style.top = p.top + "px";
                dvWrap.style.left = p.left + "px";
            }
        },
        _dialogPosi: function() {
            var h = dvWrap.clientHeight,
                w = dvWrap.clientWidth;
            return {
                top: docEleScrollT + (docEleClientH - h - 20) / 2,
                left: docEleScrollL + (docEleClientW - w) / 2
            };
        }
    };


    /**
     * alert弹出框
     * @param  {[type]}   text     [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    didi.alert = function(cfg) {
        var opts = {};
        if (typeof arguments[0] === "string" && arguments[0]) {
            opts.title = arguments[1] || "";
            opts.tip = arguments[0];
            opts.btn = {
                val: arguments[2] || "我知道了"
            };
        } else if (cfg && typeof cfg === 'object') {
            opts = cfg;
        }

        dialog = new Dialog({
            type: "alert",
            icon: opts.icon || {
                url: "/static/webapp/images/i-plaint.png"
            },
            title: {
                txt: opts.title
            },
            tip: {
                txt: opts.tip
            },
            btns: [{
                id: "btn-close",
                kls: 'btn-orange',
                event: "click",
                val: (opts.btn && opts.btn.val) || "我知道了",
                handler: function(ev) {
                    dialog.hide();
                    if (typeof opts.btn.handler === 'function') {
                        opts.btn.handler(ev);
                    }
                }
            }]
        });
        dialog.show();
    };

    /**
     * confirm dialog
     * @param  {[type]} text            [description]
     * @param  {[type]} confirmCallback [description]
     * @param  {[type]} cancelCallback  [description]
     * @param  {[type]} stop            [description]
     * @return {[type]}                 [description]
     */
    didi.confirm = function(cfg) {
        var opts = {};

        if (typeof arguments[0] === 'string' && arguments[0]) {
            opts.text = arguments[0] || "";
            opts.confirm = {};
            opts.confirm.handler = arguments[1];

        } else if (cfg && typeof cfg === 'object') {
            opts = cfg;
            console.log(opts.ext);
        }

        var cancel = opts.cancel || {};
        var confirm = opts.confirm || {};

        dialog = new Dialog({
            type: "confirm",
            tip: {
                txt: opts.text
            },
            icon: opts.icon || {
                url: "/static/webapp/images/i-plaint.png"
            },
            btns: [{
                id: cancel.id || "btn-cancel",
                val: cancel.val || "取消",
                kls: cancel.kls || "btn-white",
                event: cancel.event || "click",
                handler: function(e) {
                    dialog.hide();
                    if (typeof cancel.handler === 'function') {
                        cancel.handler(e);
                    }
                }
            }, {
                id: confirm.id || "btn-ok",
                val: confirm.val || "确定",
                kls: confirm.kls || "btn-orange",
                event: confirm.event || "click",
                handler: function(e) {
                    dialog.hide();
                    if (typeof confirm.handler === 'function') {
                        confirm.handler(e);
                    }
                }
            }],
            ext: opts.ext
        });
        dialog.show();
    };

    /**
     * Loading Dialog
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    didi.loading = function(cfg) {
        var opts = {};
        if (typeof arguments[0] !== "object") {
            opts.text = arguments[0];
            opts.time = arguments[1] || 0
        } else {
            opts = cfg;
        }
        dialog = new Dialog({
            type: "loading",
            bg: "#fff",
            d_bg: "#0c0d0d",
            d_op: "0.7",
            width: "140px",
            height: "140px",
            tip: {
                txt: cfg.text || "正在加载...",
                color: "#fff",
                size: "14px"
            }
        });

        dialog.show();

        if (!opts.time) {
            opts.time = 5000;
        }
        window.setTimeout(function() {
            dialog.hide();
            console.log(typeof opts.hideCB === 'function')
            if (typeof opts.hideCB === 'function') {
                opts.hideCB();
            }
        }, opts.time);
    };

    window.didi.dialog = Dialog; // 注册dialog到didi命名空间下
    // window.didi.Dialog = Dialog;
})(window);