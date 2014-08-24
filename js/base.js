define(['zepto'], function(zepto) {

    var base = {},
        header = $('header'),
        allScts = $('section');

    /**
     * 跳转页面
     * @param  {[type]} pageId [description]
     * @return {[type]}        [description]
     */
    base.go = function(pageId) {
        if (!pageId) return;

        require([pageId]);

        allScts.each(function(index, item) {
            var val = (item.id !== pageId) ? 'none' : 'block';
            item.style.display = val;
        });

        header.css({
            'position': 'relative'
        });


    };


    /**
     * 跳转到首页
     * @return {[type]} [description]
     */
    base.index = function() {
        base.go('p-index');

        header.css({
            'position': 'fixed'
        });
    };


    /**
     * 展开左侧菜单
     * @return {[type]} [description]
     */
    base.menu = function() {
        $("#menu").css({
            "height": "100%",
            "display": "flex",
            "display": "-webkit-flex"
        });
    };


    /**
     * back
     * @return {[type]} [description]
     */
    base.back = function() {

    };

    window.base = base;

    return base;
});