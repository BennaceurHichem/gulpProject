
let currentIndex = 0;
let dotIndex = 0;
let slides = $('.slide');
let dots = $('.dot');

$(document).on('scroll', () => {
    if ($(this).scrollTop() >= $('#restaurant').position().top) {
        $("#second-nav").slideDown();
    } else {
        $("#second-nav").slideUp();
    }
});

/* Slider */
function initializeSlides() {
    hideSlides();
    $(".slide").first().show(); // Current Index 0
}

function hideSlides() {
    /* Hide Each Slide Except for the first */
    $(".slide").each((slide) => {
        $(".slide").hide();
    });
}

function removeDotActives() {
    /* Dots */
    $('.dots-cont').each(() => {
        $('span').removeClass("dot-active");
    });
}

/* Add event listener for each dot */
dots.each((d) => {
    dots.eq(d).click(() => {
        hideSlides()
        slides.eq(d).show();    
        removeDotActives();
        dots.eq(d).addClass("dot-active");
    });
});

setInterval(function() {
    hideSlides();
    /* Go through each and display the next */
    if (currentIndex == $('.slide').length - 1) {
        currentIndex = -1;
        dotIndex = -1;
    }

    /* Slides */
    slides.eq(currentIndex + 1).animate({ width: 'toggle' }, 1000);
    currentIndex++;
    dotIndex++;

    /* Dots */
    removeDotActives();
    dots.eq(dotIndex).addClass("dot-active");

}, 3500);

initializeSlides();

/* (Navigation Links) */
$(".home-btn").click(() => {
    $('html, body').animate({ scrollTop: '0px' }, 500);
});

$(".restaurant-btn").click(() => {
    $('html, body').animate({ scrollTop: $("#restaurant").offset().top });
});

$(".menu-btn").click(() => {
    $('html, body').animate({ scrollTop: $("#rest-menu").offset().top });
});

$(".drinks-btn").click(() => {
    $('html, body').animate({ scrollTop: $("#rest-menu-drinks").offset().top });
});

$(".reservations-btn").click(() => {
    $('html, body').animate({ scrollTop: $("#reservations").offset().top });
});
