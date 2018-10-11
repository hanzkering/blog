(function($){
  /*toTop start*/
  // When to show the scroll link
  // higher number = scroll link appears further down the page
  var upperLimit = 1000;
  // Our scroll link element
  var scrollElem = $('#totop');
  // Scroll to top speed
  var scrollSpeed = 500;
  // Show and hide the scroll to top link based on scroll position
  $(window).scroll(function() {
    var scrollTop = $(document).scrollTop();
    if (scrollTop > upperLimit) {
      $(scrollElem).stop().fadeTo(300, 1); // fade back in
    } else {
      $(scrollElem).stop().fadeTo(300, 0); // fade out
    }
  });

  // Scroll to top animation on click
  $(scrollElem).click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, scrollSpeed);
    return false;
  });
  /*toTop end*/
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      type = $this.attr('data-share'),
      offset = $this.offset();

    if (type == 'baidu') {
      var box = $('#article-share-box');
      shareDataUrl = $this.attr('data-url');
      shareDataTitle = $this.attr('data-title');

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }

      $('.article-share-box.on').hide();

      box.css({
        top: offset.top + 25,
        left: offset.left - 25
      }).addClass('on');
    } else{
      var url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id');

      if ($('#' + id).length){
        var box = $('#' + id);

        if (box.hasClass('on')){
          box.removeClass('on');
          return;
        }
      } else {
        var html = [
          '<div id="' + id + '" class="article-share-box">',
            '<input class="article-share-input" value="' + url + '">',
            '<div class="article-share-links">',
              '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
              '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
              '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
              '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
            '</div>',
          '</div>'
        ].join('');

        var box = $(html);

        $('body').append(box);
      }

      $('.article-share-box.on').hide();

      box.css({
        top: offset.top + 25,
        left: offset.left
      }).addClass('on');
    };
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });

  // $('#local-search-form').on('submit', function() {
  //   alert('search run');
  //   let path = "/search.xml";
  //   searchFunc(path, 'local-search-input', 'local-search-result');
  //   return false;
  // });
})(jQuery);


// var searchFunc = function(path, search_id, content_id) {
//     'use strict'; //使用严格模式
//     $.ajax({
//         url: path,
//         dataType: "xml",
//         success: function( xmlResponse ) {
//             // 从xml中获取相应的标题等数据
//             var datas = $( "entry", xmlResponse ).map(function() {
//                 return {
//                     title: $( "title", this ).text(),
//                     content: $("content",this).text(),
//                     url: $( "url" , this).text()
//                 };
//             }).get();
//             //ID选择器
//             var $input = document.getElementById(search_id);
//             var $resultContent = document.getElementById(content_id);
//             // $input.addEventListener('input', function(){
//                 if ($input.value.trim().length <= 0) {
//                     return;
//                 }
//                 var str='<ul class=\"search-result-list\">';                
//                 var keywords = $input.value.trim().toLowerCase().split(/[\s\-]+/);
//                 $resultContent.innerHTML = "";
//                 // 本地搜索主要部分
//                 datas.forEach(function(data) {
//                     var isMatch = true;
//                     var content_index = [];
//                     var data_title = data.title.trim().toLowerCase();
//                     var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
//                     var data_url = data.url;
//                     var index_title = -1;
//                     var index_content = -1;
//                     var first_occur = -1;
//                     // 只匹配非空文章
//                     if(data_title != '' && data_content != '') {
//                         keywords.forEach(function(keyword, i) {
//                             index_title = data_title.indexOf(keyword);
//                             index_content = data_content.indexOf(keyword);
//                             if( index_title < 0 && index_content < 0 ){
//                                 isMatch = false;
//                             } else {
//                                 if (index_content < 0) {
//                                     index_content = 0;
//                                 }
//                                 if (i == 0) {
//                                     first_occur = index_content;
//                                 }
//                             }
//                         });
//                     }

//                     // 返回搜索结果
//                     if (isMatch) {
//                       console.log(data_title);

//                     //结果标签
//                         str += "<li><a href='"+ data_url +"' class='search-result-title' target='_blank'>"+ "> " + data_title +"</a>";
//                         var content = data.content.trim().replace(/<[^>]+>/g,"");
//                         if (first_occur >= 0) {
//                             // 拿出含有搜索字的部分
//                             var start = first_occur - 6;
//                             var end = first_occur + 6;
//                             if(start < 0){
//                                 start = 0;
//                             }
//                             if(start == 0){
//                                 end = 10;
//                             }
//                             if(end > content.length){
//                                 end = content.length;
//                             }
//                             var match_content = content.substr(start, end); 
//                             // 列出搜索关键字，定义class加高亮
//                             keywords.forEach(function(keyword){
//                                 var regS = new RegExp(keyword, "gi");
//                                 match_content = match_content.replace(regS, "<em class=\"search-keyword\">"+keyword+"</em>");
//                             })
//                             str += "<p class=\"search-result\">" + match_content +"...</p>"
//                         }
//                     }
//                 })
//                 $resultContent.innerHTML = str;
//             // })
//         }
//     })
// };