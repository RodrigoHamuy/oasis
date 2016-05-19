$(function(){

  // Click to go to checkout
  $('body').on('click', 'button[name="dwfrm_cart_checkoutCart"]', function(){
    ga(
      'send',
      'event',
      'Bag',
      'Checkout'
    );
  });

  // Move to wishlist button click ** NEED TO DETECT CATEGORY! **
  $('.add-to-wishlist' ).click(function(){
    var eightDigitSku = $(this).parents('.cart-row').find('.hidden-product-id').attr('value').substring(0,8);
    var wishlistItemCategory = $(this).parents('.cart-row').find('.item-title-mobile a').attr('href').split('/')[3]; // Get the category from the URL of the product's page.
    ga(
      'send',
      'event',
      'Add to wishlist',
      wishlistItemCategory,
      eightDigitSku
    );
  });

});
