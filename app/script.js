
  var menuEffects = (function(){
      var height = $("#introButton").height();
      var offset =  $("#introButton").offset();
      var scroller = $(window).scrollTop();


      var _init = function(){
        scroller=$(window).scrollTop();
        _unblur();
        _blur();
      };

      var _unblur = function () {
        if(offset.top+height < scroller){
          $(".nav").addClass("opacNav");
          $(".subMenu").addClass("opacSubNav");
        }
      };

      var _blur= function(){
        if((offset.top+height > scroller)){
          $(".nav").removeClass("opacNav");
          $(".subMenu").removeClass("opacSubNav");
        }
      };
      var _subMenuToggle = function(){
        $('#smMenu').on('click',function(){
          $(".subMenu").toggle(400);
        });
      };
      var _subMenuHide = function(){
        $(".subMenu").hide();
      };
      var _menuLinks = function(){
        $(document).on('click', '.menu', function(event){
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 800);
        });
      };
      return{
        init: _init,
        subMenuToggle: _subMenuToggle,
        menuLinks: _menuLinks,
        subMenuHide: _subMenuHide
      }
  })();

$(function() {
    menuEffects.subMenuToggle();
    menuEffects.menuLinks();

    $(window).scroll(function() {
      menuEffects.init();
    });

    $(window).resize(function(){
        menuEffects.subMenuHide();
        menuEffects.init();
    });

});
