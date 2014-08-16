(function($) {
    $("#btn-up,#btn-down").on('click', function(e) {
        var tar = $(e.target);
        if(e.target.nodeName.toUpperCase() === "I"){
            tar = tar.parent();
        }
        tar.css({
            "color": "#ff8a01"
        });
    });
})(Zepto);