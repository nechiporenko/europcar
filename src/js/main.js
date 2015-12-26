// Application Scripts:


// Мобильное меню
// Маска для телефонного номера
// Сообщения об отправке формы
// Кнопка скролла страницы
// Модальное окно
// Если браузер не знает о svg-картинках
// Если браузер не знает о плейсхолдерах в формах

jQuery(document).ready(function ($) {
    //Кэшируем
    var $window = $(window),
        $html=$('html'),
        $body = $('body'),
        BREAKPOINT = 992;

    $body.append('<div id="overlay" class="overlay"></div>');//оверлей
    var $overlay = $('#overlay');

    //
    // Мобильное меню
    //---------------------------------------------------------------------------------------
    function initMobileMenu() {
        var $btn = $('.js-mtoggle'),
            $menu = $('.js-mmenu');


        $('.b-header').on('click', '.js-mtoggle', function () {//покажем - спрячем
            if ($(this).hasClass('active')) {
                hideMenu();
            } else {
                showMenu();
            }
        });

        $menu.on('click', '.m-menu__label', hideMenu); //закроем по клику по заголовку

        function hideMenu() {
            $btn.removeClass('active');
            $menu.removeClass('active');
            $html.css('overflow', 'auto');
            $overlay.unbind('click', hideMenu).hide();
        }

        function showMenu() {
            $btn.addClass('active');
            $menu.addClass('active');
            $html.css('overflow', 'hidden');
            $overlay.show();
        }

        $menu.mouseleave(function () {//будем закрывать по клику на оверлей
            $overlay.bind('click', hideMenu)
        }).mouseenter(function () {
            $overlay.unbind('click', hideMenu);
        });
    }
    initMobileMenu();

    //
    // Фиксируем хидер при скролле
    //---------------------------------------------------------------------------------------
    function stickyHeader() {
        $('.js-header').wrap('<div class="header__wrap"></div>');
        var $wrap = $('.header__wrap'),
            flag = false,
            winW,
            activeClass = 'scrolled',
            topOffset = 54, //высота десктоп-меню
            isStick;

        //проверим скролл при загрузке страницы
        recalcScroll();

        function checkScroll() {
            isStick = verge.inViewport($wrap, -topOffset);

            if (!isStick && !flag) {
                stickMenu();
            }

            if (isStick && flag) {
                unstickMenu();
            }
        }
        
        function stickMenu() {
            $wrap.addClass(activeClass);
            flag = true;
        }

        function unstickMenu() {
            $wrap.removeClass(activeClass);
            flag = false;
        }

        function recalcScroll() {
            winW = verge.viewportW();
            isStick = verge.inViewport($wrap, -topOffset);

            if(winW>=BREAKPOINT && !isStick && !flag) {
                stickMenu();
                $window.bind('scroll', checkScroll);
            }

            if (winW >= BREAKPOINT && isStick && !flag) {
                $window.bind('scroll', checkScroll);
            }

            if (winW < BREAKPOINT && flag) {
                unstickMenu();
                $window.unbind('scroll', checkScroll);
            }
        }

        $window.on('resize', function () {
            setTimeout(500, recalcScroll());
        });
    }
    stickyHeader();



    //
    // Маска для телефонного номера
    //---------------------------------------------------------------------------------------
    $('.js-phone-input').mask('+99 (999) 999-99-99');

    //
    // Сообщения об отправке формы
    //---------------------------------------------------------------------------------------
    // после аякс-отправки формы ($form), если все ок - $form.find('.g-notice--ok').fadeIn();
    // если вернуло ошибку - $form.find('.g-notice--bad').fadeIn();
    var showFormNotice = (function () {
        var $notice = $('.js-notice');
        $notice.append('<a class="g-notice__close"><i class="icon-cancel"></i></a>'); //иконка закрытия
        $notice.on('click', '.g-notice__close', function (e) {//закроем блок по клику на иконку
            e.preventDefault();
            $(this).parent('div').fadeOut();
        });
    }());

    //
    // Кнопка скролла страницы
    //---------------------------------------------------------------------------------------
    var initPageScroller = (function () {
        var $scroller = $('<div class="scroll-up-btn"><i class="icon-up-open-big"></i></div>');
        $body.append($scroller);
        $window.on('scroll', function () {
            if ($(this).scrollTop() > 300) {
                $scroller.show();
            } else {
                $scroller.hide();
            }
        });
        $scroller.on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });
    }());


    //
    // Модальное окно
    //---------------------------------------------------------------------------------------
    var showModal = (function (link) {
        var
        method = {},
        $overlay,
        $modal,
        $close;

        // добавим в документ
        $close = $('<a class="modal__close" href="#"><i class="icon-cancel"></i></a>'); //иконка закрыть


        $close.on('click', function (e) {
            e.preventDefault();
            method.close();
        });

        // центрируем окно
        method.center = function () {
            var top, left;

            top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
            left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;

            $modal.css({
                top: top + $window.scrollTop(),
                left: left + $window.scrollLeft()
            });
        };


        // открываем
        method.open = function (link) {
            $modal = $(link);
            $modal.append($close);
            method.center();
            $window.bind('resize.modal', method.center);
            $modal.fadeIn();
            $overlay.fadeIn();
            $overlay.bind('click', method.close);
        };

        // закрываем
        method.close = function () {
            $modal.fadeOut('fast');
            $overlay.fadeOut('fast', function () {
                $overlay.unbind('click', method.close);
            });
            $window.unbind('resize.modal');
        };

        return method;
    }());

    // клик по кнопке с атрибутом data-modal - открываем модальное окно
    $('[data-modal]').on('click', function (e) {//передаем айди модального окна
        e.preventDefault();
        var link = $(this).data('modal');
        if (link) { showModal.open(link); }
    });

    //
    // Если браузер не знает о svg-картинках
    //---------------------------------------------------------------------------------------
    if (!Modernizr.svg) {
        $('img[src*="svg"]').attr('src', function () {
            return $(this).attr('src').replace('.svg', '.png');
        });
    }

    //
    // Если браузер не знает о плейсхолдерах в формах
    //---------------------------------------------------------------------------------------
    if (!("placeholder" in document.createElement("input"))) {
        $("input[placeholder], textarea[placeholder]").each(function () {
            var val = $(this).attr("placeholder");
            if (this.value == "") {
                this.value = val;
            }
            $(this).focus(function () {
                if (this.value == val) {
                    this.value = "";
                }
            }).blur(function () {
                if ($.trim(this.value) == "") {
                    this.value = val;
                }
            })
        });

        $('form').submit(function () {
            $(this).find("input[placeholder], textarea[placeholder]").each(function () {
                if (this.value == $(this).attr("placeholder")) {
                    this.value = "";
                }
            });
        });
    }


    
});
