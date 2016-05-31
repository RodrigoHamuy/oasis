$(function(){
  // Fire an event when the user logs in
  $('#dwfrm_login').submit(function(){
    ga(
      'send',
      'event',
      'Account',
      'Login'
    );
  });
  // Fire an event when the user registers on the /account page
   $('.registration_form_content #RegistrationForm').submit(function(){
    ga(
      'send',
      'event',
      'Account',
      'Register'
    );
  });
  // Track when user opts in to newsletter once logged in
  $('#edit-profile-btn').click(function(){
    setTimeout(function(){ // Set delay to wait for modal to appear
      $('#RegistrationForm').submit(function(){
        if ( ($('input#dwfrm_profile_customer_addtoemaillist:checked').length > 0) == true ) {
          ga('send', 'event', 'Newsletter sign up', 'Submit', 'via account settings' );
        }
      });
    }, 1000);
  });
  // Track item removal from Wishlist
  $('body').on('click', '.saved-item-delete', function() {
    var removedProductSKU = $(this).parents().eq(2).find('input[name="pid"]').val().substring(0,8);
    ga(
      'send',
      'event',
      'Saved Items',
      'Remove an item',
      removedProductSKU
    );
  });
  // Track item edit from wishlist
  $('body').on('click', '.quickviewbutton.edit_btn', function(){
    var editedItemCategory = $(this).parents('.product-tile').find('a.saved_item_image').attr('href').split('/')[5];
    var editedItemSKU = $(this).parents('.product-tile').attr('data-itemid').substring(0,8);
    ga(
      'send',
      'event',
      'Edit saved items',
      editedItemCategory,
      editedItemSKU
    );
  });
  // When a user drags and drops items in their wishlist, fire an event. Wait until the window has loaded for jQuery Sortable to initialise. NEEDS WORK!
  $(window).load(function(){
    // Fire event by attaching the change listener to the jQuery UI Sortable plugin.
    $("#wishlist-items-container").sortable({
      change: function( event, ui ) {
        var movedItem = ui.item[0];
        var movedItemCategory = $(movedItem).find('.saved_item_image').attr('href').split('/')[5];
        var movedItemSKU = $(movedItem).find('.saved_item_image > img').attr('src').split('/').pop().split('_')[1];
        ga(
          'send',
          'event',
          'Drag and drop saved items',
          movedItemCategory,
          movedItemSKU
        );
      }
    });
  });
  // Click to send Saved Items to a friend
  $('a#send-to-friend').click(function(){
    $('li.wishlist-item').each(function(){
      var wishlistItemSku = $(this).find('.product-tile').attr('data-itemid').substring(0,8);
      var wishlistItemCategory = $(this).find('.saved_item_image').attr('href').split('/')[5];
      ga(
        'send',
        'event',
        'Share wished items',
        wishlistItemCategory,
        wishlistItemSku
      );
    });
  });
  /* When user adds an item from their Wishlist into their bag
     IMPORTANT: Note that it is possible to add an item to your wishlist without specifying a size if you do
    it from the PLP. We must therefore test to see if size is present in the DOM for this product. If there is a size,
    we must register a submit event straight away. If there is no size, we send a click event when the user clicks to select
    a size, and then send a submit event when the user adds the product to bag.
  */
  // This function will send a Submit event to GA when the product is submitted to bag. We create it as a function because it
  // can be called in two different scenarios - if the item has a size chosen for it, or if the item does not have a size chosen for it.
  function addToBagSubmitEvent(wishlistItemID, wishlistItemName, wishlistItemCategory) {
    var clickedItemSKU = $('li#' + wishlistItemID).find('.saved_item_image > img').attr('src').split('/').pop().split('_')[1].split('.')[0];
    var daysInWishlist = $('li#' + wishlistItemID).find('.item-expiresin').text().replace(/\D/g,'');
    ga( 'set', { 'dimension5': daysInWishlist } );
    ga('ec:addProduct',{
      'id': clickedItemSKU,
      'name': wishlistItemName,
      'category': wishlistItemCategory,
      'variant': clickedItemSKU.slice(-2) // Last two digits of SKU = colour ID
    });
    ga('ec:setAction', 'add');
    ga(
      'send',
      'event',
      'Wished item conversions',
      wishlistItemCategory,
      clickedItemSKU
    );
  }
  /* Loop through the wishlist items and attach the appropriate click handlers, based on whether the item already has a size chosen or not.
     If the item has a size chosen, just attach a submit event handler.
     If the item doesn't have a size chosen, attach a click event handler and a submit event handler too.
  */
  $('li.wishlist-item').each(function(){
    var wishlistItemID = $(this).attr('id');

    if ($('.product-name a', this).length> 0) {
      var wishlistItemName = $('.product-name a', this).text().trim();
      var wishlistItemCategory = $('.product-name a', this).attr('href').split('/')[5]; // Get the category from the URL of the product's page.
      // If the wishlist item has a size specified for it, we should just attach a submit event handler.
      if ( $(this).find('.size').text().length > 0 ) {
        // console.log('item number ' + wishlistItemID + ' has a size specified.');
        $(this).find('.product-action.add-to-cart').on('click', function(){
          addToBagSubmitEvent(wishlistItemID, wishlistItemName, wishlistItemCategory);
        });
      }
    }
    // If the wishlist item DOES NOT have a size specified for it, we attach a click event listener (to trigger the option for
    // the user to select a size and then a submit event listener for when the user adds the item to their bag.
    else {
      // Attach a click event that fires the Click event to GA when the product is added to bag.
      $(this).find('.product-action.add-to-cart:not(.action-addtocart)').on('click', function(){
        var clickedItemSKU = $('li#' + wishlistItemID).find('.saved_item_image > img').attr('src').split('/').pop().split('_')[1].split('.')[0];
        console.log(clickedItemSKU);
        // Now send in Submit event when size is selected and item added to bag.
        setTimeout(function(){ // Set a delay to allow time for the Add To Cart submit button to be shown.
          var refreshInterval = setInterval(function(){ // Set an interval timer to check to see if the Add To Cart button is disabled or not. It will be disabled if no size has been selected yet.
            if ( $('.action-addtocart.product-action.add-to-cart').attr('disabled') == 'disabled' ) {
              console.log('button is disabled');
            }
            else { // If a size has been selected, we can now attach the click handler to the Add To Cart button.
              console.log('button is enabled');
              clearInterval(refreshInterval); // Cancel the interval
              // Attach click handler
              $('.action-addtocart.product-action.add-to-cart').on('click', function(){
                addToBagSubmitEvent(wishlistItemID, wishlistItemName, wishlistItemCategory);
              });
            }
          }, 500);
        }, 1000);
      });
    }
  }); // End loop.
});
