function heightAndWidthPx() {
    /*** вывод вьюпорта браузера ***/
    $('.howPx').length == 0 ? $('body').prepend('<div style="position:fixed; top: 0; left: 0; z-index: 10001; background: rgba(255, 255, 255, 0.5); padding: 0 5px;" class="howPx"></div>') : '';

    $('.howPx').text($(window).width() + ' / ' + $(window).height());
}

function mainContentSetHeight() {
    /*** Установка высоты основного контейреа для прижатия футера к низу ***/
    $('.main-content').css({
        'min-height': $(window).height() - $('.main-header').outerHeight(true) - $('.main-footer').outerHeight(true) + 'px'
    });

    $('.main-footer').css({ 'opacity': 1 })
}

function inputLockCheckbox(el) {
    /*** тригер доступности кнопки над её чебоксом ***/
    el.parents('form').find('.btn-with-checkbox').toggleClass('btn--disabled btn--theme');

    if (el.prop('checked')) {
        el.parents('form').find('.btn-with-checkbox').attr('disabled', false)
    } else {
        el.parents('form').find('.btn-with-checkbox').attr('disabled', true)
    }
}

(function () {
    /* якоря */
    $('[data-goto]').click(function (e) {
        if(!$('body').hasClass('inner-page')) {
            e.preventDefault();

            var scroll_el = $(this).attr('data-goto');

            if ($(scroll_el).length !== 0) {
                $('html, body').animate({scrollTop: $(scroll_el).offset().top}, 1250);
            }

            $('body').removeClass('mobile-menu--open');

            menuOpen = false;

            return false;
        }
    });
})();


$(document).ready(function () {

    

    /*** главная формула
     (X * 6 * Y + Z%) * кол-во дней
     ***/
    function formula(a, b, c, numbersSigns, days) {
        return (a * numbersSigns * b + (a * numbersSigns * b / 100 * c)) * days;
    }

    /*** значения для формулы ***/
    function valuesFormula() {
        var i = {
            one: +$('#constructor__money-rate').find('.selection__item.active .number').text(),
            two: slider.noUiSlider.get(),
            three: +$('#constructor__money-bonus').find('.selection__item.active .number').text()
        };
        return i;
    }

    /*** Метод апдейта count.js либы на значениях конструктора***/
    function countUpdate() {
        countUp1.update(howMoney(
            [valuesFormula().one, valuesFormula().two, valuesFormula().three], 7
        ));

        countUp2.update(howMoney(
            [valuesFormula().one, valuesFormula().two, valuesFormula().three], 30
        ));
    }

    /*** инициализация noUiSlider ***/
    if($('#constructor__slider').length > 0) {

        var slider = document.getElementById('constructor__slider');

        noUiSlider.create(slider, {
            start: 2,
            behaviour: 'tap',
            connect: [false, true],
            step: 1,
            range: {
                'min': 1,
                'max': 5
            }
        });

        /*** обновление значений при событии слайдера ***/
        slider.noUiSlider.on('change', function () {
            valuesFormula().two = slider.noUiSlider.get();
            countUpdate();
        });
    }

    /*** Выбор значений формулы ***/
    function selectionValue(el) {
        el.find('.selection__item').on('click', function () {
            valuesFormula();
            if (!$(this).hasClass('active')) {
                el.find('.selection__item').removeClass('active');
                $(this).toggleClass('active');
            } else {
                if ($(this).hasClass('selection__item--can-change')) {
                    $(this).removeClass('active');
                }
            }

            countUpdate();

        })
    }

    /*** Вывода значений формулы ***/
    function howMoney(mas, days) {
        return formula(mas[0], mas[1], mas[2], 6, days)
    }

    /*** запуск слежения выбора значений для формулы***/
    selectionValue($('#constructor__money-rate'));
    selectionValue($('#constructor__money-bonus'));

    (function() {
        /*** Инициализация scrollreveal либы ***/
        if ($('._js-animated').length > 0) {
            var sr = ScrollReveal();

            sr.reveal('._js-animated--header1', { mobile: false, viewFactor: 0, duration: 500, origin: 'top', scale: 1, distance: '0px'});

            sr.reveal('._js-animated--page-title1', { mobile: false, viewFactor: 0, duration: 1000, origin: 'bottom', scale: 1, distance: '0px'});

            sr.reveal('._js-animated--about1', { mobile: false, viewFactor: 0, duration: 1000, origin: 'bottom', scale: 0, distance: '0px'  });
            sr.reveal('._js-animated--about2', { mobile: false, viewFactor: 0, duration: 1000, origin: 'right', scale: 1, distance: '40px'  });
            sr.reveal('._js-animated--about3', { mobile: false, viewFactor: 0, duration: 1000, origin: 'left', scale: 1, distance: '40px'  });
            sr.reveal('._js-animated--about4', { mobile: false, viewFactor: 0, duration: 1000, origin: 'top', scale: 0, distance: '20px'  });

            sr.reveal('._js-animated--advantages1', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 0, distance: '10px' });
            sr.reveal('._js-animated--advantages2', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 0, distance: '10px' });
            sr.reveal('._js-animated--advantages3', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 0, distance: '10px' });
            sr.reveal('._js-animated--advantages4', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 0, distance: '10px' });

            sr.reveal('._js-animated--constructor1', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 0, distance: '10px' });
            sr.reveal('._js-animated--constructor2', { mobile: false, viewFactor: 0, origin: 'left', scale: 0, distance: '10px' });
            sr.reveal('._js-animated--constructor3', { mobile: false, viewFactor: 0, origin: 'right', scale: 0, distance: '10px' });

            sr.reveal('._js-animated--how-work1', { mobile: false, viewFactor: 0, origin: 'left', scale: 0 });
            sr.reveal('._js-animated--how-work3', { mobile: false, viewFactor: 0, origin: 'left', scale: 0, delay: 0 });
            sr.reveal('._js-animated--how-work4', { mobile: false, viewFactor: 0, origin: 'left', scale: 0, delay: 75 });
            sr.reveal('._js-animated--how-work5', { mobile: false, viewFactor: 0, origin: 'left', scale: 0, delay: 150 });
            sr.reveal('._js-animated--how-work6', { mobile: false, viewFactor: 0, origin: 'left', scale: 0, delay: 225 });


            sr.reveal('._js-animated--steps1', { mobile: false, viewFactor: 0, duration: 700, origin: 'left', scale: 0, distance: '30px'});
            sr.reveal('._js-animated--steps2', { mobile: false, viewFactor: 0, duration: 700, origin: 'right', scale: 0, distance: '30px'});
            sr.reveal('._js-animated--steps3', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 0, distance: '0px'});

            sr.reveal('._js-animated--work-with-us2', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 0, distance: '0px' });
            sr.reveal('._js-animated--work-with-us3', { mobile: false, origin: 'left', scale: 0, distance: '20px' });
            sr.reveal('._js-animated--work-with-us4', { mobile: false, origin: 'bottom', scale: 0, distance: '0px' });
            sr.reveal('._js-animated--work-with-us5', { mobile: false, origin: 'right', scale: 0, distance: '20px' });

            sr.reveal('._js-animated--faq1', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 0, distance: '0px' });
            sr.reveal('._js-animated--faq2', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 0, distance: '0px' });

            sr.reveal('._js-animated--reviews1', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 0, distance: '0px' });
            sr.reveal('._js-animated--reviews2', { mobile: false, duration: 1000, origin: 'right', scale: 1, distance: '30px' });
            sr.reveal('._js-animated--reviews3', { mobile: false, viewFactor: 0, duration: 1000, origin: 'bottom', scale: 0, distance: '0px' });
            sr.reveal('._js-animated--reviews4', { mobile: false, duration: 1000, origin: 'left', scale: 1, distance: '30px' });

            sr.reveal('._js-animated--now1', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 0, distance: '0px' });
            sr.reveal('._js-animated--now2', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 0, distance: '0px' });
            sr.reveal('._js-animated--now3', { mobile: false, viewFactor: 0, origin: 'left', scale: 0, distance: '10px' });
            sr.reveal('._js-animated--now4', { mobile: false, viewFactor: 0, origin: 'right', scale: 0, distance: '10px' });

            sr.reveal('._js-animated--footer1', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 1, distance: '10px' });
            sr.reveal('._js-animated--footer2', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 1, distance: '10px' });
            sr.reveal('._js-animated--footer3', { mobile: false, viewFactor: 0, origin: 'bottom', scale: 1, distance: '10px' });
        }
    })();

    /*** инициализаця слика для блока отзывов ***/
    $('.reviews__slider .slider__body').on('init', function(event, slick) {
        $('.slider__nav .nav__current-slide .current').text(slick.currentSlide + 1);
        $('.slider__nav .nav__current-slide .all').text(slick.slideCount)
    }).slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        adaptiveHeight: true,
        cssEase: 'linear'
    }).on('afterChange', function(event, slick, currentSlide) {
        $('.slider__nav .nav__current-slide .current').text(currentSlide + 1)
    });

    $('.slider__nav .nav__btn--next').on('click', function() {
        $('.reviews__slider .slider__body').slick('slickNext');
    });

    $('.slider__nav .nav__btn--prev').on('click', function() {
        $('.reviews__slider .slider__body').slick('slickPrev');
    });

    /*** инициализаця маски для отправки имейла будущего автора ***/
    $('#inputmask--email').inputmask();
    $('#popup__input--email').inputmask();

    // heightAndWidthPx();
    mainContentSetHeight();

    $(window).resize(function() {
        // heightAndWidthPx();
        mainContentSetHeight();
    });

    // (function () {
    //     var hero = document.querySelector(".hero"),
    //         heading = hero.querySelector("h1"),
    //         canvas = document.createElement("canvas"),
    //         ctx = canvas.getContext("2d");
    //
    //     canvas.width = hero.clientWidth;
    //     canvas.height = hero.clientHeight;
    //
    //     setTimeout(function () {
    //         ctx.fillStyle = "#fff";
    //         ctx.fillRect(0, 0, canvas.width, canvas.height);
    //         ctx.font = "190px GothaProBlack";
    //         ctx.textAlign = "left";
    //         ctx.fillStyle = "rgba(0, 0, 0, 1)";
    //         ctx.globalCompositeOperation = "destination-out";
    //         ctx.fillText(heading.innerText, canvas.width / 12, canvas.height / 2);
    //
    //         hero.appendChild(canvas);
    //
    //         hero.className = "hero ready";
    //     }, 1000);
    // })()

    $('.popup-with-zoom-anim').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
        mainClass: 'my-mfp-zoom-in',
        
        callbacks: {
            open: function() {
              // Will fire when this exact popup is opened
              // this - is Magnific Popup object
            },
            close: function() {
              // Will fire when popup is closed
            }
            // e.t.c.
          }
    });
    
    /*** инициализация countUp либы (работает в связке с waypoint) ***/
    var easingFn = function (t, b, c, d) {
        var ts = (t /= d) * t;
        var tc = ts * t;

        return b + c * (tc + -3 * ts + 3 * t);
    };

    var options = {
        useEasing: true,
        easingFn: easingFn,
        useGrouping: true,
        separator: ' '
    };

    var countUp1 = new CountUp('_js-constructor7__count', 0, 0, 0, 2, options);
    var countUp2 = new CountUp('_js-constructor30__count', 0, 0, 0, 2, options);
    var countUp4 = new CountUp('_js-autor__count', 0, $('#_js-autor__count').attr('data-countup'), 0, 4, options);
    var countUp5 = new CountUp('_js-advantages1', 0, $('#_js-advantages1').attr('data-countup'), 0, 3, options);
    var countUp6 = new CountUp('_js-advantages2', 0, $('#_js-advantages2').attr('data-countup'), 0, 3, options);
    var countUp7 = new CountUp('_js-advantages3', 0, $('#_js-advantages3').attr('data-countup'), 0, 3, options);
    var countUp8 = new CountUp('_js-advantages4', 0, $('#_js-advantages4').attr('data-countup'), 0, 3, options);

    /*** инициализация waypoint либы (работает в связке с countup) ***/

    if ($('.js-waypoint').length > 0) {
        var waypoint = new Waypoint({
            // element: document.getElementById('_js-autor__count'),
            element: $('#_js-autor__count'),
            handler: function(direction) {
                countUp4.start();
            },
            offset: '100%'
        });

        var waypoint2 = new Waypoint({
            element: $('#_js-advantages1'),
            handler: function(direction) {
                countUp5.start();
                countUp6.start();
                countUp7.start();
                countUp8.start();
            },
            offset: '100%'
        });

        var waypoint3 = new Waypoint({
            element: $('#_js-constructor7__count'),
            handler: function (direction) {
                countUpdate();
            },
            offset: '100%'
        });
    }

});