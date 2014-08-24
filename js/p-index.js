  define(['zepto', 'underscore', 'base'], function(zepto, _, base) {

      var header = document.getElementsByTagName('header')[0],
          sctMenu = document.getElementById('menu'),
          sctIndex = document.getElementById("p-index"),
          sctLogin = document.getElementById('p-login');

      var indexList = {
          list: [{
              thumbUrl: "./upload/img/02.jpg",
              title: "文章标题1",
              desc: "这里是简要描述这里是简要描述"
          }, {
              thumbUrl: "./upload/img/01.jpg",
              title: "文章标题2",
              desc: "这里是简要描述这里是简要描述"
          }, {
              thumbUrl: "./upload/img/02.jpg",
              title: "文章标题3",
              desc: "这里是简要描述这里是简要描述"
          }, {
              thumbUrl: "./upload/img/02.jpg",
              title: "文章标题3",
              desc: "这里是简要描述这里是简要描述"
          }, {
              thumbUrl: "./upload/img/02.jpg",
              title: "文章标题3",
              desc: "这里是简要描述这里是简要描述"
          }, {
              thumbUrl: "./upload/img/02.jpg",
              title: "文章标题3",
              desc: "这里是简要描述这里是简要描述"
          }]
      };

      var html = _.template($("#tpl-index").html(), indexList)
      $("#ul-list").html(html);


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
          setTimeout(function() {
              tar.style.backgroundColor = '#fff';
              base.go('p-article');
          }, 100);

      });
  });