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

});
