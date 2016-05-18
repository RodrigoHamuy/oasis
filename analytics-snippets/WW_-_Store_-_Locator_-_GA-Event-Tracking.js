// This script fires events on the Store Locator page.

$(function(){

  $('#dwfrm_storelocator').submit(function(){
    var submittedPostcode = $('#dwfrm_storelocator_postalCode').val().toUpperCase().split(' ');
    for (var i = 0; i < submittedPostcode.length; i++) {
      if (submittedPostcode[i].match(/\d+/g) != null) { // If the postcode contains a number (e.g. is not a town name) then send the postcode.
        ga(
          'send',
          'event',
          'Find store',
          'Submit',
          submittedPostcode[i].substring(0,3) // Submit first 3 digits of postcode.
        );
      }
    }
  });

});
