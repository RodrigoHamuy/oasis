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

  // Edit properties of item in bag
  $('.cart-select-color, #cart-select-size-dropdown, #cart-select-qty-dropdown').change(function(){
    console.log('change')
    var eightDigitSku = $(this).parents('.cart-row').find('.hidden-product-id').val().substring(0,8);
    ga(
      'send',
      'event',
      'Bag',
      'Change item details - ' + eightDigitSku,
      $(this).find(":selected").text().trim()
    );
  });

  // Add all bag items to wishlist
  $('button[name="addAlltoWishlist"]').click(function(){
    $('.cart-row').each(function(){
      var productCategory = $(this).find('.item-title-mobile a').attr('href').split('/')[3];
      var productSku = $(this).find('.hidden-product-id').val().substring(0,8);
      ga(
        'send',
        'event',
        'Add to wishlist - from shopping bag',
        productCategory,
        productSku
      );
    });
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
