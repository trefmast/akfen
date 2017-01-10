$(document).ready(function(){
	
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	/*Top menu*/

	$('.menu__toggle').click(function(e){
		e.preventDefault();
		$('body').toggleClass('blocked');
		$(this).toggleClass('menu__toggle--active').children().toggleClass('icon--transform');
		$('.menu__wrap').toggleClass('menu__wrap--visible').css({'height' : $(window).height()});
	});


	$(window).resize(function(){
		if( $(window).width() >= 990 ){
			$('body').removeClass('blocked');
			$('.menu__toggle').removeClass('menu__toggle--active');
			$('.icon--toggle').removeClass('icon--transform');
			$('.menu__wrap').removeAttr('style').removeClass('menu__wrap--visible');
		} else {
			$('.menu__wrap').css({'height' : $(window).height()});
		}
	});

	$('.diary__slider').slick(slickSettings());

	$('.advantages__desc, .team__name').matchHeight();

	/*Compare*/

	$('.fancymodal').fancybox({
		padding: 0,
		margin: 0,
		wrapCSS: 'detail_modal',
		closeBtn: false,
		autoSize: false,
		width: '100%',
		maxWidth: 1180,
		height: 'auto',
		fitToView: false,
		helpers: {
			overlay : {
				css : {
					'background-color' : 'rgba(20,34,38,0.9)',
					'background-image' : 'none'
				}
			}
		}
	});

	$('ul.diary__tabs').on('click', 'li:not(.diary__point--current)', function() {
		$(this).addClass('diary__point--current').siblings().removeClass('diary__point--current')
			.parents('div.diary__section').find('div.diary__box').eq($(this).index()).fadeIn(200).siblings('div.diary__box').hide();
		$('.diary__slider').slick('reinit');
	});

	/*Map*/

	ymaps.ready(init);

});

function slickSettings(){
	return {
		slidesToShow: 5,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		prevArrow: '<a href="#" class="slick-arrow diary__nav diary__nav--prev"></a>',
		nextArrow: '<a href="#" class="slick-arrow diary__nav diary__nav--next"></a>',
		responsive: [
			{
			breakpoint: 990,
				settings: {
					slidesToShow: 4
				}
			},
			{
			breakpoint: 769,
				settings: {
					slidesToShow: 3
				}
			},
			{
			breakpoint: 569,
				settings: {
					slidesToShow: 2
				}
			},
			{
			breakpoint: 481,
				settings: {
					slidesToShow: 1
				}
			}
		]
	}
}

/*Map*/

function init () {
    var map = new ymaps.Map('map', {
            center: [54.7266,20.4824],
            zoom: 16,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        }),

        BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="baloon">' +
                '<div class="baloon__head">Наши контакты</div>' +
                '<div class="baloon__label">Адрес:</div>' +
                '<div class="baloon__value">{{properties.address}}</div>' +
                '<div class="baloon__label">Номер телефона:</div>' +
                '<div class="baloon__value baloon__value--phone">{{properties.phone}}</div>' +
            '</div>', {
        });

	    var placemark = new ymaps.Placemark([54.7266, 20.4824], {
	    		address: 'г. Калининград, ул. Космонавта Леонова, 24', 
	    		phone: '+7 (900) 900-00-00', 
		    }, {
		        balloonContentLayout: BalloonContentLayout,
		        iconLayout: 'default#image',
	            iconImageHref: 'img/baloon-icon.png',
	            iconImageSize: [39, 51],
	            iconImageOffset: [-18, -53]
		    }
	    );
    map.geoObjects.add(placemark);
    map.behaviors.disable("scrollZoom");
}