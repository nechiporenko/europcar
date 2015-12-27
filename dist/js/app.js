// Avoid `console` errors in browsers that lack a console
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function (a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery) }(function (a) { var b, c = navigator.userAgent, d = /iphone/i.test(c), e = /chrome/i.test(c), f = /android/i.test(c); a.mask = { definitions: { 9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]" }, autoclear: !0, dataName: "rawMaskFn", placeholder: "_" }, a.fn.extend({ caret: function (a, b) { var c; if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () { this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select()) })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), { begin: a, end: b }) }, unmask: function () { return this.trigger("unmask") }, mask: function (c, g) { var h, i, j, k, l, m, n, o; if (!c && this.length > 0) { h = a(this[0]); var p = h.data(a.mask.dataName); return p ? p() : void 0 } return g = a.extend({ autoclear: a.mask.autoclear, placeholder: a.mask.placeholder, completed: null }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) { "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null) }), this.trigger("unmask").each(function () { function h() { if (g.completed) { for (var a = l; m >= a; a++) if (j[a] && C[a] === p(a)) return; g.completed.call(B) } } function p(a) { return g.placeholder.charAt(a < g.placeholder.length ? a : 0) } function q(a) { for (; ++a < n && !j[a];); return a } function r(a) { for (; --a >= 0 && !j[a];); return a } function s(a, b) { var c, d; if (!(0 > a)) { for (c = a, d = q(b) ; n > c; c++) if (j[c]) { if (!(n > d && j[c].test(C[d]))) break; C[c] = C[d], C[d] = p(d), d = q(d) } z(), B.caret(Math.max(l, a)) } } function t(a) { var b, c, d, e; for (b = a, c = p(a) ; n > b; b++) if (j[b]) { if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break; c = e } } function u() { var a = B.val(), b = B.caret(); if (o && o.length && o.length > a.length) { for (A(!0) ; b.begin > 0 && !j[b.begin - 1];) b.begin--; if (0 === b.begin) for (; b.begin < l && !j[b.begin];) b.begin++; B.caret(b.begin, b.begin) } else { for (A(!0) ; b.begin < n && !j[b.begin];) b.begin++; B.caret(b.begin, b.begin) } h() } function v() { A(), B.val() != E && B.change() } function w(a) { if (!B.prop("readonly")) { var b, c, e, f = a.which || a.keyCode; o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault()) } } function x(b) { if (!B.prop("readonly")) { var c, d, e, g = b.which || b.keyCode, i = B.caret(); if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) { if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) { if (t(c), C[c] = d, z(), e = q(c), f) { var k = function () { a.proxy(a.fn.caret, B, e)() }; setTimeout(k, 0) } else B.caret(e); i.begin <= m && h() } b.preventDefault() } } } function y(a, b) { var c; for (c = a; b > c && n > c; c++) j[c] && (C[c] = p(c)) } function z() { B.val(C.join("")) } function A(a) { var b, c, d, e = B.val(), f = -1; for (b = 0, d = 0; n > b; b++) if (j[b]) { for (C[b] = p(b) ; d++ < e.length;) if (c = e.charAt(d - 1), j[b].test(c)) { C[b] = c, f = b; break } if (d > e.length) { y(b + 1, n); break } } else C[b] === e.charAt(d) && d++, k > b && (f = b); return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l } var B = a(this), C = a.map(c.split(""), function (a, b) { return "?" != a ? i[a] ? p(b) : a : void 0 }), D = C.join(""), E = B.val(); B.data(a.mask.dataName, function () { return a.map(C, function (a, b) { return j[b] && a != p(b) ? a : null }).join("") }), B.one("unmask", function () { B.off(".mask").removeData(a.mask.dataName) }).on("focus.mask", function () { if (!B.prop("readonly")) { clearTimeout(b); var a; E = B.val(), a = A(), b = setTimeout(function () { B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a)) }, 10) } }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () { B.prop("readonly") || setTimeout(function () { var a = A(!0); B.caret(a), h() }, 0) }), e && f && B.off("input.mask").on("input.mask", u), A() }) } }) });

/*
 * verge 1.9.1+201402130803
 * https://github.com/ryanve/verge
 * MIT License 2013 Ryan Van Etten
 */
!function (a, b, c) { "undefined" != typeof module && module.exports ? module.exports = c() : a[b] = c() }(this, "verge", function () { function a() { return { width: k(), height: l() } } function b(a, b) { var c = {}; return b = +b || 0, c.width = (c.right = a.right + b) - (c.left = a.left - b), c.height = (c.bottom = a.bottom + b) - (c.top = a.top - b), c } function c(a, c) { return a = a && !a.nodeType ? a[0] : a, a && 1 === a.nodeType ? b(a.getBoundingClientRect(), c) : !1 } function d(b) { b = null == b ? a() : 1 === b.nodeType ? c(b) : b; var d = b.height, e = b.width; return d = "function" == typeof d ? d.call(b) : d, e = "function" == typeof e ? e.call(b) : e, e / d } var e = {}, f = "undefined" != typeof window && window, g = "undefined" != typeof document && document, h = g && g.documentElement, i = f.matchMedia || f.msMatchMedia, j = i ? function (a) { return !!i.call(f, a).matches } : function () { return !1 }, k = e.viewportW = function () { var a = h.clientWidth, b = f.innerWidth; return b > a ? b : a }, l = e.viewportH = function () { var a = h.clientHeight, b = f.innerHeight; return b > a ? b : a }; return e.mq = j, e.matchMedia = i ? function () { return i.apply(f, arguments) } : function () { return {} }, e.viewport = a, e.scrollX = function () { return f.pageXOffset || h.scrollLeft }, e.scrollY = function () { return f.pageYOffset || h.scrollTop }, e.rectangle = c, e.aspect = d, e.inX = function (a, b) { var d = c(a, b); return !!d && d.right >= 0 && d.left <= k() }, e.inY = function (a, b) { var d = c(a, b); return !!d && d.bottom >= 0 && d.top <= l() }, e.inViewport = function (a, b) { var d = c(a, b); return !!d && d.bottom >= 0 && d.right >= 0 && d.top <= l() && d.left <= k() }, e });
jQuery.extend(verge);

// jQuery autoComplete v1.0.7
// https://github.com/Pixabay/jQuery-autoComplete
!function (e) { e.fn.autoComplete = function (t) { var o = e.extend({}, e.fn.autoComplete.defaults, t); return "string" == typeof t ? (this.each(function () { var o = e(this); "destroy" == t && (e(window).off("resize.autocomplete", o.updateSC), o.off("blur.autocomplete focus.autocomplete keydown.autocomplete keyup.autocomplete"), o.data("autocomplete") ? o.attr("autocomplete", o.data("autocomplete")) : o.removeAttr("autocomplete"), e(o.data("sc")).remove(), o.removeData("sc").removeData("autocomplete")) }), this) : this.each(function () { function t(e) { var t = s.val(); if (s.cache[t] = e, e.length && t.length >= o.minChars) { for (var a = "", c = 0; c < e.length; c++) a += o.renderItem(e[c], t); s.sc.html(a), s.updateSC(0) } else s.sc.hide() } var s = e(this); s.sc = e('<div class="autocomplete-suggestions ' + o.menuClass + '"></div>'), s.data("sc", s.sc).data("autocomplete", s.attr("autocomplete")), s.attr("autocomplete", "off"), s.cache = {}, s.last_val = "", s.updateSC = function (t, o) { if (s.sc.css({ top: s.offset().top + s.outerHeight(), left: s.offset().left, width: s.outerWidth() }), !t && (s.sc.show(), s.sc.maxHeight || (s.sc.maxHeight = parseInt(s.sc.css("max-height"))), s.sc.suggestionHeight || (s.sc.suggestionHeight = e(".autocomplete-suggestion", s.sc).first().outerHeight()), s.sc.suggestionHeight)) if (o) { var a = s.sc.scrollTop(), c = o.offset().top - s.sc.offset().top; c + s.sc.suggestionHeight - s.sc.maxHeight > 0 ? s.sc.scrollTop(c + s.sc.suggestionHeight + a - s.sc.maxHeight) : 0 > c && s.sc.scrollTop(c + a) } else s.sc.scrollTop(0) }, e(window).on("resize.autocomplete", s.updateSC), s.sc.appendTo("body"), s.sc.on("mouseleave", ".autocomplete-suggestion", function () { e(".autocomplete-suggestion.selected").removeClass("selected") }), s.sc.on("mouseenter", ".autocomplete-suggestion", function () { e(".autocomplete-suggestion.selected").removeClass("selected"), e(this).addClass("selected") }), s.sc.on("mousedown", ".autocomplete-suggestion", function (t) { var a = e(this), c = a.data("val"); return (c || a.hasClass("autocomplete-suggestion")) && (s.val(c), o.onSelect(t, c, a), s.sc.hide()), !1 }), s.on("blur.autocomplete", function () { try { over_sb = e(".autocomplete-suggestions:hover").length } catch (t) { over_sb = 0 } over_sb ? s.is(":focus") || setTimeout(function () { s.focus() }, 20) : (s.last_val = s.val(), s.sc.hide(), setTimeout(function () { s.sc.hide() }, 350)) }), o.minChars || s.on("focus.autocomplete", function () { s.last_val = "\n", s.trigger("keyup.autocomplete") }), s.on("keydown.autocomplete", function (t) { if ((40 == t.which || 38 == t.which) && s.sc.html()) { var a, c = e(".autocomplete-suggestion.selected", s.sc); return c.length ? (a = 40 == t.which ? c.next(".autocomplete-suggestion") : c.prev(".autocomplete-suggestion"), a.length ? (c.removeClass("selected"), s.val(a.addClass("selected").data("val"))) : (c.removeClass("selected"), s.val(s.last_val), a = 0)) : (a = 40 == t.which ? e(".autocomplete-suggestion", s.sc).first() : e(".autocomplete-suggestion", s.sc).last(), s.val(a.addClass("selected").data("val"))), s.updateSC(0, a), !1 } if (27 == t.which) s.val(s.last_val).sc.hide(); else if (13 == t.which || 9 == t.which) { var c = e(".autocomplete-suggestion.selected", s.sc); c.length && s.sc.is(":visible") && (o.onSelect(t, c.data("val"), c), setTimeout(function () { s.sc.hide() }, 20)) } }), s.on("keyup.autocomplete", function (a) { if (!~e.inArray(a.which, [13, 27, 35, 36, 37, 38, 39, 40])) { var c = s.val(); if (c.length >= o.minChars) { if (c != s.last_val) { if (s.last_val = c, clearTimeout(s.timer), o.cache) { if (c in s.cache) return void t(s.cache[c]); for (var l = 1; l < c.length - o.minChars; l++) { var i = c.slice(0, c.length - l); if (i in s.cache && !s.cache[i].length) return void t([]) } } s.timer = setTimeout(function () { o.source(c, t) }, o.delay) } } else s.last_val = c, s.sc.hide() } }) }) }, e.fn.autoComplete.defaults = { source: 0, minChars: 3, delay: 150, cache: 1, menuClass: "", renderItem: function (e, t) { t = t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); var o = new RegExp("(" + t.split(" ").join("|") + ")", "gi"); return '<div class="autocomplete-suggestion" data-val="' + e + '">' + e.replace(o, "<b>$1</b>") + "</div>" }, onSelect: function (e, t, o) { } } }(jQuery);



// Application Scripts:


// Мобильное меню
// Скролл по странице при клике в десктоп-меню
// Фиксируем хидер при скролле
// Маска для телефонного номера
// Кнопка скролла страницы
// Smooth-Скролл по странице
// Модальное окно
// Поиск
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
            $menu = $('.js-mmenu'),
            method = {};        

        method.showMenu = function () {
            $btn.addClass('active');
            $menu.addClass('active');
            $html.css('overflow', 'hidden');
            $overlay.show();
        }

        method.hideMenu = function () {
            $btn.removeClass('active');
            $menu.removeClass('active');
            $html.css('overflow', 'auto');
            $overlay.unbind('click', method.hideMenu).hide();
        }

        $('.b-header').on('click', '.js-mtoggle', function () {//покажем - спрячем
            if ($(this).hasClass('active')) {
                method.hideMenu();
            } else {
                method.showMenu();
            }
        });

        $menu.mouseleave(function () {//будем закрывать по клику на оверлей
            $overlay.bind('click', method.hideMenu)
        }).mouseenter(function () {
            $overlay.unbind('click', method.hideMenu);
        });

        $menu.on('click', '.m-menu__label', method.hideMenu); //закроем по клику по заголовку

        $menu.on('click', '.js-inner-link', function (e) {
            e.preventDefault();
            var id = $(this).attr('href');
            smoothScroll(id, 0);
            method.hideMenu();
        });
    }
    initMobileMenu();

    //
    // Скролл по странице при клике в десктоп-меню
    //---------------------------------------------------------------------------------------
    $('.js-header').on('click', '.js-inner-link', function (e) {
        e.preventDefault();
        var id = $(this).attr('href');
        smoothScroll(id, 54); //54 - sticky header height
    });

    //
    // Фиксируем хидер при скролле
    //---------------------------------------------------------------------------------------
    function stickyHeader() {
        $('.js-header').wrap('<div class="header__wrap"></div>');
        var $wrap = $('.header__wrap'),
            flag = false, //статус
            winW,
            activeClass = 'scrolled',
            topOffset = 54, //высота десктоп-меню
            noStick,
            method = {};

        method.stick = function () {
            $wrap.addClass(activeClass);
            flag = true;
        }

        method.unstick = function () {
            $wrap.removeClass(activeClass);
            flag = false;
        }

        method.check = function () {
            noStick = verge.inViewport($wrap, -topOffset);//проверяем положение враппера на єкране

            if (!noStick && !flag) {
                method.stick();
            }

            if (noStick && flag) {
                method.unstick();
            }
        }

        method.recalc = function () {
            winW = verge.viewportW();//ширина окна
            noStick = verge.inViewport($wrap, -topOffset);

            if (winW >= BREAKPOINT && !noStick && !flag) {
                method.stick();
                $window.bind('scroll', method.check);
            }

            if (winW >= BREAKPOINT && noStick && !flag) {
                $window.bind('scroll', method.check);
            }

            if (winW < BREAKPOINT && flag) {
                method.unstick();
                $window.unbind('scroll', method.check);
            }
        }

        //проверим скролл при загрузке страницы
        method.recalc();

        $window.on('resize', function () {
            setTimeout(500, method.recalc());
        });
    }
    stickyHeader();


    //
    // Маска для телефонного номера
    //---------------------------------------------------------------------------------------
    $('.js-phone-input').mask('+99 (999) 999-99-99');

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
    // Smooth-Скролл по странице
    //---------------------------------------------------------------------------------------
    function smoothScroll(id, topOffset) {
        var $target = $(id);
        
        if ($target.length) {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - topOffset
            }, 900, 'swing', function () {
                window.location.hash = id;
            });
        }
    }


    //
    // Модальное окно
    //---------------------------------------------------------------------------------------
    var showModal = (function (link) {
        var
        method = {},
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
    // Поиск
    //---------------------------------------------------------------------------------------
    $('.js-search').autoComplete({
        minChars: 2,
        source: function (term, suggest) {
            term = term.toLowerCase();
            var choices = searchComplete;
            var matches = [];
            for (i = 0; i < choices.length; i++)
                if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
            suggest(matches);
        }
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

    //
    // IE8
    //---------------------------------------------------------------------------------------
    if ($html.hasClass('lt-ie9')) {
        $('.b-action__item:nth-child(4n-1)').css('margin-right', 0);
        $('.b-advantages__item:nth-child(4n-1)').css('margin-right', 0);
        $('.b-advantages__item:nth-child(5n-1)').css('margin-left', 17 + '%').css('clear', 'left');
        $('.b-faq__item:nth-child(2n+1)').css('clear', 'left');
        $('.b-faq__item:nth-child(2n)').css('margin-right', 0);
    }
    
});
