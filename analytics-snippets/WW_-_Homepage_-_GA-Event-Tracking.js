$(function() {

  // Clicking on the homepage hero section.
  $('.hero_section').click(function(){
    ga('send', 'event', 'Homepage', 'Hero click', $(this).find('img').attr('alt'));
  });


});
