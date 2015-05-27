// Generated by CoffeeScript 1.9.2
(function() {
  var hideMessage, initCSS, initMessages, initNitosanBack, rotateNitosanBack, scrollToMessage, showMessage;

  initCSS = function() {
    var can_aspect, img_aspect, nito_san, nito_san_back, nito_san_img;
    nito_san = $("#nito-san");
    nito_san_img = $("#nito-san img");
    nito_san_back = $("#nito-san-back");
    nito_san.css("height", $(window).height());
    nito_san_back.css("width", nito_san.width());
    nito_san_back.css("height", nito_san.height());
    nito_san_back.css("top", 0);
    img_aspect = nito_san_img.width() / nito_san_img.height();
    can_aspect = nito_san.width() / nito_san.height();
    if (img_aspect < can_aspect) {
      nito_san_img.css("height", nito_san.height());
      nito_san_img.css("width", "auto");
      nito_san_img.css("margin-left", nito_san.width() / 2 - nito_san_img.width() / 2);
      nito_san_img.css("margin-top", 0);
    } else {
      nito_san_img.css("width", nito_san.width());
      nito_san_img.css("height", "auto");
      nito_san_img.css("margin-left", 0);
      nito_san_img.css("margin-top", nito_san.height() / 2 - nito_san_img.height() / 2);
    }
    initNitosanBack();
    return initMessages();
  };

  initNitosanBack = function() {
    var height, housha, len, nito_san, width;
    nito_san = $("#nito-san");
    housha = $("#nito-san-back img");
    height = nito_san.height();
    width = nito_san.width();
    len = Math.sqrt(height * height + width * width);
    housha.css("width", len);
    housha.css("height", len);
    housha.css("margin-left", nito_san.width() / 2 - len / 2);
    return housha.css("margin-top", nito_san.height() / 2 - len / 2);
  };

  rotateNitosanBack = function() {
    var housha, rotation;
    housha = $("#nito-san-back img");
    rotation = 0;
    return setInterval(function() {
      housha.css({
        transform: "rotate(" + rotation + "deg)"
      });
      return rotation += Math.PI / 1000 * 180;
    }, 33);
  };

  initMessages = function() {
    var li, num, padding, ul, width;
    li = $("#messages li");
    ul = $("#messages ul");
    padding = 32;
    if ($(window).width() < 500) {
      width = $(window).width() - padding * 2;
      li.css("width", width / 2);
      li.css("height", width / 2);
      return ul.css("padding-left", 0);
    } else {
      width = $(window).width() - padding * 2;
      num = Math.floor(width / li.width());
      return ul.css("padding-left", (width - num * li.width()) / 2);
    }
  };

  scrollToMessage = function() {
    var messages;
    messages = $("#messages");
    return $('html, body').animate({
      scrollTop: messages.offset().top
    }, 1500);
  };

  showMessage = function(message, img) {
    $("#msg").css("opacity", 0);
    $("#msg").css("display", "block");
    return $("#msg").animate({
      opacity: 1
    });
  };

  hideMessage = function() {
    return $("#msg").animate({
      opacity: 0
    }, "normal", "swing", function() {
      return $("#msg").css("display", "none");
    });
  };

  $(function() {
    var scroll_to_message_flg;
    initCSS();
    $(window).resize(function() {
      return initCSS();
    });
    rotateNitosanBack();
    scroll_to_message_flg = true;
    $(window).scroll(function() {
      return scroll_to_message_flg = false;
    });
    setTimeout(function() {
      if (scroll_to_message_flg) {
        return scrollToMessage();
      }
    }, 5000);
    $("#messages li img").click(function() {
      return showMessage();
    });
    return $("#msg #msg-back-button").click(function() {
      return hideMessage();
    });
  });

}).call(this);
