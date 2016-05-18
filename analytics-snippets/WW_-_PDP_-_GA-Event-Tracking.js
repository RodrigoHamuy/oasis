$(function(){

  // Get the eight digit SKU and the product variant colour code, which is the last 2 digits of the 8 digit SKU.
  var eightDigitSku = $('.updatingPdpMainsku').text().trim();
  var productVariantCode = eightDigitSku.slice(-2);

  // Add to bag
  $('.product_details').on('click', '.action-addtocart', function() {
    setTimeout(function () {
      if ($('.select-product-size-message').length===0) {
        ga('ec:addProduct',{
          'id': eightDigitSku,
          'name': digitalData.page.product.name,
          'category': digitalData.page.product.masterCategory,
          'variant': productVariantCode
        });
        ga('ec:setAction', 'add');
        ga(
          'send',
          'event',
          'Product',
          'Move to bag',
          eightDigitSku
        );
      }
    }, 100);
  });

  // Add to wishlist
  $('body').on('click', '.product_details .save_for_later', function() {
    ga(
      'send',
      'event',
      'Add to wishlist',
      digitalData.page.product.masterCategory,
      eightDigitSku
    );
  });

  // Find in a store - Postcode
  $('body').on('click', '#check-store-availability', function(){
    var refreshInterval = setInterval(function(){ // Set an interval to check for the store availability dialog to appear
      if ( $('.stock_check_dialog').length > 0 ) {
        $('.store-locator-search.find-in-store').click(function(){
          var submittedPostcode = $('#dwfrm_storelocator_postalCode').val().toUpperCase().split(' ');
          for (var i = 0; i < submittedPostcode.length; i++) {
            if (submittedPostcode[i].match(/\d+/g) != null) { // If the postcode contains a number (e.g. is not a town name) then send the postcode.
              ga( 'set', { 'dimension4': submittedPostcode[i].substring(0,3) } );
              break;
            }
          }
          ga(
            'send',
            'event',
            'Product',
            'Find in store',
            eightDigitSku
          );
        });
        clearInterval(refreshInterval); // Cancel the interval once the dialog is open
      }
    }, 500);
  });


});
