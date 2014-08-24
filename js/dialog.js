// (function(window, undefined) {})(window);
define(function() {

    /**
     * 防止命名空间冲突
     * @type {[type]}
     */
    var dialog = window.dialog;
    if (dialog) {
        return dialog;
    }

    dialog = {};

    var docElem = document.documentElement,
        docEleScrollT = docElem.scrollTop,
        docEleScrollL = docElem.scrollLeft,
        docEleClientH = docElem.clientHeight,
        docEleClientW = docElem.clientWidth;

    var dvWall = document.getElementById('d_wall'),
        dvWrap = document.getElementById('d_wrap'),
        _dialog = null;
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
        // return firstScriptInBody ? document.body.insertBefore(newNode, firstScriptInBody) : document.body.appendChild(newNode);
        document.body.appendChild(newNode)
    };

    var util = {

        /**
         * 初始化配置
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        initOpts: function(opts) {
            if (!opts) return;
            opts.bgcolor = opts.bgcolor || "#000";
            opts.opacity = opts.opacity || "0.2";
            opts.filter = opts.opacity ? "alpha(opacity=" + (opts.opacity * 100) + ")" : "alpha(opacity=20)";

            opts.width = opts.width || "280px";
            // opts.height = opts.height || "210px";
            opts.d_bgcolor = opts.d_bgcolor || "#fff";
            opts.d_opacity = opts.d_opacity || "";
            opts.d_filter = opts.d_opacity ? "alpha(opacity=" + (opts.d_opacity * 100) + ")" : "alpha(opacity=20)";

            opts.wrapStaticStyle = "";
        },

        /**
         * 生成弹出框背景样式
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        genWallCssText: function(opts) {
            return "position:absolute;left:0;top:0;display:none;z-index:9998;background-color:" + opts.bgcolor + ";opacity:" + opts.opacity + ";filter:" + opts.filter + ";"
        },

        /**
         * 生成弹出框样式
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        genWrapCssText: function(opts) {
            var tmp = (opts.type === 'loading') ? "padding:0px;" : "";
            return ("text-align:center;position:absolute;border-radius:5px;z-index:9999;width:" + opts.width + ";height:" + opts.height + ";background-color:" + opts.d_bgcolor + ";opacity:" + opts.d_opacity + ";filter:" + opts.d_filter + ";" + tmp + "");
        },
        /**
         * 生成icon相关的html
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        genIconHtml: function(opts) {
            var res = "";
            if (opts.icon && opts.icon.url) {
                var w = opts.icon.width || "60px",
                    h = opts.icon.height || "60px";
                var tmpMargin = (opts.type === 'loading') ? "margin:36px 0px 10px 0" : "margin:24px 0px 12px 0";
                res = '<p style="' + tmpMargin + '"><span style="display: inline-block; width:' + w + ';height:' + h + '; background:url(' + opts.icon.url + ') no-repeat; background-size:' + w + ' ' + h + ';"></span></p>';
            }
            return res;
        },

        /**
         * Title的样式和HTML
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        genTitleHTML: function(opts) {
            var res = "";
            if (opts.title && opts.title.txt) {
                var color = opts.title.color || "#ff8a01",
                    size = opts.title.fontSize || "1.9rem";
                res = '<p style="margin-bottom: 5px;color:' + color + ';font-size:' + size + ';">' + opts.title.txt + '</p>';
            }
            return res;
        },

        /**
         * 生成提示信息
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        genTipHTML: function(opts) {
            opts.tip.color = opts.title && opts.title.txt ? (opts.tip.color || "#666") : (opts.tip.color || "#333");
            opts.tip.fontSize = opts.title && opts.title.txt ? (opts.tip.fontSize || '1.4rem') : (opts.tip.fontSize || '1.6rem');
            var align = (opts.type !== "loading") ? "text-align:left;" : "";
            return opts.tip ? '<p style="' + align + 'padding:0 4px;line-height:1.9rem;color:' + opts.tip.color + ';font-size:' + opts.tip.fontSize + ';">' + opts.tip.txt + '</p>' : "";
        },

        /**
         * 尾部红包
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        genButtonsHTML: function(opts) {
            var res = "";
            if (opts.btns && isArray(opts.btns)) {
                res += '<div style="padding:20px 0;">';
                for (var j = 0, _len = opts.btns.length; j < _len; j++) {
                    var btn = opts.btns[j];
                    if (btn && opts.type === 'alert') {
                        res += '<a class="' + btn.klsName + '" id="' + btn.id + '">' + btn.txt + '</a>';
                    } else if (btn && opts.type === 'confirm') {
                        res += '<a class="' + btn.klsName + '" id="' + btn.id + '" style="width: 43%; height: 40px; line-height: 40px; margin:0 3%;">' + btn.txt + '</a>';
                    } else if (opts.type === 'threeSel') {
                        res += '<a class="' + btn.klsName + '" id="' + btn.id + '" sdscs style="margin:5px 0;">' + btn.txt + '</a>';
                    } else {

                    }
                }
                res += '</div>';
            }
            if (opts.ext) {
                res += '<p style="font-size: 1.4rem;margin-bottom: 20px;">或&nbsp;<a style="text-decoration: none;color:#ff8a01;" href="">取消订单</a></p>'
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
                    var evType = btn.eventType || "click",
                        ele = document.getElementById(btn.id);

                    if (ele && !ele['on' + evType]) {
                        ele.addEventListener(evType, btn.callback, false);
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
            _dialog = new Dialog(opts);
            return _dialog; // 当不使用new的时候，会走到前一句，然后再走到dialog.fn.init,然后再执行return
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
            util.initOpts(opts); //初始化配置

            var div_wall = document.createElement('div');
            var div_wrap = document.createElement("div");
            div_wall.id = "d_wall";
            div_wrap.id = "d_wrap";

            div_wall.style.cssText = util.genWallCssText(opts);
            div_wrap.style.cssText = util.genWrapCssText(opts);

            var html = "<div style='" + (opts.type === 'loading' ? "padding:0px;" : "padding: 0px 6%;") + "'>" + util.genIconHtml(opts) + util.genTitleHTML(opts) + util.genTipHTML(opts) + util.genButtonsHTML(opts) + "</div>";
            div_wrap.innerHTML = html;
            console.log(html);

            if (!dvWall) insertDom(div_wall);
            if (!dvWrap) insertDom(div_wrap);

            dvWall = document.getElementById('d_wall');
            dvWrap = document.getElementById('d_wrap');
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
            if (dvWall && dvWrap && dvWall.style.display === "block") {
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
    dialog.alert = function(text, title, callback) {


        var cfg = {
            type: "alert",
            title: {
                txt: title
            },
            tip: {
                txt: text
            },
            icon: {
                url: "/static/webapp/images/i-alert.png"
            },
            btns: [{
                id: "btn-close",
                txt: "我知道了",
                klsName: "btn-orange",
                eventType: "click",
                callback: function(ev) {
                    dialog.hide();
                    if (callback) {
                        callback();
                    }
                }
            }]
        };
        _dialog = new Dialog(cfg);
        _dialog.show();
    };

    /**
     * confirm dialog
     * @param  {[type]} text            [description]
     * @param  {[type]} confirmCallback [description]
     * @param  {[type]} cancelCallback  [description]
     * @param  {[type]} stop            [description]
     * @return {[type]}                 [description]
     */
    dialog.confirm = function(text, confirmCB, cancelCB, stop) {
        var cfg = {
            type: "confirm",
            icon: {
                url: "/static/webapp/images/i-alert.png"
            },
            tip: {
                txt: text || "确定执行此操作吗？"
            },
            btns: [{
                id: "btn-cancel",
                txt: "取消",
                klsName: "btn-white",
                eventType: "click",
                callback: function(ev) {
                    _dialog.hide();
                    if (typeof cancelCallback === "function") {
                        cancelCallback();
                    }
                }
            }, {
                id: "btn-ok",
                txt: "确定",
                klsName: "btn-orange",
                eventType: "click",
                callback: function(ev) {
                    _dialog.hide();
                    if (typeof confirmCallback === "function") {
                        confirmCallback();
                    }
                }
            }]
        };

        _dialog = new Dialog(cfg);
        _dialog.show();
        if (stop === true) {
            return false;
        }
    };

    /**
     * Loading
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    dialog.loading = function(options) {
        var cfg = {
            type: "loading",
            bgcolor: "#ffffff",
            d_bgcolor: "black",
            d_opacity: "0.7",
            width: "125px",
            height: "125px",
            icon: {
                url: "/static/webapp/images/loading_2.gif",
                width: "30px",
                height: "30px"
            },
            tip: {
                txt: options.text || "正在加载...",
                color: "#FFFFFF",
                fontSize: "13px"
            }
        };
        _dialog = new Dialog(cfg);
        _dialog.show();

        if (options.time === null || options.time === undefined) {
            options.time = 10000;
        }
        if (options.time) {
            window.setTimeout(function() {
                _dialog.hide();
            }, options.time);
        }
        if (options.callback) {
            options.callback();
        }
    };

    window.dialog = dialog; // 注册dialog到didi命名空间下
    return dialog

})