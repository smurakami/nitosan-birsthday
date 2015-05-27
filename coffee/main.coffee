
initCSS = ->
    nito_san      = $ "#nito-san"
    nito_san_img  = $ "#nito-san img"
    nito_san_back = $ "#nito-san-back"

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
    else
        # console.log("not wide screen")
        nito_san_img.css "width", nito_san.width()
        nito_san_img.css "height", "auto"
        nito_san_img.css "margin-left", 0
        nito_san_img.css "margin-top", nito_san.height() / 2 - nito_san_img.height() / 2

    initNitosanBack()
    initMessages()

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

rotateNitosanBack = ->
    housha        = $ "#nito-san-back img"
    rotation = 0
    setInterval ->
        housha.css {transform: "rotate(#{rotation}deg)"}
        rotation += Math.PI / 1000 * 180
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

scrollToMessage = ->
    messages = $ "#messages"
    $('html, body').animate({scrollTop: messages.offset().top}, 1500)


$ ->
    initCSS()
    $(window).resize ->
        initCSS()
    rotateNitosanBack()

    scroll_to_message_flg = true
    $(window).scroll ->
        scroll_to_message_flg = false

    setTimeout ->
        if scroll_to_message_flg then scrollToMessage()
    , 5000



