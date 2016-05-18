$(function(){

  console.log('PLP page');

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

  // When the user clicks on a PLP item
  $('.product-tile-grid').on('click', '.wl-action.save_for_later, .quickviewbutton', function(){
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
  });

});
