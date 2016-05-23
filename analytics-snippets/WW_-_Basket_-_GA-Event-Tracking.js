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

  // Remove from bag
  $('body').on('click', '.item-user-actions button', function(){
    var eventLabel = $(this).parents('.cart-row').find('.hidden-product-id').attr('value').substring(0,8);
    ga('ec:addProduct',{
      'id': eventLabel,
      'name': $(this).parents('.cart-row').prev().find('.item-title a').text().trim(),
      'category': $(this).parents('tbody').find('.item-title a').attr('href').split('/')[3],
      'variant': eventLabel.slice(-2) // Last two digits of SKU = colour ID
    });
    ga('ec:setAction', 'remove');
    ga(
      'send',
      'event',
      'Bag',
      'Remove an item',
      eventLabel
    );
  });

  // Move to wishlist button click
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
