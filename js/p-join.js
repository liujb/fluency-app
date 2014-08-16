(function($) {

    var txtPhone = $('#t-phone'),
        txtCode = $('#t-code'),
        btnSendCode = $('#btn-send-code'),
        btnSubmitCode = $('#btn-submit-code');
    /**
     * 电话号码输入事件
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    txtPhone.on('input', function(e) {
        var tar = e.target;
        tar.value = tar.value.replace(/[^\d]/g, '').slice(0, 11);

        if (tar.value.length === 11) {
            btnSendCode.attr({
                'class': 'btn-valid',
                'canTap': 'true'
            });
        }

    }, false);


    /**
     * 验证码输入事件
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    txtCode.on('input', function(e) {
        var tar = e.target;
        tar.value = tar.value.replace(/[^\d]/g, '').slice(0, 4);
        if (tar.value.length === 4) {
            btnSubmitCode.attr({
                'class': 'btn-valid',
                'canTap': 'true'
            });
        }
    }, false);

    /**
     * 发送验证码
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    btnSendCode.on('click', function(e) {

        if (txtPhone.val() && e.target.getAttribute('canTap') === 'true') {

            $('#lab-phone').html(txtPhone.val());

            $('#p-join form:first-child').css({
                "display": "none"
            });

            $('#p-join form:last-child').css({
                "display": "block"
            });
        }

    }, false);



    /**
     * 提交验证码
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    btnSubmitCode.on('click', function(e) {

        var valid = (txtCode.val().length === 4) && e.target.getAttribute('canTap') === 'true';

        if (valid) {
            base.index();
        }

    }, false);

})(Zepto);