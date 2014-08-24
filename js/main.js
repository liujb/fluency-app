/**
 * requirejs的配置
 * @type {Object}
 */
require.config({　　　　
    baseUrl: "./lib/",
    paths: {
        "zepto": "zepto/zepto.min",
        "underscore": "underscore/underscore",
        "backbone": "backbone/backbone",
        "base": "../js/base",
        'menu': "../js/menu",
        'dialog': "../js/dialog",
        'p-index': '../js/p-index',
        'p-login': '../js/p-login',
        'p-join': '../js/p-join',
        'p-article': '../js/p-article'
    }
    // ,shim: {
    //     'backbone': {　　　　　　　　
    //         deps: ['underscore', 'zepto'],
    //         exports: 'Backbone'　　　　　　
    //     }
    // }
});

/**
 * require base modulesÍ
 * @param  {[type]} $        [description]
 * @param  {[type]} _        [description]
 * @param  {[type]} Backbone [description]
 * @return {[type]}          [description]
  'backbone', Backbone*/
require(['menu', 'p-index', 'dialog'], function(menu, index, dialog) {
    // console.log(menu); //menu模块没有返回值
    // console.log(index); //index模块也没有返回值
    // 
    console.log('done');
    console.log(dialog);
    console.log($); //在menu中require了
    console.log(_); //在p-index中require了
    dialog.loading({
        text: "加载中..."
    });
});