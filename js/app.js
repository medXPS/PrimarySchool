'use strict';

$('#nav-expander').on('click', function(e) {
    e.preventDefault();
    $('nav').toggleClass('nav-expanded');
});


$('.menu .close').on('click', function(e) {
    e.preventDefault();
    $('nav').toggleClass('nav-expanded');
});

$('.menu a').on('click', function(e) {
    e.preventDefault();
    $('nav').removeClass('nav-expanded');
});

function homeFullScreen() {
    var homeSection = $('.home');
    var windowHeight = $(window).outerHeight();

    if (homeSection.hasClass('home-fullscreen')) {
        $('.home-fullscreen').css('height', windowHeight);
    }
}

function openProject() {
    var portfolioItem = $('.portfolio-item a');
    var singleProject = $('#single-project');

    portfolioItem.click(function () {
        var link = $(this).attr('href');
        $('html, body').animate({
            scrollTop: singleProject.offset().top - 30
        }, 500);

        singleProject.empty();

        setTimeout(function () {
            singleProject.load(link, function (response, status) {
                if (status === "error") {
                    alert("An error");
                } else {
                    singleProject.slideDown(500);

                    var closeProject = $('#close-project');
                    closeProject.on('click', function () {
                        singleProject.slideUp(500);
                        setTimeout(function () {
                            singleProject.empty();
                        }, 500);
                    });
                }
            });
        }, 500);
        return false;
    });
}

// Initialization
$(window).on('load', function () {
    openProject();
    homeFullScreen();

    smoothScroll.init();
});

$(window).on('resize', function () {
    homeFullScreen();
});

var lat = 33.5642239; // New latitude
var lng = -7.5718559; // New longitude
var myLangLat = new google.maps.LatLng(lat, lng);

google.maps.Map.prototype.setCenterWithOffset = function(latlng, offsetX, offsetY) {
    var map = this;
    var ov = new google.maps.OverlayView();
    ov.onAdd = function() {
        var proj = this.getProjection();
        var aPoint = proj.fromLatLngToContainerPixel(latlng);
        aPoint.x = aPoint.x + offsetX;
        aPoint.y = aPoint.y + offsetY;
        map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
    };
    ov.draw = function() {};
    ov.setMap(this);
};


function initializeMap() {
    var mapOptions = {
        zoom: 12,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        draggable: false,
        center: myLangLat,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
    
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setCenterWithOffset(myLangLat, 0, -55);
}

google.maps.event.addDomListener(window, 'load', initializeMap);

google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenterWithOffset(myLangLat, 0, -55);
});
