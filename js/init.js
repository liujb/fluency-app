(function($) {


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
    (function init(json) {
        if (json) {

            //初始化菜单
            var html = _.template($('#tpl-menu').html(), json);
            $("#menu>ul>li:first-child").after(html);
        }

        /**
         * 菜单项注册事件
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        $('#menu>ul>li').on('click', function(e) {

            setTimeout(function() {
                e.target.style.backgroundColor = '#fff';

                // base.go('p-article');
            }, 100);
        });

    })(menuJSON);
})(Zepto);