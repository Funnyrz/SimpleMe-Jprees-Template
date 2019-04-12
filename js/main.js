 var agent = navigator.userAgent;
 if (/.*Firefox.*/.test(agent)) {
     document.addEventListener("DOMMouseScroll", function (e) {
         e = e || window.event;
         var detail = e.detail;
         if (detail > 0) {
             $("#yy-nav").slideDown(200);
         } else {
             if (isScro) {
                 $("#yy-nav").slideUp(500);
             }
         }
     });
 } else {
     document.onmousewheel = function (e) {
         e = e || window.event;
         var wheelDelta = e.wheelDelta;
         if (wheelDelta > 0) {
             $("#yy-nav").slideDown(200);
         } else {
             var isScro = isScrollTop()
             if (isScro) {
                 $("#yy-nav").slideUp(500);
             }
         }
     }
 }
 //是否出现滚动条
 function isScrollTop() {
     if ($("html").scrollTop() > 0) {
         return true;
     } else {
         return false;
     }
 }
 $(function () {
     $("#search-icon").click(function () {
         $('#myModal').modal("show");
     })
 })

 function searchArt() {
     var keyword = $("#search-key").val();
     if (keyword == '' || keyword == null) {
         alert("请输入关键字进行搜索");
     }
     window.location.href = "/article/search?keyword=" + keyword;
 }