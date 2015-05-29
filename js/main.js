// Generated by CoffeeScript 1.9.2
(function() {
  var accelFlg, global, hideMessage, initCSS, initMSG, initMessages, initNitosanBack, rotateNitosanBack, rotationSpeed, scrollToMessage, showMessage;

  global = this;

  initCSS = function() {
    var can_aspect, canvas, img_aspect, nito_san, nito_san_back, nito_san_img, nito_san_shadow;
    nito_san = $("#nito-san");
    nito_san_img = $("#nito-san img");
    nito_san_back = $("#nito-san-back");
    nito_san_shadow = $("#nito-san-shadow");
    canvas = $("#canvas");
    nito_san.css("height", $(window).height());
    nito_san_back.css("width", nito_san.width());
    nito_san_back.css("height", nito_san.height());
    nito_san_back.css("top", 0);
    img_aspect = 1037 / 1106;
    can_aspect = nito_san.width() / nito_san.height();
    if (img_aspect < can_aspect) {
      nito_san_img.css("height", nito_san.height());
      nito_san_img.css("width", nito_san.height() * img_aspect);
      nito_san_img.css("margin-left", nito_san.width() / 2 - nito_san_img.width() / 2);
      nito_san_img.css("margin-top", 0);
      nito_san_shadow.css("height", nito_san.height());
      nito_san_shadow.css("width", nito_san.height() * img_aspect);
      nito_san_shadow.css("margin-left", nito_san.width() / 2 - nito_san_shadow.width() / 2);
      nito_san_shadow.css("margin-top", 0);
    } else {
      nito_san_img.css("width", nito_san.width());
      nito_san_img.css("height", nito_san.width() / img_aspect);
      nito_san_img.css("margin-left", 0);
      nito_san_img.css("margin-top", nito_san.height() / 2 - nito_san_img.height() / 2);
      nito_san_shadow.css("width", nito_san.width());
      nito_san_shadow.css("height", nito_san.width() / img_aspect);
      nito_san_shadow.css("margin-left", 0);
      nito_san_shadow.css("margin-top", nito_san.height() / 2 - nito_san_shadow.height() / 2);
    }
    initNitosanBack();
    initMessages();
    return fires.setup();
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

  accelFlg = false;

  rotationSpeed = 1;

  rotateNitosanBack = function() {
    var housha, rotation;
    housha = $("#nito-san-back img");
    rotation = 0;
    return setInterval(function() {
      if (accelFlg) {
        rotationSpeed += 0.1;
        if (rotationSpeed > 10) {
          rotationSpeed = 10;
        }
      } else {
        rotationSpeed -= 0.2;
        if (rotationSpeed < 1) {
          rotationSpeed = 1;
        }
      }
      housha.css({
        transform: "rotate(" + rotation + "deg)"
      });
      return rotation += Math.PI / 1000 * 180 * rotationSpeed;
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

  initMSG = function() {
    var btn;
    return btn = $("#msg #msg-back-button");
  };

  scrollToMessage = function() {
    var messages;
    messages = $("#messages");
    return $('html, body').animate({
      scrollTop: messages.offset().top
    }, 1500);
  };

  showMessage = function(message_html, name_text, img_src) {
    var img, name, text;
    console.log(img_src);
    $("#main").on('touchmove.noScroll', function(e) {
      return e.preventDefault();
    });
    $("#main").css("overflow", "hidden");
    text = $('#msg #msg-text .text');
    name = $('#msg #msg-text .name');
    img = $('#msg-face');
    text.html(message_html);
    name.text(name_text);
    img.attr("src", img_src);
    $("#msg").css("opacity", 0);
    $("#msg").css("display", "block");
    $('#msg').scrollTop(0);
    return $("#msg").animate({
      opacity: 1
    }, "fast");
  };

  hideMessage = function() {
    $("#main").off('.noScroll');
    $("#main").css("overflow", "scroll");
    return $("#msg").animate({
      opacity: 0
    }, "fast", "swing", function() {
      return $("#msg").css("display", "none");
    });
  };

  global.main = {
    start: function() {
      var scroll_to_message_flg;
      $('#main').scrollTop(0);
      scroll_to_message_flg = true;
      setTimeout(function() {
        return $("#main").scroll(function() {
          return scroll_to_message_flg = false;
        });
      }, 500);
      rotateNitosanBack();
      return setTimeout(function() {
        if (scroll_to_message_flg) {
          return scrollToMessage();
        }
      }, 3000);
    }
  };

  $(function() {
    var imageTouch, imageTouchEnd;
    initCSS();
    $(window).resize(function() {
      return initCSS();
    });
    imageTouch = function(self) {
      var img, li, name, text;
      li = $(self).parent().parent();
      img = li.find("img");
      text = li.find(".contents .text");
      name = li.find(".contents .name");
      return showMessage(text.html(), name.text(), img.attr("src"));
    };
    $("#messages li img").mousedown(function() {
      return imageTouch(this);
    });
    imageTouchEnd = function(self) {
      return hideMessage();
    };
    $("#msg #msg-back-button").mousedown(function() {
      return imageTouchEnd(this);
    });
    $("#msg #msg-back-button").bind("touchstart", function() {
      return imageTouchEnd(this);
    });
    $("#nito-san img").mousedown(function(e) {
      return accelFlg = true;
    });
    $("#nito-san img").bind("touchstart", function(e) {
      return accelFlg = true;
    });
    $("#nito-san img").mouseup(function(e) {
      e.preventDefault();
      return accelFlg = false;
    });
    return $("#nito-san img").bind("touchend", function(e) {
      e.preventDefault();
      return accelFlg = false;
    });
  });

}).call(this);
