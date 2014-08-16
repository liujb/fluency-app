(function($) {
    var header = document.getElementsByTagName('header')[0],
        sctMenu = document.getElementById('menu'),
        sctIndex = document.getElementById("p-index"),
        sctLogin = document.getElementById('p-login');

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
        header.style.display = 'flex';
        sctMenu.style.display = "none";
    }, false);


    /**
     * 点击列表
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    $('#p-index li').on('click', function(e) {
        /**
         * 获得LI元素
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
        var getLi = function(ele) {
            if (ele.nodeName.toUpperCase() !== "LI") {
                return arguments.callee(ele.parentNode);
            } else {
                return ele;
            }
        };
        var tar = getLi(e.target);

        tar.style.backgroundColor = '#d8d8d8';

        var json = {
            "title": "两月大婴儿晚上家中熟睡时被偷走 ",
            "subtitle": "2014-08-16 11:01 来源：新华社 ",
            "content": [{
                "type": "text",
                "text": "【苏州警方证实婴儿家中熟睡被偷走确有此事】 苏州警方证实， 8月7日， 苏州平江区一两个月大婴儿晚上家中熟睡时被偷走确有此事， 警方已立案调查。(记者朱国亮)"
            }, {
                "type": "text",
                "text": "昨天下午，记者来到金星村南庄路，这片位于苏虞张公路下的村庄，大部分房屋已拆迁，在南庄路旁边的一座收废纸板的房子里，记者找到了丢失孩子的朱先生夫妻。"
            }, {
                "type": "img",
                "src": "./upload/img/2014-08-17/01.jpg"
            }, {
                type: "text",
                text: "据新快报报道，8月7日晚，一名刚刚出生两个月的女婴，在苏州金星村南庄路的家中失踪。婴儿家人多日寻找无果，8月14日，父母在网上发布寻找孩子的信息。昨天，现代快报记者与孩子的父母取得了联系，他们称孩子是被人抱走的，希望知情者能够提供线索，让孩子早日回家。苏州警方已介入调查。实习生陈城炎"
            }, {
                "type": "img",
                "src": "./upload/img/2014-08-17/01.jpg"
            }, {
                type: "text",
                text: "据新快报报道，8月7日晚，一名刚刚出生两个月的女婴，在苏州金星村南庄路的家中失踪。婴儿家人多日寻找无果，8月14日，父母在网上发布寻找孩子的信息。昨天，现代快报记者与孩子的父母取得了联系，他们称孩子是被人抱走的，希望知情者能够提供线索，让孩子早日回家。苏州警方已介入调查。实习生陈城炎"
            }, {
                "type": "img",
                "src": "./upload/img/2014-08-17/01.jpg"
            }, {
                type: "text",
                text: "据新快报报道，8月7日晚，一名刚刚出生两个月的女婴，在苏州金星村南庄路的家中失踪。婴儿家人多日寻找无果，8月14日，父母在网上发布寻找孩子的信息。昨天，现代快报记者与孩子的父母取得了联系，他们称孩子是被人抱走的，希望知情者能够提供线索，让孩子早日回家。苏州警方已介入调查。实习生陈城炎"
            }, {
                "type": "img",
                "src": "./upload/img/2014-08-17/01.jpg"
            }, {
                type: "text",
                text: "据新快报报道，8月7日晚，一名刚刚出生两个月的女婴，在苏州金星村南庄路的家中失踪。婴儿家人多日寻找无果，8月14日，父母在网上发布寻找孩子的信息。昨天，现代快报记者与孩子的父母取得了联系，他们称孩子是被人抱走的，希望知情者能够提供线索，让孩子早日回家。苏州警方已介入调查。实习生陈城炎"
            }, {
                "type": "img",
                "src": "./upload/img/2014-08-17/01.jpg"
            }, {
                type: "text",
                text: "据新快报报道，8月7日晚，一名刚刚出生两个月的女婴，在苏州金星村南庄路的家中失踪。婴儿家人多日寻找无果，8月14日，父母在网上发布寻找孩子的信息。昨天，现代快报记者与孩子的父母取得了联系，他们称孩子是被人抱走的，希望知情者能够提供线索，让孩子早日回家。苏州警方已介入调查。实习生陈城炎"
            }],
            "source": "该文章来自凤凰网， 原文出处",
            "tags": [{
                'name': "法治社会"
            }, {
                "name": "社会百态"
            }],
            "thumbUpCount": "1234",
            "thumbDownCount": "268"
        };

        setTimeout(function() {
            tar.style.backgroundColor = '#fff';

            var html = _.template($('#tpl-article').html(), json);
            $('#p-article').html(html);

            base.go('p-article');
        }, 100);

    });


    /**
     * login
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    $("#lnk-login").on("click", function(e) {
        base.go('p-login');

    });
})(Zepto);