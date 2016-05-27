$(function(){

  // When the user sets their display preferences at the top of the PLP
  $('body').on('click', '.top_filters', function(){
    var label = $(this).find('.active').text(); // Get the new label of the filter clicked on (i.e. what it has changed to)
    ga(
      'send',
      'event',
      'Product list',
      'Display preference',
      label
    );
  });

  // Report a VPV to GA when more products are loaded onto the screen from infinite scroll.
  $(window).load(function(){
    // Collect an initial number of products displayed on the page.
    var numberOfProductsShown = $('li.grid-tile').length;
    $(window).scroll(function(){
      if ($('li.grid-tile').length > numberOfProductsShown) {
        numberOfProductsShown = $('li.grid-tile').length;
        var currentPageNumber = window.location.search.split('=').pop() || digitalData.page.id.split('_').pop(); // Get current page number. If no page number set in URL, use the search term.
        ga(
          'send',
          'event',
          'Dynamic Content',
          'Load',
          window.location.pathname + window.location.search
        );
      }
    });
  });

  // When the user clicks on a PLP item
  $('.product-tile-grid').on('click', '.wl-action.save_for_later, .quickviewbutton, .flex-direction-nav', function(){
    var productImageURL = $( this ).parents( '.product-tile-grid' ).find( '.flex-active-slide .thumb-link > img' ).attr( 'src' );
    var eightDigitSku = productImageURL.split('/').pop().split('_')[1];
    var sixDigitSku = eightDigitSku.substring(0,6);
    var productName = $(".product-tile[data-itemid='" + sixDigitSku + "']").find('a.name-link').text().trim();

    // If they clicked on the Add To Wishlist button
    if ( $(this).hasClass('save_for_later') ) {
      ga(
        'send',
        'event',
        'Product list',
        'Save for later',
        eightDigitSku
      );
    }

    // If they clicked on the Quick View button
    else if ( $(this).hasClass('quickviewbutton') ) {
      ga(
        'send',
        'event',
        'Product list',
        'Product details popup',
        eightDigitSku
      );
    }

    // If they clicked on the previous or next slideshow arrows
    else if ( $(this).hasClass('flex-direction-nav') ) {
      ga(
        'send',
        'event',
        'Product list',
        'Product image interaction',
        eightDigitSku
      );
    }
  });

  // When the user clicks on a nav item from the PLP
  $( '.header_navigation' ).on( 'click', 'li.subsubitems > ul > li > a', function(){
  	ga(
      'send',
      'event',
      'Product list',
      'Click to other product list: ' + $(this).text().trim(),
      'Clicked from: ' + digitalData.page.category.name
    );
  });

  // When the user reaches the end of the PLP
  $(document).ready(function(){
    setTimeout(function(){
      var refreshInterval = setInterval(function() { // Start a timer that checks to see if the user is at the end of the page (minus footer and Recently Viewed sections)
        if ((window.innerHeight + window.scrollY) >= ($(document).height() - $('footer').height() - $('#recently-viewed-baynote').height() )) {
          clearInterval(refreshInterval); // Cancel the timer.
          ga(
            'send',
            'event',
            'Dynamic content',
            'Ends',
            window.location.pathname
          );
        }
      }, 200);
    }, 2000);
  });

});
