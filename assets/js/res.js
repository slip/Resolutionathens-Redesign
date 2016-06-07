$(document).ready(function() {
  new WOW().init();
  innerMenuActiveLinks();
  smoothScroll();
  mobileNav();
  // google-analytics
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-77429513-1', 'auto');
  ga('send', 'pageview');

  // featherlight
  $(".card").click(function(event) {
    var thisCard = $(this);
    $.featherlight(thisCard.find('img').attr('src'));
  });
});

// color-bar-scroll
// $(window).bind("load resize scroll", function(e) {
//   var y = $(window).scrollTop();
//   $(".color-bar").filter(function() {
//     return $(this).offset().top < (y + $(window).height()) &&
//       $(this).offset().top + $(this).height() > y;
//   }).css('background-position', parseInt(y / 10) + 'px');
// });

function mobileNav() {
  $('.hamburger-icon').on('click', function() {
    var status = $(this).hasClass('is-open');
    if (status) {
      $('.hamburger-icon, .mobile-nav').removeClass('is-open');
    } else {
      $('.hamburger-icon, .mobile-nav').addClass('is-open');
    }
  });
}

function innerMenuActiveLinks() {
  $('.site-nav li').each(function() {
    if ($(this).children('a').attr('href') == window.location.pathname) {
      $(this).children('a').addClass('active');
    }
  });
}

function smoothScroll() {
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function() {
      window.location.hash = target;
    });
  });
}
