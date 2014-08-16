(function($) {
    var txtAcc = $('#t-account'),
        txtPwd = $('#t-pwd'),
        btnLogin = $('#btn-login'),
        lnkSign = $('#lnk-sign');

    /**
     * [description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    txtAcc.on('input', function(e) {
        if (e.target.value && txtPwd.val()) {
            btnLogin.attr("class", "btn-valid");
        }
    }, false);


    /**
     * [description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    txtPwd.on('input', function(e) {
        if (e.target.value && txtAcc.val()) {
            btnLogin.attr("class", "btn-valid");
        }
    }, false);


    /**
     * LOGIN
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    btnLogin.on('click', function(e) {
        location.reload();
    });

    /**
     * 跳转到注册页面
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    lnkSign.on('click', function(e) {
        base.go('p-join');
    }, false);

})(Zepto);