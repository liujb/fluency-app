/**
 * 初始化menu数据，并且绑定menu菜单的事件
 * 如果牵扯到用户行为会改变menu，则需要将menu return
 * 否则menu应该是“静态的”
 * @param  {[type]} Zepto [description]
 * @param  {[type]} _     [description]
 * @param  {[type]} base  [description]
 * @return {[type]}       [description]
 */
define(['zepto', 'underscore', 'base'], function(zepto, _, base) {

    /**
     * 菜单数据
     * @type {Object}
     */
    var menuJSON = {
        list: [{
            "id": "lnk-check",
            "icon": "fa-university",
            "name": "验房"
        }, {
            "id": "lnk-strategy",
            "icon": "fa-thumbs-up",
            "name": "攻略"
        }, {
            "id": "lnk-setting",
            "icon": "fa-cog",
            "name": "设置"
        }]
    };

    /**
     * 初始化用户数据
     * @param  {[type]} json [description]
     * @return {[type]}      [description]
     */
    (function initMenu(json) {

        /**
         * 初始化菜单
         */
        if (json) {
            var html = _.template($('#tpl-menu').html(), json);
            $("#menu>ul>li:first-child").after(html);
        }

    })(menuJSON);

    /**
     * 菜单项注册事件
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    $('#menu>ul>li').on('click', function(e) {

        var getLi = function(ele) {
            if (ele.nodeName.toUpperCase() === "LI") {
                return ele;
            } else {
                return arguments.callee(e.target.parentNode);
            }
        };

        var tar = getLi(e.target);
        console.log(tar);

        if (tar.id !== "li-user－info") {
            tar.style.backgroundColor = '#ffffff';

            setTimeout(function() {
                tar.style.backgroundColor = '#f1f1f1';
                base.go('p-article');
            }, 100);
        }
    });

    /**
     * 唤醒菜单
     * @param  {[type]} ev [description]
     * @return {[type]}    [description]
     */
    $("#btn-invoke-menu").on("click", function(ev) {
        base.menu();
    });


    /**
     * 隐藏菜单
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    $("#dv-menu-slide").on('click', function(e) {
        $('#header').css({
            display: 'flex'
        });
        $("#menu").css({
            display: "none"
        });
    }, false);

    /**
     * login
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    $("#lnk-login").on("click", function(e) {
        base.go('p-login');
    });
});