// This script fires GA events sitewide.

$(function(){

  // When a user clicks the Help link
  $('li[data-link="footer-help-link"]').click(function(){
    ga('send', 'event', 'Help', 'Click', window.location.href);
  });

  // When the user clicks a social button in the footer
  $('.social-links li a').click(function(){
    ga('send', 'event', 'Social', 'Click', $(this).find('.link_label').text());
  });

  // Newsletter signup in the footer.
  $( '.newsletter-signup' ).on( 'submit', '#sign-up', function(){
  	ga('send', 'event', 'Newsletter sign up', 'Submit', 'via footer' );
  });

  // Fire an event when the user hovers over the Bag link in the nav.
  $('li#mini-cart').hover(function(){
    // When user hovers
    ga(
      'send',
      'event',
      'Bag - Nav',
      'Hover',
      window.location.href
    );
  },
  function(){
    // When user hovers off
  });

  // Track when user changes language by clicking the site selector in the footer
  $('a.siteSelect').click(function(){
    setTimeout(function(){
      $('#country-selector-form').submit(function(){
        var languageSelected = $('a.language_selector > span.selectBox-label').text();
        ga(
          'send',
          'event',
          'Language',
          'Click',
          languageSelected
        );
      });
    }, 1500);
  });

  // Fire a Virtual Pageview when a user clicks on an auto-suggested search result in the search bar.
  $('body').on('click', '.search-suggestion-right-panel-product', function(){
    var searchTerm = $('input#q').val();
    var pathname = window.location.pathname;

    // If the current pathname has a '/' at the end (e.g. /gb/jewellery/), then do not add a '/' to the beginning of the VPV URL.
    if ( pathname.substring(pathname.length -1) == '/' ) {
      var vpvURL = pathname + 'vpv/search/items/' + searchTerm;
    }
    else {
      var vpvURL = pathname + '/vpv/search/items/' + searchTerm;
    }

    ga('send', 'pageview', vpvURL);
  });

});
