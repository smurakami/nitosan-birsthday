
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

$ ->
    initCSS()
    $(window).resize ->
        initCSS()
