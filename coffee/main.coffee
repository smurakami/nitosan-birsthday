global = this

initCSS = ->
    nito_san      = $ "#nito-san"
    nito_san_img  = $ "#nito-san img"
    nito_san_back = $ "#nito-san-back"
    nito_san_shadow = $ "#nito-san-shadow"
    canvas        = $ "#canvas"

    # にとーさんの映像はいるところをwindowにフィット
    # nito_san.css("width", $(window).width())
    nito_san.css("height", $(window).height())

    # にとーさんの背景画像をフィット
    nito_san_back.css("width", nito_san.width())
    nito_san_back.css("height", nito_san.height())
    nito_san_back.css("top", 0)

    # にとーさんの画像をセンタリング
    img_aspect = nito_san_img.width() / nito_san_img.height()
    can_aspect = nito_san.width() / nito_san.height();

    if img_aspect < can_aspect
        # wide screen
        nito_san_img.css "height", nito_san.height()
        nito_san_img.css "width", "auto"
        nito_san_img.css "margin-left", nito_san.width() / 2 - nito_san_img.width() / 2
        nito_san_img.css "margin-top", 0
        nito_san_shadow.css "height", nito_san.height()
        nito_san_shadow.css "width", "auto"
        nito_san_shadow.css "margin-left", nito_san.width() / 2 - nito_san_shadow.width() / 2
        nito_san_shadow.css "margin-top", 0
        # canvas.css "margin-left", nito_san.width() / 2 - nito_san_img.width() / 2
        # canvas.css "margin-top", 0
    else
        # console.log("not wide screen")
        nito_san_img.css "width", nito_san.width()
        nito_san_img.css "height", "auto"
        nito_san_img.css "margin-left", 0
        nito_san_img.css "margin-top", nito_san.height() / 2 - nito_san_img.height() / 2
        nito_san_shadow.css "width", nito_san.width()
        nito_san_shadow.css "height", "auto"
        nito_san_shadow.css "margin-left", 0
        nito_san_shadow.css "margin-top", nito_san.height() / 2 - nito_san_shadow.height() / 2
        # canvas.css "margin-left", 0
        # canvas.css "margin-top", nito_san.height() / 2 - nito_san_img.height() / 2

    # canvas.css "width", nito_san_img.width()
    # canvas.css "height", nito_san_img.height()

    initNitosanBack()
    initMessages()

    fires.setup()

initNitosanBack = ->
    nito_san      = $ "#nito-san"
    housha        = $ "#nito-san-back img"

    height = nito_san.height()
    width = nito_san.width()
    # 対角線
    len = Math.sqrt height * height + width * width

    housha.css "width", len
    housha.css "height", len
    housha.css "margin-left", nito_san.width()/2 - len/2
    housha.css "margin-top",  nito_san.height()/2 - len/2

accelFlg = false
rotationSpeed = 1

rotateNitosanBack = ->
    housha        = $ "#nito-san-back img"
    rotation = 0
    setInterval ->
        if accelFlg
            rotationSpeed += 0.1
            if rotationSpeed > 10 then rotationSpeed = 10
        else
            rotationSpeed -= 0.2
            if rotationSpeed < 1 then rotationSpeed = 1

        housha.css {transform: "rotate(#{rotation}deg)"}
        rotation += Math.PI / 1000 * 180 * rotationSpeed
    , 33

initMessages = ->
    li = $ "#messages li"
    ul = $ "#messages ul"
    padding = 32

    if $(window).width() < 500
        width = $(window).width() - padding * 2
        li.css "width", width / 2
        li.css "height", width / 2
        ul.css "padding-left", 0
    else
        width = $(window).width() - padding * 2
        num = Math.floor width / li.width()
        ul.css "padding-left", (width - num * li.width())/2

initMSG = ->
    btn = $ "#msg #msg-back-button"


scrollToMessage = ->
    messages = $ "#messages"
    $('html, body').animate({scrollTop: messages.offset().top}, 1500)

showMessage = (message_text, name_text, img_src) ->
    # console.log message
    # console.log name
    console.log img_src

    # set up contents
    text = $ '#msg #msg-text .text'
    name = $ '#msg #msg-text .name'
    img  = $ '#msg-face'

    text.text(message_text)
    name.text(name_text)
    img.attr("src", img_src)

    $("#msg").css "opacity", 0
    $("#msg").css "display", "block"
    $("#msg").animate({opacity: 1}, "fast")

hideMessage = ->
    $("#msg").animate {opacity: 0}, "fast", "swing", ->
        $("#msg").css "display", "none"

global.main =
    start: ->
        $('html, body').scrollTop(0);

        scroll_to_message_flg = true

        setTimeout ->
            $(window).scroll ->
                scroll_to_message_flg = false
        , 500


        rotateNitosanBack()

        setTimeout ->
            if scroll_to_message_flg then scrollToMessage()
        , 3000

$ ->
    initCSS()

    # evevnts

    $(window).resize ->
        initCSS()

    imageTouch = (self) ->
        li = $(self).parent().parent()
        img = li.find("img")
        text = li.find(".contents .text")
        name = li.find(".contents .name")
        showMessage(text.text(), name.text(), img.attr("src"))

    $("#messages li img").mousedown ->
        imageTouch this

    imageTouchEnd = (self) ->
        hideMessage()

    $("#msg #msg-back-button").mousedown ->
        imageTouchEnd this

    $("#msg #msg-back-button").bind "touchstart", ->
        imageTouchEnd this

    $("#nito-san img").mousedown (e) ->
        accelFlg = true
    $("#nito-san img").bind "touchstart", (e) ->
        accelFlg = true

    $("#nito-san img").mouseup (e) ->
        e.preventDefault()
        accelFlg = false
    $("#nito-san img").bind "touchend", (e) ->
        e.preventDefault()
        accelFlg = false




